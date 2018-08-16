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
var student_service_1 = require("../../services/student.service");
var authentication_service_1 = require("../../services/authentication.service");
var ConsentFormComponent = /** @class */ (function () {
    function ConsentFormComponent(clientService, studentService, router, authService) {
        var _this = this;
        this.clientService = clientService;
        this.studentService = studentService;
        this.router = router;
        this.authService = authService;
        this.clientName = '';
        this.editConsentRequest = false;
        this.editConsentPermission = false;
        this.otherChecked = false;
        this.loading = true;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userID = this.currentUser.userID;
        this.date = new Date();
        this.consentForm = new consentForm_1.ConsentForm();
        if (this.currentUser.userType === "Instructor" || this.currentUser.userType === "Staff" || this.currentUser.userType === "Admin") {
            this.completeConsentForm = true;
            this.loading = false;
            swal('Read Only', "You are logged in as '" + this.currentUser.userType + "'. Only clients can submit this form.", 'info');
        }
        if (this.currentUser.userType === "Client") {
            this.clientService
                .getClient(userID)
                .then(function (result) {
                console.log(result);
                _this.clientName = result[0].firstName + " " + result[0].lastName;
                _this.editConsentRequest = result[0].editConsentRequest;
                _this.editConsentPermission = result[0].editConsentPermission;
                _this.completeConsentForm = result[0].consent;
                if (!result[0].consent) {
                    _this.clientService
                        .getConsentById()
                        .then(function (result) {
                        _this.consentForm = result[0];
                        _this.loading = false;
                        if (_this.editConsentRequest && !_this.editConsentPermission) {
                            swal('Edit Request Submitted', "Check back once you have received an email.", 'info');
                        }
                        else if (_this.editConsentPermission) {
                            swal('Edit Request Granted!', "You can now edit this form.", 'info');
                        }
                        else {
                            swal('Read Only', "You have already submitted this form. Select 'Request to Edit' if you would like to make changes.", 'info');
                        }
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
        if (this.currentUser.userType === "Student") {
            this.studentService
                .getStudent(userID)
                .then(function (result) {
                console.log(result);
                _this.clientName = result.firstName + " " + result.lastName;
                _this.editConsentRequest = result.editConsentRequest;
                _this.editConsentPermission = result.editConsentPermission;
                _this.completeConsentForm = result.consent;
                if (!result.consent) {
                    _this.clientService
                        .getConsentById()
                        .then(function (result) {
                        _this.consentForm = result[0];
                        _this.loading = false;
                        if (_this.editConsentRequest && !_this.editConsentPermission) {
                            swal('Edit Request Submitted', "Check back once you have received an email.", 'info');
                        }
                        else if (_this.editConsentPermission) {
                            swal('Edit Request Granted!', "You can now edit this form.", 'info');
                        }
                        else {
                            swal('Read Only', "You have already submitted this form. Select 'Request to Edit' if you would like to make changes.", 'info');
                        }
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
        var _this = this;
        if (this.currentUser.userType === "Client") {
            this.clientService
                .requestEditConsent()
                .then(function (result) {
                if (result.status === 'success') {
                    swal('Request Sent!', 'You will receive an email once your request has been accepted.', 'info');
                    _this.router.navigate(['/dashboard']);
                }
                else {
                    swal('Something went wrong...', 'Please try again. If the issue persists contact support.', 'error');
                }
            })
                .catch(function (error) { return _this.error = error; });
        }
        else if (this.currentUser.userType === "Student") {
            this.studentService
                .requestEditConsent()
                .then(function (result) {
                if (result.status === 'success') {
                    swal('Request Sent!', 'You will receive an email once your request has been accepted.', 'info');
                    _this.router.navigate(['/dashboard']);
                }
                else {
                    swal('Something went wrong...', 'Please try again. If the issue persists contact support.', 'error');
                }
            })
                .catch(function (error) { return _this.error = error; });
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
        __metadata("design:paramtypes", [client_service_1.ClientService, student_service_1.StudentService, router_1.Router, authentication_service_1.AuthService])
    ], ConsentFormComponent);
    return ConsentFormComponent;
}());
exports.ConsentFormComponent = ConsentFormComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCwwQ0FBeUM7QUFDekMsd0RBQXVEO0FBQ3ZELGdFQUE4RDtBQUM5RCxrRUFBZ0U7QUFDaEUsZ0ZBQW9FO0FBVXBFO0lBWUUsOEJBQW9CLGFBQTRCLEVBQVUsY0FBOEIsRUFBVSxNQUFjLEVBQVUsV0FBd0I7UUFBbEosaUJBaUlDO1FBakltQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVJsSixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBQ3hCLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUNwQywwQkFBcUIsR0FBWSxLQUFLLENBQUM7UUFHdkMsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsWUFBTyxHQUFZLElBQUksQ0FBQztRQUd0QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUkseUJBQVcsRUFBRSxDQUFDO1FBRXJDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEtBQUssWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxLQUFLLE9BQU8sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7WUFDaEksSUFBSSxDQUFDLG1CQUFt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a0IsZUFBTSxFQUF1QixvQ0FBVztPQVp2SSxvQkFBb0IsQ0FrUGhDO0lBQUQsMkJBQUM7Q0FsUEQsQUFrUEMsSUFBQTtBQWxQWSxvREFBb0IiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvY29uc2VudC1mb3JtL2NvbnNlbnQtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ29uc2VudEZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbnNlbnRGb3JtXCI7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY2xpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnY29uc2VudEZvcm0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDb25zZW50Rm9ybUNvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgY29uc2VudEZvcm06IENvbnNlbnRGb3JtO1xyXG4gIGVycm9yOiBhbnk7XHJcbiAgZGF0ZTogYW55O1xyXG4gIGNsaWVudE5hbWU6IHN0cmluZyA9ICcnO1xyXG4gIGVkaXRDb25zZW50UmVxdWVzdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGVkaXRDb25zZW50UGVybWlzc2lvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGNvbXBsZXRlQ29uc2VudEZvcm06IGJvb2xlYW47XHJcbiAgY3VycmVudFVzZXI6IGFueTtcclxuICBvdGhlckNoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBsb2FkaW5nOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjbGllbnRTZXJ2aWNlOiBDbGllbnRTZXJ2aWNlLCBwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcclxuICAgIHRoaXMuY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgIHZhciB1c2VySUQgPSB0aGlzLmN1cnJlbnRVc2VyLnVzZXJJRDtcclxuICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICB0aGlzLmNvbnNlbnRGb3JtID0gbmV3IENvbnNlbnRGb3JtKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuY3VycmVudFVzZXIudXNlclR5cGUgPT09IFwiSW5zdHJ1Y3RvclwiIHx8IHRoaXMuY3VycmVudFVzZXIudXNlclR5cGUgPT09IFwiU3RhZmZcIiB8fCB0aGlzLmN1cnJlbnRVc2VyLnVzZXJUeXBlID09PSBcIkFkbWluXCIpIHtcclxuICAgICAgdGhpcy5jb21wbGV0ZUNvbnNlbnRGb3JtID0gdHJ1ZTtcclxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgJ1JlYWQgT25seScsXHJcbiAgICAgICAgXCJZb3UgYXJlIGxvZ2dlZCBpbiBhcyAnXCIgKyB0aGlzLmN1cnJlbnRVc2VyLnVzZXJUeXBlICsgXCInLiBPbmx5IGNsaWVudHMgY2FuIHN1Ym1pdCB0aGlzIGZvcm0uXCIsXHJcbiAgICAgICAgJ2luZm8nXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuY3VycmVudFVzZXIudXNlclR5cGUgPT09IFwiQ2xpZW50XCIpIHtcclxuICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgLmdldENsaWVudCh1c2VySUQpXHJcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICB0aGlzLmNsaWVudE5hbWUgPSByZXN1bHRbMF0uZmlyc3ROYW1lICsgXCIgXCIgKyByZXN1bHRbMF0ubGFzdE5hbWU7XHJcbiAgICAgICAgICB0aGlzLmVkaXRDb25zZW50UmVxdWVzdCA9IHJlc3VsdFswXS5lZGl0Q29uc2VudFJlcXVlc3Q7XHJcbiAgICAgICAgICB0aGlzLmVkaXRDb25zZW50UGVybWlzc2lvbiA9IHJlc3VsdFswXS5lZGl0Q29uc2VudFBlcm1pc3Npb247XHJcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlQ29uc2VudEZvcm0gPSByZXN1bHRbMF0uY29uc2VudDtcclxuICAgICAgICAgIGlmICghcmVzdWx0WzBdLmNvbnNlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgLmdldENvbnNlbnRCeUlkKClcclxuICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybSA9IHJlc3VsdFswXTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdENvbnNlbnRSZXF1ZXN0ICYmICF0aGlzLmVkaXRDb25zZW50UGVybWlzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAgICdFZGl0IFJlcXVlc3QgU3VibWl0dGVkJyxcclxuICAgICAgICAgICAgICAgICAgICBcIkNoZWNrIGJhY2sgb25jZSB5b3UgaGF2ZSByZWNlaXZlZCBhbiBlbWFpbC5cIixcclxuICAgICAgICAgICAgICAgICAgICAnaW5mbydcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5lZGl0Q29uc2VudFBlcm1pc3Npb24pIHtcclxuICAgICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAnRWRpdCBSZXF1ZXN0IEdyYW50ZWQhJyxcclxuICAgICAgICAgICAgICAgICAgICBcIllvdSBjYW4gbm93IGVkaXQgdGhpcyBmb3JtLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICdpbmZvJ1xyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAnUmVhZCBPbmx5JyxcclxuICAgICAgICAgICAgICAgICAgICBcIllvdSBoYXZlIGFscmVhZHkgc3VibWl0dGVkIHRoaXMgZm9ybS4gU2VsZWN0ICdSZXF1ZXN0IHRvIEVkaXQnIGlmIHlvdSB3b3VsZCBsaWtlIHRvIG1ha2UgY2hhbmdlcy5cIixcclxuICAgICAgICAgICAgICAgICAgICAnaW5mbydcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29uc2VudEZvcm0ub3RoZXIgPT0gbnVsbCB8fCB0aGlzLmNvbnNlbnRGb3JtLm90aGVyID09PSAnJykge1xyXG4gICAgICAgICAgICAgIHRoaXMub3RoZXJDaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5vdGhlckNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtLm9udGFyaW9Xb3JrcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtLm9udGFyaW9EaXNhYmlsaXR5UHJvZ3JhbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtLmVtcGxveW1lbnRJbnN1cmFuY2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybS5lbXBsb3ltZW50U2VydmljZXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybS53c2liID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmN1cnJlbnRVc2VyLnVzZXJUeXBlID09PSBcIlN0dWRlbnRcIikge1xyXG4gICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgLmdldFN0dWRlbnQodXNlcklEKVxyXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgdGhpcy5jbGllbnROYW1lID0gcmVzdWx0LmZpcnN0TmFtZSArIFwiIFwiICsgcmVzdWx0Lmxhc3ROYW1lO1xyXG4gICAgICAgICAgdGhpcy5lZGl0Q29uc2VudFJlcXVlc3QgPSByZXN1bHQuZWRpdENvbnNlbnRSZXF1ZXN0O1xyXG4gICAgICAgICAgdGhpcy5lZGl0Q29uc2VudFBlcm1pc3Npb24gPSByZXN1bHQuZWRpdENvbnNlbnRQZXJtaXNzaW9uO1xyXG4gICAgICAgICAgdGhpcy5jb21wbGV0ZUNvbnNlbnRGb3JtID0gcmVzdWx0LmNvbnNlbnQ7XHJcbiAgICAgICAgICBpZiAoIXJlc3VsdC5jb25zZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgICAgICAgIC5nZXRDb25zZW50QnlJZCgpXHJcbiAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uc2VudEZvcm0gPSByZXN1bHRbMF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVkaXRDb25zZW50UmVxdWVzdCAmJiAhdGhpcy5lZGl0Q29uc2VudFBlcm1pc3Npb24pIHtcclxuICAgICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAnRWRpdCBSZXF1ZXN0IFN1Ym1pdHRlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJDaGVjayBiYWNrIG9uY2UgeW91IGhhdmUgcmVjZWl2ZWQgYW4gZW1haWwuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2luZm8nXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZWRpdENvbnNlbnRQZXJtaXNzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICAgJ0VkaXQgUmVxdWVzdCBHcmFudGVkIScsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJZb3UgY2FuIG5vdyBlZGl0IHRoaXMgZm9ybS5cIixcclxuICAgICAgICAgICAgICAgICAgICAnaW5mbydcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICAgJ1JlYWQgT25seScsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJZb3UgaGF2ZSBhbHJlYWR5IHN1Ym1pdHRlZCB0aGlzIGZvcm0uIFNlbGVjdCAnUmVxdWVzdCB0byBFZGl0JyBpZiB5b3Ugd291bGQgbGlrZSB0byBtYWtlIGNoYW5nZXMuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2luZm8nXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnNlbnRGb3JtLm90aGVyID09IG51bGwgfHwgdGhpcy5jb25zZW50Rm9ybS5vdGhlciA9PT0gJycpIHtcclxuICAgICAgICAgICAgICB0aGlzLm90aGVyQ2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMub3RoZXJDaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybS5vbnRhcmlvV29ya3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybS5vbnRhcmlvRGlzYWJpbGl0eVByb2dyYW0gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybS5lbXBsb3ltZW50SW5zdXJhbmNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc2VudEZvcm0uZW1wbG95bWVudFNlcnZpY2VzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc2VudEZvcm0ud3NpYiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNhdmVDb25zZW50KCkge1xyXG4gICAgLy8gaWYgKCF0aGlzLmNvbnNlbnRGb3JtLmFsbG93RGV0YWlsZWRNZXNzYWdlKSB7XHJcbiAgICAvLyAgIGlmICghdGhpcy5jb25zZW50Rm9ybS5hbHRlcm5hdGVOdW1iZXIpIHtcclxuICAgIC8vICAgICBzd2FsKFxyXG4gICAgLy8gICAgICAgICAnV2hvb3BzIScsXHJcbiAgICAvLyAgICAgICAgICdQbGVhc2UgZW50ZXIgYW4gYWx0ZXJuYXRlIHBob25lIG51bWJlci4nLFxyXG4gICAgLy8gICAgICAgICAnd2FybmluZydcclxuICAgIC8vICAgICApO1xyXG4gICAgLy8gICB9IGVsc2Uge1xyXG4gICAgLy8gICAgIGlmICghdGhpcy5jb25zZW50Rm9ybS5jb250YWN0TmFtZSB8fCAhdGhpcy5jb25zZW50Rm9ybS5jb250YWN0TnVtICkge1xyXG4gICAgLy8gICAgICAgc3dhbChcclxuICAgIC8vICAgICAgICAgICAnV2hvb3BzIScsXHJcbiAgICAvLyAgICAgICAgICAgJ1BsZWFzZSBmaWxsIG91dCBhbGwgZm9ybSBmaWVsZHMuJyxcclxuICAgIC8vICAgICAgICAgICAnd2FybmluZydcclxuICAgIC8vICAgICAgICk7XHJcbiAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgIHRoaXMuY29uc2VudEZvcm0uZGF0ZSA9IHRoaXMuZGF0ZTtcclxuICAgIC8vICAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgLy8gICAgICAgICAgIC5zYXZlQ29uc2VudCh0aGlzLmNvbnNlbnRGb3JtKVxyXG4gICAgLy8gICAgICAgICAgIC50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKTtcclxuICAgIC8vICAgICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSBlbHNlIHtcclxuICAgIC8vICAgaWYgKCF0aGlzLmNvbnNlbnRGb3JtLmNvbnRhY3ROYW1lIHx8ICF0aGlzLmNvbnNlbnRGb3JtLmNvbnRhY3ROdW0gKSB7XHJcbiAgICAvLyAgICAgc3dhbChcclxuICAgIC8vICAgICAgICAgJ1dob29wcyEnLFxyXG4gICAgLy8gICAgICAgICAnUGxlYXNlIGZpbGwgb3V0IGFsbCBmb3JtIGZpZWxkcy4nLFxyXG4gICAgLy8gICAgICAgICAnd2FybmluZydcclxuICAgIC8vICAgICApO1xyXG4gICAgLy8gICB9IGVsc2Uge1xyXG4gICAgLy8gICAgIHRoaXMuY29uc2VudEZvcm0uZGF0ZSA9IHRoaXMuZGF0ZTtcclxuICAgIC8vICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgIC8vICAgICAgICAgLnNhdmVDb25zZW50KHRoaXMuY29uc2VudEZvcm0pXHJcbiAgICAvLyAgICAgICAgIC50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XHJcbiAgICAvLyAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9XHJcbiAgICB0aGlzLmNvbnNlbnRGb3JtLmRhdGUgPSB0aGlzLmRhdGU7XHJcbiAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgLnNhdmVDb25zZW50KHRoaXMuY29uc2VudEZvcm0pXHJcbiAgICAgIC50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIHJlcXVlc3RFZGl0KCkge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudFVzZXIudXNlclR5cGUgPT09IFwiQ2xpZW50XCIpIHtcclxuICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgLnJlcXVlc3RFZGl0Q29uc2VudCgpXHJcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkuc3RhdHVzID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAnUmVxdWVzdCBTZW50IScsXHJcbiAgICAgICAgICAgICAgJ1lvdSB3aWxsIHJlY2VpdmUgYW4gZW1haWwgb25jZSB5b3VyIHJlcXVlc3QgaGFzIGJlZW4gYWNjZXB0ZWQuJyxcclxuICAgICAgICAgICAgICAnaW5mbydcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcuLi4nLFxyXG4gICAgICAgICAgICAgICdQbGVhc2UgdHJ5IGFnYWluLiBJZiB0aGUgaXNzdWUgcGVyc2lzdHMgY29udGFjdCBzdXBwb3J0LicsXHJcbiAgICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFVzZXIudXNlclR5cGUgPT09IFwiU3R1ZGVudFwiKSB7XHJcbiAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAucmVxdWVzdEVkaXRDb25zZW50KClcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICdSZXF1ZXN0IFNlbnQhJyxcclxuICAgICAgICAgICAgICAnWW91IHdpbGwgcmVjZWl2ZSBhbiBlbWFpbCBvbmNlIHlvdXIgcmVxdWVzdCBoYXMgYmVlbiBhY2NlcHRlZC4nLFxyXG4gICAgICAgICAgICAgICdpbmZvJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZy4uLicsXHJcbiAgICAgICAgICAgICAgJ1BsZWFzZSB0cnkgYWdhaW4uIElmIHRoZSBpc3N1ZSBwZXJzaXN0cyBjb250YWN0IHN1cHBvcnQuJyxcclxuICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==
