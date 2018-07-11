System.register(["@angular/core", "../../models/User", "@angular/router", "../../services/staff.service"], function (exports_1, context_1) {
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
    var core_1, User_1, router_1, staff_service_1, StaffDetailsComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (User_1_1) {
                User_1 = User_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (staff_service_1_1) {
                staff_service_1 = staff_service_1_1;
            }
        ],
        execute: function () {
            StaffDetailsComponent = /** @class */ (function () {
                function StaffDetailsComponent(staffService, route) {
                    this.staffService = staffService;
                    this.route = route;
                    this.newUser = false;
                    this.navigated = false; // true if navigated here
                    this.fselected = [];
                }
                StaffDetailsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    //SelectItem API with label-value pairs
                    this.authLevels = [
                        { label: 'Admin', value: 'Admin' },
                        { label: 'Staff', value: 'Staff' },
                        { label: 'Instructor', value: 'Instructor' }
                    ];
                    this.route.params.forEach(function (params) {
                        _this.id = params['id'];
                        if (_this.id === 'new') {
                            _this.newUser = true;
                            _this.user = new User_1.User();
                            _this.user.notify = true;
                        }
                        else {
                            _this.newUser = false;
                            _this.staffService
                                .getUser(_this.id)
                                .then(function (user) {
                                if (user.result === "error") {
                                    _this.displayErrorAlert(user);
                                }
                                else {
                                    _this.user = user;
                                    for (var _i = 0, _a = _this.user.userType.split(','); _i < _a.length; _i++) {
                                        var item = _a[_i];
                                        _this.fselected.push(item);
                                    }
                                }
                            });
                        }
                    });
                };
                StaffDetailsComponent.prototype.save = function () {
                    var _this = this;
                    if (this.newUser === true) {
                        if (this.user.email
                            && this.user.firstName
                            && this.user.lastName
                            && this.fselected.toString() !== '') {
                            this.user.userType = this.fselected.toString();
                            this.staffService
                                .saveNew(this.user)
                                .then(function (user) {
                                if (user.result === "error") {
                                    _this.displayErrorAlert(user);
                                }
                                else if (user.msg === "Username is already in use.") {
                                    swal('Username taken', 'Please enter a different username.', 'warning');
                                }
                                else if (user.msg === "Email is already in use.") {
                                    swal('Email in use', 'Please enter a different email.', 'warning');
                                }
                                else if (user.msg === "Incorrect email format.") {
                                    swal('Incorrect email format', 'Please enter a proper email.', 'warning');
                                }
                                else if (user.result === "success") {
                                    swal(user.title, user.msg, 'success');
                                    _this.goBack();
                                }
                                else {
                                    swal('Error', 'Something went wrong, please try again.', 'error');
                                }
                            })
                                .catch(function (error) { return _this.error = error; }); // TODO: Display error message
                        }
                        else {
                            swal('Missing Input', 'Please enter all information before saving.', 'warning');
                        }
                    }
                    else {
                        if (this.user.email
                            && this.fselected) {
                            this.user.userType = this.fselected.toString();
                            this.staffService
                                .update(this.user, this.id)
                                .then(function (user) {
                                if (user.result === "error") {
                                    _this.displayErrorAlert(user);
                                }
                                else if (user.msg === "Username is already in use.") {
                                    swal('Username taken', 'Please enter a different username.', 'warning');
                                }
                                else if (user.msg === "Email is already in use.") {
                                    swal('Email in use', 'Please enter a different email.', 'warning');
                                }
                                else if (user.msg === "Incorrect email format.") {
                                    swal('Incorrect email format', 'Please enter a proper email.', 'warning');
                                }
                                else if (user.result === "success") {
                                    swal(user.title, user.msg, 'success');
                                    _this.goBack();
                                }
                                else {
                                    swal('Error', 'Something went wrong, please try again.', 'error');
                                }
                            })
                                .catch(function (error) { return _this.error = error; }); // TODO: Display error message
                        }
                        else {
                            swal('Missing Input', 'Please enter all information before saving.', 'warning');
                        }
                    }
                };
                StaffDetailsComponent.prototype.displayErrorAlert = function (error) {
                    swal(error.title, error.msg, 'error');
                };
                StaffDetailsComponent.prototype.goBack = function () {
                    window.history.back();
                };
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", User_1.User)
                ], StaffDetailsComponent.prototype, "user", void 0);
                StaffDetailsComponent = __decorate([
                    core_1.Component({
                        selector: 'staff-edit',
                        templateUrl: './app/components/staff-details/staff-details.component.html',
                        styleUrls: ['./app/components/staff-details/staff-details.component.css']
                    }),
                    __metadata("design:paramtypes", [staff_service_1.StaffService, router_1.ActivatedRoute])
                ], StaffDetailsComponent);
                return StaffDetailsComponent;
            }());
            exports_1("StaffDetailsComponent", StaffDetailsComponent);
        }
    };
});

//# sourceMappingURL=staff-details.component.js.map
