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
    var core_1, router_1, course_service_1, CourseManageComponent;
    var __moduleName = context_1 && context_1.id;
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
            CourseManageComponent = class CourseManageComponent {
                constructor(router, CourseService) {
                    this.router = router;
                    this.CourseService = CourseService;
                    this.professors = [];
                    this.showForm = false;
                    //dropdown
                    this.campuses = [{ label: ' -- All --', value: '' }];
                }
                ngOnInit() {
                    swal({
                        title: 'Loading...',
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    this.getInstructors();
                    this.getCampuses();
                    this.getCourses();
                }
                getCampuses() {
                    this.CourseService
                        .getCampuses()
                        .then(res => {
                        if (res.result === "error") {
                            this.displayErrorAlert(res);
                        }
                        else {
                            res.forEach((i) => {
                                this.campuses.push({
                                    label: i.campusName,
                                    value: i.campusId
                                });
                            });
                        }
                    });
                }
                getInstructors() {
                    this.CourseService
                        .getInstructors()
                        .then((result) => {
                        this.professors = result;
                    });
                }
                getCourses() {
                    this.CourseService
                        .getCourses()
                        .then(res => {
                        if (res.result === "error") {
                            this.courses = null;
                            this.displayErrorAlert(res);
                        }
                        else {
                            //format datetime
                            res.forEach((item) => {
                                item.courseStart = moment(item.courseStart).utcOffset(60).format('YYYY-MM-DD');
                                item.courseEnd = moment(item.courseEnd).utcOffset(60).format('YYYY-MM-DD');
                            });
                            this.courses = res;
                            swal.close();
                        }
                    })
                        .catch(error => this.error = error);
                }
                deleteAlert(course, event) {
                    swal({
                        title: 'Delete course (' + course.courseName + ')?',
                        text: "You won't be able to revert this!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then(isConfirm => {
                        if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                            console.log(isConfirm.dismiss);
                        }
                        else if (isConfirm) {
                            this.deleteCourse(course, event);
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }
                deleteCourse(course, event) {
                    event.stopPropagation();
                    this.CourseService
                        .delete(course)
                        .then(res => {
                        if (res.result === "error") {
                            this.displayErrorAlert(res);
                        }
                        else if (res.result === "success") {
                            this.courses = this.courses.filter(h => h !== course);
                            swal('Deleted!', 'Course record has been deleted.', 'success');
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'error');
                        }
                    })
                        .catch(error => this.error = error);
                }
                gotoEdit(course, event) {
                    this.router.navigate(['/course-edit', course.courseID]);
                }
                addCourse() {
                    this.router.navigate(['/course-edit', 'new']);
                }
                gotoStudentEnrollment(course, event) {
                    this.router.navigate(['/student-enrollment', course.courseID, course.professorId, course.courseName]);
                }
                filterCampus(cam) {
                    this.campusId = this.Campus.indexOf(cam) + 1;
                }
                showCourseTypeForm() {
                    this.showForm = true;
                }
                addCourseType() {
                    if (this.courseType == null) {
                        swal('Invalid Input', 'Please enter a name for the new course type.', 'warning');
                    }
                    else {
                        swal({
                            title: 'Saving...',
                            allowOutsideClick: false
                        });
                        swal.showLoading();
                        this.showForm = false;
                        this.CourseService
                            .addToCourseTypes(this.courseType)
                            .then(result => {
                            if (result.result === 'error') {
                                this.displayErrorAlert(result);
                            }
                            else if (result.result === 'success') {
                                swal.close();
                            }
                            else {
                                swal('Error', 'Something went wrong while adding new course type.', 'error');
                            }
                        })
                            .catch(error => console.log("Error - Add new course type: " + error));
                    }
                }
                closeMenu() {
                    this.showForm = false;
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
            CourseManageComponent = __decorate([
                core_1.Component({
                    selector: 'courseManage',
                    templateUrl: './app/components/course-manage/course-manage.component.html',
                    styleUrls: ['./app/components/course-manage/course-manage.component.css']
                }),
                __metadata("design:paramtypes", [router_1.Router, course_service_1.CourseService])
            ], CourseManageComponent);
            exports_1("CourseManageComponent", CourseManageComponent);
        }
    };
});

//# sourceMappingURL=course-manage.component.js.map
