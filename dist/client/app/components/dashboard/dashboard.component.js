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
var DashboardComponent = (function () {
    function DashboardComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.clientStatus = false;
        this.manageStudents = false;
        this.manageStaff = false;
        this.suitability = false;
        this.consent = false;
        this.manageCourses = false;
        this.caseNotes = false;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userType = currentUser.userType;
        this.checkAuth(userType);
    };
    DashboardComponent.prototype.checkAuth = function (userType) {
        if (userType === 'Admin') {
            this.clientStatus = true;
            this.manageStudents = true;
            this.manageStaff = true;
            this.suitability = true;
            this.consent = false;
            this.caseNotes = true;
            this.manageCourses = true;
        }
        else if (userType === 'Staff') {
            this.clientStatus = true;
            this.manageStudents = true;
            this.manageStaff = false;
            this.suitability = true;
            this.consent = false;
            this.caseNotes = true;
            this.manageCourses = true;
        }
        else if (userType === 'Student') {
            this.clientStatus = false;
            this.manageStudents = false;
            this.manageStaff = false;
            this.suitability = false;
            this.consent = false;
            this.caseNotes = false;
            this.manageCourses = false;
        }
        else if (userType === 'Client') {
            this.clientStatus = false;
            this.manageStudents = false;
            this.manageStaff = false;
            this.suitability = false;
            this.consent = true;
            this.caseNotes = false;
            this.manageCourses = false;
        }
        else {
            this.clientStatus = false;
            this.manageStudents = false;
            this.manageStaff = false;
            this.suitability = false;
            this.consent = false;
            this.caseNotes = false;
            this.manageCourses = false;
        }
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'dashboard',
        templateUrl: './app/components/dashboard/dashboard.component.html',
        styleUrls: ['./app/components/dashboard/dashboard.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, authentication_service_1.AuthService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsZ0ZBQW9FO0FBUXBFLElBQWEsa0JBQWtCO0lBUzNCLDRCQUFvQixNQUFjLEVBQVUsV0FBd0I7UUFBaEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBUnBFLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsY0FBUyxHQUFHLEtBQUssQ0FBQztJQUlsQixDQUFDO0lBRUQscUNBQVEsR0FBUjtRQUNFLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7UUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsc0NBQVMsR0FBVCxVQUFVLFFBQVE7UUFDZCxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUM5QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzlCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMvQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMvQixDQUFDO0lBQ0wsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0E5REEsQUE4REMsSUFBQTtBQTlEWSxrQkFBa0I7SUFOOUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFdBQVcsRUFBRSxxREFBcUQ7UUFDbEUsU0FBUyxFQUFFLENBQUMsb0RBQW9ELENBQUM7S0FDcEUsQ0FBQztxQ0FXOEIsZUFBTSxFQUF1QixvQ0FBVztHQVQzRCxrQkFBa0IsQ0E4RDlCO0FBOURZLGdEQUFrQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZGFzaGJvYXJkJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGNsaWVudFN0YXR1cyA9IGZhbHNlO1xyXG4gICAgbWFuYWdlU3R1ZGVudHMgPSBmYWxzZTtcclxuICAgIG1hbmFnZVN0YWZmID0gZmFsc2U7XHJcbiAgICBzdWl0YWJpbGl0eSA9IGZhbHNlO1xyXG4gICAgY29uc2VudCA9IGZhbHNlO1xyXG4gICAgbWFuYWdlQ291cnNlcyA9IGZhbHNlO1xyXG4gICAgY2FzZU5vdGVzID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgIHZhciBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgICB2YXIgdXNlclR5cGUgPSBjdXJyZW50VXNlci51c2VyVHlwZTtcclxuICAgICAgdGhpcy5jaGVja0F1dGgodXNlclR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrQXV0aCh1c2VyVHlwZSkge1xyXG4gICAgICAgIGlmICh1c2VyVHlwZSA9PT0gJ0FkbWluJykge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudFN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlU3R1ZGVudHMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZVN0YWZmID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdWl0YWJpbGl0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc2VudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNhc2VOb3RlcyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlQ291cnNlcyA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICh1c2VyVHlwZSA9PT0gJ1N0YWZmJykge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudFN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlU3R1ZGVudHMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZVN0YWZmID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3VpdGFiaWxpdHkgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jYXNlTm90ZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZUNvdXJzZXMgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodXNlclR5cGUgPT09ICdTdHVkZW50Jykge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudFN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZVN0dWRlbnRzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlU3RhZmYgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdWl0YWJpbGl0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jYXNlTm90ZXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VDb3Vyc2VzID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICh1c2VyVHlwZSA9PT0gJ0NsaWVudCcpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VTdHVkZW50cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZVN0YWZmID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3VpdGFiaWxpdHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jYXNlTm90ZXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VDb3Vyc2VzID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VTdHVkZW50cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZVN0YWZmID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3VpdGFiaWxpdHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY2FzZU5vdGVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlQ291cnNlcyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=
