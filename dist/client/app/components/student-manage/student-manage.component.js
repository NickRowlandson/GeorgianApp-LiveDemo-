System.register(["@angular/core", "../../models/assessmentResults", "@angular/router", "../../services/staff.service", "../../services/student.service", "../../services/client.service", "../../services/course.service", "../../services/authentication.service", "../../services/files.service"], function (exports_1, context_1) {
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
    var core_1, assessmentResults_1, router_1, staff_service_1, student_service_1, client_service_1, course_service_1, authentication_service_1, files_service_1, StudentManageComponent;
    var __moduleName = context_1 && context_1.id;
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
            function (staff_service_1_1) {
                staff_service_1 = staff_service_1_1;
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
            StudentManageComponent = class StudentManageComponent {
                constructor(router, ngZone, staffService, studentService, clientService, courseService, authService, filesService) {
                    this.router = router;
                    this.ngZone = ngZone;
                    this.staffService = staffService;
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
                    this.barChartColors = [{ backgroundColor: ["#FF4207", "#F7CE3C", "#62A744"] }];
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
                            this.students = null;
                            this.displayErrorAlert(students);
                        }
                        else {
                            this.students = students;
                            for (let student of this.students) {
                                student.fullName = student.firstName + " " + student.lastName;
                            }
                            this.getFiles();
                        }
                    })
                        .catch(error => this.error = error);
                }
                getFiles() {
                    this.filesService
                        .getFiles()
                        .then(files => {
                        this.files = files;
                        for (let file of this.files) {
                            file.userID = +file.userID;
                        }
                        this.getSiteActivity();
                    })
                        .catch(error => this.error = error);
                }
                getSiteActivity() {
                    this.staffService
                        .getSiteActivity()
                        .then(results => {
                        if (results.result === 'error') {
                            this.activity = null;
                            this.displayErrorAlert(results);
                        }
                        else {
                            this.activity = results.filter(x => x.type === 'scheduledEmails');
                            swal.close();
                        }
                    })
                        .catch(error => this.error = error);
                }
                download(file) {
                    var filename = file.milliseconds + "_" + file.userID + "_" + file.filename;
                    this.filesService
                        .download(filename)
                        .then(response => {
                        var blob = new Blob([response], { type: "application/pdf" });
                        //change download.pdf to the name of whatever you want your file to be
                        saveAs(blob, file.filename);
                    })
                        .catch(error => error);
                }
                deleteFileAlert(file) {
                    var filename = file.milliseconds + "_" + file.userID + "_" + file.filename;
                    swal({
                        title: 'Delete file (' + file.filename + ')?',
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
                            this.deleteFile(filename);
                        }
                    }).catch(error => error);
                }
                deleteFile(filename) {
                    event.stopPropagation();
                    this.filesService
                        .delete(filename)
                        .then(res => {
                        this.getFiles();
                        swal('Deleted!', 'File has been deleted.', 'success');
                    })
                        .catch(error => error);
                }
                addFile() {
                    this.router.navigate(['/file-upload']);
                }
                archiveAlert(student, event) {
                    swal({
                        title: 'Archive student (' + student.firstName + ' ' + student.lastName + ')',
                        text: "Are you sure want to do this?",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, Archive!'
                    }).then(isConfirm => {
                        if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                            console.log(isConfirm.dismiss);
                        }
                        else if (isConfirm) {
                            this.archiveStudent(student, event);
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }
                archiveStudent(student, event) {
                    this.studentService
                        .archiveStudent(student)
                        .then(result => {
                        if (result.result === 'error') {
                            this.displayErrorAlert(result);
                        }
                        else if (result.result === 'success') {
                            swal(result.title, result.msg, result.result);
                            this.getStudents();
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'error');
                        }
                    })
                        .catch(error => console.log(error));
                }
                goToStudentArchive() {
                    this.router.navigate(['/student-archive']);
                }
                populatePRF(student) {
                    this.studentService
                        .populatePRF(student.userID)
                        .then(result => {
                        if (result.result === 'error') {
                            this.displayErrorAlert(result);
                        }
                        else if (result.result === 'success') {
                            swal('Sorry...', 'This feature is not yet available', 'info');
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'error');
                        }
                    })
                        .catch(error => console.log(error));
                }
                viewInfo(student) {
                    swal({
                        title: 'Loading...'
                    });
                    swal.showLoading();
                    this.resetView();
                    this.showGeneral = true;
                    this.studentInfoView = true;
                    this.studentView = student;
                    this.studentsFiles = this.files.filter(x => x.userID === this.studentView.userID);
                    this.studentService
                        .getAllFormsByID(student)
                        .then(forms => {
                        if (forms.result === 'error') {
                            this.consentView = null;
                            this.learningStyleView = null;
                            this.suitabilityView = null;
                            this.displayErrorAlert(forms);
                        }
                        else {
                            this.consentForms = forms.consentForm;
                            this.learningStyleView = forms.learningStyleForm[0];
                            this.suitabilityView = forms.suitabilityForm[0];
                            var isEmpty = (forms.assessmentResults || []).length === 0;
                            if (isEmpty) {
                                this.editAssessment = false;
                                this.assessmentResults = new assessmentResults_1.AssessmentResults();
                            }
                            else {
                                this.editAssessment = true;
                                this.assessmentResults = forms.assessmentResults[0];
                            }
                            this.barChartData = [{ data: [this.learningStyleView.hearing, this.learningStyleView.seeing, this.learningStyleView.doing] }];
                        }
                        swal.close();
                    })
                        .catch(error => this.error = error);
                }
                viewCourses(student) {
                    var userID = student.userID;
                    this.resetView();
                    this.studentCoursesView = student;
                    this.getTimetableById(userID);
                    this.getWaitListById(userID);
                }
                getTimetableById(userID) {
                    this.studentService
                        .getEventsById(userID)
                        .then(result => {
                        if (result.result === 'error') {
                            this.displayErrorAlert(result);
                            this.studentCourses = null;
                        }
                        else if (result.result === 'success') {
                            this.studentCourses = null;
                            // swal(
                            //     result.title,
                            //     result.msg,
                            //     'info'
                            // );
                        }
                        else {
                            this.studentCourses = result;
                        }
                    }).catch(error => {
                        console.log("Error getting timetable by id");
                    });
                }
                getWaitListById(userID) {
                    this.waitList = null;
                    this.courseService
                        .getWaitListById(userID)
                        .then(result => {
                        if (result.result === 'error') {
                            this.displayErrorAlert(result);
                            this.waitList = null;
                        }
                        else {
                            this.waitList = result;
                        }
                    })
                        .catch(error => console.log("Error - Get wait list by id: " + error));
                }
                overallStatus() {
                    this.resetView();
                }
                sectionBtnClicked(event, section) {
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
                }
                editGeneralInfo(student) {
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
                }
                updateGeneralInfo() {
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
                        .then(user => {
                        if (user.result === "error") {
                            this.displayErrorAlert(user);
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
                            this.getStudents();
                            this.showGeneralInfoEdit = false;
                            this.showGeneral = true;
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'warning');
                        }
                    })
                        .catch();
                }
                allowClientToEdit(student, permission) {
                    this.studentService
                        .grantConsentEditPermission(student, permission)
                        .then(result => {
                        if (result.result === 'error') {
                            this.displayErrorAlert(result);
                        }
                        else if (result.result === 'granted') {
                            this.studentView.editConsentRequest = false;
                            swal('Student Access Granted', 'Student will be sent an email informing that they can now edit conesnt.', 'success');
                        }
                        else if (result.result === 'denied') {
                            this.studentView.editConsentRequest = false;
                            swal('Student Access Denied', 'Student will be sent an email informing that they can NOT edit conesnt.', 'danger');
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'error');
                        }
                    }).catch();
                }
                onSelectChange(event) {
                    var consentForm = this.getConsentFormByConsentID(this.selectedConsentForm);
                    this.consentView = consentForm[0];
                }
                getConsentFormByConsentID(id) {
                    id = +id;
                    var consentForm = this.consentForms.filter(x => x.consentID === id);
                    return consentForm;
                }
                resetView() {
                    this.studentCoursesView = null;
                    this.showAssessmentResults = false;
                    this.showGeneralInfoEdit = false;
                    this.studentInfoView = false;
                    this.showGeneral = false;
                    this.showSuitability = false;
                    this.showConsent = false;
                    this.showLearningStyle = false;
                    this.showFiles = false;
                }
                viewAssessmentResults(student) {
                    this.viewInfo(student);
                    this.resetView();
                    this.studentInfoView = true;
                    this.studentView = student;
                    this.showAssessmentResults = true;
                }
                addAssessmentResults(userID) {
                    this.assessmentResults.userID = userID;
                    this.clientService
                        .addAssessmentResults(this.assessmentResults)
                        .then(result => {
                        if (result.result === 'error') {
                            this.displayErrorAlert(result);
                        }
                        else if (result.result === 'success') {
                            swal(result.title, result.msg, result.result);
                            this.resetView();
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'error');
                        }
                    })
                        .catch(error => this.error = error);
                }
                editAssessmentResults(userID) {
                    this.clientService
                        .editAssessmentResults(this.assessmentResults)
                        .then(result => {
                        if (result.result === 'error') {
                            this.displayErrorAlert(result);
                        }
                        else if (result.result === 'success') {
                            swal(result.title, result.msg, result.result);
                            this.resetView();
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'error');
                        }
                    })
                        .catch(error => this.error = error);
                }
                displayErrorAlert(error) {
                    swal(error.title, error.msg, 'error');
                }
                goBack() {
                    window.history.back();
                }
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
                    staff_service_1.StaffService,
                    student_service_1.StudentService,
                    client_service_1.ClientService,
                    course_service_1.CourseService,
                    authentication_service_1.AuthService,
                    files_service_1.FilesService])
            ], StudentManageComponent);
            exports_1("StudentManageComponent", StudentManageComponent);
        }
    };
});

//# sourceMappingURL=student-manage.component.js.map
