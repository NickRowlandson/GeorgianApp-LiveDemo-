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
let StaffService = class StaffService {
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
exports.StaffService = StaffService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvc2VydmljZXMvc3RhZmYuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx3Q0FBd0U7QUFFeEUscUVBQXVEO0FBRXZELHVDQUFxQztBQUdyQyxJQUFhLFlBQVksR0FBekI7SUFJRSxZQUFvQixJQUFVLEVBQ3BCLFdBQXdCO1FBRGQsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNwQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUgxQixhQUFRLEdBQUcsV0FBVyxDQUFDLENBQUUsaUJBQWlCO0lBR1osQ0FBQztJQUV2QyxRQUFRO1FBQ04sMENBQTBDO1FBQzFDLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUV2RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDO2FBQ3pDLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNqQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELE9BQU8sQ0FBQyxFQUFVO1FBQ2hCLDBDQUEwQztRQUMxQyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFD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QTBDO1FBQzFDLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUV2RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQzthQUMvQyxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDakMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTyxXQUFXLENBQUMsS0FBVSxFQUFFLElBQVM7UUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMxQyxDQUFDO0NBQ0YsQ0FBQTtBQXBGWSxZQUFZO0lBRHhCLGlCQUFVLEVBQUU7cUNBS2UsV0FBSTtRQUNQLG9DQUFXO0dBTHZCLFlBQVksQ0FvRnhCO0FBcEZZLG9DQUFZIiwiZmlsZSI6ImFwcC9zZXJ2aWNlcy9zdGFmZi5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIZWFkZXJzLCBIdHRwLCBSZXNwb25zZSwgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9tb2RlbHMvdXNlclwiO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTdGFmZlNlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIHVzZXJzVXJsID0gJ2FwaS9zdGFmZic7ICAvLyBVUkwgdG8gd2ViIGFwcFxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsXHJcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkgeyB9XHJcblxyXG4gIGdldFVzZXJzKCk6IFByb21pc2U8VXNlcltdPiB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMudXNlcnNVcmwsIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiR2V0IGFsbCBmYWN1bHR5IHVzZXJzXCIpKTtcclxuICB9XHJcblxyXG4gIGdldFVzZXIoaWQ6IHN0cmluZykge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnVzZXJzVXJsICsgJy8nICsgaWQsIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiR2V0IHNwZWNpZmljIGZhY3VsdHkgdXNlclwiKSk7XHJcbiAgfVxyXG5cclxuICBzYXZlTmV3KHVzZXI6IFVzZXIpOiBQcm9taXNlPFVzZXI+IHtcclxuICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAucG9zdCh0aGlzLnVzZXJzVXJsLCB1c2VyLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyLCBcIlNhdmUgbmV3IGZhY3VsdHkgdXNlclwiKSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUodXNlcjogVXNlciwgaWQpIHtcclxuICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgbGV0IHVybCA9IGAke3RoaXMudXNlcnNVcmx9LyR7aWR9YDtcclxuICAgIHJldHVybiB0aGlzLmh0dHBcclxuICAgICAgLnB1dCh1cmwsIHVzZXIsIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIsIFwiVXBkYXRlIGZhY3VsdHkgdXNlclwiKSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGUodXNlcjogVXNlcikge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICAvL2hlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG5cclxuICAgIGxldCB1cmwgPSBgJHt0aGlzLnVzZXJzVXJsfS8ke3VzZXIudXNlcklEfWA7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZGVsZXRlKHVybCwgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJEZWxldGUgZmFjdWx0eSB1c2VyXCIpKTtcclxuICB9XHJcblxyXG4gIGdldFNpdGVBY3Rpdml0eSgpIHtcclxuICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJ2FwaS9zaXRlLWFjdGl2aXR5Jywgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVyciwgXCJHZXQgYWxsIHNpdGUgYWN0aXZpdHlcIikpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55LCBuYW1lOiBhbnkpIHtcclxuICAgIGNvbnNvbGUubG9nKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycm9yKTtcclxuICB9XHJcbn1cclxuIl19
