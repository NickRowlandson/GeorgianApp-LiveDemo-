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
        this.newCourse = false;
        this.manageCourses = false;
        this.assignStudentCourse = false;
        this.caseNotes = false;
        this.timetable = false;
        this.consent = false;
        this.learningStyle = false;
        this.attendanceReport = false;
        this.attendanceTaking = false;
        this.manageStaff = false;
    }
    HelpComponent.prototype.open = function (page) {
        this.home = false;
        this.login = false;
        this.resetPass = false;
        this.newClient = false;
        this.manageClients = false;
        this.createStudent = false;
        this.manageStudents = false;
        this.newCourse = false;
        this.manageCourses = false;
        this.manageStaff = false;
        this.assignStudentCourse = false;
        this.caseNotes = false;
        this.timetable = false;
        this.consent = false;
        this.learningStyle = false;
        this.attendanceReport = false;
        this.attendanceTaking = false;
        console.log(page);
        if (page === 'home') {
            this.home = true;
        }
        else if (page === 'login') {
            this.login = true;
        }
        else if (page === 'resetPass') {
            this.resetPass = true;
        }
        else if (page === 'newClient') {
            this.newClient = true;
        }
        else if (page === 'manageClients') {
            this.manageClients = true;
        }
        else if (page === 'createStudent') {
            this.createStudent = true;
        }
        else if (page === 'manageStudents') {
            this.manageStudents = true;
        }
        else if (page === 'manageStaff') {
            this.manageStaff = true;
        }
        else if (page === 'newCourse') {
            this.newCourse = true;
        }
        else if (page === 'manageCourses') {
            this.manageCourses = true;
        }
        else if (page === 'assignStudentCourse') {
            this.assignStudentCourse = true;
        }
        else if (page === 'caseNotes') {
            this.caseNotes = true;
        }
        else if (page === 'timetable') {
            this.timetable = true;
        }
        else if (page === 'consent') {
            this.consent = true;
        }
        else if (page === 'learningStyle') {
            this.learningStyle = true;
        }
        else if (page === 'attendanceReport') {
            this.attendanceReport = true;
        }
        else if (page === 'attendanceTaking') {
            this.attendanceTaking = true;
        }
        else {
            this.home = true;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9oZWxwL2hlbHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWlEO0FBQ2pELDBDQUF5QztBQUV6QyxnRUFBOEQ7QUFDOUQsZ0ZBQW9FO0FBU3BFO0lBbUJFLHVCQUFvQixhQUE0QixFQUFVLE1BQWMsRUFBVSxXQUF3QjtRQUF0RixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQWxCMUcsU0FBSSxHQUFZLElBQUksQ0FBQztRQUNyQixVQUFLLEdBQVksS0FBSyxDQUFDO1FBQ3ZCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLGdCQUFXLEdBQVksS0FBSyxDQUFDO0lBSTdCLENBQUM7SUFFRCw0QkFBSSxHQUFKLFVBQUssSUFBSTtRQUNQLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbkIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNwQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzVCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUM3QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzFCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztRQUNsQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzVCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQy9CLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQy9CLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ25CLENBQUM7SUFDSCxDQUFDO0lBRUQsOEJBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQW5GVSxhQUFhO1FBTnpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTTtZQUNoQixXQUFXLEVBQUUsMkNBQTJDO1lBQ3hELFNBQVMsRUFBRSxDQUFDLDBDQUEwQyxDQUFDO1NBQzFELENBQUM7eUNBcUJtQyw4QkFBYSxFQUFrQixlQUFNLEVBQXVCLG9DQUFXO09BbkIvRixhQUFhLENBb0Z6QjtJQUFELG9CQUFDO0NBcEZELEFBb0ZDLElBQUE7QUFwRlksc0NBQWEiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvaGVscC9oZWxwLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgTGVhcm5pbmdTdHlsZUZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2xlYXJuaW5nU3R5bGVGb3JtXCI7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY2xpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2hlbHAnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2hlbHAvaGVscC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9oZWxwL2hlbHAuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgSGVscENvbXBvbmVudCB7XHJcbiAgaG9tZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgbG9naW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICByZXNldFBhc3M6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBuZXdDbGllbnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBtYW5hZ2VDbGllbnRzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgY3JlYXRlU3R1ZGVudDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIG1hbmFnZVN0dWRlbnRzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgbmV3Q291cnNlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgbWFuYWdlQ291cnNlczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGFzc2lnblN0dWRlbnRDb3Vyc2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBjYXNlTm90ZXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICB0aW1ldGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBjb25zZW50OiBib29sZWFuID0gZmFsc2U7XHJcbiAgbGVhcm5pbmdTdHlsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGF0dGVuZGFuY2VSZXBvcnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBhdHRlbmRhbmNlVGFraW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgbWFuYWdlU3RhZmY6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjbGllbnRTZXJ2aWNlOiBDbGllbnRTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG9wZW4ocGFnZSkge1xyXG4gICAgdGhpcy5ob21lID0gZmFsc2U7XHJcbiAgICB0aGlzLmxvZ2luID0gZmFsc2U7XHJcbiAgICB0aGlzLnJlc2V0UGFzcyA9IGZhbHNlO1xyXG4gICAgdGhpcy5uZXdDbGllbnQgPSBmYWxzZTtcclxuICAgIHRoaXMubWFuYWdlQ2xpZW50cyA9IGZhbHNlO1xyXG4gICAgdGhpcy5jcmVhdGVTdHVkZW50ID0gZmFsc2U7XHJcbiAgICB0aGlzLm1hbmFnZVN0dWRlbnRzID0gZmFsc2U7XHJcbiAgICB0aGlzLm5ld0NvdXJzZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5tYW5hZ2VDb3Vyc2VzID0gZmFsc2U7XHJcbiAgICB0aGlzLm1hbmFnZVN0YWZmID0gZmFsc2U7XHJcbiAgICB0aGlzLmFzc2lnblN0dWRlbnRDb3Vyc2UgPSBmYWxzZTtcclxuICAgIHRoaXMuY2FzZU5vdGVzID0gZmFsc2U7XHJcbiAgICB0aGlzLnRpbWV0YWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5jb25zZW50ID0gZmFsc2U7XHJcbiAgICB0aGlzLmxlYXJuaW5nU3R5bGUgPSBmYWxzZTtcclxuICAgIHRoaXMuYXR0ZW5kYW5jZVJlcG9ydCA9IGZhbHNlO1xyXG4gICAgdGhpcy5hdHRlbmRhbmNlVGFraW5nID0gZmFsc2U7XHJcbiAgICBjb25zb2xlLmxvZyhwYWdlKTtcclxuICAgIGlmIChwYWdlID09PSAnaG9tZScpIHtcclxuICAgICAgdGhpcy5ob21lID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gJ2xvZ2luJykge1xyXG4gICAgICB0aGlzLmxvZ2luID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gJ3Jlc2V0UGFzcycpIHtcclxuICAgICAgdGhpcy5yZXNldFBhc3MgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChwYWdlID09PSAnbmV3Q2xpZW50Jykge1xyXG4gICAgICB0aGlzLm5ld0NsaWVudCA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHBhZ2UgPT09ICdtYW5hZ2VDbGllbnRzJykge1xyXG4gICAgICB0aGlzLm1hbmFnZUNsaWVudHMgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChwYWdlID09PSAnY3JlYXRlU3R1ZGVudCcpIHtcclxuICAgICAgdGhpcy5jcmVhdGVTdHVkZW50ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gJ21hbmFnZVN0dWRlbnRzJykge1xyXG4gICAgICB0aGlzLm1hbmFnZVN0dWRlbnRzID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gJ21hbmFnZVN0YWZmJykge1xyXG4gICAgICB0aGlzLm1hbmFnZVN0YWZmID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gJ25ld0NvdXJzZScpIHtcclxuICAgICAgdGhpcy5uZXdDb3Vyc2UgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChwYWdlID09PSAnbWFuYWdlQ291cnNlcycpIHtcclxuICAgICAgdGhpcy5tYW5hZ2VDb3Vyc2VzID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gJ2Fzc2lnblN0dWRlbnRDb3Vyc2UnKSB7XHJcbiAgICAgIHRoaXMuYXNzaWduU3R1ZGVudENvdXJzZSA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHBhZ2UgPT09ICdjYXNlTm90ZXMnKSB7XHJcbiAgICAgIHRoaXMuY2FzZU5vdGVzID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gJ3RpbWV0YWJsZScpIHtcclxuICAgICAgdGhpcy50aW1ldGFibGUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChwYWdlID09PSAnY29uc2VudCcpIHtcclxuICAgICAgdGhpcy5jb25zZW50ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gJ2xlYXJuaW5nU3R5bGUnKSB7XHJcbiAgICAgIHRoaXMubGVhcm5pbmdTdHlsZSA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHBhZ2UgPT09ICdhdHRlbmRhbmNlUmVwb3J0Jykge1xyXG4gICAgICB0aGlzLmF0dGVuZGFuY2VSZXBvcnQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChwYWdlID09PSAnYXR0ZW5kYW5jZVRha2luZycpIHtcclxuICAgICAgdGhpcy5hdHRlbmRhbmNlVGFraW5nID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaG9tZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
