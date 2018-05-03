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
require("rxjs/add/operator/toPromise");
var authentication_service_1 = require("./authentication.service");
var StudentService = /** @class */ (function () {
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
        return this.http
            .get(this.studentsUrl, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (err) { return _this.handleError(err, "Get all students"); });
    };
    StudentService.prototype.getStudent = function (id) {
        var _this = this;
        // add authorization header with jwt token
        var headers = new http_1.Headers({ authorization: this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http
            .get(this.studentsUrl + '/' + id, options)
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
            .then(function (response) { return response.json(); })
            .catch(function (err) { return _this.handleError(err, "postNew"); });
    };
    StudentService.prototype.updateGeneralInfo = function (student) {
        var _this = this;
        // add authorization header with jwt token
        var headers = new http_1.Headers({ authorization: this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = 'api/students/general-info-update';
        return this.http
            .put(url, student, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (err) { return _this.handleError(err, "Update General Info"); });
    };
    StudentService.prototype.requestEditConsent = function () {
        var _this = this;
        // get current user id from web token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var currentUserID = currentUser.userID;
        var url = "api/students/" + currentUserID + "/requestEditConsent";
        // add authorization header with jwt token
        var headers = new http_1.Headers({ authorization: this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http
            .put(url, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (err) { return _this.handleError(err, "Request to edit consent"); });
    };
    StudentService.prototype.grantConsentEditPermission = function (student, permission) {
        var _this = this;
        // get current user id from web token
        var url = "api/students/grantConsentEditPermission";
        // add authorization header with jwt token
        var headers = new http_1.Headers({ authorization: this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        var objects = ({ student: student, permission: permission });
        return this.http
            .put(url, objects, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (err) { return _this.handleError(err, "Grant permission to edit consent"); });
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
            .then(function (response) { return response.json(); })
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
            .then(function (response) { return response.json(); })
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
        // add authorization header with jwt token
        var headers = new http_1.Headers({ authorization: this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = "api/caseNotes/" + studentID;
        return this.http
            .post(url, caseNoteObject, options)
            .toPromise()
            .then(function (response) { return response.json(); })
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
            .then(function (response) { return response.json(); })
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
exports.StudentService = StudentService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RTtBQUN4RSx1Q0FBcUM7QUFDckMsbUVBQXVEO0FBTXZEO0lBSUUsd0JBQW9CLElBQVUsRUFBVSxXQUF3QjtRQUE1QyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFGeEQsZ0JBQVcsR0FBRyxjQUFjLENBQUMsQ0FBRSxpQkFBaUI7SUFFWSxDQUFDO0lBRXJFLG9DQUFXLEdBQVg7UUFBQSxpQkFVQztRQVRDLDBDQUEwQztRQUMxQyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFdkQsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQzthQUM5QixTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWYsQ0FBZSxDQUFDO2FBQ2pDLEtBQUssQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDLEVBQXpDLENBQXlDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsbUNBQVUsR0FBVixVQUFXLEVBQVU7UUFBckIsaUJBVUM7UUFUQywwQ0FBMEM7UUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FB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LElBQUksQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBZixDQUFlLENBQUM7YUFDakMsS0FBSyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsdUJBQXVCLENBQUMsRUFBOUMsQ0FBOEMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTyxvQ0FBVyxHQUFuQixVQUFvQixLQUFVLEVBQUUsSUFBUztRQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFHLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBelJVLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0FLZSxXQUFJLEVBQXVCLG9DQUFXO09BSnJELGNBQWMsQ0EyUjFCO0lBQUQscUJBQUM7Q0EzUkQsQUEyUkMsSUFBQTtBQTNSWSx3Q0FBYyIsImZpbGUiOiJhcHAvc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIZWFkZXJzLCBIdHRwLCBSZXNwb25zZSwgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vbW9kZWxzL3N0dWRlbnRcIjtcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uL21vZGVscy9jb3Vyc2VcIjtcclxuZGVjbGFyZSB2YXIgbW9tZW50OiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTdHVkZW50U2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgc3R1ZGVudHNVcmwgPSAnYXBpL3N0dWRlbnRzJzsgIC8vIFVSTCB0byB3ZWIgYXBpXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHsgfVxyXG5cclxuICBnZXRTdHVkZW50cygpOiBQcm9taXNlPFN0dWRlbnRbXT4ge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5nZXQodGhpcy5zdHVkZW50c1VybCwgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJHZXQgYWxsIHN0dWRlbnRzXCIpKTtcclxuICB9XHJcblxyXG4gIGdldFN0dWRlbnQoaWQ6IHN0cmluZykge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5nZXQodGhpcy5zdHVkZW50c1VybCArICcvJyArIGlkLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcImdldCBzdHVkZW50IGJ5IGlkXCIpKTtcclxuICB9XHJcblxyXG4gIHBvc3ROZXcoc3R1ZGVudDogU3R1ZGVudCk6IFByb21pc2U8U3R1ZGVudD4ge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5wb3N0KHRoaXMuc3R1ZGVudHNVcmwsIHN0dWRlbnQsIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwicG9zdE5ld1wiKSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVHZW5lcmFsSW5mbyhzdHVkZW50OiBTdHVkZW50KTogUHJvbWlzZTxTdHVkZW50PiB7XHJcbiAgICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgICAgdmFyIHVybCA9ICdhcGkvc3R1ZGVudHMvZ2VuZXJhbC1pbmZvLXVwZGF0ZSc7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgICAucHV0KHVybCwgc3R1ZGVudCwgb3B0aW9ucylcclxuICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJVcGRhdGUgR2VuZXJhbCBJbmZvXCIpKTtcclxuICB9XHJcblxyXG4gIHJlcXVlc3RFZGl0Q29uc2VudCgpOiBQcm9taXNlPFN0dWRlbnQ+IHtcclxuICAgIC8vIGdldCBjdXJyZW50IHVzZXIgaWQgZnJvbSB3ZWIgdG9rZW5cclxuICAgIHZhciBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgdmFyIGN1cnJlbnRVc2VySUQgPSBjdXJyZW50VXNlci51c2VySUQ7XHJcbiAgICBsZXQgdXJsID0gYGFwaS9zdHVkZW50cy8ke2N1cnJlbnRVc2VySUR9L3JlcXVlc3RFZGl0Q29uc2VudGA7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgICAucHV0KHVybCwgb3B0aW9ucylcclxuICAgICAgICAudG9Qcm9taXNlKClcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJSZXF1ZXN0IHRvIGVkaXQgY29uc2VudFwiKSk7XHJcbiAgfVxyXG5cclxuICBncmFudENvbnNlbnRFZGl0UGVybWlzc2lvbihzdHVkZW50LCBwZXJtaXNzaW9uKTogUHJvbWlzZTxTdHVkZW50PiB7XHJcbiAgICAvLyBnZXQgY3VycmVudCB1c2VyIGlkIGZyb20gd2ViIHRva2VuXHJcbiAgICBsZXQgdXJsID0gYGFwaS9zdHVkZW50cy9ncmFudENvbnNlbnRFZGl0UGVybWlzc2lvbmA7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gICAgbGV0IG9iamVjdHMgPSAoeyBzdHVkZW50OiBzdHVkZW50LCBwZXJtaXNzaW9uOnBlcm1pc3Npb24gfSk7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgICAgLnB1dCh1cmwsIG9iamVjdHMsIG9wdGlvbnMpXHJcbiAgICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiR3JhbnQgcGVybWlzc2lvbiB0byBlZGl0IGNvbnNlbnRcIikpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlKHN0dWRlbnQ6IFN0dWRlbnQpIHtcclxuICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgbGV0IHVybCA9IGAke3RoaXMuc3R1ZGVudHNVcmx9LyR7c3R1ZGVudC51c2VySUR9YDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5kZWxldGUodXJsLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkRlbGV0ZVwiKSk7XHJcbiAgfVxyXG5cclxuICBjb3Vyc2VFbnJvbGwodXNlcklELCBzdGFydERhdGUsIGVuZERhdGUsIGNvdXJzZUlELCBpbnN0cnVjdG9ySUQpIHtcclxuICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgbGV0IHVybCA9IGBhcGkvZW5yb2xsYDtcclxuICAgIHZhciBpbmZvID0gW3tcclxuICAgICAgdXNlcklEOiB1c2VySUQsXHJcbiAgICAgIGNvdXJzZUlEOiBjb3Vyc2VJRCxcclxuICAgICAgaW5zdHJ1Y3RvcklEOiBpbnN0cnVjdG9ySUQsXHJcbiAgICAgIHN0YXJ0RGF0ZTogc3RhcnREYXRlLFxyXG4gICAgICBlbmREYXRlOiBlbmREYXRlXHJcbiAgICB9XTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5wb3N0KHVybCwgaW5mbywgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKS5kYXRhKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkNvdXJzZSBlbnJvbGxcIikpO1xyXG4gIH1cclxuXHJcbiAgY291cnNlRHJvcCh1c2VySUQsIGNvdXJzZUlEKSB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIGxldCB1cmwgPSBgYXBpL2Ryb3AvJHt1c2VySUR9LyR7Y291cnNlSUR9YDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5kZWxldGUodXJsLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkNvdXJzZSBkcm9wXCIpKTtcclxuICB9XHJcblxyXG4gIGdldFRpbWV0YWJsZXMoKSB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIGxldCB1cmwgPSBgYXBpL3RpbWV0YWJsZXNgO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJHZXQgdGltZXRhYmxlc1wiKSk7XHJcbiAgfVxyXG5cclxuICBnZXRUaW1ldGFibGVzQnlDb3Vyc2VJZChjb3Vyc2VJRCkge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICBsZXQgdXJsID0gYGFwaS90aW1ldGFibGVzLWNvdXJzZS1pZC8ke2NvdXJzZUlEfWA7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkdldCB0aW1ldGFibGVzIGJ5IGNvdXJzZVwiKSk7XHJcbiAgfVxyXG5cclxuICBnZXRFdmVudHNCeUlkKHVzZXJJRCkge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICBsZXQgdXJsID0gYGFwaS90aW1ldGFibGUvJHt1c2VySUR9YDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgb3B0aW9ucykudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkdldCBldmVudHMgYnkgaWRcIikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3R1ZGVudHNCeUlkKHRpbWV0YWJsZXMpIHtcclxuICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgbGV0IHVybCA9IGBhcGkvZ2V0LXN0dWRlbnRzLWlkYDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCB0aW1ldGFibGVzLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkdldCBzdHVkZW50cyBieSBpZFwiKSk7XHJcbiAgfVxyXG5cclxuICBzYXZlTmV3Tm90ZShjYXNlTm90ZSwgc3R1ZGVudElEKSB7XHJcbiAgICB2YXIgY2FzZU5vdGVPYmplY3QgPSB7IGNhc2VOb3RlOiBjYXNlTm90ZSwgZGF0ZVRpbWU6IG1vbWVudCgpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcyBhJykgfTtcclxuXHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gICAgbGV0IHVybCA9IGBhcGkvY2FzZU5vdGVzLyR7c3R1ZGVudElEfWA7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAucG9zdCh1cmwsIGNhc2VOb3RlT2JqZWN0LCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIlNhdmUgbmV3IG5vdGVcIikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Tm90ZXMoc3R1ZGVudElEKSB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIGxldCB1cmwgPSBgYXBpL2Nhc2VOb3Rlcy8ke3N0dWRlbnRJRH1gO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJHZXQgbm90ZXNcIikpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlTm90ZShub3RlSUQpIHtcclxuICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgbGV0IHVybCA9IGBhcGkvY2FzZU5vdGVzLyR7bm90ZUlEfWA7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZGVsZXRlKHVybCwgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJEZWxldGUgbm90ZXNcIikpO1xyXG4gIH1cclxuXHJcbiAgaW5zZXJ0QXR0ZW5kYW5jZShhdHRlbmRhbmNlKSB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIGxldCB1cmwgPSBgYXBpL2F0dGVuZGFuY2VgO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLnBvc3QodXJsLCBhdHRlbmRhbmNlLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiSW5zZXJ0IGF0dGVuZGFuY2VcIikpO1xyXG4gIH1cclxuXHJcbiAgcG9wdWxhdGVQUkYoaWQ6IHN0cmluZykge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCdhcGkvcHJmLycgKyBpZCwgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJQb3B1bGF0ZSBQUkZcIikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0QWxsQXR0ZW5kYW5jZSgpIHtcclxuICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgbGV0IHVybCA9IGBhcGkvYXR0ZW5kYW5jZS1yZXBvcnRgO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldCh1cmwsIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiR2V0IGFsbCBhdHRlbmRhbmNlXCIpKTtcclxuICB9XHJcblxyXG4gIGdldEFsbEZvcm1zQnlJRChzdHVkZW50OiBTdHVkZW50KSB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIGxldCB1cmwgPSBgYXBpL2NsaWVudEZvcm1zLyR7c3R1ZGVudC51c2VySUR9YDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5nZXQodXJsLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkdldCBhbGwgc3R1ZGVudCBmb3Jtc1wiKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnksIG5hbWU6IGFueSkge1xyXG4gICAgY29uc29sZS5sb2coJ0FuIGVycm9yIG9jY3VycmVkIGF0ICcgKyBuYW1lLCBlcnJvcik7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=
