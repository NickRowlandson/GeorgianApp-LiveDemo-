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
    var core_1, router_1, student_service_1, StudentArchiveComponent;
    var __moduleName = context_1 && context_1.id;
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
            StudentArchiveComponent = class StudentArchiveComponent {
                constructor(router, studentService) {
                    this.router = router;
                    this.studentService = studentService;
                }
                ngOnInit() {
                    swal({
                        title: 'Loading...',
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    this.getStudentArchive();
                    //this.getTimetables();
                }
                getStudentArchive() {
                    this.studentService
                        .getStudentArchive()
                        .then(results => {
                        if (results.result === 'error') {
                            this.archive = null;
                            this.displayErrorAlert(results);
                        }
                        else {
                            this.archive = results;
                            swal.close();
                        }
                    })
                        .catch(error => console.log("Error - Get student archive: " + error));
                }
                displayErrorAlert(error) {
                    if (error.title === "Auth Error") {
                        this.router.navigate(['/login']);
                        swal(error.title, error.msg, 'info');
                    }
                    else {
                        swal(error.title, error.msg, 'error');
                    }
                }
                goBack() {
                    window.history.back();
                }
            };
            StudentArchiveComponent = __decorate([
                core_1.Component({
                    selector: 'studentArchive',
                    templateUrl: './app/components/student-archive/student-archive.component.html',
                    styleUrls: ['./app/components/student-archive/student-archive.component.css']
                }),
                __metadata("design:paramtypes", [router_1.Router, student_service_1.StudentService])
            ], StudentArchiveComponent);
            exports_1("StudentArchiveComponent", StudentArchiveComponent);
        }
    };
});

//# sourceMappingURL=student-archive.component.js.map
