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
var staff_service_1 = require("../../services/staff.service");
var router_1 = require("@angular/router");
var StaffManageComponent = /** @class */ (function () {
    function StaffManageComponent(router, staffService) {
        this.router = router;
        this.staffService = staffService;
    }
    StaffManageComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    StaffManageComponent.prototype.getUsers = function () {
        var _this = this;
        this.staffService
            .getUsers()
            .then(function (users) {
            if (users.result === "error") {
                _this.users = null;
                _this.displayErrorAlert(users);
            }
            else {
                _this.users = users;
                for (var _i = 0, _a = _this.users; _i < _a.length; _i++) {
                    var user = _a[_i];
                    user.fullName = user.firstName + " " + user.lastName;
                }
                _this.usersBackup = _this.users;
                _this.usersLength = users.length;
                _this.updateStats();
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    StaffManageComponent.prototype.gotoEdit = function (user, event) {
        this.router.navigate(['/staff-details', user.userID]);
    };
    StaffManageComponent.prototype.addUser = function () {
        this.router.navigate(['/staff-details', 'new']);
    };
    StaffManageComponent.prototype.deleteAlert = function (user, event) {
        var _this = this;
        swal({
            title: 'Delete ' + user.firstName + ' ' + user.lastName + '?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!'
        }).then(function (isConfirm) {
            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                console.log(isConfirm.dismiss);
            }
            else if (isConfirm) {
                _this.deleteUser(user, event);
            }
        }).catch(function (error) {
            console.log(error);
        });
    };
    StaffManageComponent.prototype.deleteUser = function (user, event) {
        var _this = this;
        event.stopPropagation();
        this.staffService
            .delete(user)
            .then(function (res) {
            console.log(res);
            if (res.result === "error") {
                _this.displayErrorAlert(res);
            }
            else if (res.result === "success") {
                _this.users = _this.users.filter(function (h) { return h !== user; });
                _this.usersBackup = _this.users;
                _this.usersLength = _this.users.length;
                _this.updateStats();
                swal('Deleted!', 'User has been deleted.', 'success');
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    StaffManageComponent.prototype.updateStats = function () {
        this.adminNumber = this.users.filter(function (x) { return x.userType.indexOf("Admin") !== -1; });
        this.adminNumber = this.adminNumber.length;
        this.staffNumber = this.users.filter(function (x) { return x.userType.indexOf("Staff") !== -1; });
        this.staffNumber = this.staffNumber.length;
        this.instructorNumber = this.users.filter(function (x) { return x.userType.indexOf("Instructor") !== -1; });
        this.instructorNumber = this.instructorNumber.length;
    };
    StaffManageComponent.prototype.filterStaff = function (userType) {
        this.users = this.usersBackup;
        if (userType === 'total') {
            this.users = this.usersBackup;
        }
        else {
            this.users = this.users.filter(function (x) { return x.userType.indexOf(userType) !== -1; });
        }
    };
    StaffManageComponent.prototype.displayErrorAlert = function (error) {
        swal(error.title, error.msg, 'error');
    };
    StaffManageComponent.prototype.goBack = function () {
        window.history.back();
    };
    StaffManageComponent = __decorate([
        core_1.Component({
            selector: 'staff-manage',
            templateUrl: './app/components/staff-manage/staff-manage.component.html',
            styleUrls: ['./app/components/staff-manage/staff-manage.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, staff_service_1.StaffService])
    ], StaffManageComponent);
    return StaffManageComponent;
}());
exports.StaffManageComponent = StaffManageComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdGFmZi1tYW5hZ2Uvc3RhZmYtbWFuYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCw4REFBNEQ7QUFFNUQsMENBQXlDO0FBV3pDO0lBU0ksOEJBQW9CLE1BQWMsRUFBVSxZQUEwQjtRQUFsRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7SUFFdEUsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFBQSxpQkFrQkM7UUFqQkcsSUFBSSxDQUFDLFlBQVk7YUFDZCxRQUFRLEVBQUU7YUFDVixJQUFJLENBQUMsVUFBQSxLQUFLO1lBQ1QsSUFBSyxLQUFhLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtnQkFDckMsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBRSxLQUFhLENBQUMsQ0FBQzthQUN4QztpQkFBTTtnQkFDTCxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDbkIsS0FBaUIsVUFBVSxFQUFWLEtBQUEsS0FBSSxDQUFDLEtBQUssRUFBVixjQUFVLEVBQVYsSUFBVTtvQkFBdEIsSUFBSSxJQUFJLFNBQUE7b0JBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2lCQUN0RDtnQkFDRCxLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQzlCLEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztnQkFDaEMsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3BCO1FBQ0gsQ0FBQyxDQUFDO2FBQ0Qs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QUFDLEVBQW5DLENBQW1DLENBQUMsQ0FBQztTQUMxRTtJQUNILENBQUM7SUFFRCxnREFBaUIsR0FBakIsVUFBa0IsS0FBSztRQUNyQixJQUFJLENBQ0EsS0FBSyxDQUFDLEtBQUssRUFDWCxLQUFLLENBQUMsR0FBRyxFQUNULE9BQU8sQ0FDVixDQUFDO0lBQ0osQ0FBQztJQUVELHFDQUFNLEdBQU47UUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUExSFEsb0JBQW9CO1FBUGhDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsY0FBYztZQUN4QixXQUFXLEVBQUUsMkRBQTJEO1lBQ3hFLFNBQVMsRUFBRSxDQUFDLDBEQUEwRCxDQUFDO1NBQzFFLENBQUM7eUNBWThCLGVBQU0sRUFBd0IsNEJBQVk7T0FUN0Qsb0JBQW9CLENBMkhoQztJQUFELDJCQUFDO0NBM0hELEFBMkhDLElBQUE7QUEzSFksb0RBQW9CIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3N0YWZmLW1hbmFnZS9zdGFmZi1tYW5hZ2UuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3RhZmZTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0YWZmLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvdXNlclwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3N0YWZmLW1hbmFnZScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvc3RhZmYtbWFuYWdlL3N0YWZmLW1hbmFnZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9zdGFmZi1tYW5hZ2Uvc3RhZmYtbWFuYWdlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFmZk1hbmFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICB1c2VyczogVXNlcltdO1xyXG4gICAgdXNlcnNCYWNrdXA6IFVzZXJbXTtcclxuICAgIGVycm9yOiBhbnk7XHJcbiAgICB1c2Vyc0xlbmd0aDogYW55O1xyXG4gICAgYWRtaW5OdW1iZXI6IGFueTtcclxuICAgIHN0YWZmTnVtYmVyOiBhbnk7XHJcbiAgICBpbnN0cnVjdG9yTnVtYmVyOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBzdGFmZlNlcnZpY2U6IFN0YWZmU2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmdldFVzZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlcnMoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFmZlNlcnZpY2VcclxuICAgICAgICAgIC5nZXRVc2VycygpXHJcbiAgICAgICAgICAudGhlbih1c2VycyA9PiB7XHJcbiAgICAgICAgICAgIGlmICgodXNlcnMgYXMgYW55KS5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlcnMgPSBudWxsO1xyXG4gICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoKHVzZXJzIGFzIGFueSkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlcnMgPSB1c2VycztcclxuICAgICAgICAgICAgICBmb3IgKGxldCB1c2VyIG9mIHRoaXMudXNlcnMpIHtcclxuICAgICAgICAgICAgICAgIHVzZXIuZnVsbE5hbWUgPSB1c2VyLmZpcnN0TmFtZSArIFwiIFwiICsgdXNlci5sYXN0TmFtZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdGhpcy51c2Vyc0JhY2t1cCA9IHRoaXMudXNlcnM7XHJcbiAgICAgICAgICAgICAgdGhpcy51c2Vyc0xlbmd0aCA9IHVzZXJzLmxlbmd0aDtcclxuICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBnb3RvRWRpdCh1c2VyOiBVc2VyLCBldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3RhZmYtZGV0YWlscycsIHVzZXIudXNlcklEXSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVXNlcigpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zdGFmZi1kZXRhaWxzJywgJ25ldyddKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVBbGVydCh1c2VyOiBVc2VyLCBldmVudDogYW55KSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnRGVsZXRlICcgKyB1c2VyLmZpcnN0TmFtZSArICcgJyArIHVzZXIubGFzdE5hbWUgKyAnPycsXHJcbiAgICAgICAgICAgIHRleHQ6IFwiWW91IHdvbid0IGJlIGFibGUgdG8gcmV2ZXJ0IHRoaXMhXCIsXHJcbiAgICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBkZWxldGUhJ1xyXG4gICAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtLmRpc21pc3MpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVVc2VyKHVzZXIsIGV2ZW50KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlVXNlcih1c2VyOiBVc2VyLCBldmVudDogYW55KSB7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5zdGFmZlNlcnZpY2VcclxuICAgICAgICAgIC5kZWxldGUodXNlcilcclxuICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIGlmICgocmVzIGFzIGFueSkucmVzdWx0ID09PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KChyZXMgYXMgYW55KSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlcyBhcyBhbnkpLnJlc3VsdCA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJzID0gdGhpcy51c2Vycy5maWx0ZXIoaCA9PiBoICE9PSB1c2VyKTtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJzQmFja3VwID0gdGhpcy51c2VycztcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJzTGVuZ3RoID0gdGhpcy51c2Vycy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0cygpO1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICdEZWxldGVkIScsXHJcbiAgICAgICAgICAgICAgICAgICdVc2VyIGhhcyBiZWVuIGRlbGV0ZWQuJyxcclxuICAgICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTdGF0cygpIHtcclxuICAgICAgdGhpcy5hZG1pbk51bWJlciA9IHRoaXMudXNlcnMuZmlsdGVyKHggPT4geC51c2VyVHlwZS5pbmRleE9mKFwiQWRtaW5cIikgIT09IC0xKTtcclxuICAgICAgdGhpcy5hZG1pbk51bWJlciA9IHRoaXMuYWRtaW5OdW1iZXIubGVuZ3RoO1xyXG4gICAgICB0aGlzLnN0YWZmTnVtYmVyID0gdGhpcy51c2Vycy5maWx0ZXIoeCA9PiB4LnVzZXJUeXBlLmluZGV4T2YoXCJTdGFmZlwiKSAhPT0gLTEpO1xyXG4gICAgICB0aGlzLnN0YWZmTnVtYmVyID0gdGhpcy5zdGFmZk51bWJlci5sZW5ndGg7XHJcbiAgICAgIHRoaXMuaW5zdHJ1Y3Rvck51bWJlciA9IHRoaXMudXNlcnMuZmlsdGVyKHggPT4geC51c2VyVHlwZS5pbmRleE9mKFwiSW5zdHJ1Y3RvclwiKSAhPT0gLTEpO1xyXG4gICAgICB0aGlzLmluc3RydWN0b3JOdW1iZXIgPSB0aGlzLmluc3RydWN0b3JOdW1iZXIubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbHRlclN0YWZmKHVzZXJUeXBlKSB7XHJcbiAgICAgIHRoaXMudXNlcnMgPSB0aGlzLnVzZXJzQmFja3VwO1xyXG4gICAgICBpZiAodXNlclR5cGUgPT09ICd0b3RhbCcpIHtcclxuICAgICAgICB0aGlzLnVzZXJzID0gdGhpcy51c2Vyc0JhY2t1cDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnVzZXJzID0gdGhpcy51c2Vycy5maWx0ZXIoeCA9PiB4LnVzZXJUeXBlLmluZGV4T2YodXNlclR5cGUpICE9PSAtMSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5RXJyb3JBbGVydChlcnJvcikge1xyXG4gICAgICBzd2FsKFxyXG4gICAgICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgICAgICBlcnJvci5tc2csXHJcbiAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgIH1cclxufVxyXG4iXX0=
