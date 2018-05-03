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
                _this.clientName = result.client[0].firstName + " " + result.client[0].lastName;
                _this.editConsentRequest = result.client[0].editConsentRequest;
                _this.editConsentPermission = result.client[0].editConsentPermission;
                _this.completeConsentForm = result.client[0].consent;
                if (!result.client[0].consent) {
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
                        console.log(_this.consentForm);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCwwQ0FBeUM7QUFDekMsd0RBQXVEO0FBQ3ZELGdFQUE4RDtBQUM5RCxrRUFBZ0U7QUFDaEUsZ0ZBQW9FO0FBVXBFO0lBWUUsOEJBQW9CLGFBQTRCLEVBQVUsY0FBOEIsRUFBVSxNQUFjLEVBQVUsV0FBd0I7UUFBbEosaUJBaUlDO1FBakltQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVJsSixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBQ3hCLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUNwQywwQkFBcUIsR0FBWSxLQUFLLENBQUM7UUFHdkMsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsWUFBTyxHQUFZLElBQUksQ0FBQztRQUd0QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUkseUJBQVcsRUFBRSxDQUFDO1FBRXJDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEtBQUssWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxLQUFLLE9BQU8sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7WUFDaEksSUFBSSxDQUFDLG1CQUFt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Q3hFLFNBQVMsRUFBRSxDQUFDLDBEQUEwRCxDQUFDO1NBQ3hFLENBQUM7eUNBZW1DLDhCQUFhLEVBQTBCLGdDQUFjLEVBQWtCLGVBQU0sRUFBdUIsb0NBQVc7T0Fadkksb0JBQW9CLENBa1BoQztJQUFELDJCQUFDO0NBbFBELEFBa1BDLElBQUE7QUFsUFksb0RBQW9CIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2NvbnNlbnQtZm9ybS9jb25zZW50LWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvbnNlbnRGb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb25zZW50Rm9ybVwiO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2NvbnNlbnRGb3JtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvY29uc2VudC1mb3JtL2NvbnNlbnQtZm9ybS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvY29uc2VudC1mb3JtL2NvbnNlbnQtZm9ybS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQ29uc2VudEZvcm1Db21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGNvbnNlbnRGb3JtOiBDb25zZW50Rm9ybTtcclxuICBlcnJvcjogYW55O1xyXG4gIGRhdGU6IGFueTtcclxuICBjbGllbnROYW1lOiBzdHJpbmcgPSAnJztcclxuICBlZGl0Q29uc2VudFJlcXVlc3Q6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBlZGl0Q29uc2VudFBlcm1pc3Npb246IGJvb2xlYW4gPSBmYWxzZTtcclxuICBjb21wbGV0ZUNvbnNlbnRGb3JtOiBib29sZWFuO1xyXG4gIGN1cnJlbnRVc2VyOiBhbnk7XHJcbiAgb3RoZXJDaGVja2VkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgbG9hZGluZzogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSwgcHJpdmF0ZSBzdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcbiAgICB2YXIgdXNlcklEID0gdGhpcy5jdXJyZW50VXNlci51c2VySUQ7XHJcbiAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdGhpcy5jb25zZW50Rm9ybSA9IG5ldyBDb25zZW50Rm9ybSgpO1xyXG5cclxuICAgIGlmICh0aGlzLmN1cnJlbnRVc2VyLnVzZXJUeXBlID09PSBcIkluc3RydWN0b3JcIiB8fCB0aGlzLmN1cnJlbnRVc2VyLnVzZXJUeXBlID09PSBcIlN0YWZmXCIgfHwgdGhpcy5jdXJyZW50VXNlci51c2VyVHlwZSA9PT0gXCJBZG1pblwiKSB7XHJcbiAgICAgIHRoaXMuY29tcGxldGVDb25zZW50Rm9ybSA9IHRydWU7XHJcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICBzd2FsKFxyXG4gICAgICAgICdSZWFkIE9ubHknLFxyXG4gICAgICAgIFwiWW91IGFyZSBsb2dnZWQgaW4gYXMgJ1wiICsgdGhpcy5jdXJyZW50VXNlci51c2VyVHlwZSArIFwiJy4gT25seSBjbGllbnRzIGNhbiBzdWJtaXQgdGhpcyBmb3JtLlwiLFxyXG4gICAgICAgICdpbmZvJ1xyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmN1cnJlbnRVc2VyLnVzZXJUeXBlID09PSBcIkNsaWVudFwiKSB7XHJcbiAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgIC5nZXRDbGllbnQodXNlcklEKVxyXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNsaWVudE5hbWUgPSByZXN1bHQuY2xpZW50WzBdLmZpcnN0TmFtZSArIFwiIFwiICsgcmVzdWx0LmNsaWVudFswXS5sYXN0TmFtZTtcclxuICAgICAgICAgIHRoaXMuZWRpdENvbnNlbnRSZXF1ZXN0ID0gcmVzdWx0LmNsaWVudFswXS5lZGl0Q29uc2VudFJlcXVlc3Q7XHJcbiAgICAgICAgICB0aGlzLmVkaXRDb25zZW50UGVybWlzc2lvbiA9IHJlc3VsdC5jbGllbnRbMF0uZWRpdENvbnNlbnRQZXJtaXNzaW9uO1xyXG4gICAgICAgICAgdGhpcy5jb21wbGV0ZUNvbnNlbnRGb3JtID0gcmVzdWx0LmNsaWVudFswXS5jb25zZW50O1xyXG4gICAgICAgICAgaWYgKCFyZXN1bHQuY2xpZW50WzBdLmNvbnNlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgLmdldENvbnNlbnRCeUlkKClcclxuICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybSA9IHJlc3VsdFswXTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdENvbnNlbnRSZXF1ZXN0ICYmICF0aGlzLmVkaXRDb25zZW50UGVybWlzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAgICdFZGl0IFJlcXVlc3QgU3VibWl0dGVkJyxcclxuICAgICAgICAgICAgICAgICAgICBcIkNoZWNrIGJhY2sgb25jZSB5b3UgaGF2ZSByZWNlaXZlZCBhbiBlbWFpbC5cIixcclxuICAgICAgICAgICAgICAgICAgICAnaW5mbydcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5lZGl0Q29uc2VudFBlcm1pc3Npb24pIHtcclxuICAgICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAnRWRpdCBSZXF1ZXN0IEdyYW50ZWQhJyxcclxuICAgICAgICAgICAgICAgICAgICBcIllvdSBjYW4gbm93IGVkaXQgdGhpcyBmb3JtLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICdpbmZvJ1xyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAnUmVhZCBPbmx5JyxcclxuICAgICAgICAgICAgICAgICAgICBcIllvdSBoYXZlIGFscmVhZHkgc3VibWl0dGVkIHRoaXMgZm9ybS4gU2VsZWN0ICdSZXF1ZXN0IHRvIEVkaXQnIGlmIHlvdSB3b3VsZCBsaWtlIHRvIG1ha2UgY2hhbmdlcy5cIixcclxuICAgICAgICAgICAgICAgICAgICAnaW5mbydcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29uc2VudEZvcm0ub3RoZXIgPT0gbnVsbCB8fCB0aGlzLmNvbnNlbnRGb3JtLm90aGVyID09PSAnJykge1xyXG4gICAgICAgICAgICAgIHRoaXMub3RoZXJDaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5vdGhlckNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtLm9udGFyaW9Xb3JrcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtLm9udGFyaW9EaXNhYmlsaXR5UHJvZ3JhbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtLmVtcGxveW1lbnRJbnN1cmFuY2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybS5lbXBsb3ltZW50U2VydmljZXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybS53c2liID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmN1cnJlbnRVc2VyLnVzZXJUeXBlID09PSBcIlN0dWRlbnRcIikge1xyXG4gICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgLmdldFN0dWRlbnQodXNlcklEKVxyXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgdGhpcy5jbGllbnROYW1lID0gcmVzdWx0LmZpcnN0TmFtZSArIFwiIFwiICsgcmVzdWx0Lmxhc3ROYW1lO1xyXG4gICAgICAgICAgdGhpcy5lZGl0Q29uc2VudFJlcXVlc3QgPSByZXN1bHQuZWRpdENvbnNlbnRSZXF1ZXN0O1xyXG4gICAgICAgICAgdGhpcy5lZGl0Q29uc2VudFBlcm1pc3Npb24gPSByZXN1bHQuZWRpdENvbnNlbnRQZXJtaXNzaW9uO1xyXG4gICAgICAgICAgdGhpcy5jb21wbGV0ZUNvbnNlbnRGb3JtID0gcmVzdWx0LmNvbnNlbnQ7XHJcbiAgICAgICAgICBpZiAoIXJlc3VsdC5jb25zZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgICAgICAgIC5nZXRDb25zZW50QnlJZCgpXHJcbiAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uc2VudEZvcm0gPSByZXN1bHRbMF07XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvbnNlbnRGb3JtKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdENvbnNlbnRSZXF1ZXN0ICYmICF0aGlzLmVkaXRDb25zZW50UGVybWlzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAgICdFZGl0IFJlcXVlc3QgU3VibWl0dGVkJyxcclxuICAgICAgICAgICAgICAgICAgICBcIkNoZWNrIGJhY2sgb25jZSB5b3UgaGF2ZSByZWNlaXZlZCBhbiBlbWFpbC5cIixcclxuICAgICAgICAgICAgICAgICAgICAnaW5mbydcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5lZGl0Q29uc2VudFBlcm1pc3Npb24pIHtcclxuICAgICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAnRWRpdCBSZXF1ZXN0IEdyYW50ZWQhJyxcclxuICAgICAgICAgICAgICAgICAgICBcIllvdSBjYW4gbm93IGVkaXQgdGhpcyBmb3JtLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICdpbmZvJ1xyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAnUmVhZCBPbmx5JyxcclxuICAgICAgICAgICAgICAgICAgICBcIllvdSBoYXZlIGFscmVhZHkgc3VibWl0dGVkIHRoaXMgZm9ybS4gU2VsZWN0ICdSZXF1ZXN0IHRvIEVkaXQnIGlmIHlvdSB3b3VsZCBsaWtlIHRvIG1ha2UgY2hhbmdlcy5cIixcclxuICAgICAgICAgICAgICAgICAgICAnaW5mbydcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29uc2VudEZvcm0ub3RoZXIgPT0gbnVsbCB8fCB0aGlzLmNvbnNlbnRGb3JtLm90aGVyID09PSAnJykge1xyXG4gICAgICAgICAgICAgIHRoaXMub3RoZXJDaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5vdGhlckNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtLm9udGFyaW9Xb3JrcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtLm9udGFyaW9EaXNhYmlsaXR5UHJvZ3JhbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtLmVtcGxveW1lbnRJbnN1cmFuY2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybS5lbXBsb3ltZW50U2VydmljZXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybS53c2liID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2F2ZUNvbnNlbnQoKSB7XHJcbiAgICAvLyBpZiAoIXRoaXMuY29uc2VudEZvcm0uYWxsb3dEZXRhaWxlZE1lc3NhZ2UpIHtcclxuICAgIC8vICAgaWYgKCF0aGlzLmNvbnNlbnRGb3JtLmFsdGVybmF0ZU51bWJlcikge1xyXG4gICAgLy8gICAgIHN3YWwoXHJcbiAgICAvLyAgICAgICAgICdXaG9vcHMhJyxcclxuICAgIC8vICAgICAgICAgJ1BsZWFzZSBlbnRlciBhbiBhbHRlcm5hdGUgcGhvbmUgbnVtYmVyLicsXHJcbiAgICAvLyAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgLy8gICAgICk7XHJcbiAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgaWYgKCF0aGlzLmNvbnNlbnRGb3JtLmNvbnRhY3ROYW1lIHx8ICF0aGlzLmNvbnNlbnRGb3JtLmNvbnRhY3ROdW0gKSB7XHJcbiAgICAvLyAgICAgICBzd2FsKFxyXG4gICAgLy8gICAgICAgICAgICdXaG9vcHMhJyxcclxuICAgIC8vICAgICAgICAgICAnUGxlYXNlIGZpbGwgb3V0IGFsbCBmb3JtIGZpZWxkcy4nLFxyXG4gICAgLy8gICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgLy8gICAgICAgKTtcclxuICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgdGhpcy5jb25zZW50Rm9ybS5kYXRlID0gdGhpcy5kYXRlO1xyXG4gICAgLy8gICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAvLyAgICAgICAgICAgLnNhdmVDb25zZW50KHRoaXMuY29uc2VudEZvcm0pXHJcbiAgICAvLyAgICAgICAgICAgLnRoZW4oY2xpZW50ID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xyXG4gICAgLy8gICAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9IGVsc2Uge1xyXG4gICAgLy8gICBpZiAoIXRoaXMuY29uc2VudEZvcm0uY29udGFjdE5hbWUgfHwgIXRoaXMuY29uc2VudEZvcm0uY29udGFjdE51bSApIHtcclxuICAgIC8vICAgICBzd2FsKFxyXG4gICAgLy8gICAgICAgICAnV2hvb3BzIScsXHJcbiAgICAvLyAgICAgICAgICdQbGVhc2UgZmlsbCBvdXQgYWxsIGZvcm0gZmllbGRzLicsXHJcbiAgICAvLyAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgLy8gICAgICk7XHJcbiAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgdGhpcy5jb25zZW50Rm9ybS5kYXRlID0gdGhpcy5kYXRlO1xyXG4gICAgLy8gICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgLy8gICAgICAgICAuc2F2ZUNvbnNlbnQodGhpcy5jb25zZW50Rm9ybSlcclxuICAgIC8vICAgICAgICAgLnRoZW4oY2xpZW50ID0+IHtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKTtcclxuICAgIC8vICAgICAgICAgfSlcclxuICAgIC8vICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH1cclxuICAgIHRoaXMuY29uc2VudEZvcm0uZGF0ZSA9IHRoaXMuZGF0ZTtcclxuICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAuc2F2ZUNvbnNlbnQodGhpcy5jb25zZW50Rm9ybSlcclxuICAgICAgLnRoZW4oY2xpZW50ID0+IHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgcmVxdWVzdEVkaXQoKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50VXNlci51c2VyVHlwZSA9PT0gXCJDbGllbnRcIikge1xyXG4gICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAucmVxdWVzdEVkaXRDb25zZW50KClcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICdSZXF1ZXN0IFNlbnQhJyxcclxuICAgICAgICAgICAgICAnWW91IHdpbGwgcmVjZWl2ZSBhbiBlbWFpbCBvbmNlIHlvdXIgcmVxdWVzdCBoYXMgYmVlbiBhY2NlcHRlZC4nLFxyXG4gICAgICAgICAgICAgICdpbmZvJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZy4uLicsXHJcbiAgICAgICAgICAgICAgJ1BsZWFzZSB0cnkgYWdhaW4uIElmIHRoZSBpc3N1ZSBwZXJzaXN0cyBjb250YWN0IHN1cHBvcnQuJyxcclxuICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50VXNlci51c2VyVHlwZSA9PT0gXCJTdHVkZW50XCIpIHtcclxuICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgIC5yZXF1ZXN0RWRpdENvbnNlbnQoKVxyXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgJ1JlcXVlc3QgU2VudCEnLFxyXG4gICAgICAgICAgICAgICdZb3Ugd2lsbCByZWNlaXZlIGFuIGVtYWlsIG9uY2UgeW91ciByZXF1ZXN0IGhhcyBiZWVuIGFjY2VwdGVkLicsXHJcbiAgICAgICAgICAgICAgJ2luZm8nXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLi4uJyxcclxuICAgICAgICAgICAgICAnUGxlYXNlIHRyeSBhZ2Fpbi4gSWYgdGhlIGlzc3VlIHBlcnNpc3RzIGNvbnRhY3Qgc3VwcG9ydC4nLFxyXG4gICAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19
