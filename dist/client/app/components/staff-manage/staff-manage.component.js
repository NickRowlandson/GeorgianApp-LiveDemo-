System.register(["@angular/core", "../../services/staff.service", "@angular/router"], function (exports_1, context_1) {
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
    var core_1, staff_service_1, router_1, StaffManageComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (staff_service_1_1) {
                staff_service_1 = staff_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }
        ],
        execute: function () {
            StaffManageComponent = /** @class */ (function () {
                function StaffManageComponent(router, staffService) {
                    this.router = router;
                    this.staffService = staffService;
                }
                StaffManageComponent.prototype.ngOnInit = function () {
                    this.getUsers();
                };
                StaffManageComponent.prototype.getUsers = function () {
                    var _this = this;
                    this.staffService
                        .getUsers()
                        .then(function (users) {
                        if (users.result === "error") {
                            _this.users = null;
                            _this.displayErrorAlert(users);
                        }
                        else {
                            _this.users = users;
                            for (var _i = 0, _a = _this.users; _i < _a.length; _i++) {
                                var user = _a[_i];
                                user.fullName = user.firstName + " " + user.lastName;
                            }
                            _this.usersBackup = _this.users;
                            _this.usersLength = users.length;
                            _this.updateStats();
                        }
                    })
                        .catch(function (error) { return _this.error = error; });
                };
                StaffManageComponent.prototype.gotoEdit = function (user, event) {
                    this.router.navigate(['/staff-details', user.userID]);
                };
                StaffManageComponent.prototype.addUser = function () {
                    this.router.navigate(['/staff-details', 'new']);
                };
                StaffManageComponent.prototype.deleteAlert = function (user, event) {
                    var _this = this;
                    swal({
                        title: 'Delete ' + user.firstName + ' ' + user.lastName + '?',
                        text: "You won't be able to revert this!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete!'
                    }).then(function (isConfirm) {
                        if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                            console.log(isConfirm.dismiss);
                        }
                        else if (isConfirm) {
                            _this.deleteUser(user, event);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                };
                StaffManageComponent.prototype.deleteUser = function (user, event) {
                    var _this = this;
                    event.stopPropagation();
                    this.staffService
                        .delete(user)
                        .then(function (res) {
                        console.log(res);
                        if (res.result === "error") {
                            _this.displayErrorAlert(res);
                        }
                        else if (res.result === "success") {
                            _this.users = _this.users.filter(function (h) { return h !== user; });
                            _this.usersBackup = _this.users;
                            _this.usersLength = _this.users.length;
                            _this.updateStats();
                            swal('Deleted!', 'User has been deleted.', 'success');
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'error');
                        }
                    })
                        .catch(function (error) { return _this.error = error; });
                };
                StaffManageComponent.prototype.updateStats = function () {
                    this.adminNumber = this.users.filter(function (x) { return x.userType.indexOf("Admin") !== -1; });
                    this.adminNumber = this.adminNumber.length;
                    this.staffNumber = this.users.filter(function (x) { return x.userType.indexOf("Staff") !== -1; });
                    this.staffNumber = this.staffNumber.length;
                    this.instructorNumber = this.users.filter(function (x) { return x.userType.indexOf("Instructor") !== -1; });
                    this.instructorNumber = this.instructorNumber.length;
                };
                StaffManageComponent.prototype.filterStaff = function (userType) {
                    this.users = this.usersBackup;
                    if (userType === 'total') {
                        this.users = this.usersBackup;
                    }
                    else {
                        this.users = this.users.filter(function (x) { return x.userType.indexOf(userType) !== -1; });
                    }
                };
                StaffManageComponent.prototype.displayErrorAlert = function (error) {
                    swal(error.title, error.msg, 'error');
                };
                StaffManageComponent.prototype.goBack = function () {
                    window.history.back();
                };
                StaffManageComponent = __decorate([
                    core_1.Component({
                        selector: 'staff-manage',
                        templateUrl: './app/components/staff-manage/staff-manage.component.html',
                        styleUrls: ['./app/components/staff-manage/staff-manage.component.css']
                    }),
                    __metadata("design:paramtypes", [router_1.Router, staff_service_1.StaffService])
                ], StaffManageComponent);
                return StaffManageComponent;
            }());
            exports_1("StaffManageComponent", StaffManageComponent);
        }
    };
});

//# sourceMappingURL=staff-manage.component.js.map
