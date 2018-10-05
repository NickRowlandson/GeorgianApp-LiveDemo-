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
    var core_1, http_1, authentication_service_1, CourseService;
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
            CourseService = class CourseService {
                constructor(http, authService) {
                    this.http = http;
                    this.authService = authService;
                    this.courseUrl = 'api/course'; // URL to web app
                }
                getCourses() {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get(this.courseUrl, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get Courses"));
                }
                getInstructorCourses(id) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let url = "api/instructor-courses/" + id;
                    return this.http.get(url, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get Intructors Courses"));
                }
                getCourse(id) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get(this.courseUrl + '/' + id, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get Course"));
                }
                getWaitList() {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get('api/wait-list', options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get waitlist"));
                }
                getWaitListById(userID) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let url = "api/wait-list-by-id/" + userID;
                    return this.http.get(url, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get course wait list by id"));
                }
                addToWaitList(userID, courseType, date) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    var info = {
                        userID: userID,
                        courseType: courseType,
                        date: date
                    };
                    return this.http
                        .post('/api/addToWaitList', info, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "addToWaitList"));
                }
                removeFromWaitList(userID, courseType) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let url = `${this.courseUrl}/${userID}/${courseType}`;
                    return this.http
                        .delete(url, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "removeFromWaitList"));
                }
                addToCourseTypes(courseType) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    var info = {
                        courseType: courseType
                    };
                    return this.http
                        .post('/api/addToCourseTypes', info, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "addToCourseTypes"));
                }
                delete(course) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    //headers.append('Content-Type', 'application/json');
                    let url = `${this.courseUrl}/${course.courseID}`;
                    return this.http
                        .delete(url, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Delete Course"));
                }
                create(course) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http
                        .post(this.courseUrl, course, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Create New Course"));
                }
                update(course) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let url = `${this.courseUrl}/${course.courseID}`;
                    return this.http
                        .put(url, course, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Update Course"));
                }
                getCourseTypes() {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get('api/getCourseTypes', options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get Course Types"));
                }
                getCampuses() {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get('api/getCampuses', options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get Campuses"));
                }
                getInstructors() {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get('api/getInstructors', options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get Instructors"));
                }
                handleError(error, name) {
                    console.log('An error occurred at ' + name, error);
                }
            };
            CourseService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http,
                    authentication_service_1.AuthService])
            ], CourseService);
            exports_1("CourseService", CourseService);
        }
    };
});

//# sourceMappingURL=course.service.js.map
