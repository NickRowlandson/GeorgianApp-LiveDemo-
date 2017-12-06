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
var consentForm_1 = require("../../models/consentForm");
var client_service_1 = require("../../services/client.service");
var authentication_service_1 = require("../../services/authentication.service");
var ConsentFormComponent = /** @class */ (function () {
    function ConsentFormComponent(clientService, router, authService) {
        var _this = this;
        this.clientService = clientService;
        this.router = router;
        this.authService = authService;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userID = this.currentUser.userID;
        this.clientService
            .getClient(userID)
            .then(function (result) {
            _this.clientName = result.client[0].firstName + " " + result.client[0].lastName;
        })
            .catch(function (err) { return _this.error = err; });
        this.consentForm = new consentForm_1.ConsentForm();
        this.date = new Date();
        this.consentForm.ontarioWorks = true;
        this.consentForm.ontarioDisabilityProgram = true;
        this.consentForm.employmentInsurance = true;
        this.consentForm.employmentServices = true;
        this.consentForm.other = true;
        if (this.currentUser.userType !== "Client") {
            swal('Read Only', "You are logged in as '" + this.currentUser.userType + "'. Only clients can submit this form.", 'warning');
        }
    }
    ConsentFormComponent.prototype.saveConsent = function () {
        var _this = this;
        // if (!this.consentForm.allowDetailedMessage) {
        //   if (!this.consentForm.alternateNumber) {
        //     swal(
        //         'Whoops!',
        //         'Please enter an alternate phone number.',
        //         'warning'
        //     );
        //   } else {
        //     if (!this.consentForm.contactName || !this.consentForm.contactNum ) {
        //       swal(
        //           'Whoops!',
        //           'Please fill out all form fields.',
        //           'warning'
        //       );
        //     } else {
        //       this.consentForm.date = this.date;
        //       this.clientService
        //           .saveConsent(this.consentForm)
        //           .then(client => {
        //               this.router.navigate(['/dashboard']);
        //           })
        //           .catch(error => this.error = error);
        //     }
        //   }
        // } else {
        //   if (!this.consentForm.contactName || !this.consentForm.contactNum ) {
        //     swal(
        //         'Whoops!',
        //         'Please fill out all form fields.',
        //         'warning'
        //     );
        //   } else {
        //     this.consentForm.date = this.date;
        //     this.clientService
        //         .saveConsent(this.consentForm)
        //         .then(client => {
        //             this.router.navigate(['/dashboard']);
        //         })
        //         .catch(error => this.error = error);
        //   }
        // }
        this.consentForm.date = this.date;
        this.clientService
            .saveConsent(this.consentForm)
            .then(function (client) {
            _this.router.navigate(['/dashboard']);
        })
            .catch(function (error) { return _this.error = error; });
    };
    ConsentFormComponent.prototype.goBack = function () {
        window.history.back();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", consentForm_1.ConsentForm)
    ], ConsentFormComponent.prototype, "consentForm", void 0);
    ConsentFormComponent = __decorate([
        core_1.Component({
            selector: 'consentForm',
            templateUrl: './app/components/consent-form/consent-form.component.html',
            styleUrls: ['./app/components/consent-form/consent-form.component.css']
        }),
        __metadata("design:paramtypes", [client_service_1.ClientService, router_1.Router, authentication_service_1.AuthService])
    ], ConsentFormComponent);
    return ConsentFormComponent;
}());
exports.ConsentFormComponent = ConsentFormComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCwwQ0FBeUM7QUFDekMsd0RBQXVEO0FBQ3ZELGdFQUE4RDtBQUM5RCxnRkFBb0U7QUFVcEU7SUFPRSw4QkFBb0IsYUFBNEIsRUFBVSxNQUFjLEVBQVUsV0FBd0I7UUFBMUcsaUJBMEJDO1FBMUJtQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN0RyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBRXJDLElBQUksQ0FBQyxhQUFhO2FBQ2pCLFNBQVMsQ0FBQyxNQUFNLENBQUM7YUFDakIsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNWLEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ2pGLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFoQixDQUFnQixDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHlCQUFXLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDO1FBQ2pELElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQzNDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUU5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FDQSxXQUFXLEVBQ1gsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsdUNBQXVDLEVBQzlGLFNBQVMsQ0FDWixDQUFDO1FBQ0osQ0FBQztJQUNMLENBQUM7SUFFRCwwQ0FBVyxHQUFYO1FBQUEsaUJBaURDO1FBaERDLGdEQUFnRDtRQUNoRCw2Q0FBNkM7UUFDN0MsWUFBWTtRQUNaLHFCQUFxQjtRQUNyQixxREFBcUQ7UUFDckQsb0JBQW9CO1FBQ3BCLFNBQVM7UUFDVCxhQUFhO1FBQ2IsNEVBQTRFO1FBQzVFLGNBQWM7UUFDZCx1QkFBdUI7UUFDdkIsZ0RBQWdEO1FBQ2hELHNCQUFzQjtRQUN0QixXQUFXO1FBQ1gsZUFBZTtRQUNmLDJDQUEyQztRQUMzQywyQkFBMkI7UUFDM0IsMkNBQTJDO1FBQzNDLDhCQUE4QjtRQUM5QixzREFBc0Q7UUFDdEQsZUFBZTtRQUNmLGlEQUFpRDtRQUNqRCxRQUFRO1FBQ1IsTUFBTTtRQUNOLFdBQVc7UUFDWCwwRUFBMEU7UUFDMUUsWUFBWTtRQUNaLHFCQUFxQjtRQUNyQiw4Q0FBOEM7UUFDOUMsb0JBQW9CO1FBQ3BCLFNBQVM7UUFDVCxhQUFhO1FBQ2IseUNBQXlDO1FBQ3pDLHlCQUF5QjtRQUN6Qix5Q0FBeUM7UUFDekMsNEJBQTRCO1FBQzVCLG9EQUFvRDtRQUNwRCxhQUFhO1FBQ2IsK0NBQStDO1FBQy9DLE1BQU07UUFDTixJQUFJO1FBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYTthQUNiLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQzdCLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDUixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQscUNBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQXZGUTtRQUFSLFlBQUssRUFBRTtrQ0FBYyx5QkFBVzs2REFBQztJQUR2QixvQkFBb0I7UUFQaEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSwyREFBMkQ7WUFDeEUsU0FBUyxFQUFFLENBQUMsMERBQTBELENBQUM7U0FDMUUsQ0FBQzt5Q0FVbUMsOEJBQWEsRUFBa0IsZUFBTSxFQUF1QixvQ0FBVztPQVAvRixvQkFBb0IsQ0F5RmhDO0lBQUQsMkJBQUM7Q0F6RkQsQUF5RkMsSUFBQTtBQXpGWSxvREFBb0IiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvY29uc2VudC1mb3JtL2NvbnNlbnQtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ29uc2VudEZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbnNlbnRGb3JtXCI7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY2xpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2NvbnNlbnRGb3JtJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL2NvbnNlbnQtZm9ybS9jb25zZW50LWZvcm0uY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENvbnNlbnRGb3JtQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBjb25zZW50Rm9ybTogQ29uc2VudEZvcm07XHJcbiAgZXJyb3I6IGFueTtcclxuICBkYXRlOiBhbnk7XHJcbiAgY2xpZW50TmFtZTogYW55O1xyXG4gIGN1cnJlbnRVc2VyOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcclxuICAgICAgdGhpcy5jdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgICB2YXIgdXNlcklEID0gdGhpcy5jdXJyZW50VXNlci51c2VySUQ7XHJcblxyXG4gICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgLmdldENsaWVudCh1c2VySUQpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgdGhpcy5jbGllbnROYW1lID0gcmVzdWx0LmNsaWVudFswXS5maXJzdE5hbWUgKyBcIiBcIiArIHJlc3VsdC5jbGllbnRbMF0ubGFzdE5hbWU7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5lcnJvciA9IGVycik7XHJcblxyXG4gICAgICB0aGlzLmNvbnNlbnRGb3JtID0gbmV3IENvbnNlbnRGb3JtKCk7XHJcbiAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIHRoaXMuY29uc2VudEZvcm0ub250YXJpb1dvcmtzID0gdHJ1ZTtcclxuICAgICAgdGhpcy5jb25zZW50Rm9ybS5vbnRhcmlvRGlzYWJpbGl0eVByb2dyYW0gPSB0cnVlO1xyXG4gICAgICB0aGlzLmNvbnNlbnRGb3JtLmVtcGxveW1lbnRJbnN1cmFuY2UgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNvbnNlbnRGb3JtLmVtcGxveW1lbnRTZXJ2aWNlcyA9IHRydWU7XHJcbiAgICAgIHRoaXMuY29uc2VudEZvcm0ub3RoZXIgPSB0cnVlO1xyXG5cclxuICAgICAgaWYgKHRoaXMuY3VycmVudFVzZXIudXNlclR5cGUgIT09IFwiQ2xpZW50XCIpIHtcclxuICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnUmVhZCBPbmx5JyxcclxuICAgICAgICAgICAgXCJZb3UgYXJlIGxvZ2dlZCBpbiBhcyAnXCIgKyB0aGlzLmN1cnJlbnRVc2VyLnVzZXJUeXBlICsgXCInLiBPbmx5IGNsaWVudHMgY2FuIHN1Ym1pdCB0aGlzIGZvcm0uXCIsXHJcbiAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIHNhdmVDb25zZW50KCkge1xyXG4gICAgLy8gaWYgKCF0aGlzLmNvbnNlbnRGb3JtLmFsbG93RGV0YWlsZWRNZXNzYWdlKSB7XHJcbiAgICAvLyAgIGlmICghdGhpcy5jb25zZW50Rm9ybS5hbHRlcm5hdGVOdW1iZXIpIHtcclxuICAgIC8vICAgICBzd2FsKFxyXG4gICAgLy8gICAgICAgICAnV2hvb3BzIScsXHJcbiAgICAvLyAgICAgICAgICdQbGVhc2UgZW50ZXIgYW4gYWx0ZXJuYXRlIHBob25lIG51bWJlci4nLFxyXG4gICAgLy8gICAgICAgICAnd2FybmluZydcclxuICAgIC8vICAgICApO1xyXG4gICAgLy8gICB9IGVsc2Uge1xyXG4gICAgLy8gICAgIGlmICghdGhpcy5jb25zZW50Rm9ybS5jb250YWN0TmFtZSB8fCAhdGhpcy5jb25zZW50Rm9ybS5jb250YWN0TnVtICkge1xyXG4gICAgLy8gICAgICAgc3dhbChcclxuICAgIC8vICAgICAgICAgICAnV2hvb3BzIScsXHJcbiAgICAvLyAgICAgICAgICAgJ1BsZWFzZSBmaWxsIG91dCBhbGwgZm9ybSBmaWVsZHMuJyxcclxuICAgIC8vICAgICAgICAgICAnd2FybmluZydcclxuICAgIC8vICAgICAgICk7XHJcbiAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgIHRoaXMuY29uc2VudEZvcm0uZGF0ZSA9IHRoaXMuZGF0ZTtcclxuICAgIC8vICAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgLy8gICAgICAgICAgIC5zYXZlQ29uc2VudCh0aGlzLmNvbnNlbnRGb3JtKVxyXG4gICAgLy8gICAgICAgICAgIC50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKTtcclxuICAgIC8vICAgICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSBlbHNlIHtcclxuICAgIC8vICAgaWYgKCF0aGlzLmNvbnNlbnRGb3JtLmNvbnRhY3ROYW1lIHx8ICF0aGlzLmNvbnNlbnRGb3JtLmNvbnRhY3ROdW0gKSB7XHJcbiAgICAvLyAgICAgc3dhbChcclxuICAgIC8vICAgICAgICAgJ1dob29wcyEnLFxyXG4gICAgLy8gICAgICAgICAnUGxlYXNlIGZpbGwgb3V0IGFsbCBmb3JtIGZpZWxkcy4nLFxyXG4gICAgLy8gICAgICAgICAnd2FybmluZydcclxuICAgIC8vICAgICApO1xyXG4gICAgLy8gICB9IGVsc2Uge1xyXG4gICAgLy8gICAgIHRoaXMuY29uc2VudEZvcm0uZGF0ZSA9IHRoaXMuZGF0ZTtcclxuICAgIC8vICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgIC8vICAgICAgICAgLnNhdmVDb25zZW50KHRoaXMuY29uc2VudEZvcm0pXHJcbiAgICAvLyAgICAgICAgIC50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XHJcbiAgICAvLyAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9XHJcbiAgICB0aGlzLmNvbnNlbnRGb3JtLmRhdGUgPSB0aGlzLmRhdGU7XHJcbiAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAuc2F2ZUNvbnNlbnQodGhpcy5jb25zZW50Rm9ybSlcclxuICAgICAgICAudGhlbihjbGllbnQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=
