System.register(["@angular/core", "../../models/assessmentResults", "@angular/router", "../../services/student.service", "../../services/client.service", "../../services/course.service", "../../services/authentication.service", "../../services/files.service"], function (exports_1, context_1) {
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
    var core_1, assessmentResults_1, router_1, student_service_1, client_service_1, course_service_1, authentication_service_1, files_service_1, StudentManageComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (assessmentResults_1_1) {
                assessmentResults_1 = assessmentResults_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (student_service_1_1) {
                student_service_1 = student_service_1_1;
            },
            function (client_service_1_1) {
                client_service_1 = client_service_1_1;
            },
            function (course_service_1_1) {
                course_service_1 = course_service_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (files_service_1_1) {
                files_service_1 = files_service_1_1;
            }
        ],
        execute: function () {
            StudentManageComponent = /** @class */ (function () {
                function StudentManageComponent(router, ngZone, studentService, clientService, courseService, authService, filesService) {
                    this.router = router;
                    this.ngZone = ngZone;
                    this.studentService = studentService;
                    this.clientService = clientService;
                    this.courseService = courseService;
                    this.authService = authService;
                    this.filesService = filesService;
                    this.studentInfoView = false;
                    this.showGeneral = true;
                    this.showGeneralInfoEdit = false;
                    this.phone1 = false;
                    this.phone2 = false;
                    this.long1 = false;
                    this.long2 = false;
                    //bar chart (learning style)
                    this.barChartOptions = {
                        scaleShowVerticalLines: false,
                        responsive: true
                    };
                    this.barChartLabels = ['Hearing', 'Seeing', 'Doing'];
                    this.barChartType = 'bar';
                    this.barChartLegend = false;
                    this.barChartColors = [{ backgroundColor: ["#FF4207", "#F8E903", "#2AD308"] }];
                }
                StudentManageComponent.prototype.ngOnInit = function () {
                    this.getStudents();
                    this.getFiles();
                };
                StudentManageComponent.prototype.getStudents = function () {
                    var _this = this;
                    this.studentService
                        .getStudents()
                        .then(function (students) {
                        if (students.result === 'error') {
                            _this.students = null;
                            _this.displayErrorAlert(students);
                        }
                        else {
                            _this.students = students;
                            for (var _i = 0, _a = _this.students; _i < _a.length; _i++) {
                                var student = _a[_i];
                                student.fullName = student.firstName + " " + student.lastName;
                            }
                        }
                    })
                        .catch(function (error) { return _this.error = error; });
                };
                StudentManageComponent.prototype.getFiles = function () {
                    var _this = this;
                    this.filesService
                        .getFiles()
                        .then(function (files) {
                        _this.files = files;
                        for (var _i = 0, _a = _this.files; _i < _a.length; _i++) {
                            var file = _a[_i];
                            file.userID = +file.userID;
                        }
                        swal.close();
                    })
                        .catch(function (error) { return error; });
                };
                StudentManageComponent.prototype.download = function (file) {
                    var filename = file.milliseconds + "_" + file.userID + "_" + file.filename;
                    this.filesService
                        .download(filename)
                        .then(function (response) {
                        var blob = new Blob([response], { type: "application/pdf" });
                        //change download.pdf to the name of whatever you want your file to be
                        saveAs(blob, file.filename);
                    })
                        .catch(function (error) { return error; });
                };
                StudentManageComponent.prototype.deleteFileAlert = function (file) {
                    var _this = this;
                    var filename = file.milliseconds + "_" + file.userID + "_" + file.filename;
                    swal({
                        title: 'Delete file (' + file.filename + ')?',
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
                            _this.deleteFile(filename);
                        }
                    }).catch(function (error) { return error; });
                };
                StudentManageComponent.prototype.deleteFile = function (filename) {
                    var _this = this;
                    event.stopPropagation();
                    this.filesService
                        .delete(filename)
                        .then(function (res) {
                        _this.getFiles();
                        swal('Deleted!', 'File has been deleted.', 'success');
                    })
                        .catch(function (error) { return error; });
                };
                StudentManageComponent.prototype.addFile = function () {
                    this.router.navigate(['/file-upload']);
                };
                StudentManageComponent.prototype.archiveAlert = function (student, event) {
                    var _this = this;
                    swal({
                        title: 'Archive student (' + student.firstName + ' ' + student.lastName + ')',
                        text: "Are you sure want to do this?",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, Archive!'
                    }).then(function (isConfirm) {
                        if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                            console.log(isConfirm.dismiss);
                        }
                        else if (isConfirm) {
                            _this.archiveStudent(student, event);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                };
                StudentManageComponent.prototype.archiveStudent = function (student, event) {
                    var _this = this;
                    this.studentService
                        .archiveStudent(student)
                        .then(function (result) {
                        if (result.result === 'error') {
                            _this.displayErrorAlert(result);
                        }
                        else if (result.result === 'success') {
                            swal(result.title, result.msg, result.result);
                            _this.getStudents();
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'error');
                        }
                    })
                        .catch(function (error) { return console.log(error); });
                };
                StudentManageComponent.prototype.goToStudentArchive = function () {
                    this.router.navigate(['/student-archive']);
                };
                StudentManageComponent.prototype.populatePRF = function (student) {
                    var _this = this;
                    this.studentService
                        .populatePRF(student.userID)
                        .then(function (result) {
                        if (result.result === 'error') {
                            _this.displayErrorAlert(result);
                        }
                        else if (result.result === 'success') {
                            swal('Sorry...', 'This feature is not yet available', 'info');
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'error');
                        }
                    })
                        .catch(function (error) { return console.log(error); });
                };
                StudentManageComponent.prototype.viewInfo = function (student) {
                    var _this = this;
                    swal({
                        title: 'Loading...'
                    });
                    swal.showLoading();
                    this.resetView();
                    this.showGeneral = true;
                    this.studentInfoView = true;
                    this.studentView = student;
                    this.studentsFiles = this.files.filter(function (x) { return x.userID === _this.studentView.userID; });
                    this.studentService
                        .getAllFormsByID(student)
                        .then(function (forms) {
                        if (forms.result === 'error') {
                            _this.consentView = null;
                            _this.learningStyleView = null;
                            _this.suitabilityView = null;
                            _this.displayErrorAlert(forms);
                        }
                        else {
                            _this.consentForms = forms.consentForm;
                            _this.learningStyleView = forms.learningStyleForm[0];
                            _this.suitabilityView = forms.suitabilityForm[0];
                            var isEmpty = (forms.assessmentResults || []).length === 0;
                            if (isEmpty) {
                                _this.editAssessment = false;
                                _this.assessmentResults = new assessmentResults_1.AssessmentResults();
                            }
                            else {
                                _this.editAssessment = true;
                                _this.assessmentResults = forms.assessmentResults[0];
                            }
                            _this.barChartData = [{ data: [_this.learningStyleView.hearing, _this.learningStyleView.seeing, _this.learningStyleView.doing] }];
                        }
                        swal.close();
                    })
                        .catch(function (error) { return _this.error = error; });
                };
                StudentManageComponent.prototype.viewCourses = function (student) {
                    this.resetView();
                    this.studentCoursesView = student;
                    this.getTimetableById(student.userID);
                    this.getWaitListById(student);
                };
                StudentManageComponent.prototype.getTimetableById = function (userID) {
                    var _this = this;
                    this.studentService
                        .getEventsById(userID)
                        .then(function (result) {
                        if (result.result === 'error') {
                            _this.displayErrorAlert(result);
                            _this.studentCourses = null;
                        }
                        else if (result.result === 'success') {
                            _this.studentCourses = null;
                            // swal(
                            //     result.title,
                            //     result.msg,
                            //     'info'
                            // );
                        }
                        else {
                            _this.studentCourses = result;
                        }
                    }).catch(function (error) {
                        console.log("Error getting timetable by id");
                    });
                };
                StudentManageComponent.prototype.getWaitListById = function (student) {
                    var _this = this;
                    this.waitList = null;
                    this.courseService
                        .getWaitListById(student.userID)
                        .then(function (result) {
                        if (result.result === 'error') {
                            _this.displayErrorAlert(result);
                            _this.waitList = null;
                        }
                        else if (result.result === 'success') {
                            _this.waitList = null;
                            // swal(
                            //     result.title,
                            //     result.msg,
                            //     'info'
                            // );
                        }
                        else {
                            _this.waitList = result;
                        }
                    })
                        .catch(function (error) { return console.log("Error - Get wait list by id: " + error); });
                };
                StudentManageComponent.prototype.overallStatus = function () {
                    this.resetView();
                };
                StudentManageComponent.prototype.sectionBtnClicked = function (event, section) {
                    this.resetView();
                    this.studentInfoView = true;
                    if (section === "general") {
                        this.showGeneral = true;
                    }
                    else if (section === "suitability") {
                        this.showSuitability = true;
                    }
                    else if (section === "consent") {
                        this.showConsent = true;
                    }
                    else if (section === "learningStyle") {
                        this.showLearningStyle = true;
                    }
                    else if (section === "files") {
                        this.showFiles = true;
                    }
                };
                StudentManageComponent.prototype.editGeneralInfo = function (student) {
                    this.studentEdit = student;
                    var splitPhone = this.studentEdit.phone.split(' ');
                    if (this.studentEdit.phone.indexOf('+1') !== -1) {
                        this.long1 = true;
                        this.studentEdit.phone = splitPhone[1] + " " + splitPhone[2];
                        if (splitPhone[3] === 'Home') {
                            this.phone1 = false;
                        }
                        else {
                            this.phone1 = true;
                        }
                    }
                    else {
                        this.long1 = false;
                        this.studentEdit.phone = splitPhone[0] + " " + splitPhone[1];
                        if (splitPhone[2] === 'Home') {
                            this.phone1 = false;
                        }
                        else {
                            this.phone1 = true;
                        }
                    }
                    var splitAlternate = this.studentEdit.alternateNumber.split(' ');
                    if (this.studentEdit.alternateNumber.indexOf('+1') !== -1) {
                        this.long2 = true;
                        this.studentEdit.alternateNumber = splitAlternate[1] + " " + splitAlternate[2];
                        if (splitAlternate[3] === 'Home') {
                            this.phone2 = false;
                        }
                        else {
                            this.phone2 = true;
                        }
                    }
                    else {
                        this.long2 = false;
                        this.studentEdit.alternateNumber = splitAlternate[0] + " " + splitAlternate[1];
                        if (splitAlternate[2] === 'Home') {
                            this.phone2 = false;
                        }
                        else {
                            this.phone2 = true;
                        }
                    }
                    this.showGeneral = false;
                    this.showGeneralInfoEdit = true;
                };
                StudentManageComponent.prototype.updateGeneralInfo = function () {
                    var _this = this;
                    swal({
                        title: 'Updating...'
                    });
                    swal.showLoading();
                    var phoneSplit = this.studentEdit.phone.split(' ');
                    this.studentEdit.phone = phoneSplit[0] + " " + phoneSplit[1];
                    if (this.phone1 === true) {
                        this.studentEdit.phone = this.studentEdit.phone + " Cell";
                    }
                    else if (this.phone1 === false) {
                        this.studentEdit.phone = this.studentEdit.phone + " Home";
                    }
                    if (this.long1 === true) {
                        this.studentEdit.phone = "+1 " + this.studentEdit.phone;
                    }
                    var alternateSplit = this.studentEdit.alternateNumber.split(' ');
                    this.studentEdit.alternateNumber = alternateSplit[0] + " " + alternateSplit[1];
                    if (this.phone2 === true) {
                        this.studentEdit.alternateNumber = this.studentEdit.alternateNumber + " Cell";
                    }
                    else if (this.phone2 === false) {
                        this.studentEdit.alternateNumber = this.studentEdit.alternateNumber + " Home";
                    }
                    if (this.long2 === true) {
                        this.studentEdit.alternateNumber = "+1 " + this.studentEdit.alternateNumber;
                    }
                    this.studentService
                        .updateGeneralInfo(this.studentEdit)
                        .then(function (user) {
                        if (user.result === "error") {
                            _this.displayErrorAlert(user);
                        }
                        else if (user.msg === "Username is already in use.") {
                            swal('Username taken', 'Please enter a different username.', 'warning');
                        }
                        else if (user.msg === "Email is already in use.") {
                            swal('Email in use', 'Please enter a different email.', 'warning');
                        }
                        else if (user.msg === "Incorrect email format.") {
                            swal('Incorrect email format', 'Please enter a proper email.', 'warning');
                        }
                        else if (user.result === "success") {
                            swal(user.title, user.msg, 'success');
                            _this.getStudents();
                            _this.showGeneralInfoEdit = false;
                            _this.showGeneral = true;
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'warning');
                        }
                    })
                        .catch();
                };
                StudentManageComponent.prototype.allowClientToEdit = function (student, permission) {
                    var _this = this;
                    this.studentService
                        .grantConsentEditPermission(student, permission)
                        .then(function (result) {
                        if (result.result === 'error') {
                            _this.displayErrorAlert(result);
                        }
                        else if (result.result === 'granted') {
                            _this.studentView.editConsentRequest = false;
                            swal('Student Access Granted', 'Student will be sent an email informing that they can now edit conesnt.', 'success');
                        }
                        else if (result.result === 'denied') {
                            _this.studentView.editConsentRequest = false;
                            swal('Student Access Denied', 'Student will be sent an email informing that they can NOT edit conesnt.', 'danger');
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'error');
                        }
                    }).catch();
                };
                StudentManageComponent.prototype.onSelectChange = function (event) {
                    var consentForm = this.getConsentFormByConsentID(this.selectedConsentForm);
                    this.consentView = consentForm[0];
                };
                StudentManageComponent.prototype.getConsentFormByConsentID = function (id) {
                    id = +id;
                    var consentForm = this.consentForms.filter(function (x) { return x.consentID === id; });
                    return consentForm;
                };
                StudentManageComponent.prototype.resetView = function () {
                    this.studentCoursesView = null;
                    this.showAssessmentResults = false;
                    this.showGeneralInfoEdit = false;
                    this.studentInfoView = false;
                    this.showGeneral = false;
                    this.showSuitability = false;
                    this.showConsent = false;
                    this.showLearningStyle = false;
                    this.showFiles = false;
                };
                StudentManageComponent.prototype.viewAssessmentResults = function (student) {
                    this.viewInfo(student);
                    this.resetView();
                    this.studentInfoView = true;
                    this.studentView = student;
                    this.showAssessmentResults = true;
                };
                StudentManageComponent.prototype.addAssessmentResults = function (userID) {
                    var _this = this;
                    this.assessmentResults.userID = userID;
                    this.clientService
                        .addAssessmentResults(this.assessmentResults)
                        .then(function (result) {
                        if (result.result === 'error') {
                            _this.displayErrorAlert(result);
                        }
                        else if (result.result === 'success') {
                            swal(result.title, result.msg, result.result);
                            _this.resetView();
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'error');
                        }
                    })
                        .catch(function (error) { return _this.error = error; });
                };
                StudentManageComponent.prototype.editAssessmentResults = function (userID) {
                    var _this = this;
                    this.clientService
                        .editAssessmentResults(this.assessmentResults)
                        .then(function (result) {
                        if (result.result === 'error') {
                            _this.displayErrorAlert(result);
                        }
                        else if (result.result === 'success') {
                            swal(result.title, result.msg, result.result);
                            _this.resetView();
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'error');
                        }
                    })
                        .catch(function (error) { return _this.error = error; });
                };
                StudentManageComponent.prototype.displayErrorAlert = function (error) {
                    swal(error.title, error.msg, 'error');
                };
                StudentManageComponent.prototype.goBack = function () {
                    window.history.back();
                };
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", assessmentResults_1.AssessmentResults)
                ], StudentManageComponent.prototype, "assessmentResults", void 0);
                StudentManageComponent = __decorate([
                    core_1.Component({
                        selector: 'student-manage',
                        templateUrl: './app/components/student-manage/student-manage.component.html',
                        styleUrls: ['./app/components/student-manage/student-manage.component.css']
                    }),
                    __metadata("design:paramtypes", [router_1.Router,
                        core_1.NgZone,
                        student_service_1.StudentService,
                        client_service_1.ClientService,
                        course_service_1.CourseService,
                        authentication_service_1.AuthService,
                        files_service_1.FilesService])
                ], StudentManageComponent);
                return StudentManageComponent;
            }());
            exports_1("StudentManageComponent", StudentManageComponent);
        }
    };
});

//# sourceMappingURL=student-manage.component.js.map
