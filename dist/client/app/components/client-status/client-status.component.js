System.register(["@angular/core", "@angular/router", "../../models/suitabilityForm", "../../models/assessmentResults", "../../services/client.service", "../../services/student.service", "../../services/course.service", "../../services/authentication.service", "../../services/files.service", "@angular/platform-browser"], function (exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, router_1, suitabilityForm_1, assessmentResults_1, client_service_1, student_service_1, course_service_1, authentication_service_1, files_service_1, platform_browser_1, ClientStatusComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (suitabilityForm_1_1) {
                suitabilityForm_1 = suitabilityForm_1_1;
            },
            function (assessmentResults_1_1) {
                assessmentResults_1 = assessmentResults_1_1;
            },
            function (client_service_1_1) {
                client_service_1 = client_service_1_1;
            },
            function (student_service_1_1) {
                student_service_1 = student_service_1_1;
            },
            function (course_service_1_1) {
                course_service_1 = course_service_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (files_service_1_1) {
                files_service_1 = files_service_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            }
        ],
        execute: function () {
            ClientStatusComponent = class ClientStatusComponent {
                constructor(document, router, courseService, clientService, studentService, authService, filesService) {
                    this.document = document;
                    this.router = router;
                    this.courseService = courseService;
                    this.clientService = clientService;
                    this.studentService = studentService;
                    this.authService = authService;
                    this.filesService = filesService;
                    this.phone1 = false;
                    this.phone2 = false;
                    this.long1 = false;
                    this.long2 = false;
                    this.addSuitability = false;
                    this.warning = false;
                    this.calculated = false;
                    this.partAPoints = 0;
                    this.partBPoints = 0;
                    this.totalPoints = 0;
                    this.statusReport = true;
                    this.showGeneral = true;
                    this.doughnutChartColors = [{ backgroundColor: ["#E32F26", "#F7CE3C", "#76C4D5", "#62A744"] }];
                    //bar chart (learning style)
                    this.barChartOptions = {
                        scaleShowVerticalLines: false,
                        responsive: true
                    };
                    this.barChartLabels = ['Hearing', 'Seeing', 'Doing'];
                    this.barChartType = 'bar';
                    this.barChartLegend = false;
                    this.barChartColors = [{ backgroundColor: ["#E32F26", "#F7CE3C", "#62A744"] }];
                    this.courseTypes = [];
                    this.selectedCourseTypes = [];
                }
                ngOnInit() {
                    swal({
                        title: 'Loading...',
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    this.getClients();
                    // get course types
                    this.courseService.getCourseTypes()
                        .then((result) => {
                        if (result.result === "error") {
                            this.displayErrorAlert(result);
                        }
                        else {
                            result.forEach((i) => {
                                this.courseTypes.push({
                                    label: i.courseType,
                                    value: i.courseType
                                });
                            });
                        }
                    });
                }
                getClients() {
                    this.clientService
                        .getClients()
                        .then(objects => {
                        if (objects.result === 'error') {
                            this.data = null;
                            this.displayErrorAlert(objects);
                        }
                        else {
                            this.setData(objects);
                        }
                    })
                        .catch(error => this.error = error);
                }
                setData(objects) {
                    this.data = objects.clients;
                    for (let client of this.data) {
                        client.fullName = client.firstName + " " + client.lastName;
                        if (client.banner == null) {
                            client.banner = false;
                        }
                        if (client.cam == null) {
                            client.cam = false;
                        }
                    }
                    this.allClients = objects.clients;
                    this.clientTotal = objects.clients.length;
                    this.suitabilityForms = objects.suitabilityForms;
                    this.consentForms = objects.consentForms;
                    this.learningStyleForms = objects.learningStyleForms;
                    this.allAssessmentResults = objects.assessmentResults;
                    this.stage1 = this.data.filter(x => x.suitability);
                    this.stage2 = this.data.filter(x => !x.suitability && x.consent);
                    this.stage3 = this.data.filter(x => !x.suitability && !x.consent && (!x.banner || !x.cam));
                    this.stage4 = this.data.filter(x => !x.suitability && !x.consent && x.banner && x.cam);
                    this.doughnutChartLabels = ['Suitability', 'Consent', 'Banner/CAM', 'Transfer Ready'];
                    this.doughnutChartData = [this.stage1.length, this.stage2.length, this.stage3.length, this.stage4.length];
                    this.doughnutChartType = 'doughnut';
                    this.addSuitability = false;
                    this.getFiles();
                }
                getFiles() {
                    this.filesService
                        .getFiles()
                        .then(files => {
                        if (files.result === 'error') {
                            this.files = null;
                            this.displayErrorAlert(files);
                        }
                        else {
                            this.files = files;
                            for (let file of this.files) {
                                file.userID = +file.userID;
                            }
                            swal.close();
                        }
                    })
                        .catch(error => error);
                }
                download(file) {
                    console.log(file);
                    var filename = file.milliseconds + "_" + file.userID + "_" + file.filename;
                    this.filesService
                        .download(filename)
                        .then(response => {
                        var blob = new Blob([response], { type: "application/pdf" });
                        //change download.pdf to the name of whatever you want your file to be
                        console.log(blob);
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
                        .then(result => {
                        if (result.result === 'error') {
                            this.displayErrorAlert(result);
                        }
                        else if (result.result === 'success') {
                            this.getFiles();
                            swal('Deleted!', 'File has been deleted.', 'success');
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'error');
                        }
                    })
                        .catch(error => error);
                }
                addFile() {
                    this.router.navigate(['/file-upload']);
                }
                addClient() {
                    this.router.navigate(['/suitability']);
                }
                deleteAlert(client) {
                    swal({
                        title: 'Delete client (' + client.firstName + ' ' + client.lastName + ')?',
                        text: "You won't be able to revert this!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#E32F26',
                        confirmButtonText: 'Yes, delete it!'
                    }).then(isConfirm => {
                        if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                            console.log(isConfirm.dismiss);
                        }
                        else if (isConfirm) {
                            this.deleteClient(client);
                        }
                    }).catch(error => {
                        //console.log("Canceled");
                    });
                }
                deleteClient(client) {
                    event.stopPropagation();
                    this.clientService
                        .delete(client)
                        .then(result => {
                        if (result.result === 'error') {
                            this.displayErrorAlert(result);
                        }
                        else if (result.result === 'success') {
                            this.showStatusReport();
                            this.data = this.data.filter(h => h !== client);
                            this.allClients = this.allClients.filter(h => h !== client);
                            this.stage1 = this.data.filter(x => x.suitability);
                            this.stage2 = this.data.filter(x => !x.suitability && x.consent);
                            this.stage3 = this.data.filter(x => !x.suitability && !x.consent && (!x.banner || !x.cam));
                            this.stage4 = this.data.filter(x => !x.suitability && !x.consent && x.banner && x.cam);
                            this.doughnutChartData = [this.stage1.length, this.stage2.length, this.stage3.length, this.stage4.length];
                            swal('Deleted!', 'Client record has been deleted.', 'success');
                            this.clientTotal = this.data.length;
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'error');
                        }
                    })
                        .catch(error => this.error = error);
                }
                showClientView(client) {
                    this.currentClientEmail = client.email;
                    this.clientView = client;
                    this.resetView();
                    this.showGeneral = true;
                    this.clientFiles = this.files.filter(x => x.userID === this.clientView.userID);
                    var suitabilityForm = this.getSuitabilityFormByFilter(client.userID);
                    this.suitabilityView = suitabilityForm[0];
                    var consentForms = this.getConsentFormByUserID(client.userID);
                    this.clientConsentForms = consentForms;
                    // this.clientConsentForms.sort(function compare(a, b) {
                    //   var dateA = new Date(a.date.getTime());
                    //   var dateB = new Date(b.date.getTime());
                    //   return dateA - dateB;
                    // });
                    //this.consentView = consentForms[0];
                    var learningStyleForm = this.getLearningStyleFormByFilter(client.userID);
                    this.learningStyleView = learningStyleForm[0];
                    if (this.learningStyleView) {
                        this.barChartData = [{ data: [this.learningStyleView.hearing, this.learningStyleView.seeing, this.learningStyleView.doing] }];
                    }
                }
                getSuitabilityFormByFilter(id) {
                    return this.suitabilityForms.filter(x => x.userID === id);
                }
                getConsentFormByUserID(id) {
                    return this.consentForms.filter(x => x.userID === id);
                }
                getConsentFormByConsentID(id) {
                    id = +id;
                    var consentForm = this.clientConsentForms.filter(x => x.consentID === id);
                    return consentForm;
                }
                getLearningStyleFormByFilter(id) {
                    return this.learningStyleForms.filter(x => x.userID === id);
                }
                sectionBtnClicked(event, section) {
                    if (section === "general") {
                        this.resetView();
                        this.showGeneral = true;
                    }
                    else if (section === "suitability") {
                        this.resetView();
                        this.showSuitability = true;
                    }
                    else if (section === "consent") {
                        this.resetView();
                        this.showConsent = true;
                    }
                    else if (section === "learningStyle") {
                        this.resetView();
                        this.showLearningStyle = true;
                    }
                    else if (section === "files") {
                        this.resetView();
                        this.showFiles = true;
                    }
                }
                showStatusReport() {
                    this.showSuitabilityEdit = false;
                    this.showGeneralInfoEdit = false;
                    this.addSuitability = false;
                    this.statusReport = true;
                    this.clientSuitability = null;
                    this.clientView = null;
                    this.addSuitability = false;
                }
                chartClicked(e) {
                    try {
                        var index = e.active[0]._index;
                        if (index === 0) {
                            this.data = this.allClients.filter(x => x.suitability);
                        }
                        else if (index === 1) {
                            this.data = this.allClients.filter(x => !x.suitability && x.consent);
                        }
                        else if (index === 2) {
                            this.data = this.allClients.filter(x => !x.suitability && !x.consent);
                        }
                        else if (index === 3) {
                            this.data = this.allClients.filter(x => !x.suitability && !x.consent && x.banner && x.cam);
                        }
                    }
                    catch (err) {
                        this.data = this.allClients;
                    }
                }
                chartHovered(e) {
                }
                createAsStudent(client) {
                    if (client.studentNumber === 'TBD') {
                        this.studentNumber(client);
                    }
                    else {
                        swal({
                            title: 'Student Number',
                            type: 'info',
                            text: 'Previously attended georgian: ' + client.studentNumber,
                            input: "text",
                            inputPlaceholder: 'Please re-enter student number displayed above',
                            showCancelButton: true,
                            animation: "slide-from-top",
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#E32F26',
                            confirmButtonText: 'Save'
                        }).then(isConfirm => {
                            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                                console.log(isConfirm.dismiss);
                            }
                            else if (isConfirm) {
                                client.studentNumber = isConfirm.value;
                                this.removeAlert(client);
                            }
                        }).catch(error => {
                            console.log(error); // TODO: Display error message
                        });
                    }
                }
                studentNumber(client) {
                    swal({
                        title: 'Student Number',
                        type: 'info',
                        text: 'Please enter student number for ' + client.firstName + ' ' + client.lastName + '',
                        input: "text",
                        inputPlaceholder: "Enter Student Number",
                        showCancelButton: true,
                        animation: "slide-from-top",
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#E32F26',
                        confirmButtonText: 'Save'
                    }).then(isConfirm => {
                        if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                            // canceled
                        }
                        else if (isConfirm) {
                            client.studentNumber = isConfirm.value;
                            this.removeAlert(client);
                        }
                    }).catch(error => {
                        console.log(error); // TODO: Display error message
                    });
                }
                removeAlert(client) {
                    if (client.studentNumber == null || client.studentNumber === '') {
                        this.studentNumber(client);
                    }
                    else {
                        swal({
                            title: 'Transfer client (' + client.firstName + ' ' + client.lastName + ')?',
                            text: 'Are you sure you want to create as student with #' + client.studentNumber + '?',
                            type: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#E32F26',
                            confirmButtonText: 'Yes, transfer!'
                        }).then(isConfirm => {
                            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                                // canceled
                            }
                            else if (isConfirm) {
                                swal({
                                    title: 'Transferring...'
                                });
                                swal.showLoading();
                                this.studentService
                                    .postNew(client)
                                    .then(result => {
                                    if (result.result === 'error') {
                                        this.displayErrorAlert(result);
                                    }
                                    else if (result.result === 'success') {
                                        this.removeFromClientTable(client.userID);
                                    }
                                    else {
                                        swal('Error', 'Something went wrong, please try again.', 'error');
                                    }
                                })
                                    .catch(error => this.error = error); // TODO: Display error message
                            }
                        }).catch(error => {
                            console.log(error); // TODO: Display error message
                        });
                    }
                }
                removeFromClientTable(userID) {
                    event.stopPropagation();
                    this.clientService
                        .removeFromClientTable(userID)
                        .then(result => {
                        if (result.result === 'error') {
                            this.displayErrorAlert(result);
                        }
                        else if (result.result === 'success') {
                            this.data = this.data.filter(h => h.userID !== userID);
                            this.stage3 = this.data.filter(x => x.userID !== userID && !x.suitability && !x.consent);
                            this.stage4 = this.data.filter(x => x.userID !== userID && !x.suitability && !x.consent && x.banner && x.cam);
                            this.doughnutChartData = [this.stage1.length, this.stage2.length, this.stage3.length, this.stage4.length];
                            swal('Transfered', 'Client record has been transfered to the student table.', 'success');
                            //this.router.navigate(['/students']);
                            this.clientTotal = this.data.length;
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'error');
                        }
                    })
                        .catch(error => this.error = error);
                }
                addSuitabilityInfo(client) {
                    this.selectedCourseTypes = [];
                    this.clientView = client;
                    this.addSuitability = true;
                    this.showGeneral = false;
                    this.showConsent = false;
                    this.showLearningStyle = false;
                    this.showSuitabilityEdit = false;
                    this.statusReport = false;
                    this.suitabilityForm = new suitabilityForm_1.SuitabilityForm();
                    this.suitabilityForm.transcript = false;
                    this.suitabilityForm.appropriateGoal = true;
                    this.suitabilityForm.isValidAge = true;
                    this.suitabilityForm.governmentID = false;
                    this.suitabilityForm.schoolRegistration = false;
                    this.suitabilityForm.availableDuringClass = true;
                    this.suitabilityForm.factorHealth = false;
                    this.suitabilityForm.factorInstructions = false;
                    this.suitabilityForm.factorCommunication = false;
                    this.suitabilityForm.factorLanguage = false;
                    this.suitabilityForm.factorComputer = false;
                    this.suitabilityForm.factorHousing = false;
                    this.suitabilityForm.factorTransportation = false;
                    this.suitabilityForm.factorDaycare = false;
                    this.suitabilityForm.factorInternet = false;
                    this.suitabilityForm.factorPersonal = false;
                    this.clientSuitability = client;
                }
                editGeneralInfo(client) {
                    this.statusReport = false;
                    this.clientEdit = client;
                    var splitPhone = this.clientEdit.phone.split(' ');
                    // if (this.clientEdit.birthdate === 'undefined' || this.clientEdit.birthdate === 'Invalid date') {
                    //   this.clientEdit.birthdate = '';
                    // } else {
                    //   var birthdate = new Date(this.clientEdit.birthdate);
                    //   this.clientEdit.birthdate = moment(birthdate).format('DD/MM/YYYY');
                    // }
                    if (this.clientEdit.phone.indexOf('+1') !== -1) {
                        this.long1 = true;
                        this.clientEdit.phone = splitPhone[1] + " " + splitPhone[2];
                        if (splitPhone[3] === 'Home') {
                            this.phone1 = false;
                        }
                        else {
                            this.phone1 = true;
                        }
                    }
                    else {
                        this.long1 = false;
                        this.clientEdit.phone = splitPhone[0] + " " + splitPhone[1];
                        if (splitPhone[2] === 'Home') {
                            this.phone1 = false;
                        }
                        else {
                            this.phone1 = true;
                        }
                    }
                    var splitAlternate = this.clientEdit.alternateNumber.split(' ');
                    if (this.clientEdit.alternateNumber.indexOf('+1') !== -1) {
                        this.long2 = true;
                        this.clientEdit.alternateNumber = splitAlternate[1] + " " + splitAlternate[2];
                        if (splitAlternate[3] === 'Home') {
                            this.phone2 = false;
                        }
                        else {
                            this.phone2 = true;
                        }
                    }
                    else {
                        this.long2 = false;
                        this.clientEdit.alternateNumber = splitAlternate[0] + " " + splitAlternate[1];
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
                    // var birthdate = new Date(this.clientEdit.birthdate);
                    // this.clientEdit.birthdate = moment(birthdate).format('MM/DD/YYYY');
                    var phoneSplit = this.clientEdit.phone.split(' ');
                    this.clientEdit.phone = phoneSplit[0] + " " + phoneSplit[1];
                    if (this.phone1 === true) {
                        this.clientEdit.phone = this.clientEdit.phone + " Cell";
                    }
                    else if (this.phone1 === false) {
                        this.clientEdit.phone = this.clientEdit.phone + " Home";
                    }
                    if (this.long1 === true) {
                        this.clientEdit.phone = "+1 " + this.clientEdit.phone;
                    }
                    var alternateSplit = this.clientEdit.alternateNumber.split(' ');
                    this.clientEdit.alternateNumber = alternateSplit[0] + " " + alternateSplit[1];
                    if (this.phone2 === true) {
                        this.clientEdit.alternateNumber = this.clientEdit.alternateNumber + " Cell";
                    }
                    else if (this.phone2 === false) {
                        this.clientEdit.alternateNumber = this.clientEdit.alternateNumber + " Home";
                    }
                    if (this.long2 === true) {
                        this.clientEdit.alternateNumber = "+1 " + this.clientEdit.alternateNumber;
                    }
                    this.clientService
                        .updateGeneralInfo(this.clientEdit)
                        .then(result => {
                        if (result.result === 'error') {
                            this.displayErrorAlert(result);
                        }
                        else if (result.msg === "Username is already in use.") {
                            swal('Username taken', 'Please enter a different username.', 'warning');
                        }
                        else if (result.msg === "Email is already in use.") {
                            swal('Email in use', 'Please enter a different email.', 'warning');
                        }
                        else if (result.msg === "Incorrect email format.") {
                            swal('Incorrect email format', 'Please enter a proper email.', 'warning');
                            this.clientView.email = this.currentClientEmail;
                        }
                        else if (result.result === 'success') {
                            this.showStatusReport();
                            swal('Success!', 'Client information has been updated!', 'success');
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'error');
                        }
                    })
                        .catch(error => this.error = error);
                }
                editSuitability(client) {
                    this.resetView();
                    this.showSuitabilityEdit = true;
                    this.suitabilityForm = this.getSuitabilityFormByFilter(client.userID)[0];
                    if (this.suitabilityForm.incomeSource === "Other") {
                        this.suitabilityForm.incomeSource = "Other";
                    }
                    if (this.suitabilityForm.incomeSource.includes("Other - ")) {
                        this.suitabilityForm.incomeSourceOther = this.suitabilityForm.incomeSource.split("Other - ")[1];
                        this.suitabilityForm.incomeSource = "Other";
                    }
                    this.selectedCourseTypes = [];
                    if (this.suitabilityForm.selectedCourseTypes != null) {
                        for (let item of this.suitabilityForm.selectedCourseTypes.split(',')) {
                            this.selectedCourseTypes.push(item);
                        }
                    }
                    var keys = Object.keys(this.suitabilityForm);
                    for (var i = 0; i < keys.length; i++) {
                        if (typeof this.suitabilityForm[keys[i]] === "string") {
                            if (this.suitabilityForm[keys[i]] === "true") {
                                this.suitabilityForm[keys[i]] = true;
                            }
                            else if (this.suitabilityForm[keys[i]] === "false") {
                                this.suitabilityForm[keys[i]] = false;
                            }
                            else if (this.suitabilityForm[keys[i]] == null) {
                                this.suitabilityForm[keys[i]] = false;
                            }
                        }
                    }
                    this.clientSuitability = client;
                }
                saveSuitability() {
                    swal({
                        title: 'Saving...'
                    });
                    swal.showLoading();
                    if (this.suitabilityForm.suitabilityID) {
                        this.suitabilityForm.selectedCourseTypes = this.selectedCourseTypes.toString();
                        this.tallyPoints();
                        this.suitabilityForm.dbTotalPoints = this.totalPoints;
                        this.clientService
                            .updateSuitability(this.suitabilityForm)
                            .then(result => {
                            if (result.result === 'error') {
                                this.displayErrorAlert(result);
                            }
                            else if (result.result === 'success') {
                                this.getClients();
                                this.showStatusReport();
                                this.document.body.scrollTop = 0;
                                swal('Success!', 'Suitability form updated!', 'success');
                            }
                            else {
                                swal('Error', 'Something went wrong, please try again.', 'error');
                            }
                        })
                            .catch();
                    }
                    else {
                        this.tallyPoints();
                        this.suitabilityForm.dbTotalPoints = this.totalPoints;
                        this.clientService
                            .addSuitability(this.clientSuitability, this.suitabilityForm)
                            .then(result => {
                            if (result.result === 'error') {
                                this.displayErrorAlert(result);
                            }
                            else if (result.result === 'success') {
                                this.getClients();
                                this.showStatusReport();
                                // var updatedClient = this.allClients.filter(x => x.userID === this.clientView.userID);
                                // this.showClientView(updatedClient[0]);
                                this.document.body.scrollTop = 0;
                                swal('Success!', 'Suitability form initialized!', 'success');
                            }
                            else {
                                swal('Error', 'Something went wrong, please try again.', 'error');
                            }
                        })
                            .catch(error => this.error = error);
                    }
                }
                calculate() {
                    this.tallyPoints();
                    this.calculated = true;
                }
                tallyPoints() {
                    var factorPoints = 0;
                    this.partAPoints = 0;
                    this.partBPoints = 0;
                    this.totalPoints = 0;
                    this.warning = false;
                    // PART A
                    if (this.suitabilityForm.offerStartDate === 'Less than one year') {
                        this.partAPoints += 3;
                    }
                    else if (this.suitabilityForm.offerStartDate === 'In one year') {
                        this.partAPoints += 2;
                    }
                    else if (this.suitabilityForm.offerStartDate === 'More than a Year') {
                        this.partAPoints += 1;
                    }
                    if (this.suitabilityForm.meetsGoal === 'No') {
                        this.partAPoints += 3;
                    }
                    else if (this.suitabilityForm.meetsGoal === 'Yes but lacks skills/high enough marks') {
                        this.partAPoints += 2;
                    }
                    else if (this.suitabilityForm.meetsGoal === 'Yes') {
                        this.partAPoints += 1;
                    }
                    if (this.suitabilityForm.timeOutOfSchool === '6 or more years') {
                        this.partAPoints += 3;
                    }
                    else if (this.suitabilityForm.timeOutOfSchool === '1-6 years') {
                        this.partAPoints += 2;
                    }
                    else if (this.suitabilityForm.timeOutOfSchool === 'Less than 1 year') {
                        this.partAPoints += 1;
                    }
                    if (this.suitabilityForm.inProgramBefore === 'No/Left with appropriate reasons') {
                        this.partAPoints += 3;
                    }
                    else if (this.suitabilityForm.inProgramBefore === 'Yes - Appropriate progress') {
                        this.partAPoints += 2;
                    }
                    else if (this.suitabilityForm.inProgramBefore === 'Yes – No progress') {
                        this.partAPoints += 1;
                    }
                    if (this.suitabilityForm.employment === 'Not working') {
                        this.partAPoints += 3;
                    }
                    else if (this.suitabilityForm.employment === 'Working part time') {
                        this.partAPoints += 2;
                    }
                    else if (this.suitabilityForm.employment === 'Working full time') {
                        this.partAPoints += 1;
                    }
                    if (this.suitabilityForm.incomeSource === 'EI') {
                        this.partAPoints += 3;
                    }
                    else if (this.suitabilityForm.incomeSource === 'OW') {
                        this.partAPoints += 3;
                    }
                    else if (this.suitabilityForm.incomeSource === 'ODSP') {
                        this.partAPoints += 3;
                    }
                    else if (this.suitabilityForm.incomeSource === 'Crown Ward') {
                        this.partAPoints += 3;
                    }
                    else if (this.suitabilityForm.incomeSource === 'Self-employed') {
                        this.partAPoints += 3;
                    }
                    else if (this.suitabilityForm.incomeSource === 'Second Career') {
                        this.partAPoints += 3;
                    }
                    else if (this.suitabilityForm.incomeSource === 'No income') {
                        this.partAPoints += 2;
                    }
                    else if (this.suitabilityForm.incomeSource === 'Dependent of OW/ODSP') {
                        this.partAPoints += 1;
                    }
                    else if (this.suitabilityForm.incomeSource === 'Employed') {
                        this.partAPoints += 1;
                    }
                    else if (this.suitabilityForm.incomeSource === 'International Student') {
                        this.partAPoints += 0;
                    }
                    else if (this.suitabilityForm.incomeSource === 'WSIB') {
                        this.partAPoints += 0;
                    }
                    if (this.suitabilityForm.ageRange === '45-65 years old') {
                        this.partAPoints += 3;
                    }
                    else if (this.suitabilityForm.ageRange === '16-18 years old') {
                        this.partAPoints += 0;
                    }
                    else if (this.suitabilityForm.ageRange === '19-29 years old') {
                        this.partAPoints += 2;
                    }
                    else if (this.suitabilityForm.ageRange === '65+ years old') {
                        this.partAPoints += 0;
                    }
                    else if (this.suitabilityForm.ageRange === '30-44 years old') {
                        this.partAPoints += 1;
                    }
                    //PART B
                    if (this.suitabilityForm.hoursPerWeek === '10-20') {
                        this.partAPoints += 3;
                    }
                    else if (this.suitabilityForm.hoursPerWeek === '5-10') {
                        this.partAPoints += 2;
                    }
                    else if (this.suitabilityForm.hoursPerWeek === 'Less than 5') {
                        this.partAPoints += 1;
                    }
                    if (this.suitabilityForm.workHistory === 'Less than 1 year experience') {
                        this.partAPoints += 3;
                    }
                    else if (this.suitabilityForm.workHistory === '1-4 years experience') {
                        this.partAPoints += 2;
                    }
                    else if (this.suitabilityForm.workHistory === '4+ years experience') {
                        this.partAPoints += 1;
                    }
                    if (this.suitabilityForm.factorHealth === true) {
                        factorPoints++;
                    }
                    if (this.suitabilityForm.factorInstructions === true) {
                        factorPoints++;
                    }
                    if (this.suitabilityForm.factorCommunication === true) {
                        factorPoints++;
                    }
                    if (this.suitabilityForm.factorLanguage === true) {
                        factorPoints++;
                    }
                    if (this.suitabilityForm.factorComputer === true) {
                        factorPoints++;
                    }
                    if (this.suitabilityForm.factorHousing === true) {
                        factorPoints++;
                    }
                    if (this.suitabilityForm.factorTransportation === true) {
                        factorPoints++;
                    }
                    if (this.suitabilityForm.factorDaycare === true) {
                        factorPoints++;
                    }
                    if (this.suitabilityForm.factorInternet === true) {
                        factorPoints++;
                    }
                    if (this.suitabilityForm.factorPersonal === true) {
                        factorPoints++;
                    }
                    if (factorPoints >= 0 && factorPoints <= 4) {
                        this.partBPoints = 3;
                    }
                    else if (factorPoints >= 5 && factorPoints <= 8) {
                        this.partBPoints = 2;
                    }
                    else if (factorPoints >= 9) {
                        this.partBPoints = 1;
                    }
                    this.totalPoints = this.partAPoints + this.partBPoints;
                    if (this.totalPoints < 18) {
                        this.warning = true;
                    }
                }
                allowClientToEdit(client, permission) {
                    this.clientService
                        .grantConsentEditPermission(client, permission)
                        .then(result => {
                        if (result.result === 'error') {
                            this.displayErrorAlert(result);
                        }
                        else if (result.result === 'granted') {
                            this.clientView.editConsentRequest = false;
                            swal('Client Access Granted', 'Client will be sent an email informing that they can now edit conesnt.', 'success');
                        }
                        else if (result.result === 'denied') {
                            this.clientView.editConsentRequest = false;
                            swal('Client Access Denied', 'Client will be sent an email informing that they can NOT edit conesnt.', 'danger');
                        }
                    }).catch(error => this.error = error);
                }
                checkboxChange(client) {
                    this.clientService
                        .updateBannerCamBool(client)
                        .then(result => {
                        if (result.result === 'error') {
                            this.displayErrorAlert(result);
                        }
                        else if (result.result === 'success') {
                            this.stage3 = this.data.filter(x => !x.suitability && !x.consent && (!x.banner || !x.cam));
                            this.stage4 = this.data.filter(x => !x.suitability && !x.consent && x.banner && x.cam);
                            this.doughnutChartData = [this.stage1.length, this.stage2.length, this.stage3.length, this.stage4.length];
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'error');
                        }
                    })
                        .catch(error => this.error = error);
                }
                onSelectChange(event) {
                    var consentForm = this.getConsentFormByConsentID(this.selectedConsentForm);
                    this.consentView = consentForm[0];
                }
                viewAssessmentResults(client) {
                    var assessmentResults = this.allAssessmentResults.filter(x => x.userID === client.userID);
                    var isEmpty = (assessmentResults || []).length === 0;
                    if (isEmpty) {
                        this.editAssessment = false;
                        this.assessmentResults = new assessmentResults_1.AssessmentResults;
                    }
                    else {
                        this.editAssessment = true;
                        this.assessmentResults = assessmentResults[0];
                    }
                    this.showClientView(client);
                    this.resetView();
                    this.showAssessmentResults = true;
                }
                resetView() {
                    this.consentView = null;
                    this.showAssessmentResults = false;
                    this.showFiles = false;
                    this.statusReport = false;
                    this.showGeneral = false;
                    this.showGeneralInfoEdit = false;
                    this.showConsent = false;
                    this.showLearningStyle = false;
                    this.showSuitability = false;
                    this.showSuitabilityEdit = false;
                    this.addSuitability = false;
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
                            this.getClients();
                            this.showStatusReport();
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
            __decorate([
                core_1.Input(),
                __metadata("design:type", assessmentResults_1.AssessmentResults)
            ], ClientStatusComponent.prototype, "assessmentResults", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", suitabilityForm_1.SuitabilityForm)
            ], ClientStatusComponent.prototype, "suitabilityForm", void 0);
            ClientStatusComponent = __decorate([
                core_1.Component({
                    selector: 'client-status',
                    templateUrl: './app/components/client-status/client-status.component.html',
                    styleUrls: ['./app/components/client-status/client-status.component.css']
                }),
                __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
                __metadata("design:paramtypes", [Document,
                    router_1.Router,
                    course_service_1.CourseService,
                    client_service_1.ClientService,
                    student_service_1.StudentService,
                    authentication_service_1.AuthService,
                    files_service_1.FilesService])
            ], ClientStatusComponent);
            exports_1("ClientStatusComponent", ClientStatusComponent);
        }
    };
});

//# sourceMappingURL=client-status.component.js.map
