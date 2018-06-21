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
var client_service_1 = require("../../services/client.service");
var authentication_service_1 = require("../../services/authentication.service");
var HelpComponent = /** @class */ (function () {
    function HelpComponent(clientService, router, authService) {
        this.clientService = clientService;
        this.router = router;
        this.authService = authService;
        this.home = true;
        this.login = false;
        this.resetPass = false;
        this.newClient = false;
        this.manageClients = false;
        this.createStudent = false;
        this.manageStudents = false;
        this.manageCourses = false;
        this.assignStudentCourse = false;
        this.caseNotes = false;
        this.timetable = false;
        this.consent = false;
        this.learningStyle = false;
        this.attendanceReport = false;
        this.attendanceTaking = false;
        this.manageStaff = false;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userType = currentUser.userType;
    }
    HelpComponent.prototype.open = function (page) {
        this.home = false;
        this.login = false;
        this.resetPass = false;
        this.newClient = false;
        this.manageClients = false;
        this.createStudent = false;
        this.manageStudents = false;
        this.manageCourses = false;
        this.manageStaff = false;
        this.assignStudentCourse = false;
        this.caseNotes = false;
        this.timetable = false;
        this.consent = false;
        this.learningStyle = false;
        this.attendanceReport = false;
        this.attendanceTaking = false;
        switch (page) {
            case 'home':
                return this.home = true;
            case 'login':
                return this.login = true;
            case 'resetPass':
                return this.resetPass = true;
            case 'newClient':
                return this.newClient = true;
            case 'manageClients':
                return this.manageClients = true;
            case 'createStudent':
                return this.createStudent = true;
            case 'manageStudents':
                return this.manageStudents = true;
            case 'manageStaff':
                return this.manageStaff = true;
            case 'manageCourses':
                return this.manageCourses = true;
            case 'assignStudentCourse':
                return this.assignStudentCourse = true;
            case 'timetable':
                return this.timetable = true;
            case 'consent':
                return this.consent = true;
            case 'learningStyle':
                return this.learningStyle = true;
            case 'attendanceReport':
                return this.attendanceReport = true;
            case 'attendanceTaking':
                return this.attendanceTaking = true;
            case 'caseNotes':
                return this.caseNotes = true;
            default:
                return this.home = true;
        }
    };
    HelpComponent.prototype.goBack = function () {
        window.history.back();
    };
    HelpComponent = __decorate([
        core_1.Component({
            selector: 'help',
            templateUrl: './app/components/help/help.component.html',
            styleUrls: ['./app/components/help/help.component.css']
        }),
        __metadata("design:paramtypes", [client_service_1.ClientService, router_1.Router, authentication_service_1.AuthService])
    ], HelpComponent);
    return HelpComponent;
}());
exports.HelpComponent = HelpComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9oZWxwL2hlbHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWlEO0FBQ2pELDBDQUF5QztBQUV6QyxnRUFBOEQ7QUFDOUQsZ0ZBQW9FO0FBU3BFO0lBbUJFLHVCQUFvQixhQUE0QixFQUFVLE1BQWMsRUFBVSxXQUF3QjtRQUF0RixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQWpCMUcsU0FBSSxHQUFZLElBQUksQ0FBQztRQUNyQixVQUFLLEdBQVksS0FBSyxDQUFDO1FBQ3ZCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQix3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFDckMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUczQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7SUFDdkMsQ0FBQztJQUVELDRCQUFJLEdBQUosVUFBSyxJQUFJO1FBQ1AsSUFBSSxDQUFDLElB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O09BbkIvRixhQUFhLENBbUZ6QjtJQUFELG9CQUFDO0NBbkZELEFBbUZDLElBQUE7QUFuRlksc0NBQWEiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvaGVscC9oZWxwLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgTGVhcm5pbmdTdHlsZUZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2xlYXJuaW5nU3R5bGVGb3JtXCI7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY2xpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdoZWxwJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvaGVscC9oZWxwLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9oZWxwL2hlbHAuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgSGVscENvbXBvbmVudCB7XHJcbiAgcHJpdmF0ZSB1c2VyVHlwZTogc3RyaW5nO1xyXG4gIGhvbWU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIGxvZ2luOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcmVzZXRQYXNzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgbmV3Q2xpZW50OiBib29sZWFuID0gZmFsc2U7XHJcbiAgbWFuYWdlQ2xpZW50czogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGNyZWF0ZVN0dWRlbnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBtYW5hZ2VTdHVkZW50czogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIG1hbmFnZUNvdXJzZXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBhc3NpZ25TdHVkZW50Q291cnNlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgY2FzZU5vdGVzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgdGltZXRhYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgY29uc2VudDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGxlYXJuaW5nU3R5bGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBhdHRlbmRhbmNlUmVwb3J0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgYXR0ZW5kYW5jZVRha2luZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIG1hbmFnZVN0YWZmOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcclxuICAgIHZhciBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgdGhpcy51c2VyVHlwZSA9IGN1cnJlbnRVc2VyLnVzZXJUeXBlO1xyXG4gIH1cclxuXHJcbiAgb3BlbihwYWdlKSB7XHJcbiAgICB0aGlzLmhvbWUgPSBmYWxzZTtcclxuICAgIHRoaXMubG9naW4gPSBmYWxzZTtcclxuICAgIHRoaXMucmVzZXRQYXNzID0gZmFsc2U7XHJcbiAgICB0aGlzLm5ld0NsaWVudCA9IGZhbHNlO1xyXG4gICAgdGhpcy5tYW5hZ2VDbGllbnRzID0gZmFsc2U7XHJcbiAgICB0aGlzLmNyZWF0ZVN0dWRlbnQgPSBmYWxzZTtcclxuICAgIHRoaXMubWFuYWdlU3R1ZGVudHMgPSBmYWxzZTtcclxuICAgIHRoaXMubWFuYWdlQ291cnNlcyA9IGZhbHNlO1xyXG4gICAgdGhpcy5tYW5hZ2VTdGFmZiA9IGZhbHNlO1xyXG4gICAgdGhpcy5hc3NpZ25TdHVkZW50Q291cnNlID0gZmFsc2U7XHJcbiAgICB0aGlzLmNhc2VOb3RlcyA9IGZhbHNlO1xyXG4gICAgdGhpcy50aW1ldGFibGUgPSBmYWxzZTtcclxuICAgIHRoaXMuY29uc2VudCA9IGZhbHNlO1xyXG4gICAgdGhpcy5sZWFybmluZ1N0eWxlID0gZmFsc2U7XHJcbiAgICB0aGlzLmF0dGVuZGFuY2VSZXBvcnQgPSBmYWxzZTtcclxuICAgIHRoaXMuYXR0ZW5kYW5jZVRha2luZyA9IGZhbHNlO1xyXG5cclxuICAgIHN3aXRjaCAocGFnZSkge1xyXG4gICAgICBjYXNlICdob21lJzpcclxuICAgICAgICByZXR1cm4gdGhpcy5ob21lID0gdHJ1ZTtcclxuICAgICAgY2FzZSAnbG9naW4nOlxyXG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2luID0gdHJ1ZTtcclxuICAgICAgY2FzZSAncmVzZXRQYXNzJzpcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXNldFBhc3MgPSB0cnVlO1xyXG4gICAgICBjYXNlICduZXdDbGllbnQnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLm5ld0NsaWVudCA9IHRydWU7XHJcbiAgICAgIGNhc2UgJ21hbmFnZUNsaWVudHMnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLm1hbmFnZUNsaWVudHMgPSB0cnVlO1xyXG4gICAgICBjYXNlICdjcmVhdGVTdHVkZW50JzpcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVTdHVkZW50ID0gdHJ1ZTtcclxuICAgICAgY2FzZSAnbWFuYWdlU3R1ZGVudHMnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLm1hbmFnZVN0dWRlbnRzID0gdHJ1ZTtcclxuICAgICAgY2FzZSAnbWFuYWdlU3RhZmYnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLm1hbmFnZVN0YWZmID0gdHJ1ZTtcclxuICAgICAgY2FzZSAnbWFuYWdlQ291cnNlcyc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFuYWdlQ291cnNlcyA9IHRydWU7XHJcbiAgICAgIGNhc2UgJ2Fzc2lnblN0dWRlbnRDb3Vyc2UnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLmFzc2lnblN0dWRlbnRDb3Vyc2UgPSB0cnVlO1xyXG4gICAgICBjYXNlICd0aW1ldGFibGUnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLnRpbWV0YWJsZSA9IHRydWU7XHJcbiAgICAgIGNhc2UgJ2NvbnNlbnQnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnNlbnQgPSB0cnVlO1xyXG4gICAgICBjYXNlICdsZWFybmluZ1N0eWxlJzpcclxuICAgICAgICByZXR1cm4gdGhpcy5sZWFybmluZ1N0eWxlID0gdHJ1ZTtcclxuICAgICAgY2FzZSAnYXR0ZW5kYW5jZVJlcG9ydCc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0ZW5kYW5jZVJlcG9ydCA9IHRydWU7XHJcbiAgICAgIGNhc2UgJ2F0dGVuZGFuY2VUYWtpbmcnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dGVuZGFuY2VUYWtpbmcgPSB0cnVlO1xyXG4gICAgICBjYXNlICdjYXNlTm90ZXMnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLmNhc2VOb3RlcyA9IHRydWU7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaG9tZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
