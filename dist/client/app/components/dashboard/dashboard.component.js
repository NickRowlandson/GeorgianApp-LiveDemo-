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
            this.consent = false;
            this.learningStyle = false;
            this.maesdprf = false;
            this.caseNotes = true;
            this.manageCourses = true;
        }
        else if (userType === 'Staff') {
            this.clientStatus = true;
            this.manageStudents = true;
            this.manageStaff = false;
            this.suitability = true;
            this.consent = false;
            this.learningStyle = false;
            this.maesdprf = false;
            this.caseNotes = true;
            this.manageCourses = true;
        }
        else if (userType === 'Student') {
            this.clientStatus = false;
            this.manageStudents = false;
            this.manageStaff = false;
            this.suitability = false;
            this.consent = false;
            this.learningStyle = false;
            this.maesdprf = false;
            this.caseNotes = false;
            this.manageCourses = false;
        }
        else if (userType === 'Client') {
            this.clientStatus = false;
            this.manageStudents = false;
            this.manageStaff = false;
            this.suitability = false;
            this.consent = true;
            this.learningStyle = true;
            this.maesdprf = true;
            this.caseNotes = false;
            this.manageCourses = false;
            this.checkFormStatus(userID);
        }
        else {
            this.clientStatus = false;
            this.manageStudents = false;
            this.manageStaff = false;
            this.suitability = false;
            this.consent = false;
            this.learningStyle = false;
            this.maesdprf = false;
            this.caseNotes = false;
            this.manageCourses = false;
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
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'dashboard',
        templateUrl: './app/components/dashboard/dashboard.component.html',
        styleUrls: ['./app/components/dashboard/dashboard.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, authentication_service_1.AuthService, client_service_1.ClientService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsZ0ZBQW9FO0FBRXBFLGdFQUE4RDtBQVE5RCxJQUFhLGtCQUFrQjtJQW9CM0IsNEJBQW9CLE1BQWMsRUFBVSxXQUF3QixFQUFVLGFBQTRCO1FBQXRGLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBZDFHLDBDQUEwQztRQUMxQyxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsYUFBUSxHQUFHLEtBQUssQ0FBQztJQU9qQixDQUFDO0lBRUQscUNBQVEsR0FBUjtRQUNJLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7UUFDcEMsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsc0NBQVMsR0FBVCxVQUFVLFFBQVEsRUFBRSxNQUFNO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLEVBQUUs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QVMsRUFBRSxDQUFDLG9EQUFvRCxDQUFDO0tBQ3BFLENBQUM7cUNBc0I4QixlQUFNLEVBQXVCLG9DQUFXLEVBQXlCLDhCQUFhO0dBcEJqRyxrQkFBa0IsQ0FzRzlCO0FBdEdZLGdEQUFrQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IENsaWVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2xpZW50XCI7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY2xpZW50LnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdkYXNoYm9hcmQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgY2xpZW50OiBDbGllbnRbXTtcclxuXHJcbiAgICBjb25zZW50Rm9ybTogYm9vbGVhbjtcclxuICAgIGxlYXJuaW5nU3R5bGVGb3JtOiBib29sZWFuO1xyXG5cclxuICAgIC8vdmFyaWFibGVzIHVzZWQgdG8gdG9nZ2xlIGRhaHNib2FyZCBpdGVtc1xyXG4gICAgY2xpZW50U3RhdHVzID0gZmFsc2U7XHJcbiAgICBtYW5hZ2VTdHVkZW50cyA9IGZhbHNlO1xyXG4gICAgbWFuYWdlU3RhZmYgPSBmYWxzZTtcclxuICAgIHN1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICBjb25zZW50ID0gZmFsc2U7XHJcbiAgICBtYW5hZ2VDb3Vyc2VzID0gZmFsc2U7XHJcbiAgICBjYXNlTm90ZXMgPSBmYWxzZTtcclxuICAgIGxlYXJuaW5nU3R5bGUgPSBmYWxzZTtcclxuICAgIG1hZXNkcHJmID0gZmFsc2U7XHJcblxyXG4gICAgLy9cclxuICAgIHVzZXJUeXBlOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIHByaXZhdGUgY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgICAgICB2YXIgdXNlclR5cGUgPSBjdXJyZW50VXNlci51c2VyVHlwZTtcclxuICAgICAgICB2YXIgdXNlcklEID0gY3VycmVudFVzZXIudXNlcklEO1xyXG4gICAgICAgIHRoaXMuY2hlY2tBdXRoKHVzZXJUeXBlLCB1c2VySUQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrQXV0aCh1c2VyVHlwZSwgdXNlcklEKSB7XHJcbiAgICAgICAgdGhpcy51c2VyVHlwZSA9IHVzZXJUeXBlO1xyXG4gICAgICAgIGlmICh1c2VyVHlwZSA9PT0gJ0FkbWluJykge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudFN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlU3R1ZGVudHMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZVN0YWZmID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdWl0YWJpbGl0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc2VudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxlYXJuaW5nU3R5bGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5tYWVzZHByZiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNhc2VOb3RlcyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlQ291cnNlcyA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICh1c2VyVHlwZSA9PT0gJ1N0YWZmJykge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudFN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlU3R1ZGVudHMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZVN0YWZmID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3VpdGFiaWxpdHkgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sZWFybmluZ1N0eWxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubWFlc2RwcmYgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jYXNlTm90ZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZUNvdXJzZXMgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodXNlclR5cGUgPT09ICdTdHVkZW50Jykge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudFN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZVN0dWRlbnRzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlU3RhZmYgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdWl0YWJpbGl0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sZWFybmluZ1N0eWxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubWFlc2RwcmYgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jYXNlTm90ZXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VDb3Vyc2VzID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICh1c2VyVHlwZSA9PT0gJ0NsaWVudCcpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VTdHVkZW50cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZVN0YWZmID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3VpdGFiaWxpdHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sZWFybmluZ1N0eWxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYWVzZHByZiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2FzZU5vdGVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlQ291cnNlcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrRm9ybVN0YXR1cyh1c2VySUQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50U3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlU3R1ZGVudHMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VTdGFmZiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnN1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc2VudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxlYXJuaW5nU3R5bGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5tYWVzZHByZiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNhc2VOb3RlcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZUNvdXJzZXMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tGb3JtU3RhdHVzKHVzZXJJRCkge1xyXG4gICAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgICAgICAuZ2V0Q2xpZW50KHVzZXJJRClcclxuICAgICAgICAgICAgLnRoZW4ob2JqZWN0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmplY3Quc3RhdHVzID09PSBcIjQwM1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGllbnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpZW50ID0gb2JqZWN0LmNsaWVudFswXS5maXJzdE5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybSA9IG9iamVjdC5jbGllbnRbMF0uY29uc2VudDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxlYXJuaW5nU3R5bGVGb3JtID0gb2JqZWN0LmNsaWVudFswXS5sZWFybmluZ1N0eWxlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICAgIH1cclxufVxyXG4iXX0=
