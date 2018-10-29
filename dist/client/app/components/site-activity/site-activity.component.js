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
    var core_1, router_1, staff_service_1, SiteActivityComponent;
    var __moduleName = context_1 && context_1.id;
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
            SiteActivityComponent = class SiteActivityComponent {
                constructor(router, StaffService) {
                    this.router = router;
                    this.StaffService = StaffService;
                }
                ngOnInit() {
                    swal({
                        title: 'Loading...',
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    this.getSiteActivity();
                    //this.getTimetables();
                }
                getSiteActivity() {
                    this.StaffService
                        .getSiteActivity()
                        .then(results => {
                        if (results.result === 'error') {
                            this.activity = null;
                            this.displayErrorAlert(results);
                        }
                        else {
                            this.activity = results;
                            swal.close();
                        }
                    })
                        .catch(error => console.log("Error - Get activity: " + error));
                }
                onPrint() {
                    window.print();
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
            SiteActivityComponent = __decorate([
                core_1.Component({
                    selector: 'waitList',
                    templateUrl: './app/components/site-activity/site-activity.component.html',
                    styleUrls: ['./app/components/site-activity/site-activity.component.css']
                }),
                __metadata("design:paramtypes", [router_1.Router, staff_service_1.StaffService])
            ], SiteActivityComponent);
            exports_1("SiteActivityComponent", SiteActivityComponent);
        }
    };
});

//# sourceMappingURL=site-activity.component.js.map
