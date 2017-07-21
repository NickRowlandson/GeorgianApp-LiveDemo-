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
        }
        else if (userType === 'Staff') {
            this.clientStatus = true;
            this.manageStudents = true;
            this.suitability = true;
            this.caseNotes = true;
            this.manageCourses = true;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsZ0ZBQW9FO0FBRXBFLGdFQUE4RDtBQVE5RDtJQXFCRSw0QkFBb0IsTUFBYyxFQUFVLFdBQXdCLEVBQVUsYUFBNEI7UUFBdEYsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFmeEcsMENBQTBDO1FBQzFDLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsbUJBQWMsR0FBRyxLQUFLLENBQUM7SUFNekIsQ0FBQztJQUVDLHFDQUFRLEdBQVI7UUFDSSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBQ3BDLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVILHNDQUFTLEdBQVQsVUFBVSxRQUFRLEVBQUUsTUFBTTtRQUN4QixJ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LEVBQXlCLDhCQUFhO09BckIvRixrQkFBa0IsQ0EyRTlCO0lBQUQseUJBQUM7Q0EzRUQsQUEyRUMsSUFBQTtBQTNFWSxnREFBa0IiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NsaWVudFwiO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2Rhc2hib2FyZCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBjbGllbnQ6IENsaWVudFtdO1xyXG5cclxuICBjb25zZW50Rm9ybTogYm9vbGVhbjtcclxuICBsZWFybmluZ1N0eWxlRm9ybTogYm9vbGVhbjtcclxuXHJcbiAgICAvL3ZhcmlhYmxlcyB1c2VkIHRvIHRvZ2dsZSBkYWhzYm9hcmQgaXRlbXNcclxuICAgIGNsaWVudFN0YXR1cyA9IGZhbHNlO1xyXG4gICAgbWFuYWdlU3R1ZGVudHMgPSBmYWxzZTtcclxuICAgIG1hbmFnZVN0YWZmID0gZmFsc2U7XHJcbiAgICBzdWl0YWJpbGl0eSA9IGZhbHNlO1xyXG4gICAgY29uc2VudCA9IGZhbHNlO1xyXG4gICAgbWFuYWdlQ291cnNlcyA9IGZhbHNlO1xyXG4gICAgY2FzZU5vdGVzID0gZmFsc2U7XHJcbiAgICBsZWFybmluZ1N0eWxlID0gZmFsc2U7XHJcbiAgICBtYWVzZHByZiA9IGZhbHNlO1xyXG4gICAgdGltZXRhYmxlID0gZmFsc2U7XHJcbiAgICBhdHRlbmRhbmNlTGlzdCA9IGZhbHNlO1xyXG5cclxuICB1c2VyVHlwZTogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBjbGllbnRTZXJ2aWNlOiBDbGllbnRTZXJ2aWNlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgICAgICB2YXIgdXNlclR5cGUgPSBjdXJyZW50VXNlci51c2VyVHlwZTtcclxuICAgICAgICB2YXIgdXNlcklEID0gY3VycmVudFVzZXIudXNlcklEO1xyXG4gICAgICAgIHRoaXMuY2hlY2tBdXRoKHVzZXJUeXBlLCB1c2VySUQpO1xyXG4gICAgfVxyXG5cclxuICBjaGVja0F1dGgodXNlclR5cGUsIHVzZXJJRCkge1xyXG4gICAgdGhpcy51c2VyVHlwZSA9IHVzZXJUeXBlO1xyXG4gICAgaWYgKHVzZXJUeXBlID09PSAnQWRtaW4nKSB7XHJcbiAgICAgIHRoaXMuY2xpZW50U3RhdHVzID0gdHJ1ZTtcclxuICAgICAgdGhpcy5tYW5hZ2VTdHVkZW50cyA9IHRydWU7XHJcbiAgICAgIHRoaXMubWFuYWdlU3RhZmYgPSB0cnVlO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5jYXNlTm90ZXMgPSB0cnVlO1xyXG4gICAgICB0aGlzLm1hbmFnZUNvdXJzZXMgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmICh1c2VyVHlwZSA9PT0gJ1N0YWZmJykge1xyXG4gICAgICB0aGlzLmNsaWVudFN0YXR1cyA9IHRydWU7XHJcbiAgICAgIHRoaXMubWFuYWdlU3R1ZGVudHMgPSB0cnVlO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5jYXNlTm90ZXMgPSB0cnVlO1xyXG4gICAgICB0aGlzLm1hbmFnZUNvdXJzZXMgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmICh1c2VyVHlwZSA9PT0gJ1N0dWRlbnQnKSB7XHJcbiAgICAgIHRoaXMudGltZXRhYmxlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAodXNlclR5cGUgPT09ICdDbGllbnQnKSB7XHJcbiAgICAgIHRoaXMuY29uc2VudCA9IHRydWU7XHJcbiAgICAgIHRoaXMubGVhcm5pbmdTdHlsZSA9IHRydWU7XHJcbiAgICAgIHRoaXMubWFlc2RwcmYgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNoZWNrRm9ybVN0YXR1cyh1c2VySUQpO1xyXG4gICAgfSBlbHNlIGlmICh1c2VyVHlwZSA9PT0gJ0luc3RydWN0b3InKSB7XHJcbiAgICAgIHRoaXMuYXR0ZW5kYW5jZUxpc3QgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNhc2VOb3RlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGVja0Zvcm1TdGF0dXModXNlcklEKSB7XHJcbiAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgLmdldENsaWVudCh1c2VySUQpXHJcbiAgICAgIC50aGVuKG9iamVjdCA9PiB7XHJcbiAgICAgICAgaWYgKG9iamVjdC5zdGF0dXMgPT09IFwiNDAzXCIpIHtcclxuICAgICAgICAgIHRoaXMuY2xpZW50ID0gbnVsbDtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY2xpZW50ID0gb2JqZWN0LmNsaWVudFswXS5maXJzdE5hbWU7XHJcbiAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtID0gb2JqZWN0LmNsaWVudFswXS5jb25zZW50O1xyXG4gICAgICAgICAgdGhpcy5sZWFybmluZ1N0eWxlRm9ybSA9IG9iamVjdC5jbGllbnRbMF0ubGVhcm5pbmdTdHlsZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gIH1cclxufVxyXG4iXX0=
