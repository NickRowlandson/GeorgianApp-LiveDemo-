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
var ConsentFormComponent = (function () {
    function ConsentFormComponent(clientService, router, authService) {
        var _this = this;
        this.clientService = clientService;
        this.router = router;
        this.authService = authService;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userID = currentUser.userID;
        this.clientService
            .getClient(userID)
            .then(function (result) {
            _this.phoneNumber = result.client[0].phone;
            _this.clientName = result.client[0].firstName + " " + result.client[0].lastName;
        })
            .catch(function (err) { return _this.error = err; });
        this.consentForm = new consentForm_1.ConsentForm();
        this.date = new Date();
        this.consentForm.allowDetailedMessage = false;
        this.consentForm.ontarioWorks = true;
        this.consentForm.ontarioDisabilityProgram = true;
        this.consentForm.employmentInsurance = true;
        this.consentForm.employmentServices = true;
        this.consentForm.other = true;
    }
    ConsentFormComponent.prototype.saveConsent = function () {
        var _this = this;
        // allowDetailedMessage: boolean;
        // alternativeNumber: string;
        // ontarioWorks: string;
        // ontarioDisabilityProgram: string;
        // employmentInsurance: string;
        // employmentServices: string;
        // other: string;
        // contactName: string;
        // contactNum: string;
        if (!this.consentForm.allowDetailedMessage) {
            if (!this.consentForm.alternateNumber) {
                swal('Whoops!', 'Please enter an alternate phone number.', 'warning');
            }
            else {
                if (!this.consentForm.contactName || !this.consentForm.contactNum) {
                    swal('Whoops!', 'Please fill out all form fields.', 'warning');
                }
                else {
                    this.consentForm.date = this.date;
                    this.clientService
                        .saveConsent(this.consentForm)
                        .then(function (client) {
                        _this.router.navigate(['/dashboard']);
                    })
                        .catch(function (error) { return _this.error = error; });
                }
            }
        }
        else {
            if (!this.consentForm.contactName || !this.consentForm.contactNum) {
                swal('Whoops!', 'Please fill out all form fields.', 'warning');
            }
            else {
                this.consentForm.date = this.date;
                this.clientService
                    .saveConsent(this.consentForm)
                    .then(function (client) {
                    _this.router.navigate(['/dashboard']);
                })
                    .catch(function (error) { return _this.error = error; });
            }
        }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCwwQ0FBeUM7QUFDekMsd0RBQXVEO0FBQ3ZELGdFQUE4RDtBQUM5RCxnRkFBb0U7QUFVcEU7SUFPRSw4QkFBb0IsYUFBNEIsRUFBVSxNQUFjLEVBQVUsV0FBd0I7UUFBMUcsaUJBb0JDO1FBcEJtQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN0RyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBRWhDLElBQUksQ0FBQyxhQUFhO2FBQ2pCLFNBQVMsQ0FBQyxNQUFNLENBQUM7YUFDakIsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNWLEtBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDMUMsS0FBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDakYsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQWhCLENBQWdCLENBQUMsQ0FBQztRQUVoQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUkseUJBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJ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SUFuRlE7UUFBUixZQUFLLEVBQUU7a0NBQWMseUJBQVc7NkRBQUM7SUFEdkIsb0JBQW9CO1FBUGhDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsMkRBQTJEO1lBQ3hFLFNBQVMsRUFBRSxDQUFDLDBEQUEwRCxDQUFDO1NBQzFFLENBQUM7eUNBVW1DLDhCQUFhLEVBQWtCLGVBQU0sRUFBdUIsb0NBQVc7T0FQL0Ysb0JBQW9CLENBcUZoQztJQUFELDJCQUFDO0NBckZELEFBcUZDLElBQUE7QUFyRlksb0RBQW9CIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2NvbnNlbnQtZm9ybS9jb25zZW50LWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvbnNlbnRGb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb25zZW50Rm9ybVwiO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdjb25zZW50Rm9ybScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvY29uc2VudC1mb3JtL2NvbnNlbnQtZm9ybS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDb25zZW50Rm9ybUNvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgY29uc2VudEZvcm06IENvbnNlbnRGb3JtO1xyXG4gIGVycm9yOiBhbnk7XHJcbiAgZGF0ZTogYW55O1xyXG4gIHBob25lTnVtYmVyOiBhbnk7XHJcbiAgY2xpZW50TmFtZTogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNsaWVudFNlcnZpY2U6IENsaWVudFNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XHJcbiAgICAgIHZhciBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgICB2YXIgdXNlcklEID0gY3VycmVudFVzZXIudXNlcklEO1xyXG5cclxuICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRDbGllbnQodXNlcklEKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIHRoaXMucGhvbmVOdW1iZXIgPSByZXN1bHQuY2xpZW50WzBdLnBob25lO1xyXG4gICAgICAgIHRoaXMuY2xpZW50TmFtZSA9IHJlc3VsdC5jbGllbnRbMF0uZmlyc3ROYW1lICsgXCIgXCIgKyByZXN1bHQuY2xpZW50WzBdLmxhc3ROYW1lO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuZXJyb3IgPSBlcnIpO1xyXG5cclxuICAgICAgdGhpcy5jb25zZW50Rm9ybSA9IG5ldyBDb25zZW50Rm9ybSgpO1xyXG4gICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICB0aGlzLmNvbnNlbnRGb3JtLmFsbG93RGV0YWlsZWRNZXNzYWdlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuY29uc2VudEZvcm0ub250YXJpb1dvcmtzID0gdHJ1ZTtcclxuICAgICAgdGhpcy5jb25zZW50Rm9ybS5vbnRhcmlvRGlzYWJpbGl0eVByb2dyYW0gPSB0cnVlO1xyXG4gICAgICB0aGlzLmNvbnNlbnRGb3JtLmVtcGxveW1lbnRJbnN1cmFuY2UgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNvbnNlbnRGb3JtLmVtcGxveW1lbnRTZXJ2aWNlcyA9IHRydWU7XHJcbiAgICAgIHRoaXMuY29uc2VudEZvcm0ub3RoZXIgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgc2F2ZUNvbnNlbnQoKSB7XHJcbiAgICAvLyBhbGxvd0RldGFpbGVkTWVzc2FnZTogYm9vbGVhbjtcclxuICAgIC8vIGFsdGVybmF0aXZlTnVtYmVyOiBzdHJpbmc7XHJcbiAgICAvLyBvbnRhcmlvV29ya3M6IHN0cmluZztcclxuICAgIC8vIG9udGFyaW9EaXNhYmlsaXR5UHJvZ3JhbTogc3RyaW5nO1xyXG4gICAgLy8gZW1wbG95bWVudEluc3VyYW5jZTogc3RyaW5nO1xyXG4gICAgLy8gZW1wbG95bWVudFNlcnZpY2VzOiBzdHJpbmc7XHJcbiAgICAvLyBvdGhlcjogc3RyaW5nO1xyXG4gICAgLy8gY29udGFjdE5hbWU6IHN0cmluZztcclxuICAgIC8vIGNvbnRhY3ROdW06IHN0cmluZztcclxuICAgIGlmICghdGhpcy5jb25zZW50Rm9ybS5hbGxvd0RldGFpbGVkTWVzc2FnZSkge1xyXG4gICAgICBpZiAoIXRoaXMuY29uc2VudEZvcm0uYWx0ZXJuYXRlTnVtYmVyKSB7XHJcbiAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ1dob29wcyEnLFxyXG4gICAgICAgICAgICAnUGxlYXNlIGVudGVyIGFuIGFsdGVybmF0ZSBwaG9uZSBudW1iZXIuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIXRoaXMuY29uc2VudEZvcm0uY29udGFjdE5hbWUgfHwgIXRoaXMuY29uc2VudEZvcm0uY29udGFjdE51bSApIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgJ1dob29wcyEnLFxyXG4gICAgICAgICAgICAgICdQbGVhc2UgZmlsbCBvdXQgYWxsIGZvcm0gZmllbGRzLicsXHJcbiAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtLmRhdGUgPSB0aGlzLmRhdGU7XHJcbiAgICAgICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgICAgICAuc2F2ZUNvbnNlbnQodGhpcy5jb25zZW50Rm9ybSlcclxuICAgICAgICAgICAgICAudGhlbihjbGllbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICghdGhpcy5jb25zZW50Rm9ybS5jb250YWN0TmFtZSB8fCAhdGhpcy5jb25zZW50Rm9ybS5jb250YWN0TnVtICkge1xyXG4gICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdXaG9vcHMhJyxcclxuICAgICAgICAgICAgJ1BsZWFzZSBmaWxsIG91dCBhbGwgZm9ybSBmaWVsZHMuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmNvbnNlbnRGb3JtLmRhdGUgPSB0aGlzLmRhdGU7XHJcbiAgICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5zYXZlQ29uc2VudCh0aGlzLmNvbnNlbnRGb3JtKVxyXG4gICAgICAgICAgICAudGhlbihjbGllbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
