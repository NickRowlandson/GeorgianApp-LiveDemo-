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
let SharedGuard = class SharedGuard {
    constructor(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    canActivate() {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userType = currentUser.userType;
        if (userType.indexOf('Instructor') >= 0 || userType.indexOf('Staff') >= 0 || userType.indexOf('Admin') >= 0) {
            return true;
        }
        else {
            // not logged in so redirect to login page
            this.router.navigate(['/dashboard']);
            return false;
        }
    }
};
SharedGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router, authentication_service_1.AuthService])
], SharedGuard);
exports.SharedGuard = SharedGuard;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvZ3VhcmRzL3NoYXJlZC5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyw0Q0FBc0Q7QUFDdEQsK0VBQWlFO0FBR2pFLElBQWEsV0FBVyxHQUF4QjtJQUVJLFlBQW9CLE1BQWMsRUFBVSxXQUF3QjtRQUFoRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFBSSxDQUFDO0lBRXpFLFdBQVc7UUFDUCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBRXBDLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0csT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0wsMENBQTBDO1lBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNyQyxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0wsQ0FBQztDQUNKLENBQUE7QUFoQlksV0FBVztJQUR2QixpQkFBVSxFQUFFO3FDQUdtQixlQUFNLEVBQXVCLG9DQUFXO0dBRjNELFdBQVcsQ0FnQnZCO0FBaEJZLGtDQUFXIiwiZmlsZSI6ImFwcC9ndWFyZHMvc2hhcmVkLmd1YXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIENhbkFjdGl2YXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFNoYXJlZEd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBjYW5BY3RpdmF0ZSgpIHtcclxuICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgICAgICB2YXIgdXNlclR5cGUgPSBjdXJyZW50VXNlci51c2VyVHlwZTtcclxuXHJcbiAgICAgICAgaWYgKHVzZXJUeXBlLmluZGV4T2YoJ0luc3RydWN0b3InKSA+PSAwIHx8IHVzZXJUeXBlLmluZGV4T2YoJ1N0YWZmJykgPj0gMCB8fCB1c2VyVHlwZS5pbmRleE9mKCdBZG1pbicpID49IDApIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBub3QgbG9nZ2VkIGluIHNvIHJlZGlyZWN0IHRvIGxvZ2luIHBhZ2VcclxuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKTtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19
