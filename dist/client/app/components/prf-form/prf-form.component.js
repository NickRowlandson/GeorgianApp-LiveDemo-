System.register(["@angular/core", "@angular/router", "../../services/authentication.service"], function (exports_1, context_1) {
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
    var core_1, router_1, router_2, authentication_service_1, PrfFormComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }
        ],
        execute: function () {
            PrfFormComponent = /** @class */ (function () {
                function PrfFormComponent(router, route, authService) {
                    this.router = router;
                    this.route = route;
                    this.authService = authService;
                }
                PrfFormComponent = __decorate([
                    core_1.Component({
                        selector: 'prfForm',
                        templateUrl: './app/components/prf-form/prf-form.component.html',
                        styleUrls: ['./app/components/prf-form/prf-form.component.css']
                    }),
                    __metadata("design:paramtypes", [router_1.Router, router_2.ActivatedRoute, authentication_service_1.AuthService])
                ], PrfFormComponent);
                return PrfFormComponent;
            }());
            exports_1("PrfFormComponent", PrfFormComponent);
        }
    };
});

//# sourceMappingURL=prf-form.component.js.map
