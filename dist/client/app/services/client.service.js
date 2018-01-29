System.register(["@angular/core", "@angular/http", "./authentication.service", "rxjs/add/operator/toPromise"], function (exports_1, context_1) {
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
    var core_1, http_1, authentication_service_1, ClientService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            ClientService = /** @class */ (function () {
                function ClientService(http, authService) {
                    this.http = http;
                    this.authService = authService;
                    this.clientUrl = 'api/clients'; // URL to web api
                }
                ClientService.prototype.getClients = function () {
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get(this.clientUrl, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                ClientService.prototype.getClient = function (id) {
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get(this.clientUrl + '/' + id, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                ClientService.prototype.save = function (client, suitabilityForm) {
                    if (client.clientID) {
                        return this.put(client, suitabilityForm);
                    }
                    return this.post(client, suitabilityForm);
                };
                ClientService.prototype.saveConsent = function (consentForm) {
                    // get current user id from web token
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    var currentUserID = currentUser.userID;
                    var url = "api/clientForms/" + currentUserID + "/consent";
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var objects = ({ consentForm: consentForm });
                    return this.http
                        .post(url, objects, options)
                        .toPromise()
                        .then(function (response) { return response.json().data; })
                        .catch(this.handleError);
                };
                ClientService.prototype.getConsentById = function () {
                    // get current user id from web token
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    var currentUserID = currentUser.userID;
                    var url = "api/clientForms/consent/" + currentUserID;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http
                        .get(url, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                ClientService.prototype.saveLearningStyle = function (learningStyleForm) {
                    // get current user id from web token
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    var currentUserID = currentUser.userID;
                    var url = "api/clientForms/" + currentUserID + "/learningStyle";
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var objects = ({ learningStyleForm: learningStyleForm });
                    return this.http
                        .post(url, objects, options)
                        .toPromise()
                        .then(function (response) { return response.json().data; })
                        .catch(this.handleError);
                };
                ClientService.prototype.post = function (client, suitabilityForm) {
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var objects = ({ client: client, suitabilityForm: suitabilityForm });
                    return this.http
                        .post(this.clientUrl, objects, options)
                        .toPromise()
                        .then(function (response) {
                        return response.json();
                    })
                        .catch(this.handleError);
                };
                ClientService.prototype.addSuitability = function (client, suitabilityForm) {
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = this.clientUrl + "/" + client.userID;
                    return this.http
                        .post(url, suitabilityForm, options)
                        .toPromise()
                        .then(function (response) {
                        return response.json();
                    })
                        .catch(this.handleError);
                };
                ClientService.prototype.updateSuitability = function (suitabilityForm) {
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = 'api/suitability-update';
                    return this.http
                        .put(url, suitabilityForm, options)
                        .toPromise()
                        .then(function (response) {
                        return response.json();
                    })
                        .catch(this.handleError);
                };
                ClientService.prototype.updateBannerCamBool = function (client) {
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = 'api/bannerCamBool-update';
                    return this.http
                        .put(url, client, options)
                        .toPromise()
                        .then(function (response) {
                        return response.json();
                    })
                        .catch(this.handleError);
                };
                ClientService.prototype.put = function (client, suitabilityForm) {
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var objects = ({ client: client, suitabilityForm: suitabilityForm });
                    var url = this.clientUrl + "/" + client.clientID;
                    return this.http
                        .put(url, objects, options)
                        .toPromise()
                        .then(function () { return client; })
                        .catch(this.handleError);
                };
                ClientService.prototype.delete = function (client) {
                    console.log(client.userID);
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = this.clientUrl + "/" + client.userID;
                    return this.http
                        .delete(url, options)
                        .toPromise()
                        .then(function (result) {
                        console.log(result);
                    })
                        .catch(this.handleError);
                };
                ClientService.prototype.removeFromClientTable = function (userID) {
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = this.clientUrl + "/" + userID + "/remove";
                    return this.http
                        .delete(url, options)
                        .toPromise()
                        .catch(this.handleError);
                };
                ClientService.prototype.handleError = function (error) {
                    console.log('An error occurred', error);
                    return Promise.reject(error.message || error);
                };
                ClientService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [http_1.Http, authentication_service_1.AuthService])
                ], ClientService);
                return ClientService;
            }());
            exports_1("ClientService", ClientService);
        }
    };
});

//# sourceMappingURL=client.service.js.map
