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
var authentication_service_1 = require("../../services/authentication.service");
var files_service_1 = require("../../services/files.service");
var StudentManageComponent = /** @class */ (function () {
    function StudentManageComponent(router, ngZone, studentService, authService, filesService) {
        this.router = router;
        this.ngZone = ngZone;
        this.studentService = studentService;
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
        swal('Sorry...', 'This functionality is not yet available', 'info');
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
    };
    StudentManageComponent.prototype.getTimetableById = function (userID) {
        var _this = this;
        this.studentService
            .getEventsById(userID)
            .then(function (result) {
            if (result.result === 'error') {
                _this.displayErrorAlert(result);
            }
            else {
                _this.studentCourses = result;
            }
        }).catch(function (error) {
            console.log("Error getting timetable by id");
        });
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
        __metadata("design:paramtypes", [router_1.Router, core_1.NgZone, student_service_1.StudentService, authentication_service_1.AuthService, files_service_1.FilesService])
    ], StudentManageComponent);
    return StudentManageComponent;
}());
exports.StudentManageComponent = StudentManageComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMEQ7QUFNMUQsMENBQXlDO0FBQ3pDLGtFQUFnRTtBQUNoRSxnRkFBb0U7QUFDcEUsOERBQTREO0FBVTVEO0lBdUNFLGdDQUFvQixNQUFjLEVBQVUsTUFBYyxFQUFVLGNBQThCLEVBQVUsV0FBd0IsRUFBVSxZQUEwQjtRQUFwSixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFwQ3hLLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBVWpDLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBRTVCLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyxXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUN2QixVQUFLLEdBQVksS0FBSyxDQUFDO1FBTXZCLDRCQUE0QjtRQUM1QixvQkFBZSxHQUFRO1lBQ3JCLHNCQUFzQixFQUFFLEtBQUs7WUFDN0IsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQztRQUNGLG1CQUFjLEdBQWEsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFELGlCQUFZLEdBQVcsS0FBSyxDQUFDO1FBQzdCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBRWhDLG1CQUFjLEdBQVUsQ0FBQyxFQUFFLGVBQWUsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBT2pGLENBQUM7SUFFRCx5Q0FBUSxHQUFSO1FBQ0UsSUFB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QUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRUQsa0RBQWlCLEdBQWpCLFVBQWtCLEtBQUs7UUFDckIsSUFBSSxDQUNBLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLEdBQUcsRUFDVCxPQUFPLENBQ1YsQ0FBQztJQUNKLENBQUM7SUFFRCx1Q0FBTSxHQUFOO1FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBeGFVLHNCQUFzQjtRQU5sQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixXQUFXLEVBQUUsK0RBQStEO1lBQzVFLFNBQVMsRUFBRSxDQUFDLDhEQUE4RCxDQUFDO1NBQzVFLENBQUM7eUNBeUM0QixlQUFNLEVBQWtCLGFBQU0sRUFBMEIsZ0NBQWMsRUFBdUIsb0NBQVcsRUFBd0IsNEJBQVk7T0F2QzdKLHNCQUFzQixDQXlhbEM7SUFBRCw2QkFBQztDQXphRCxBQXlhQyxJQUFBO0FBemFZLHdEQUFzQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N0dWRlbnRcIjtcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb3Vyc2VcIjtcclxuaW1wb3J0IHsgQ29uc2VudEZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbnNlbnRGb3JtXCI7XHJcbmltcG9ydCB7IFN1aXRhYmlsaXR5Rm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3VpdGFiaWxpdHlGb3JtXCI7XHJcbmltcG9ydCB7IExlYXJuaW5nU3R5bGVGb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9sZWFybmluZ1N0eWxlRm9ybVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBGaWxlc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmlsZXMuc2VydmljZVwiO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcbmRlY2xhcmUgdmFyIEZpbGVTYXZlcjogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzdHVkZW50LW1hbmFnZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3N0dWRlbnQtbWFuYWdlL3N0dWRlbnQtbWFuYWdlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTdHVkZW50TWFuYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBzdHVkZW50czogU3R1ZGVudFtdO1xyXG4gIGVycm9yOiBhbnk7XHJcbiAgc3R1ZGVudEluZm9WaWV3OiBib29sZWFuID0gZmFsc2U7XHJcbiAgc3R1ZGVudFZpZXc6IFN0dWRlbnQ7XHJcbiAgc3R1ZGVudENvdXJzZXNWaWV3OiBTdHVkZW50O1xyXG4gIHN0dWRlbnRDb3Vyc2VzOiBhbnlbXTtcclxuICBjb25zZW50Rm9ybXM6IENvbnNlbnRGb3JtW107XHJcbiAgY29uc2VudFZpZXc6IENvbnNlbnRGb3JtO1xyXG4gIHNlbGVjdGVkQ29uc2VudEZvcm06IHN0cmluZztcclxuICBzdWl0YWJpbGl0eVZpZXc6IFN1aXRhYmlsaXR5Rm9ybTtcclxuICBsZWFybmluZ1N0eWxlVmlldzogTGVhcm5pbmdTdHlsZUZvcm07XHJcblxyXG4gIHNob3dHZW5lcmFsOiBib29sZWFuID0gdHJ1ZTtcclxuICBzdHVkZW50RWRpdDogU3R1ZGVudDtcclxuICBzaG93R2VuZXJhbEluZm9FZGl0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgcGhvbmUxOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcGhvbmUyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgbG9uZzE6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBsb25nMjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHNob3dTdWl0YWJpbGl0eTogYm9vbGVhbjtcclxuICBzaG93Q29uc2VudDogYm9vbGVhbjtcclxuICBzaG93TGVhcm5pbmdTdHlsZTogYm9vbGVhbjtcclxuICBzaG93RmlsZXM6IGJvb2xlYW47XHJcblxyXG4gIC8vYmFyIGNoYXJ0IChsZWFybmluZyBzdHlsZSlcclxuICBiYXJDaGFydE9wdGlvbnM6IGFueSA9IHtcclxuICAgIHNjYWxlU2hvd1ZlcnRpY2FsTGluZXM6IGZhbHNlLFxyXG4gICAgcmVzcG9uc2l2ZTogdHJ1ZVxyXG4gIH07XHJcbiAgYmFyQ2hhcnRMYWJlbHM6IHN0cmluZ1tdID0gWydIZWFyaW5nJywgJ1NlZWluZycsICdEb2luZyddO1xyXG4gIGJhckNoYXJ0VHlwZTogc3RyaW5nID0gJ2Jhcic7XHJcbiAgYmFyQ2hhcnRMZWdlbmQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBiYXJDaGFydERhdGE6IGFueTtcclxuICBiYXJDaGFydENvbG9yczogYW55W10gPSBbeyBiYWNrZ3JvdW5kQ29sb3I6IFtcIiNGRjQyMDdcIiwgXCIjRjhFOTAzXCIsIFwiIzJBRDMwOFwiXSB9XTtcclxuXHJcbiAgZmlsZXM6IGFueVtdO1xyXG4gIHN0dWRlbnRzRmlsZXM6IGFueVtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIG5nWm9uZTogTmdab25lLCBwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIHByaXZhdGUgZmlsZXNTZXJ2aWNlOiBGaWxlc1NlcnZpY2UpIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZ2V0U3R1ZGVudHMoKTtcclxuICAgIHRoaXMuZ2V0RmlsZXMoKTtcclxuICB9XHJcblxyXG4gIGdldFN0dWRlbnRzKCkge1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAuZ2V0U3R1ZGVudHMoKVxyXG4gICAgICAudGhlbihzdHVkZW50cyA9PiB7XHJcbiAgICAgICAgaWYgKChzdHVkZW50cyBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50cyA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHN0dWRlbnRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50cyA9IHN0dWRlbnRzO1xyXG4gICAgICAgICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLnN0dWRlbnRzKSB7XHJcbiAgICAgICAgICAgIHN0dWRlbnQuZnVsbE5hbWUgPSBzdHVkZW50LmZpcnN0TmFtZSArIFwiIFwiICsgc3R1ZGVudC5sYXN0TmFtZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmlsZXMoKSB7XHJcbiAgICB0aGlzLmZpbGVzU2VydmljZVxyXG4gICAgICAuZ2V0RmlsZXMoKVxyXG4gICAgICAudGhlbihmaWxlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5maWxlcyA9IGZpbGVzO1xyXG4gICAgICAgIGZvciAobGV0IGZpbGUgb2YgdGhpcy5maWxlcykge1xyXG4gICAgICAgICAgZmlsZS51c2VySUQgPSArZmlsZS51c2VySUQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZpbGVzKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGRvd25sb2FkKGZpbGUpIHtcclxuICAgIGNvbnNvbGUubG9nKGZpbGUpO1xyXG4gICAgdmFyIGZpbGVuYW1lID0gZmlsZS5taWxsaXNlY29uZHMgKyBcIl9cIiArIGZpbGUudXNlcklEICsgXCJfXCIgKyBmaWxlLmZpbGVuYW1lO1xyXG4gICAgdGhpcy5maWxlc1NlcnZpY2VcclxuICAgICAgLmRvd25sb2FkKGZpbGVuYW1lKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbcmVzcG9uc2VdLCB7IHR5cGU6IFwiYXBwbGljYXRpb24vcGRmXCIgfSk7XHJcbiAgICAgICAgLy9jaGFuZ2UgZG93bmxvYWQucGRmIHRvIHRoZSBuYW1lIG9mIHdoYXRldmVyIHlvdSB3YW50IHlvdXIgZmlsZSB0byBiZVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGJsb2IpO1xyXG4gICAgICAgIHNhdmVBcyhibG9iLCBmaWxlLmZpbGVuYW1lKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUZpbGVBbGVydChmaWxlKSB7XHJcbiAgICB2YXIgZmlsZW5hbWUgPSBmaWxlLm1pbGxpc2Vjb25kcyArIFwiX1wiICsgZmlsZS51c2VySUQgKyBcIl9cIiArIGZpbGUuZmlsZW5hbWU7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdEZWxldGUgZmlsZSAoJyArIGZpbGUuZmlsZW5hbWUgKyAnKT8nLFxyXG4gICAgICB0ZXh0OiBcIllvdSB3b24ndCBiZSBhYmxlIHRvIHJldmVydCB0aGlzIVwiLFxyXG4gICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgZGVsZXRlIGl0ISdcclxuICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICB0aGlzLmRlbGV0ZUZpbGUoZmlsZW5hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9KS5jYXRjaChlcnJvciA9PiBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBkZWxldGVGaWxlKGZpbGVuYW1lKSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIHRoaXMuZmlsZXNTZXJ2aWNlXHJcbiAgICAgIC5kZWxldGUoZmlsZW5hbWUpXHJcbiAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5nZXRGaWxlcygpO1xyXG4gICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAnRGVsZXRlZCEnLFxyXG4gICAgICAgICAgJ0ZpbGUgaGFzIGJlZW4gZGVsZXRlZC4nLFxyXG4gICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGFkZEZpbGUoKSB7XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9maWxlLXVwbG9hZCddKTtcclxuICB9XHJcblxyXG4gIGFyY2hpdmVBbGVydChzdHVkZW50OiBTdHVkZW50LCBldmVudDogYW55KSB7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdBcmNoaXZlIHN0dWRlbnQgKCcgKyBzdHVkZW50LmZpcnN0TmFtZSArICcgJyArIHN0dWRlbnQubGFzdE5hbWUgKyAnKScsXHJcbiAgICAgIHRleHQ6IFwiQXJlIHlvdSBzdXJlIHdhbnQgdG8gZG8gdGhpcz9cIixcclxuICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIEFyY2hpdmUhJ1xyXG4gICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICBpZiAoaXNDb25maXJtLmRpc21pc3MgPT09IFwiY2FuY2VsXCIgfHwgaXNDb25maXJtLmRpc21pc3MgPT09IFwib3ZlcmxheVwiKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtLmRpc21pc3MpO1xyXG4gICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgIHRoaXMuYXJjaGl2ZVN0dWRlbnQoc3R1ZGVudCwgZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXJjaGl2ZVN0dWRlbnQoc3R1ZGVudCwgZXZlbnQpOiB2b2lkIHtcclxuICAgIHN3YWwoXHJcbiAgICAgICdTb3JyeS4uLicsXHJcbiAgICAgICdUaGlzIGZ1bmN0aW9uYWxpdHkgaXMgbm90IHlldCBhdmFpbGFibGUnLFxyXG4gICAgICAnaW5mbydcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwb3B1bGF0ZVBSRihzdHVkZW50KSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5wb3B1bGF0ZVBSRihzdHVkZW50LnVzZXJJRClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnU29ycnkuLi4nLFxyXG4gICAgICAgICAgICAnVGhpcyBmZWF0dXJlIGlzIG5vdCB5ZXQgYXZhaWxhYmxlJyxcclxuICAgICAgICAgICAgJ2luZm8nXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgdmlld0luZm8oc3R1ZGVudDogU3R1ZGVudCkge1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnTG9hZGluZy4uLidcclxuICAgIH0pO1xyXG4gICAgc3dhbC5zaG93TG9hZGluZygpO1xyXG4gICAgdGhpcy5yZXNldFZpZXcoKTtcclxuICAgIHRoaXMuc2hvd0dlbmVyYWwgPSB0cnVlO1xyXG4gICAgdGhpcy5zdHVkZW50SW5mb1ZpZXcgPSB0cnVlO1xyXG4gICAgdGhpcy5zdHVkZW50VmlldyA9IHN0dWRlbnQ7XHJcbiAgICB0aGlzLnN0dWRlbnRzRmlsZXMgPSB0aGlzLmZpbGVzLmZpbHRlcih4ID0+IHgudXNlcklEID09PSB0aGlzLnN0dWRlbnRWaWV3LnVzZXJJRCk7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRBbGxGb3Jtc0J5SUQoc3R1ZGVudClcclxuICAgICAgLnRoZW4oZm9ybXMgPT4ge1xyXG4gICAgICAgIGlmICgoZm9ybXMgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuY29uc2VudFZpZXcgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5sZWFybmluZ1N0eWxlVmlldyA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLnN1aXRhYmlsaXR5VmlldyA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KGZvcm1zKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5jb25zZW50Rm9ybXMgPSBmb3Jtcy5jb25zZW50Rm9ybTtcclxuICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZVZpZXcgPSBmb3Jtcy5sZWFybmluZ1N0eWxlRm9ybVswXTtcclxuICAgICAgICAgIHRoaXMuc3VpdGFiaWxpdHlWaWV3ID0gZm9ybXMuc3VpdGFiaWxpdHlGb3JtWzBdO1xyXG4gICAgICAgICAgdGhpcy5iYXJDaGFydERhdGEgPSBbeyBkYXRhOiBbdGhpcy5sZWFybmluZ1N0eWxlVmlldy5oZWFyaW5nLCB0aGlzLmxlYXJuaW5nU3R5bGVWaWV3LnNlZWluZywgdGhpcy5sZWFybmluZ1N0eWxlVmlldy5kb2luZ10gfV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICB2aWV3Q291cnNlcyhzdHVkZW50OiBTdHVkZW50KSB7XHJcbiAgICB0aGlzLnJlc2V0VmlldygpO1xyXG4gICAgdGhpcy5zdHVkZW50Q291cnNlc1ZpZXcgPSBzdHVkZW50O1xyXG4gICAgdGhpcy5nZXRUaW1ldGFibGVCeUlkKHN0dWRlbnQudXNlcklEKTtcclxuICB9XHJcblxyXG4gIGdldFRpbWV0YWJsZUJ5SWQodXNlcklEKSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAuZ2V0RXZlbnRzQnlJZCh1c2VySUQpXHJcbiAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnN0dWRlbnRDb3Vyc2VzID0gcmVzdWx0O1xyXG4gICAgICB9XHJcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZ2V0dGluZyB0aW1ldGFibGUgYnkgaWRcIik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG92ZXJhbGxTdGF0dXMoKSB7XHJcbiAgICB0aGlzLnJlc2V0VmlldygpO1xyXG4gIH1cclxuXHJcbiAgc2VjdGlvbkJ0bkNsaWNrZWQoZXZlbnQsIHNlY3Rpb24pIHtcclxuICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICB0aGlzLnN0dWRlbnRJbmZvVmlldyA9IHRydWU7XHJcbiAgICBpZiAoc2VjdGlvbiA9PT0gXCJnZW5lcmFsXCIpIHtcclxuICAgICAgdGhpcy5zaG93R2VuZXJhbCA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHNlY3Rpb24gPT09IFwic3VpdGFiaWxpdHlcIikge1xyXG4gICAgICB0aGlzLnNob3dTdWl0YWJpbGl0eSA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHNlY3Rpb24gPT09IFwiY29uc2VudFwiKSB7XHJcbiAgICAgIHRoaXMuc2hvd0NvbnNlbnQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChzZWN0aW9uID09PSBcImxlYXJuaW5nU3R5bGVcIikge1xyXG4gICAgICB0aGlzLnNob3dMZWFybmluZ1N0eWxlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAoc2VjdGlvbiA9PT0gXCJmaWxlc1wiKSB7XHJcbiAgICAgIHRoaXMuc2hvd0ZpbGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVkaXRHZW5lcmFsSW5mbyhzdHVkZW50KSB7XHJcbiAgICB0aGlzLnN0dWRlbnRFZGl0ID0gc3R1ZGVudDtcclxuICAgIHZhciBzcGxpdFBob25lID0gdGhpcy5zdHVkZW50RWRpdC5waG9uZS5zcGxpdCgnICcpO1xyXG4gICAgaWYgKHRoaXMuc3R1ZGVudEVkaXQucGhvbmUuaW5kZXhPZignKzEnKSAhPT0gLTEpIHtcclxuICAgICAgdGhpcy5sb25nMSA9IHRydWU7XHJcbiAgICAgIHRoaXMuc3R1ZGVudEVkaXQucGhvbmUgPSBzcGxpdFBob25lWzFdICsgXCIgXCIgKyBzcGxpdFBob25lWzJdO1xyXG4gICAgICBpZiAoc3BsaXRQaG9uZVszXSA9PT0gJ0hvbWUnKSB7XHJcbiAgICAgICAgdGhpcy5waG9uZTEgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBob25lMSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubG9uZzEgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdHVkZW50RWRpdC5waG9uZSA9IHNwbGl0UGhvbmVbMF0gKyBcIiBcIiArIHNwbGl0UGhvbmVbMV07XHJcbiAgICAgIGlmIChzcGxpdFBob25lWzJdID09PSAnSG9tZScpIHtcclxuICAgICAgICB0aGlzLnBob25lMSA9IGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGhvbmUxID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIHNwbGl0QWx0ZXJuYXRlID0gdGhpcy5zdHVkZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIuc3BsaXQoJyAnKTtcclxuICAgIGlmICh0aGlzLnN0dWRlbnRFZGl0LmFsdGVybmF0ZU51bWJlci5pbmRleE9mKCcrMScpICE9PSAtMSkge1xyXG4gICAgICB0aGlzLmxvbmcyID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zdHVkZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgPSBzcGxpdEFsdGVybmF0ZVsxXSArIFwiIFwiICsgc3BsaXRBbHRlcm5hdGVbMl07XHJcbiAgICAgIGlmIChzcGxpdEFsdGVybmF0ZVszXSA9PT0gJ0hvbWUnKSB7XHJcbiAgICAgICAgdGhpcy5waG9uZTIgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBob25lMiA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubG9uZzIgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdHVkZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgPSBzcGxpdEFsdGVybmF0ZVswXSArIFwiIFwiICsgc3BsaXRBbHRlcm5hdGVbMV07XHJcbiAgICAgIGlmIChzcGxpdEFsdGVybmF0ZVsyXSA9PT0gJ0hvbWUnKSB7XHJcbiAgICAgICAgdGhpcy5waG9uZTIgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBob25lMiA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc2hvd0dlbmVyYWwgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0dlbmVyYWxJbmZvRWRpdCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVHZW5lcmFsSW5mbygpIHtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ1VwZGF0aW5nLi4uJ1xyXG4gICAgfSk7XHJcbiAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICB2YXIgcGhvbmVTcGxpdCA9IHRoaXMuc3R1ZGVudEVkaXQucGhvbmUuc3BsaXQoJyAnKTtcclxuICAgIHRoaXMuc3R1ZGVudEVkaXQucGhvbmUgPSBwaG9uZVNwbGl0WzBdICsgXCIgXCIgKyBwaG9uZVNwbGl0WzFdO1xyXG4gICAgaWYgKHRoaXMucGhvbmUxID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuc3R1ZGVudEVkaXQucGhvbmUgPSB0aGlzLnN0dWRlbnRFZGl0LnBob25lICsgXCIgQ2VsbFwiO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnBob25lMSA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5zdHVkZW50RWRpdC5waG9uZSA9IHRoaXMuc3R1ZGVudEVkaXQucGhvbmUgKyBcIiBIb21lXCI7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5sb25nMSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLnN0dWRlbnRFZGl0LnBob25lID0gXCIrMSBcIiArIHRoaXMuc3R1ZGVudEVkaXQucGhvbmU7XHJcbiAgICB9XHJcbiAgICB2YXIgYWx0ZXJuYXRlU3BsaXQgPSB0aGlzLnN0dWRlbnRFZGl0LmFsdGVybmF0ZU51bWJlci5zcGxpdCgnICcpO1xyXG4gICAgdGhpcy5zdHVkZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgPSBhbHRlcm5hdGVTcGxpdFswXSArIFwiIFwiICsgYWx0ZXJuYXRlU3BsaXRbMV07XHJcbiAgICBpZiAodGhpcy5waG9uZTIgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5zdHVkZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgPSB0aGlzLnN0dWRlbnRFZGl0LmFsdGVybmF0ZU51bWJlciArIFwiIENlbGxcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5waG9uZTIgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuc3R1ZGVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyID0gdGhpcy5zdHVkZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgKyBcIiBIb21lXCI7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5sb25nMiA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLnN0dWRlbnRFZGl0LmFsdGVybmF0ZU51bWJlciA9IFwiKzEgXCIgKyB0aGlzLnN0dWRlbnRFZGl0LmFsdGVybmF0ZU51bWJlcjtcclxuICAgIH1cclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLnVwZGF0ZUdlbmVyYWxJbmZvKHRoaXMuc3R1ZGVudEVkaXQpXHJcbiAgICAgIC50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgIGlmICgodXNlciBhcyBhbnkpLnJlc3VsdCA9PT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KCh1c2VyIGFzIGFueSkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHVzZXIgYXMgYW55KS5tc2cgPT09IFwiVXNlcm5hbWUgaXMgYWxyZWFkeSBpbiB1c2UuXCIpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdVc2VybmFtZSB0YWtlbicsXHJcbiAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBkaWZmZXJlbnQgdXNlcm5hbWUuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHVzZXIgYXMgYW55KS5tc2cgPT09IFwiRW1haWwgaXMgYWxyZWFkeSBpbiB1c2UuXCIpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdFbWFpbCBpbiB1c2UnLFxyXG4gICAgICAgICAgICAnUGxlYXNlIGVudGVyIGEgZGlmZmVyZW50IGVtYWlsLicsXHJcbiAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCh1c2VyIGFzIGFueSkubXNnID09PSBcIkluY29ycmVjdCBlbWFpbCBmb3JtYXQuXCIpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdJbmNvcnJlY3QgZW1haWwgZm9ybWF0JyxcclxuICAgICAgICAgICAgJ1BsZWFzZSBlbnRlciBhIHByb3BlciBlbWFpbC4nLFxyXG4gICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgodXNlciBhcyBhbnkpLnJlc3VsdCA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICh1c2VyIGFzIGFueSkudGl0bGUsXHJcbiAgICAgICAgICAgICh1c2VyIGFzIGFueSkubXNnLFxyXG4gICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB0aGlzLmdldFN0dWRlbnRzKCk7XHJcbiAgICAgICAgICB0aGlzLnNob3dHZW5lcmFsSW5mb0VkaXQgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuc2hvd0dlbmVyYWwgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKCk7XHJcbiAgfVxyXG5cclxuICBhbGxvd0NsaWVudFRvRWRpdChzdHVkZW50LCBwZXJtaXNzaW9uKSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5ncmFudENvbnNlbnRFZGl0UGVybWlzc2lvbihzdHVkZW50LCBwZXJtaXNzaW9uKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZ3JhbnRlZCcpIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudFZpZXcuZWRpdENvbnNlbnRSZXF1ZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnU3R1ZGVudCBBY2Nlc3MgR3JhbnRlZCcsXHJcbiAgICAgICAgICAgICdTdHVkZW50IHdpbGwgYmUgc2VudCBhbiBlbWFpbCBpbmZvcm1pbmcgdGhhdCB0aGV5IGNhbiBub3cgZWRpdCBjb25lc250LicsXHJcbiAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdkZW5pZWQnKSB7XHJcbiAgICAgICAgICB0aGlzLnN0dWRlbnRWaWV3LmVkaXRDb25zZW50UmVxdWVzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ1N0dWRlbnQgQWNjZXNzIERlbmllZCcsXHJcbiAgICAgICAgICAgICdTdHVkZW50IHdpbGwgYmUgc2VudCBhbiBlbWFpbCBpbmZvcm1pbmcgdGhhdCB0aGV5IGNhbiBOT1QgZWRpdCBjb25lc250LicsXHJcbiAgICAgICAgICAgICdkYW5nZXInXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KS5jYXRjaCgpO1xyXG4gIH1cclxuXHJcbiAgb25TZWxlY3RDaGFuZ2UoZXZlbnQpIHtcclxuICAgIHZhciBjb25zZW50Rm9ybSA9IHRoaXMuZ2V0Q29uc2VudEZvcm1CeUNvbnNlbnRJRCh0aGlzLnNlbGVjdGVkQ29uc2VudEZvcm0pO1xyXG4gICAgdGhpcy5jb25zZW50VmlldyA9IGNvbnNlbnRGb3JtWzBdO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29uc2VudEZvcm1CeUNvbnNlbnRJRChpZCkge1xyXG4gICAgaWQgPSAraWQ7XHJcbiAgICB2YXIgY29uc2VudEZvcm0gPSB0aGlzLmNvbnNlbnRGb3Jtcy5maWx0ZXIoeCA9PiB4LmNvbnNlbnRJRCA9PT0gaWQpO1xyXG4gICAgcmV0dXJuIGNvbnNlbnRGb3JtO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRWaWV3KCkge1xyXG4gICAgdGhpcy5zdHVkZW50Q291cnNlc1ZpZXcgPSBudWxsO1xyXG4gICAgdGhpcy5zaG93R2VuZXJhbEluZm9FZGl0ID0gZmFsc2U7XHJcbiAgICB0aGlzLnN0dWRlbnRJbmZvVmlldyA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaG93R2VuZXJhbCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaG93U3VpdGFiaWxpdHkgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0NvbnNlbnQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0xlYXJuaW5nU3R5bGUgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0ZpbGVzID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5RXJyb3JBbGVydChlcnJvcikge1xyXG4gICAgc3dhbChcclxuICAgICAgICBlcnJvci50aXRsZSxcclxuICAgICAgICBlcnJvci5tc2csXHJcbiAgICAgICAgJ2Vycm9yJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
