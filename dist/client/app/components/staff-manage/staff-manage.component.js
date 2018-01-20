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
            if (users.status === "403") {
                _this.users = null;
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
            title: 'Delete user (' + user.firstName + ' ' + user.lastName + ')?',
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
            _this.users = _this.users.filter(function (h) { return h !== user; });
            _this.usersBackup = _this.users;
            _this.usersLength = _this.users.length;
            _this.updateStats();
            swal('Deleted!', 'User has been deleted.', 'success');
        })
            .catch(function (error) { return _this.error = error; });
    };
    StaffManageComponent.prototype.updateStats = function () {
        this.adminNumber = this.users.filter(function (x) { return x.userType === "Admin"; });
        this.adminNumber = this.adminNumber.length;
        this.staffNumber = this.users.filter(function (x) { return x.userType === "Staff"; });
        this.staffNumber = this.staffNumber.length;
        this.instructorNumber = this.users.filter(function (x) { return x.userType === "Instructor"; });
        this.instructorNumber = this.instructorNumber.length;
    };
    StaffManageComponent.prototype.filterStaff = function (userType) {
        this.users = this.usersBackup;
        if (userType === 'total') {
            this.users = this.usersBackup;
        }
        else {
            this.users = this.users.filter(function (x) { return x.userType === userType; });
        }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdGFmZi1tYW5hZ2Uvc3RhZmYtbWFuYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCw4REFBNEQ7QUFFNUQsMENBQXlDO0FBV3pDO0lBU0ksOEJBQW9CLE1BQWMsRUFBVSxZQUEwQjtRQUFsRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7SUFFdEUsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFBQSxpQkFpQkM7UUFoQkcsSUFBSSxDQUFDLFlBQVk7YUFDZCxRQUFRLEVBQUU7YUFDVixJQUFJLENBQUMsVUFBQSxLQUFLO1lBQ1QsRUFBRSxDQUFDLENBQUUsS0FBYSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNwQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ25CLEdBQUcsQ0FBQyxDQUFhLFVBQVUsRUFBVixLQUFBLEtBQUksQ0FBQyxLQUFLLEVBQVYsY0FBVSxFQUFWLElBQVU7b0JBQXRCLElBQUksSUFBSSxTQUFBO29CQUNYLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztpQkFDdEQ7Z0JBQ0QsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDO2dCQUM5QixLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0JBQ2hDLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQixDQUFDO1FBQ0gsQ0FBQyxD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b0JBQW9CLENBdUdoQztJQUFELDJCQUFDO0NBdkdELEFBdUdDLElBQUE7QUF2R1ksb0RBQW9CIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3N0YWZmLW1hbmFnZS9zdGFmZi1tYW5hZ2UuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3RhZmZTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0YWZmLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvdXNlclwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3N0YWZmLW1hbmFnZScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvc3RhZmYtbWFuYWdlL3N0YWZmLW1hbmFnZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9zdGFmZi1tYW5hZ2Uvc3RhZmYtbWFuYWdlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFmZk1hbmFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICB1c2VyczogVXNlcltdO1xyXG4gICAgdXNlcnNCYWNrdXA6IFVzZXJbXTtcclxuICAgIGVycm9yOiBhbnk7XHJcbiAgICB1c2Vyc0xlbmd0aDogYW55O1xyXG4gICAgYWRtaW5OdW1iZXI6IGFueTtcclxuICAgIHN0YWZmTnVtYmVyOiBhbnk7XHJcbiAgICBpbnN0cnVjdG9yTnVtYmVyOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBzdGFmZlNlcnZpY2U6IFN0YWZmU2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmdldFVzZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlcnMoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFmZlNlcnZpY2VcclxuICAgICAgICAgIC5nZXRVc2VycygpXHJcbiAgICAgICAgICAudGhlbih1c2VycyA9PiB7XHJcbiAgICAgICAgICAgIGlmICgodXNlcnMgYXMgYW55KS5zdGF0dXMgPT09IFwiNDAzXCIpIHtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJzID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJzID0gdXNlcnM7XHJcbiAgICAgICAgICAgICAgZm9yIChsZXQgdXNlciBvZiB0aGlzLnVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyLmZ1bGxOYW1lID0gdXNlci5maXJzdE5hbWUgKyBcIiBcIiArIHVzZXIubGFzdE5hbWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHRoaXMudXNlcnNCYWNrdXAgPSB0aGlzLnVzZXJzO1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlcnNMZW5ndGggPSB1c2Vycy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgZ290b0VkaXQodXNlcjogVXNlciwgZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3N0YWZmLWRldGFpbHMnLCB1c2VyLnVzZXJJRF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFVzZXIoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3RhZmYtZGV0YWlscycsICduZXcnXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlQWxlcnQodXNlcjogVXNlciwgZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ0RlbGV0ZSB1c2VyICgnICsgdXNlci5maXJzdE5hbWUgKyAnICcgKyB1c2VyLmxhc3ROYW1lICsgJyk/JyxcclxuICAgICAgICAgICAgdGV4dDogXCJZb3Ugd29uJ3QgYmUgYWJsZSB0byByZXZlcnQgdGhpcyFcIixcclxuICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIGRlbGV0ZSEnXHJcbiAgICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpc0NvbmZpcm0uZGlzbWlzcyk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZVVzZXIodXNlciwgZXZlbnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVVc2VyKHVzZXI6IFVzZXIsIGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0aGlzLnN0YWZmU2VydmljZVxyXG4gICAgICAgICAgLmRlbGV0ZSh1c2VyKVxyXG4gICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJzID0gdGhpcy51c2Vycy5maWx0ZXIoaCA9PiBoICE9PSB1c2VyKTtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJzQmFja3VwID0gdGhpcy51c2VycztcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJzTGVuZ3RoID0gdGhpcy51c2Vycy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0cygpO1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICdEZWxldGVkIScsXHJcbiAgICAgICAgICAgICAgICAgICdVc2VyIGhhcyBiZWVuIGRlbGV0ZWQuJyxcclxuICAgICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTdGF0cygpIHtcclxuICAgICAgdGhpcy5hZG1pbk51bWJlciA9IHRoaXMudXNlcnMuZmlsdGVyKHggPT4geC51c2VyVHlwZSA9PT0gXCJBZG1pblwiKTtcclxuICAgICAgdGhpcy5hZG1pbk51bWJlciA9IHRoaXMuYWRtaW5OdW1iZXIubGVuZ3RoO1xyXG4gICAgICB0aGlzLnN0YWZmTnVtYmVyID0gdGhpcy51c2Vycy5maWx0ZXIoeCA9PiB4LnVzZXJUeXBlID09PSBcIlN0YWZmXCIpO1xyXG4gICAgICB0aGlzLnN0YWZmTnVtYmVyID0gdGhpcy5zdGFmZk51bWJlci5sZW5ndGg7XHJcbiAgICAgIHRoaXMuaW5zdHJ1Y3Rvck51bWJlciA9IHRoaXMudXNlcnMuZmlsdGVyKHggPT4geC51c2VyVHlwZSA9PT0gXCJJbnN0cnVjdG9yXCIpO1xyXG4gICAgICB0aGlzLmluc3RydWN0b3JOdW1iZXIgPSB0aGlzLmluc3RydWN0b3JOdW1iZXIubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbHRlclN0YWZmKHVzZXJUeXBlKSB7XHJcbiAgICAgIHRoaXMudXNlcnMgPSB0aGlzLnVzZXJzQmFja3VwO1xyXG4gICAgICBpZiAodXNlclR5cGUgPT09ICd0b3RhbCcpIHtcclxuICAgICAgICB0aGlzLnVzZXJzID0gdGhpcy51c2Vyc0JhY2t1cDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnVzZXJzID0gdGhpcy51c2Vycy5maWx0ZXIoeCA9PiB4LnVzZXJUeXBlID09PSB1c2VyVHlwZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnb0JhY2soKSB7XHJcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
