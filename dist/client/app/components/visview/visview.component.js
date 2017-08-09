System.register(["@angular/core", "@angular/router", "../../services/student.service", "../../services/course.service"], function (exports_1, context_1) {
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
    var core_1, router_1, student_service_1, course_service_1, VisviewComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (student_service_1_1) {
                student_service_1 = student_service_1_1;
            },
            function (course_service_1_1) {
                course_service_1 = course_service_1_1;
            }
        ],
        execute: function () {
            VisviewComponent = (function () {
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
            exports_1("VisviewComponent", VisviewComponent);
        }
    };
});

//# sourceMappingURL=visview.component.js.map
