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
var authentication_service_1 = require("./authentication.service");
require("rxjs/add/operator/toPromise");
var FilesService = /** @class */ (function () {
    function FilesService(http, authService) {
        this.http = http;
        this.authService = authService;
    }
    FilesService.prototype.base64ToArrayBuffer = function (base64) {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    };
    FilesService.prototype.getFiles = function () {
        // add authorization header with jwt token
        var headers = new http_1.Headers({ authorization: this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get('/api/getFiles', options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (err) { return err; });
    };
    FilesService.prototype.download = function (filename) {
        var _this = this;
        // add authorization header with jwt token
        var headers = new http_1.Headers({ authorization: this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('/api/download/' + filename, { responseType: 'blob' }, options)
            .toPromise()
            .then(function (response) {
            return _this.base64ToArrayBuffer(response._body);
        })
            .catch(function (err) { return err; });
    };
    FilesService.prototype.delete = function (filename) {
        // add authorization header with jwt token
        var headers = new http_1.Headers({ authorization: this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete('/api/deleteFile/' + filename, options)
            .toPromise()
            .then(function (response) { return response; })
            .catch(function (err) { return err; });
    };
    FilesService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            authentication_service_1.AuthService])
    ], FilesService);
    return FilesService;
}());
exports.FilesService = FilesService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvc2VydmljZXMvZmlsZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBeUU7QUFDekUsbUVBQXVEO0FBRXZELHVDQUFxQztBQUdyQztJQUVFLHNCQUFvQixJQUFVLEVBQ3BCLFdBQXdCO1FBRGQsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNwQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFJLENBQUM7SUFFeEMsMENBQW1CLEdBQW5CLFVBQW9CLE1BQU07UUFDdkIsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxJQUFJLFNBQVMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDO1FBQ3BDLElBQUksS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakMsSUFBSSxLQUFLLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ25CO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDaEIsQ0FBQztJQUVBLCtCQUFRLEdBQVI7UUFDRSwwQ0FBMEM7UUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRXZELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQzthQUMzQyxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWYsQ0FBZSxDQUFDO2FBQ2pDLEtBQUssQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQsK0JBQVEsR0FBUixVQUFTLFFBQVE7UUFBakIsaUJBV0M7UUFWQywwQ0FBMEM7UUFDMUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRXZELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxFQUFFLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxFQUFFLE9BQU8sQ0FBQzthQUMvRSxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ1osT0FBTyxLQUFJLENBQUMsbUJBQW1CLENBQUUsUUFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELDZCQUFNLEdBQU4sVUFBTyxRQUFRO1FBQ2IsMENBQTBDO1FBQzFDLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUV2RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixHQUFHLFFBQVEsRUFBRSxPQUFPLENBQUM7YUFDNUQsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxFQUFSLENBQVEsQ0FBQzthQUMxQixLQUFLLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQWpEVSxZQUFZO1FBRHhCLGlCQUFVLEVBQUU7eUNBR2UsV0FBSTtZQUNQLG9DQUFXO09BSHZCLFlBQVksQ0FtRHhCO0lBQUQsbUJBQUM7Q0FuREQsQUFtREMsSUFBQTtBQW5EWSxvQ0FBWSIsImZpbGUiOiJhcHAvc2VydmljZXMvZmlsZXMuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSGVhZGVycywgSHR0cCwgUmVzcG9uc2UsIFJlcXVlc3RPcHRpb25zICB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGaWxlc1NlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsXHJcbiAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkgeyB9XHJcblxyXG4gYmFzZTY0VG9BcnJheUJ1ZmZlcihiYXNlNjQpIHtcclxuICAgIHZhciBiaW5hcnlTdHJpbmcgPSB3aW5kb3cuYXRvYihiYXNlNjQpO1xyXG4gICAgdmFyIGJpbmFyeUxlbiA9IGJpbmFyeVN0cmluZy5sZW5ndGg7XHJcbiAgICB2YXIgYnl0ZXMgPSBuZXcgVWludDhBcnJheShiaW5hcnlMZW4pO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiaW5hcnlMZW47IGkrKykge1xyXG4gICAgICAgdmFyIGFzY2lpID0gYmluYXJ5U3RyaW5nLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICBieXRlc1tpXSA9IGFzY2lpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJ5dGVzO1xyXG4gfVxyXG5cclxuICBnZXRGaWxlcygpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCgnL2FwaS9nZXRGaWxlcycsIG9wdGlvbnMpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaChlcnIgPT4gZXJyKTtcclxuICB9XHJcblxyXG4gIGRvd25sb2FkKGZpbGVuYW1lKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIC8vIGFkZCBhdXRob3JpemF0aW9uIGhlYWRlciB3aXRoIGp3dCB0b2tlblxyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IGF1dGhvcml6YXRpb246IHRoaXMuYXV0aFNlcnZpY2UudG9rZW4gfSk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KCcvYXBpL2Rvd25sb2FkLycgKyBmaWxlbmFtZSwge3Jlc3BvbnNlVHlwZTonYmxvYid9LCBvcHRpb25zKVxyXG4gICAgICAudG9Qcm9taXNlKClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJhc2U2NFRvQXJyYXlCdWZmZXIoKHJlc3BvbnNlIGFzIGFueSkuX2JvZHkpO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyID0+IGVycik7XHJcbiAgfVxyXG5cclxuICBkZWxldGUoZmlsZW5hbWUpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgLy8gYWRkIGF1dGhvcml6YXRpb24gaGVhZGVyIHdpdGggand0IHRva2VuXHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgYXV0aG9yaXphdGlvbjogdGhpcy5hdXRoU2VydmljZS50b2tlbiB9KTtcclxuICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZSgnL2FwaS9kZWxldGVGaWxlLycgKyBmaWxlbmFtZSwgb3B0aW9ucylcclxuICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlKVxyXG4gICAgICAuY2F0Y2goZXJyID0+IGVycik7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=
