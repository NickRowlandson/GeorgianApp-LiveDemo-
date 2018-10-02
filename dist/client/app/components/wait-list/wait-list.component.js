System.register(["@angular/core", "@angular/router", "../../services/course.service", "../../services/student.service", "../../services/client.service", "../../services/staff.service"], function (exports_1, context_1) {
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
    var core_1, router_1, course_service_1, student_service_1, client_service_1, staff_service_1, WaitListComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (course_service_1_1) {
                course_service_1 = course_service_1_1;
            },
            function (student_service_1_1) {
                student_service_1 = student_service_1_1;
            },
            function (client_service_1_1) {
                client_service_1 = client_service_1_1;
            },
            function (staff_service_1_1) {
                staff_service_1 = staff_service_1_1;
            }
        ],
        execute: function () {
            WaitListComponent = class WaitListComponent {
                constructor(router, CourseService, StudentService, ClientService, StaffService) {
                    this.router = router;
                    this.CourseService = CourseService;
                    this.StudentService = StudentService;
                    this.ClientService = ClientService;
                    this.StaffService = StaffService;
                    this.users = [];
                    this.usersWaiting = [];
                    this.showForm = false;
                }
                ngOnInit() {
                    swal({
                        title: 'Loading...',
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    this.getStudents();
                    //this.getTimetables();
                }
                getStudents() {
                    this.StudentService
                        .getStudents()
                        .then(students => {
                        if (students.result === 'error') {
                            this.students = null;
                            this.displayErrorAlert(students);
                        }
                        else {
                            this.students = students;
                            for (let student of this.students) {
                                student.fullName = student.firstName + " " + student.lastName;
                                this.users.push(student);
                            }
                            this.getClients();
                        }
                    })
                        .catch(error => console.log("Error - Get students: " + error));
                }
                getClients() {
                    this.ClientService
                        .getClients()
                        .then(clients => {
                        if (clients.result === 'error') {
                            this.clients = null;
                            this.displayErrorAlert(clients);
                        }
                        else {
                            this.clients = clients.clients;
                            for (let client of this.clients) {
                                client.fullName = client.firstName + " " + client.lastName;
                                this.users.push(client);
                            }
                            this.getCourses();
                        }
                    })
                        .catch(error => console.log("Error - Get clients: " + error));
                }
                getCourses() {
                    this.CourseService
                        .getCourseTypes()
                        .then(result => {
                        if (result.result === 'error') {
                            this.courseTypes = null;
                            this.displayErrorAlert(result);
                        }
                        else {
                            this.courseTypes = result;
                            this.getWaitList();
                        }
                    })
                        .catch(error => console.log("Error - Get courses: " + error));
                }
                getWaitList() {
                    this.usersWaiting = [];
                    this.CourseService
                        .getWaitList()
                        .then(result => {
                        if (result.result === 'error') {
                            this.waitList = null;
                            this.displayErrorAlert(result);
                        }
                        else {
                            this.waitList = result;
                            for (let item of this.waitList) {
                                var user = this.users.filter(x => x.userID === item.userID);
                                //student[0].fullName = student[0].firstName + " " + student[0].lastName;
                                // student[0].courseID = course[0].courseID;
                                // student[0].professorId = course[0].professorId;
                                if (user[0] != null) {
                                    if (user[0].studentID != null) {
                                        var userType = "Student";
                                    }
                                    else {
                                        var userType = "Client";
                                    }
                                    user[0].courseName = item.courseType;
                                    var userRecord = {
                                        id: user[0].userID,
                                        userType: userType,
                                        fullName: user[0].fullName,
                                        courseType: item.courseType,
                                        date: item.date
                                    };
                                    this.usersWaiting.push(userRecord);
                                }
                            }
                            this.getTimetables();
                        }
                    })
                        .catch(error => console.log("Error - Get wait list: " + error));
                }
                getTimetables() {
                    this.StudentService
                        .getTimetables()
                        .then(result => {
                        if (result.result === 'error') {
                            this.timetables = null;
                            this.displayErrorAlert(result);
                        }
                        else {
                            this.timetables = result;
                            swal.close();
                        }
                    })
                        .catch(error => console.log("Error - Get timetables: " + error));
                }
                showWaitListForm() {
                    this.showForm = true;
                }
                addStudentToWaitList() {
                    var CurrentDate = moment().format();
                    if (this.selectedUser == null || this.selectedCourseType == null) {
                        swal('Invalid Input', 'Please select both a student and a course.', 'warning');
                    }
                    else {
                        swal({
                            title: 'Saving...',
                            allowOutsideClick: false
                        });
                        swal.showLoading();
                        this.courseWaitList = null;
                        this.showForm = false;
                        this.CourseService
                            .addToWaitList(this.selectedUser, this.selectedCourseType, CurrentDate)
                            .then(result => {
                            if (result.result === 'error') {
                                this.displayErrorAlert(result);
                            }
                            else if (result.result === 'success') {
                                this.getWaitList();
                                swal.close();
                            }
                            else {
                                swal('Error', 'Something went wrong while adding student to wait list.', 'error');
                            }
                        })
                            .catch(error => console.log("Error - Add student to wait list: " + error));
                    }
                }
                removeFromWaitList(data) {
                    this.CourseService
                        .removeFromWaitList(data.id, data.courseType)
                        .then(result => {
                        this.getWaitList();
                        swal('Removed from ' + data.courseType, '' + data.fullName + ' has been succesfully removed from the ' + data.courseType + ' wait list.', 'success');
                    }).catch(error => error);
                }
                closeMenu() {
                    this.showForm = false;
                }
                gotoStudentEnrollment(data, event) {
                    this.router.navigate(['/student-enrollment', data.courseType, data.id]);
                }
                viewCourseWaitList(data) {
                    this.viewingCourse = data;
                    this.usersWaiting = [];
                    this.courseWaitList = this.waitList.filter(x => x.courseType === data.courseType);
                    for (let item of this.courseWaitList) {
                        var user = this.users.filter(x => x.userID === item.userID);
                        if (user[0] != null) {
                            user[0].fullName = user[0].firstName + " " + user[0].lastName;
                            if (user[0].studentID != null) {
                                var userType = "Student";
                            }
                            else {
                                var userType = "Client";
                            }
                            var userRecord = {
                                id: user[0].userID,
                                fullName: user[0].fullName,
                                userType: userType,
                                courseType: item.courseType,
                                date: item.date
                            };
                            this.usersWaiting.push(userRecord);
                        }
                    }
                }
                onPrint() {
                    window.print();
                }
                displayErrorAlert(error) {
                    swal(error.title, error.msg, 'error');
                }
                goBack() {
                    window.history.back();
                }
            };
            WaitListComponent = __decorate([
                core_1.Component({
                    selector: 'waitList',
                    templateUrl: './app/components/wait-list/wait-list.component.html',
                    styleUrls: ['./app/components/wait-list/wait-list.component.css']
                }),
                __metadata("design:paramtypes", [router_1.Router, course_service_1.CourseService, student_service_1.StudentService, client_service_1.ClientService, staff_service_1.StaffService])
            ], WaitListComponent);
            exports_1("WaitListComponent", WaitListComponent);
        }
    };
});

//# sourceMappingURL=wait-list.component.js.map
