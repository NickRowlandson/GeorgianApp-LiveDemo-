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
    var core_1, http_1, authentication_service_1, ClientService;
    var __moduleName = context_1 && context_1.id;
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
            ClientService = class ClientService {
                constructor(http, authService) {
                    this.http = http;
                    this.authService = authService;
                    this.clientUrl = 'api/clients'; // URL to web api
                }
                getClients() {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http
                        .get(this.clientUrl, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get clients"));
                }
                getClient(id) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http
                        .get(this.clientUrl + '/' + id, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get client"));
                }
                create(client, suitabilityForm) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let objects = ({ client: client, suitabilityForm: suitabilityForm });
                    return this.http
                        .post(this.clientUrl, objects, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Create client"));
                }
                saveConsent(consentForm) {
                    // get current user id from web token
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    var currentUserID = currentUser.userID;
                    let url = `api/clientForms/${currentUserID}/consent`;
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let objects = ({ consentForm: consentForm });
                    return this.http
                        .post(url, objects, options)
                        .toPromise()
                        .then(response => response.json().data)
                        .catch(err => this.handleError(err, "Save consent"));
                }
                requestEditConsent() {
                    // get current user id from web token
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    var currentUserID = currentUser.userID;
                    let url = `api/clientForms/${currentUserID}/requestEditConsent`;
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http
                        .put(url, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Request to edit consent"));
                }
                grantConsentEditPermission(client, permission) {
                    // get current user id from web token
                    let url = `api/clientForms/grantConsentEditPermission`;
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let objects = ({ client: client, permission: permission });
                    return this.http
                        .put(url, objects, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Grant permission to edit consent"));
                }
                getConsentById() {
                    // get current user id from web token
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    var currentUserID = currentUser.userID;
                    let url = `api/clientForms/consent/${currentUserID}`;
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http
                        .get(url, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get consent by id"));
                }
                getLearningStyleById() {
                    // get current user id from web token
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    var currentUserID = currentUser.userID;
                    let url = `api/clientForms/learningStyle/${currentUserID}`;
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http
                        .get(url, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get learning style"));
                }
                saveLearningStyle(learningStyleForm) {
                    // get current user id from web token
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    var currentUserID = currentUser.userID;
                    let url = `api/clientForms/${currentUserID}/learningStyle`;
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let objects = ({ learningStyleForm: learningStyleForm });
                    return this.http
                        .post(url, objects, options)
                        .toPromise()
                        .then(response => response.json().data)
                        .catch(err => this.handleError(err, "Save learning style"));
                }
                addSuitability(client, suitabilityForm) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    var url = this.clientUrl + "/" + client.userID;
                    return this.http
                        .post(url, suitabilityForm, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Add suitability"));
                }
                updateGeneralInfo(client) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    var url = 'api/general-info-update';
                    return this.http
                        .put(url, client, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Update general info"));
                }
                updateSuitability(suitabilityForm) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    var url = 'api/suitability-update';
                    return this.http
                        .put(url, suitabilityForm, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Update suitability"));
                }
                updateBannerCamBool(client) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    var url = 'api/bannerCamBool-update';
                    return this.http
                        .put(url, client, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Update banner/cam boolean values"));
                }
                delete(client) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let url = `${this.clientUrl}/${client.userID}`;
                    return this.http
                        .delete(url, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Delete client"));
                }
                removeFromClientTable(userID) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let url = `${this.clientUrl}/${userID}/remove`;
                    return this.http
                        .delete(url, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Remove client"));
                }
                addAssessmentResults(assessmentResults) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http
                        .post('api/add-assessment-results', assessmentResults, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Submit Assessment Results"));
                }
                editAssessmentResults(assessmentResults) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http
                        .put('api/edit-assessment-results', assessmentResults, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Submit Assessment Results"));
                }
                handleError(error, name) {
                    console.log('An error occurred at ' + name, error);
                }
            };
            ClientService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http, authentication_service_1.AuthService])
            ], ClientService);
            exports_1("ClientService", ClientService);
        }
    };
});

//# sourceMappingURL=client.service.js.map
