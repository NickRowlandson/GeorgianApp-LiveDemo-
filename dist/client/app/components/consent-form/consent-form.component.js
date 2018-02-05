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
        this.clientName = '';
        this.otherChecked = false;
        this.loading = true;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userID = this.currentUser.userID;
        this.date = new Date();
        this.consentForm = new consentForm_1.ConsentForm();
        if (this.currentUser.userType !== "Client") {
            this.completeConsentForm = true;
            this.loading = false;
            swal('Read Only', "You are logged in as '" + this.currentUser.userType + "'. Only clients can submit this form.", 'warning');
        }
        else {
            this.clientService
                .getClient(userID)
                .then(function (result) {
                _this.clientName = result.client[0].firstName + " " + result.client[0].lastName;
                _this.completeConsentForm = result.client[0].consent;
                if (!result.client[0].consent) {
                    _this.clientService
                        .getConsentById()
                        .then(function (result) {
                        _this.consentForm = result[0];
                        _this.loading = false;
                        swal('Read Only', "You have already submitted this form. Select 'Request to Edit' if you would like to make changes.", 'warning');
                        console.log(_this.completeConsentForm);
                    })
                        .catch(function (err) {
                        console.log(err);
                    });
                    if (_this.consentForm.other == null || _this.consentForm.other === '') {
                        _this.otherChecked = false;
                    }
                    else {
                        _this.otherChecked = true;
                    }
                }
                else {
                    _this.consentForm.ontarioWorks = false;
                    _this.consentForm.ontarioDisabilityProgram = false;
                    _this.consentForm.employmentInsurance = false;
                    _this.consentForm.employmentServices = false;
                    _this.consentForm.wsib = false;
                    _this.loading = false;
                }
            })
                .catch(function (err) {
                console.log(err);
            });
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
    ConsentFormComponent.prototype.requestEdit = function () {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCwwQ0FBeUM7QUFDekMsd0RBQXVEO0FBQ3ZELGdFQUE4RDtBQUM5RCxnRkFBb0U7QUFVcEU7SUFVRSw4QkFBb0IsYUFBNEIsRUFBVSxNQUFjLEVBQVUsV0FBd0I7UUFBMUcsaUJBc0RDO1FBdERtQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQU4xRyxlQUFVLEdBQVcsRUFBRSxDQUFDO1FBR3hCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFHcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNuRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHlCQUFXLEVBQUUsQ0FBQztRQUVyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7WUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUNBLFdBQVcsRUFDWCx3QkFBd0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyx1Q0FBdUMsRUFDOUYsU0FBUyxDQUNaLENBQUM7UUFDSixDQUFDO1FBQUMsSUFB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U0FBUztRQUNULGFBQWE7UUFDYix5Q0FBeUM7UUFDekMseUJBQXlCO1FBQ3pCLHlDQUF5QztRQUN6Qyw0QkFBNEI7UUFDNUIsb0RBQW9EO1FBQ3BELGFBQWE7UUFDYiwrQ0FBK0M7UUFDL0MsTUFBTTtRQUNOLElBQUk7UUFDSixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhO2FBQ2IsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDN0IsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNSLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCwwQ0FBVyxHQUFYO0lBRUEsQ0FBQztJQUVELHFDQUFNLEdBQU47UUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUExSFE7UUFBUixZQUFLLEVBQUU7a0NBQWMseUJBQVc7NkRBQUM7SUFEdkIsb0JBQW9CO1FBUGhDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsMkRBQTJEO1lBQ3hFLFNBQVMsRUFBRSxDQUFDLDBEQUEwRCxDQUFDO1NBQzFFLENBQUM7eUNBYW1DLDhCQUFhLEVBQWtCLGVBQU0sRUFBdUIsb0NBQVc7T0FWL0Ysb0JBQW9CLENBNkhoQztJQUFELDJCQUFDO0NBN0hELEFBNkhDLElBQUE7QUE3SFksb0RBQW9CIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2NvbnNlbnQtZm9ybS9jb25zZW50LWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvbnNlbnRGb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb25zZW50Rm9ybVwiO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdjb25zZW50Rm9ybScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvY29uc2VudC1mb3JtL2NvbnNlbnQtZm9ybS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDb25zZW50Rm9ybUNvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgY29uc2VudEZvcm06IENvbnNlbnRGb3JtO1xyXG4gIGVycm9yOiBhbnk7XHJcbiAgZGF0ZTogYW55O1xyXG4gIGNsaWVudE5hbWU6IHN0cmluZyA9ICcnO1xyXG4gIGNvbXBsZXRlQ29uc2VudEZvcm06IGJvb2xlYW47XHJcbiAgY3VycmVudFVzZXI6IGFueTtcclxuICBvdGhlckNoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBsb2FkaW5nOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjbGllbnRTZXJ2aWNlOiBDbGllbnRTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcbiAgICAgIHZhciB1c2VySUQgPSB0aGlzLmN1cnJlbnRVc2VyLnVzZXJJRDtcclxuICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgdGhpcy5jb25zZW50Rm9ybSA9IG5ldyBDb25zZW50Rm9ybSgpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuY3VycmVudFVzZXIudXNlclR5cGUgIT09IFwiQ2xpZW50XCIpIHtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlQ29uc2VudEZvcm0gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdSZWFkIE9ubHknLFxyXG4gICAgICAgICAgICBcIllvdSBhcmUgbG9nZ2VkIGluIGFzICdcIiArIHRoaXMuY3VycmVudFVzZXIudXNlclR5cGUgKyBcIicuIE9ubHkgY2xpZW50cyBjYW4gc3VibWl0IHRoaXMgZm9ybS5cIixcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAuZ2V0Q2xpZW50KHVzZXJJRClcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jbGllbnROYW1lID0gcmVzdWx0LmNsaWVudFswXS5maXJzdE5hbWUgKyBcIiBcIiArIHJlc3VsdC5jbGllbnRbMF0ubGFzdE5hbWU7XHJcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlQ29uc2VudEZvcm0gPSByZXN1bHQuY2xpZW50WzBdLmNvbnNlbnQ7XHJcbiAgICAgICAgICBpZiAoIXJlc3VsdC5jbGllbnRbMF0uY29uc2VudCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgICAgLmdldENvbnNlbnRCeUlkKClcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtID0gcmVzdWx0WzBdO1xyXG4gICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICdSZWFkIE9ubHknLFxyXG4gICAgICAgICAgICAgICAgICBcIllvdSBoYXZlIGFscmVhZHkgc3VibWl0dGVkIHRoaXMgZm9ybS4gU2VsZWN0ICdSZXF1ZXN0IHRvIEVkaXQnIGlmIHlvdSB3b3VsZCBsaWtlIHRvIG1ha2UgY2hhbmdlcy5cIixcclxuICAgICAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvbXBsZXRlQ29uc2VudEZvcm0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29uc2VudEZvcm0ub3RoZXIgPT0gbnVsbCB8fCB0aGlzLmNvbnNlbnRGb3JtLm90aGVyID09PSAnJykge1xyXG4gICAgICAgICAgICAgIHRoaXMub3RoZXJDaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5vdGhlckNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtLm9udGFyaW9Xb3JrcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtLm9udGFyaW9EaXNhYmlsaXR5UHJvZ3JhbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtLmVtcGxveW1lbnRJbnN1cmFuY2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybS5lbXBsb3ltZW50U2VydmljZXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybS53c2liID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICBzYXZlQ29uc2VudCgpIHtcclxuICAgIC8vIGlmICghdGhpcy5jb25zZW50Rm9ybS5hbGxvd0RldGFpbGVkTWVzc2FnZSkge1xyXG4gICAgLy8gICBpZiAoIXRoaXMuY29uc2VudEZvcm0uYWx0ZXJuYXRlTnVtYmVyKSB7XHJcbiAgICAvLyAgICAgc3dhbChcclxuICAgIC8vICAgICAgICAgJ1dob29wcyEnLFxyXG4gICAgLy8gICAgICAgICAnUGxlYXNlIGVudGVyIGFuIGFsdGVybmF0ZSBwaG9uZSBudW1iZXIuJyxcclxuICAgIC8vICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAvLyAgICAgKTtcclxuICAgIC8vICAgfSBlbHNlIHtcclxuICAgIC8vICAgICBpZiAoIXRoaXMuY29uc2VudEZvcm0uY29udGFjdE5hbWUgfHwgIXRoaXMuY29uc2VudEZvcm0uY29udGFjdE51bSApIHtcclxuICAgIC8vICAgICAgIHN3YWwoXHJcbiAgICAvLyAgICAgICAgICAgJ1dob29wcyEnLFxyXG4gICAgLy8gICAgICAgICAgICdQbGVhc2UgZmlsbCBvdXQgYWxsIGZvcm0gZmllbGRzLicsXHJcbiAgICAvLyAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAvLyAgICAgICApO1xyXG4gICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICB0aGlzLmNvbnNlbnRGb3JtLmRhdGUgPSB0aGlzLmRhdGU7XHJcbiAgICAvLyAgICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgIC8vICAgICAgICAgICAuc2F2ZUNvbnNlbnQodGhpcy5jb25zZW50Rm9ybSlcclxuICAgIC8vICAgICAgICAgICAudGhlbihjbGllbnQgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XHJcbiAgICAvLyAgICAgICAgICAgfSlcclxuICAgIC8vICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgIGlmICghdGhpcy5jb25zZW50Rm9ybS5jb250YWN0TmFtZSB8fCAhdGhpcy5jb25zZW50Rm9ybS5jb250YWN0TnVtICkge1xyXG4gICAgLy8gICAgIHN3YWwoXHJcbiAgICAvLyAgICAgICAgICdXaG9vcHMhJyxcclxuICAgIC8vICAgICAgICAgJ1BsZWFzZSBmaWxsIG91dCBhbGwgZm9ybSBmaWVsZHMuJyxcclxuICAgIC8vICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAvLyAgICAgKTtcclxuICAgIC8vICAgfSBlbHNlIHtcclxuICAgIC8vICAgICB0aGlzLmNvbnNlbnRGb3JtLmRhdGUgPSB0aGlzLmRhdGU7XHJcbiAgICAvLyAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAvLyAgICAgICAgIC5zYXZlQ29uc2VudCh0aGlzLmNvbnNlbnRGb3JtKVxyXG4gICAgLy8gICAgICAgICAudGhlbihjbGllbnQgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xyXG4gICAgLy8gICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfVxyXG4gICAgdGhpcy5jb25zZW50Rm9ybS5kYXRlID0gdGhpcy5kYXRlO1xyXG4gICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgLnNhdmVDb25zZW50KHRoaXMuY29uc2VudEZvcm0pXHJcbiAgICAgICAgLnRoZW4oY2xpZW50ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICByZXF1ZXN0RWRpdCgpIHtcclxuXHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==
