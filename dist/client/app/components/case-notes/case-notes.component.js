System.register(["@angular/core", "@angular/router", "../../services/student.service"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, student_service_1, CaseNotesComponent;
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
            }
        ],
        execute: function () {
            CaseNotesComponent = (function () {
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
            exports_1("CaseNotesComponent", CaseNotesComponent);
        }
    };
});

//# sourceMappingURL=case-notes.component.js.map
