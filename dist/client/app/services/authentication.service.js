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
    authUser() {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx3Q0FBd0Q7QUFFeEQsc0RBQW1EO0FBQ25ELGlDQUErQjtBQUcvQixJQUFhLFdBQVcsR0FBeEI7SUFLSSxZQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUh2QixlQUFVLEdBQXdCLElBQUksNkJBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RCxhQUFRLEdBQXdCLElBQUksNkJBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUd4RCxzQ0FBc0M7UUFDdEMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQztRQUU5QyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDdkMsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLFFBQWdCLEVBQUUsUUFBZ0I7UUFDcEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzdFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FB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QUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDSixDQUFBO0FBOUVZLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtxQ0FNaUIsV0FBSTtHQUxyQixXQUFXLENBOEV2QjtBQTlFWSxrQ0FBVyIsImZpbGUiOiJhcHAvc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcy9SZXBsYXlTdWJqZWN0JztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xyXG4gICAgcHVibGljIHRva2VuOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgbG9nZ2VkVXNlciA6IFJlcGxheVN1YmplY3Q8YW55PiA9IG5ldyBSZXBsYXlTdWJqZWN0KDEpO1xyXG4gICAgcHVibGljIHVzZXJUeXBlIDogUmVwbGF5U3ViamVjdDxhbnk+ID0gbmV3IFJlcGxheVN1YmplY3QoMSk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7XHJcbiAgICAgICAgLy8gc2V0IHRva2VuIGlmIHNhdmVkIGluIGxvY2FsIHN0b3JhZ2VcclxuICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgICAgICB0aGlzLnRva2VuID0gY3VycmVudFVzZXIgJiYgY3VycmVudFVzZXIudG9rZW47XHJcblxyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSkge1xyXG4gICAgICAgICAgdmFyIHVzZXIgPSBjdXJyZW50VXNlci51c2VybmFtZTtcclxuICAgICAgICAgIHRoaXMubG9nZ2VkVXNlci5uZXh0KEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbG9naW4odXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KTtcclxuICAgICAgICB2YXIgY3JlZGVudGlhbHMgPSBKU09OLnN0cmluZ2lmeSh7IHVzZXJuYW1lOiB1c2VybmFtZSwgcGFzc3dvcmQ6IHBhc3N3b3JkIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCgnL2FwaS9hdXRoJywgY3JlZGVudGlhbHMsIHtoZWFkZXJzOmhlYWRlcnN9KVxyXG4gICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgIC50aGVuKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgIC8vIGxvZ2luIHN1Y2Nlc3NmdWwgaWYgdGhlcmUncyBhIGp3dCB0b2tlbiBpbiB0aGUgcmVzcG9uc2VcclxuICAgICAgICAgIHZhciBib2R5ID0gcmVzcG9uc2UuanNvbigpLmJvZHk7XHJcbiAgICAgICAgICBsZXQgdG9rZW4gPSByZXNwb25zZS5qc29uKCkuYm9keSAmJiByZXNwb25zZS5qc29uKCkuYm9keS50b2tlbjtcclxuICAgICAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgICAgICAgIC8vIHNldCB0b2tlbiBwcm9wZXJ0eVxyXG4gICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcclxuXHJcbiAgICAgICAgICAgICAgLy8gc3RvcmUgdXNlcm5hbWUgYW5kIGp3dCB0b2tlbiBpbiBsb2NhbCBzdG9yYWdlIHRvIGtlZXAgdXNlciBsb2dnZWQgaW4gYmV0d2VlbiBwYWdlIHJlZnJlc2hlc1xyXG4gICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50VXNlcicsIEpTT04uc3RyaW5naWZ5KGJvZHkpKTtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSkudXNlcm5hbWU7XHJcbiAgICAgICAgICAgICAgdGhpcy5sb2dnZWRVc2VyLm5leHQoSlNPTi5zdHJpbmdpZnkodXNlcm5hbWUpKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gcmV0dXJuIHRydWUgdG8gaW5kaWNhdGUgc3VjY2Vzc2Z1bCBsb2dpblxyXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIGZhbHNlIHRvIGluZGljYXRlIGZhaWxlZCBsb2dpblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJJbnZhbGlkIGxvZ2luIFwiICsgZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsb2dvdXQoKTogdm9pZCB7XHJcbiAgICAgIC8vIGNsZWFyIHRva2VuIHJlbW92ZSB1c2VyIGZyb20gbG9jYWwgc3RvcmFnZSB0byBsb2cgdXNlciBvdXRcclxuICAgICAgdGhpcy50b2tlbiA9IG51bGw7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjdXJyZW50VXNlcicpO1xyXG4gICAgICB0aGlzLmxvZ2dlZFVzZXIubmV4dChudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBhdXRoVXNlcigpOnZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXNldFBhc3N3b3JkKHVzZXJJRDogbnVtYmVyLCBwYXNzd29yZDogc3RyaW5nKSB7XHJcbiAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KTtcclxuICAgICAgdmFyIGNyZWRlbnRpYWxzID0gSlNPTi5zdHJpbmdpZnkoeyB1c2VySUQ6IHVzZXJJRCwgcGFzc3dvcmQ6IHBhc3N3b3JkIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwLnB1dCgnL2FwaS9yZXNldFBhc3N3b3JkJywgY3JlZGVudGlhbHMsIHtoZWFkZXJzOmhlYWRlcnN9KVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVzZXQgcGFzc3dvcmQgXCIgKyBlcnIpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0UmVzZXQoZW1haWw6IHN0cmluZykge1xyXG4gICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSk7XHJcbiAgICAgIGxldCB1cmwgPSBgYXBpL3JlcXVlc3RSZXNldC8ke2VtYWlsfWA7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwge2hlYWRlcnM6aGVhZGVyc30pXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXF1ZXN0IHJlc2V0IFwiICsgZXJyKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19
