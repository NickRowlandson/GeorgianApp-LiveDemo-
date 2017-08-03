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
var course_service_1 = require("../../services/course.service");
var CourseManageComponent = (function () {
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
                    item.classStartTime = moment(item.classStartTime).format('hh:mm A');
                    item.classEndTime = moment(item.classEndTime).format('hh:mm A');
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
exports.CourseManageComponent = CourseManageComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb3Vyc2UtbWFuYWdlL2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF5QztBQUN6QyxnRUFBOEQ7QUFhOUQ7SUFTSSwrQkFBb0IsTUFBYyxFQUFVLGFBQTRCO1FBQXBELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUp4RSxlQUFVLEdBQVUsRUFBRSxDQUFDO1FBQ3ZCLFVBQVU7UUFDVixhQUFRLEdBQWlCLENBQUMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRzlELENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBRUksc0RBQXNEO1FBQ3RELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCwyQ0FBVyxHQUFYO1FBQUEsaUJBVUM7UUFURyxlQUFlO1FBQ2YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO1lBQ3pDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDO2dCQUNiLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO29CQUNmLEtBQUssRUFBRSxDQUFDLENBQUMsVUFBVTtvQkFDbkIsS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRO2lCQUNwQixDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDZDQUFhLEdBQWI7UUFBQSxpQkFLQztRQUpHLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQU07WUFDM0MsS0FBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsMENBQVUsR0FBVjtRQUFBLGlCQW9CQztRQW5CRyxJQUFJLENBQUMsYUFBYTthQUNiLFVBQVUsRUFBRTthQUNaLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDUixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixpQkFBaUI7Z0JBQ2pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO29CQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNqRSxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUM3RCxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNwRSxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNwRSxDQUFDLENBQUMsQ0FBQztnQkFDSCxLQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUcxQixDQUFDO1FBQ0wsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsMkNBQVcsR0FBWCxVQUFZLE1BQWMsRUFBRSxLQUFVO1FBQXRDLGlCQWdCQztRQWZHLElBQUksQ0FBQztZQUNELEtBQUssRUFBRSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUk7WUFDbkQsSUFBSSxFQUFFLG1DQUFtQztZQUN6QyxJQUFJLEVBQUUsU0FBUztZQUNmLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsa0JBQWtCLEVBQUUsU0FBUztZQUM3QixpQkFBaUIsRUFBRSxNQUFNO1lBQ3pCLGlCQUFpQixFQUFFLGlCQUFpQjtTQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsU0FBUztZQUNiLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDckMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEtBQUs7WUFDViwwQkFBMEI7UUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsNENBQVksR0FBWixVQUFhLE1BQWMsRUFBRSxLQUFVO1FBQXZDLGlCQWFDO1FBWkcsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxhQUFhO2FBQ2IsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUNkLElBQUksQ0FBQyxVQUFBLEdBQUc7WUFDTCxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxLQUFLLE1BQU0sRUFBWixDQUFZLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQ0EsVUFBVSxFQUNWLGlDQUFpQyxFQUNqQyxTQUFTLENBQ1osQ0FBQztRQUNOLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFsQixDQUFrQixDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELHdDQUFRLEdBQVIsVUFBUyxNQUFjLEVBQUUsS0FBVTtRQUUvQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQseUNBQVMsR0FBVDtRQUVJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELHFEQUFxQixHQUFyQixVQUFzQixNQUFjLEVBQUUsS0FBVTtRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRUQsc0NBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNELDRDQUFZLEdBQVosVUFBYSxHQUFHO1FBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFakQsQ0FBQztJQWpIUSxxQkFBcUI7UUFQakMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFdBQVcsRUFBRSw2REFBNkQ7WUFDMUUsU0FBUyxFQUFFLENBQUMsNERBQTRELENBQUM7U0FDNUUsQ0FBQzt5Q0FZOEIsZUFBTSxFQUF5Qiw4QkFBYTtPQVQvRCxxQkFBcUIsQ0FtSGpDO0lBQUQsNEJBQUM7Q0FuSEQsQUFtSEMsSUFBQTtBQW5IWSxzREFBcUIiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvY291cnNlLW1hbmFnZS9jb3Vyc2UtbWFuYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291cnNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb3Vyc2VcIjtcclxuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuZGVjbGFyZSB2YXIgbW9tZW50OiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnY291cnNlTWFuYWdlJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9jb3Vyc2UtbWFuYWdlL2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvY291cnNlLW1hbmFnZS9jb3Vyc2UtbWFuYWdlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDb3Vyc2VNYW5hZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgY291cnNlczogQ291cnNlW107XHJcbiAgICBlcnJvcjogYW55O1xyXG4gICAgQ2FtcHVzOiBzdHJpbmdbXTtcclxuICAgIGNhbXB1c0lkOiBhbnk7XHJcbiAgICBwcm9mZXNzb3JzOiBhbnlbXSA9IFtdO1xyXG4gICAgLy9kcm9wZG93blxyXG4gICAgY2FtcHVzZXM6IFNlbGVjdEl0ZW1bXSA9IFt7IGxhYmVsOiAnIC0tIEFsbCAtLScsIHZhbHVlOiAnJyB9XTtcclxuICAgIHNlbGVjdGVkQ2FtcHVzSWQ6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgQ291cnNlU2VydmljZTogQ291cnNlU2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQgaGg6bW0gQScpKTtcclxuICAgICAgICB0aGlzLmdldFByb2Zlc3NvcnMoKTtcclxuICAgICAgICB0aGlzLmdldENhbXB1c2VzKCk7XHJcbiAgICAgICAgdGhpcy5nZXRDb3Vyc2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2FtcHVzZXMoKSB7XHJcbiAgICAgICAgLy8gZ2V0IGNhbXB1c2VzXHJcbiAgICAgICAgdGhpcy5Db3Vyc2VTZXJ2aWNlLmdldENhbXB1c2VzKCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKChpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbXB1c2VzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBpLmNhbXB1c05hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGkuY2FtcHVzSWRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQcm9mZXNzb3JzKCkge1xyXG4gICAgICAgIC8vIGdldCBwcm9mZXNzb3JzXHJcbiAgICAgICAgdGhpcy5Db3Vyc2VTZXJ2aWNlLmdldFByb2Zlc3NvcnMoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wcm9mZXNzb3JzID0gcmVzdWx0O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0Q291cnNlcygpIHtcclxuICAgICAgICB0aGlzLkNvdXJzZVNlcnZpY2VcclxuICAgICAgICAgICAgLmdldENvdXJzZXMoKVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09IFwiNDAzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZXMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2Zvcm1hdCBkYXRldGltZVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY291cnNlU3RhcnQgPSBtb21lbnQoaXRlbS5jb3Vyc2VTdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY291cnNlRW5kID0gbW9tZW50KGl0ZW0uY291cnNlRW5kKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc1N0YXJ0VGltZSA9IG1vbWVudChpdGVtLmNsYXNzU3RhcnRUaW1lKS5mb3JtYXQoJ2hoOm1tIEEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0VuZFRpbWUgPSBtb21lbnQoaXRlbS5jbGFzc0VuZFRpbWUpLmZvcm1hdCgnaGg6bW0gQScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY291cnNlcyA9IHJlc3VsdDtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVBbGVydChjb3Vyc2U6IENvdXJzZSwgZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ0RlbGV0ZSBjb3Vyc2UgKCcgKyBjb3Vyc2UuY291cnNlTmFtZSArICcpPycsXHJcbiAgICAgICAgICAgIHRleHQ6IFwiWW91IHdvbid0IGJlIGFibGUgdG8gcmV2ZXJ0IHRoaXMhXCIsXHJcbiAgICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBkZWxldGUgaXQhJ1xyXG4gICAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICAgICAgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGVDb3Vyc2UoY291cnNlLCBldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJDYW5jZWxlZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVDb3Vyc2UoY291cnNlOiBDb3Vyc2UsIGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0aGlzLkNvdXJzZVNlcnZpY2VcclxuICAgICAgICAgICAgLmRlbGV0ZShjb3Vyc2UpXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZXMgPSB0aGlzLmNvdXJzZXMuZmlsdGVyKGggPT4gaCAhPT0gY291cnNlKTtcclxuICAgICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICAgJ0RlbGV0ZWQhJyxcclxuICAgICAgICAgICAgICAgICAgICAnQ291cnNlIHJlY29yZCBoYXMgYmVlbiBkZWxldGVkLicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBnb3RvRWRpdChjb3Vyc2U6IENvdXJzZSwgZXZlbnQ6IGFueSkge1xyXG5cclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9jb3Vyc2UtZWRpdCcsIGNvdXJzZS5jb3Vyc2VJRF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZENvdXJzZSgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvY291cnNlLWVkaXQnLCAnbmV3J10pO1xyXG4gICAgfVxyXG5cclxuICAgIGdvdG9TdHVkZW50RW5yb2xsbWVudChjb3Vyc2U6IENvdXJzZSwgZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3N0dWRlbnQtZW5yb2xsbWVudCcsIGNvdXJzZS5jb3Vyc2VJRCwgY291cnNlLnByb2Zlc3NvcklkLCBjb3Vyc2UuY291cnNlTmFtZV0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICB9XHJcbiAgICBmaWx0ZXJDYW1wdXMoY2FtKSB7XHJcbiAgICAgICAgdGhpcy5jYW1wdXNJZCA9IHRoaXMuQ2FtcHVzLmluZGV4T2YoY2FtKSArIDE7XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=
