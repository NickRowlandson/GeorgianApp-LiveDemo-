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
var Student_1 = require("../../models/Student");
var router_1 = require("@angular/router");
var student_service_1 = require("../../services/student.service");
var StudentEditComponent = (function () {
    function StudentEditComponent(studentService, route) {
        this.studentService = studentService;
        this.route = route;
        this.navigated = false; // true if navigated here
    }
    StudentEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['id'];
            _this.studentService.getStudent(id)
                .then(function (student) { return _this.student = student; });
        });
    };
    StudentEditComponent.prototype.save = function () {
        var _this = this;
        this.studentService
            .update(this.student)
            .then(function (student) {
            _this.student = student;
            _this.goBack();
        })
            .catch(function (error) { return _this.error = error; });
    };
    StudentEditComponent.prototype.goBack = function () {
        window.history.back();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Student_1.Student)
    ], StudentEditComponent.prototype, "student", void 0);
    StudentEditComponent = __decorate([
        core_1.Component({
            selector: 'student-edit',
            templateUrl: './app/components/student-edit/student-edit.component.html',
            styleUrls: ['./app/components/student-edit/student-edit.component.css']
        }),
        __metadata("design:paramtypes", [student_service_1.StudentService, router_1.ActivatedRoute])
    ], StudentEditComponent);
    return StudentEditComponent;
}());
exports.StudentEditComponent = StudentEditComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdHVkZW50LWVkaXQvc3R1ZGVudC1lZGl0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCxnREFBK0M7QUFDL0MsMENBQXlEO0FBQ3pELGtFQUFnRTtBQVFoRTtJQU1JLDhCQUFvQixjQUE4QixFQUFVLEtBQXFCO1FBQTdELG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBSGpGLGNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyx5QkFBeUI7SUFLNUMsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFBQSxpQkFNQztRQUxHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQWM7WUFDckMsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztpQkFDN0IsSUFBSSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLEVBQXRCLENBQXNCLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxtQ0FBSSxHQUFKO1FBQUEsaUJBUUM7UUFQRyxJQUFJLENBQUMsY0FBYzthQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ3BCLElBQUksQ0FBQyxVQUFBLE9BQU87WUFDVCxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUN2QixLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQscUNBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQTdCUTtRQUFSLFlBQUssRUFBRTtrQ0FBVSxpQkFBTzt5REFBQztJQURqQixvQkFBb0I7UUFOaEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFdBQVcsRUFBRSwyREFBMkQ7WUFDeEUsU0FBUyxFQUFFLENBQUMsMERBQTBELENBQUM7U0FDMUUsQ0FBQzt5Q0FRc0MsZ0NBQWMsRUFBaUIsdUJBQWM7T0FOeEUsb0JBQW9CLENBK0JoQztJQUFELDJCQUFDO0NBL0JELEFBK0JDLElBQUE7QUEvQlksb0RBQW9CIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3N0dWRlbnQtZWRpdC9zdHVkZW50LWVkaXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL1N0dWRlbnRcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3N0dWRlbnQtZWRpdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvc3R1ZGVudC1lZGl0L3N0dWRlbnQtZWRpdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9zdHVkZW50LWVkaXQvc3R1ZGVudC1lZGl0LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0dWRlbnRFZGl0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBJbnB1dCgpIHN0dWRlbnQ6IFN0dWRlbnQ7XHJcbiAgICBlcnJvcjogYW55O1xyXG4gICAgbmF2aWdhdGVkID0gZmFsc2U7IC8vIHRydWUgaWYgbmF2aWdhdGVkIGhlcmVcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMucm91dGUucGFyYW1zLmZvckVhY2goKHBhcmFtczogUGFyYW1zKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHBhcmFtc1snaWQnXTtcclxuICAgICAgICAgICAgdGhpcy5zdHVkZW50U2VydmljZS5nZXRTdHVkZW50KGlkKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oc3R1ZGVudCA9PiB0aGlzLnN0dWRlbnQgPSBzdHVkZW50KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlKCkge1xyXG4gICAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgICAgLnVwZGF0ZSh0aGlzLnN0dWRlbnQpXHJcbiAgICAgICAgICAgIC50aGVuKHN0dWRlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdHVkZW50ID0gc3R1ZGVudDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29CYWNrKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICB9XHJcbn1cclxuIl19
