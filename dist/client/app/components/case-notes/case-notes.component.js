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
var CaseNotesComponent = /** @class */ (function () {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jYXNlLW5vdGVzL2Nhc2Utbm90ZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF5QztBQUN6QyxrRUFBZ0U7QUFVaEU7SUFTRSw0QkFBb0IsTUFBYyxFQUFVLGNBQThCO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFFMUUsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFBQSxpQkFjQztRQWJDLElBQUksQ0FBQyxjQUFjO2FBQ2hCLFdBQVcsRUFBRTthQUNiLElBQUksQ0FBQyxVQUFBLFFBQVE7WUFDWixFQUFFLENBQUMsQ0FBRSxRQUFnQixDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNuQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sS0FBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7Z0JBQ3JCLEdBQUcsQ0FBQyxDQUFnQixVQUFTLEVBQVQsS0FBQSxLQUFJLENBQUMsSUFBSSxFQUFULGNBQVMsRUFBVCxJQUFTO29CQUF4QixJQUFJLE9BQU8sU0FBQTtvQkFDZCxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7aUJBQy9EO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFsQixDQUFrQixDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELHFDQUFRLEdBQVIsVUFBUyxTQUFTO1FBQWxC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LGVBQU0sRUFBMEIsZ0NBQWM7T0FUL0Qsa0JBQWtCLENBZ0c5QjtJQUFELHlCQUFDO0NBaEdELEFBZ0dDLElBQUE7QUFoR1ksZ0RBQWtCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2Nhc2Utbm90ZXMvY2FzZS1ub3Rlcy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3R1ZGVudFwiO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2Nhc2VOb3RlcycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2Nhc2Utbm90ZXMvY2FzZS1ub3Rlcy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvY2FzZS1ub3Rlcy9jYXNlLW5vdGVzLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIENhc2VOb3Rlc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgZGF0YTogYW55W107XHJcbiAgbm90ZXM6IGFueVtdO1xyXG4gIG5vdGVzVmlldzogU3R1ZGVudDtcclxuICBub3RlOiBhbnk7XHJcbiAgbmV3Tm90ZTogYm9vbGVhbjtcclxuICBzdGF0dXM6IGFueTtcclxuICBlcnJvcjogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5nZXRTdHVkZW50cygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3R1ZGVudHMoKSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRTdHVkZW50cygpXHJcbiAgICAgIC50aGVuKHN0dWRlbnRzID0+IHtcclxuICAgICAgICBpZiAoKHN0dWRlbnRzIGFzIGFueSkuc3RhdHVzID09PSBcIjQwM1wiKSB7XHJcbiAgICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmRhdGEgPSBzdHVkZW50cztcclxuICAgICAgICAgIGZvciAobGV0IHN0dWRlbnQgb2YgdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHN0dWRlbnQuZnVsbE5hbWUgPSBzdHVkZW50LmZpcnN0TmFtZSArIFwiIFwiICsgc3R1ZGVudC5sYXN0TmFtZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZU5vdGUoc3R1ZGVudElEKSB7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLm5vdGUpO1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgIC5zYXZlTmV3Tm90ZSh0aGlzLm5vdGUsIHN0dWRlbnRJRClcclxuICAgICAgICAudGhlbihub3RlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ub3RlID0gJyc7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd05vdGVzKHN0dWRlbnRJRCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTsgLy8gVE9ETzogRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcblxyXG4gICAgdGhpcy5uZXdOb3RlID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzaG93Q2FzZU5vdGVzKHN0dWRlbnQ6IFN0dWRlbnQpIHtcclxuICAgIHRoaXMubm90ZXNWaWV3ID0gc3R1ZGVudDtcclxuICAgIHRoaXMuc2hvd05vdGVzKHN0dWRlbnQuc3R1ZGVudElEKTtcclxuICB9XHJcblxyXG4gIHNob3dOb3RlcyhzdHVkZW50SUQpIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAuZ2V0Tm90ZXMoc3R1ZGVudElEKVxyXG4gICAgICAgIC50aGVuKG5vdGVzID0+IHtcclxuICAgICAgICAgIHRoaXMubm90ZXMgPSBub3RlcztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlTm90ZShub3RlSUQpIHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgIC5kZWxldGVOb3RlKG5vdGVJRClcclxuICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5ub3RlcyA9IHRoaXMubm90ZXMuZmlsdGVyKGggPT4gaC5jYXNlTm90ZUlEICE9PSBub3RlSUQpO1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICdEZWxldGVkIScsXHJcbiAgICAgICAgICAgICAgICAgICdDYXNlIG5vdGUgaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5IHJlbW92ZWQuJyxcclxuICAgICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUFsZXJ0KG5vdGVJRCkge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnRGVsZXRlIG5vdGU/JyxcclxuICAgICAgICAgIHRleHQ6IFwiWW91IHdvbid0IGJlIGFibGUgdG8gcmV2ZXJ0IHRoaXMhXCIsXHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIGRlbGV0ZSBpdCEnXHJcbiAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICB0aGlzLmRlbGV0ZU5vdGUobm90ZUlEKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ2FuY2VsZWRcIik7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=
