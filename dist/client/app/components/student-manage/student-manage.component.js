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
        this.getFiles();
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
                this.studentInfoView = true;
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
        if (error.title === "Auth Error") {
            this.router.navigate(['/login']);
            swal(error.title, error.msg, 'info');
        }
        else {
            swal(error.title, error.msg, 'error');
        }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBaUU7QUFNakUsc0VBQW1FO0FBQ25FLDRDQUF5QztBQUN6QyxnRUFBNEQ7QUFDNUQsb0VBQWdFO0FBQ2hFLGtFQUE4RDtBQUM5RCxrRUFBOEQ7QUFDOUQsa0ZBQW9FO0FBQ3BFLGdFQUE0RDtBQVc1RCxJQUFhLHNCQUFzQixHQUFuQztJQTRDRSxZQUFvQixNQUFjLEVBQ3hCLE1BQWMsRUFDZCxZQUEwQixFQUMxQixjQUE4QixFQUM5QixhQUE0QixFQUM1QixhQUE0QixFQUM1QixXQUF3QixFQUN4QixZQUEwQjtRQVBoQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUEvQ3BDLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBV2pDLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBRTVCLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyxXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUN2QixVQUFLLEdBQVksS0FBSyxDQUFDO1FBU3ZCLDRCQUE0QjtRQUM1QixvQkFBZSxHQUFRO1lBQ3JCLHNCQUFzQixFQUFFLEtBQUs7WUFDN0IsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQztRQUNGLG1CQUFjLEdBQWEsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFF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R0FBRyxFQUNULE9BQU8sQ0FDUixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQsTUFBTTtRQUNKLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQztDQUNGLENBQUE7QUFsakJVO0lBQVIsWUFBSyxFQUFFOzhCQUFvQixxQ0FBaUI7aUVBQUM7QUFkbkMsc0JBQXNCO0lBTmxDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFdBQVcsRUFBRSwrREFBK0Q7UUFDNUUsU0FBUyxFQUFFLENBQUMsOERBQThELENBQUM7S0FDNUUsQ0FBQztxQ0E4QzRCLGVBQU07UUFDaEIsYUFBTTtRQUNBLDRCQUFZO1FBQ1YsZ0NBQWM7UUFDZiw4QkFBYTtRQUNiLDhCQUFhO1FBQ2Ysb0NBQVc7UUFDViw0QkFBWTtHQW5EekIsc0JBQXNCLENBZ2tCbEM7QUFoa0JZLHdEQUFzQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgTmdab25lLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdHVkZW50XCI7XHJcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY291cnNlXCI7XHJcbmltcG9ydCB7IENvbnNlbnRGb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb25zZW50Rm9ybVwiO1xyXG5pbXBvcnQgeyBTdWl0YWJpbGl0eUZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N1aXRhYmlsaXR5Rm9ybVwiO1xyXG5pbXBvcnQgeyBMZWFybmluZ1N0eWxlRm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvbGVhcm5pbmdTdHlsZUZvcm1cIjtcclxuaW1wb3J0IHsgQXNzZXNzbWVudFJlc3VsdHMgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2Fzc2Vzc21lbnRSZXN1bHRzXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN0YWZmU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdGFmZi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291cnNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBGaWxlc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmlsZXMuc2VydmljZVwiO1xyXG5kZWNsYXJlIHZhciBzYXZlQXM6IGFueTtcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5kZWNsYXJlIHZhciBGaWxlU2F2ZXI6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc3R1ZGVudC1tYW5hZ2UnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvc3R1ZGVudC1tYW5hZ2Uvc3R1ZGVudC1tYW5hZ2UuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU3R1ZGVudE1hbmFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgc3R1ZGVudHM6IFN0dWRlbnRbXTtcclxuICBhY3Rpdml0eTogYW55O1xyXG4gIGVycm9yOiBhbnk7XHJcbiAgc3R1ZGVudEluZm9WaWV3OiBib29sZWFuID0gZmFsc2U7XHJcbiAgc3R1ZGVudFZpZXc6IFN0dWRlbnQ7XHJcbiAgc3R1ZGVudENvdXJzZXNWaWV3OiBTdHVkZW50O1xyXG4gIHN0dWRlbnRDb3Vyc2VzOiBhbnlbXTtcclxuICB3YWl0TGlzdDogYW55W107XHJcbiAgY29uc2VudEZvcm1zOiBDb25zZW50Rm9ybVtdO1xyXG4gIGNvbnNlbnRWaWV3OiBDb25zZW50Rm9ybTtcclxuICBzZWxlY3RlZENvbnNlbnRGb3JtOiBzdHJpbmc7XHJcbiAgc3VpdGFiaWxpdHlWaWV3OiBTdWl0YWJpbGl0eUZvcm07XHJcbiAgbGVhcm5pbmdTdHlsZVZpZXc6IExlYXJuaW5nU3R5bGVGb3JtO1xyXG4gIEBJbnB1dCgpIGFzc2Vzc21lbnRSZXN1bHRzOiBBc3Nlc3NtZW50UmVzdWx0cztcclxuICBzaG93R2VuZXJhbDogYm9vbGVhbiA9IHRydWU7XHJcbiAgc3R1ZGVudEVkaXQ6IFN0dWRlbnQ7XHJcbiAgc2hvd0dlbmVyYWxJbmZvRWRpdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHBob25lMTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHBob25lMjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGxvbmcxOiBib29sZWFuID0gZmFsc2U7XHJcbiAgbG9uZzI6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgc2hvd1N1aXRhYmlsaXR5OiBib29sZWFuO1xyXG4gIHNob3dDb25zZW50OiBib29sZWFuO1xyXG4gIHNob3dMZWFybmluZ1N0eWxlOiBib29sZWFuO1xyXG4gIHNob3dGaWxlczogYm9vbGVhbjtcclxuICBzaG93QXNzZXNzbWVudFJlc3VsdHM6IGJvb2xlYW47XHJcbiAgZWRpdEFzc2Vzc21lbnQ6IGJvb2xlYW47XHJcblxyXG4gIC8vYmFyIGNoYXJ0IChsZWFybmluZyBzdHlsZSlcclxuICBiYXJDaGFydE9wdGlvbnM6IGFueSA9IHtcclxuICAgIHNjYWxlU2hvd1ZlcnRpY2FsTGluZXM6IGZhbHNlLFxyXG4gICAgcmVzcG9uc2l2ZTogdHJ1ZVxyXG4gIH07XHJcbiAgYmFyQ2hhcnRMYWJlbHM6IHN0cmluZ1tdID0gWydIZWFyaW5nJywgJ1NlZWluZycsICdEb2luZyddO1xyXG4gIGJhckNoYXJ0VHlwZTogc3RyaW5nID0gJ2Jhcic7XHJcbiAgYmFyQ2hhcnRMZWdlbmQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBiYXJDaGFydERhdGE6IGFueTtcclxuICBiYXJDaGFydENvbG9yczogYW55W10gPSBbeyBiYWNrZ3JvdW5kQ29sb3I6IFtcIiNGRjQyMDdcIiwgXCIjRjdDRTNDXCIsIFwiIzYyQTc0NFwiXSB9XTtcclxuXHJcbiAgZmlsZXM6IGFueVtdO1xyXG4gIHN0dWRlbnRzRmlsZXM6IGFueVtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUgc3RhZmZTZXJ2aWNlOiBTdGFmZlNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSxcclxuICAgIHByaXZhdGUgY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSxcclxuICAgIHByaXZhdGUgY291cnNlU2VydmljZTogQ291cnNlU2VydmljZSxcclxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBmaWxlc1NlcnZpY2U6IEZpbGVzU2VydmljZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnTG9hZGluZy4uLicsXHJcbiAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICB0aGlzLmdldFN0dWRlbnRzKCk7XHJcbiAgICB0aGlzLmdldEZpbGVzKCk7XHJcbiAgfVxyXG5cclxuICBnZXRTdHVkZW50cygpIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldFN0dWRlbnRzKClcclxuICAgICAgLnRoZW4oc3R1ZGVudHMgPT4ge1xyXG4gICAgICAgIGlmICgoc3R1ZGVudHMgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudHMgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChzdHVkZW50cyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudHMgPSBzdHVkZW50cztcclxuICAgICAgICAgIGZvciAobGV0IHN0dWRlbnQgb2YgdGhpcy5zdHVkZW50cykge1xyXG4gICAgICAgICAgICBzdHVkZW50LmZ1bGxOYW1lID0gc3R1ZGVudC5maXJzdE5hbWUgKyBcIiBcIiArIHN0dWRlbnQubGFzdE5hbWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGdldEZpbGVzKCkge1xyXG4gICAgdGhpcy5maWxlc1NlcnZpY2VcclxuICAgICAgLmdldEZpbGVzKClcclxuICAgICAgLnRoZW4oZmlsZXMgPT4ge1xyXG4gICAgICAgIHRoaXMuZmlsZXMgPSBmaWxlcztcclxuICAgICAgICBmb3IgKGxldCBmaWxlIG9mIHRoaXMuZmlsZXMpIHtcclxuICAgICAgICAgIGZpbGUudXNlcklEID0gK2ZpbGUudXNlcklEO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldFNpdGVBY3Rpdml0eSgpO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGdldFNpdGVBY3Rpdml0eSgpIHtcclxuICAgIHRoaXMuc3RhZmZTZXJ2aWNlXHJcbiAgICAgIC5nZXRTaXRlQWN0aXZpdHkoKVxyXG4gICAgICAudGhlbihyZXN1bHRzID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdHMgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuYWN0aXZpdHkgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5hY3Rpdml0eSA9IHJlc3VsdHMuZmlsdGVyKHggPT4geC50eXBlID09PSAnc2NoZWR1bGVkRW1haWxzJyk7XHJcbiAgICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGRvd25sb2FkKGZpbGUpIHtcclxuICAgIHZhciBmaWxlbmFtZSA9IGZpbGUubWlsbGlzZWNvbmRzICsgXCJfXCIgKyBmaWxlLnVzZXJJRCArIFwiX1wiICsgZmlsZS5maWxlbmFtZTtcclxuICAgIHRoaXMuZmlsZXNTZXJ2aWNlXHJcbiAgICAgIC5kb3dubG9hZChmaWxlbmFtZSlcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIHZhciBibG9iID0gbmV3IEJsb2IoW3Jlc3BvbnNlXSwgeyB0eXBlOiBcImFwcGxpY2F0aW9uL3BkZlwiIH0pO1xyXG4gICAgICAgIC8vY2hhbmdlIGRvd25sb2FkLnBkZiB0byB0aGUgbmFtZSBvZiB3aGF0ZXZlciB5b3Ugd2FudCB5b3VyIGZpbGUgdG8gYmVcclxuICAgICAgICBzYXZlQXMoYmxvYiwgZmlsZS5maWxlbmFtZSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBkZWxldGVGaWxlQWxlcnQoZmlsZSkge1xyXG4gICAgdmFyIGZpbGVuYW1lID0gZmlsZS5taWxsaXNlY29uZHMgKyBcIl9cIiArIGZpbGUudXNlcklEICsgXCJfXCIgKyBmaWxlLmZpbGVuYW1lO1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnRGVsZXRlIGZpbGUgKCcgKyBmaWxlLmZpbGVuYW1lICsgJyk/JyxcclxuICAgICAgdGV4dDogXCJZb3Ugd29uJ3QgYmUgYWJsZSB0byByZXZlcnQgdGhpcyFcIixcclxuICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIGRlbGV0ZSBpdCEnXHJcbiAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhpc0NvbmZpcm0uZGlzbWlzcyk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgdGhpcy5kZWxldGVGaWxlKGZpbGVuYW1lKTtcclxuICAgICAgfVxyXG4gICAgfSkuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlRmlsZShmaWxlbmFtZSkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB0aGlzLmZpbGVzU2VydmljZVxyXG4gICAgICAuZGVsZXRlKGZpbGVuYW1lKVxyXG4gICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2V0RmlsZXMoKTtcclxuICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgJ0RlbGV0ZWQhJyxcclxuICAgICAgICAgICdGaWxlIGhhcyBiZWVuIGRlbGV0ZWQuJyxcclxuICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBhZGRGaWxlKCkge1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZmlsZS11cGxvYWQnXSk7XHJcbiAgfVxyXG5cclxuICBhcmNoaXZlQWxlcnQoc3R1ZGVudDogU3R1ZGVudCwgZXZlbnQ6IGFueSkge1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnQXJjaGl2ZSBzdHVkZW50ICgnICsgc3R1ZGVudC5maXJzdE5hbWUgKyAnICcgKyBzdHVkZW50Lmxhc3ROYW1lICsgJyknLFxyXG4gICAgICB0ZXh0OiBcIkFyZSB5b3Ugc3VyZSB3YW50IHRvIGRvIHRoaXM/XCIsXHJcbiAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBBcmNoaXZlISdcclxuICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICB0aGlzLmFyY2hpdmVTdHVkZW50KHN0dWRlbnQsIGV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFyY2hpdmVTdHVkZW50KHN0dWRlbnQsIGV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5hcmNoaXZlU3R1ZGVudChzdHVkZW50KVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KS50aXRsZSxcclxuICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLm1zZyxcclxuICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLnJlc3VsdFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHRoaXMuZ2V0U3R1ZGVudHMoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIGdvVG9TdHVkZW50QXJjaGl2ZSgpIHtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3N0dWRlbnQtYXJjaGl2ZSddKTtcclxuICB9XHJcblxyXG4gIHBvcHVsYXRlUFJGKHN0dWRlbnQpIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLnBvcHVsYXRlUFJGKHN0dWRlbnQudXNlcklEKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdTb3JyeS4uLicsXHJcbiAgICAgICAgICAgICdUaGlzIGZlYXR1cmUgaXMgbm90IHlldCBhdmFpbGFibGUnLFxyXG4gICAgICAgICAgICAnaW5mbydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICB2aWV3SW5mbyhzdHVkZW50OiBTdHVkZW50KSB7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdMb2FkaW5nLi4uJ1xyXG4gICAgfSk7XHJcbiAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICB0aGlzLnJlc2V0VmlldygpO1xyXG4gICAgdGhpcy5zaG93R2VuZXJhbCA9IHRydWU7XHJcbiAgICB0aGlzLnN0dWRlbnRJbmZvVmlldyA9IHRydWU7XHJcbiAgICB0aGlzLnN0dWRlbnRWaWV3ID0gc3R1ZGVudDtcclxuICAgIHRoaXMuc3R1ZGVudHNGaWxlcyA9IHRoaXMuZmlsZXMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IHRoaXMuc3R1ZGVudFZpZXcudXNlcklEKTtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldEFsbEZvcm1zQnlJRChzdHVkZW50KVxyXG4gICAgICAudGhlbihmb3JtcyA9PiB7XHJcbiAgICAgICAgaWYgKChmb3JtcyBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5jb25zZW50VmlldyA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmxlYXJuaW5nU3R5bGVWaWV3ID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuc3VpdGFiaWxpdHlWaWV3ID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoZm9ybXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtcyA9IGZvcm1zLmNvbnNlbnRGb3JtO1xyXG4gICAgICAgICAgdGhpcy5sZWFybmluZ1N0eWxlVmlldyA9IGZvcm1zLmxlYXJuaW5nU3R5bGVGb3JtWzBdO1xyXG4gICAgICAgICAgdGhpcy5zdWl0YWJpbGl0eVZpZXcgPSBmb3Jtcy5zdWl0YWJpbGl0eUZvcm1bMF07XHJcbiAgICAgICAgICB2YXIgaXNFbXB0eSA9IChmb3Jtcy5hc3Nlc3NtZW50UmVzdWx0cyB8fCBbXSkubGVuZ3RoID09PSAwO1xyXG4gICAgICAgICAgaWYgKGlzRW1wdHkpIHtcclxuICAgICAgICAgICAgdGhpcy5lZGl0QXNzZXNzbWVudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmFzc2Vzc21lbnRSZXN1bHRzID0gbmV3IEFzc2Vzc21lbnRSZXN1bHRzKCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmVkaXRBc3Nlc3NtZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hc3Nlc3NtZW50UmVzdWx0cyA9IGZvcm1zLmFzc2Vzc21lbnRSZXN1bHRzWzBdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5iYXJDaGFydERhdGEgPSBbeyBkYXRhOiBbdGhpcy5sZWFybmluZ1N0eWxlVmlldy5oZWFyaW5nLCB0aGlzLmxlYXJuaW5nU3R5bGVWaWV3LnNlZWluZywgdGhpcy5sZWFybmluZ1N0eWxlVmlldy5kb2luZ10gfV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICB2aWV3Q291cnNlcyhzdHVkZW50OiBTdHVkZW50KSB7XHJcbiAgICB2YXIgdXNlcklEID0gc3R1ZGVudC51c2VySUQ7XHJcbiAgICB0aGlzLnJlc2V0VmlldygpO1xyXG4gICAgdGhpcy5zdHVkZW50Q291cnNlc1ZpZXcgPSBzdHVkZW50O1xyXG4gICAgdGhpcy5nZXRUaW1ldGFibGVCeUlkKHVzZXJJRCk7XHJcbiAgICB0aGlzLmdldFdhaXRMaXN0QnlJZCh1c2VySUQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGltZXRhYmxlQnlJZCh1c2VySUQpIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldEV2ZW50c0J5SWQodXNlcklEKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgICB0aGlzLnN0dWRlbnRDb3Vyc2VzID0gbnVsbDtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50Q291cnNlcyA9IG51bGw7XHJcbiAgICAgICAgICAvLyBzd2FsKFxyXG4gICAgICAgICAgLy8gICAgIHJlc3VsdC50aXRsZSxcclxuICAgICAgICAgIC8vICAgICByZXN1bHQubXNnLFxyXG4gICAgICAgICAgLy8gICAgICdpbmZvJ1xyXG4gICAgICAgICAgLy8gKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50Q291cnNlcyA9IHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGdldHRpbmcgdGltZXRhYmxlIGJ5IGlkXCIpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFdhaXRMaXN0QnlJZCh1c2VySUQpIHtcclxuICAgIHRoaXMud2FpdExpc3QgPSBudWxsO1xyXG5cclxuICAgIHRoaXMuY291cnNlU2VydmljZVxyXG4gICAgICAuZ2V0V2FpdExpc3RCeUlkKHVzZXJJRClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgICAgdGhpcy53YWl0TGlzdCA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMud2FpdExpc3QgPSByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvciAtIEdldCB3YWl0IGxpc3QgYnkgaWQ6IFwiICsgZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIG92ZXJhbGxTdGF0dXMoKSB7XHJcbiAgICB0aGlzLnJlc2V0VmlldygpO1xyXG4gIH1cclxuXHJcbiAgc2VjdGlvbkJ0bkNsaWNrZWQoZXZlbnQsIHNlY3Rpb24pIHtcclxuICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICB0aGlzLnN0dWRlbnRJbmZvVmlldyA9IHRydWU7XHJcbiAgICBpZiAoc2VjdGlvbiA9PT0gXCJnZW5lcmFsXCIpIHtcclxuICAgICAgdGhpcy5zaG93R2VuZXJhbCA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHNlY3Rpb24gPT09IFwic3VpdGFiaWxpdHlcIikge1xyXG4gICAgICB0aGlzLnNob3dTdWl0YWJpbGl0eSA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHNlY3Rpb24gPT09IFwiY29uc2VudFwiKSB7XHJcbiAgICAgIHRoaXMuc2hvd0NvbnNlbnQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChzZWN0aW9uID09PSBcImxlYXJuaW5nU3R5bGVcIikge1xyXG4gICAgICB0aGlzLnNob3dMZWFybmluZ1N0eWxlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAoc2VjdGlvbiA9PT0gXCJmaWxlc1wiKSB7XHJcbiAgICAgIHRoaXMuc2hvd0ZpbGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVkaXRHZW5lcmFsSW5mbyhzdHVkZW50KSB7XHJcbiAgICB0aGlzLnN0dWRlbnRFZGl0ID0gc3R1ZGVudDtcclxuICAgIHZhciBzcGxpdFBob25lID0gdGhpcy5zdHVkZW50RWRpdC5waG9uZS5zcGxpdCgnICcpO1xyXG4gICAgaWYgKHRoaXMuc3R1ZGVudEVkaXQucGhvbmUuaW5kZXhPZignKzEnKSAhPT0gLTEpIHtcclxuICAgICAgdGhpcy5sb25nMSA9IHRydWU7XHJcbiAgICAgIHRoaXMuc3R1ZGVudEVkaXQucGhvbmUgPSBzcGxpdFBob25lWzFdICsgXCIgXCIgKyBzcGxpdFBob25lWzJdO1xyXG4gICAgICBpZiAoc3BsaXRQaG9uZVszXSA9PT0gJ0hvbWUnKSB7XHJcbiAgICAgICAgdGhpcy5waG9uZTEgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBob25lMSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubG9uZzEgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdHVkZW50RWRpdC5waG9uZSA9IHNwbGl0UGhvbmVbMF0gKyBcIiBcIiArIHNwbGl0UGhvbmVbMV07XHJcbiAgICAgIGlmIChzcGxpdFBob25lWzJdID09PSAnSG9tZScpIHtcclxuICAgICAgICB0aGlzLnBob25lMSA9IGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGhvbmUxID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIHNwbGl0QWx0ZXJuYXRlID0gdGhpcy5zdHVkZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIuc3BsaXQoJyAnKTtcclxuICAgIGlmICh0aGlzLnN0dWRlbnRFZGl0LmFsdGVybmF0ZU51bWJlci5pbmRleE9mKCcrMScpICE9PSAtMSkge1xyXG4gICAgICB0aGlzLmxvbmcyID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zdHVkZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgPSBzcGxpdEFsdGVybmF0ZVsxXSArIFwiIFwiICsgc3BsaXRBbHRlcm5hdGVbMl07XHJcbiAgICAgIGlmIChzcGxpdEFsdGVybmF0ZVszXSA9PT0gJ0hvbWUnKSB7XHJcbiAgICAgICAgdGhpcy5waG9uZTIgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBob25lMiA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubG9uZzIgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdHVkZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgPSBzcGxpdEFsdGVybmF0ZVswXSArIFwiIFwiICsgc3BsaXRBbHRlcm5hdGVbMV07XHJcbiAgICAgIGlmIChzcGxpdEFsdGVybmF0ZVsyXSA9PT0gJ0hvbWUnKSB7XHJcbiAgICAgICAgdGhpcy5waG9uZTIgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBob25lMiA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc2hvd0dlbmVyYWwgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0dlbmVyYWxJbmZvRWRpdCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVHZW5lcmFsSW5mbygpIHtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ1VwZGF0aW5nLi4uJ1xyXG4gICAgfSk7XHJcbiAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICB2YXIgcGhvbmVTcGxpdCA9IHRoaXMuc3R1ZGVudEVkaXQucGhvbmUuc3BsaXQoJyAnKTtcclxuICAgIHRoaXMuc3R1ZGVudEVkaXQucGhvbmUgPSBwaG9uZVNwbGl0WzBdICsgXCIgXCIgKyBwaG9uZVNwbGl0WzFdO1xyXG4gICAgaWYgKHRoaXMucGhvbmUxID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuc3R1ZGVudEVkaXQucGhvbmUgPSB0aGlzLnN0dWRlbnRFZGl0LnBob25lICsgXCIgQ2VsbFwiO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnBob25lMSA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5zdHVkZW50RWRpdC5waG9uZSA9IHRoaXMuc3R1ZGVudEVkaXQucGhvbmUgKyBcIiBIb21lXCI7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5sb25nMSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLnN0dWRlbnRFZGl0LnBob25lID0gXCIrMSBcIiArIHRoaXMuc3R1ZGVudEVkaXQucGhvbmU7XHJcbiAgICB9XHJcbiAgICB2YXIgYWx0ZXJuYXRlU3BsaXQgPSB0aGlzLnN0dWRlbnRFZGl0LmFsdGVybmF0ZU51bWJlci5zcGxpdCgnICcpO1xyXG4gICAgdGhpcy5zdHVkZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgPSBhbHRlcm5hdGVTcGxpdFswXSArIFwiIFwiICsgYWx0ZXJuYXRlU3BsaXRbMV07XHJcbiAgICBpZiAodGhpcy5waG9uZTIgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5zdHVkZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgPSB0aGlzLnN0dWRlbnRFZGl0LmFsdGVybmF0ZU51bWJlciArIFwiIENlbGxcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5waG9uZTIgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuc3R1ZGVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyID0gdGhpcy5zdHVkZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgKyBcIiBIb21lXCI7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5sb25nMiA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLnN0dWRlbnRFZGl0LmFsdGVybmF0ZU51bWJlciA9IFwiKzEgXCIgKyB0aGlzLnN0dWRlbnRFZGl0LmFsdGVybmF0ZU51bWJlcjtcclxuICAgIH1cclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLnVwZGF0ZUdlbmVyYWxJbmZvKHRoaXMuc3R1ZGVudEVkaXQpXHJcbiAgICAgIC50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgIGlmICgodXNlciBhcyBhbnkpLnJlc3VsdCA9PT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KCh1c2VyIGFzIGFueSkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHVzZXIgYXMgYW55KS5tc2cgPT09IFwiVXNlcm5hbWUgaXMgYWxyZWFkeSBpbiB1c2UuXCIpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdVc2VybmFtZSB0YWtlbicsXHJcbiAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBkaWZmZXJlbnQgdXNlcm5hbWUuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHVzZXIgYXMgYW55KS5tc2cgPT09IFwiRW1haWwgaXMgYWxyZWFkeSBpbiB1c2UuXCIpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdFbWFpbCBpbiB1c2UnLFxyXG4gICAgICAgICAgICAnUGxlYXNlIGVudGVyIGEgZGlmZmVyZW50IGVtYWlsLicsXHJcbiAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCh1c2VyIGFzIGFueSkubXNnID09PSBcIkluY29ycmVjdCBlbWFpbCBmb3JtYXQuXCIpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdJbmNvcnJlY3QgZW1haWwgZm9ybWF0JyxcclxuICAgICAgICAgICAgJ1BsZWFzZSBlbnRlciBhIHByb3BlciBlbWFpbC4nLFxyXG4gICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgodXNlciBhcyBhbnkpLnJlc3VsdCA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICh1c2VyIGFzIGFueSkudGl0bGUsXHJcbiAgICAgICAgICAgICh1c2VyIGFzIGFueSkubXNnLFxyXG4gICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB0aGlzLmdldFN0dWRlbnRzKCk7XHJcbiAgICAgICAgICB0aGlzLnNob3dHZW5lcmFsSW5mb0VkaXQgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuc2hvd0dlbmVyYWwgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50SW5mb1ZpZXcgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKCk7XHJcbiAgfVxyXG5cclxuICBhbGxvd0NsaWVudFRvRWRpdChzdHVkZW50LCBwZXJtaXNzaW9uKSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5ncmFudENvbnNlbnRFZGl0UGVybWlzc2lvbihzdHVkZW50LCBwZXJtaXNzaW9uKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZ3JhbnRlZCcpIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudFZpZXcuZWRpdENvbnNlbnRSZXF1ZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnU3R1ZGVudCBBY2Nlc3MgR3JhbnRlZCcsXHJcbiAgICAgICAgICAgICdTdHVkZW50IHdpbGwgYmUgc2VudCBhbiBlbWFpbCBpbmZvcm1pbmcgdGhhdCB0aGV5IGNhbiBub3cgZWRpdCBjb25lc250LicsXHJcbiAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdkZW5pZWQnKSB7XHJcbiAgICAgICAgICB0aGlzLnN0dWRlbnRWaWV3LmVkaXRDb25zZW50UmVxdWVzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ1N0dWRlbnQgQWNjZXNzIERlbmllZCcsXHJcbiAgICAgICAgICAgICdTdHVkZW50IHdpbGwgYmUgc2VudCBhbiBlbWFpbCBpbmZvcm1pbmcgdGhhdCB0aGV5IGNhbiBOT1QgZWRpdCBjb25lc250LicsXHJcbiAgICAgICAgICAgICdkYW5nZXInXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KS5jYXRjaCgpO1xyXG4gIH1cclxuXHJcbiAgb25TZWxlY3RDaGFuZ2UoZXZlbnQpIHtcclxuICAgIHZhciBjb25zZW50Rm9ybSA9IHRoaXMuZ2V0Q29uc2VudEZvcm1CeUNvbnNlbnRJRCh0aGlzLnNlbGVjdGVkQ29uc2VudEZvcm0pO1xyXG4gICAgdGhpcy5jb25zZW50VmlldyA9IGNvbnNlbnRGb3JtWzBdO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29uc2VudEZvcm1CeUNvbnNlbnRJRChpZCkge1xyXG4gICAgaWQgPSAraWQ7XHJcbiAgICB2YXIgY29uc2VudEZvcm0gPSB0aGlzLmNvbnNlbnRGb3Jtcy5maWx0ZXIoeCA9PiB4LmNvbnNlbnRJRCA9PT0gaWQpO1xyXG4gICAgcmV0dXJuIGNvbnNlbnRGb3JtO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRWaWV3KCkge1xyXG4gICAgdGhpcy5zdHVkZW50Q291cnNlc1ZpZXcgPSBudWxsO1xyXG4gICAgdGhpcy5zaG93QXNzZXNzbWVudFJlc3VsdHMgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0dlbmVyYWxJbmZvRWRpdCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zdHVkZW50SW5mb1ZpZXcgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0dlbmVyYWwgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICB0aGlzLnNob3dDb25zZW50ID0gZmFsc2U7XHJcbiAgICB0aGlzLnNob3dMZWFybmluZ1N0eWxlID0gZmFsc2U7XHJcbiAgICB0aGlzLnNob3dGaWxlcyA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgdmlld0Fzc2Vzc21lbnRSZXN1bHRzKHN0dWRlbnQpIHtcclxuICAgIHRoaXMudmlld0luZm8oc3R1ZGVudCk7XHJcbiAgICB0aGlzLnJlc2V0VmlldygpO1xyXG4gICAgdGhpcy5zdHVkZW50SW5mb1ZpZXcgPSB0cnVlO1xyXG4gICAgdGhpcy5zdHVkZW50VmlldyA9IHN0dWRlbnQ7XHJcbiAgICB0aGlzLnNob3dBc3Nlc3NtZW50UmVzdWx0cyA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBhZGRBc3Nlc3NtZW50UmVzdWx0cyh1c2VySUQpIHtcclxuICAgIHRoaXMuYXNzZXNzbWVudFJlc3VsdHMudXNlcklEID0gdXNlcklEO1xyXG4gICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgIC5hZGRBc3Nlc3NtZW50UmVzdWx0cyh0aGlzLmFzc2Vzc21lbnRSZXN1bHRzKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KS50aXRsZSxcclxuICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLm1zZyxcclxuICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLnJlc3VsdFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBlZGl0QXNzZXNzbWVudFJlc3VsdHModXNlcklEKSB7XHJcbiAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgLmVkaXRBc3Nlc3NtZW50UmVzdWx0cyh0aGlzLmFzc2Vzc21lbnRSZXN1bHRzKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KS50aXRsZSxcclxuICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLm1zZyxcclxuICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLnJlc3VsdFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5RXJyb3JBbGVydChlcnJvcikge1xyXG4gICAgaWYgKGVycm9yLnRpdGxlID09PSBcIkF1dGggRXJyb3JcIikge1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sb2dpbiddKTtcclxuICAgICAgc3dhbChcclxuICAgICAgICBlcnJvci50aXRsZSxcclxuICAgICAgICBlcnJvci5tc2csXHJcbiAgICAgICAgJ2luZm8nXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzd2FsKFxyXG4gICAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICAgIGVycm9yLm1zZyxcclxuICAgICAgICAnZXJyb3InXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
