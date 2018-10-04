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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const suitabilityForm_1 = require("../../models/suitabilityForm");
const assessmentResults_1 = require("../../models/assessmentResults");
const client_service_1 = require("../../services/client.service");
const student_service_1 = require("../../services/student.service");
const course_service_1 = require("../../services/course.service");
const authentication_service_1 = require("../../services/authentication.service");
const files_service_1 = require("../../services/files.service");
const platform_browser_1 = require("@angular/platform-browser");
let ClientStatusComponent = class ClientStatusComponent {
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
        swal(error.title, error.msg, 'error');
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
exports.ClientStatusComponent = ClientStatusComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0NBQWlFO0FBQ2pFLDRDQUF5QztBQUd6QyxrRUFBK0Q7QUFHL0Qsc0VBQW1FO0FBQ25FLGtFQUE4RDtBQUM5RCxvRUFBZ0U7QUFDaEUsa0VBQThEO0FBQzlELGtGQUFvRTtBQUNwRSxnRUFBNEQ7QUFDNUQsZ0VBQXFEO0FBV3JELElBQWEscUJBQXFCLEdBQWxDO0lBeUVFLFlBQzBCLFFBQWtCLEVBQ3BDLE1BQWMsRUFDZCxhQUE0QixFQUM1QixhQUE0QixFQUM1QixjQUE4QixFQUM5QixXQUF3QixFQUN4QixZQUEwQjtRQU5SLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDcEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQWhFbEMsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLFVBQUssR0FBWSxLQUFLLENBQUM7UUFDdkIsVUFBSyxHQUFZLEtBQUssQ0FBQztRQVd2QixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUdoQyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFFaEIsaUJBQVksR0FBWSxJQUFJLENBQUM7UUFDN0IsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFVNUIsd0JBQW1CLEdBQVUs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QVMsRUFBRTtnQkFDL0MsSUFBSSxDQUNELE1BQWMsQ0FBQyxLQUFLLEVBQ3BCLE1BQWMsQ0FBQyxHQUFHLEVBQ2xCLE1BQWMsQ0FBQyxNQUFNLENBQ3ZCLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2xCO2lCQUFNO2dCQUNMLElBQUksQ0FDRixPQUFPLEVBQ1AseUNBQXlDLEVBQ3pDLE9BQU8sQ0FDUixDQUFDO2FBQ0g7UUFDSCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxLQUFLO1FBQ3JCLElBQUksQ0FDRixLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssQ0FBQyxHQUFHLEVBQ1QsT0FBTyxDQUNSLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTTtRQUNKLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQztDQUNGLENBQUE7QUEvN0JVO0lBQVIsWUFBSyxFQUFFOzhCQUFvQixxQ0FBaUI7Z0VBQUM7QUE4QnJDO0lBQVIsWUFBSyxFQUFFOzhCQUFrQixpQ0FBZTs4REFBQztBQS9CL0IscUJBQXFCO0lBTmpDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZUFBZTtRQUN6QixXQUFXLEVBQUUsNkRBQTZEO1FBQzFFLFNBQVMsRUFBRSxDQUFDLDREQUE0RCxDQUFDO0tBQzFFLENBQUM7SUE0RUMsV0FBQSxhQUFNLENBQUMsMkJBQVEsQ0FBQyxDQUFBO3FDQUFtQixRQUFRO1FBQzVCLGVBQU07UUFDQyw4QkFBYTtRQUNiLDhCQUFhO1FBQ1osZ0NBQWM7UUFDakIsb0NBQVc7UUFDViw0QkFBWTtHQWhGdkIscUJBQXFCLENBZzhCakM7QUFoOEJZLHNEQUFxQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jbGllbnRcIjtcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBTdWl0YWJpbGl0eUZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N1aXRhYmlsaXR5Rm9ybVwiO1xyXG5pbXBvcnQgeyBDb25zZW50Rm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29uc2VudEZvcm1cIjtcclxuaW1wb3J0IHsgTGVhcm5pbmdTdHlsZUZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2xlYXJuaW5nU3R5bGVGb3JtXCI7XHJcbmltcG9ydCB7IEFzc2Vzc21lbnRSZXN1bHRzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9hc3Nlc3NtZW50UmVzdWx0c1wiO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb3Vyc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRmlsZXNTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ZpbGVzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5kZWNsYXJlIHZhciBzYXZlQXM6IGFueTtcclxuZGVjbGFyZSB2YXIgRmlsZVNhdmVyOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2NsaWVudC1zdGF0dXMnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL2NsaWVudC1zdGF0dXMvY2xpZW50LXN0YXR1cy5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBDbGllbnRTdGF0dXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGFzc2Vzc21lbnRSZXN1bHRzOiBBc3Nlc3NtZW50UmVzdWx0cztcclxuICBkYXRhOiBhbnlbXTtcclxuICBhbGxDbGllbnRzOiBDbGllbnRbXTtcclxuICBzdWl0YWJpbGl0eUZvcm1zOiBTdWl0YWJpbGl0eUZvcm1bXTtcclxuICBjb25zZW50Rm9ybXM6IENvbnNlbnRGb3JtW107XHJcbiAgbGVhcm5pbmdTdHlsZUZvcm1zOiBMZWFybmluZ1N0eWxlRm9ybVtdO1xyXG4gIGFsbEFzc2Vzc21lbnRSZXN1bHRzOiBBc3Nlc3NtZW50UmVzdWx0c1tdO1xyXG4gIGVkaXRBc3Nlc3NtZW50OiBib29sZWFuO1xyXG4gIGNsaWVudFRvdGFsOiBhbnk7XHJcbiAgYWN0aW9uSXRlbXM6IGFueVtdO1xyXG4gIGVycm9yOiBhbnk7XHJcblxyXG4gIGNsaWVudFZpZXc6IENsaWVudDtcclxuICBjdXJyZW50Q2xpZW50RW1haWw6IHN0cmluZztcclxuICBjbGllbnRFZGl0OiBDbGllbnQ7XHJcbiAgcGhvbmUxOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcGhvbmUyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgbG9uZzE6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBsb25nMjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGNvbnNlbnRWaWV3OiBDb25zZW50Rm9ybTtcclxuICBzZWxlY3RlZENvbnNlbnRGb3JtOiBzdHJpbmc7XHJcbiAgY2xpZW50Q29uc2VudEZvcm1zOiBDb25zZW50Rm9ybVtdO1xyXG4gIHN1aXRhYmlsaXR5VmlldzogU3VpdGFiaWxpdHlGb3JtO1xyXG4gIGxlYXJuaW5nU3R5bGVWaWV3OiBMZWFybmluZ1N0eWxlRm9ybTtcclxuXHJcbiAgc2hvd1N1aXRhYmlsaXR5RWRpdDogYm9vbGVhbjtcclxuICBzaG93R2VuZXJhbEluZm9FZGl0OiBib29sZWFuO1xyXG4gIHNob3dBc3Nlc3NtZW50UmVzdWx0czogYm9vbGVhbjtcclxuXHJcbiAgYWRkU3VpdGFiaWxpdHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBzdWl0YWJpbGl0eUZvcm06IFN1aXRhYmlsaXR5Rm9ybTtcclxuICBjbGllbnRTdWl0YWJpbGl0eTogQ2xpZW50W107XHJcbiAgd2FybmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGNhbGN1bGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwYXJ0QVBvaW50cyA9IDA7XHJcbiAgcGFydEJQb2ludHMgPSAwO1xyXG4gIHRvdGFsUG9pbnRzID0gMDtcclxuXHJcbiAgc3RhdHVzUmVwb3J0OiBib29sZWFuID0gdHJ1ZTtcclxuICBzaG93R2VuZXJhbDogYm9vbGVhbiA9IHRydWU7XHJcbiAgc2hvd1N1aXRhYmlsaXR5OiBib29sZWFuO1xyXG4gIHNob3dDb25zZW50OiBib29sZWFuO1xyXG4gIHNob3dMZWFybmluZ1N0eWxlOiBib29sZWFuO1xyXG4gIHNob3dGaWxlczogYm9vbGVhbjtcclxuXHJcbiAgLy9kb3VnaG51dCBjaGFydCAoY2xpZW50IHN0YXR1cylcclxuICBkb3VnaG51dENoYXJ0TGFiZWxzOiBzdHJpbmdbXTtcclxuICBkb3VnaG51dENoYXJ0RGF0YTogbnVtYmVyW107XHJcbiAgZG91Z2hudXRDaGFydFR5cGU6IHN0cmluZztcclxuICBkb3VnaG51dENoYXJ0Q29sb3JzOiBhbnlbXSA9IFt7IGJhY2tncm91bmRDb2xvcjogW1wiI0UzMkYyNlwiLCBcIiNGN0NFM0NcIiwgXCIjNzZDNEQ1XCIsIFwiIzYyQTc0NFwiXSB9XTtcclxuICBzdGFnZTE6IGFueTtcclxuICBzdGFnZTI6IGFueTtcclxuICBzdGFnZTM6IGFueTtcclxuICBzdGFnZTQ6IGFueTtcclxuXHJcbiAgZmlsZXM6IGFueVtdO1xyXG4gIGNsaWVudEZpbGVzOiBhbnlbXTtcclxuXHJcbiAgLy9iYXIgY2hhcnQgKGxlYXJuaW5nIHN0eWxlKVxyXG4gIGJhckNoYXJ0T3B0aW9uczogYW55ID0ge1xyXG4gICAgc2NhbGVTaG93VmVydGljYWxMaW5lczogZmFsc2UsXHJcbiAgICByZXNwb25zaXZlOiB0cnVlXHJcbiAgfTtcclxuICBiYXJDaGFydExhYmVsczogc3RyaW5nW10gPSBbJ0hlYXJpbmcnLCAnU2VlaW5nJywgJ0RvaW5nJ107XHJcbiAgYmFyQ2hhcnRUeXBlOiBzdHJpbmcgPSAnYmFyJztcclxuICBiYXJDaGFydExlZ2VuZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGJhckNoYXJ0RGF0YTogYW55O1xyXG4gIGJhckNoYXJ0Q29sb3JzOiBhbnlbXSA9IFt7IGJhY2tncm91bmRDb2xvcjogW1wiI0UzMkYyNlwiLCBcIiNGN0NFM0NcIiwgXCIjNjJBNzQ0XCJdIH1dO1xyXG5cclxuICBjb3Vyc2VUeXBlczogYW55W10gPSBbXTtcclxuICBzZWxlY3RlZENvdXJzZVR5cGVzOiBhbnlbXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcclxuICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gIHByaXZhdGUgY291cnNlU2VydmljZTogQ291cnNlU2VydmljZSxcclxuICBwcml2YXRlIGNsaWVudFNlcnZpY2U6IENsaWVudFNlcnZpY2UsXHJcbiAgcHJpdmF0ZSBzdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsXHJcbiAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXHJcbiAgcHJpdmF0ZSBmaWxlc1NlcnZpY2U6IEZpbGVzU2VydmljZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnTG9hZGluZy4uLicsXHJcbiAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICB0aGlzLmdldENsaWVudHMoKTtcclxuICAgIC8vIGdldCBjb3Vyc2UgdHlwZXNcclxuICAgIHRoaXMuY291cnNlU2VydmljZS5nZXRDb3Vyc2VUeXBlcygpXHJcbiAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSBcImVycm9yXCIpIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzdWx0LmZvckVhY2goKGkpID0+IHtcclxuICAgICAgICAgIHRoaXMuY291cnNlVHlwZXMucHVzaCh7XHJcbiAgICAgICAgICAgIGxhYmVsOiBpLmNvdXJzZVR5cGUsXHJcbiAgICAgICAgICAgIHZhbHVlOiBpLmNvdXJzZVR5cGVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldENsaWVudHMoKSB7XHJcbiAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgLmdldENsaWVudHMoKVxyXG4gICAgICAudGhlbihvYmplY3RzID0+IHtcclxuICAgICAgICBpZiAoKG9iamVjdHMgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGF0YSA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KG9iamVjdHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnNldERhdGEob2JqZWN0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIHNldERhdGEob2JqZWN0cykge1xyXG4gICAgdGhpcy5kYXRhID0gb2JqZWN0cy5jbGllbnRzO1xyXG4gICAgZm9yIChsZXQgY2xpZW50IG9mIHRoaXMuZGF0YSkge1xyXG4gICAgICBjbGllbnQuZnVsbE5hbWUgPSBjbGllbnQuZmlyc3ROYW1lICsgXCIgXCIgKyBjbGllbnQubGFzdE5hbWU7XHJcbiAgICAgIGlmIChjbGllbnQuYmFubmVyID09IG51bGwpIHtcclxuICAgICAgICBjbGllbnQuYmFubmVyID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNsaWVudC5jYW0gPT0gbnVsbCkge1xyXG4gICAgICAgIGNsaWVudC5jYW0gPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5hbGxDbGllbnRzID0gb2JqZWN0cy5jbGllbnRzO1xyXG4gICAgdGhpcy5jbGllbnRUb3RhbCA9IG9iamVjdHMuY2xpZW50cy5sZW5ndGg7XHJcbiAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybXMgPSBvYmplY3RzLnN1aXRhYmlsaXR5Rm9ybXM7XHJcbiAgICB0aGlzLmNvbnNlbnRGb3JtcyA9IG9iamVjdHMuY29uc2VudEZvcm1zO1xyXG4gICAgdGhpcy5sZWFybmluZ1N0eWxlRm9ybXMgPSBvYmplY3RzLmxlYXJuaW5nU3R5bGVGb3JtcztcclxuICAgIHRoaXMuYWxsQXNzZXNzbWVudFJlc3VsdHMgPSBvYmplY3RzLmFzc2Vzc21lbnRSZXN1bHRzO1xyXG4gICAgdGhpcy5zdGFnZTEgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4geC5zdWl0YWJpbGl0eSk7XHJcbiAgICB0aGlzLnN0YWdlMiA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiB4LmNvbnNlbnQpO1xyXG4gICAgdGhpcy5zdGFnZTMgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4gIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiAoIXguYmFubmVyIHx8ICF4LmNhbSkpO1xyXG4gICAgdGhpcy5zdGFnZTQgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4gIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiB4LmJhbm5lciAmJiB4LmNhbSk7XHJcbiAgICB0aGlzLmRvdWdobnV0Q2hhcnRMYWJlbHMgPSBbJ1N1aXRhYmlsaXR5JywgJ0NvbnNlbnQnLCAnQmFubmVyL0NBTScsICdUcmFuc2ZlciBSZWFkeSddO1xyXG4gICAgdGhpcy5kb3VnaG51dENoYXJ0RGF0YSA9IFt0aGlzLnN0YWdlMS5sZW5ndGgsIHRoaXMuc3RhZ2UyLmxlbmd0aCwgdGhpcy5zdGFnZTMubGVuZ3RoLCB0aGlzLnN0YWdlNC5sZW5ndGhdO1xyXG4gICAgdGhpcy5kb3VnaG51dENoYXJ0VHlwZSA9ICdkb3VnaG51dCc7XHJcbiAgICB0aGlzLmFkZFN1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICB0aGlzLmdldEZpbGVzKCk7XHJcbiAgfVxyXG5cclxuICBnZXRGaWxlcygpIHtcclxuICAgIHRoaXMuZmlsZXNTZXJ2aWNlXHJcbiAgICAgIC5nZXRGaWxlcygpXHJcbiAgICAgIC50aGVuKGZpbGVzID0+IHtcclxuICAgICAgICBpZiAoKGZpbGVzIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmZpbGVzID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoZmlsZXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmZpbGVzID0gZmlsZXM7XHJcbiAgICAgICAgICBmb3IgKGxldCBmaWxlIG9mIHRoaXMuZmlsZXMpIHtcclxuICAgICAgICAgICAgZmlsZS51c2VySUQgPSArZmlsZS51c2VySUQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZG93bmxvYWQoZmlsZSkge1xyXG4gICAgY29uc29sZS5sb2coZmlsZSk7XHJcbiAgICB2YXIgZmlsZW5hbWUgPSBmaWxlLm1pbGxpc2Vjb25kcyArIFwiX1wiICsgZmlsZS51c2VySUQgKyBcIl9cIiArIGZpbGUuZmlsZW5hbWU7XHJcbiAgICB0aGlzLmZpbGVzU2VydmljZVxyXG4gICAgICAuZG93bmxvYWQoZmlsZW5hbWUpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICB2YXIgYmxvYiA9IG5ldyBCbG9iKFtyZXNwb25zZV0sIHsgdHlwZTogXCJhcHBsaWNhdGlvbi9wZGZcIiB9KTtcclxuICAgICAgICAvL2NoYW5nZSBkb3dubG9hZC5wZGYgdG8gdGhlIG5hbWUgb2Ygd2hhdGV2ZXIgeW91IHdhbnQgeW91ciBmaWxlIHRvIGJlXHJcbiAgICAgICAgY29uc29sZS5sb2coYmxvYik7XHJcbiAgICAgICAgc2F2ZUFzKGJsb2IsIGZpbGUuZmlsZW5hbWUpO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlRmlsZUFsZXJ0KGZpbGUpIHtcclxuICAgIHZhciBmaWxlbmFtZSA9IGZpbGUubWlsbGlzZWNvbmRzICsgXCJfXCIgKyBmaWxlLnVzZXJJRCArIFwiX1wiICsgZmlsZS5maWxlbmFtZTtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ0RlbGV0ZSBmaWxlICgnICsgZmlsZS5maWxlbmFtZSArICcpPycsXHJcbiAgICAgIHRleHQ6IFwiWW91IHdvbid0IGJlIGFibGUgdG8gcmV2ZXJ0IHRoaXMhXCIsXHJcbiAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBkZWxldGUgaXQhJ1xyXG4gICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICBpZiAoaXNDb25maXJtLmRpc21pc3MgPT09IFwiY2FuY2VsXCIgfHwgaXNDb25maXJtLmRpc21pc3MgPT09IFwib3ZlcmxheVwiKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtLmRpc21pc3MpO1xyXG4gICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgIHRoaXMuZGVsZXRlRmlsZShmaWxlbmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH0pLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUZpbGUoZmlsZW5hbWUpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgdGhpcy5maWxlc1NlcnZpY2VcclxuICAgICAgLmRlbGV0ZShmaWxlbmFtZSlcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICB0aGlzLmdldEZpbGVzKCk7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnRGVsZXRlZCEnLFxyXG4gICAgICAgICAgICAnRmlsZSBoYXMgYmVlbiBkZWxldGVkLicsXHJcbiAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgYWRkRmlsZSgpIHtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2ZpbGUtdXBsb2FkJ10pO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2xpZW50KCkge1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3VpdGFiaWxpdHknXSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVBbGVydChjbGllbnQ6IENsaWVudCkge1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnRGVsZXRlIGNsaWVudCAoJyArIGNsaWVudC5maXJzdE5hbWUgKyAnICcgKyBjbGllbnQubGFzdE5hbWUgKyAnKT8nLFxyXG4gICAgICB0ZXh0OiBcIllvdSB3b24ndCBiZSBhYmxlIHRvIHJldmVydCB0aGlzIVwiLFxyXG4gICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNFMzJGMjYnLFxyXG4gICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgZGVsZXRlIGl0ISdcclxuICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICB0aGlzLmRlbGV0ZUNsaWVudChjbGllbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgIC8vY29uc29sZS5sb2coXCJDYW5jZWxlZFwiKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlQ2xpZW50KGNsaWVudDogQ2xpZW50KSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAuZGVsZXRlKGNsaWVudClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICB0aGlzLnNob3dTdGF0dXNSZXBvcnQoKTtcclxuICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoaCA9PiBoICE9PSBjbGllbnQpO1xyXG4gICAgICAgICAgdGhpcy5hbGxDbGllbnRzID0gdGhpcy5hbGxDbGllbnRzLmZpbHRlcihoID0+IGggIT09IGNsaWVudCk7XHJcbiAgICAgICAgICB0aGlzLnN0YWdlMSA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiB4LnN1aXRhYmlsaXR5KTtcclxuICAgICAgICAgIHRoaXMuc3RhZ2UyID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmIHguY29uc2VudCk7XHJcbiAgICAgICAgICB0aGlzLnN0YWdlMyA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmICgheC5iYW5uZXIgfHwgIXguY2FtKSk7XHJcbiAgICAgICAgICB0aGlzLnN0YWdlNCA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmIHguYmFubmVyICYmIHguY2FtKTtcclxuICAgICAgICAgIHRoaXMuZG91Z2hudXRDaGFydERhdGEgPSBbdGhpcy5zdGFnZTEubGVuZ3RoLCB0aGlzLnN0YWdlMi5sZW5ndGgsIHRoaXMuc3RhZ2UzLmxlbmd0aCwgdGhpcy5zdGFnZTQubGVuZ3RoXTtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdEZWxldGVkIScsXHJcbiAgICAgICAgICAgICdDbGllbnQgcmVjb3JkIGhhcyBiZWVuIGRlbGV0ZWQuJyxcclxuICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpcy5jbGllbnRUb3RhbCA9IHRoaXMuZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBzaG93Q2xpZW50VmlldyhjbGllbnQ6IENsaWVudCkge1xyXG4gICAgdGhpcy5jdXJyZW50Q2xpZW50RW1haWwgPSBjbGllbnQuZW1haWw7XHJcbiAgICB0aGlzLmNsaWVudFZpZXcgPSBjbGllbnQ7XHJcbiAgICB0aGlzLnJlc2V0VmlldygpO1xyXG4gICAgdGhpcy5zaG93R2VuZXJhbCA9IHRydWU7XHJcbiAgICB0aGlzLmNsaWVudEZpbGVzID0gdGhpcy5maWxlcy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gdGhpcy5jbGllbnRWaWV3LnVzZXJJRCk7XHJcbiAgICB2YXIgc3VpdGFiaWxpdHlGb3JtID0gdGhpcy5nZXRTdWl0YWJpbGl0eUZvcm1CeUZpbHRlcihjbGllbnQudXNlcklEKTtcclxuICAgIHRoaXMuc3VpdGFiaWxpdHlWaWV3ID0gc3VpdGFiaWxpdHlGb3JtWzBdO1xyXG5cclxuICAgIHZhciBjb25zZW50Rm9ybXMgPSB0aGlzLmdldENvbnNlbnRGb3JtQnlVc2VySUQoY2xpZW50LnVzZXJJRCk7XHJcbiAgICB0aGlzLmNsaWVudENvbnNlbnRGb3JtcyA9IGNvbnNlbnRGb3JtcztcclxuICAgIC8vIHRoaXMuY2xpZW50Q29uc2VudEZvcm1zLnNvcnQoZnVuY3Rpb24gY29tcGFyZShhLCBiKSB7XHJcbiAgICAvLyAgIHZhciBkYXRlQSA9IG5ldyBEYXRlKGEuZGF0ZS5nZXRUaW1lKCkpO1xyXG4gICAgLy8gICB2YXIgZGF0ZUIgPSBuZXcgRGF0ZShiLmRhdGUuZ2V0VGltZSgpKTtcclxuICAgIC8vICAgcmV0dXJuIGRhdGVBIC0gZGF0ZUI7XHJcbiAgICAvLyB9KTtcclxuICAgIC8vdGhpcy5jb25zZW50VmlldyA9IGNvbnNlbnRGb3Jtc1swXTtcclxuXHJcbiAgICB2YXIgbGVhcm5pbmdTdHlsZUZvcm0gPSB0aGlzLmdldExlYXJuaW5nU3R5bGVGb3JtQnlGaWx0ZXIoY2xpZW50LnVzZXJJRCk7XHJcbiAgICB0aGlzLmxlYXJuaW5nU3R5bGVWaWV3ID0gbGVhcm5pbmdTdHlsZUZvcm1bMF07XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlVmlldykge1xyXG4gICAgICB0aGlzLmJhckNoYXJ0RGF0YSA9IFt7IGRhdGE6IFt0aGlzLmxlYXJuaW5nU3R5bGVWaWV3LmhlYXJpbmcsIHRoaXMubGVhcm5pbmdTdHlsZVZpZXcuc2VlaW5nLCB0aGlzLmxlYXJuaW5nU3R5bGVWaWV3LmRvaW5nXSB9XTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFN1aXRhYmlsaXR5Rm9ybUJ5RmlsdGVyKGlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdWl0YWJpbGl0eUZvcm1zLmZpbHRlcih4ID0+IHgudXNlcklEID09PSBpZCk7XHJcbiAgfVxyXG5cclxuICBnZXRDb25zZW50Rm9ybUJ5VXNlcklEKGlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25zZW50Rm9ybXMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IGlkKTtcclxuICB9XHJcblxyXG4gIGdldENvbnNlbnRGb3JtQnlDb25zZW50SUQoaWQpIHtcclxuICAgIGlkID0gK2lkO1xyXG4gICAgdmFyIGNvbnNlbnRGb3JtID0gdGhpcy5jbGllbnRDb25zZW50Rm9ybXMuZmlsdGVyKHggPT4geC5jb25zZW50SUQgPT09IGlkKTtcclxuICAgIHJldHVybiBjb25zZW50Rm9ybTtcclxuICB9XHJcblxyXG4gIGdldExlYXJuaW5nU3R5bGVGb3JtQnlGaWx0ZXIoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLmxlYXJuaW5nU3R5bGVGb3Jtcy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gaWQpO1xyXG4gIH1cclxuXHJcbiAgc2VjdGlvbkJ0bkNsaWNrZWQoZXZlbnQsIHNlY3Rpb24pIHtcclxuICAgIGlmIChzZWN0aW9uID09PSBcImdlbmVyYWxcIikge1xyXG4gICAgICB0aGlzLnJlc2V0VmlldygpO1xyXG4gICAgICB0aGlzLnNob3dHZW5lcmFsID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAoc2VjdGlvbiA9PT0gXCJzdWl0YWJpbGl0eVwiKSB7XHJcbiAgICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAoc2VjdGlvbiA9PT0gXCJjb25zZW50XCIpIHtcclxuICAgICAgdGhpcy5yZXNldFZpZXcoKTtcclxuICAgICAgdGhpcy5zaG93Q29uc2VudCA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHNlY3Rpb24gPT09IFwibGVhcm5pbmdTdHlsZVwiKSB7XHJcbiAgICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICAgIHRoaXMuc2hvd0xlYXJuaW5nU3R5bGUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChzZWN0aW9uID09PSBcImZpbGVzXCIpIHtcclxuICAgICAgdGhpcy5yZXNldFZpZXcoKTtcclxuICAgICAgdGhpcy5zaG93RmlsZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2hvd1N0YXR1c1JlcG9ydCgpIHtcclxuICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5RWRpdCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaG93R2VuZXJhbEluZm9FZGl0ID0gZmFsc2U7XHJcbiAgICB0aGlzLmFkZFN1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICB0aGlzLnN0YXR1c1JlcG9ydCA9IHRydWU7XHJcbiAgICB0aGlzLmNsaWVudFN1aXRhYmlsaXR5ID0gbnVsbDtcclxuICAgIHRoaXMuY2xpZW50VmlldyA9IG51bGw7XHJcbiAgICB0aGlzLmFkZFN1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjaGFydENsaWNrZWQoZTogYW55KTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgaW5kZXggPSBlLmFjdGl2ZVswXS5faW5kZXg7XHJcbiAgICAgIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuYWxsQ2xpZW50cy5maWx0ZXIoeCA9PiB4LnN1aXRhYmlsaXR5KTtcclxuICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gMSkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuYWxsQ2xpZW50cy5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiB4LmNvbnNlbnQpO1xyXG4gICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAyKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5hbGxDbGllbnRzLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmICF4LmNvbnNlbnQpO1xyXG4gICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAzKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5hbGxDbGllbnRzLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmICF4LmNvbnNlbnQgJiYgeC5iYW5uZXIgJiYgeC5jYW0pO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhpcy5kYXRhID0gdGhpcy5hbGxDbGllbnRzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hhcnRIb3ZlcmVkKGU6IGFueSk6IHZvaWQge1xyXG5cclxuICB9XHJcblxyXG4gIGNyZWF0ZUFzU3R1ZGVudChjbGllbnQ6IENsaWVudCkge1xyXG4gICAgaWYgKGNsaWVudC5zdHVkZW50TnVtYmVyID09PSAnVEJEJykge1xyXG4gICAgICB0aGlzLnN0dWRlbnROdW1iZXIoY2xpZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiAnU3R1ZGVudCBOdW1iZXInLFxyXG4gICAgICAgIHR5cGU6ICdpbmZvJyxcclxuICAgICAgICB0ZXh0OiAnUHJldmlvdXNseSBhdHRlbmRlZCBnZW9yZ2lhbjogJyArIGNsaWVudC5zdHVkZW50TnVtYmVyLFxyXG4gICAgICAgIGlucHV0OiBcInRleHRcIixcclxuICAgICAgICBpbnB1dFBsYWNlaG9sZGVyOiAnUGxlYXNlIHJlLWVudGVyIHN0dWRlbnQgbnVtYmVyIGRpc3BsYXllZCBhYm92ZScsXHJcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBhbmltYXRpb246IFwic2xpZGUtZnJvbS10b3BcIixcclxuICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNFMzJGMjYnLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnU2F2ZSdcclxuICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgY2xpZW50LnN0dWRlbnROdW1iZXIgPSBpc0NvbmZpcm0udmFsdWU7XHJcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsZXJ0KGNsaWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpOyAvLyBUT0RPOiBEaXNwbGF5IGVycm9yIG1lc3NhZ2VcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgc3R1ZGVudE51bWJlcihjbGllbnQpIHtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ1N0dWRlbnQgTnVtYmVyJyxcclxuICAgICAgdHlwZTogJ2luZm8nLFxyXG4gICAgICB0ZXh0OiAnUGxlYXNlIGVudGVyIHN0dWRlbnQgbnVtYmVyIGZvciAnICsgY2xpZW50LmZpcnN0TmFtZSArICcgJyArIGNsaWVudC5sYXN0TmFtZSArICcnLFxyXG4gICAgICBpbnB1dDogXCJ0ZXh0XCIsXHJcbiAgICAgIGlucHV0UGxhY2Vob2xkZXI6IFwiRW50ZXIgU3R1ZGVudCBOdW1iZXJcIixcclxuICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgYW5pbWF0aW9uOiBcInNsaWRlLWZyb20tdG9wXCIsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNFMzJGMjYnLFxyXG4gICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1NhdmUnXHJcbiAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAvLyBjYW5jZWxlZFxyXG4gICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgIGNsaWVudC5zdHVkZW50TnVtYmVyID0gaXNDb25maXJtLnZhbHVlO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWxlcnQoY2xpZW50KTtcclxuICAgICAgfVxyXG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7IC8vIFRPRE86IERpc3BsYXkgZXJyb3IgbWVzc2FnZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVBbGVydChjbGllbnQpIHtcclxuICAgIGlmIChjbGllbnQuc3R1ZGVudE51bWJlciA9PSBudWxsIHx8IGNsaWVudC5zdHVkZW50TnVtYmVyID09PSAnJykge1xyXG4gICAgICB0aGlzLnN0dWRlbnROdW1iZXIoY2xpZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiAnVHJhbnNmZXIgY2xpZW50ICgnICsgY2xpZW50LmZpcnN0TmFtZSArICcgJyArIGNsaWVudC5sYXN0TmFtZSArICcpPycsXHJcbiAgICAgICAgdGV4dDogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjcmVhdGUgYXMgc3R1ZGVudCB3aXRoICMnICsgY2xpZW50LnN0dWRlbnROdW1iZXIgKyAnPycsXHJcbiAgICAgICAgdHlwZTogJ3F1ZXN0aW9uJyxcclxuICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI0UzMkYyNicsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIHRyYW5zZmVyISdcclxuICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgIC8vIGNhbmNlbGVkXHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ1RyYW5zZmVycmluZy4uLidcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgc3dhbC5zaG93TG9hZGluZygpO1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgICAucG9zdE5ldyhjbGllbnQpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoKHJlc3VsdCBhcyBhbnkpKTtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tQ2xpZW50VGFibGUoY2xpZW50LnVzZXJJRCk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7IC8vIFRPRE86IERpc3BsYXkgZXJyb3IgbWVzc2FnZVxyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTsgLy8gVE9ETzogRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbUNsaWVudFRhYmxlKHVzZXJJRCk6IHZvaWQge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgLnJlbW92ZUZyb21DbGllbnRUYWJsZSh1c2VySUQpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoKHJlc3VsdCBhcyBhbnkpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmZpbHRlcihoID0+IGgudXNlcklEICE9PSB1c2VySUQpO1xyXG4gICAgICAgICAgdGhpcy5zdGFnZTMgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4geC51c2VySUQgIT09IHVzZXJJRCAmJiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50KTtcclxuICAgICAgICAgIHRoaXMuc3RhZ2U0ID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+IHgudXNlcklEICE9PSB1c2VySUQgJiYgIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiB4LmJhbm5lciAmJiB4LmNhbSk7XHJcbiAgICAgICAgICB0aGlzLmRvdWdobnV0Q2hhcnREYXRhID0gW3RoaXMuc3RhZ2UxLmxlbmd0aCwgdGhpcy5zdGFnZTIubGVuZ3RoLCB0aGlzLnN0YWdlMy5sZW5ndGgsIHRoaXMuc3RhZ2U0Lmxlbmd0aF07XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnVHJhbnNmZXJlZCcsXHJcbiAgICAgICAgICAgICdDbGllbnQgcmVjb3JkIGhhcyBiZWVuIHRyYW5zZmVyZWQgdG8gdGhlIHN0dWRlbnQgdGFibGUuJyxcclxuICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgLy90aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zdHVkZW50cyddKTtcclxuICAgICAgICAgIHRoaXMuY2xpZW50VG90YWwgPSB0aGlzLmRhdGEubGVuZ3RoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgYWRkU3VpdGFiaWxpdHlJbmZvKGNsaWVudCkge1xyXG4gICAgdGhpcy5zZWxlY3RlZENvdXJzZVR5cGVzID0gW107XHJcbiAgICB0aGlzLmNsaWVudFZpZXcgPSBjbGllbnQ7XHJcbiAgICB0aGlzLmFkZFN1aXRhYmlsaXR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuc2hvd0dlbmVyYWwgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0NvbnNlbnQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0xlYXJuaW5nU3R5bGUgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5RWRpdCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zdGF0dXNSZXBvcnQgPSBmYWxzZTtcclxuICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtID0gbmV3IFN1aXRhYmlsaXR5Rm9ybSgpO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0udHJhbnNjcmlwdCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uYXBwcm9wcmlhdGVHb2FsID0gdHJ1ZTtcclxuICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmlzVmFsaWRBZ2UgPSB0cnVlO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZ292ZXJubWVudElEID0gZmFsc2U7XHJcbiAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5zY2hvb2xSZWdpc3RyYXRpb24gPSBmYWxzZTtcclxuICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmF2YWlsYWJsZUR1cmluZ0NsYXNzID0gdHJ1ZTtcclxuICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhlYWx0aCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySW5zdHJ1Y3Rpb25zID0gZmFsc2U7XHJcbiAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JDb21tdW5pY2F0aW9uID0gZmFsc2U7XHJcbiAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JMYW5ndWFnZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yQ29tcHV0ZXIgPSBmYWxzZTtcclxuICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhvdXNpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvclRyYW5zcG9ydGF0aW9uID0gZmFsc2U7XHJcbiAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JEYXljYXJlID0gZmFsc2U7XHJcbiAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JJbnRlcm5ldCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yUGVyc29uYWwgPSBmYWxzZTtcclxuICAgIHRoaXMuY2xpZW50U3VpdGFiaWxpdHkgPSBjbGllbnQ7XHJcbiAgfVxyXG5cclxuICBlZGl0R2VuZXJhbEluZm8oY2xpZW50KSB7XHJcbiAgICB0aGlzLnN0YXR1c1JlcG9ydCA9IGZhbHNlO1xyXG4gICAgdGhpcy5jbGllbnRFZGl0ID0gY2xpZW50O1xyXG4gICAgdmFyIHNwbGl0UGhvbmUgPSB0aGlzLmNsaWVudEVkaXQucGhvbmUuc3BsaXQoJyAnKTtcclxuICAgIGlmICh0aGlzLmNsaWVudEVkaXQucGhvbmUuaW5kZXhPZignKzEnKSAhPT0gLTEpIHtcclxuICAgICAgdGhpcy5sb25nMSA9IHRydWU7XHJcbiAgICAgIHRoaXMuY2xpZW50RWRpdC5waG9uZSA9IHNwbGl0UGhvbmVbMV0gKyBcIiBcIiArIHNwbGl0UGhvbmVbMl07XHJcbiAgICAgIGlmIChzcGxpdFBob25lWzNdID09PSAnSG9tZScpIHtcclxuICAgICAgICB0aGlzLnBob25lMSA9IGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGhvbmUxID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sb25nMSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmNsaWVudEVkaXQucGhvbmUgPSBzcGxpdFBob25lWzBdICsgXCIgXCIgKyBzcGxpdFBob25lWzFdO1xyXG4gICAgICBpZiAoc3BsaXRQaG9uZVsyXSA9PT0gJ0hvbWUnKSB7XHJcbiAgICAgICAgdGhpcy5waG9uZTEgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBob25lMSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHZhciBzcGxpdEFsdGVybmF0ZSA9IHRoaXMuY2xpZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIuc3BsaXQoJyAnKTtcclxuICAgIGlmICh0aGlzLmNsaWVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyLmluZGV4T2YoJysxJykgIT09IC0xKSB7XHJcbiAgICAgIHRoaXMubG9uZzIgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNsaWVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyID0gc3BsaXRBbHRlcm5hdGVbMV0gKyBcIiBcIiArIHNwbGl0QWx0ZXJuYXRlWzJdO1xyXG4gICAgICBpZiAoc3BsaXRBbHRlcm5hdGVbM10gPT09ICdIb21lJykge1xyXG4gICAgICAgIHRoaXMucGhvbmUyID0gZmFsc2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5waG9uZTIgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxvbmcyID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuY2xpZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgPSBzcGxpdEFsdGVybmF0ZVswXSArIFwiIFwiICsgc3BsaXRBbHRlcm5hdGVbMV07XHJcbiAgICAgIGlmIChzcGxpdEFsdGVybmF0ZVsyXSA9PT0gJ0hvbWUnKSB7XHJcbiAgICAgICAgdGhpcy5waG9uZTIgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBob25lMiA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc2hvd0dlbmVyYWwgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0dlbmVyYWxJbmZvRWRpdCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVHZW5lcmFsSW5mbygpIHtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ1VwZGF0aW5nLi4uJ1xyXG4gICAgfSk7XHJcbiAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICB2YXIgcGhvbmVTcGxpdCA9IHRoaXMuY2xpZW50RWRpdC5waG9uZS5zcGxpdCgnICcpO1xyXG4gICAgdGhpcy5jbGllbnRFZGl0LnBob25lID0gcGhvbmVTcGxpdFswXSArIFwiIFwiICsgcGhvbmVTcGxpdFsxXTtcclxuICAgIGlmICh0aGlzLnBob25lMSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmNsaWVudEVkaXQucGhvbmUgPSB0aGlzLmNsaWVudEVkaXQucGhvbmUgKyBcIiBDZWxsXCI7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucGhvbmUxID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLmNsaWVudEVkaXQucGhvbmUgPSB0aGlzLmNsaWVudEVkaXQucGhvbmUgKyBcIiBIb21lXCI7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5sb25nMSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmNsaWVudEVkaXQucGhvbmUgPSBcIisxIFwiICsgdGhpcy5jbGllbnRFZGl0LnBob25lO1xyXG4gICAgfVxyXG4gICAgdmFyIGFsdGVybmF0ZVNwbGl0ID0gdGhpcy5jbGllbnRFZGl0LmFsdGVybmF0ZU51bWJlci5zcGxpdCgnICcpO1xyXG4gICAgdGhpcy5jbGllbnRFZGl0LmFsdGVybmF0ZU51bWJlciA9IGFsdGVybmF0ZVNwbGl0WzBdICsgXCIgXCIgKyBhbHRlcm5hdGVTcGxpdFsxXTtcclxuICAgIGlmICh0aGlzLnBob25lMiA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmNsaWVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyID0gdGhpcy5jbGllbnRFZGl0LmFsdGVybmF0ZU51bWJlciArIFwiIENlbGxcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5waG9uZTIgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuY2xpZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgPSB0aGlzLmNsaWVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyICsgXCIgSG9tZVwiO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubG9uZzIgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5jbGllbnRFZGl0LmFsdGVybmF0ZU51bWJlciA9IFwiKzEgXCIgKyB0aGlzLmNsaWVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgIC51cGRhdGVHZW5lcmFsSW5mbyh0aGlzLmNsaWVudEVkaXQpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoKHJlc3VsdCBhcyBhbnkpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5tc2cgPT09IFwiVXNlcm5hbWUgaXMgYWxyZWFkeSBpbiB1c2UuXCIpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdVc2VybmFtZSB0YWtlbicsXHJcbiAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBkaWZmZXJlbnQgdXNlcm5hbWUuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLm1zZyA9PT0gXCJFbWFpbCBpcyBhbHJlYWR5IGluIHVzZS5cIikge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0VtYWlsIGluIHVzZScsXHJcbiAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBkaWZmZXJlbnQgZW1haWwuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLm1zZyA9PT0gXCJJbmNvcnJlY3QgZW1haWwgZm9ybWF0LlwiKSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnSW5jb3JyZWN0IGVtYWlsIGZvcm1hdCcsXHJcbiAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBwcm9wZXIgZW1haWwuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpcy5jbGllbnRWaWV3LmVtYWlsID0gdGhpcy5jdXJyZW50Q2xpZW50RW1haWw7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgIHRoaXMuc2hvd1N0YXR1c1JlcG9ydCgpO1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ1N1Y2Nlc3MhJyxcclxuICAgICAgICAgICAgJ0NsaWVudCBpbmZvcm1hdGlvbiBoYXMgYmVlbiB1cGRhdGVkIScsXHJcbiAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGVkaXRTdWl0YWJpbGl0eShjbGllbnQpIHtcclxuICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICB0aGlzLnNob3dTdWl0YWJpbGl0eUVkaXQgPSB0cnVlO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0gPSB0aGlzLmdldFN1aXRhYmlsaXR5Rm9ybUJ5RmlsdGVyKGNsaWVudC51c2VySUQpWzBdO1xyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gXCJPdGhlclwiKSB7XHJcbiAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9IFwiT3RoZXJcIjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UuaW5jbHVkZXMoXCJPdGhlciAtIFwiKSkge1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2VPdGhlciA9IHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZS5zcGxpdChcIk90aGVyIC0gXCIpWzFdO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPSBcIk90aGVyXCI7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNlbGVjdGVkQ291cnNlVHlwZXMgPSBbXTtcclxuICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5zZWxlY3RlZENvdXJzZVR5cGVzICE9IG51bGwpIHtcclxuICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5zZWxlY3RlZENvdXJzZVR5cGVzLnNwbGl0KCcsJykpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ291cnNlVHlwZXMucHVzaChpdGVtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLnN1aXRhYmlsaXR5Rm9ybSk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLnN1aXRhYmlsaXR5Rm9ybVtrZXlzW2ldXSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybVtrZXlzW2ldXSA9PT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtW2tleXNbaV1dID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtW2tleXNbaV1dID09PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtW2tleXNbaV1dID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybVtrZXlzW2ldXSA9PSBudWxsKSB7XHJcbiAgICAgICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybVtrZXlzW2ldXSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5jbGllbnRTdWl0YWJpbGl0eSA9IGNsaWVudDtcclxuICB9XHJcblxyXG4gIHNhdmVTdWl0YWJpbGl0eSgpIHtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ1NhdmluZy4uLidcclxuICAgIH0pO1xyXG4gICAgc3dhbC5zaG93TG9hZGluZygpO1xyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLnN1aXRhYmlsaXR5SUQpIHtcclxuICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uc2VsZWN0ZWRDb3Vyc2VUeXBlcyA9IHRoaXMuc2VsZWN0ZWRDb3Vyc2VUeXBlcy50b1N0cmluZygpO1xyXG4gICAgICB0aGlzLnRhbGx5UG9pbnRzKCk7XHJcbiAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmRiVG90YWxQb2ludHMgPSB0aGlzLnRvdGFsUG9pbnRzO1xyXG4gICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAudXBkYXRlU3VpdGFiaWxpdHkodGhpcy5zdWl0YWJpbGl0eUZvcm0pXHJcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoKHJlc3VsdCBhcyBhbnkpKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2xpZW50cygpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dTdGF0dXNSZXBvcnQoKTtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDA7XHJcbiAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgJ1N1Y2Nlc3MhJyxcclxuICAgICAgICAgICAgICAnU3VpdGFiaWxpdHkgZm9ybSB1cGRhdGVkIScsXHJcbiAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRhbGx5UG9pbnRzKCk7XHJcbiAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmRiVG90YWxQb2ludHMgPSB0aGlzLnRvdGFsUG9pbnRzO1xyXG4gICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAuYWRkU3VpdGFiaWxpdHkodGhpcy5jbGllbnRTdWl0YWJpbGl0eSwgdGhpcy5zdWl0YWJpbGl0eUZvcm0pXHJcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoKHJlc3VsdCBhcyBhbnkpKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2xpZW50cygpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dTdGF0dXNSZXBvcnQoKTtcclxuICAgICAgICAgICAgLy8gdmFyIHVwZGF0ZWRDbGllbnQgPSB0aGlzLmFsbENsaWVudHMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IHRoaXMuY2xpZW50Vmlldy51c2VySUQpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLnNob3dDbGllbnRWaWV3KHVwZGF0ZWRDbGllbnRbMF0pO1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMDtcclxuICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAnU3VjY2VzcyEnLFxyXG4gICAgICAgICAgICAgICdTdWl0YWJpbGl0eSBmb3JtIGluaXRpYWxpemVkIScsXHJcbiAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgY2FsY3VsYXRlKCkge1xyXG4gICAgdGhpcy50YWxseVBvaW50cygpO1xyXG4gICAgdGhpcy5jYWxjdWxhdGVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHRhbGx5UG9pbnRzKCkge1xyXG4gICAgdmFyIGZhY3RvclBvaW50cyA9IDA7XHJcbiAgICB0aGlzLnBhcnRBUG9pbnRzID0gMDtcclxuICAgIHRoaXMucGFydEJQb2ludHMgPSAwO1xyXG4gICAgdGhpcy50b3RhbFBvaW50cyA9IDA7XHJcbiAgICB0aGlzLndhcm5pbmcgPSBmYWxzZTtcclxuICAgIC8vIFBBUlQgQVxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLm9mZmVyU3RhcnREYXRlID09PSAnTGVzcyB0aGFuIG9uZSB5ZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ub2ZmZXJTdGFydERhdGUgPT09ICdJbiBvbmUgeWVhcicpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLm9mZmVyU3RhcnREYXRlID09PSAnTW9yZSB0aGFuIGEgWWVhcicpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLm1lZXRzR29hbCA9PT0gJ05vJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ubWVldHNHb2FsID09PSAnWWVzIGJ1dCBsYWNrcyBza2lsbHMvaGlnaCBlbm91Z2ggbWFya3MnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5tZWV0c0dvYWwgPT09ICdZZXMnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS50aW1lT3V0T2ZTY2hvb2wgPT09ICc2IG9yIG1vcmUgeWVhcnMnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS50aW1lT3V0T2ZTY2hvb2wgPT09ICcxLTYgeWVhcnMnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS50aW1lT3V0T2ZTY2hvb2wgPT09ICdMZXNzIHRoYW4gMSB5ZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5Qcm9ncmFtQmVmb3JlID09PSAnTm8vTGVmdCB3aXRoIGFwcHJvcHJpYXRlIHJlYXNvbnMnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pblByb2dyYW1CZWZvcmUgPT09ICdZZXMgLSBBcHByb3ByaWF0ZSBwcm9ncmVzcycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluUHJvZ3JhbUJlZm9yZSA9PT0gJ1llcyDigJMgTm8gcHJvZ3Jlc3MnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5lbXBsb3ltZW50ID09PSAnTm90IHdvcmtpbmcnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5lbXBsb3ltZW50ID09PSAnV29ya2luZyBwYXJ0IHRpbWUnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5lbXBsb3ltZW50ID09PSAnV29ya2luZyBmdWxsIHRpbWUnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdFSScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ09XJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnT0RTUCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ0Nyb3duIFdhcmQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdTZWxmLWVtcGxveWVkJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnU2Vjb25kIENhcmVlcicpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ05vIGluY29tZScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ0RlcGVuZGVudCBvZiBPVy9PRFNQJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnRW1wbG95ZWQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdJbnRlcm5hdGlvbmFsIFN0dWRlbnQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMDsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdXU0lCJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDA7IH1cclxuXHJcbiAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2UgPT09ICc0NS02NSB5ZWFycyBvbGQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZSA9PT0gJzE2LTE4IHllYXJzIG9sZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAwOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlID09PSAnMTktMjkgeWVhcnMgb2xkJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2UgPT09ICc2NSsgeWVhcnMgb2xkJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDA7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2UgPT09ICczMC00NCB5ZWFycyBvbGQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgIC8vUEFSVCBCXHJcbiAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaG91cnNQZXJXZWVrID09PSAnMTAtMjAnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5ob3Vyc1BlcldlZWsgPT09ICc1LTEwJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaG91cnNQZXJXZWVrID09PSAnTGVzcyB0aGFuIDUnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS53b3JrSGlzdG9yeSA9PT0gJ0xlc3MgdGhhbiAxIHllYXIgZXhwZXJpZW5jZScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLndvcmtIaXN0b3J5ID09PSAnMS00IHllYXJzIGV4cGVyaWVuY2UnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS53b3JrSGlzdG9yeSA9PT0gJzQrIHllYXJzIGV4cGVyaWVuY2UnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JIZWFsdGggPT09IHRydWUpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JJbnN0cnVjdGlvbnMgPT09IHRydWUpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JDb21tdW5pY2F0aW9uID09PSB0cnVlKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yTGFuZ3VhZ2UgPT09IHRydWUpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JDb21wdXRlciA9PT0gdHJ1ZSkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhvdXNpbmcgPT09IHRydWUpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JUcmFuc3BvcnRhdGlvbiA9PT0gdHJ1ZSkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckRheWNhcmUgPT09IHRydWUpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JJbnRlcm5ldCA9PT0gdHJ1ZSkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvclBlcnNvbmFsID09PSB0cnVlKSB7IGZhY3RvclBvaW50cysrOyB9XHJcblxyXG4gICAgaWYgKGZhY3RvclBvaW50cyA+PSAwICYmIGZhY3RvclBvaW50cyA8PSA0KSB7IHRoaXMucGFydEJQb2ludHMgPSAzOyB9IGVsc2UgaWZcclxuICAgICAgKGZhY3RvclBvaW50cyA+PSA1ICYmIGZhY3RvclBvaW50cyA8PSA4KSB7IHRoaXMucGFydEJQb2ludHMgPSAyOyB9IGVsc2UgaWZcclxuICAgICAgKGZhY3RvclBvaW50cyA+PSA5KSB7IHRoaXMucGFydEJQb2ludHMgPSAxOyB9XHJcblxyXG4gICAgdGhpcy50b3RhbFBvaW50cyA9IHRoaXMucGFydEFQb2ludHMgKyB0aGlzLnBhcnRCUG9pbnRzO1xyXG5cclxuICAgIGlmICh0aGlzLnRvdGFsUG9pbnRzIDwgMTgpIHsgdGhpcy53YXJuaW5nID0gdHJ1ZTsgfVxyXG4gIH1cclxuXHJcbiAgYWxsb3dDbGllbnRUb0VkaXQoY2xpZW50LCBwZXJtaXNzaW9uKSB7XHJcbiAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgLmdyYW50Q29uc2VudEVkaXRQZXJtaXNzaW9uKGNsaWVudCwgcGVybWlzc2lvbilcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2dyYW50ZWQnKSB7XHJcbiAgICAgICAgICB0aGlzLmNsaWVudFZpZXcuZWRpdENvbnNlbnRSZXF1ZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnQ2xpZW50IEFjY2VzcyBHcmFudGVkJyxcclxuICAgICAgICAgICAgJ0NsaWVudCB3aWxsIGJlIHNlbnQgYW4gZW1haWwgaW5mb3JtaW5nIHRoYXQgdGhleSBjYW4gbm93IGVkaXQgY29uZXNudC4nLFxyXG4gICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZGVuaWVkJykge1xyXG4gICAgICAgICAgdGhpcy5jbGllbnRWaWV3LmVkaXRDb25zZW50UmVxdWVzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0NsaWVudCBBY2Nlc3MgRGVuaWVkJyxcclxuICAgICAgICAgICAgJ0NsaWVudCB3aWxsIGJlIHNlbnQgYW4gZW1haWwgaW5mb3JtaW5nIHRoYXQgdGhleSBjYW4gTk9UIGVkaXQgY29uZXNudC4nLFxyXG4gICAgICAgICAgICAnZGFuZ2VyJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBjaGVja2JveENoYW5nZShjbGllbnQpIHtcclxuICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAudXBkYXRlQmFubmVyQ2FtQm9vbChjbGllbnQpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgdGhpcy5zdGFnZTMgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4gIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiAoIXguYmFubmVyIHx8ICF4LmNhbSkpO1xyXG4gICAgICAgICAgdGhpcy5zdGFnZTQgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4gIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiB4LmJhbm5lciAmJiB4LmNhbSk7XHJcbiAgICAgICAgICB0aGlzLmRvdWdobnV0Q2hhcnREYXRhID0gW3RoaXMuc3RhZ2UxLmxlbmd0aCwgdGhpcy5zdGFnZTIubGVuZ3RoLCB0aGlzLnN0YWdlMy5sZW5ndGgsIHRoaXMuc3RhZ2U0Lmxlbmd0aF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBvblNlbGVjdENoYW5nZShldmVudCkge1xyXG4gICAgdmFyIGNvbnNlbnRGb3JtID0gdGhpcy5nZXRDb25zZW50Rm9ybUJ5Q29uc2VudElEKHRoaXMuc2VsZWN0ZWRDb25zZW50Rm9ybSk7XHJcbiAgICB0aGlzLmNvbnNlbnRWaWV3ID0gY29uc2VudEZvcm1bMF07XHJcbiAgfVxyXG5cclxuICB2aWV3QXNzZXNzbWVudFJlc3VsdHMoY2xpZW50KSB7XHJcbiAgICB2YXIgYXNzZXNzbWVudFJlc3VsdHMgPSB0aGlzLmFsbEFzc2Vzc21lbnRSZXN1bHRzLmZpbHRlcih4ID0+IHgudXNlcklEID09PSBjbGllbnQudXNlcklEKTtcclxuICAgIHZhciBpc0VtcHR5ID0gKGFzc2Vzc21lbnRSZXN1bHRzIHx8IFtdKS5sZW5ndGggPT09IDA7XHJcbiAgICBpZiAoaXNFbXB0eSkge1xyXG4gICAgICB0aGlzLmVkaXRBc3Nlc3NtZW50ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuYXNzZXNzbWVudFJlc3VsdHMgPSBuZXcgQXNzZXNzbWVudFJlc3VsdHM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVkaXRBc3Nlc3NtZW50ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5hc3Nlc3NtZW50UmVzdWx0cyA9IGFzc2Vzc21lbnRSZXN1bHRzWzBdO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zaG93Q2xpZW50VmlldyhjbGllbnQpO1xyXG4gICAgdGhpcy5yZXNldFZpZXcoKTtcclxuICAgIHRoaXMuc2hvd0Fzc2Vzc21lbnRSZXN1bHRzID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHJlc2V0VmlldygpIHtcclxuICAgIHRoaXMuY29uc2VudFZpZXcgPSBudWxsO1xyXG4gICAgdGhpcy5zaG93QXNzZXNzbWVudFJlc3VsdHMgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0ZpbGVzID0gZmFsc2U7XHJcbiAgICB0aGlzLnN0YXR1c1JlcG9ydCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaG93R2VuZXJhbCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaG93R2VuZXJhbEluZm9FZGl0ID0gZmFsc2U7XHJcbiAgICB0aGlzLnNob3dDb25zZW50ID0gZmFsc2U7XHJcbiAgICB0aGlzLnNob3dMZWFybmluZ1N0eWxlID0gZmFsc2U7XHJcbiAgICB0aGlzLnNob3dTdWl0YWJpbGl0eSA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaG93U3VpdGFiaWxpdHlFZGl0ID0gZmFsc2U7XHJcbiAgICB0aGlzLmFkZFN1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBhZGRBc3Nlc3NtZW50UmVzdWx0cyh1c2VySUQpIHtcclxuXHJcbiAgICB0aGlzLmFzc2Vzc21lbnRSZXN1bHRzLnVzZXJJRCA9IHVzZXJJRDtcclxuICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAuYWRkQXNzZXNzbWVudFJlc3VsdHModGhpcy5hc3Nlc3NtZW50UmVzdWx0cylcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAocmVzdWx0IGFzIGFueSkudGl0bGUsXHJcbiAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KS5tc2csXHJcbiAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KS5yZXN1bHRcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB0aGlzLmdldENsaWVudHMoKTtcclxuICAgICAgICAgIHRoaXMuc2hvd1N0YXR1c1JlcG9ydCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZWRpdEFzc2Vzc21lbnRSZXN1bHRzKHVzZXJJRCkge1xyXG4gICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgIC5lZGl0QXNzZXNzbWVudFJlc3VsdHModGhpcy5hc3Nlc3NtZW50UmVzdWx0cylcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAocmVzdWx0IGFzIGFueSkudGl0bGUsXHJcbiAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KS5tc2csXHJcbiAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KS5yZXN1bHRcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB0aGlzLnJlc2V0VmlldygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZGlzcGxheUVycm9yQWxlcnQoZXJyb3IpIHtcclxuICAgIHN3YWwoXHJcbiAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICBlcnJvci5tc2csXHJcbiAgICAgICdlcnJvcidcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
