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
                    _this.studentSearchQuery = inputValue.value;
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
                _this.studentSearchQuery = inputValue.value;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCwwQ0FBeUM7QUFDekMsMENBQXlEO0FBRXpELGdEQUErQztBQUMvQyxrRUFBZ0U7QUFDaEUsZ0VBQTZEO0FBVTdEO0lBV0UsNEJBQW9CLE1BQWMsRUFBVSxjQUE4QixFQUFVLGFBQTJCLEVBQVUsS0FBcUI7UUFBMUgsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFUOUksV0FBTSxHQUFVLEVBQUUsQ0FBQztRQU1uQixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGNBQVMsR0FBWSxLQUFLLENBQUM7SUFJM0IsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFBQSxpQkErREM7UUE5REMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUVoQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLGNBQWM7aUJBQ2QsV0FBVyxFQUFFO2lCQUNiLElBQUksQ0FBQyxVQUFBLFFBQVE7Z0JBQ1YsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDN0IsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxVQUFBLEtBQUs7Z0JBQ1YsZUFBZTtZQUNqQixDQUFDLENBQUMsQ0FBQztZQUVQLElBQUksQ0FBQztnQkFDRCxLQUFLLEVBQUUsV0FBVztnQkFDbEIsSUFBSSxFQUFFLHNCQUFzQjtnQkFDNUIsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsZ0JBQWdCLEVBQUUsY0FBYztnQkFDaEMsZ0JBQWdCLEVBQUUsSUFBSTtnQkFDdEIsU0FBUyxFQUFFLGdCQUFnQjtnQkFDM0Isa0JBQWtCLEVBQUUsU0FBUztnQkFDN0IsaUJBQWlCLEVBQUUsS0FBSztnQkFDeEIsaUJBQWlCLEVBQUUsVUFBVTtnQkFDN0IsZ0JBQWdCLEVBQUUsbUJBQW1CO2FBQ3hDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxVQUFVO2dCQUNoQixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNmLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO29CQUMzQyxJQUFJLElBQUksR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM5QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkIsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDMUMsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNmLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sSUFBSSxDQUFDOzRCQUNILEtBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsU0FBUyxLQUFLLFNBQVMsSUFBSSxDQUFDLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBcEQsQ0FBb0QsQ0FBQyxDQUFDOzRCQUN2RyxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQ25ELEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO3dCQUN4QixDQUFDO3dCQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ1gsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUNmLENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDZixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSztnQkFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFFTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ2IsVUFBVSxFQUFFLElBQUk7WUFDaEIsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixXQUFXLEVBQUUsWUFBWTtZQUN6QixPQUFPLEVBQUUsVUFBVTtZQUNuQixPQUFPLEVBQUUsVUFBVTtZQUNuQixNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUM7SUFDSixDQUFDO0lBRUQsa0NBQUssR0FBTDtRQUFBLGlCQXNDQztRQXJDQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUM7WUFDRCxLQUFLLEVBQUUsV0FBVztZQUNsQixJQUFJLEVBQUUsNEJBQTRCO1lBQ2xDLEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFLFNBQVM7WUFDZixnQkFBZ0IsRUFBRSxjQUFjO1lBQ2hDLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsU0FBUyxFQUFFLGdCQUFnQjtZQUMzQixrQkFBa0IsRUFBRSxTQUFTO1lBQzdCLGlCQUFpQixFQUFFLEtBQUs7WUFDeEIsaUJBQWlCLEVBQUUsVUFBVTtZQUM3QixnQkFBZ0IsRUFBRSxtQkFBbUI7U0FDeEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFVBQVU7WUFDaEIsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDZixLQUFJLENBQUMsa0JBQWtCLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztnQkFDM0MsSUFBSSxJQUFJLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxJQUFJLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDZixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLEtBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO29CQUNqQixJQUFJLENBQUM7d0JBQ0gsS0FBSSxDQUFDLGVBQWUsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFwRCxDQUFvRCxDQUFDLENBQUM7d0JBQ3ZHLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDbkQsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ3hCLENBQUM7b0JBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDWCxLQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ2YsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNmLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLO1lBQ1osS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDBDQUFhLEdBQWIsVUFBYyxNQUFNO1FBQXBCLGlCQTRDQztRQTNDQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ25ELE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDO2dCQUNmLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztnQkFFakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUM1QixRQUFRLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDcEMsUUFBUSxHQUFHLENBQUMsQ0FBQztnQkFDZixDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLFFBQVEsR0FBRyxDQUFDLENBQUM7Z0JBQ2YsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNyQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDbkMsUUFBUSxHQUFHLENBQUMsQ0FBQztnQkFDZixDQUFDO2dCQUVELENBQUMsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzNELENBQUMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZELENBQUMsQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzlELENBQUMsQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRTFELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUNuQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdEMsR0FBRyxDQUFDLENBQWEsVUFBSyxFQUFMLGVBQUssRUFBTCxtQkFBSyxFQUFMLElBQUs7d0JBQWpCLElBQUksSUFBSSxjQUFBO3dCQUNYLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzNCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqQyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDZDs0QkFDRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLFVBQVU7NEJBQ3JCLE9BQU8sRUFBRSxHQUFHLEdBQUcsR0FBRyxHQUFHLFNBQVM7NEJBQzlCLEtBQUssRUFBRSxHQUFHLEdBQUcsR0FBRyxHQUFHLE9BQU87eUJBQzNCLENBQUMsQ0FBQztxQkFDTjtnQkFDSCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztnQkFDaEQsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSztZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxtQ0FBTSxHQUFOO1FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBdktRO1FBQVIsWUFBSyxFQUFFO2tDQUFVLGlCQUFPO3VEQUFDO0lBRGYsa0JBQWtCO1FBTjlCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsV0FBVztZQUNyQixXQUFXLEVBQUUscURBQXFEO1lBQ2xFLFNBQVMsRUFBRSxDQUFDLG9EQUFvRCxDQUFDO1NBQ2xFLENBQUM7eUNBYTRCLGVBQU0sRUFBMEIsZ0NBQWMsRUFBd0IsOEJBQWEsRUFBaUIsdUJBQWM7T0FYbkksa0JBQWtCLENBeUs5QjtJQUFELHlCQUFDO0NBektELEFBeUtDLElBQUE7QUF6S1ksZ0RBQWtCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3RpbWV0YWJsZS90aW1ldGFibGUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvdXJzZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9TdHVkZW50XCI7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb3Vyc2VTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb3Vyc2Uuc2VydmljZSc7XHJcbmRlY2xhcmUgdmFyIG1vbWVudDogYW55O1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3RpbWV0YWJsZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3RpbWV0YWJsZS90aW1ldGFibGUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3RpbWV0YWJsZS90aW1ldGFibGUuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVGltZXRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBzdHVkZW50OiBTdHVkZW50O1xyXG4gIGV2ZW50czogYW55W10gPSBbXTtcclxuICBoZWFkZXI6IGFueTtcclxuICBvcHRpb25zOiBhbnk7XHJcbiAgc3R1ZGVudHM6IFN0dWRlbnQgW107XHJcbiAgc2VsZWN0ZWRTdHVkZW50OiBTdHVkZW50IFtdO1xyXG4gIHN0dWRlbnRTZWFyY2hRdWVyeTogU3RyaW5nO1xyXG4gIGZhY3VsdHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuICB2YWxpZEluZm86IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBzdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsIHByaXZhdGUgY291cnNlU2VydmljZTpDb3Vyc2VTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdmFyIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcbiAgICB2YXIgdXNlcklEID0gY3VycmVudFVzZXIudXNlcklEO1xyXG5cclxuICAgIGlmIChjdXJyZW50VXNlci51c2VyVHlwZSAhPT0gXCJTdHVkZW50XCIpIHtcclxuICAgICAgdGhpcy5mYWN1bHR5ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgLmdldFN0dWRlbnRzKClcclxuICAgICAgICAgIC50aGVuKHN0dWRlbnRzID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLnN0dWRlbnRzID0gc3R1ZGVudHM7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgLy8gZG8gc29tZXRoaW5nXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdUaW1ldGFibGUnLFxyXG4gICAgICAgICAgdGV4dDogJ0VudGVyIGEgc3R1ZGVudCBuYW1lJyxcclxuICAgICAgICAgIGlucHV0OiBcInRleHRcIixcclxuICAgICAgICAgIGlucHV0UGxhY2Vob2xkZXI6IFwiU3R1ZGVudCBOYW1lXCIsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgYW5pbWF0aW9uOiBcInNsaWRlLWZyb20tdG9wXCIsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnQ29udGludWUnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0JhY2sgdG8gRGFzaGJvYXJkJ1xyXG4gICAgICB9KS50aGVuKGlucHV0VmFsdWUgPT4ge1xyXG4gICAgICAgIGlmIChpbnB1dFZhbHVlKSB7XHJcbiAgICAgICAgICB0aGlzLnN0dWRlbnRTZWFyY2hRdWVyeSA9IGlucHV0VmFsdWUudmFsdWU7XHJcbiAgICAgICAgICB2YXIgbmFtZSA9IHRoaXMuc3R1ZGVudFNlYXJjaFF1ZXJ5LnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgIHZhciBmaXJzdE5hbWUgPSBuYW1lWzBdO1xyXG4gICAgICAgICAgdmFyIGxhc3ROYW1lID0gbmFtZVsxXTtcclxuICAgICAgICAgIGlmIChmaXJzdE5hbWUgPT0gbnVsbCB8fCBsYXN0TmFtZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxlcnQoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFN0dWRlbnQgPSB0aGlzLnN0dWRlbnRzLmZpbHRlcih4ID0+IHguZmlyc3ROYW1lID09PSBmaXJzdE5hbWUgJiYgeC5sYXN0TmFtZSA9PT0gbGFzdE5hbWUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuZ2V0RXZlbnRzQnlJZCh0aGlzLnNlbGVjdGVkU3R1ZGVudFswXS51c2VySUQpO1xyXG4gICAgICAgICAgICAgIHRoaXMudmFsaWRJbmZvID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuYWxlcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmFsZXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nZXRFdmVudHNCeUlkKHVzZXJJRCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vcHRpb25zID0ge1xyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBwcmV2OiAnY2lyY2xlLXRyaWFuZ2xlLXcnLFxyXG4gICAgICBkZWZhdWx0VmlldzogXCJhZ2VuZGFXZWVrXCIsXHJcbiAgICAgIG1pblRpbWU6IFwiMDg6MDA6MDBcIixcclxuICAgICAgbWF4VGltZTogXCIyMjowMDowMFwiLFxyXG4gICAgICBoZWlnaHQ6IFwiYXV0b1wiXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgYWxlcnQoKSB7XHJcbiAgICB0aGlzLnZhbGlkSW5mbyA9IGZhbHNlO1xyXG4gICAgc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6ICdUaW1ldGFibGUnLFxyXG4gICAgICAgIHRleHQ6ICdFbnRlciBhIHZhbGlkIHN0dWRlbnQgbmFtZScsXHJcbiAgICAgICAgaW5wdXQ6IFwidGV4dFwiLFxyXG4gICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICBpbnB1dFBsYWNlaG9sZGVyOiBcIlN0dWRlbnQgTmFtZVwiLFxyXG4gICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgYW5pbWF0aW9uOiBcInNsaWRlLWZyb20tdG9wXCIsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnQ29udGludWUnLFxyXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdCYWNrIHRvIERhc2hib2FyZCdcclxuICAgIH0pLnRoZW4oaW5wdXRWYWx1ZSA9PiB7XHJcbiAgICAgIGlmIChpbnB1dFZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zdHVkZW50U2VhcmNoUXVlcnkgPSBpbnB1dFZhbHVlLnZhbHVlO1xyXG4gICAgICAgIHZhciBuYW1lID0gdGhpcy5zdHVkZW50U2VhcmNoUXVlcnkuc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgIHZhciBmaXJzdE5hbWUgPSBuYW1lWzBdO1xyXG4gICAgICAgIHZhciBsYXN0TmFtZSA9IG5hbWVbMV07XHJcbiAgICAgICAgaWYgKGZpcnN0TmFtZSA9PSBudWxsIHx8IGxhc3ROYW1lID09IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMuYWxlcnQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5ldmVudHMgPSBbXTtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTdHVkZW50ID0gdGhpcy5zdHVkZW50cy5maWx0ZXIoeCA9PiB4LmZpcnN0TmFtZSA9PT0gZmlyc3ROYW1lICYmIHgubGFzdE5hbWUgPT09IGxhc3ROYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5nZXRFdmVudHNCeUlkKHRoaXMuc2VsZWN0ZWRTdHVkZW50WzBdLnVzZXJJRCk7XHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRJbmZvID0gdHJ1ZTtcclxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5hbGVydCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmFsZXJ0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRFdmVudHNCeUlkKHVzZXJJRCkge1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZS5nZXRFdmVudHNCeUlkKHVzZXJJRCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICByZXN1bHQuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICAgIHZhciBjbGFzc0RheSA9IDA7XHJcblxyXG4gICAgICAgIGlmIChpLmNsYXNzRGF5ID09PSBcIk1vbmRheVwiKSB7XHJcbiAgICAgICAgICBjbGFzc0RheSA9IDE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpLmNsYXNzRGF5ID09PSBcIlR1ZXNkYXlcIikge1xyXG4gICAgICAgICAgY2xhc3NEYXkgPSAyO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaS5jbGFzc0RheSA9PT0gXCJXZWRuZXNkYXlcIikge1xyXG4gICAgICAgICAgY2xhc3NEYXkgPSAzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaS5jbGFzc0RheSA9PT0gXCJUaHVyc2RheVwiKSB7XHJcbiAgICAgICAgICBjbGFzc0RheSA9IDQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpLmNsYXNzRGF5ID09PSBcIkZyaWRheVwiKSB7XHJcbiAgICAgICAgICBjbGFzc0RheSA9IDU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpLmNvdXJzZVN0YXJ0ID0gbW9tZW50KGkuY291cnNlU3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgIGkuY291cnNlRW5kID0gbW9tZW50KGkuY291cnNlRW5kKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICBpLmNsYXNzU3RhcnRUaW1lID0gbW9tZW50KGkuY2xhc3NTdGFydFRpbWUpLmZvcm1hdCgnaGg6bW0gQScpO1xyXG4gICAgICAgIGkuY2xhc3NFbmRUaW1lID0gbW9tZW50KGkuY2xhc3NFbmRUaW1lKS5mb3JtYXQoJ2hoOm1tIEEnKTtcclxuXHJcbiAgICAgICAgaWYgKGkuY2xhc3NUaW1lU3RyKSB7XHJcbiAgICAgICAgICB2YXIgYXJyYXkgPSBpLmNsYXNzVGltZVN0ci5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBhcnJheSkge1xyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IGl0ZW0uc3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgdmFyIGRheSA9IGRhdGVbMF07XHJcbiAgICAgICAgICAgIHZhciB0aW1lID0gZGF0ZVsxXTtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0VGltZSA9IHRpbWUuc3BsaXQoJy0nKVswXTtcclxuICAgICAgICAgICAgdmFyIGVuZFRpbWUgPSB0aW1lLnNwbGl0KCctJylbMV07XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnB1c2goXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBpLmNvdXJzZU5hbWUsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0XCI6IGRheSArIFwiVFwiICsgc3RhcnRUaW1lLFxyXG4gICAgICAgICAgICAgICAgXCJlbmRcIjogZGF5ICsgXCJUXCIgKyBlbmRUaW1lXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gY2xhc3MgZGF0ZSBzdHJpbmcgYXZhaWxhYmxlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZ2V0dGluZyBldmVudHMgYnkgaWRcIik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
