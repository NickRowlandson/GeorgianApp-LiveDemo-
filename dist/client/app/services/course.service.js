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
            CourseService = /** @class */ (function () {
                function CourseService(http, authService) {
                    this.http = http;
                    this.authService = authService;
                    this.courseUrl = 'api/course'; // URL to web app
                }
                CourseService.prototype.getCourses = function () {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get(this.courseUrl, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) { return _this.handleError(err, "Get Courses"); });
                };
                CourseService.prototype.getInstructorCourses = function (id) {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = "api/instructor-courses/" + id;
                    return this.http.get(url, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) { return _this.handleError(err, "Get Intructors Courses"); });
                };
                CourseService.prototype.getCourse = function (id) {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get(this.courseUrl + '/' + id, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) { return _this.handleError(err, "Get Course"); });
                };
                CourseService.prototype.getWaitList = function () {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get('api/wait-list', options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) { return _this.handleError(err, "Get waitlist"); });
                };
                CourseService.prototype.getWaitListById = function (userID) {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = "api/wait-list-by-id/" + userID;
                    return this.http.get(url, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) { return _this.handleError(err, "Get course wait list by id"); });
                };
                CourseService.prototype.addToWaitList = function (userID, courseID, date) {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var info = {
                        userID: userID,
                        courseID: courseID,
                        date: date
                    };
                    return this.http
                        .post('/api/addToWaitList', info, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) { return _this.handleError(err, "addToWaitList"); });
                };
                CourseService.prototype.delete = function (course) {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    //headers.append('Content-Type', 'application/json');
                    var url = this.courseUrl + "/" + course.courseID;
                    return this.http
                        .delete(url, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) { return _this.handleError(err, "Delete Course"); });
                };
                CourseService.prototype.create = function (course) {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http
                        .post(this.courseUrl, course, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) { return _this.handleError(err, "Create New Course"); });
                };
                CourseService.prototype.update = function (course) {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = this.courseUrl + "/" + course.courseID;
                    return this.http
                        .put(url, course, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) { return _this.handleError(err, "Update Course"); });
                };
                CourseService.prototype.getCampuses = function () {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get('api/getCampuses', options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) { return _this.handleError(err, "Get Campuses"); });
                };
                CourseService.prototype.getInstructors = function () {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get('api/getInstructors', options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) { return _this.handleError(err, "Get Instructors"); });
                };
                CourseService.prototype.handleError = function (error, name) {
                    console.log('An error occurred at ' + name, error);
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
