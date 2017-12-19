System.register(["@angular/core", "@angular/router", "../../services/student.service", "../../services/authentication.service"], function (exports_1, context_1) {
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
    var core_1, router_1, student_service_1, authentication_service_1, StudentManageComponent;
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
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }
        ],
        execute: function () {
            StudentManageComponent = /** @class */ (function () {
                function StudentManageComponent(router, ngZone, studentService, authService) {
                    this.router = router;
                    this.ngZone = ngZone;
                    this.studentService = studentService;
                    this.authService = authService;
                    this.studentInfoView = false;
                    this.showGeneral = true;
                    //bar chart (learning style)
                    this.barChartOptions = {
                        scaleShowVerticalLines: false,
                        responsive: true
                    };
                    this.barChartLabels = ['Hearing', 'Seeing', 'Doing'];
                    this.barChartType = 'bar';
                    this.barChartLegend = false;
                    this.barChartColors = [{ backgroundColor: ["#FF4207", "#F8E903", "#2AD308"] }];
                }
                StudentManageComponent.prototype.ngOnInit = function () {
                    this.getStudents();
                };
                StudentManageComponent.prototype.getStudents = function () {
                    var _this = this;
                    this.studentService
                        .getStudents()
                        .then(function (students) {
                        if (students.status === "403") {
                            _this.students = null;
                        }
                        else {
                            _this.students = students;
                            for (var _i = 0, _a = _this.students; _i < _a.length; _i++) {
                                var student = _a[_i];
                                student.fullName = student.firstName + " " + student.lastName;
                            }
                        }
                    })
                        .catch(function (error) { return _this.error = error; });
                };
                StudentManageComponent.prototype.addClient = function () {
                    this.router.navigate(['/suitability']);
                };
                StudentManageComponent.prototype.gotoEdit = function (student, event) {
                    this.router.navigate(['/student-edit', student.studentID]);
                };
                StudentManageComponent.prototype.addStudent = function () {
                    this.router.navigate(['/student-edit', 'new']);
                };
                StudentManageComponent.prototype.archiveAlert = function (student, event) {
                    var _this = this;
                    swal({
                        title: 'Archive student (' + student.firstName + ' ' + student.lastName + ')',
                        text: "Are you sure want to do this?",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, Archive it!'
                    }).then(function (isConfirm) {
                        if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                            console.log(isConfirm.dismiss);
                        }
                        else if (isConfirm) {
                            _this.archiveStudent(student, event);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                };
                StudentManageComponent.prototype.archiveStudent = function (student, event) {
                    swal('Sorry...', 'This functionality is not yet available', 'info');
                };
                StudentManageComponent.prototype.populatePRF = function (student) {
                    this.studentService
                        .populatePRF(student.userID)
                        .then(function (response) {
                        swal('Sorry...', 'This feature is not yet available', 'info');
                    })
                        .catch(function (error) { return console.log(error); });
                };
                StudentManageComponent.prototype.viewInfo = function (student) {
                    var _this = this;
                    this.showGeneral = true;
                    this.showSuitability = false;
                    this.showConsent = false;
                    this.showLearningStyle = false;
                    this.studentInfoView = true;
                    this.studentView = student;
                    this.studentService
                        .getAllFormsByID(student)
                        .then(function (forms) {
                        if (forms.status === "403") {
                            _this.consentView = null;
                            _this.learningStyleView = null;
                            _this.suitabilityView = null;
                        }
                        else {
                            _this.consentView = forms.consentForm[0];
                            _this.learningStyleView = forms.learningStyleForm[0];
                            _this.suitabilityView = forms.suitabilityForm[0];
                            _this.barChartData = [{ data: [_this.learningStyleView.hearing, _this.learningStyleView.seeing, _this.learningStyleView.doing] }];
                        }
                    })
                        .catch(function (error) { return _this.error = error; });
                };
                StudentManageComponent.prototype.overallStatus = function () {
                    this.studentInfoView = false;
                };
                StudentManageComponent.prototype.sectionBtnClicked = function (event, section) {
                    if (section === "general") {
                        this.showGeneral = true;
                        this.showSuitability = false;
                        this.showConsent = false;
                        this.showLearningStyle = false;
                    }
                    else if (section === "suitability") {
                        this.showGeneral = false;
                        this.showSuitability = true;
                        this.showConsent = false;
                        this.showLearningStyle = false;
                    }
                    else if (section === "consent") {
                        this.showGeneral = false;
                        this.showSuitability = false;
                        this.showConsent = true;
                        this.showLearningStyle = false;
                    }
                    else if (section === "learningStyle") {
                        this.showGeneral = false;
                        this.showSuitability = false;
                        this.showConsent = false;
                        this.showLearningStyle = true;
                    }
                };
                StudentManageComponent.prototype.goBack = function () {
                    window.history.back();
                };
                StudentManageComponent = __decorate([
                    core_1.Component({
                        selector: 'student-manage',
                        templateUrl: './app/components/student-manage/student-manage.component.html',
                        styleUrls: ['./app/components/student-manage/student-manage.component.css']
                    }),
                    __metadata("design:paramtypes", [router_1.Router, core_1.NgZone, student_service_1.StudentService, authentication_service_1.AuthService])
                ], StudentManageComponent);
                return StudentManageComponent;
            }());
            exports_1("StudentManageComponent", StudentManageComponent);
        }
    };
});

//# sourceMappingURL=student-manage.component.js.map
