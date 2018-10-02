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
    var core_1, http_1, authentication_service_1, StaffService;
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
            StaffService = class StaffService {
                constructor(http, authService) {
                    this.http = http;
                    this.authService = authService;
                    this.usersUrl = 'api/staff'; // URL to web app
                }
                getUsers() {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get(this.usersUrl, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get all faculty users"));
                }
                getUser(id) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get(this.usersUrl + '/' + id, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get specific faculty user"));
                }
                saveNew(user) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http
                        .post(this.usersUrl, user, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Save new faculty user"));
                }
                update(user, id) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let url = `${this.usersUrl}/${id}`;
                    return this.http
                        .put(url, user, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Update faculty user"));
                }
                delete(user) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    //headers.append('Content-Type', 'application/json');
                    let url = `${this.usersUrl}/${user.userID}`;
                    return this.http
                        .delete(url, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Delete faculty user"));
                }
                getSiteActivity() {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get('api/site-activity', options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get all site activity"));
                }
                handleError(error, name) {
                    console.log('An error occurred', error);
                }
            };
            StaffService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http,
                    authentication_service_1.AuthService])
            ], StaffService);
            exports_1("StaffService", StaffService);
        }
    };
});

//# sourceMappingURL=staff.service.js.map
