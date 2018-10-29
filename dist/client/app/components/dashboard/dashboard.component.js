System.register(["@angular/core", "@angular/router", "../../services/authentication.service", "../../services/client.service", "../../services/student.service"], function (exports_1, context_1) {
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
    var core_1, router_1, authentication_service_1, client_service_1, student_service_1, DashboardComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (client_service_1_1) {
                client_service_1 = client_service_1_1;
            },
            function (student_service_1_1) {
                student_service_1 = student_service_1_1;
            }
        ],
        execute: function () {
            DashboardComponent = class DashboardComponent {
                constructor(router, authService, clientService, studentService) {
                    this.router = router;
                    this.authService = authService;
                    this.clientService = clientService;
                    this.studentService = studentService;
                    //variables used to toggle dahsboard items
                    this.clientStatus = false;
                    this.manageStudents = false;
                    this.manageStaff = false;
                    this.suitability = false;
                    this.consent = false;
                    this.manageCourses = false;
                    this.caseNotes = false;
                    this.learningStyle = false;
                    this.maesdprf = false;
                    this.timetable = false;
                    this.attendanceList = false;
                    this.attendanceReport = false;
                    this.files = false;
                    this.waitList = false;
                    this.siteActivity = false;
                }
                ngOnInit() {
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    if (!currentUser.active) {
                        this.router.navigate(['/reset-password']);
                    }
                    else {
                        var userType = currentUser.userType;
                        var userID = currentUser.userID;
                        this.checkAuth(userType, userID);
                        this.consentForm = true;
                        this.learningStyleForm = true;
                    }
                }
                checkAuth(userType, userID) {
                    this.userType = userType;
                    if (userType.indexOf('Admin') >= 0) {
                        this.clientStatus = true;
                        this.manageStudents = true;
                        this.manageStaff = true;
                        this.suitability = true;
                        this.caseNotes = true;
                        this.manageCourses = true;
                        this.attendanceReport = true;
                        this.attendanceList = true;
                        this.timetable = true;
                        this.consent = true;
                        this.learningStyle = true;
                        this.files = true;
                        this.waitList = true;
                        this.siteActivity = true;
                    }
                    if (userType.indexOf('Staff') >= 0) {
                        this.clientStatus = true;
                        this.manageStudents = true;
                        this.suitability = true;
                        this.timetable = true;
                        this.caseNotes = true;
                        this.manageCourses = true;
                        this.attendanceReport = true;
                        this.files = true;
                        this.waitList = true;
                        this.siteActivity = true;
                    }
                    if (userType.indexOf('Instructor') >= 0) {
                        this.attendanceList = true;
                        this.attendanceReport = true;
                        this.timetable = true;
                        this.caseNotes = true;
                    }
                    if (userType === 'Student') {
                        this.timetable = true;
                        this.consent = true;
                        this.learningStyle = true;
                        this.checkFormStatus(userType, userID);
                    }
                    if (userType === 'Client') {
                        this.consent = true;
                        this.learningStyle = true;
                        //this.maesdprf = true;
                        this.checkFormStatus(userType, userID);
                    }
                }
                checkFormStatus(type, userID) {
                    swal({
                        title: 'Loading...'
                    });
                    swal.showLoading();
                    if (type === 'Client') {
                        this.clientService
                            .getClient(userID)
                            .then(object => {
                            if (object.result === "error") {
                                this.client = null;
                                this.displayErrorAlert(object);
                            }
                            else {
                                this.client = object[0].firstName;
                                this.consentForm = object[0].consent;
                                this.learningStyleForm = object[0].learningStyle;
                                swal.close();
                            }
                        })
                            .catch(error => console.log(error));
                    }
                    else if (type === 'Student') {
                        this.studentService
                            .getStudent(userID)
                            .then(object => {
                            if (object.result === "error") {
                                this.student = null;
                                this.displayErrorAlert(object);
                            }
                            else {
                                this.student = object.firstName;
                                this.consentForm = object.consent;
                                this.learningStyleForm = object.learningStyle;
                                swal.close();
                            }
                        })
                            .catch(error => console.log(error));
                    }
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
            };
            DashboardComponent = __decorate([
                core_1.Component({
                    selector: 'dashboard',
                    templateUrl: './app/components/dashboard/dashboard.component.html',
                    styleUrls: ['./app/components/dashboard/dashboard.component.css']
                }),
                __metadata("design:paramtypes", [router_1.Router, authentication_service_1.AuthService, client_service_1.ClientService, student_service_1.StudentService])
            ], DashboardComponent);
            exports_1("DashboardComponent", DashboardComponent);
        }
    };
});

//# sourceMappingURL=dashboard.component.js.map
