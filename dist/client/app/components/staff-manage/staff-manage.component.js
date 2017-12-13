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
        this.router.navigate(['/staff-edit', user.staffID]);
    };
    StaffManageComponent.prototype.addUser = function () {
        this.router.navigate(['/staff-edit', 'new']);
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
            if (isConfirm) {
                _this.deleteUser(user, event);
            }
        }).catch(function (error) {
            //console.log("Canceled");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdGFmZi1tYW5hZ2Uvc3RhZmYtbWFuYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCw4REFBNEQ7QUFFNUQsMENBQXlDO0FBV3pDO0lBU0ksOEJBQW9CLE1BQWMsRUFBVSxZQUEwQjtRQUFsRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7SUFFdEUsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFBQSxpQkFpQkM7UUFoQkcsSUFBSSxDQUFDLFlBQVk7YUFDZCxRQUFRLEVBQUU7YUFDVixJQUFJLENBQUMsVUFBQSxLQUFLO1lBQ1QsRUFBRSxDQUFDLENBQUUsS0FBYSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNwQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ25CLEdBQUcsQ0FBQyxDQUFhLFVBQVUsRUFBVixLQUFBLEtBQUksQ0FBQyxLQUFLLEVBQVYsY0FBVSxFQUFWLElBQVU7b0JBQXRCLElBQUksSUFBSSxTQUFBO29CQUNYLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztpQkFDdEQ7Z0JBQ0QsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDO2dCQUM5QixLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0JBQ2hDLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQixDQUFDO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsdUNBQVEsR0FBUixVQUFTLElBQVUsRUFBRSxLQUFVO1FBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxzQ0FBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsMENBQVcsR0FBWCxVQUFZLElBQVUsRUFBRSxLQUFVO1FBQWxDLGlCQWdCQztRQWZHLElBQUksQ0FBQztZQUNELEtBQUssRUFBRSxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJO1lBQ3BFLElBQUksRUFBRSxtQ0FBbUM7WUFDekMsSUFBSSxFQUFFLFNBQVM7WUFDZixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLGtCQUFrQixFQUFFLFNBQVM7WUFDN0IsaUJBQWlCLEVBQUUsTUFBTTtZQUN6QixpQkFBaUIsRUFBRSxjQUFjO1NBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxTQUFTO1lBQ2YsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDZCxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMvQixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSztZQUNaLDBCQUEwQjtRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx5Q0FBVSxHQUFWLFVBQVcsSUFBVSxFQUFFLEtBQVU7UUFBakMsaUJBZ0JDO1FBZkcsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZO2FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNaLElBQUksQ0FBQyxVQUFBLEdBQUc7WUFDTCxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxLQUFLLElBQUksRUFBVixDQUFVLENBQUMsQ0FBQztZQUNoRCxLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUM7WUFDOUIsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNyQyxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUNBLFVBQVUsRUFDVix3QkFBd0IsRUFDeEIsU0FBUyxDQUNaLENBQUM7UUFDTixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCwwQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUF0QixDQUFzQixDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQXRCLENBQXNCLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQzNDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLEtBQUssWUFBWSxFQUEzQixDQUEyQixDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7SUFDdkQsQ0FBQztJQUVELDBDQUFXLEdBQVgsVUFBWSxRQUFRO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM5QixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDaEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUF2QixDQUF1QixDQUFDLENBQUM7UUFDL0QsQ0FBQztJQUNILENBQUM7SUFFRCxxQ0FBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBcEdRLG9CQUFvQjtRQVBoQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLDJEQUEyRDtZQUN4RSxTQUFTLEVBQUUsQ0FBQywwREFBMEQsQ0FBQztTQUMxRSxDQUFDO3lDQVk4QixlQUFNLEVBQXdCLDRCQUFZO09BVDdELG9CQUFvQixDQXFHaEM7SUFBRCwyQkFBQztDQXJHRCxBQXFHQyxJQUFBO0FBckdZLG9EQUFvQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9zdGFmZi1tYW5hZ2Uvc3RhZmYtbWFuYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN0YWZmU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdGFmZi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3VzZXJcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdzdGFmZi1tYW5hZ2UnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3N0YWZmLW1hbmFnZS9zdGFmZi1tYW5hZ2UuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvc3RhZmYtbWFuYWdlL3N0YWZmLW1hbmFnZS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU3RhZmZNYW5hZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgdXNlcnM6IFVzZXJbXTtcclxuICAgIHVzZXJzQmFja3VwOiBVc2VyW107XHJcbiAgICBlcnJvcjogYW55O1xyXG4gICAgdXNlcnNMZW5ndGg6IGFueTtcclxuICAgIGFkbWluTnVtYmVyOiBhbnk7XHJcbiAgICBzdGFmZk51bWJlcjogYW55O1xyXG4gICAgaW5zdHJ1Y3Rvck51bWJlcjogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgc3RhZmZTZXJ2aWNlOiBTdGFmZlNlcnZpY2UpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRVc2VycygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJzKCkge1xyXG4gICAgICAgIHRoaXMuc3RhZmZTZXJ2aWNlXHJcbiAgICAgICAgICAuZ2V0VXNlcnMoKVxyXG4gICAgICAgICAgLnRoZW4odXNlcnMgPT4ge1xyXG4gICAgICAgICAgICBpZiAoKHVzZXJzIGFzIGFueSkuc3RhdHVzID09PSBcIjQwM1wiKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy51c2VycyA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy51c2VycyA9IHVzZXJzO1xyXG4gICAgICAgICAgICAgIGZvciAobGV0IHVzZXIgb2YgdGhpcy51c2Vycykge1xyXG4gICAgICAgICAgICAgICAgdXNlci5mdWxsTmFtZSA9IHVzZXIuZmlyc3ROYW1lICsgXCIgXCIgKyB1c2VyLmxhc3ROYW1lO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB0aGlzLnVzZXJzQmFja3VwID0gdGhpcy51c2VycztcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJzTGVuZ3RoID0gdXNlcnMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdHMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGdvdG9FZGl0KHVzZXI6IFVzZXIsIGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zdGFmZi1lZGl0JywgdXNlci5zdGFmZklEXSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVXNlcigpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zdGFmZi1lZGl0JywgJ25ldyddKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVBbGVydCh1c2VyOiBVc2VyLCBldmVudDogYW55KSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnRGVsZXRlIHVzZXIgKCcgKyB1c2VyLmZpcnN0TmFtZSArICcgJyArIHVzZXIubGFzdE5hbWUgKyAnKT8nLFxyXG4gICAgICAgICAgICB0ZXh0OiBcIllvdSB3b24ndCBiZSBhYmxlIHRvIHJldmVydCB0aGlzIVwiLFxyXG4gICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgZGVsZXRlISdcclxuICAgICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgICBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlVXNlcih1c2VyLCBldmVudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNhbmNlbGVkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVVzZXIodXNlcjogVXNlciwgZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuc3RhZmZTZXJ2aWNlXHJcbiAgICAgICAgICAuZGVsZXRlKHVzZXIpXHJcbiAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlcnMgPSB0aGlzLnVzZXJzLmZpbHRlcihoID0+IGggIT09IHVzZXIpO1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlcnNCYWNrdXAgPSB0aGlzLnVzZXJzO1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlcnNMZW5ndGggPSB0aGlzLnVzZXJzLmxlbmd0aDtcclxuICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRzKCk7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgJ0RlbGV0ZWQhJyxcclxuICAgICAgICAgICAgICAgICAgJ1VzZXIgaGFzIGJlZW4gZGVsZXRlZC4nLFxyXG4gICAgICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVN0YXRzKCkge1xyXG4gICAgICB0aGlzLmFkbWluTnVtYmVyID0gdGhpcy51c2Vycy5maWx0ZXIoeCA9PiB4LnVzZXJUeXBlID09PSBcIkFkbWluXCIpO1xyXG4gICAgICB0aGlzLmFkbWluTnVtYmVyID0gdGhpcy5hZG1pbk51bWJlci5sZW5ndGg7XHJcbiAgICAgIHRoaXMuc3RhZmZOdW1iZXIgPSB0aGlzLnVzZXJzLmZpbHRlcih4ID0+IHgudXNlclR5cGUgPT09IFwiU3RhZmZcIik7XHJcbiAgICAgIHRoaXMuc3RhZmZOdW1iZXIgPSB0aGlzLnN0YWZmTnVtYmVyLmxlbmd0aDtcclxuICAgICAgdGhpcy5pbnN0cnVjdG9yTnVtYmVyID0gdGhpcy51c2Vycy5maWx0ZXIoeCA9PiB4LnVzZXJUeXBlID09PSBcIkluc3RydWN0b3JcIik7XHJcbiAgICAgIHRoaXMuaW5zdHJ1Y3Rvck51bWJlciA9IHRoaXMuaW5zdHJ1Y3Rvck51bWJlci5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgZmlsdGVyU3RhZmYodXNlclR5cGUpIHtcclxuICAgICAgdGhpcy51c2VycyA9IHRoaXMudXNlcnNCYWNrdXA7XHJcbiAgICAgIGlmICh1c2VyVHlwZSA9PT0gJ3RvdGFsJykge1xyXG4gICAgICAgIHRoaXMudXNlcnMgPSB0aGlzLnVzZXJzQmFja3VwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudXNlcnMgPSB0aGlzLnVzZXJzLmZpbHRlcih4ID0+IHgudXNlclR5cGUgPT09IHVzZXJUeXBlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICB9XHJcbn1cclxuIl19
