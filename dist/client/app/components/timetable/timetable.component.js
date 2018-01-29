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
var router_2 = require("@angular/router");
var Student_1 = require("../../models/Student");
var student_service_1 = require("../../services/student.service");
var course_service_1 = require("../../services/course.service");
var TimetableComponent = /** @class */ (function () {
    function TimetableComponent(router, studentService, courseService, route) {
        this.router = router;
        this.studentService = studentService;
        this.courseService = courseService;
        this.route = route;
        this.events = [];
        this.faculty = false;
        this.validInfo = false;
    }
    TimetableComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userID = currentUser.userID;
        if (currentUser.userType !== "Student") {
            this.faculty = true;
            this.studentService
                .getStudents()
                .then(function (students) {
                _this.students = students;
            })
                .catch(function (error) {
                // do something
            });
            swal({
                title: 'Timetable',
                text: 'Enter a student name',
                input: "text",
                inputPlaceholder: "Student Name",
                showCancelButton: true,
                animation: "slide-from-top",
                confirmButtonColor: '#3085d6',
                allowOutsideClick: false,
                confirmButtonText: 'Continue',
                cancelButtonText: 'Back to Dashboard'
            }).then(function (isConfirm) {
                if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                    console.log(isConfirm.dismiss);
                    _this.router.navigate(['/dashboard']);
                }
                else if (isConfirm) {
                    _this.studentSearchQuery = isConfirm.value;
                    var name = _this.studentSearchQuery.split(" ");
                    var firstName = name[0];
                    var lastName = name[1];
                    if (firstName == null || lastName == null) {
                        _this.alert();
                    }
                    else {
                        try {
                            _this.selectedStudent = _this.students.filter(function (x) { return x.firstName === firstName && x.lastName === lastName; });
                            _this.getEventsById(_this.selectedStudent[0].userID);
                            _this.validInfo = true;
                        }
                        catch (e) {
                            _this.alert();
                        }
                    }
                }
                else {
                    _this.alert();
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
        else {
            this.getEventsById(userID);
        }
        this.options = {
            selectable: true,
            prev: 'circle-triangle-w',
            defaultView: "agendaWeek",
            minTime: "08:00:00",
            maxTime: "22:00:00",
            height: "auto"
        };
    };
    TimetableComponent.prototype.alert = function () {
        var _this = this;
        this.validInfo = false;
        swal({
            title: 'Timetable',
            text: 'Enter a valid student name',
            input: "text",
            type: 'warning',
            inputPlaceholder: "Student Name",
            showCancelButton: true,
            animation: "slide-from-top",
            confirmButtonColor: '#3085d6',
            allowOutsideClick: false,
            confirmButtonText: 'Continue',
            cancelButtonText: 'Back to Dashboard'
        }).then(function (isConfirm) {
            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                console.log(isConfirm.dismiss);
                _this.router.navigate(['/dashboard']);
            }
            else if (isConfirm) {
                _this.studentSearchQuery = isConfirm.value;
                var name = _this.studentSearchQuery.split(" ");
                var firstName = name[0];
                var lastName = name[1];
                if (firstName == null || lastName == null) {
                    _this.alert();
                }
                else {
                    _this.events = [];
                    try {
                        _this.selectedStudent = _this.students.filter(function (x) { return x.firstName === firstName && x.lastName === lastName; });
                        _this.getEventsById(_this.selectedStudent[0].userID);
                        _this.validInfo = true;
                    }
                    catch (e) {
                        _this.alert();
                    }
                }
            }
            else {
                _this.alert();
            }
        }).catch(function (error) {
            console.log(error);
        });
    };
    TimetableComponent.prototype.getEventsById = function (userID) {
        var _this = this;
        this.studentService.getEventsById(userID).then(function (result) {
            result.forEach(function (i) {
                var classDay = 0;
                if (i.classDay === "Monday") {
                    classDay = 1;
                }
                else if (i.classDay === "Tuesday") {
                    classDay = 2;
                }
                else if (i.classDay === "Wednesday") {
                    classDay = 3;
                }
                else if (i.classDay === "Thursday") {
                    classDay = 4;
                }
                else if (i.classDay === "Friday") {
                    classDay = 5;
                }
                i.courseStart = moment(i.courseStart).format('YYYY-MM-DD');
                i.courseEnd = moment(i.courseEnd).format('YYYY-MM-DD');
                i.classStartTime = moment(i.classStartTime).format('hh:mm A');
                i.classEndTime = moment(i.classEndTime).format('hh:mm A');
                if (i.classTimeStr) {
                    var array = i.classTimeStr.split(',');
                    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                        var item = array_1[_i];
                        var date = item.split(' ');
                        var day = date[0];
                        var time = date[1];
                        var startTime = time.split('-')[0];
                        var endTime = time.split('-')[1];
                        _this.events.push({
                            "title": i.courseName,
                            "start": day + "T" + startTime,
                            "end": day + "T" + endTime
                        });
                    }
                }
                else {
                    console.log("No class date string available");
                }
            });
        }).catch(function (error) {
            console.log("Error getting events by id");
        });
    };
    TimetableComponent.prototype.goBack = function () {
        window.history.back();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Student_1.Student)
    ], TimetableComponent.prototype, "student", void 0);
    TimetableComponent = __decorate([
        core_1.Component({
            selector: 'timetable',
            templateUrl: './app/components/timetable/timetable.component.html',
            styleUrls: ['./app/components/timetable/timetable.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, student_service_1.StudentService, course_service_1.CourseService, router_2.ActivatedRoute])
    ], TimetableComponent);
    return TimetableComponent;
}());
exports.TimetableComponent = TimetableComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCwwQ0FBeUM7QUFDekMsMENBQXlEO0FBRXpELGdEQUErQztBQUMvQyxrRUFBZ0U7QUFDaEUsZ0VBQTZEO0FBVTdEO0lBV0UsNEJBQW9CLE1BQWMsRUFBVSxjQUE4QixFQUFVLGFBQTJCLEVBQVUsS0FBcUI7UUFBMUgsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFUOUksV0FBTSxHQUFVLEVBQUUsQ0FBQztRQU1uQixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGNBQVMsR0FBWSxLQUFLLENBQUM7SUFJM0IsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFBQSxpQkFpRUM7UUFoRUMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUVoQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLGNBQWM7aUJBQ2QsV0FBVyxFQUFFO2lCQUNiLElBQUksQ0FBQyxVQUFBLFFBQVE7Z0JBQ1YsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDN0IsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxVQUFBLEtBQUs7Z0JBQ1YsZUFBZTtZQUNqQixDQUFDLENBQUMsQ0FBQztZQUVQLElBQUksQ0FBQztnQkFDRCxLQUFLLEVB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RDtZQUNsRSxTQUFTLEVBQUUsQ0FBQyxvREFBb0QsQ0FBQztTQUNsRSxDQUFDO3lDQWE0QixlQUFNLEVBQTBCLGdDQUFjLEVBQXdCLDhCQUFhLEVBQWlCLHVCQUFjO09BWG5JLGtCQUFrQixDQThLOUI7SUFBRCx5QkFBQztDQTlLRCxBQThLQyxJQUFBO0FBOUtZLGdEQUFrQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb3Vyc2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvU3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291cnNlU2VydmljZX0gZnJvbSAnLi4vLi4vc2VydmljZXMvY291cnNlLnNlcnZpY2UnO1xyXG5kZWNsYXJlIHZhciBtb21lbnQ6IGFueTtcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd0aW1ldGFibGUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFRpbWV0YWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgc3R1ZGVudDogU3R1ZGVudDtcclxuICBldmVudHM6IGFueVtdID0gW107XHJcbiAgaGVhZGVyOiBhbnk7XHJcbiAgb3B0aW9uczogYW55O1xyXG4gIHN0dWRlbnRzOiBTdHVkZW50IFtdO1xyXG4gIHNlbGVjdGVkU3R1ZGVudDogU3R1ZGVudCBbXTtcclxuICBzdHVkZW50U2VhcmNoUXVlcnk6IFN0cmluZztcclxuICBmYWN1bHR5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgdmFsaWRJbmZvOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlLCBwcml2YXRlIGNvdXJzZVNlcnZpY2U6Q291cnNlU2VydmljZSwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHZhciBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgdmFyIHVzZXJJRCA9IGN1cnJlbnRVc2VyLnVzZXJJRDtcclxuXHJcbiAgICBpZiAoY3VycmVudFVzZXIudXNlclR5cGUgIT09IFwiU3R1ZGVudFwiKSB7XHJcbiAgICAgIHRoaXMuZmFjdWx0eSA9IHRydWU7XHJcbiAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgIC5nZXRTdHVkZW50cygpXHJcbiAgICAgICAgICAudGhlbihzdHVkZW50cyA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zdHVkZW50cyA9IHN0dWRlbnRzO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIC8vIGRvIHNvbWV0aGluZ1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnVGltZXRhYmxlJyxcclxuICAgICAgICAgIHRleHQ6ICdFbnRlciBhIHN0dWRlbnQgbmFtZScsXHJcbiAgICAgICAgICBpbnB1dDogXCJ0ZXh0XCIsXHJcbiAgICAgICAgICBpbnB1dFBsYWNlaG9sZGVyOiBcIlN0dWRlbnQgTmFtZVwiLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGFuaW1hdGlvbjogXCJzbGlkZS1mcm9tLXRvcFwiLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2UsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0NvbnRpbnVlJyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdCYWNrIHRvIERhc2hib2FyZCdcclxuICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50U2VhcmNoUXVlcnkgPSBpc0NvbmZpcm0udmFsdWU7XHJcbiAgICAgICAgICB2YXIgbmFtZSA9IHRoaXMuc3R1ZGVudFNlYXJjaFF1ZXJ5LnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgIHZhciBmaXJzdE5hbWUgPSBuYW1lWzBdO1xyXG4gICAgICAgICAgdmFyIGxhc3ROYW1lID0gbmFtZVsxXTtcclxuICAgICAgICAgIGlmIChmaXJzdE5hbWUgPT0gbnVsbCB8fCBsYXN0TmFtZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxlcnQoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFN0dWRlbnQgPSB0aGlzLnN0dWRlbnRzLmZpbHRlcih4ID0+IHguZmlyc3ROYW1lID09PSBmaXJzdE5hbWUgJiYgeC5sYXN0TmFtZSA9PT0gbGFzdE5hbWUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuZ2V0RXZlbnRzQnlJZCh0aGlzLnNlbGVjdGVkU3R1ZGVudFswXS51c2VySUQpO1xyXG4gICAgICAgICAgICAgIHRoaXMudmFsaWRJbmZvID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuYWxlcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmFsZXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdldEV2ZW50c0J5SWQodXNlcklEKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9wdGlvbnMgPSB7XHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIHByZXY6ICdjaXJjbGUtdHJpYW5nbGUtdycsXHJcbiAgICAgIGRlZmF1bHRWaWV3OiBcImFnZW5kYVdlZWtcIixcclxuICAgICAgbWluVGltZTogXCIwODowMDowMFwiLFxyXG4gICAgICBtYXhUaW1lOiBcIjIyOjAwOjAwXCIsXHJcbiAgICAgIGhlaWdodDogXCJhdXRvXCJcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBhbGVydCgpIHtcclxuICAgIHRoaXMudmFsaWRJbmZvID0gZmFsc2U7XHJcbiAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogJ1RpbWV0YWJsZScsXHJcbiAgICAgICAgdGV4dDogJ0VudGVyIGEgdmFsaWQgc3R1ZGVudCBuYW1lJyxcclxuICAgICAgICBpbnB1dDogXCJ0ZXh0XCIsXHJcbiAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgIGlucHV0UGxhY2Vob2xkZXI6IFwiU3R1ZGVudCBOYW1lXCIsXHJcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBhbmltYXRpb246IFwic2xpZGUtZnJvbS10b3BcIixcclxuICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2UsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdDb250aW51ZScsXHJcbiAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0JhY2sgdG8gRGFzaGJvYXJkJ1xyXG4gICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICBpZiAoaXNDb25maXJtLmRpc21pc3MgPT09IFwiY2FuY2VsXCIgfHwgaXNDb25maXJtLmRpc21pc3MgPT09IFwib3ZlcmxheVwiKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtLmRpc21pc3MpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKTtcclxuICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICB0aGlzLnN0dWRlbnRTZWFyY2hRdWVyeSA9IGlzQ29uZmlybS52YWx1ZTtcclxuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuc3R1ZGVudFNlYXJjaFF1ZXJ5LnNwbGl0KFwiIFwiKTtcclxuICAgICAgICB2YXIgZmlyc3ROYW1lID0gbmFtZVswXTtcclxuICAgICAgICB2YXIgbGFzdE5hbWUgPSBuYW1lWzFdO1xyXG4gICAgICAgIGlmIChmaXJzdE5hbWUgPT0gbnVsbCB8fCBsYXN0TmFtZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICB0aGlzLmFsZXJ0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZXZlbnRzID0gW107XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkU3R1ZGVudCA9IHRoaXMuc3R1ZGVudHMuZmlsdGVyKHggPT4geC5maXJzdE5hbWUgPT09IGZpcnN0TmFtZSAmJiB4Lmxhc3ROYW1lID09PSBsYXN0TmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RXZlbnRzQnlJZCh0aGlzLnNlbGVjdGVkU3R1ZGVudFswXS51c2VySUQpO1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkSW5mbyA9IHRydWU7XHJcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxlcnQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5hbGVydCgpO1xyXG4gICAgICB9XHJcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0RXZlbnRzQnlJZCh1c2VySUQpIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2UuZ2V0RXZlbnRzQnlJZCh1c2VySUQpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgcmVzdWx0LmZvckVhY2goKGkpID0+IHtcclxuICAgICAgICB2YXIgY2xhc3NEYXkgPSAwO1xyXG5cclxuICAgICAgICBpZiAoaS5jbGFzc0RheSA9PT0gXCJNb25kYXlcIikge1xyXG4gICAgICAgICAgY2xhc3NEYXkgPSAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaS5jbGFzc0RheSA9PT0gXCJUdWVzZGF5XCIpIHtcclxuICAgICAgICAgIGNsYXNzRGF5ID0gMjtcclxuICAgICAgICB9IGVsc2UgaWYgKGkuY2xhc3NEYXkgPT09IFwiV2VkbmVzZGF5XCIpIHtcclxuICAgICAgICAgIGNsYXNzRGF5ID0gMztcclxuICAgICAgICB9IGVsc2UgaWYgKGkuY2xhc3NEYXkgPT09IFwiVGh1cnNkYXlcIikge1xyXG4gICAgICAgICAgY2xhc3NEYXkgPSA0O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaS5jbGFzc0RheSA9PT0gXCJGcmlkYXlcIikge1xyXG4gICAgICAgICAgY2xhc3NEYXkgPSA1O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaS5jb3Vyc2VTdGFydCA9IG1vbWVudChpLmNvdXJzZVN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICBpLmNvdXJzZUVuZCA9IG1vbWVudChpLmNvdXJzZUVuZCkuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgaS5jbGFzc1N0YXJ0VGltZSA9IG1vbWVudChpLmNsYXNzU3RhcnRUaW1lKS5mb3JtYXQoJ2hoOm1tIEEnKTtcclxuICAgICAgICBpLmNsYXNzRW5kVGltZSA9IG1vbWVudChpLmNsYXNzRW5kVGltZSkuZm9ybWF0KCdoaDptbSBBJyk7XHJcblxyXG4gICAgICAgIGlmIChpLmNsYXNzVGltZVN0cikge1xyXG4gICAgICAgICAgdmFyIGFycmF5ID0gaS5jbGFzc1RpbWVTdHIuc3BsaXQoJywnKTtcclxuICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgYXJyYXkpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBpdGVtLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgIHZhciBkYXkgPSBkYXRlWzBdO1xyXG4gICAgICAgICAgICB2YXIgdGltZSA9IGRhdGVbMV07XHJcbiAgICAgICAgICAgIHZhciBzdGFydFRpbWUgPSB0aW1lLnNwbGl0KCctJylbMF07XHJcbiAgICAgICAgICAgIHZhciBlbmRUaW1lID0gdGltZS5zcGxpdCgnLScpWzFdO1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5wdXNoKFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidGl0bGVcIjogaS5jb3Vyc2VOYW1lLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydFwiOiBkYXkgKyBcIlRcIiArIHN0YXJ0VGltZSxcclxuICAgICAgICAgICAgICAgIFwiZW5kXCI6IGRheSArIFwiVFwiICsgZW5kVGltZVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIGNsYXNzIGRhdGUgc3RyaW5nIGF2YWlsYWJsZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGdldHRpbmcgZXZlbnRzIGJ5IGlkXCIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
