System.register(["@angular/core", "@angular/router", "../../services/client.service", "../../services/authentication.service"], function (exports_1, context_1) {
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
    var core_1, router_1, client_service_1, authentication_service_1, HelpComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (client_service_1_1) {
                client_service_1 = client_service_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }
        ],
        execute: function () {
            HelpComponent = /** @class */ (function () {
                function HelpComponent(clientService, router, authService) {
                    this.clientService = clientService;
                    this.router = router;
                    this.authService = authService;
                    this.home = true;
                    this.login = false;
                    this.resetPass = false;
                    this.newClient = false;
                    this.manageClients = false;
                    this.createStudent = false;
                    this.manageStudents = false;
                    this.manageCourses = false;
                    this.assignStudentCourse = false;
                    this.caseNotes = false;
                    this.timetable = false;
                    this.consent = false;
                    this.learningStyle = false;
                    this.attendanceReport = false;
                    this.attendanceTaking = false;
                    this.manageStaff = false;
                }
                HelpComponent.prototype.open = function (page) {
                    this.home = false;
                    this.login = false;
                    this.resetPass = false;
                    this.newClient = false;
                    this.manageClients = false;
                    this.createStudent = false;
                    this.manageStudents = false;
                    this.manageCourses = false;
                    this.manageStaff = false;
                    this.assignStudentCourse = false;
                    this.caseNotes = false;
                    this.timetable = false;
                    this.consent = false;
                    this.learningStyle = false;
                    this.attendanceReport = false;
                    this.attendanceTaking = false;
                    switch (page) {
                        case 'home':
                            return this.home = true;
                        case 'login':
                            return this.login = true;
                        case 'resetPass':
                            return this.resetPass = true;
                        case 'newClient':
                            return this.newClient = true;
                        case 'manageClients':
                            return this.manageClients = true;
                        case 'createStudent':
                            return this.createStudent = true;
                        case 'manageStudents':
                            return this.manageStudents = true;
                        case 'manageStaff':
                            return this.manageStaff = true;
                        case 'manageCourses':
                            return this.manageCourses = true;
                        case 'assignStudentCourse':
                            return this.assignStudentCourse = true;
                        case 'timetable':
                            return this.timetable = true;
                        case 'consent':
                            return this.consent = true;
                        case 'learningStyle':
                            return this.learningStyle = true;
                        case 'attendanceReport':
                            return this.attendanceReport = true;
                        case 'attendanceTaking':
                            return this.attendanceTaking = true;
                        case 'caseNotes':
                            return this.caseNotes = true;
                        default:
                            return this.home = true;
                    }
                };
                HelpComponent.prototype.goBack = function () {
                    window.history.back();
                };
                HelpComponent = __decorate([
                    core_1.Component({
                        selector: 'help',
                        templateUrl: './app/components/help/help.component.html',
                        styleUrls: ['./app/components/help/help.component.css']
                    }),
                    __metadata("design:paramtypes", [client_service_1.ClientService, router_1.Router, authentication_service_1.AuthService])
                ], HelpComponent);
                return HelpComponent;
            }());
            exports_1("HelpComponent", HelpComponent);
        }
    };
});

//# sourceMappingURL=help.component.js.map
