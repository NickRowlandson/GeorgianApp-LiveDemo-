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
var router_2 = require("@angular/router");
var authentication_service_1 = require("../../services/authentication.service");
var student_service_1 = require("../../services/student.service");
var ng2_file_upload_1 = require("ng2-file-upload");
var URL = 'api/uploadFile';
var FileUploadComponent = /** @class */ (function () {
    function FileUploadComponent(router, route, authService, studentService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.authService = authService;
        this.studentService = studentService;
        this.hasBaseDropZoneOver = false;
        this.uploader = new ng2_file_upload_1.FileUploader({ url: URL });
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            console.log("ImageUpload:uploaded:", item, status);
        };
        this.studentService
            .getStudents()
            .then(function (students) {
            _this.students = students;
            console.log(_this.students);
        })
            .catch(function (error) {
            // do something
        });
    }
    FileUploadComponent.prototype.studentSelect = function () {
        var _this = this;
        console.log(this.selectedStudent);
        // this.uploader.setOptions({
        //   additionalParameter: { studentID: this.selectedStudent }
        // });
        this.uploader.onBeforeUploadItem = function (item) {
            item.file.name = _this.selectedStudent + '_' + item.file.name;
        };
    };
    FileUploadComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    FileUploadComponent.prototype.goBack = function () {
        window.history.back();
    };
    FileUploadComponent = __decorate([
        core_1.Component({
            selector: 'fileUpload',
            templateUrl: './app/components/file-upload/file-upload.component.html',
            styleUrls: ['./app/components/file-upload/file-upload.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, router_2.ActivatedRoute, authentication_service_1.AuthService, student_service_1.StudentService])
    ], FileUploadComponent);
    return FileUploadComponent;
}());
exports.FileUploadComponent = FileUploadComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBaUQ7QUFDakQsMENBQXlDO0FBQ3pDLDBDQUF5RDtBQUN6RCxnRkFBb0U7QUFDcEUsa0VBQWdFO0FBQ2hFLG1EQUErQztBQUcvQyxJQUFNLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQztBQVE3QjtJQU1FLDZCQUFvQixNQUFjLEVBQVUsS0FBcUIsRUFBVSxXQUF3QixFQUFVLGNBQThCO1FBQTNJLGlCQWNDO1FBZG1CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBMEJwSSx3QkFBbUIsR0FBVyxLQUFLLENBQUM7UUF6QnpDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSw4QkFBWSxDQUFDLEVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUcsVUFBQyxJQUFRLEVBQUUsUUFBWSxFQUFFLE1BQVUsRUFBRSxPQUFXO1lBQzNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjO2FBQ2QsV0FBVyxFQUFFO2FBQ2IsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUNWLEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUs7WUFDVixlQUFlO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQUVELDJDQUFhLEdBQWI7UUFBQSxpQkFRQztRQVBDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2xDLDZCQUE2QjtRQUM3Qiw2REFBNkQ7UUFDN0QsTUFBTTtRQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEdBQUcsVUFBQyxJQUFJO1lBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQy9ELENBQUMsQ0FBQztJQUNKLENBQUM7SUFJTSwwQ0FBWSxHQUFuQixVQUFvQixDQUFLO1FBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELG9DQUFNLEdBQU47UUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUF4Q1UsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixXQUFXLEVBQUUseURBQXlEO1lBQ3RFLFNBQVMsRUFBRSxDQUFDLHdEQUF3RCxDQUFDO1NBQ3hFLENBQUM7eUNBUTRCLGVBQU0sRUFBaUIsdUJBQWMsRUFBdUIsb0NBQVcsRUFBMEIsZ0NBQWM7T0FOaEksbUJBQW1CLENBeUMvQjtJQUFELDBCQUFDO0NBekNELEFBeUNDLElBQUE7QUF6Q1ksa0RBQW1CIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2ZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRmlsZVVwbG9hZGVyIH0gZnJvbSAnbmcyLWZpbGUtdXBsb2FkJztcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvU3R1ZGVudFwiO1xyXG5cclxuY29uc3QgVVJMID0gJ2FwaS91cGxvYWRGaWxlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdmaWxlVXBsb2FkJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkQ29tcG9uZW50IHtcclxuICBwdWJsaWMgdXBsb2FkZXI6RmlsZVVwbG9hZGVyO1xyXG4gIHN0dWRlbnRzOiBTdHVkZW50W107XHJcbiAgc2VsZWN0ZWRTdHVkZW50OiBudW1iZXI7XHJcblxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLnVwbG9hZGVyID0gbmV3IEZpbGVVcGxvYWRlcih7dXJsOiBVUkx9KTtcclxuICAgIHRoaXMudXBsb2FkZXIub25Db21wbGV0ZUl0ZW0gPSAoaXRlbTphbnksIHJlc3BvbnNlOmFueSwgc3RhdHVzOmFueSwgaGVhZGVyczphbnkpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkltYWdlVXBsb2FkOnVwbG9hZGVkOlwiLCBpdGVtLCBzdGF0dXMpO1xyXG4gICAgfTtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAuZ2V0U3R1ZGVudHMoKVxyXG4gICAgICAgIC50aGVuKHN0dWRlbnRzID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdHVkZW50cyA9IHN0dWRlbnRzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0dWRlbnRzKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAvLyBkbyBzb21ldGhpbmdcclxuICAgICAgICB9KTtcclxuICB9XHJcblxyXG4gIHN0dWRlbnRTZWxlY3QoKSB7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLnNlbGVjdGVkU3R1ZGVudCk7XHJcbiAgICAvLyB0aGlzLnVwbG9hZGVyLnNldE9wdGlvbnMoe1xyXG4gICAgLy8gICBhZGRpdGlvbmFsUGFyYW1ldGVyOiB7IHN0dWRlbnRJRDogdGhpcy5zZWxlY3RlZFN0dWRlbnQgfVxyXG4gICAgLy8gfSk7XHJcbiAgICB0aGlzLnVwbG9hZGVyLm9uQmVmb3JlVXBsb2FkSXRlbSA9IChpdGVtKSA9PiB7XHJcbiAgICAgIGl0ZW0uZmlsZS5uYW1lID0gdGhpcy5zZWxlY3RlZFN0dWRlbnQgKyAnXycgKyBpdGVtLmZpbGUubmFtZTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGFzQmFzZURyb3Bab25lT3Zlcjpib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIHB1YmxpYyBmaWxlT3ZlckJhc2UoZTphbnkpOnZvaWQge1xyXG4gICAgdGhpcy5oYXNCYXNlRHJvcFpvbmVPdmVyID0gZTtcclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=
