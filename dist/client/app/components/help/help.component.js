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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9oZWxwL2hlbHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWlEO0FBQ2pELDBDQUF5QztBQUV6QyxnRUFBOEQ7QUFDOUQsZ0ZBQW9FO0FBU3BFO0lBbUJFLHVCQUFvQixhQUE0QixFQUFVLE1BQWMsRUFBVSxXQUF3QjtRQUF0RixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQWxCbkcsU0FBSSxHQUFZLElBQUksQ0FBQztRQUNyQixVQUFLLEdBQVksS0FBSyxDQUFDO1FBQ3ZCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLGdCQUFXLEdBQVksS0FBSyxDQUFDO0lBSXBDLENBQUM7SUFFRCw0QkFBSSxHQUFKLFVBQUssSUFBSTtRQUNQLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbkIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNwQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzVCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUM3QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzFCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztRQUNsQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzVCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQy9CLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQy9CLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ25CLENBQUM7SUFDSCxDQUFDO0lBRUQsOEJBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQW5GVSxhQUFhO1FBTnpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTTtZQUNoQixXQUFXLEVBQUUsMkNBQTJDO1lBQ3hELFNBQVMsRUFBRSxDQUFDLDBDQUEwQyxDQUFDO1NBQzFELENBQUM7eUNBcUJtQyw4QkFBYSxFQUFrQixlQUFNLEVBQXVCLG9DQUFXO09BbkIvRixhQUFhLENBb0Z6QjtJQUFELG9CQUFDO0NBcEZELEFBb0ZDLElBQUE7QUFwRlksc0NBQWEiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvaGVscC9oZWxwLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgTGVhcm5pbmdTdHlsZUZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2xlYXJuaW5nU3R5bGVGb3JtXCI7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY2xpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2hlbHAnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2hlbHAvaGVscC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9oZWxwL2hlbHAuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgSGVscENvbXBvbmVudCB7XHJcbiAgcHVibGljIGhvbWU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHB1YmxpYyBsb2dpbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyByZXNldFBhc3M6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgbmV3Q2xpZW50OiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIG1hbmFnZUNsaWVudHM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgY3JlYXRlU3R1ZGVudDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBtYW5hZ2VTdHVkZW50czogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBuZXdDb3Vyc2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgbWFuYWdlQ291cnNlczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBhc3NpZ25TdHVkZW50Q291cnNlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIGNhc2VOb3RlczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyB0aW1ldGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgY29uc2VudDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBsZWFybmluZ1N0eWxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIGF0dGVuZGFuY2VSZXBvcnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgYXR0ZW5kYW5jZVRha2luZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBtYW5hZ2VTdGFmZjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNsaWVudFNlcnZpY2U6IENsaWVudFNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgb3BlbihwYWdlKSB7XHJcbiAgICB0aGlzLmhvbWUgPSBmYWxzZTtcclxuICAgIHRoaXMubG9naW4gPSBmYWxzZTtcclxuICAgIHRoaXMucmVzZXRQYXNzID0gZmFsc2U7XHJcbiAgICB0aGlzLm5ld0NsaWVudCA9IGZhbHNlO1xyXG4gICAgdGhpcy5tYW5hZ2VDbGllbnRzID0gZmFsc2U7XHJcbiAgICB0aGlzLmNyZWF0ZVN0dWRlbnQgPSBmYWxzZTtcclxuICAgIHRoaXMubWFuYWdlU3R1ZGVudHMgPSBmYWxzZTtcclxuICAgIHRoaXMubmV3Q291cnNlID0gZmFsc2U7XHJcbiAgICB0aGlzLm1hbmFnZUNvdXJzZXMgPSBmYWxzZTtcclxuICAgIHRoaXMubWFuYWdlU3RhZmYgPSBmYWxzZTtcclxuICAgIHRoaXMuYXNzaWduU3R1ZGVudENvdXJzZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5jYXNlTm90ZXMgPSBmYWxzZTtcclxuICAgIHRoaXMudGltZXRhYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLmNvbnNlbnQgPSBmYWxzZTtcclxuICAgIHRoaXMubGVhcm5pbmdTdHlsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5hdHRlbmRhbmNlUmVwb3J0ID0gZmFsc2U7XHJcbiAgICB0aGlzLmF0dGVuZGFuY2VUYWtpbmcgPSBmYWxzZTtcclxuICAgIGNvbnNvbGUubG9nKHBhZ2UpO1xyXG4gICAgaWYgKHBhZ2UgPT09ICdob21lJykge1xyXG4gICAgICB0aGlzLmhvbWUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChwYWdlID09PSAnbG9naW4nKSB7XHJcbiAgICAgIHRoaXMubG9naW4gPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChwYWdlID09PSAncmVzZXRQYXNzJykge1xyXG4gICAgICB0aGlzLnJlc2V0UGFzcyA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHBhZ2UgPT09ICduZXdDbGllbnQnKSB7XHJcbiAgICAgIHRoaXMubmV3Q2xpZW50ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gJ21hbmFnZUNsaWVudHMnKSB7XHJcbiAgICAgIHRoaXMubWFuYWdlQ2xpZW50cyA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHBhZ2UgPT09ICdjcmVhdGVTdHVkZW50Jykge1xyXG4gICAgICB0aGlzLmNyZWF0ZVN0dWRlbnQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChwYWdlID09PSAnbWFuYWdlU3R1ZGVudHMnKSB7XHJcbiAgICAgIHRoaXMubWFuYWdlU3R1ZGVudHMgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChwYWdlID09PSAnbWFuYWdlU3RhZmYnKSB7XHJcbiAgICAgIHRoaXMubWFuYWdlU3RhZmYgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChwYWdlID09PSAnbmV3Q291cnNlJykge1xyXG4gICAgICB0aGlzLm5ld0NvdXJzZSA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHBhZ2UgPT09ICdtYW5hZ2VDb3Vyc2VzJykge1xyXG4gICAgICB0aGlzLm1hbmFnZUNvdXJzZXMgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChwYWdlID09PSAnYXNzaWduU3R1ZGVudENvdXJzZScpIHtcclxuICAgICAgdGhpcy5hc3NpZ25TdHVkZW50Q291cnNlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gJ2Nhc2VOb3RlcycpIHtcclxuICAgICAgdGhpcy5jYXNlTm90ZXMgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChwYWdlID09PSAndGltZXRhYmxlJykge1xyXG4gICAgICB0aGlzLnRpbWV0YWJsZSA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHBhZ2UgPT09ICdjb25zZW50Jykge1xyXG4gICAgICB0aGlzLmNvbnNlbnQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChwYWdlID09PSAnbGVhcm5pbmdTdHlsZScpIHtcclxuICAgICAgdGhpcy5sZWFybmluZ1N0eWxlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gJ2F0dGVuZGFuY2VSZXBvcnQnKSB7XHJcbiAgICAgIHRoaXMuYXR0ZW5kYW5jZVJlcG9ydCA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHBhZ2UgPT09ICdhdHRlbmRhbmNlVGFraW5nJykge1xyXG4gICAgICB0aGlzLmF0dGVuZGFuY2VUYWtpbmcgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5ob21lID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=
