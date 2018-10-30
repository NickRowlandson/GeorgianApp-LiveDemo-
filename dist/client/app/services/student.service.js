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
require("rxjs/add/operator/toPromise");
const authentication_service_1 = require("./authentication.service");
let StudentService = class StudentService {
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
exports.StudentService = StudentService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLHdDQUF3RTtBQUN4RSx1Q0FBcUM7QUFDckMscUVBQXVEO0FBTXZELElBQWEsY0FBYyxHQUEzQjtJQUlFLFlBQW9CLElBQVUsRUFBVSxXQUF3QjtRQUE1QyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFGeEQsZ0JBQVcsR0FBRyxjQUFjLENBQUMsQ0FBRSxpQkFBaUI7SUFFWSxDQUFDO0lBRXJFLFdBQVc7UUFDVCwwQ0FBMEM7UUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRXZELE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUM7YUFDOUIsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsVUFBVSxDQUFDLEVBQVU7UUFDbkIsMENBQTBDO1FBQzFDLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUV2RCxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUM7YUFDekMsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLG1CQUFtQixDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsT0FBTyxDQUFDLE9BQWdCO1FBQ3RCLDBDQUEwQztRQUMxQyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFdkQsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7YUFDeEMsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELGNBQWMsQ0FBQyxPQUFnQjtRQUM3QiwwQ0FBMEM7UUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRXZELE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixJQUFJLENBQUMscUJBQXFCLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQzthQUM3QyxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDakMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxpQkFBaUI7UUFDZiwwQ0FBMEM7UUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRXZELElBQUksR0FBRyxHQUFHLHlCQUF5QixDQUFDO1FBRXBDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQzthQUMvQixTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDakMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUseUJBQXlCLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxPQUFnQjtRQUM5QiwwQ0FBMEM7UUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRXZELElBQUksR0FBRyxHQUFHLGtDQUFrQyxDQUFDO1FBRTdDLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDWCxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7YUFDMUIsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQscUJBQXFCO1FBQ2pCLDBDQUEwQztRQUMxQyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFdkQsSUFBSSxHQUFHLEdBQUcsK0JBQStCLENBQUM7UUFFMUMsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNYLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO2FBQ2pCLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNqQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixxQ0FBcUM7UUFDckMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxhQUFhLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUN2QyxJQUFJLEdBQUcsR0FBRyxnQkFBZ0IsYUFBYSxxQkFBcUIsQ0FBQztRQUM3RCwwQ0FBMEM7UUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRXZELE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDWCxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQzthQUNqQixTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDakMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUseUJBQXlCLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCwwQkFBMEIsQ0FBQyxPQUFPLEVBQUUsVUFBVTtRQUM1QyxxQ0FBcUM7UUFDckMsSUFBSSxHQUFHLEdBQUcseUNBQXlDLENBQUM7UUFDcEQsMENBQTBDO1FBQzFDLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN2RCxJQUFJLE9BQU8sR0FBRyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUM1RCxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ1gsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDO2FBQzFCLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNqQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxrQ0FBa0MsQ0FBQyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVELFlBQVksQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWTtRQUM3RCwwQ0FBMEM7UUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRXZELElBQUksR0FBRyxHQUFHLFlBQVksQ0FBQztRQUN2QixJQUFJLElBQUksR0FBRyxDQUFDO2dCQUNWLE1BQU0sRUFBRSxNQUFNO2dCQUNkLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixZQUFZLEVBQUUsWUFBWTtnQkFDMUIsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLE9BQU8sRUFBRSxPQUFPO2FBQ2pCLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUM7YUFDeEIsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFNLEVBQUUsUUFBUTtRQUN6QiwwQ0FBMEM7UUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRXZELElBQUksR0FBRyxHQUFHLFlBQVksTUFBTSxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBRTNDLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQzthQUNwQixTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDakMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsYUFBYTtRQUNYLDBDQUEwQztRQUMxQyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFdkQsSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUM7UUFFM0IsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO2FBQ2pCLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNqQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELHVCQUF1QixDQUFDLFFBQVE7UUFDOUIsMENBQTBDO1FBQzFDLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUV2RCxJQUFJLEdBQUcsR0FBRyw0QkFBNEIsUUFBUSxFQUFFLENBQUM7UUFFakQsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO2FBQ2pCLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNqQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELGFBQWEsQ0FBQyxNQUFNO1FBQ2xCLDBDQUEwQztRQUMxQyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFdkQsSUFBSSxHQUFHLEdBQUcsaUJBQWlCLE1BQU0sRUFBRSxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRTthQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDakMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxlQUFlLENBQUMsVUFBVTtRQUN4QiwwQ0FBMEM7UUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRXZELElBQUksR0FBRyxHQUFHLHFCQUFxQixDQUFDO1FBRWhDLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUM7YUFDOUIsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLG9CQUFvQixDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsV0FBVyxDQUFDLFFBQVEsRUFBRSxTQUFTO1FBQzdCLElBQUksY0FBYyxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsQ0FBQztRQUVoRywwQ0FBMEM7UUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksR0FBRyxHQUFHLGlCQUFpQixTQUFTLEVBQUUsQ0FBQztRQUV2QyxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsSUFBSSxDQUFDLEdBQUcsRUFBRSxjQUFjLEVBQUUsT0FBTyxDQUFDO2FBQ2xDLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNqQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxRQUFRLENBQUMsU0FBUztRQUNoQiwwQ0FBMEM7UUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRXZELElBQUksR0FBRyxHQUFHLGlCQUFpQixTQUFTLEVBQUUsQ0FBQztRQUV2QyxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7YUFDakIsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFNO1FBQ2YsMENBQTBDO1FBQzFDLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUV2RCxJQUFJLEdBQUcsR0FBRyxpQkFBaUIsTUFBTSxFQUFFLENBQUM7UUFFcEMsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO2FBQ3BCLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNqQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxVQUFVO1FBQ3pCLDBDQUEwQztRQUMxQyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFdkQsSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUM7UUFFM0IsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQzthQUM5QixTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDakMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxXQUFXLENBQUMsRUFBVTtRQUNwQiwwQ0FBMEM7UUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUM7YUFDN0IsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELGdCQUFnQjtRQUNkLDBDQUEwQztRQUMxQyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFdkQsSUFBSSxHQUFHLEdBQUcsdUJBQXVCLENBQUM7UUFFbEMsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO2FBQ2pCLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNqQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELGVBQWUsQ0FBQyxPQUFnQjtRQUM5QiwwQ0FBMEM7UUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRXZELElBQUksR0FBRyxHQUFHLG1CQUFtQixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFOUMsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO2FBQ2pCLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNqQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVPLFdBQVcsQ0FBQyxLQUFVLEVBQUUsSUFBUztRQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFHLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBRUYsQ0FBQTtBQTFUWSxjQUFjO0lBRDFCLGlCQUFVLEVBQUU7cUNBS2UsV0FBSSxFQUF1QixvQ0FBVztHQUpyRCxjQUFjLENBMFQxQjtBQTFUWSx3Q0FBYyIsImZpbGUiOiJhcHAvc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIZWFkZXJzLCBIdHRwLCBSZXNwb25zZSwgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vbW9kZWxzL3N0dWRlbnRcIjtcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uL21vZGVscy9jb3Vyc2VcIjtcclxuZGVjbGFyZSB2YXIgbW9tZW50OiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTdHVkZW50U2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgc3R1ZGVudHNVcmwgPSAnYXBpL3N0dWRlbnRzJzsgIC8vIFVSTCB0byB3ZWIgYXBpXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHsgfVxyXG5cclxuICBnZXRTdHVkZW50cygpOiBQcm9taXNlPFN0dWRlbnRbXT4ge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5nZXQodGhpcy5zdHVkZW50c1VybCwgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJHZXQgYWxsIHN0dWRlbnRzXCIpKTtcclxuICB9XHJcblxyXG4gIGdldFN0dWRlbnQoaWQ6IHN0cmluZykge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5nZXQodGhpcy5zdHVkZW50c1VybCArICcvJyArIGlkLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcImdldCBzdHVkZW50IGJ5IGlkXCIpKTtcclxuICB9XHJcblxyXG4gIHBvc3ROZXcoc3R1ZGVudDogU3R1ZGVudCk6IFByb21pc2U8U3R1ZGVudD4ge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5wb3N0KHRoaXMuc3R1ZGVudHNVcmwsIHN0dWRlbnQsIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwicG9zdE5ld1wiKSk7XHJcbiAgfVxyXG5cclxuICBhcmNoaXZlU3R1ZGVudChzdHVkZW50OiBTdHVkZW50KTogUHJvbWlzZTxTdHVkZW50PiB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLnBvc3QoJ2FwaS9hcmNoaXZlLXN0dWRlbnQnLCBzdHVkZW50LCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcImFyY2hpdmVTdHVkZW50XCIpKTtcclxuICB9XHJcblxyXG4gIGdldFN0dWRlbnRBcmNoaXZlKCkge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICBsZXQgdXJsID0gYGFwaS9nZXQtc3R1ZGVudC1hcmNoaXZlYDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiR2V0IGFsbCBzdHVkZW50IGFyY2hpdmVcIikpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlR2VuZXJhbEluZm8oc3R1ZGVudDogU3R1ZGVudCk6IFByb21pc2U8U3R1ZGVudD4ge1xyXG4gICAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICAgIHZhciB1cmwgPSAnYXBpL3N0dWRlbnRzL2dlbmVyYWwtaW5mby11cGRhdGUnO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAgICAgLnB1dCh1cmwsIHN0dWRlbnQsIG9wdGlvbnMpXHJcbiAgICAgICAgICAudG9Qcm9taXNlKClcclxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiVXBkYXRlIEdlbmVyYWwgSW5mb1wiKSk7XHJcbiAgfVxyXG5cclxuICBtYW51YWxBdHRlbmRhbmNlQ2hlY2soKSB7XHJcbiAgICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgICAgdmFyIHVybCA9ICdhcGkvc3R1ZGVudHMvYXR0ZW5kYW5jZS1jaGVjayc7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAucHV0KHVybCwgb3B0aW9ucylcclxuICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJSdW4gYXR0ZW5kYW5jZSBjaGVja1wiKSk7XHJcbiAgfVxyXG5cclxuICByZXF1ZXN0RWRpdENvbnNlbnQoKTogUHJvbWlzZTxTdHVkZW50PiB7XHJcbiAgICAvLyBnZXQgY3VycmVudCB1c2VyIGlkIGZyb20gd2ViIHRva2VuXHJcbiAgICB2YXIgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgIHZhciBjdXJyZW50VXNlcklEID0gY3VycmVudFVzZXIudXNlcklEO1xyXG4gICAgbGV0IHVybCA9IGBhcGkvc3R1ZGVudHMvJHtjdXJyZW50VXNlcklEfS9yZXF1ZXN0RWRpdENvbnNlbnRgO1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgLnB1dCh1cmwsIG9wdGlvbnMpXHJcbiAgICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiUmVxdWVzdCB0byBlZGl0IGNvbnNlbnRcIikpO1xyXG4gIH1cclxuXHJcbiAgZ3JhbnRDb25zZW50RWRpdFBlcm1pc3Npb24oc3R1ZGVudCwgcGVybWlzc2lvbik6IFByb21pc2U8U3R1ZGVudD4ge1xyXG4gICAgLy8gZ2V0IGN1cnJlbnQgdXNlciBpZCBmcm9tIHdlYiB0b2tlblxyXG4gICAgbGV0IHVybCA9IGBhcGkvc3R1ZGVudHMvZ3JhbnRDb25zZW50RWRpdFBlcm1pc3Npb25gO1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICAgIGxldCBvYmplY3RzID0gKHsgc3R1ZGVudDogc3R1ZGVudCwgcGVybWlzc2lvbjpwZXJtaXNzaW9uIH0pO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAgIC5wdXQodXJsLCBvYmplY3RzLCBvcHRpb25zKVxyXG4gICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkdyYW50IHBlcm1pc3Npb24gdG8gZWRpdCBjb25zZW50XCIpKTtcclxuICB9XHJcblxyXG4gIGNvdXJzZUVucm9sbCh1c2VySUQsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgY291cnNlSUQsIGluc3RydWN0b3JJRCkge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICBsZXQgdXJsID0gYGFwaS9lbnJvbGxgO1xyXG4gICAgdmFyIGluZm8gPSBbe1xyXG4gICAgICB1c2VySUQ6IHVzZXJJRCxcclxuICAgICAgY291cnNlSUQ6IGNvdXJzZUlELFxyXG4gICAgICBpbnN0cnVjdG9ySUQ6IGluc3RydWN0b3JJRCxcclxuICAgICAgc3RhcnREYXRlOiBzdGFydERhdGUsXHJcbiAgICAgIGVuZERhdGU6IGVuZERhdGVcclxuICAgIH1dO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLnBvc3QodXJsLCBpbmZvLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkNvdXJzZSBlbnJvbGxcIikpO1xyXG4gIH1cclxuXHJcbiAgY291cnNlRHJvcCh1c2VySUQsIGNvdXJzZUlEKSB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIGxldCB1cmwgPSBgYXBpL2Ryb3AvJHt1c2VySUR9LyR7Y291cnNlSUR9YDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5kZWxldGUodXJsLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkNvdXJzZSBkcm9wXCIpKTtcclxuICB9XHJcblxyXG4gIGdldFRpbWV0YWJsZXMoKSB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIGxldCB1cmwgPSBgYXBpL3RpbWV0YWJsZXNgO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldCh1cmwsIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiR2V0IHRpbWV0YWJsZXNcIikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VGltZXRhYmxlc0J5Q291cnNlSWQoY291cnNlSUQpIHtcclxuICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgbGV0IHVybCA9IGBhcGkvdGltZXRhYmxlcy1jb3Vyc2UtaWQvJHtjb3Vyc2VJRH1gO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldCh1cmwsIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiR2V0IHRpbWV0YWJsZXMgYnkgY291cnNlXCIpKTtcclxuICB9XHJcblxyXG4gIGdldEV2ZW50c0J5SWQodXNlcklEKSB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIGxldCB1cmwgPSBgYXBpL3RpbWV0YWJsZS8ke3VzZXJJRH1gO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0KHVybCwgb3B0aW9ucykudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkdldCBldmVudHMgYnkgaWRcIikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3R1ZGVudHNCeUlkKHRpbWV0YWJsZXMpIHtcclxuICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgbGV0IHVybCA9IGBhcGkvZ2V0LXN0dWRlbnRzLWlkYDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5wb3N0KHVybCwgdGltZXRhYmxlcywgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJHZXQgc3R1ZGVudHMgYnkgaWRcIikpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZU5ld05vdGUoY2FzZU5vdGUsIHN0dWRlbnRJRCkge1xyXG4gICAgdmFyIGNhc2VOb3RlT2JqZWN0ID0geyBjYXNlTm90ZTogY2FzZU5vdGUsIGRhdGVUaW1lOiBtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MgYScpIH07XHJcblxyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICAgIGxldCB1cmwgPSBgYXBpL2Nhc2VOb3Rlcy8ke3N0dWRlbnRJRH1gO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLnBvc3QodXJsLCBjYXNlTm90ZU9iamVjdCwgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJTYXZlIG5ldyBub3RlXCIpKTtcclxuICB9XHJcblxyXG4gIGdldE5vdGVzKHN0dWRlbnRJRCkge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICBsZXQgdXJsID0gYGFwaS9jYXNlTm90ZXMvJHtzdHVkZW50SUR9YDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5nZXQodXJsLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkdldCBub3Rlc1wiKSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVOb3RlKG5vdGVJRCkge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICBsZXQgdXJsID0gYGFwaS9jYXNlTm90ZXMvJHtub3RlSUR9YDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5kZWxldGUodXJsLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkRlbGV0ZSBub3Rlc1wiKSk7XHJcbiAgfVxyXG5cclxuICBpbnNlcnRBdHRlbmRhbmNlKGF0dGVuZGFuY2UpIHtcclxuICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgbGV0IHVybCA9IGBhcGkvYXR0ZW5kYW5jZWA7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAucG9zdCh1cmwsIGF0dGVuZGFuY2UsIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiSW5zZXJ0IGF0dGVuZGFuY2VcIikpO1xyXG4gIH1cclxuXHJcbiAgcG9wdWxhdGVQUkYoaWQ6IHN0cmluZykge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldCgnYXBpL3ByZi8nICsgaWQsIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiUG9wdWxhdGUgUFJGXCIpKTtcclxuICB9XHJcblxyXG4gIGdldEFsbEF0dGVuZGFuY2UoKSB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIGxldCB1cmwgPSBgYXBpL2F0dGVuZGFuY2UtcmVwb3J0YDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5nZXQodXJsLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkdldCBhbGwgYXR0ZW5kYW5jZVwiKSk7XHJcbiAgfVxyXG5cclxuICBnZXRBbGxGb3Jtc0J5SUQoc3R1ZGVudDogU3R1ZGVudCkge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICBsZXQgdXJsID0gYGFwaS9jbGllbnRGb3Jtcy8ke3N0dWRlbnQudXNlcklEfWA7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0KHVybCwgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJHZXQgYWxsIHN0dWRlbnQgZm9ybXNcIikpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55LCBuYW1lOiBhbnkpIHtcclxuICAgIGNvbnNvbGUubG9nKCdBbiBlcnJvciBvY2N1cnJlZCBhdCAnICsgbmFtZSwgZXJyb3IpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19
