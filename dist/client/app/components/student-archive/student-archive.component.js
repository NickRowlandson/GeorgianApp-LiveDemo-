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
const student_service_1 = require("../../services/student.service");
let StudentArchiveComponent = class StudentArchiveComponent {
    constructor(router, studentService) {
        this.router = router;
        this.studentService = studentService;
    }
    ngOnInit() {
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();
        this.getStudentArchive();
        //this.getTimetables();
    }
    getStudentArchive() {
        this.studentService
            .getStudentArchive()
            .then(results => {
            if (results.result === 'error') {
                this.archive = null;
                this.displayErrorAlert(results);
            }
            else {
                this.archive = results;
                swal.close();
            }
        })
            .catch(error => console.log("Error - Get student archive: " + error));
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
StudentArchiveComponent = __decorate([
    core_1.Component({
        selector: 'studentArchive',
        templateUrl: './app/components/student-archive/student-archive.component.html',
        styleUrls: ['./app/components/student-archive/student-archive.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, student_service_1.StudentService])
], StudentArchiveComponent);
exports.StudentArchiveComponent = StudentArchiveComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdHVkZW50LWFyY2hpdmUvc3R1ZGVudC1hcmNoaXZlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUFrRDtBQUNsRCw0Q0FBeUM7QUFDekMsb0VBQWdFO0FBVWhFLElBQWEsdUJBQXVCLEdBQXBDO0lBR0UsWUFBb0IsTUFBYyxFQUFVLGNBQThCO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFFMUUsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUM7WUFDSCxLQUFLLEVBQUUsWUFBWTtZQUNuQixpQkFBaUIsRUFBRSxLQUFLO1NBQ3pCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6Qix1QkFBdUI7SUFDekIsQ0FBQztJQUVELGlCQUFpQjtRQUNmLElBQUksQ0FBQyxjQUFjO2FBQ2hCLGlCQUFpQixFQUFFO2FBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNkLElBQUssT0FBZSxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDakM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNkO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxLQUFLO1FBQ3JCLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxZQUFZLEVBQUU7WUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FDRixLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssQ0FBQyxHQUFHLEVBQ1QsTUFBTSxDQUNQLENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBSSxDQUNGLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLEdBQUcsRUFDVCxPQUFPLENBQ1IsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVELE1BQU07UUFDSixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7Q0FDRixDQUFBO0FBcERZLHVCQUF1QjtJQU5uQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsaUVBQWlFO1FBQzlFLFNBQVMsRUFBRSxDQUFDLGdFQUFnRSxDQUFDO0tBQzlFLENBQUM7cUNBSzRCLGVBQU0sRUFBMEIsZ0NBQWM7R0FIL0QsdUJBQXVCLENBb0RuQztBQXBEWSwwREFBdUIiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvc3R1ZGVudC1hcmNoaXZlL3N0dWRlbnQtYXJjaGl2ZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5kZWNsYXJlIHZhciBtb21lbnQ7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3N0dWRlbnRBcmNoaXZlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvc3R1ZGVudC1hcmNoaXZlL3N0dWRlbnQtYXJjaGl2ZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvc3R1ZGVudC1hcmNoaXZlL3N0dWRlbnQtYXJjaGl2ZS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTdHVkZW50QXJjaGl2ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgYXJjaGl2ZTogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnTG9hZGluZy4uLicsXHJcbiAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICB0aGlzLmdldFN0dWRlbnRBcmNoaXZlKCk7XHJcbiAgICAvL3RoaXMuZ2V0VGltZXRhYmxlcygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3R1ZGVudEFyY2hpdmUoKSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRTdHVkZW50QXJjaGl2ZSgpXHJcbiAgICAgIC50aGVuKHJlc3VsdHMgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0cyBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5hcmNoaXZlID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0cyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuYXJjaGl2ZSA9IHJlc3VsdHM7XHJcbiAgICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBzdHVkZW50IGFyY2hpdmU6IFwiICsgZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlFcnJvckFsZXJ0KGVycm9yKSB7XHJcbiAgICBpZiAoZXJyb3IudGl0bGUgPT09IFwiQXV0aCBFcnJvclwiKSB7XHJcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xyXG4gICAgICBzd2FsKFxyXG4gICAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICAgIGVycm9yLm1zZyxcclxuICAgICAgICAnaW5mbydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgICAgZXJyb3IubXNnLFxyXG4gICAgICAgICdlcnJvcidcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
