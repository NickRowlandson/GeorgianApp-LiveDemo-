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
var student_service_1 = require("../../services/student.service");
var authentication_service_1 = require("../../services/authentication.service");
var StudentManageComponent = (function () {
    function StudentManageComponent(router, ngZone, studentService, authService) {
        this.router = router;
        this.ngZone = ngZone;
        this.studentService = studentService;
        this.authService = authService;
    }
    StudentManageComponent.prototype.ngOnInit = function () {
        this.getStudents();
    };
    StudentManageComponent.prototype.getStudents = function () {
        var _this = this;
        this.studentService
            .getStudents()
            .then(function (students) {
            if (students.status === "403") {
                _this.students = null;
            }
            else {
                _this.students = students;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    StudentManageComponent.prototype.addClient = function () {
        this.router.navigate(['/suitability']);
    };
    StudentManageComponent.prototype.gotoEdit = function (student, event) {
        this.router.navigate(['/student-edit', student.studentID]);
    };
    StudentManageComponent.prototype.addStudent = function () {
        this.router.navigate(['/student-edit', 'new']);
    };
    StudentManageComponent.prototype.archiveAlert = function (student, event) {
        var _this = this;
        swal({
            title: 'Archive student (' + student.firstName + ' ' + student.lastName + ')',
            text: "Are you sure want to do this?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Archive it!'
        }).then(function (isConfirm) {
            if (isConfirm) {
                _this.archiveStudent(student, event);
            }
        });
    };
    StudentManageComponent.prototype.archiveStudent = function (student, event) {
        swal('Sorry...', 'This functionality is not yet available', 'info');
    };
    StudentManageComponent.prototype.populatePRF = function (student) {
        this.studentService
            .populatePRF(student.userID)
            .then(function (response) {
            swal('Sorry...', 'This feature is not yet available', 'info');
        })
            .catch(function (error) { return console.log(error); });
    };
    StudentManageComponent.prototype.goBack = function () {
        window.history.back();
    };
    StudentManageComponent = __decorate([
        core_1.Component({
            selector: 'student-manage',
            templateUrl: './app/components/student-manage/student-manage.component.html',
            styleUrls: ['./app/components/student-manage/student-manage.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, core_1.NgZone, student_service_1.StudentService, authentication_service_1.AuthService])
    ], StudentManageComponent);
    return StudentManageComponent;
}());
exports.StudentManageComponent = StudentManageComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMEQ7QUFFMUQsMENBQXlDO0FBQ3pDLGtFQUFnRTtBQUNoRSxnRkFBb0U7QUFVcEU7SUFJSSxnQ0FBb0IsTUFBYyxFQUFVLE1BQWMsRUFBVSxjQUE4QixFQUFVLFdBQXdCO1FBQWhILFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFFcEksQ0FBQztJQUVELHlDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELDRDQUFXLEdBQVg7UUFBQSxpQkFXQztRQVZDLElBQUksQ0FBQyxjQUFjO2FBQ2hCLFdBQVcsRUFBRTthQUNiLElBQUksQ0FBQyxVQUFBLFFBQVE7WUFDWixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUMzQixDQUFDO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsMENBQVMsR0FBVDtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQseUNBQVEsR0FBUixVQUFTLE9BQWdCLEVBQUUsS0FBVTtRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsMkNBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELDZDQUFZLEdBQVosVUFBYSxPQUFnQixFQUFFLEtBQVU7UUFBekMsaUJBY0M7UUFiQyxJQUFJLENBQUM7WUFDRCxLQUFLLEVBQUUsbUJBQW1CLEdBQUcsT0FBTyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLFFBQVEsR0FBRyxHQUFHO1lBQzdFLElBQUksRUFBRSwrQkFBK0I7WUFDckMsSUFBSSxFQUFFLFNBQVM7WUFDZixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLGtCQUFrQixFQUFFLFNBQVM7WUFDN0IsaUJBQWlCLEVBQUUsTUFBTTtZQUN6QixpQkFBaUIsRUFBRSxrQkFBa0I7U0FDeEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFNBQVM7WUFDZixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNkLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwrQ0FBYyxHQUFkLFVBQWUsT0FBTyxFQUFFLEtBQUs7UUFDM0IsSUFBSSxDQUNBLFVBQVUsRUFDVix5Q0FBeUMsRUFDekMsTUFBTSxDQUNULENBQUM7SUFDSixDQUFDO0lBRUQsNENBQVcsR0FBWCxVQUFZLE9BQU87UUFDZixJQUFJLENBQUMsY0FBYzthQUNkLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2FBQzNCLElBQUksQ0FBQyxVQUFBLFFBQVE7WUFDWixJQUFJLENBQ0EsVUFBVSxFQUNWLG1DQUFtQyxFQUNuQyxNQUFNLENBQ1QsQ0FBQztRQUNKLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsdUNBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQTVFUSxzQkFBc0I7UUFObEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLCtEQUErRDtZQUM1RSxTQUFTLEVBQUUsQ0FBQyw4REFBOEQsQ0FBQztTQUM5RSxDQUFDO3lDQU04QixlQUFNLEVBQWtCLGFBQU0sRUFBMEIsZ0NBQWMsRUFBdUIsb0NBQVc7T0FKM0gsc0JBQXNCLENBNkVsQztJQUFELDZCQUFDO0NBN0VELEFBNkVDLElBQUE7QUE3RVksd0RBQXNCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3N0dWRlbnQtbWFuYWdlL3N0dWRlbnQtbWFuYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZVwiO1xyXG5cclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3N0dWRlbnQtbWFuYWdlJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTdHVkZW50TWFuYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHN0dWRlbnRzOiBTdHVkZW50IFtdO1xyXG4gICAgZXJyb3I6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIG5nWm9uZTogTmdab25lLCBwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRTdHVkZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFN0dWRlbnRzKCkge1xyXG4gICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgLmdldFN0dWRlbnRzKClcclxuICAgICAgICAudGhlbihzdHVkZW50cyA9PiB7XHJcbiAgICAgICAgICBpZiAoc3R1ZGVudHMuc3RhdHVzID09PSBcIjQwM1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3R1ZGVudHMgPSBudWxsO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zdHVkZW50cyA9IHN0dWRlbnRzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQ2xpZW50KCkge1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zdWl0YWJpbGl0eSddKTtcclxuICAgIH1cclxuXHJcbiAgICBnb3RvRWRpdChzdHVkZW50OiBTdHVkZW50LCBldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3R1ZGVudC1lZGl0Jywgc3R1ZGVudC5zdHVkZW50SURdKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRTdHVkZW50KCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3N0dWRlbnQtZWRpdCcsICduZXcnXSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXJjaGl2ZUFsZXJ0KHN0dWRlbnQ6IFN0dWRlbnQsIGV2ZW50OiBhbnkpIHtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ0FyY2hpdmUgc3R1ZGVudCAoJyArIHN0dWRlbnQuZmlyc3ROYW1lICsgJyAnICsgc3R1ZGVudC5sYXN0TmFtZSArICcpJyxcclxuICAgICAgICAgIHRleHQ6IFwiQXJlIHlvdSBzdXJlIHdhbnQgdG8gZG8gdGhpcz9cIixcclxuICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgQXJjaGl2ZSBpdCEnXHJcbiAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICB0aGlzLmFyY2hpdmVTdHVkZW50KHN0dWRlbnQsIGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFyY2hpdmVTdHVkZW50KHN0dWRlbnQsIGV2ZW50KTogdm9pZCB7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgICAnU29ycnkuLi4nLFxyXG4gICAgICAgICAgJ1RoaXMgZnVuY3Rpb25hbGl0eSBpcyBub3QgeWV0IGF2YWlsYWJsZScsXHJcbiAgICAgICAgICAnaW5mbydcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwb3B1bGF0ZVBSRihzdHVkZW50KSB7XHJcbiAgICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgICAucG9wdWxhdGVQUkYoc3R1ZGVudC51c2VySUQpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAnU29ycnkuLi4nLFxyXG4gICAgICAgICAgICAgICAgICAnVGhpcyBmZWF0dXJlIGlzIG5vdCB5ZXQgYXZhaWxhYmxlJyxcclxuICAgICAgICAgICAgICAgICAgJ2luZm8nXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgIH1cclxufVxyXG4iXX0=
