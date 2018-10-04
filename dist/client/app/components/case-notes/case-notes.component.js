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
const staff_service_1 = require("../../services/staff.service");
let CaseNotesComponent = class CaseNotesComponent {
    constructor(router, studentService, staffService) {
        this.router = router;
        this.studentService = studentService;
        this.staffService = staffService;
    }
    ngOnInit() {
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();
        this.getStudents();
    }
    getStudents() {
        this.studentService
            .getStudents()
            .then(students => {
            if (students.result === 'error') {
                this.data = null;
                this.displayErrorAlert(students);
            }
            else {
                this.data = students;
                for (let student of this.data) {
                    student.fullName = student.firstName + " " + student.lastName;
                }
                this.getUsers();
            }
        })
            .catch(error => this.error = error);
    }
    getUsers() {
        this.staffService
            .getUsers()
            .then(users => {
            if (users.result === 'error') {
                this.users = null;
                this.displayErrorAlert(users);
            }
            else {
                this.users = users;
                swal.close();
            }
        })
            .catch(error => this.error = error);
    }
    saveNote(userID) {
        if (this.note == null) {
            swal('Empty Input', 'Type something in the text area to save new note.', 'warning');
        }
        else {
            this.studentService
                .saveNewNote(this.note, userID)
                .then(note => {
                if (note.result === 'error') {
                    this.displayErrorAlert(note);
                }
                else if (note.result === 'success') {
                    this.note = '';
                    this.showNotes(userID);
                }
                else {
                    swal('Error', 'Something went wrong, please try again.', 'error');
                }
            })
                .catch(error => this.error = error); // TODO: Display error message
            this.newNote = false;
        }
    }
    showCaseNotes(student) {
        this.notesView = student;
        this.showNotes(student.userID);
    }
    showNotes(userID) {
        this.studentService
            .getNotes(userID)
            .then(notes => {
            if (notes.result === 'error') {
                this.displayErrorAlert(notes);
            }
            else {
                this.notes = notes;
                for (let notes of this.notes) {
                    var facultyUser = this.users.filter(x => x.userID === notes.facultyID);
                    if (facultyUser[0] != null) {
                        notes.facultyUser = facultyUser[0].firstName + " " + facultyUser[0].lastName;
                    }
                    else {
                        notes.facultyUser = 'Automated Message';
                    }
                }
            }
        })
            .catch(error => console.log(error));
    }
    deleteNote(noteID) {
        event.stopPropagation();
        this.studentService
            .deleteNote(noteID)
            .then(result => {
            if (result.result === 'error') {
                this.displayErrorAlert(result);
            }
            else if (result.result === 'success') {
                this.notes = this.notes.filter(h => h.caseNoteID !== noteID);
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
            }
        })
            .catch(error => this.error = error);
    }
    deleteAlert(noteID) {
        swal({
            title: 'Delete note?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(isConfirm => {
            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                console.log(isConfirm.dismiss);
            }
            else if (isConfirm) {
                this.deleteNote(noteID);
            }
        }).catch(error => {
            console.log(error);
        });
    }
    displayErrorAlert(error) {
        swal(error.title, error.msg, 'error');
    }
    goBack() {
        window.history.back();
    }
};
CaseNotesComponent = __decorate([
    core_1.Component({
        selector: 'caseNotes',
        templateUrl: './app/components/case-notes/case-notes.component.html',
        styleUrls: ['./app/components/case-notes/case-notes.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, student_service_1.StudentService, staff_service_1.StaffService])
], CaseNotesComponent);
exports.CaseNotesComponent = CaseNotesComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jYXNlLW5vdGVzL2Nhc2Utbm90ZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0NBQWtEO0FBQ2xELDRDQUF5QztBQUN6QyxvRUFBZ0U7QUFDaEUsZ0VBQTREO0FBVzVELElBQWEsa0JBQWtCLEdBQS9CO0lBVUUsWUFBb0IsTUFBYyxFQUFVLGNBQThCLEVBQVUsWUFBMEI7UUFBMUYsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBRTlHLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDO1lBQ0gsS0FBSyxFQUFFLFlBQVk7WUFDbkIsaUJBQWlCLEVBQUUsS0FBSztTQUN6QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGNBQWM7YUFDaEIsV0FBVyxFQUFFO2FBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2YsSUFBSyxRQUFnQixDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbEM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7Z0JBQ3JCLEtBQUssSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDN0IsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO2lCQUMvRDtnQkFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDakI7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Q0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNsQixJQUFJLFNBQVMsQ0FBQyxPQUFPLEtBQUssUUFBUSxJQUFJLFNBQVMsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO2dCQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoQztpQkFBTSxJQUFJLFNBQVMsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN6QjtRQUNILENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBSztRQUNyQixJQUFJLENBQ0YsS0FBSyxDQUFDLEtBQUssRUFDWCxLQUFLLENBQUMsR0FBRyxFQUNULE9BQU8sQ0FDUixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU07UUFDSixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7Q0FDRixDQUFBO0FBbktZLGtCQUFrQjtJQU45QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFdBQVc7UUFDckIsV0FBVyxFQUFFLHVEQUF1RDtRQUNwRSxTQUFTLEVBQUUsQ0FBQyxzREFBc0QsQ0FBQztLQUNwRSxDQUFDO3FDQVk0QixlQUFNLEVBQTBCLGdDQUFjLEVBQXdCLDRCQUFZO0dBVm5HLGtCQUFrQixDQW1LOUI7QUFuS1ksZ0RBQWtCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2Nhc2Utbm90ZXMvY2FzZS1ub3Rlcy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU3RhZmZTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0YWZmLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL21vZGVscy91c2VyXCI7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnY2FzZU5vdGVzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvY2FzZS1ub3Rlcy9jYXNlLW5vdGVzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9jYXNlLW5vdGVzL2Nhc2Utbm90ZXMuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQ2FzZU5vdGVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBkYXRhOiBhbnlbXTtcclxuICBub3RlczogYW55W107XHJcbiAgdXNlcnM6IFVzZXJbXTtcclxuICBub3Rlc1ZpZXc6IFN0dWRlbnQ7XHJcbiAgbm90ZTogYW55O1xyXG4gIG5ld05vdGU6IGJvb2xlYW47XHJcbiAgc3RhdHVzOiBhbnk7XHJcbiAgZXJyb3I6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBzdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsIHByaXZhdGUgc3RhZmZTZXJ2aWNlOiBTdGFmZlNlcnZpY2UpIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ0xvYWRpbmcuLi4nLFxyXG4gICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgc3dhbC5zaG93TG9hZGluZygpO1xyXG4gICAgdGhpcy5nZXRTdHVkZW50cygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3R1ZGVudHMoKSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRTdHVkZW50cygpXHJcbiAgICAgIC50aGVuKHN0dWRlbnRzID0+IHtcclxuICAgICAgICBpZiAoKHN0dWRlbnRzIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChzdHVkZW50cyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZGF0YSA9IHN0dWRlbnRzO1xyXG4gICAgICAgICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgc3R1ZGVudC5mdWxsTmFtZSA9IHN0dWRlbnQuZmlyc3ROYW1lICsgXCIgXCIgKyBzdHVkZW50Lmxhc3ROYW1lO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5nZXRVc2VycygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBnZXRVc2VycygpIHtcclxuICAgIHRoaXMuc3RhZmZTZXJ2aWNlXHJcbiAgICAuZ2V0VXNlcnMoKVxyXG4gICAgLnRoZW4odXNlcnMgPT4ge1xyXG4gICAgICBpZiAoKHVzZXJzIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgdGhpcy51c2VycyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydCh1c2Vycyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy51c2VycyA9IHVzZXJzO1xyXG4gICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZU5vdGUodXNlcklEKSB7XHJcbiAgICBpZiAodGhpcy5ub3RlID09IG51bGwpIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICAnRW1wdHkgSW5wdXQnLFxyXG4gICAgICAgICdUeXBlIHNvbWV0aGluZyBpbiB0aGUgdGV4dCBhcmVhIHRvIHNhdmUgbmV3IG5vdGUuJyxcclxuICAgICAgICAnd2FybmluZydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgIC5zYXZlTmV3Tm90ZSh0aGlzLm5vdGUsIHVzZXJJRClcclxuICAgICAgICAgIC50aGVuKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoKG5vdGUgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KG5vdGUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChub3RlIGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgICB0aGlzLm5vdGUgPSAnJztcclxuICAgICAgICAgICAgICB0aGlzLnNob3dOb3Rlcyh1c2VySUQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpOyAvLyBUT0RPOiBEaXNwbGF5IGVycm9yIG1lc3NhZ2VcclxuXHJcbiAgICAgIHRoaXMubmV3Tm90ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2hvd0Nhc2VOb3RlcyhzdHVkZW50OiBTdHVkZW50KSB7XHJcbiAgICB0aGlzLm5vdGVzVmlldyA9IHN0dWRlbnQ7XHJcbiAgICB0aGlzLnNob3dOb3RlcyhzdHVkZW50LnVzZXJJRCk7XHJcbiAgfVxyXG5cclxuICBzaG93Tm90ZXModXNlcklEKSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgLmdldE5vdGVzKHVzZXJJRClcclxuICAgICAgICAudGhlbihub3RlcyA9PiB7XHJcbiAgICAgICAgICBpZiAoKG5vdGVzIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQobm90ZXMpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub3RlcyA9IG5vdGVzO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBub3RlcyBvZiB0aGlzLm5vdGVzKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGZhY3VsdHlVc2VyID0gdGhpcy51c2Vycy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gbm90ZXMuZmFjdWx0eUlEKTtcclxuICAgICAgICAgICAgICBpZiAoZmFjdWx0eVVzZXJbMF0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbm90ZXMuZmFjdWx0eVVzZXIgPSBmYWN1bHR5VXNlclswXS5maXJzdE5hbWUgKyBcIiBcIiArIGZhY3VsdHlVc2VyWzBdLmxhc3ROYW1lO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub3Rlcy5mYWN1bHR5VXNlciA9ICdBdXRvbWF0ZWQgTWVzc2FnZSc7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZU5vdGUobm90ZUlEKSB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAuZGVsZXRlTm90ZShub3RlSUQpXHJcbiAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgICB0aGlzLm5vdGVzID0gdGhpcy5ub3Rlcy5maWx0ZXIoaCA9PiBoLmNhc2VOb3RlSUQgIT09IG5vdGVJRCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBkZWxldGVBbGVydChub3RlSUQpIHtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ0RlbGV0ZSBub3RlPycsXHJcbiAgICAgICAgICB0ZXh0OiBcIllvdSB3b24ndCBiZSBhYmxlIHRvIHJldmVydCB0aGlzIVwiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBkZWxldGUgaXQhJ1xyXG4gICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtLmRpc21pc3MpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICB0aGlzLmRlbGV0ZU5vdGUobm90ZUlEKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZGlzcGxheUVycm9yQWxlcnQoZXJyb3IpIHtcclxuICAgIHN3YWwoXHJcbiAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICBlcnJvci5tc2csXHJcbiAgICAgICdlcnJvcidcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
