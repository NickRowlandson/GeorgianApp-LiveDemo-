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
                for (var _i = 0, _a = _this.data; _i < _a.length; _i++) {
                    var student = _a[_i];
                    student.fullName = student.firstName + " " + student.lastName;
                }
            }
        })
            .catch(function (error) { return _this.error = error; });
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
    CaseNotesComponent.prototype.deleteNote = function (noteID) {
        var _this = this;
        event.stopPropagation();
        this.studentService
            .deleteNote(noteID)
            .then(function (res) {
            _this.notes = _this.notes.filter(function (h) { return h.caseNoteID !== noteID; });
            swal('Deleted!', 'Case note has been successfully removed.', 'success');
        })
            .catch(function (error) { return _this.error = error; });
    };
    CaseNotesComponent.prototype.deleteAlert = function (noteID) {
        var _this = this;
        swal({
            title: 'Delete note?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (isConfirm) {
            if (isConfirm) {
                _this.deleteNote(noteID);
            }
        }).catch(function (error) {
            //console.log("Canceled");
        });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jYXNlLW5vdGVzL2Nhc2Utbm90ZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF5QztBQUN6QyxrRUFBZ0U7QUFVaEU7SUFTRSw0QkFBb0IsTUFBYyxFQUFVLGNBQThCO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFFMUUsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFBQSxpQkFjQztRQWJDLElBQUksQ0FBQyxjQUFjO2FBQ2hCLFdBQVcsRUFBRTthQUNiLElBQUksQ0FBQyxVQUFBLFFBQVE7WUFDWixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ25CLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixLQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztnQkFDckIsR0FBRyxDQUFDLENBQWdCLFVBQVMsRUFBVCxLQUFBLEtBQUksQ0FBQyxJQUFJLEVBQVQsY0FBUyxFQUFULElBQVM7b0JBQXhCLElBQUksT0FBTyxTQUFBO29CQUNkLE9BQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztpQkFDL0Q7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQscUNBQVEsR0FBUixVQUFTLFNBQVM7UUFBbEIs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ZUFBTSxFQUEwQixnQ0FBYztPQVQvRCxrQkFBa0IsQ0FnRzlCO0lBQUQseUJBQUM7Q0FoR0QsQUFnR0MsSUFBQTtBQWhHWSxnREFBa0IiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvY2FzZS1ub3Rlcy9jYXNlLW5vdGVzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdHVkZW50XCI7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnY2FzZU5vdGVzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvY2FzZS1ub3Rlcy9jYXNlLW5vdGVzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9jYXNlLW5vdGVzL2Nhc2Utbm90ZXMuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQ2FzZU5vdGVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBkYXRhOiBhbnlbXTtcclxuICBub3RlczogYW55W107XHJcbiAgbm90ZXNWaWV3OiBTdHVkZW50O1xyXG4gIG5vdGU6IGFueTtcclxuICBuZXdOb3RlOiBib29sZWFuO1xyXG4gIHN0YXR1czogYW55O1xyXG4gIGVycm9yOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmdldFN0dWRlbnRzKCk7XHJcbiAgfVxyXG5cclxuICBnZXRTdHVkZW50cygpIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgLmdldFN0dWRlbnRzKClcclxuICAgICAgLnRoZW4oc3R1ZGVudHMgPT4ge1xyXG4gICAgICAgIGlmIChzdHVkZW50cy5zdGF0dXMgPT09IFwiNDAzXCIpIHtcclxuICAgICAgICAgIHRoaXMuZGF0YSA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZGF0YSA9IHN0dWRlbnRzO1xyXG4gICAgICAgICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgc3R1ZGVudC5mdWxsTmFtZSA9IHN0dWRlbnQuZmlyc3ROYW1lICsgXCIgXCIgKyBzdHVkZW50Lmxhc3ROYW1lO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBzYXZlTm90ZShzdHVkZW50SUQpIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMubm90ZSk7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgLnNhdmVOZXdOb3RlKHRoaXMubm90ZSwgc3R1ZGVudElEKVxyXG4gICAgICAgIC50aGVuKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm5vdGUgPSAnJztcclxuICAgICAgICAgICAgdGhpcy5zaG93Tm90ZXMoc3R1ZGVudElEKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpOyAvLyBUT0RPOiBEaXNwbGF5IGVycm9yIG1lc3NhZ2VcclxuXHJcbiAgICB0aGlzLm5ld05vdGUgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHNob3dDYXNlTm90ZXMoc3R1ZGVudDogU3R1ZGVudCkge1xyXG4gICAgdGhpcy5ub3Rlc1ZpZXcgPSBzdHVkZW50O1xyXG4gICAgdGhpcy5zaG93Tm90ZXMoc3R1ZGVudC5zdHVkZW50SUQpO1xyXG4gIH1cclxuXHJcbiAgc2hvd05vdGVzKHN0dWRlbnRJRCkge1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgIC5nZXROb3RlcyhzdHVkZW50SUQpXHJcbiAgICAgICAgLnRoZW4obm90ZXMgPT4ge1xyXG4gICAgICAgICAgdGhpcy5ub3RlcyA9IG5vdGVzO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVOb3RlKG5vdGVJRCkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgLmRlbGV0ZU5vdGUobm90ZUlEKVxyXG4gICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLm5vdGVzID0gdGhpcy5ub3Rlcy5maWx0ZXIoaCA9PiBoLmNhc2VOb3RlSUQgIT09IG5vdGVJRCk7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgJ0RlbGV0ZWQhJyxcclxuICAgICAgICAgICAgICAgICAgJ0Nhc2Ugbm90ZSBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgcmVtb3ZlZC4nLFxyXG4gICAgICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlQWxlcnQobm90ZUlEKSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdEZWxldGUgbm90ZT8nLFxyXG4gICAgICAgICAgdGV4dDogXCJZb3Ugd29uJ3QgYmUgYWJsZSB0byByZXZlcnQgdGhpcyFcIixcclxuICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgZGVsZXRlIGl0ISdcclxuICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgIHRoaXMuZGVsZXRlTm90ZShub3RlSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJDYW5jZWxlZFwiKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
