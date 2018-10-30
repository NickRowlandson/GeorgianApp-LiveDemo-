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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBeUQ7QUFDekQsZ0RBQTZDO0FBQzdDLDRDQUF5RDtBQUN6RCxrRUFBOEQ7QUFZOUQsSUFBYSxtQkFBbUIsR0FBaEM7SUF1QkUsWUFBb0IsYUFBNEIsRUFBVSxLQUFxQjtRQUEzRCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBcEIvRSxhQUFRLEdBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDekQsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUtsQixVQUFLLEdBQVcsR0FBRyxDQUFDO1FBQ3BCLFdBQVc7UUFDWCxXQUFNLEdBQVUsRUFBRSxDQUFDO1FBSW5CLGlCQUFZLEdBQWEsRUFBRSxDQUFDO1FBQzVCLFNBQVM7UUFDVCxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixZQUFZO1FBQ1osZ0JBQVcsR0FBaUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkUsZUFBVSxHQUFpQixDQUFDLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsRSxhQUFRLEdBQWlCLENBQUMsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBR2hFLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXZCLGtCQUFrQjtRQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRTthQUNsQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNmLElB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QXlDLEVBQ3pDLE9BQU8sQ0FDUixDQUFDO3FCQUNIO2dCQUNILENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsOEJBQThCO2FBQ3RFO1NBRUY7SUFDSCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBSztRQUNyQixJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssWUFBWSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQ0YsS0FBSyxDQUFDLEtBQUssRUFDWCxLQUFLLENBQUMsR0FBRyxFQUNULE1BQU0sQ0FDUCxDQUFDO1NBQ0g7YUFBTTtZQUNMLElBQUksQ0FDRixLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssQ0FBQyxHQUFHLEVBQ1QsT0FBTyxDQUNSLENBQUM7U0FDSDtJQUNILENBQUM7SUFFRCxNQUFNO1FBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0NBQ0YsQ0FBQTtBQXZZVTtJQUFSLFlBQUssRUFBRTs4QkFBUyxlQUFNO21EQUFDO0FBRmIsbUJBQW1CO0lBUC9CLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsYUFBYTtRQUN2QixXQUFXLEVBQUUseURBQXlEO1FBQ3RFLFNBQVMsRUFBRSxDQUFDLHdEQUF3RCxDQUFDO0tBQ3RFLENBQUM7cUNBMEJtQyw4QkFBYSxFQUFpQix1QkFBYztHQXZCcEUsbUJBQW1CLENBeVkvQjtBQXpZWSxrREFBbUI7QUEyWWhDO0NBWUM7QUFaRCwwQkFZQyIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9Db3Vyc2VcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291cnNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuZGVjbGFyZSB2YXIgbW9tZW50O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdjb3Vyc2UtZWRpdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2NvdXJzZS1lZGl0L2NvdXJzZS1lZGl0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQ291cnNlRWRpdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgLy9nbG9iYWwgdmFyaWFibGVzXHJcbiAgQElucHV0KCkgY291cnNlOiBDb3Vyc2U7XHJcbiAgd2Vla0RheXM6IHN0cmluZ1tdID0gWydNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJ107XHJcbiAgbmV3Q291cnNlID0gZmFsc2U7XHJcbiAgZXJyb3I6IGFueTtcclxuICBwcml2YXRlIHN1YjogYW55O1xyXG4gIGlkOiBhbnk7XHJcbiAgd2Vla0RheTogc3RyaW5nO1xyXG4gIGlkR2VuOiBudW1iZXIgPSAxMDA7XHJcbiAgLy8gY2FsZW5kYXJcclxuICBldmVudHM6IGFueVtdID0gW107XHJcbiAgZXZlbnQ6IE15RXZlbnQ7XHJcbiAgaGVhZGVyOiBhbnk7XHJcbiAgb3B0aW9uczogYW55O1xyXG4gIHNlbGVjdGVkRGF5czogc3RyaW5nW10gPSBbXTtcclxuICAvLyBwb3AgdXBcclxuICBkaWFsb2dWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgLy8gZHJvcCBkb3duXHJcbiAgY291cnNlVHlwZXM6IFNlbGVjdEl0ZW1bXSA9IFt7IGxhYmVsOiAnLS0gc2VsZWN0IC0tJywgdmFsdWU6ICcnIH1dO1xyXG4gIHByb2Zlc3NvcnM6IFNlbGVjdEl0ZW1bXSA9IFt7IGxhYmVsOiAnLS0gc2VsZWN0IC0tJywgdmFsdWU6ICcnIH1dO1xyXG4gIGNhbXB1c2VzOiBTZWxlY3RJdGVtW10gPSBbeyBsYWJlbDogJy0tIHNlbGVjdCAtLScsIHZhbHVlOiAnJyB9XTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb3Vyc2VTZXJ2aWNlOiBDb3Vyc2VTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN1YnNjcmliZUNvdXJzZSgpO1xyXG5cclxuICAgIC8vIGdldCBpbnN0cnVjdG9yc1xyXG4gICAgdGhpcy5jb3Vyc2VTZXJ2aWNlLmdldEluc3RydWN0b3JzKClcclxuICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXN1bHQuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wcm9mZXNzb3JzLnB1c2goe1xyXG4gICAgICAgICAgICBsYWJlbDogaS5wcm9mZXNzb3JOYW1lLFxyXG4gICAgICAgICAgICB2YWx1ZTogaS51c2VySURcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBnZXQgY2FtcHVzZXNcclxuICAgIHRoaXMuY291cnNlU2VydmljZS5nZXRDYW1wdXNlcygpXHJcbiAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSBcImVycm9yXCIpIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzdWx0LmZvckVhY2goKGkpID0+IHtcclxuICAgICAgICAgIHRoaXMuY2FtcHVzZXMucHVzaCh7XHJcbiAgICAgICAgICAgIGxhYmVsOiBpLmNhbXB1c05hbWUsXHJcbiAgICAgICAgICAgIHZhbHVlOiBpLmNhbXB1c0lkXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gZ2V0IGNvdXJzZSB0eXBlc1xyXG4gICAgdGhpcy5jb3Vyc2VTZXJ2aWNlLmdldENvdXJzZVR5cGVzKClcclxuICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXN1bHQuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jb3Vyc2VUeXBlcy5wdXNoKHtcclxuICAgICAgICAgICAgbGFiZWw6IGkuY291cnNlVHlwZSxcclxuICAgICAgICAgICAgdmFsdWU6IGkuY291cnNlVHlwZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuaGVhZGVyID0ge1xyXG4gICAgICBsZWZ0OiAncHJldicsXHJcbiAgICAgIGNlbnRlcjogJ3RpdGxlJyxcclxuICAgICAgcmlnaHQ6ICduZXh0J1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLm9wdGlvbnMgPSB7XHJcbiAgICAgIHByZXY6ICdjaXJjbGUtdHJpYW5nbGUtdycsXHJcbiAgICAgIGRlZmF1bHRWaWV3OiBcIm1vbnRoXCIsXHJcbiAgICAgIGhlaWdodDogXCJhdXRvXCIsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGRpc3BsYXlFdmVudEVuZDogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgfSAvLyBlbmQgb2YgaW5pdFxyXG5cclxuICAvLyBjaGVjayBib3hlcyBvbmNoYW5nZSBldmVudFxyXG4gIGNiX29uY2hhbmdlKGUsIHdlZWtkYXkpIHtcclxuICAgIGlmIChlKSB7XHJcbiAgICAgIGlmICh0aGlzLmNvdXJzZS5jb3Vyc2VTdGFydCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuY291cnNlLmNvdXJzZUVuZCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuY291cnNlLmNvdXJzZVN0YXJ0ID09PSBudWxsIHx8IHRoaXMuY291cnNlLmNvdXJzZUVuZCA9PSBudWxsKSB7XHJcbiAgICAgICAgc3dhbChcclxuICAgICAgICAgICdXaG9vcHMhJyxcclxuICAgICAgICAgICdQbGVhc2UgcGljayBhIGNvdXJzZSBzdGFydC9lbmQgZGF0ZSBmaXJzdC4nLFxyXG4gICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLnVuQ2hlY2sod2Vla2RheSk7IC8vIHVuc2VsZWN0IGVsZW1lbnRcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLndlZWtEYXkgPSB3ZWVrZGF5O1xyXG4gICAgICAgIHRoaXMuZXZlbnQgPSBuZXcgTXlFdmVudCgpO1xyXG4gICAgICAgIHRoaXMuZXZlbnQudHlwZSA9IFwiYmF0Y2hHZW5cIjtcclxuICAgICAgICB0aGlzLmRpYWxvZ1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmV2ZW50cyA9IHRoaXMuZXZlbnRzLmZpbHRlcihyZXN1bHQgPT4gcmVzdWx0LndlZWtkYXkgIT09IHdlZWtkYXkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gdGhpcyBmdW5jdGlvbiB3aWxsIHVuY2hlY2sgY2hlY2tib3ggYmFzZWQgb24gd2VlayBkYXkgdGhhdCBnaXZlblxyXG4gIHVuQ2hlY2sod2Vla2RheSkge1xyXG4gICAgdGhpcy5zZWxlY3RlZERheXMgPSB0aGlzLnNlbGVjdGVkRGF5cy5maWx0ZXIocmVzdWx0ID0+IHJlc3VsdCAhPT0gd2Vla2RheSk7XHJcbiAgfVxyXG5cclxuICAvLyB0aGlzIGZ1bmN0aW9uIHdpbGwgZ2VuZXJhdGUgZGF5cyB0aGF0IG1hY2hlcyBzcGVjaWZpY2F0aW9uXHJcbiAgcHJpdmF0ZSBnZW5lcmF0ZURheXMod2Vla2RheSwgc3RhcnRfZGF0ZSwgZW5kX2RhdGUpIHtcclxuXHJcbiAgICAvLyBmaWd1cmUgb3V0IHdoYXQncyBuZXh0IHdlZWsgZGF5XHJcbiAgICBsZXQgbW9tZW50SW5kZXgsIG5leHREYXk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMud2Vla0RheXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHRoaXMud2Vla0RheXNbaV0gPT09IHdlZWtkYXkpIHtcclxuICAgICAgICBtb21lbnRJbmRleCA9IGkgKyAxO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobW9tZW50KHN0YXJ0X2RhdGUpLmlzb1dlZWtkYXkoKSA+IG1vbWVudEluZGV4KSB7XHJcbiAgICAgIG5leHREYXkgPSBtb21lbnQoc3RhcnRfZGF0ZSkuaXNvV2Vla2RheShtb21lbnRJbmRleCArIDcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbmV4dERheSA9IG1vbWVudChzdGFydF9kYXRlKS5pc29XZWVrZGF5KG1vbWVudEluZGV4KTtcclxuICAgIH1cclxuICAgIGxldCByb290ID0gMCwgdGVtcFN0YXJ0LCB0ZW1wRW5kO1xyXG4gICAgdGVtcFN0YXJ0ID0gdGhpcy5ldmVudC5kYXlTdGFydDtcclxuICAgIHRlbXBFbmQgPSB0aGlzLmV2ZW50LmRheUVuZDtcclxuICAgIHdoaWxlICghKG1vbWVudChuZXh0RGF5KS5hZGQoNyAqIHJvb3QsICdkYXknKSkuaXNBZnRlcihtb21lbnQoZW5kX2RhdGUpKSkge1xyXG4gICAgICB0aGlzLmV2ZW50ID0gbmV3IE15RXZlbnQoKTtcclxuICAgICAgdGhpcy5ldmVudC5pZCA9IHRoaXMuaWRHZW4rKztcclxuICAgICAgdGhpcy5ldmVudC5kYXlTdGFydCA9IHRlbXBTdGFydDtcclxuICAgICAgdGhpcy5ldmVudC5kYXlFbmQgPSB0ZW1wRW5kO1xyXG4gICAgICB0aGlzLmV2ZW50LndlZWtkYXkgPSB3ZWVrZGF5O1xyXG4gICAgICB0aGlzLmV2ZW50LnRpdGxlID0gbW9tZW50KG5leHREYXkpLmFkZCg3ICogcm9vdCwgJ2RheScpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICB0aGlzLmV2ZW50LmRheVN0YXJ0X2NvcnJlY3QgPSBtb21lbnQodGVtcFN0YXJ0KS5pc1ZhbGlkKCkgPyBtb21lbnQodGVtcFN0YXJ0KS5mb3JtYXQoJ0hIOm1tJykgOiAnJztcclxuICAgICAgdGhpcy5ldmVudC5kYXlFbmRfY29ycmVjdCA9IG1vbWVudCh0ZW1wRW5kKS5pc1ZhbGlkKCkgPyBtb21lbnQodGVtcEVuZCkuZm9ybWF0KCdISDptbScpIDogJyc7XHJcbiAgICAgIHRoaXMuZXZlbnQuc3RhcnQgPSBtb21lbnQobmV4dERheSkuYWRkKDcgKiByb290LCAnZGF5JykuZm9ybWF0KCdZWVlZLU1NLUREJykgKyAnICcgKyB0aGlzLmV2ZW50LmRheVN0YXJ0X2NvcnJlY3Q7XHJcbiAgICAgIHRoaXMuZXZlbnQuZW5kID0gbW9tZW50KG5leHREYXkpLmFkZCg3ICogcm9vdCwgJ2RheScpLmZvcm1hdCgnWVlZWS1NTS1ERCcpICsgJyAnICsgdGhpcy5ldmVudC5kYXlFbmRfY29ycmVjdDtcclxuICAgICAgdGhpcy5ldmVudHMucHVzaCh0aGlzLmV2ZW50KTtcclxuICAgICAgcm9vdCsrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2F2ZUV2ZW50KCkge1xyXG4gICAgaWYgKHRoaXMuZXZlbnQudHlwZSA9PT0gJ2FkZCcpIHtcclxuXHJcbiAgICAgIGxldCBtb21lbnRJbmRleCA9IC0xO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMud2Vla0RheXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoaSA9PT0gbW9tZW50KHRoaXMuZXZlbnQudGl0bGUpLmlzb1dlZWtkYXkoKSkge1xyXG4gICAgICAgICAgbW9tZW50SW5kZXggPSBpIC0gMTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5ldmVudC53ZWVrZGF5ID0gdGhpcy53ZWVrRGF5c1ttb21lbnRJbmRleF07XHJcbiAgICAgIHRoaXMuZXZlbnQuaWQgPSB0aGlzLmlkR2VuKys7ICAvLyB0aXRsZSwgaWQgLCB3ZWVrZGF5LGRheVN0YXJ0LGRheUVuXHJcbiAgICAgIHRoaXMuZXZlbnQuZGF5U3RhcnRfY29ycmVjdCA9IG1vbWVudCh0aGlzLmV2ZW50LmRheVN0YXJ0KS5pc1ZhbGlkKCkgPyBtb21lbnQodGhpcy5ldmVudC5kYXlTdGFydCkuZm9ybWF0KCdISDptbScpIDogJyc7XHJcbiAgICAgIHRoaXMuZXZlbnQuZGF5RW5kX2NvcnJlY3QgPSBtb21lbnQodGhpcy5ldmVudC5kYXlFbmQpLmlzVmFsaWQoKSA/IG1vbWVudCh0aGlzLmV2ZW50LmRheUVuZCkuZm9ybWF0KCdISDptbScpIDogJyc7XHJcbiAgICAgIHRoaXMuZXZlbnQuc3RhcnQgPSB0aGlzLmV2ZW50LnRpdGxlICsgJyAnICsgdGhpcy5ldmVudC5kYXlTdGFydF9jb3JyZWN0O1xyXG4gICAgICB0aGlzLmV2ZW50LmVuZCA9IHRoaXMuZXZlbnQudGl0bGUgKyAnICcgKyB0aGlzLmV2ZW50LmRheUVuZF9jb3JyZWN0O1xyXG4gICAgICBpZiAodGhpcy5jaGVja0V4aXN0KHRoaXMuZXZlbnQudGl0bGUpKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudHMucHVzaCh0aGlzLmV2ZW50KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydCgnZXZlbnQgZXhpc3QnKTtcclxuICAgICAgfVxyXG5cclxuICAgIH0gZWxzZSBpZiAodGhpcy5ldmVudC50eXBlID09PSAnZWRpdCcpIHtcclxuXHJcbiAgICAgIGlmICh0aGlzLmV2ZW50LmlkKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudC5kYXlTdGFydF9jb3JyZWN0ID0gbW9tZW50KHRoaXMuZXZlbnQuZGF5U3RhcnQpLmlzVmFsaWQoKSA/IG1vbWVudCh0aGlzLmV2ZW50LmRheVN0YXJ0KS5mb3JtYXQoJ0hIOm1tJykgOiAnJztcclxuICAgICAgICB0aGlzLmV2ZW50LmRheUVuZF9jb3JyZWN0ID0gbW9tZW50KHRoaXMuZXZlbnQuZGF5RW5kKS5pc1ZhbGlkKCkgPyBtb21lbnQodGhpcy5ldmVudC5kYXlFbmQpLmZvcm1hdCgnSEg6bW0nKSA6ICcnO1xyXG4gICAgICAgIHRoaXMuZXZlbnQuc3RhcnQgPSB0aGlzLmV2ZW50LnRpdGxlICsgJyAnICsgdGhpcy5ldmVudC5kYXlTdGFydF9jb3JyZWN0O1xyXG4gICAgICAgIHRoaXMuZXZlbnQuZW5kID0gdGhpcy5ldmVudC50aXRsZSArICcgJyArIHRoaXMuZXZlbnQuZGF5RW5kX2NvcnJlY3Q7XHJcblxyXG4gICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gdGhpcy5maW5kRXZlbnRJbmRleEJ5SWQodGhpcy5ldmVudC5pZCk7XHJcblxyXG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLmV2ZW50c1tpbmRleF0gPSB0aGlzLmV2ZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLmV2ZW50LnR5cGUgPT09ICdiYXRjaEdlbicpIHtcclxuXHJcbiAgICAgIHRoaXMuZ2VuZXJhdGVEYXlzKHRoaXMud2Vla0RheSwgdGhpcy5jb3Vyc2UuY291cnNlU3RhcnQsIHRoaXMuY291cnNlLmNvdXJzZUVuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kaWFsb2dWaXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLmV2ZW50ID0gbnVsbDtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUV2ZW50KCkge1xyXG4gICAgbGV0IGluZGV4OiBudW1iZXIgPSB0aGlzLmZpbmRFdmVudEluZGV4QnlJZCh0aGlzLmV2ZW50LmlkKTtcclxuICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgIHRoaXMuZXZlbnRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmRpYWxvZ1Zpc2libGUgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZpbmRFdmVudEluZGV4QnlJZChpZDogbnVtYmVyKSB7XHJcbiAgICBsZXQgaW5kZXggPSAtMTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ldmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGlkID09PSB0aGlzLmV2ZW50c1tpXS5pZCkge1xyXG4gICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGluZGV4O1xyXG4gIH1cclxuXHJcbiAgLy8gZXZlbnQgaGFuZGxlciBmb3IgZXZlbnQgY2xpY2tcclxuICBoYW5kbGVFdmVudENsaWNrKGUpIHtcclxuICAgIHRoaXMuZXZlbnQgPSBuZXcgTXlFdmVudCgpO1xyXG4gICAgdGhpcy5ldmVudC50eXBlID0gJ2VkaXQnO1xyXG4gICAgdGhpcy5ldmVudC50aXRsZSA9IGUuY2FsRXZlbnQudGl0bGU7XHJcbiAgICB0aGlzLmV2ZW50LmRheVN0YXJ0ID0gZS5jYWxFdmVudC5kYXlTdGFydDtcclxuICAgIHRoaXMuZXZlbnQuZGF5RW5kID0gZS5jYWxFdmVudC5kYXlFbmQ7XHJcbiAgICB0aGlzLmV2ZW50LnN0YXJ0ID0gZS5jYWxFdmVudC5zdGFydDtcclxuICAgIHRoaXMuZXZlbnQuZW5kID0gZS5jYWxFdmVudC5lbmQ7XHJcbiAgICB0aGlzLmV2ZW50LmlkID0gZS5jYWxFdmVudC5pZDtcclxuICAgIHRoaXMuZXZlbnQud2Vla2RheSA9IGUuY2FsRXZlbnQud2Vla2RheTtcclxuICAgIHRoaXMuZGlhbG9nVmlzaWJsZSA9IHRydWU7XHJcbiAgICAvLyB0aGlzLmV2ZW50cyA9IHRoaXMuZXZlbnRzLmZpbHRlcihyZXN1bHQgPT4gcmVzdWx0ICE9PSBldmVudCApO1xyXG4gIH1cclxuXHJcbiAgLy8gZXZlbnQgaGFuZGxlciBmb3IgZGF5IGNsaWNrXHJcbiAgaGFuZGxlRGF5Q2xpY2soZSkge1xyXG4gICAgbGV0IGRhdGUgPSBlLmRhdGUuZm9ybWF0KCk7XHJcbiAgICB0aGlzLmV2ZW50ID0gbmV3IE15RXZlbnQoKTtcclxuICAgIHRoaXMuZXZlbnQudGl0bGUgPSBkYXRlO1xyXG4gICAgdGhpcy5ldmVudC50eXBlID0gXCJhZGRcIjtcclxuICAgIHRoaXMuZGlhbG9nVmlzaWJsZSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBjaGVja0V4aXN0KGRhdGUpIHtcclxuICAgIGxldCBuZGF0ZSA9IHRoaXMuZXZlbnRzLmZpbHRlcihyZXN1bHQgPT4gcmVzdWx0LnN0YXJ0ID09PSBkYXRlKTtcclxuICAgIGlmIChuZGF0ZS5sZW5ndGggPT09IDEpIHsgLy8gaWYgZm91bmQgZXZlbnQgZXhpc3QgdGhlbiByZXR1cm4gZmFsc2UgdG8gcHJldmVudCBuZXcgYXJyeS5wdXNoXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3Vic2NyaWJlQ291cnNlKCkge1xyXG4gICAgdGhpcy5zdWIgPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgdGhpcy5pZCA9IHBhcmFtc1snaWQnXTtcclxuICAgICAgaWYgKHRoaXMuaWQgPT09ICduZXcnKSB7XHJcbiAgICAgICAgdGhpcy5uZXdDb3Vyc2UgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY291cnNlID0gbmV3IENvdXJzZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubmV3Q291cnNlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb3Vyc2VTZXJ2aWNlLmdldENvdXJzZSh0aGlzLmlkKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICBpdGVtLmNvdXJzZVN0YXJ0ID0gbW9tZW50KGl0ZW0uY291cnNlU3RhcnQpLmlzVmFsaWQoKSA/IG1vbWVudChpdGVtLmNvdXJzZVN0YXJ0KS5hZGQoMSwgJ2RheScpLmZvcm1hdCgnWVlZWS1NTS1ERCAnKSA6ICcnO1xyXG4gICAgICAgICAgICAgIGl0ZW0uY291cnNlRW5kID0gbW9tZW50KGl0ZW0uY291cnNlRW5kKS5pc1ZhbGlkKCkgPyBtb21lbnQoaXRlbS5jb3Vyc2VFbmQpLmFkZCgxLCAnZGF5JykuZm9ybWF0KCdZWVlZLU1NLUREJykgOiAnJztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY291cnNlID0gcmVzdWx0WzBdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb3Vyc2UuY2xhc3NUaW1lU3RyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5ldmVudHMgPSB0aGlzLmRldGFjaENvdXJzZVN0cih0aGlzLmNvdXJzZS5jbGFzc1RpbWVTdHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZGV0YWNoQ291cnNlU3RyKHN0cikgeyAvLyB0ZW1wIHNvbHV0aW9uXHJcbiAgICBsZXQgbXlFdmVudHMgPSBbXTtcclxuICAgIGxldCBzdHJBcnJ5ID0gc3RyLnNwbGl0KCcsJyk7XHJcbiAgICBzdHJBcnJ5LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgIGxldCBteUV2ZW50ID0gbmV3IE15RXZlbnQoKTtcclxuICAgICAgbXlFdmVudC50aXRsZSA9IGVsZW1lbnQuc3BsaXQoJyAnKVswXTtcclxuICAgICAgbXlFdmVudC5pZCA9IHRoaXMuaWRHZW4rKztcclxuICAgICAgbXlFdmVudC53ZWVrZGF5ID0gdGhpcy53ZWVrRGF5c1ttb21lbnQobXlFdmVudC50aXRsZSkuaXNvV2Vla2RheSgpIC0gMV07XHJcbiAgICAgIG15RXZlbnQuZGF5U3RhcnRfY29ycmVjdCA9IGVsZW1lbnQuc3BsaXQoJyAnKVsxXS5zcGxpdCgnLScpWzBdO1xyXG4gICAgICBteUV2ZW50LmRheUVuZF9jb3JyZWN0ID0gZWxlbWVudC5zcGxpdCgnICcpWzFdLnNwbGl0KCctJylbMV07XHJcbiAgICAgIG15RXZlbnQuc3RhcnQgPSBlbGVtZW50LnNwbGl0KCcgJylbMF0gKyAnICcgKyBteUV2ZW50LmRheVN0YXJ0X2NvcnJlY3Q7XHJcbiAgICAgIG15RXZlbnQuZW5kID0gZWxlbWVudC5zcGxpdCgnICcpWzBdICsgJyAnICsgbXlFdmVudC5kYXlFbmRfY29ycmVjdDtcclxuICAgICAgbXlFdmVudC5kYXlTdGFydCA9IG1vbWVudChteUV2ZW50LnN0YXJ0KS5pc1ZhbGlkKCkgPyBtb21lbnQobXlFdmVudC5zdGFydCkuZm9ybWF0KCkgOiAnJztcclxuICAgICAgbXlFdmVudC5kYXlFbmQgPSBtb21lbnQobXlFdmVudC5lbmQpLmlzVmFsaWQoKSA/IG1vbWVudChteUV2ZW50LmVuZCkuZm9ybWF0KCkgOiAnJztcclxuICAgICAgbXlFdmVudC5hbGxEYXkgPSBmYWxzZTtcclxuICAgICAgbXlFdmVudHMucHVzaChteUV2ZW50KTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG15RXZlbnRzO1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVDbGFzc1RpbWVTdHIoKSB7XHJcbiAgICBsZXQgc3RyID0gJycsIHRlbXBTdGFydCwgdGVtcEVuZCwgdGVtcERhdGU7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZXZlbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRlbXBEYXRlID0gdGhpcy5ldmVudHNbaV0udGl0bGU7XHJcbiAgICAgIHRlbXBTdGFydCA9IHRoaXMuZXZlbnRzW2ldLmRheVN0YXJ0X2NvcnJlY3Q7XHJcbiAgICAgIHRlbXBFbmQgPSB0aGlzLmV2ZW50c1tpXS5kYXlFbmRfY29ycmVjdDtcclxuICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICBzdHIgKz0gYCR7dGVtcERhdGV9ICR7dGVtcFN0YXJ0fS0ke3RlbXBFbmR9YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzdHIgKz0gYCwke3RlbXBEYXRlfSAke3RlbXBTdGFydH0tJHt0ZW1wRW5kfWA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzdHI7XHJcbiAgfVxyXG5cclxuICBzYXZlKCkge1xyXG4gICAgdGhpcy5jb3Vyc2UuY2xhc3NUaW1lU3RyID0gdGhpcy5nZW5lcmF0ZUNsYXNzVGltZVN0cigpO1xyXG4gICAgaWYgKCF0aGlzLmNvdXJzZS5jb3Vyc2VOYW1lXHJcbiAgICAgIHx8ICF0aGlzLmNvdXJzZS5jb3Vyc2VTdGFydFxyXG4gICAgICB8fCAhdGhpcy5jb3Vyc2UuY291cnNlRW5kXHJcbiAgICAgIHx8ICF0aGlzLmNvdXJzZS5wcm9mZXNzb3JJZFxyXG4gICAgICB8fCAhdGhpcy5jb3Vyc2UuY2FtcHVzSWRcclxuICAgICAgfHwgIXRoaXMuY291cnNlLmNsYXNzcm9vbVxyXG4gICAgICB8fCAhdGhpcy5jb3Vyc2UuY2xhc3NUaW1lU3RyXHJcbiAgICAgIHx8ICF0aGlzLmNvdXJzZS5jb3Vyc2VUeXBlKSB7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgJ0Zvcm0gSW5jb21wbGV0ZScsXHJcbiAgICAgICAgJ1BsZWFzZSBmaWxsIG91dCBhbGwgZmllbGRzIGluIHRoZSBmb3JtLicsXHJcbiAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyoqKiogbmVlZCB2YWxpZGF0aW9uXHJcbiAgICAgIGlmICh0aGlzLmlkID09PSAnbmV3Jykge1xyXG4gICAgICAgIHRoaXMuY291cnNlU2VydmljZVxyXG4gICAgICAgICAgLmNyZWF0ZSh0aGlzLmNvdXJzZSlcclxuICAgICAgICAgIC50aGVuKGNvdXJzZSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgoY291cnNlIGFzIGFueSkucmVzdWx0ID09PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KGNvdXJzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGNvdXJzZSBhcyBhbnkpLnJlc3VsdCA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgKGNvdXJzZSBhcyBhbnkpLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgKGNvdXJzZSBhcyBhbnkpLm1zZyxcclxuICAgICAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgdGhpcy5nb0JhY2soKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTsgLy8gVE9ETzogRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jb3Vyc2VTZXJ2aWNlXHJcbiAgICAgICAgICAudXBkYXRlKHRoaXMuY291cnNlKVxyXG4gICAgICAgICAgLnRoZW4oY291cnNlID0+IHtcclxuICAgICAgICAgICAgaWYgKChjb3Vyc2UgYXMgYW55KS5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoY291cnNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgoY291cnNlIGFzIGFueSkucmVzdWx0ID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAoY291cnNlIGFzIGFueSkudGl0bGUsXHJcbiAgICAgICAgICAgICAgICAoY291cnNlIGFzIGFueSkubXNnLFxyXG4gICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB0aGlzLmdvQmFjaygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpOyAvLyBUT0RPOiBEaXNwbGF5IGVycm9yIG1lc3NhZ2VcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRpc3BsYXlFcnJvckFsZXJ0KGVycm9yKSB7XHJcbiAgICBpZiAoZXJyb3IudGl0bGUgPT09IFwiQXV0aCBFcnJvclwiKSB7XHJcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xyXG4gICAgICBzd2FsKFxyXG4gICAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICAgIGVycm9yLm1zZyxcclxuICAgICAgICAnaW5mbydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgICAgZXJyb3IubXNnLFxyXG4gICAgICAgICdlcnJvcidcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNeUV2ZW50IHtcclxuICBpZDogbnVtYmVyO1xyXG4gIHR5cGU6IHN0cmluZztcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGRheVN0YXJ0OiBzdHJpbmc7XHJcbiAgZGF5RW5kOiBzdHJpbmc7XHJcbiAgZGF5U3RhcnRfY29ycmVjdDogc3RyaW5nO1xyXG4gIGRheUVuZF9jb3JyZWN0OiBzdHJpbmc7XHJcbiAgc3RhcnQ6IHN0cmluZztcclxuICBlbmQ6IHN0cmluZztcclxuICB3ZWVrZGF5OiBzdHJpbmc7XHJcbiAgYWxsRGF5OiBib29sZWFuO1xyXG59XHJcbiJdfQ==
