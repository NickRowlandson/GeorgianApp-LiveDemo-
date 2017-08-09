System.register(["@angular/core", "@angular/router", "../../models/consentForm", "../../services/client.service", "../../services/authentication.service"], function (exports_1, context_1) {
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
    var core_1, router_1, consentForm_1, client_service_1, authentication_service_1, ConsentFormComponent;
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
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }
        ],
        execute: function () {
            ConsentFormComponent = (function () {
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
                }
                ConsentFormComponent.prototype.saveConsent = function () {
                    var _this = this;
                    this.consentForm.date = this.date;
                    this.clientService
                        .saveConsent(this.consentForm)
                        .then(function (client) {
                        _this.router.navigate(['/dashboard']);
                    })
                        .catch(function (error) { return _this.error = error; }); // TODO: Display error message
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
            exports_1("ConsentFormComponent", ConsentFormComponent);
        }
    };
});

//# sourceMappingURL=consent-form.component.js.map
