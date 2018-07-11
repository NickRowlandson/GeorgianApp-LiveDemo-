System.register(["@angular/core", "@angular/http", "rxjs/ReplaySubject", "rxjs/add/operator/map"], function (exports_1, context_1) {
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
    var core_1, http_1, ReplaySubject_1, AuthService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ReplaySubject_1_1) {
                ReplaySubject_1 = ReplaySubject_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            AuthService = /** @class */ (function () {
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
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var credentials = JSON.stringify({ username: username, password: password });
                    return this.http.post('/api/auth', credentials, { headers: headers })
                        .toPromise()
                        .then(function (response) {
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
                            // return false to indicate failed login
                            return false;
                        }
                    }).catch(function (err) {
                        console.log("Invalid login " + err);
                    });
                };
                AuthService.prototype.logout = function () {
                    // clear token remove user from local storage to log user out
                    this.token = null;
                    localStorage.removeItem('currentUser');
                    this.loggedUser.next(null);
                };
                AuthService.prototype.resetPassword = function (userID, password) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var credentials = JSON.stringify({ userID: userID, password: password });
                    return this.http.put('/api/resetPassword', credentials, { headers: headers })
                        .toPromise()
                        .then(function (response) {
                        if (response.status === 200) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }).catch(function (err) {
                        console.log("Reset password " + err);
                    });
                };
                AuthService.prototype.requestReset = function (email) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var url = "api/requestReset/" + email;
                    return this.http.get(url, { headers: headers })
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) {
                        console.log("Request reset " + err);
                    });
                };
                AuthService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [http_1.Http])
                ], AuthService);
                return AuthService;
            }());
            exports_1("AuthService", AuthService);
        }
    };
});

//# sourceMappingURL=authentication.service.js.map
