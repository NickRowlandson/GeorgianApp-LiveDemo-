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
            _this.id = params['id'];
            if (_this.id === 'new') {
                _this.newUser = true;
                _this.user = new User_1.User();
            }
            else {
                _this.newUser = false;
                _this.staffService.getUser(_this.id).then(function (user) {
                    _this.user = user;
                    for (var _i = 0, _a = _this.user.userType.split(','); _i < _a.length; _i++) {
                        var item = _a[_i];
                        _this.fselected.push(item);
                    }
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
                && this.fselected.toString() !== '') {
                this.user.userType = this.fselected.toString();
                this.staffService
                    .saveNew(this.user)
                    .then(function (user) {
                    if (user.error === "username in use") {
                        swal('Username taken', 'Please enter a different username.', 'warning');
                    }
                    else if (user.error === "email in use") {
                        swal('Email in use', 'Please enter a different email.', 'warning');
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
        else {
            if (this.user.email
                && this.fselected) {
                this.user.userType = this.fselected.toString();
                this.staffService
                    .update(this.user, this.id)
                    .then(function (user) {
                    if (user.error === "incorrect email format") {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdGFmZi1kZXRhaWxzL3N0YWZmLWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXlEO0FBQ3pELDBDQUF5QztBQUN6QywwQ0FBeUQ7QUFDekQsOERBQTREO0FBUzVEO0lBU0UsK0JBQW9CLFlBQTBCLEVBQVUsS0FBcUI7UUFBekQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQVA3RSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRWhCLGNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyx5QkFBeUI7UUFFNUMsY0FBUyxHQUFXLEVBQUUsQ0FBQztJQUt2QixDQUFDO0lBRUQsd0NBQVEsR0FBUjtRQUFBLGlCQXNCQztRQXJCQyx1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNoQixFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtZQUNsQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtZQUNsQyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTtTQUM3QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBYztZQUN2QyxLQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsRUFBRSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7WUFDekIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLEtBQUksQ0FB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LDZEQUE2RDtZQUMxRSxTQUFTLEVBQUUsQ0FBQyw0REFBNEQsQ0FBQztTQUMxRSxDQUFDO3lDQVdrQyw0QkFBWSxFQUFpQix1QkFBYztPQVRsRSxxQkFBcUIsQ0FtSGpDO0lBQUQsNEJBQUM7Q0FuSEQsQUFtSEMsSUFBQTtBQW5IWSxzREFBcUIiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvc3RhZmYtZGV0YWlscy9zdGFmZi1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9Vc2VyXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdGFmZlNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3RhZmYuc2VydmljZVwiO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3N0YWZmLWVkaXQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9zdGFmZi1kZXRhaWxzL3N0YWZmLWRldGFpbHMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3N0YWZmLWRldGFpbHMvc3RhZmYtZGV0YWlscy5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFmZkRldGFpbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHVzZXI6IFVzZXI7XHJcbiAgbmV3VXNlciA9IGZhbHNlO1xyXG4gIGVycm9yOiBhbnk7XHJcbiAgbmF2aWdhdGVkID0gZmFsc2U7IC8vIHRydWUgaWYgbmF2aWdhdGVkIGhlcmVcclxuICBhdXRoTGV2ZWxzOiBhbnk7XHJcbiAgZnNlbGVjdGVkOiBhbnkgW10gPSBbXTtcclxuICBpZDogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0YWZmU2VydmljZTogU3RhZmZTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgLy9TZWxlY3RJdGVtIEFQSSB3aXRoIGxhYmVsLXZhbHVlIHBhaXJzXHJcbiAgICB0aGlzLmF1dGhMZXZlbHMgPSBbXHJcbiAgICAgIHsgbGFiZWw6ICdBZG1pbicsIHZhbHVlOiAnQWRtaW4nIH0sXHJcbiAgICAgIHsgbGFiZWw6ICdTdGFmZicsIHZhbHVlOiAnU3RhZmYnIH0sXHJcbiAgICAgIHsgbGFiZWw6ICdJbnN0cnVjdG9yJywgdmFsdWU6ICdJbnN0cnVjdG9yJyB9XHJcbiAgICBdO1xyXG4gICAgdGhpcy5yb3V0ZS5wYXJhbXMuZm9yRWFjaCgocGFyYW1zOiBQYXJhbXMpID0+IHtcclxuICAgICAgdGhpcy5pZCA9IHBhcmFtc1snaWQnXTtcclxuICAgICAgaWYgKHRoaXMuaWQgPT09ICduZXcnKSB7XHJcbiAgICAgICAgdGhpcy5uZXdVc2VyID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubmV3VXNlciA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhZmZTZXJ2aWNlLmdldFVzZXIodGhpcy5pZCkudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XHJcbiAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMudXNlci51c2VyVHlwZS5zcGxpdCgnLCcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnNlbGVjdGVkLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2F2ZSgpIHtcclxuICAgIGlmICh0aGlzLm5ld1VzZXIgPT09IHRydWUpIHtcclxuICAgICAgaWYgKHRoaXMudXNlci5lbWFpbFxyXG4gICAgICAgICYmIHRoaXMudXNlci5maXJzdE5hbWVcclxuICAgICAgICAmJiB0aGlzLnVzZXIubGFzdE5hbWVcclxuICAgICAgICAmJiB0aGlzLmZzZWxlY3RlZC50b1N0cmluZygpICE9PSAnJykge1xyXG4gICAgICAgIHRoaXMudXNlci51c2VyVHlwZSA9IHRoaXMuZnNlbGVjdGVkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5zdGFmZlNlcnZpY2VcclxuICAgICAgICAgIC5zYXZlTmV3KHRoaXMudXNlcilcclxuICAgICAgICAgIC50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICBpZiAodXNlci5lcnJvciA9PT0gXCJ1c2VybmFtZSBpbiB1c2VcIikge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAnVXNlcm5hbWUgdGFrZW4nLFxyXG4gICAgICAgICAgICAgICAgJ1BsZWFzZSBlbnRlciBhIGRpZmZlcmVudCB1c2VybmFtZS4nLFxyXG4gICAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh1c2VyLmVycm9yID09PSBcImVtYWlsIGluIHVzZVwiKSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICdFbWFpbCBpbiB1c2UnLFxyXG4gICAgICAgICAgICAgICAgJ1BsZWFzZSBlbnRlciBhIGRpZmZlcmVudCBlbWFpbC4nLFxyXG4gICAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh1c2VyLmVycm9yID09PSBcImluY29ycmVjdCBlbWFpbCBmb3JtYXRcIikge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAnSW5jb3JyZWN0IGVtYWlsIGZvcm1hdCcsXHJcbiAgICAgICAgICAgICAgICAnUGxlYXNlIGVudGVyIGEgcHJvcGVyIGVtYWlsLicsXHJcbiAgICAgICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHVzZXIuc3VjY2VzcyA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICB0aGlzLmdvQmFjaygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7IC8vIHNhdmVkIHVzZXIsIHcvIGlkIGlmIG5ld1xyXG4gICAgICAgICAgICAgIHRoaXMuZ29CYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTsgLy8gVE9ETzogRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dhbChcclxuICAgICAgICAgICdNaXNzaW5nIElucHV0JyxcclxuICAgICAgICAgICdQbGVhc2UgZW50ZXIgYWxsIGluZm9ybWF0aW9uIGJlZm9yZSBzYXZpbmcuJyxcclxuICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLnVzZXIuZW1haWxcclxuICAgICAgICAmJiB0aGlzLmZzZWxlY3RlZCkge1xyXG4gICAgICAgIHRoaXMudXNlci51c2VyVHlwZSA9IHRoaXMuZnNlbGVjdGVkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5zdGFmZlNlcnZpY2VcclxuICAgICAgICAgIC51cGRhdGUodGhpcy51c2VyLCB0aGlzLmlkKVxyXG4gICAgICAgICAgLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyLmVycm9yID09PSBcImluY29ycmVjdCBlbWFpbCBmb3JtYXRcIikge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAnSW5jb3JyZWN0IGVtYWlsIGZvcm1hdCcsXHJcbiAgICAgICAgICAgICAgICAnUGxlYXNlIGVudGVyIGEgcHJvcGVyIGVtYWlsLicsXHJcbiAgICAgICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHVzZXIuc3VjY2VzcyA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICB0aGlzLmdvQmFjaygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7IC8vIHNhdmVkIHVzZXIsIHcvIGlkIGlmIG5ld1xyXG4gICAgICAgICAgICAgIHRoaXMuZ29CYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTsgLy8gVE9ETzogRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dhbChcclxuICAgICAgICAgICdNaXNzaW5nIElucHV0JyxcclxuICAgICAgICAgICdQbGVhc2UgZW50ZXIgYWxsIGluZm9ybWF0aW9uIGJlZm9yZSBzYXZpbmcuJyxcclxuICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
