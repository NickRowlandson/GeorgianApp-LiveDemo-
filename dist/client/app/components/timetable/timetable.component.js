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
            }).then(function (inputValue) {
                if (inputValue) {
                    _this.studentSearchQuery = inputValue;
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
                _this.router.navigate(['/dashboard']);
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
        }).then(function (inputValue) {
            if (inputValue) {
                _this.studentSearchQuery = inputValue;
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
            _this.router.navigate(['/dashboard']);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCwwQ0FBeUM7QUFDekMsMENBQXlEO0FBRXpELGdEQUErQztBQUMvQyxrRUFBZ0U7QUFDaEUsZ0VBQTZEO0FBVTdEO0lBV0UsNEJBQW9CLE1BQWMsRUFBVSxjQUE4QixFQUFVLGFBQTJCLEVBQVUsS0FBcUI7UUFBMUgsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFUOUksV0FBTSxHQUFVLEVBQUUsQ0FBQztRQU1uQixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGNBQVMsR0FBWSxLQUFLLENBQUM7SUFJM0IsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFBQSxpQkE4REM7UUE3REMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUVoQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLGNBQWM7aUJBQ2QsV0FBVyxFQUFFO2lCQUNiLElBQUksQ0FBQyxVQUFBLFFBQVE7Z0JBQ1YsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDN0IsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxVQUFBLEtBQUs7Z0JBQ1YsZUFBZTtZQUNqQixDQUFDLENBQUMsQ0FBQztZQUVQLElBQUksQ0FBQztnQkFDRCxLQUFLLEVB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RyxTQUFTOzRCQUM5QixLQUFLLEVBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxPQUFPO3lCQUMzQixDQUFDLENBQUM7cUJBQ047Z0JBQ0gsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7Z0JBQ2hELENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEtBQUs7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsbUNBQU0sR0FBTjtRQUNFLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQXRLUTtRQUFSLFlBQUssRUFBRTtrQ0FBVSxpQkFBTzt1REFBQztJQURmLGtCQUFrQjtRQU45QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLHFEQUFxRDtZQUNsRSxTQUFTLEVBQUUsQ0FBQyxvREFBb0QsQ0FBQztTQUNsRSxDQUFDO3lDQWE0QixlQUFNLEVBQTBCLGdDQUFjLEVBQXdCLDhCQUFhLEVBQWlCLHVCQUFjO09BWG5JLGtCQUFrQixDQXdLOUI7SUFBRCx5QkFBQztDQXhLRCxBQXdLQyxJQUFBO0FBeEtZLGdEQUFrQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb3Vyc2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvU3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291cnNlU2VydmljZX0gZnJvbSAnLi4vLi4vc2VydmljZXMvY291cnNlLnNlcnZpY2UnO1xyXG5kZWNsYXJlIHZhciBtb21lbnQ6IGFueTtcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd0aW1ldGFibGUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFRpbWV0YWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgc3R1ZGVudDogU3R1ZGVudDtcclxuICBldmVudHM6IGFueVtdID0gW107XHJcbiAgaGVhZGVyOiBhbnk7XHJcbiAgb3B0aW9uczogYW55O1xyXG4gIHN0dWRlbnRzOiBTdHVkZW50IFtdO1xyXG4gIHNlbGVjdGVkU3R1ZGVudDogU3R1ZGVudCBbXTtcclxuICBzdHVkZW50U2VhcmNoUXVlcnk6IFN0cmluZztcclxuICBmYWN1bHR5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgdmFsaWRJbmZvOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlLCBwcml2YXRlIGNvdXJzZVNlcnZpY2U6Q291cnNlU2VydmljZSwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHZhciBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgdmFyIHVzZXJJRCA9IGN1cnJlbnRVc2VyLnVzZXJJRDtcclxuXHJcbiAgICBpZiAoY3VycmVudFVzZXIudXNlclR5cGUgIT09IFwiU3R1ZGVudFwiKSB7XHJcbiAgICAgIHRoaXMuZmFjdWx0eSA9IHRydWU7XHJcbiAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgIC5nZXRTdHVkZW50cygpXHJcbiAgICAgICAgICAudGhlbihzdHVkZW50cyA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zdHVkZW50cyA9IHN0dWRlbnRzO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIC8vIGRvIHNvbWV0aGluZ1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnVGltZXRhYmxlJyxcclxuICAgICAgICAgIHRleHQ6ICdFbnRlciBhIHN0dWRlbnQgbmFtZScsXHJcbiAgICAgICAgICBpbnB1dDogXCJ0ZXh0XCIsXHJcbiAgICAgICAgICBpbnB1dFBsYWNlaG9sZGVyOiBcIlN0dWRlbnQgTmFtZVwiLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGFuaW1hdGlvbjogXCJzbGlkZS1mcm9tLXRvcFwiLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2UsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0NvbnRpbnVlJyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdCYWNrIHRvIERhc2hib2FyZCdcclxuICAgICAgfSkudGhlbihpbnB1dFZhbHVlID0+IHtcclxuICAgICAgICBpZiAoaW5wdXRWYWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50U2VhcmNoUXVlcnkgPSBpbnB1dFZhbHVlO1xyXG4gICAgICAgICAgdmFyIG5hbWUgPSB0aGlzLnN0dWRlbnRTZWFyY2hRdWVyeS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICB2YXIgZmlyc3ROYW1lID0gbmFtZVswXTtcclxuICAgICAgICAgIHZhciBsYXN0TmFtZSA9IG5hbWVbMV07XHJcbiAgICAgICAgICBpZiAoZmlyc3ROYW1lID09IG51bGwgfHwgbGFzdE5hbWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmFsZXJ0KCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTdHVkZW50ID0gdGhpcy5zdHVkZW50cy5maWx0ZXIoeCA9PiB4LmZpcnN0TmFtZSA9PT0gZmlyc3ROYW1lICYmIHgubGFzdE5hbWUgPT09IGxhc3ROYW1lKTtcclxuICAgICAgICAgICAgICB0aGlzLmdldEV2ZW50c0J5SWQodGhpcy5zZWxlY3RlZFN0dWRlbnRbMF0udXNlcklEKTtcclxuICAgICAgICAgICAgICB0aGlzLnZhbGlkSW5mbyA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICB0aGlzLmFsZXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5hbGVydCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nZXRFdmVudHNCeUlkKHVzZXJJRCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vcHRpb25zID0ge1xyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBwcmV2OiAnY2lyY2xlLXRyaWFuZ2xlLXcnLFxyXG4gICAgICBkZWZhdWx0VmlldzogXCJhZ2VuZGFXZWVrXCIsXHJcbiAgICAgIG1pblRpbWU6IFwiMDg6MDA6MDBcIixcclxuICAgICAgbWF4VGltZTogXCIyMjowMDowMFwiLFxyXG4gICAgICBoZWlnaHQ6IFwiYXV0b1wiXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgYWxlcnQoKSB7XHJcbiAgICB0aGlzLnZhbGlkSW5mbyA9IGZhbHNlO1xyXG4gICAgc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6ICdUaW1ldGFibGUnLFxyXG4gICAgICAgIHRleHQ6ICdFbnRlciBhIHZhbGlkIHN0dWRlbnQgbmFtZScsXHJcbiAgICAgICAgaW5wdXQ6IFwidGV4dFwiLFxyXG4gICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICBpbnB1dFBsYWNlaG9sZGVyOiBcIlN0dWRlbnQgTmFtZVwiLFxyXG4gICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgYW5pbWF0aW9uOiBcInNsaWRlLWZyb20tdG9wXCIsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnQ29udGludWUnLFxyXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdCYWNrIHRvIERhc2hib2FyZCdcclxuICAgIH0pLnRoZW4oaW5wdXRWYWx1ZSA9PiB7XHJcbiAgICAgIGlmIChpbnB1dFZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zdHVkZW50U2VhcmNoUXVlcnkgPSBpbnB1dFZhbHVlO1xyXG4gICAgICAgIHZhciBuYW1lID0gdGhpcy5zdHVkZW50U2VhcmNoUXVlcnkuc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgIHZhciBmaXJzdE5hbWUgPSBuYW1lWzBdO1xyXG4gICAgICAgIHZhciBsYXN0TmFtZSA9IG5hbWVbMV07XHJcbiAgICAgICAgaWYgKGZpcnN0TmFtZSA9PSBudWxsIHx8IGxhc3ROYW1lID09IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMuYWxlcnQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5ldmVudHMgPSBbXTtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTdHVkZW50ID0gdGhpcy5zdHVkZW50cy5maWx0ZXIoeCA9PiB4LmZpcnN0TmFtZSA9PT0gZmlyc3ROYW1lICYmIHgubGFzdE5hbWUgPT09IGxhc3ROYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5nZXRFdmVudHNCeUlkKHRoaXMuc2VsZWN0ZWRTdHVkZW50WzBdLnVzZXJJRCk7XHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRJbmZvID0gdHJ1ZTtcclxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5hbGVydCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmFsZXJ0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRFdmVudHNCeUlkKHVzZXJJRCkge1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZS5nZXRFdmVudHNCeUlkKHVzZXJJRCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICByZXN1bHQuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICAgIHZhciBjbGFzc0RheSA9IDA7XHJcblxyXG4gICAgICAgIGlmIChpLmNsYXNzRGF5ID09PSBcIk1vbmRheVwiKSB7XHJcbiAgICAgICAgICBjbGFzc0RheSA9IDE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpLmNsYXNzRGF5ID09PSBcIlR1ZXNkYXlcIikge1xyXG4gICAgICAgICAgY2xhc3NEYXkgPSAyO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaS5jbGFzc0RheSA9PT0gXCJXZWRuZXNkYXlcIikge1xyXG4gICAgICAgICAgY2xhc3NEYXkgPSAzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaS5jbGFzc0RheSA9PT0gXCJUaHVyc2RheVwiKSB7XHJcbiAgICAgICAgICBjbGFzc0RheSA9IDQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpLmNsYXNzRGF5ID09PSBcIkZyaWRheVwiKSB7XHJcbiAgICAgICAgICBjbGFzc0RheSA9IDU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpLmNvdXJzZVN0YXJ0ID0gbW9tZW50KGkuY291cnNlU3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgIGkuY291cnNlRW5kID0gbW9tZW50KGkuY291cnNlRW5kKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICBpLmNsYXNzU3RhcnRUaW1lID0gbW9tZW50KGkuY2xhc3NTdGFydFRpbWUpLmZvcm1hdCgnaGg6bW0gQScpO1xyXG4gICAgICAgIGkuY2xhc3NFbmRUaW1lID0gbW9tZW50KGkuY2xhc3NFbmRUaW1lKS5mb3JtYXQoJ2hoOm1tIEEnKTtcclxuXHJcbiAgICAgICAgaWYgKGkuY2xhc3NUaW1lU3RyKSB7XHJcbiAgICAgICAgICB2YXIgYXJyYXkgPSBpLmNsYXNzVGltZVN0ci5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBhcnJheSkge1xyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IGl0ZW0uc3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgdmFyIGRheSA9IGRhdGVbMF07XHJcbiAgICAgICAgICAgIHZhciB0aW1lID0gZGF0ZVsxXTtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0VGltZSA9IHRpbWUuc3BsaXQoJy0nKVswXTtcclxuICAgICAgICAgICAgdmFyIGVuZFRpbWUgPSB0aW1lLnNwbGl0KCctJylbMV07XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnB1c2goXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBpLmNvdXJzZU5hbWUsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0XCI6IGRheSArIFwiVFwiICsgc3RhcnRUaW1lLFxyXG4gICAgICAgICAgICAgICAgXCJlbmRcIjogZGF5ICsgXCJUXCIgKyBlbmRUaW1lXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gY2xhc3MgZGF0ZSBzdHJpbmcgYXZhaWxhYmxlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZ2V0dGluZyBldmVudHMgYnkgaWRcIik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
