"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const assessmentResults_1 = require("../../models/assessmentResults");
const router_1 = require("@angular/router");
const staff_service_1 = require("../../services/staff.service");
const student_service_1 = require("../../services/student.service");
const client_service_1 = require("../../services/client.service");
const course_service_1 = require("../../services/course.service");
const authentication_service_1 = require("../../services/authentication.service");
const files_service_1 = require("../../services/files.service");
let StudentManageComponent = class StudentManageComponent {
    constructor(router, ngZone, staffService, studentService, clientService, courseService, authService, filesService) {
        this.router = router;
        this.ngZone = ngZone;
        this.staffService = staffService;
        this.studentService = studentService;
        this.clientService = clientService;
        this.courseService = courseService;
        this.authService = authService;
        this.filesService = filesService;
        this.studentInfoView = false;
        this.showGeneral = true;
        this.showGeneralInfoEdit = false;
        this.phone1 = false;
        this.phone2 = false;
        this.long1 = false;
        this.long2 = false;
        //bar chart (learning style)
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = ['Hearing', 'Seeing', 'Doing'];
        this.barChartType = 'bar';
        this.barChartLegend = false;
        this.barChartColors = [{ backgroundColor: ["#FF4207", "#F7CE3C", "#62A744"] }];
    }
    ngOnInit() {
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();
        this.getStudents();
    }
    getStudents() {
        this.studentService
            .getStudents()
            .then(students => {
            if (students.result === 'error') {
                this.students = null;
                this.displayErrorAlert(students);
            }
            else {
                this.students = students;
                for (let student of this.students) {
                    student.fullName = student.firstName + " " + student.lastName;
                }
                this.getFiles();
            }
        })
            .catch(error => this.error = error);
    }
    getFiles() {
        this.filesService
            .getFiles()
            .then(files => {
            this.files = files;
            for (let file of this.files) {
                file.userID = +file.userID;
            }
            this.getSiteActivity();
        })
            .catch(error => this.error = error);
    }
    getSiteActivity() {
        this.staffService
            .getSiteActivity()
            .then(results => {
            if (results.result === 'error') {
                this.activity = null;
                this.displayErrorAlert(results);
            }
            else {
                this.activity = results.filter(x => x.type === 'scheduledEmails');
                swal.close();
            }
        })
            .catch(error => this.error = error);
    }
    download(file) {
        var filename = file.milliseconds + "_" + file.userID + "_" + file.filename;
        this.filesService
            .download(filename)
            .then(response => {
            var blob = new Blob([response], { type: "application/pdf" });
            //change download.pdf to the name of whatever you want your file to be
            saveAs(blob, file.filename);
        })
            .catch(error => error);
    }
    deleteFileAlert(file) {
        var filename = file.milliseconds + "_" + file.userID + "_" + file.filename;
        swal({
            title: 'Delete file (' + file.filename + ')?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(isConfirm => {
            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                console.log(isConfirm.dismiss);
            }
            else if (isConfirm) {
                this.deleteFile(filename);
            }
        }).catch(error => error);
    }
    deleteFile(filename) {
        event.stopPropagation();
        this.filesService
            .delete(filename)
            .then(res => {
            this.getFiles();
            swal('Deleted!', 'File has been deleted.', 'success');
        })
            .catch(error => error);
    }
    addFile() {
        this.router.navigate(['/file-upload']);
    }
    archiveAlert(student, event) {
        swal({
            title: 'Archive student (' + student.firstName + ' ' + student.lastName + ')',
            text: "Are you sure want to do this?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Archive!'
        }).then(isConfirm => {
            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                console.log(isConfirm.dismiss);
            }
            else if (isConfirm) {
                this.archiveStudent(student, event);
            }
        }).catch(error => {
            console.log(error);
        });
    }
    archiveStudent(student, event) {
        this.studentService
            .archiveStudent(student)
            .then(result => {
            if (result.result === 'error') {
                this.displayErrorAlert(result);
            }
            else if (result.result === 'success') {
                swal(result.title, result.msg, result.result);
                this.getStudents();
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
            }
        })
            .catch(error => console.log(error));
    }
    goToStudentArchive() {
        this.router.navigate(['/student-archive']);
    }
    populatePRF(student) {
        this.studentService
            .populatePRF(student.userID)
            .then(result => {
            if (result.result === 'error') {
                this.displayErrorAlert(result);
            }
            else if (result.result === 'success') {
                swal('Sorry...', 'This feature is not yet available', 'info');
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
            }
        })
            .catch(error => console.log(error));
    }
    viewInfo(student) {
        swal({
            title: 'Loading...'
        });
        swal.showLoading();
        this.resetView();
        this.showGeneral = true;
        this.studentInfoView = true;
        this.studentView = student;
        this.studentsFiles = this.files.filter(x => x.userID === this.studentView.userID);
        this.studentService
            .getAllFormsByID(student)
            .then(forms => {
            if (forms.result === 'error') {
                this.consentView = null;
                this.learningStyleView = null;
                this.suitabilityView = null;
                this.displayErrorAlert(forms);
            }
            else {
                this.consentForms = forms.consentForm;
                this.learningStyleView = forms.learningStyleForm[0];
                this.suitabilityView = forms.suitabilityForm[0];
                var isEmpty = (forms.assessmentResults || []).length === 0;
                if (isEmpty) {
                    this.editAssessment = false;
                    this.assessmentResults = new assessmentResults_1.AssessmentResults();
                }
                else {
                    this.editAssessment = true;
                    this.assessmentResults = forms.assessmentResults[0];
                }
                this.barChartData = [{ data: [this.learningStyleView.hearing, this.learningStyleView.seeing, this.learningStyleView.doing] }];
            }
            swal.close();
        })
            .catch(error => this.error = error);
    }
    viewCourses(student) {
        var userID = student.userID;
        this.resetView();
        this.studentCoursesView = student;
        this.getTimetableById(userID);
        this.getWaitListById(userID);
    }
    getTimetableById(userID) {
        this.studentService
            .getEventsById(userID)
            .then(result => {
            if (result.result === 'error') {
                this.displayErrorAlert(result);
                this.studentCourses = null;
            }
            else if (result.result === 'success') {
                this.studentCourses = null;
                // swal(
                //     result.title,
                //     result.msg,
                //     'info'
                // );
            }
            else {
                this.studentCourses = result;
            }
        }).catch(error => {
            console.log("Error getting timetable by id");
        });
    }
    getWaitListById(userID) {
        this.waitList = null;
        this.courseService
            .getWaitListById(userID)
            .then(result => {
            if (result.result === 'error') {
                this.displayErrorAlert(result);
                this.waitList = null;
            }
            else {
                this.waitList = result;
            }
        })
            .catch(error => console.log("Error - Get wait list by id: " + error));
    }
    overallStatus() {
        this.resetView();
    }
    sectionBtnClicked(event, section) {
        this.resetView();
        this.studentInfoView = true;
        if (section === "general") {
            this.showGeneral = true;
        }
        else if (section === "suitability") {
            this.showSuitability = true;
        }
        else if (section === "consent") {
            this.showConsent = true;
        }
        else if (section === "learningStyle") {
            this.showLearningStyle = true;
        }
        else if (section === "files") {
            this.showFiles = true;
        }
    }
    editGeneralInfo(student) {
        this.studentEdit = student;
        var splitPhone = this.studentEdit.phone.split(' ');
        if (this.studentEdit.phone.indexOf('+1') !== -1) {
            this.long1 = true;
            this.studentEdit.phone = splitPhone[1] + " " + splitPhone[2];
            if (splitPhone[3] === 'Home') {
                this.phone1 = false;
            }
            else {
                this.phone1 = true;
            }
        }
        else {
            this.long1 = false;
            this.studentEdit.phone = splitPhone[0] + " " + splitPhone[1];
            if (splitPhone[2] === 'Home') {
                this.phone1 = false;
            }
            else {
                this.phone1 = true;
            }
        }
        var splitAlternate = this.studentEdit.alternateNumber.split(' ');
        if (this.studentEdit.alternateNumber.indexOf('+1') !== -1) {
            this.long2 = true;
            this.studentEdit.alternateNumber = splitAlternate[1] + " " + splitAlternate[2];
            if (splitAlternate[3] === 'Home') {
                this.phone2 = false;
            }
            else {
                this.phone2 = true;
            }
        }
        else {
            this.long2 = false;
            this.studentEdit.alternateNumber = splitAlternate[0] + " " + splitAlternate[1];
            if (splitAlternate[2] === 'Home') {
                this.phone2 = false;
            }
            else {
                this.phone2 = true;
            }
        }
        this.showGeneral = false;
        this.showGeneralInfoEdit = true;
    }
    updateGeneralInfo() {
        swal({
            title: 'Updating...'
        });
        swal.showLoading();
        var phoneSplit = this.studentEdit.phone.split(' ');
        this.studentEdit.phone = phoneSplit[0] + " " + phoneSplit[1];
        if (this.phone1 === true) {
            this.studentEdit.phone = this.studentEdit.phone + " Cell";
        }
        else if (this.phone1 === false) {
            this.studentEdit.phone = this.studentEdit.phone + " Home";
        }
        if (this.long1 === true) {
            this.studentEdit.phone = "+1 " + this.studentEdit.phone;
        }
        var alternateSplit = this.studentEdit.alternateNumber.split(' ');
        this.studentEdit.alternateNumber = alternateSplit[0] + " " + alternateSplit[1];
        if (this.phone2 === true) {
            this.studentEdit.alternateNumber = this.studentEdit.alternateNumber + " Cell";
        }
        else if (this.phone2 === false) {
            this.studentEdit.alternateNumber = this.studentEdit.alternateNumber + " Home";
        }
        if (this.long2 === true) {
            this.studentEdit.alternateNumber = "+1 " + this.studentEdit.alternateNumber;
        }
        this.studentService
            .updateGeneralInfo(this.studentEdit)
            .then(user => {
            if (user.result === "error") {
                this.displayErrorAlert(user);
            }
            else if (user.msg === "Username is already in use.") {
                swal('Username taken', 'Please enter a different username.', 'warning');
            }
            else if (user.msg === "Email is already in use.") {
                swal('Email in use', 'Please enter a different email.', 'warning');
            }
            else if (user.msg === "Incorrect email format.") {
                swal('Incorrect email format', 'Please enter a proper email.', 'warning');
            }
            else if (user.result === "success") {
                swal(user.title, user.msg, 'success');
                this.getStudents();
                this.showGeneralInfoEdit = false;
                this.showGeneral = true;
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'warning');
            }
        })
            .catch();
    }
    allowClientToEdit(student, permission) {
        this.studentService
            .grantConsentEditPermission(student, permission)
            .then(result => {
            if (result.result === 'error') {
                this.displayErrorAlert(result);
            }
            else if (result.result === 'granted') {
                this.studentView.editConsentRequest = false;
                swal('Student Access Granted', 'Student will be sent an email informing that they can now edit conesnt.', 'success');
            }
            else if (result.result === 'denied') {
                this.studentView.editConsentRequest = false;
                swal('Student Access Denied', 'Student will be sent an email informing that they can NOT edit conesnt.', 'danger');
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
            }
        }).catch();
    }
    onSelectChange(event) {
        var consentForm = this.getConsentFormByConsentID(this.selectedConsentForm);
        this.consentView = consentForm[0];
    }
    getConsentFormByConsentID(id) {
        id = +id;
        var consentForm = this.consentForms.filter(x => x.consentID === id);
        return consentForm;
    }
    resetView() {
        this.studentCoursesView = null;
        this.showAssessmentResults = false;
        this.showGeneralInfoEdit = false;
        this.studentInfoView = false;
        this.showGeneral = false;
        this.showSuitability = false;
        this.showConsent = false;
        this.showLearningStyle = false;
        this.showFiles = false;
    }
    viewAssessmentResults(student) {
        this.viewInfo(student);
        this.resetView();
        this.studentInfoView = true;
        this.studentView = student;
        this.showAssessmentResults = true;
    }
    addAssessmentResults(userID) {
        this.assessmentResults.userID = userID;
        this.clientService
            .addAssessmentResults(this.assessmentResults)
            .then(result => {
            if (result.result === 'error') {
                this.displayErrorAlert(result);
            }
            else if (result.result === 'success') {
                swal(result.title, result.msg, result.result);
                this.resetView();
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
            }
        })
            .catch(error => this.error = error);
    }
    editAssessmentResults(userID) {
        this.clientService
            .editAssessmentResults(this.assessmentResults)
            .then(result => {
            if (result.result === 'error') {
                this.displayErrorAlert(result);
            }
            else if (result.result === 'success') {
                swal(result.title, result.msg, result.result);
                this.resetView();
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
            }
        })
            .catch(error => this.error = error);
    }
    displayErrorAlert(error) {
        swal(error.title, error.msg, 'error');
    }
    goBack() {
        window.history.back();
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", assessmentResults_1.AssessmentResults)
], StudentManageComponent.prototype, "assessmentResults", void 0);
StudentManageComponent = __decorate([
    core_1.Component({
        selector: 'student-manage',
        templateUrl: './app/components/student-manage/student-manage.component.html',
        styleUrls: ['./app/components/student-manage/student-manage.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        core_1.NgZone,
        staff_service_1.StaffService,
        student_service_1.StudentService,
        client_service_1.ClientService,
        course_service_1.CourseService,
        authentication_service_1.AuthService,
        files_service_1.FilesService])
], StudentManageComponent);
exports.StudentManageComponent = StudentManageComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBaUU7QUFNakUsc0VBQW1FO0FBQ25FLDRDQUF5QztBQUN6QyxnRUFBNEQ7QUFDNUQsb0VBQWdFO0FBQ2hFLGtFQUE4RDtBQUM5RCxrRUFBOEQ7QUFDOUQsa0ZBQW9FO0FBQ3BFLGdFQUE0RDtBQVc1RCxJQUFhLHNCQUFzQixHQUFuQztJQTRDRSxZQUFvQixNQUFjLEVBQ3hCLE1BQWMsRUFDZCxZQUEwQixFQUMxQixjQUE4QixFQUM5QixhQUE0QixFQUM1QixhQUE0QixFQUM1QixXQUF3QixFQUN4QixZQUEwQjtRQVBoQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUEvQ3BDLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBV2pDLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBRTVCLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyxXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUN2QixVQUFLLEdBQVksS0FBSyxDQUFDO1FBU3ZCLDRCQUE0QjtRQUM1QixvQkFBZSxHQUFRO1lBQ3JCLHNCQUFzQixFQUFFLEtBQUs7WUFDN0IsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQztRQUNGLG1CQUFjLEdBQWEsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFF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QUErRDtRQUM1RSxTQUFTLEVBQUUsQ0FBQyw4REFBOEQsQ0FBQztLQUM1RSxDQUFDO3FDQThDNEIsZUFBTTtRQUNoQixhQUFNO1FBQ0EsNEJBQVk7UUFDVixnQ0FBYztRQUNmLDhCQUFhO1FBQ2IsOEJBQWE7UUFDZixvQ0FBVztRQUNWLDRCQUFZO0dBbkR6QixzQkFBc0IsQ0FzakJsQztBQXRqQlksd0RBQXNCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3N0dWRlbnQtbWFuYWdlL3N0dWRlbnQtbWFuYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N0dWRlbnRcIjtcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb3Vyc2VcIjtcclxuaW1wb3J0IHsgQ29uc2VudEZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbnNlbnRGb3JtXCI7XHJcbmltcG9ydCB7IFN1aXRhYmlsaXR5Rm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3VpdGFiaWxpdHlGb3JtXCI7XHJcbmltcG9ydCB7IExlYXJuaW5nU3R5bGVGb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9sZWFybmluZ1N0eWxlRm9ybVwiO1xyXG5pbXBvcnQgeyBBc3Nlc3NtZW50UmVzdWx0cyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvYXNzZXNzbWVudFJlc3VsdHNcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3RhZmZTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0YWZmLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY2xpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291cnNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3Vyc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEZpbGVzU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9maWxlcy5zZXJ2aWNlXCI7XHJcbmRlY2xhcmUgdmFyIHNhdmVBczogYW55O1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcbmRlY2xhcmUgdmFyIEZpbGVTYXZlcjogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzdHVkZW50LW1hbmFnZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3N0dWRlbnQtbWFuYWdlL3N0dWRlbnQtbWFuYWdlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTdHVkZW50TWFuYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBzdHVkZW50czogU3R1ZGVudFtdO1xyXG4gIGFjdGl2aXR5OiBhbnk7XHJcbiAgZXJyb3I6IGFueTtcclxuICBzdHVkZW50SW5mb1ZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBzdHVkZW50VmlldzogU3R1ZGVudDtcclxuICBzdHVkZW50Q291cnNlc1ZpZXc6IFN0dWRlbnQ7XHJcbiAgc3R1ZGVudENvdXJzZXM6IGFueVtdO1xyXG4gIHdhaXRMaXN0OiBhbnlbXTtcclxuICBjb25zZW50Rm9ybXM6IENvbnNlbnRGb3JtW107XHJcbiAgY29uc2VudFZpZXc6IENvbnNlbnRGb3JtO1xyXG4gIHNlbGVjdGVkQ29uc2VudEZvcm06IHN0cmluZztcclxuICBzdWl0YWJpbGl0eVZpZXc6IFN1aXRhYmlsaXR5Rm9ybTtcclxuICBsZWFybmluZ1N0eWxlVmlldzogTGVhcm5pbmdTdHlsZUZvcm07XHJcbiAgQElucHV0KCkgYXNzZXNzbWVudFJlc3VsdHM6IEFzc2Vzc21lbnRSZXN1bHRzO1xyXG4gIHNob3dHZW5lcmFsOiBib29sZWFuID0gdHJ1ZTtcclxuICBzdHVkZW50RWRpdDogU3R1ZGVudDtcclxuICBzaG93R2VuZXJhbEluZm9FZGl0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgcGhvbmUxOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcGhvbmUyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgbG9uZzE6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBsb25nMjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBzaG93U3VpdGFiaWxpdHk6IGJvb2xlYW47XHJcbiAgc2hvd0NvbnNlbnQ6IGJvb2xlYW47XHJcbiAgc2hvd0xlYXJuaW5nU3R5bGU6IGJvb2xlYW47XHJcbiAgc2hvd0ZpbGVzOiBib29sZWFuO1xyXG4gIHNob3dBc3Nlc3NtZW50UmVzdWx0czogYm9vbGVhbjtcclxuICBlZGl0QXNzZXNzbWVudDogYm9vbGVhbjtcclxuXHJcbiAgLy9iYXIgY2hhcnQgKGxlYXJuaW5nIHN0eWxlKVxyXG4gIGJhckNoYXJ0T3B0aW9uczogYW55ID0ge1xyXG4gICAgc2NhbGVTaG93VmVydGljYWxMaW5lczogZmFsc2UsXHJcbiAgICByZXNwb25zaXZlOiB0cnVlXHJcbiAgfTtcclxuICBiYXJDaGFydExhYmVsczogc3RyaW5nW10gPSBbJ0hlYXJpbmcnLCAnU2VlaW5nJywgJ0RvaW5nJ107XHJcbiAgYmFyQ2hhcnRUeXBlOiBzdHJpbmcgPSAnYmFyJztcclxuICBiYXJDaGFydExlZ2VuZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGJhckNoYXJ0RGF0YTogYW55O1xyXG4gIGJhckNoYXJ0Q29sb3JzOiBhbnlbXSA9IFt7IGJhY2tncm91bmRDb2xvcjogW1wiI0ZGNDIwN1wiLCBcIiNGN0NFM0NcIiwgXCIjNjJBNzQ0XCJdIH1dO1xyXG5cclxuICBmaWxlczogYW55W107XHJcbiAgc3R1ZGVudHNGaWxlczogYW55W107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBzdGFmZlNlcnZpY2U6IFN0YWZmU2VydmljZSxcclxuICAgIHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjbGllbnRTZXJ2aWNlOiBDbGllbnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb3Vyc2VTZXJ2aWNlOiBDb3Vyc2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGZpbGVzU2VydmljZTogRmlsZXNTZXJ2aWNlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdMb2FkaW5nLi4uJyxcclxuICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgIHRoaXMuZ2V0U3R1ZGVudHMoKTtcclxuICB9XHJcblxyXG4gIGdldFN0dWRlbnRzKCkge1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAuZ2V0U3R1ZGVudHMoKVxyXG4gICAgICAudGhlbihzdHVkZW50cyA9PiB7XHJcbiAgICAgICAgaWYgKChzdHVkZW50cyBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50cyA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHN0dWRlbnRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50cyA9IHN0dWRlbnRzO1xyXG4gICAgICAgICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLnN0dWRlbnRzKSB7XHJcbiAgICAgICAgICAgIHN0dWRlbnQuZnVsbE5hbWUgPSBzdHVkZW50LmZpcnN0TmFtZSArIFwiIFwiICsgc3R1ZGVudC5sYXN0TmFtZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuZ2V0RmlsZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmlsZXMoKSB7XHJcbiAgICB0aGlzLmZpbGVzU2VydmljZVxyXG4gICAgICAuZ2V0RmlsZXMoKVxyXG4gICAgICAudGhlbihmaWxlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5maWxlcyA9IGZpbGVzO1xyXG4gICAgICAgIGZvciAobGV0IGZpbGUgb2YgdGhpcy5maWxlcykge1xyXG4gICAgICAgICAgZmlsZS51c2VySUQgPSArZmlsZS51c2VySUQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2V0U2l0ZUFjdGl2aXR5KCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2l0ZUFjdGl2aXR5KCkge1xyXG4gICAgdGhpcy5zdGFmZlNlcnZpY2VcclxuICAgICAgLmdldFNpdGVBY3Rpdml0eSgpXHJcbiAgICAgIC50aGVuKHJlc3VsdHMgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0cyBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5hY3Rpdml0eSA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmFjdGl2aXR5ID0gcmVzdWx0cy5maWx0ZXIoeCA9PiB4LnR5cGUgPT09ICdzY2hlZHVsZWRFbWFpbHMnKTtcclxuICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZG93bmxvYWQoZmlsZSkge1xyXG4gICAgdmFyIGZpbGVuYW1lID0gZmlsZS5taWxsaXNlY29uZHMgKyBcIl9cIiArIGZpbGUudXNlcklEICsgXCJfXCIgKyBmaWxlLmZpbGVuYW1lO1xyXG4gICAgdGhpcy5maWxlc1NlcnZpY2VcclxuICAgICAgLmRvd25sb2FkKGZpbGVuYW1lKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbcmVzcG9uc2VdLCB7IHR5cGU6IFwiYXBwbGljYXRpb24vcGRmXCIgfSk7XHJcbiAgICAgICAgLy9jaGFuZ2UgZG93bmxvYWQucGRmIHRvIHRoZSBuYW1lIG9mIHdoYXRldmVyIHlvdSB3YW50IHlvdXIgZmlsZSB0byBiZVxyXG4gICAgICAgIHNhdmVBcyhibG9iLCBmaWxlLmZpbGVuYW1lKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUZpbGVBbGVydChmaWxlKSB7XHJcbiAgICB2YXIgZmlsZW5hbWUgPSBmaWxlLm1pbGxpc2Vjb25kcyArIFwiX1wiICsgZmlsZS51c2VySUQgKyBcIl9cIiArIGZpbGUuZmlsZW5hbWU7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdEZWxldGUgZmlsZSAoJyArIGZpbGUuZmlsZW5hbWUgKyAnKT8nLFxyXG4gICAgICB0ZXh0OiBcIllvdSB3b24ndCBiZSBhYmxlIHRvIHJldmVydCB0aGlzIVwiLFxyXG4gICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgZGVsZXRlIGl0ISdcclxuICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICB0aGlzLmRlbGV0ZUZpbGUoZmlsZW5hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9KS5jYXRjaChlcnJvciA9PiBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBkZWxldGVGaWxlKGZpbGVuYW1lKSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIHRoaXMuZmlsZXNTZXJ2aWNlXHJcbiAgICAgIC5kZWxldGUoZmlsZW5hbWUpXHJcbiAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5nZXRGaWxlcygpO1xyXG4gICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAnRGVsZXRlZCEnLFxyXG4gICAgICAgICAgJ0ZpbGUgaGFzIGJlZW4gZGVsZXRlZC4nLFxyXG4gICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGFkZEZpbGUoKSB7XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9maWxlLXVwbG9hZCddKTtcclxuICB9XHJcblxyXG4gIGFyY2hpdmVBbGVydChzdHVkZW50OiBTdHVkZW50LCBldmVudDogYW55KSB7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdBcmNoaXZlIHN0dWRlbnQgKCcgKyBzdHVkZW50LmZpcnN0TmFtZSArICcgJyArIHN0dWRlbnQubGFzdE5hbWUgKyAnKScsXHJcbiAgICAgIHRleHQ6IFwiQXJlIHlvdSBzdXJlIHdhbnQgdG8gZG8gdGhpcz9cIixcclxuICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIEFyY2hpdmUhJ1xyXG4gICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICBpZiAoaXNDb25maXJtLmRpc21pc3MgPT09IFwiY2FuY2VsXCIgfHwgaXNDb25maXJtLmRpc21pc3MgPT09IFwib3ZlcmxheVwiKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtLmRpc21pc3MpO1xyXG4gICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgIHRoaXMuYXJjaGl2ZVN0dWRlbnQoc3R1ZGVudCwgZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXJjaGl2ZVN0dWRlbnQoc3R1ZGVudCwgZXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmFyY2hpdmVTdHVkZW50KHN0dWRlbnQpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLnRpdGxlLFxyXG4gICAgICAgICAgICAocmVzdWx0IGFzIGFueSkubXNnLFxyXG4gICAgICAgICAgICAocmVzdWx0IGFzIGFueSkucmVzdWx0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpcy5nZXRTdHVkZW50cygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgZ29Ub1N0dWRlbnRBcmNoaXZlKCkge1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3R1ZGVudC1hcmNoaXZlJ10pO1xyXG4gIH1cclxuXHJcbiAgcG9wdWxhdGVQUkYoc3R1ZGVudCkge1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAucG9wdWxhdGVQUkYoc3R1ZGVudC51c2VySUQpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ1NvcnJ5Li4uJyxcclxuICAgICAgICAgICAgJ1RoaXMgZmVhdHVyZSBpcyBub3QgeWV0IGF2YWlsYWJsZScsXHJcbiAgICAgICAgICAgICdpbmZvJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIHZpZXdJbmZvKHN0dWRlbnQ6IFN0dWRlbnQpIHtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ0xvYWRpbmcuLi4nXHJcbiAgICB9KTtcclxuICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICB0aGlzLnNob3dHZW5lcmFsID0gdHJ1ZTtcclxuICAgIHRoaXMuc3R1ZGVudEluZm9WaWV3ID0gdHJ1ZTtcclxuICAgIHRoaXMuc3R1ZGVudFZpZXcgPSBzdHVkZW50O1xyXG4gICAgdGhpcy5zdHVkZW50c0ZpbGVzID0gdGhpcy5maWxlcy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gdGhpcy5zdHVkZW50Vmlldy51c2VySUQpO1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAuZ2V0QWxsRm9ybXNCeUlEKHN0dWRlbnQpXHJcbiAgICAgIC50aGVuKGZvcm1zID0+IHtcclxuICAgICAgICBpZiAoKGZvcm1zIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbnNlbnRWaWV3ID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZVZpZXcgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5zdWl0YWJpbGl0eVZpZXcgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChmb3Jtcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY29uc2VudEZvcm1zID0gZm9ybXMuY29uc2VudEZvcm07XHJcbiAgICAgICAgICB0aGlzLmxlYXJuaW5nU3R5bGVWaWV3ID0gZm9ybXMubGVhcm5pbmdTdHlsZUZvcm1bMF07XHJcbiAgICAgICAgICB0aGlzLnN1aXRhYmlsaXR5VmlldyA9IGZvcm1zLnN1aXRhYmlsaXR5Rm9ybVswXTtcclxuICAgICAgICAgIHZhciBpc0VtcHR5ID0gKGZvcm1zLmFzc2Vzc21lbnRSZXN1bHRzIHx8IFtdKS5sZW5ndGggPT09IDA7XHJcbiAgICAgICAgICBpZiAoaXNFbXB0eSkge1xyXG4gICAgICAgICAgICB0aGlzLmVkaXRBc3Nlc3NtZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYXNzZXNzbWVudFJlc3VsdHMgPSBuZXcgQXNzZXNzbWVudFJlc3VsdHMoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWRpdEFzc2Vzc21lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmFzc2Vzc21lbnRSZXN1bHRzID0gZm9ybXMuYXNzZXNzbWVudFJlc3VsdHNbMF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmJhckNoYXJ0RGF0YSA9IFt7IGRhdGE6IFt0aGlzLmxlYXJuaW5nU3R5bGVWaWV3LmhlYXJpbmcsIHRoaXMubGVhcm5pbmdTdHlsZVZpZXcuc2VlaW5nLCB0aGlzLmxlYXJuaW5nU3R5bGVWaWV3LmRvaW5nXSB9XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIHZpZXdDb3Vyc2VzKHN0dWRlbnQ6IFN0dWRlbnQpIHtcclxuICAgIHZhciB1c2VySUQgPSBzdHVkZW50LnVzZXJJRDtcclxuICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICB0aGlzLnN0dWRlbnRDb3Vyc2VzVmlldyA9IHN0dWRlbnQ7XHJcbiAgICB0aGlzLmdldFRpbWV0YWJsZUJ5SWQodXNlcklEKTtcclxuICAgIHRoaXMuZ2V0V2FpdExpc3RCeUlkKHVzZXJJRCk7XHJcbiAgfVxyXG5cclxuICBnZXRUaW1ldGFibGVCeUlkKHVzZXJJRCkge1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAuZ2V0RXZlbnRzQnlJZCh1c2VySUQpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudENvdXJzZXMgPSBudWxsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICB0aGlzLnN0dWRlbnRDb3Vyc2VzID0gbnVsbDtcclxuICAgICAgICAgIC8vIHN3YWwoXHJcbiAgICAgICAgICAvLyAgICAgcmVzdWx0LnRpdGxlLFxyXG4gICAgICAgICAgLy8gICAgIHJlc3VsdC5tc2csXHJcbiAgICAgICAgICAvLyAgICAgJ2luZm8nXHJcbiAgICAgICAgICAvLyApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnN0dWRlbnRDb3Vyc2VzID0gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZ2V0dGluZyB0aW1ldGFibGUgYnkgaWRcIik7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0V2FpdExpc3RCeUlkKHVzZXJJRCkge1xyXG4gICAgdGhpcy53YWl0TGlzdCA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5jb3Vyc2VTZXJ2aWNlXHJcbiAgICAgIC5nZXRXYWl0TGlzdEJ5SWQodXNlcklEKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgICB0aGlzLndhaXRMaXN0ID0gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy53YWl0TGlzdCA9IHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IHdhaXQgbGlzdCBieSBpZDogXCIgKyBlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgb3ZlcmFsbFN0YXR1cygpIHtcclxuICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgfVxyXG5cclxuICBzZWN0aW9uQnRuQ2xpY2tlZChldmVudCwgc2VjdGlvbikge1xyXG4gICAgdGhpcy5yZXNldFZpZXcoKTtcclxuICAgIHRoaXMuc3R1ZGVudEluZm9WaWV3ID0gdHJ1ZTtcclxuICAgIGlmIChzZWN0aW9uID09PSBcImdlbmVyYWxcIikge1xyXG4gICAgICB0aGlzLnNob3dHZW5lcmFsID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAoc2VjdGlvbiA9PT0gXCJzdWl0YWJpbGl0eVwiKSB7XHJcbiAgICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAoc2VjdGlvbiA9PT0gXCJjb25zZW50XCIpIHtcclxuICAgICAgdGhpcy5zaG93Q29uc2VudCA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHNlY3Rpb24gPT09IFwibGVhcm5pbmdTdHlsZVwiKSB7XHJcbiAgICAgIHRoaXMuc2hvd0xlYXJuaW5nU3R5bGUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChzZWN0aW9uID09PSBcImZpbGVzXCIpIHtcclxuICAgICAgdGhpcy5zaG93RmlsZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZWRpdEdlbmVyYWxJbmZvKHN0dWRlbnQpIHtcclxuICAgIHRoaXMuc3R1ZGVudEVkaXQgPSBzdHVkZW50O1xyXG4gICAgdmFyIHNwbGl0UGhvbmUgPSB0aGlzLnN0dWRlbnRFZGl0LnBob25lLnNwbGl0KCcgJyk7XHJcbiAgICBpZiAodGhpcy5zdHVkZW50RWRpdC5waG9uZS5pbmRleE9mKCcrMScpICE9PSAtMSkge1xyXG4gICAgICB0aGlzLmxvbmcxID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zdHVkZW50RWRpdC5waG9uZSA9IHNwbGl0UGhvbmVbMV0gKyBcIiBcIiArIHNwbGl0UGhvbmVbMl07XHJcbiAgICAgIGlmIChzcGxpdFBob25lWzNdID09PSAnSG9tZScpIHtcclxuICAgICAgICB0aGlzLnBob25lMSA9IGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGhvbmUxID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sb25nMSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN0dWRlbnRFZGl0LnBob25lID0gc3BsaXRQaG9uZVswXSArIFwiIFwiICsgc3BsaXRQaG9uZVsxXTtcclxuICAgICAgaWYgKHNwbGl0UGhvbmVbMl0gPT09ICdIb21lJykge1xyXG4gICAgICAgIHRoaXMucGhvbmUxID0gZmFsc2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5waG9uZTEgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgc3BsaXRBbHRlcm5hdGUgPSB0aGlzLnN0dWRlbnRFZGl0LmFsdGVybmF0ZU51bWJlci5zcGxpdCgnICcpO1xyXG4gICAgaWYgKHRoaXMuc3R1ZGVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyLmluZGV4T2YoJysxJykgIT09IC0xKSB7XHJcbiAgICAgIHRoaXMubG9uZzIgPSB0cnVlO1xyXG4gICAgICB0aGlzLnN0dWRlbnRFZGl0LmFsdGVybmF0ZU51bWJlciA9IHNwbGl0QWx0ZXJuYXRlWzFdICsgXCIgXCIgKyBzcGxpdEFsdGVybmF0ZVsyXTtcclxuICAgICAgaWYgKHNwbGl0QWx0ZXJuYXRlWzNdID09PSAnSG9tZScpIHtcclxuICAgICAgICB0aGlzLnBob25lMiA9IGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGhvbmUyID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sb25nMiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN0dWRlbnRFZGl0LmFsdGVybmF0ZU51bWJlciA9IHNwbGl0QWx0ZXJuYXRlWzBdICsgXCIgXCIgKyBzcGxpdEFsdGVybmF0ZVsxXTtcclxuICAgICAgaWYgKHNwbGl0QWx0ZXJuYXRlWzJdID09PSAnSG9tZScpIHtcclxuICAgICAgICB0aGlzLnBob25lMiA9IGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGhvbmUyID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5zaG93R2VuZXJhbCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaG93R2VuZXJhbEluZm9FZGl0ID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUdlbmVyYWxJbmZvKCkge1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnVXBkYXRpbmcuLi4nXHJcbiAgICB9KTtcclxuICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgIHZhciBwaG9uZVNwbGl0ID0gdGhpcy5zdHVkZW50RWRpdC5waG9uZS5zcGxpdCgnICcpO1xyXG4gICAgdGhpcy5zdHVkZW50RWRpdC5waG9uZSA9IHBob25lU3BsaXRbMF0gKyBcIiBcIiArIHBob25lU3BsaXRbMV07XHJcbiAgICBpZiAodGhpcy5waG9uZTEgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5zdHVkZW50RWRpdC5waG9uZSA9IHRoaXMuc3R1ZGVudEVkaXQucGhvbmUgKyBcIiBDZWxsXCI7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucGhvbmUxID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLnN0dWRlbnRFZGl0LnBob25lID0gdGhpcy5zdHVkZW50RWRpdC5waG9uZSArIFwiIEhvbWVcIjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmxvbmcxID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuc3R1ZGVudEVkaXQucGhvbmUgPSBcIisxIFwiICsgdGhpcy5zdHVkZW50RWRpdC5waG9uZTtcclxuICAgIH1cclxuICAgIHZhciBhbHRlcm5hdGVTcGxpdCA9IHRoaXMuc3R1ZGVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyLnNwbGl0KCcgJyk7XHJcbiAgICB0aGlzLnN0dWRlbnRFZGl0LmFsdGVybmF0ZU51bWJlciA9IGFsdGVybmF0ZVNwbGl0WzBdICsgXCIgXCIgKyBhbHRlcm5hdGVTcGxpdFsxXTtcclxuICAgIGlmICh0aGlzLnBob25lMiA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLnN0dWRlbnRFZGl0LmFsdGVybmF0ZU51bWJlciA9IHRoaXMuc3R1ZGVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyICsgXCIgQ2VsbFwiO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnBob25lMiA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5zdHVkZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgPSB0aGlzLnN0dWRlbnRFZGl0LmFsdGVybmF0ZU51bWJlciArIFwiIEhvbWVcIjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmxvbmcyID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuc3R1ZGVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyID0gXCIrMSBcIiArIHRoaXMuc3R1ZGVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAudXBkYXRlR2VuZXJhbEluZm8odGhpcy5zdHVkZW50RWRpdClcclxuICAgICAgLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgaWYgKCh1c2VyIGFzIGFueSkucmVzdWx0ID09PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoKHVzZXIgYXMgYW55KSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgodXNlciBhcyBhbnkpLm1zZyA9PT0gXCJVc2VybmFtZSBpcyBhbHJlYWR5IGluIHVzZS5cIikge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ1VzZXJuYW1lIHRha2VuJyxcclxuICAgICAgICAgICAgJ1BsZWFzZSBlbnRlciBhIGRpZmZlcmVudCB1c2VybmFtZS4nLFxyXG4gICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgodXNlciBhcyBhbnkpLm1zZyA9PT0gXCJFbWFpbCBpcyBhbHJlYWR5IGluIHVzZS5cIikge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0VtYWlsIGluIHVzZScsXHJcbiAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBkaWZmZXJlbnQgZW1haWwuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHVzZXIgYXMgYW55KS5tc2cgPT09IFwiSW5jb3JyZWN0IGVtYWlsIGZvcm1hdC5cIikge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0luY29ycmVjdCBlbWFpbCBmb3JtYXQnLFxyXG4gICAgICAgICAgICAnUGxlYXNlIGVudGVyIGEgcHJvcGVyIGVtYWlsLicsXHJcbiAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCh1c2VyIGFzIGFueSkucmVzdWx0ID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgKHVzZXIgYXMgYW55KS50aXRsZSxcclxuICAgICAgICAgICAgKHVzZXIgYXMgYW55KS5tc2csXHJcbiAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHRoaXMuZ2V0U3R1ZGVudHMoKTtcclxuICAgICAgICAgIHRoaXMuc2hvd0dlbmVyYWxJbmZvRWRpdCA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5zaG93R2VuZXJhbCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKTtcclxuICB9XHJcblxyXG4gIGFsbG93Q2xpZW50VG9FZGl0KHN0dWRlbnQsIHBlcm1pc3Npb24pIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdyYW50Q29uc2VudEVkaXRQZXJtaXNzaW9uKHN0dWRlbnQsIHBlcm1pc3Npb24pXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdncmFudGVkJykge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50Vmlldy5lZGl0Q29uc2VudFJlcXVlc3QgPSBmYWxzZTtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdTdHVkZW50IEFjY2VzcyBHcmFudGVkJyxcclxuICAgICAgICAgICAgJ1N0dWRlbnQgd2lsbCBiZSBzZW50IGFuIGVtYWlsIGluZm9ybWluZyB0aGF0IHRoZXkgY2FuIG5vdyBlZGl0IGNvbmVzbnQuJyxcclxuICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2RlbmllZCcpIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudFZpZXcuZWRpdENvbnNlbnRSZXF1ZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnU3R1ZGVudCBBY2Nlc3MgRGVuaWVkJyxcclxuICAgICAgICAgICAgJ1N0dWRlbnQgd2lsbCBiZSBzZW50IGFuIGVtYWlsIGluZm9ybWluZyB0aGF0IHRoZXkgY2FuIE5PVCBlZGl0IGNvbmVzbnQuJyxcclxuICAgICAgICAgICAgJ2RhbmdlcidcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pLmNhdGNoKCk7XHJcbiAgfVxyXG5cclxuICBvblNlbGVjdENoYW5nZShldmVudCkge1xyXG4gICAgdmFyIGNvbnNlbnRGb3JtID0gdGhpcy5nZXRDb25zZW50Rm9ybUJ5Q29uc2VudElEKHRoaXMuc2VsZWN0ZWRDb25zZW50Rm9ybSk7XHJcbiAgICB0aGlzLmNvbnNlbnRWaWV3ID0gY29uc2VudEZvcm1bMF07XHJcbiAgfVxyXG5cclxuICBnZXRDb25zZW50Rm9ybUJ5Q29uc2VudElEKGlkKSB7XHJcbiAgICBpZCA9ICtpZDtcclxuICAgIHZhciBjb25zZW50Rm9ybSA9IHRoaXMuY29uc2VudEZvcm1zLmZpbHRlcih4ID0+IHguY29uc2VudElEID09PSBpZCk7XHJcbiAgICByZXR1cm4gY29uc2VudEZvcm07XHJcbiAgfVxyXG5cclxuICByZXNldFZpZXcoKSB7XHJcbiAgICB0aGlzLnN0dWRlbnRDb3Vyc2VzVmlldyA9IG51bGw7XHJcbiAgICB0aGlzLnNob3dBc3Nlc3NtZW50UmVzdWx0cyA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaG93R2VuZXJhbEluZm9FZGl0ID0gZmFsc2U7XHJcbiAgICB0aGlzLnN0dWRlbnRJbmZvVmlldyA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaG93R2VuZXJhbCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaG93U3VpdGFiaWxpdHkgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0NvbnNlbnQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0xlYXJuaW5nU3R5bGUgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0ZpbGVzID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICB2aWV3QXNzZXNzbWVudFJlc3VsdHMoc3R1ZGVudCkge1xyXG4gICAgdGhpcy52aWV3SW5mbyhzdHVkZW50KTtcclxuICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICB0aGlzLnN0dWRlbnRJbmZvVmlldyA9IHRydWU7XHJcbiAgICB0aGlzLnN0dWRlbnRWaWV3ID0gc3R1ZGVudDtcclxuICAgIHRoaXMuc2hvd0Fzc2Vzc21lbnRSZXN1bHRzID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGFkZEFzc2Vzc21lbnRSZXN1bHRzKHVzZXJJRCkge1xyXG4gICAgdGhpcy5hc3Nlc3NtZW50UmVzdWx0cy51c2VySUQgPSB1c2VySUQ7XHJcbiAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgLmFkZEFzc2Vzc21lbnRSZXN1bHRzKHRoaXMuYXNzZXNzbWVudFJlc3VsdHMpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLnRpdGxlLFxyXG4gICAgICAgICAgICAocmVzdWx0IGFzIGFueSkubXNnLFxyXG4gICAgICAgICAgICAocmVzdWx0IGFzIGFueSkucmVzdWx0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpcy5yZXNldFZpZXcoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGVkaXRBc3Nlc3NtZW50UmVzdWx0cyh1c2VySUQpIHtcclxuICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAuZWRpdEFzc2Vzc21lbnRSZXN1bHRzKHRoaXMuYXNzZXNzbWVudFJlc3VsdHMpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLnRpdGxlLFxyXG4gICAgICAgICAgICAocmVzdWx0IGFzIGFueSkubXNnLFxyXG4gICAgICAgICAgICAocmVzdWx0IGFzIGFueSkucmVzdWx0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpcy5yZXNldFZpZXcoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlFcnJvckFsZXJ0KGVycm9yKSB7XHJcbiAgICBzd2FsKFxyXG4gICAgICBlcnJvci50aXRsZSxcclxuICAgICAgZXJyb3IubXNnLFxyXG4gICAgICAnZXJyb3InXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=
