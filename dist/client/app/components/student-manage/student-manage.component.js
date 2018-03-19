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
var files_service_1 = require("../../services/files.service");
var StudentManageComponent = /** @class */ (function () {
    function StudentManageComponent(router, ngZone, studentService, authService, filesService) {
        this.router = router;
        this.ngZone = ngZone;
        this.studentService = studentService;
        this.authService = authService;
        this.filesService = filesService;
        this.studentInfoView = false;
        this.showGeneral = true;
        //bar chart (learning style)
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = ['Hearing', 'Seeing', 'Doing'];
        this.barChartType = 'bar';
        this.barChartLegend = false;
        this.barChartColors = [{ backgroundColor: ["#FF4207", "#F8E903", "#2AD308"] }];
    }
    StudentManageComponent.prototype.ngOnInit = function () {
        this.getStudents();
        this.getFiles();
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
                for (var _i = 0, _a = _this.students; _i < _a.length; _i++) {
                    var student = _a[_i];
                    student.fullName = student.firstName + " " + student.lastName;
                }
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    StudentManageComponent.prototype.getFiles = function () {
        var _this = this;
        this.filesService
            .getFiles()
            .then(function (files) {
            _this.files = files;
            for (var _i = 0, _a = _this.files; _i < _a.length; _i++) {
                var file = _a[_i];
                file.userID = +file.userID;
            }
            swal.close();
            console.log(_this.files);
        })
            .catch(function (error) { return error; });
    };
    StudentManageComponent.prototype.download = function (file) {
        console.log(file);
        var filename = file.milliseconds + "_" + file.userID + "_" + file.filename;
        this.filesService
            .download(filename)
            .then(function (response) {
            var blob = new Blob([response], { type: "application/pdf" });
            //change download.pdf to the name of whatever you want your file to be
            console.log(blob);
            saveAs(blob, file.filename);
        })
            .catch(function (error) { return error; });
    };
    StudentManageComponent.prototype.deleteFileAlert = function (file) {
        var _this = this;
        var filename = file.milliseconds + "_" + file.userID + "_" + file.filename;
        swal({
            title: 'Delete file (' + file.filename + ')?',
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
                _this.deleteFile(filename);
            }
        }).catch(function (error) { return error; });
    };
    StudentManageComponent.prototype.deleteFile = function (filename) {
        var _this = this;
        event.stopPropagation();
        this.filesService
            .delete(filename)
            .then(function (res) {
            _this.getFiles();
            swal('Deleted!', 'File has been deleted.', 'success');
        })
            .catch(function (error) { return error; });
    };
    StudentManageComponent.prototype.addFile = function () {
        this.router.navigate(['/file-upload']);
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
            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                console.log(isConfirm.dismiss);
            }
            else if (isConfirm) {
                _this.archiveStudent(student, event);
            }
        }).catch(function (error) {
            console.log(error);
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
    StudentManageComponent.prototype.viewInfo = function (student) {
        var _this = this;
        this.resetView();
        this.showGeneral = true;
        this.studentInfoView = true;
        this.studentView = student;
        this.studentsFiles = this.files.filter(function (x) { return x.userID === _this.studentView.userID; });
        this.studentService
            .getAllFormsByID(student)
            .then(function (forms) {
            if (forms.status === "403") {
                _this.consentView = null;
                _this.learningStyleView = null;
                _this.suitabilityView = null;
            }
            else {
                _this.consentView = forms.consentForm[0];
                _this.learningStyleView = forms.learningStyleForm[0];
                _this.suitabilityView = forms.suitabilityForm[0];
                _this.barChartData = [{ data: [_this.learningStyleView.hearing, _this.learningStyleView.seeing, _this.learningStyleView.doing] }];
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    StudentManageComponent.prototype.overallStatus = function () {
        this.studentInfoView = false;
    };
    StudentManageComponent.prototype.sectionBtnClicked = function (event, section) {
        this.resetView();
        if (section === "general") {
            this.showGeneral = true;
        }
        else if (section === "suitability") {
            this.showSuitability = true;
        }
        else if (section === "consent") {
            this.showConsent = true;
        }
        else if (section === "learningStyle") {
            this.showLearningStyle = true;
        }
        else if (section === "files") {
            this.showFiles = true;
        }
    };
    StudentManageComponent.prototype.resetView = function () {
        this.showGeneral = false;
        this.showSuitability = false;
        this.showConsent = false;
        this.showLearningStyle = false;
        this.showFiles = false;
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
        __metadata("design:paramtypes", [router_1.Router, core_1.NgZone, student_service_1.StudentService, authentication_service_1.AuthService, files_service_1.FilesService])
    ], StudentManageComponent);
    return StudentManageComponent;
}());
exports.StudentManageComponent = StudentManageComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMEQ7QUFLMUQsMENBQXlDO0FBQ3pDLGtFQUFnRTtBQUNoRSxnRkFBb0U7QUFDcEUsOERBQTREO0FBVTVEO0lBNkJJLGdDQUFvQixNQUFjLEVBQVUsTUFBYyxFQUFVLGNBQThCLEVBQVUsV0FBd0IsRUFBVSxZQUEwQjtRQUFwSixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7UUExQnhLLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBTWpDLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBTTVCLDRCQUE0QjtRQUM1QixvQkFBZSxHQUFPO1lBQ3BCLHNCQUFzQixFQUFFLEtBQUs7WUFDN0IsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQztRQUNGLG1CQUFjLEdBQVksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELGlCQUFZLEdBQVUsS0FBSyxDQUFDO1FBQzVCLG1CQUFjLEdBQVcsS0FBSyxDQUFDO1FBRS9CLG1CQUFjLEdBQVUsQ0FBQyxFQUFFLGVBQWUsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBT2pGLENBQUM7SUFFRCx5Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsNENBQVcsR0FBWDtRQUFBLGlCQWNDO1FBYkMsSUFBSSxDQUFDLGNBQWM7YUFDaEIsV0FBVyxFQUFFO2FBQ2IsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUNaLEVBQUUsQ0FBQyxDQUFFLFFBQWdCLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFDekIsR0FBRyxDQUFDLENBQWdCLFVBQWEsRUFBYixLQUFBLEtBQUksQ0FBQyxRQUFRLEVBQWIsY0FBYSxFQUFiLElBQWE7b0JBQTVCLElBQUksT0FBTyxTQUFBO29CQUNkLE9BQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztpQkFDL0Q7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQseUNBQVEsR0FBUjtRQUFBLGlCQVlDO1FBWEMsSUFBSSxDQUFDLFlBQVk7YUFDWixRQUFRLEVBQUU7YUFDVixJQUFJLENBQUMsVUFBQSxLQUFLO1lBQ1QsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsR0FBRyxDQUFDLENBQWEsVUFBVSxFQUFWLEtBQUEsS0FBSSxDQUFDLEtBQUssRUFBVixjQUFVLEVBQVYsSUFBVTtnQkFBdEIsSUFBSSxJQUFJLFNBQUE7Z0JBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDNUI7WUFDRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLEVBQUwsQ0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELHlDQUFRLEdBQVIsVUFBUyxJQUFJO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzNFLElBQUksQ0FBQyxZQUFZO2FBQ1osUUFBUSxDQUFDLFFBQVEsQ0FBQzthQUNsQixJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ1osSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBQyxDQUFDLENBQUM7WUFDM0Qsc0VBQXNFO1lBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxFQUFMLENBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxnREFBZSxHQUFmLFVBQWdCLElBQUk7UUFBcEIsaUJBaUJDO1FBaEJHLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDM0UsSUFBSSxDQUFDO1lBQ0QsS0FBSyxFQUFFLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUk7WUFDN0MsSUFBSSxFQUFFLG1DQUFtQztZQUN6QyxJQUFJLEVBQUUsU0FBUztZQUNmLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsa0JBQWtCLEVBQUUsU0FBUztZQUM3QixpQkFBaUIsRUFBRSxNQUFNO1lBQ3pCLGlCQUFpQixFQUFFLGlCQUFpQjtTQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsU0FBUztZQUNmLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEtBQUssUUFBUSxJQUFJLFNBQVMsQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakMsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixLQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLEVBQUwsQ0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELDJDQUFVLEdBQVYsVUFBVyxRQUFRO1FBQW5CLGlCQWFDO1FBWkcsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZO2FBQ1osTUFBTSxDQUFDLFFBQVEsQ0FBQzthQUNoQixJQUFJLENBQUMsVUFBQSxHQUFHO1lBQ0wsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FDQSxVQUFVLEVBQ1Ysd0JBQXdCLEVBQ3hCLFNBQVMsQ0FDWixDQUFDO1FBQ04sQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxFQUFMLENBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCx3Q0FBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCwwQ0FBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCx5Q0FBUSxHQUFSLFVBQVMsT0FBZ0IsRUFBRSxLQUFVO1FBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCwyQ0FBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsNkNBQVksR0FBWixVQUFhLE9BQWdCLEVBQUUsS0FBVTtRQUF6QyxpQkFrQkM7UUFqQkMsSUFBSSxDQUFDO1lBQ0QsS0FBSyxFQUFFLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEdBQUcsR0FBRztZQUM3RSxJQUFJLEVBQUUsK0JBQStCO1lBQ3JDLElBQUksRUFBRSxTQUFTO1lBQ2YsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixrQkFBa0IsRUFBRSxTQUFTO1lBQzdCLGlCQUFpQixFQUFFLE1BQU07WUFDekIsaUJBQWlCLEVBQUUsa0JBQWtCO1NBQ3hDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxTQUFTO1lBQ2YsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sS0FBSyxRQUFRLElBQUksU0FBUyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN0RSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwrQ0FBYyxHQUFkLFVBQWUsT0FBTyxFQUFFLEtBQUs7UUFDM0IsSUFBSSxDQUNBLFVBQVUsRUFDVix5Q0FBeUMsRUFDekMsTUFBTSxDQUNULENBQUM7SUFDSixDQUFDO0lBRUQsNENBQVcsR0FBWCxVQUFZLE9BQU87UUFDZixJQUFJLENBQUMsY0FBYzthQUNkLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2FBQzNCLElBQUksQ0FBQyxVQUFBLFFBQVE7WUFDWixJQUFJLENBQ0EsVUFBVSxFQUNWLG1DQUFtQyxFQUNuQyxNQUFNLENBQ1QsQ0FBQztRQUNKLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQseUNBQVEsR0FBUixVQUFTLE9BQWdCO1FBQXpCLGlCQXFCQztRQXBCQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEtBQUssS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQXBDLENBQW9DLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsY0FBYzthQUNoQixlQUFlLENBQUMsT0FBTyxDQUFDO2FBQ3hCLElBQUksQ0FBQyxVQUFBLEtBQUs7WUFDVCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixLQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO2dCQUM5QixLQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztZQUM5QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxLQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxLQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELEtBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxLQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQy9ILENBQUM7UUFDSCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCw4Q0FBYSxHQUFiO1FBQ0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQztJQUVELGtEQUFpQixHQUFqQixVQUFrQixLQUFLLEVBQUUsT0FBTztRQUM1QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDNUIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNoQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzVCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUNsQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQzFCLENBQUM7SUFDTCxDQUFDO0lBRUQsMENBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELHVDQUFNLEdBQU47UUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFqT1Esc0JBQXNCO1FBTmxDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFdBQVcsRUFBRSwrREFBK0Q7WUFDNUUsU0FBUyxFQUFFLENBQUMsOERBQThELENBQUM7U0FDOUUsQ0FBQzt5Q0ErQjhCLGVBQU0sRUFBa0IsYUFBTSxFQUEwQixnQ0FBYyxFQUF1QixvQ0FBVyxFQUF3Qiw0QkFBWTtPQTdCL0osc0JBQXNCLENBa09sQztJQUFELDZCQUFDO0NBbE9ELEFBa09DLElBQUE7QUFsT1ksd0RBQXNCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3N0dWRlbnQtbWFuYWdlL3N0dWRlbnQtbWFuYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBDb25zZW50Rm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29uc2VudEZvcm1cIjtcclxuaW1wb3J0IHsgU3VpdGFiaWxpdHlGb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdWl0YWJpbGl0eUZvcm1cIjtcclxuaW1wb3J0IHsgTGVhcm5pbmdTdHlsZUZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2xlYXJuaW5nU3R5bGVGb3JtXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEZpbGVzU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9maWxlcy5zZXJ2aWNlXCI7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuZGVjbGFyZSB2YXIgRmlsZVNhdmVyOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnc3R1ZGVudC1tYW5hZ2UnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3N0dWRlbnQtbWFuYWdlL3N0dWRlbnQtbWFuYWdlLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3N0dWRlbnQtbWFuYWdlL3N0dWRlbnQtbWFuYWdlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0dWRlbnRNYW5hZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgc3R1ZGVudHM6IFN0dWRlbnQgW107XHJcbiAgICBlcnJvcjogYW55O1xyXG4gICAgc3R1ZGVudEluZm9WaWV3OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBzdHVkZW50VmlldzogU3R1ZGVudDtcclxuICAgIGNvbnNlbnRWaWV3OiBDb25zZW50Rm9ybTtcclxuICAgIHN1aXRhYmlsaXR5VmlldzogU3VpdGFiaWxpdHlGb3JtO1xyXG4gICAgbGVhcm5pbmdTdHlsZVZpZXc6IExlYXJuaW5nU3R5bGVGb3JtO1xyXG5cclxuICAgIHNob3dHZW5lcmFsOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHNob3dTdWl0YWJpbGl0eTogYm9vbGVhbjtcclxuICAgIHNob3dDb25zZW50OiBib29sZWFuO1xyXG4gICAgc2hvd0xlYXJuaW5nU3R5bGU6IGJvb2xlYW47XHJcbiAgICBzaG93RmlsZXM6IGJvb2xlYW47XHJcblxyXG4gICAgLy9iYXIgY2hhcnQgKGxlYXJuaW5nIHN0eWxlKVxyXG4gICAgYmFyQ2hhcnRPcHRpb25zOmFueSA9IHtcclxuICAgICAgc2NhbGVTaG93VmVydGljYWxMaW5lczogZmFsc2UsXHJcbiAgICAgIHJlc3BvbnNpdmU6IHRydWVcclxuICAgIH07XHJcbiAgICBiYXJDaGFydExhYmVsczpzdHJpbmdbXSA9IFsnSGVhcmluZycsICdTZWVpbmcnLCAnRG9pbmcnXTtcclxuICAgIGJhckNoYXJ0VHlwZTpzdHJpbmcgPSAnYmFyJztcclxuICAgIGJhckNoYXJ0TGVnZW5kOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGJhckNoYXJ0RGF0YTphbnk7XHJcbiAgICBiYXJDaGFydENvbG9yczogYW55W10gPSBbeyBiYWNrZ3JvdW5kQ29sb3I6IFtcIiNGRjQyMDdcIiwgXCIjRjhFOTAzXCIsIFwiIzJBRDMwOFwiXSB9XTtcclxuXHJcbiAgICBmaWxlczogYW55W107XHJcbiAgICBzdHVkZW50c0ZpbGVzOiBhbnlbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIG5nWm9uZTogTmdab25lLCBwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIHByaXZhdGUgZmlsZXNTZXJ2aWNlOiBGaWxlc1NlcnZpY2UpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRTdHVkZW50cygpO1xyXG4gICAgICAgIHRoaXMuZ2V0RmlsZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdHVkZW50cygpIHtcclxuICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgIC5nZXRTdHVkZW50cygpXHJcbiAgICAgICAgLnRoZW4oc3R1ZGVudHMgPT4ge1xyXG4gICAgICAgICAgaWYgKChzdHVkZW50cyBhcyBhbnkpLnN0YXR1cyA9PT0gXCI0MDNcIikge1xyXG4gICAgICAgICAgICB0aGlzLnN0dWRlbnRzID0gbnVsbDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3R1ZGVudHMgPSBzdHVkZW50cztcclxuICAgICAgICAgICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLnN0dWRlbnRzKSB7XHJcbiAgICAgICAgICAgICAgc3R1ZGVudC5mdWxsTmFtZSA9IHN0dWRlbnQuZmlyc3ROYW1lICsgXCIgXCIgKyBzdHVkZW50Lmxhc3ROYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGaWxlcygpIHtcclxuICAgICAgdGhpcy5maWxlc1NlcnZpY2VcclxuICAgICAgICAgIC5nZXRGaWxlcygpXHJcbiAgICAgICAgICAudGhlbihmaWxlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsZXMgPSBmaWxlcztcclxuICAgICAgICAgICAgZm9yIChsZXQgZmlsZSBvZiB0aGlzLmZpbGVzKSB7XHJcbiAgICAgICAgICAgICAgZmlsZS51c2VySUQgPSArZmlsZS51c2VySUQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZpbGVzKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvd25sb2FkKGZpbGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZmlsZSk7XHJcbiAgICAgIHZhciBmaWxlbmFtZSA9IGZpbGUubWlsbGlzZWNvbmRzICsgXCJfXCIgKyBmaWxlLnVzZXJJRCArIFwiX1wiICsgZmlsZS5maWxlbmFtZTtcclxuICAgICAgdGhpcy5maWxlc1NlcnZpY2VcclxuICAgICAgICAgIC5kb3dubG9hZChmaWxlbmFtZSlcclxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbcmVzcG9uc2VdLCB7dHlwZTogXCJhcHBsaWNhdGlvbi9wZGZcIn0pO1xyXG4gICAgICAgICAgICAvL2NoYW5nZSBkb3dubG9hZC5wZGYgdG8gdGhlIG5hbWUgb2Ygd2hhdGV2ZXIgeW91IHdhbnQgeW91ciBmaWxlIHRvIGJlXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGJsb2IpO1xyXG4gICAgICAgICAgICBzYXZlQXMoYmxvYiwgZmlsZS5maWxlbmFtZSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVGaWxlQWxlcnQoZmlsZSkge1xyXG4gICAgICAgIHZhciBmaWxlbmFtZSA9IGZpbGUubWlsbGlzZWNvbmRzICsgXCJfXCIgKyBmaWxlLnVzZXJJRCArIFwiX1wiICsgZmlsZS5maWxlbmFtZTtcclxuICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgdGl0bGU6ICdEZWxldGUgZmlsZSAoJyArIGZpbGUuZmlsZW5hbWUgKyAnKT8nLFxyXG4gICAgICAgICAgICB0ZXh0OiBcIllvdSB3b24ndCBiZSBhYmxlIHRvIHJldmVydCB0aGlzIVwiLFxyXG4gICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgZGVsZXRlIGl0ISdcclxuICAgICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgICBpZiAoaXNDb25maXJtLmRpc21pc3MgPT09IFwiY2FuY2VsXCIgfHwgaXNDb25maXJtLmRpc21pc3MgPT09IFwib3ZlcmxheVwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlRmlsZShmaWxlbmFtZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUZpbGUoZmlsZW5hbWUpIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0aGlzLmZpbGVzU2VydmljZVxyXG4gICAgICAgICAgICAuZGVsZXRlKGZpbGVuYW1lKVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRGaWxlcygpO1xyXG4gICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAnRGVsZXRlZCEnLFxyXG4gICAgICAgICAgICAgICAgICAgICdGaWxlIGhhcyBiZWVuIGRlbGV0ZWQuJyxcclxuICAgICAgICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRmlsZSgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9maWxlLXVwbG9hZCddKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRDbGllbnQoKSB7XHJcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3N1aXRhYmlsaXR5J10pO1xyXG4gICAgfVxyXG5cclxuICAgIGdvdG9FZGl0KHN0dWRlbnQ6IFN0dWRlbnQsIGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zdHVkZW50LWVkaXQnLCBzdHVkZW50LnN0dWRlbnRJRF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFN0dWRlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3R1ZGVudC1lZGl0JywgJ25ldyddKTtcclxuICAgIH1cclxuXHJcbiAgICBhcmNoaXZlQWxlcnQoc3R1ZGVudDogU3R1ZGVudCwgZXZlbnQ6IGFueSkge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnQXJjaGl2ZSBzdHVkZW50ICgnICsgc3R1ZGVudC5maXJzdE5hbWUgKyAnICcgKyBzdHVkZW50Lmxhc3ROYW1lICsgJyknLFxyXG4gICAgICAgICAgdGV4dDogXCJBcmUgeW91IHN1cmUgd2FudCB0byBkbyB0aGlzP1wiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBBcmNoaXZlIGl0ISdcclxuICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgdGhpcy5hcmNoaXZlU3R1ZGVudChzdHVkZW50LCBldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhcmNoaXZlU3R1ZGVudChzdHVkZW50LCBldmVudCk6IHZvaWQge1xyXG4gICAgICBzd2FsKFxyXG4gICAgICAgICAgJ1NvcnJ5Li4uJyxcclxuICAgICAgICAgICdUaGlzIGZ1bmN0aW9uYWxpdHkgaXMgbm90IHlldCBhdmFpbGFibGUnLFxyXG4gICAgICAgICAgJ2luZm8nXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9wdWxhdGVQUkYoc3R1ZGVudCkge1xyXG4gICAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgICAgLnBvcHVsYXRlUFJGKHN0dWRlbnQudXNlcklEKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgJ1NvcnJ5Li4uJyxcclxuICAgICAgICAgICAgICAgICAgJ1RoaXMgZmVhdHVyZSBpcyBub3QgeWV0IGF2YWlsYWJsZScsXHJcbiAgICAgICAgICAgICAgICAgICdpbmZvJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIHZpZXdJbmZvKHN0dWRlbnQ6IFN0dWRlbnQpIHtcclxuICAgICAgdGhpcy5yZXNldFZpZXcoKTtcclxuICAgICAgdGhpcy5zaG93R2VuZXJhbCA9IHRydWU7XHJcbiAgICAgIHRoaXMuc3R1ZGVudEluZm9WaWV3ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zdHVkZW50VmlldyA9IHN0dWRlbnQ7XHJcbiAgICAgIHRoaXMuc3R1ZGVudHNGaWxlcyA9IHRoaXMuZmlsZXMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IHRoaXMuc3R1ZGVudFZpZXcudXNlcklEKTtcclxuICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgIC5nZXRBbGxGb3Jtc0J5SUQoc3R1ZGVudClcclxuICAgICAgICAudGhlbihmb3JtcyA9PiB7XHJcbiAgICAgICAgICBpZiAoZm9ybXMuc3RhdHVzID09PSBcIjQwM1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc2VudFZpZXcgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmxlYXJuaW5nU3R5bGVWaWV3ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5zdWl0YWJpbGl0eVZpZXcgPSBudWxsO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50VmlldyA9IGZvcm1zLmNvbnNlbnRGb3JtWzBdO1xyXG4gICAgICAgICAgICB0aGlzLmxlYXJuaW5nU3R5bGVWaWV3ID0gZm9ybXMubGVhcm5pbmdTdHlsZUZvcm1bMF07XHJcbiAgICAgICAgICAgIHRoaXMuc3VpdGFiaWxpdHlWaWV3ID0gZm9ybXMuc3VpdGFiaWxpdHlGb3JtWzBdO1xyXG4gICAgICAgICAgICB0aGlzLmJhckNoYXJ0RGF0YSA9IFt7IGRhdGE6IFt0aGlzLmxlYXJuaW5nU3R5bGVWaWV3LmhlYXJpbmcsIHRoaXMubGVhcm5pbmdTdHlsZVZpZXcuc2VlaW5nLCB0aGlzLmxlYXJuaW5nU3R5bGVWaWV3LmRvaW5nXX1dO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgb3ZlcmFsbFN0YXR1cygpIHtcclxuICAgICAgdGhpcy5zdHVkZW50SW5mb1ZpZXcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZWN0aW9uQnRuQ2xpY2tlZChldmVudCwgc2VjdGlvbikge1xyXG4gICAgICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICAgICAgaWYgKHNlY3Rpb24gPT09IFwiZ2VuZXJhbFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0dlbmVyYWwgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2VjdGlvbiA9PT0gXCJzdWl0YWJpbGl0eVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5ID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNlY3Rpb24gPT09IFwiY29uc2VudFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0NvbnNlbnQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2VjdGlvbiA9PT0gXCJsZWFybmluZ1N0eWxlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93TGVhcm5pbmdTdHlsZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzZWN0aW9uID09PSBcImZpbGVzXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93RmlsZXMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXNldFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93R2VuZXJhbCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93Q29uc2VudCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd0xlYXJuaW5nU3R5bGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNob3dGaWxlcyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICB9XHJcbn1cclxuIl19
