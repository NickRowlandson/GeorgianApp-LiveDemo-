System.register(["@angular/core", "./services/authentication.service"], function (exports_1, context_1) {
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
    var core_1, authentication_service_1, AppComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }
        ],
        execute: function () {
            AppComponent = /** @class */ (function () {
                function AppComponent(authService) {
                    this.authService = authService;
                    this.title = 'Academic and Career Preparation';
                    this.currentUser = null;
                }
                AppComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.authService.loggedUser.subscribe(function (data) {
                        if (data) {
                            var username = data.replace(/['"]+/g, '');
                            _this.currentUser = username;
                        }
                        else {
                            _this.currentUser = null;
                        }
                    }, function (err) {
                        console.log(err);
                    });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: './app/app.html',
                        styleUrls: ['./app/app.component.css']
                    }),
                    __metadata("design:paramtypes", [authentication_service_1.AuthService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    };
});

//# sourceMappingURL=app.component.js.map
