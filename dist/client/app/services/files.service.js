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
let FilesService = class FilesService {
    constructor(http, authService) {
        this.http = http;
        this.authService = authService;
    }
    base64ToArrayBuffer(base64) {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    }
    getFiles() {
        // add authorization header with jwt token
        let headers = new http_1.Headers({ authorization: this.authService.token });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.get('/api/getFiles', options)
            .toPromise()
            .then(response => response.json())
            .catch(err => err);
    }
    download(filename) {
        // add authorization header with jwt token
        let headers = new http_1.Headers({ authorization: this.authService.token });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('/api/download/' + filename, { responseType: 'blob' }, options)
            .toPromise()
            .then(response => {
            return this.base64ToArrayBuffer(response._body);
        })
            .catch(err => err);
    }
    delete(filename) {
        // add authorization header with jwt token
        let headers = new http_1.Headers({ authorization: this.authService.token });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete('/api/deleteFile/' + filename, options)
            .toPromise()
            .then(response => response)
            .catch(err => err);
    }
};
FilesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        authentication_service_1.AuthService])
], FilesService);
exports.FilesService = FilesService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvc2VydmljZXMvZmlsZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx3Q0FBeUU7QUFDekUscUVBQXVEO0FBRXZELHVDQUFxQztBQUdyQyxJQUFhLFlBQVksR0FBekI7SUFFRSxZQUFvQixJQUFVLEVBQ3BCLFdBQXdCO1FBRGQsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNwQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFJLENBQUM7SUFFeEMsbUJBQW1CLENBQUMsTUFBTTtRQUN2QixJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDcEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQyxJQUFJLEtBQUssR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDbkI7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNoQixDQUFDO0lBRUEsUUFBUTtRQUNOLDBDQUEwQztRQUMxQyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFdkQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDO2FBQzNDLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNqQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQsUUFBUSxDQUFDLFFBQVE7UUFDZiwwQ0FBMEM7UUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRXZELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxFQUFFLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxFQUFFLE9BQU8sQ0FBQzthQUMvRSxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDZixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBRSxRQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBUTtRQUNiLDBDQUEwQztRQUMxQyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFdkQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLEVBQUUsT0FBTyxDQUFDO2FBQzVELFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzthQUMxQixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDO0NBRUYsQ0FBQTtBQW5EWSxZQUFZO0lBRHhCLGlCQUFVLEVBQUU7cUNBR2UsV0FBSTtRQUNQLG9DQUFXO0dBSHZCLFlBQVksQ0FtRHhCO0FBbkRZLG9DQUFZIiwiZmlsZSI6ImFwcC9zZXJ2aWNlcy9maWxlcy5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIZWFkZXJzLCBIdHRwLCBSZXNwb25zZSwgUmVxdWVzdE9wdGlvbnMgIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvdG9Qcm9taXNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZpbGVzU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCxcclxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7IH1cclxuXHJcbiBiYXNlNjRUb0FycmF5QnVmZmVyKGJhc2U2NCkge1xyXG4gICAgdmFyIGJpbmFyeVN0cmluZyA9IHdpbmRvdy5hdG9iKGJhc2U2NCk7XHJcbiAgICB2YXIgYmluYXJ5TGVuID0gYmluYXJ5U3RyaW5nLmxlbmd0aDtcclxuICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KGJpbmFyeUxlbik7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJpbmFyeUxlbjsgaSsrKSB7XHJcbiAgICAgICB2YXIgYXNjaWkgPSBiaW5hcnlTdHJpbmcuY2hhckNvZGVBdChpKTtcclxuICAgICAgIGJ5dGVzW2ldID0gYXNjaWk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYnl0ZXM7XHJcbiB9XHJcblxyXG4gIGdldEZpbGVzKCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCcvYXBpL2dldEZpbGVzJywgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgLmNhdGNoKGVyciA9PiBlcnIpO1xyXG4gIH1cclxuXHJcbiAgZG93bmxvYWQoZmlsZW5hbWUpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoJy9hcGkvZG93bmxvYWQvJyArIGZpbGVuYW1lLCB7cmVzcG9uc2VUeXBlOidibG9iJ30sIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZTY0VG9BcnJheUJ1ZmZlcigocmVzcG9uc2UgYXMgYW55KS5fYm9keSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gZXJyKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZShmaWxlbmFtZSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAvLyBhZGQgYXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCBqd3QgdG9rZW5cclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBhdXRob3JpemF0aW9uOiB0aGlzLmF1dGhTZXJ2aWNlLnRva2VuIH0pO1xyXG4gICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKCcvYXBpL2RlbGV0ZUZpbGUvJyArIGZpbGVuYW1lLCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gZXJyKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==
