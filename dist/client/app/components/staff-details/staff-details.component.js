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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdGFmZi1kZXRhaWxzL3N0YWZmLWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXlEO0FBQ3pELDBDQUF5QztBQUN6QywwQ0FBeUQ7QUFDekQsOERBQTREO0FBUzVEO0lBU0UsK0JBQW9CLFlBQTBCLEVBQVUsS0FBcUI7UUFBekQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQVA3RSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRWhCLGNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyx5QkFBeUI7UUFFNUMsY0FBUyxHQUFVLEVBQUUsQ0FBQztJQUt0QixDQUFDO0lBRUQsd0NBQVEsR0FBUjtRQUFBLGlCQTZCQztRQTVCQyx1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNoQixFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtZQUNsQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtZQUNsQyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTtTQUM3QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBYztZQUN2QyxLQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixJQUFJLEtBQUksQ0FBQyxFQUFFLEtBQUssS0FBSyxFQUFFO2dCQUNyQixLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDcEIsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO2dCQUN2QixLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDekI7aUJBQU07Z0JBQ0ws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RixlQUFlLEVBQ2YsNkNBQTZDLEVBQzdDLFNBQVMsQ0FDVixDQUFDO2FBQ0g7U0FDRjtJQUVILENBQUM7SUFFRCxpREFBaUIsR0FBakIsVUFBa0IsS0FBSztRQUNyQixJQUFJLENBQ0EsS0FBSyxDQUFDLEtBQUssRUFDWCxLQUFLLENBQUMsR0FBRyxFQUNULE9BQU8sQ0FDVixDQUFDO0lBQ0osQ0FBQztJQUVELHNDQUFNLEdBQU47UUFDRSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFoS1E7UUFBUixZQUFLLEVBQUU7a0NBQU8sV0FBSTt1REFBQztJQURULHFCQUFxQjtRQU5qQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFlBQVk7WUFDdEIsV0FBVyxFQUFFLDZEQUE2RDtZQUMxRSxTQUFTLEVBQUUsQ0FBQyw0REFBNEQsQ0FBQztTQUMxRSxDQUFDO3lDQVdrQyw0QkFBWSxFQUFpQix1QkFBYztPQVRsRSxxQkFBcUIsQ0FrS2pDO0lBQUQsNEJBQUM7Q0FsS0QsQUFrS0MsSUFBQTtBQWxLWSxzREFBcUIiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvc3RhZmYtZGV0YWlscy9zdGFmZi1kZXRhaWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9Vc2VyXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdGFmZlNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3RhZmYuc2VydmljZVwiO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3N0YWZmLWVkaXQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9zdGFmZi1kZXRhaWxzL3N0YWZmLWRldGFpbHMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3N0YWZmLWRldGFpbHMvc3RhZmYtZGV0YWlscy5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFmZkRldGFpbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHVzZXI6IFVzZXI7XHJcbiAgbmV3VXNlciA9IGZhbHNlO1xyXG4gIGVycm9yOiBhbnk7XHJcbiAgbmF2aWdhdGVkID0gZmFsc2U7IC8vIHRydWUgaWYgbmF2aWdhdGVkIGhlcmVcclxuICBhdXRoTGV2ZWxzOiBhbnk7XHJcbiAgZnNlbGVjdGVkOiBhbnlbXSA9IFtdO1xyXG4gIGlkOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RhZmZTZXJ2aWNlOiBTdGFmZlNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICAvL1NlbGVjdEl0ZW0gQVBJIHdpdGggbGFiZWwtdmFsdWUgcGFpcnNcclxuICAgIHRoaXMuYXV0aExldmVscyA9IFtcclxuICAgICAgeyBsYWJlbDogJ0FkbWluJywgdmFsdWU6ICdBZG1pbicgfSxcclxuICAgICAgeyBsYWJlbDogJ1N0YWZmJywgdmFsdWU6ICdTdGFmZicgfSxcclxuICAgICAgeyBsYWJlbDogJ0luc3RydWN0b3InLCB2YWx1ZTogJ0luc3RydWN0b3InIH1cclxuICAgIF07XHJcbiAgICB0aGlzLnJvdXRlLnBhcmFtcy5mb3JFYWNoKChwYXJhbXM6IFBhcmFtcykgPT4ge1xyXG4gICAgICB0aGlzLmlkID0gcGFyYW1zWydpZCddO1xyXG4gICAgICBpZiAodGhpcy5pZCA9PT0gJ25ldycpIHtcclxuICAgICAgICB0aGlzLm5ld1VzZXIgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XHJcbiAgICAgICAgdGhpcy51c2VyLm5vdGlmeSA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5uZXdVc2VyID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGFmZlNlcnZpY2VcclxuICAgICAgICAgIC5nZXRVc2VyKHRoaXMuaWQpXHJcbiAgICAgICAgICAudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgaWYgKCh1c2VyIGFzIGFueSkucmVzdWx0ID09PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KCh1c2VyIGFzIGFueSkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XHJcbiAgICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLnVzZXIudXNlclR5cGUuc3BsaXQoJywnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mc2VsZWN0ZWQucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNhdmUoKSB7XHJcbiAgICBpZiAodGhpcy5uZXdVc2VyID09PSB0cnVlKSB7XHJcbiAgICAgIGlmICh0aGlzLnVzZXIuZW1haWxcclxuICAgICAgICAmJiB0aGlzLnVzZXIuZmlyc3ROYW1lXHJcbiAgICAgICAgJiYgdGhpcy51c2VyLmxhc3ROYW1lXHJcbiAgICAgICAgJiYgdGhpcy5mc2VsZWN0ZWQudG9TdHJpbmcoKSAhPT0gJycpIHtcclxuICAgICAgICB0aGlzLnVzZXIudXNlclR5cGUgPSB0aGlzLmZzZWxlY3RlZC50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuc3RhZmZTZXJ2aWNlXHJcbiAgICAgICAgICAuc2F2ZU5ldyh0aGlzLnVzZXIpXHJcbiAgICAgICAgICAudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgaWYgKCh1c2VyIGFzIGFueSkucmVzdWx0ID09PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KCh1c2VyIGFzIGFueSkpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCh1c2VyIGFzIGFueSkubXNnID09PSBcIlVzZXJuYW1lIGlzIGFscmVhZHkgaW4gdXNlLlwiKSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICdVc2VybmFtZSB0YWtlbicsXHJcbiAgICAgICAgICAgICAgICAnUGxlYXNlIGVudGVyIGEgZGlmZmVyZW50IHVzZXJuYW1lLicsXHJcbiAgICAgICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCh1c2VyIGFzIGFueSkubXNnID09PSBcIkVtYWlsIGlzIGFscmVhZHkgaW4gdXNlLlwiKSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICdFbWFpbCBpbiB1c2UnLFxyXG4gICAgICAgICAgICAgICAgJ1BsZWFzZSBlbnRlciBhIGRpZmZlcmVudCBlbWFpbC4nLFxyXG4gICAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgodXNlciBhcyBhbnkpLm1zZyA9PT0gXCJJbmNvcnJlY3QgZW1haWwgZm9ybWF0LlwiKSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICdJbmNvcnJlY3QgZW1haWwgZm9ybWF0JyxcclxuICAgICAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBwcm9wZXIgZW1haWwuJyxcclxuICAgICAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHVzZXIgYXMgYW55KS5yZXN1bHQgPT09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICh1c2VyIGFzIGFueSkudGl0bGUsXHJcbiAgICAgICAgICAgICAgICAodXNlciBhcyBhbnkpLm1zZyxcclxuICAgICAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgdGhpcy5nb0JhY2soKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTsgLy8gVE9ETzogRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dhbChcclxuICAgICAgICAgICdNaXNzaW5nIElucHV0JyxcclxuICAgICAgICAgICdQbGVhc2UgZW50ZXIgYWxsIGluZm9ybWF0aW9uIGJlZm9yZSBzYXZpbmcuJyxcclxuICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLnVzZXIuZW1haWxcclxuICAgICAgICAmJiB0aGlzLmZzZWxlY3RlZCkge1xyXG4gICAgICAgIHRoaXMudXNlci51c2VyVHlwZSA9IHRoaXMuZnNlbGVjdGVkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5zdGFmZlNlcnZpY2VcclxuICAgICAgICAgIC51cGRhdGUodGhpcy51c2VyLCB0aGlzLmlkKVxyXG4gICAgICAgICAgLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgIGlmICgodXNlciBhcyBhbnkpLnJlc3VsdCA9PT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydCgodXNlciBhcyBhbnkpKTtcclxuICAgICAgICAgICAgfSAgZWxzZSBpZiAoKHVzZXIgYXMgYW55KS5tc2cgPT09IFwiVXNlcm5hbWUgaXMgYWxyZWFkeSBpbiB1c2UuXCIpIHtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgJ1VzZXJuYW1lIHRha2VuJyxcclxuICAgICAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBkaWZmZXJlbnQgdXNlcm5hbWUuJyxcclxuICAgICAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHVzZXIgYXMgYW55KS5tc2cgPT09IFwiRW1haWwgaXMgYWxyZWFkeSBpbiB1c2UuXCIpIHtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgJ0VtYWlsIGluIHVzZScsXHJcbiAgICAgICAgICAgICAgICAnUGxlYXNlIGVudGVyIGEgZGlmZmVyZW50IGVtYWlsLicsXHJcbiAgICAgICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCh1c2VyIGFzIGFueSkubXNnID09PSBcIkluY29ycmVjdCBlbWFpbCBmb3JtYXQuXCIpIHtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgJ0luY29ycmVjdCBlbWFpbCBmb3JtYXQnLFxyXG4gICAgICAgICAgICAgICAgJ1BsZWFzZSBlbnRlciBhIHByb3BlciBlbWFpbC4nLFxyXG4gICAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgodXNlciBhcyBhbnkpLnJlc3VsdCA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgKHVzZXIgYXMgYW55KS50aXRsZSxcclxuICAgICAgICAgICAgICAgICh1c2VyIGFzIGFueSkubXNnLFxyXG4gICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB0aGlzLmdvQmFjaygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpOyAvLyBUT0RPOiBEaXNwbGF5IGVycm9yIG1lc3NhZ2VcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgJ01pc3NpbmcgSW5wdXQnLFxyXG4gICAgICAgICAgJ1BsZWFzZSBlbnRlciBhbGwgaW5mb3JtYXRpb24gYmVmb3JlIHNhdmluZy4nLFxyXG4gICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGRpc3BsYXlFcnJvckFsZXJ0KGVycm9yKSB7XHJcbiAgICBzd2FsKFxyXG4gICAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICAgIGVycm9yLm1zZyxcclxuICAgICAgICAnZXJyb3InXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=
