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
var student_service_1 = require("../../services/student.service");
var course_service_1 = require("../../services/course.service");
var VisviewComponent = (function () {
    function VisviewComponent(studentService, courseService, route) {
        this.studentService = studentService;
        this.courseService = courseService;
        this.route = route;
    }
    VisviewComponent.prototype.ngOnInit = function () {
    };
    VisviewComponent = __decorate([
        core_1.Component({
            selector: 'visview',
            templateUrl: './app/components/visview/visview.component.html',
            styleUrls: ['./app/components/visview/visview.component.css']
        }),
        __metadata("design:paramtypes", [student_service_1.StudentService, course_service_1.CourseService, router_1.ActivatedRoute])
    ], VisviewComponent);
    return VisviewComponent;
}());
exports.VisviewComponent = VisviewComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy92aXN2aWV3L3Zpc3ZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXlEO0FBQ3pELDBDQUF5RDtBQUd6RCxrRUFBZ0U7QUFDaEUsZ0VBQTZEO0FBUzdEO0lBRUksMEJBQW9CLGNBQThCLEVBQVUsYUFBNEIsRUFBVSxLQUFxQjtRQUFuRyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO0lBRXZILENBQUM7SUFFRCxtQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQVJRLGdCQUFnQjtRQVA1QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLGlEQUFpRDtZQUM5RCxTQUFTLEVBQUUsQ0FBQyxnREFBZ0QsQ0FBQztTQUNoRSxDQUFDO3lDQUtzQyxnQ0FBYyxFQUF5Qiw4QkFBYSxFQUFpQix1QkFBYztPQUY5RyxnQkFBZ0IsQ0FVNUI7SUFBRCx1QkFBQztDQVZELEFBVUMsSUFBQTtBQVZZLDRDQUFnQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy92aXN2aWV3L3Zpc3ZpZXcuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvdXJzZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9TdHVkZW50XCI7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb3Vyc2VTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb3Vyc2Uuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndmlzdmlldycsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvdmlzdmlldy92aXN2aWV3LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3Zpc3ZpZXcvdmlzdmlldy5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVmlzdmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsIHByaXZhdGUgY291cnNlU2VydmljZTogQ291cnNlU2VydmljZSwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=
