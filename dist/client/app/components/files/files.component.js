System.register(["@angular/core", "@angular/router", "../../services/authentication.service", "@angular/http", "../../services/files.service"], function (exports_1, context_1) {
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
    var core_1, router_1, router_2, authentication_service_1, http_1, files_service_1, FilesComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (files_service_1_1) {
                files_service_1 = files_service_1_1;
            }
        ],
        execute: function () {
            FilesComponent = /** @class */ (function () {
                function FilesComponent(http, router, route, authService, filesService) {
                    this.http = http;
                    this.router = router;
                    this.route = route;
                    this.authService = authService;
                    this.filesService = filesService;
                }
                FilesComponent.prototype.ngOnInit = function () {
                    swal({
                        title: 'Loading...',
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    this.getFiles();
                };
                FilesComponent.prototype.getFiles = function () {
                    var _this = this;
                    this.filesService
                        .getFiles()
                        .then(function (files) {
                        _this.files = files;
                        swal.close();
                        console.log(_this.files);
                    })
                        .catch(function (error) { return error; });
                };
                FilesComponent.prototype.download = function (file) {
                    var filename = file.milliseconds + "_" + file.userID + "_" + file.filename;
                    this.filesService
                        .download(filename)
                        .then(function (response) {
                        console.log(response);
                        var blob = new Blob([response], { type: "application/pdf" });
                        //change download.pdf to the name of whatever you want your file to be
                        console.log(blob);
                        saveAs(blob, file.filename);
                    })
                        .catch(function (error) { return error; });
                };
                FilesComponent.prototype.deleteAlert = function (file) {
                    var _this = this;
                    var filename = file.milliseconds + "_" + file.userID + "_" + file.filename;
                    swal({
                        title: 'Delete file (' + file.filename + ')?',
                        text: "You won't be able to revert this!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then(function (isConfirm) {
                        if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                            console.log(isConfirm.dismiss);
                        }
                        else if (isConfirm) {
                            _this.deleteFile(filename);
                        }
                    }).catch(function (error) { return error; });
                };
                FilesComponent.prototype.deleteFile = function (filename) {
                    var _this = this;
                    event.stopPropagation();
                    this.filesService
                        .delete(filename)
                        .then(function (res) {
                        _this.getFiles();
                        swal('Deleted!', 'File has been deleted.', 'success');
                    })
                        .catch(function (error) { return error; });
                };
                FilesComponent.prototype.addFile = function () {
                    this.router.navigate(['/file-upload']);
                };
                FilesComponent.prototype.goBack = function () {
                    window.history.back();
                };
                FilesComponent = __decorate([
                    core_1.Component({
                        selector: 'files',
                        templateUrl: './app/components/files/files.component.html',
                        styleUrls: ['./app/components/files/files.component.css']
                    }),
                    __metadata("design:paramtypes", [http_1.Http, router_1.Router, router_2.ActivatedRoute, authentication_service_1.AuthService, files_service_1.FilesService])
                ], FilesComponent);
                return FilesComponent;
            }());
            exports_1("FilesComponent", FilesComponent);
        }
    };
});

//# sourceMappingURL=files.component.js.map
