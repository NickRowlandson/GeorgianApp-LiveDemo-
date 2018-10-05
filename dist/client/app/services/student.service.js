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
    var core_1, http_1, authentication_service_1, StudentService;
    var __moduleName = context_1 && context_1.id;
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
            StudentService = class StudentService {
                constructor(http, authService) {
                    this.http = http;
                    this.authService = authService;
                    this.studentsUrl = 'api/students'; // URL to web api
                }
                getStudents() {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http
                        .get(this.studentsUrl, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get all students"));
                }
                getStudent(id) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http
                        .get(this.studentsUrl + '/' + id, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "get student by id"));
                }
                postNew(student) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http
                        .post(this.studentsUrl, student, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "postNew"));
                }
                archiveStudent(student) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http
                        .post('api/archive-student', student, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "archiveStudent"));
                }
                getStudentArchive() {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let url = `api/get-student-archive`;
                    return this.http.get(url, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get all student archive"));
                }
                updateGeneralInfo(student) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    var url = 'api/students/general-info-update';
                    return this.http
                        .put(url, student, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Update General Info"));
                }
                manualAttendanceCheck() {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    var url = 'api/students/attendance-check';
                    return this.http
                        .put(url, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Run attendance check"));
                }
                requestEditConsent() {
                    // get current user id from web token
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    var currentUserID = currentUser.userID;
                    let url = `api/students/${currentUserID}/requestEditConsent`;
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http
                        .put(url, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Request to edit consent"));
                }
                grantConsentEditPermission(student, permission) {
                    // get current user id from web token
                    let url = `api/students/grantConsentEditPermission`;
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let objects = ({ student: student, permission: permission });
                    return this.http
                        .put(url, objects, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Grant permission to edit consent"));
                }
                courseEnroll(userID, startDate, endDate, courseID, instructorID) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let url = `api/enroll`;
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
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Course enroll"));
                }
                courseDrop(userID, courseID) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let url = `api/drop/${userID}/${courseID}`;
                    return this.http
                        .delete(url, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Course drop"));
                }
                getTimetables() {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let url = `api/timetables`;
                    return this.http
                        .get(url, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get timetables"));
                }
                getTimetablesByCourseId(courseID) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let url = `api/timetables-course-id/${courseID}`;
                    return this.http
                        .get(url, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get timetables by course"));
                }
                getEventsById(userID) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let url = `api/timetable/${userID}`;
                    return this.http
                        .get(url, options).toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get events by id"));
                }
                getStudentsById(timetables) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let url = `api/get-students-id`;
                    return this.http
                        .post(url, timetables, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get students by id"));
                }
                saveNewNote(caseNote, studentID) {
                    var caseNoteObject = { caseNote: caseNote, dateTime: moment().format('YYYY-MM-DD HH:mm:ss a') };
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let url = `api/caseNotes/${studentID}`;
                    return this.http
                        .post(url, caseNoteObject, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Save new note"));
                }
                getNotes(studentID) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let url = `api/caseNotes/${studentID}`;
                    return this.http
                        .get(url, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get notes"));
                }
                deleteNote(noteID) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let url = `api/caseNotes/${noteID}`;
                    return this.http
                        .delete(url, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Delete notes"));
                }
                insertAttendance(attendance) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let url = `api/attendance`;
                    return this.http
                        .post(url, attendance, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Insert attendance"));
                }
                populatePRF(id) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    return this.http
                        .get('api/prf/' + id, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Populate PRF"));
                }
                getAllAttendance() {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let url = `api/attendance-report`;
                    return this.http
                        .get(url, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get all attendance"));
                }
                getAllFormsByID(student) {
                    // add authorization header with jwt token
                    let headers = new http_1.Headers({ authorization: this.authService.token });
                    let options = new http_1.RequestOptions({ headers: headers });
                    let url = `api/clientForms/${student.userID}`;
                    return this.http
                        .get(url, options)
                        .toPromise()
                        .then(response => response.json())
                        .catch(err => this.handleError(err, "Get all student forms"));
                }
                handleError(error, name) {
                    console.log('An error occurred at ' + name, error);
                }
            };
            StudentService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http, authentication_service_1.AuthService])
            ], StudentService);
            exports_1("StudentService", StudentService);
        }
    };
});

//# sourceMappingURL=student.service.js.map
