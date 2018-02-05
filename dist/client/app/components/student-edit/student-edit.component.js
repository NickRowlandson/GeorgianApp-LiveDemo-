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
var StudentEditComponent = /** @class */ (function () {
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
        // this.studentService
        //     .update(this.student)
        //     .then(student => {
        //         this.student = student;
        //         this.goBack();
        //     })
        //     .catch(error => this.error = error);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdHVkZW50LWVkaXQvc3R1ZGVudC1lZGl0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCxnREFBK0M7QUFDL0MsMENBQXlEO0FBQ3pELGtFQUFnRTtBQVFoRTtJQU1JLDhCQUFvQixjQUE4QixFQUFVLEtBQXFCO1FBQTdELG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBSGpGLGNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyx5QkFBeUI7SUFLNUMsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFBQSxpQkFNQztRQUxHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQWM7WUFDckMsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztpQkFDN0IsSUFBSSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLEVBQXRCLENBQXNCLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxtQ0FBSSxHQUFKO1FBQ0ksc0JBQXNCO1FBQ3RCLDRCQUE0QjtRQUM1Qix5QkFBeUI7UUFDekIsa0NBQWtDO1FBQ2xDLHlCQUF5QjtRQUN6QixTQUFTO1FBQ1QsMkNBQTJDO0lBQy9DLENBQUM7SUFFRCxxQ0FBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBN0JRO1FBQVIsWUFBSyxFQUFFO2tDQUFVLGlCQUFPO3lEQUFDO0lBRGpCLG9CQUFvQjtRQU5oQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLDJEQUEyRDtZQUN4RSxTQUFTLEVBQUUsQ0FBQywwREFBMEQsQ0FBQztTQUMxRSxDQUFDO3lDQVFzQyxnQ0FBYyxFQUFpQix1QkFBYztPQU54RSxvQkFBb0IsQ0ErQmhDO0lBQUQsMkJBQUM7Q0EvQkQsQUErQkMsSUFBQTtBQS9CWSxvREFBb0IiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvc3R1ZGVudC1lZGl0L3N0dWRlbnQtZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvU3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnc3R1ZGVudC1lZGl0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9zdHVkZW50LWVkaXQvc3R1ZGVudC1lZGl0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3N0dWRlbnQtZWRpdC9zdHVkZW50LWVkaXQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU3R1ZGVudEVkaXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgc3R1ZGVudDogU3R1ZGVudDtcclxuICAgIGVycm9yOiBhbnk7XHJcbiAgICBuYXZpZ2F0ZWQgPSBmYWxzZTsgLy8gdHJ1ZSBpZiBuYXZpZ2F0ZWQgaGVyZVxyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5wYXJhbXMuZm9yRWFjaCgocGFyYW1zOiBQYXJhbXMpID0+IHtcclxuICAgICAgICAgICAgbGV0IGlkID0gcGFyYW1zWydpZCddO1xyXG4gICAgICAgICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlLmdldFN0dWRlbnQoaWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbihzdHVkZW50ID0+IHRoaXMuc3R1ZGVudCA9IHN0dWRlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmUoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgIC8vICAgICAudXBkYXRlKHRoaXMuc3R1ZGVudClcclxuICAgICAgICAvLyAgICAgLnRoZW4oc3R1ZGVudCA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnN0dWRlbnQgPSBzdHVkZW50O1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5nb0JhY2soKTtcclxuICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAvLyAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgIH1cclxufVxyXG4iXX0=
