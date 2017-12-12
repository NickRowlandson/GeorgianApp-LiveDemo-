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
    var core_1, User_1, router_1, staff_service_1, StaffEditComponent;
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
            StaffEditComponent = /** @class */ (function () {
                function StaffEditComponent(staffService, route) {
                    this.staffService = staffService;
                    this.route = route;
                    this.newUser = false;
                    this.navigated = false; // true if navigated here
                }
                StaffEditComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.route.params.forEach(function (params) {
                        var id = params['id'];
                        if (id === 'new') {
                            _this.newUser = true;
                            _this.user = new User_1.User();
                        }
                        else {
                            _this.newUser = false;
                            _this.staffService.getUser(id).then(function (user) { return _this.user = user; });
                        }
                    });
                };
                StaffEditComponent.prototype.save = function () {
                    var _this = this;
                    if (this.user.email
                        && this.user.firstName
                        && this.user.lastName
                        && this.user.password
                        && this.user.username
                        && this.user.authLevel) {
                        this.staffService
                            .save(this.user)
                            .then(function (user) {
                            if (user.error === "username in use") {
                                swal('Username taken', 'Please enter a differnet username.', 'warning');
                            }
                            else if (user.error === "incorrect email format") {
                                swal('Incorrect email format', 'Please enter a proper email.', 'warning');
                            }
                            else if (user.success === "success") {
                                _this.goBack();
                            }
                            else {
                                _this.user = user; // saved user, w/ id if new
                                _this.goBack();
                            }
                        })
                            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
                    }
                    else {
                        swal('Missing Input', 'Please enter all information before saving.', 'warning');
                    }
                };
                StaffEditComponent.prototype.goBack = function () {
                    window.history.back();
                };
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", User_1.User)
                ], StaffEditComponent.prototype, "user", void 0);
                StaffEditComponent = __decorate([
                    core_1.Component({
                        selector: 'staff-edit',
                        templateUrl: './app/components/staff-edit/staff-edit.component.html',
                        styleUrls: ['./app/components/staff-edit/staff-edit.component.css']
                    }),
                    __metadata("design:paramtypes", [staff_service_1.StaffService, router_1.ActivatedRoute])
                ], StaffEditComponent);
                return StaffEditComponent;
            }());
            exports_1("StaffEditComponent", StaffEditComponent);
        }
    };
});

//# sourceMappingURL=staff-edit.component.js.map
