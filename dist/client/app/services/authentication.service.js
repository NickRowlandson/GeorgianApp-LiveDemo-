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
var ReplaySubject_1 = require("rxjs/ReplaySubject");
require("rxjs/add/operator/map");
var AuthService = (function () {
    function AuthService(http) {
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
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var credentials = JSON.stringify({ username: username, password: password });
        return this.http.post('/api/auth', credentials, { headers: headers })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var body = response.json().body;
            var token = response.json().body && response.json().body.token;
            if (token) {
                // set token property
                _this.token = token;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(body));
                var username = JSON.parse(localStorage.getItem('currentUser')).username;
                _this.loggedUser.next(JSON.stringify(username));
                // return true to indicate successful login
                return true;
            }
            else {
                console.log("Failed to login");
                // return false to indicate failed login
                return false;
            }
        });
    };
    AuthService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        this.loggedUser.next(null);
    };
    AuthService.prototype.handleError = function (error) {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuthService);
exports.AuthService = AuthService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBd0Q7QUFFeEQsb0RBQW1EO0FBQ25ELGlDQUErQjtBQUcvQixJQUFhLFdBQVc7SUFLcEIscUJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBSHZCLGVBQVUsR0FBd0IsSUFBSSw2QkFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELGFBQVEsR0FBd0IsSUFBSSw2QkFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBR3hELHNDQUFzQztRQUN0QyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDO1FBRTlDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7WUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUM7SUFDTCxDQUFDO0lBRUQsMkJBQUssR0FBTCxVQUFNLFFBQWdCLEVBQUUsUUFBZ0I7UUFBeEMsaUJBMkJDO1FBMUJHLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDO1lBQ3hCLGNBQWMsRUFBRSxrQkFBa0I7U0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDN0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLENBQUM7YUFDN0QsR0FBRyxDQUFDLFVBQUMsUUFBa0I7WUFDcEIsMERBQTBEO1lBQzFELElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDaEMsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMvRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNSLHFCQUFxQjtnQkFDckIsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBRW5CLDhGQUE4RjtnQkFDOUYsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUUxRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7Z0JBQ3hFLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFFL0MsMkNBQTJDO2dCQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ2hDLHdDQUF3QztnQkFDeEMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsNEJBQU0sR0FBTjtRQUNJLDZEQUE2RDtRQUM3RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixZQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFTyxpQ0FBVyxHQUFuQixVQUFvQixLQUFVO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQXhEQSxBQXdEQyxJQUFBO0FBeERZLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtxQ0FNaUIsV0FBSTtHQUxyQixXQUFXLENBd0R2QjtBQXhEWSxrQ0FBVyIsImZpbGUiOiJhcHAvc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcy9SZXBsYXlTdWJqZWN0JztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xyXG4gICAgcHVibGljIHRva2VuOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgbG9nZ2VkVXNlciA6IFJlcGxheVN1YmplY3Q8YW55PiA9IG5ldyBSZXBsYXlTdWJqZWN0KDEpO1xyXG4gICAgcHVibGljIHVzZXJUeXBlIDogUmVwbGF5U3ViamVjdDxhbnk+ID0gbmV3IFJlcGxheVN1YmplY3QoMSk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7XHJcbiAgICAgICAgLy8gc2V0IHRva2VuIGlmIHNhdmVkIGluIGxvY2FsIHN0b3JhZ2VcclxuICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgICAgICB0aGlzLnRva2VuID0gY3VycmVudFVzZXIgJiYgY3VycmVudFVzZXIudG9rZW47XHJcblxyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSkge1xyXG4gICAgICAgICAgdmFyIHVzZXIgPSBjdXJyZW50VXNlci51c2VybmFtZTtcclxuICAgICAgICAgIHRoaXMubG9nZ2VkVXNlci5uZXh0KEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbG9naW4odXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoe1xyXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30pO1xyXG4gICAgICAgIHZhciBjcmVkZW50aWFscyA9IEpTT04uc3RyaW5naWZ5KHsgdXNlcm5hbWU6IHVzZXJuYW1lLCBwYXNzd29yZDogcGFzc3dvcmQgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KCcvYXBpL2F1dGgnLCBjcmVkZW50aWFscywge2hlYWRlcnM6aGVhZGVyc30pXHJcbiAgICAgICAgICAgIC5tYXAoKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gbG9naW4gc3VjY2Vzc2Z1bCBpZiB0aGVyZSdzIGEgand0IHRva2VuIGluIHRoZSByZXNwb25zZVxyXG4gICAgICAgICAgICAgICAgdmFyIGJvZHkgPSByZXNwb25zZS5qc29uKCkuYm9keTtcclxuICAgICAgICAgICAgICAgIGxldCB0b2tlbiA9IHJlc3BvbnNlLmpzb24oKS5ib2R5ICYmIHJlc3BvbnNlLmpzb24oKS5ib2R5LnRva2VuO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0IHRva2VuIHByb3BlcnR5XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBzdG9yZSB1c2VybmFtZSBhbmQgand0IHRva2VuIGluIGxvY2FsIHN0b3JhZ2UgdG8ga2VlcCB1c2VyIGxvZ2dlZCBpbiBiZXR3ZWVuIHBhZ2UgcmVmcmVzaGVzXHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRVc2VyJywgSlNPTi5zdHJpbmdpZnkoYm9keSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdXNlcm5hbWUgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKS51c2VybmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlZFVzZXIubmV4dChKU09OLnN0cmluZ2lmeSh1c2VybmFtZSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyByZXR1cm4gdHJ1ZSB0byBpbmRpY2F0ZSBzdWNjZXNzZnVsIGxvZ2luXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBsb2dpblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZXR1cm4gZmFsc2UgdG8gaW5kaWNhdGUgZmFpbGVkIGxvZ2luXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsb2dvdXQoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gY2xlYXIgdG9rZW4gcmVtb3ZlIHVzZXIgZnJvbSBsb2NhbCBzdG9yYWdlIHRvIGxvZyB1c2VyIG91dFxyXG4gICAgICAgIHRoaXMudG9rZW4gPSBudWxsO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjdXJyZW50VXNlcicpO1xyXG4gICAgICAgIHRoaXMubG9nZ2VkVXNlci5uZXh0KG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XHJcbiAgICB9XHJcbn1cclxuIl19
