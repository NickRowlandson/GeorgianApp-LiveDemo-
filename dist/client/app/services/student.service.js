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
exports.StudentService = StudentService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RTtBQUN4RSx1Q0FBcUM7QUFDckMsbUVBQXVEO0FBTXZEO0lBSUUsd0JBQW9CLElBQVUsRUFBVSxXQUF3QjtRQUE1QyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFGeEQsZ0JBQVcsR0FBRyxjQUFjLENBQUMsQ0FBRSxpQkFBaUI7SUFFWSxDQUFDO0lBRXJFLG9DQUFXLEdBQVg7UUFBQSxpQkFTQztRQVJDLDBDQUEwQztRQUMxQyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFdkQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDO2FBQzVDLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBZixDQUFlLENBQUM7YUFDakMsS0FBSyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsa0JBQWtCLENBQUMsRUFBekMsQ0FBeUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxtQ0FBVSxHQUFWLFVBQVcsRUFBVTtRQUFyQixpQkFTQztRQVJDLDBDQUEwQztRQUMxQyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFB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LHdDQUFjIiwiZmlsZSI6ImFwcC9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEhlYWRlcnMsIEh0dHAsIFJlc3BvbnNlLCBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi9tb2RlbHMvc3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tIFwiLi4vbW9kZWxzL2NvdXJzZVwiO1xyXG5kZWNsYXJlIHZhciBtb21lbnQ6IGFueTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFN0dWRlbnRTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBzdHVkZW50c1VybCA9ICdhcGkvc3R1ZGVudHMnOyAgLy8gVVJMIHRvIHdlYiBhcGlcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkgeyB9XHJcblxyXG4gIGdldFN0dWRlbnRzKCk6IFByb21pc2U8U3R1ZGVudFtdPiB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuc3R1ZGVudHNVcmwsIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiR2V0IGFsbCBzdHVkZW50c1wiKSk7XHJcbiAgfVxyXG5cclxuICBnZXRTdHVkZW50KGlkOiBzdHJpbmcpIHtcclxuICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5zdHVkZW50c1VybCArICcvJyArIGlkLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcImdldCBzdHVkZW50IGJ5IGlkXCIpKTtcclxuICB9XHJcblxyXG4gIHBvc3ROZXcoc3R1ZGVudDogU3R1ZGVudCk6IFByb21pc2U8U3R1ZGVudD4ge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5wb3N0KHRoaXMuc3R1ZGVudHNVcmwsIHN0dWRlbnQsIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkuZGF0YSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJwb3N0TmV3XCIpKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZShzdHVkZW50OiBTdHVkZW50KSB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIGxldCB1cmwgPSBgJHt0aGlzLnN0dWRlbnRzVXJsfS8ke3N0dWRlbnQudXNlcklEfWA7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAucHV0KHVybCwgc3R1ZGVudCwgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKCgpID0+IHN0dWRlbnQpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiVXBkYXRlXCIpKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZShzdHVkZW50OiBTdHVkZW50KSB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIGxldCB1cmwgPSBgJHt0aGlzLnN0dWRlbnRzVXJsfS8ke3N0dWRlbnQudXNlcklEfWA7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZGVsZXRlKHVybCwgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiRGVsZXRlXCIpKTtcclxuICB9XHJcblxyXG4gIGNvdXJzZUVucm9sbCh1c2VySUQsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgY291cnNlSUQsIGluc3RydWN0b3JJRCkge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICBsZXQgdXJsID0gYGFwaS9lbnJvbGxgO1xyXG4gICAgdmFyIGluZm8gPSBbe1xyXG4gICAgICB1c2VySUQ6IHVzZXJJRCxcclxuICAgICAgY291cnNlSUQ6IGNvdXJzZUlELFxyXG4gICAgICBpbnN0cnVjdG9ySUQ6IGluc3RydWN0b3JJRCxcclxuICAgICAgc3RhcnREYXRlOiBzdGFydERhdGUsXHJcbiAgICAgIGVuZERhdGU6IGVuZERhdGVcclxuICAgIH1dO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLnBvc3QodXJsLCBpbmZvLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpLmRhdGEpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiQ291cnNlIGVucm9sbFwiKSk7XHJcbiAgfVxyXG5cclxuICBjb3Vyc2VEcm9wKHVzZXJJRCwgY291cnNlSUQpIHtcclxuICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgbGV0IHVybCA9IGBhcGkvZHJvcC8ke3VzZXJJRH0vJHtjb3Vyc2VJRH1gO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmRlbGV0ZSh1cmwsIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkNvdXJzZSBkcm9wXCIpKTtcclxuICB9XHJcblxyXG4gIGdldFRpbWV0YWJsZXMoKSB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIGxldCB1cmwgPSBgYXBpL3RpbWV0YWJsZXNgO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJHZXQgdGltZXRhYmxlc1wiKSk7XHJcbiAgfVxyXG5cclxuICBnZXRUaW1ldGFibGVzQnlDb3Vyc2VJZChjb3Vyc2VJRCkge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICBsZXQgdXJsID0gYGFwaS90aW1ldGFibGVzLWNvdXJzZS1pZC8ke2NvdXJzZUlEfWA7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkdldCB0aW1ldGFibGVzIGJ5IGNvdXJzZVwiKSk7XHJcbiAgfVxyXG5cclxuICBnZXRFdmVudHNCeUlkKHVzZXJJRCkge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICBsZXQgdXJsID0gYGFwaS90aW1ldGFibGUvJHt1c2VySUR9YDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgb3B0aW9ucykudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkdldCBldmVudHMgYnkgaWRcIikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3R1ZGVudHNCeUlkKHRpbWV0YWJsZXMpIHtcclxuICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgbGV0IHVybCA9IGBhcGkvZ2V0LXN0dWRlbnRzLWlkYDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCB0aW1ldGFibGVzLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkdldCBzdHVkZW50cyBieSBpZFwiKSk7XHJcbiAgfVxyXG5cclxuICBzYXZlTmV3Tm90ZShjYXNlTm90ZSwgc3R1ZGVudElEKSB7XHJcbiAgICB2YXIgY2FzZU5vdGVPYmplY3QgPSB7IGNhc2VOb3RlOiBjYXNlTm90ZSwgZGF0ZVRpbWU6IG1vbWVudCgpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcyBhJykgfTtcclxuICAgIGNvbnNvbGUubG9nKG1vbWVudCgpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpKTtcclxuICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcbiAgICBsZXQgdXJsID0gYGFwaS9jYXNlTm90ZXMvJHtzdHVkZW50SUR9YDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5wb3N0KHVybCwgY2FzZU5vdGVPYmplY3QsIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkuZGF0YSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJTYXZlIG5ldyBub3RlXCIpKTtcclxuICB9XHJcblxyXG4gIGdldE5vdGVzKHN0dWRlbnRJRCkge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICBsZXQgdXJsID0gYGFwaS9jYXNlTm90ZXMvJHtzdHVkZW50SUR9YDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiR2V0IG5vdGVzXCIpKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZU5vdGUobm90ZUlEKSB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIGxldCB1cmwgPSBgYXBpL2Nhc2VOb3Rlcy8ke25vdGVJRH1gO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmRlbGV0ZSh1cmwsIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkRlbGV0ZSBub3Rlc1wiKSk7XHJcbiAgfVxyXG5cclxuICBpbnNlcnRBdHRlbmRhbmNlKGF0dGVuZGFuY2UpIHtcclxuICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgbGV0IHVybCA9IGBhcGkvYXR0ZW5kYW5jZWA7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAucG9zdCh1cmwsIGF0dGVuZGFuY2UsIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJJbnNlcnQgYXR0ZW5kYW5jZVwiKSk7XHJcbiAgfVxyXG5cclxuICBwb3B1bGF0ZVBSRihpZDogc3RyaW5nKSB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJ2FwaS9wcmYvJyArIGlkLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIlBvcHVsYXRlIFBSRlwiKSk7XHJcbiAgfVxyXG5cclxuICBnZXRBbGxBdHRlbmRhbmNlKCkge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICBsZXQgdXJsID0gYGFwaS9hdHRlbmRhbmNlLXJlcG9ydGA7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0KHVybCwgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJHZXQgYWxsIGF0dGVuZGFuY2VcIikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0QWxsRm9ybXNCeUlEKHN0dWRlbnQ6IFN0dWRlbnQpIHtcclxuICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgbGV0IHVybCA9IGBhcGkvY2xpZW50Rm9ybXMvJHtzdHVkZW50LnVzZXJJRH1gO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLmdldCh1cmwsIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiR2V0IGFsbCBzdHVkZW50IGZvcm1zXCIpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSwgbmFtZTogYW55KSB7XHJcbiAgICBjb25zb2xlLmxvZygnQW4gZXJyb3Igb2NjdXJyZWQgYXQgJyArIG5hbWUsIGVycm9yKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==
