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
var StaffManageComponent = (function () {
    function StaffManageComponent(router, userService) {
        this.router = router;
        this.userService = userService;
    }
    StaffManageComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    StaffManageComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService
            .getUsers()
            .then(function (users) {
            if (users.status === "403") {
                _this.users = null;
            }
            else {
                _this.users = users;
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
    StaffManageComponent.prototype.deleteUser = function (user, event) {
        var _this = this;
        event.stopPropagation();
        this.userService
            .delete(user)
            .then(function (res) {
            _this.users = _this.users.filter(function (h) { return h !== user; });
        })
            .catch(function (error) { return _this.error = error; });
    };
    StaffManageComponent.prototype.goBack = function () {
        window.history.back();
    };
    return StaffManageComponent;
}());
StaffManageComponent = __decorate([
    core_1.Component({
        selector: 'staff-manage',
        templateUrl: './app/components/staff-manage/staff-manage.component.html',
        styleUrls: ['./app/components/staff-manage/staff-manage.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, staff_service_1.StaffService])
], StaffManageComponent);
exports.StaffManageComponent = StaffManageComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdGFmZi1tYW5hZ2Uvc3RhZmYtbWFuYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCw4REFBNEQ7QUFFNUQsMENBQXlDO0FBU3pDLElBQWEsb0JBQW9CO0lBSTdCLDhCQUFvQixNQUFjLEVBQVUsV0FBeUI7UUFBakQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFjO0lBRXJFLENBQUM7SUFFRCx1Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCx1Q0FBUSxHQUFSO1FBQUEsaUJBV0M7UUFWRyxJQUFJLENBQUMsV0FBVzthQUNiLFFBQVEsRUFBRTthQUNWLElBQUksQ0FBQyxVQUFBLEtBQUs7WUFDVCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNyQixDQUFDO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsdUNBQVEsR0FBUixVQUFTLElBQVUsRUFBRSxLQUFVO1FBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxzQ0FBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQseUNBQVUsR0FBVixVQUFXLElBQVUsRUFBRSxLQUFVO1FBQWpDLGlCQVFDO1FBUEcsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXO2FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNaLElBQUksQ0FBQyxVQUFBLEdBQUc7WUFDTCxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxLQUFLLElBQUksRUFBVixDQUFVLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxxQ0FBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBQ0wsMkJBQUM7QUFBRCxDQTlDQSxBQThDQyxJQUFBO0FBOUNZLG9CQUFvQjtJQVBoQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGNBQWM7UUFDeEIsV0FBVyxFQUFFLDJEQUEyRDtRQUN4RSxTQUFTLEVBQUUsQ0FBQywwREFBMEQsQ0FBQztLQUMxRSxDQUFDO3FDQU84QixlQUFNLEVBQXVCLDRCQUFZO0dBSjVELG9CQUFvQixDQThDaEM7QUE5Q1ksb0RBQW9CIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3N0YWZmLW1hbmFnZS9zdGFmZi1tYW5hZ2UuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3RhZmZTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0YWZmLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvdXNlclwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3N0YWZmLW1hbmFnZScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvc3RhZmYtbWFuYWdlL3N0YWZmLW1hbmFnZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9zdGFmZi1tYW5hZ2Uvc3RhZmYtbWFuYWdlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFmZk1hbmFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICB1c2VyczogVXNlcltdO1xyXG4gICAgZXJyb3I6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHVzZXJTZXJ2aWNlOiBTdGFmZlNlcnZpY2UpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRVc2VycygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJzKCkge1xyXG4gICAgICAgIHRoaXMudXNlclNlcnZpY2VcclxuICAgICAgICAgIC5nZXRVc2VycygpXHJcbiAgICAgICAgICAudGhlbih1c2VycyA9PiB7XHJcbiAgICAgICAgICAgIGlmICh1c2Vycy5zdGF0dXMgPT09IFwiNDAzXCIpIHtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJzID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJzID0gdXNlcnM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBnb3RvRWRpdCh1c2VyOiBVc2VyLCBldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3RhZmYtZWRpdCcsIHVzZXIuc3RhZmZJRF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFVzZXIoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3RhZmYtZWRpdCcsICduZXcnXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlVXNlcih1c2VyOiBVc2VyLCBldmVudDogYW55KSB7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdGhpcy51c2VyU2VydmljZVxyXG4gICAgICAgICAgLmRlbGV0ZSh1c2VyKVxyXG4gICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJzID0gdGhpcy51c2Vycy5maWx0ZXIoaCA9PiBoICE9PSB1c2VyKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBnb0JhY2soKSB7XHJcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
