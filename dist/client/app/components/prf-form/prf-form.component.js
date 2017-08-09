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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var authentication_service_1 = require("../../services/authentication.service");
var PrfFormComponent = (function () {
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
exports.PrfFormComponent = PrfFormComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9wcmYtZm9ybS9wcmYtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBaUQ7QUFDakQsMENBQXlDO0FBQ3pDLDBDQUF5RDtBQUN6RCxnRkFBb0U7QUFRcEU7SUFDRSwwQkFBb0IsTUFBYyxFQUFVLEtBQXFCLEVBQVUsV0FBd0I7UUFBL0UsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFFbkcsQ0FBQztJQUhVLGdCQUFnQjtRQU41QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLG1EQUFtRDtZQUNoRSxTQUFTLEVBQUUsQ0FBQyxrREFBa0QsQ0FBQztTQUNsRSxDQUFDO3lDQUc0QixlQUFNLEVBQWlCLHVCQUFjLEVBQXVCLG9DQUFXO09BRHhGLGdCQUFnQixDQUk1QjtJQUFELHVCQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksNENBQWdCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3ByZi1mb3JtL3ByZi1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncHJmRm9ybScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvcHJmLWZvcm0vcHJmLWZvcm0uY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvcHJmLWZvcm0vcHJmLWZvcm0uY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgUHJmRm9ybUNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XHJcblxyXG4gIH1cclxufVxyXG4iXX0=
