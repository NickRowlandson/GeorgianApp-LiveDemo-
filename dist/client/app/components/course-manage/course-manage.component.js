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
                    item.courseStart = moment(item.courseStart).format('YYYY-MM-DD hh:mm A');
                    item.courseEnd = moment(item.courseStart).format('YYYY-MM-DD hh:mm A');
                    item.validFrom = moment(item.courseStart).format('YYYY-MM-DD');
                    item.validTo = moment(item.courseStart).format('YYYY-MM-DD');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb3Vyc2UtbWFuYWdlL2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF5QztBQUN6QyxnRUFBOEQ7QUFZOUQ7SUFTSSwrQkFBb0IsTUFBYyxFQUFVLGFBQTRCO1FBQXBELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUp4RSxlQUFVLEdBQVUsRUFBRSxDQUFDO1FBQ3ZCLFVBQVU7UUFDVixhQUFRLEdBQWlCLENBQUMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRzlELENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBRUksc0RBQXNEO1FBQ3RELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCwyQ0FBVyxHQUFYO1FBQUEsaUJBVUM7UUFURyxlQUFlO1FBQ2YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO1lBQ3pDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDO2dCQUNiLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO29CQUNmLEtBQUssRUFBRSxDQUFDLENBQUMsVUFBVTtvQkFDbkIsS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRO2lCQUNwQixDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELDZDQUFhLEdBQWI7UUFBQSxpQkFLQztRQUpHLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FB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LEtBQVU7UUFFL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELHlDQUFTLEdBQVQ7UUFFSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxxREFBcUIsR0FBckIsVUFBc0IsTUFBYyxFQUFFLEtBQVU7UUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDMUcsQ0FBQztJQUVELHNDQUFNLEdBQU47UUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFDRCw0Q0FBWSxHQUFaLFVBQWEsR0FBRztRQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpELENBQUM7SUFoSFEscUJBQXFCO1FBUGpDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsY0FBYztZQUN4QixXQUFXLEVBQUUsNkRBQTZEO1lBQzFFLFNBQVMsRUFBRSxDQUFDLDREQUE0RCxDQUFDO1NBQzVFLENBQUM7eUNBWThCLGVBQU0sRUFBeUIsOEJBQWE7T0FUL0QscUJBQXFCLENBa0hqQztJQUFELDRCQUFDO0NBbEhELEFBa0hDLElBQUE7QUFsSFksc0RBQXFCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2NvdXJzZS1tYW5hZ2UvY291cnNlLW1hbmFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb3Vyc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY291cnNlXCI7XHJcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcbmRlY2xhcmUgdmFyIG1vbWVudDogYW55O1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnY291cnNlTWFuYWdlJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9jb3Vyc2UtbWFuYWdlL2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvY291cnNlLW1hbmFnZS9jb3Vyc2UtbWFuYWdlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDb3Vyc2VNYW5hZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgY291cnNlczogQ291cnNlW107XHJcbiAgICBlcnJvcjogYW55O1xyXG4gICAgQ2FtcHVzOiBzdHJpbmdbXTtcclxuICAgIGNhbXB1c0lkOiBhbnk7XHJcbiAgICBwcm9mZXNzb3JzOiBhbnlbXSA9IFtdO1xyXG4gICAgLy9kcm9wZG93blxyXG4gICAgY2FtcHVzZXM6IFNlbGVjdEl0ZW1bXSA9IFt7IGxhYmVsOiAnIC0tIEFsbCAtLScsIHZhbHVlOiAnJyB9XTtcclxuICAgIHNlbGVjdGVkQ2FtcHVzSWQ6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgQ291cnNlU2VydmljZTogQ291cnNlU2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQgaGg6bW0gQScpKTtcclxuICAgICAgICB0aGlzLmdldFByb2Zlc3NvcnMoKTtcclxuICAgICAgICB0aGlzLmdldENhbXB1c2VzKCk7XHJcbiAgICAgICAgdGhpcy5nZXRDb3Vyc2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2FtcHVzZXMoKSB7XHJcbiAgICAgICAgLy8gZ2V0IGNhbXB1c2VzXHJcbiAgICAgICAgdGhpcy5Db3Vyc2VTZXJ2aWNlLmdldENhbXB1c2VzKCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKChpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbXB1c2VzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBpLmNhbXB1c05hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGkuY2FtcHVzSWRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldFByb2Zlc3NvcnMoKSB7XHJcbiAgICAgICAgLy8gZ2V0IHByb2Zlc3NvcnNcclxuICAgICAgICB0aGlzLkNvdXJzZVNlcnZpY2UuZ2V0UHJvZmVzc29ycygpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnByb2Zlc3NvcnMgPSByZXN1bHQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBnZXRDb3Vyc2VzKCkge1xyXG4gICAgICAgIHRoaXMuQ291cnNlU2VydmljZVxyXG4gICAgICAgICAgICAuZ2V0Q291cnNlcygpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gXCI0MDNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY291cnNlcyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZm9ybWF0IGRhdGV0aW1lXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jb3Vyc2VTdGFydCA9IG1vbWVudChpdGVtLmNvdXJzZVN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgaGg6bW0gQScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNvdXJzZUVuZCA9IG1vbWVudChpdGVtLmNvdXJzZVN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQgaGg6bW0gQScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbGlkRnJvbSA9IG1vbWVudChpdGVtLmNvdXJzZVN0YXJ0KS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS52YWxpZFRvID0gbW9tZW50KGl0ZW0uY291cnNlU3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY291cnNlcyA9IHJlc3VsdDtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVBbGVydChjb3Vyc2U6IENvdXJzZSwgZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ0RlbGV0ZSBjb3Vyc2UgKCcgKyBjb3Vyc2UuY291cnNlTmFtZSArICcpPycsXHJcbiAgICAgICAgICAgIHRleHQ6IFwiWW91IHdvbid0IGJlIGFibGUgdG8gcmV2ZXJ0IHRoaXMhXCIsXHJcbiAgICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBkZWxldGUgaXQhJ1xyXG4gICAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICAgICAgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGVDb3Vyc2UoY291cnNlLCBldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJDYW5jZWxlZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVDb3Vyc2UoY291cnNlOiBDb3Vyc2UsIGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0aGlzLkNvdXJzZVNlcnZpY2VcclxuICAgICAgICAgICAgLmRlbGV0ZShjb3Vyc2UpXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZXMgPSB0aGlzLmNvdXJzZXMuZmlsdGVyKGggPT4gaCAhPT0gY291cnNlKTtcclxuICAgICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICAgJ0RlbGV0ZWQhJyxcclxuICAgICAgICAgICAgICAgICAgICAnQ291cnNlIHJlY29yZCBoYXMgYmVlbiBkZWxldGVkLicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBnb3RvRWRpdChjb3Vyc2U6IENvdXJzZSwgZXZlbnQ6IGFueSkge1xyXG5cclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9jb3Vyc2UtZWRpdCcsIGNvdXJzZS5jb3Vyc2VJRF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZENvdXJzZSgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvY291cnNlLWVkaXQnLCAnbmV3J10pO1xyXG4gICAgfVxyXG5cclxuICAgIGdvdG9TdHVkZW50RW5yb2xsbWVudChjb3Vyc2U6IENvdXJzZSwgZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3N0dWRlbnQtZW5yb2xsbWVudCcsIGNvdXJzZS5jb3Vyc2VJRCwgY291cnNlLnByb2Zlc3NvcklkLCBjb3Vyc2UuY291cnNlTmFtZV0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICB9XHJcbiAgICBmaWx0ZXJDYW1wdXMoY2FtKSB7XHJcbiAgICAgICAgdGhpcy5jYW1wdXNJZCA9IHRoaXMuQ2FtcHVzLmluZGV4T2YoY2FtKSArIDE7XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=
