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
    var core_1, http_1, authentication_service_1, CourseService;
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
            CourseService = (function () {
                function CourseService(http, authService) {
                    this.http = http;
                    this.authService = authService;
                    this.courseUrl = 'api/course'; // URL to web app
                }
                CourseService.prototype.getCourses = function () {
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get(this.courseUrl, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                CourseService.prototype.getInstructorCourses = function (id) {
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = "api/instructor-courses/" + id;
                    return this.http.get(url, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                CourseService.prototype.getCourse = function (id) {
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get(this.courseUrl + '/' + id, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                CourseService.prototype.delete = function (course) {
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    //headers.append('Content-Type', 'application/json');
                    var url = this.courseUrl + "/" + course.courseID;
                    return this.http
                        .delete(url, options)
                        .toPromise()
                        .catch(this.handleError);
                };
                CourseService.prototype.save = function (course) {
                    if (course.courseID) {
                        return this.put(course);
                    }
                    return this.post(course);
                };
                CourseService.prototype.post = function (course) {
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http
                        .post(this.courseUrl, course, options)
                        .toPromise()
                        .then(function (response) { return response.json().data; })
                        .catch(this.handleError);
                };
                CourseService.prototype.put = function (course) {
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = this.courseUrl + "/" + course.courseID;
                    return this.http
                        .put(url, course, options)
                        .toPromise()
                        .then(function () { return course; })
                        .catch(this.handleError);
                };
                CourseService.prototype.handleError = function (error) {
                    console.log('An error occurred', error);
                    return Promise.reject(error.message || error);
                };
                CourseService.prototype.getCampuses = function () {
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get('api/getCampuses', options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                CourseService.prototype.getProfessors = function () {
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get('api/getProfessors', options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                CourseService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [http_1.Http,
                        authentication_service_1.AuthService])
                ], CourseService);
                return CourseService;
            }());
            exports_1("CourseService", CourseService);
        }
    };
});

//# sourceMappingURL=course.service.js.map
