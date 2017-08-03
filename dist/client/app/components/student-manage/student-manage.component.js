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
var StudentManageComponent = (function () {
    function StudentManageComponent(router, ngZone, studentService, authService) {
        this.router = router;
        this.ngZone = ngZone;
        this.studentService = studentService;
        this.authService = authService;
        this.studentInfoView = false;
        this.showGeneral = true;
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
    };
    StudentManageComponent.prototype.getStudents = function () {
        var _this = this;
        this.studentService
            .getStudents()
            .then(function (students) {
            if (students.status === "403") {
                _this.students = null;
            }
            else {
                _this.students = students;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    StudentManageComponent.prototype.addClient = function () {
        this.router.navigate(['/suitability']);
    };
    StudentManageComponent.prototype.gotoEdit = function (student, event) {
        this.router.navigate(['/student-edit', student.studentID]);
    };
    StudentManageComponent.prototype.addStudent = function () {
        this.router.navigate(['/student-edit', 'new']);
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
            confirmButtonText: 'Yes, Archive it!'
        }).then(function (isConfirm) {
            if (isConfirm) {
                _this.archiveStudent(student, event);
            }
        });
    };
    StudentManageComponent.prototype.archiveStudent = function (student, event) {
        swal('Sorry...', 'This functionality is not yet available', 'info');
    };
    StudentManageComponent.prototype.populatePRF = function (student) {
        this.studentService
            .populatePRF(student.userID)
            .then(function (response) {
            swal('Sorry...', 'This feature is not yet available', 'info');
        })
            .catch(function (error) { return console.log(error); });
    };
    StudentManageComponent.prototype.viewInfo = function (student) {
        var _this = this;
        this.showGeneral = true;
        this.showSuitability = false;
        this.showConsent = false;
        this.showLearningStyle = false;
        this.studentInfoView = true;
        this.studentView = student;
        this.studentService
            .getAllFormsByID(student)
            .then(function (forms) {
            if (forms.status === "403") {
                _this.consentView = null;
                _this.learningStyleView = null;
                _this.suitabilityView = null;
            }
            else {
                _this.consentView = forms.consentForm[0];
                _this.learningStyleView = forms.learningStyleForm[0];
                _this.suitabilityView = forms.suitabilityForm[0];
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    StudentManageComponent.prototype.overallStatus = function () {
        this.studentInfoView = false;
    };
    StudentManageComponent.prototype.sectionBtnClicked = function (event, section) {
        if (section === "general") {
            this.showGeneral = true;
            this.showSuitability = false;
            this.showConsent = false;
            this.showLearningStyle = false;
        }
        else if (section === "suitability") {
            this.showGeneral = false;
            this.showSuitability = true;
            this.showConsent = false;
            this.showLearningStyle = false;
        }
        else if (section === "consent") {
            this.showGeneral = false;
            this.showSuitability = false;
            this.showConsent = true;
            this.showLearningStyle = false;
        }
        else if (section === "learningStyle") {
            this.showGeneral = false;
            this.showSuitability = false;
            this.showConsent = false;
            this.showLearningStyle = true;
        }
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
        __metadata("design:paramtypes", [router_1.Router, core_1.NgZone, student_service_1.StudentService, authentication_service_1.AuthService])
    ], StudentManageComponent);
    return StudentManageComponent;
}());
exports.StudentManageComponent = StudentManageComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMEQ7QUFLMUQsMENBQXlDO0FBQ3pDLGtFQUFnRTtBQUNoRSxnRkFBb0U7QUFVcEU7SUF3QkksZ0NBQW9CLE1BQWMsRUFBVSxNQUFjLEVBQVUsY0FBOEIsRUFBVSxXQUF3QjtRQUFoSCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBckJwSSxvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUtqQyxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUs1Qiw0QkFBNEI7UUFDNUIsb0JBQWUsR0FBTztZQUNwQixzQkFBc0IsRUFBRSxLQUFLO1lBQzdCLFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUM7UUFDRixtQkFBYyxHQUFZLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6RCxpQkFBWSxHQUFVLEtBQUssQ0FBQztRQUM1QixtQkFBYyxHQUFXLEtBQUssQ0FBQztRQUUvQixtQkFBYyxHQUFVLENBQUMsRUFBRSxlQUFlLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUlqRixDQUFDO0lBRUQseUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsNENBQVcsR0FBWDtRQUFBLGlCQVdDO1FBVkMsSUFBSSxDQUFDLGNBQWM7YUFDaEIsV0FBVyxFQUFFO2FBQ2IsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUNaLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztn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QixHQUFHLEtBQUssQ0FBQztRQUNuQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDbkMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZUFBZSxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztZQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLENBQUM7SUFDTCxDQUFDO0lBRUQsdUNBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQW5KUSxzQkFBc0I7UUFObEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLCtEQUErRDtZQUM1RSxTQUFTLEVBQUUsQ0FBQyw4REFBOEQsQ0FBQztTQUM5RSxDQUFDO3lDQTBCOEIsZUFBTSxFQUFrQixhQUFNLEVBQTBCLGdDQUFjLEVBQXVCLG9DQUFXO09BeEIzSCxzQkFBc0IsQ0FvSmxDO0lBQUQsNkJBQUM7Q0FwSkQsQUFvSkMsSUFBQTtBQXBKWSx3REFBc0IiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvc3R1ZGVudC1tYW5hZ2Uvc3R1ZGVudC1tYW5hZ2UuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdHVkZW50XCI7XHJcbmltcG9ydCB7IENvbnNlbnRGb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb25zZW50Rm9ybVwiO1xyXG5pbXBvcnQgeyBTdWl0YWJpbGl0eUZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N1aXRhYmlsaXR5Rm9ybVwiO1xyXG5pbXBvcnQgeyBMZWFybmluZ1N0eWxlRm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvbGVhcm5pbmdTdHlsZUZvcm1cIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2VcIjtcclxuXHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdzdHVkZW50LW1hbmFnZScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvc3R1ZGVudC1tYW5hZ2Uvc3R1ZGVudC1tYW5hZ2UuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvc3R1ZGVudC1tYW5hZ2Uvc3R1ZGVudC1tYW5hZ2UuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU3R1ZGVudE1hbmFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBzdHVkZW50czogU3R1ZGVudCBbXTtcclxuICAgIGVycm9yOiBhbnk7XHJcbiAgICBzdHVkZW50SW5mb1ZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHN0dWRlbnRWaWV3OiBTdHVkZW50O1xyXG4gICAgY29uc2VudFZpZXc6IENvbnNlbnRGb3JtO1xyXG4gICAgc3VpdGFiaWxpdHlWaWV3OiBTdWl0YWJpbGl0eUZvcm07XHJcbiAgICBsZWFybmluZ1N0eWxlVmlldzogTGVhcm5pbmdTdHlsZUZvcm07XHJcbiAgICBzaG93R2VuZXJhbDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBzaG93U3VpdGFiaWxpdHk6IGJvb2xlYW47XHJcbiAgICBzaG93Q29uc2VudDogYm9vbGVhbjtcclxuICAgIHNob3dMZWFybmluZ1N0eWxlOiBib29sZWFuO1xyXG5cclxuICAgIC8vYmFyIGNoYXJ0IChsZWFybmluZyBzdHlsZSlcclxuICAgIGJhckNoYXJ0T3B0aW9uczphbnkgPSB7XHJcbiAgICAgIHNjYWxlU2hvd1ZlcnRpY2FsTGluZXM6IGZhbHNlLFxyXG4gICAgICByZXNwb25zaXZlOiB0cnVlXHJcbiAgICB9O1xyXG4gICAgYmFyQ2hhcnRMYWJlbHM6c3RyaW5nW10gPSBbJ0hlYXJpbmcnLCAnU2VlaW5nJywgJ0RvaW5nJ107XHJcbiAgICBiYXJDaGFydFR5cGU6c3RyaW5nID0gJ2Jhcic7XHJcbiAgICBiYXJDaGFydExlZ2VuZDpib29sZWFuID0gZmFsc2U7XHJcbiAgICBiYXJDaGFydERhdGE6YW55O1xyXG4gICAgYmFyQ2hhcnRDb2xvcnM6IGFueVtdID0gW3sgYmFja2dyb3VuZENvbG9yOiBbXCIjRkY0MjA3XCIsIFwiI0Y4RTkwM1wiLCBcIiMyQUQzMDhcIl0gfV07XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSBzdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0U3R1ZGVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdHVkZW50cygpIHtcclxuICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgIC5nZXRTdHVkZW50cygpXHJcbiAgICAgICAgLnRoZW4oc3R1ZGVudHMgPT4ge1xyXG4gICAgICAgICAgaWYgKHN0dWRlbnRzLnN0YXR1cyA9PT0gXCI0MDNcIikge1xyXG4gICAgICAgICAgICB0aGlzLnN0dWRlbnRzID0gbnVsbDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3R1ZGVudHMgPSBzdHVkZW50cztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZENsaWVudCgpIHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3VpdGFiaWxpdHknXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ290b0VkaXQoc3R1ZGVudDogU3R1ZGVudCwgZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3N0dWRlbnQtZWRpdCcsIHN0dWRlbnQuc3R1ZGVudElEXSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkU3R1ZGVudCgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zdHVkZW50LWVkaXQnLCAnbmV3J10pO1xyXG4gICAgfVxyXG5cclxuICAgIGFyY2hpdmVBbGVydChzdHVkZW50OiBTdHVkZW50LCBldmVudDogYW55KSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdBcmNoaXZlIHN0dWRlbnQgKCcgKyBzdHVkZW50LmZpcnN0TmFtZSArICcgJyArIHN0dWRlbnQubGFzdE5hbWUgKyAnKScsXHJcbiAgICAgICAgICB0ZXh0OiBcIkFyZSB5b3Ugc3VyZSB3YW50IHRvIGRvIHRoaXM/XCIsXHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIEFyY2hpdmUgaXQhJ1xyXG4gICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgdGhpcy5hcmNoaXZlU3R1ZGVudChzdHVkZW50LCBldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhcmNoaXZlU3R1ZGVudChzdHVkZW50LCBldmVudCk6IHZvaWQge1xyXG4gICAgICBzd2FsKFxyXG4gICAgICAgICAgJ1NvcnJ5Li4uJyxcclxuICAgICAgICAgICdUaGlzIGZ1bmN0aW9uYWxpdHkgaXMgbm90IHlldCBhdmFpbGFibGUnLFxyXG4gICAgICAgICAgJ2luZm8nXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9wdWxhdGVQUkYoc3R1ZGVudCkge1xyXG4gICAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgICAgLnBvcHVsYXRlUFJGKHN0dWRlbnQudXNlcklEKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgJ1NvcnJ5Li4uJyxcclxuICAgICAgICAgICAgICAgICAgJ1RoaXMgZmVhdHVyZSBpcyBub3QgeWV0IGF2YWlsYWJsZScsXHJcbiAgICAgICAgICAgICAgICAgICdpbmZvJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIHZpZXdJbmZvKHN0dWRlbnQ6IFN0dWRlbnQpIHtcclxuICAgICAgdGhpcy5zaG93R2VuZXJhbCA9IHRydWU7XHJcbiAgICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc2hvd0NvbnNlbnQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zaG93TGVhcm5pbmdTdHlsZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN0dWRlbnRJbmZvVmlldyA9IHRydWU7XHJcbiAgICAgIHRoaXMuc3R1ZGVudFZpZXcgPSBzdHVkZW50O1xyXG4gICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgLmdldEFsbEZvcm1zQnlJRChzdHVkZW50KVxyXG4gICAgICAgIC50aGVuKGZvcm1zID0+IHtcclxuICAgICAgICAgIGlmIChmb3Jtcy5zdGF0dXMgPT09IFwiNDAzXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50VmlldyA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZVZpZXcgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnN1aXRhYmlsaXR5VmlldyA9IG51bGw7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnRWaWV3ID0gZm9ybXMuY29uc2VudEZvcm1bMF07XHJcbiAgICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZVZpZXcgPSBmb3Jtcy5sZWFybmluZ1N0eWxlRm9ybVswXTtcclxuICAgICAgICAgICAgdGhpcy5zdWl0YWJpbGl0eVZpZXcgPSBmb3Jtcy5zdWl0YWJpbGl0eUZvcm1bMF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBvdmVyYWxsU3RhdHVzKCkge1xyXG4gICAgICB0aGlzLnN0dWRlbnRJbmZvVmlldyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNlY3Rpb25CdG5DbGlja2VkKGV2ZW50LCBzZWN0aW9uKSB7XHJcbiAgICAgICAgaWYgKHNlY3Rpb24gPT09IFwiZ2VuZXJhbFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0dlbmVyYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dTdWl0YWJpbGl0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dDb25zZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0xlYXJuaW5nU3R5bGUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNlY3Rpb24gPT09IFwic3VpdGFiaWxpdHlcIikge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dHZW5lcmFsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93Q29uc2VudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dMZWFybmluZ1N0eWxlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzZWN0aW9uID09PSBcImNvbnNlbnRcIikge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dHZW5lcmFsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0NvbnNlbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dMZWFybmluZ1N0eWxlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzZWN0aW9uID09PSBcImxlYXJuaW5nU3R5bGVcIikge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dHZW5lcmFsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0NvbnNlbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93TGVhcm5pbmdTdHlsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICB9XHJcbn1cclxuIl19
