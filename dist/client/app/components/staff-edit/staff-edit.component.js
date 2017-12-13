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
var StaffEditComponent = /** @class */ (function () {
    function StaffEditComponent(staffService, route) {
        this.staffService = staffService;
        this.route = route;
        this.newUser = false;
        this.navigated = false; // true if navigated here
    }
    StaffEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['id'];
            if (id === 'new') {
                _this.newUser = true;
                _this.user = new User_1.User();
            }
            else {
                _this.newUser = false;
                _this.staffService.getUser(id).then(function (user) { return _this.user = user; });
            }
        });
    };
    StaffEditComponent.prototype.save = function () {
        var _this = this;
        if (this.user.email
            && this.user.firstName
            && this.user.lastName
            && this.user.password
            && this.user.username
            && this.user.authLevel) {
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
    };
    StaffEditComponent.prototype.goBack = function () {
        window.history.back();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", User_1.User)
    ], StaffEditComponent.prototype, "user", void 0);
    StaffEditComponent = __decorate([
        core_1.Component({
            selector: 'staff-edit',
            templateUrl: './app/components/staff-edit/staff-edit.component.html',
            styleUrls: ['./app/components/staff-edit/staff-edit.component.css']
        }),
        __metadata("design:paramtypes", [staff_service_1.StaffService, router_1.ActivatedRoute])
    ], StaffEditComponent);
    return StaffEditComponent;
}());
exports.StaffEditComponent = StaffEditComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdGFmZi1lZGl0L3N0YWZmLWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXlEO0FBQ3pELDBDQUF5QztBQUN6QywwQ0FBeUQ7QUFDekQsOERBQTREO0FBUzVEO0lBT0ksNEJBQW9CLFlBQTBCLEVBQVUsS0FBcUI7UUFBekQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUw3RSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRWhCLGNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyx5QkFBeUI7SUFLNUMsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFBQSxpQkFXQztRQVZHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQWM7WUFDckMsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7WUFDM0IsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO1lBQ2pFLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxpQ0FBSSxHQUFKO1FBQUEsaUJBc0NDO1FBckNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztlQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUztlQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7ZUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO2VBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtlQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFlBQVk7aUJBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ2YsSUFBSSxDQUFDLFVBQUEsSUFBSTtnQkFDUixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLGlCQUFpQixDQUFDLENBQUMsQ0FBQztvQkFDckMsSUFBSSxDQUNBLGdCQUFnQixFQUNoQixvQ0FBb0MsRUFDcEMsU0FBUyxDQUNaLENBQUM7Z0JBQ0osQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7b0JBQ25ELElBQUksQ0FDQSx3QkFBd0IsRUFDeEIsOEJBQThCLEVBQzlCLFNBQVMsQ0FDWixDQUFDO2dCQUNKLENBQUM7Z0JBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDdkMsS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNoQixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsMkJBQTJCO29CQUM3QyxLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7WUFDSCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQyxDQUFDLDhCQUE4QjtRQUMzRSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQ0EsZUFBZSxFQUNmLDZDQUE2QyxFQUM3QyxTQUFTLENBQ1osQ0FBQztRQUNKLENBQUM7SUFFSCxDQUFDO0lBRUQsbUNBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQWpFUTtRQUFSLFlBQUssRUFBRTtrQ0FBTyxXQUFJO29EQUFDO0lBRFgsa0JBQWtCO1FBTjlCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixXQUFXLEVBQUUsdURBQXVEO1lBQ3BFLFNBQVMsRUFBRSxDQUFDLHNEQUFzRCxDQUFDO1NBQ3RFLENBQUM7eUNBU29DLDRCQUFZLEVBQWlCLHVCQUFjO09BUHBFLGtCQUFrQixDQW1FOUI7SUFBRCx5QkFBQztDQW5FRCxBQW1FQyxJQUFBO0FBbkVZLGdEQUFrQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9zdGFmZi1lZGl0L3N0YWZmLWVkaXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL1VzZXJcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN0YWZmU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdGFmZi5zZXJ2aWNlXCI7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdzdGFmZi1lZGl0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9zdGFmZi1lZGl0L3N0YWZmLWVkaXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvc3RhZmYtZWRpdC9zdGFmZi1lZGl0LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0YWZmRWRpdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSB1c2VyOiBVc2VyO1xyXG4gICAgbmV3VXNlciA9IGZhbHNlO1xyXG4gICAgZXJyb3I6IGFueTtcclxuICAgIG5hdmlnYXRlZCA9IGZhbHNlOyAvLyB0cnVlIGlmIG5hdmlnYXRlZCBoZXJlXHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RhZmZTZXJ2aWNlOiBTdGFmZlNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMucm91dGUucGFyYW1zLmZvckVhY2goKHBhcmFtczogUGFyYW1zKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHBhcmFtc1snaWQnXTtcclxuICAgICAgICAgICAgaWYgKGlkID09PSAnbmV3Jykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdVc2VyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld1VzZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZmZTZXJ2aWNlLmdldFVzZXIoaWQpLnRoZW4odXNlciA9PiB0aGlzLnVzZXIgPSB1c2VyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmUoKSB7XHJcbiAgICAgIGlmICh0aGlzLnVzZXIuZW1haWxcclxuICAgICAgICAmJiB0aGlzLnVzZXIuZmlyc3ROYW1lXHJcbiAgICAgICAgJiYgdGhpcy51c2VyLmxhc3ROYW1lXHJcbiAgICAgICAgJiYgdGhpcy51c2VyLnBhc3N3b3JkXHJcbiAgICAgICAgJiYgdGhpcy51c2VyLnVzZXJuYW1lXHJcbiAgICAgICAgJiYgdGhpcy51c2VyLmF1dGhMZXZlbCkge1xyXG4gICAgICAgICAgdGhpcy5zdGFmZlNlcnZpY2VcclxuICAgICAgICAgICAgICAuc2F2ZSh0aGlzLnVzZXIpXHJcbiAgICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlci5lcnJvciA9PT0gXCJ1c2VybmFtZSBpbiB1c2VcIikge1xyXG4gICAgICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAgICAgJ1VzZXJuYW1lIHRha2VuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBkaWZmZXJuZXQgdXNlcm5hbWUuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1c2VyLmVycm9yID09PSBcImluY29ycmVjdCBlbWFpbCBmb3JtYXRcIikge1xyXG4gICAgICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAgICAgJ0luY29ycmVjdCBlbWFpbCBmb3JtYXQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgJ1BsZWFzZSBlbnRlciBhIHByb3BlciBlbWFpbC4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9ICBlbHNlIGlmICh1c2VyLnN1Y2Nlc3MgPT09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZ29CYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyOyAvLyBzYXZlZCB1c2VyLCB3LyBpZCBpZiBuZXdcclxuICAgICAgICAgICAgICAgICAgdGhpcy5nb0JhY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpOyAvLyBUT0RPOiBEaXNwbGF5IGVycm9yIG1lc3NhZ2VcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnTWlzc2luZyBJbnB1dCcsXHJcbiAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYWxsIGluZm9ybWF0aW9uIGJlZm9yZSBzYXZpbmcuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnb0JhY2soKSB7XHJcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
