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
const ReplaySubject_1 = require("rxjs/ReplaySubject");
require("rxjs/add/operator/map");
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
        this.loggedUser = new ReplaySubject_1.ReplaySubject(1);
        this.userType = new ReplaySubject_1.ReplaySubject(1);
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        if (localStorage.getItem('currentUser')) {
            var user = currentUser.username;
            this.loggedUser.next(JSON.stringify(user));
        }
    }
    login(username, password) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var credentials = JSON.stringify({ username: username, password: password });
        return this.http.post('/api/auth', credentials, { headers: headers })
            .toPromise()
            .then((response) => {
            // login successful if there's a jwt token in the response
            var body = response.json().body;
            let token = response.json().body && response.json().body.token;
            if (token) {
                // set token property
                this.token = token;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(body));
                var username = JSON.parse(localStorage.getItem('currentUser')).username;
                this.loggedUser.next(JSON.stringify(username));
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                return false;
            }
        }).catch((err) => {
            console.log("Invalid login " + err);
        });
    }
    logout() {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        this.loggedUser.next(null);
    }
    resetPassword(userID, password) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var credentials = JSON.stringify({ userID: userID, password: password });
        return this.http.put('/api/resetPassword', credentials, { headers: headers })
            .toPromise()
            .then(response => response.json())
            .catch((err) => {
            console.log("Reset password " + err);
        });
    }
    requestReset(email) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let url = `api/requestReset/${email}`;
        return this.http.get(url, { headers: headers })
            .toPromise()
            .then(response => response.json())
            .catch((err) => {
            console.log("Request reset " + err);
        });
    }
};
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuthService);
exports.AuthService = AuthService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx3Q0FBd0Q7QUFFeEQsc0RBQW1EO0FBQ25ELGlDQUErQjtBQUcvQixJQUFhLFdBQVcsR0FBeEI7SUFLSSxZQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUh2QixlQUFVLEdBQXdCLElBQUksNkJBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RCxhQUFRLEdBQXdCLElBQUksNkJBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUd4RCxzQ0FBc0M7UUFDdEMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQztRQUU5QyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDdkMsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLFFBQWdCLEVBQUUsUUFBZ0I7UUFDcEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzdFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FB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QUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQTFFWSxXQUFXO0lBRHZCLGlCQUFVLEVBQUU7cUNBTWlCLFdBQUk7R0FMckIsV0FBVyxDQTBFdkI7QUExRVksa0NBQVciLCJmaWxlIjoiYXBwL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMvUmVwbGF5U3ViamVjdCc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEF1dGhTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyB0b2tlbjogc3RyaW5nO1xyXG4gICAgcHVibGljIGxvZ2dlZFVzZXIgOiBSZXBsYXlTdWJqZWN0PGFueT4gPSBuZXcgUmVwbGF5U3ViamVjdCgxKTtcclxuICAgIHB1YmxpYyB1c2VyVHlwZSA6IFJlcGxheVN1YmplY3Q8YW55PiA9IG5ldyBSZXBsYXlTdWJqZWN0KDEpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkge1xyXG4gICAgICAgIC8vIHNldCB0b2tlbiBpZiBzYXZlZCBpbiBsb2NhbCBzdG9yYWdlXHJcbiAgICAgICAgdmFyIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcbiAgICAgICAgdGhpcy50b2tlbiA9IGN1cnJlbnRVc2VyICYmIGN1cnJlbnRVc2VyLnRva2VuO1xyXG5cclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpIHtcclxuICAgICAgICAgIHZhciB1c2VyID0gY3VycmVudFVzZXIudXNlcm5hbWU7XHJcbiAgICAgICAgICB0aGlzLmxvZ2dlZFVzZXIubmV4dChKU09OLnN0cmluZ2lmeSh1c2VyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvZ2luKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSk7XHJcbiAgICAgICAgdmFyIGNyZWRlbnRpYWxzID0gSlNPTi5zdHJpbmdpZnkoeyB1c2VybmFtZTogdXNlcm5hbWUsIHBhc3N3b3JkOiBwYXNzd29yZCB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoJy9hcGkvYXV0aCcsIGNyZWRlbnRpYWxzLCB7aGVhZGVyczpoZWFkZXJzfSlcclxuICAgICAgICAudG9Qcm9taXNlKClcclxuICAgICAgICAudGhlbigocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAvLyBsb2dpbiBzdWNjZXNzZnVsIGlmIHRoZXJlJ3MgYSBqd3QgdG9rZW4gaW4gdGhlIHJlc3BvbnNlXHJcbiAgICAgICAgICB2YXIgYm9keSA9IHJlc3BvbnNlLmpzb24oKS5ib2R5O1xyXG4gICAgICAgICAgbGV0IHRva2VuID0gcmVzcG9uc2UuanNvbigpLmJvZHkgJiYgcmVzcG9uc2UuanNvbigpLmJvZHkudG9rZW47XHJcbiAgICAgICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICAgICAgICAvLyBzZXQgdG9rZW4gcHJvcGVydHlcclxuICAgICAgICAgICAgICB0aGlzLnRva2VuID0gdG9rZW47XHJcblxyXG4gICAgICAgICAgICAgIC8vIHN0b3JlIHVzZXJuYW1lIGFuZCBqd3QgdG9rZW4gaW4gbG9jYWwgc3RvcmFnZSB0byBrZWVwIHVzZXIgbG9nZ2VkIGluIGJldHdlZW4gcGFnZSByZWZyZXNoZXNcclxuICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFVzZXInLCBKU09OLnN0cmluZ2lmeShib2R5KSk7XHJcblxyXG4gICAgICAgICAgICAgIHZhciB1c2VybmFtZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpLnVzZXJuYW1lO1xyXG4gICAgICAgICAgICAgIHRoaXMubG9nZ2VkVXNlci5uZXh0KEpTT04uc3RyaW5naWZ5KHVzZXJuYW1lKSk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIHJldHVybiB0cnVlIHRvIGluZGljYXRlIHN1Y2Nlc3NmdWwgbG9naW5cclxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBmYWxzZSB0byBpbmRpY2F0ZSBmYWlsZWQgbG9naW5cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiSW52YWxpZCBsb2dpbiBcIiArIGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nb3V0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIGNsZWFyIHRva2VuIHJlbW92ZSB1c2VyIGZyb20gbG9jYWwgc3RvcmFnZSB0byBsb2cgdXNlciBvdXRcclxuICAgICAgICB0aGlzLnRva2VuID0gbnVsbDtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY3VycmVudFVzZXInKTtcclxuICAgICAgICB0aGlzLmxvZ2dlZFVzZXIubmV4dChudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldFBhc3N3b3JkKHVzZXJJRDogbnVtYmVyLCBwYXNzd29yZDogc3RyaW5nKSB7XHJcbiAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KTtcclxuICAgICAgdmFyIGNyZWRlbnRpYWxzID0gSlNPTi5zdHJpbmdpZnkoeyB1c2VySUQ6IHVzZXJJRCwgcGFzc3dvcmQ6IHBhc3N3b3JkIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwLnB1dCgnL2FwaS9yZXNldFBhc3N3b3JkJywgY3JlZGVudGlhbHMsIHtoZWFkZXJzOmhlYWRlcnN9KVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVzZXQgcGFzc3dvcmQgXCIgKyBlcnIpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0UmVzZXQoZW1haWw6IHN0cmluZykge1xyXG4gICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSk7XHJcbiAgICAgIGxldCB1cmwgPSBgYXBpL3JlcXVlc3RSZXNldC8ke2VtYWlsfWA7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwge2hlYWRlcnM6aGVhZGVyc30pXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXF1ZXN0IHJlc2V0IFwiICsgZXJyKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19
