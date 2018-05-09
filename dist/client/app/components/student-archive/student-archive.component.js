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
var StudentArchiveComponent = /** @class */ (function () {
    function StudentArchiveComponent(router, studentService) {
        this.router = router;
        this.studentService = studentService;
    }
    StudentArchiveComponent.prototype.ngOnInit = function () {
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();
        this.getStudentArchive();
        //this.getTimetables();
    };
    StudentArchiveComponent.prototype.getStudentArchive = function () {
        var _this = this;
        this.studentService
            .getStudentArchive()
            .then(function (results) {
            if (results.result === 'error') {
                _this.archive = null;
                _this.displayErrorAlert(results);
            }
            else {
                _this.archive = results;
                swal.close();
            }
        })
            .catch(function (error) { return console.log("Error - Get student archive: " + error); });
    };
    StudentArchiveComponent.prototype.displayErrorAlert = function (error) {
        swal(error.title, error.msg, 'error');
    };
    StudentArchiveComponent.prototype.goBack = function () {
        window.history.back();
    };
    StudentArchiveComponent = __decorate([
        core_1.Component({
            selector: 'studentArchive',
            templateUrl: './app/components/student-archive/student-archive.component.html',
            styleUrls: ['./app/components/student-archive/student-archive.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, student_service_1.StudentService])
    ], StudentArchiveComponent);
    return StudentArchiveComponent;
}());
exports.StudentArchiveComponent = StudentArchiveComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdHVkZW50LWFyY2hpdmUvc3R1ZGVudC1hcmNoaXZlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsa0VBQWdFO0FBVWhFO0lBR0UsaUNBQW9CLE1BQWMsRUFBVSxjQUE4QjtRQUF0RCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBRTFFLENBQUM7SUFFRCwwQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDO1lBQ0gsS0FBSyxFQUFFLFlBQVk7WUFDbkIsaUJBQWlCLEVBQUUsS0FBSztTQUN6QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsdUJBQXVCO0lBQ3pCLENBQUM7SUFFRCxtREFBaUIsR0FBakI7UUFBQSxpQkFhQztRQVpDLElBQUksQ0FBQyxjQUFjO2FBQ2hCLGlCQUFpQixFQUFFO2FBQ25CLElBQUksQ0FBQyxVQUFBLE9BQU87WUFDWCxJQUFLLE9BQWUsQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO2dCQUN2QyxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDcEIsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2pDO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUN2QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDZDtRQUNILENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEdBQUcsS0FBSyxDQUFDLEVBQXBELENBQW9ELENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsbURBQWlCLEdBQWpCLFVBQWtCLEtBQUs7UUFDckIsSUFBSSxDQUNGLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLEdBQUcsRUFDVCxPQUFPLENBQ1IsQ0FBQztJQUNKLENBQUM7SUFFRCx3Q0FBTSxHQUFOO1FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBMUNVLHVCQUF1QjtRQU5uQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixXQUFXLEVBQUUsaUVBQWlFO1lBQzlFLFNBQVMsRUFBRSxDQUFDLGdFQUFnRSxDQUFDO1NBQzlFLENBQUM7eUNBSzRCLGVBQU0sRUFBMEIsZ0NBQWM7T0FIL0QsdUJBQXVCLENBMkNuQztJQUFELDhCQUFDO0NBM0NELEFBMkNDLElBQUE7QUEzQ1ksMERBQXVCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3N0dWRlbnQtYXJjaGl2ZS9zdHVkZW50LWFyY2hpdmUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuZGVjbGFyZSB2YXIgbW9tZW50O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzdHVkZW50QXJjaGl2ZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3N0dWRlbnQtYXJjaGl2ZS9zdHVkZW50LWFyY2hpdmUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3N0dWRlbnQtYXJjaGl2ZS9zdHVkZW50LWFyY2hpdmUuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU3R1ZGVudEFyY2hpdmVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGFyY2hpdmU6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBzdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UpIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ0xvYWRpbmcuLi4nLFxyXG4gICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgc3dhbC5zaG93TG9hZGluZygpO1xyXG4gICAgdGhpcy5nZXRTdHVkZW50QXJjaGl2ZSgpO1xyXG4gICAgLy90aGlzLmdldFRpbWV0YWJsZXMoKTtcclxuICB9XHJcblxyXG4gIGdldFN0dWRlbnRBcmNoaXZlKCkge1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAuZ2V0U3R1ZGVudEFyY2hpdmUoKVxyXG4gICAgICAudGhlbihyZXN1bHRzID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdHMgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuYXJjaGl2ZSA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmFyY2hpdmUgPSByZXN1bHRzO1xyXG4gICAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgc3R1ZGVudCBhcmNoaXZlOiBcIiArIGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5RXJyb3JBbGVydChlcnJvcikge1xyXG4gICAgc3dhbChcclxuICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgIGVycm9yLm1zZyxcclxuICAgICAgJ2Vycm9yJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
