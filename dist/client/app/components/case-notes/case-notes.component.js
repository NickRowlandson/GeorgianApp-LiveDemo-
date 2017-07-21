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
var CaseNotesComponent = (function () {
    function CaseNotesComponent(router, studentService) {
        this.router = router;
        this.studentService = studentService;
    }
    CaseNotesComponent.prototype.ngOnInit = function () {
        this.getStudents();
    };
    CaseNotesComponent.prototype.getStudents = function () {
        var _this = this;
        this.studentService
            .getStudents()
            .then(function (students) {
            if (students.status === "403") {
                _this.data = null;
            }
            else {
                _this.data = students;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    CaseNotesComponent.prototype.addCaseNotes = function () {
        this.newNote = true;
    };
    CaseNotesComponent.prototype.saveNote = function (studentID) {
        var _this = this;
        console.log(this.note);
        this.studentService
            .saveNewNote(this.note, studentID)
            .then(function (note) {
            _this.note = '';
            _this.showNotes(studentID);
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
        this.newNote = false;
    };
    CaseNotesComponent.prototype.showCaseNotes = function (student) {
        this.notesView = student;
        this.showNotes(student.studentID);
    };
    CaseNotesComponent.prototype.showNotes = function (studentID) {
        var _this = this;
        this.studentService
            .getNotes(studentID)
            .then(function (notes) {
            _this.notes = notes;
        })
            .catch(function (error) { return console.log(error); });
    };
    CaseNotesComponent.prototype.goBack = function () {
        window.history.back();
    };
    CaseNotesComponent = __decorate([
        core_1.Component({
            selector: 'caseNotes',
            templateUrl: './app/components/case-notes/case-notes.component.html',
            styleUrls: ['./app/components/case-notes/case-notes.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, student_service_1.StudentService])
    ], CaseNotesComponent);
    return CaseNotesComponent;
}());
exports.CaseNotesComponent = CaseNotesComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jYXNlLW5vdGVzL2Nhc2Utbm90ZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF5QztBQUN6QyxrRUFBZ0U7QUFTaEU7SUFTRSw0QkFBb0IsTUFBYyxFQUFVLGNBQThCO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFFMUUsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFBQSxpQkFXQztRQVZDLElBQUksQ0FBQyxjQUFjO2FBQ2hCLFdBQVcsRUFBRTthQUNiLElBQUksQ0FBQyxVQUFBLFFBQVE7WUFDWixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ25CLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixLQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztZQUN2QixDQUFDO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQseUNBQVksR0FBWjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxxQ0FBUSxHQUFSLFVBQVMsU0FBUztRQUFsQixpQkFXQztRQVZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjO2FBQ2QsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDO2FBQ2pDLElBQUksQ0FBQyxVQUFBLElBQUk7WUFDTixLQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNmLEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQyxDQUFDLDhCQUE4QjtRQUV2RSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsMENBQWEsR0FBYixVQUFjLE9BQWdCO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxzQ0FBUyxHQUFULFVBQVUsU0FBUztRQUFuQixpQkFPQztRQU5DLElBQUksQ0FBQyxjQUFjO2FBQ2QsUUFBUSxDQUFDLFNBQVMsQ0FBQzthQUNuQixJQUFJLENBQUMsVUFBQSxLQUFLO1lBQ1QsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxtQ0FBTSxHQUFOO1FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBL0RVLGtCQUFrQjtRQU45QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLHVEQUF1RDtZQUNwRSxTQUFTLEVBQUUsQ0FBQyxzREFBc0QsQ0FBQztTQUNwRSxDQUFDO3lDQVc0QixlQUFNLEVBQTBCLGdDQUFjO09BVC9ELGtCQUFrQixDQWdFOUI7SUFBRCx5QkFBQztDQWhFRCxBQWdFQyxJQUFBO0FBaEVZLGdEQUFrQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9jYXNlLW5vdGVzL2Nhc2Utbm90ZXMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N0dWRlbnRcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnY2FzZU5vdGVzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvY2FzZS1ub3Rlcy9jYXNlLW5vdGVzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9jYXNlLW5vdGVzL2Nhc2Utbm90ZXMuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQ2FzZU5vdGVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBkYXRhOiBhbnlbXTtcclxuICBub3RlczogYW55W107XHJcbiAgbm90ZXNWaWV3OiBTdHVkZW50O1xyXG4gIG5vdGU6IGFueTtcclxuICBuZXdOb3RlOiBib29sZWFuO1xyXG4gIHN0YXR1czogYW55O1xyXG4gIGVycm9yOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmdldFN0dWRlbnRzKCk7XHJcbiAgfVxyXG5cclxuICBnZXRTdHVkZW50cygpIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldFN0dWRlbnRzKClcclxuICAgICAgLnRoZW4oc3R1ZGVudHMgPT4ge1xyXG4gICAgICAgIGlmIChzdHVkZW50cy5zdGF0dXMgPT09IFwiNDAzXCIpIHtcclxuICAgICAgICAgIHRoaXMuZGF0YSA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZGF0YSA9IHN0dWRlbnRzO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBhZGRDYXNlTm90ZXMoKSB7XHJcbiAgICB0aGlzLm5ld05vdGUgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgc2F2ZU5vdGUoc3R1ZGVudElEKSB7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLm5vdGUpO1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgIC5zYXZlTmV3Tm90ZSh0aGlzLm5vdGUsIHN0dWRlbnRJRClcclxuICAgICAgICAudGhlbihub3RlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ub3RlID0gJyc7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd05vdGVzKHN0dWRlbnRJRCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTsgLy8gVE9ETzogRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcblxyXG4gICAgdGhpcy5uZXdOb3RlID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzaG93Q2FzZU5vdGVzKHN0dWRlbnQ6IFN0dWRlbnQpIHtcclxuICAgIHRoaXMubm90ZXNWaWV3ID0gc3R1ZGVudDtcclxuICAgIHRoaXMuc2hvd05vdGVzKHN0dWRlbnQuc3R1ZGVudElEKTtcclxuICB9XHJcblxyXG4gIHNob3dOb3RlcyhzdHVkZW50SUQpIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAuZ2V0Tm90ZXMoc3R1ZGVudElEKVxyXG4gICAgICAgIC50aGVuKG5vdGVzID0+IHtcclxuICAgICAgICAgIHRoaXMubm90ZXMgPSBub3RlcztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=
