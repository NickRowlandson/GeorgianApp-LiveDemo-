System.register(["@angular/core", "@angular/router", "../../services/course.service"], function (exports_1, context_1) {
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
    var core_1, router_1, course_service_1, CourseManageComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (course_service_1_1) {
                course_service_1 = course_service_1_1;
            }
        ],
        execute: function () {
            CourseManageComponent = /** @class */ (function () {
                function CourseManageComponent(router, CourseService) {
                    this.router = router;
                    this.CourseService = CourseService;
                    this.professors = [];
                    //dropdown
                    this.campuses = [{ label: ' -- All --', value: '' }];
                }
                CourseManageComponent.prototype.ngOnInit = function () {
                    // console.log(moment().format('YYYY-MM-DD hh:mm A'));
                    this.getProfessors();
                    this.getCampuses();
                    this.getCourses();
                };
                CourseManageComponent.prototype.getCampuses = function () {
                    var _this = this;
                    // get campuses
                    this.CourseService.getCampuses().then(function (result) {
                        result.forEach(function (i) {
                            _this.campuses.push({
                                label: i.campusName,
                                value: i.campusId
                            });
                        });
                    });
                };
                CourseManageComponent.prototype.getProfessors = function () {
                    var _this = this;
                    // get professors
                    this.CourseService.getProfessors().then(function (result) {
                        _this.professors = result;
                    });
                };
                CourseManageComponent.prototype.getCourses = function () {
                    var _this = this;
                    this.CourseService
                        .getCourses()
                        .then(function (result) {
                        if (result.status === "403") {
                            _this.courses = null;
                        }
                        else {
                            //format datetime
                            result.forEach(function (item) {
                                item.courseStart = moment(item.courseStart).format('YYYY-MM-DD');
                                item.courseEnd = moment(item.courseEnd).format('YYYY-MM-DD');
                            });
                            _this.courses = result;
                        }
                    })
                        .catch(function (error) { return _this.error = error; });
                };
                CourseManageComponent.prototype.deleteAlert = function (course, event) {
                    var _this = this;
                    swal({
                        title: 'Delete course (' + course.courseName + ')?',
                        text: "You won't be able to revert this!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then(function (isConfirm) {
                        if (isConfirm) {
                            _this.deleteCourse(course, event);
                        }
                    }).catch(function (error) {
                        //console.log("Canceled");
                    });
                };
                CourseManageComponent.prototype.deleteCourse = function (course, event) {
                    var _this = this;
                    event.stopPropagation();
                    this.CourseService
                        .delete(course)
                        .then(function (res) {
                        _this.courses = _this.courses.filter(function (h) { return h !== course; });
                        swal('Deleted!', 'Course record has been deleted.', 'success');
                    })
                        .catch(function (error) { return _this.error = error; });
                };
                CourseManageComponent.prototype.gotoEdit = function (course, event) {
                    this.router.navigate(['/course-edit', course.courseID]);
                };
                CourseManageComponent.prototype.addCourse = function () {
                    this.router.navigate(['/course-edit', 'new']);
                };
                CourseManageComponent.prototype.gotoStudentEnrollment = function (course, event) {
                    this.router.navigate(['/student-enrollment', course.courseID, course.professorId, course.courseName]);
                };
                CourseManageComponent.prototype.goBack = function () {
                    window.history.back();
                };
                CourseManageComponent.prototype.filterCampus = function (cam) {
                    this.campusId = this.Campus.indexOf(cam) + 1;
                };
                CourseManageComponent = __decorate([
                    core_1.Component({
                        selector: 'courseManage',
                        templateUrl: './app/components/course-manage/course-manage.component.html',
                        styleUrls: ['./app/components/course-manage/course-manage.component.css']
                    }),
                    __metadata("design:paramtypes", [router_1.Router, course_service_1.CourseService])
                ], CourseManageComponent);
                return CourseManageComponent;
            }());
            exports_1("CourseManageComponent", CourseManageComponent);
        }
    };
});

//# sourceMappingURL=course-manage.component.js.map
