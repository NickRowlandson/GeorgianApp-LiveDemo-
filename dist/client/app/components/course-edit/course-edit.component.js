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
    }
    CourseEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['id'];
            if (id === 'new') {
                _this.newCourse = true;
                _this.course = new Course_1.Course();
            }
            else {
                _this.newCourse = false;
                _this.courseService
                    .getCourse(id)
                    .then(function (course) {
                    _this.course = course[0];
                });
            }
        });
    };
    CourseEditComponent.prototype.save = function () {
        var _this = this;
        this.courseService
            .save(this.course)
            .then(function (course) {
            _this.course = course; // saved user, w/ id if new
            _this.goBack();
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    CourseEditComponent.prototype.goBack = function () {
        window.history.back();
    };
    return CourseEditComponent;
}());
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUQ7QUFDekQsOENBQTZDO0FBQzdDLDBDQUF5RDtBQUN6RCxnRUFBOEQ7QUFROUQsSUFBYSxtQkFBbUI7SUFPOUIsNkJBQW9CLGFBQTRCLEVBQVUsS0FBcUI7UUFBM0Qsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUwvRSxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLGNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyx5QkFBeUI7SUFLNUMsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFBQSxpQkFlQztRQWRDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQWM7WUFDdkMsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDdEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO1lBQzdCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDdkIsS0FBSSxDQUFDLGFBQWE7cUJBQ2pCLFNBQVMsQ0FBQyxFQUFFLENBQUM7cUJBQ2IsSUFBSSxDQUFDLFVBQUEsTUFBTTtvQkFDVixLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsa0NBQUksR0FBSjtRQUFBLGlCQVFDO1FBUEMsSUFBSSxDQUFDLGFBQWE7YUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUNqQixJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1YsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQywyQkFBMkI7WUFDakQsS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFsQixDQUFrQixDQUFDLENBQUMsQ0FBQyw4QkFBOEI7SUFDdkUsQ0FBQztJQUVELG9DQUFNLEdBQU47UUFDRSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFDSCwwQkFBQztBQUFELENBekNBLEFBeUNDLElBQUE7QUF4Q1U7SUFBUixZQUFLLEVBQUU7OEJBQVMsZUFBTTttREFBQztBQURiLG1CQUFtQjtJQU4vQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGFBQWE7UUFDdkIsV0FBVyxFQUFFLHlEQUF5RDtRQUN0RSxTQUFTLEVBQUUsQ0FBQyx3REFBd0QsQ0FBQztLQUN0RSxDQUFDO3FDQVNtQyw4QkFBYSxFQUFpQix1QkFBYztHQVBwRSxtQkFBbUIsQ0F5Qy9CO0FBekNZLGtEQUFtQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9Db3Vyc2VcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291cnNlLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnY291cnNlLWVkaXQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvY291cnNlLWVkaXQvY291cnNlLWVkaXQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQ291cnNlRWRpdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgY291cnNlOiBDb3Vyc2U7XHJcbiAgbmV3Q291cnNlID0gZmFsc2U7XHJcbiAgZXJyb3I6IGFueTtcclxuICBuYXZpZ2F0ZWQgPSBmYWxzZTsgLy8gdHJ1ZSBpZiBuYXZpZ2F0ZWQgaGVyZVxyXG5cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb3Vyc2VTZXJ2aWNlOiBDb3Vyc2VTZXJ2aWNlLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5yb3V0ZS5wYXJhbXMuZm9yRWFjaCgocGFyYW1zOiBQYXJhbXMpID0+IHtcclxuICAgICAgbGV0IGlkID0gcGFyYW1zWydpZCddO1xyXG4gICAgICBpZiAoaWQgPT09ICduZXcnKSB7XHJcbiAgICAgICAgdGhpcy5uZXdDb3Vyc2UgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY291cnNlID0gbmV3IENvdXJzZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubmV3Q291cnNlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb3Vyc2VTZXJ2aWNlXHJcbiAgICAgICAgLmdldENvdXJzZShpZClcclxuICAgICAgICAudGhlbihjb3Vyc2UgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jb3Vyc2UgPSBjb3Vyc2VbMF07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2F2ZSgpIHtcclxuICAgIHRoaXMuY291cnNlU2VydmljZVxyXG4gICAgICAuc2F2ZSh0aGlzLmNvdXJzZSlcclxuICAgICAgLnRoZW4oY291cnNlID0+IHtcclxuICAgICAgICB0aGlzLmNvdXJzZSA9IGNvdXJzZTsgLy8gc2F2ZWQgdXNlciwgdy8gaWQgaWYgbmV3XHJcbiAgICAgICAgdGhpcy5nb0JhY2soKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7IC8vIFRPRE86IERpc3BsYXkgZXJyb3IgbWVzc2FnZVxyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=
