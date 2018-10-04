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
let ClientGuard = class ClientGuard {
    constructor(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    canActivate() {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userType = currentUser.userType;
        if (userType === "Client" || userType.indexOf('Admin') >= 0) {
            return true;
        }
        else {
            // not logged in so redirect to login page
            this.router.navigate(['/dashboard']);
            return false;
        }
    }
};
ClientGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router, authentication_service_1.AuthService])
], ClientGuard);
exports.ClientGuard = ClientGuard;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvZ3VhcmRzL2NsaWVudC5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyw0Q0FBc0Q7QUFDdEQsK0VBQWlFO0FBR2pFLElBQWEsV0FBVyxHQUF4QjtJQUVJLFlBQW9CLE1BQWMsRUFBVSxXQUF3QjtRQUFoRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFBSSxDQUFDO0lBRXpFLFdBQVc7UUFDUCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBRXBDLElBQUksUUFBUSxLQUFLLFFBQVEsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMzRCxPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCwwQ0FBMEM7WUFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQWhCWSxXQUFXO0lBRHZCLGlCQUFVLEVBQUU7cUNBR21CLGVBQU0sRUFBdUIsb0NBQVc7R0FGM0QsV0FBVyxDQWdCdkI7QUFoQlksa0NBQVciLCJmaWxlIjoiYXBwL2d1YXJkcy9jbGllbnQuZ3VhcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgQ2FuQWN0aXZhdGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ2xpZW50R3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIGNhbkFjdGl2YXRlKCkge1xyXG4gICAgICAgIHZhciBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgICAgIHZhciB1c2VyVHlwZSA9IGN1cnJlbnRVc2VyLnVzZXJUeXBlO1xyXG5cclxuICAgICAgICBpZiAodXNlclR5cGUgPT09IFwiQ2xpZW50XCIgfHwgdXNlclR5cGUuaW5kZXhPZignQWRtaW4nKSA+PSAwKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gbm90IGxvZ2dlZCBpbiBzbyByZWRpcmVjdCB0byBsb2dpbiBwYWdlXHJcbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
