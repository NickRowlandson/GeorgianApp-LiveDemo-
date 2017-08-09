System.register(["@angular/core", "@angular/http", "rxjs/add/operator/toPromise", "./authentication.service"], function (exports_1, context_1) {
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
    var core_1, http_1, authentication_service_1, StudentService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }
        ],
        execute: function () {
            StudentService = (function () {
                function StudentService(http, authService) {
                    this.http = http;
                    this.authService = authService;
                    this.studentsUrl = 'api/students'; // URL to web api
                }
                StudentService.prototype.getStudents = function () {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get(this.studentsUrl, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) { return _this.handleError(err, "Get all students"); });
                };
                StudentService.prototype.getStudent = function (id) {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get(this.studentsUrl + '/' + id, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) { return _this.handleError(err, "get student by id"); });
                };
                StudentService.prototype.postNew = function (student) {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http
                        .post(this.studentsUrl, student, options)
                        .toPromise()
                        .then(function (response) { return response.json().data; })
                        .catch(function (err) { return _this.handleError(err, "postNew"); });
                };
                StudentService.prototype.update = function (student) {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = this.studentsUrl + "/" + student.userID;
                    return this.http
                        .put(url, student, options)
                        .toPromise()
                        .then(function () { return student; })
                        .catch(function (err) { return _this.handleError(err, "Update"); });
                };
                StudentService.prototype.delete = function (student) {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = this.studentsUrl + "/" + student.userID;
                    return this.http
                        .delete(url, options)
                        .toPromise()
                        .catch(function (err) { return _this.handleError(err, "Delete"); });
                };
                StudentService.prototype.courseEnroll = function (userID, startDate, endDate, courseID, instructorID) {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = "api/enroll";
                    var info = [{
                            userID: userID,
                            courseID: courseID,
                            instructorID: instructorID,
                            startDate: startDate,
                            endDate: endDate
                        }];
                    return this.http
                        .post(url, info, options)
                        .toPromise()
                        .then(function (response) { return response.json().data; })
                        .catch(function (err) { return _this.handleError(err, "Course enroll"); });
                };
                StudentService.prototype.courseDrop = function (userID, courseID) {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = "api/drop/" + userID + "/" + courseID;
                    return this.http
                        .delete(url, options)
                        .toPromise()
                        .catch(function (err) { return _this.handleError(err, "Course drop"); });
                };
                StudentService.prototype.getTimetables = function () {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = "api/timetables";
                    return this.http.get(url, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) { return _this.handleError(err, "Get timetables"); });
                };
                StudentService.prototype.getTimetablesByCourseId = function (courseID) {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = "api/timetables-course-id/" + courseID;
                    return this.http.get(url, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) { return _this.handleError(err, "Get timetables by course"); });
                };
                StudentService.prototype.getEventsById = function (userID) {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = "api/timetable/" + userID;
                    return this.http.get(url, options).toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) { return _this.handleError(err, "Get events by id"); });
                };
                StudentService.prototype.getStudentsById = function (timetables) {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = "api/get-students-id";
                    return this.http.post(url, timetables, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) { return _this.handleError(err, "Get students by id"); });
                };
                StudentService.prototype.saveNewNote = function (caseNote, studentID) {
                    var _this = this;
                    var caseNoteObject = { caseNote: caseNote, dateTime: moment().format('YYYY-MM-DD HH:mm:ss a') };
                    console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = "api/caseNotes/" + studentID;
                    return this.http
                        .post(url, caseNoteObject, options)
                        .toPromise()
                        .then(function (response) { return response.json().data; })
                        .catch(function (err) { return _this.handleError(err, "Save new note"); });
                };
                StudentService.prototype.getNotes = function (studentID) {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = "api/caseNotes/" + studentID;
                    return this.http.get(url, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) { return _this.handleError(err, "Get notes"); });
                };
                StudentService.prototype.deleteNote = function (noteID) {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = "api/caseNotes/" + noteID;
                    return this.http
                        .delete(url, options)
                        .toPromise()
                        .catch(function (err) { return _this.handleError(err, "Delete notes"); });
                };
                StudentService.prototype.insertAttendance = function (attendance) {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = "api/attendance";
                    return this.http
                        .post(url, attendance, options)
                        .toPromise()
                        .then(function (response) { return response; })
                        .catch(function (err) { return _this.handleError(err, "Insert attendance"); });
                };
                StudentService.prototype.populatePRF = function (id) {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get('api/prf/' + id, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) { return _this.handleError(err, "Populate PRF"); });
                };
                StudentService.prototype.getAllAttendance = function () {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = "api/attendance-report";
                    return this.http
                        .get(url, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) { return _this.handleError(err, "Get all attendance"); });
                };
                StudentService.prototype.getAllFormsByID = function (student) {
                    var _this = this;
                    // add authorization header with jwt token
                    var headers = new http_1.Headers({ authorization: this.authService.token });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var url = "api/clientForms/" + student.userID;
                    return this.http
                        .get(url, options)
                        .toPromise()
                        .then(function (response) { return response.json(); })
                        .catch(function (err) { return _this.handleError(err, "Get all student forms"); });
                };
                StudentService.prototype.handleError = function (error, name) {
                    console.log('An error occurred at ' + name, error);
                };
                StudentService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [http_1.Http, authentication_service_1.AuthService])
                ], StudentService);
                return StudentService;
            }());
            exports_1("StudentService", StudentService);
        }
    };
});

//# sourceMappingURL=student.service.js.map
