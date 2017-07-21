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
            swal('Deleted!', 'User has been deleted.', 'success');
        })
            .catch(function (error) { return _this.error = error; });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdGFmZi1tYW5hZ2Uvc3RhZmYtbWFuYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCw4REFBNEQ7QUFFNUQsMENBQXlDO0FBV3pDO0lBSUksOEJBQW9CLE1BQWMsRUFBVSxZQUEwQjtRQUFsRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7SUFFdEUsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFBQSxpQkFXQztRQVZHLElBQUksQ0FBQyxZQUFZO2FBQ2QsUUFBUSxFQUFFO2FBQ1YsSUFBSSxDQUFDLFVBQUEsS0FBSztZQUNULEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDcEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLENBQUM7UUFDSCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCx1Q0FBUSxHQUFSLFVBQVMsSUFBVSxFQUFFLEtBQVU7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELHNDQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCwwQ0FBVyxHQUFYLFVBQVksSUFBVSxFQUFFLEtBQVU7UUFBbEMsaUJBZ0JDO1FBZkcsSUFBSSxDQUFDO1lBQ0QsS0FBSyxFQUFFLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUk7WUFDcEUsSUFBSSxFQUFFLG1DQUFtQztZQUN6QyxJQUFJLEVBQUUsU0FBUztZQUNmLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsa0JBQWtCLEVBQUUsU0FBUztZQUM3QixpQkFBaUIsRUFBRSxNQUFNO1lBQ3pCLGlCQUFpQixFQUFFLGNBQWM7U0FDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFNBQVM7WUFDZixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNkLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQy9CLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLO1lBQ1osMEJBQTBCO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHlDQUFVLEdBQVYsVUFBVyxJQUFVLEVBQUUsS0FBVTtRQUFqQyxpQkFhQztRQVpHLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWTthQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDWixJQUFJLENBQUMsVUFBQSxHQUFHO1lBQ0wsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsS0FBSyxJQUFJLEVBQVYsQ0FBVSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUNBLFVBQVUsRUFDVix3QkFBd0IsRUFDeEIsU0FBUyxDQUNaLENBQUM7UUFDTixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxxQ0FBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBcEVRLG9CQUFvQjtRQVBoQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLDJEQUEyRDtZQUN4RSxTQUFTLEVBQUUsQ0FBQywwREFBMEQsQ0FBQztTQUMxRSxDQUFDO3lDQU84QixlQUFNLEVBQXdCLDRCQUFZO09BSjdELG9CQUFvQixDQXFFaEM7SUFBRCwyQkFBQztDQXJFRCxBQXFFQyxJQUFBO0FBckVZLG9EQUFvQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9zdGFmZi1tYW5hZ2Uvc3RhZmYtbWFuYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN0YWZmU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdGFmZi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3VzZXJcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdzdGFmZi1tYW5hZ2UnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3N0YWZmLW1hbmFnZS9zdGFmZi1tYW5hZ2UuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvc3RhZmYtbWFuYWdlL3N0YWZmLW1hbmFnZS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU3RhZmZNYW5hZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgdXNlcnM6IFVzZXJbXTtcclxuICAgIGVycm9yOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBzdGFmZlNlcnZpY2U6IFN0YWZmU2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmdldFVzZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlcnMoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFmZlNlcnZpY2VcclxuICAgICAgICAgIC5nZXRVc2VycygpXHJcbiAgICAgICAgICAudGhlbih1c2VycyA9PiB7XHJcbiAgICAgICAgICAgIGlmICh1c2Vycy5zdGF0dXMgPT09IFwiNDAzXCIpIHtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJzID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJzID0gdXNlcnM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBnb3RvRWRpdCh1c2VyOiBVc2VyLCBldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3RhZmYtZWRpdCcsIHVzZXIuc3RhZmZJRF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFVzZXIoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3RhZmYtZWRpdCcsICduZXcnXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlQWxlcnQodXNlcjogVXNlciwgZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ0RlbGV0ZSB1c2VyICgnICsgdXNlci5maXJzdE5hbWUgKyAnICcgKyB1c2VyLmxhc3ROYW1lICsgJyk/JyxcclxuICAgICAgICAgICAgdGV4dDogXCJZb3Ugd29uJ3QgYmUgYWJsZSB0byByZXZlcnQgdGhpcyFcIixcclxuICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIGRlbGV0ZSEnXHJcbiAgICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgICAgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZVVzZXIodXNlciwgZXZlbnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2coXCJDYW5jZWxlZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVVc2VyKHVzZXI6IFVzZXIsIGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0aGlzLnN0YWZmU2VydmljZVxyXG4gICAgICAgICAgLmRlbGV0ZSh1c2VyKVxyXG4gICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJzID0gdGhpcy51c2Vycy5maWx0ZXIoaCA9PiBoICE9PSB1c2VyKTtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAnRGVsZXRlZCEnLFxyXG4gICAgICAgICAgICAgICAgICAnVXNlciBoYXMgYmVlbiBkZWxldGVkLicsXHJcbiAgICAgICAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgIH1cclxufVxyXG4iXX0=
