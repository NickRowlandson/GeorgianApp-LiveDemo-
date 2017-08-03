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
var DashboardComponent = (function () {
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
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userType = currentUser.userType;
        var userID = currentUser.userID;
        this.checkAuth(userType, userID);
    };
    DashboardComponent.prototype.checkAuth = function (userType, userID) {
        this.userType = userType;
        if (userType === 'Admin') {
            this.clientStatus = true;
            this.manageStudents = true;
            this.manageStaff = true;
            this.suitability = true;
            this.caseNotes = true;
            this.manageCourses = true;
            this.attendanceReport = true;
        }
        else if (userType === 'Staff') {
            this.clientStatus = true;
            this.manageStudents = true;
            this.suitability = true;
            this.caseNotes = true;
            this.manageCourses = true;
            this.attendanceReport = true;
        }
        else if (userType === 'Student') {
            this.timetable = true;
        }
        else if (userType === 'Client') {
            this.consent = true;
            this.learningStyle = true;
            this.maesdprf = true;
            this.checkFormStatus(userID);
        }
        else if (userType === 'Instructor') {
            this.attendanceList = true;
            this.attendanceReport = true;
            this.caseNotes = true;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsZ0ZBQW9FO0FBRXBFLGdFQUE4RDtBQVE5RDtJQXNCSSw0QkFBb0IsTUFBYyxFQUFVLFdBQXdCLEVBQVUsYUFBNEI7UUFBdEYsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFoQjFHLDBDQUEwQztRQUMxQyxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLHFCQUFnQixHQUFHLEtBQUssQ0FBQztJQU16QixDQUFDO0lBRUQscUNBQVEsR0FBUjtRQUNJLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7UUFDcEMsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsc0NBQVMsR0FB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QztJQTlFUSxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSxxREFBcUQ7WUFDbEUsU0FBUyxFQUFFLENBQUMsb0RBQW9ELENBQUM7U0FDcEUsQ0FBQzt5Q0F3QjhCLGVBQU0sRUFBdUIsb0NBQVcsRUFBeUIsOEJBQWE7T0F0QmpHLGtCQUFrQixDQStFOUI7SUFBRCx5QkFBQztDQS9FRCxBQStFQyxJQUFBO0FBL0VZLGdEQUFrQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IENsaWVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2xpZW50XCI7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY2xpZW50LnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdkYXNoYm9hcmQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgY2xpZW50OiBDbGllbnRbXTtcclxuXHJcbiAgICBjb25zZW50Rm9ybTogYm9vbGVhbjtcclxuICAgIGxlYXJuaW5nU3R5bGVGb3JtOiBib29sZWFuO1xyXG5cclxuICAgIC8vdmFyaWFibGVzIHVzZWQgdG8gdG9nZ2xlIGRhaHNib2FyZCBpdGVtc1xyXG4gICAgY2xpZW50U3RhdHVzID0gZmFsc2U7XHJcbiAgICBtYW5hZ2VTdHVkZW50cyA9IGZhbHNlO1xyXG4gICAgbWFuYWdlU3RhZmYgPSBmYWxzZTtcclxuICAgIHN1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICBjb25zZW50ID0gZmFsc2U7XHJcbiAgICBtYW5hZ2VDb3Vyc2VzID0gZmFsc2U7XHJcbiAgICBjYXNlTm90ZXMgPSBmYWxzZTtcclxuICAgIGxlYXJuaW5nU3R5bGUgPSBmYWxzZTtcclxuICAgIG1hZXNkcHJmID0gZmFsc2U7XHJcbiAgICB0aW1ldGFibGUgPSBmYWxzZTtcclxuICAgIGF0dGVuZGFuY2VMaXN0ID0gZmFsc2U7XHJcbiAgICBhdHRlbmRhbmNlUmVwb3J0ID0gZmFsc2U7XHJcblxyXG4gICAgdXNlclR5cGU6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBjbGllbnRTZXJ2aWNlOiBDbGllbnRTZXJ2aWNlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHZhciBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgICAgIHZhciB1c2VyVHlwZSA9IGN1cnJlbnRVc2VyLnVzZXJUeXBlO1xyXG4gICAgICAgIHZhciB1c2VySUQgPSBjdXJyZW50VXNlci51c2VySUQ7XHJcbiAgICAgICAgdGhpcy5jaGVja0F1dGgodXNlclR5cGUsIHVzZXJJRCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tBdXRoKHVzZXJUeXBlLCB1c2VySUQpIHtcclxuICAgICAgICB0aGlzLnVzZXJUeXBlID0gdXNlclR5cGU7XHJcbiAgICAgICAgaWYgKHVzZXJUeXBlID09PSAnQWRtaW4nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50U3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VTdHVkZW50cyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlU3RhZmYgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnN1aXRhYmlsaXR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jYXNlTm90ZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZUNvdXJzZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VSZXBvcnQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodXNlclR5cGUgPT09ICdTdGFmZicpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZVN0dWRlbnRzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdWl0YWJpbGl0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2FzZU5vdGVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VDb3Vyc2VzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hdHRlbmRhbmNlUmVwb3J0ID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHVzZXJUeXBlID09PSAnU3R1ZGVudCcpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1ldGFibGUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodXNlclR5cGUgPT09ICdDbGllbnQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc2VudCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFlc2RwcmYgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrRm9ybVN0YXR1cyh1c2VySUQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodXNlclR5cGUgPT09ICdJbnN0cnVjdG9yJykge1xyXG4gICAgICAgICAgICB0aGlzLmF0dGVuZGFuY2VMaXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hdHRlbmRhbmNlUmVwb3J0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jYXNlTm90ZXMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja0Zvcm1TdGF0dXModXNlcklEKSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5nZXRDbGllbnQodXNlcklEKVxyXG4gICAgICAgICAgICAudGhlbihvYmplY3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdC5zdGF0dXMgPT09IFwiNDAzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaWVudCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvclwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGllbnQgPSBvYmplY3QuY2xpZW50WzBdLmZpcnN0TmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtID0gb2JqZWN0LmNsaWVudFswXS5jb25zZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZUZvcm0gPSBvYmplY3QuY2xpZW50WzBdLmxlYXJuaW5nU3R5bGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
