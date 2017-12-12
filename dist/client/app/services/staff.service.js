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
    var core_1, http_1, authentication_service_1, StaffService;
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
            StaffService = /** @class */ (function () {
                function StaffService(http, authService) {
                    this.http = http;
                    this.authService = authService;
                    this.usersUrl = 'api/staff'; // URL to web app
                }
                StaffService.prototype.getUsers = function () {
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get(this.usersUrl, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                StaffService.prototype.getUser = function (id) {
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get(this.usersUrl + '/' + id, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                StaffService.prototype.save = function (user) {
                    if (user.staffID) {
                        return this.put(user);
                    }
                    return this.post(user);
                };
                StaffService.prototype.post = function (user) {
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http
                        .post(this.usersUrl, user, options)
                        .toPromise()
                        .then(function (response) {
                        return response.json();
                    })
                        .catch(this.handleError);
                };
                StaffService.prototype.put = function (user) {
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = this.usersUrl + "/" + user.staffID;
                    console.log(user);
                    return this.http
                        .put(url, user, options)
                        .toPromise()
                        .then(function () { return user; })
                        .catch(this.handleError);
                };
                StaffService.prototype.delete = function (user) {
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    //headers.append('Content-Type', 'application/json');
                    var url = this.usersUrl + "/" + user.userID;
                    return this.http
                        .delete(url, options)
                        .toPromise()
                        .catch(this.handleError);
                };
                StaffService.prototype.handleError = function (error) {
                    console.log('An error occurred', error);
                    return Promise.reject(error.message || error);
                };
                StaffService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [http_1.Http,
                        authentication_service_1.AuthService])
                ], StaffService);
                return StaffService;
            }());
            exports_1("StaffService", StaffService);
        }
    };
});

//# sourceMappingURL=staff.service.js.map
