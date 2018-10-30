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
CaseNotesComponent = __decorate([
    core_1.Component({
        selector: 'caseNotes',
        templateUrl: './app/components/case-notes/case-notes.component.html',
        styleUrls: ['./app/components/case-notes/case-notes.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, student_service_1.StudentService, staff_service_1.StaffService])
], CaseNotesComponent);
exports.CaseNotesComponent = CaseNotesComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jYXNlLW5vdGVzL2Nhc2Utbm90ZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0NBQWtEO0FBQ2xELDRDQUF5QztBQUN6QyxvRUFBZ0U7QUFDaEUsZ0VBQTREO0FBVzVELElBQWEsa0JBQWtCLEdBQS9CO0lBVUUsWUFBb0IsTUFBYyxFQUFVLGNBQThCLEVBQVUsWUFBMEI7UUFBMUYsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBRTlHLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDO1lBQ0gsS0FBSyxFQUFFLFlBQVk7WUFDbkIsaUJBQWlCLEVBQUUsS0FBSztTQUN6QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGNBQWM7YUFDaEIsV0FBVyxFQUFFO2FBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2YsSUFBSyxRQUFnQixDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbEM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7Z0JBQ3JCLEtBQUssSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDN0IsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO2lCQUMvRDtnQkFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDakI7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bGUiOiJhcHAvY29tcG9uZW50cy9jYXNlLW5vdGVzL2Nhc2Utbm90ZXMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0YWZmU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdGFmZi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N0dWRlbnRcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvdXNlclwiO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2Nhc2VOb3RlcycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2Nhc2Utbm90ZXMvY2FzZS1ub3Rlcy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvY2FzZS1ub3Rlcy9jYXNlLW5vdGVzLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIENhc2VOb3Rlc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgZGF0YTogYW55W107XHJcbiAgbm90ZXM6IGFueVtdO1xyXG4gIHVzZXJzOiBVc2VyW107XHJcbiAgbm90ZXNWaWV3OiBTdHVkZW50O1xyXG4gIG5vdGU6IGFueTtcclxuICBuZXdOb3RlOiBib29sZWFuO1xyXG4gIHN0YXR1czogYW55O1xyXG4gIGVycm9yOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlLCBwcml2YXRlIHN0YWZmU2VydmljZTogU3RhZmZTZXJ2aWNlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdMb2FkaW5nLi4uJyxcclxuICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgIHRoaXMuZ2V0U3R1ZGVudHMoKTtcclxuICB9XHJcblxyXG4gIGdldFN0dWRlbnRzKCkge1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAuZ2V0U3R1ZGVudHMoKVxyXG4gICAgICAudGhlbihzdHVkZW50cyA9PiB7XHJcbiAgICAgICAgaWYgKChzdHVkZW50cyBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5kYXRhID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoc3R1ZGVudHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmRhdGEgPSBzdHVkZW50cztcclxuICAgICAgICAgIGZvciAobGV0IHN0dWRlbnQgb2YgdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHN0dWRlbnQuZnVsbE5hbWUgPSBzdHVkZW50LmZpcnN0TmFtZSArIFwiIFwiICsgc3R1ZGVudC5sYXN0TmFtZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuZ2V0VXNlcnMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXNlcnMoKSB7XHJcbiAgICB0aGlzLnN0YWZmU2VydmljZVxyXG4gICAgLmdldFVzZXJzKClcclxuICAgIC50aGVuKHVzZXJzID0+IHtcclxuICAgICAgaWYgKCh1c2VycyBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgIHRoaXMudXNlcnMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQodXNlcnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudXNlcnMgPSB1c2VycztcclxuICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIHNhdmVOb3RlKHVzZXJJRCkge1xyXG4gICAgaWYgKHRoaXMubm90ZSA9PSBudWxsKSB7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgJ0VtcHR5IElucHV0JyxcclxuICAgICAgICAnVHlwZSBzb21ldGhpbmcgaW4gdGhlIHRleHQgYXJlYSB0byBzYXZlIG5ldyBub3RlLicsXHJcbiAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAuc2F2ZU5ld05vdGUodGhpcy5ub3RlLCB1c2VySUQpXHJcbiAgICAgICAgICAudGhlbihub3RlID0+IHtcclxuICAgICAgICAgICAgaWYgKChub3RlIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChub3RlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgobm90ZSBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5ub3RlID0gJyc7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaG93Tm90ZXModXNlcklEKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTsgLy8gVE9ETzogRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcblxyXG4gICAgICB0aGlzLm5ld05vdGUgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNob3dDYXNlTm90ZXMoc3R1ZGVudDogU3R1ZGVudCkge1xyXG4gICAgdGhpcy5ub3Rlc1ZpZXcgPSBzdHVkZW50O1xyXG4gICAgdGhpcy5zaG93Tm90ZXMoc3R1ZGVudC51c2VySUQpO1xyXG4gIH1cclxuXHJcbiAgc2hvd05vdGVzKHVzZXJJRCkge1xyXG4gICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgIC5nZXROb3Rlcyh1c2VySUQpXHJcbiAgICAgICAgLnRoZW4obm90ZXMgPT4ge1xyXG4gICAgICAgICAgaWYgKChub3RlcyBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KG5vdGVzKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm90ZXMgPSBub3RlcztcclxuICAgICAgICAgICAgZm9yIChsZXQgbm90ZXMgb2YgdGhpcy5ub3Rlcykge1xyXG4gICAgICAgICAgICAgIHZhciBmYWN1bHR5VXNlciA9IHRoaXMudXNlcnMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IG5vdGVzLmZhY3VsdHlJRCk7XHJcbiAgICAgICAgICAgICAgaWYgKGZhY3VsdHlVc2VyWzBdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIG5vdGVzLmZhY3VsdHlVc2VyID0gZmFjdWx0eVVzZXJbMF0uZmlyc3ROYW1lICsgXCIgXCIgKyBmYWN1bHR5VXNlclswXS5sYXN0TmFtZTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm90ZXMuZmFjdWx0eVVzZXIgPSAnQXV0b21hdGVkIE1lc3NhZ2UnO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVOb3RlKG5vdGVJRCkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgLmRlbGV0ZU5vdGUobm90ZUlEKVxyXG4gICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5ub3RlcyA9IHRoaXMubm90ZXMuZmlsdGVyKGggPT4gaC5jYXNlTm90ZUlEICE9PSBub3RlSUQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlQWxlcnQobm90ZUlEKSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdEZWxldGUgbm90ZT8nLFxyXG4gICAgICAgICAgdGV4dDogXCJZb3Ugd29uJ3QgYmUgYWJsZSB0byByZXZlcnQgdGhpcyFcIixcclxuICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgZGVsZXRlIGl0ISdcclxuICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgdGhpcy5kZWxldGVOb3RlKG5vdGVJRCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlFcnJvckFsZXJ0KGVycm9yKSB7XHJcbiAgICBpZiAoZXJyb3IudGl0bGUgPT09IFwiQXV0aCBFcnJvclwiKSB7XHJcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xyXG4gICAgICBzd2FsKFxyXG4gICAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICAgIGVycm9yLm1zZyxcclxuICAgICAgICAnaW5mbydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgICAgZXJyb3IubXNnLFxyXG4gICAgICAgICdlcnJvcidcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
