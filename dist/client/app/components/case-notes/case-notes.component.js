System.register(["@angular/core", "@angular/router", "../../services/student.service", "../../services/staff.service"], function (exports_1, context_1) {
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
    var core_1, router_1, student_service_1, staff_service_1, CaseNotesComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (student_service_1_1) {
                student_service_1 = student_service_1_1;
            },
            function (staff_service_1_1) {
                staff_service_1 = staff_service_1_1;
            }
        ],
        execute: function () {
            CaseNotesComponent = class CaseNotesComponent {
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
            exports_1("CaseNotesComponent", CaseNotesComponent);
        }
    };
});

//# sourceMappingURL=case-notes.component.js.map
