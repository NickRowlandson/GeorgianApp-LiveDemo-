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
        swal(error.title, error.msg, 'error');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy93YWl0LWxpc3Qvd2FpdC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUFrRDtBQUNsRCw0Q0FBeUM7QUFJekMsa0VBQThEO0FBQzlELG9FQUFnRTtBQUNoRSxrRUFBOEQ7QUFDOUQsZ0VBQTREO0FBVTVELElBQWEsaUJBQWlCLEdBQTlCO0lBZUUsWUFBb0IsTUFBYyxFQUFVLGFBQTRCLEVBQVUsY0FBOEIsRUFBVSxhQUE0QixFQUFVLFlBQTBCO1FBQXRLLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFYMUwsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUtoQixpQkFBWSxHQUFPLEVBQUUsQ0FBQztRQUl0QixhQUFRLEdBQVksS0FBSyxDQUFDO0lBSTFCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDO1lBQ0gsS0FBSyxFQUFFLFlBQVk7WUFDbkIsaUJBQWlCLEVBQUUsS0FBSztTQUN6QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLHVCQUF1QjtJQUN6QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxjQUFjO2FBQ2hCLFdBQVcsRUFBRTthQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNmLElBQUssUUFBZ0IsQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO2dCQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDckIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2xDO2lCQUFNO2dCQUNMLElBQUksQ0FB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YyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxLQUFLO1FBQ3JCLElBQUksQ0FDRixLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssQ0FBQyxHQUFHLEVBQ1QsT0FBTyxDQUNSLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTTtRQUNKLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQztDQUNGLENBQUE7QUE1T1ksaUJBQWlCO0lBTjdCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsVUFBVTtRQUNwQixXQUFXLEVBQUUscURBQXFEO1FBQ2xFLFNBQVMsRUFBRSxDQUFDLG9EQUFvRCxDQUFDO0tBQ2xFLENBQUM7cUNBaUI0QixlQUFNLEVBQXlCLDhCQUFhLEVBQTBCLGdDQUFjLEVBQXlCLDhCQUFhLEVBQXdCLDRCQUFZO0dBZi9LLGlCQUFpQixDQTRPN0I7QUE1T1ksOENBQWlCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3dhaXQtbGlzdC93YWl0LWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb3Vyc2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NsaWVudFwiO1xyXG5pbXBvcnQgeyBDb3Vyc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0YWZmU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdGFmZi5zZXJ2aWNlXCI7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuZGVjbGFyZSB2YXIgbW9tZW50O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd3YWl0TGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3dhaXQtbGlzdC93YWl0LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3dhaXQtbGlzdC93YWl0LWxpc3QuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgV2FpdExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGRhdGE6IGFueTtcclxuICBzdHVkZW50czogU3R1ZGVudFtdO1xyXG4gIGNsaWVudHM6IENsaWVudFtdO1xyXG4gIHVzZXJzOiBhbnkgPSBbXTtcclxuICBjb3Vyc2VUeXBlczogYW55W107XHJcbiAgd2FpdExpc3Q6IGFueVtdO1xyXG4gIHRpbWV0YWJsZXM6IGFueVtdO1xyXG4gIGNvdXJzZVdhaXRMaXN0OiBhbnlbXTtcclxuICB1c2Vyc1dhaXRpbmc6YW55ID0gW107XHJcbiAgdmlld2luZ0NvdXJzZTogQ291cnNlW107XHJcbiAgc2VsZWN0ZWRDb3Vyc2VUeXBlOiBDb3Vyc2VbXTtcclxuICBzZWxlY3RlZFVzZXI6IGFueVtdO1xyXG4gIHNob3dGb3JtOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgQ291cnNlU2VydmljZTogQ291cnNlU2VydmljZSwgcHJpdmF0ZSBTdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsIHByaXZhdGUgQ2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSwgcHJpdmF0ZSBTdGFmZlNlcnZpY2U6IFN0YWZmU2VydmljZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnTG9hZGluZy4uLicsXHJcbiAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICB0aGlzLmdldFN0dWRlbnRzKCk7XHJcbiAgICAvL3RoaXMuZ2V0VGltZXRhYmxlcygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3R1ZGVudHMoKSB7XHJcbiAgICB0aGlzLlN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRTdHVkZW50cygpXHJcbiAgICAgIC50aGVuKHN0dWRlbnRzID0+IHtcclxuICAgICAgICBpZiAoKHN0dWRlbnRzIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLnN0dWRlbnRzID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoc3R1ZGVudHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnN0dWRlbnRzID0gc3R1ZGVudHM7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdHVkZW50IG9mIHRoaXMuc3R1ZGVudHMpIHtcclxuICAgICAgICAgICAgc3R1ZGVudC5mdWxsTmFtZSA9IHN0dWRlbnQuZmlyc3ROYW1lICsgXCIgXCIgKyBzdHVkZW50Lmxhc3ROYW1lO1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJzLnB1c2goc3R1ZGVudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmdldENsaWVudHMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IHN0dWRlbnRzOiBcIiArIGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBnZXRDbGllbnRzKCkge1xyXG4gICAgdGhpcy5DbGllbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRDbGllbnRzKClcclxuICAgICAgLnRoZW4oY2xpZW50cyA9PiB7XHJcbiAgICAgICAgaWYgKChjbGllbnRzIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmNsaWVudHMgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChjbGllbnRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5jbGllbnRzID0gKGNsaWVudHMgYXMgYW55KS5jbGllbnRzO1xyXG4gICAgICAgICAgZm9yIChsZXQgY2xpZW50IG9mIHRoaXMuY2xpZW50cykge1xyXG4gICAgICAgICAgICBjbGllbnQuZnVsbE5hbWUgPSBjbGllbnQuZmlyc3ROYW1lICsgXCIgXCIgKyBjbGllbnQubGFzdE5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMudXNlcnMucHVzaChjbGllbnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5nZXRDb3Vyc2VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBjbGllbnRzOiBcIiArIGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb3Vyc2VzKCkge1xyXG4gICAgdGhpcy5Db3Vyc2VTZXJ2aWNlXHJcbiAgICAgIC5nZXRDb3Vyc2VUeXBlcygpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuY291cnNlVHlwZXMgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNvdXJzZVR5cGVzID0gcmVzdWx0O1xyXG4gICAgICAgICAgdGhpcy5nZXRXYWl0TGlzdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgY291cnNlczogXCIgKyBlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0V2FpdExpc3QoKSB7XHJcbiAgICB0aGlzLnVzZXJzV2FpdGluZyA9IFtdO1xyXG4gICAgdGhpcy5Db3Vyc2VTZXJ2aWNlXHJcbiAgICAgIC5nZXRXYWl0TGlzdCgpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMud2FpdExpc3QgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLndhaXRMaXN0ID0gcmVzdWx0O1xyXG4gICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLndhaXRMaXN0KSB7XHJcbiAgICAgICAgICAgICB2YXIgdXNlciA9IHRoaXMudXNlcnMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IGl0ZW0udXNlcklEKTtcclxuICAgICAgICAgICAgIC8vc3R1ZGVudFswXS5mdWxsTmFtZSA9IHN0dWRlbnRbMF0uZmlyc3ROYW1lICsgXCIgXCIgKyBzdHVkZW50WzBdLmxhc3ROYW1lO1xyXG4gICAgICAgICAgICAgLy8gc3R1ZGVudFswXS5jb3Vyc2VJRCA9IGNvdXJzZVswXS5jb3Vyc2VJRDtcclxuICAgICAgICAgICAgIC8vIHN0dWRlbnRbMF0ucHJvZmVzc29ySWQgPSBjb3Vyc2VbMF0ucHJvZmVzc29ySWQ7XHJcbiAgICAgICAgICAgICBpZiAodXNlclswXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgIGlmICh1c2VyWzBdLnN0dWRlbnRJRCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgdmFyIHVzZXJUeXBlID0gXCJTdHVkZW50XCI7XHJcbiAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgdmFyIHVzZXJUeXBlID0gXCJDbGllbnRcIjtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB1c2VyWzBdLmNvdXJzZU5hbWUgPSBpdGVtLmNvdXJzZVR5cGU7XHJcbiAgICAgICAgICAgICAgIHZhciB1c2VyUmVjb3JkID0ge1xyXG4gICAgICAgICAgICAgICAgIGlkOiB1c2VyWzBdLnVzZXJJRCxcclxuICAgICAgICAgICAgICAgICB1c2VyVHlwZTogdXNlclR5cGUsXHJcbiAgICAgICAgICAgICAgICAgZnVsbE5hbWU6IHVzZXJbMF0uZnVsbE5hbWUsXHJcbiAgICAgICAgICAgICAgICAgY291cnNlVHlwZTogaXRlbS5jb3Vyc2VUeXBlLFxyXG4gICAgICAgICAgICAgICAgIGRhdGU6IGl0ZW0uZGF0ZVxyXG4gICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICB0aGlzLnVzZXJzV2FpdGluZy5wdXNoKHVzZXJSZWNvcmQpO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5nZXRUaW1ldGFibGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvciAtIEdldCB3YWl0IGxpc3Q6IFwiICsgZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIGdldFRpbWV0YWJsZXMoKSB7XHJcbiAgICB0aGlzLlN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRUaW1ldGFibGVzKClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy50aW1ldGFibGVzID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy50aW1ldGFibGVzID0gcmVzdWx0O1xyXG4gICAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgdGltZXRhYmxlczogXCIgKyBlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgc2hvd1dhaXRMaXN0Rm9ybSgpIHtcclxuICAgIHRoaXMuc2hvd0Zvcm0gPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgYWRkU3R1ZGVudFRvV2FpdExpc3QoKSB7XHJcbiAgICB2YXIgQ3VycmVudERhdGUgPSBtb21lbnQoKS5mb3JtYXQoKTtcclxuICAgaWYgKHRoaXMuc2VsZWN0ZWRVc2VyID09IG51bGwgfHwgdGhpcy5zZWxlY3RlZENvdXJzZVR5cGUgPT0gbnVsbCkge1xyXG4gICAgICBzd2FsKFxyXG4gICAgICAgICdJbnZhbGlkIElucHV0JyxcclxuICAgICAgICAnUGxlYXNlIHNlbGVjdCBib3RoIGEgc3R1ZGVudCBhbmQgYSBjb3Vyc2UuJyxcclxuICAgICAgICAnd2FybmluZydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiAnU2F2aW5nLi4uJyxcclxuICAgICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgICAgdGhpcy5jb3Vyc2VXYWl0TGlzdCA9IG51bGw7XHJcbiAgICAgIHRoaXMuc2hvd0Zvcm0gPSBmYWxzZTtcclxuICAgICAgdGhpcy5Db3Vyc2VTZXJ2aWNlXHJcbiAgICAgICAgLmFkZFRvV2FpdExpc3QodGhpcy5zZWxlY3RlZFVzZXIsIHRoaXMuc2VsZWN0ZWRDb3Vyc2VUeXBlLCBDdXJyZW50RGF0ZSlcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpICB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0V2FpdExpc3QoKTtcclxuICAgICAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSBhZGRpbmcgc3R1ZGVudCB0byB3YWl0IGxpc3QuJyxcclxuICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvciAtIEFkZCBzdHVkZW50IHRvIHdhaXQgbGlzdDogXCIgKyBlcnJvcikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbVdhaXRMaXN0KGRhdGEpIHtcclxuICAgIHRoaXMuQ291cnNlU2VydmljZVxyXG4gICAgICAucmVtb3ZlRnJvbVdhaXRMaXN0KGRhdGEuaWQsIGRhdGEuY291cnNlVHlwZSlcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICB0aGlzLmdldFdhaXRMaXN0KCk7XHJcbiAgICAgICAgc3dhbChcclxuICAgICAgICAgICdSZW1vdmVkIGZyb20gJyArIGRhdGEuY291cnNlVHlwZSxcclxuICAgICAgICAgICcnICsgZGF0YS5mdWxsTmFtZSArICcgaGFzIGJlZW4gc3VjY2VzZnVsbHkgcmVtb3ZlZCBmcm9tIHRoZSAnICsgZGF0YS5jb3Vyc2VUeXBlICsgJyB3YWl0IGxpc3QuJyxcclxuICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGNsb3NlTWVudSgpIHtcclxuICAgIHRoaXMuc2hvd0Zvcm0gPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdvdG9TdHVkZW50RW5yb2xsbWVudChkYXRhLCBldmVudDogYW55KSB7XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zdHVkZW50LWVucm9sbG1lbnQnLCBkYXRhLmNvdXJzZVR5cGUsIGRhdGEuaWQgXSk7XHJcbiAgfVxyXG5cclxuICB2aWV3Q291cnNlV2FpdExpc3QoZGF0YSkge1xyXG4gICAgdGhpcy52aWV3aW5nQ291cnNlID0gZGF0YTtcclxuICAgIHRoaXMudXNlcnNXYWl0aW5nID0gW107XHJcbiAgICB0aGlzLmNvdXJzZVdhaXRMaXN0ID0gdGhpcy53YWl0TGlzdC5maWx0ZXIoeCA9PiB4LmNvdXJzZVR5cGUgPT09IGRhdGEuY291cnNlVHlwZSk7XHJcbiAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMuY291cnNlV2FpdExpc3QpIHtcclxuICAgICAgIHZhciB1c2VyID0gdGhpcy51c2Vycy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gaXRlbS51c2VySUQpO1xyXG4gICAgICAgaWYgKHVzZXJbMF0gIT0gbnVsbCkge1xyXG4gICAgICAgICB1c2VyWzBdLmZ1bGxOYW1lID0gdXNlclswXS5maXJzdE5hbWUgKyBcIiBcIiArIHVzZXJbMF0ubGFzdE5hbWU7XHJcbiAgICAgICAgIGlmICh1c2VyWzBdLnN0dWRlbnRJRCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgdmFyIHVzZXJUeXBlID0gXCJTdHVkZW50XCI7XHJcbiAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgdmFyIHVzZXJUeXBlID0gXCJDbGllbnRcIjtcclxuICAgICAgICAgfVxyXG4gICAgICAgICB2YXIgdXNlclJlY29yZCA9IHtcclxuICAgICAgICAgICBpZDogdXNlclswXS51c2VySUQsXHJcbiAgICAgICAgICAgZnVsbE5hbWU6IHVzZXJbMF0uZnVsbE5hbWUsXHJcbiAgICAgICAgICAgdXNlclR5cGU6IHVzZXJUeXBlLFxyXG4gICAgICAgICAgIGNvdXJzZVR5cGU6IGl0ZW0uY291cnNlVHlwZSxcclxuICAgICAgICAgICBkYXRlOiBpdGVtLmRhdGVcclxuICAgICAgICAgfTtcclxuICAgICAgICAgdGhpcy51c2Vyc1dhaXRpbmcucHVzaCh1c2VyUmVjb3JkKTtcclxuICAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uUHJpbnQoKSB7XHJcbiAgICAod2luZG93IGFzIGFueSkucHJpbnQoKTtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlFcnJvckFsZXJ0KGVycm9yKSB7XHJcbiAgICBzd2FsKFxyXG4gICAgICBlcnJvci50aXRsZSxcclxuICAgICAgZXJyb3IubXNnLFxyXG4gICAgICAnZXJyb3InXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=
