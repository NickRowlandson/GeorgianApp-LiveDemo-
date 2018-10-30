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
let InstructorGuard = class InstructorGuard {
    constructor(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    canActivate() {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userType = currentUser.userType;
        if (userType.indexOf('Instructor') >= 0 || userType.indexOf('Admin') >= 0) {
            return true;
        }
        else {
            // not logged in so redirect to login page
            this.router.navigate(['/dashboard']);
            return false;
        }
    }
};
InstructorGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router, authentication_service_1.AuthService])
], InstructorGuard);
exports.InstructorGuard = InstructorGuard;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvZ3VhcmRzL2luc3RydWN0b3IuZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBMkM7QUFDM0MsNENBQXNEO0FBQ3RELCtFQUFpRTtBQUdqRSxJQUFhLGVBQWUsR0FBNUI7SUFFSSxZQUFvQixNQUFjLEVBQVUsV0FBd0I7UUFBaEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUksQ0FBQztJQUV6RSxXQUFXO1FBQ1AsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUVwQyxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3pFLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLDBDQUEwQztZQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDckMsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNMLENBQUM7Q0FDSixDQUFBO0FBaEJZLGVBQWU7SUFEM0IsaUJBQVUsRUFBRTtxQ0FHbUIsZUFBTSxFQUF1QixvQ0FBVztHQUYzRCxlQUFlLENBZ0IzQjtBQWhCWSwwQ0FBZSIsImZpbGUiOiJhcHAvZ3VhcmRzL2luc3RydWN0b3IuZ3VhcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgQ2FuQWN0aXZhdGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSW5zdHJ1Y3Rvckd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBjYW5BY3RpdmF0ZSgpIHtcclxuICAgICAgICB2YXIgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgICAgICB2YXIgdXNlclR5cGUgPSBjdXJyZW50VXNlci51c2VyVHlwZTtcclxuXHJcbiAgICAgICAgaWYgKHVzZXJUeXBlLmluZGV4T2YoJ0luc3RydWN0b3InKSA+PSAwIHx8IHVzZXJUeXBlLmluZGV4T2YoJ0FkbWluJykgPj0gMCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIG5vdCBsb2dnZWQgaW4gc28gcmVkaXJlY3QgdG8gbG9naW4gcGFnZVxyXG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=
