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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var student_service_1 = require("../../services/student.service");
var course_service_1 = require("../../services/course.service");
var authentication_service_1 = require("../../services/authentication.service");
var files_service_1 = require("../../services/files.service");
var StudentManageComponent = /** @class */ (function () {
    function StudentManageComponent(router, ngZone, studentService, courseService, authService, filesService) {
        this.router = router;
        this.ngZone = ngZone;
        this.studentService = studentService;
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
        this.barChartColors = [{ backgroundColor: ["#FF4207", "#F8E903", "#2AD308"] }];
    }
    StudentManageComponent.prototype.ngOnInit = function () {
        this.getStudents();
        this.getFiles();
    };
    StudentManageComponent.prototype.getStudents = function () {
        var _this = this;
        this.studentService
            .getStudents()
            .then(function (students) {
            if (students.result === 'error') {
                _this.students = null;
                _this.displayErrorAlert(students);
            }
            else {
                _this.students = students;
                for (var _i = 0, _a = _this.students; _i < _a.length; _i++) {
                    var student = _a[_i];
                    student.fullName = student.firstName + " " + student.lastName;
                }
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    StudentManageComponent.prototype.getFiles = function () {
        var _this = this;
        this.filesService
            .getFiles()
            .then(function (files) {
            _this.files = files;
            for (var _i = 0, _a = _this.files; _i < _a.length; _i++) {
                var file = _a[_i];
                file.userID = +file.userID;
            }
            swal.close();
            console.log(_this.files);
        })
            .catch(function (error) { return error; });
    };
    StudentManageComponent.prototype.download = function (file) {
        console.log(file);
        var filename = file.milliseconds + "_" + file.userID + "_" + file.filename;
        this.filesService
            .download(filename)
            .then(function (response) {
            var blob = new Blob([response], { type: "application/pdf" });
            //change download.pdf to the name of whatever you want your file to be
            console.log(blob);
            saveAs(blob, file.filename);
        })
            .catch(function (error) { return error; });
    };
    StudentManageComponent.prototype.deleteFileAlert = function (file) {
        var _this = this;
        var filename = file.milliseconds + "_" + file.userID + "_" + file.filename;
        swal({
            title: 'Delete file (' + file.filename + ')?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (isConfirm) {
            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                console.log(isConfirm.dismiss);
            }
            else if (isConfirm) {
                _this.deleteFile(filename);
            }
        }).catch(function (error) { return error; });
    };
    StudentManageComponent.prototype.deleteFile = function (filename) {
        var _this = this;
        event.stopPropagation();
        this.filesService
            .delete(filename)
            .then(function (res) {
            _this.getFiles();
            swal('Deleted!', 'File has been deleted.', 'success');
        })
            .catch(function (error) { return error; });
    };
    StudentManageComponent.prototype.addFile = function () {
        this.router.navigate(['/file-upload']);
    };
    StudentManageComponent.prototype.archiveAlert = function (student, event) {
        var _this = this;
        swal({
            title: 'Archive student (' + student.firstName + ' ' + student.lastName + ')',
            text: "Are you sure want to do this?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Archive!'
        }).then(function (isConfirm) {
            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                console.log(isConfirm.dismiss);
            }
            else if (isConfirm) {
                _this.archiveStudent(student, event);
            }
        }).catch(function (error) {
            console.log(error);
        });
    };
    StudentManageComponent.prototype.archiveStudent = function (student, event) {
        var _this = this;
        this.studentService
            .archiveStudent(student)
            .then(function (result) {
            if (result.result === 'error') {
                _this.displayErrorAlert(result);
            }
            else if (result.result === 'success') {
                swal(result.title, result.msg, result.result);
                _this.getStudents();
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
            }
        })
            .catch(function (error) { return console.log(error); });
    };
    StudentManageComponent.prototype.goToStudentArchive = function () {
        this.router.navigate(['/student-archive']);
    };
    StudentManageComponent.prototype.populatePRF = function (student) {
        var _this = this;
        this.studentService
            .populatePRF(student.userID)
            .then(function (result) {
            if (result.result === 'error') {
                _this.displayErrorAlert(result);
            }
            else if (result.result === 'success') {
                swal('Sorry...', 'This feature is not yet available', 'info');
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
            }
        })
            .catch(function (error) { return console.log(error); });
    };
    StudentManageComponent.prototype.viewInfo = function (student) {
        var _this = this;
        swal({
            title: 'Loading...'
        });
        swal.showLoading();
        this.resetView();
        this.showGeneral = true;
        this.studentInfoView = true;
        this.studentView = student;
        this.studentsFiles = this.files.filter(function (x) { return x.userID === _this.studentView.userID; });
        this.studentService
            .getAllFormsByID(student)
            .then(function (forms) {
            if (forms.result === 'error') {
                _this.consentView = null;
                _this.learningStyleView = null;
                _this.suitabilityView = null;
                _this.displayErrorAlert(forms);
            }
            else {
                _this.consentForms = forms.consentForm;
                _this.learningStyleView = forms.learningStyleForm[0];
                _this.suitabilityView = forms.suitabilityForm[0];
                _this.barChartData = [{ data: [_this.learningStyleView.hearing, _this.learningStyleView.seeing, _this.learningStyleView.doing] }];
            }
            swal.close();
        })
            .catch(function (error) { return _this.error = error; });
    };
    StudentManageComponent.prototype.viewCourses = function (student) {
        this.resetView();
        this.studentCoursesView = student;
        this.getTimetableById(student.userID);
        this.getWaitListById(student);
    };
    StudentManageComponent.prototype.getTimetableById = function (userID) {
        var _this = this;
        this.studentService
            .getEventsById(userID)
            .then(function (result) {
            if (result.result === 'error') {
                _this.displayErrorAlert(result);
                _this.studentCourses = null;
            }
            else if (result.result === 'success') {
                _this.studentCourses = null;
                // swal(
                //     result.title,
                //     result.msg,
                //     'info'
                // );
            }
            else {
                _this.studentCourses = result;
            }
        }).catch(function (error) {
            console.log("Error getting timetable by id");
        });
    };
    StudentManageComponent.prototype.getWaitListById = function (student) {
        var _this = this;
        this.waitList = null;
        this.courseService
            .getWaitListById(student.userID)
            .then(function (result) {
            if (result.result === 'error') {
                _this.displayErrorAlert(result);
                _this.waitList = null;
            }
            else if (result.result === 'success') {
                _this.waitList = null;
                // swal(
                //     result.title,
                //     result.msg,
                //     'info'
                // );
            }
            else {
                _this.waitList = result;
            }
        })
            .catch(function (error) { return console.log("Error - Get wait list by id: " + error); });
    };
    StudentManageComponent.prototype.overallStatus = function () {
        this.resetView();
    };
    StudentManageComponent.prototype.sectionBtnClicked = function (event, section) {
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
    };
    StudentManageComponent.prototype.editGeneralInfo = function (student) {
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
    };
    StudentManageComponent.prototype.updateGeneralInfo = function () {
        var _this = this;
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
            .then(function (user) {
            if (user.result === "error") {
                _this.displayErrorAlert(user);
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
                _this.getStudents();
                _this.showGeneralInfoEdit = false;
                _this.showGeneral = true;
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'warning');
            }
        })
            .catch();
    };
    StudentManageComponent.prototype.allowClientToEdit = function (student, permission) {
        var _this = this;
        this.studentService
            .grantConsentEditPermission(student, permission)
            .then(function (result) {
            if (result.result === 'error') {
                _this.displayErrorAlert(result);
            }
            else if (result.result === 'granted') {
                _this.studentView.editConsentRequest = false;
                swal('Student Access Granted', 'Student will be sent an email informing that they can now edit conesnt.', 'success');
            }
            else if (result.result === 'denied') {
                _this.studentView.editConsentRequest = false;
                swal('Student Access Denied', 'Student will be sent an email informing that they can NOT edit conesnt.', 'danger');
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
            }
        }).catch();
    };
    StudentManageComponent.prototype.onSelectChange = function (event) {
        var consentForm = this.getConsentFormByConsentID(this.selectedConsentForm);
        this.consentView = consentForm[0];
    };
    StudentManageComponent.prototype.getConsentFormByConsentID = function (id) {
        id = +id;
        var consentForm = this.consentForms.filter(function (x) { return x.consentID === id; });
        return consentForm;
    };
    StudentManageComponent.prototype.resetView = function () {
        this.studentCoursesView = null;
        this.showGeneralInfoEdit = false;
        this.studentInfoView = false;
        this.showGeneral = false;
        this.showSuitability = false;
        this.showConsent = false;
        this.showLearningStyle = false;
        this.showFiles = false;
    };
    StudentManageComponent.prototype.displayErrorAlert = function (error) {
        swal(error.title, error.msg, 'error');
    };
    StudentManageComponent.prototype.goBack = function () {
        window.history.back();
    };
    StudentManageComponent = __decorate([
        core_1.Component({
            selector: 'student-manage',
            templateUrl: './app/components/student-manage/student-manage.component.html',
            styleUrls: ['./app/components/student-manage/student-manage.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            core_1.NgZone,
            student_service_1.StudentService,
            course_service_1.CourseService,
            authentication_service_1.AuthService,
            files_service_1.FilesService])
    ], StudentManageComponent);
    return StudentManageComponent;
}());
exports.StudentManageComponent = StudentManageComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMEQ7QUFNMUQsMENBQXlDO0FBQ3pDLGtFQUFnRTtBQUNoRSxnRUFBOEQ7QUFDOUQsZ0ZBQW9FO0FBQ3BFLDhEQUE0RDtBQVU1RDtJQXdDRSxnQ0FBb0IsTUFBYyxFQUN4QixNQUFjLEVBQ2QsY0FBOEIsRUFDOUIsYUFBNEIsRUFDNUIsV0FBd0IsRUFDeEIsWUFBMEI7UUFMaEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBMUNwQyxvQkFBZSxHQUFZLEtBQUssQ0FBQztRQVdqQyxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUU1Qix3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFDckMsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLFVBQUssR0FBWSxLQUFLLENBQUM7UUFDdkIsVUFBSyxHQUFZLEtBQUssQ0FBQztRQU12Qiw0QkFBNEI7UUFDNUIsb0JBQWUsR0FBUTtZQUNyQixzQkFBc0IsRUFBRSxLQUFLO1lBQzdCLFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUM7UUFDRixtQkFBYyxHQUFhLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxRCxpQkFBWSxHQUFXLEtBQUssQ0FBQztRQUM3QixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUVoQyxtQkFBYyxHQUFVLENBQUMsRUFBRSxlQUFlLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNB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QjtRQU5sQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixXQUFXLEVBQUUsK0RBQStEO1lBQzVFLFNBQVMsRUFBRSxDQUFDLDhEQUE4RCxDQUFDO1NBQzVFLENBQUM7eUNBMEM0QixlQUFNO1lBQ2hCLGFBQU07WUFDRSxnQ0FBYztZQUNmLDhCQUFhO1lBQ2Ysb0NBQVc7WUFDViw0QkFBWTtPQTdDekIsc0JBQXNCLENBa2VsQztJQUFELDZCQUFDO0NBbGVELEFBa2VDLElBQUE7QUFsZVksd0RBQXNCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3N0dWRlbnQtbWFuYWdlL3N0dWRlbnQtbWFuYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvdXJzZVwiO1xyXG5pbXBvcnQgeyBDb25zZW50Rm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29uc2VudEZvcm1cIjtcclxuaW1wb3J0IHsgU3VpdGFiaWxpdHlGb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdWl0YWJpbGl0eUZvcm1cIjtcclxuaW1wb3J0IHsgTGVhcm5pbmdTdHlsZUZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2xlYXJuaW5nU3R5bGVGb3JtXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb3Vyc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRmlsZXNTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ZpbGVzLnNlcnZpY2VcIjtcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5kZWNsYXJlIHZhciBGaWxlU2F2ZXI6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc3R1ZGVudC1tYW5hZ2UnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvc3R1ZGVudC1tYW5hZ2Uvc3R1ZGVudC1tYW5hZ2UuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU3R1ZGVudE1hbmFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgc3R1ZGVudHM6IFN0dWRlbnRbXTtcclxuICBlcnJvcjogYW55O1xyXG4gIHN0dWRlbnRJbmZvVmlldzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHN0dWRlbnRWaWV3OiBTdHVkZW50O1xyXG4gIHN0dWRlbnRDb3Vyc2VzVmlldzogU3R1ZGVudDtcclxuICBzdHVkZW50Q291cnNlczogYW55W107XHJcbiAgd2FpdExpc3Q6IGFueVtdO1xyXG4gIGNvbnNlbnRGb3JtczogQ29uc2VudEZvcm1bXTtcclxuICBjb25zZW50VmlldzogQ29uc2VudEZvcm07XHJcbiAgc2VsZWN0ZWRDb25zZW50Rm9ybTogc3RyaW5nO1xyXG4gIHN1aXRhYmlsaXR5VmlldzogU3VpdGFiaWxpdHlGb3JtO1xyXG4gIGxlYXJuaW5nU3R5bGVWaWV3OiBMZWFybmluZ1N0eWxlRm9ybTtcclxuXHJcbiAgc2hvd0dlbmVyYWw6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHN0dWRlbnRFZGl0OiBTdHVkZW50O1xyXG4gIHNob3dHZW5lcmFsSW5mb0VkaXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwaG9uZTE6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwaG9uZTI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBsb25nMTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGxvbmcyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgc2hvd1N1aXRhYmlsaXR5OiBib29sZWFuO1xyXG4gIHNob3dDb25zZW50OiBib29sZWFuO1xyXG4gIHNob3dMZWFybmluZ1N0eWxlOiBib29sZWFuO1xyXG4gIHNob3dGaWxlczogYm9vbGVhbjtcclxuXHJcbiAgLy9iYXIgY2hhcnQgKGxlYXJuaW5nIHN0eWxlKVxyXG4gIGJhckNoYXJ0T3B0aW9uczogYW55ID0ge1xyXG4gICAgc2NhbGVTaG93VmVydGljYWxMaW5lczogZmFsc2UsXHJcbiAgICByZXNwb25zaXZlOiB0cnVlXHJcbiAgfTtcclxuICBiYXJDaGFydExhYmVsczogc3RyaW5nW10gPSBbJ0hlYXJpbmcnLCAnU2VlaW5nJywgJ0RvaW5nJ107XHJcbiAgYmFyQ2hhcnRUeXBlOiBzdHJpbmcgPSAnYmFyJztcclxuICBiYXJDaGFydExlZ2VuZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGJhckNoYXJ0RGF0YTogYW55O1xyXG4gIGJhckNoYXJ0Q29sb3JzOiBhbnlbXSA9IFt7IGJhY2tncm91bmRDb2xvcjogW1wiI0ZGNDIwN1wiLCBcIiNGOEU5MDNcIiwgXCIjMkFEMzA4XCJdIH1dO1xyXG5cclxuICBmaWxlczogYW55W107XHJcbiAgc3R1ZGVudHNGaWxlczogYW55W107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBzdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvdXJzZVNlcnZpY2U6IENvdXJzZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgZmlsZXNTZXJ2aWNlOiBGaWxlc1NlcnZpY2UpIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZ2V0U3R1ZGVudHMoKTtcclxuICAgIHRoaXMuZ2V0RmlsZXMoKTtcclxuICB9XHJcblxyXG4gIGdldFN0dWRlbnRzKCkge1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAuZ2V0U3R1ZGVudHMoKVxyXG4gICAgICAudGhlbihzdHVkZW50cyA9PiB7XHJcbiAgICAgICAgaWYgKChzdHVkZW50cyBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50cyA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHN0dWRlbnRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50cyA9IHN0dWRlbnRzO1xyXG4gICAgICAgICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLnN0dWRlbnRzKSB7XHJcbiAgICAgICAgICAgIHN0dWRlbnQuZnVsbE5hbWUgPSBzdHVkZW50LmZpcnN0TmFtZSArIFwiIFwiICsgc3R1ZGVudC5sYXN0TmFtZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmlsZXMoKSB7XHJcbiAgICB0aGlzLmZpbGVzU2VydmljZVxyXG4gICAgICAuZ2V0RmlsZXMoKVxyXG4gICAgICAudGhlbihmaWxlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5maWxlcyA9IGZpbGVzO1xyXG4gICAgICAgIGZvciAobGV0IGZpbGUgb2YgdGhpcy5maWxlcykge1xyXG4gICAgICAgICAgZmlsZS51c2VySUQgPSArZmlsZS51c2VySUQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZpbGVzKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGRvd25sb2FkKGZpbGUpIHtcclxuICAgIGNvbnNvbGUubG9nKGZpbGUpO1xyXG4gICAgdmFyIGZpbGVuYW1lID0gZmlsZS5taWxsaXNlY29uZHMgKyBcIl9cIiArIGZpbGUudXNlcklEICsgXCJfXCIgKyBmaWxlLmZpbGVuYW1lO1xyXG4gICAgdGhpcy5maWxlc1NlcnZpY2VcclxuICAgICAgLmRvd25sb2FkKGZpbGVuYW1lKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbcmVzcG9uc2VdLCB7IHR5cGU6IFwiYXBwbGljYXRpb24vcGRmXCIgfSk7XHJcbiAgICAgICAgLy9jaGFuZ2UgZG93bmxvYWQucGRmIHRvIHRoZSBuYW1lIG9mIHdoYXRldmVyIHlvdSB3YW50IHlvdXIgZmlsZSB0byBiZVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGJsb2IpO1xyXG4gICAgICAgIHNhdmVBcyhibG9iLCBmaWxlLmZpbGVuYW1lKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUZpbGVBbGVydChmaWxlKSB7XHJcbiAgICB2YXIgZmlsZW5hbWUgPSBmaWxlLm1pbGxpc2Vjb25kcyArIFwiX1wiICsgZmlsZS51c2VySUQgKyBcIl9cIiArIGZpbGUuZmlsZW5hbWU7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdEZWxldGUgZmlsZSAoJyArIGZpbGUuZmlsZW5hbWUgKyAnKT8nLFxyXG4gICAgICB0ZXh0OiBcIllvdSB3b24ndCBiZSBhYmxlIHRvIHJldmVydCB0aGlzIVwiLFxyXG4gICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgZGVsZXRlIGl0ISdcclxuICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICB0aGlzLmRlbGV0ZUZpbGUoZmlsZW5hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9KS5jYXRjaChlcnJvciA9PiBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBkZWxldGVGaWxlKGZpbGVuYW1lKSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIHRoaXMuZmlsZXNTZXJ2aWNlXHJcbiAgICAgIC5kZWxldGUoZmlsZW5hbWUpXHJcbiAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5nZXRGaWxlcygpO1xyXG4gICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAnRGVsZXRlZCEnLFxyXG4gICAgICAgICAgJ0ZpbGUgaGFzIGJlZW4gZGVsZXRlZC4nLFxyXG4gICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGFkZEZpbGUoKSB7XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9maWxlLXVwbG9hZCddKTtcclxuICB9XHJcblxyXG4gIGFyY2hpdmVBbGVydChzdHVkZW50OiBTdHVkZW50LCBldmVudDogYW55KSB7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdBcmNoaXZlIHN0dWRlbnQgKCcgKyBzdHVkZW50LmZpcnN0TmFtZSArICcgJyArIHN0dWRlbnQubGFzdE5hbWUgKyAnKScsXHJcbiAgICAgIHRleHQ6IFwiQXJlIHlvdSBzdXJlIHdhbnQgdG8gZG8gdGhpcz9cIixcclxuICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIEFyY2hpdmUhJ1xyXG4gICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICBpZiAoaXNDb25maXJtLmRpc21pc3MgPT09IFwiY2FuY2VsXCIgfHwgaXNDb25maXJtLmRpc21pc3MgPT09IFwib3ZlcmxheVwiKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtLmRpc21pc3MpO1xyXG4gICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgIHRoaXMuYXJjaGl2ZVN0dWRlbnQoc3R1ZGVudCwgZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXJjaGl2ZVN0dWRlbnQoc3R1ZGVudCwgZXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmFyY2hpdmVTdHVkZW50KHN0dWRlbnQpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLnRpdGxlLFxyXG4gICAgICAgICAgICAocmVzdWx0IGFzIGFueSkubXNnLFxyXG4gICAgICAgICAgICAocmVzdWx0IGFzIGFueSkucmVzdWx0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpcy5nZXRTdHVkZW50cygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgZ29Ub1N0dWRlbnRBcmNoaXZlKCkge1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3R1ZGVudC1hcmNoaXZlJ10pO1xyXG4gIH1cclxuXHJcbiAgcG9wdWxhdGVQUkYoc3R1ZGVudCkge1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAucG9wdWxhdGVQUkYoc3R1ZGVudC51c2VySUQpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ1NvcnJ5Li4uJyxcclxuICAgICAgICAgICAgJ1RoaXMgZmVhdHVyZSBpcyBub3QgeWV0IGF2YWlsYWJsZScsXHJcbiAgICAgICAgICAgICdpbmZvJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIHZpZXdJbmZvKHN0dWRlbnQ6IFN0dWRlbnQpIHtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ0xvYWRpbmcuLi4nXHJcbiAgICB9KTtcclxuICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICB0aGlzLnNob3dHZW5lcmFsID0gdHJ1ZTtcclxuICAgIHRoaXMuc3R1ZGVudEluZm9WaWV3ID0gdHJ1ZTtcclxuICAgIHRoaXMuc3R1ZGVudFZpZXcgPSBzdHVkZW50O1xyXG4gICAgdGhpcy5zdHVkZW50c0ZpbGVzID0gdGhpcy5maWxlcy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gdGhpcy5zdHVkZW50Vmlldy51c2VySUQpO1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAuZ2V0QWxsRm9ybXNCeUlEKHN0dWRlbnQpXHJcbiAgICAgIC50aGVuKGZvcm1zID0+IHtcclxuICAgICAgICBpZiAoKGZvcm1zIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbnNlbnRWaWV3ID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZVZpZXcgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5zdWl0YWJpbGl0eVZpZXcgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChmb3Jtcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY29uc2VudEZvcm1zID0gZm9ybXMuY29uc2VudEZvcm07XHJcbiAgICAgICAgICB0aGlzLmxlYXJuaW5nU3R5bGVWaWV3ID0gZm9ybXMubGVhcm5pbmdTdHlsZUZvcm1bMF07XHJcbiAgICAgICAgICB0aGlzLnN1aXRhYmlsaXR5VmlldyA9IGZvcm1zLnN1aXRhYmlsaXR5Rm9ybVswXTtcclxuICAgICAgICAgIHRoaXMuYmFyQ2hhcnREYXRhID0gW3sgZGF0YTogW3RoaXMubGVhcm5pbmdTdHlsZVZpZXcuaGVhcmluZywgdGhpcy5sZWFybmluZ1N0eWxlVmlldy5zZWVpbmcsIHRoaXMubGVhcm5pbmdTdHlsZVZpZXcuZG9pbmddIH1dO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgdmlld0NvdXJzZXMoc3R1ZGVudDogU3R1ZGVudCkge1xyXG4gICAgdGhpcy5yZXNldFZpZXcoKTtcclxuICAgIHRoaXMuc3R1ZGVudENvdXJzZXNWaWV3ID0gc3R1ZGVudDtcclxuICAgIHRoaXMuZ2V0VGltZXRhYmxlQnlJZChzdHVkZW50LnVzZXJJRCk7XHJcbiAgICB0aGlzLmdldFdhaXRMaXN0QnlJZChzdHVkZW50KTtcclxuICB9XHJcblxyXG4gIGdldFRpbWV0YWJsZUJ5SWQodXNlcklEKSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAuZ2V0RXZlbnRzQnlJZCh1c2VySUQpXHJcbiAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB0aGlzLnN0dWRlbnRDb3Vyc2VzID0gbnVsbDtcclxuICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICB0aGlzLnN0dWRlbnRDb3Vyc2VzID0gbnVsbDtcclxuICAgICAgICAvLyBzd2FsKFxyXG4gICAgICAgIC8vICAgICByZXN1bHQudGl0bGUsXHJcbiAgICAgICAgLy8gICAgIHJlc3VsdC5tc2csXHJcbiAgICAgICAgLy8gICAgICdpbmZvJ1xyXG4gICAgICAgIC8vICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zdHVkZW50Q291cnNlcyA9IHJlc3VsdDtcclxuICAgICAgfVxyXG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGdldHRpbmcgdGltZXRhYmxlIGJ5IGlkXCIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRXYWl0TGlzdEJ5SWQoc3R1ZGVudDogU3R1ZGVudCkge1xyXG4gICAgdGhpcy53YWl0TGlzdCA9IG51bGw7XHJcbiAgICB0aGlzLmNvdXJzZVNlcnZpY2VcclxuICAgICAgLmdldFdhaXRMaXN0QnlJZChzdHVkZW50LnVzZXJJRClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgICAgdGhpcy53YWl0TGlzdCA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgIHRoaXMud2FpdExpc3QgPSBudWxsO1xyXG4gICAgICAgICAgLy8gc3dhbChcclxuICAgICAgICAgIC8vICAgICByZXN1bHQudGl0bGUsXHJcbiAgICAgICAgICAvLyAgICAgcmVzdWx0Lm1zZyxcclxuICAgICAgICAgIC8vICAgICAnaW5mbydcclxuICAgICAgICAgIC8vICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMud2FpdExpc3QgPSByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvciAtIEdldCB3YWl0IGxpc3QgYnkgaWQ6IFwiICsgZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIG92ZXJhbGxTdGF0dXMoKSB7XHJcbiAgICB0aGlzLnJlc2V0VmlldygpO1xyXG4gIH1cclxuXHJcbiAgc2VjdGlvbkJ0bkNsaWNrZWQoZXZlbnQsIHNlY3Rpb24pIHtcclxuICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICB0aGlzLnN0dWRlbnRJbmZvVmlldyA9IHRydWU7XHJcbiAgICBpZiAoc2VjdGlvbiA9PT0gXCJnZW5lcmFsXCIpIHtcclxuICAgICAgdGhpcy5zaG93R2VuZXJhbCA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHNlY3Rpb24gPT09IFwic3VpdGFiaWxpdHlcIikge1xyXG4gICAgICB0aGlzLnNob3dTdWl0YWJpbGl0eSA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHNlY3Rpb24gPT09IFwiY29uc2VudFwiKSB7XHJcbiAgICAgIHRoaXMuc2hvd0NvbnNlbnQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChzZWN0aW9uID09PSBcImxlYXJuaW5nU3R5bGVcIikge1xyXG4gICAgICB0aGlzLnNob3dMZWFybmluZ1N0eWxlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAoc2VjdGlvbiA9PT0gXCJmaWxlc1wiKSB7XHJcbiAgICAgIHRoaXMuc2hvd0ZpbGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVkaXRHZW5lcmFsSW5mbyhzdHVkZW50KSB7XHJcbiAgICB0aGlzLnN0dWRlbnRFZGl0ID0gc3R1ZGVudDtcclxuICAgIHZhciBzcGxpdFBob25lID0gdGhpcy5zdHVkZW50RWRpdC5waG9uZS5zcGxpdCgnICcpO1xyXG4gICAgaWYgKHRoaXMuc3R1ZGVudEVkaXQucGhvbmUuaW5kZXhPZignKzEnKSAhPT0gLTEpIHtcclxuICAgICAgdGhpcy5sb25nMSA9IHRydWU7XHJcbiAgICAgIHRoaXMuc3R1ZGVudEVkaXQucGhvbmUgPSBzcGxpdFBob25lWzFdICsgXCIgXCIgKyBzcGxpdFBob25lWzJdO1xyXG4gICAgICBpZiAoc3BsaXRQaG9uZVszXSA9PT0gJ0hvbWUnKSB7XHJcbiAgICAgICAgdGhpcy5waG9uZTEgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBob25lMSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubG9uZzEgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdHVkZW50RWRpdC5waG9uZSA9IHNwbGl0UGhvbmVbMF0gKyBcIiBcIiArIHNwbGl0UGhvbmVbMV07XHJcbiAgICAgIGlmIChzcGxpdFBob25lWzJdID09PSAnSG9tZScpIHtcclxuICAgICAgICB0aGlzLnBob25lMSA9IGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGhvbmUxID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIHNwbGl0QWx0ZXJuYXRlID0gdGhpcy5zdHVkZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIuc3BsaXQoJyAnKTtcclxuICAgIGlmICh0aGlzLnN0dWRlbnRFZGl0LmFsdGVybmF0ZU51bWJlci5pbmRleE9mKCcrMScpICE9PSAtMSkge1xyXG4gICAgICB0aGlzLmxvbmcyID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zdHVkZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgPSBzcGxpdEFsdGVybmF0ZVsxXSArIFwiIFwiICsgc3BsaXRBbHRlcm5hdGVbMl07XHJcbiAgICAgIGlmIChzcGxpdEFsdGVybmF0ZVszXSA9PT0gJ0hvbWUnKSB7XHJcbiAgICAgICAgdGhpcy5waG9uZTIgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBob25lMiA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubG9uZzIgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdHVkZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgPSBzcGxpdEFsdGVybmF0ZVswXSArIFwiIFwiICsgc3BsaXRBbHRlcm5hdGVbMV07XHJcbiAgICAgIGlmIChzcGxpdEFsdGVybmF0ZVsyXSA9PT0gJ0hvbWUnKSB7XHJcbiAgICAgICAgdGhpcy5waG9uZTIgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBob25lMiA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc2hvd0dlbmVyYWwgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0dlbmVyYWxJbmZvRWRpdCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVHZW5lcmFsSW5mbygpIHtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ1VwZGF0aW5nLi4uJ1xyXG4gICAgfSk7XHJcbiAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICB2YXIgcGhvbmVTcGxpdCA9IHRoaXMuc3R1ZGVudEVkaXQucGhvbmUuc3BsaXQoJyAnKTtcclxuICAgIHRoaXMuc3R1ZGVudEVkaXQucGhvbmUgPSBwaG9uZVNwbGl0WzBdICsgXCIgXCIgKyBwaG9uZVNwbGl0WzFdO1xyXG4gICAgaWYgKHRoaXMucGhvbmUxID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuc3R1ZGVudEVkaXQucGhvbmUgPSB0aGlzLnN0dWRlbnRFZGl0LnBob25lICsgXCIgQ2VsbFwiO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnBob25lMSA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5zdHVkZW50RWRpdC5waG9uZSA9IHRoaXMuc3R1ZGVudEVkaXQucGhvbmUgKyBcIiBIb21lXCI7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5sb25nMSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLnN0dWRlbnRFZGl0LnBob25lID0gXCIrMSBcIiArIHRoaXMuc3R1ZGVudEVkaXQucGhvbmU7XHJcbiAgICB9XHJcbiAgICB2YXIgYWx0ZXJuYXRlU3BsaXQgPSB0aGlzLnN0dWRlbnRFZGl0LmFsdGVybmF0ZU51bWJlci5zcGxpdCgnICcpO1xyXG4gICAgdGhpcy5zdHVkZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgPSBhbHRlcm5hdGVTcGxpdFswXSArIFwiIFwiICsgYWx0ZXJuYXRlU3BsaXRbMV07XHJcbiAgICBpZiAodGhpcy5waG9uZTIgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5zdHVkZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgPSB0aGlzLnN0dWRlbnRFZGl0LmFsdGVybmF0ZU51bWJlciArIFwiIENlbGxcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5waG9uZTIgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuc3R1ZGVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyID0gdGhpcy5zdHVkZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgKyBcIiBIb21lXCI7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5sb25nMiA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLnN0dWRlbnRFZGl0LmFsdGVybmF0ZU51bWJlciA9IFwiKzEgXCIgKyB0aGlzLnN0dWRlbnRFZGl0LmFsdGVybmF0ZU51bWJlcjtcclxuICAgIH1cclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLnVwZGF0ZUdlbmVyYWxJbmZvKHRoaXMuc3R1ZGVudEVkaXQpXHJcbiAgICAgIC50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgIGlmICgodXNlciBhcyBhbnkpLnJlc3VsdCA9PT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KCh1c2VyIGFzIGFueSkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHVzZXIgYXMgYW55KS5tc2cgPT09IFwiVXNlcm5hbWUgaXMgYWxyZWFkeSBpbiB1c2UuXCIpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdVc2VybmFtZSB0YWtlbicsXHJcbiAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBkaWZmZXJlbnQgdXNlcm5hbWUuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHVzZXIgYXMgYW55KS5tc2cgPT09IFwiRW1haWwgaXMgYWxyZWFkeSBpbiB1c2UuXCIpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdFbWFpbCBpbiB1c2UnLFxyXG4gICAgICAgICAgICAnUGxlYXNlIGVudGVyIGEgZGlmZmVyZW50IGVtYWlsLicsXHJcbiAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCh1c2VyIGFzIGFueSkubXNnID09PSBcIkluY29ycmVjdCBlbWFpbCBmb3JtYXQuXCIpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdJbmNvcnJlY3QgZW1haWwgZm9ybWF0JyxcclxuICAgICAgICAgICAgJ1BsZWFzZSBlbnRlciBhIHByb3BlciBlbWFpbC4nLFxyXG4gICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgodXNlciBhcyBhbnkpLnJlc3VsdCA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICh1c2VyIGFzIGFueSkudGl0bGUsXHJcbiAgICAgICAgICAgICh1c2VyIGFzIGFueSkubXNnLFxyXG4gICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB0aGlzLmdldFN0dWRlbnRzKCk7XHJcbiAgICAgICAgICB0aGlzLnNob3dHZW5lcmFsSW5mb0VkaXQgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuc2hvd0dlbmVyYWwgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKCk7XHJcbiAgfVxyXG5cclxuICBhbGxvd0NsaWVudFRvRWRpdChzdHVkZW50LCBwZXJtaXNzaW9uKSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5ncmFudENvbnNlbnRFZGl0UGVybWlzc2lvbihzdHVkZW50LCBwZXJtaXNzaW9uKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZ3JhbnRlZCcpIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudFZpZXcuZWRpdENvbnNlbnRSZXF1ZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnU3R1ZGVudCBBY2Nlc3MgR3JhbnRlZCcsXHJcbiAgICAgICAgICAgICdTdHVkZW50IHdpbGwgYmUgc2VudCBhbiBlbWFpbCBpbmZvcm1pbmcgdGhhdCB0aGV5IGNhbiBub3cgZWRpdCBjb25lc250LicsXHJcbiAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdkZW5pZWQnKSB7XHJcbiAgICAgICAgICB0aGlzLnN0dWRlbnRWaWV3LmVkaXRDb25zZW50UmVxdWVzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ1N0dWRlbnQgQWNjZXNzIERlbmllZCcsXHJcbiAgICAgICAgICAgICdTdHVkZW50IHdpbGwgYmUgc2VudCBhbiBlbWFpbCBpbmZvcm1pbmcgdGhhdCB0aGV5IGNhbiBOT1QgZWRpdCBjb25lc250LicsXHJcbiAgICAgICAgICAgICdkYW5nZXInXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KS5jYXRjaCgpO1xyXG4gIH1cclxuXHJcbiAgb25TZWxlY3RDaGFuZ2UoZXZlbnQpIHtcclxuICAgIHZhciBjb25zZW50Rm9ybSA9IHRoaXMuZ2V0Q29uc2VudEZvcm1CeUNvbnNlbnRJRCh0aGlzLnNlbGVjdGVkQ29uc2VudEZvcm0pO1xyXG4gICAgdGhpcy5jb25zZW50VmlldyA9IGNvbnNlbnRGb3JtWzBdO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29uc2VudEZvcm1CeUNvbnNlbnRJRChpZCkge1xyXG4gICAgaWQgPSAraWQ7XHJcbiAgICB2YXIgY29uc2VudEZvcm0gPSB0aGlzLmNvbnNlbnRGb3Jtcy5maWx0ZXIoeCA9PiB4LmNvbnNlbnRJRCA9PT0gaWQpO1xyXG4gICAgcmV0dXJuIGNvbnNlbnRGb3JtO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRWaWV3KCkge1xyXG4gICAgdGhpcy5zdHVkZW50Q291cnNlc1ZpZXcgPSBudWxsO1xyXG4gICAgdGhpcy5zaG93R2VuZXJhbEluZm9FZGl0ID0gZmFsc2U7XHJcbiAgICB0aGlzLnN0dWRlbnRJbmZvVmlldyA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaG93R2VuZXJhbCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaG93U3VpdGFiaWxpdHkgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0NvbnNlbnQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0xlYXJuaW5nU3R5bGUgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0ZpbGVzID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5RXJyb3JBbGVydChlcnJvcikge1xyXG4gICAgc3dhbChcclxuICAgICAgICBlcnJvci50aXRsZSxcclxuICAgICAgICBlcnJvci5tc2csXHJcbiAgICAgICAgJ2Vycm9yJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
