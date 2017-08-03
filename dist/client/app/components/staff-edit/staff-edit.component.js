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
var StaffEditComponent = (function () {
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
        console.log(this.user);
        if (this.user.email
            && this.user.firstName
            && this.user.lastName
            && this.user.password
            && this.user.username
            && this.user.authLevel) {
            this.staffService
                .save(this.user)
                .then(function (user) {
                _this.user = user; // saved user, w/ id if new
                _this.goBack();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdGFmZi1lZGl0L3N0YWZmLWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXlEO0FBQ3pELDBDQUF5QztBQUN6QywwQ0FBeUQ7QUFDekQsOERBQTREO0FBUzVEO0lBT0ksNEJBQW9CLFlBQTBCLEVBQVUsS0FBcUI7UUFBekQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUw3RSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRWhCLGNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyx5QkFBeUI7SUFLNUMsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFBQSxpQkFXQztRQVZHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQWM7WUFDckMsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7WUFDM0IsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO1lBQ2pFLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxpQ0FBSSxHQUFKO1FBQUEsaUJBdUJDO1FBdEJDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztlQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUztlQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7ZUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO2VBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtlQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFlBQVk7aUJBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ2YsSUFBSSxDQUFDLFVBQUEsSUFBSTtnQkFDTixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLDJCQUEyQjtnQkFDN0MsS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xCLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDLENBQUMsOEJBQThCO1FBQzNFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FDQSxlQUFlLEVBQ2YsNkNBQTZDLEVBQzdDLFNBQVMsQ0FDWixDQUFDO1FBQ0osQ0FBQztJQUVILENBQUM7SUFFRCxtQ0FBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBbERRO1FBQVIsWUFBSyxFQUFFO2tDQUFPLFdBQUk7b0RBQUM7SUFEWCxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFdBQVcsRUFBRSx1REFBdUQ7WUFDcEUsU0FBUyxFQUFFLENBQUMsc0RBQXNELENBQUM7U0FDdEUsQ0FBQzt5Q0FTb0MsNEJBQVksRUFBaUIsdUJBQWM7T0FQcEUsa0JBQWtCLENBb0Q5QjtJQUFELHlCQUFDO0NBcERELEFBb0RDLElBQUE7QUFwRFksZ0RBQWtCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3N0YWZmLWVkaXQvc3RhZmYtZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvVXNlclwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3RhZmZTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0YWZmLnNlcnZpY2VcIjtcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3N0YWZmLWVkaXQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3N0YWZmLWVkaXQvc3RhZmYtZWRpdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9zdGFmZi1lZGl0L3N0YWZmLWVkaXQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU3RhZmZFZGl0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBJbnB1dCgpIHVzZXI6IFVzZXI7XHJcbiAgICBuZXdVc2VyID0gZmFsc2U7XHJcbiAgICBlcnJvcjogYW55O1xyXG4gICAgbmF2aWdhdGVkID0gZmFsc2U7IC8vIHRydWUgaWYgbmF2aWdhdGVkIGhlcmVcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzdGFmZlNlcnZpY2U6IFN0YWZmU2VydmljZSwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5wYXJhbXMuZm9yRWFjaCgocGFyYW1zOiBQYXJhbXMpID0+IHtcclxuICAgICAgICAgICAgbGV0IGlkID0gcGFyYW1zWydpZCddO1xyXG4gICAgICAgICAgICBpZiAoaWQgPT09ICduZXcnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld1VzZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV3VXNlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFmZlNlcnZpY2UuZ2V0VXNlcihpZCkudGhlbih1c2VyID0+IHRoaXMudXNlciA9IHVzZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZSgpIHtcclxuICAgICAgY29uc29sZS5sb2codGhpcy51c2VyKTtcclxuICAgICAgaWYgKHRoaXMudXNlci5lbWFpbFxyXG4gICAgICAgICYmIHRoaXMudXNlci5maXJzdE5hbWVcclxuICAgICAgICAmJiB0aGlzLnVzZXIubGFzdE5hbWVcclxuICAgICAgICAmJiB0aGlzLnVzZXIucGFzc3dvcmRcclxuICAgICAgICAmJiB0aGlzLnVzZXIudXNlcm5hbWVcclxuICAgICAgICAmJiB0aGlzLnVzZXIuYXV0aExldmVsKSB7XHJcbiAgICAgICAgICB0aGlzLnN0YWZmU2VydmljZVxyXG4gICAgICAgICAgICAgIC5zYXZlKHRoaXMudXNlcilcclxuICAgICAgICAgICAgICAudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjsgLy8gc2F2ZWQgdXNlciwgdy8gaWQgaWYgbmV3XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZ29CYWNrKCk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTsgLy8gVE9ETzogRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ01pc3NpbmcgSW5wdXQnLFxyXG4gICAgICAgICAgICAnUGxlYXNlIGVudGVyIGFsbCBpbmZvcm1hdGlvbiBiZWZvcmUgc2F2aW5nLicsXHJcbiAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgIH1cclxufVxyXG4iXX0=
