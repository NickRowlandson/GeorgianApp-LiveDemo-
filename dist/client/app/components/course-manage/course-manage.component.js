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
var CourseManageComponent = /** @class */ (function () {
    function CourseManageComponent(router, CourseService) {
        this.router = router;
        this.CourseService = CourseService;
        this.professors = [];
        //dropdown
        this.campuses = [{ label: ' -- All --', value: '' }];
    }
    CourseManageComponent.prototype.ngOnInit = function () {
        this.getInstructors();
        this.getCampuses();
        this.getCourses();
    };
    CourseManageComponent.prototype.getCampuses = function () {
        var _this = this;
        this.CourseService
            .getCampuses()
            .then(function (res) {
            if (res.result === "error") {
                _this.displayErrorAlert(res);
            }
            else {
                res.forEach(function (i) {
                    _this.campuses.push({
                        label: i.campusName,
                        value: i.campusId
                    });
                });
            }
        });
    };
    CourseManageComponent.prototype.getInstructors = function () {
        var _this = this;
        this.CourseService
            .getInstructors()
            .then(function (result) {
            _this.professors = result;
        });
    };
    CourseManageComponent.prototype.getCourses = function () {
        var _this = this;
        this.CourseService
            .getCourses()
            .then(function (res) {
            if (res.result === "error") {
                _this.courses = null;
                _this.displayErrorAlert(res);
            }
            else {
                //format datetime
                res.forEach(function (item) {
                    item.courseStart = moment(item.courseStart).utcOffset(60).format('YYYY-MM-DD');
                    item.courseEnd = moment(item.courseEnd).utcOffset(60).format('YYYY-MM-DD');
                });
                _this.courses = res;
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
            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                console.log(isConfirm.dismiss);
            }
            else if (isConfirm) {
                _this.deleteCourse(course, event);
            }
        }).catch(function (error) {
            console.log(error);
        });
    };
    CourseManageComponent.prototype.deleteCourse = function (course, event) {
        var _this = this;
        event.stopPropagation();
        this.CourseService
            .delete(course)
            .then(function (res) {
            if (res.result === "error") {
                _this.displayErrorAlert(res);
            }
            else if (res.result === "success") {
                _this.courses = _this.courses.filter(function (h) { return h !== course; });
                swal('Deleted!', 'Course record has been deleted.', 'success');
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
            }
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
    CourseManageComponent.prototype.filterCampus = function (cam) {
        this.campusId = this.Campus.indexOf(cam) + 1;
    };
    CourseManageComponent.prototype.displayErrorAlert = function (error) {
        swal(error.title, error.msg, 'error');
    };
    CourseManageComponent.prototype.goBack = function () {
        window.history.back();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb3Vyc2UtbWFuYWdlL2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF5QztBQUN6QyxnRUFBOEQ7QUFhOUQ7SUFVRSwrQkFBb0IsTUFBYyxFQUFVLGFBQTRCO1FBQXBELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUx4RSxlQUFVLEdBQVUsRUFBRSxDQUFDO1FBQ3ZCLFVBQVU7UUFDVixhQUFRLEdBQWlCLENBQUMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBSTlELENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELDJDQUFXLEdBQVg7UUFBQSxpQkFnQkM7UUFmQyxJQUFJLENBQUMsYUFBYTthQUNqQixXQUFXLEVBQUU7YUFDYixJQUFJLENBQUMsVUFBQSxHQUFHO1lBQ1AsSUFBSyxHQUFXLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtnQkFDbkMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzdCO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDO29CQUNaLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO3dCQUNqQixLQUFLLEVBQUUsQ0FBQyxDQUFDLFVBQVU7d0JBQ25CLEtBQUssRUFBRSxDQUFDLENBQUMsUUFBUTtxQkFDbEIsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFFSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw4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TSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBdklVLHFCQUFxQjtRQVBqQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLDZEQUE2RDtZQUMxRSxTQUFTLEVBQUUsQ0FBQyw0REFBNEQsQ0FBQztTQUMxRSxDQUFDO3lDQWE0QixlQUFNLEVBQXlCLDhCQUFhO09BVjdELHFCQUFxQixDQXlJakM7SUFBRCw0QkFBQztDQXpJRCxBQXlJQyxJQUFBO0FBeklZLHNEQUFxQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9jb3Vyc2UtbWFuYWdlL2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ291cnNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3Vyc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvdXJzZVwiO1xyXG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5kZWNsYXJlIHZhciBtb21lbnQ6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnY291cnNlTWFuYWdlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvY291cnNlLW1hbmFnZS9jb3Vyc2UtbWFuYWdlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9jb3Vyc2UtbWFuYWdlL2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENvdXJzZU1hbmFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgY291cnNlczogQ291cnNlW107XHJcbiAgZXJyb3I6IGFueTtcclxuICBDYW1wdXM6IHN0cmluZ1tdO1xyXG4gIGNhbXB1c0lkOiBhbnk7XHJcbiAgcHJvZmVzc29yczogYW55W10gPSBbXTtcclxuICAvL2Ryb3Bkb3duXHJcbiAgY2FtcHVzZXM6IFNlbGVjdEl0ZW1bXSA9IFt7IGxhYmVsOiAnIC0tIEFsbCAtLScsIHZhbHVlOiAnJyB9XTtcclxuICBzZWxlY3RlZENhbXB1c0lkOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgQ291cnNlU2VydmljZTogQ291cnNlU2VydmljZSkge1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmdldEluc3RydWN0b3JzKCk7XHJcbiAgICB0aGlzLmdldENhbXB1c2VzKCk7XHJcbiAgICB0aGlzLmdldENvdXJzZXMoKTtcclxuICB9XHJcblxyXG4gIGdldENhbXB1c2VzKCkge1xyXG4gICAgdGhpcy5Db3Vyc2VTZXJ2aWNlXHJcbiAgICAuZ2V0Q2FtcHVzZXMoKVxyXG4gICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYgKChyZXMgYXMgYW55KS5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXMuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jYW1wdXNlcy5wdXNoKHtcclxuICAgICAgICAgICAgbGFiZWw6IGkuY2FtcHVzTmFtZSxcclxuICAgICAgICAgICAgdmFsdWU6IGkuY2FtcHVzSWRcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRJbnN0cnVjdG9ycygpIHtcclxuICAgIHRoaXMuQ291cnNlU2VydmljZVxyXG4gICAgLmdldEluc3RydWN0b3JzKClcclxuICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgdGhpcy5wcm9mZXNzb3JzID0gcmVzdWx0O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb3Vyc2VzKCkge1xyXG4gICAgdGhpcy5Db3Vyc2VTZXJ2aWNlXHJcbiAgICAgIC5nZXRDb3Vyc2VzKClcclxuICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZiAoKHJlcyBhcyBhbnkpLnJlc3VsdCA9PT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICB0aGlzLmNvdXJzZXMgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvL2Zvcm1hdCBkYXRldGltZVxyXG4gICAgICAgICAgcmVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaXRlbS5jb3Vyc2VTdGFydCA9IG1vbWVudChpdGVtLmNvdXJzZVN0YXJ0KS51dGNPZmZzZXQoNjApLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICBpdGVtLmNvdXJzZUVuZCA9IG1vbWVudChpdGVtLmNvdXJzZUVuZCkudXRjT2Zmc2V0KDYwKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy5jb3Vyc2VzID0gcmVzO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBkZWxldGVBbGVydChjb3Vyc2U6IENvdXJzZSwgZXZlbnQ6IGFueSkge1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnRGVsZXRlIGNvdXJzZSAoJyArIGNvdXJzZS5jb3Vyc2VOYW1lICsgJyk/JyxcclxuICAgICAgdGV4dDogXCJZb3Ugd29uJ3QgYmUgYWJsZSB0byByZXZlcnQgdGhpcyFcIixcclxuICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIGRlbGV0ZSBpdCEnXHJcbiAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhpc0NvbmZpcm0uZGlzbWlzcyk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgdGhpcy5kZWxldGVDb3Vyc2UoY291cnNlLCBldmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVDb3Vyc2UoY291cnNlOiBDb3Vyc2UsIGV2ZW50OiBhbnkpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgdGhpcy5Db3Vyc2VTZXJ2aWNlXHJcbiAgICAgIC5kZWxldGUoY291cnNlKVxyXG4gICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmICgocmVzIGFzIGFueSkucmVzdWx0ID09PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXMgYXMgYW55KS5yZXN1bHQgPT09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICB0aGlzLmNvdXJzZXMgPSB0aGlzLmNvdXJzZXMuZmlsdGVyKGggPT4gaCAhPT0gY291cnNlKTtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdEZWxldGVkIScsXHJcbiAgICAgICAgICAgICdDb3Vyc2UgcmVjb3JkIGhhcyBiZWVuIGRlbGV0ZWQuJyxcclxuICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZ290b0VkaXQoY291cnNlOiBDb3Vyc2UsIGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2NvdXJzZS1lZGl0JywgY291cnNlLmNvdXJzZUlEXSk7XHJcbiAgfVxyXG5cclxuICBhZGRDb3Vyc2UoKSB7XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9jb3Vyc2UtZWRpdCcsICduZXcnXSk7XHJcbiAgfVxyXG5cclxuICBnb3RvU3R1ZGVudEVucm9sbG1lbnQoY291cnNlOiBDb3Vyc2UsIGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3N0dWRlbnQtZW5yb2xsbWVudCcsIGNvdXJzZS5jb3Vyc2VJRCwgY291cnNlLnByb2Zlc3NvcklkLCBjb3Vyc2UuY291cnNlTmFtZV0pO1xyXG4gIH1cclxuXHJcbiAgZmlsdGVyQ2FtcHVzKGNhbSkge1xyXG4gICAgdGhpcy5jYW1wdXNJZCA9IHRoaXMuQ2FtcHVzLmluZGV4T2YoY2FtKSArIDE7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5RXJyb3JBbGVydChlcnJvcikge1xyXG4gICAgc3dhbChcclxuICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgIGVycm9yLm1zZyxcclxuICAgICAgJ2Vycm9yJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==
