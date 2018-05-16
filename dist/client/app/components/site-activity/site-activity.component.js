System.register(["@angular/core", "@angular/router", "../../services/staff.service"], function (exports_1, context_1) {
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
    var core_1, router_1, staff_service_1, SiteActivityComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (staff_service_1_1) {
                staff_service_1 = staff_service_1_1;
            }
        ],
        execute: function () {
            SiteActivityComponent = /** @class */ (function () {
                function SiteActivityComponent(router, StaffService) {
                    this.router = router;
                    this.StaffService = StaffService;
                }
                SiteActivityComponent.prototype.ngOnInit = function () {
                    swal({
                        title: 'Loading...',
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    this.getSiteActivity();
                    //this.getTimetables();
                };
                SiteActivityComponent.prototype.getSiteActivity = function () {
                    var _this = this;
                    this.StaffService
                        .getSiteActivity()
                        .then(function (results) {
                        if (results.result === 'error') {
                            _this.activity = null;
                            _this.displayErrorAlert(results);
                        }
                        else {
                            _this.activity = results;
                            swal.close();
                        }
                    })
                        .catch(function (error) { return console.log("Error - Get activity: " + error); });
                };
                SiteActivityComponent.prototype.onPrint = function () {
                    window.print();
                };
                SiteActivityComponent.prototype.displayErrorAlert = function (error) {
                    swal(error.title, error.msg, 'error');
                };
                SiteActivityComponent.prototype.goBack = function () {
                    window.history.back();
                };
                SiteActivityComponent = __decorate([
                    core_1.Component({
                        selector: 'waitList',
                        templateUrl: './app/components/site-activity/site-activity.component.html',
                        styleUrls: ['./app/components/site-activity/site-activity.component.css']
                    }),
                    __metadata("design:paramtypes", [router_1.Router, staff_service_1.StaffService])
                ], SiteActivityComponent);
                return SiteActivityComponent;
            }());
            exports_1("SiteActivityComponent", SiteActivityComponent);
        }
    };
});

//# sourceMappingURL=site-activity.component.js.map
