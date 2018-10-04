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
const Course_1 = require("../../models/Course");
const router_1 = require("@angular/router");
const course_service_1 = require("../../services/course.service");
let CourseEditComponent = class CourseEditComponent {
    constructor(courseService, route) {
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
        this.courseTypes = [{ label: '-- select --', value: '' }];
        this.professors = [{ label: '-- select --', value: '' }];
        this.campuses = [{ label: '-- select --', value: '' }];
    }
    ngOnInit() {
        this.subscribeCourse();
        // get instructors
        this.courseService.getInstructors()
            .then((result) => {
            if (result.result === "error") {
                this.displayErrorAlert(result);
            }
            else {
                result.forEach((i) => {
                    this.professors.push({
                        label: i.professorName,
                        value: i.userID
                    });
                });
            }
        });
        // get campuses
        this.courseService.getCampuses()
            .then((result) => {
            if (result.result === "error") {
                this.displayErrorAlert(result);
            }
            else {
                result.forEach((i) => {
                    this.campuses.push({
                        label: i.campusName,
                        value: i.campusId
                    });
                });
            }
        });
        // get course types
        this.courseService.getCourseTypes()
            .then((result) => {
            if (result.result === "error") {
                this.displayErrorAlert(result);
            }
            else {
                result.forEach((i) => {
                    this.courseTypes.push({
                        label: i.courseType,
                        value: i.courseType
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
    } // end of init
    // check boxes onchange event
    cb_onchange(e, weekday) {
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
            this.events = this.events.filter(result => result.weekday !== weekday);
        }
    }
    // this function will uncheck checkbox based on week day that given
    unCheck(weekday) {
        this.selectedDays = this.selectedDays.filter(result => result !== weekday);
    }
    // this function will generate days that maches specification
    generateDays(weekday, start_date, end_date) {
        // figure out what's next week day
        let momentIndex, nextDay;
        for (let i = 0; i < this.weekDays.length; i++) {
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
        let root = 0, tempStart, tempEnd;
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
    }
    saveEvent() {
        if (this.event.type === 'add') {
            let momentIndex = -1;
            for (let i = 0; i < this.weekDays.length; i++) {
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
                let index = this.findEventIndexById(this.event.id);
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
    }
    deleteEvent() {
        let index = this.findEventIndexById(this.event.id);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
        this.dialogVisible = false;
    }
    findEventIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.events.length; i++) {
            if (id === this.events[i].id) {
                index = i;
                break;
            }
        }
        return index;
    }
    // event handler for event click
    handleEventClick(e) {
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
    }
    // event handler for day click
    handleDayClick(e) {
        let date = e.date.format();
        this.event = new MyEvent();
        this.event.title = date;
        this.event.type = "add";
        this.dialogVisible = true;
    }
    checkExist(date) {
        let ndate = this.events.filter(result => result.start === date);
        if (ndate.length === 1) { // if found event exist then return false to prevent new arry.push
            return false;
        }
        else {
            return true;
        }
    }
    subscribeCourse() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            if (this.id === 'new') {
                this.newCourse = true;
                this.course = new Course_1.Course();
            }
            else {
                this.newCourse = false;
                this.courseService.getCourse(this.id).then((result) => {
                    if (result.result === "error") {
                        this.displayErrorAlert(result);
                    }
                    else {
                        result.forEach((item) => {
                            item.courseStart = moment(item.courseStart).isValid() ? moment(item.courseStart).add(1, 'day').format('YYYY-MM-DD ') : '';
                            item.courseEnd = moment(item.courseEnd).isValid() ? moment(item.courseEnd).add(1, 'day').format('YYYY-MM-DD') : '';
                        });
                        this.course = result[0];
                        if (this.course.classTimeStr !== null) {
                            this.events = this.detachCourseStr(this.course.classTimeStr);
                        }
                    }
                });
            }
        });
    }
    detachCourseStr(str) {
        let myEvents = [];
        let strArry = str.split(',');
        strArry.forEach(element => {
            let myEvent = new MyEvent();
            myEvent.title = element.split(' ')[0];
            myEvent.id = this.idGen++;
            myEvent.weekday = this.weekDays[moment(myEvent.title).isoWeekday() - 1];
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
    }
    generateClassTimeStr() {
        let str = '', tempStart, tempEnd, tempDate;
        for (let i = 0; i < this.events.length; i++) {
            tempDate = this.events[i].title;
            tempStart = this.events[i].dayStart_correct;
            tempEnd = this.events[i].dayEnd_correct;
            if (i === 0) {
                str += `${tempDate} ${tempStart}-${tempEnd}`;
            }
            else {
                str += `,${tempDate} ${tempStart}-${tempEnd}`;
            }
        }
        return str;
    }
    save() {
        this.course.classTimeStr = this.generateClassTimeStr();
        if (!this.course.courseName
            || !this.course.courseStart
            || !this.course.courseEnd
            || !this.course.professorId
            || !this.course.campusId
            || !this.course.classroom
            || !this.course.classTimeStr
            || !this.course.courseType) {
            swal('Form Incomplete', 'Please fill out all fields in the form.', 'warning');
        }
        else {
            //**** need validation
            if (this.id === 'new') {
                this.courseService
                    .create(this.course)
                    .then(course => {
                    if (course.result === "error") {
                        this.displayErrorAlert(course);
                    }
                    else if (course.result === "success") {
                        swal(course.title, course.msg, 'success');
                        this.goBack();
                    }
                    else {
                        swal('Error', 'Something went wrong, please try again.', 'error');
                    }
                })
                    .catch(error => this.error = error); // TODO: Display error message
            }
            else {
                this.courseService
                    .update(this.course)
                    .then(course => {
                    if (course.result === "error") {
                        this.displayErrorAlert(course);
                    }
                    else if (course.result === "success") {
                        swal(course.title, course.msg, 'success');
                        this.goBack();
                    }
                    else {
                        swal('Error', 'Something went wrong, please try again.', 'error');
                    }
                })
                    .catch(error => this.error = error); // TODO: Display error message
            }
        }
    }
    displayErrorAlert(error) {
        swal(error.title, error.msg, 'error');
    }
    goBack() {
        window.history.back();
    }
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
exports.CourseEditComponent = CourseEditComponent;
class MyEvent {
}
exports.MyEvent = MyEvent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBeUQ7QUFDekQsZ0RBQTZDO0FBQzdDLDRDQUF5RDtBQUN6RCxrRUFBOEQ7QUFZOUQsSUFBYSxtQkFBbUIsR0FBaEM7SUF1QkUsWUFBb0IsYUFBNEIsRUFBVSxLQUFxQjtRQUEzRCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBcEIvRSxhQUFRLEdBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDekQsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUtsQixVQUFLLEdBQVcsR0FBRyxDQUFDO1FBQ3BCLFdBQVc7UUFDWCxXQUFNLEdBQVUsRUFBRSxDQUFDO1FBSW5CLGlCQUFZLEdBQWEsRUFBRSxDQUFDO1FBQzVCLFNBQVM7UUFDVCxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixZQUFZO1FBQ1osZ0JBQVcsR0FBaUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkUsZUFBVSxHQUFpQixDQUFDLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsRSxhQUFRLEdBQWlCLENBQUMsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBR2hFLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXZCLGtCQUFrQjtRQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRTthQUNsQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNmLElBQUssTUFBYyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNoQztpQkFBTTtnQkFDTCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO3dCQUNuQixLQUFLLEVBQUUsQ0FBQyxDQUFDLGFBQWE7d0JBQ3RCLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTTtxQkFDaEIsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILGVBQWU7UUFDZixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRTthQUMvQixJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNmLElBQUssTUFBYyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNoQztpQkFBTTtnQkFDTCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO3dCQUNqQixLQUFLLEVBQUUsQ0FBQyxDQUFDLFVBQVU7d0JBQ25CLEtBQUssRUFBRSxDQUFDLENBQUMsUUFBUTtxQkFDbEIsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILG1CQUFtQjtRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRTthQUNsQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNmLElBQUssTUFBYyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNoQztpQkFBTTtnQkFDTCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO3dCQUNwQixLQUFLLEVBQUUsQ0FBQyxDQUFDLFVBQVU7d0JBQ25CLEtBQUssRUFBRSxDQUFDLENBQUMsVUFBVTtxQkFDcEIsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLEdBQUc7WUFDWixJQUFJLEVBQUUsTUFBTTtZQUNaLE1BQU0sRUFBRSxPQUFPO1lBQ2YsS0FBSyxFQUFFLE1BQU07U0FDZCxDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNiLElBQUksRUFBRSxtQkFBbUI7WUFDekIsV0FBVyxFQUFFLE9BQU87WUFDcEIsTUFBTSxFQUFFLE1BQU07WUFDZCxVQUFVLEVBQUUsSUFBSTtZQUNoQixlQUFlLEVBQUUsSUFBSTtTQUN0QixDQUFDO0lBRUosQ0FBQyxDQUFDLGNBQWM7SUFFaEIsNkJBQTZCO0lBQzdCLFdBQVcsQ0FBQyxDQUFDLEVBQUUsT0FBTztRQUNwQixJQUFJLENBQUMsRUFBRTtZQUNMLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO2dCQUNySixJQUFJLENBQ0YsU0FBUyxFQUNULDRDQUE0QyxFQUM1QyxTQUFTLENBQ1YsQ0FBQztnQkFDRixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsbUJBQW1CO2FBQzNDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7YUFDM0I7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQUM7U0FDeEU7SUFDSCxDQUFDO0lBRUQsbUVBQW1FO0lBQ25FLE9BQU8sQ0FBQyxPQUFPO1FBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsNkRBQTZEO0lBQ3JELFlBQVksQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVE7UUFFaEQsa0NBQWtDO1FBQ2xDLElBQUksV0FBVyxFQUFFLE9BQU8sQ0FBQztRQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sRUFBRTtnQkFDaEMsV0FBVyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDckI7U0FDRjtRQUNELElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxHQUFHLFdBQVcsRUFBRTtZQUNqRCxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDMUQ7YUFBTTtZQUNMLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUM7UUFDakMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ2hDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUM1QixPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUU7WUFDeEUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7WUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDbkcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDN0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztZQUNqSCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztZQUM3RyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0IsSUFBSSxFQUFFLENBQUM7U0FDUjtJQUNILENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7WUFFN0IsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM3QyxJQUFJLENBQUMsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtvQkFDL0MsV0FBVyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3JCO2FBQ0Y7WUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFFLHFDQUFxQztZQUNwRSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN2SCxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDakgsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7WUFDeEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO1lBQ3BFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUI7aUJBQU07Z0JBQ0wsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3RCO1NBRUY7YUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUVyQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFO2dCQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDdkgsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNqSCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDeEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO2dCQUVwRSxJQUFJLEtBQUssR0FBVyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFFM0QsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO29CQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztpQkFDakM7YUFDRjtTQUNGO2FBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7WUFFekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDakY7UUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNELElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM5QjtRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxFQUFVO1FBQzNCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNDLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUM1QixLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNWLE1BQU07YUFDUDtTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsZ0NBQWdDO0lBQ2hDLGdCQUFnQixDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUN4QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixpRUFBaUU7SUFDbkUsQ0FBQztJQUVELDhCQUE4QjtJQUM5QixjQUFjLENBQUMsQ0FBQztRQUNkLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFJO1FBQ2IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQ2hFLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsRUFBRSxrRUFBa0U7WUFDMUYsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDOUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLEtBQUssRUFBRTtnQkFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQzthQUM1QjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUNwRCxJQUFLLE1BQWMsQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO3dCQUN0QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ2hDO3lCQUFNO3dCQUNMLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0QkFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7NEJBQzFILElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO3dCQUNySCxDQUFDLENBQUMsQ0FBQzt3QkFDSCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksS0FBSyxJQUFJLEVBQUU7NEJBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO3lCQUM5RDtxQkFDRjtnQkFDSCxDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsZUFBZSxDQUFDLEdBQUc7UUFDakIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN4QixJQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QyxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMxQixPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4RSxPQUFPLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0QsT0FBTyxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztZQUN2RSxPQUFPLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUM7WUFDbkUsT0FBTyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDekYsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDbkYsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDdkIsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxvQkFBb0I7UUFDbEIsSUFBSSxHQUFHLEdBQUcsRUFBRSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO1FBQzNDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDaEMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7WUFDNUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDWCxHQUFHLElBQUksR0FBRyxRQUFRLElBQUksU0FBUyxJQUFJLE9BQU8sRUFBRSxDQUFDO2FBQzlDO2lCQUFNO2dCQUNMLEdBQUcsSUFBSSxJQUFJLFFBQVEsSUFBSSxTQUFTLElBQUksT0FBTyxFQUFFLENBQUM7YUFDL0M7U0FDRjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVO2VBQ3RCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXO2VBQ3hCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTO2VBQ3RCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXO2VBQ3hCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRO2VBQ3JCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTO2VBQ3RCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZO2VBQ3pCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDNUIsSUFBSSxDQUNGLGlCQUFpQixFQUNqQix5Q0FBeUMsRUFDekMsU0FBUyxDQUNWLENBQUM7U0FDSDthQUFNO1lBQ0wsc0JBQXNCO1lBQ3RCLElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxLQUFLLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxhQUFhO3FCQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO3FCQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ2IsSUFBSyxNQUFjLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTt3QkFDdEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUNoQzt5QkFBTSxJQUFLLE1BQWMsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO3dCQUMvQyxJQUFJLENBQ0QsTUFBYyxDQUFDLEtBQUssRUFDcEIsTUFBYyxDQUFDLEdBQUcsRUFDbkIsU0FBUyxDQUNWLENBQUM7d0JBQ0YsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO3FCQUNmO3lCQUFNO3dCQUNMLElBQUksQ0FDRixPQUFPLEVBQ1AseUNBQXlDLEVBQ3pDLE9BQU8sQ0FDUixDQUFDO3FCQUNIO2dCQUNILENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsOEJBQThCO2FBQ3RFO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxhQUFhO3FCQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO3FCQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ2IsSUFBSyxNQUFjLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTt3QkFDdEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUNoQzt5QkFBTSxJQUFLLE1BQWMsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO3dCQUMvQyxJQUFJLENBQ0QsTUFBYyxDQUFDLEtBQUssRUFDcEIsTUFBYyxDQUFDLEdBQUcsRUFDbkIsU0FBUyxDQUNWLENBQUM7d0JBQ0YsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO3FCQUNmO3lCQUFNO3dCQUNMLElBQUksQ0FDRixPQUFPLEVBQ1AseUNBQXlDLEVBQ3pDLE9BQU8sQ0FDUixDQUFDO3FCQUNIO2dCQUNILENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsOEJBQThCO2FBQ3RFO1NBRUY7SUFDSCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBSztRQUNyQixJQUFJLENBQ0YsS0FBSyxDQUFDLEtBQUssRUFDWCxLQUFLLENBQUMsR0FBRyxFQUNULE9BQU8sQ0FDUixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU07UUFDSixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7Q0FDRixDQUFBO0FBOVhVO0lBQVIsWUFBSyxFQUFFOzhCQUFTLGVBQU07bURBQUM7QUFGYixtQkFBbUI7SUFQL0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFdBQVcsRUFBRSx5REFBeUQ7UUFDdEUsU0FBUyxFQUFFLENBQUMsd0RBQXdELENBQUM7S0FDdEUsQ0FBQztxQ0EwQm1DLDhCQUFhLEVBQWlCLHVCQUFjO0dBdkJwRSxtQkFBbUIsQ0FnWS9CO0FBaFlZLGtEQUFtQjtBQWtZaEM7Q0FZQztBQVpELDBCQVlDIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2NvdXJzZS1lZGl0L2NvdXJzZS1lZGl0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL0NvdXJzZVwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ291cnNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3Vyc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5kZWNsYXJlIHZhciBtb21lbnQ7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2NvdXJzZS1lZGl0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvY291cnNlLWVkaXQvY291cnNlLWVkaXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL2NvdXJzZS1lZGl0L2NvdXJzZS1lZGl0LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDb3Vyc2VFZGl0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAvL2dsb2JhbCB2YXJpYWJsZXNcclxuICBASW5wdXQoKSBjb3Vyc2U6IENvdXJzZTtcclxuICB3ZWVrRGF5czogc3RyaW5nW10gPSBbJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknXTtcclxuICBuZXdDb3Vyc2UgPSBmYWxzZTtcclxuICBlcnJvcjogYW55O1xyXG4gIHByaXZhdGUgc3ViOiBhbnk7XHJcbiAgaWQ6IGFueTtcclxuICB3ZWVrRGF5OiBzdHJpbmc7XHJcbiAgaWRHZW46IG51bWJlciA9IDEwMDtcclxuICAvLyBjYWxlbmRhclxyXG4gIGV2ZW50czogYW55W10gPSBbXTtcclxuICBldmVudDogTXlFdmVudDtcclxuICBoZWFkZXI6IGFueTtcclxuICBvcHRpb25zOiBhbnk7XHJcbiAgc2VsZWN0ZWREYXlzOiBzdHJpbmdbXSA9IFtdO1xyXG4gIC8vIHBvcCB1cFxyXG4gIGRpYWxvZ1Zpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAvLyBkcm9wIGRvd25cclxuICBjb3Vyc2VUeXBlczogU2VsZWN0SXRlbVtdID0gW3sgbGFiZWw6ICctLSBzZWxlY3QgLS0nLCB2YWx1ZTogJycgfV07XHJcbiAgcHJvZmVzc29yczogU2VsZWN0SXRlbVtdID0gW3sgbGFiZWw6ICctLSBzZWxlY3QgLS0nLCB2YWx1ZTogJycgfV07XHJcbiAgY2FtcHVzZXM6IFNlbGVjdEl0ZW1bXSA9IFt7IGxhYmVsOiAnLS0gc2VsZWN0IC0tJywgdmFsdWU6ICcnIH1dO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvdXJzZVNlcnZpY2U6IENvdXJzZVNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3Vic2NyaWJlQ291cnNlKCk7XHJcblxyXG4gICAgLy8gZ2V0IGluc3RydWN0b3JzXHJcbiAgICB0aGlzLmNvdXJzZVNlcnZpY2UuZ2V0SW5zdHJ1Y3RvcnMoKVxyXG4gICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdC5mb3JFYWNoKChpKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnByb2Zlc3NvcnMucHVzaCh7XHJcbiAgICAgICAgICAgIGxhYmVsOiBpLnByb2Zlc3Nvck5hbWUsXHJcbiAgICAgICAgICAgIHZhbHVlOiBpLnVzZXJJRFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGdldCBjYW1wdXNlc1xyXG4gICAgdGhpcy5jb3Vyc2VTZXJ2aWNlLmdldENhbXB1c2VzKClcclxuICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXN1bHQuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jYW1wdXNlcy5wdXNoKHtcclxuICAgICAgICAgICAgbGFiZWw6IGkuY2FtcHVzTmFtZSxcclxuICAgICAgICAgICAgdmFsdWU6IGkuY2FtcHVzSWRcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBnZXQgY291cnNlIHR5cGVzXHJcbiAgICB0aGlzLmNvdXJzZVNlcnZpY2UuZ2V0Q291cnNlVHlwZXMoKVxyXG4gICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdC5mb3JFYWNoKChpKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNvdXJzZVR5cGVzLnB1c2goe1xyXG4gICAgICAgICAgICBsYWJlbDogaS5jb3Vyc2VUeXBlLFxyXG4gICAgICAgICAgICB2YWx1ZTogaS5jb3Vyc2VUeXBlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5oZWFkZXIgPSB7XHJcbiAgICAgIGxlZnQ6ICdwcmV2JyxcclxuICAgICAgY2VudGVyOiAndGl0bGUnLFxyXG4gICAgICByaWdodDogJ25leHQnXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMub3B0aW9ucyA9IHtcclxuICAgICAgcHJldjogJ2NpcmNsZS10cmlhbmdsZS13JyxcclxuICAgICAgZGVmYXVsdFZpZXc6IFwibW9udGhcIixcclxuICAgICAgaGVpZ2h0OiBcImF1dG9cIixcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgZGlzcGxheUV2ZW50RW5kOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICB9IC8vIGVuZCBvZiBpbml0XHJcblxyXG4gIC8vIGNoZWNrIGJveGVzIG9uY2hhbmdlIGV2ZW50XHJcbiAgY2Jfb25jaGFuZ2UoZSwgd2Vla2RheSkge1xyXG4gICAgaWYgKGUpIHtcclxuICAgICAgaWYgKHRoaXMuY291cnNlLmNvdXJzZVN0YXJ0ID09PSB1bmRlZmluZWQgfHwgdGhpcy5jb3Vyc2UuY291cnNlRW5kID09PSB1bmRlZmluZWQgfHwgdGhpcy5jb3Vyc2UuY291cnNlU3RhcnQgPT09IG51bGwgfHwgdGhpcy5jb3Vyc2UuY291cnNlRW5kID09IG51bGwpIHtcclxuICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgJ1dob29wcyEnLFxyXG4gICAgICAgICAgJ1BsZWFzZSBwaWNrIGEgY291cnNlIHN0YXJ0L2VuZCBkYXRlIGZpcnN0LicsXHJcbiAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMudW5DaGVjayh3ZWVrZGF5KTsgLy8gdW5zZWxlY3QgZWxlbWVudFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMud2Vla0RheSA9IHdlZWtkYXk7XHJcbiAgICAgICAgdGhpcy5ldmVudCA9IG5ldyBNeUV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5ldmVudC50eXBlID0gXCJiYXRjaEdlblwiO1xyXG4gICAgICAgIHRoaXMuZGlhbG9nVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZXZlbnRzID0gdGhpcy5ldmVudHMuZmlsdGVyKHJlc3VsdCA9PiByZXN1bHQud2Vla2RheSAhPT0gd2Vla2RheSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyB0aGlzIGZ1bmN0aW9uIHdpbGwgdW5jaGVjayBjaGVja2JveCBiYXNlZCBvbiB3ZWVrIGRheSB0aGF0IGdpdmVuXHJcbiAgdW5DaGVjayh3ZWVrZGF5KSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkRGF5cyA9IHRoaXMuc2VsZWN0ZWREYXlzLmZpbHRlcihyZXN1bHQgPT4gcmVzdWx0ICE9PSB3ZWVrZGF5KTtcclxuICB9XHJcblxyXG4gIC8vIHRoaXMgZnVuY3Rpb24gd2lsbCBnZW5lcmF0ZSBkYXlzIHRoYXQgbWFjaGVzIHNwZWNpZmljYXRpb25cclxuICBwcml2YXRlIGdlbmVyYXRlRGF5cyh3ZWVrZGF5LCBzdGFydF9kYXRlLCBlbmRfZGF0ZSkge1xyXG5cclxuICAgIC8vIGZpZ3VyZSBvdXQgd2hhdCdzIG5leHQgd2VlayBkYXlcclxuICAgIGxldCBtb21lbnRJbmRleCwgbmV4dERheTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53ZWVrRGF5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy53ZWVrRGF5c1tpXSA9PT0gd2Vla2RheSkge1xyXG4gICAgICAgIG1vbWVudEluZGV4ID0gaSArIDE7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChtb21lbnQoc3RhcnRfZGF0ZSkuaXNvV2Vla2RheSgpID4gbW9tZW50SW5kZXgpIHtcclxuICAgICAgbmV4dERheSA9IG1vbWVudChzdGFydF9kYXRlKS5pc29XZWVrZGF5KG1vbWVudEluZGV4ICsgNyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBuZXh0RGF5ID0gbW9tZW50KHN0YXJ0X2RhdGUpLmlzb1dlZWtkYXkobW9tZW50SW5kZXgpO1xyXG4gICAgfVxyXG4gICAgbGV0IHJvb3QgPSAwLCB0ZW1wU3RhcnQsIHRlbXBFbmQ7XHJcbiAgICB0ZW1wU3RhcnQgPSB0aGlzLmV2ZW50LmRheVN0YXJ0O1xyXG4gICAgdGVtcEVuZCA9IHRoaXMuZXZlbnQuZGF5RW5kO1xyXG4gICAgd2hpbGUgKCEobW9tZW50KG5leHREYXkpLmFkZCg3ICogcm9vdCwgJ2RheScpKS5pc0FmdGVyKG1vbWVudChlbmRfZGF0ZSkpKSB7XHJcbiAgICAgIHRoaXMuZXZlbnQgPSBuZXcgTXlFdmVudCgpO1xyXG4gICAgICB0aGlzLmV2ZW50LmlkID0gdGhpcy5pZEdlbisrO1xyXG4gICAgICB0aGlzLmV2ZW50LmRheVN0YXJ0ID0gdGVtcFN0YXJ0O1xyXG4gICAgICB0aGlzLmV2ZW50LmRheUVuZCA9IHRlbXBFbmQ7XHJcbiAgICAgIHRoaXMuZXZlbnQud2Vla2RheSA9IHdlZWtkYXk7XHJcbiAgICAgIHRoaXMuZXZlbnQudGl0bGUgPSBtb21lbnQobmV4dERheSkuYWRkKDcgKiByb290LCAnZGF5JykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgIHRoaXMuZXZlbnQuZGF5U3RhcnRfY29ycmVjdCA9IG1vbWVudCh0ZW1wU3RhcnQpLmlzVmFsaWQoKSA/IG1vbWVudCh0ZW1wU3RhcnQpLmZvcm1hdCgnSEg6bW0nKSA6ICcnO1xyXG4gICAgICB0aGlzLmV2ZW50LmRheUVuZF9jb3JyZWN0ID0gbW9tZW50KHRlbXBFbmQpLmlzVmFsaWQoKSA/IG1vbWVudCh0ZW1wRW5kKS5mb3JtYXQoJ0hIOm1tJykgOiAnJztcclxuICAgICAgdGhpcy5ldmVudC5zdGFydCA9IG1vbWVudChuZXh0RGF5KS5hZGQoNyAqIHJvb3QsICdkYXknKS5mb3JtYXQoJ1lZWVktTU0tREQnKSArICcgJyArIHRoaXMuZXZlbnQuZGF5U3RhcnRfY29ycmVjdDtcclxuICAgICAgdGhpcy5ldmVudC5lbmQgPSBtb21lbnQobmV4dERheSkuYWRkKDcgKiByb290LCAnZGF5JykuZm9ybWF0KCdZWVlZLU1NLUREJykgKyAnICcgKyB0aGlzLmV2ZW50LmRheUVuZF9jb3JyZWN0O1xyXG4gICAgICB0aGlzLmV2ZW50cy5wdXNoKHRoaXMuZXZlbnQpO1xyXG4gICAgICByb290Kys7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzYXZlRXZlbnQoKSB7XHJcbiAgICBpZiAodGhpcy5ldmVudC50eXBlID09PSAnYWRkJykge1xyXG5cclxuICAgICAgbGV0IG1vbWVudEluZGV4ID0gLTE7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53ZWVrRGF5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChpID09PSBtb21lbnQodGhpcy5ldmVudC50aXRsZSkuaXNvV2Vla2RheSgpKSB7XHJcbiAgICAgICAgICBtb21lbnRJbmRleCA9IGkgLSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLmV2ZW50LndlZWtkYXkgPSB0aGlzLndlZWtEYXlzW21vbWVudEluZGV4XTtcclxuICAgICAgdGhpcy5ldmVudC5pZCA9IHRoaXMuaWRHZW4rKzsgIC8vIHRpdGxlLCBpZCAsIHdlZWtkYXksZGF5U3RhcnQsZGF5RW5cclxuICAgICAgdGhpcy5ldmVudC5kYXlTdGFydF9jb3JyZWN0ID0gbW9tZW50KHRoaXMuZXZlbnQuZGF5U3RhcnQpLmlzVmFsaWQoKSA/IG1vbWVudCh0aGlzLmV2ZW50LmRheVN0YXJ0KS5mb3JtYXQoJ0hIOm1tJykgOiAnJztcclxuICAgICAgdGhpcy5ldmVudC5kYXlFbmRfY29ycmVjdCA9IG1vbWVudCh0aGlzLmV2ZW50LmRheUVuZCkuaXNWYWxpZCgpID8gbW9tZW50KHRoaXMuZXZlbnQuZGF5RW5kKS5mb3JtYXQoJ0hIOm1tJykgOiAnJztcclxuICAgICAgdGhpcy5ldmVudC5zdGFydCA9IHRoaXMuZXZlbnQudGl0bGUgKyAnICcgKyB0aGlzLmV2ZW50LmRheVN0YXJ0X2NvcnJlY3Q7XHJcbiAgICAgIHRoaXMuZXZlbnQuZW5kID0gdGhpcy5ldmVudC50aXRsZSArICcgJyArIHRoaXMuZXZlbnQuZGF5RW5kX2NvcnJlY3Q7XHJcbiAgICAgIGlmICh0aGlzLmNoZWNrRXhpc3QodGhpcy5ldmVudC50aXRsZSkpIHtcclxuICAgICAgICB0aGlzLmV2ZW50cy5wdXNoKHRoaXMuZXZlbnQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KCdldmVudCBleGlzdCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIGlmICh0aGlzLmV2ZW50LnR5cGUgPT09ICdlZGl0Jykge1xyXG5cclxuICAgICAgaWYgKHRoaXMuZXZlbnQuaWQpIHtcclxuICAgICAgICB0aGlzLmV2ZW50LmRheVN0YXJ0X2NvcnJlY3QgPSBtb21lbnQodGhpcy5ldmVudC5kYXlTdGFydCkuaXNWYWxpZCgpID8gbW9tZW50KHRoaXMuZXZlbnQuZGF5U3RhcnQpLmZvcm1hdCgnSEg6bW0nKSA6ICcnO1xyXG4gICAgICAgIHRoaXMuZXZlbnQuZGF5RW5kX2NvcnJlY3QgPSBtb21lbnQodGhpcy5ldmVudC5kYXlFbmQpLmlzVmFsaWQoKSA/IG1vbWVudCh0aGlzLmV2ZW50LmRheUVuZCkuZm9ybWF0KCdISDptbScpIDogJyc7XHJcbiAgICAgICAgdGhpcy5ldmVudC5zdGFydCA9IHRoaXMuZXZlbnQudGl0bGUgKyAnICcgKyB0aGlzLmV2ZW50LmRheVN0YXJ0X2NvcnJlY3Q7XHJcbiAgICAgICAgdGhpcy5ldmVudC5lbmQgPSB0aGlzLmV2ZW50LnRpdGxlICsgJyAnICsgdGhpcy5ldmVudC5kYXlFbmRfY29ycmVjdDtcclxuXHJcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSB0aGlzLmZpbmRFdmVudEluZGV4QnlJZCh0aGlzLmV2ZW50LmlkKTtcclxuXHJcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgIHRoaXMuZXZlbnRzW2luZGV4XSA9IHRoaXMuZXZlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZXZlbnQudHlwZSA9PT0gJ2JhdGNoR2VuJykge1xyXG5cclxuICAgICAgdGhpcy5nZW5lcmF0ZURheXModGhpcy53ZWVrRGF5LCB0aGlzLmNvdXJzZS5jb3Vyc2VTdGFydCwgdGhpcy5jb3Vyc2UuY291cnNlRW5kKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRpYWxvZ1Zpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMuZXZlbnQgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlRXZlbnQoKSB7XHJcbiAgICBsZXQgaW5kZXg6IG51bWJlciA9IHRoaXMuZmluZEV2ZW50SW5kZXhCeUlkKHRoaXMuZXZlbnQuaWQpO1xyXG4gICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgdGhpcy5ldmVudHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICAgIHRoaXMuZGlhbG9nVmlzaWJsZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZmluZEV2ZW50SW5kZXhCeUlkKGlkOiBudW1iZXIpIHtcclxuICAgIGxldCBpbmRleCA9IC0xO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmV2ZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoaWQgPT09IHRoaXMuZXZlbnRzW2ldLmlkKSB7XHJcbiAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW5kZXg7XHJcbiAgfVxyXG5cclxuICAvLyBldmVudCBoYW5kbGVyIGZvciBldmVudCBjbGlja1xyXG4gIGhhbmRsZUV2ZW50Q2xpY2soZSkge1xyXG4gICAgdGhpcy5ldmVudCA9IG5ldyBNeUV2ZW50KCk7XHJcbiAgICB0aGlzLmV2ZW50LnR5cGUgPSAnZWRpdCc7XHJcbiAgICB0aGlzLmV2ZW50LnRpdGxlID0gZS5jYWxFdmVudC50aXRsZTtcclxuICAgIHRoaXMuZXZlbnQuZGF5U3RhcnQgPSBlLmNhbEV2ZW50LmRheVN0YXJ0O1xyXG4gICAgdGhpcy5ldmVudC5kYXlFbmQgPSBlLmNhbEV2ZW50LmRheUVuZDtcclxuICAgIHRoaXMuZXZlbnQuc3RhcnQgPSBlLmNhbEV2ZW50LnN0YXJ0O1xyXG4gICAgdGhpcy5ldmVudC5lbmQgPSBlLmNhbEV2ZW50LmVuZDtcclxuICAgIHRoaXMuZXZlbnQuaWQgPSBlLmNhbEV2ZW50LmlkO1xyXG4gICAgdGhpcy5ldmVudC53ZWVrZGF5ID0gZS5jYWxFdmVudC53ZWVrZGF5O1xyXG4gICAgdGhpcy5kaWFsb2dWaXNpYmxlID0gdHJ1ZTtcclxuICAgIC8vIHRoaXMuZXZlbnRzID0gdGhpcy5ldmVudHMuZmlsdGVyKHJlc3VsdCA9PiByZXN1bHQgIT09IGV2ZW50ICk7XHJcbiAgfVxyXG5cclxuICAvLyBldmVudCBoYW5kbGVyIGZvciBkYXkgY2xpY2tcclxuICBoYW5kbGVEYXlDbGljayhlKSB7XHJcbiAgICBsZXQgZGF0ZSA9IGUuZGF0ZS5mb3JtYXQoKTtcclxuICAgIHRoaXMuZXZlbnQgPSBuZXcgTXlFdmVudCgpO1xyXG4gICAgdGhpcy5ldmVudC50aXRsZSA9IGRhdGU7XHJcbiAgICB0aGlzLmV2ZW50LnR5cGUgPSBcImFkZFwiO1xyXG4gICAgdGhpcy5kaWFsb2dWaXNpYmxlID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGNoZWNrRXhpc3QoZGF0ZSkge1xyXG4gICAgbGV0IG5kYXRlID0gdGhpcy5ldmVudHMuZmlsdGVyKHJlc3VsdCA9PiByZXN1bHQuc3RhcnQgPT09IGRhdGUpO1xyXG4gICAgaWYgKG5kYXRlLmxlbmd0aCA9PT0gMSkgeyAvLyBpZiBmb3VuZCBldmVudCBleGlzdCB0aGVuIHJldHVybiBmYWxzZSB0byBwcmV2ZW50IG5ldyBhcnJ5LnB1c2hcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdWJzY3JpYmVDb3Vyc2UoKSB7XHJcbiAgICB0aGlzLnN1YiA9IHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG4gICAgICB0aGlzLmlkID0gcGFyYW1zWydpZCddO1xyXG4gICAgICBpZiAodGhpcy5pZCA9PT0gJ25ldycpIHtcclxuICAgICAgICB0aGlzLm5ld0NvdXJzZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jb3Vyc2UgPSBuZXcgQ291cnNlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5uZXdDb3Vyc2UgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvdXJzZVNlcnZpY2UuZ2V0Q291cnNlKHRoaXMuaWQpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgIGl0ZW0uY291cnNlU3RhcnQgPSBtb21lbnQoaXRlbS5jb3Vyc2VTdGFydCkuaXNWYWxpZCgpID8gbW9tZW50KGl0ZW0uY291cnNlU3RhcnQpLmFkZCgxLCAnZGF5JykuZm9ybWF0KCdZWVlZLU1NLUREICcpIDogJyc7XHJcbiAgICAgICAgICAgICAgaXRlbS5jb3Vyc2VFbmQgPSBtb21lbnQoaXRlbS5jb3Vyc2VFbmQpLmlzVmFsaWQoKSA/IG1vbWVudChpdGVtLmNvdXJzZUVuZCkuYWRkKDEsICdkYXknKS5mb3JtYXQoJ1lZWVktTU0tREQnKSA6ICcnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3Vyc2UgPSByZXN1bHRbMF07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvdXJzZS5jbGFzc1RpbWVTdHIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICB0aGlzLmV2ZW50cyA9IHRoaXMuZGV0YWNoQ291cnNlU3RyKHRoaXMuY291cnNlLmNsYXNzVGltZVN0cik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkZXRhY2hDb3Vyc2VTdHIoc3RyKSB7IC8vIHRlbXAgc29sdXRpb25cclxuICAgIGxldCBteUV2ZW50cyA9IFtdO1xyXG4gICAgbGV0IHN0ckFycnkgPSBzdHIuc3BsaXQoJywnKTtcclxuICAgIHN0ckFycnkuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgbGV0IG15RXZlbnQgPSBuZXcgTXlFdmVudCgpO1xyXG4gICAgICBteUV2ZW50LnRpdGxlID0gZWxlbWVudC5zcGxpdCgnICcpWzBdO1xyXG4gICAgICBteUV2ZW50LmlkID0gdGhpcy5pZEdlbisrO1xyXG4gICAgICBteUV2ZW50LndlZWtkYXkgPSB0aGlzLndlZWtEYXlzW21vbWVudChteUV2ZW50LnRpdGxlKS5pc29XZWVrZGF5KCkgLSAxXTtcclxuICAgICAgbXlFdmVudC5kYXlTdGFydF9jb3JyZWN0ID0gZWxlbWVudC5zcGxpdCgnICcpWzFdLnNwbGl0KCctJylbMF07XHJcbiAgICAgIG15RXZlbnQuZGF5RW5kX2NvcnJlY3QgPSBlbGVtZW50LnNwbGl0KCcgJylbMV0uc3BsaXQoJy0nKVsxXTtcclxuICAgICAgbXlFdmVudC5zdGFydCA9IGVsZW1lbnQuc3BsaXQoJyAnKVswXSArICcgJyArIG15RXZlbnQuZGF5U3RhcnRfY29ycmVjdDtcclxuICAgICAgbXlFdmVudC5lbmQgPSBlbGVtZW50LnNwbGl0KCcgJylbMF0gKyAnICcgKyBteUV2ZW50LmRheUVuZF9jb3JyZWN0O1xyXG4gICAgICBteUV2ZW50LmRheVN0YXJ0ID0gbW9tZW50KG15RXZlbnQuc3RhcnQpLmlzVmFsaWQoKSA/IG1vbWVudChteUV2ZW50LnN0YXJ0KS5mb3JtYXQoKSA6ICcnO1xyXG4gICAgICBteUV2ZW50LmRheUVuZCA9IG1vbWVudChteUV2ZW50LmVuZCkuaXNWYWxpZCgpID8gbW9tZW50KG15RXZlbnQuZW5kKS5mb3JtYXQoKSA6ICcnO1xyXG4gICAgICBteUV2ZW50LmFsbERheSA9IGZhbHNlO1xyXG4gICAgICBteUV2ZW50cy5wdXNoKG15RXZlbnQpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbXlFdmVudHM7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZUNsYXNzVGltZVN0cigpIHtcclxuICAgIGxldCBzdHIgPSAnJywgdGVtcFN0YXJ0LCB0ZW1wRW5kLCB0ZW1wRGF0ZTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ldmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGVtcERhdGUgPSB0aGlzLmV2ZW50c1tpXS50aXRsZTtcclxuICAgICAgdGVtcFN0YXJ0ID0gdGhpcy5ldmVudHNbaV0uZGF5U3RhcnRfY29ycmVjdDtcclxuICAgICAgdGVtcEVuZCA9IHRoaXMuZXZlbnRzW2ldLmRheUVuZF9jb3JyZWN0O1xyXG4gICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgIHN0ciArPSBgJHt0ZW1wRGF0ZX0gJHt0ZW1wU3RhcnR9LSR7dGVtcEVuZH1gO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0ciArPSBgLCR7dGVtcERhdGV9ICR7dGVtcFN0YXJ0fS0ke3RlbXBFbmR9YDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0cjtcclxuICB9XHJcblxyXG4gIHNhdmUoKSB7XHJcbiAgICB0aGlzLmNvdXJzZS5jbGFzc1RpbWVTdHIgPSB0aGlzLmdlbmVyYXRlQ2xhc3NUaW1lU3RyKCk7XHJcbiAgICBpZiAoIXRoaXMuY291cnNlLmNvdXJzZU5hbWVcclxuICAgICAgfHwgIXRoaXMuY291cnNlLmNvdXJzZVN0YXJ0XHJcbiAgICAgIHx8ICF0aGlzLmNvdXJzZS5jb3Vyc2VFbmRcclxuICAgICAgfHwgIXRoaXMuY291cnNlLnByb2Zlc3NvcklkXHJcbiAgICAgIHx8ICF0aGlzLmNvdXJzZS5jYW1wdXNJZFxyXG4gICAgICB8fCAhdGhpcy5jb3Vyc2UuY2xhc3Nyb29tXHJcbiAgICAgIHx8ICF0aGlzLmNvdXJzZS5jbGFzc1RpbWVTdHJcclxuICAgICAgfHwgIXRoaXMuY291cnNlLmNvdXJzZVR5cGUpIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICAnRm9ybSBJbmNvbXBsZXRlJyxcclxuICAgICAgICAnUGxlYXNlIGZpbGwgb3V0IGFsbCBmaWVsZHMgaW4gdGhlIGZvcm0uJyxcclxuICAgICAgICAnd2FybmluZydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vKioqKiBuZWVkIHZhbGlkYXRpb25cclxuICAgICAgaWYgKHRoaXMuaWQgPT09ICduZXcnKSB7XHJcbiAgICAgICAgdGhpcy5jb3Vyc2VTZXJ2aWNlXHJcbiAgICAgICAgICAuY3JlYXRlKHRoaXMuY291cnNlKVxyXG4gICAgICAgICAgLnRoZW4oY291cnNlID0+IHtcclxuICAgICAgICAgICAgaWYgKChjb3Vyc2UgYXMgYW55KS5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoY291cnNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgoY291cnNlIGFzIGFueSkucmVzdWx0ID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAoY291cnNlIGFzIGFueSkudGl0bGUsXHJcbiAgICAgICAgICAgICAgICAoY291cnNlIGFzIGFueSkubXNnLFxyXG4gICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB0aGlzLmdvQmFjaygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpOyAvLyBUT0RPOiBEaXNwbGF5IGVycm9yIG1lc3NhZ2VcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmNvdXJzZVNlcnZpY2VcclxuICAgICAgICAgIC51cGRhdGUodGhpcy5jb3Vyc2UpXHJcbiAgICAgICAgICAudGhlbihjb3Vyc2UgPT4ge1xyXG4gICAgICAgICAgICBpZiAoKGNvdXJzZSBhcyBhbnkpLnJlc3VsdCA9PT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChjb3Vyc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChjb3Vyc2UgYXMgYW55KS5yZXN1bHQgPT09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgIChjb3Vyc2UgYXMgYW55KS50aXRsZSxcclxuICAgICAgICAgICAgICAgIChjb3Vyc2UgYXMgYW55KS5tc2csXHJcbiAgICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIHRoaXMuZ29CYWNrKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7IC8vIFRPRE86IERpc3BsYXkgZXJyb3IgbWVzc2FnZVxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGlzcGxheUVycm9yQWxlcnQoZXJyb3IpIHtcclxuICAgIHN3YWwoXHJcbiAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICBlcnJvci5tc2csXHJcbiAgICAgICdlcnJvcidcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTXlFdmVudCB7XHJcbiAgaWQ6IG51bWJlcjtcclxuICB0eXBlOiBzdHJpbmc7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBkYXlTdGFydDogc3RyaW5nO1xyXG4gIGRheUVuZDogc3RyaW5nO1xyXG4gIGRheVN0YXJ0X2NvcnJlY3Q6IHN0cmluZztcclxuICBkYXlFbmRfY29ycmVjdDogc3RyaW5nO1xyXG4gIHN0YXJ0OiBzdHJpbmc7XHJcbiAgZW5kOiBzdHJpbmc7XHJcbiAgd2Vla2RheTogc3RyaW5nO1xyXG4gIGFsbERheTogYm9vbGVhbjtcclxufVxyXG4iXX0=
