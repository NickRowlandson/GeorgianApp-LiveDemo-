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
        if (error.title === "Auth Error") {
            this.router.navigate(['/login']);
            swal(error.title, error.msg, 'info');
        }
        else {
            swal(error.title, error.msg, 'error');
        }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdGFmZi1tYW5hZ2Uvc3RhZmYtbWFuYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUFrRDtBQUNsRCxnRUFBNEQ7QUFDNUQsb0VBQWdFO0FBRWhFLDRDQUF5QztBQVd6QyxJQUFhLG9CQUFvQixHQUFqQztJQVNJLFlBQW9CLE1BQWMsRUFBVSxZQUEwQixFQUFVLGNBQThCO1FBQTFGLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUU5RyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQztZQUNILEtBQUssRUFBRSxZQUFZO1lBQ25CLGlCQUFpQixFQUFFLEtBQUs7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxZQUFZO2FBQ2QsUUFBUSxFQUFFO2FBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ1osSUFBSyxLQUFhLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtnQkFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxpQkFBaUIsQ0FBRSxLQUFhLENBQUMsQ0FBQzthQUN4QztpQkFBTTtnQkFDTCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDbkIsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7aUJBQ3REO2dCQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDcEI7UUFDSCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxrQkFBa0I7UUFDZCxJQUFJLENBQUMsY0FBYzthQUNoQixxQkFBcUIsRUFBRTthQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDYixJQUFLLE1BQWMsQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsaUJBQWlCLENBQUUsTUFBYyxDQUFDLENBQUM7YUFDekM7aUJBQU07Z0JBQ0wsSUFBSSxDQUNBLE1BQU0sQ0FBQyxLQUFLLEVBQ1osTUFBTSxDQUFDLEdBQUcsRUFDVixTQUFTLENBQ1osQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsUUFBUSxDQUFDLElBQVUsRUFBRSxLQUFVO1FBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFVLEVBQUUsS0FBVTtRQUM5QixJQUFJLENBQUM7WUFDRCxLQUFLLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRztZQUM3RCxJQUFJLEVBQUUsbUNBQW1DO1lBQ3pDLElBQUksRUFBRSxTQUFTO1lBQ2YsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixrQkFBa0IsRUFBRSxTQUFTO1lBQzdCLGlCQUFpQixFQUFFLE1BQU07WUFDekIsaUJBQWlCLEVBQUUsY0FBYztTQUNwQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ2xCLElBQUksU0FBUyxDQUFDLE9BQU8sS0FBSyxRQUFRLElBQUksU0FBUyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7Z0JBQ3JFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2hDO2lCQUFNLElBQUksU0FBUyxFQUFFO2dCQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzthQUM5QjtRQUNILENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQVUsRUFBRSxLQUFVO1FBQzdCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWTthQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUssR0FBVyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxpQkFBaUIsQ0FBRSxHQUFXLENBQUMsQ0FBQzthQUN0QztpQkFBTSxJQUFLLEdBQVcsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUNBLFVBQVUsRUFDVix3QkFBd0IsRUFDeEIsU0FBUyxDQUNaLENBQUM7YUFDSDtpQkFBTTtnQkFDTCxJQUFJLENBQ0EsT0FBTyxFQUNQLHlDQUF5QyxFQUN6QyxPQUFPLENBQ1YsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDM0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUMzQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO1FBQ3JELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxXQUFXLENBQUMsUUFBUTtRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDOUIsSUFBSSxRQUFRLEtBQUssT0FBTyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUMvQjthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUU7SUFDSCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBSztRQUNyQixJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssWUFBWSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQ0YsS0FBSyxDQUFDLEtBQUssRUFDWCxLQUFLLENBQUMsR0FBRyxFQUNULE1BQU0sQ0FDUCxDQUFDO1NBQ0g7YUFBTTtZQUNMLElBQUksQ0FDRixLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssQ0FBQyxHQUFHLEVBQ1QsT0FBTyxDQUNSLENBQUM7U0FDSDtJQUNILENBQUM7SUFFRCxNQUFNO1FBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0NBQ0osQ0FBQTtBQTNKWSxvQkFBb0I7SUFQaEMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFdBQVcsRUFBRSwyREFBMkQ7UUFDeEUsU0FBUyxFQUFFLENBQUMsMERBQTBELENBQUM7S0FDMUUsQ0FBQztxQ0FZOEIsZUFBTSxFQUF3Qiw0QkFBWSxFQUEwQixnQ0FBYztHQVRyRyxvQkFBb0IsQ0EySmhDO0FBM0pZLG9EQUFvQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9zdGFmZi1tYW5hZ2Uvc3RhZmYtbWFuYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN0YWZmU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdGFmZi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL21vZGVscy91c2VyXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnc3RhZmYtbWFuYWdlJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9zdGFmZi1tYW5hZ2Uvc3RhZmYtbWFuYWdlLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3N0YWZmLW1hbmFnZS9zdGFmZi1tYW5hZ2UuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFN0YWZmTWFuYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHVzZXJzOiBVc2VyW107XHJcbiAgICB1c2Vyc0JhY2t1cDogVXNlcltdO1xyXG4gICAgZXJyb3I6IGFueTtcclxuICAgIHVzZXJzTGVuZ3RoOiBhbnk7XHJcbiAgICBhZG1pbk51bWJlcjogYW55O1xyXG4gICAgc3RhZmZOdW1iZXI6IGFueTtcclxuICAgIGluc3RydWN0b3JOdW1iZXI6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHN0YWZmU2VydmljZTogU3RhZmZTZXJ2aWNlLCBwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6ICdMb2FkaW5nLi4uJyxcclxuICAgICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgICAgdGhpcy5nZXRVc2VycygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJzKCkge1xyXG4gICAgICAgIHRoaXMuc3RhZmZTZXJ2aWNlXHJcbiAgICAgICAgICAuZ2V0VXNlcnMoKVxyXG4gICAgICAgICAgLnRoZW4odXNlcnMgPT4ge1xyXG4gICAgICAgICAgICBpZiAoKHVzZXJzIGFzIGFueSkucmVzdWx0ID09PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJzID0gbnVsbDtcclxuICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KCh1c2VycyBhcyBhbnkpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJzID0gdXNlcnM7XHJcbiAgICAgICAgICAgICAgZm9yIChsZXQgdXNlciBvZiB0aGlzLnVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyLmZ1bGxOYW1lID0gdXNlci5maXJzdE5hbWUgKyBcIiBcIiArIHVzZXIubGFzdE5hbWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHRoaXMudXNlcnNCYWNrdXAgPSB0aGlzLnVzZXJzO1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlcnNMZW5ndGggPSB1c2Vycy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcnVuQXR0ZW5kYW5jZUNoZWNrKCkge1xyXG4gICAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgIC5tYW51YWxBdHRlbmRhbmNlQ2hlY2soKVxyXG4gICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoKHJlc3VsdCBhcyBhbnkpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICByZXN1bHQudGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgIHJlc3VsdC5tc2csXHJcbiAgICAgICAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBnb3RvRWRpdCh1c2VyOiBVc2VyLCBldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3RhZmYtZGV0YWlscycsIHVzZXIudXNlcklEXSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVXNlcigpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zdGFmZi1kZXRhaWxzJywgJ25ldyddKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVBbGVydCh1c2VyOiBVc2VyLCBldmVudDogYW55KSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnRGVsZXRlICcgKyB1c2VyLmZpcnN0TmFtZSArICcgJyArIHVzZXIubGFzdE5hbWUgKyAnPycsXHJcbiAgICAgICAgICAgIHRleHQ6IFwiWW91IHdvbid0IGJlIGFibGUgdG8gcmV2ZXJ0IHRoaXMhXCIsXHJcbiAgICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBkZWxldGUhJ1xyXG4gICAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtLmRpc21pc3MpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVVc2VyKHVzZXIsIGV2ZW50KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlVXNlcih1c2VyOiBVc2VyLCBldmVudDogYW55KSB7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5zdGFmZlNlcnZpY2VcclxuICAgICAgICAgIC5kZWxldGUodXNlcilcclxuICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIGlmICgocmVzIGFzIGFueSkucmVzdWx0ID09PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KChyZXMgYXMgYW55KSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlcyBhcyBhbnkpLnJlc3VsdCA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJzID0gdGhpcy51c2Vycy5maWx0ZXIoaCA9PiBoICE9PSB1c2VyKTtcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJzQmFja3VwID0gdGhpcy51c2VycztcclxuICAgICAgICAgICAgICB0aGlzLnVzZXJzTGVuZ3RoID0gdGhpcy51c2Vycy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0cygpO1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICdEZWxldGVkIScsXHJcbiAgICAgICAgICAgICAgICAgICdVc2VyIGhhcyBiZWVuIGRlbGV0ZWQuJyxcclxuICAgICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTdGF0cygpIHtcclxuICAgICAgdGhpcy5hZG1pbk51bWJlciA9IHRoaXMudXNlcnMuZmlsdGVyKHggPT4geC51c2VyVHlwZS5pbmRleE9mKFwiQWRtaW5cIikgIT09IC0xKTtcclxuICAgICAgdGhpcy5hZG1pbk51bWJlciA9IHRoaXMuYWRtaW5OdW1iZXIubGVuZ3RoO1xyXG4gICAgICB0aGlzLnN0YWZmTnVtYmVyID0gdGhpcy51c2Vycy5maWx0ZXIoeCA9PiB4LnVzZXJUeXBlLmluZGV4T2YoXCJTdGFmZlwiKSAhPT0gLTEpO1xyXG4gICAgICB0aGlzLnN0YWZmTnVtYmVyID0gdGhpcy5zdGFmZk51bWJlci5sZW5ndGg7XHJcbiAgICAgIHRoaXMuaW5zdHJ1Y3Rvck51bWJlciA9IHRoaXMudXNlcnMuZmlsdGVyKHggPT4geC51c2VyVHlwZS5pbmRleE9mKFwiSW5zdHJ1Y3RvclwiKSAhPT0gLTEpO1xyXG4gICAgICB0aGlzLmluc3RydWN0b3JOdW1iZXIgPSB0aGlzLmluc3RydWN0b3JOdW1iZXIubGVuZ3RoO1xyXG4gICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZmlsdGVyU3RhZmYodXNlclR5cGUpIHtcclxuICAgICAgdGhpcy51c2VycyA9IHRoaXMudXNlcnNCYWNrdXA7XHJcbiAgICAgIGlmICh1c2VyVHlwZSA9PT0gJ3RvdGFsJykge1xyXG4gICAgICAgIHRoaXMudXNlcnMgPSB0aGlzLnVzZXJzQmFja3VwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudXNlcnMgPSB0aGlzLnVzZXJzLmZpbHRlcih4ID0+IHgudXNlclR5cGUuaW5kZXhPZih1c2VyVHlwZSkgIT09IC0xKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlFcnJvckFsZXJ0KGVycm9yKSB7XHJcbiAgICAgIGlmIChlcnJvci50aXRsZSA9PT0gXCJBdXRoIEVycm9yXCIpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sb2dpbiddKTtcclxuICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgICAgICBlcnJvci5tc2csXHJcbiAgICAgICAgICAnaW5mbydcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN3YWwoXHJcbiAgICAgICAgICBlcnJvci50aXRsZSxcclxuICAgICAgICAgIGVycm9yLm1zZyxcclxuICAgICAgICAgICdlcnJvcidcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgIH1cclxufVxyXG4iXX0=
