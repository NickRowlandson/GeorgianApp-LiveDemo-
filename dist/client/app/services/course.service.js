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
const authentication_service_1 = require("./authentication.service");
require("rxjs/add/operator/toPromise");
let CourseService = class CourseService {
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
exports.CourseService = CourseService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvc2VydmljZXMvY291cnNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBMkM7QUFDM0Msd0NBQXdFO0FBR3hFLHFFQUF1RDtBQUV2RCx1Q0FBcUM7QUFHckMsSUFBYSxhQUFhLEdBQTFCO0lBSUUsWUFBb0IsSUFBVSxFQUNwQixXQUF3QjtRQURkLFNBQUksR0FBSixJQUFJLENBQU07UUFDcEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFIMUIsY0FBUyxHQUFHLFlBQVksQ0FBQyxDQUFFLGlCQUFpQjtJQUdkLENBQUM7SUFFdkMsVUFBVTtRQUNSLDBDQUEwQztRQUMxQyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFdkQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQzthQUMxQyxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDakMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsb0JBQW9CLENBQUMsRUFBVTtRQUM3QiwwQ0FBMEM7UUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FB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QUNYLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNqQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFHRCxjQUFjO1FBQ1osMENBQTBDO1FBQzFDLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUV2RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQzthQUNoRCxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDakMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFTyxXQUFXLENBQUMsS0FBVSxFQUFFLElBQVM7UUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckQsQ0FBQztDQUVGLENBQUE7QUEzTFksYUFBYTtJQUR6QixpQkFBVSxFQUFFO3FDQUtlLFdBQUk7UUFDUCxvQ0FBVztHQUx2QixhQUFhLENBMkx6QjtBQTNMWSxzQ0FBYSIsImZpbGUiOiJhcHAvc2VydmljZXMvY291cnNlLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEhlYWRlcnMsIEh0dHAsIFJlc3BvbnNlLCBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tIFwiLi4vbW9kZWxzL2NvdXJzZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uL21vZGVscy9zdHVkZW50XCI7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvdXJzZVNlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIGNvdXJzZVVybCA9ICdhcGkvY291cnNlJzsgIC8vIFVSTCB0byB3ZWIgYXBwXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCxcclxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7IH1cclxuXHJcbiAgZ2V0Q291cnNlcygpOiBQcm9taXNlPENvdXJzZVtdPiB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuY291cnNlVXJsLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkdldCBDb3Vyc2VzXCIpKTtcclxuICB9XHJcblxyXG4gIGdldEluc3RydWN0b3JDb3Vyc2VzKGlkOiBzdHJpbmcpOiBQcm9taXNlPENvdXJzZVtdPiB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIGxldCB1cmwgPSBcImFwaS9pbnN0cnVjdG9yLWNvdXJzZXMvXCIgKyBpZDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiR2V0IEludHJ1Y3RvcnMgQ291cnNlc1wiKSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb3Vyc2UoaWQ6IHN0cmluZykge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmNvdXJzZVVybCArICcvJyArIGlkLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkdldCBDb3Vyc2VcIikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0V2FpdExpc3QoKSB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCdhcGkvd2FpdC1saXN0Jywgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJHZXQgd2FpdGxpc3RcIikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0V2FpdExpc3RCeUlkKHVzZXJJRCkge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICBsZXQgdXJsID0gXCJhcGkvd2FpdC1saXN0LWJ5LWlkL1wiICsgdXNlcklEO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJHZXQgY291cnNlIHdhaXQgbGlzdCBieSBpZFwiKSk7XHJcbiAgfVxyXG5cclxuICBhZGRUb1dhaXRMaXN0KHVzZXJJRCwgY291cnNlVHlwZSwgZGF0ZSkge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICAgIHZhciBpbmZvID0ge1xyXG4gICAgICB1c2VySUQ6IHVzZXJJRCxcclxuICAgICAgY291cnNlVHlwZTogY291cnNlVHlwZSxcclxuICAgICAgZGF0ZTogZGF0ZVxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLnBvc3QoJy9hcGkvYWRkVG9XYWl0TGlzdCcsIGluZm8sIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiYWRkVG9XYWl0TGlzdFwiKSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGcm9tV2FpdExpc3QodXNlcklELCBjb3Vyc2VUeXBlKSB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gICAgbGV0IHVybCA9IGAke3RoaXMuY291cnNlVXJsfS8ke3VzZXJJRH0vJHtjb3Vyc2VUeXBlfWA7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwXHJcbiAgICAgIC5kZWxldGUodXJsLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcInJlbW92ZUZyb21XYWl0TGlzdFwiKSk7XHJcbiAgfVxyXG5cclxuICBhZGRUb0NvdXJzZVR5cGVzKGNvdXJzZVR5cGUpIHtcclxuICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcbiAgICB2YXIgaW5mbyA9IHtcclxuICAgICAgY291cnNlVHlwZTogY291cnNlVHlwZVxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLnBvc3QoJy9hcGkvYWRkVG9Db3Vyc2VUeXBlcycsIGluZm8sIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiYWRkVG9Db3Vyc2VUeXBlc1wiKSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGUoY291cnNlOiBDb3Vyc2UpIHtcclxuICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgLy9oZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHJcbiAgICBsZXQgdXJsID0gYCR7dGhpcy5jb3Vyc2VVcmx9LyR7Y291cnNlLmNvdXJzZUlEfWA7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZGVsZXRlKHVybCwgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJEZWxldGUgQ291cnNlXCIpKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZShjb3Vyc2U6IENvdXJzZSk6IFByb21pc2U8Q291cnNlPiB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLnBvc3QodGhpcy5jb3Vyc2VVcmwsIGNvdXJzZSwgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJDcmVhdGUgTmV3IENvdXJzZVwiKSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoY291cnNlOiBDb3Vyc2UpIHtcclxuICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgbGV0IHVybCA9IGAke3RoaXMuY291cnNlVXJsfS8ke2NvdXJzZS5jb3Vyc2VJRH1gO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAucHV0KHVybCwgY291cnNlLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIlVwZGF0ZSBDb3Vyc2VcIikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q291cnNlVHlwZXMoKSB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCdhcGkvZ2V0Q291cnNlVHlwZXMnLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkdldCBDb3Vyc2UgVHlwZXNcIikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2FtcHVzZXMoKSB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCdhcGkvZ2V0Q2FtcHVzZXMnLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkdldCBDYW1wdXNlc1wiKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZ2V0SW5zdHJ1Y3RvcnMoKSB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCdhcGkvZ2V0SW5zdHJ1Y3RvcnMnLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIkdldCBJbnN0cnVjdG9yc1wiKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnksIG5hbWU6IGFueSkge1xyXG4gICAgY29uc29sZS5sb2coJ0FuIGVycm9yIG9jY3VycmVkIGF0ICcgKyBuYW1lLCBlcnJvcik7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=
