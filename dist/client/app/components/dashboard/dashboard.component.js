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
var authentication_service_1 = require("../../services/authentication.service");
var client_service_1 = require("../../services/client.service");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(router, authService, clientService) {
        this.router = router;
        this.authService = authService;
        this.clientService = clientService;
        //variables used to toggle dahsboard items
        this.clientStatus = false;
        this.manageStudents = false;
        this.manageStaff = false;
        this.suitability = false;
        this.consent = false;
        this.manageCourses = false;
        this.caseNotes = false;
        this.learningStyle = false;
        this.maesdprf = false;
        this.timetable = false;
        this.attendanceList = false;
        this.attendanceReport = false;
        this.files = false;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser.active) {
            this.router.navigate(['/reset-password']);
        }
        else {
            var userType = currentUser.userType;
            var userID = currentUser.userID;
            this.checkAuth(userType, userID);
            this.consentForm = true;
            this.learningStyleForm = true;
        }
    };
    DashboardComponent.prototype.checkAuth = function (userType, userID) {
        this.userType = userType;
        if (userType.indexOf('Admin') >= 0) {
            this.clientStatus = true;
            this.manageStudents = true;
            this.manageStaff = true;
            this.suitability = true;
            this.caseNotes = true;
            this.manageCourses = true;
            this.attendanceReport = true;
            this.attendanceList = true;
            this.timetable = true;
            this.consent = true;
            this.learningStyle = true;
            this.files = true;
        }
        if (userType.indexOf('Staff') >= 0) {
            this.clientStatus = true;
            this.manageStudents = true;
            this.suitability = true;
            this.timetable = true;
            this.caseNotes = true;
            this.manageCourses = true;
            this.attendanceReport = true;
            this.files = true;
        }
        if (userType.indexOf('Instructor') >= 0) {
            this.attendanceList = true;
            this.attendanceReport = true;
            this.timetable = true;
            this.caseNotes = true;
        }
        if (userType === 'Student') {
            this.timetable = true;
        }
        if (userType === 'Client') {
            this.consent = true;
            this.learningStyle = true;
            //this.maesdprf = true;
            this.checkFormStatus(userID);
        }
    };
    DashboardComponent.prototype.checkFormStatus = function (userID) {
        var _this = this;
        this.clientService
            .getClient(userID)
            .then(function (object) {
            if (object.status === "403") {
                _this.client = null;
                console.log("Error");
            }
            else {
                _this.client = object.client[0].firstName;
                _this.consentForm = object.client[0].consent;
                _this.learningStyleForm = object.client[0].learningStyle;
            }
        })
            .catch(function (error) { return console.log(error); });
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            templateUrl: './app/components/dashboard/dashboard.component.html',
            styleUrls: ['./app/components/dashboard/dashboard.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, authentication_service_1.AuthService, client_service_1.ClientService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsZ0ZBQW9FO0FBRXBFLGdFQUE4RDtBQVE5RDtJQXVCSSw0QkFBb0IsTUFBYyxFQUFVLFdBQXdCLEVBQVUsYUFBNEI7UUFBdEYsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFqQjFHLDBDQUEwQztRQUMxQyxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6QixVQUFLLEdBQUcsS0FBSyxDQUFDO0lBTWQsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFDSSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNsRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFB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Q2IsU0FBUyxDQUFDLE1BQU0sQ0FBQzthQUNqQixJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDekMsS0FBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDNUMsS0FBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO1lBQzVELENBQUM7UUFDTCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFsQixDQUFrQixDQUFDLENBQUM7SUFDNUMsQ0FBQztJQWpHUSxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSxxREFBcUQ7WUFDbEUsU0FBUyxFQUFFLENBQUMsb0RBQW9ELENBQUM7U0FDcEUsQ0FBQzt5Q0F5QjhCLGVBQU0sRUFBdUIsb0NBQVcsRUFBeUIsOEJBQWE7T0F2QmpHLGtCQUFrQixDQWtHOUI7SUFBRCx5QkFBQztDQWxHRCxBQWtHQyxJQUFBO0FBbEdZLGdEQUFrQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IENsaWVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2xpZW50XCI7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY2xpZW50LnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdkYXNoYm9hcmQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgY2xpZW50OiBDbGllbnRbXTtcclxuXHJcbiAgICBjb25zZW50Rm9ybTogYm9vbGVhbjtcclxuICAgIGxlYXJuaW5nU3R5bGVGb3JtOiBib29sZWFuO1xyXG5cclxuICAgIC8vdmFyaWFibGVzIHVzZWQgdG8gdG9nZ2xlIGRhaHNib2FyZCBpdGVtc1xyXG4gICAgY2xpZW50U3RhdHVzID0gZmFsc2U7XHJcbiAgICBtYW5hZ2VTdHVkZW50cyA9IGZhbHNlO1xyXG4gICAgbWFuYWdlU3RhZmYgPSBmYWxzZTtcclxuICAgIHN1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICBjb25zZW50ID0gZmFsc2U7XHJcbiAgICBtYW5hZ2VDb3Vyc2VzID0gZmFsc2U7XHJcbiAgICBjYXNlTm90ZXMgPSBmYWxzZTtcclxuICAgIGxlYXJuaW5nU3R5bGUgPSBmYWxzZTtcclxuICAgIG1hZXNkcHJmID0gZmFsc2U7XHJcbiAgICB0aW1ldGFibGUgPSBmYWxzZTtcclxuICAgIGF0dGVuZGFuY2VMaXN0ID0gZmFsc2U7XHJcbiAgICBhdHRlbmRhbmNlUmVwb3J0ID0gZmFsc2U7XHJcbiAgICBmaWxlcyA9IGZhbHNlO1xyXG5cclxuICAgIHVzZXJUeXBlOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIHByaXZhdGUgY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgICAgICBpZiAoIWN1cnJlbnRVc2VyLmFjdGl2ZSkge1xyXG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcmVzZXQtcGFzc3dvcmQnXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciB1c2VyVHlwZSA9IGN1cnJlbnRVc2VyLnVzZXJUeXBlO1xyXG4gICAgICAgICAgdmFyIHVzZXJJRCA9IGN1cnJlbnRVc2VyLnVzZXJJRDtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBdXRoKHVzZXJUeXBlLCB1c2VySUQpO1xyXG4gICAgICAgICAgdGhpcy5jb25zZW50Rm9ybSA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLmxlYXJuaW5nU3R5bGVGb3JtID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tBdXRoKHVzZXJUeXBlLCB1c2VySUQpIHtcclxuICAgICAgICB0aGlzLnVzZXJUeXBlID0gdXNlclR5cGU7XHJcbiAgICAgICAgaWYgKHVzZXJUeXBlLmluZGV4T2YoJ0FkbWluJykgPj0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudFN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlU3R1ZGVudHMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZVN0YWZmID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdWl0YWJpbGl0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2FzZU5vdGVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VDb3Vyc2VzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hdHRlbmRhbmNlUmVwb3J0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hdHRlbmRhbmNlTGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXRhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sZWFybmluZ1N0eWxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5maWxlcyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1c2VyVHlwZS5pbmRleE9mKCdTdGFmZicpID49IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZVN0dWRlbnRzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdWl0YWJpbGl0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXRhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jYXNlTm90ZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZUNvdXJzZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VSZXBvcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmZpbGVzID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVzZXJUeXBlLmluZGV4T2YoJ0luc3RydWN0b3InKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0ZW5kYW5jZUxpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VSZXBvcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWV0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2FzZU5vdGVzID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVzZXJUeXBlID09PSAnU3R1ZGVudCcpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1ldGFibGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXNlclR5cGUgPT09ICdDbGllbnQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc2VudCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vdGhpcy5tYWVzZHByZiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGb3JtU3RhdHVzKHVzZXJJRCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrRm9ybVN0YXR1cyh1c2VySUQpIHtcclxuICAgICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgICAgLmdldENsaWVudCh1c2VySUQpXHJcbiAgICAgICAgICAgIC50aGVuKG9iamVjdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0LnN0YXR1cyA9PT0gXCI0MDNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaWVudCA9IG9iamVjdC5jbGllbnRbMF0uZmlyc3ROYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc2VudEZvcm0gPSBvYmplY3QuY2xpZW50WzBdLmNvbnNlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWFybmluZ1N0eWxlRm9ybSA9IG9iamVjdC5jbGllbnRbMF0ubGVhcm5pbmdTdHlsZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgICB9XHJcbn1cclxuIl19
