System.register(["@angular/core", "../../services/staff.service", "../../services/student.service", "@angular/router"], function (exports_1, context_1) {
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
    var core_1, staff_service_1, student_service_1, router_1, StaffManageComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (staff_service_1_1) {
                staff_service_1 = staff_service_1_1;
            },
            function (student_service_1_1) {
                student_service_1 = student_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }
        ],
        execute: function () {
            StaffManageComponent = class StaffManageComponent {
                constructor(router, staffService, studentService) {
                    this.router = router;
                    this.staffService = staffService;
                    this.studentService = studentService;
                }
                ngOnInit() {
                    swal({
                        title: 'Loading...',
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    this.getUsers();
                }
                getUsers() {
                    this.staffService
                        .getUsers()
                        .then(users => {
                        if (users.result === "error") {
                            this.users = null;
                            this.displayErrorAlert(users);
                        }
                        else {
                            this.users = users;
                            for (let user of this.users) {
                                user.fullName = user.firstName + " " + user.lastName;
                            }
                            this.usersBackup = this.users;
                            this.usersLength = users.length;
                            this.updateStats();
                        }
                    })
                        .catch(error => this.error = error);
                }
                runAttendanceCheck() {
                    this.studentService
                        .manualAttendanceCheck()
                        .then(result => {
                        if (result.result === "error") {
                            this.displayErrorAlert(result);
                        }
                        else {
                            swal(result.title, result.msg, 'success');
                        }
                    })
                        .catch(error => this.error = error);
                }
                gotoEdit(user, event) {
                    this.router.navigate(['/staff-details', user.userID]);
                }
                addUser() {
                    this.router.navigate(['/staff-details', 'new']);
                }
                deleteAlert(user, event) {
                    swal({
                        title: 'Delete ' + user.firstName + ' ' + user.lastName + '?',
                        text: "You won't be able to revert this!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete!'
                    }).then(isConfirm => {
                        if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                            console.log(isConfirm.dismiss);
                        }
                        else if (isConfirm) {
                            this.deleteUser(user, event);
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }
                deleteUser(user, event) {
                    event.stopPropagation();
                    this.staffService
                        .delete(user)
                        .then(res => {
                        console.log(res);
                        if (res.result === "error") {
                            this.displayErrorAlert(res);
                        }
                        else if (res.result === "success") {
                            this.users = this.users.filter(h => h !== user);
                            this.usersBackup = this.users;
                            this.usersLength = this.users.length;
                            this.updateStats();
                            swal('Deleted!', 'User has been deleted.', 'success');
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'error');
                        }
                    })
                        .catch(error => this.error = error);
                }
                updateStats() {
                    this.adminNumber = this.users.filter(x => x.userType.indexOf("Admin") !== -1);
                    this.adminNumber = this.adminNumber.length;
                    this.staffNumber = this.users.filter(x => x.userType.indexOf("Staff") !== -1);
                    this.staffNumber = this.staffNumber.length;
                    this.instructorNumber = this.users.filter(x => x.userType.indexOf("Instructor") !== -1);
                    this.instructorNumber = this.instructorNumber.length;
                    swal.close();
                }
                filterStaff(userType) {
                    this.users = this.usersBackup;
                    if (userType === 'total') {
                        this.users = this.usersBackup;
                    }
                    else {
                        this.users = this.users.filter(x => x.userType.indexOf(userType) !== -1);
                    }
                }
                displayErrorAlert(error) {
                    swal(error.title, error.msg, 'error');
                }
                goBack() {
                    window.history.back();
                }
            };
            StaffManageComponent = __decorate([
                core_1.Component({
                    selector: 'staff-manage',
                    templateUrl: './app/components/staff-manage/staff-manage.component.html',
                    styleUrls: ['./app/components/staff-manage/staff-manage.component.css']
                }),
                __metadata("design:paramtypes", [router_1.Router, staff_service_1.StaffService, student_service_1.StudentService])
            ], StaffManageComponent);
            exports_1("StaffManageComponent", StaffManageComponent);
        }
    };
});

//# sourceMappingURL=staff-manage.component.js.map
