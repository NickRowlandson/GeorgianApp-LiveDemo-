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
var CourseEditComponent = (function () {
    function CourseEditComponent(courseService, route) {
        this.courseService = courseService;
        this.route = route;
        this.newCourse = false;
        this.navigated = false; // true if navigated here
        this.events = [];
        this.selectedDays = [];
        this.datepickerOpts = {
            startDate: moment(),
            autoclose: true,
            todayBtn: 'linked',
            todayHighlight: true,
            assumeNearbyYear: true,
            format: 'YYYY-MM-DD'
        };
        // drop down
        this.professors = [];
        this.campuses = [];
        this.daysOfWeek = [{ label: 'Monday', value: 'Monday' },
            { label: 'Tuesday', value: 'Tuesday' },
            { label: 'Wednesday', value: 'Wednesday' },
            { label: 'Thursday', value: 'Thursday' },
            { label: 'Friday', value: 'Friday' }];
    }
    CourseEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscribeCourse();
        // get professors
        this.courseService.getProfessors().then(function (result) {
            result.forEach(function (i) {
                _this.professors.push({
                    label: i.professorName,
                    value: i.userID
                });
            });
        });
        // get campuses
        this.courseService.getCampuses().then(function (result) {
            result.forEach(function (i) {
                _this.campuses.push({
                    label: i.campusName,
                    value: i.campusId
                });
            });
        });
        //
        // this.route.params.forEach((params: Params) => {
        //   let id = params['id'];
        //   if (id === 'new') {
        //     this.newCourse = true;
        //     this.course = new Course();
        //   } else {
        //     this.newCourse = false;
        //     this.courseService
        //       .getCourse(id)
        //       .then(result => {
        //         // this.course = course[0];
        //       console.log(result);
        //         this.course= result;
        //         // console.log(this.course)
        //       });
        //   }
        // });
        this.header = {
            left: 'prev',
            center: 'title',
            right: 'next'
        };
        this.options = {
            prev: 'circle-triangle-w',
            defaultView: "month",
            //minTime: "06:00:00",
            //maxTime: "22:00:00",
            height: "auto"
        };
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
                    result.forEach(function (item) {
                        item.courseStart = moment(item.courseStart).format('DD/MM/YYYY');
                        item.courseEnd = moment(item.courseEnd).format('DD/MM/YYYY');
                        item.classStartTime = moment(item.classStartTime).format('hh:mm A');
                        item.classEndTime = moment(item.classEndTime).format('hh:mm A');
                    });
                    _this.course = result[0];
                    console.log(_this.course);
                });
            }
        });
    };
    CourseEditComponent.prototype.save = function () {
        var _this = this;
        // **** need validation
        this.courseService
            .save(this.course)
            .then(function (course) {
            _this.course = course; // saved user, w/ id if new
            _this.goBack();
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    CourseEditComponent.prototype.handleDateFromChange = function (e) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUQ7QUFDekQsOENBQTZDO0FBQzdDLDBDQUF5RDtBQUN6RCxnRUFBOEQ7QUFTOUQ7SUE4QkksNkJBQW9CLGFBQTRCLEVBQVUsS0FBcUI7UUFBM0Qsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQTVCL0UsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQixjQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMseUJBQXlCO1FBRzVDLFdBQU0sR0FBVSxFQUFFLENBQUM7UUFHbkIsaUJBQVksR0FBYSxFQUFFLENBQUM7UUFFNUIsbUJBQWMsR0FBUTtZQUNsQixTQUFTLEVBQUUsTUFBTSxFQUFFO1lBQ25CLFNBQVMsRUFBRSxJQUFJO1lBQ2YsUUFBUSxFQUFFLFFBQVE7WUFDbEIsY0FBYyxFQUFFLElBQUk7WUFDcEIsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixNQUFNLEVBQUUsWUFBWTtTQUN2QixDQUFDO1FBQ0YsWUFBWTtRQUNaLGVBQVUsR0FBaUIsRUFBRSxDQUFDO1FBQzlCLGFBQVEsR0FBaUIsRUFBRSxDQUFDO1FBQzVCLGVBQVUsR0FBaUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtZQUM1RCxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRTtZQUN0QyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtZQUMxQyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtZQUN4QyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFLMUMsQ0FB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O0NBdklELEFBdUlDLElBQUE7QUF2SVksa0RBQW1CIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2NvdXJzZS1lZGl0L2NvdXJzZS1lZGl0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL0NvdXJzZVwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ291cnNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3Vyc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuZGVjbGFyZSB2YXIgbW9tZW50O1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnY291cnNlLWVkaXQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2NvdXJzZS1lZGl0L2NvdXJzZS1lZGl0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL2NvdXJzZS1lZGl0L2NvdXJzZS1lZGl0LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIENvdXJzZUVkaXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgY291cnNlOiBDb3Vyc2U7XHJcbiAgICBuZXdDb3Vyc2UgPSBmYWxzZTtcclxuICAgIGVycm9yOiBhbnk7XHJcbiAgICBuYXZpZ2F0ZWQgPSBmYWxzZTsgLy8gdHJ1ZSBpZiBuYXZpZ2F0ZWQgaGVyZVxyXG4gICAgcHJpdmF0ZSBzdWI6IGFueTtcclxuICAgIGlkOiBhbnk7XHJcbiAgICBldmVudHM6IGFueVtdID0gW107XHJcbiAgICBoZWFkZXI6IGFueTtcclxuICAgIG9wdGlvbnM6IGFueTtcclxuICAgIHNlbGVjdGVkRGF5czogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICBkYXRlcGlja2VyT3B0czogYW55ID0ge1xyXG4gICAgICAgIHN0YXJ0RGF0ZTogbW9tZW50KCksXHJcbiAgICAgICAgYXV0b2Nsb3NlOiB0cnVlLFxyXG4gICAgICAgIHRvZGF5QnRuOiAnbGlua2VkJyxcclxuICAgICAgICB0b2RheUhpZ2hsaWdodDogdHJ1ZSxcclxuICAgICAgICBhc3N1bWVOZWFyYnlZZWFyOiB0cnVlLFxyXG4gICAgICAgIGZvcm1hdDogJ1lZWVktTU0tREQnXHJcbiAgICB9O1xyXG4gICAgLy8gZHJvcCBkb3duXHJcbiAgICBwcm9mZXNzb3JzOiBTZWxlY3RJdGVtW10gPSBbXTtcclxuICAgIGNhbXB1c2VzOiBTZWxlY3RJdGVtW10gPSBbXTtcclxuICAgIGRheXNPZldlZWs6IFNlbGVjdEl0ZW1bXSA9IFt7IGxhYmVsOiAnTW9uZGF5JywgdmFsdWU6ICdNb25kYXknIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ1R1ZXNkYXknLCB2YWx1ZTogJ1R1ZXNkYXknIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ1dlZG5lc2RheScsIHZhbHVlOiAnV2VkbmVzZGF5JyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdUaHVyc2RheScsIHZhbHVlOiAnVGh1cnNkYXknIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ0ZyaWRheScsIHZhbHVlOiAnRnJpZGF5JyB9XTtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb3Vyc2VTZXJ2aWNlOiBDb3Vyc2VTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZUNvdXJzZSgpO1xyXG5cclxuICAgICAgICAvLyBnZXQgcHJvZmVzc29yc1xyXG4gICAgICAgIHRoaXMuY291cnNlU2VydmljZS5nZXRQcm9mZXNzb3JzKCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKChpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Zlc3NvcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGkucHJvZmVzc29yTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogaS51c2VySURcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBnZXQgY2FtcHVzZXNcclxuICAgICAgICB0aGlzLmNvdXJzZVNlcnZpY2UuZ2V0Q2FtcHVzZXMoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgcmVzdWx0LmZvckVhY2goKGkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FtcHVzZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGkuY2FtcHVzTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogaS5jYW1wdXNJZFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIHRoaXMucm91dGUucGFyYW1zLmZvckVhY2goKHBhcmFtczogUGFyYW1zKSA9PiB7XHJcbiAgICAgICAgLy8gICBsZXQgaWQgPSBwYXJhbXNbJ2lkJ107XHJcbiAgICAgICAgLy8gICBpZiAoaWQgPT09ICduZXcnKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubmV3Q291cnNlID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgdGhpcy5jb3Vyc2UgPSBuZXcgQ291cnNlKCk7XHJcbiAgICAgICAgLy8gICB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICB0aGlzLm5ld0NvdXJzZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmNvdXJzZVNlcnZpY2VcclxuICAgICAgICAvLyAgICAgICAuZ2V0Q291cnNlKGlkKVxyXG4gICAgICAgIC8vICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAvLyB0aGlzLmNvdXJzZSA9IGNvdXJzZVswXTtcclxuICAgICAgICAvLyAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5jb3Vyc2U9IHJlc3VsdDtcclxuICAgICAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY291cnNlKVxyXG4gICAgICAgIC8vICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgfVxyXG4gICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmhlYWRlciA9IHtcclxuICAgICAgICAgICAgbGVmdDogJ3ByZXYnLFxyXG4gICAgICAgICAgICBjZW50ZXI6ICd0aXRsZScsXHJcbiAgICAgICAgICAgIHJpZ2h0OiAnbmV4dCdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHByZXY6ICdjaXJjbGUtdHJpYW5nbGUtdycsXHJcbiAgICAgICAgICAgIGRlZmF1bHRWaWV3OiBcIm1vbnRoXCIsXHJcbiAgICAgICAgICAgIC8vbWluVGltZTogXCIwNjowMDowMFwiLFxyXG4gICAgICAgICAgICAvL21heFRpbWU6IFwiMjI6MDA6MDBcIixcclxuICAgICAgICAgICAgaGVpZ2h0OiBcImF1dG9cIlxyXG4gICAgICAgIH07XHJcblxyXG5cclxuXHJcbiAgICB9XHJcbiAgICBzdWJzY3JpYmVDb3Vyc2UoKSB7XHJcbiAgICAgICAgdGhpcy5zdWIgPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pZCA9IHBhcmFtc1snaWQnXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaWQgPT09ICduZXcnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld0NvdXJzZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZSA9IG5ldyBDb3Vyc2UoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV3Q291cnNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZVNlcnZpY2UuZ2V0Q291cnNlKHRoaXMuaWQpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY291cnNlU3RhcnQgPSBtb21lbnQoaXRlbS5jb3Vyc2VTdGFydCkuZm9ybWF0KCdERC9NTS9ZWVlZJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY291cnNlRW5kID0gbW9tZW50KGl0ZW0uY291cnNlRW5kKS5mb3JtYXQoJ0REL01NL1lZWVknKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc1N0YXJ0VGltZSA9IG1vbWVudChpdGVtLmNsYXNzU3RhcnRUaW1lKS5mb3JtYXQoJ2hoOm1tIEEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0VuZFRpbWUgPSBtb21lbnQoaXRlbS5jbGFzc0VuZFRpbWUpLmZvcm1hdCgnaGg6bW0gQScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY291cnNlID0gcmVzdWx0WzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY291cnNlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZSgpIHtcclxuICAgICAgICAvLyAqKioqIG5lZWQgdmFsaWRhdGlvblxyXG4gICAgICAgIHRoaXMuY291cnNlU2VydmljZVxyXG4gICAgICAgICAgICAuc2F2ZSh0aGlzLmNvdXJzZSlcclxuICAgICAgICAgICAgLnRoZW4oY291cnNlID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY291cnNlID0gY291cnNlOyAvLyBzYXZlZCB1c2VyLCB3LyBpZCBpZiBuZXdcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29CYWNrKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpOyAvLyBUT0RPOiBEaXNwbGF5IGVycm9yIG1lc3NhZ2VcclxuICAgIH1cclxuICAgIGhhbmRsZURhdGVGcm9tQ2hhbmdlKGUpIHtcclxuXHJcbiAgICB9XHJcbiAgICBnb0JhY2soKSB7XHJcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbn1cclxuIl19
