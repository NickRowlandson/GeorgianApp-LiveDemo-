System.register(["@angular/core", "@angular/router", "../../services/authentication.service"], function (exports_1, context_1) {
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
    var core_1, router_1, authentication_service_1, ResetPasswordComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }
        ],
        execute: function () {
            ResetPasswordComponent = class ResetPasswordComponent {
                constructor(router, authService) {
                    this.router = router;
                    this.authService = authService;
                    this.password1 = "";
                    this.password2 = "";
                    this.showSubmit = false;
                    this.passLength = false;
                    this.capital = false;
                    this.weakPass = false;
                    this.illegalCharacters = false;
                    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                }
                inputChange() {
                    var capitalCount = 0;
                    for (var i = 0; i < this.password1.length; i++) {
                        if (/[A-Z]/.test(this.password1.charAt(i))) {
                            capitalCount++;
                        }
                    }
                    if (/^[a-zA-Z0-9- ]*$/.test(this.password1) === false) {
                        this.illegalCharacters = true;
                    }
                    else {
                        this.illegalCharacters = false;
                    }
                    if (this.password1.length >= 8 && this.password1.length <= 25) {
                        this.passLength = true;
                    }
                    else if (this.password1.length > 25) {
                        this.passLength = false;
                    }
                    else {
                        this.passLength = false;
                    }
                    if (this.password1.length < 10 && this.password1.length >= 8 && capitalCount < 2 && capitalCount !== 0) {
                        this.weakPass = true;
                    }
                    else {
                        this.weakPass = false;
                    }
                    if (capitalCount >= 1) {
                        this.capital = true;
                    }
                    else {
                        this.capital = false;
                    }
                    if (this.password1 === this.password2 && this.passLength && this.capital) {
                        this.showSubmit = true;
                    }
                    else {
                        this.showSubmit = false;
                    }
                }
                resetPassword() {
                    this.authService.resetPassword(this.currentUser.userID, this.password1)
                        .then(result => {
                        if (result.result === 'error') {
                            this.displayErrorAlert(result);
                        }
                        else if (result.result === 'invalid') {
                            swal(result.title, result.msg, 'error');
                        }
                        else if (result.result === 'success') {
                            swal(result.title, result.msg, 'success');
                            this.router.navigate(['/login']);
                            //window.history.back();
                        }
                        else {
                            console.log("There was an error with your request...");
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }
                requestReset() {
                    if (this.email == null || this.email === "") {
                        swal('Error', 'Please enter your email address.', 'warning');
                    }
                    else {
                        this.authService.requestReset(this.email)
                            .then(result => {
                            if (result.result === 'error') {
                                this.displayErrorAlert(result);
                            }
                            else if (result.result === 'invalid') {
                                swal(result.title, result.msg, 'error');
                            }
                            else if (result.result === 'success') {
                                swal(result.title, result.msg, 'success');
                                //this.router.navigate(['/login']);
                                window.history.back();
                            }
                            else {
                                console.log("There was an error with your request...");
                            }
                        }).catch(error => {
                            console.log(error);
                        });
                    }
                }
                displayErrorAlert(error) {
                    if (error.title === "Auth Error") {
                        this.router.navigate(['/login']);
                        swal(error.title, error.msg, 'info');
                    }
                    else {
                        swal(error.title, error.msg, 'error');
                    }
                }
                goBack() {
                    this.router.navigate(['/login']);
                }
            };
            ResetPasswordComponent = __decorate([
                core_1.Component({
                    selector: 'consentForm',
                    templateUrl: './app/components/reset-password/reset-password.component.html',
                    styleUrls: ['./app/components/reset-password/reset-password.component.css']
                }),
                __metadata("design:paramtypes", [router_1.Router, authentication_service_1.AuthService])
            ], ResetPasswordComponent);
            exports_1("ResetPasswordComponent", ResetPasswordComponent);
        }
    };
});

//# sourceMappingURL=reset-password.component.js.map
