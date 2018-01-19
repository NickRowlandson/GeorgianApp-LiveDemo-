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
var User_1 = require("../../models/User");
var router_1 = require("@angular/router");
var staff_service_1 = require("../../services/staff.service");
var StaffDetailsComponent = /** @class */ (function () {
    function StaffDetailsComponent(staffService, route) {
        this.staffService = staffService;
        this.route = route;
        this.newUser = false;
        this.navigated = false; // true if navigated here
        this.fselected = [];
    }
    StaffDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        //SelectItem API with label-value pairs
        this.authLevels = [
            { label: 'Admin', value: 'Admin' },
            { label: 'Staff', value: 'Staff' },
            { label: 'Instructor', value: 'Instructor' }
        ];
        this.route.params.forEach(function (params) {
            var id = params['id'];
            if (id === 'new') {
                _this.newUser = true;
                _this.user = new User_1.User();
            }
            else {
                _this.newUser = false;
                console.log(_this.fselected);
                _this.staffService.getUser(id).then(function (user) {
                    _this.user = user;
                    for (var _i = 0, _a = _this.user.userType.split(','); _i < _a.length; _i++) {
                        var item = _a[_i];
                        _this.fselected.push(item);
                        console.log(_this.fselected);
                    }
                    console.log(_this.user);
                });
            }
        });
    };
    StaffDetailsComponent.prototype.save = function () {
        var _this = this;
        if (this.newUser === true) {
            if (this.user.email
                && this.user.firstName
                && this.user.lastName
                && this.fselected) {
                this.user.userType = this.fselected.toString();
                this.staffService
                    .save(this.user)
                    .then(function (user) {
                    if (user.error === "username in use") {
                        swal('Username taken', 'Please enter a differnet username.', 'warning');
                    }
                    else if (user.error === "incorrect email format") {
                        swal('Incorrect email format', 'Please enter a proper email.', 'warning');
                    }
                    else if (user.success === "success") {
                        _this.goBack();
                    }
                    else {
                        _this.user = user; // saved user, w/ id if new
                        _this.goBack();
                    }
                })
                    .catch(function (error) { return _this.error = error; }); // TODO: Display error message
            }
            else {
                swal('Missing Input', 'Please enter all information before saving.', 'warning');
            }
        }
    };
    StaffDetailsComponent.prototype.goBack = function () {
        window.history.back();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", User_1.User)
    ], StaffDetailsComponent.prototype, "user", void 0);
    StaffDetailsComponent = __decorate([
        core_1.Component({
            selector: 'staff-edit',
            templateUrl: './app/components/staff-details/staff-details.component.html',
            styleUrls: ['./app/components/staff-details/staff-details.component.css']
        }),
        __metadata("design:paramtypes", [staff_service_1.StaffService, router_1.ActivatedRoute])
    ], StaffDetailsComponent);
    return StaffDetailsComponent;
}());
exports.StaffDetailsComponent = StaffDetailsComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdGFmZi1kZXRhaWxzL3N0YWZmLWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXlEO0FBQ3pELDBDQUF5QztBQUN6QywwQ0FBeUQ7QUFDekQsOERBQTREO0FBUzVEO0lBUUUsK0JBQW9CLFlBQTBCLEVBQVUsS0FBcUI7UUFBekQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQU43RSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRWhCLGNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyx5QkFBeUI7UUFFNUMsY0FBUyxHQUFXLEVBQUUsQ0FBQztJQUl2QixDQUFDO0lBRUQsd0NBQVEsR0FBUjtRQUFBLGlCQXlCQztRQXhCQyx1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNoQixFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtZQUNsQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtZQUNsQyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTtTQUM3QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBYztZQUN2QyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7WUFDekIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FB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QUN0QixXQUFXLEVBQUUsNkRBQTZEO1lBQzFFLFNBQVMsRUFBRSxDQUFDLDREQUE0RCxDQUFDO1NBQzFFLENBQUM7eUNBVWtDLDRCQUFZLEVBQWlCLHVCQUFjO09BUmxFLHFCQUFxQixDQW1GakM7SUFBRCw0QkFBQztDQW5GRCxBQW1GQyxJQUFBO0FBbkZZLHNEQUFxQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9zdGFmZi1kZXRhaWxzL3N0YWZmLWRldGFpbHMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL1VzZXJcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN0YWZmU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdGFmZi5zZXJ2aWNlXCI7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc3RhZmYtZWRpdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3N0YWZmLWRldGFpbHMvc3RhZmYtZGV0YWlscy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvc3RhZmYtZGV0YWlscy9zdGFmZi1kZXRhaWxzLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0YWZmRGV0YWlsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgdXNlcjogVXNlcjtcclxuICBuZXdVc2VyID0gZmFsc2U7XHJcbiAgZXJyb3I6IGFueTtcclxuICBuYXZpZ2F0ZWQgPSBmYWxzZTsgLy8gdHJ1ZSBpZiBuYXZpZ2F0ZWQgaGVyZVxyXG4gIGF1dGhMZXZlbHM6IGFueTtcclxuICBmc2VsZWN0ZWQ6IGFueSBbXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0YWZmU2VydmljZTogU3RhZmZTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgLy9TZWxlY3RJdGVtIEFQSSB3aXRoIGxhYmVsLXZhbHVlIHBhaXJzXHJcbiAgICB0aGlzLmF1dGhMZXZlbHMgPSBbXHJcbiAgICAgIHsgbGFiZWw6ICdBZG1pbicsIHZhbHVlOiAnQWRtaW4nIH0sXHJcbiAgICAgIHsgbGFiZWw6ICdTdGFmZicsIHZhbHVlOiAnU3RhZmYnIH0sXHJcbiAgICAgIHsgbGFiZWw6ICdJbnN0cnVjdG9yJywgdmFsdWU6ICdJbnN0cnVjdG9yJyB9XHJcbiAgICBdO1xyXG4gICAgdGhpcy5yb3V0ZS5wYXJhbXMuZm9yRWFjaCgocGFyYW1zOiBQYXJhbXMpID0+IHtcclxuICAgICAgbGV0IGlkID0gcGFyYW1zWydpZCddO1xyXG4gICAgICBpZiAoaWQgPT09ICduZXcnKSB7XHJcbiAgICAgICAgdGhpcy5uZXdVc2VyID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubmV3VXNlciA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZnNlbGVjdGVkKTtcclxuICAgICAgICB0aGlzLnN0YWZmU2VydmljZS5nZXRVc2VyKGlkKS50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcclxuICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy51c2VyLnVzZXJUeXBlLnNwbGl0KCcsJykpIHtcclxuICAgICAgICAgICAgdGhpcy5mc2VsZWN0ZWQucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5mc2VsZWN0ZWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy51c2VyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzYXZlKCkge1xyXG4gICAgaWYgKHRoaXMubmV3VXNlciA9PT0gdHJ1ZSkge1xyXG4gICAgICBpZiAodGhpcy51c2VyLmVtYWlsXHJcbiAgICAgICAgJiYgdGhpcy51c2VyLmZpcnN0TmFtZVxyXG4gICAgICAgICYmIHRoaXMudXNlci5sYXN0TmFtZVxyXG4gICAgICAgICYmIHRoaXMuZnNlbGVjdGVkKSB7XHJcbiAgICAgICAgdGhpcy51c2VyLnVzZXJUeXBlID0gdGhpcy5mc2VsZWN0ZWQudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLnN0YWZmU2VydmljZVxyXG4gICAgICAgICAgLnNhdmUodGhpcy51c2VyKVxyXG4gICAgICAgICAgLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyLmVycm9yID09PSBcInVzZXJuYW1lIGluIHVzZVwiKSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICdVc2VybmFtZSB0YWtlbicsXHJcbiAgICAgICAgICAgICAgICAnUGxlYXNlIGVudGVyIGEgZGlmZmVybmV0IHVzZXJuYW1lLicsXHJcbiAgICAgICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHVzZXIuZXJyb3IgPT09IFwiaW5jb3JyZWN0IGVtYWlsIGZvcm1hdFwiKSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICdJbmNvcnJlY3QgZW1haWwgZm9ybWF0JyxcclxuICAgICAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBwcm9wZXIgZW1haWwuJyxcclxuICAgICAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodXNlci5zdWNjZXNzID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgIHRoaXMuZ29CYWNrKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjsgLy8gc2F2ZWQgdXNlciwgdy8gaWQgaWYgbmV3XHJcbiAgICAgICAgICAgICAgdGhpcy5nb0JhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpOyAvLyBUT0RPOiBEaXNwbGF5IGVycm9yIG1lc3NhZ2VcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgJ01pc3NpbmcgSW5wdXQnLFxyXG4gICAgICAgICAgJ1BsZWFzZSBlbnRlciBhbGwgaW5mb3JtYXRpb24gYmVmb3JlIHNhdmluZy4nLFxyXG4gICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
