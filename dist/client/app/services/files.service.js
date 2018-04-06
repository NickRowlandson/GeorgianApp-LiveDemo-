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
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, authentication_service_1, FilesService;
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
            FilesService = /** @class */ (function () {
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
            exports_1("FilesService", FilesService);
        }
    };
});

//# sourceMappingURL=files.service.js.map
