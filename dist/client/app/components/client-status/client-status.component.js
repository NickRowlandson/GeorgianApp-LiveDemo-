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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var suitabilityForm_1 = require("../../models/suitabilityForm");
var assessmentResults_1 = require("../../models/assessmentResults");
var client_service_1 = require("../../services/client.service");
var student_service_1 = require("../../services/student.service");
var course_service_1 = require("../../services/course.service");
var authentication_service_1 = require("../../services/authentication.service");
var files_service_1 = require("../../services/files.service");
var platform_browser_1 = require("@angular/platform-browser");
var ClientStatusComponent = /** @class */ (function () {
    function ClientStatusComponent(document, router, courseService, clientService, studentService, authService, filesService) {
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
        this.doughnutChartColors = [{ backgroundColor: ["#FF4207", "#F8E903", "#309EFF", "#2AD308"] }];
        //bar chart (learning style)
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = ['Hearing', 'Seeing', 'Doing'];
        this.barChartType = 'bar';
        this.barChartLegend = false;
        this.barChartColors = [{ backgroundColor: ["#FF4207", "#F8E903", "#2AD308"] }];
        this.courseTypes = [];
        this.selectedCourseTypes = [];
    }
    ClientStatusComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getClients();
        this.getFiles();
        // get course types
        this.courseService.getCourseTypes()
            .then(function (result) {
            if (result.result === "error") {
                _this.displayErrorAlert(result);
            }
            else {
                result.forEach(function (i) {
                    _this.courseTypes.push({
                        label: i.courseType,
                        value: i.courseType
                    });
                });
            }
        });
    };
    ClientStatusComponent.prototype.getClients = function () {
        var _this = this;
        this.clientService
            .getClients()
            .then(function (objects) {
            if (objects.result === 'error') {
                _this.data = null;
                _this.displayErrorAlert(objects);
            }
            else {
                _this.setData(objects);
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    ClientStatusComponent.prototype.setData = function (objects) {
        this.data = objects.clients;
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var client = _a[_i];
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
        this.stage1 = this.data.filter(function (x) { return x.suitability; });
        this.stage2 = this.data.filter(function (x) { return !x.suitability && x.consent; });
        this.stage3 = this.data.filter(function (x) { return !x.suitability && !x.consent && (!x.banner || !x.cam); });
        this.stage4 = this.data.filter(function (x) { return !x.suitability && !x.consent && x.banner && x.cam; });
        this.doughnutChartLabels = ['Suitability', 'Consent', 'Banner/CAM', 'Transfer Ready'];
        this.doughnutChartData = [this.stage1.length, this.stage2.length, this.stage3.length, this.stage4.length];
        this.doughnutChartType = 'doughnut';
        this.addSuitability = false;
    };
    ClientStatusComponent.prototype.getFiles = function () {
        var _this = this;
        this.filesService
            .getFiles()
            .then(function (files) {
            if (files.result === 'error') {
                _this.files = null;
                _this.displayErrorAlert(files);
            }
            else {
                _this.files = files;
                for (var _i = 0, _a = _this.files; _i < _a.length; _i++) {
                    var file = _a[_i];
                    file.userID = +file.userID;
                }
                swal.close();
            }
        })
            .catch(function (error) { return error; });
    };
    ClientStatusComponent.prototype.download = function (file) {
        console.log(file);
        var filename = file.milliseconds + "_" + file.userID + "_" + file.filename;
        this.filesService
            .download(filename)
            .then(function (response) {
            var blob = new Blob([response], { type: "application/pdf" });
            //change download.pdf to the name of whatever you want your file to be
            console.log(blob);
            saveAs(blob, file.filename);
        })
            .catch(function (error) { return error; });
    };
    ClientStatusComponent.prototype.deleteFileAlert = function (file) {
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
    ClientStatusComponent.prototype.deleteFile = function (filename) {
        var _this = this;
        event.stopPropagation();
        this.filesService
            .delete(filename)
            .then(function (result) {
            if (result.result === 'error') {
                _this.displayErrorAlert(result);
            }
            else if (result.result === 'success') {
                _this.getFiles();
                swal('Deleted!', 'File has been deleted.', 'success');
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
            }
        })
            .catch(function (error) { return error; });
    };
    ClientStatusComponent.prototype.addFile = function () {
        this.router.navigate(['/file-upload']);
    };
    ClientStatusComponent.prototype.addClient = function () {
        this.router.navigate(['/suitability']);
    };
    ClientStatusComponent.prototype.deleteAlert = function (client) {
        var _this = this;
        swal({
            title: 'Delete client (' + client.firstName + ' ' + client.lastName + ')?',
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
                _this.deleteClient(client);
            }
        }).catch(function (error) {
            //console.log("Canceled");
        });
    };
    ClientStatusComponent.prototype.deleteClient = function (client) {
        var _this = this;
        event.stopPropagation();
        this.clientService
            .delete(client)
            .then(function (result) {
            if (result.result === 'error') {
                _this.displayErrorAlert(result);
            }
            else if (result.result === 'success') {
                _this.showStatusReport();
                _this.data = _this.data.filter(function (h) { return h !== client; });
                _this.allClients = _this.allClients.filter(function (h) { return h !== client; });
                _this.stage1 = _this.data.filter(function (x) { return x.suitability; });
                _this.stage2 = _this.data.filter(function (x) { return !x.suitability && x.consent; });
                _this.stage3 = _this.data.filter(function (x) { return !x.suitability && !x.consent && (!x.banner || !x.cam); });
                _this.stage4 = _this.data.filter(function (x) { return !x.suitability && !x.consent && x.banner && x.cam; });
                _this.doughnutChartData = [_this.stage1.length, _this.stage2.length, _this.stage3.length, _this.stage4.length];
                swal('Deleted!', 'Client record has been deleted.', 'success');
                _this.clientTotal = _this.data.length;
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    ClientStatusComponent.prototype.showClientView = function (client) {
        var _this = this;
        this.currentClientEmail = client.email;
        this.clientView = client;
        this.resetView();
        this.showGeneral = true;
        this.clientFiles = this.files.filter(function (x) { return x.userID === _this.clientView.userID; });
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
    };
    ClientStatusComponent.prototype.getSuitabilityFormByFilter = function (id) {
        return this.suitabilityForms.filter(function (x) { return x.userID === id; });
    };
    ClientStatusComponent.prototype.getConsentFormByUserID = function (id) {
        return this.consentForms.filter(function (x) { return x.userID === id; });
    };
    ClientStatusComponent.prototype.getConsentFormByConsentID = function (id) {
        id = +id;
        var consentForm = this.clientConsentForms.filter(function (x) { return x.consentID === id; });
        return consentForm;
    };
    ClientStatusComponent.prototype.getLearningStyleFormByFilter = function (id) {
        return this.learningStyleForms.filter(function (x) { return x.userID === id; });
    };
    ClientStatusComponent.prototype.sectionBtnClicked = function (event, section) {
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
    };
    ClientStatusComponent.prototype.showStatusReport = function () {
        this.showSuitabilityEdit = false;
        this.showGeneralInfoEdit = false;
        this.addSuitability = false;
        this.statusReport = true;
        this.clientSuitability = null;
        this.clientView = null;
        this.addSuitability = false;
    };
    ClientStatusComponent.prototype.chartClicked = function (e) {
        try {
            var index = e.active[0]._index;
            if (index === 0) {
                this.data = this.allClients.filter(function (x) { return x.suitability; });
            }
            else if (index === 1) {
                this.data = this.allClients.filter(function (x) { return !x.suitability && x.consent; });
            }
            else if (index === 2) {
                this.data = this.allClients.filter(function (x) { return !x.suitability && !x.consent; });
            }
            else if (index === 3) {
                this.data = this.allClients.filter(function (x) { return !x.suitability && !x.consent && x.banner && x.cam; });
            }
        }
        catch (err) {
            this.data = this.allClients;
        }
    };
    ClientStatusComponent.prototype.chartHovered = function (e) {
    };
    ClientStatusComponent.prototype.createAsStudent = function (client) {
        var _this = this;
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
                cancelButtonColor: '#d33',
                confirmButtonText: 'Save'
            }).then(function (isConfirm) {
                if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                    console.log(isConfirm.dismiss);
                }
                else if (isConfirm) {
                    client.studentNumber = isConfirm.value;
                    _this.removeAlert(client);
                }
            }).catch(function (error) {
                console.log(error); // TODO: Display error message
            });
        }
    };
    ClientStatusComponent.prototype.studentNumber = function (client) {
        var _this = this;
        swal({
            title: 'Student Number',
            type: 'info',
            text: 'Please enter student number for ' + client.firstName + ' ' + client.lastName + '',
            input: "text",
            inputPlaceholder: "Enter Student Number",
            showCancelButton: true,
            animation: "slide-from-top",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save'
        }).then(function (isConfirm) {
            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                // canceled
            }
            else if (isConfirm) {
                client.studentNumber = isConfirm.value;
                _this.removeAlert(client);
            }
        }).catch(function (error) {
            console.log(error); // TODO: Display error message
        });
    };
    ClientStatusComponent.prototype.removeAlert = function (client) {
        var _this = this;
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
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, transfer!'
            }).then(function (isConfirm) {
                if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                    // canceled
                }
                else if (isConfirm) {
                    swal({
                        title: 'Transferring...'
                    });
                    swal.showLoading();
                    _this.studentService
                        .postNew(client)
                        .then(function (result) {
                        if (result.result === 'error') {
                            _this.displayErrorAlert(result);
                        }
                        else if (result.result === 'success') {
                            _this.removeFromClientTable(client.userID);
                        }
                        else {
                            swal('Error', 'Something went wrong, please try again.', 'error');
                        }
                    })
                        .catch(function (error) { return _this.error = error; }); // TODO: Display error message
                }
            }).catch(function (error) {
                console.log(error); // TODO: Display error message
            });
        }
    };
    ClientStatusComponent.prototype.removeFromClientTable = function (userID) {
        var _this = this;
        event.stopPropagation();
        this.clientService
            .removeFromClientTable(userID)
            .then(function (result) {
            if (result.result === 'error') {
                _this.displayErrorAlert(result);
            }
            else if (result.result === 'success') {
                _this.data = _this.data.filter(function (h) { return h.userID !== userID; });
                _this.stage3 = _this.data.filter(function (x) { return x.userID !== userID && !x.suitability && !x.consent; });
                _this.stage4 = _this.data.filter(function (x) { return x.userID !== userID && !x.suitability && !x.consent && x.banner && x.cam; });
                _this.doughnutChartData = [_this.stage1.length, _this.stage2.length, _this.stage3.length, _this.stage4.length];
                swal('Transfered', 'Client record has been transfered to the student table.', 'success');
                //this.router.navigate(['/students']);
                _this.clientTotal = _this.data.length;
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    ClientStatusComponent.prototype.addSuitabilityInfo = function (client) {
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
        this.suitabilityForm.appropriateGoal = false;
        this.suitabilityForm.isValidAge = false;
        this.suitabilityForm.governmentID = false;
        this.suitabilityForm.schoolRegistration = false;
        this.suitabilityForm.availableDuringClass = false;
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
    };
    ClientStatusComponent.prototype.editGeneralInfo = function (client) {
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
    };
    ClientStatusComponent.prototype.updateGeneralInfo = function () {
        var _this = this;
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
            .then(function (result) {
            if (result.result === 'error') {
                _this.displayErrorAlert(result);
            }
            else if (result.msg === "Username is already in use.") {
                swal('Username taken', 'Please enter a different username.', 'warning');
            }
            else if (result.msg === "Email is already in use.") {
                swal('Email in use', 'Please enter a different email.', 'warning');
            }
            else if (result.msg === "Incorrect email format.") {
                swal('Incorrect email format', 'Please enter a proper email.', 'warning');
                _this.clientView.email = _this.currentClientEmail;
            }
            else if (result.result === 'success') {
                _this.showStatusReport();
                swal('Success!', 'Client information has been updated!', 'success');
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    ClientStatusComponent.prototype.editSuitability = function (client) {
        this.resetView();
        this.showSuitabilityEdit = true;
        this.suitabilityForm = this.getSuitabilityFormByFilter(client.userID)[0];
        this.selectedCourseTypes = [];
        for (var _i = 0, _a = this.suitabilityForm.selectedCourseTypes.split(','); _i < _a.length; _i++) {
            var item = _a[_i];
            this.selectedCourseTypes.push(item);
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
    };
    ClientStatusComponent.prototype.saveSuitability = function () {
        var _this = this;
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
                .then(function (result) {
                if (result.result === 'error') {
                    _this.displayErrorAlert(result);
                }
                else if (result.result === 'success') {
                    _this.getClients();
                    _this.showStatusReport();
                    _this.document.body.scrollTop = 0;
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
                .then(function (result) {
                if (result.result === 'error') {
                    _this.displayErrorAlert(result);
                }
                else if (result.result === 'success') {
                    _this.getClients();
                    _this.showStatusReport();
                    // var updatedClient = this.allClients.filter(x => x.userID === this.clientView.userID);
                    // this.showClientView(updatedClient[0]);
                    _this.document.body.scrollTop = 0;
                    swal('Success!', 'Suitability form initialized!', 'success');
                }
                else {
                    swal('Error', 'Something went wrong, please try again.', 'error');
                }
            })
                .catch(function (error) { return _this.error = error; });
        }
    };
    ClientStatusComponent.prototype.calculate = function () {
        this.tallyPoints();
        this.calculated = true;
    };
    ClientStatusComponent.prototype.tallyPoints = function () {
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
    };
    ClientStatusComponent.prototype.allowClientToEdit = function (client, permission) {
        var _this = this;
        this.clientService
            .grantConsentEditPermission(client, permission)
            .then(function (result) {
            if (result.result === 'error') {
                _this.displayErrorAlert(result);
            }
            else if (result.result === 'granted') {
                _this.clientView.editConsentRequest = false;
                swal('Client Access Granted', 'Client will be sent an email informing that they can now edit conesnt.', 'success');
            }
            else if (result.result === 'denied') {
                _this.clientView.editConsentRequest = false;
                swal('Client Access Denied', 'Client will be sent an email informing that they can NOT edit conesnt.', 'danger');
            }
        }).catch(function (error) { return _this.error = error; });
    };
    ClientStatusComponent.prototype.checkboxChange = function (client) {
        var _this = this;
        this.clientService
            .updateBannerCamBool(client)
            .then(function (result) {
            if (result.result === 'error') {
                _this.displayErrorAlert(result);
            }
            else if (result.result === 'success') {
                _this.stage3 = _this.data.filter(function (x) { return !x.suitability && !x.consent && (!x.banner || !x.cam); });
                _this.stage4 = _this.data.filter(function (x) { return !x.suitability && !x.consent && x.banner && x.cam; });
                _this.doughnutChartData = [_this.stage1.length, _this.stage2.length, _this.stage3.length, _this.stage4.length];
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    ClientStatusComponent.prototype.onSelectChange = function (event) {
        var consentForm = this.getConsentFormByConsentID(this.selectedConsentForm);
        this.consentView = consentForm[0];
    };
    ClientStatusComponent.prototype.viewAssessmentResults = function (client) {
        var assessmentResults = this.allAssessmentResults.filter(function (x) { return x.userID === client.userID; });
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
    };
    ClientStatusComponent.prototype.resetView = function () {
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
    };
    ClientStatusComponent.prototype.addAssessmentResults = function (userID) {
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
                _this.getClients();
                _this.showStatusReport();
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    ClientStatusComponent.prototype.editAssessmentResults = function (userID) {
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
    ClientStatusComponent.prototype.displayErrorAlert = function (error) {
        swal(error.title, error.msg, 'error');
    };
    ClientStatusComponent.prototype.goBack = function () {
        window.history.back();
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
    return ClientStatusComponent;
}());
exports.ClientStatusComponent = ClientStatusComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWlFO0FBQ2pFLDBDQUF5QztBQUd6QyxnRUFBK0Q7QUFHL0Qsb0VBQW1FO0FBQ25FLGdFQUE4RDtBQUM5RCxrRUFBZ0U7QUFDaEUsZ0VBQThEO0FBQzlELGdGQUFvRTtBQUNwRSw4REFBNEQ7QUFDNUQsOERBQXFEO0FBVXJEO0lBeUVFLCtCQUMwQixRQUFrQixFQUNwQyxNQUFjLEVBQ2QsYUFBNEIsRUFDNUIsYUFBNEIsRUFDNUIsY0FBOEIsRUFDOUIsV0FBd0IsRUFDeEIsWUFBMEI7UUFOUixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ3BDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFoRWxDLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixVQUFLLEdBQVksS0FBSyxDQUFDO1FBQ3ZCLFVBQUssR0FBWSxLQUFLLENBQUM7UUFXdkIsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFHaEMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBRWhCLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBVTVCLHdCQUFtQixHQUFVLENBQUMsRUFBRSxlQUFlLEVB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O1FBQVIsWUFBSyxFQUFFO2tDQUFrQixpQ0FBZTtrRUFBQztJQS9CL0IscUJBQXFCO1FBTmpDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUsNkRBQTZEO1lBQzFFLFNBQVMsRUFBRSxDQUFDLDREQUE0RCxDQUFDO1NBQzFFLENBQUM7UUE0RUMsV0FBQSxhQUFNLENBQUMsMkJBQVEsQ0FBQyxDQUFBO3lDQUFtQixRQUFRO1lBQzVCLGVBQU07WUFDQyw4QkFBYTtZQUNiLDhCQUFhO1lBQ1osZ0NBQWM7WUFDakIsb0NBQVc7WUFDViw0QkFBWTtPQWhGdkIscUJBQXFCLENBbTdCakM7SUFBRCw0QkFBQztDQW43QkQsQUFtN0JDLElBQUE7QUFuN0JZLHNEQUFxQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jbGllbnRcIjtcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBTdWl0YWJpbGl0eUZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N1aXRhYmlsaXR5Rm9ybVwiO1xyXG5pbXBvcnQgeyBDb25zZW50Rm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29uc2VudEZvcm1cIjtcclxuaW1wb3J0IHsgTGVhcm5pbmdTdHlsZUZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2xlYXJuaW5nU3R5bGVGb3JtXCI7XHJcbmltcG9ydCB7IEFzc2Vzc21lbnRSZXN1bHRzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9hc3Nlc3NtZW50UmVzdWx0c1wiO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDb3Vyc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRmlsZXNTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ZpbGVzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5kZWNsYXJlIHZhciBGaWxlU2F2ZXI6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnY2xpZW50LXN0YXR1cycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2NsaWVudC1zdGF0dXMvY2xpZW50LXN0YXR1cy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvY2xpZW50LXN0YXR1cy9jbGllbnQtc3RhdHVzLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIENsaWVudFN0YXR1c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgYXNzZXNzbWVudFJlc3VsdHM6IEFzc2Vzc21lbnRSZXN1bHRzO1xyXG4gIGRhdGE6IGFueVtdO1xyXG4gIGFsbENsaWVudHM6IENsaWVudFtdO1xyXG4gIHN1aXRhYmlsaXR5Rm9ybXM6IFN1aXRhYmlsaXR5Rm9ybVtdO1xyXG4gIGNvbnNlbnRGb3JtczogQ29uc2VudEZvcm1bXTtcclxuICBsZWFybmluZ1N0eWxlRm9ybXM6IExlYXJuaW5nU3R5bGVGb3JtW107XHJcbiAgYWxsQXNzZXNzbWVudFJlc3VsdHM6IEFzc2Vzc21lbnRSZXN1bHRzW107XHJcbiAgZWRpdEFzc2Vzc21lbnQ6IGJvb2xlYW47XHJcbiAgY2xpZW50VG90YWw6IGFueTtcclxuICBhY3Rpb25JdGVtczogYW55W107XHJcbiAgZXJyb3I6IGFueTtcclxuXHJcbiAgY2xpZW50VmlldzogQ2xpZW50O1xyXG4gIGN1cnJlbnRDbGllbnRFbWFpbDogc3RyaW5nO1xyXG4gIGNsaWVudEVkaXQ6IENsaWVudDtcclxuICBwaG9uZTE6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwaG9uZTI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBsb25nMTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGxvbmcyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgY29uc2VudFZpZXc6IENvbnNlbnRGb3JtO1xyXG4gIHNlbGVjdGVkQ29uc2VudEZvcm06IHN0cmluZztcclxuICBjbGllbnRDb25zZW50Rm9ybXM6IENvbnNlbnRGb3JtW107XHJcbiAgc3VpdGFiaWxpdHlWaWV3OiBTdWl0YWJpbGl0eUZvcm07XHJcbiAgbGVhcm5pbmdTdHlsZVZpZXc6IExlYXJuaW5nU3R5bGVGb3JtO1xyXG5cclxuICBzaG93U3VpdGFiaWxpdHlFZGl0OiBib29sZWFuO1xyXG4gIHNob3dHZW5lcmFsSW5mb0VkaXQ6IGJvb2xlYW47XHJcbiAgc2hvd0Fzc2Vzc21lbnRSZXN1bHRzOiBib29sZWFuO1xyXG5cclxuICBhZGRTdWl0YWJpbGl0eTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHN1aXRhYmlsaXR5Rm9ybTogU3VpdGFiaWxpdHlGb3JtO1xyXG4gIGNsaWVudFN1aXRhYmlsaXR5OiBDbGllbnRbXTtcclxuICB3YXJuaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgY2FsY3VsYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHBhcnRBUG9pbnRzID0gMDtcclxuICBwYXJ0QlBvaW50cyA9IDA7XHJcbiAgdG90YWxQb2ludHMgPSAwO1xyXG5cclxuICBzdGF0dXNSZXBvcnQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHNob3dHZW5lcmFsOiBib29sZWFuID0gdHJ1ZTtcclxuICBzaG93U3VpdGFiaWxpdHk6IGJvb2xlYW47XHJcbiAgc2hvd0NvbnNlbnQ6IGJvb2xlYW47XHJcbiAgc2hvd0xlYXJuaW5nU3R5bGU6IGJvb2xlYW47XHJcbiAgc2hvd0ZpbGVzOiBib29sZWFuO1xyXG5cclxuICAvL2RvdWdobnV0IGNoYXJ0IChjbGllbnQgc3RhdHVzKVxyXG4gIGRvdWdobnV0Q2hhcnRMYWJlbHM6IHN0cmluZ1tdO1xyXG4gIGRvdWdobnV0Q2hhcnREYXRhOiBudW1iZXJbXTtcclxuICBkb3VnaG51dENoYXJ0VHlwZTogc3RyaW5nO1xyXG4gIGRvdWdobnV0Q2hhcnRDb2xvcnM6IGFueVtdID0gW3sgYmFja2dyb3VuZENvbG9yOiBbXCIjRkY0MjA3XCIsIFwiI0Y4RTkwM1wiLCBcIiMzMDlFRkZcIiwgXCIjMkFEMzA4XCJdIH1dO1xyXG4gIHN0YWdlMTogYW55O1xyXG4gIHN0YWdlMjogYW55O1xyXG4gIHN0YWdlMzogYW55O1xyXG4gIHN0YWdlNDogYW55O1xyXG5cclxuICBmaWxlczogYW55W107XHJcbiAgY2xpZW50RmlsZXM6IGFueVtdO1xyXG5cclxuICAvL2JhciBjaGFydCAobGVhcm5pbmcgc3R5bGUpXHJcbiAgYmFyQ2hhcnRPcHRpb25zOiBhbnkgPSB7XHJcbiAgICBzY2FsZVNob3dWZXJ0aWNhbExpbmVzOiBmYWxzZSxcclxuICAgIHJlc3BvbnNpdmU6IHRydWVcclxuICB9O1xyXG4gIGJhckNoYXJ0TGFiZWxzOiBzdHJpbmdbXSA9IFsnSGVhcmluZycsICdTZWVpbmcnLCAnRG9pbmcnXTtcclxuICBiYXJDaGFydFR5cGU6IHN0cmluZyA9ICdiYXInO1xyXG4gIGJhckNoYXJ0TGVnZW5kOiBib29sZWFuID0gZmFsc2U7XHJcbiAgYmFyQ2hhcnREYXRhOiBhbnk7XHJcbiAgYmFyQ2hhcnRDb2xvcnM6IGFueVtdID0gW3sgYmFja2dyb3VuZENvbG9yOiBbXCIjRkY0MjA3XCIsIFwiI0Y4RTkwM1wiLCBcIiMyQUQzMDhcIl0gfV07XHJcblxyXG4gIGNvdXJzZVR5cGVzOiBhbnlbXSA9IFtdO1xyXG4gIHNlbGVjdGVkQ291cnNlVHlwZXM6IGFueVtdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LFxyXG4gIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgcHJpdmF0ZSBjb3Vyc2VTZXJ2aWNlOiBDb3Vyc2VTZXJ2aWNlLFxyXG4gIHByaXZhdGUgY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSxcclxuICBwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSxcclxuICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcclxuICBwcml2YXRlIGZpbGVzU2VydmljZTogRmlsZXNTZXJ2aWNlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmdldENsaWVudHMoKTtcclxuICAgIHRoaXMuZ2V0RmlsZXMoKTtcclxuICAgIC8vIGdldCBjb3Vyc2UgdHlwZXNcclxuICAgIHRoaXMuY291cnNlU2VydmljZS5nZXRDb3Vyc2VUeXBlcygpXHJcbiAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSBcImVycm9yXCIpIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzdWx0LmZvckVhY2goKGkpID0+IHtcclxuICAgICAgICAgIHRoaXMuY291cnNlVHlwZXMucHVzaCh7XHJcbiAgICAgICAgICAgIGxhYmVsOiBpLmNvdXJzZVR5cGUsXHJcbiAgICAgICAgICAgIHZhbHVlOiBpLmNvdXJzZVR5cGVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldENsaWVudHMoKSB7XHJcbiAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgLmdldENsaWVudHMoKVxyXG4gICAgICAudGhlbihvYmplY3RzID0+IHtcclxuICAgICAgICBpZiAoKG9iamVjdHMgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGF0YSA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KG9iamVjdHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnNldERhdGEob2JqZWN0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIHNldERhdGEob2JqZWN0cykge1xyXG4gICAgdGhpcy5kYXRhID0gb2JqZWN0cy5jbGllbnRzO1xyXG4gICAgZm9yIChsZXQgY2xpZW50IG9mIHRoaXMuZGF0YSkge1xyXG4gICAgICBjbGllbnQuZnVsbE5hbWUgPSBjbGllbnQuZmlyc3ROYW1lICsgXCIgXCIgKyBjbGllbnQubGFzdE5hbWU7XHJcbiAgICAgIGlmIChjbGllbnQuYmFubmVyID09IG51bGwpIHtcclxuICAgICAgICBjbGllbnQuYmFubmVyID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNsaWVudC5jYW0gPT0gbnVsbCkge1xyXG4gICAgICAgIGNsaWVudC5jYW0gPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5hbGxDbGllbnRzID0gb2JqZWN0cy5jbGllbnRzO1xyXG4gICAgdGhpcy5jbGllbnRUb3RhbCA9IG9iamVjdHMuY2xpZW50cy5sZW5ndGg7XHJcbiAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybXMgPSBvYmplY3RzLnN1aXRhYmlsaXR5Rm9ybXM7XHJcbiAgICB0aGlzLmNvbnNlbnRGb3JtcyA9IG9iamVjdHMuY29uc2VudEZvcm1zO1xyXG4gICAgdGhpcy5sZWFybmluZ1N0eWxlRm9ybXMgPSBvYmplY3RzLmxlYXJuaW5nU3R5bGVGb3JtcztcclxuICAgIHRoaXMuYWxsQXNzZXNzbWVudFJlc3VsdHMgPSBvYmplY3RzLmFzc2Vzc21lbnRSZXN1bHRzO1xyXG4gICAgdGhpcy5zdGFnZTEgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4geC5zdWl0YWJpbGl0eSk7XHJcbiAgICB0aGlzLnN0YWdlMiA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiB4LmNvbnNlbnQpO1xyXG4gICAgdGhpcy5zdGFnZTMgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4gIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiAoIXguYmFubmVyIHx8ICF4LmNhbSkpO1xyXG4gICAgdGhpcy5zdGFnZTQgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4gIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiB4LmJhbm5lciAmJiB4LmNhbSk7XHJcbiAgICB0aGlzLmRvdWdobnV0Q2hhcnRMYWJlbHMgPSBbJ1N1aXRhYmlsaXR5JywgJ0NvbnNlbnQnLCAnQmFubmVyL0NBTScsICdUcmFuc2ZlciBSZWFkeSddO1xyXG4gICAgdGhpcy5kb3VnaG51dENoYXJ0RGF0YSA9IFt0aGlzLnN0YWdlMS5sZW5ndGgsIHRoaXMuc3RhZ2UyLmxlbmd0aCwgdGhpcy5zdGFnZTMubGVuZ3RoLCB0aGlzLnN0YWdlNC5sZW5ndGhdO1xyXG4gICAgdGhpcy5kb3VnaG51dENoYXJ0VHlwZSA9ICdkb3VnaG51dCc7XHJcbiAgICB0aGlzLmFkZFN1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBnZXRGaWxlcygpIHtcclxuICAgIHRoaXMuZmlsZXNTZXJ2aWNlXHJcbiAgICAgIC5nZXRGaWxlcygpXHJcbiAgICAgIC50aGVuKGZpbGVzID0+IHtcclxuICAgICAgICBpZiAoKGZpbGVzIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmZpbGVzID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoZmlsZXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmZpbGVzID0gZmlsZXM7XHJcbiAgICAgICAgICBmb3IgKGxldCBmaWxlIG9mIHRoaXMuZmlsZXMpIHtcclxuICAgICAgICAgICAgZmlsZS51c2VySUQgPSArZmlsZS51c2VySUQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZG93bmxvYWQoZmlsZSkge1xyXG4gICAgY29uc29sZS5sb2coZmlsZSk7XHJcbiAgICB2YXIgZmlsZW5hbWUgPSBmaWxlLm1pbGxpc2Vjb25kcyArIFwiX1wiICsgZmlsZS51c2VySUQgKyBcIl9cIiArIGZpbGUuZmlsZW5hbWU7XHJcbiAgICB0aGlzLmZpbGVzU2VydmljZVxyXG4gICAgICAuZG93bmxvYWQoZmlsZW5hbWUpXHJcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICB2YXIgYmxvYiA9IG5ldyBCbG9iKFtyZXNwb25zZV0sIHsgdHlwZTogXCJhcHBsaWNhdGlvbi9wZGZcIiB9KTtcclxuICAgICAgICAvL2NoYW5nZSBkb3dubG9hZC5wZGYgdG8gdGhlIG5hbWUgb2Ygd2hhdGV2ZXIgeW91IHdhbnQgeW91ciBmaWxlIHRvIGJlXHJcbiAgICAgICAgY29uc29sZS5sb2coYmxvYik7XHJcbiAgICAgICAgc2F2ZUFzKGJsb2IsIGZpbGUuZmlsZW5hbWUpO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlRmlsZUFsZXJ0KGZpbGUpIHtcclxuICAgIHZhciBmaWxlbmFtZSA9IGZpbGUubWlsbGlzZWNvbmRzICsgXCJfXCIgKyBmaWxlLnVzZXJJRCArIFwiX1wiICsgZmlsZS5maWxlbmFtZTtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ0RlbGV0ZSBmaWxlICgnICsgZmlsZS5maWxlbmFtZSArICcpPycsXHJcbiAgICAgIHRleHQ6IFwiWW91IHdvbid0IGJlIGFibGUgdG8gcmV2ZXJ0IHRoaXMhXCIsXHJcbiAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBkZWxldGUgaXQhJ1xyXG4gICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICBpZiAoaXNDb25maXJtLmRpc21pc3MgPT09IFwiY2FuY2VsXCIgfHwgaXNDb25maXJtLmRpc21pc3MgPT09IFwib3ZlcmxheVwiKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtLmRpc21pc3MpO1xyXG4gICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgIHRoaXMuZGVsZXRlRmlsZShmaWxlbmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH0pLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUZpbGUoZmlsZW5hbWUpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgdGhpcy5maWxlc1NlcnZpY2VcclxuICAgICAgLmRlbGV0ZShmaWxlbmFtZSlcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICB0aGlzLmdldEZpbGVzKCk7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnRGVsZXRlZCEnLFxyXG4gICAgICAgICAgICAnRmlsZSBoYXMgYmVlbiBkZWxldGVkLicsXHJcbiAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgYWRkRmlsZSgpIHtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2ZpbGUtdXBsb2FkJ10pO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2xpZW50KCkge1xyXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3VpdGFiaWxpdHknXSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVBbGVydChjbGllbnQ6IENsaWVudCkge1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnRGVsZXRlIGNsaWVudCAoJyArIGNsaWVudC5maXJzdE5hbWUgKyAnICcgKyBjbGllbnQubGFzdE5hbWUgKyAnKT8nLFxyXG4gICAgICB0ZXh0OiBcIllvdSB3b24ndCBiZSBhYmxlIHRvIHJldmVydCB0aGlzIVwiLFxyXG4gICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgZGVsZXRlIGl0ISdcclxuICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICB0aGlzLmRlbGV0ZUNsaWVudChjbGllbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgIC8vY29uc29sZS5sb2coXCJDYW5jZWxlZFwiKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlQ2xpZW50KGNsaWVudDogQ2xpZW50KSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAuZGVsZXRlKGNsaWVudClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICB0aGlzLnNob3dTdGF0dXNSZXBvcnQoKTtcclxuICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoaCA9PiBoICE9PSBjbGllbnQpO1xyXG4gICAgICAgICAgdGhpcy5hbGxDbGllbnRzID0gdGhpcy5hbGxDbGllbnRzLmZpbHRlcihoID0+IGggIT09IGNsaWVudCk7XHJcbiAgICAgICAgICB0aGlzLnN0YWdlMSA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiB4LnN1aXRhYmlsaXR5KTtcclxuICAgICAgICAgIHRoaXMuc3RhZ2UyID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmIHguY29uc2VudCk7XHJcbiAgICAgICAgICB0aGlzLnN0YWdlMyA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmICgheC5iYW5uZXIgfHwgIXguY2FtKSk7XHJcbiAgICAgICAgICB0aGlzLnN0YWdlNCA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmIHguYmFubmVyICYmIHguY2FtKTtcclxuICAgICAgICAgIHRoaXMuZG91Z2hudXRDaGFydERhdGEgPSBbdGhpcy5zdGFnZTEubGVuZ3RoLCB0aGlzLnN0YWdlMi5sZW5ndGgsIHRoaXMuc3RhZ2UzLmxlbmd0aCwgdGhpcy5zdGFnZTQubGVuZ3RoXTtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdEZWxldGVkIScsXHJcbiAgICAgICAgICAgICdDbGllbnQgcmVjb3JkIGhhcyBiZWVuIGRlbGV0ZWQuJyxcclxuICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpcy5jbGllbnRUb3RhbCA9IHRoaXMuZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBzaG93Q2xpZW50VmlldyhjbGllbnQ6IENsaWVudCkge1xyXG4gICAgdGhpcy5jdXJyZW50Q2xpZW50RW1haWwgPSBjbGllbnQuZW1haWw7XHJcbiAgICB0aGlzLmNsaWVudFZpZXcgPSBjbGllbnQ7XHJcbiAgICB0aGlzLnJlc2V0VmlldygpO1xyXG4gICAgdGhpcy5zaG93R2VuZXJhbCA9IHRydWU7XHJcbiAgICB0aGlzLmNsaWVudEZpbGVzID0gdGhpcy5maWxlcy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gdGhpcy5jbGllbnRWaWV3LnVzZXJJRCk7XHJcbiAgICB2YXIgc3VpdGFiaWxpdHlGb3JtID0gdGhpcy5nZXRTdWl0YWJpbGl0eUZvcm1CeUZpbHRlcihjbGllbnQudXNlcklEKTtcclxuICAgIHRoaXMuc3VpdGFiaWxpdHlWaWV3ID0gc3VpdGFiaWxpdHlGb3JtWzBdO1xyXG5cclxuICAgIHZhciBjb25zZW50Rm9ybXMgPSB0aGlzLmdldENvbnNlbnRGb3JtQnlVc2VySUQoY2xpZW50LnVzZXJJRCk7XHJcbiAgICB0aGlzLmNsaWVudENvbnNlbnRGb3JtcyA9IGNvbnNlbnRGb3JtcztcclxuICAgIC8vIHRoaXMuY2xpZW50Q29uc2VudEZvcm1zLnNvcnQoZnVuY3Rpb24gY29tcGFyZShhLCBiKSB7XHJcbiAgICAvLyAgIHZhciBkYXRlQSA9IG5ldyBEYXRlKGEuZGF0ZS5nZXRUaW1lKCkpO1xyXG4gICAgLy8gICB2YXIgZGF0ZUIgPSBuZXcgRGF0ZShiLmRhdGUuZ2V0VGltZSgpKTtcclxuICAgIC8vICAgcmV0dXJuIGRhdGVBIC0gZGF0ZUI7XHJcbiAgICAvLyB9KTtcclxuICAgIC8vdGhpcy5jb25zZW50VmlldyA9IGNvbnNlbnRGb3Jtc1swXTtcclxuXHJcbiAgICB2YXIgbGVhcm5pbmdTdHlsZUZvcm0gPSB0aGlzLmdldExlYXJuaW5nU3R5bGVGb3JtQnlGaWx0ZXIoY2xpZW50LnVzZXJJRCk7XHJcbiAgICB0aGlzLmxlYXJuaW5nU3R5bGVWaWV3ID0gbGVhcm5pbmdTdHlsZUZvcm1bMF07XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlVmlldykge1xyXG4gICAgICB0aGlzLmJhckNoYXJ0RGF0YSA9IFt7IGRhdGE6IFt0aGlzLmxlYXJuaW5nU3R5bGVWaWV3LmhlYXJpbmcsIHRoaXMubGVhcm5pbmdTdHlsZVZpZXcuc2VlaW5nLCB0aGlzLmxlYXJuaW5nU3R5bGVWaWV3LmRvaW5nXSB9XTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFN1aXRhYmlsaXR5Rm9ybUJ5RmlsdGVyKGlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdWl0YWJpbGl0eUZvcm1zLmZpbHRlcih4ID0+IHgudXNlcklEID09PSBpZCk7XHJcbiAgfVxyXG5cclxuICBnZXRDb25zZW50Rm9ybUJ5VXNlcklEKGlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25zZW50Rm9ybXMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IGlkKTtcclxuICB9XHJcblxyXG4gIGdldENvbnNlbnRGb3JtQnlDb25zZW50SUQoaWQpIHtcclxuICAgIGlkID0gK2lkO1xyXG4gICAgdmFyIGNvbnNlbnRGb3JtID0gdGhpcy5jbGllbnRDb25zZW50Rm9ybXMuZmlsdGVyKHggPT4geC5jb25zZW50SUQgPT09IGlkKTtcclxuICAgIHJldHVybiBjb25zZW50Rm9ybTtcclxuICB9XHJcblxyXG4gIGdldExlYXJuaW5nU3R5bGVGb3JtQnlGaWx0ZXIoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLmxlYXJuaW5nU3R5bGVGb3Jtcy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gaWQpO1xyXG4gIH1cclxuXHJcbiAgc2VjdGlvbkJ0bkNsaWNrZWQoZXZlbnQsIHNlY3Rpb24pIHtcclxuICAgIGlmIChzZWN0aW9uID09PSBcImdlbmVyYWxcIikge1xyXG4gICAgICB0aGlzLnJlc2V0VmlldygpO1xyXG4gICAgICB0aGlzLnNob3dHZW5lcmFsID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAoc2VjdGlvbiA9PT0gXCJzdWl0YWJpbGl0eVwiKSB7XHJcbiAgICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAoc2VjdGlvbiA9PT0gXCJjb25zZW50XCIpIHtcclxuICAgICAgdGhpcy5yZXNldFZpZXcoKTtcclxuICAgICAgdGhpcy5zaG93Q29uc2VudCA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHNlY3Rpb24gPT09IFwibGVhcm5pbmdTdHlsZVwiKSB7XHJcbiAgICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICAgIHRoaXMuc2hvd0xlYXJuaW5nU3R5bGUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChzZWN0aW9uID09PSBcImZpbGVzXCIpIHtcclxuICAgICAgdGhpcy5yZXNldFZpZXcoKTtcclxuICAgICAgdGhpcy5zaG93RmlsZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2hvd1N0YXR1c1JlcG9ydCgpIHtcclxuICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5RWRpdCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaG93R2VuZXJhbEluZm9FZGl0ID0gZmFsc2U7XHJcbiAgICB0aGlzLmFkZFN1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICB0aGlzLnN0YXR1c1JlcG9ydCA9IHRydWU7XHJcbiAgICB0aGlzLmNsaWVudFN1aXRhYmlsaXR5ID0gbnVsbDtcclxuICAgIHRoaXMuY2xpZW50VmlldyA9IG51bGw7XHJcbiAgICB0aGlzLmFkZFN1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjaGFydENsaWNrZWQoZTogYW55KTogdm9pZCB7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgaW5kZXggPSBlLmFjdGl2ZVswXS5faW5kZXg7XHJcbiAgICAgIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuYWxsQ2xpZW50cy5maWx0ZXIoeCA9PiB4LnN1aXRhYmlsaXR5KTtcclxuICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gMSkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuYWxsQ2xpZW50cy5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiB4LmNvbnNlbnQpO1xyXG4gICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAyKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5hbGxDbGllbnRzLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmICF4LmNvbnNlbnQpO1xyXG4gICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAzKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5hbGxDbGllbnRzLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmICF4LmNvbnNlbnQgJiYgeC5iYW5uZXIgJiYgeC5jYW0pO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhpcy5kYXRhID0gdGhpcy5hbGxDbGllbnRzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hhcnRIb3ZlcmVkKGU6IGFueSk6IHZvaWQge1xyXG5cclxuICB9XHJcblxyXG4gIGNyZWF0ZUFzU3R1ZGVudChjbGllbnQ6IENsaWVudCkge1xyXG4gICAgaWYgKGNsaWVudC5zdHVkZW50TnVtYmVyID09PSAnVEJEJykge1xyXG4gICAgICB0aGlzLnN0dWRlbnROdW1iZXIoY2xpZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiAnU3R1ZGVudCBOdW1iZXInLFxyXG4gICAgICAgIHR5cGU6ICdpbmZvJyxcclxuICAgICAgICB0ZXh0OiAnUHJldmlvdXNseSBhdHRlbmRlZCBnZW9yZ2lhbjogJyArIGNsaWVudC5zdHVkZW50TnVtYmVyLFxyXG4gICAgICAgIGlucHV0OiBcInRleHRcIixcclxuICAgICAgICBpbnB1dFBsYWNlaG9sZGVyOiAnUGxlYXNlIHJlLWVudGVyIHN0dWRlbnQgbnVtYmVyIGRpc3BsYXllZCBhYm92ZScsXHJcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBhbmltYXRpb246IFwic2xpZGUtZnJvbS10b3BcIixcclxuICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnU2F2ZSdcclxuICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgY2xpZW50LnN0dWRlbnROdW1iZXIgPSBpc0NvbmZpcm0udmFsdWU7XHJcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsZXJ0KGNsaWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpOyAvLyBUT0RPOiBEaXNwbGF5IGVycm9yIG1lc3NhZ2VcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgc3R1ZGVudE51bWJlcihjbGllbnQpIHtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ1N0dWRlbnQgTnVtYmVyJyxcclxuICAgICAgdHlwZTogJ2luZm8nLFxyXG4gICAgICB0ZXh0OiAnUGxlYXNlIGVudGVyIHN0dWRlbnQgbnVtYmVyIGZvciAnICsgY2xpZW50LmZpcnN0TmFtZSArICcgJyArIGNsaWVudC5sYXN0TmFtZSArICcnLFxyXG4gICAgICBpbnB1dDogXCJ0ZXh0XCIsXHJcbiAgICAgIGlucHV0UGxhY2Vob2xkZXI6IFwiRW50ZXIgU3R1ZGVudCBOdW1iZXJcIixcclxuICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgYW5pbWF0aW9uOiBcInNsaWRlLWZyb20tdG9wXCIsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1NhdmUnXHJcbiAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAvLyBjYW5jZWxlZFxyXG4gICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgIGNsaWVudC5zdHVkZW50TnVtYmVyID0gaXNDb25maXJtLnZhbHVlO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWxlcnQoY2xpZW50KTtcclxuICAgICAgfVxyXG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7IC8vIFRPRE86IERpc3BsYXkgZXJyb3IgbWVzc2FnZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVBbGVydChjbGllbnQpIHtcclxuICAgIGlmIChjbGllbnQuc3R1ZGVudE51bWJlciA9PSBudWxsIHx8IGNsaWVudC5zdHVkZW50TnVtYmVyID09PSAnJykge1xyXG4gICAgICB0aGlzLnN0dWRlbnROdW1iZXIoY2xpZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiAnVHJhbnNmZXIgY2xpZW50ICgnICsgY2xpZW50LmZpcnN0TmFtZSArICcgJyArIGNsaWVudC5sYXN0TmFtZSArICcpPycsXHJcbiAgICAgICAgdGV4dDogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjcmVhdGUgYXMgc3R1ZGVudCB3aXRoICMnICsgY2xpZW50LnN0dWRlbnROdW1iZXIgKyAnPycsXHJcbiAgICAgICAgdHlwZTogJ3F1ZXN0aW9uJyxcclxuICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIHRyYW5zZmVyISdcclxuICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgIC8vIGNhbmNlbGVkXHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ1RyYW5zZmVycmluZy4uLidcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgc3dhbC5zaG93TG9hZGluZygpO1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgICAucG9zdE5ldyhjbGllbnQpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoKHJlc3VsdCBhcyBhbnkpKTtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tQ2xpZW50VGFibGUoY2xpZW50LnVzZXJJRCk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7IC8vIFRPRE86IERpc3BsYXkgZXJyb3IgbWVzc2FnZVxyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTsgLy8gVE9ETzogRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRnJvbUNsaWVudFRhYmxlKHVzZXJJRCk6IHZvaWQge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgLnJlbW92ZUZyb21DbGllbnRUYWJsZSh1c2VySUQpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoKHJlc3VsdCBhcyBhbnkpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmZpbHRlcihoID0+IGgudXNlcklEICE9PSB1c2VySUQpO1xyXG4gICAgICAgICAgdGhpcy5zdGFnZTMgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4geC51c2VySUQgIT09IHVzZXJJRCAmJiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50KTtcclxuICAgICAgICAgIHRoaXMuc3RhZ2U0ID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+IHgudXNlcklEICE9PSB1c2VySUQgJiYgIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiB4LmJhbm5lciAmJiB4LmNhbSk7XHJcbiAgICAgICAgICB0aGlzLmRvdWdobnV0Q2hhcnREYXRhID0gW3RoaXMuc3RhZ2UxLmxlbmd0aCwgdGhpcy5zdGFnZTIubGVuZ3RoLCB0aGlzLnN0YWdlMy5sZW5ndGgsIHRoaXMuc3RhZ2U0Lmxlbmd0aF07XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnVHJhbnNmZXJlZCcsXHJcbiAgICAgICAgICAgICdDbGllbnQgcmVjb3JkIGhhcyBiZWVuIHRyYW5zZmVyZWQgdG8gdGhlIHN0dWRlbnQgdGFibGUuJyxcclxuICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgLy90aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zdHVkZW50cyddKTtcclxuICAgICAgICAgIHRoaXMuY2xpZW50VG90YWwgPSB0aGlzLmRhdGEubGVuZ3RoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgYWRkU3VpdGFiaWxpdHlJbmZvKGNsaWVudCkge1xyXG4gICAgdGhpcy5zZWxlY3RlZENvdXJzZVR5cGVzID0gW107XHJcbiAgICB0aGlzLmNsaWVudFZpZXcgPSBjbGllbnQ7XHJcbiAgICB0aGlzLmFkZFN1aXRhYmlsaXR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuc2hvd0dlbmVyYWwgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0NvbnNlbnQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0xlYXJuaW5nU3R5bGUgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5RWRpdCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zdGF0dXNSZXBvcnQgPSBmYWxzZTtcclxuICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtID0gbmV3IFN1aXRhYmlsaXR5Rm9ybSgpO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0udHJhbnNjcmlwdCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uYXBwcm9wcmlhdGVHb2FsID0gZmFsc2U7XHJcbiAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pc1ZhbGlkQWdlID0gZmFsc2U7XHJcbiAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5nb3Zlcm5tZW50SUQgPSBmYWxzZTtcclxuICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLnNjaG9vbFJlZ2lzdHJhdGlvbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uYXZhaWxhYmxlRHVyaW5nQ2xhc3MgPSBmYWxzZTtcclxuICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhlYWx0aCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySW5zdHJ1Y3Rpb25zID0gZmFsc2U7XHJcbiAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JDb21tdW5pY2F0aW9uID0gZmFsc2U7XHJcbiAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JMYW5ndWFnZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yQ29tcHV0ZXIgPSBmYWxzZTtcclxuICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhvdXNpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvclRyYW5zcG9ydGF0aW9uID0gZmFsc2U7XHJcbiAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JEYXljYXJlID0gZmFsc2U7XHJcbiAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JJbnRlcm5ldCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yUGVyc29uYWwgPSBmYWxzZTtcclxuICAgIHRoaXMuY2xpZW50U3VpdGFiaWxpdHkgPSBjbGllbnQ7XHJcbiAgfVxyXG5cclxuICBlZGl0R2VuZXJhbEluZm8oY2xpZW50KSB7XHJcbiAgICB0aGlzLnN0YXR1c1JlcG9ydCA9IGZhbHNlO1xyXG4gICAgdGhpcy5jbGllbnRFZGl0ID0gY2xpZW50O1xyXG4gICAgdmFyIHNwbGl0UGhvbmUgPSB0aGlzLmNsaWVudEVkaXQucGhvbmUuc3BsaXQoJyAnKTtcclxuICAgIGlmICh0aGlzLmNsaWVudEVkaXQucGhvbmUuaW5kZXhPZignKzEnKSAhPT0gLTEpIHtcclxuICAgICAgdGhpcy5sb25nMSA9IHRydWU7XHJcbiAgICAgIHRoaXMuY2xpZW50RWRpdC5waG9uZSA9IHNwbGl0UGhvbmVbMV0gKyBcIiBcIiArIHNwbGl0UGhvbmVbMl07XHJcbiAgICAgIGlmIChzcGxpdFBob25lWzNdID09PSAnSG9tZScpIHtcclxuICAgICAgICB0aGlzLnBob25lMSA9IGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGhvbmUxID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sb25nMSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmNsaWVudEVkaXQucGhvbmUgPSBzcGxpdFBob25lWzBdICsgXCIgXCIgKyBzcGxpdFBob25lWzFdO1xyXG4gICAgICBpZiAoc3BsaXRQaG9uZVsyXSA9PT0gJ0hvbWUnKSB7XHJcbiAgICAgICAgdGhpcy5waG9uZTEgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBob25lMSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHZhciBzcGxpdEFsdGVybmF0ZSA9IHRoaXMuY2xpZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIuc3BsaXQoJyAnKTtcclxuICAgIGlmICh0aGlzLmNsaWVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyLmluZGV4T2YoJysxJykgIT09IC0xKSB7XHJcbiAgICAgIHRoaXMubG9uZzIgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNsaWVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyID0gc3BsaXRBbHRlcm5hdGVbMV0gKyBcIiBcIiArIHNwbGl0QWx0ZXJuYXRlWzJdO1xyXG4gICAgICBpZiAoc3BsaXRBbHRlcm5hdGVbM10gPT09ICdIb21lJykge1xyXG4gICAgICAgIHRoaXMucGhvbmUyID0gZmFsc2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5waG9uZTIgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxvbmcyID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuY2xpZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgPSBzcGxpdEFsdGVybmF0ZVswXSArIFwiIFwiICsgc3BsaXRBbHRlcm5hdGVbMV07XHJcbiAgICAgIGlmIChzcGxpdEFsdGVybmF0ZVsyXSA9PT0gJ0hvbWUnKSB7XHJcbiAgICAgICAgdGhpcy5waG9uZTIgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBob25lMiA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc2hvd0dlbmVyYWwgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0dlbmVyYWxJbmZvRWRpdCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVHZW5lcmFsSW5mbygpIHtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ1VwZGF0aW5nLi4uJ1xyXG4gICAgfSk7XHJcbiAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICB2YXIgcGhvbmVTcGxpdCA9IHRoaXMuY2xpZW50RWRpdC5waG9uZS5zcGxpdCgnICcpO1xyXG4gICAgdGhpcy5jbGllbnRFZGl0LnBob25lID0gcGhvbmVTcGxpdFswXSArIFwiIFwiICsgcGhvbmVTcGxpdFsxXTtcclxuICAgIGlmICh0aGlzLnBob25lMSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmNsaWVudEVkaXQucGhvbmUgPSB0aGlzLmNsaWVudEVkaXQucGhvbmUgKyBcIiBDZWxsXCI7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucGhvbmUxID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLmNsaWVudEVkaXQucGhvbmUgPSB0aGlzLmNsaWVudEVkaXQucGhvbmUgKyBcIiBIb21lXCI7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5sb25nMSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmNsaWVudEVkaXQucGhvbmUgPSBcIisxIFwiICsgdGhpcy5jbGllbnRFZGl0LnBob25lO1xyXG4gICAgfVxyXG4gICAgdmFyIGFsdGVybmF0ZVNwbGl0ID0gdGhpcy5jbGllbnRFZGl0LmFsdGVybmF0ZU51bWJlci5zcGxpdCgnICcpO1xyXG4gICAgdGhpcy5jbGllbnRFZGl0LmFsdGVybmF0ZU51bWJlciA9IGFsdGVybmF0ZVNwbGl0WzBdICsgXCIgXCIgKyBhbHRlcm5hdGVTcGxpdFsxXTtcclxuICAgIGlmICh0aGlzLnBob25lMiA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmNsaWVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyID0gdGhpcy5jbGllbnRFZGl0LmFsdGVybmF0ZU51bWJlciArIFwiIENlbGxcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5waG9uZTIgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuY2xpZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgPSB0aGlzLmNsaWVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyICsgXCIgSG9tZVwiO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubG9uZzIgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5jbGllbnRFZGl0LmFsdGVybmF0ZU51bWJlciA9IFwiKzEgXCIgKyB0aGlzLmNsaWVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgIC51cGRhdGVHZW5lcmFsSW5mbyh0aGlzLmNsaWVudEVkaXQpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoKHJlc3VsdCBhcyBhbnkpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5tc2cgPT09IFwiVXNlcm5hbWUgaXMgYWxyZWFkeSBpbiB1c2UuXCIpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdVc2VybmFtZSB0YWtlbicsXHJcbiAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBkaWZmZXJlbnQgdXNlcm5hbWUuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLm1zZyA9PT0gXCJFbWFpbCBpcyBhbHJlYWR5IGluIHVzZS5cIikge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0VtYWlsIGluIHVzZScsXHJcbiAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBkaWZmZXJlbnQgZW1haWwuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLm1zZyA9PT0gXCJJbmNvcnJlY3QgZW1haWwgZm9ybWF0LlwiKSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnSW5jb3JyZWN0IGVtYWlsIGZvcm1hdCcsXHJcbiAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBwcm9wZXIgZW1haWwuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpcy5jbGllbnRWaWV3LmVtYWlsID0gdGhpcy5jdXJyZW50Q2xpZW50RW1haWw7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgIHRoaXMuc2hvd1N0YXR1c1JlcG9ydCgpO1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ1N1Y2Nlc3MhJyxcclxuICAgICAgICAgICAgJ0NsaWVudCBpbmZvcm1hdGlvbiBoYXMgYmVlbiB1cGRhdGVkIScsXHJcbiAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGVkaXRTdWl0YWJpbGl0eShjbGllbnQpIHtcclxuICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICB0aGlzLnNob3dTdWl0YWJpbGl0eUVkaXQgPSB0cnVlO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0gPSB0aGlzLmdldFN1aXRhYmlsaXR5Rm9ybUJ5RmlsdGVyKGNsaWVudC51c2VySUQpWzBdO1xyXG4gICAgdGhpcy5zZWxlY3RlZENvdXJzZVR5cGVzID0gW107XHJcbiAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMuc3VpdGFiaWxpdHlGb3JtLnNlbGVjdGVkQ291cnNlVHlwZXMuc3BsaXQoJywnKSkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkQ291cnNlVHlwZXMucHVzaChpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuc3VpdGFiaWxpdHlGb3JtKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMuc3VpdGFiaWxpdHlGb3JtW2tleXNbaV1dID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtW2tleXNbaV1dID09PSBcInRydWVcIikge1xyXG4gICAgICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm1ba2V5c1tpXV0gPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm1ba2V5c1tpXV0gPT09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm1ba2V5c1tpXV0gPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtW2tleXNbaV1dID09IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtW2tleXNbaV1dID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmNsaWVudFN1aXRhYmlsaXR5ID0gY2xpZW50O1xyXG4gIH1cclxuXHJcbiAgc2F2ZVN1aXRhYmlsaXR5KCkge1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnU2F2aW5nLi4uJ1xyXG4gICAgfSk7XHJcbiAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uc3VpdGFiaWxpdHlJRCkge1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5zZWxlY3RlZENvdXJzZVR5cGVzID0gdGhpcy5zZWxlY3RlZENvdXJzZVR5cGVzLnRvU3RyaW5nKCk7XHJcbiAgICAgIHRoaXMudGFsbHlQb2ludHMoKTtcclxuICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZGJUb3RhbFBvaW50cyA9IHRoaXMudG90YWxQb2ludHM7XHJcbiAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgIC51cGRhdGVTdWl0YWJpbGl0eSh0aGlzLnN1aXRhYmlsaXR5Rm9ybSlcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydCgocmVzdWx0IGFzIGFueSkpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRDbGllbnRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1N0YXR1c1JlcG9ydCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMDtcclxuICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAnU3VjY2VzcyEnLFxyXG4gICAgICAgICAgICAgICdTdWl0YWJpbGl0eSBmb3JtIHVwZGF0ZWQhJyxcclxuICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudGFsbHlQb2ludHMoKTtcclxuICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZGJUb3RhbFBvaW50cyA9IHRoaXMudG90YWxQb2ludHM7XHJcbiAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgIC5hZGRTdWl0YWJpbGl0eSh0aGlzLmNsaWVudFN1aXRhYmlsaXR5LCB0aGlzLnN1aXRhYmlsaXR5Rm9ybSlcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydCgocmVzdWx0IGFzIGFueSkpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRDbGllbnRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1N0YXR1c1JlcG9ydCgpO1xyXG4gICAgICAgICAgICAvLyB2YXIgdXBkYXRlZENsaWVudCA9IHRoaXMuYWxsQ2xpZW50cy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gdGhpcy5jbGllbnRWaWV3LnVzZXJJRCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2hvd0NsaWVudFZpZXcodXBkYXRlZENsaWVudFswXSk7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwO1xyXG4gICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICdTdWNjZXNzIScsXHJcbiAgICAgICAgICAgICAgJ1N1aXRhYmlsaXR5IGZvcm0gaW5pdGlhbGl6ZWQhJyxcclxuICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBjYWxjdWxhdGUoKSB7XHJcbiAgICB0aGlzLnRhbGx5UG9pbnRzKCk7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgdGFsbHlQb2ludHMoKSB7XHJcbiAgICB2YXIgZmFjdG9yUG9pbnRzID0gMDtcclxuICAgIHRoaXMucGFydEFQb2ludHMgPSAwO1xyXG4gICAgdGhpcy5wYXJ0QlBvaW50cyA9IDA7XHJcbiAgICB0aGlzLnRvdGFsUG9pbnRzID0gMDtcclxuICAgIHRoaXMud2FybmluZyA9IGZhbHNlO1xyXG4gICAgLy8gUEFSVCBBXHJcbiAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0ub2ZmZXJTdGFydERhdGUgPT09ICdMZXNzIHRoYW4gb25lIHllYXInKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5vZmZlclN0YXJ0RGF0ZSA9PT0gJ0luIG9uZSB5ZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ub2ZmZXJTdGFydERhdGUgPT09ICdNb3JlIHRoYW4gYSBZZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0ubWVldHNHb2FsID09PSAnTm8nKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5tZWV0c0dvYWwgPT09ICdZZXMgYnV0IGxhY2tzIHNraWxscy9oaWdoIGVub3VnaCBtYXJrcycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLm1lZXRzR29hbCA9PT0gJ1llcycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLnRpbWVPdXRPZlNjaG9vbCA9PT0gJzYgb3IgbW9yZSB5ZWFycycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLnRpbWVPdXRPZlNjaG9vbCA9PT0gJzEtNiB5ZWFycycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLnRpbWVPdXRPZlNjaG9vbCA9PT0gJ0xlc3MgdGhhbiAxIHllYXInKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pblByb2dyYW1CZWZvcmUgPT09ICdOby9MZWZ0IHdpdGggYXBwcm9wcmlhdGUgcmVhc29ucycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluUHJvZ3JhbUJlZm9yZSA9PT0gJ1llcyAtIEFwcHJvcHJpYXRlIHByb2dyZXNzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5Qcm9ncmFtQmVmb3JlID09PSAnWWVzIOKAkyBObyBwcm9ncmVzcycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmVtcGxveW1lbnQgPT09ICdOb3Qgd29ya2luZycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmVtcGxveW1lbnQgPT09ICdXb3JraW5nIHBhcnQgdGltZScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmVtcGxveW1lbnQgPT09ICdXb3JraW5nIGZ1bGwgdGltZScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ0VJJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnT1cnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdPRFNQJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnQ3Jvd24gV2FyZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ1NlbGYtZW1wbG95ZWQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdTZWNvbmQgQ2FyZWVyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnTm8gaW5jb21lJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnRGVwZW5kZW50IG9mIE9XL09EU1AnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdFbXBsb3llZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ0ludGVybmF0aW9uYWwgU3R1ZGVudCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAwOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ1dTSUInKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMDsgfVxyXG5cclxuICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZSA9PT0gJzQ1LTY1IHllYXJzIG9sZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlID09PSAnMTYtMTggeWVhcnMgb2xkJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDA7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2UgPT09ICcxOS0yOSB5ZWFycyBvbGQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZSA9PT0gJzY1KyB5ZWFycyBvbGQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMDsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZSA9PT0gJzMwLTQ0IHllYXJzIG9sZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgLy9QQVJUIEJcclxuICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5ob3Vyc1BlcldlZWsgPT09ICcxMC0yMCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmhvdXJzUGVyV2VlayA9PT0gJzUtMTAnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5ob3Vyc1BlcldlZWsgPT09ICdMZXNzIHRoYW4gNScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLndvcmtIaXN0b3J5ID09PSAnTGVzcyB0aGFuIDEgeWVhciBleHBlcmllbmNlJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ud29ya0hpc3RvcnkgPT09ICcxLTQgeWVhcnMgZXhwZXJpZW5jZScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLndvcmtIaXN0b3J5ID09PSAnNCsgeWVhcnMgZXhwZXJpZW5jZScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhlYWx0aCA9PT0gdHJ1ZSkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3Rvckluc3RydWN0aW9ucyA9PT0gdHJ1ZSkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckNvbW11bmljYXRpb24gPT09IHRydWUpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JMYW5ndWFnZSA9PT0gdHJ1ZSkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckNvbXB1dGVyID09PSB0cnVlKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySG91c2luZyA9PT0gdHJ1ZSkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvclRyYW5zcG9ydGF0aW9uID09PSB0cnVlKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yRGF5Y2FyZSA9PT0gdHJ1ZSkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckludGVybmV0ID09PSB0cnVlKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yUGVyc29uYWwgPT09IHRydWUpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuXHJcbiAgICBpZiAoZmFjdG9yUG9pbnRzID49IDAgJiYgZmFjdG9yUG9pbnRzIDw9IDQpIHsgdGhpcy5wYXJ0QlBvaW50cyA9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAoZmFjdG9yUG9pbnRzID49IDUgJiYgZmFjdG9yUG9pbnRzIDw9IDgpIHsgdGhpcy5wYXJ0QlBvaW50cyA9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAoZmFjdG9yUG9pbnRzID49IDkpIHsgdGhpcy5wYXJ0QlBvaW50cyA9IDE7IH1cclxuXHJcbiAgICB0aGlzLnRvdGFsUG9pbnRzID0gdGhpcy5wYXJ0QVBvaW50cyArIHRoaXMucGFydEJQb2ludHM7XHJcblxyXG4gICAgaWYgKHRoaXMudG90YWxQb2ludHMgPCAxOCkgeyB0aGlzLndhcm5pbmcgPSB0cnVlOyB9XHJcbiAgfVxyXG5cclxuICBhbGxvd0NsaWVudFRvRWRpdChjbGllbnQsIHBlcm1pc3Npb24pIHtcclxuICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAuZ3JhbnRDb25zZW50RWRpdFBlcm1pc3Npb24oY2xpZW50LCBwZXJtaXNzaW9uKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZ3JhbnRlZCcpIHtcclxuICAgICAgICAgIHRoaXMuY2xpZW50Vmlldy5lZGl0Q29uc2VudFJlcXVlc3QgPSBmYWxzZTtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdDbGllbnQgQWNjZXNzIEdyYW50ZWQnLFxyXG4gICAgICAgICAgICAnQ2xpZW50IHdpbGwgYmUgc2VudCBhbiBlbWFpbCBpbmZvcm1pbmcgdGhhdCB0aGV5IGNhbiBub3cgZWRpdCBjb25lc250LicsXHJcbiAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdkZW5pZWQnKSB7XHJcbiAgICAgICAgICB0aGlzLmNsaWVudFZpZXcuZWRpdENvbnNlbnRSZXF1ZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnQ2xpZW50IEFjY2VzcyBEZW5pZWQnLFxyXG4gICAgICAgICAgICAnQ2xpZW50IHdpbGwgYmUgc2VudCBhbiBlbWFpbCBpbmZvcm1pbmcgdGhhdCB0aGV5IGNhbiBOT1QgZWRpdCBjb25lc250LicsXHJcbiAgICAgICAgICAgICdkYW5nZXInXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGNoZWNrYm94Q2hhbmdlKGNsaWVudCkge1xyXG4gICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgIC51cGRhdGVCYW5uZXJDYW1Cb29sKGNsaWVudClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICB0aGlzLnN0YWdlMyA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmICgheC5iYW5uZXIgfHwgIXguY2FtKSk7XHJcbiAgICAgICAgICB0aGlzLnN0YWdlNCA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmIHguYmFubmVyICYmIHguY2FtKTtcclxuICAgICAgICAgIHRoaXMuZG91Z2hudXRDaGFydERhdGEgPSBbdGhpcy5zdGFnZTEubGVuZ3RoLCB0aGlzLnN0YWdlMi5sZW5ndGgsIHRoaXMuc3RhZ2UzLmxlbmd0aCwgdGhpcy5zdGFnZTQubGVuZ3RoXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIG9uU2VsZWN0Q2hhbmdlKGV2ZW50KSB7XHJcbiAgICB2YXIgY29uc2VudEZvcm0gPSB0aGlzLmdldENvbnNlbnRGb3JtQnlDb25zZW50SUQodGhpcy5zZWxlY3RlZENvbnNlbnRGb3JtKTtcclxuICAgIHRoaXMuY29uc2VudFZpZXcgPSBjb25zZW50Rm9ybVswXTtcclxuICB9XHJcblxyXG4gIHZpZXdBc3Nlc3NtZW50UmVzdWx0cyhjbGllbnQpIHtcclxuICAgIHZhciBhc3Nlc3NtZW50UmVzdWx0cyA9IHRoaXMuYWxsQXNzZXNzbWVudFJlc3VsdHMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IGNsaWVudC51c2VySUQpO1xyXG4gICAgdmFyIGlzRW1wdHkgPSAoYXNzZXNzbWVudFJlc3VsdHMgfHwgW10pLmxlbmd0aCA9PT0gMDtcclxuICAgIGlmIChpc0VtcHR5KSB7XHJcbiAgICAgIHRoaXMuZWRpdEFzc2Vzc21lbnQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5hc3Nlc3NtZW50UmVzdWx0cyA9IG5ldyBBc3Nlc3NtZW50UmVzdWx0cztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZWRpdEFzc2Vzc21lbnQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmFzc2Vzc21lbnRSZXN1bHRzID0gYXNzZXNzbWVudFJlc3VsdHNbMF07XHJcbiAgICB9XHJcbiAgICB0aGlzLnNob3dDbGllbnRWaWV3KGNsaWVudCk7XHJcbiAgICB0aGlzLnJlc2V0VmlldygpO1xyXG4gICAgdGhpcy5zaG93QXNzZXNzbWVudFJlc3VsdHMgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRWaWV3KCkge1xyXG4gICAgdGhpcy5jb25zZW50VmlldyA9IG51bGw7XHJcbiAgICB0aGlzLnNob3dBc3Nlc3NtZW50UmVzdWx0cyA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaG93RmlsZXMgPSBmYWxzZTtcclxuICAgIHRoaXMuc3RhdHVzUmVwb3J0ID0gZmFsc2U7XHJcbiAgICB0aGlzLnNob3dHZW5lcmFsID0gZmFsc2U7XHJcbiAgICB0aGlzLnNob3dHZW5lcmFsSW5mb0VkaXQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0NvbnNlbnQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0xlYXJuaW5nU3R5bGUgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICB0aGlzLnNob3dTdWl0YWJpbGl0eUVkaXQgPSBmYWxzZTtcclxuICAgIHRoaXMuYWRkU3VpdGFiaWxpdHkgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGFkZEFzc2Vzc21lbnRSZXN1bHRzKHVzZXJJRCkge1xyXG5cclxuICAgIHRoaXMuYXNzZXNzbWVudFJlc3VsdHMudXNlcklEID0gdXNlcklEO1xyXG4gICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgIC5hZGRBc3Nlc3NtZW50UmVzdWx0cyh0aGlzLmFzc2Vzc21lbnRSZXN1bHRzKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KS50aXRsZSxcclxuICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLm1zZyxcclxuICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLnJlc3VsdFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHRoaXMuZ2V0Q2xpZW50cygpO1xyXG4gICAgICAgICAgdGhpcy5zaG93U3RhdHVzUmVwb3J0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBlZGl0QXNzZXNzbWVudFJlc3VsdHModXNlcklEKSB7XHJcbiAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgLmVkaXRBc3Nlc3NtZW50UmVzdWx0cyh0aGlzLmFzc2Vzc21lbnRSZXN1bHRzKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KS50aXRsZSxcclxuICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLm1zZyxcclxuICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLnJlc3VsdFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5RXJyb3JBbGVydChlcnJvcikge1xyXG4gICAgc3dhbChcclxuICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgIGVycm9yLm1zZyxcclxuICAgICAgJ2Vycm9yJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
