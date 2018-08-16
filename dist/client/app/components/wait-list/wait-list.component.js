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
var router_1 = require("@angular/router");
var course_service_1 = require("../../services/course.service");
var student_service_1 = require("../../services/student.service");
var client_service_1 = require("../../services/client.service");
var staff_service_1 = require("../../services/staff.service");
var WaitListComponent = /** @class */ (function () {
    function WaitListComponent(router, CourseService, StudentService, ClientService, StaffService) {
        this.router = router;
        this.CourseService = CourseService;
        this.StudentService = StudentService;
        this.ClientService = ClientService;
        this.StaffService = StaffService;
        this.users = [];
        this.usersWaiting = [];
        this.showForm = false;
    }
    WaitListComponent.prototype.ngOnInit = function () {
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();
        this.getStudents();
        //this.getTimetables();
    };
    WaitListComponent.prototype.getStudents = function () {
        var _this = this;
        this.StudentService
            .getStudents()
            .then(function (students) {
            if (students.result === 'error') {
                _this.students = null;
                _this.displayErrorAlert(students);
            }
            else {
                _this.students = students;
                for (var _i = 0, _a = _this.students; _i < _a.length; _i++) {
                    var student = _a[_i];
                    student.fullName = student.firstName + " " + student.lastName;
                    _this.users.push(student);
                }
                _this.getClients();
            }
        })
            .catch(function (error) { return console.log("Error - Get students: " + error); });
    };
    WaitListComponent.prototype.getClients = function () {
        var _this = this;
        this.ClientService
            .getClients()
            .then(function (clients) {
            if (clients.result === 'error') {
                _this.clients = null;
                _this.displayErrorAlert(clients);
            }
            else {
                _this.clients = clients.clients;
                for (var _i = 0, _a = _this.clients; _i < _a.length; _i++) {
                    var client = _a[_i];
                    client.fullName = client.firstName + " " + client.lastName;
                    _this.users.push(client);
                }
                _this.getCourses();
            }
        })
            .catch(function (error) { return console.log("Error - Get clients: " + error); });
    };
    WaitListComponent.prototype.getCourses = function () {
        var _this = this;
        this.CourseService
            .getCourseTypes()
            .then(function (result) {
            if (result.result === 'error') {
                _this.courseTypes = null;
                _this.displayErrorAlert(result);
            }
            else {
                _this.courseTypes = result;
                _this.getWaitList();
            }
        })
            .catch(function (error) { return console.log("Error - Get courses: " + error); });
    };
    WaitListComponent.prototype.getWaitList = function () {
        var _this = this;
        this.usersWaiting = [];
        this.CourseService
            .getWaitList()
            .then(function (result) {
            if (result.result === 'error') {
                _this.waitList = null;
                _this.displayErrorAlert(result);
            }
            else {
                _this.waitList = result;
                var _loop_1 = function (item) {
                    user = _this.users.filter(function (x) { return x.userID === item.userID; });
                    //student[0].fullName = student[0].firstName + " " + student[0].lastName;
                    // student[0].courseID = course[0].courseID;
                    // student[0].professorId = course[0].professorId;
                    user[0].courseName = item.courseType;
                    userRecord = {
                        id: user[0].userID,
                        fullName: user[0].fullName,
                        courseType: item.courseType,
                        date: item.date
                    };
                    _this.usersWaiting.push(userRecord);
                };
                var user, userRecord;
                for (var _i = 0, _a = _this.waitList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    _loop_1(item);
                }
                _this.getTimetables();
            }
        })
            .catch(function (error) { return console.log("Error - Get wait list: " + error); });
    };
    WaitListComponent.prototype.getTimetables = function () {
        var _this = this;
        this.StudentService
            .getTimetables()
            .then(function (result) {
            if (result.result === 'error') {
                _this.timetables = null;
                _this.displayErrorAlert(result);
            }
            else {
                _this.timetables = result;
                swal.close();
            }
        })
            .catch(function (error) { return console.log("Error - Get timetables: " + error); });
    };
    WaitListComponent.prototype.showWaitListForm = function () {
        this.showForm = true;
    };
    WaitListComponent.prototype.addStudentToWaitList = function () {
        var _this = this;
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
                .then(function (result) {
                if (result.result === 'error') {
                    _this.displayErrorAlert(result);
                }
                else if (result.result === 'success') {
                    _this.getWaitList();
                    swal.close();
                }
                else {
                    swal('Error', 'Something went wrong while adding student to wait list.', 'error');
                }
            })
                .catch(function (error) { return console.log("Error - Add student to wait list: " + error); });
        }
    };
    WaitListComponent.prototype.removeFromWaitList = function (data) {
        var _this = this;
        this.CourseService
            .removeFromWaitList(data.id, data.courseType)
            .then(function (result) {
            _this.getWaitList();
            swal('Removed from ' + data.courseType, '' + data.fullName + ' has been succesfully removed from the ' + data.courseType + ' wait list.', 'success');
        }).catch(function (error) { return error; });
    };
    WaitListComponent.prototype.closeMenu = function () {
        this.showForm = false;
    };
    WaitListComponent.prototype.gotoStudentEnrollment = function (data, event) {
        console.log(data.id);
        this.router.navigate(['/student-enrollment', data.courseType, data.id]);
    };
    WaitListComponent.prototype.viewCourseWaitList = function (data) {
        this.viewingCourse = data;
        this.usersWaiting = [];
        this.courseWaitList = this.waitList.filter(function (x) { return x.courseType === data.courseType; });
        var _loop_2 = function (item) {
            user = this_1.users.filter(function (x) { return x.userID === item.userID; });
            user[0].fullName = user[0].firstName + " " + user[0].lastName;
            userRecord = {
                fullName: user[0].fullName,
                date: item.date
            };
            this_1.usersWaiting.push(userRecord);
        };
        var this_1 = this, user, userRecord;
        for (var _i = 0, _a = this.courseWaitList; _i < _a.length; _i++) {
            var item = _a[_i];
            _loop_2(item);
        }
    };
    WaitListComponent.prototype.onPrint = function () {
        window.print();
    };
    WaitListComponent.prototype.displayErrorAlert = function (error) {
        swal(error.title, error.msg, 'error');
    };
    WaitListComponent.prototype.goBack = function () {
        window.history.back();
    };
    WaitListComponent = __decorate([
        core_1.Component({
            selector: 'waitList',
            templateUrl: './app/components/wait-list/wait-list.component.html',
            styleUrls: ['./app/components/wait-list/wait-list.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, course_service_1.CourseService, student_service_1.StudentService, client_service_1.ClientService, staff_service_1.StaffService])
    ], WaitListComponent);
    return WaitListComponent;
}());
exports.WaitListComponent = WaitListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy93YWl0LWxpc3Qvd2FpdC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFJekMsZ0VBQThEO0FBQzlELGtFQUFnRTtBQUNoRSxnRUFBOEQ7QUFDOUQsOERBQTREO0FBVTVEO0lBZUUsMkJBQW9CLE1BQWMsRUFBVSxhQUE0QixFQUFVLGNBQThCLEVBQVUsYUFBNEIsRUFBVSxZQUEwQjtRQUF0SyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBWDFMLFVBQUssR0FBUSxFQUFFLENBQUM7UUFLaEIsaUJBQVksR0FBTyxFQUFFLENBQUM7UUFJdEIsYUFBUSxHQUFZLEtBQUssQ0FBQztJQUkxQixDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQztZQUNILEtBQUssRUFBRSxZQUFZO1lBQ25CLGlCQUFpQixFQUFFLEtBQUs7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQix1QkFBdUI7SUFDekIsQ0FBQztJQUVELHVDQUFXLEdBQVg7UUFBQSxpQkFpQkM7UUFoQkMsSUFBSSxDQUFDLGNBQWM7YUFDaEIsV0FBVyxFQUFFO2FBQ2IsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUNaLElBQUssUUFBZ0IsQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO2dCQUN4QyxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDckIsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2xDO2lCQUFNO2dCQUNMLEtBQUks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LEdBQVA7UUFDRyxNQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELDZDQUFpQixHQUFqQixVQUFrQixLQUFLO1FBQ3JCLElBQUksQ0FDRixLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssQ0FBQyxHQUFHLEVBQ1QsT0FBTyxDQUNSLENBQUM7SUFDSixDQUFDO0lBRUQsa0NBQU0sR0FBTjtRQUNFLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQTNOVSxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSxxREFBcUQ7WUFDbEUsU0FBUyxFQUFFLENBQUMsb0RBQW9ELENBQUM7U0FDbEUsQ0FBQzt5Q0FpQjRCLGVBQU0sRUFBeUIsOEJBQWEsRUFBMEIsZ0NBQWMsRUFBeUIsOEJBQWEsRUFBd0IsNEJBQVk7T0FmL0ssaUJBQWlCLENBNE43QjtJQUFELHdCQUFDO0NBNU5ELEFBNE5DLElBQUE7QUE1TlksOENBQWlCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3dhaXQtbGlzdC93YWl0LWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb3Vyc2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NsaWVudFwiO1xyXG5pbXBvcnQgeyBDb3Vyc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0YWZmU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdGFmZi5zZXJ2aWNlXCI7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuZGVjbGFyZSB2YXIgbW9tZW50O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd3YWl0TGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3dhaXQtbGlzdC93YWl0LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3dhaXQtbGlzdC93YWl0LWxpc3QuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgV2FpdExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGRhdGE6IGFueTtcclxuICBzdHVkZW50czogU3R1ZGVudFtdO1xyXG4gIGNsaWVudHM6IENsaWVudFtdO1xyXG4gIHVzZXJzOiBhbnkgPSBbXTtcclxuICBjb3Vyc2VUeXBlczogYW55W107XHJcbiAgd2FpdExpc3Q6IGFueVtdO1xyXG4gIHRpbWV0YWJsZXM6IGFueVtdO1xyXG4gIGNvdXJzZVdhaXRMaXN0OiBhbnlbXTtcclxuICB1c2Vyc1dhaXRpbmc6YW55ID0gW107XHJcbiAgdmlld2luZ0NvdXJzZTogQ291cnNlW107XHJcbiAgc2VsZWN0ZWRDb3Vyc2VUeXBlOiBDb3Vyc2VbXTtcclxuICBzZWxlY3RlZFVzZXI6IGFueVtdO1xyXG4gIHNob3dGb3JtOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgQ291cnNlU2VydmljZTogQ291cnNlU2VydmljZSwgcHJpdmF0ZSBTdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsIHByaXZhdGUgQ2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSwgcHJpdmF0ZSBTdGFmZlNlcnZpY2U6IFN0YWZmU2VydmljZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnTG9hZGluZy4uLicsXHJcbiAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICB0aGlzLmdldFN0dWRlbnRzKCk7XHJcbiAgICAvL3RoaXMuZ2V0VGltZXRhYmxlcygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3R1ZGVudHMoKSB7XHJcbiAgICB0aGlzLlN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRTdHVkZW50cygpXHJcbiAgICAgIC50aGVuKHN0dWRlbnRzID0+IHtcclxuICAgICAgICBpZiAoKHN0dWRlbnRzIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLnN0dWRlbnRzID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoc3R1ZGVudHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnN0dWRlbnRzID0gc3R1ZGVudHM7XHJcbiAgICAgICAgICBmb3IgKGxldCBzdHVkZW50IG9mIHRoaXMuc3R1ZGVudHMpIHtcclxuICAgICAgICAgICAgc3R1ZGVudC5mdWxsTmFtZSA9IHN0dWRlbnQuZmlyc3ROYW1lICsgXCIgXCIgKyBzdHVkZW50Lmxhc3ROYW1lO1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJzLnB1c2goc3R1ZGVudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmdldENsaWVudHMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IHN0dWRlbnRzOiBcIiArIGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBnZXRDbGllbnRzKCkge1xyXG4gICAgdGhpcy5DbGllbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRDbGllbnRzKClcclxuICAgICAgLnRoZW4oY2xpZW50cyA9PiB7XHJcbiAgICAgICAgaWYgKChjbGllbnRzIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmNsaWVudHMgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChjbGllbnRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5jbGllbnRzID0gKGNsaWVudHMgYXMgYW55KS5jbGllbnRzO1xyXG4gICAgICAgICAgZm9yIChsZXQgY2xpZW50IG9mIHRoaXMuY2xpZW50cykge1xyXG4gICAgICAgICAgICBjbGllbnQuZnVsbE5hbWUgPSBjbGllbnQuZmlyc3ROYW1lICsgXCIgXCIgKyBjbGllbnQubGFzdE5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMudXNlcnMucHVzaChjbGllbnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5nZXRDb3Vyc2VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBjbGllbnRzOiBcIiArIGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb3Vyc2VzKCkge1xyXG4gICAgdGhpcy5Db3Vyc2VTZXJ2aWNlXHJcbiAgICAgIC5nZXRDb3Vyc2VUeXBlcygpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuY291cnNlVHlwZXMgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNvdXJzZVR5cGVzID0gcmVzdWx0O1xyXG4gICAgICAgICAgdGhpcy5nZXRXYWl0TGlzdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgY291cnNlczogXCIgKyBlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0V2FpdExpc3QoKSB7XHJcbiAgICB0aGlzLnVzZXJzV2FpdGluZyA9IFtdO1xyXG4gICAgdGhpcy5Db3Vyc2VTZXJ2aWNlXHJcbiAgICAgIC5nZXRXYWl0TGlzdCgpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMud2FpdExpc3QgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLndhaXRMaXN0ID0gcmVzdWx0O1xyXG4gICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLndhaXRMaXN0KSB7XHJcbiAgICAgICAgICAgICB2YXIgdXNlciA9IHRoaXMudXNlcnMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IGl0ZW0udXNlcklEKTtcclxuICAgICAgICAgICAgIC8vc3R1ZGVudFswXS5mdWxsTmFtZSA9IHN0dWRlbnRbMF0uZmlyc3ROYW1lICsgXCIgXCIgKyBzdHVkZW50WzBdLmxhc3ROYW1lO1xyXG4gICAgICAgICAgICAgLy8gc3R1ZGVudFswXS5jb3Vyc2VJRCA9IGNvdXJzZVswXS5jb3Vyc2VJRDtcclxuICAgICAgICAgICAgIC8vIHN0dWRlbnRbMF0ucHJvZmVzc29ySWQgPSBjb3Vyc2VbMF0ucHJvZmVzc29ySWQ7XHJcbiAgICAgICAgICAgICB1c2VyWzBdLmNvdXJzZU5hbWUgPSBpdGVtLmNvdXJzZVR5cGU7XHJcbiAgICAgICAgICAgICB2YXIgdXNlclJlY29yZCA9IHtcclxuICAgICAgICAgICAgICAgaWQ6IHVzZXJbMF0udXNlcklELFxyXG4gICAgICAgICAgICAgICBmdWxsTmFtZTogdXNlclswXS5mdWxsTmFtZSxcclxuICAgICAgICAgICAgICAgY291cnNlVHlwZTogaXRlbS5jb3Vyc2VUeXBlLFxyXG4gICAgICAgICAgICAgICBkYXRlOiBpdGVtLmRhdGVcclxuICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICB0aGlzLnVzZXJzV2FpdGluZy5wdXNoKHVzZXJSZWNvcmQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5nZXRUaW1ldGFibGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvciAtIEdldCB3YWl0IGxpc3Q6IFwiICsgZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIGdldFRpbWV0YWJsZXMoKSB7XHJcbiAgICB0aGlzLlN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRUaW1ldGFibGVzKClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy50aW1ldGFibGVzID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy50aW1ldGFibGVzID0gcmVzdWx0O1xyXG4gICAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgdGltZXRhYmxlczogXCIgKyBlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgc2hvd1dhaXRMaXN0Rm9ybSgpIHtcclxuICAgIHRoaXMuc2hvd0Zvcm0gPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgYWRkU3R1ZGVudFRvV2FpdExpc3QoKSB7XHJcbiAgICB2YXIgQ3VycmVudERhdGUgPSBtb21lbnQoKS5mb3JtYXQoKTtcclxuICAgaWYgKHRoaXMuc2VsZWN0ZWRVc2VyID09IG51bGwgfHwgdGhpcy5zZWxlY3RlZENvdXJzZVR5cGUgPT0gbnVsbCkge1xyXG4gICAgICBzd2FsKFxyXG4gICAgICAgICdJbnZhbGlkIElucHV0JyxcclxuICAgICAgICAnUGxlYXNlIHNlbGVjdCBib3RoIGEgc3R1ZGVudCBhbmQgYSBjb3Vyc2UuJyxcclxuICAgICAgICAnd2FybmluZydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiAnU2F2aW5nLi4uJyxcclxuICAgICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgICAgdGhpcy5jb3Vyc2VXYWl0TGlzdCA9IG51bGw7XHJcbiAgICAgIHRoaXMuc2hvd0Zvcm0gPSBmYWxzZTtcclxuICAgICAgdGhpcy5Db3Vyc2VTZXJ2aWNlXHJcbiAgICAgICAgLmFkZFRvV2FpdExpc3QodGhpcy5zZWxlY3RlZFVzZXIsIHRoaXMuc2VsZWN0ZWRDb3Vyc2VUeXBlLCBDdXJyZW50RGF0ZSlcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpICB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0V2FpdExpc3QoKTtcclxuICAgICAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSBhZGRpbmcgc3R1ZGVudCB0byB3YWl0IGxpc3QuJyxcclxuICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvciAtIEFkZCBzdHVkZW50IHRvIHdhaXQgbGlzdDogXCIgKyBlcnJvcikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbVdhaXRMaXN0KGRhdGEpIHtcclxuICAgIHRoaXMuQ291cnNlU2VydmljZVxyXG4gICAgICAucmVtb3ZlRnJvbVdhaXRMaXN0KGRhdGEuaWQsIGRhdGEuY291cnNlVHlwZSlcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICB0aGlzLmdldFdhaXRMaXN0KCk7XHJcbiAgICAgICAgc3dhbChcclxuICAgICAgICAgICdSZW1vdmVkIGZyb20gJyArIGRhdGEuY291cnNlVHlwZSxcclxuICAgICAgICAgICcnICsgZGF0YS5mdWxsTmFtZSArICcgaGFzIGJlZW4gc3VjY2VzZnVsbHkgcmVtb3ZlZCBmcm9tIHRoZSAnICsgZGF0YS5jb3Vyc2VUeXBlICsgJyB3YWl0IGxpc3QuJyxcclxuICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGNsb3NlTWVudSgpIHtcclxuICAgIHRoaXMuc2hvd0Zvcm0gPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdvdG9TdHVkZW50RW5yb2xsbWVudChkYXRhLCBldmVudDogYW55KSB7XHJcbiAgICBjb25zb2xlLmxvZyhkYXRhLmlkKTtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3N0dWRlbnQtZW5yb2xsbWVudCcsIGRhdGEuY291cnNlVHlwZSwgZGF0YS5pZCBdKTtcclxuICB9XHJcblxyXG4gIHZpZXdDb3Vyc2VXYWl0TGlzdChkYXRhKSB7XHJcbiAgICB0aGlzLnZpZXdpbmdDb3Vyc2UgPSBkYXRhO1xyXG4gICAgdGhpcy51c2Vyc1dhaXRpbmcgPSBbXTtcclxuICAgIHRoaXMuY291cnNlV2FpdExpc3QgPSB0aGlzLndhaXRMaXN0LmZpbHRlcih4ID0+IHguY291cnNlVHlwZSA9PT0gZGF0YS5jb3Vyc2VUeXBlKTtcclxuICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5jb3Vyc2VXYWl0TGlzdCkge1xyXG4gICAgICAgdmFyIHVzZXIgPSB0aGlzLnVzZXJzLmZpbHRlcih4ID0+IHgudXNlcklEID09PSBpdGVtLnVzZXJJRCk7XHJcbiAgICAgICB1c2VyWzBdLmZ1bGxOYW1lID0gdXNlclswXS5maXJzdE5hbWUgKyBcIiBcIiArIHVzZXJbMF0ubGFzdE5hbWU7XHJcbiAgICAgICB2YXIgdXNlclJlY29yZCA9IHtcclxuICAgICAgICAgZnVsbE5hbWU6IHVzZXJbMF0uZnVsbE5hbWUsXHJcbiAgICAgICAgIGRhdGU6IGl0ZW0uZGF0ZVxyXG4gICAgICAgfTtcclxuXHJcbiAgICAgICB0aGlzLnVzZXJzV2FpdGluZy5wdXNoKHVzZXJSZWNvcmQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25QcmludCgpIHtcclxuICAgICh3aW5kb3cgYXMgYW55KS5wcmludCgpO1xyXG4gIH1cclxuXHJcbiAgZGlzcGxheUVycm9yQWxlcnQoZXJyb3IpIHtcclxuICAgIHN3YWwoXHJcbiAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICBlcnJvci5tc2csXHJcbiAgICAgICdlcnJvcidcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
