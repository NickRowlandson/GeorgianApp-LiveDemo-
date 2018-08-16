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
var staff_service_1 = require("../../services/staff.service");
var CaseNotesComponent = /** @class */ (function () {
    function CaseNotesComponent(router, studentService, staffService) {
        this.router = router;
        this.studentService = studentService;
        this.staffService = staffService;
    }
    CaseNotesComponent.prototype.ngOnInit = function () {
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();
        this.getStudents();
    };
    CaseNotesComponent.prototype.getStudents = function () {
        var _this = this;
        this.studentService
            .getStudents()
            .then(function (students) {
            if (students.result === 'error') {
                _this.data = null;
                _this.displayErrorAlert(students);
            }
            else {
                _this.data = students;
                for (var _i = 0, _a = _this.data; _i < _a.length; _i++) {
                    var student = _a[_i];
                    student.fullName = student.firstName + " " + student.lastName;
                }
                _this.getUsers();
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    CaseNotesComponent.prototype.getUsers = function () {
        var _this = this;
        this.staffService
            .getUsers()
            .then(function (users) {
            if (users.result === 'error') {
                _this.users = null;
                _this.displayErrorAlert(users);
            }
            else {
                _this.users = users;
                swal.close();
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    CaseNotesComponent.prototype.saveNote = function (userID) {
        var _this = this;
        if (this.note == null) {
            swal('Empty Input', 'Type something in the text area to save new note.', 'warning');
        }
        else {
            this.studentService
                .saveNewNote(this.note, userID)
                .then(function (note) {
                if (note.result === 'error') {
                    _this.displayErrorAlert(note);
                }
                else if (note.result === 'success') {
                    _this.note = '';
                    _this.showNotes(userID);
                }
                else {
                    swal('Error', 'Something went wrong, please try again.', 'error');
                }
            })
                .catch(function (error) { return _this.error = error; }); // TODO: Display error message
            this.newNote = false;
        }
    };
    CaseNotesComponent.prototype.showCaseNotes = function (student) {
        this.notesView = student;
        this.showNotes(student.userID);
    };
    CaseNotesComponent.prototype.showNotes = function (userID) {
        var _this = this;
        this.studentService
            .getNotes(userID)
            .then(function (notes) {
            if (notes.result === 'error') {
                _this.displayErrorAlert(notes);
            }
            else {
                _this.notes = notes;
                var _loop_1 = function (notes_1) {
                    facultyUser = _this.users.filter(function (x) { return x.userID === notes_1.facultyID; });
                    if (facultyUser[0] != null) {
                        notes_1.facultyUser = facultyUser[0].firstName + " " + facultyUser[0].lastName;
                    }
                    else {
                        notes_1.facultyUser = 'Automated Message';
                    }
                };
                var facultyUser;
                for (var _i = 0, _a = _this.notes; _i < _a.length; _i++) {
                    var notes_1 = _a[_i];
                    _loop_1(notes_1);
                }
            }
        })
            .catch(function (error) { return console.log(error); });
    };
    CaseNotesComponent.prototype.deleteNote = function (noteID) {
        var _this = this;
        event.stopPropagation();
        this.studentService
            .deleteNote(noteID)
            .then(function (result) {
            if (result.result === 'error') {
                _this.displayErrorAlert(result);
            }
            else if (result.result === 'success') {
                _this.notes = _this.notes.filter(function (h) { return h.caseNoteID !== noteID; });
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
            }
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
            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                console.log(isConfirm.dismiss);
            }
            else if (isConfirm) {
                _this.deleteNote(noteID);
            }
        }).catch(function (error) {
            console.log(error);
        });
    };
    CaseNotesComponent.prototype.displayErrorAlert = function (error) {
        swal(error.title, error.msg, 'error');
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
        __metadata("design:paramtypes", [router_1.Router, student_service_1.StudentService, staff_service_1.StaffService])
    ], CaseNotesComponent);
    return CaseNotesComponent;
}());
exports.CaseNotesComponent = CaseNotesComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jYXNlLW5vdGVzL2Nhc2Utbm90ZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF5QztBQUN6QyxrRUFBZ0U7QUFDaEUsOERBQTREO0FBVzVEO0lBVUUsNEJBQW9CLE1BQWMsRUFBVSxjQUE4QixFQUFVLFlBQTBCO1FBQTFGLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUU5RyxDQUFDO0lBRUQscUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQztZQUNILEtBQUssRUFBRSxZQUFZO1lBQ25CLGlCQUFpQixFQUFFLEtBQUs7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsd0NBQVcsR0FBWDtRQUFBLGlCQWdCQztRQWZDLElBQUksQ0FBQyxjQUFjO2FBQ2hCLFdBQVcsRUFBRTthQUNiLElBQUksQ0FBQyxVQUFBLFFBQVE7WUFDWixJQUFLLFFBQWdCLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtnQkFDeEMsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNsQztpQkFBTTtnQkFDTCxLQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztnQkFDckIsS0FBb0IsVUFBUyxFQUFULEtBQUEsS0FBSSxDQUFDLElBQUksRUFBVCxjQUFTLEVBQVQsSUFBUyxFQUFFO29CQUExQixJQUFJLE9BQU8sU0FBQTtvQkFDZCxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7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RCxDQUFDO1NBQ3BFLENBQUM7eUNBWTRCLGVBQU0sRUFBMEIsZ0NBQWMsRUFBd0IsNEJBQVk7T0FWbkcsa0JBQWtCLENBbUs5QjtJQUFELHlCQUFDO0NBbktELEFBbUtDLElBQUE7QUFuS1ksZ0RBQWtCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2Nhc2Utbm90ZXMvY2FzZS1ub3Rlcy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU3RhZmZTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0YWZmLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL21vZGVscy91c2VyXCI7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnY2FzZU5vdGVzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvY2FzZS1ub3Rlcy9jYXNlLW5vdGVzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9jYXNlLW5vdGVzL2Nhc2Utbm90ZXMuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQ2FzZU5vdGVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBkYXRhOiBhbnlbXTtcclxuICBub3RlczogYW55W107XHJcbiAgdXNlcnM6IFVzZXJbXTtcclxuICBub3Rlc1ZpZXc6IFN0dWRlbnQ7XHJcbiAgbm90ZTogYW55O1xyXG4gIG5ld05vdGU6IGJvb2xlYW47XHJcbiAgc3RhdHVzOiBhbnk7XHJcbiAgZXJyb3I6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBzdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsIHByaXZhdGUgc3RhZmZTZXJ2aWNlOiBTdGFmZlNlcnZpY2UpIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ0xvYWRpbmcuLi4nLFxyXG4gICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgc3dhbC5zaG93TG9hZGluZygpO1xyXG4gICAgdGhpcy5nZXRTdHVkZW50cygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3R1ZGVudHMoKSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRTdHVkZW50cygpXHJcbiAgICAgIC50aGVuKHN0dWRlbnRzID0+IHtcclxuICAgICAgICBpZiAoKHN0dWRlbnRzIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChzdHVkZW50cyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZGF0YSA9IHN0dWRlbnRzO1xyXG4gICAgICAgICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgc3R1ZGVudC5mdWxsTmFtZSA9IHN0dWRlbnQuZmlyc3ROYW1lICsgXCIgXCIgKyBzdHVkZW50Lmxhc3ROYW1lO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5nZXRVc2VycygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBnZXRVc2VycygpIHtcclxuICAgIHRoaXMuc3RhZmZTZXJ2aWNlXHJcbiAgICAuZ2V0VXNlcnMoKVxyXG4gICAgLnRoZW4odXNlcnMgPT4ge1xyXG4gICAgICBpZiAoKHVzZXJzIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgdGhpcy51c2VycyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydCh1c2Vycyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy51c2VycyA9IHVzZXJzO1xyXG4gICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZU5vdGUodXNlcklEKSB7XHJcbiAgICBpZiAodGhpcy5ub3RlID09IG51bGwpIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICAnRW1wdHkgSW5wdXQnLFxyXG4gICAgICAgICdUeXBlIHNvbWV0aGluZyBpbiB0aGUgdGV4dCBhcmVhIHRvIHNhdmUgbmV3IG5vdGUuJyxcclxuICAgICAgICAnd2FybmluZydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgIC5zYXZlTmV3Tm90ZSh0aGlzLm5vdGUsIHVzZXJJRClcclxuICAgICAgICAgIC50aGVuKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoKG5vdGUgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KG5vdGUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChub3RlIGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgICB0aGlzLm5vdGUgPSAnJztcclxuICAgICAgICAgICAgICB0aGlzLnNob3dOb3Rlcyh1c2VySUQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpOyAvLyBUT0RPOiBEaXNwbGF5IGVycm9yIG1lc3NhZ2VcclxuXHJcbiAgICAgIHRoaXMubmV3Tm90ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2hvd0Nhc2VOb3RlcyhzdHVkZW50OiBTdHVkZW50KSB7XHJcbiAgICB0aGlzLm5vdGVzVmlldyA9IHN0dWRlbnQ7XHJcbiAgICB0aGlzLnNob3dOb3RlcyhzdHVkZW50LnVzZXJJRCk7XHJcbiAgfVxyXG5cclxuICBzaG93Tm90ZXModXNlcklEKSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgLmdldE5vdGVzKHVzZXJJRClcclxuICAgICAgICAudGhlbihub3RlcyA9PiB7XHJcbiAgICAgICAgICBpZiAoKG5vdGVzIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQobm90ZXMpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub3RlcyA9IG5vdGVzO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBub3RlcyBvZiB0aGlzLm5vdGVzKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGZhY3VsdHlVc2VyID0gdGhpcy51c2Vycy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gbm90ZXMuZmFjdWx0eUlEKTtcclxuICAgICAgICAgICAgICBpZiAoZmFjdWx0eVVzZXJbMF0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbm90ZXMuZmFjdWx0eVVzZXIgPSBmYWN1bHR5VXNlclswXS5maXJzdE5hbWUgKyBcIiBcIiArIGZhY3VsdHlVc2VyWzBdLmxhc3ROYW1lO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub3Rlcy5mYWN1bHR5VXNlciA9ICdBdXRvbWF0ZWQgTWVzc2FnZSc7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZU5vdGUobm90ZUlEKSB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAuZGVsZXRlTm90ZShub3RlSUQpXHJcbiAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgICB0aGlzLm5vdGVzID0gdGhpcy5ub3Rlcy5maWx0ZXIoaCA9PiBoLmNhc2VOb3RlSUQgIT09IG5vdGVJRCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBkZWxldGVBbGVydChub3RlSUQpIHtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ0RlbGV0ZSBub3RlPycsXHJcbiAgICAgICAgICB0ZXh0OiBcIllvdSB3b24ndCBiZSBhYmxlIHRvIHJldmVydCB0aGlzIVwiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBkZWxldGUgaXQhJ1xyXG4gICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtLmRpc21pc3MpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICB0aGlzLmRlbGV0ZU5vdGUobm90ZUlEKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZGlzcGxheUVycm9yQWxlcnQoZXJyb3IpIHtcclxuICAgIHN3YWwoXHJcbiAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICBlcnJvci5tc2csXHJcbiAgICAgICdlcnJvcidcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
