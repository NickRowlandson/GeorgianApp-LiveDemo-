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
const authentication_service_1 = require("../services/authentication.service");
let StaffGuard = class StaffGuard {
    constructor(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    canActivate() {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userType = currentUser.userType;
        if (userType.indexOf('Staff') >= 0 || userType.indexOf('Admin') >= 0) {
            return true;
        }
        else {
            // not logged in so redirect to login page
            this.router.navigate(['/dashboard']);
            return false;
        }
    }
};
StaffGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router, authentication_service_1.AuthService])
], StaffGuard);
exports.StaffGuard = StaffGuard;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvZ3VhcmRzL3N0YWZmLmd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDRDQUFzRDtBQUN0RCwrRUFBaUU7QUFHakUsSUFBYSxVQUFVLEdBQXZCO0lBRUksWUFBb0IsTUFBYyxFQUFVLFdBQXdCO1FBQWhELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFJLENBQUM7SUFFekUsV0FBVztRQUNQLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7UUFFcEMsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwRSxPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCwwQ0FBMEM7WUFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQWhCWSxVQUFVO0lBRHRCLGlCQUFVLEVBQUU7cUNBR21CLGVBQU0sRUFBdUIsb0NBQVc7R0FGM0QsVUFBVSxDQWdCdEI7QUFoQlksZ0NBQVUiLCJmaWxlIjoiYXBwL2d1YXJkcy9zdGFmZi5ndWFyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBDYW5BY3RpdmF0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTdGFmZkd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBjYW5BY3RpdmF0ZSgpIHtcclxuICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgICAgICB2YXIgdXNlclR5cGUgPSBjdXJyZW50VXNlci51c2VyVHlwZTtcclxuXHJcbiAgICAgICAgaWYgKHVzZXJUeXBlLmluZGV4T2YoJ1N0YWZmJykgPj0gMCB8fCB1c2VyVHlwZS5pbmRleE9mKCdBZG1pbicpID49IDApIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBub3QgbG9nZ2VkIGluIHNvIHJlZGlyZWN0IHRvIGxvZ2luIHBhZ2VcclxuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKTtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
