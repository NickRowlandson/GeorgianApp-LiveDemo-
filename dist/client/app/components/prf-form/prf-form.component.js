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
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const router_2 = require("@angular/router");
const authentication_service_1 = require("../../services/authentication.service");
let PrfFormComponent = class PrfFormComponent {
    constructor(router, route, authService) {
        this.router = router;
        this.route = route;
        this.authService = authService;
    }
};
PrfFormComponent = __decorate([
    core_1.Component({
        selector: 'prfForm',
        templateUrl: './app/components/prf-form/prf-form.component.html',
        styleUrls: ['./app/components/prf-form/prf-form.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, router_2.ActivatedRoute, authentication_service_1.AuthService])
], PrfFormComponent);
exports.PrfFormComponent = PrfFormComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9wcmYtZm9ybS9wcmYtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBaUQ7QUFDakQsNENBQXlDO0FBQ3pDLDRDQUF5RDtBQUN6RCxrRkFBb0U7QUFRcEUsSUFBYSxnQkFBZ0IsR0FBN0I7SUFDRSxZQUFvQixNQUFjLEVBQVUsS0FBcUIsRUFBVSxXQUF3QjtRQUEvRSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUVuRyxDQUFDO0NBQ0YsQ0FBQTtBQUpZLGdCQUFnQjtJQU41QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFNBQVM7UUFDbkIsV0FBVyxFQUFFLG1EQUFtRDtRQUNoRSxTQUFTLEVBQUUsQ0FBQyxrREFBa0QsQ0FBQztLQUNsRSxDQUFDO3FDQUc0QixlQUFNLEVBQWlCLHVCQUFjLEVBQXVCLG9DQUFXO0dBRHhGLGdCQUFnQixDQUk1QjtBQUpZLDRDQUFnQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9wcmYtZm9ybS9wcmYtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3ByZkZvcm0nLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3ByZi1mb3JtL3ByZi1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3ByZi1mb3JtL3ByZi1mb3JtLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFByZkZvcm1Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xyXG5cclxuICB9XHJcbn1cclxuIl19
