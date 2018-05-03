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
var Course_1 = require("../../models/Course");
var router_1 = require("@angular/router");
var course_service_1 = require("../../services/course.service");
var CourseEditComponent = /** @class */ (function () {
    function CourseEditComponent(courseService, route) {
        this.courseService = courseService;
        this.route = route;
        this.weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
        this.newCourse = false;
        this.idGen = 100;
        // calendar
        this.events = [];
        this.selectedDays = [];
        // pop up
        this.dialogVisible = false;
        // drop down
        this.professors = [{ label: '-- select --', value: '' }];
        this.campuses = [{ label: '-- select --', value: '' }];
    }
    CourseEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscribeCourse();
        // get instructors
        this.courseService.getInstructors().then(function (result) {
            if (result.result === "error") {
                _this.displayErrorAlert(result);
            }
            else {
                result.forEach(function (i) {
                    _this.professors.push({
                        label: i.professorName,
                        value: i.userID
                    });
                });
            }
        });
        // get campuses
        this.courseService.getCampuses().then(function (result) {
            if (result.result === "error") {
                _this.displayErrorAlert(result);
            }
            else {
                result.forEach(function (i) {
                    _this.campuses.push({
                        label: i.campusName,
                        value: i.campusId
                    });
                });
            }
        });
        this.header = {
            left: 'prev',
            center: 'title',
            right: 'next'
        };
        this.options = {
            prev: 'circle-triangle-w',
            defaultView: "month",
            height: "auto",
            selectable: true,
            displayEventEnd: true
        };
    }; // end of init
    // check boxes onchange event
    CourseEditComponent.prototype.cb_onchange = function (e, weekday) {
        if (e) {
            if (this.course.courseStart === undefined || this.course.courseEnd === undefined || this.course.courseStart === null || this.course.courseEnd == null) {
                swal('Whoops!', 'Please pick a course start/end date first.', 'warning');
                this.unCheck(weekday); // unselect element
            }
            else {
                this.weekDay = weekday;
                this.event = new MyEvent();
                this.event.type = "batchGen";
                this.dialogVisible = true;
            }
        }
        else {
            this.events = this.events.filter(function (result) { return result.weekday !== weekday; });
        }
    };
    // this function will uncheck checkbox based on week day that given
    CourseEditComponent.prototype.unCheck = function (weekday) {
        this.selectedDays = this.selectedDays.filter(function (result) { return result !== weekday; });
    };
    // this function will generate days that maches specification
    CourseEditComponent.prototype.generateDays = function (weekday, start_date, end_date) {
        // figure out what's next week day
        var momentIndex, nextDay;
        for (var i = 0; i < this.weekDays.length; i++) {
            if (this.weekDays[i] === weekday) {
                momentIndex = i + 1;
            }
        }
        if (moment(start_date).isoWeekday() > momentIndex) {
            nextDay = moment(start_date).isoWeekday(momentIndex + 7);
        }
        else {
            nextDay = moment(start_date).isoWeekday(momentIndex);
        }
        var root = 0, tempStart, tempEnd;
        tempStart = this.event.dayStart;
        tempEnd = this.event.dayEnd;
        while (!(moment(nextDay).add(7 * root, 'day')).isAfter(moment(end_date))) {
            this.event = new MyEvent();
            this.event.id = this.idGen++;
            this.event.dayStart = tempStart;
            this.event.dayEnd = tempEnd;
            this.event.weekday = weekday;
            this.event.title = moment(nextDay).add(7 * root, 'day').format('YYYY-MM-DD');
            this.event.dayStart_correct = moment(tempStart).isValid() ? moment(tempStart).format('HH:mm') : '';
            this.event.dayEnd_correct = moment(tempEnd).isValid() ? moment(tempEnd).format('HH:mm') : '';
            this.event.start = moment(nextDay).add(7 * root, 'day').format('YYYY-MM-DD') + ' ' + this.event.dayStart_correct;
            this.event.end = moment(nextDay).add(7 * root, 'day').format('YYYY-MM-DD') + ' ' + this.event.dayEnd_correct;
            this.events.push(this.event);
            root++;
        }
    };
    CourseEditComponent.prototype.saveEvent = function () {
        if (this.event.type === 'add') {
            var momentIndex = -1;
            for (var i = 0; i < this.weekDays.length; i++) {
                if (i === moment(this.event.title).isoWeekday()) {
                    momentIndex = i - 1;
                }
            }
            this.event.weekday = this.weekDays[momentIndex];
            this.event.id = this.idGen++; // title, id , weekday,dayStart,dayEn
            this.event.dayStart_correct = moment(this.event.dayStart).isValid() ? moment(this.event.dayStart).format('HH:mm') : '';
            this.event.dayEnd_correct = moment(this.event.dayEnd).isValid() ? moment(this.event.dayEnd).format('HH:mm') : '';
            this.event.start = this.event.title + ' ' + this.event.dayStart_correct;
            this.event.end = this.event.title + ' ' + this.event.dayEnd_correct;
            if (this.checkExist(this.event.title)) {
                this.events.push(this.event);
            }
            else {
                alert('event exist');
            }
        }
        else if (this.event.type === 'edit') {
            if (this.event.id) {
                this.event.dayStart_correct = moment(this.event.dayStart).isValid() ? moment(this.event.dayStart).format('HH:mm') : '';
                this.event.dayEnd_correct = moment(this.event.dayEnd).isValid() ? moment(this.event.dayEnd).format('HH:mm') : '';
                this.event.start = this.event.title + ' ' + this.event.dayStart_correct;
                this.event.end = this.event.title + ' ' + this.event.dayEnd_correct;
                var index = this.findEventIndexById(this.event.id);
                if (index >= 0) {
                    this.events[index] = this.event;
                }
            }
        }
        else if (this.event.type === 'batchGen') {
            this.generateDays(this.weekDay, this.course.courseStart, this.course.courseEnd);
        }
        this.dialogVisible = false;
        this.event = null;
    };
    CourseEditComponent.prototype.deleteEvent = function () {
        var index = this.findEventIndexById(this.event.id);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
        this.dialogVisible = false;
    };
    CourseEditComponent.prototype.findEventIndexById = function (id) {
        var index = -1;
        for (var i = 0; i < this.events.length; i++) {
            if (id === this.events[i].id) {
                index = i;
                break;
            }
        }
        return index;
    };
    // event handler for event click
    CourseEditComponent.prototype.handleEventClick = function (e) {
        this.event = new MyEvent();
        this.event.type = 'edit';
        this.event.title = e.calEvent.title;
        this.event.dayStart = e.calEvent.dayStart;
        this.event.dayEnd = e.calEvent.dayEnd;
        this.event.start = e.calEvent.start;
        this.event.end = e.calEvent.end;
        this.event.id = e.calEvent.id;
        this.event.weekday = e.calEvent.weekday;
        this.dialogVisible = true;
        // this.events = this.events.filter(result => result !== event );
    };
    // event handler for day click
    CourseEditComponent.prototype.handleDayClick = function (e) {
        var date = e.date.format();
        this.event = new MyEvent();
        this.event.title = date;
        this.event.type = "add";
        this.dialogVisible = true;
    };
    CourseEditComponent.prototype.checkExist = function (date) {
        var ndate = this.events.filter(function (result) { return result.start === date; });
        if (ndate.length === 1) { // if found event exist then return false to prevent new arry.push
            return false;
        }
        else {
            return true;
        }
    };
    CourseEditComponent.prototype.subscribeCourse = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            if (_this.id === 'new') {
                _this.newCourse = true;
                _this.course = new Course_1.Course();
            }
            else {
                _this.newCourse = false;
                _this.courseService.getCourse(_this.id).then(function (result) {
                    if (result.result === "error") {
                        _this.displayErrorAlert(result);
                    }
                    else {
                        result.forEach(function (item) {
                            item.courseStart = moment(item.courseStart).isValid() ? moment(item.courseStart).add(1, 'day').format('YYYY-MM-DD ') : '';
                            item.courseEnd = moment(item.courseEnd).isValid() ? moment(item.courseEnd).add(1, 'day').format('YYYY-MM-DD') : '';
                        });
                        _this.course = result[0];
                        if (_this.course.classTimeStr !== null) {
                            _this.events = _this.detachCourseStr(_this.course.classTimeStr);
                        }
                    }
                });
            }
        });
    };
    CourseEditComponent.prototype.detachCourseStr = function (str) {
        var _this = this;
        var myEvents = [];
        var strArry = str.split(',');
        strArry.forEach(function (element) {
            var myEvent = new MyEvent();
            myEvent.title = element.split(' ')[0];
            myEvent.id = _this.idGen++;
            myEvent.weekday = _this.weekDays[moment(myEvent.title).isoWeekday() - 1];
            myEvent.dayStart_correct = element.split(' ')[1].split('-')[0];
            myEvent.dayEnd_correct = element.split(' ')[1].split('-')[1];
            myEvent.start = element.split(' ')[0] + ' ' + myEvent.dayStart_correct;
            myEvent.end = element.split(' ')[0] + ' ' + myEvent.dayEnd_correct;
            myEvent.dayStart = moment(myEvent.start).isValid() ? moment(myEvent.start).format() : '';
            myEvent.dayEnd = moment(myEvent.end).isValid() ? moment(myEvent.end).format() : '';
            myEvent.allDay = false;
            myEvents.push(myEvent);
        });
        return myEvents;
    };
    CourseEditComponent.prototype.generateClassTimeStr = function () {
        var str = '', tempStart, tempEnd, tempDate;
        for (var i = 0; i < this.events.length; i++) {
            tempDate = this.events[i].title;
            tempStart = this.events[i].dayStart_correct;
            tempEnd = this.events[i].dayEnd_correct;
            if (i === 0) {
                str += tempDate + " " + tempStart + "-" + tempEnd;
            }
            else {
                str += "," + tempDate + " " + tempStart + "-" + tempEnd;
            }
        }
        return str;
    };
    CourseEditComponent.prototype.save = function () {
        var _this = this;
        this.course.classTimeStr = this.generateClassTimeStr();
        if (!this.course.courseName || !this.course.courseStart || !this.course.courseEnd || !this.course.professorId || !this.course.campusId || !this.course.classroom || !this.course.classTimeStr) {
            swal('Form Incomplete', 'Please fill out all fields in the form.', 'warning');
        }
        else {
            //**** need validation
            if (this.id === 'new') {
                this.courseService
                    .create(this.course)
                    .then(function (course) {
                    if (course.result === "error") {
                        _this.displayErrorAlert(course);
                    }
                    else if (course.result === "success") {
                        swal(course.title, course.msg, 'success');
                        _this.goBack();
                    }
                    else {
                        swal('Error', 'Something went wrong, please try again.', 'error');
                    }
                })
                    .catch(function (error) { return _this.error = error; }); // TODO: Display error message
            }
            else {
                this.courseService
                    .update(this.course)
                    .then(function (course) {
                    if (course.result === "error") {
                        _this.displayErrorAlert(course);
                    }
                    else if (course.result === "success") {
                        swal(course.title, course.msg, 'success');
                        _this.goBack();
                    }
                    else {
                        swal('Error', 'Something went wrong, please try again.', 'error');
                    }
                })
                    .catch(function (error) { return _this.error = error; }); // TODO: Display error message
            }
        }
    };
    CourseEditComponent.prototype.displayErrorAlert = function (error) {
        swal(error.title, error.msg, 'error');
    };
    CourseEditComponent.prototype.goBack = function () {
        window.history.back();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Course_1.Course)
    ], CourseEditComponent.prototype, "course", void 0);
    CourseEditComponent = __decorate([
        core_1.Component({
            selector: 'course-edit',
            templateUrl: './app/components/course-edit/course-edit.component.html',
            styleUrls: ['./app/components/course-edit/course-edit.component.css']
        }),
        __metadata("design:paramtypes", [course_service_1.CourseService, router_1.ActivatedRoute])
    ], CourseEditComponent);
    return CourseEditComponent;
}());
exports.CourseEditComponent = CourseEditComponent;
var MyEvent = /** @class */ (function () {
    function MyEvent() {
    }
    return MyEvent;
}());
exports.MyEvent = MyEvent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUQ7QUFDekQsOENBQTZDO0FBQzdDLDBDQUF5RDtBQUN6RCxnRUFBOEQ7QUFZOUQ7SUFzQkUsNkJBQW9CLGFBQTRCLEVBQVUsS0FBcUI7UUFBM0Qsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQW5CL0UsYUFBUSxHQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3pELGNBQVMsR0FBRyxLQUFLLENBQUM7UUFLbEIsVUFBSyxHQUFXLEdBQUcsQ0FBQztRQUNwQixXQUFXO1FBQ1gsV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUluQixpQkFBWSxHQUFhLEVBQUUsQ0FBQztRQUM1QixTQUFTO1FBQ1Qsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsWUFBWTtRQUNaLGVBQVUsR0FBaUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEUsYUFBUSxHQUFpQixDQUFDLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUdoRSxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUFBLGlCQTRDQztRQTNDQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdkIsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTTtZQUM5QyxJQUFLLE1BQWMsQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO2dCQUN0QyxLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDaEM7aUJB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VyxFQUFFLHlEQUF5RDtZQUN0RSxTQUFTLEVBQUUsQ0FBQyx3REFBd0QsQ0FBQztTQUN0RSxDQUFDO3lDQXlCbUMsOEJBQWEsRUFBaUIsdUJBQWM7T0F0QnBFLG1CQUFtQixDQXlXL0I7SUFBRCwwQkFBQztDQXpXRCxBQXlXQyxJQUFBO0FBeldZLGtEQUFtQjtBQTJXaEM7SUFBQTtJQVlBLENBQUM7SUFBRCxjQUFDO0FBQUQsQ0FaQSxBQVlDLElBQUE7QUFaWSwwQkFBTyIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9Db3Vyc2VcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291cnNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuZGVjbGFyZSB2YXIgbW9tZW50O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdjb3Vyc2UtZWRpdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2NvdXJzZS1lZGl0L2NvdXJzZS1lZGl0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQ291cnNlRWRpdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgLy9nbG9iYWwgdmFyaWFibGVzXHJcbiAgQElucHV0KCkgY291cnNlOiBDb3Vyc2U7XHJcbiAgd2Vla0RheXM6IHN0cmluZ1tdID0gWydNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJ107XHJcbiAgbmV3Q291cnNlID0gZmFsc2U7XHJcbiAgZXJyb3I6IGFueTtcclxuICBwcml2YXRlIHN1YjogYW55O1xyXG4gIGlkOiBhbnk7XHJcbiAgd2Vla0RheTogc3RyaW5nO1xyXG4gIGlkR2VuOiBudW1iZXIgPSAxMDA7XHJcbiAgLy8gY2FsZW5kYXJcclxuICBldmVudHM6IGFueVtdID0gW107XHJcbiAgZXZlbnQ6IE15RXZlbnQ7XHJcbiAgaGVhZGVyOiBhbnk7XHJcbiAgb3B0aW9uczogYW55O1xyXG4gIHNlbGVjdGVkRGF5czogc3RyaW5nW10gPSBbXTtcclxuICAvLyBwb3AgdXBcclxuICBkaWFsb2dWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgLy8gZHJvcCBkb3duXHJcbiAgcHJvZmVzc29yczogU2VsZWN0SXRlbVtdID0gW3sgbGFiZWw6ICctLSBzZWxlY3QgLS0nLCB2YWx1ZTogJycgfV07XHJcbiAgY2FtcHVzZXM6IFNlbGVjdEl0ZW1bXSA9IFt7IGxhYmVsOiAnLS0gc2VsZWN0IC0tJywgdmFsdWU6ICcnIH1dO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvdXJzZVNlcnZpY2U6IENvdXJzZVNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3Vic2NyaWJlQ291cnNlKCk7XHJcblxyXG4gICAgLy8gZ2V0IGluc3RydWN0b3JzXHJcbiAgICB0aGlzLmNvdXJzZVNlcnZpY2UuZ2V0SW5zdHJ1Y3RvcnMoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXN1bHQuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wcm9mZXNzb3JzLnB1c2goe1xyXG4gICAgICAgICAgICBsYWJlbDogaS5wcm9mZXNzb3JOYW1lLFxyXG4gICAgICAgICAgICB2YWx1ZTogaS51c2VySURcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBnZXQgY2FtcHVzZXNcclxuICAgIHRoaXMuY291cnNlU2VydmljZS5nZXRDYW1wdXNlcygpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdC5mb3JFYWNoKChpKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNhbXB1c2VzLnB1c2goe1xyXG4gICAgICAgICAgICBsYWJlbDogaS5jYW1wdXNOYW1lLFxyXG4gICAgICAgICAgICB2YWx1ZTogaS5jYW1wdXNJZFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuaGVhZGVyID0ge1xyXG4gICAgICBsZWZ0OiAncHJldicsXHJcbiAgICAgIGNlbnRlcjogJ3RpdGxlJyxcclxuICAgICAgcmlnaHQ6ICduZXh0J1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLm9wdGlvbnMgPSB7XHJcbiAgICAgIHByZXY6ICdjaXJjbGUtdHJpYW5nbGUtdycsXHJcbiAgICAgIGRlZmF1bHRWaWV3OiBcIm1vbnRoXCIsXHJcbiAgICAgIGhlaWdodDogXCJhdXRvXCIsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGRpc3BsYXlFdmVudEVuZDogdHJ1ZVxyXG4gICAgfTtcclxuICB9IC8vIGVuZCBvZiBpbml0XHJcblxyXG4gIC8vIGNoZWNrIGJveGVzIG9uY2hhbmdlIGV2ZW50XHJcbiAgY2Jfb25jaGFuZ2UoZSwgd2Vla2RheSkge1xyXG4gICAgaWYgKGUpIHtcclxuICAgICAgaWYgKHRoaXMuY291cnNlLmNvdXJzZVN0YXJ0ID09PSB1bmRlZmluZWQgfHwgdGhpcy5jb3Vyc2UuY291cnNlRW5kID09PSB1bmRlZmluZWQgfHwgdGhpcy5jb3Vyc2UuY291cnNlU3RhcnQgPT09IG51bGwgfHwgdGhpcy5jb3Vyc2UuY291cnNlRW5kID09IG51bGwpIHtcclxuICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgJ1dob29wcyEnLFxyXG4gICAgICAgICAgJ1BsZWFzZSBwaWNrIGEgY291cnNlIHN0YXJ0L2VuZCBkYXRlIGZpcnN0LicsXHJcbiAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMudW5DaGVjayh3ZWVrZGF5KTsgLy8gdW5zZWxlY3QgZWxlbWVudFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMud2Vla0RheSA9IHdlZWtkYXk7XHJcbiAgICAgICAgdGhpcy5ldmVudCA9IG5ldyBNeUV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5ldmVudC50eXBlID0gXCJiYXRjaEdlblwiO1xyXG4gICAgICAgIHRoaXMuZGlhbG9nVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZXZlbnRzID0gdGhpcy5ldmVudHMuZmlsdGVyKHJlc3VsdCA9PiByZXN1bHQud2Vla2RheSAhPT0gd2Vla2RheSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyB0aGlzIGZ1bmN0aW9uIHdpbGwgdW5jaGVjayBjaGVja2JveCBiYXNlZCBvbiB3ZWVrIGRheSB0aGF0IGdpdmVuXHJcbiAgdW5DaGVjayh3ZWVrZGF5KSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkRGF5cyA9IHRoaXMuc2VsZWN0ZWREYXlzLmZpbHRlcihyZXN1bHQgPT4gcmVzdWx0ICE9PSB3ZWVrZGF5KTtcclxuICB9XHJcblxyXG4gIC8vIHRoaXMgZnVuY3Rpb24gd2lsbCBnZW5lcmF0ZSBkYXlzIHRoYXQgbWFjaGVzIHNwZWNpZmljYXRpb25cclxuICBwcml2YXRlIGdlbmVyYXRlRGF5cyh3ZWVrZGF5LCBzdGFydF9kYXRlLCBlbmRfZGF0ZSkge1xyXG5cclxuICAgIC8vIGZpZ3VyZSBvdXQgd2hhdCdzIG5leHQgd2VlayBkYXlcclxuICAgIGxldCBtb21lbnRJbmRleCwgbmV4dERheTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53ZWVrRGF5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy53ZWVrRGF5c1tpXSA9PT0gd2Vla2RheSkge1xyXG4gICAgICAgIG1vbWVudEluZGV4ID0gaSArIDE7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChtb21lbnQoc3RhcnRfZGF0ZSkuaXNvV2Vla2RheSgpID4gbW9tZW50SW5kZXgpIHtcclxuICAgICAgbmV4dERheSA9IG1vbWVudChzdGFydF9kYXRlKS5pc29XZWVrZGF5KG1vbWVudEluZGV4ICsgNyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBuZXh0RGF5ID0gbW9tZW50KHN0YXJ0X2RhdGUpLmlzb1dlZWtkYXkobW9tZW50SW5kZXgpO1xyXG4gICAgfVxyXG4gICAgbGV0IHJvb3QgPSAwLCB0ZW1wU3RhcnQsIHRlbXBFbmQ7XHJcbiAgICB0ZW1wU3RhcnQgPSB0aGlzLmV2ZW50LmRheVN0YXJ0O1xyXG4gICAgdGVtcEVuZCA9IHRoaXMuZXZlbnQuZGF5RW5kO1xyXG4gICAgd2hpbGUgKCEobW9tZW50KG5leHREYXkpLmFkZCg3ICogcm9vdCwgJ2RheScpKS5pc0FmdGVyKG1vbWVudChlbmRfZGF0ZSkpKSB7XHJcbiAgICAgIHRoaXMuZXZlbnQgPSBuZXcgTXlFdmVudCgpO1xyXG4gICAgICB0aGlzLmV2ZW50LmlkID0gdGhpcy5pZEdlbisrO1xyXG4gICAgICB0aGlzLmV2ZW50LmRheVN0YXJ0ID0gdGVtcFN0YXJ0O1xyXG4gICAgICB0aGlzLmV2ZW50LmRheUVuZCA9IHRlbXBFbmQ7XHJcbiAgICAgIHRoaXMuZXZlbnQud2Vla2RheSA9IHdlZWtkYXk7XHJcbiAgICAgIHRoaXMuZXZlbnQudGl0bGUgPSBtb21lbnQobmV4dERheSkuYWRkKDcgKiByb290LCAnZGF5JykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgIHRoaXMuZXZlbnQuZGF5U3RhcnRfY29ycmVjdCA9IG1vbWVudCh0ZW1wU3RhcnQpLmlzVmFsaWQoKSA/IG1vbWVudCh0ZW1wU3RhcnQpLmZvcm1hdCgnSEg6bW0nKSA6ICcnO1xyXG4gICAgICB0aGlzLmV2ZW50LmRheUVuZF9jb3JyZWN0ID0gbW9tZW50KHRlbXBFbmQpLmlzVmFsaWQoKSA/IG1vbWVudCh0ZW1wRW5kKS5mb3JtYXQoJ0hIOm1tJykgOiAnJztcclxuICAgICAgdGhpcy5ldmVudC5zdGFydCA9IG1vbWVudChuZXh0RGF5KS5hZGQoNyAqIHJvb3QsICdkYXknKS5mb3JtYXQoJ1lZWVktTU0tREQnKSArICcgJyArIHRoaXMuZXZlbnQuZGF5U3RhcnRfY29ycmVjdDtcclxuICAgICAgdGhpcy5ldmVudC5lbmQgPSBtb21lbnQobmV4dERheSkuYWRkKDcgKiByb290LCAnZGF5JykuZm9ybWF0KCdZWVlZLU1NLUREJykgKyAnICcgKyB0aGlzLmV2ZW50LmRheUVuZF9jb3JyZWN0O1xyXG4gICAgICB0aGlzLmV2ZW50cy5wdXNoKHRoaXMuZXZlbnQpO1xyXG4gICAgICByb290Kys7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzYXZlRXZlbnQoKSB7XHJcbiAgICBpZiAodGhpcy5ldmVudC50eXBlID09PSAnYWRkJykge1xyXG5cclxuICAgICAgbGV0IG1vbWVudEluZGV4ID0gLTE7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53ZWVrRGF5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChpID09PSBtb21lbnQodGhpcy5ldmVudC50aXRsZSkuaXNvV2Vla2RheSgpKSB7XHJcbiAgICAgICAgICBtb21lbnRJbmRleCA9IGkgLSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLmV2ZW50LndlZWtkYXkgPSB0aGlzLndlZWtEYXlzW21vbWVudEluZGV4XTtcclxuICAgICAgdGhpcy5ldmVudC5pZCA9IHRoaXMuaWRHZW4rKzsgIC8vIHRpdGxlLCBpZCAsIHdlZWtkYXksZGF5U3RhcnQsZGF5RW5cclxuICAgICAgdGhpcy5ldmVudC5kYXlTdGFydF9jb3JyZWN0ID0gbW9tZW50KHRoaXMuZXZlbnQuZGF5U3RhcnQpLmlzVmFsaWQoKSA/IG1vbWVudCh0aGlzLmV2ZW50LmRheVN0YXJ0KS5mb3JtYXQoJ0hIOm1tJykgOiAnJztcclxuICAgICAgdGhpcy5ldmVudC5kYXlFbmRfY29ycmVjdCA9IG1vbWVudCh0aGlzLmV2ZW50LmRheUVuZCkuaXNWYWxpZCgpID8gbW9tZW50KHRoaXMuZXZlbnQuZGF5RW5kKS5mb3JtYXQoJ0hIOm1tJykgOiAnJztcclxuICAgICAgdGhpcy5ldmVudC5zdGFydCA9IHRoaXMuZXZlbnQudGl0bGUgKyAnICcgKyB0aGlzLmV2ZW50LmRheVN0YXJ0X2NvcnJlY3Q7XHJcbiAgICAgIHRoaXMuZXZlbnQuZW5kID0gdGhpcy5ldmVudC50aXRsZSArICcgJyArIHRoaXMuZXZlbnQuZGF5RW5kX2NvcnJlY3Q7XHJcbiAgICAgIGlmICh0aGlzLmNoZWNrRXhpc3QodGhpcy5ldmVudC50aXRsZSkpIHtcclxuICAgICAgICB0aGlzLmV2ZW50cy5wdXNoKHRoaXMuZXZlbnQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KCdldmVudCBleGlzdCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIGlmICh0aGlzLmV2ZW50LnR5cGUgPT09ICdlZGl0Jykge1xyXG5cclxuICAgICAgaWYgKHRoaXMuZXZlbnQuaWQpIHtcclxuICAgICAgICB0aGlzLmV2ZW50LmRheVN0YXJ0X2NvcnJlY3QgPSBtb21lbnQodGhpcy5ldmVudC5kYXlTdGFydCkuaXNWYWxpZCgpID8gbW9tZW50KHRoaXMuZXZlbnQuZGF5U3RhcnQpLmZvcm1hdCgnSEg6bW0nKSA6ICcnO1xyXG4gICAgICAgIHRoaXMuZXZlbnQuZGF5RW5kX2NvcnJlY3QgPSBtb21lbnQodGhpcy5ldmVudC5kYXlFbmQpLmlzVmFsaWQoKSA/IG1vbWVudCh0aGlzLmV2ZW50LmRheUVuZCkuZm9ybWF0KCdISDptbScpIDogJyc7XHJcbiAgICAgICAgdGhpcy5ldmVudC5zdGFydCA9IHRoaXMuZXZlbnQudGl0bGUgKyAnICcgKyB0aGlzLmV2ZW50LmRheVN0YXJ0X2NvcnJlY3Q7XHJcbiAgICAgICAgdGhpcy5ldmVudC5lbmQgPSB0aGlzLmV2ZW50LnRpdGxlICsgJyAnICsgdGhpcy5ldmVudC5kYXlFbmRfY29ycmVjdDtcclxuXHJcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSB0aGlzLmZpbmRFdmVudEluZGV4QnlJZCh0aGlzLmV2ZW50LmlkKTtcclxuXHJcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgIHRoaXMuZXZlbnRzW2luZGV4XSA9IHRoaXMuZXZlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZXZlbnQudHlwZSA9PT0gJ2JhdGNoR2VuJykge1xyXG5cclxuICAgICAgdGhpcy5nZW5lcmF0ZURheXModGhpcy53ZWVrRGF5LCB0aGlzLmNvdXJzZS5jb3Vyc2VTdGFydCwgdGhpcy5jb3Vyc2UuY291cnNlRW5kKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRpYWxvZ1Zpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMuZXZlbnQgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlRXZlbnQoKSB7XHJcbiAgICBsZXQgaW5kZXg6IG51bWJlciA9IHRoaXMuZmluZEV2ZW50SW5kZXhCeUlkKHRoaXMuZXZlbnQuaWQpO1xyXG4gICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgdGhpcy5ldmVudHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICAgIHRoaXMuZGlhbG9nVmlzaWJsZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZmluZEV2ZW50SW5kZXhCeUlkKGlkOiBudW1iZXIpIHtcclxuICAgIGxldCBpbmRleCA9IC0xO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmV2ZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoaWQgPT09IHRoaXMuZXZlbnRzW2ldLmlkKSB7XHJcbiAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW5kZXg7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gZXZlbnQgaGFuZGxlciBmb3IgZXZlbnQgY2xpY2tcclxuICBoYW5kbGVFdmVudENsaWNrKGUpIHtcclxuICAgIHRoaXMuZXZlbnQgPSBuZXcgTXlFdmVudCgpO1xyXG4gICAgdGhpcy5ldmVudC50eXBlID0gJ2VkaXQnO1xyXG4gICAgdGhpcy5ldmVudC50aXRsZSA9IGUuY2FsRXZlbnQudGl0bGU7XHJcbiAgICB0aGlzLmV2ZW50LmRheVN0YXJ0ID0gZS5jYWxFdmVudC5kYXlTdGFydDtcclxuICAgIHRoaXMuZXZlbnQuZGF5RW5kID0gZS5jYWxFdmVudC5kYXlFbmQ7XHJcbiAgICB0aGlzLmV2ZW50LnN0YXJ0ID0gZS5jYWxFdmVudC5zdGFydDtcclxuICAgIHRoaXMuZXZlbnQuZW5kID0gZS5jYWxFdmVudC5lbmQ7XHJcbiAgICB0aGlzLmV2ZW50LmlkID0gZS5jYWxFdmVudC5pZDtcclxuICAgIHRoaXMuZXZlbnQud2Vla2RheSA9IGUuY2FsRXZlbnQud2Vla2RheTtcclxuICAgIHRoaXMuZGlhbG9nVmlzaWJsZSA9IHRydWU7XHJcbiAgICAvLyB0aGlzLmV2ZW50cyA9IHRoaXMuZXZlbnRzLmZpbHRlcihyZXN1bHQgPT4gcmVzdWx0ICE9PSBldmVudCApO1xyXG4gIH1cclxuXHJcbiAgLy8gZXZlbnQgaGFuZGxlciBmb3IgZGF5IGNsaWNrXHJcbiAgaGFuZGxlRGF5Q2xpY2soZSkge1xyXG4gICAgbGV0IGRhdGUgPSBlLmRhdGUuZm9ybWF0KCk7XHJcbiAgICB0aGlzLmV2ZW50ID0gbmV3IE15RXZlbnQoKTtcclxuICAgIHRoaXMuZXZlbnQudGl0bGUgPSBkYXRlO1xyXG4gICAgdGhpcy5ldmVudC50eXBlID0gXCJhZGRcIjtcclxuICAgIHRoaXMuZGlhbG9nVmlzaWJsZSA9IHRydWU7XHJcbiAgfVxyXG5cclxuXHJcbiAgY2hlY2tFeGlzdChkYXRlKSB7XHJcbiAgICBsZXQgbmRhdGUgPSB0aGlzLmV2ZW50cy5maWx0ZXIocmVzdWx0ID0+IHJlc3VsdC5zdGFydCA9PT0gZGF0ZSk7XHJcbiAgICBpZiAobmRhdGUubGVuZ3RoID09PSAxKSB7IC8vIGlmIGZvdW5kIGV2ZW50IGV4aXN0IHRoZW4gcmV0dXJuIGZhbHNlIHRvIHByZXZlbnQgbmV3IGFycnkucHVzaFxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICBzdWJzY3JpYmVDb3Vyc2UoKSB7XHJcbiAgICB0aGlzLnN1YiA9IHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG4gICAgICB0aGlzLmlkID0gcGFyYW1zWydpZCddO1xyXG4gICAgICBpZiAodGhpcy5pZCA9PT0gJ25ldycpIHtcclxuICAgICAgICB0aGlzLm5ld0NvdXJzZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jb3Vyc2UgPSBuZXcgQ291cnNlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5uZXdDb3Vyc2UgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvdXJzZVNlcnZpY2UuZ2V0Q291cnNlKHRoaXMuaWQpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgIGl0ZW0uY291cnNlU3RhcnQgPSBtb21lbnQoaXRlbS5jb3Vyc2VTdGFydCkuaXNWYWxpZCgpID8gbW9tZW50KGl0ZW0uY291cnNlU3RhcnQpLmFkZCgxLCAnZGF5JykuZm9ybWF0KCdZWVlZLU1NLUREICcpIDogJyc7XHJcbiAgICAgICAgICAgICAgaXRlbS5jb3Vyc2VFbmQgPSBtb21lbnQoaXRlbS5jb3Vyc2VFbmQpLmlzVmFsaWQoKSA/IG1vbWVudChpdGVtLmNvdXJzZUVuZCkuYWRkKDEsICdkYXknKS5mb3JtYXQoJ1lZWVktTU0tREQnKSA6ICcnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3Vyc2UgPSByZXN1bHRbMF07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvdXJzZS5jbGFzc1RpbWVTdHIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICB0aGlzLmV2ZW50cyA9IHRoaXMuZGV0YWNoQ291cnNlU3RyKHRoaXMuY291cnNlLmNsYXNzVGltZVN0cik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkZXRhY2hDb3Vyc2VTdHIoc3RyKSB7IC8vIHRlbXAgc29sdXRpb25cclxuICAgIGxldCBteUV2ZW50cyA9IFtdO1xyXG4gICAgbGV0IHN0ckFycnkgPSBzdHIuc3BsaXQoJywnKTtcclxuICAgIHN0ckFycnkuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgbGV0IG15RXZlbnQgPSBuZXcgTXlFdmVudCgpO1xyXG4gICAgICBteUV2ZW50LnRpdGxlID0gZWxlbWVudC5zcGxpdCgnICcpWzBdO1xyXG4gICAgICBteUV2ZW50LmlkID0gdGhpcy5pZEdlbisrO1xyXG4gICAgICBteUV2ZW50LndlZWtkYXkgPSB0aGlzLndlZWtEYXlzW21vbWVudChteUV2ZW50LnRpdGxlKS5pc29XZWVrZGF5KCkgLSAxXTtcclxuICAgICAgbXlFdmVudC5kYXlTdGFydF9jb3JyZWN0ID0gZWxlbWVudC5zcGxpdCgnICcpWzFdLnNwbGl0KCctJylbMF07XHJcbiAgICAgIG15RXZlbnQuZGF5RW5kX2NvcnJlY3QgPSBlbGVtZW50LnNwbGl0KCcgJylbMV0uc3BsaXQoJy0nKVsxXTtcclxuICAgICAgbXlFdmVudC5zdGFydCA9IGVsZW1lbnQuc3BsaXQoJyAnKVswXSArICcgJyArIG15RXZlbnQuZGF5U3RhcnRfY29ycmVjdDtcclxuICAgICAgbXlFdmVudC5lbmQgPSBlbGVtZW50LnNwbGl0KCcgJylbMF0gKyAnICcgKyBteUV2ZW50LmRheUVuZF9jb3JyZWN0O1xyXG4gICAgICBteUV2ZW50LmRheVN0YXJ0ID0gbW9tZW50KG15RXZlbnQuc3RhcnQpLmlzVmFsaWQoKSA/IG1vbWVudChteUV2ZW50LnN0YXJ0KS5mb3JtYXQoKSA6ICcnO1xyXG4gICAgICBteUV2ZW50LmRheUVuZCA9IG1vbWVudChteUV2ZW50LmVuZCkuaXNWYWxpZCgpID8gbW9tZW50KG15RXZlbnQuZW5kKS5mb3JtYXQoKSA6ICcnO1xyXG4gICAgICBteUV2ZW50LmFsbERheSA9IGZhbHNlO1xyXG4gICAgICBteUV2ZW50cy5wdXNoKG15RXZlbnQpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbXlFdmVudHM7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZUNsYXNzVGltZVN0cigpIHtcclxuICAgIGxldCBzdHIgPSAnJywgdGVtcFN0YXJ0LCB0ZW1wRW5kLCB0ZW1wRGF0ZTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ldmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGVtcERhdGUgPSB0aGlzLmV2ZW50c1tpXS50aXRsZTtcclxuICAgICAgdGVtcFN0YXJ0ID0gdGhpcy5ldmVudHNbaV0uZGF5U3RhcnRfY29ycmVjdDtcclxuICAgICAgdGVtcEVuZCA9IHRoaXMuZXZlbnRzW2ldLmRheUVuZF9jb3JyZWN0O1xyXG4gICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgIHN0ciArPSBgJHt0ZW1wRGF0ZX0gJHt0ZW1wU3RhcnR9LSR7dGVtcEVuZH1gO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0ciArPSBgLCR7dGVtcERhdGV9ICR7dGVtcFN0YXJ0fS0ke3RlbXBFbmR9YDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0cjtcclxuICB9XHJcblxyXG4gIHNhdmUoKSB7XHJcbiAgICB0aGlzLmNvdXJzZS5jbGFzc1RpbWVTdHIgPSB0aGlzLmdlbmVyYXRlQ2xhc3NUaW1lU3RyKCk7XHJcbiAgICBpZiAoIXRoaXMuY291cnNlLmNvdXJzZU5hbWUgfHwgIXRoaXMuY291cnNlLmNvdXJzZVN0YXJ0IHx8ICF0aGlzLmNvdXJzZS5jb3Vyc2VFbmQgfHwgIXRoaXMuY291cnNlLnByb2Zlc3NvcklkIHx8ICF0aGlzLmNvdXJzZS5jYW1wdXNJZCB8fCAhdGhpcy5jb3Vyc2UuY2xhc3Nyb29tIHx8ICF0aGlzLmNvdXJzZS5jbGFzc1RpbWVTdHIpIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICAnRm9ybSBJbmNvbXBsZXRlJyxcclxuICAgICAgICAnUGxlYXNlIGZpbGwgb3V0IGFsbCBmaWVsZHMgaW4gdGhlIGZvcm0uJyxcclxuICAgICAgICAnd2FybmluZydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vKioqKiBuZWVkIHZhbGlkYXRpb25cclxuICAgICAgaWYgKHRoaXMuaWQgPT09ICduZXcnKSB7XHJcbiAgICAgICAgdGhpcy5jb3Vyc2VTZXJ2aWNlXHJcbiAgICAgICAgICAuY3JlYXRlKHRoaXMuY291cnNlKVxyXG4gICAgICAgICAgLnRoZW4oY291cnNlID0+IHtcclxuICAgICAgICAgICAgaWYgKChjb3Vyc2UgYXMgYW55KS5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoY291cnNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgoY291cnNlIGFzIGFueSkucmVzdWx0ID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAoY291cnNlIGFzIGFueSkudGl0bGUsXHJcbiAgICAgICAgICAgICAgICAoY291cnNlIGFzIGFueSkubXNnLFxyXG4gICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB0aGlzLmdvQmFjaygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpOyAvLyBUT0RPOiBEaXNwbGF5IGVycm9yIG1lc3NhZ2VcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmNvdXJzZVNlcnZpY2VcclxuICAgICAgICAgIC51cGRhdGUodGhpcy5jb3Vyc2UpXHJcbiAgICAgICAgICAudGhlbihjb3Vyc2UgPT4ge1xyXG4gICAgICAgICAgICBpZiAoKGNvdXJzZSBhcyBhbnkpLnJlc3VsdCA9PT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChjb3Vyc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChjb3Vyc2UgYXMgYW55KS5yZXN1bHQgPT09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgIChjb3Vyc2UgYXMgYW55KS50aXRsZSxcclxuICAgICAgICAgICAgICAgIChjb3Vyc2UgYXMgYW55KS5tc2csXHJcbiAgICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIHRoaXMuZ29CYWNrKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7IC8vIFRPRE86IERpc3BsYXkgZXJyb3IgbWVzc2FnZVxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGlzcGxheUVycm9yQWxlcnQoZXJyb3IpIHtcclxuICAgIHN3YWwoXHJcbiAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICBlcnJvci5tc2csXHJcbiAgICAgICdlcnJvcidcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTXlFdmVudCB7XHJcbiAgaWQ6IG51bWJlcjtcclxuICB0eXBlOiBzdHJpbmc7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBkYXlTdGFydDogc3RyaW5nO1xyXG4gIGRheUVuZDogc3RyaW5nO1xyXG4gIGRheVN0YXJ0X2NvcnJlY3Q6IHN0cmluZztcclxuICBkYXlFbmRfY29ycmVjdDogc3RyaW5nO1xyXG4gIHN0YXJ0OiBzdHJpbmc7XHJcbiAgZW5kOiBzdHJpbmc7XHJcbiAgd2Vla2RheTogc3RyaW5nO1xyXG4gIGFsbERheTogYm9vbGVhbjtcclxufVxyXG4iXX0=
