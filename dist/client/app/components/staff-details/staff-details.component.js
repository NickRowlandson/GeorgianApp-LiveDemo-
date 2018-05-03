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
                _this.user.notify = true;
            }
            else {
                _this.newUser = false;
                _this.staffService
                    .getUser(_this.id)
                    .then(function (user) {
                    if (user.result === "error") {
                        _this.displayErrorAlert(user);
                    }
                    else {
                        _this.user = user;
                        for (var _i = 0, _a = _this.user.userType.split(','); _i < _a.length; _i++) {
                            var item = _a[_i];
                            _this.fselected.push(item);
                        }
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
                    if (user.result === "error") {
                        _this.displayErrorAlert(user);
                    }
                    else if (user.msg === "Username is already in use.") {
                        swal('Username taken', 'Please enter a different username.', 'warning');
                    }
                    else if (user.msg === "Email is already in use.") {
                        swal('Email in use', 'Please enter a different email.', 'warning');
                    }
                    else if (user.msg === "Incorrect email format.") {
                        swal('Incorrect email format', 'Please enter a proper email.', 'warning');
                    }
                    else if (user.result === "success") {
                        swal(user.title, user.msg, 'success');
                        _this.goBack();
                    }
                    else {
                        swal('Error', 'Something went wrong, please try again.', 'error');
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
                    if (user.result === "error") {
                        _this.displayErrorAlert(user);
                    }
                    else if (user.msg === "Username is already in use.") {
                        swal('Username taken', 'Please enter a different username.', 'warning');
                    }
                    else if (user.msg === "Email is already in use.") {
                        swal('Email in use', 'Please enter a different email.', 'warning');
                    }
                    else if (user.msg === "Incorrect email format.") {
                        swal('Incorrect email format', 'Please enter a proper email.', 'warning');
                    }
                    else if (user.result === "success") {
                        swal(user.title, user.msg, 'success');
                        _this.goBack();
                    }
                    else {
                        swal('Error', 'Something went wrong, please try again.', 'error');
                    }
                })
                    .catch(function (error) { return _this.error = error; }); // TODO: Display error message
            }
            else {
                swal('Missing Input', 'Please enter all information before saving.', 'warning');
            }
        }
    };
    StaffDetailsComponent.prototype.displayErrorAlert = function (error) {
        swal(error.title, error.msg, 'error');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdGFmZi1kZXRhaWxzL3N0YWZmLWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXlEO0FBQ3pELDBDQUF5QztBQUN6QywwQ0FBeUQ7QUFDekQsOERBQTREO0FBUzVEO0lBU0UsK0JBQW9CLFlBQTBCLEVBQVUsS0FBcUI7UUFBekQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQVA3RSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRWhCLGNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyx5QkFBeUI7UUFFNUMsY0FBUyxHQUFVLEVBQUUsQ0FBQztJQUt0QixDQUFDO0lBRUQsd0NBQVEsR0FBUjtRQUFBLGlCQTZCQztRQTVCQyx1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNoQixFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtZQUNsQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtZQUNsQyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTtTQUM3QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBYztZQUN2QyxLQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixJQUFJLEtBQUksQ0FBQyxFQUFFLEtBQUssS0FBSyxFQUFFO2dCQUNyQixLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDcEIsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO2dCQUN2QixLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDekI7aUJBQU07Z0JBQ0ws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ZSxFQUNmLDZDQUE2QyxFQUM3QyxTQUFTLENBQ1YsQ0FBQzthQUNIO1NBQ0Y7SUFFSCxDQUFDO0lBRUQsaURBQWlCLEdBQWpCLFVBQWtCLEtBQUs7UUFDckIsSUFBSSxDQUNBLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLEdBQUcsRUFDVCxPQUFPLENBQ1YsQ0FBQztJQUNKLENBQUM7SUFFRCxzQ0FBTSxHQUFOO1FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBaEtRO1FBQVIsWUFBSyxFQUFFO2tDQUFPLFdBQUk7dURBQUM7SUFEVCxxQkFBcUI7UUFOakMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFdBQVcsRUFBRSw2REFBNkQ7WUFDMUUsU0FBUyxFQUFFLENBQUMsNERBQTRELENBQUM7U0FDMUUsQ0FBQzt5Q0FXa0MsNEJBQVksRUFBaUIsdUJBQWM7T0FUbEUscUJBQXFCLENBa0tqQztJQUFELDRCQUFDO0NBbEtELEFBa0tDLElBQUE7QUFsS1ksc0RBQXFCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3N0YWZmLWRldGFpbHMvc3RhZmYtZGV0YWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvVXNlclwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3RhZmZTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0YWZmLnNlcnZpY2VcIjtcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzdGFmZi1lZGl0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvc3RhZmYtZGV0YWlscy9zdGFmZi1kZXRhaWxzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9zdGFmZi1kZXRhaWxzL3N0YWZmLWRldGFpbHMuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU3RhZmZEZXRhaWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSB1c2VyOiBVc2VyO1xyXG4gIG5ld1VzZXIgPSBmYWxzZTtcclxuICBlcnJvcjogYW55O1xyXG4gIG5hdmlnYXRlZCA9IGZhbHNlOyAvLyB0cnVlIGlmIG5hdmlnYXRlZCBoZXJlXHJcbiAgYXV0aExldmVsczogYW55O1xyXG4gIGZzZWxlY3RlZDogYW55W10gPSBbXTtcclxuICBpZDogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0YWZmU2VydmljZTogU3RhZmZTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgLy9TZWxlY3RJdGVtIEFQSSB3aXRoIGxhYmVsLXZhbHVlIHBhaXJzXHJcbiAgICB0aGlzLmF1dGhMZXZlbHMgPSBbXHJcbiAgICAgIHsgbGFiZWw6ICdBZG1pbicsIHZhbHVlOiAnQWRtaW4nIH0sXHJcbiAgICAgIHsgbGFiZWw6ICdTdGFmZicsIHZhbHVlOiAnU3RhZmYnIH0sXHJcbiAgICAgIHsgbGFiZWw6ICdJbnN0cnVjdG9yJywgdmFsdWU6ICdJbnN0cnVjdG9yJyB9XHJcbiAgICBdO1xyXG4gICAgdGhpcy5yb3V0ZS5wYXJhbXMuZm9yRWFjaCgocGFyYW1zOiBQYXJhbXMpID0+IHtcclxuICAgICAgdGhpcy5pZCA9IHBhcmFtc1snaWQnXTtcclxuICAgICAgaWYgKHRoaXMuaWQgPT09ICduZXcnKSB7XHJcbiAgICAgICAgdGhpcy5uZXdVc2VyID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xyXG4gICAgICAgIHRoaXMudXNlci5ub3RpZnkgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubmV3VXNlciA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhZmZTZXJ2aWNlXHJcbiAgICAgICAgICAuZ2V0VXNlcih0aGlzLmlkKVxyXG4gICAgICAgICAgLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIGlmICgodXNlciBhcyBhbnkpLnJlc3VsdCA9PT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydCgodXNlciBhcyBhbnkpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xyXG4gICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy51c2VyLnVzZXJUeXBlLnNwbGl0KCcsJykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnNlbGVjdGVkLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzYXZlKCkge1xyXG4gICAgaWYgKHRoaXMubmV3VXNlciA9PT0gdHJ1ZSkge1xyXG4gICAgICBpZiAodGhpcy51c2VyLmVtYWlsXHJcbiAgICAgICAgJiYgdGhpcy51c2VyLmZpcnN0TmFtZVxyXG4gICAgICAgICYmIHRoaXMudXNlci5sYXN0TmFtZVxyXG4gICAgICAgICYmIHRoaXMuZnNlbGVjdGVkLnRvU3RyaW5nKCkgIT09ICcnKSB7XHJcbiAgICAgICAgdGhpcy51c2VyLnVzZXJUeXBlID0gdGhpcy5mc2VsZWN0ZWQudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLnN0YWZmU2VydmljZVxyXG4gICAgICAgICAgLnNhdmVOZXcodGhpcy51c2VyKVxyXG4gICAgICAgICAgLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIGlmICgodXNlciBhcyBhbnkpLnJlc3VsdCA9PT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydCgodXNlciBhcyBhbnkpKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgodXNlciBhcyBhbnkpLm1zZyA9PT0gXCJVc2VybmFtZSBpcyBhbHJlYWR5IGluIHVzZS5cIikge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAnVXNlcm5hbWUgdGFrZW4nLFxyXG4gICAgICAgICAgICAgICAgJ1BsZWFzZSBlbnRlciBhIGRpZmZlcmVudCB1c2VybmFtZS4nLFxyXG4gICAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgodXNlciBhcyBhbnkpLm1zZyA9PT0gXCJFbWFpbCBpcyBhbHJlYWR5IGluIHVzZS5cIikge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAnRW1haWwgaW4gdXNlJyxcclxuICAgICAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBkaWZmZXJlbnQgZW1haWwuJyxcclxuICAgICAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHVzZXIgYXMgYW55KS5tc2cgPT09IFwiSW5jb3JyZWN0IGVtYWlsIGZvcm1hdC5cIikge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAnSW5jb3JyZWN0IGVtYWlsIGZvcm1hdCcsXHJcbiAgICAgICAgICAgICAgICAnUGxlYXNlIGVudGVyIGEgcHJvcGVyIGVtYWlsLicsXHJcbiAgICAgICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCh1c2VyIGFzIGFueSkucmVzdWx0ID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAodXNlciBhcyBhbnkpLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgKHVzZXIgYXMgYW55KS5tc2csXHJcbiAgICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIHRoaXMuZ29CYWNrKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7IC8vIFRPRE86IERpc3BsYXkgZXJyb3IgbWVzc2FnZVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAnTWlzc2luZyBJbnB1dCcsXHJcbiAgICAgICAgICAnUGxlYXNlIGVudGVyIGFsbCBpbmZvcm1hdGlvbiBiZWZvcmUgc2F2aW5nLicsXHJcbiAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy51c2VyLmVtYWlsXHJcbiAgICAgICAgJiYgdGhpcy5mc2VsZWN0ZWQpIHtcclxuICAgICAgICB0aGlzLnVzZXIudXNlclR5cGUgPSB0aGlzLmZzZWxlY3RlZC50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuc3RhZmZTZXJ2aWNlXHJcbiAgICAgICAgICAudXBkYXRlKHRoaXMudXNlciwgdGhpcy5pZClcclxuICAgICAgICAgIC50aGVuKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICBpZiAoKHVzZXIgYXMgYW55KS5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoKHVzZXIgYXMgYW55KSk7XHJcbiAgICAgICAgICAgIH0gIGVsc2UgaWYgKCh1c2VyIGFzIGFueSkubXNnID09PSBcIlVzZXJuYW1lIGlzIGFscmVhZHkgaW4gdXNlLlwiKSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICdVc2VybmFtZSB0YWtlbicsXHJcbiAgICAgICAgICAgICAgICAnUGxlYXNlIGVudGVyIGEgZGlmZmVyZW50IHVzZXJuYW1lLicsXHJcbiAgICAgICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCh1c2VyIGFzIGFueSkubXNnID09PSBcIkVtYWlsIGlzIGFscmVhZHkgaW4gdXNlLlwiKSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICdFbWFpbCBpbiB1c2UnLFxyXG4gICAgICAgICAgICAgICAgJ1BsZWFzZSBlbnRlciBhIGRpZmZlcmVudCBlbWFpbC4nLFxyXG4gICAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgodXNlciBhcyBhbnkpLm1zZyA9PT0gXCJJbmNvcnJlY3QgZW1haWwgZm9ybWF0LlwiKSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICdJbmNvcnJlY3QgZW1haWwgZm9ybWF0JyxcclxuICAgICAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBwcm9wZXIgZW1haWwuJyxcclxuICAgICAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHVzZXIgYXMgYW55KS5yZXN1bHQgPT09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICh1c2VyIGFzIGFueSkudGl0bGUsXHJcbiAgICAgICAgICAgICAgICAodXNlciBhcyBhbnkpLm1zZyxcclxuICAgICAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgdGhpcy5nb0JhY2soKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTsgLy8gVE9ETzogRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dhbChcclxuICAgICAgICAgICdNaXNzaW5nIElucHV0JyxcclxuICAgICAgICAgICdQbGVhc2UgZW50ZXIgYWxsIGluZm9ybWF0aW9uIGJlZm9yZSBzYXZpbmcuJyxcclxuICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBkaXNwbGF5RXJyb3JBbGVydChlcnJvcikge1xyXG4gICAgc3dhbChcclxuICAgICAgICBlcnJvci50aXRsZSxcclxuICAgICAgICBlcnJvci5tc2csXHJcbiAgICAgICAgJ2Vycm9yJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
