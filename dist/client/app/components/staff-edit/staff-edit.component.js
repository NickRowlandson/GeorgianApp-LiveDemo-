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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdGFmZi1lZGl0L3N0YWZmLWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXlEO0FBQ3pELDBDQUF5QztBQUN6QywwQ0FBeUQ7QUFDekQsOERBQTREO0FBUzVEO0lBT0ksNEJBQW9CLFlBQTBCLEVBQVUsS0FBcUI7UUFBekQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUw3RSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRWhCLGNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyx5QkFBeUI7SUFLNUMsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFBQSxpQkFXQztRQVZHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQWM7WUFDckMsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7WUFDM0IsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO1lBQ2pFLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxpQ0FBSSxHQUFKO1FBQUEsaUJBb0NDO1FBbkNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztlQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUztlQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7ZUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxZQUFZO2lCQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2lCQUNmLElBQUksQ0FBQyxVQUFBLElBQUk7Z0JBQ1IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7b0JBQ3JDLElBQUksQ0FDQSxnQkFBZ0IsRUFDaEIsb0NBQW9DLEVBQ3BDLFNBQVMsQ0FDWixDQUFDO2dCQUNKLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssd0JBQXdCLENBQUMsQ0FBQyxDQUFDO29CQUNuRCxJQUFJLENBQ0Esd0JBQXdCLEVBQ3hCLDhCQUE4QixFQUM5QixTQUFTLENBQ1osQ0FBQztnQkFDSixDQUFDO2dCQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZDLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLDJCQUEyQjtvQkFDN0MsS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNoQixDQUFDO1lBQ0gsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFsQixDQUFrQixDQUFDLENBQUMsQ0FBQyw4QkFBOEI7UUFDM0UsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUNBLGVBQWUsRUFDZiw2Q0FBNkMsRUFDN0MsU0FBUyxDQUNaLENBQUM7UUFDSixDQUFDO0lBRUgsQ0FBQztJQUVELG1DQUFNLEdBQU47UUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUEvRFE7UUFBUixZQUFLLEVBQUU7a0NBQU8sV0FBSTtvREFBQztJQURYLGtCQUFrQjtRQU45QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsV0FBVyxFQUFFLHVEQUF1RDtZQUNwRSxTQUFTLEVBQUUsQ0FBQyxzREFBc0QsQ0FBQztTQUN0RSxDQUFDO3lDQVNvQyw0QkFBWSxFQUFpQix1QkFBYztPQVBwRSxrQkFBa0IsQ0FpRTlCO0lBQUQseUJBQUM7Q0FqRUQsQUFpRUMsSUFBQTtBQWpFWSxnREFBa0IiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvc3RhZmYtZWRpdC9zdGFmZi1lZGl0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9Vc2VyXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdGFmZlNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3RhZmYuc2VydmljZVwiO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnc3RhZmYtZWRpdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvc3RhZmYtZWRpdC9zdGFmZi1lZGl0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3N0YWZmLWVkaXQvc3RhZmYtZWRpdC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFmZkVkaXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgdXNlcjogVXNlcjtcclxuICAgIG5ld1VzZXIgPSBmYWxzZTtcclxuICAgIGVycm9yOiBhbnk7XHJcbiAgICBuYXZpZ2F0ZWQgPSBmYWxzZTsgLy8gdHJ1ZSBpZiBuYXZpZ2F0ZWQgaGVyZVxyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0YWZmU2VydmljZTogU3RhZmZTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlLnBhcmFtcy5mb3JFYWNoKChwYXJhbXM6IFBhcmFtcykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaWQgPSBwYXJhbXNbJ2lkJ107XHJcbiAgICAgICAgICAgIGlmIChpZCA9PT0gJ25ldycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV3VXNlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdVc2VyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWZmU2VydmljZS5nZXRVc2VyKGlkKS50aGVuKHVzZXIgPT4gdGhpcy51c2VyID0gdXNlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlKCkge1xyXG4gICAgICBpZiAodGhpcy51c2VyLmVtYWlsXHJcbiAgICAgICAgJiYgdGhpcy51c2VyLmZpcnN0TmFtZVxyXG4gICAgICAgICYmIHRoaXMudXNlci5sYXN0TmFtZVxyXG4gICAgICAgICYmIHRoaXMudXNlci5hdXRoTGV2ZWwpIHtcclxuICAgICAgICAgIHRoaXMuc3RhZmZTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgLnNhdmUodGhpcy51c2VyKVxyXG4gICAgICAgICAgICAgIC50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXIuZXJyb3IgPT09IFwidXNlcm5hbWUgaW4gdXNlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAgICdVc2VybmFtZSB0YWtlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAnUGxlYXNlIGVudGVyIGEgZGlmZmVybmV0IHVzZXJuYW1lLicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodXNlci5lcnJvciA9PT0gXCJpbmNvcnJlY3QgZW1haWwgZm9ybWF0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAgICdJbmNvcnJlY3QgZW1haWwgZm9ybWF0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBwcm9wZXIgZW1haWwuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSAgZWxzZSBpZiAodXNlci5zdWNjZXNzID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmdvQmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjsgLy8gc2F2ZWQgdXNlciwgdy8gaWQgaWYgbmV3XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZ29CYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTsgLy8gVE9ETzogRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ01pc3NpbmcgSW5wdXQnLFxyXG4gICAgICAgICAgICAnUGxlYXNlIGVudGVyIGFsbCBpbmZvcm1hdGlvbiBiZWZvcmUgc2F2aW5nLicsXHJcbiAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgIH1cclxufVxyXG4iXX0=
