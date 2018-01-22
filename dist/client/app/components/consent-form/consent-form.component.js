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
        this.otherChecked = false;
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
        this.consentForm.ontarioWorks = false;
        this.consentForm.ontarioDisabilityProgram = false;
        this.consentForm.employmentInsurance = false;
        this.consentForm.employmentServices = false;
        this.consentForm.wsib = false;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCwwQ0FBeUM7QUFDekMsd0RBQXVEO0FBQ3ZELGdFQUE4RDtBQUM5RCxnRkFBb0U7QUFVcEU7SUFRRSw4QkFBb0IsYUFBNEIsRUFBVSxNQUFjLEVBQVUsV0FBd0I7UUFBMUcsaUJBMEJDO1FBMUJtQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUYxRyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUcxQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBRXJDLElBQUksQ0FBQyxhQUFhO2FBQ2pCLFNBQVMsQ0FBQyxNQUFNLENBQUM7YUFDakIsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNWLEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ2pGLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFoQixDQUFnQixDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHlCQUFXLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsd0JBQXdCLEdBQUcsS0FBSyxDQUFDO1FBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUU5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FDQSxXQUFXLEVBQ1gsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsdUNBQXVDLEVBQzlGLFNBQVMsQ0FDWixDQUFDO1FBQ0osQ0FBQztJQUNMLENBQUM7SUFFRCwwQ0FBVyxHQUFYO1FBQUEsaUJBaURDO1FBaERDLGdEQUFnRDtRQUNoRCw2Q0FBNkM7UUFDN0MsWUFBWTtRQUNaLHFCQUFxQjtRQUNyQixxREFBcUQ7UUFDckQsb0JBQW9CO1FBQ3BCLFNBQVM7UUFDVCxhQUFhO1FBQ2IsNEVBQTRFO1FBQzVFLGNBQWM7UUFDZCx1QkFBdUI7UUFDdkIsZ0RBQWdEO1FBQ2hELHNCQUFzQjtRQUN0QixXQUFXO1FBQ1gsZUFBZTtRQUNmLDJDQUEyQztRQUMzQywyQkFBMkI7UUFDM0IsMkNBQTJDO1FBQzNDLDhCQUE4QjtRQUM5QixzREFBc0Q7UUFDdEQsZUFBZTtRQUNmLGlEQUFpRDtRQUNqRCxRQUFRO1FBQ1IsTUFBTTtRQUNOLFdBQVc7UUFDWCwwRUFBMEU7UUFDMUUsWUFBWTtRQUNaLHFCQUFxQjtRQUNyQiw4Q0FBOEM7UUFDOUMsb0JBQW9CO1FBQ3BCLFNBQVM7UUFDVCxhQUFhO1FBQ2IseUNBQXlDO1FBQ3pDLHlCQUF5QjtRQUN6Qix5Q0FBeUM7UUFDekMsNEJBQTRCO1FBQzVCLG9EQUFvRDtRQUNwRCxhQUFhO1FBQ2IsK0NBQStDO1FBQy9DLE1BQU07UUFDTixJQUFJO1FBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYTthQUNiLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQzdCLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDUixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQscUNBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQXhGUTtRQUFSLFlBQUssRUFBRTtrQ0FBYyx5QkFBVzs2REFBQztJQUR2QixvQkFBb0I7UUFQaEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSwyREFBMkQ7WUFDeEUsU0FBUyxFQUFFLENBQUMsMERBQTBELENBQUM7U0FDMUUsQ0FBQzt5Q0FXbUMsOEJBQWEsRUFBa0IsZUFBTSxFQUF1QixvQ0FBVztPQVIvRixvQkFBb0IsQ0EwRmhDO0lBQUQsMkJBQUM7Q0ExRkQsQUEwRkMsSUFBQTtBQTFGWSxvREFBb0IiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvY29uc2VudC1mb3JtL2NvbnNlbnQtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ29uc2VudEZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbnNlbnRGb3JtXCI7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY2xpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2NvbnNlbnRGb3JtJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL2NvbnNlbnQtZm9ybS9jb25zZW50LWZvcm0uY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENvbnNlbnRGb3JtQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBjb25zZW50Rm9ybTogQ29uc2VudEZvcm07XHJcbiAgZXJyb3I6IGFueTtcclxuICBkYXRlOiBhbnk7XHJcbiAgY2xpZW50TmFtZTogYW55O1xyXG4gIGN1cnJlbnRVc2VyOiBhbnk7XHJcbiAgb3RoZXJDaGVja2VkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcclxuICAgICAgdGhpcy5jdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgICB2YXIgdXNlcklEID0gdGhpcy5jdXJyZW50VXNlci51c2VySUQ7XHJcblxyXG4gICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgLmdldENsaWVudCh1c2VySUQpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgdGhpcy5jbGllbnROYW1lID0gcmVzdWx0LmNsaWVudFswXS5maXJzdE5hbWUgKyBcIiBcIiArIHJlc3VsdC5jbGllbnRbMF0ubGFzdE5hbWU7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5lcnJvciA9IGVycik7XHJcblxyXG4gICAgICB0aGlzLmNvbnNlbnRGb3JtID0gbmV3IENvbnNlbnRGb3JtKCk7XHJcbiAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIHRoaXMuY29uc2VudEZvcm0ub250YXJpb1dvcmtzID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuY29uc2VudEZvcm0ub250YXJpb0Rpc2FiaWxpdHlQcm9ncmFtID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuY29uc2VudEZvcm0uZW1wbG95bWVudEluc3VyYW5jZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmNvbnNlbnRGb3JtLmVtcGxveW1lbnRTZXJ2aWNlcyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmNvbnNlbnRGb3JtLndzaWIgPSBmYWxzZTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRVc2VyLnVzZXJUeXBlICE9PSBcIkNsaWVudFwiKSB7XHJcbiAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ1JlYWQgT25seScsXHJcbiAgICAgICAgICAgIFwiWW91IGFyZSBsb2dnZWQgaW4gYXMgJ1wiICsgdGhpcy5jdXJyZW50VXNlci51c2VyVHlwZSArIFwiJy4gT25seSBjbGllbnRzIGNhbiBzdWJtaXQgdGhpcyBmb3JtLlwiLFxyXG4gICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICBzYXZlQ29uc2VudCgpIHtcclxuICAgIC8vIGlmICghdGhpcy5jb25zZW50Rm9ybS5hbGxvd0RldGFpbGVkTWVzc2FnZSkge1xyXG4gICAgLy8gICBpZiAoIXRoaXMuY29uc2VudEZvcm0uYWx0ZXJuYXRlTnVtYmVyKSB7XHJcbiAgICAvLyAgICAgc3dhbChcclxuICAgIC8vICAgICAgICAgJ1dob29wcyEnLFxyXG4gICAgLy8gICAgICAgICAnUGxlYXNlIGVudGVyIGFuIGFsdGVybmF0ZSBwaG9uZSBudW1iZXIuJyxcclxuICAgIC8vICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAvLyAgICAgKTtcclxuICAgIC8vICAgfSBlbHNlIHtcclxuICAgIC8vICAgICBpZiAoIXRoaXMuY29uc2VudEZvcm0uY29udGFjdE5hbWUgfHwgIXRoaXMuY29uc2VudEZvcm0uY29udGFjdE51bSApIHtcclxuICAgIC8vICAgICAgIHN3YWwoXHJcbiAgICAvLyAgICAgICAgICAgJ1dob29wcyEnLFxyXG4gICAgLy8gICAgICAgICAgICdQbGVhc2UgZmlsbCBvdXQgYWxsIGZvcm0gZmllbGRzLicsXHJcbiAgICAvLyAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAvLyAgICAgICApO1xyXG4gICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICB0aGlzLmNvbnNlbnRGb3JtLmRhdGUgPSB0aGlzLmRhdGU7XHJcbiAgICAvLyAgICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgIC8vICAgICAgICAgICAuc2F2ZUNvbnNlbnQodGhpcy5jb25zZW50Rm9ybSlcclxuICAgIC8vICAgICAgICAgICAudGhlbihjbGllbnQgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XHJcbiAgICAvLyAgICAgICAgICAgfSlcclxuICAgIC8vICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgIGlmICghdGhpcy5jb25zZW50Rm9ybS5jb250YWN0TmFtZSB8fCAhdGhpcy5jb25zZW50Rm9ybS5jb250YWN0TnVtICkge1xyXG4gICAgLy8gICAgIHN3YWwoXHJcbiAgICAvLyAgICAgICAgICdXaG9vcHMhJyxcclxuICAgIC8vICAgICAgICAgJ1BsZWFzZSBmaWxsIG91dCBhbGwgZm9ybSBmaWVsZHMuJyxcclxuICAgIC8vICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAvLyAgICAgKTtcclxuICAgIC8vICAgfSBlbHNlIHtcclxuICAgIC8vICAgICB0aGlzLmNvbnNlbnRGb3JtLmRhdGUgPSB0aGlzLmRhdGU7XHJcbiAgICAvLyAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAvLyAgICAgICAgIC5zYXZlQ29uc2VudCh0aGlzLmNvbnNlbnRGb3JtKVxyXG4gICAgLy8gICAgICAgICAudGhlbihjbGllbnQgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xyXG4gICAgLy8gICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfVxyXG4gICAgdGhpcy5jb25zZW50Rm9ybS5kYXRlID0gdGhpcy5kYXRlO1xyXG4gICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgLnNhdmVDb25zZW50KHRoaXMuY29uc2VudEZvcm0pXHJcbiAgICAgICAgLnRoZW4oY2xpZW50ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
