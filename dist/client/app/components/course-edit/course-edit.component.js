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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUQ7QUFDekQsOENBQTZDO0FBQzdDLDBDQUF5RDtBQUN6RCxnRUFBOEQ7QUFTOUQ7SUFxQkksNkJBQW9CLGFBQTRCLEVBQVUsS0FBcUI7UUFBM0Qsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQW5CL0UsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQixjQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMseUJBQXlCO1FBRzVDLG1CQUFjLEdBQVE7WUFDbEIsU0FBUyxFQUFFLE1BQU0sRUFBRTtZQUNuQixTQUFTLEVBQUUsSUFBSTtZQUNmLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsTUFBTSxFQUFFLFlBQVk7U0FDdkIsQ0FBQztRQUVGLFlBQVk7UUFDWixlQUFVLEdBQWlCLEVBQUUsQ0FBQztRQUM5QixhQUFRLEdBQWlCLEVBQUUsQ0FBQztJQUs1QixDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUFBLGlCQXdDQztRQXZDRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdkIsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTTtZQUMzQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQztnQkFDYixLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztvQkFDakIsS0FBSyxFQUFFLENBQUMsQ0FBQyxhQUFhO29CQUN0QixLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU07aUJBQ2xCLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxl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aXQvY291cnNlLWVkaXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvQ291cnNlXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb3Vyc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5kZWNsYXJlIHZhciBtb21lbnQ7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdjb3Vyc2UtZWRpdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvY291cnNlLWVkaXQvY291cnNlLWVkaXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvY291cnNlLWVkaXQvY291cnNlLWVkaXQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQ291cnNlRWRpdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSBjb3Vyc2U6IENvdXJzZTtcclxuICAgIG5ld0NvdXJzZSA9IGZhbHNlO1xyXG4gICAgZXJyb3I6IGFueTtcclxuICAgIG5hdmlnYXRlZCA9IGZhbHNlOyAvLyB0cnVlIGlmIG5hdmlnYXRlZCBoZXJlXHJcbiAgICBwcml2YXRlIHN1YjogYW55O1xyXG4gICAgaWQ6IGFueTtcclxuICAgIGRhdGVwaWNrZXJPcHRzOiBhbnkgPSB7XHJcbiAgICAgICAgc3RhcnREYXRlOiBtb21lbnQoKSxcclxuICAgICAgICBhdXRvY2xvc2U6IHRydWUsXHJcbiAgICAgICAgdG9kYXlCdG46ICdsaW5rZWQnLFxyXG4gICAgICAgIHRvZGF5SGlnaGxpZ2h0OiB0cnVlLFxyXG4gICAgICAgIGFzc3VtZU5lYXJieVllYXI6IHRydWUsXHJcbiAgICAgICAgZm9ybWF0OiAnWVlZWS1NTS1ERCdcclxuICAgIH07XHJcblxyXG4gICAgLy8gZHJvcCBkb3duXHJcbiAgICBwcm9mZXNzb3JzOiBTZWxlY3RJdGVtW10gPSBbXTtcclxuICAgIGNhbXB1c2VzOiBTZWxlY3RJdGVtW10gPSBbXTtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb3Vyc2VTZXJ2aWNlOiBDb3Vyc2VTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZUNvdXJzZSgpO1xyXG5cclxuICAgICAgICAvLyBnZXQgcHJvZmVzc29yc1xyXG4gICAgICAgIHRoaXMuY291cnNlU2VydmljZS5nZXRQcm9mZXNzb3JzKCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKChpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Zlc3NvcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGkucHJvZmVzc29yTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogaS51c2VySURcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBnZXQgY2FtcHVzZXNcclxuICAgICAgICB0aGlzLmNvdXJzZVNlcnZpY2UuZ2V0Q2FtcHVzZXMoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgcmVzdWx0LmZvckVhY2goKGkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FtcHVzZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGkuY2FtcHVzTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogaS5jYW1wdXNJZFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIHRoaXMucm91dGUucGFyYW1zLmZvckVhY2goKHBhcmFtczogUGFyYW1zKSA9PiB7XHJcbiAgICAgICAgLy8gICBsZXQgaWQgPSBwYXJhbXNbJ2lkJ107XHJcbiAgICAgICAgLy8gICBpZiAoaWQgPT09ICduZXcnKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubmV3Q291cnNlID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgdGhpcy5jb3Vyc2UgPSBuZXcgQ291cnNlKCk7XHJcbiAgICAgICAgLy8gICB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICB0aGlzLm5ld0NvdXJzZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmNvdXJzZVNlcnZpY2VcclxuICAgICAgICAvLyAgICAgICAuZ2V0Q291cnNlKGlkKVxyXG4gICAgICAgIC8vICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAvLyB0aGlzLmNvdXJzZSA9IGNvdXJzZVswXTtcclxuICAgICAgICAvLyAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5jb3Vyc2U9IHJlc3VsdDtcclxuICAgICAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY291cnNlKVxyXG4gICAgICAgIC8vICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgfVxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgfVxyXG4gICAgc3Vic2NyaWJlQ291cnNlKCkge1xyXG4gICAgICAgIHRoaXMuc3ViID0gdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaWQgPSBwYXJhbXNbJ2lkJ107XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlkID09PSAnbmV3Jykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdDb3Vyc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3Vyc2UgPSBuZXcgQ291cnNlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld0NvdXJzZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3Vyc2VTZXJ2aWNlLmdldENvdXJzZSh0aGlzLmlkKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZSA9IHJlc3VsdFswXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvdXJzZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmUoKSB7XHJcbiAgICAgICAgLy8gKioqKiBuZWVkIHZhbGlkYXRpb25cclxuICAgICAgICB0aGlzLmNvdXJzZVNlcnZpY2VcclxuICAgICAgICAgICAgLnNhdmUodGhpcy5jb3Vyc2UpXHJcbiAgICAgICAgICAgIC50aGVuKGNvdXJzZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZSA9IGNvdXJzZTsgLy8gc2F2ZWQgdXNlciwgdy8gaWQgaWYgbmV3XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvQmFjaygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTsgLy8gVE9ETzogRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbiAgICB9XHJcbiAgICBoYW5kbGVEYXRlRnJvbUNoYW5nZShlKSB7XHJcblxyXG4gICAgfVxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG59XHJcbiJdfQ==
