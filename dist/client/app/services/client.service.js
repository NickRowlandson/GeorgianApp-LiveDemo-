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
var http_1 = require("@angular/http");
var authentication_service_1 = require("./authentication.service");
require("rxjs/add/operator/toPromise");
var ClientService = /** @class */ (function () {
    function ClientService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.clientUrl = 'api/clients'; // URL to web api
    }
    ClientService.prototype.getClients = function () {
        var _this = this;
        // add authorization header with jwt token
        var headers = new http_1.Headers({ authorization: this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http
            .get(this.clientUrl, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (err) { return _this.handleError(err, "Get clients"); });
    };
    ClientService.prototype.getClient = function (id) {
        var _this = this;
        // add authorization header with jwt token
        var headers = new http_1.Headers({ authorization: this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http
            .get(this.clientUrl + '/' + id, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (err) { return _this.handleError(err, "Get client"); });
    };
    ClientService.prototype.create = function (client, suitabilityForm) {
        var _this = this;
        // add authorization header with jwt token
        var headers = new http_1.Headers({ authorization: this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        var objects = ({ client: client, suitabilityForm: suitabilityForm });
        return this.http
            .post(this.clientUrl, objects, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (err) { return _this.handleError(err, "Create client"); });
    };
    ClientService.prototype.saveConsent = function (consentForm) {
        var _this = this;
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
            .catch(function (err) { return _this.handleError(err, "Save consent"); });
    };
    ClientService.prototype.requestEditConsent = function () {
        var _this = this;
        // get current user id from web token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var currentUserID = currentUser.userID;
        var url = "api/clientForms/" + currentUserID + "/requestEditConsent";
        // add authorization header with jwt token
        var headers = new http_1.Headers({ authorization: this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http
            .put(url, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (err) { return _this.handleError(err, "Request to edit consent"); });
    };
    ClientService.prototype.grantConsentEditPermission = function (client, permission) {
        var _this = this;
        // get current user id from web token
        var url = "api/clientForms/grantConsentEditPermission";
        // add authorization header with jwt token
        var headers = new http_1.Headers({ authorization: this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        var objects = ({ client: client, permission: permission });
        return this.http
            .put(url, objects, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (err) { return _this.handleError(err, "Grant permission to edit consent"); });
    };
    ClientService.prototype.getConsentById = function () {
        var _this = this;
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
            .catch(function (err) { return _this.handleError(err, "Get consent by id"); });
    };
    ClientService.prototype.getLearningStyleById = function () {
        var _this = this;
        // get current user id from web token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var currentUserID = currentUser.userID;
        var url = "api/clientForms/learningStyle/" + currentUserID;
        // add authorization header with jwt token
        var headers = new http_1.Headers({ authorization: this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http
            .get(url, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (err) { return _this.handleError(err, "Get learning style"); });
    };
    ClientService.prototype.saveLearningStyle = function (learningStyleForm) {
        var _this = this;
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
            .catch(function (err) { return _this.handleError(err, "Save learning style"); });
    };
    ClientService.prototype.addSuitability = function (client, suitabilityForm) {
        var _this = this;
        // add authorization header with jwt token
        var headers = new http_1.Headers({ authorization: this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.clientUrl + "/" + client.userID;
        return this.http
            .post(url, suitabilityForm, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (err) { return _this.handleError(err, "Add suitability"); });
    };
    ClientService.prototype.updateGeneralInfo = function (client) {
        var _this = this;
        // add authorization header with jwt token
        var headers = new http_1.Headers({ authorization: this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = 'api/general-info-update';
        return this.http
            .put(url, client, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (err) { return _this.handleError(err, "Update general info"); });
    };
    ClientService.prototype.updateSuitability = function (suitabilityForm) {
        var _this = this;
        // add authorization header with jwt token
        var headers = new http_1.Headers({ authorization: this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = 'api/suitability-update';
        return this.http
            .put(url, suitabilityForm, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (err) { return _this.handleError(err, "Update suitability"); });
    };
    ClientService.prototype.updateBannerCamBool = function (client) {
        var _this = this;
        // add authorization header with jwt token
        var headers = new http_1.Headers({ authorization: this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = 'api/bannerCamBool-update';
        return this.http
            .put(url, client, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (err) { return _this.handleError(err, "Update banner/cam boolean values"); });
    };
    ClientService.prototype.delete = function (client) {
        var _this = this;
        console.log(client.userID);
        // add authorization header with jwt token
        var headers = new http_1.Headers({ authorization: this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.clientUrl + "/" + client.userID;
        return this.http
            .delete(url, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (err) { return _this.handleError(err, "Delete client"); });
    };
    ClientService.prototype.removeFromClientTable = function (userID) {
        var _this = this;
        // add authorization header with jwt token
        var headers = new http_1.Headers({ authorization: this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.clientUrl + "/" + userID + "/remove";
        return this.http
            .delete(url, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (err) { return _this.handleError(err, "Remove client"); });
    };
    ClientService.prototype.handleError = function (error, name) {
        console.log('An error occurred at ' + name, error);
    };
    ClientService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, authentication_service_1.AuthService])
    ], ClientService);
    return ClientService;
}());
exports.ClientService = ClientService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvc2VydmljZXMvY2xpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXdFO0FBQ3hFLG1FQUF1RDtBQUN2RCx1Q0FBcUM7QUFPckM7SUFJSSx1QkFBb0IsSUFBVSxFQUFVLFdBQXdCO1FBQTVDLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUZ4RCxjQUFTLEdBQUcsYUFBYSxDQUFDLENBQUUsaUJBQWlCO0lBRWUsQ0FBQztJQUVyRSxrQ0FBVSxHQUFWO1FBQUEsaUJBVUM7UUFURywwQ0FBMEM7UUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRXZELE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDWCxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUM7YUFDNUIsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQzthQUNqQyxLQUFLLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxpQ0FBUyxHQUFULFVBQVUsRUFBVTtRQUFwQixpQkFTQztRQVJHLDBDQUEwQztRQUMxQyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENB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SSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLEVBQXRDLENBQXNDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRU8sbUNBQVcsR0FBbkIsVUFBb0IsS0FBVSxFQUFFLElBQVM7UUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQTVOUSxhQUFhO1FBRHpCLGlCQUFVLEVBQUU7eUNBS2lCLFdBQUksRUFBdUIsb0NBQVc7T0FKdkQsYUFBYSxDQTZOekI7SUFBRCxvQkFBQztDQTdORCxBQTZOQyxJQUFBO0FBN05ZLHNDQUFhIiwiZmlsZSI6ImFwcC9zZXJ2aWNlcy9jbGllbnQuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSGVhZGVycywgSHR0cCwgUmVzcG9uc2UsIFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xyXG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tIFwiLi4vbW9kZWxzL2NsaWVudFwiO1xyXG5pbXBvcnQgeyBDb25zZW50Rm9ybSB9IGZyb20gXCIuLi9tb2RlbHMvY29uc2VudEZvcm1cIjtcclxuaW1wb3J0IHsgTGVhcm5pbmdTdHlsZUZvcm0gfSBmcm9tIFwiLi4vbW9kZWxzL2xlYXJuaW5nU3R5bGVGb3JtXCI7XHJcbmltcG9ydCB7IFN1aXRhYmlsaXR5Rm9ybSB9IGZyb20gXCIuLi9tb2RlbHMvc3VpdGFiaWxpdHlGb3JtXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDbGllbnRTZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIGNsaWVudFVybCA9ICdhcGkvY2xpZW50cyc7ICAvLyBVUkwgdG8gd2ViIGFwaVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIGdldENsaWVudHMoKTogUHJvbWlzZTxDbGllbnRbXT4ge1xyXG4gICAgICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAgICAgICAuZ2V0KHRoaXMuY2xpZW50VXJsLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAudG9Qcm9taXNlKClcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkdldCBjbGllbnRzXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDbGllbnQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAgIC5nZXQodGhpcy5jbGllbnRVcmwgKyAnLycgKyBpZCwgb3B0aW9ucylcclxuICAgICAgICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJHZXQgY2xpZW50XCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGUoY2xpZW50OiBDbGllbnQsIHN1aXRhYmlsaXR5Rm9ybTogU3VpdGFiaWxpdHlGb3JtKTogUHJvbWlzZTxDbGllbnQ+IHtcclxuICAgICAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcbiAgICAgICAgbGV0IG9iamVjdHMgPSAoeyBjbGllbnQ6IGNsaWVudCwgc3VpdGFiaWxpdHlGb3JtOiBzdWl0YWJpbGl0eUZvcm0gfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAgICAgICAucG9zdCh0aGlzLmNsaWVudFVybCwgb2JqZWN0cywgb3B0aW9ucylcclxuICAgICAgICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJDcmVhdGUgY2xpZW50XCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlQ29uc2VudChjb25zZW50Rm9ybTogQ29uc2VudEZvcm0pOiBQcm9taXNlPENvbnNlbnRGb3JtPiB7XHJcbiAgICAgIC8vIGdldCBjdXJyZW50IHVzZXIgaWQgZnJvbSB3ZWIgdG9rZW5cclxuICAgICAgdmFyIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcbiAgICAgIHZhciBjdXJyZW50VXNlcklEID0gY3VycmVudFVzZXIudXNlcklEO1xyXG4gICAgICBsZXQgdXJsID0gYGFwaS9jbGllbnRGb3Jtcy8ke2N1cnJlbnRVc2VySUR9L2NvbnNlbnRgO1xyXG4gICAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICAgICAgbGV0IG9iamVjdHMgPSAoeyBjb25zZW50Rm9ybTogY29uc2VudEZvcm0gfSk7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgICAgIC5wb3N0KHVybCwgb2JqZWN0cywgb3B0aW9ucylcclxuICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpLmRhdGEpXHJcbiAgICAgICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIlNhdmUgY29uc2VudFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdEVkaXRDb25zZW50KCk6IFByb21pc2U8Q2xpZW50PiB7XHJcbiAgICAgIC8vIGdldCBjdXJyZW50IHVzZXIgaWQgZnJvbSB3ZWIgdG9rZW5cclxuICAgICAgdmFyIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcbiAgICAgIHZhciBjdXJyZW50VXNlcklEID0gY3VycmVudFVzZXIudXNlcklEO1xyXG4gICAgICBsZXQgdXJsID0gYGFwaS9jbGllbnRGb3Jtcy8ke2N1cnJlbnRVc2VySUR9L3JlcXVlc3RFZGl0Q29uc2VudGA7XHJcbiAgICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAgICAgLnB1dCh1cmwsIG9wdGlvbnMpXHJcbiAgICAgICAgICAudG9Qcm9taXNlKClcclxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiUmVxdWVzdCB0byBlZGl0IGNvbnNlbnRcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIGdyYW50Q29uc2VudEVkaXRQZXJtaXNzaW9uKGNsaWVudCwgcGVybWlzc2lvbik6IFByb21pc2U8Q2xpZW50PiB7XHJcbiAgICAgIC8vIGdldCBjdXJyZW50IHVzZXIgaWQgZnJvbSB3ZWIgdG9rZW5cclxuICAgICAgbGV0IHVybCA9IGBhcGkvY2xpZW50Rm9ybXMvZ3JhbnRDb25zZW50RWRpdFBlcm1pc3Npb25gO1xyXG4gICAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICAgICAgbGV0IG9iamVjdHMgPSAoeyBjbGllbnQ6IGNsaWVudCwgcGVybWlzc2lvbjpwZXJtaXNzaW9uIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAucHV0KHVybCwgb2JqZWN0cywgb3B0aW9ucylcclxuICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJHcmFudCBwZXJtaXNzaW9uIHRvIGVkaXQgY29uc2VudFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29uc2VudEJ5SWQoKTogUHJvbWlzZTxDb25zZW50Rm9ybT4gIHtcclxuICAgICAgLy8gZ2V0IGN1cnJlbnQgdXNlciBpZCBmcm9tIHdlYiB0b2tlblxyXG4gICAgICB2YXIgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgICAgdmFyIGN1cnJlbnRVc2VySUQgPSBjdXJyZW50VXNlci51c2VySUQ7XHJcbiAgICAgIGxldCB1cmwgPSBgYXBpL2NsaWVudEZvcm1zL2NvbnNlbnQvJHtjdXJyZW50VXNlcklEfWA7XHJcbiAgICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAuZ2V0KHVybCwgb3B0aW9ucylcclxuICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJHZXQgY29uc2VudCBieSBpZFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGVhcm5pbmdTdHlsZUJ5SWQoKTogUHJvbWlzZTxMZWFybmluZ1N0eWxlRm9ybT4gIHtcclxuICAgICAgLy8gZ2V0IGN1cnJlbnQgdXNlciBpZCBmcm9tIHdlYiB0b2tlblxyXG4gICAgICB2YXIgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgICAgdmFyIGN1cnJlbnRVc2VySUQgPSBjdXJyZW50VXNlci51c2VySUQ7XHJcbiAgICAgIGxldCB1cmwgPSBgYXBpL2NsaWVudEZvcm1zL2xlYXJuaW5nU3R5bGUvJHtjdXJyZW50VXNlcklEfWA7XHJcbiAgICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAuZ2V0KHVybCwgb3B0aW9ucylcclxuICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJHZXQgbGVhcm5pbmcgc3R5bGVcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVMZWFybmluZ1N0eWxlKGxlYXJuaW5nU3R5bGVGb3JtOiBMZWFybmluZ1N0eWxlRm9ybSk6IFByb21pc2U8TGVhcm5pbmdTdHlsZUZvcm0+IHtcclxuICAgICAgLy8gZ2V0IGN1cnJlbnQgdXNlciBpZCBmcm9tIHdlYiB0b2tlblxyXG4gICAgICB2YXIgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgICAgdmFyIGN1cnJlbnRVc2VySUQgPSBjdXJyZW50VXNlci51c2VySUQ7XHJcbiAgICAgIGxldCB1cmwgPSBgYXBpL2NsaWVudEZvcm1zLyR7Y3VycmVudFVzZXJJRH0vbGVhcm5pbmdTdHlsZWA7XHJcbiAgICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gICAgICBsZXQgb2JqZWN0cyA9ICh7IGxlYXJuaW5nU3R5bGVGb3JtOiBsZWFybmluZ1N0eWxlRm9ybSB9KTtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAgICAgLnBvc3QodXJsLCBvYmplY3RzLCBvcHRpb25zKVxyXG4gICAgICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkuZGF0YSlcclxuICAgICAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiU2F2ZSBsZWFybmluZyBzdHlsZVwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkU3VpdGFiaWxpdHkoY2xpZW50LCBzdWl0YWJpbGl0eUZvcm06IFN1aXRhYmlsaXR5Rm9ybSk6IFByb21pc2U8U3VpdGFiaWxpdHlGb3JtPiB7XHJcbiAgICAgICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgICAgICB2YXIgdXJsID0gdGhpcy5jbGllbnRVcmwgKyBcIi9cIiArIGNsaWVudC51c2VySUQ7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgICAgICAgLnBvc3QodXJsLCBzdWl0YWJpbGl0eUZvcm0sIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiQWRkIHN1aXRhYmlsaXR5XCIpKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVHZW5lcmFsSW5mbyhjbGllbnQ6IENsaWVudCk6IFByb21pc2U8Q2xpZW50PiB7XHJcbiAgICAgICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgICAgICB2YXIgdXJsID0gJ2FwaS9nZW5lcmFsLWluZm8tdXBkYXRlJztcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAgICAgICAucHV0KHVybCwgY2xpZW50LCBvcHRpb25zKVxyXG4gICAgICAgICAgICAudG9Qcm9taXNlKClcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIlVwZGF0ZSBnZW5lcmFsIGluZm9cIikpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVN1aXRhYmlsaXR5KHN1aXRhYmlsaXR5Rm9ybTogU3VpdGFiaWxpdHlGb3JtKTogUHJvbWlzZTxTdWl0YWJpbGl0eUZvcm0+IHtcclxuICAgICAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgICAgIHZhciB1cmwgPSAnYXBpL3N1aXRhYmlsaXR5LXVwZGF0ZSc7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgICAgICAgLnB1dCh1cmwsIHN1aXRhYmlsaXR5Rm9ybSwgb3B0aW9ucylcclxuICAgICAgICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJVcGRhdGUgc3VpdGFiaWxpdHlcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUJhbm5lckNhbUJvb2woY2xpZW50OiBDbGllbnQpOiBQcm9taXNlPENsaWVudD4ge1xyXG4gICAgICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICAgICAgdmFyIHVybCA9ICdhcGkvYmFubmVyQ2FtQm9vbC11cGRhdGUnO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAgIC5wdXQodXJsLCBjbGllbnQsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiVXBkYXRlIGJhbm5lci9jYW0gYm9vbGVhbiB2YWx1ZXNcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZShjbGllbnQpIHtcclxuICAgICAgY29uc29sZS5sb2coY2xpZW50LnVzZXJJRCk7XHJcbiAgICAgICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgICAgICBsZXQgdXJsID0gYCR7dGhpcy5jbGllbnRVcmx9LyR7Y2xpZW50LnVzZXJJRH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAgIC5kZWxldGUodXJsLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAudG9Qcm9taXNlKClcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkRlbGV0ZSBjbGllbnRcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUZyb21DbGllbnRUYWJsZSh1c2VySUQpIHtcclxuICAgICAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgICAgIGxldCB1cmwgPSBgJHt0aGlzLmNsaWVudFVybH0vJHt1c2VySUR9L3JlbW92ZWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgICAgICAgLmRlbGV0ZSh1cmwsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiUmVtb3ZlIGNsaWVudFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55LCBuYW1lOiBhbnkpIHtcclxuICAgICAgY29uc29sZS5sb2coJ0FuIGVycm9yIG9jY3VycmVkIGF0ICcgKyBuYW1lLCBlcnJvcik7XHJcbiAgICB9XHJcbn1cclxuIl19
