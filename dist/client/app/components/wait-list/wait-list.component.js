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
const router_1 = require("@angular/router");
const course_service_1 = require("../../services/course.service");
const student_service_1 = require("../../services/student.service");
const client_service_1 = require("../../services/client.service");
const staff_service_1 = require("../../services/staff.service");
let WaitListComponent = class WaitListComponent {
    constructor(router, CourseService, StudentService, ClientService, StaffService) {
        this.router = router;
        this.CourseService = CourseService;
        this.StudentService = StudentService;
        this.ClientService = ClientService;
        this.StaffService = StaffService;
        this.users = [];
        this.usersWaiting = [];
        this.showForm = false;
    }
    ngOnInit() {
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();
        this.getStudents();
        //this.getTimetables();
    }
    getStudents() {
        this.StudentService
            .getStudents()
            .then(students => {
            if (students.result === 'error') {
                this.students = null;
                this.displayErrorAlert(students);
            }
            else {
                this.students = students;
                for (let student of this.students) {
                    student.fullName = student.firstName + " " + student.lastName;
                    this.users.push(student);
                }
                this.getClients();
            }
        })
            .catch(error => console.log("Error - Get students: " + error));
    }
    getClients() {
        this.ClientService
            .getClients()
            .then(clients => {
            if (clients.result === 'error') {
                this.clients = null;
                this.displayErrorAlert(clients);
            }
            else {
                this.clients = clients.clients;
                for (let client of this.clients) {
                    client.fullName = client.firstName + " " + client.lastName;
                    this.users.push(client);
                }
                this.getCourses();
            }
        })
            .catch(error => console.log("Error - Get clients: " + error));
    }
    getCourses() {
        this.CourseService
            .getCourseTypes()
            .then(result => {
            if (result.result === 'error') {
                this.courseTypes = null;
                this.displayErrorAlert(result);
            }
            else {
                this.courseTypes = result;
                this.getWaitList();
            }
        })
            .catch(error => console.log("Error - Get courses: " + error));
    }
    getWaitList() {
        this.usersWaiting = [];
        this.CourseService
            .getWaitList()
            .then(result => {
            if (result.result === 'error') {
                this.waitList = null;
                this.displayErrorAlert(result);
            }
            else {
                this.waitList = result;
                for (let item of this.waitList) {
                    var user = this.users.filter(x => x.userID === item.userID);
                    //student[0].fullName = student[0].firstName + " " + student[0].lastName;
                    // student[0].courseID = course[0].courseID;
                    // student[0].professorId = course[0].professorId;
                    if (user[0] != null) {
                        if (user[0].studentID != null) {
                            var userType = "Student";
                        }
                        else {
                            var userType = "Client";
                        }
                        user[0].courseName = item.courseType;
                        var userRecord = {
                            id: user[0].userID,
                            userType: userType,
                            fullName: user[0].fullName,
                            courseType: item.courseType,
                            date: item.date
                        };
                        this.usersWaiting.push(userRecord);
                    }
                }
                this.getTimetables();
            }
        })
            .catch(error => console.log("Error - Get wait list: " + error));
    }
    getTimetables() {
        this.StudentService
            .getTimetables()
            .then(result => {
            if (result.result === 'error') {
                this.timetables = null;
                this.displayErrorAlert(result);
            }
            else {
                this.timetables = result;
                swal.close();
            }
        })
            .catch(error => console.log("Error - Get timetables: " + error));
    }
    showWaitListForm() {
        this.showForm = true;
    }
    addStudentToWaitList() {
        var CurrentDate = moment().format();
        if (this.selectedUser == null || this.selectedCourseType == null) {
            swal('Invalid Input', 'Please select both a student and a course.', 'warning');
        }
        else {
            swal({
                title: 'Saving...',
                allowOutsideClick: false
            });
            swal.showLoading();
            this.courseWaitList = null;
            this.showForm = false;
            this.CourseService
                .addToWaitList(this.selectedUser, this.selectedCourseType, CurrentDate)
                .then(result => {
                if (result.result === 'error') {
                    this.displayErrorAlert(result);
                }
                else if (result.result === 'success') {
                    this.getWaitList();
                    swal.close();
                }
                else {
                    swal('Error', 'Something went wrong while adding student to wait list.', 'error');
                }
            })
                .catch(error => console.log("Error - Add student to wait list: " + error));
        }
    }
    removeFromWaitList(data) {
        this.CourseService
            .removeFromWaitList(data.id, data.courseType)
            .then(result => {
            this.getWaitList();
            swal('Removed from ' + data.courseType, '' + data.fullName + ' has been succesfully removed from the ' + data.courseType + ' wait list.', 'success');
        }).catch(error => error);
    }
    closeMenu() {
        this.showForm = false;
    }
    gotoStudentEnrollment(data, event) {
        this.router.navigate(['/student-enrollment', data.courseType, data.id]);
    }
    viewCourseWaitList(data) {
        this.viewingCourse = data;
        this.usersWaiting = [];
        this.courseWaitList = this.waitList.filter(x => x.courseType === data.courseType);
        for (let item of this.courseWaitList) {
            var user = this.users.filter(x => x.userID === item.userID);
            if (user[0] != null) {
                user[0].fullName = user[0].firstName + " " + user[0].lastName;
                if (user[0].studentID != null) {
                    var userType = "Student";
                }
                else {
                    var userType = "Client";
                }
                var userRecord = {
                    id: user[0].userID,
                    fullName: user[0].fullName,
                    userType: userType,
                    courseType: item.courseType,
                    date: item.date
                };
                this.usersWaiting.push(userRecord);
            }
        }
    }
    onPrint() {
        window.print();
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
WaitListComponent = __decorate([
    core_1.Component({
        selector: 'waitList',
        templateUrl: './app/components/wait-list/wait-list.component.html',
        styleUrls: ['./app/components/wait-list/wait-list.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, course_service_1.CourseService, student_service_1.StudentService, client_service_1.ClientService, staff_service_1.StaffService])
], WaitListComponent);
exports.WaitListComponent = WaitListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy93YWl0LWxpc3Qvd2FpdC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUFrRDtBQUNsRCw0Q0FBeUM7QUFJekMsa0VBQThEO0FBQzlELG9FQUFnRTtBQUNoRSxrRUFBOEQ7QUFDOUQsZ0VBQTREO0FBVTVELElBQWEsaUJBQWlCLEdBQTlCO0lBZUUsWUFBb0IsTUFBYyxFQUFVLGFBQTRCLEVBQVUsY0FBOEIsRUFBVSxhQUE0QixFQUFVLFlBQTBCO1FBQXRLLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFYMUwsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUtoQixpQkFBWSxHQUFPLEVBQUUsQ0FBQztRQUl0QixhQUFRLEdBQVksS0FBSyxDQUFDO0lBSTFCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDO1lBQ0gsS0FBSyxFQUFFLFlBQVk7WUFDbkIsaUJBQWlCLEVBQUUsS0FBSztTQUN6QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLHVCQUF1QjtJQUN6QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxjQUFjO2FBQ2hCLFdBQVcsRUFBRTthQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNmLElBQUssUUFBZ0IsQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO2dCQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2xDO2lCQUFNO2dCQUNMLElBQUksQ0FB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YyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxLQUFLO1FBQ3JCLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxZQUFZLEVBQUU7WUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FDRixLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssQ0FBQyxHQUFHLEVBQ1QsTUFBTSxDQUNQLENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBSSxDQUNGLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLEdBQUcsRUFDVCxPQUFPLENBQ1IsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVELE1BQU07UUFDSixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7Q0FDRixDQUFBO0FBclBZLGlCQUFpQjtJQU43QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFVBQVU7UUFDcEIsV0FBVyxFQUFFLHFEQUFxRDtRQUNsRSxTQUFTLEVBQUUsQ0FBQyxvREFBb0QsQ0FBQztLQUNsRSxDQUFDO3FDQWlCNEIsZUFBTSxFQUF5Qiw4QkFBYSxFQUEwQixnQ0FBYyxFQUF5Qiw4QkFBYSxFQUF3Qiw0QkFBWTtHQWYvSyxpQkFBaUIsQ0FxUDdCO0FBclBZLDhDQUFpQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy93YWl0LWxpc3Qvd2FpdC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY291cnNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N0dWRlbnRcIjtcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jbGllbnRcIjtcclxuaW1wb3J0IHsgQ291cnNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3Vyc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ2xpZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jbGllbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTdGFmZlNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3RhZmYuc2VydmljZVwiO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcbmRlY2xhcmUgdmFyIG1vbWVudDtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnd2FpdExpc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy93YWl0LWxpc3Qvd2FpdC1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy93YWl0LWxpc3Qvd2FpdC1saXN0LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFdhaXRMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBkYXRhOiBhbnk7XHJcbiAgc3R1ZGVudHM6IFN0dWRlbnRbXTtcclxuICBjbGllbnRzOiBDbGllbnRbXTtcclxuICB1c2VyczogYW55ID0gW107XHJcbiAgY291cnNlVHlwZXM6IGFueVtdO1xyXG4gIHdhaXRMaXN0OiBhbnlbXTtcclxuICB0aW1ldGFibGVzOiBhbnlbXTtcclxuICBjb3Vyc2VXYWl0TGlzdDogYW55W107XHJcbiAgdXNlcnNXYWl0aW5nOmFueSA9IFtdO1xyXG4gIHZpZXdpbmdDb3Vyc2U6IENvdXJzZVtdO1xyXG4gIHNlbGVjdGVkQ291cnNlVHlwZTogQ291cnNlW107XHJcbiAgc2VsZWN0ZWRVc2VyOiBhbnlbXTtcclxuICBzaG93Rm9ybTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIENvdXJzZVNlcnZpY2U6IENvdXJzZVNlcnZpY2UsIHByaXZhdGUgU3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlLCBwcml2YXRlIENsaWVudFNlcnZpY2U6IENsaWVudFNlcnZpY2UsIHByaXZhdGUgU3RhZmZTZXJ2aWNlOiBTdGFmZlNlcnZpY2UpIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ0xvYWRpbmcuLi4nLFxyXG4gICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgc3dhbC5zaG93TG9hZGluZygpO1xyXG4gICAgdGhpcy5nZXRTdHVkZW50cygpO1xyXG4gICAgLy90aGlzLmdldFRpbWV0YWJsZXMoKTtcclxuICB9XHJcblxyXG4gIGdldFN0dWRlbnRzKCkge1xyXG4gICAgdGhpcy5TdHVkZW50U2VydmljZVxyXG4gICAgICAuZ2V0U3R1ZGVudHMoKVxyXG4gICAgICAudGhlbihzdHVkZW50cyA9PiB7XHJcbiAgICAgICAgaWYgKChzdHVkZW50cyBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50cyA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHN0dWRlbnRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50cyA9IHN0dWRlbnRzO1xyXG4gICAgICAgICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLnN0dWRlbnRzKSB7XHJcbiAgICAgICAgICAgIHN0dWRlbnQuZnVsbE5hbWUgPSBzdHVkZW50LmZpcnN0TmFtZSArIFwiIFwiICsgc3R1ZGVudC5sYXN0TmFtZTtcclxuICAgICAgICAgICAgdGhpcy51c2Vycy5wdXNoKHN0dWRlbnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5nZXRDbGllbnRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBzdHVkZW50czogXCIgKyBlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2xpZW50cygpIHtcclxuICAgIHRoaXMuQ2xpZW50U2VydmljZVxyXG4gICAgICAuZ2V0Q2xpZW50cygpXHJcbiAgICAgIC50aGVuKGNsaWVudHMgPT4ge1xyXG4gICAgICAgIGlmICgoY2xpZW50cyBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5jbGllbnRzID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoY2xpZW50cyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY2xpZW50cyA9IChjbGllbnRzIGFzIGFueSkuY2xpZW50cztcclxuICAgICAgICAgIGZvciAobGV0IGNsaWVudCBvZiB0aGlzLmNsaWVudHMpIHtcclxuICAgICAgICAgICAgY2xpZW50LmZ1bGxOYW1lID0gY2xpZW50LmZpcnN0TmFtZSArIFwiIFwiICsgY2xpZW50Lmxhc3ROYW1lO1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJzLnB1c2goY2xpZW50KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuZ2V0Q291cnNlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgY2xpZW50czogXCIgKyBlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q291cnNlcygpIHtcclxuICAgIHRoaXMuQ291cnNlU2VydmljZVxyXG4gICAgICAuZ2V0Q291cnNlVHlwZXMoKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmNvdXJzZVR5cGVzID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5jb3Vyc2VUeXBlcyA9IHJlc3VsdDtcclxuICAgICAgICAgIHRoaXMuZ2V0V2FpdExpc3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IGNvdXJzZXM6IFwiICsgZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIGdldFdhaXRMaXN0KCkge1xyXG4gICAgdGhpcy51c2Vyc1dhaXRpbmcgPSBbXTtcclxuICAgIHRoaXMuQ291cnNlU2VydmljZVxyXG4gICAgICAuZ2V0V2FpdExpc3QoKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLndhaXRMaXN0ID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy53YWl0TGlzdCA9IHJlc3VsdDtcclxuICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy53YWl0TGlzdCkge1xyXG4gICAgICAgICAgICAgdmFyIHVzZXIgPSB0aGlzLnVzZXJzLmZpbHRlcih4ID0+IHgudXNlcklEID09PSBpdGVtLnVzZXJJRCk7XHJcbiAgICAgICAgICAgICAvL3N0dWRlbnRbMF0uZnVsbE5hbWUgPSBzdHVkZW50WzBdLmZpcnN0TmFtZSArIFwiIFwiICsgc3R1ZGVudFswXS5sYXN0TmFtZTtcclxuICAgICAgICAgICAgIC8vIHN0dWRlbnRbMF0uY291cnNlSUQgPSBjb3Vyc2VbMF0uY291cnNlSUQ7XHJcbiAgICAgICAgICAgICAvLyBzdHVkZW50WzBdLnByb2Zlc3NvcklkID0gY291cnNlWzBdLnByb2Zlc3NvcklkO1xyXG4gICAgICAgICAgICAgaWYgKHVzZXJbMF0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICBpZiAodXNlclswXS5zdHVkZW50SUQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgIHZhciB1c2VyVHlwZSA9IFwiU3R1ZGVudFwiO1xyXG4gICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgIHZhciB1c2VyVHlwZSA9IFwiQ2xpZW50XCI7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgdXNlclswXS5jb3Vyc2VOYW1lID0gaXRlbS5jb3Vyc2VUeXBlO1xyXG4gICAgICAgICAgICAgICB2YXIgdXNlclJlY29yZCA9IHtcclxuICAgICAgICAgICAgICAgICBpZDogdXNlclswXS51c2VySUQsXHJcbiAgICAgICAgICAgICAgICAgdXNlclR5cGU6IHVzZXJUeXBlLFxyXG4gICAgICAgICAgICAgICAgIGZ1bGxOYW1lOiB1c2VyWzBdLmZ1bGxOYW1lLFxyXG4gICAgICAgICAgICAgICAgIGNvdXJzZVR5cGU6IGl0ZW0uY291cnNlVHlwZSxcclxuICAgICAgICAgICAgICAgICBkYXRlOiBpdGVtLmRhdGVcclxuICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgdGhpcy51c2Vyc1dhaXRpbmcucHVzaCh1c2VyUmVjb3JkKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuZ2V0VGltZXRhYmxlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgd2FpdCBsaXN0OiBcIiArIGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBnZXRUaW1ldGFibGVzKCkge1xyXG4gICAgdGhpcy5TdHVkZW50U2VydmljZVxyXG4gICAgICAuZ2V0VGltZXRhYmxlcygpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMudGltZXRhYmxlcyA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMudGltZXRhYmxlcyA9IHJlc3VsdDtcclxuICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IHRpbWV0YWJsZXM6IFwiICsgZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIHNob3dXYWl0TGlzdEZvcm0oKSB7XHJcbiAgICB0aGlzLnNob3dGb3JtID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGFkZFN0dWRlbnRUb1dhaXRMaXN0KCkge1xyXG4gICAgdmFyIEN1cnJlbnREYXRlID0gbW9tZW50KCkuZm9ybWF0KCk7XHJcbiAgIGlmICh0aGlzLnNlbGVjdGVkVXNlciA9PSBudWxsIHx8IHRoaXMuc2VsZWN0ZWRDb3Vyc2VUeXBlID09IG51bGwpIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICAnSW52YWxpZCBJbnB1dCcsXHJcbiAgICAgICAgJ1BsZWFzZSBzZWxlY3QgYm90aCBhIHN0dWRlbnQgYW5kIGEgY291cnNlLicsXHJcbiAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogJ1NhdmluZy4uLicsXHJcbiAgICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICAgIH0pO1xyXG4gICAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICAgIHRoaXMuY291cnNlV2FpdExpc3QgPSBudWxsO1xyXG4gICAgICB0aGlzLnNob3dGb3JtID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuQ291cnNlU2VydmljZVxyXG4gICAgICAgIC5hZGRUb1dhaXRMaXN0KHRoaXMuc2VsZWN0ZWRVc2VyLCB0aGlzLnNlbGVjdGVkQ291cnNlVHlwZSwgQ3VycmVudERhdGUpXHJcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSAge1xyXG4gICAgICAgICAgICB0aGlzLmdldFdhaXRMaXN0KCk7XHJcbiAgICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgYWRkaW5nIHN0dWRlbnQgdG8gd2FpdCBsaXN0LicsXHJcbiAgICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3IgLSBBZGQgc3R1ZGVudCB0byB3YWl0IGxpc3Q6IFwiICsgZXJyb3IpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21XYWl0TGlzdChkYXRhKSB7XHJcbiAgICB0aGlzLkNvdXJzZVNlcnZpY2VcclxuICAgICAgLnJlbW92ZUZyb21XYWl0TGlzdChkYXRhLmlkLCBkYXRhLmNvdXJzZVR5cGUpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgdGhpcy5nZXRXYWl0TGlzdCgpO1xyXG4gICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAnUmVtb3ZlZCBmcm9tICcgKyBkYXRhLmNvdXJzZVR5cGUsXHJcbiAgICAgICAgICAnJyArIGRhdGEuZnVsbE5hbWUgKyAnIGhhcyBiZWVuIHN1Y2Nlc2Z1bGx5IHJlbW92ZWQgZnJvbSB0aGUgJyArIGRhdGEuY291cnNlVHlwZSArICcgd2FpdCBsaXN0LicsXHJcbiAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICApO1xyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBjbG9zZU1lbnUoKSB7XHJcbiAgICB0aGlzLnNob3dGb3JtID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBnb3RvU3R1ZGVudEVucm9sbG1lbnQoZGF0YSwgZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3R1ZGVudC1lbnJvbGxtZW50JywgZGF0YS5jb3Vyc2VUeXBlLCBkYXRhLmlkIF0pO1xyXG4gIH1cclxuXHJcbiAgdmlld0NvdXJzZVdhaXRMaXN0KGRhdGEpIHtcclxuICAgIHRoaXMudmlld2luZ0NvdXJzZSA9IGRhdGE7XHJcbiAgICB0aGlzLnVzZXJzV2FpdGluZyA9IFtdO1xyXG4gICAgdGhpcy5jb3Vyc2VXYWl0TGlzdCA9IHRoaXMud2FpdExpc3QuZmlsdGVyKHggPT4geC5jb3Vyc2VUeXBlID09PSBkYXRhLmNvdXJzZVR5cGUpO1xyXG4gICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLmNvdXJzZVdhaXRMaXN0KSB7XHJcbiAgICAgICB2YXIgdXNlciA9IHRoaXMudXNlcnMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IGl0ZW0udXNlcklEKTtcclxuICAgICAgIGlmICh1c2VyWzBdICE9IG51bGwpIHtcclxuICAgICAgICAgdXNlclswXS5mdWxsTmFtZSA9IHVzZXJbMF0uZmlyc3ROYW1lICsgXCIgXCIgKyB1c2VyWzBdLmxhc3ROYW1lO1xyXG4gICAgICAgICBpZiAodXNlclswXS5zdHVkZW50SUQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgIHZhciB1c2VyVHlwZSA9IFwiU3R1ZGVudFwiO1xyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgIHZhciB1c2VyVHlwZSA9IFwiQ2xpZW50XCI7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgdmFyIHVzZXJSZWNvcmQgPSB7XHJcbiAgICAgICAgICAgaWQ6IHVzZXJbMF0udXNlcklELFxyXG4gICAgICAgICAgIGZ1bGxOYW1lOiB1c2VyWzBdLmZ1bGxOYW1lLFxyXG4gICAgICAgICAgIHVzZXJUeXBlOiB1c2VyVHlwZSxcclxuICAgICAgICAgICBjb3Vyc2VUeXBlOiBpdGVtLmNvdXJzZVR5cGUsXHJcbiAgICAgICAgICAgZGF0ZTogaXRlbS5kYXRlXHJcbiAgICAgICAgIH07XHJcbiAgICAgICAgIHRoaXMudXNlcnNXYWl0aW5nLnB1c2godXNlclJlY29yZCk7XHJcbiAgICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblByaW50KCkge1xyXG4gICAgKHdpbmRvdyBhcyBhbnkpLnByaW50KCk7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5RXJyb3JBbGVydChlcnJvcikge1xyXG4gICAgaWYgKGVycm9yLnRpdGxlID09PSBcIkF1dGggRXJyb3JcIikge1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sb2dpbiddKTtcclxuICAgICAgc3dhbChcclxuICAgICAgICBlcnJvci50aXRsZSxcclxuICAgICAgICBlcnJvci5tc2csXHJcbiAgICAgICAgJ2luZm8nXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzd2FsKFxyXG4gICAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICAgIGVycm9yLm1zZyxcclxuICAgICAgICAnZXJyb3InXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
