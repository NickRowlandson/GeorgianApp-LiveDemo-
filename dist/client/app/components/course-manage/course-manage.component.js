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
exports.CourseManageComponent = CourseManageComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb3Vyc2UtbWFuYWdlL2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF5QztBQUN6QyxnRUFBOEQ7QUFhOUQ7SUFVSSwrQkFBb0IsTUFBYyxFQUFVLGFBQTRCO1FBQXBELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUx4RSxlQUFVLEdBQVUsRUFBRSxDQUFDO1FBQ3ZCLFVBQVU7UUFDVixhQUFRLEdBQWlCLENBQUMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBSTlELENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBRUksc0RBQXNEO1FBQ3RELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCwyQ0FBVyxHQUFYO1FBQUEsaUJBVUM7UUFURyxlQUFlO1FBQ2YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO1lBQ3pDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDO2dCQUNiLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO29CQUNmLEtBQUssRUFBRSxDQUFDLENBQUMsVUFBVTtvQkFDbkIsS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRO2lCQUNwQixDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDZDQUFhLEdBQWI7UUFBQSxpQkFLQztRQUpHLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FB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LENBQUM7SUFDbEQsQ0FBQztJQUVELHFEQUFxQixHQUFyQixVQUFzQixNQUFjLEVBQUUsS0FBVTtRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRUQsc0NBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNELDRDQUFZLEdBQVosVUFBYSxHQUFHO1FBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFakQsQ0FBQztJQWhIUSxxQkFBcUI7UUFQakMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFdBQVcsRUFBRSw2REFBNkQ7WUFDMUUsU0FBUyxFQUFFLENBQUMsNERBQTRELENBQUM7U0FDNUUsQ0FBQzt5Q0FhOEIsZUFBTSxFQUF5Qiw4QkFBYTtPQVYvRCxxQkFBcUIsQ0FrSGpDO0lBQUQsNEJBQUM7Q0FsSEQsQUFrSEMsSUFBQTtBQWxIWSxzREFBcUIiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvY291cnNlLW1hbmFnZS9jb3Vyc2UtbWFuYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291cnNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291cnNlIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb3Vyc2VcIjtcclxuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuZGVjbGFyZSB2YXIgbW9tZW50OiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnY291cnNlTWFuYWdlJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9jb3Vyc2UtbWFuYWdlL2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvY291cnNlLW1hbmFnZS9jb3Vyc2UtbWFuYWdlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDb3Vyc2VNYW5hZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgY291cnNlczogQ291cnNlW107XHJcbiAgICBlcnJvcjogYW55O1xyXG4gICAgQ2FtcHVzOiBzdHJpbmdbXTtcclxuICAgIGNhbXB1c0lkOiBhbnk7XHJcbiAgICBwcm9mZXNzb3JzOiBhbnlbXSA9IFtdO1xyXG4gICAgLy9kcm9wZG93blxyXG4gICAgY2FtcHVzZXM6IFNlbGVjdEl0ZW1bXSA9IFt7IGxhYmVsOiAnIC0tIEFsbCAtLScsIHZhbHVlOiAnJyB9XTtcclxuICAgIHNlbGVjdGVkQ2FtcHVzSWQ6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIENvdXJzZVNlcnZpY2U6IENvdXJzZVNlcnZpY2UpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cobW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREIGhoOm1tIEEnKSk7XHJcbiAgICAgICAgdGhpcy5nZXRQcm9mZXNzb3JzKCk7XHJcbiAgICAgICAgdGhpcy5nZXRDYW1wdXNlcygpO1xyXG4gICAgICAgIHRoaXMuZ2V0Q291cnNlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENhbXB1c2VzKCkge1xyXG4gICAgICAgIC8vIGdldCBjYW1wdXNlc1xyXG4gICAgICAgIHRoaXMuQ291cnNlU2VydmljZS5nZXRDYW1wdXNlcygpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICByZXN1bHQuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW1wdXNlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogaS5jYW1wdXNOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpLmNhbXB1c0lkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHJvZmVzc29ycygpIHtcclxuICAgICAgICAvLyBnZXQgcHJvZmVzc29yc1xyXG4gICAgICAgIHRoaXMuQ291cnNlU2VydmljZS5nZXRQcm9mZXNzb3JzKCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZmVzc29ycyA9IHJlc3VsdDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldENvdXJzZXMoKSB7XHJcbiAgICAgICAgdGhpcy5Db3Vyc2VTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5nZXRDb3Vyc2VzKClcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkuc3RhdHVzID09PSBcIjQwM1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3Vyc2VzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9mb3JtYXQgZGF0ZXRpbWVcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNvdXJzZVN0YXJ0ID0gbW9tZW50KGl0ZW0uY291cnNlU3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNvdXJzZUVuZCA9IG1vbWVudChpdGVtLmNvdXJzZUVuZCkuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3Vyc2VzID0gcmVzdWx0O1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUFsZXJ0KGNvdXJzZTogQ291cnNlLCBldmVudDogYW55KSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnRGVsZXRlIGNvdXJzZSAoJyArIGNvdXJzZS5jb3Vyc2VOYW1lICsgJyk/JyxcclxuICAgICAgICAgICAgdGV4dDogXCJZb3Ugd29uJ3QgYmUgYWJsZSB0byByZXZlcnQgdGhpcyFcIixcclxuICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIGRlbGV0ZSBpdCEnXHJcbiAgICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUNvdXJzZShjb3Vyc2UsIGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNhbmNlbGVkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUNvdXJzZShjb3Vyc2U6IENvdXJzZSwgZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuQ291cnNlU2VydmljZVxyXG4gICAgICAgICAgICAuZGVsZXRlKGNvdXJzZSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY291cnNlcyA9IHRoaXMuY291cnNlcy5maWx0ZXIoaCA9PiBoICE9PSBjb3Vyc2UpO1xyXG4gICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAnRGVsZXRlZCEnLFxyXG4gICAgICAgICAgICAgICAgICAgICdDb3Vyc2UgcmVjb3JkIGhhcyBiZWVuIGRlbGV0ZWQuJyxcclxuICAgICAgICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGdvdG9FZGl0KGNvdXJzZTogQ291cnNlLCBldmVudDogYW55KSB7XHJcblxyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2NvdXJzZS1lZGl0JywgY291cnNlLmNvdXJzZUlEXSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQ291cnNlKCkge1xyXG5cclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9jb3Vyc2UtZWRpdCcsICduZXcnXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ290b1N0dWRlbnRFbnJvbGxtZW50KGNvdXJzZTogQ291cnNlLCBldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3R1ZGVudC1lbnJvbGxtZW50JywgY291cnNlLmNvdXJzZUlELCBjb3Vyc2UucHJvZmVzc29ySWQsIGNvdXJzZS5jb3Vyc2VOYW1lXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgIH1cclxuICAgIGZpbHRlckNhbXB1cyhjYW0pIHtcclxuICAgICAgICB0aGlzLmNhbXB1c0lkID0gdGhpcy5DYW1wdXMuaW5kZXhPZihjYW0pICsgMTtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==
