System.register(["@angular/core", "@angular/router", "../../services/authentication.service", "../../services/student.service", "../../services/client.service", "ng2-file-upload"], function (exports_1, context_1) {
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
    var core_1, router_1, router_2, authentication_service_1, student_service_1, client_service_1, ng2_file_upload_1, URL, FileUploadComponent;
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
            function (student_service_1_1) {
                student_service_1 = student_service_1_1;
            },
            function (client_service_1_1) {
                client_service_1 = client_service_1_1;
            },
            function (ng2_file_upload_1_1) {
                ng2_file_upload_1 = ng2_file_upload_1_1;
            }
        ],
        execute: function () {
            URL = 'api/uploadFile';
            FileUploadComponent = /** @class */ (function () {
                function FileUploadComponent(router, route, authService, studentService, clientService) {
                    this.router = router;
                    this.route = route;
                    this.authService = authService;
                    this.studentService = studentService;
                    this.clientService = clientService;
                    this.users = [];
                    this.hasBaseDropZoneOver = false;
                    this.uploader = new ng2_file_upload_1.FileUploader({ url: URL });
                    this.uploader.onCompleteItem = function (item, response, status, headers) {
                        console.log("ImageUpload:uploaded:", item, status);
                    };
                }
                FileUploadComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.studentService
                        .getStudents()
                        .then(function (students) {
                        _this.students = students;
                        for (var _i = 0, _a = _this.students; _i < _a.length; _i++) {
                            var student = _a[_i];
                            var info = { label: student.firstName + ' ' + student.lastName, value: student.userID };
                            _this.users.push(info);
                        }
                    })
                        .catch(function (error) {
                        // do something
                    });
                    this.clientService
                        .getClients()
                        .then(function (clients) {
                        console.log(clients);
                        _this.clients = clients.clients;
                        for (var _i = 0, _a = _this.clients; _i < _a.length; _i++) {
                            var client = _a[_i];
                            console.log(client);
                            var info = { label: client.firstName + ' ' + client.lastName, value: client.userID };
                            _this.users.push(info);
                        }
                        console.log(_this.users);
                    })
                        .catch(function (error) {
                        // do something
                    });
                };
                FileUploadComponent.prototype.userSelect = function () {
                    var _this = this;
                    console.log(this.selectedStudent);
                    // this.uploader.setOptions({
                    //   additionalParameter: { studentID: this.selectedStudent }
                    // });
                    this.uploader.onBeforeUploadItem = function (item) {
                        item.file.name = _this.selectedStudent + '_' + item.file.name;
                    };
                };
                FileUploadComponent.prototype.fileOverBase = function (e) {
                    this.hasBaseDropZoneOver = e;
                };
                FileUploadComponent.prototype.goBack = function () {
                    window.history.back();
                };
                FileUploadComponent = __decorate([
                    core_1.Component({
                        selector: 'fileUpload',
                        templateUrl: './app/components/file-upload/file-upload.component.html',
                        styleUrls: ['./app/components/file-upload/file-upload.component.css']
                    }),
                    __metadata("design:paramtypes", [router_1.Router, router_2.ActivatedRoute, authentication_service_1.AuthService, student_service_1.StudentService, client_service_1.ClientService])
                ], FileUploadComponent);
                return FileUploadComponent;
            }());
            exports_1("FileUploadComponent", FileUploadComponent);
        }
    };
});

//# sourceMappingURL=file-upload.component.js.map
