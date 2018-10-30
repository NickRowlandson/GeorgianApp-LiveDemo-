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
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const course_service_1 = require("../../services/course.service");
let CourseManageComponent = class CourseManageComponent {
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
exports.CourseManageComponent = CourseManageComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb3Vyc2UtbWFuYWdlL2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0NBQWtEO0FBQ2xELDRDQUF5QztBQUN6QyxrRUFBOEQ7QUFhOUQsSUFBYSxxQkFBcUIsR0FBbEM7SUFZRSxZQUFvQixNQUFjLEVBQVUsYUFBNEI7UUFBcEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBUHhFLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFFdkIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixVQUFVO1FBQ1YsYUFBUSxHQUFpQixDQUFDLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUk5RCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQztZQUNILEtBQUssRUFBRSxZQUFZO1lBQ25CLGlCQUFpQixFQUFFLEtBQUs7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWE7YUFDakIsV0FBVyxFQUFFO2FBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ1YsSUFBSyxHQUFXLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtnQkFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzdCO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7d0JBQ2pCLEtBQUssRUFBRSxDQUFDLENBQUMsVUFBVTt3QkFDbkIsS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRO3FCQUNsQixDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUVILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsYUFBYTthQUNqQixjQUFjLEVBQUU7YUFDaEIsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLGFBQWE7YUFDZixVQUFVLEVBQUU7YUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDVixJQUFLLEdBQVcsQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO2dCQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDcEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzdCO2lCQUFNO2dCQUNMLGlCQUFpQjtnQkFDakIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDL0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzdFLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO2dCQUNuQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDZDtRQUNILENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELFdBQVcsQ0FBQyxNQUFjLEVBQUUsS0FBVTtRQUNwQyxJQUFJLENBQUM7WUFDSCxLQUFLLEVBQUUsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJO1lBQ25ELElBQUksRUFBRSxtQ0FBbUM7WUFDekMsSUFBSSxFQUFFLFNBQVM7WUFDZixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLGtCQUFrQixFQUFFLFNBQVM7WUFDN0IsaUJBQWlCLEVBQUUsTUFBTTtZQUN6QixpQkFBaUIsRUFBRSxpQkFBaUI7U0FDckMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNsQixJQUFJLFNBQVMsQ0FBQyxPQUFPLEtBQUssUUFBUSxJQUFJLFNBQVMsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO2dCQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoQztpQkFBTSxJQUFJLFNBQVMsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDbEM7UUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFlBQVksQ0FBQyxNQUFjLEVBQUUsS0FBVTtRQUNyQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWE7YUFDZixNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ1YsSUFBSyxHQUFXLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtnQkFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzdCO2lCQUFNLElBQUssR0FBVyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FDRixVQUFVLEVBQ1YsaUNBQWlDLEVBQ2pDLFNBQVMsQ0FDVixDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsSUFBSSxDQUNBLE9BQU8sRUFDUCx5Q0FBeUMsRUFDekMsT0FBTyxDQUNWLENBQUM7YUFDSDtRQUNILENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUFjLEVBQUUsS0FBVTtRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELHFCQUFxQixDQUFDLE1BQWMsRUFBRSxLQUFVO1FBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMscUJBQXFCLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3hHLENBQUM7SUFFRCxZQUFZLENBQUMsR0FBRztRQUNkLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELGFBQWE7UUFDWixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO1lBQzFCLElBQUksQ0FDRixlQUFlLEVBQ2YsOENBQThDLEVBQzlDLFNBQVMsQ0FDVixDQUFDO1NBQ0g7YUFBTTtZQUNMLElBQUksQ0FBQztnQkFDSCxLQUFLLEVBQUUsV0FBVztnQkFDbEIsaUJBQWlCLEVBQUUsS0FBSzthQUN6QixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLGFBQWE7aUJBQ2YsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztpQkFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNiLElBQUssTUFBYyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7b0JBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDaEM7cUJBQU0sSUFBSyxNQUFjLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRztvQkFDaEQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUNkO3FCQUFNO29CQUNMLElBQUksQ0FDRixPQUFPLEVBQ1Asb0RBQW9ELEVBQ3BELE9BQU8sQ0FDUixDQUFDO2lCQUNIO1lBQ0gsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUN6RTtJQUNILENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEtBQUs7UUFDckIsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLFlBQVksRUFBRTtZQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUNGLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLEdBQUcsRUFDVCxNQUFNLENBQ1AsQ0FBQztTQUNIO2FBQU07WUFDTCxJQUFJLENBQ0YsS0FBSyxDQUFDLEtBQUssRUFDWCxLQUFLLENBQUMsR0FBRyxFQUNULE9BQU8sQ0FDUixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQsTUFBTTtRQUNKLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQztDQUVGLENBQUE7QUFuTVkscUJBQXFCO0lBUGpDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsY0FBYztRQUN4QixXQUFXLEVBQUUsNkRBQTZEO1FBQzFFLFNBQVMsRUFBRSxDQUFDLDREQUE0RCxDQUFDO0tBQzFFLENBQUM7cUNBZTRCLGVBQU0sRUFBeUIsOEJBQWE7R0FaN0QscUJBQXFCLENBbU1qQztBQW5NWSxzREFBcUIiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvY291cnNlLW1hbmFnZS9jb3Vyc2UtbWFuYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291cnNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb3Vyc2VcIjtcclxuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuZGVjbGFyZSB2YXIgbW9tZW50OiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2NvdXJzZU1hbmFnZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2NvdXJzZS1tYW5hZ2UvY291cnNlLW1hbmFnZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvY291cnNlLW1hbmFnZS9jb3Vyc2UtbWFuYWdlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDb3Vyc2VNYW5hZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGNvdXJzZXM6IENvdXJzZVtdO1xyXG4gIGVycm9yOiBhbnk7XHJcbiAgQ2FtcHVzOiBzdHJpbmdbXTtcclxuICBjYW1wdXNJZDogYW55O1xyXG4gIHByb2Zlc3NvcnM6IGFueVtdID0gW107XHJcbiAgY291cnNlVHlwZTogc3RyaW5nO1xyXG4gIHNob3dGb3JtOiBib29sZWFuID0gZmFsc2U7XHJcbiAgLy9kcm9wZG93blxyXG4gIGNhbXB1c2VzOiBTZWxlY3RJdGVtW10gPSBbeyBsYWJlbDogJyAtLSBBbGwgLS0nLCB2YWx1ZTogJycgfV07XHJcbiAgc2VsZWN0ZWRDYW1wdXNJZDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIENvdXJzZVNlcnZpY2U6IENvdXJzZVNlcnZpY2UpIHtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnTG9hZGluZy4uLicsXHJcbiAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICB0aGlzLmdldEluc3RydWN0b3JzKCk7XHJcbiAgICB0aGlzLmdldENhbXB1c2VzKCk7XHJcbiAgICB0aGlzLmdldENvdXJzZXMoKTtcclxuICB9XHJcblxyXG4gIGdldENhbXB1c2VzKCkge1xyXG4gICAgdGhpcy5Db3Vyc2VTZXJ2aWNlXHJcbiAgICAuZ2V0Q2FtcHVzZXMoKVxyXG4gICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYgKChyZXMgYXMgYW55KS5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXMuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jYW1wdXNlcy5wdXNoKHtcclxuICAgICAgICAgICAgbGFiZWw6IGkuY2FtcHVzTmFtZSxcclxuICAgICAgICAgICAgdmFsdWU6IGkuY2FtcHVzSWRcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRJbnN0cnVjdG9ycygpIHtcclxuICAgIHRoaXMuQ291cnNlU2VydmljZVxyXG4gICAgLmdldEluc3RydWN0b3JzKClcclxuICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgdGhpcy5wcm9mZXNzb3JzID0gcmVzdWx0O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb3Vyc2VzKCkge1xyXG4gICAgdGhpcy5Db3Vyc2VTZXJ2aWNlXHJcbiAgICAgIC5nZXRDb3Vyc2VzKClcclxuICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZiAoKHJlcyBhcyBhbnkpLnJlc3VsdCA9PT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICB0aGlzLmNvdXJzZXMgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvL2Zvcm1hdCBkYXRldGltZVxyXG4gICAgICAgICAgcmVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaXRlbS5jb3Vyc2VTdGFydCA9IG1vbWVudChpdGVtLmNvdXJzZVN0YXJ0KS51dGNPZmZzZXQoNjApLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICBpdGVtLmNvdXJzZUVuZCA9IG1vbWVudChpdGVtLmNvdXJzZUVuZCkudXRjT2Zmc2V0KDYwKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy5jb3Vyc2VzID0gcmVzO1xyXG4gICAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBkZWxldGVBbGVydChjb3Vyc2U6IENvdXJzZSwgZXZlbnQ6IGFueSkge1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnRGVsZXRlIGNvdXJzZSAoJyArIGNvdXJzZS5jb3Vyc2VOYW1lICsgJyk/JyxcclxuICAgICAgdGV4dDogXCJZb3Ugd29uJ3QgYmUgYWJsZSB0byByZXZlcnQgdGhpcyFcIixcclxuICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIGRlbGV0ZSBpdCEnXHJcbiAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhpc0NvbmZpcm0uZGlzbWlzcyk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgdGhpcy5kZWxldGVDb3Vyc2UoY291cnNlLCBldmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVDb3Vyc2UoY291cnNlOiBDb3Vyc2UsIGV2ZW50OiBhbnkpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgdGhpcy5Db3Vyc2VTZXJ2aWNlXHJcbiAgICAgIC5kZWxldGUoY291cnNlKVxyXG4gICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmICgocmVzIGFzIGFueSkucmVzdWx0ID09PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXMgYXMgYW55KS5yZXN1bHQgPT09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICB0aGlzLmNvdXJzZXMgPSB0aGlzLmNvdXJzZXMuZmlsdGVyKGggPT4gaCAhPT0gY291cnNlKTtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdEZWxldGVkIScsXHJcbiAgICAgICAgICAgICdDb3Vyc2UgcmVjb3JkIGhhcyBiZWVuIGRlbGV0ZWQuJyxcclxuICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZ290b0VkaXQoY291cnNlOiBDb3Vyc2UsIGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2NvdXJzZS1lZGl0JywgY291cnNlLmNvdXJzZUlEXSk7XHJcbiAgfVxyXG5cclxuICBhZGRDb3Vyc2UoKSB7XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9jb3Vyc2UtZWRpdCcsICduZXcnXSk7XHJcbiAgfVxyXG5cclxuICBnb3RvU3R1ZGVudEVucm9sbG1lbnQoY291cnNlOiBDb3Vyc2UsIGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3N0dWRlbnQtZW5yb2xsbWVudCcsIGNvdXJzZS5jb3Vyc2VJRCwgY291cnNlLnByb2Zlc3NvcklkLCBjb3Vyc2UuY291cnNlTmFtZV0pO1xyXG4gIH1cclxuXHJcbiAgZmlsdGVyQ2FtcHVzKGNhbSkge1xyXG4gICAgdGhpcy5jYW1wdXNJZCA9IHRoaXMuQ2FtcHVzLmluZGV4T2YoY2FtKSArIDE7XHJcbiAgfVxyXG5cclxuICBzaG93Q291cnNlVHlwZUZvcm0oKSB7XHJcbiAgICB0aGlzLnNob3dGb3JtID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGFkZENvdXJzZVR5cGUoKSB7XHJcbiAgIGlmICh0aGlzLmNvdXJzZVR5cGUgPT0gbnVsbCkge1xyXG4gICAgICBzd2FsKFxyXG4gICAgICAgICdJbnZhbGlkIElucHV0JyxcclxuICAgICAgICAnUGxlYXNlIGVudGVyIGEgbmFtZSBmb3IgdGhlIG5ldyBjb3Vyc2UgdHlwZS4nLFxyXG4gICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6ICdTYXZpbmcuLi4nLFxyXG4gICAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgICB9KTtcclxuICAgICAgc3dhbC5zaG93TG9hZGluZygpO1xyXG4gICAgICB0aGlzLnNob3dGb3JtID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuQ291cnNlU2VydmljZVxyXG4gICAgICAgIC5hZGRUb0NvdXJzZVR5cGVzKHRoaXMuY291cnNlVHlwZSlcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpICB7XHJcbiAgICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgYWRkaW5nIG5ldyBjb3Vyc2UgdHlwZS4nLFxyXG4gICAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yIC0gQWRkIG5ldyBjb3Vyc2UgdHlwZTogXCIgKyBlcnJvcikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2xvc2VNZW51KCkge1xyXG4gICAgdGhpcy5zaG93Rm9ybSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZGlzcGxheUVycm9yQWxlcnQoZXJyb3IpIHtcclxuICAgIGlmIChlcnJvci50aXRsZSA9PT0gXCJBdXRoIEVycm9yXCIpIHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgICAgZXJyb3IubXNnLFxyXG4gICAgICAgICdpbmZvJ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICBlcnJvci50aXRsZSxcclxuICAgICAgICBlcnJvci5tc2csXHJcbiAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19
