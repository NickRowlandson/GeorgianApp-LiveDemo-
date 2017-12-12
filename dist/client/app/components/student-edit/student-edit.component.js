System.register(["@angular/core", "../../models/Student", "@angular/router", "../../services/student.service"], function (exports_1, context_1) {
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
    var core_1, Student_1, router_1, student_service_1, StudentEditComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Student_1_1) {
                Student_1 = Student_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (student_service_1_1) {
                student_service_1 = student_service_1_1;
            }
        ],
        execute: function () {
            StudentEditComponent = /** @class */ (function () {
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
            exports_1("StudentEditComponent", StudentEditComponent);
        }
    };
});

//# sourceMappingURL=student-edit.component.js.map
