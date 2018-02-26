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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9oZWxwL2hlbHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWlEO0FBQ2pELDBDQUF5QztBQUV6QyxnRUFBOEQ7QUFDOUQsZ0ZBQW9FO0FBU3BFO0lBa0JFLHVCQUFvQixhQUE0QixFQUFVLE1BQWMsRUFBVSxXQUF3QjtRQUF0RixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQWpCMUcsU0FBSSxHQUFZLElBQUksQ0FBQztRQUNyQixVQUFLLEdBQVksS0FBSyxDQUFDO1FBQ3ZCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQix3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFDckMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQyxnQkFBVyxHQUFZLEtBQUssQ0FBQztJQUk3QixDQUFDO0lBRUQsNEJBQUksR0FBSixVQUFLLElBQUk7UUFDUCxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUU5QixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2IsS0FBSyxNQUFNO2dCQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUMxQixLQUFLLE9BQU87Z0JBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQzNCLEtBQUssV0FBVztnQkFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDL0IsS0FBSyxXQUFXO2dCQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUMvQixLQUFLLGVBQWU7Z0JBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUNuQyxLQUFLLGVBQWU7Z0JBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUNuQyxLQUFLLGdCQUFnQjtnQkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQ3BDLEtBQUssYUFBYTtnQkFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLEtBQUssZUFBZTtnQkFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQ25DLEtBQUsscUJBQXFCO2dCQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztZQUN6QyxLQUFLLFdBQVc7Z0JBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQy9CLEtBQUssU0FBUztnQkFDWixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDN0IsS0FBSyxlQUFlO2dCQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDbkMsS0FBSyxrQkFBa0I7Z0JBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1lBQ3RDLEtBQUssa0JBQWtCO2dCQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztZQUN0QyxLQUFLLFdBQVc7Z0JBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQy9CO2dCQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDO0lBQ0gsQ0FBQztJQUVELDhCQUFNLEdBQU47UUFDRSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFoRlUsYUFBYTtRQU56QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU07WUFDaEIsV0FBVyxFQUFFLDJDQUEyQztZQUN4RCxTQUFTLEVBQUUsQ0FBQywwQ0FBMEMsQ0FBQztTQUN4RCxDQUFDO3lDQW9CbUMsOEJBQWEsRUFBa0IsZUFBTSxFQUF1QixvQ0FBVztPQWxCL0YsYUFBYSxDQWlGekI7SUFBRCxvQkFBQztDQWpGRCxBQWlGQyxJQUFBO0FBakZZLHNDQUFhIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2hlbHAvaGVscC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IExlYXJuaW5nU3R5bGVGb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9sZWFybmluZ1N0eWxlRm9ybVwiO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaGVscCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2hlbHAvaGVscC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvaGVscC9oZWxwLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEhlbHBDb21wb25lbnQge1xyXG4gIGhvbWU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIGxvZ2luOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcmVzZXRQYXNzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgbmV3Q2xpZW50OiBib29sZWFuID0gZmFsc2U7XHJcbiAgbWFuYWdlQ2xpZW50czogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGNyZWF0ZVN0dWRlbnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBtYW5hZ2VTdHVkZW50czogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIG1hbmFnZUNvdXJzZXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBhc3NpZ25TdHVkZW50Q291cnNlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgY2FzZU5vdGVzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgdGltZXRhYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgY29uc2VudDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGxlYXJuaW5nU3R5bGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBhdHRlbmRhbmNlUmVwb3J0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgYXR0ZW5kYW5jZVRha2luZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIG1hbmFnZVN0YWZmOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcclxuXHJcbiAgfVxyXG5cclxuICBvcGVuKHBhZ2UpIHtcclxuICAgIHRoaXMuaG9tZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5sb2dpbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5yZXNldFBhc3MgPSBmYWxzZTtcclxuICAgIHRoaXMubmV3Q2xpZW50ID0gZmFsc2U7XHJcbiAgICB0aGlzLm1hbmFnZUNsaWVudHMgPSBmYWxzZTtcclxuICAgIHRoaXMuY3JlYXRlU3R1ZGVudCA9IGZhbHNlO1xyXG4gICAgdGhpcy5tYW5hZ2VTdHVkZW50cyA9IGZhbHNlO1xyXG4gICAgdGhpcy5tYW5hZ2VDb3Vyc2VzID0gZmFsc2U7XHJcbiAgICB0aGlzLm1hbmFnZVN0YWZmID0gZmFsc2U7XHJcbiAgICB0aGlzLmFzc2lnblN0dWRlbnRDb3Vyc2UgPSBmYWxzZTtcclxuICAgIHRoaXMuY2FzZU5vdGVzID0gZmFsc2U7XHJcbiAgICB0aGlzLnRpbWV0YWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5jb25zZW50ID0gZmFsc2U7XHJcbiAgICB0aGlzLmxlYXJuaW5nU3R5bGUgPSBmYWxzZTtcclxuICAgIHRoaXMuYXR0ZW5kYW5jZVJlcG9ydCA9IGZhbHNlO1xyXG4gICAgdGhpcy5hdHRlbmRhbmNlVGFraW5nID0gZmFsc2U7XHJcblxyXG4gICAgc3dpdGNoIChwYWdlKSB7XHJcbiAgICAgIGNhc2UgJ2hvbWUnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLmhvbWUgPSB0cnVlO1xyXG4gICAgICBjYXNlICdsb2dpbic6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9naW4gPSB0cnVlO1xyXG4gICAgICBjYXNlICdyZXNldFBhc3MnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc2V0UGFzcyA9IHRydWU7XHJcbiAgICAgIGNhc2UgJ25ld0NsaWVudCc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmV3Q2xpZW50ID0gdHJ1ZTtcclxuICAgICAgY2FzZSAnbWFuYWdlQ2xpZW50cyc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFuYWdlQ2xpZW50cyA9IHRydWU7XHJcbiAgICAgIGNhc2UgJ2NyZWF0ZVN0dWRlbnQnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVN0dWRlbnQgPSB0cnVlO1xyXG4gICAgICBjYXNlICdtYW5hZ2VTdHVkZW50cyc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFuYWdlU3R1ZGVudHMgPSB0cnVlO1xyXG4gICAgICBjYXNlICdtYW5hZ2VTdGFmZic6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFuYWdlU3RhZmYgPSB0cnVlO1xyXG4gICAgICBjYXNlICdtYW5hZ2VDb3Vyc2VzJzpcclxuICAgICAgICByZXR1cm4gdGhpcy5tYW5hZ2VDb3Vyc2VzID0gdHJ1ZTtcclxuICAgICAgY2FzZSAnYXNzaWduU3R1ZGVudENvdXJzZSc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXNzaWduU3R1ZGVudENvdXJzZSA9IHRydWU7XHJcbiAgICAgIGNhc2UgJ3RpbWV0YWJsZSc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXRhYmxlID0gdHJ1ZTtcclxuICAgICAgY2FzZSAnY29uc2VudCc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc2VudCA9IHRydWU7XHJcbiAgICAgIGNhc2UgJ2xlYXJuaW5nU3R5bGUnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLmxlYXJuaW5nU3R5bGUgPSB0cnVlO1xyXG4gICAgICBjYXNlICdhdHRlbmRhbmNlUmVwb3J0JzpcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRlbmRhbmNlUmVwb3J0ID0gdHJ1ZTtcclxuICAgICAgY2FzZSAnYXR0ZW5kYW5jZVRha2luZyc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0ZW5kYW5jZVRha2luZyA9IHRydWU7XHJcbiAgICAgIGNhc2UgJ2Nhc2VOb3Rlcyc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FzZU5vdGVzID0gdHJ1ZTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gdGhpcy5ob21lID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
