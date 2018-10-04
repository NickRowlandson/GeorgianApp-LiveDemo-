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
        swal(error.title, error.msg, 'error');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdHVkZW50LWFyY2hpdmUvc3R1ZGVudC1hcmNoaXZlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUFrRDtBQUNsRCw0Q0FBeUM7QUFDekMsb0VBQWdFO0FBVWhFLElBQWEsdUJBQXVCLEdBQXBDO0lBR0UsWUFBb0IsTUFBYyxFQUFVLGNBQThCO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFFMUUsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUM7WUFDSCxLQUFLLEVBQUUsWUFBWTtZQUNuQixpQkFBaUIsRUFBRSxLQUFLO1NBQ3pCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6Qix1QkFBdUI7SUFDekIsQ0FBQztJQUVELGlCQUFpQjtRQUNmLElBQUksQ0FBQyxjQUFjO2FBQ2hCLGlCQUFpQixFQUFFO2FBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNkLElBQUssT0FBZSxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDakM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNkO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxLQUFLO1FBQ3JCLElBQUksQ0FDRixLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssQ0FBQyxHQUFHLEVBQ1QsT0FBTyxDQUNSLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTTtRQUNKLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQztDQUNGLENBQUE7QUEzQ1ksdUJBQXVCO0lBTm5DLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFdBQVcsRUFBRSxpRUFBaUU7UUFDOUUsU0FBUyxFQUFFLENBQUMsZ0VBQWdFLENBQUM7S0FDOUUsQ0FBQztxQ0FLNEIsZUFBTSxFQUEwQixnQ0FBYztHQUgvRCx1QkFBdUIsQ0EyQ25DO0FBM0NZLDBEQUF1QiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9zdHVkZW50LWFyY2hpdmUvc3R1ZGVudC1hcmNoaXZlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcbmRlY2xhcmUgdmFyIG1vbWVudDtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc3R1ZGVudEFyY2hpdmUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9zdHVkZW50LWFyY2hpdmUvc3R1ZGVudC1hcmNoaXZlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9zdHVkZW50LWFyY2hpdmUvc3R1ZGVudC1hcmNoaXZlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0dWRlbnRBcmNoaXZlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBhcmNoaXZlOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdMb2FkaW5nLi4uJyxcclxuICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgIHRoaXMuZ2V0U3R1ZGVudEFyY2hpdmUoKTtcclxuICAgIC8vdGhpcy5nZXRUaW1ldGFibGVzKCk7XHJcbiAgfVxyXG5cclxuICBnZXRTdHVkZW50QXJjaGl2ZSgpIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldFN0dWRlbnRBcmNoaXZlKClcclxuICAgICAgLnRoZW4ocmVzdWx0cyA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHRzIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmFyY2hpdmUgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5hcmNoaXZlID0gcmVzdWx0cztcclxuICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IHN0dWRlbnQgYXJjaGl2ZTogXCIgKyBlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgZGlzcGxheUVycm9yQWxlcnQoZXJyb3IpIHtcclxuICAgIHN3YWwoXHJcbiAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICBlcnJvci5tc2csXHJcbiAgICAgICdlcnJvcidcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
