System.register(["@angular/core", "../../models/Course", "@angular/router", "../../services/course.service"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var core_1, Course_1, router_1, course_service_1, CourseEditComponent, MyEvent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Course_1_1) {
                Course_1 = Course_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (course_service_1_1) {
                course_service_1 = course_service_1_1;
            }
        ],
        execute: function () {
            CourseEditComponent = /** @class */ (function () {
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
            exports_1("CourseEditComponent", CourseEditComponent);
            MyEvent = /** @class */ (function () {
                function MyEvent() {
                }
                return MyEvent;
            }());
            exports_1("MyEvent", MyEvent);
        }
    };
});

//# sourceMappingURL=course-edit.component.js.map
