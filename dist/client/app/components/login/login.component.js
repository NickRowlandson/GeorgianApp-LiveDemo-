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
let LoginComponent = class LoginComponent {
    constructor(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.model = {};
        this.loading = false;
        this.error = '';
    }
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }
    login() {
        this.loading = true;
        this.authenticationService
            .login(this.model.username, this.model.password)
            .then(result => {
            if (result === true) {
                this.router.navigate(['/']);
            }
            else {
                this.error = 'Username or password is incorrect';
                this.loading = false;
            }
        }).catch(error => console.log(error));
    }
    goToResetPass() {
        this.router.navigate(['/reset-password']);
    }
};
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: './app/components/login/login.component.html',
        styleUrls: ['./app/components/login/login.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        authentication_service_1.AuthService])
], LoginComponent);
exports.LoginComponent = LoginComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBa0Q7QUFDbEQsNENBQXlDO0FBQ3pDLGtGQUFvRTtBQVFwRSxJQUFhLGNBQWMsR0FBM0I7SUFLSSxZQUNZLE1BQWMsRUFDZCxxQkFBa0M7UUFEbEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBYTtRQU45QyxVQUFLLEdBQVEsRUFBRSxDQUFDO1FBQ2hCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsVUFBSyxHQUFHLEVBQUUsQ0FBQztJQUl1QyxDQUFDO0lBRW5ELFFBQVE7UUFDSixxQkFBcUI7UUFDckIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLHFCQUFxQjthQUN6QixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7YUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2IsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO2dCQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDL0I7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxtQ0FBbUMsQ0FBQztnQkFDakQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDeEI7UUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0NBQ04sQ0FBQTtBQS9CWSxjQUFjO0lBTjFCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsT0FBTztRQUNqQixXQUFXLEVBQUUsNkNBQTZDO1FBQzFELFNBQVMsRUFBRSxDQUFDLDRDQUE0QyxDQUFDO0tBQzVELENBQUM7cUNBUXNCLGVBQU07UUFDUyxvQ0FBVztHQVByQyxjQUFjLENBK0IxQjtBQS9CWSx3Q0FBYyIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2xvZ2luJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBtb2RlbDogYW55ID0ge307XHJcbiAgICBsb2FkaW5nID0gZmFsc2U7XHJcbiAgICBlcnJvciA9ICcnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBhdXRoZW50aWNhdGlvblNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICAvLyByZXNldCBsb2dpbiBzdGF0dXNcclxuICAgICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS5sb2dvdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2dpbigpIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlXHJcbiAgICAgICAgLmxvZ2luKHRoaXMubW9kZWwudXNlcm5hbWUsIHRoaXMubW9kZWwucGFzc3dvcmQpXHJcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nXSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSAnVXNlcm5hbWUgb3IgcGFzc3dvcmQgaXMgaW5jb3JyZWN0JztcclxuICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBnb1RvUmVzZXRQYXNzKCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3Jlc2V0LXBhc3N3b3JkJ10pO1xyXG4gICAgICB9XHJcbn1cclxuIl19
