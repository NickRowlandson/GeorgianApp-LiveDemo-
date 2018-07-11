System.register(["@angular/core", "@angular/router", "../../services/student.service"], function (exports_1, context_1) {
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
    var core_1, router_1, student_service_1, StudentArchiveComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (student_service_1_1) {
                student_service_1 = student_service_1_1;
            }
        ],
        execute: function () {
            StudentArchiveComponent = /** @class */ (function () {
                function StudentArchiveComponent(router, studentService) {
                    this.router = router;
                    this.studentService = studentService;
                }
                StudentArchiveComponent.prototype.ngOnInit = function () {
                    swal({
                        title: 'Loading...',
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    this.getStudentArchive();
                    //this.getTimetables();
                };
                StudentArchiveComponent.prototype.getStudentArchive = function () {
                    var _this = this;
                    this.studentService
                        .getStudentArchive()
                        .then(function (results) {
                        if (results.result === 'error') {
                            _this.archive = null;
                            _this.displayErrorAlert(results);
                        }
                        else {
                            _this.archive = results;
                            swal.close();
                        }
                    })
                        .catch(function (error) { return console.log("Error - Get student archive: " + error); });
                };
                StudentArchiveComponent.prototype.displayErrorAlert = function (error) {
                    swal(error.title, error.msg, 'error');
                };
                StudentArchiveComponent.prototype.goBack = function () {
                    window.history.back();
                };
                StudentArchiveComponent = __decorate([
                    core_1.Component({
                        selector: 'studentArchive',
                        templateUrl: './app/components/student-archive/student-archive.component.html',
                        styleUrls: ['./app/components/student-archive/student-archive.component.css']
                    }),
                    __metadata("design:paramtypes", [router_1.Router, student_service_1.StudentService])
                ], StudentArchiveComponent);
                return StudentArchiveComponent;
            }());
            exports_1("StudentArchiveComponent", StudentArchiveComponent);
        }
    };
});

//# sourceMappingURL=student-archive.component.js.map
