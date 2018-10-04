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
        swal(error.title, error.msg, 'error');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb3Vyc2UtbWFuYWdlL2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0NBQWtEO0FBQ2xELDRDQUF5QztBQUN6QyxrRUFBOEQ7QUFhOUQsSUFBYSxxQkFBcUIsR0FBbEM7SUFZRSxZQUFvQixNQUFjLEVBQVUsYUFBNEI7UUFBcEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBUHhFLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFFdkIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixVQUFVO1FBQ1YsYUFBUSxHQUFpQixDQUFDLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUk5RCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQztZQUNILEtBQUssRUFBRSxZQUFZO1lBQ25CLGlCQUFpQixFQUFFLEtBQUs7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWE7YUFDakIsV0FBVyxFQUFFO2FBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ1YsSUFBSyxHQUFXLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtnQkFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzdCO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7d0JB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QyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0NBRUYsQ0FBQTtBQTFMWSxxQkFBcUI7SUFQakMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFdBQVcsRUFBRSw2REFBNkQ7UUFDMUUsU0FBUyxFQUFFLENBQUMsNERBQTRELENBQUM7S0FDMUUsQ0FBQztxQ0FlNEIsZUFBTSxFQUF5Qiw4QkFBYTtHQVo3RCxxQkFBcUIsQ0EwTGpDO0FBMUxZLHNEQUFxQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9jb3Vyc2UtbWFuYWdlL2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ291cnNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3Vyc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvdXJzZVwiO1xyXG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5kZWNsYXJlIHZhciBtb21lbnQ6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnY291cnNlTWFuYWdlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvY291cnNlLW1hbmFnZS9jb3Vyc2UtbWFuYWdlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9jb3Vyc2UtbWFuYWdlL2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENvdXJzZU1hbmFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgY291cnNlczogQ291cnNlW107XHJcbiAgZXJyb3I6IGFueTtcclxuICBDYW1wdXM6IHN0cmluZ1tdO1xyXG4gIGNhbXB1c0lkOiBhbnk7XHJcbiAgcHJvZmVzc29yczogYW55W10gPSBbXTtcclxuICBjb3Vyc2VUeXBlOiBzdHJpbmc7XHJcbiAgc2hvd0Zvcm06IGJvb2xlYW4gPSBmYWxzZTtcclxuICAvL2Ryb3Bkb3duXHJcbiAgY2FtcHVzZXM6IFNlbGVjdEl0ZW1bXSA9IFt7IGxhYmVsOiAnIC0tIEFsbCAtLScsIHZhbHVlOiAnJyB9XTtcclxuICBzZWxlY3RlZENhbXB1c0lkOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgQ291cnNlU2VydmljZTogQ291cnNlU2VydmljZSkge1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdMb2FkaW5nLi4uJyxcclxuICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgIHRoaXMuZ2V0SW5zdHJ1Y3RvcnMoKTtcclxuICAgIHRoaXMuZ2V0Q2FtcHVzZXMoKTtcclxuICAgIHRoaXMuZ2V0Q291cnNlcygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2FtcHVzZXMoKSB7XHJcbiAgICB0aGlzLkNvdXJzZVNlcnZpY2VcclxuICAgIC5nZXRDYW1wdXNlcygpXHJcbiAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICBpZiAoKHJlcyBhcyBhbnkpLnJlc3VsdCA9PT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlcy5mb3JFYWNoKChpKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNhbXB1c2VzLnB1c2goe1xyXG4gICAgICAgICAgICBsYWJlbDogaS5jYW1wdXNOYW1lLFxyXG4gICAgICAgICAgICB2YWx1ZTogaS5jYW1wdXNJZFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldEluc3RydWN0b3JzKCkge1xyXG4gICAgdGhpcy5Db3Vyc2VTZXJ2aWNlXHJcbiAgICAuZ2V0SW5zdHJ1Y3RvcnMoKVxyXG4gICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICB0aGlzLnByb2Zlc3NvcnMgPSByZXN1bHQ7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldENvdXJzZXMoKSB7XHJcbiAgICB0aGlzLkNvdXJzZVNlcnZpY2VcclxuICAgICAgLmdldENvdXJzZXMoKVxyXG4gICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmICgocmVzIGFzIGFueSkucmVzdWx0ID09PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgIHRoaXMuY291cnNlcyA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vZm9ybWF0IGRhdGV0aW1lXHJcbiAgICAgICAgICByZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpdGVtLmNvdXJzZVN0YXJ0ID0gbW9tZW50KGl0ZW0uY291cnNlU3RhcnQpLnV0Y09mZnNldCg2MCkuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgIGl0ZW0uY291cnNlRW5kID0gbW9tZW50KGl0ZW0uY291cnNlRW5kKS51dGNPZmZzZXQoNjApLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLmNvdXJzZXMgPSByZXM7XHJcbiAgICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUFsZXJ0KGNvdXJzZTogQ291cnNlLCBldmVudDogYW55KSB7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdEZWxldGUgY291cnNlICgnICsgY291cnNlLmNvdXJzZU5hbWUgKyAnKT8nLFxyXG4gICAgICB0ZXh0OiBcIllvdSB3b24ndCBiZSBhYmxlIHRvIHJldmVydCB0aGlzIVwiLFxyXG4gICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgZGVsZXRlIGl0ISdcclxuICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICB0aGlzLmRlbGV0ZUNvdXJzZShjb3Vyc2UsIGV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUNvdXJzZShjb3Vyc2U6IENvdXJzZSwgZXZlbnQ6IGFueSkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB0aGlzLkNvdXJzZVNlcnZpY2VcclxuICAgICAgLmRlbGV0ZShjb3Vyc2UpXHJcbiAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYgKChyZXMgYXMgYW55KS5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXMpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlcyBhcyBhbnkpLnJlc3VsdCA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgIHRoaXMuY291cnNlcyA9IHRoaXMuY291cnNlcy5maWx0ZXIoaCA9PiBoICE9PSBjb3Vyc2UpO1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0RlbGV0ZWQhJyxcclxuICAgICAgICAgICAgJ0NvdXJzZSByZWNvcmQgaGFzIGJlZW4gZGVsZXRlZC4nLFxyXG4gICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBnb3RvRWRpdChjb3Vyc2U6IENvdXJzZSwgZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvY291cnNlLWVkaXQnLCBjb3Vyc2UuY291cnNlSURdKTtcclxuICB9XHJcblxyXG4gIGFkZENvdXJzZSgpIHtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2NvdXJzZS1lZGl0JywgJ25ldyddKTtcclxuICB9XHJcblxyXG4gIGdvdG9TdHVkZW50RW5yb2xsbWVudChjb3Vyc2U6IENvdXJzZSwgZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3R1ZGVudC1lbnJvbGxtZW50JywgY291cnNlLmNvdXJzZUlELCBjb3Vyc2UucHJvZmVzc29ySWQsIGNvdXJzZS5jb3Vyc2VOYW1lXSk7XHJcbiAgfVxyXG5cclxuICBmaWx0ZXJDYW1wdXMoY2FtKSB7XHJcbiAgICB0aGlzLmNhbXB1c0lkID0gdGhpcy5DYW1wdXMuaW5kZXhPZihjYW0pICsgMTtcclxuICB9XHJcblxyXG4gIHNob3dDb3Vyc2VUeXBlRm9ybSgpIHtcclxuICAgIHRoaXMuc2hvd0Zvcm0gPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgYWRkQ291cnNlVHlwZSgpIHtcclxuICAgaWYgKHRoaXMuY291cnNlVHlwZSA9PSBudWxsKSB7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgJ0ludmFsaWQgSW5wdXQnLFxyXG4gICAgICAgICdQbGVhc2UgZW50ZXIgYSBuYW1lIGZvciB0aGUgbmV3IGNvdXJzZSB0eXBlLicsXHJcbiAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogJ1NhdmluZy4uLicsXHJcbiAgICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICAgIH0pO1xyXG4gICAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICAgIHRoaXMuc2hvd0Zvcm0gPSBmYWxzZTtcclxuICAgICAgdGhpcy5Db3Vyc2VTZXJ2aWNlXHJcbiAgICAgICAgLmFkZFRvQ291cnNlVHlwZXModGhpcy5jb3Vyc2VUeXBlKVxyXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykgIHtcclxuICAgICAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSBhZGRpbmcgbmV3IGNvdXJzZSB0eXBlLicsXHJcbiAgICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3IgLSBBZGQgbmV3IGNvdXJzZSB0eXBlOiBcIiArIGVycm9yKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjbG9zZU1lbnUoKSB7XHJcbiAgICB0aGlzLnNob3dGb3JtID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5RXJyb3JBbGVydChlcnJvcikge1xyXG4gICAgc3dhbChcclxuICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgIGVycm9yLm1zZyxcclxuICAgICAgJ2Vycm9yJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==
