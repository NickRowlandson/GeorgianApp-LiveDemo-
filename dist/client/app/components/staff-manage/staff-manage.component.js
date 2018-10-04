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
const core_1 = require("@angular/core");
const staff_service_1 = require("../../services/staff.service");
const student_service_1 = require("../../services/student.service");
const router_1 = require("@angular/router");
let StaffManageComponent = class StaffManageComponent {
    constructor(router, staffService, studentService) {
        this.router = router;
        this.staffService = staffService;
        this.studentService = studentService;
    }
    ngOnInit() {
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();
        this.getUsers();
    }
    getUsers() {
        this.staffService
            .getUsers()
            .then(users => {
            if (users.result === "error") {
                this.users = null;
                this.displayErrorAlert(users);
            }
            else {
                this.users = users;
                for (let user of this.users) {
                    user.fullName = user.firstName + " " + user.lastName;
                }
                this.usersBackup = this.users;
                this.usersLength = users.length;
                this.updateStats();
            }
        })
            .catch(error => this.error = error);
    }
    runAttendanceCheck() {
        this.studentService
            .manualAttendanceCheck()
            .then(result => {
            if (result.result === "error") {
                this.displayErrorAlert(result);
            }
            else {
                swal(result.title, result.msg, 'success');
            }
        })
            .catch(error => this.error = error);
    }
    gotoEdit(user, event) {
        this.router.navigate(['/staff-details', user.userID]);
    }
    addUser() {
        this.router.navigate(['/staff-details', 'new']);
    }
    deleteAlert(user, event) {
        swal({
            title: 'Delete ' + user.firstName + ' ' + user.lastName + '?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!'
        }).then(isConfirm => {
            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                console.log(isConfirm.dismiss);
            }
            else if (isConfirm) {
                this.deleteUser(user, event);
            }
        }).catch(error => {
            console.log(error);
        });
    }
    deleteUser(user, event) {
        event.stopPropagation();
        this.staffService
            .delete(user)
            .then(res => {
            console.log(res);
            if (res.result === "error") {
                this.displayErrorAlert(res);
            }
            else if (res.result === "success") {
                this.users = this.users.filter(h => h !== user);
                this.usersBackup = this.users;
                this.usersLength = this.users.length;
                this.updateStats();
                swal('Deleted!', 'User has been deleted.', 'success');
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
            }
        })
            .catch(error => this.error = error);
    }
    updateStats() {
        this.adminNumber = this.users.filter(x => x.userType.indexOf("Admin") !== -1);
        this.adminNumber = this.adminNumber.length;
        this.staffNumber = this.users.filter(x => x.userType.indexOf("Staff") !== -1);
        this.staffNumber = this.staffNumber.length;
        this.instructorNumber = this.users.filter(x => x.userType.indexOf("Instructor") !== -1);
        this.instructorNumber = this.instructorNumber.length;
        swal.close();
    }
    filterStaff(userType) {
        this.users = this.usersBackup;
        if (userType === 'total') {
            this.users = this.usersBackup;
        }
        else {
            this.users = this.users.filter(x => x.userType.indexOf(userType) !== -1);
        }
    }
    displayErrorAlert(error) {
        swal(error.title, error.msg, 'error');
    }
    goBack() {
        window.history.back();
    }
};
StaffManageComponent = __decorate([
    core_1.Component({
        selector: 'staff-manage',
        templateUrl: './app/components/staff-manage/staff-manage.component.html',
        styleUrls: ['./app/components/staff-manage/staff-manage.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, staff_service_1.StaffService, student_service_1.StudentService])
], StaffManageComponent);
exports.StaffManageComponent = StaffManageComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdGFmZi1tYW5hZ2Uvc3RhZmYtbWFuYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUFrRDtBQUNsRCxnRUFBNEQ7QUFDNUQsb0VBQWdFO0FBRWhFLDRDQUF5QztBQVd6QyxJQUFhLG9CQUFvQixHQUFqQztJQVNJLFlBQW9CLE1BQWMsRUFBVSxZQUEwQixFQUFVLGNBQThCO1FBQTFGLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUU5RyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQztZQUNILEtBQUssRUFBRSxZQUFZO1lBQ25CLGlCQUFpQixFQUFFLEtBQUs7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxZQUFZO2FBQ2QsUUFBUSxFQUFFO2FBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ1osSUFBSyxLQUFhLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtnQkFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxpQkFBaUIsQ0FBRSxLQUFhLENBQUMsQ0FBQzthQUN4QztpQkFBTTtnQkFDTCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDbkIsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7aUJBQ3REO2dCQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFD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Q3hGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO1FBQ3JELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxXQUFXLENBQUMsUUFBUTtRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDOUIsSUFBSSxRQUFRLEtBQUssT0FBTyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUMvQjthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUU7SUFDSCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBSztRQUNyQixJQUFJLENBQ0EsS0FBSyxDQUFDLEtBQUssRUFDWCxLQUFLLENBQUMsR0FBRyxFQUNULE9BQU8sQ0FDVixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7Q0FDSixDQUFBO0FBbEpZLG9CQUFvQjtJQVBoQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGNBQWM7UUFDeEIsV0FBVyxFQUFFLDJEQUEyRDtRQUN4RSxTQUFTLEVBQUUsQ0FBQywwREFBMEQsQ0FBQztLQUMxRSxDQUFDO3FDQVk4QixlQUFNLEVBQXdCLDRCQUFZLEVBQTBCLGdDQUFjO0dBVHJHLG9CQUFvQixDQWtKaEM7QUFsSlksb0RBQW9CIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3N0YWZmLW1hbmFnZS9zdGFmZi1tYW5hZ2UuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3RhZmZTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0YWZmLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3VzZXJcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdzdGFmZi1tYW5hZ2UnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3N0YWZmLW1hbmFnZS9zdGFmZi1tYW5hZ2UuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvc3RhZmYtbWFuYWdlL3N0YWZmLW1hbmFnZS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU3RhZmZNYW5hZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgdXNlcnM6IFVzZXJbXTtcclxuICAgIHVzZXJzQmFja3VwOiBVc2VyW107XHJcbiAgICBlcnJvcjogYW55O1xyXG4gICAgdXNlcnNMZW5ndGg6IGFueTtcclxuICAgIGFkbWluTnVtYmVyOiBhbnk7XHJcbiAgICBzdGFmZk51bWJlcjogYW55O1xyXG4gICAgaW5zdHJ1Y3Rvck51bWJlcjogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgc3RhZmZTZXJ2aWNlOiBTdGFmZlNlcnZpY2UsIHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogJ0xvYWRpbmcuLi4nLFxyXG4gICAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgICB9KTtcclxuICAgICAgc3dhbC5zaG93TG9hZGluZygpO1xyXG4gICAgICB0aGlzLmdldFVzZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlcnMoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFmZlNlcnZpY2VcclxuICAgICAgICAgIC5nZXRVc2VycygpXHJcbiAgICAgICAgICAudGhlbih1c2VycyA9PiB7XHJcbiAgICAgICAgICAgIGlmICgodXNlcnMgYXMgYW55KS5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlcnMgPSBudWxsO1xyXG4gICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoKHVzZXJzIGFzIGFueSkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlcnMgPSB1c2VycztcclxuICAgICAgICAgICAgICBmb3IgKGxldCB1c2VyIG9mIHRoaXMudXNlcnMpIHtcclxuICAgICAgICAgICAgICAgIHVzZXIuZnVsbE5hbWUgPSB1c2VyLmZpcnN0TmFtZSArIFwiIFwiICsgdXNlci5sYXN0TmFtZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdGhpcy51c2Vyc0JhY2t1cCA9IHRoaXMudXNlcnM7XHJcbiAgICAgICAgICAgICAgdGhpcy51c2Vyc0xlbmd0aCA9IHVzZXJzLmxlbmd0aDtcclxuICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBydW5BdHRlbmRhbmNlQ2hlY2soKSB7XHJcbiAgICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgLm1hbnVhbEF0dGVuZGFuY2VDaGVjaygpXHJcbiAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydCgocmVzdWx0IGFzIGFueSkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgIHJlc3VsdC50aXRsZSxcclxuICAgICAgICAgICAgICAgICAgcmVzdWx0Lm1zZyxcclxuICAgICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGdvdG9FZGl0KHVzZXI6IFVzZXIsIGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zdGFmZi1kZXRhaWxzJywgdXNlci51c2VySURdKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRVc2VyKCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3N0YWZmLWRldGFpbHMnLCAnbmV3J10pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUFsZXJ0KHVzZXI6IFVzZXIsIGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgdGl0bGU6ICdEZWxldGUgJyArIHVzZXIuZmlyc3ROYW1lICsgJyAnICsgdXNlci5sYXN0TmFtZSArICc/JyxcclxuICAgICAgICAgICAgdGV4dDogXCJZb3Ugd29uJ3QgYmUgYWJsZSB0byByZXZlcnQgdGhpcyFcIixcclxuICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIGRlbGV0ZSEnXHJcbiAgICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpc0NvbmZpcm0uZGlzbWlzcyk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZVVzZXIodXNlciwgZXZlbnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVVc2VyKHVzZXI6IFVzZXIsIGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0aGlzLnN0YWZmU2VydmljZVxyXG4gICAgICAgICAgLmRlbGV0ZSh1c2VyKVxyXG4gICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgaWYgKChyZXMgYXMgYW55KS5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoKHJlcyBhcyBhbnkpKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzIGFzIGFueSkucmVzdWx0ID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlcnMgPSB0aGlzLnVzZXJzLmZpbHRlcihoID0+IGggIT09IHVzZXIpO1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlcnNCYWNrdXAgPSB0aGlzLnVzZXJzO1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlcnNMZW5ndGggPSB0aGlzLnVzZXJzLmxlbmd0aDtcclxuICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRzKCk7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgJ0RlbGV0ZWQhJyxcclxuICAgICAgICAgICAgICAgICAgJ1VzZXIgaGFzIGJlZW4gZGVsZXRlZC4nLFxyXG4gICAgICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVN0YXRzKCkge1xyXG4gICAgICB0aGlzLmFkbWluTnVtYmVyID0gdGhpcy51c2Vycy5maWx0ZXIoeCA9PiB4LnVzZXJUeXBlLmluZGV4T2YoXCJBZG1pblwiKSAhPT0gLTEpO1xyXG4gICAgICB0aGlzLmFkbWluTnVtYmVyID0gdGhpcy5hZG1pbk51bWJlci5sZW5ndGg7XHJcbiAgICAgIHRoaXMuc3RhZmZOdW1iZXIgPSB0aGlzLnVzZXJzLmZpbHRlcih4ID0+IHgudXNlclR5cGUuaW5kZXhPZihcIlN0YWZmXCIpICE9PSAtMSk7XHJcbiAgICAgIHRoaXMuc3RhZmZOdW1iZXIgPSB0aGlzLnN0YWZmTnVtYmVyLmxlbmd0aDtcclxuICAgICAgdGhpcy5pbnN0cnVjdG9yTnVtYmVyID0gdGhpcy51c2Vycy5maWx0ZXIoeCA9PiB4LnVzZXJUeXBlLmluZGV4T2YoXCJJbnN0cnVjdG9yXCIpICE9PSAtMSk7XHJcbiAgICAgIHRoaXMuaW5zdHJ1Y3Rvck51bWJlciA9IHRoaXMuaW5zdHJ1Y3Rvck51bWJlci5sZW5ndGg7XHJcbiAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBmaWx0ZXJTdGFmZih1c2VyVHlwZSkge1xyXG4gICAgICB0aGlzLnVzZXJzID0gdGhpcy51c2Vyc0JhY2t1cDtcclxuICAgICAgaWYgKHVzZXJUeXBlID09PSAndG90YWwnKSB7XHJcbiAgICAgICAgdGhpcy51c2VycyA9IHRoaXMudXNlcnNCYWNrdXA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy51c2VycyA9IHRoaXMudXNlcnMuZmlsdGVyKHggPT4geC51c2VyVHlwZS5pbmRleE9mKHVzZXJUeXBlKSAhPT0gLTEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheUVycm9yQWxlcnQoZXJyb3IpIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICAgICAgZXJyb3IubXNnLFxyXG4gICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICB9XHJcbn1cclxuIl19
