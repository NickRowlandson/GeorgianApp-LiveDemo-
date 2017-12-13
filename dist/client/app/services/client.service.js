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
        // add authorization header with jwt token
        var headers = new http_1.Headers({ authorization: this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.clientUrl + "/" + client.userID;
        return this.http
            .delete(url, options)
            .toPromise()
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
exports.ClientService = ClientService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvc2VydmljZXMvY2xpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXdFO0FBQ3hFLG1FQUF1RDtBQUN2RCx1Q0FBcUM7QUFPckM7SUFJSSx1QkFBb0IsSUFBVSxFQUFVLFdBQXdCO1FBQTVDLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUZ4RCxjQUFTLEdBQUcsYUFBYSxDQUFDLENBQUUsaUJBQWlCO0lBRWUsQ0FBQztJQUVyRSxrQ0FBVSxHQUFWO1FBQ0ksMENBQTBDO1FBQzFDLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUV2RCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUM7YUFDeEMsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQzthQUNqQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxpQ0FBUyxHQUFULFVBQVUsRUFBVTtRQUNoQiwwQ0FBMEM7UUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFD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L2NsaWVudC5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIZWFkZXJzLCBIdHRwLCBSZXNwb25zZSwgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XHJcbmltcG9ydCB7IENsaWVudCB9IGZyb20gXCIuLi9tb2RlbHMvY2xpZW50XCI7XHJcbmltcG9ydCB7IENvbnNlbnRGb3JtIH0gZnJvbSBcIi4uL21vZGVscy9jb25zZW50Rm9ybVwiO1xyXG5pbXBvcnQgeyBMZWFybmluZ1N0eWxlRm9ybSB9IGZyb20gXCIuLi9tb2RlbHMvbGVhcm5pbmdTdHlsZUZvcm1cIjtcclxuaW1wb3J0IHsgU3VpdGFiaWxpdHlGb3JtIH0gZnJvbSBcIi4uL21vZGVscy9zdWl0YWJpbGl0eUZvcm1cIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENsaWVudFNlcnZpY2Uge1xyXG5cclxuICAgIHByaXZhdGUgY2xpZW50VXJsID0gJ2FwaS9jbGllbnRzJzsgIC8vIFVSTCB0byB3ZWIgYXBpXHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkgeyB9XHJcblxyXG4gICAgZ2V0Q2xpZW50cygpOiBQcm9taXNlPENsaWVudFtdPiB7XHJcbiAgICAgICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmNsaWVudFVybCwgb3B0aW9ucylcclxuICAgICAgICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENsaWVudChpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuY2xpZW50VXJsICsgJy8nICsgaWQsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlKGNsaWVudDogQ2xpZW50LCBzdWl0YWJpbGl0eUZvcm06IFN1aXRhYmlsaXR5Rm9ybSk6IFByb21pc2U8Q2xpZW50PiB7XHJcbiAgICAgICAgaWYgKGNsaWVudC5jbGllbnRJRCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXQoY2xpZW50LCBzdWl0YWJpbGl0eUZvcm0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5wb3N0KGNsaWVudCwgc3VpdGFiaWxpdHlGb3JtKTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlQ29uc2VudChjb25zZW50Rm9ybTogQ29uc2VudEZvcm0pOiBQcm9taXNlPENsaWVudD4ge1xyXG4gICAgICAvLyBnZXQgY3VycmVudCB1c2VyIGlkIGZyb20gd2ViIHRva2VuXHJcbiAgICAgIHZhciBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgICB2YXIgY3VycmVudFVzZXJJRCA9IGN1cnJlbnRVc2VyLnVzZXJJRDtcclxuICAgICAgbGV0IHVybCA9IGBhcGkvY2xpZW50Rm9ybXMvJHtjdXJyZW50VXNlcklEfS9jb25zZW50YDtcclxuICAgICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcbiAgICAgIGxldCBvYmplY3RzID0gKHsgY29uc2VudEZvcm06IGNvbnNlbnRGb3JtIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAucG9zdCh1cmwsIG9iamVjdHMsIG9wdGlvbnMpXHJcbiAgICAgICAgICAudG9Qcm9taXNlKClcclxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKS5kYXRhKVxyXG4gICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVMZWFybmluZ1N0eWxlKGxlYXJuaW5nU3R5bGVGb3JtOiBMZWFybmluZ1N0eWxlRm9ybSk6IFByb21pc2U8Q2xpZW50PiB7XHJcbiAgICAgIC8vIGdldCBjdXJyZW50IHVzZXIgaWQgZnJvbSB3ZWIgdG9rZW5cclxuICAgICAgdmFyIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcbiAgICAgIHZhciBjdXJyZW50VXNlcklEID0gY3VycmVudFVzZXIudXNlcklEO1xyXG4gICAgICBsZXQgdXJsID0gYGFwaS9jbGllbnRGb3Jtcy8ke2N1cnJlbnRVc2VySUR9L2xlYXJuaW5nU3R5bGVgO1xyXG4gICAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICAgICAgbGV0IG9iamVjdHMgPSAoeyBsZWFybmluZ1N0eWxlRm9ybTogbGVhcm5pbmdTdHlsZUZvcm0gfSk7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgICAgIC5wb3N0KHVybCwgb2JqZWN0cywgb3B0aW9ucylcclxuICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpLmRhdGEpXHJcbiAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwb3N0KGNsaWVudDogQ2xpZW50LCBzdWl0YWJpbGl0eUZvcm06IFN1aXRhYmlsaXR5Rm9ybSk6IFByb21pc2U8Q2xpZW50PiB7XHJcbiAgICAgICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gICAgICAgIGxldCBvYmplY3RzID0gKHsgY2xpZW50OiBjbGllbnQsIHN1aXRhYmlsaXR5Rm9ybTogc3VpdGFiaWxpdHlGb3JtIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgICAgICAgLnBvc3QodGhpcy5jbGllbnRVcmwsIG9iamVjdHMsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFN1aXRhYmlsaXR5KGNsaWVudCwgc3VpdGFiaWxpdHlGb3JtOiBTdWl0YWJpbGl0eUZvcm0pOiBQcm9taXNlPENsaWVudD4ge1xyXG4gICAgICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICAgICAgdmFyIHVybCA9IHRoaXMuY2xpZW50VXJsICsgXCIvXCIgKyBjbGllbnQudXNlcklEO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAgIC5wb3N0KHVybCwgc3VpdGFiaWxpdHlGb3JtLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAudG9Qcm9taXNlKClcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTdWl0YWJpbGl0eShzdWl0YWJpbGl0eUZvcm06IFN1aXRhYmlsaXR5Rm9ybSk6IFByb21pc2U8Q2xpZW50PiB7XHJcbiAgICAgICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgICAgICB2YXIgdXJsID0gJ2FwaS9zdWl0YWJpbGl0eS11cGRhdGUnO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAgIC5wdXQodXJsLCBzdWl0YWJpbGl0eUZvcm0sIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUJhbm5lckNhbUJvb2woY2xpZW50OiBDbGllbnQpOiBQcm9taXNlPENsaWVudD4ge1xyXG4gICAgICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICAgICAgdmFyIHVybCA9ICdhcGkvYmFubmVyQ2FtQm9vbC11cGRhdGUnO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAgIC5wdXQodXJsLCBjbGllbnQsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHV0KGNsaWVudDogQ2xpZW50LCBzdWl0YWJpbGl0eUZvcm06IFN1aXRhYmlsaXR5Rm9ybSkge1xyXG4gICAgICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICAgICAgICBsZXQgb2JqZWN0cyA9ICh7IGNsaWVudDogY2xpZW50LCBzdWl0YWJpbGl0eUZvcm06IHN1aXRhYmlsaXR5Rm9ybSB9KTtcclxuICAgICAgICBsZXQgdXJsID0gYCR7dGhpcy5jbGllbnRVcmx9LyR7Y2xpZW50LmNsaWVudElEfWA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAgICAgICAucHV0KHVybCwgb2JqZWN0cywgb3B0aW9ucylcclxuICAgICAgICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IGNsaWVudClcclxuICAgICAgICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZShjbGllbnQpIHtcclxuICAgICAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgICAgIGxldCB1cmwgPSBgJHt0aGlzLmNsaWVudFVybH0vJHtjbGllbnQudXNlcklEfWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgICAgICAgLmRlbGV0ZSh1cmwsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlRnJvbUNsaWVudFRhYmxlKHVzZXJJRCkge1xyXG4gICAgICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICAgICAgbGV0IHVybCA9IGAke3RoaXMuY2xpZW50VXJsfS8ke3VzZXJJRH0vcmVtb3ZlYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAgICAgICAuZGVsZXRlKHVybCwgb3B0aW9ucylcclxuICAgICAgICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgICAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQW4gZXJyb3Igb2NjdXJyZWQnLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
