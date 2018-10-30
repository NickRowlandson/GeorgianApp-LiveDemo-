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
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const authentication_service_1 = require("./authentication.service");
require("rxjs/add/operator/toPromise");
let ClientService = class ClientService {
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
exports.ClientService = ClientService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvc2VydmljZXMvY2xpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBMkM7QUFDM0Msd0NBQXdFO0FBQ3hFLHFFQUF1RDtBQUN2RCx1Q0FBcUM7QUFRckMsSUFBYSxhQUFhLEdBQTFCO0lBSUksWUFBb0IsSUFBVSxFQUFVLFdBQXdCO1FBQTVDLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUZ4RCxjQUFTLEdBQUcsYUFBYSxDQUFDLENBQUUsaUJBQWlCO0lBRWUsQ0FBQztJQUVyRSxVQUFVO1FBQ04sMENBQTBDO1FBQzFDLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUV2RCxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ1gsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDO2FBQzVCLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNqQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxTQUFTLENBQUMsRUFBVTtRQUNoQiwwQ0FBMEM7UUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxF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QUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ1gsR0FBRyxDQUFDLDZCQUE2QixFQUFFLGlCQUFpQixFQUFFLE9BQU8sQ0FBQzthQUM5RCxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDakMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsMkJBQTJCLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFTyxXQUFXLENBQUMsS0FBVSxFQUFFLElBQVM7UUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckQsQ0FBQztDQUNKLENBQUE7QUFsUFksYUFBYTtJQUR6QixpQkFBVSxFQUFFO3FDQUtpQixXQUFJLEVBQXVCLG9DQUFXO0dBSnZELGFBQWEsQ0FrUHpCO0FBbFBZLHNDQUFhIiwiZmlsZSI6ImFwcC9zZXJ2aWNlcy9jbGllbnQuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSGVhZGVycywgSHR0cCwgUmVzcG9uc2UsIFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xyXG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tIFwiLi4vbW9kZWxzL2NsaWVudFwiO1xyXG5pbXBvcnQgeyBDb25zZW50Rm9ybSB9IGZyb20gXCIuLi9tb2RlbHMvY29uc2VudEZvcm1cIjtcclxuaW1wb3J0IHsgTGVhcm5pbmdTdHlsZUZvcm0gfSBmcm9tIFwiLi4vbW9kZWxzL2xlYXJuaW5nU3R5bGVGb3JtXCI7XHJcbmltcG9ydCB7IFN1aXRhYmlsaXR5Rm9ybSB9IGZyb20gXCIuLi9tb2RlbHMvc3VpdGFiaWxpdHlGb3JtXCI7XHJcbmltcG9ydCB7IEFzc2Vzc21lbnRSZXN1bHRzIH0gZnJvbSBcIi4uL21vZGVscy9hc3Nlc3NtZW50UmVzdWx0c1wiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ2xpZW50U2VydmljZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBjbGllbnRVcmwgPSAnYXBpL2NsaWVudHMnOyAgLy8gVVJMIHRvIHdlYiBhcGlcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBnZXRDbGllbnRzKCk6IFByb21pc2U8Q2xpZW50W10+IHtcclxuICAgICAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgICAgICAgLmdldCh0aGlzLmNsaWVudFVybCwgb3B0aW9ucylcclxuICAgICAgICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJHZXQgY2xpZW50c1wiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2xpZW50KGlkOiBzdHJpbmcpIHtcclxuICAgICAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAgICAgICAuZ2V0KHRoaXMuY2xpZW50VXJsICsgJy8nICsgaWQsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiR2V0IGNsaWVudFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlKGNsaWVudDogQ2xpZW50LCBzdWl0YWJpbGl0eUZvcm06IFN1aXRhYmlsaXR5Rm9ybSk6IFByb21pc2U8Q2xpZW50PiB7XHJcbiAgICAgICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gICAgICAgIGxldCBvYmplY3RzID0gKHsgY2xpZW50OiBjbGllbnQsIHN1aXRhYmlsaXR5Rm9ybTogc3VpdGFiaWxpdHlGb3JtIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgICAgICAgLnBvc3QodGhpcy5jbGllbnRVcmwsIG9iamVjdHMsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiQ3JlYXRlIGNsaWVudFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUNvbnNlbnQoY29uc2VudEZvcm06IENvbnNlbnRGb3JtKTogUHJvbWlzZTxDb25zZW50Rm9ybT4ge1xyXG4gICAgICAvLyBnZXQgY3VycmVudCB1c2VyIGlkIGZyb20gd2ViIHRva2VuXHJcbiAgICAgIHZhciBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgICB2YXIgY3VycmVudFVzZXJJRCA9IGN1cnJlbnRVc2VyLnVzZXJJRDtcclxuICAgICAgbGV0IHVybCA9IGBhcGkvY2xpZW50Rm9ybXMvJHtjdXJyZW50VXNlcklEfS9jb25zZW50YDtcclxuICAgICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcbiAgICAgIGxldCBvYmplY3RzID0gKHsgY29uc2VudEZvcm06IGNvbnNlbnRGb3JtIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAucG9zdCh1cmwsIG9iamVjdHMsIG9wdGlvbnMpXHJcbiAgICAgICAgICAudG9Qcm9taXNlKClcclxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKS5kYXRhKVxyXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJTYXZlIGNvbnNlbnRcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3RFZGl0Q29uc2VudCgpOiBQcm9taXNlPENsaWVudD4ge1xyXG4gICAgICAvLyBnZXQgY3VycmVudCB1c2VyIGlkIGZyb20gd2ViIHRva2VuXHJcbiAgICAgIHZhciBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgICB2YXIgY3VycmVudFVzZXJJRCA9IGN1cnJlbnRVc2VyLnVzZXJJRDtcclxuICAgICAgbGV0IHVybCA9IGBhcGkvY2xpZW50Rm9ybXMvJHtjdXJyZW50VXNlcklEfS9yZXF1ZXN0RWRpdENvbnNlbnRgO1xyXG4gICAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgICAgIC5wdXQodXJsLCBvcHRpb25zKVxyXG4gICAgICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIlJlcXVlc3QgdG8gZWRpdCBjb25zZW50XCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBncmFudENvbnNlbnRFZGl0UGVybWlzc2lvbihjbGllbnQsIHBlcm1pc3Npb24pOiBQcm9taXNlPENsaWVudD4ge1xyXG4gICAgICAvLyBnZXQgY3VycmVudCB1c2VyIGlkIGZyb20gd2ViIHRva2VuXHJcbiAgICAgIGxldCB1cmwgPSBgYXBpL2NsaWVudEZvcm1zL2dyYW50Q29uc2VudEVkaXRQZXJtaXNzaW9uYDtcclxuICAgICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcbiAgICAgIGxldCBvYmplY3RzID0gKHsgY2xpZW50OiBjbGllbnQsIHBlcm1pc3Npb246cGVybWlzc2lvbiB9KTtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAgICAgLnB1dCh1cmwsIG9iamVjdHMsIG9wdGlvbnMpXHJcbiAgICAgICAgICAudG9Qcm9taXNlKClcclxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiR3JhbnQgcGVybWlzc2lvbiB0byBlZGl0IGNvbnNlbnRcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvbnNlbnRCeUlkKCk6IFByb21pc2U8Q29uc2VudEZvcm0+ICB7XHJcbiAgICAgIC8vIGdldCBjdXJyZW50IHVzZXIgaWQgZnJvbSB3ZWIgdG9rZW5cclxuICAgICAgdmFyIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcbiAgICAgIHZhciBjdXJyZW50VXNlcklEID0gY3VycmVudFVzZXIudXNlcklEO1xyXG4gICAgICBsZXQgdXJsID0gYGFwaS9jbGllbnRGb3Jtcy9jb25zZW50LyR7Y3VycmVudFVzZXJJRH1gO1xyXG4gICAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAgICAgLmdldCh1cmwsIG9wdGlvbnMpXHJcbiAgICAgICAgICAudG9Qcm9taXNlKClcclxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiR2V0IGNvbnNlbnQgYnkgaWRcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExlYXJuaW5nU3R5bGVCeUlkKCk6IFByb21pc2U8TGVhcm5pbmdTdHlsZUZvcm0+ICB7XHJcbiAgICAgIC8vIGdldCBjdXJyZW50IHVzZXIgaWQgZnJvbSB3ZWIgdG9rZW5cclxuICAgICAgdmFyIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcbiAgICAgIHZhciBjdXJyZW50VXNlcklEID0gY3VycmVudFVzZXIudXNlcklEO1xyXG4gICAgICBsZXQgdXJsID0gYGFwaS9jbGllbnRGb3Jtcy9sZWFybmluZ1N0eWxlLyR7Y3VycmVudFVzZXJJRH1gO1xyXG4gICAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAgICAgLmdldCh1cmwsIG9wdGlvbnMpXHJcbiAgICAgICAgICAudG9Qcm9taXNlKClcclxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiR2V0IGxlYXJuaW5nIHN0eWxlXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlTGVhcm5pbmdTdHlsZShsZWFybmluZ1N0eWxlRm9ybTogTGVhcm5pbmdTdHlsZUZvcm0pOiBQcm9taXNlPExlYXJuaW5nU3R5bGVGb3JtPiB7XHJcbiAgICAgIC8vIGdldCBjdXJyZW50IHVzZXIgaWQgZnJvbSB3ZWIgdG9rZW5cclxuICAgICAgdmFyIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcbiAgICAgIHZhciBjdXJyZW50VXNlcklEID0gY3VycmVudFVzZXIudXNlcklEO1xyXG4gICAgICBsZXQgdXJsID0gYGFwaS9jbGllbnRGb3Jtcy8ke2N1cnJlbnRVc2VySUR9L2xlYXJuaW5nU3R5bGVgO1xyXG4gICAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICAgICAgbGV0IG9iamVjdHMgPSAoeyBsZWFybmluZ1N0eWxlRm9ybTogbGVhcm5pbmdTdHlsZUZvcm0gfSk7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgICAgIC5wb3N0KHVybCwgb2JqZWN0cywgb3B0aW9ucylcclxuICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpLmRhdGEpXHJcbiAgICAgICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIlNhdmUgbGVhcm5pbmcgc3R5bGVcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFN1aXRhYmlsaXR5KGNsaWVudCwgc3VpdGFiaWxpdHlGb3JtOiBTdWl0YWJpbGl0eUZvcm0pOiBQcm9taXNlPFN1aXRhYmlsaXR5Rm9ybT4ge1xyXG4gICAgICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICAgICAgdmFyIHVybCA9IHRoaXMuY2xpZW50VXJsICsgXCIvXCIgKyBjbGllbnQudXNlcklEO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAgIC5wb3N0KHVybCwgc3VpdGFiaWxpdHlGb3JtLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAudG9Qcm9taXNlKClcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkFkZCBzdWl0YWJpbGl0eVwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlR2VuZXJhbEluZm8oY2xpZW50OiBDbGllbnQpOiBQcm9taXNlPENsaWVudD4ge1xyXG4gICAgICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICAgICAgdmFyIHVybCA9ICdhcGkvZ2VuZXJhbC1pbmZvLXVwZGF0ZSc7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgICAgICAgLnB1dCh1cmwsIGNsaWVudCwgb3B0aW9ucylcclxuICAgICAgICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJVcGRhdGUgZ2VuZXJhbCBpbmZvXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTdWl0YWJpbGl0eShzdWl0YWJpbGl0eUZvcm06IFN1aXRhYmlsaXR5Rm9ybSk6IFByb21pc2U8U3VpdGFiaWxpdHlGb3JtPiB7XHJcbiAgICAgICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgICAgICB2YXIgdXJsID0gJ2FwaS9zdWl0YWJpbGl0eS11cGRhdGUnO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAgIC5wdXQodXJsLCBzdWl0YWJpbGl0eUZvcm0sIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiVXBkYXRlIHN1aXRhYmlsaXR5XCIpKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVCYW5uZXJDYW1Cb29sKGNsaWVudDogQ2xpZW50KTogUHJvbWlzZTxDbGllbnQ+IHtcclxuICAgICAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgICAgIHZhciB1cmwgPSAnYXBpL2Jhbm5lckNhbUJvb2wtdXBkYXRlJztcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAgICAgICAucHV0KHVybCwgY2xpZW50LCBvcHRpb25zKVxyXG4gICAgICAgICAgICAudG9Qcm9taXNlKClcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIlVwZGF0ZSBiYW5uZXIvY2FtIGJvb2xlYW4gdmFsdWVzXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGUoY2xpZW50KSB7XHJcbiAgICAgICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgICAgICBsZXQgdXJsID0gYCR7dGhpcy5jbGllbnRVcmx9LyR7Y2xpZW50LnVzZXJJRH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAgIC5kZWxldGUodXJsLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAudG9Qcm9taXNlKClcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkRlbGV0ZSBjbGllbnRcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUZyb21DbGllbnRUYWJsZSh1c2VySUQpIHtcclxuICAgICAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgICAgIGxldCB1cmwgPSBgJHt0aGlzLmNsaWVudFVybH0vJHt1c2VySUR9L3JlbW92ZWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgICAgICAgLmRlbGV0ZSh1cmwsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiUmVtb3ZlIGNsaWVudFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQXNzZXNzbWVudFJlc3VsdHMoYXNzZXNzbWVudFJlc3VsdHM6IEFzc2Vzc21lbnRSZXN1bHRzKTogUHJvbWlzZTxBc3Nlc3NtZW50UmVzdWx0cz4ge1xyXG4gICAgICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAgIC5wb3N0KCdhcGkvYWRkLWFzc2Vzc21lbnQtcmVzdWx0cycsIGFzc2Vzc21lbnRSZXN1bHRzLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAudG9Qcm9taXNlKClcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIlN1Ym1pdCBBc3Nlc3NtZW50IFJlc3VsdHNcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXRBc3Nlc3NtZW50UmVzdWx0cyhhc3Nlc3NtZW50UmVzdWx0czogQXNzZXNzbWVudFJlc3VsdHMpOiBQcm9taXNlPEFzc2Vzc21lbnRSZXN1bHRzPiB7XHJcbiAgICAgICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgICAgICAgLnB1dCgnYXBpL2VkaXQtYXNzZXNzbWVudC1yZXN1bHRzJywgYXNzZXNzbWVudFJlc3VsdHMsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiU3VibWl0IEFzc2Vzc21lbnQgUmVzdWx0c1wiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55LCBuYW1lOiBhbnkpIHtcclxuICAgICAgY29uc29sZS5sb2coJ0FuIGVycm9yIG9jY3VycmVkIGF0ICcgKyBuYW1lLCBlcnJvcik7XHJcbiAgICB9XHJcbn1cclxuIl19
