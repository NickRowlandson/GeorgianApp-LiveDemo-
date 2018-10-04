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
const authentication_service_1 = require("../../services/authentication.service");
let NotFoundComponent = class NotFoundComponent {
    constructor(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.error = '';
    }
    ngOnInit() {
    }
};
NotFoundComponent = __decorate([
    core_1.Component({
        selector: 'notFound',
        templateUrl: './app/components/login/login.component.html',
        styleUrls: ['./app/components/login/login.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, authentication_service_1.AuthService])
], NotFoundComponent);
exports.NotFoundComponent = NotFoundComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9ub3QtZm91bmQvbm90LWZvdW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUFrRDtBQUNsRCw0Q0FBeUM7QUFDekMsa0ZBQW9FO0FBUXBFLElBQWEsaUJBQWlCLEdBQTlCO0lBR0ksWUFBb0IsTUFBYyxFQUFVLHFCQUFrQztRQUExRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFhO1FBRjlFLFVBQUssR0FBRyxFQUFFLENBQUM7SUFFdUUsQ0FBQztJQUVuRixRQUFRO0lBRVIsQ0FBQztDQUVKLENBQUE7QUFUWSxpQkFBaUI7SUFON0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFdBQVcsRUFBRSw2Q0FBNkM7UUFDMUQsU0FBUyxFQUFFLENBQUMsNENBQTRDLENBQUM7S0FDNUQsQ0FBQztxQ0FLOEIsZUFBTSxFQUFpQyxvQ0FBVztHQUhyRSxpQkFBaUIsQ0FTN0I7QUFUWSw4Q0FBaUIiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvbm90LWZvdW5kL25vdC1mb3VuZC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25vdEZvdW5kJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBOb3RGb3VuZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBlcnJvciA9ICcnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aGVudGljYXRpb25TZXJ2aWNlOiBBdXRoU2VydmljZSkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=
