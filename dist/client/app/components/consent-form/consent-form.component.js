System.register(["@angular/core", "@angular/router", "../../models/consentForm", "../../services/client.service", "../../services/student.service", "../../services/authentication.service"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, consentForm_1, client_service_1, student_service_1, authentication_service_1, ConsentFormComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (consentForm_1_1) {
                consentForm_1 = consentForm_1_1;
            },
            function (client_service_1_1) {
                client_service_1 = client_service_1_1;
            },
            function (student_service_1_1) {
                student_service_1 = student_service_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }
        ],
        execute: function () {
            ConsentFormComponent = /** @class */ (function () {
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
            exports_1("ConsentFormComponent", ConsentFormComponent);
        }
    };
});

//# sourceMappingURL=consent-form.component.js.map
