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
var client_service_1 = require("../../services/client.service");
var student_service_1 = require("../../services/student.service");
var authentication_service_1 = require("../../services/authentication.service");
var files_service_1 = require("../../services/files.service");
var platform_browser_1 = require("@angular/platform-browser");
var ClientStatusComponent = /** @class */ (function () {
    function ClientStatusComponent(document, router, clientService, studentService, authService, filesService) {
        this.document = document;
        this.router = router;
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
    }
    ClientStatusComponent.prototype.ngOnInit = function () {
        this.getClients();
        this.getFiles();
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
        this.stage1 = this.data.filter(function (x) { return x.suitability; });
        this.stage2 = this.data.filter(function (x) { return !x.suitability && x.consent && x.learningStyle; });
        this.stage3 = this.data.filter(function (x) { return !x.suitability && !x.consent && !x.learningStyle; });
        this.stage4 = this.data.filter(function (x) { return !x.suitability && !x.consent && !x.learningStyle && x.banner && x.cam; });
        this.doughnutChartLabels = ['Suitability', 'Consent/Learning Style', 'Banner/CAM', 'Transfer Ready'];
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
                _this.stage2 = _this.data.filter(function (x) { return !x.suitability && x.consent && x.learningStyle; });
                _this.stage3 = _this.data.filter(function (x) { return !x.suitability && !x.consent && !x.learningStyle; });
                _this.stage4 = _this.data.filter(function (x) { return !x.suitability && !x.consent && !x.learningStyle && x.banner && x.cam; });
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
                this.data = this.allClients.filter(function (x) { return !x.suitability && x.consent && x.learningStyle; });
            }
            else if (index === 2) {
                this.data = this.allClients.filter(function (x) { return !x.suitability && !x.consent && !x.learningStyle; });
            }
            else if (index === 3) {
                this.data = this.allClients.filter(function (x) { return !x.suitability && !x.consent && !x.learningStyle && x.banner && x.cam; });
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
                _this.stage3 = _this.data.filter(function (x) { return x.userID !== userID && !x.suitability && !x.consent && !x.learningStyle; });
                _this.stage4 = _this.data.filter(function (x) { return x.userID !== userID && !x.suitability && !x.consent && !x.learningStyle && x.banner && x.cam; });
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
                _this.ngOnInit();
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'error');
            }
        })
            .catch(function (error) { return _this.error = error; });
        if (client.banner && client.cam) {
            this.stage3 = this.data.filter(function (x) { return !x.suitability && !x.consent && !x.learningStyle && !x.banner && !x.cam; });
            this.stage4 = this.data.filter(function (x) { return !x.suitability && !x.consent && !x.learningStyle && x.banner && x.cam; });
        }
        else {
            this.stage3 = this.data.filter(function (x) { return !x.suitability && !x.consent && !x.learningStyle; });
            this.stage4 = this.data.filter(function (x) { return !x.suitability && !x.consent && !x.learningStyle && x.banner && x.cam; });
        }
        this.doughnutChartData = [this.stage1.length, this.stage2.length, this.stage3.length, this.stage4.length];
    };
    ClientStatusComponent.prototype.onSelectChange = function (event) {
        var consentForm = this.getConsentFormByConsentID(this.selectedConsentForm);
        this.consentView = consentForm[0];
    };
    ClientStatusComponent.prototype.addAssessmentResults = function (client) {
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
    ClientStatusComponent.prototype.displayErrorAlert = function (error) {
        swal(error.title, error.msg, 'error');
    };
    ClientStatusComponent.prototype.goBack = function () {
        window.history.back();
    };
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
            client_service_1.ClientService,
            student_service_1.StudentService,
            authentication_service_1.AuthService,
            files_service_1.FilesService])
    ], ClientStatusComponent);
    return ClientStatusComponent;
}());
exports.ClientStatusComponent = ClientStatusComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWlFO0FBQ2pFLDBDQUF5QztBQUd6QyxnRUFBK0Q7QUFHL0QsZ0VBQThEO0FBQzlELGtFQUFnRTtBQUNoRSxnRkFBb0U7QUFDcEUsOERBQTREO0FBQzVELDhEQUFxRDtBQVVyRDtJQW1FRSwrQkFDMEIsUUFBa0IsRUFDcEMsTUFBYyxFQUNkLGFBQTRCLEVBQzVCLGNBQThCLEVBQzlCLFdBQXdCLEVBQ3hCLFlBQTBCO1FBTFIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNwQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Qsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBNURsQyxXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUN2QixVQUFLLEdBQVksS0FBSyxDQUFDO1FBV3ZCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBR2hDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUVoQixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixnQkFBVyxHQUFZLElBQUksQ0FBQztRQVU1Qix3QkFBbUIsR0FBVSxDQUFDLEVBQUUsZUFBZSxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBU2pHLDRCQUE0QjtRQUM1QixvQkFBZSxHQUFRO1lBQ3JCLHNCQUFzQixFQUFFLEtBQUs7WUFDN0IsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQztRQUNGLG1CQUFjLEdBQWEsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFELGlCQUFZLEdBQVcsS0FBSyxDQUFDO1FBQzdCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBRWhDLG1CQUFjLEdBQVUsQ0FBQyxFQUFFLGVBQWUsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBU2pGLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsMENBQVUsR0FBVjtRQUFBLGlCQVlDO1FBWEMsSUFBSSxDQUFDLGFBQWE7YUFDZixVQUFVLEVBQUU7YUFDWixJQUFJLENBQUMsVUFBQSxPQUFPO1lBQ1gsSUFBSyxPQUFlLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtnQkFDdkMsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNqQztpQkFBTTtnQkFDTCxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3ZCO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsdUNBQU8sR0FBUCxVQUFRLE9BQU87UUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDNUIsS0FBbUIsVUFBUyxFQUFULEtBQUEsSUFBSSxDQUFDLElBQUksRUFBVCxjQUFTLEVBQVQsSUFBUztZQUF2QixJQUFJLE1BQU0sU0FBQTtZQUNiLE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUMzRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO2dCQUN6QixNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUN2QjtZQUNELElBQUksTUFBTSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUU7Z0JBQ3RCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO2FBQ3BCO1NBQ0Y7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUMxQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDO1FBQ2pELElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUN6QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDO1FBQ3JELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsV0FBVyxFQUFiLENBQWEsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsYUFBYSxFQUE5QyxDQUE4QyxDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFoRCxDQUFnRCxDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBckUsQ0FBcUUsQ0FBQyxDQUFDO1FBQzNHLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLGFBQWEsRUFBRSx3QkFBd0IsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFHLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxVQUFVLENBQUM7UUFDcEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFBQSxpQkFnQkM7UUFmQyxJQUFJLENBQUMsWUFBWTthQUNkLFFBQVEsRUFBRTthQUNWLElBQUksQ0FBQyxVQUFBLEtBQUs7WUFDVCxJQUFLLEtBQWEsQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO2dCQUNyQyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDbEIsS0FBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQy9CO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixLQUFpQixVQUFVLEVBQVYsS0FBQSxLQUFJLENBQUMsS0FBSyxFQUFWLGNBQVUsRUFBVixJQUFVO29CQUF0QixJQUFJLElBQUksU0FBQTtvQkFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztpQkFDNUI7Z0JBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2Q7UUFDSCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLEVBQUwsQ0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELHdDQUFRLEdBQVIsVUFBUyxJQUFJO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzNFLElBQUksQ0FBQyxZQUFZO2FBQ2QsUUFBUSxDQUFDLFFBQVEsQ0FBQzthQUNsQixJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ1osSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7WUFDN0Qsc0VBQXNFO1lBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxFQUFMLENBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCwrQ0FBZSxHQUFmLFVBQWdCLElBQUk7UUFBcEIsaUJBaUJDO1FBaEJDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDM0UsSUFBSSxDQUFDO1lBQ0gsS0FBSyxFQUFFLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUk7WUFDN0MsSUFBSSxFQUFFLG1DQUFtQztZQUN6QyxJQUFJLEVBQUUsU0FBUztZQUNmLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsa0JBQWtCLEVBQUUsU0FBUztZQUM3QixpQkFBaUIsRUFBRSxNQUFNO1lBQ3pCLGlCQUFpQixFQUFFLGlCQUFpQjtTQUNyQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsU0FBUztZQUNmLElBQUksU0FBUyxDQUFDLE9BQU8sS0FBSyxRQUFRLElBQUksU0FBUyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7Z0JBQ3JFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2hDO2lCQUFNLElBQUksU0FBUyxFQUFFO2dCQUNwQixLQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzNCO1FBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxFQUFMLENBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCwwQ0FBVSxHQUFWLFVBQVcsUUFBUTtRQUFuQixpQkF1QkM7UUF0QkMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZO2FBQ2QsTUFBTSxDQUFDLFFBQVEsQ0FBQzthQUNoQixJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1YsSUFBSyxNQUFjLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtnQkFDdEMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2hDO2lCQUFNLElBQUssTUFBYyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQy9DLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDaEIsSUFBSSxDQUNGLFVBQVUsRUFDVix3QkFBd0IsRUFDeEIsU0FBUyxDQUNWLENBQUM7YUFDSDtpQkFBTTtnQkFDTCxJQUFJLENBQ0YsT0FBTyxFQUNQLHlDQUF5QyxFQUN6QyxPQUFPLENBQ1IsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxFQUFMLENBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCx1Q0FBTyxHQUFQO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCx5Q0FBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCwyQ0FBVyxHQUFYLFVBQVksTUFBYztRQUExQixpQkFrQkM7UUFqQkMsSUFBSSxDQUFDO1lBQ0gsS0FBSyxFQUFFLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSTtZQUMxRSxJQUFJLEVBQUUsbUNBQW1DO1lBQ3pDLElBQUksRUFBRSxTQUFTO1lBQ2YsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixrQkFBa0IsRUFBRSxTQUFTO1lBQzdCLGlCQUFpQixFQUFFLE1BQU07WUFDekIsaUJBQWlCLEVBQUUsaUJBQWlCO1NBQ3JDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxTQUFTO1lBQ2YsSUFBSSxTQUFTLENBQUMsT0FBTyxLQUFLLFFBQVEsSUFBSSxTQUFTLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtnQkFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDaEM7aUJBQU0sSUFBSSxTQUFTLEVBQUU7Z0JBQ3BCLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDM0I7UUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLO1lBQ1osMEJBQTBCO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDRDQUFZLEdBQVosVUFBYSxNQUFjO1FBQTNCLGlCQStCQztRQTlCQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWE7YUFDZixNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ2QsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNWLElBQUssTUFBYyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7Z0JBQ3RDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNoQztpQkFBTSxJQUFLLE1BQWMsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUMvQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDeEIsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsS0FBSyxNQUFNLEVBQVosQ0FBWSxDQUFDLENBQUM7Z0JBQ2hELEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEtBQUssTUFBTSxFQUFaLENBQVksQ0FBQyxDQUFDO2dCQUM1RCxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFdBQVcsRUFBYixDQUFhLENBQUMsQ0FBQztnQkFDbkQsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxhQUFhLEVBQTlDLENBQThDLENBQUMsQ0FBQztnQkFDcEYsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFoRCxDQUFnRCxDQUFDLENBQUM7Z0JBQ3RGLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQXJFLENBQXFFLENBQUMsQ0FBQztnQkFDM0csS0FBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDMUcsSUFBSSxDQUNGLFVBQVUsRUFDVixpQ0FBaUMsRUFDakMsU0FBUyxDQUNWLENBQUM7Z0JBQ0YsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUNyQztpQkFBTTtnQkFDTCxJQUFJLENBQ0YsT0FBTyxFQUNQLHlDQUF5QyxFQUN6QyxPQUFPLENBQ1IsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsOENBQWMsR0FBZCxVQUFlLE1BQWM7UUFBN0IsaUJBdUJDO1FBdEJDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sS0FBSyxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBbkMsQ0FBbUMsQ0FBQyxDQUFDO1FBQy9FLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFMUMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsWUFBWSxDQUFDO1FBQ3ZDLHdEQUF3RDtRQUN4RCw0Q0FBNEM7UUFDNUMsNENBQTRDO1FBQzVDLDBCQUEwQjtRQUMxQixNQUFNO1FBQ04scUNBQXFDO1FBRXJDLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDL0g7SUFDSCxDQUFDO0lBRUQsMERBQTBCLEdBQTFCLFVBQTJCLEVBQUU7UUFDM0IsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELHNEQUFzQixHQUF0QixVQUF1QixFQUFFO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQseURBQXlCLEdBQXpCLFVBQTBCLEVBQUU7UUFDMUIsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ1QsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxTQUFTLEtBQUssRUFBRSxFQUFsQixDQUFrQixDQUFDLENBQUM7UUFDMUUsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUVELDREQUE0QixHQUE1QixVQUE2QixFQUFFO1FBQzdCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEtBQUssRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxpREFBaUIsR0FBakIsVUFBa0IsS0FBSyxFQUFFLE9BQU87UUFDOUIsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUN6QjthQUFNLElBQUksT0FBTyxLQUFLLGFBQWEsRUFBRTtZQUNwQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7U0FDN0I7YUFBTSxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO2FBQU0sSUFBSSxPQUFPLEtBQUssZUFBZSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1NBQy9CO2FBQU0sSUFBSSxPQUFPLEtBQUssT0FBTyxFQUFFO1lBQzlCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN2QjtJQUNILENBQUM7SUFFRCxnREFBZ0IsR0FBaEI7UUFDRSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBRUQsNENBQVksR0FBWixVQUFhLENBQU07UUFDakIsSUFBSTtZQUNGLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQy9CLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtnQkFDZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFdBQVcsRUFBYixDQUFhLENBQUMsQ0FBQzthQUN4RDtpQkFBTSxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsYUFBYSxFQUE5QyxDQUE4QyxDQUFDLENBQUM7YUFDekY7aUJBQU0sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO2dCQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQWhELENBQWdELENBQUMsQ0FBQzthQUMzRjtpQkFBTSxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQXJFLENBQXFFLENBQUMsQ0FBQzthQUNoSDtTQUNGO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRUQsNENBQVksR0FBWixVQUFhLENBQU07SUFFbkIsQ0FBQztJQUVELCtDQUFlLEdBQWYsVUFBZ0IsTUFBYztRQUE5QixpQkEyQkM7UUExQkMsSUFBSSxNQUFNLENBQUMsYUFBYSxLQUFLLEtBQUssRUFBRTtZQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzVCO2FBQU07WUFDTCxJQUFJLENBQUM7Z0JBQ0gsS0FBSyxFQUFFLGdCQUFnQjtnQkFDdkIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osSUFBSSxFQUFFLGdDQUFnQyxHQUFHLE1BQU0sQ0FBQyxhQUFhO2dCQUM3RCxLQUFLLEVBQUUsTUFBTTtnQkFDYixnQkFBZ0IsRUFBRSxnREFBZ0Q7Z0JBQ2xFLGdCQUFnQixFQUFFLElBQUk7Z0JBQ3RCLFNBQVMsRUFBRSxnQkFBZ0I7Z0JBQzNCLGtCQUFrQixFQUFFLFNBQVM7Z0JBQzdCLGlCQUFpQixFQUFFLE1BQU07Z0JBQ3pCLGlCQUFpQixFQUFFLE1BQU07YUFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFNBQVM7Z0JBQ2YsSUFBSSxTQUFTLENBQUMsT0FBTyxLQUFLLFFBQVEsSUFBSSxTQUFTLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtvQkFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ2hDO3FCQUFNLElBQUksU0FBUyxFQUFFO29CQUNwQixNQUFNLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7b0JBQ3ZDLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzFCO1lBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSztnQkFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsOEJBQThCO1lBQ3BELENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFFSCxDQUFDO0lBRUQsNkNBQWEsR0FBYixVQUFjLE1BQU07UUFBcEIsaUJBc0JDO1FBckJDLElBQUksQ0FBQztZQUNILEtBQUssRUFBRSxnQkFBZ0I7WUFDdkIsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsa0NBQWtDLEdBQUcsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsR0FBRyxFQUFFO1lBQ3hGLEtBQUssRUFBRSxNQUFNO1lBQ2IsZ0JBQWdCLEVBQUUsc0JBQXNCO1lBQ3hDLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsU0FBUyxFQUFFLGdCQUFnQjtZQUMzQixrQkFBa0IsRUFBRSxTQUFTO1lBQzdCLGlCQUFpQixFQUFFLE1BQU07WUFDekIsaUJBQWlCLEVBQUUsTUFBTTtTQUMxQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsU0FBUztZQUNmLElBQUksU0FBUyxDQUFDLE9BQU8sS0FBSyxRQUFRLElBQUksU0FBUyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7Z0JBQ3JFLFdBQVc7YUFDWjtpQkFBTSxJQUFJLFNBQVMsRUFBRTtnQkFDcEIsTUFBTSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO2dCQUN2QyxLQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzFCO1FBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSztZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyw4QkFBOEI7UUFDcEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsMkNBQVcsR0FBWCxVQUFZLE1BQU07UUFBbEIsaUJBeUNDO1FBeENDLElBQUksTUFBTSxDQUFDLGFBQWEsSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLGFBQWEsS0FBSyxFQUFFLEVBQUU7WUFDL0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM1QjthQUFNO1lBQ0wsSUFBSSxDQUFDO2dCQUNILEtBQUssRUFBRSxtQkFBbUIsR0FBRyxNQUFNLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUk7Z0JBQzVFLElBQUksRUFBRSxtREFBbUQsR0FBRyxNQUFNLENBQUMsYUFBYSxHQUFHLEdBQUc7Z0JBQ3RGLElBQUksRUFBRSxVQUFVO2dCQUNoQixnQkFBZ0IsRUFBRSxJQUFJO2dCQUN0QixrQkFBa0IsRUFBRSxTQUFTO2dCQUM3QixpQkFBaUIsRUFBRSxNQUFNO2dCQUN6QixpQkFBaUIsRUFBRSxnQkFBZ0I7YUFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFNBQVM7Z0JBQ2YsSUFBSSxTQUFTLENBQUMsT0FBTyxLQUFLLFFBQVEsSUFBSSxTQUFTLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtvQkFDckUsV0FBVztpQkFDWjtxQkFBTSxJQUFJLFNBQVMsRUFBRTtvQkFDcEIsSUFBSSxDQUFDO3dCQUNILEtBQUssRUFBRSxpQkFBaUI7cUJBQ3pCLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ25CLEtBQUksQ0FBQyxjQUFjO3lCQUNoQixPQUFPLENBQUMsTUFBTSxDQUFDO3lCQUNmLElBQUksQ0FBQyxVQUFBLE1BQU07d0JBQ1YsSUFBSyxNQUFjLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTs0QkFDdEMsS0FBSSxDQUFDLGlCQUFpQixDQUFFLE1BQWMsQ0FBQyxDQUFDO3lCQUN6Qzs2QkFBTSxJQUFLLE1BQWMsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFOzRCQUMvQyxLQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3lCQUMzQzs2QkFBTTs0QkFDTCxJQUFJLENBQ0YsT0FBTyxFQUNQLHlDQUF5QyxFQUN6QyxPQUFPLENBQ1IsQ0FBQzt5QkFDSDtvQkFDSCxDQUFDLENBQUM7eUJBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQyxDQUFDLDhCQUE4QjtpQkFDdEU7WUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLO2dCQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyw4QkFBOEI7WUFDcEQsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCxxREFBcUIsR0FBckIsVUFBc0IsTUFBTTtRQUE1QixpQkE0QkM7UUEzQkMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxhQUFhO2FBQ2YscUJBQXFCLENBQUMsTUFBTSxDQUFDO2FBQzdCLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDVixJQUFLLE1BQWMsQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO2dCQUN0QyxLQUFJLENBQUMsaUJBQWlCLENBQUUsTUFBYyxDQUFDLENBQUM7YUFDekM7aUJBQU0sSUFBSyxNQUFjLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtnQkFDL0MsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFuQixDQUFtQixDQUFDLENBQUM7Z0JBQ3ZELEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBdkUsQ0FBdUUsQ0FBQyxDQUFDO2dCQUM3RyxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxFQUE1RixDQUE0RixDQUFDLENBQUM7Z0JBQ2xJLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzFHLElBQUksQ0FDRixZQUFZLEVBQ1oseURBQXlELEVBQ3pELFNBQVMsQ0FDVixDQUFDO2dCQUNGLHNDQUFzQztnQkFDdEMsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUNyQztpQkFBTTtnQkFDTCxJQUFJLENBQ0YsT0FBTyxFQUNQLHlDQUF5QyxFQUN6QyxPQUFPLENBQ1IsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsa0RBQWtCLEdBQWxCLFVBQW1CLE1BQU07UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxpQ0FBZSxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM3QyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFDLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQ2hELElBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQ2xELElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztRQUNoRCxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztRQUNqRCxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQyxJQUFJLENBQUMsZUFBZSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztRQUNsRCxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDO0lBQ2xDLENBQUM7SUFFRCwrQ0FBZSxHQUFmLFVBQWdCLE1BQU07UUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDekIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzlDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVELElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFBRTtnQkFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDckI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDcEI7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUQsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO2dCQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUNyQjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUNwQjtTQUNGO1FBQ0QsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3hELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlFLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFBRTtnQkFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDckI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDcEI7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUUsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO2dCQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUNyQjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUNwQjtTQUNGO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztJQUNsQyxDQUFDO0lBRUQsaURBQWlCLEdBQWpCO1FBQUEsaUJBaUVDO1FBaEVDLElBQUksQ0FBQztZQUNILEtBQUssRUFBRSxhQUFhO1NBQ3JCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUQsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtZQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7U0FDekQ7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztTQUN6RDtRQUNELElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1NBQ3ZEO1FBQ0QsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlFLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDO1NBQzdFO2FBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRTtZQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUM7U0FDN0U7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQztTQUMzRTtRQUNELElBQUksQ0FBQyxhQUFhO2FBQ2YsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUNsQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1YsSUFBSyxNQUFjLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtnQkFDdEMsS0FBSSxDQUFDLGlCQUFpQixDQUFFLE1BQWMsQ0FBQyxDQUFDO2FBQ3pDO2lCQUFNLElBQUssTUFBYyxDQUFDLEdBQUcsS0FBSyw2QkFBNkIsRUFBRTtnQkFDaEUsSUFBSSxDQUNGLGdCQUFnQixFQUNoQixvQ0FBb0MsRUFDcEMsU0FBUyxDQUNWLENBQUM7YUFDSDtpQkFBTSxJQUFLLE1BQWMsQ0FBQyxHQUFHLEtBQUssMEJBQTBCLEVBQUU7Z0JBQzdELElBQUksQ0FDRixjQUFjLEVBQ2QsaUNBQWlDLEVBQ2pDLFNBQVMsQ0FDVixDQUFDO2FBQ0g7aUJBQU0sSUFBSyxNQUFjLENBQUMsR0FBRyxLQUFLLHlCQUF5QixFQUFFO2dCQUM1RCxJQUFJLENBQ0Ysd0JBQXdCLEVBQ3hCLDhCQUE4QixFQUM5QixTQUFTLENBQ1YsQ0FBQztnQkFDRixLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUM7YUFDakQ7aUJBQU0sSUFBSyxNQUFjLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtnQkFDL0MsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3hCLElBQUksQ0FDRixVQUFVLEVBQ1Ysc0NBQXNDLEVBQ3RDLFNBQVMsQ0FDVixDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsSUFBSSxDQUNGLE9BQU8sRUFDUCx5Q0FBeUMsRUFDekMsT0FBTyxDQUNSLENBQUM7YUFDSDtRQUNILENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFsQixDQUFrQixDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELCtDQUFlLEdBQWYsVUFBZ0IsTUFBTTtRQUNwQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFekUsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO2dCQUNyRCxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO29CQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztpQkFDdEM7cUJBQU0sSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sRUFBRTtvQkFDcEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7aUJBQ3ZDO3FCQUFNLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUU7b0JBQ2hELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO2lCQUN2QzthQUNGO1NBQ0Y7UUFDRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDO0lBQ2xDLENBQUM7SUFFRCwrQ0FBZSxHQUFmO1FBQUEsaUJBNkRDO1FBNURDLElBQUksQ0FBQztZQUNILEtBQUssRUFBRSxXQUFXO1NBQ25CLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ3RELElBQUksQ0FBQyxhQUFhO2lCQUNmLGlCQUFpQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7aUJBQ3ZDLElBQUksQ0FBQyxVQUFBLE1BQU07Z0JBQ1YsSUFBSyxNQUFjLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtvQkFDdEMsS0FBSSxDQUFDLGlCQUFpQixDQUFFLE1BQWMsQ0FBQyxDQUFDO2lCQUN6QztxQkFBTSxJQUFLLE1BQWMsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO29CQUMvQyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO29CQUNqQyxJQUFJLENBQ0YsVUFBVSxFQUNWLDJCQUEyQixFQUMzQixTQUFTLENBQ1YsQ0FBQztpQkFDSDtxQkFBTTtvQkFDTCxJQUFJLENBQ0YsT0FBTyxFQUNQLHlDQUF5QyxFQUN6QyxPQUFPLENBQ1IsQ0FBQztpQkFDSDtZQUNILENBQUMsQ0FBQztpQkFDRCxLQUFLLEVBQUUsQ0FBQztTQUNaO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUN0RCxJQUFJLENBQUMsYUFBYTtpQkFDZixjQUFjLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxlQUFlLENBQUM7aUJBQzVELElBQUksQ0FBQyxVQUFBLE1BQU07Z0JBQ1YsSUFBSyxNQUFjLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtvQkFDdEMsS0FBSSxDQUFDLGlCQUFpQixDQUFFLE1BQWMsQ0FBQyxDQUFDO2lCQUN6QztxQkFBTSxJQUFLLE1BQWMsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO29CQUMvQyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4Qix3RkFBd0Y7b0JBQ3hGLHlDQUF5QztvQkFDekMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztvQkFDakMsSUFBSSxDQUNGLFVBQVUsRUFDViwrQkFBK0IsRUFDL0IsU0FBUyxDQUNWLENBQUM7aUJBQ0g7cUJBQU07b0JBQ0wsSUFBSSxDQUNGLE9BQU8sRUFDUCx5Q0FBeUMsRUFDekMsT0FBTyxDQUNSLENBQUM7aUJBQ0g7WUFDSCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQztTQUN2QztJQUVILENBQUM7SUFFRCx5Q0FBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFRCwyQ0FBVyxHQUFYO1FBQ0UsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLFNBQVM7UUFDVCxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxLQUFLLG9CQUFvQixFQUFFO1lBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7U0FBRTthQUFNLElBQy9GLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxLQUFLLGFBQWEsRUFBRTtZQUFFLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1NBQUU7YUFBTSxJQUN2RixJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsS0FBSyxrQkFBa0IsRUFBRTtZQUFFLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1NBQUU7UUFFekYsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztTQUFFO2FBQU0sSUFDMUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEtBQUssd0NBQXdDLEVBQUU7WUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztTQUFFO2FBQU0sSUFDN0csSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEtBQUssS0FBSyxFQUFFO1lBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7U0FBRTtRQUV2RSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxLQUFLLGlCQUFpQixFQUFFO1lBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7U0FBRTthQUFNLElBQzdGLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxLQUFLLFdBQVcsRUFBRTtZQUFFLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1NBQUU7YUFBTSxJQUN0RixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsS0FBSyxrQkFBa0IsRUFBRTtZQUFFLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1NBQUU7UUFFMUYsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsS0FBSyxrQ0FBa0MsRUFBRTtZQUFFLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1NBQUU7YUFBTSxJQUM5RyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsS0FBSyw0QkFBNEIsRUFBRTtZQUFFLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1NBQUU7YUFBTSxJQUN2RyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsS0FBSyxtQkFBbUIsRUFBRTtZQUFFLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1NBQUU7UUFFM0YsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsS0FBSyxhQUFhLEVBQUU7WUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztTQUFFO2FBQU0sSUFDcEYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEtBQUssbUJBQW1CLEVBQUU7WUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztTQUFFO2FBQU0sSUFDekYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEtBQUssbUJBQW1CLEVBQUU7WUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztTQUFFO1FBRXRGLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEtBQUssSUFBSSxFQUFFO1lBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7U0FBRTthQUFNLElBQzdFLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxLQUFLLElBQUksRUFBRTtZQUFFLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1NBQUU7YUFBTSxJQUM1RSxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksS0FBSyxNQUFNLEVBQUU7WUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztTQUFFO2FBQU0sSUFDOUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEtBQUssWUFBWSxFQUFFO1lBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7U0FBRTthQUFNLElBQ3BGLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxLQUFLLGVBQWUsRUFBRTtZQUFFLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1NBQUU7YUFBTSxJQUN2RixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksS0FBSyxlQUFlLEVBQUU7WUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztTQUFFO2FBQU0sSUFDdkYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEtBQUssV0FBVyxFQUFFO1lBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7U0FBRTthQUFNLElBQ25GLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxLQUFLLHNCQUFzQixFQUFFO1lBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7U0FBRTthQUFNLElBQzlGLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxLQUFLLFVBQVUsRUFBRTtZQUFFLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1NBQUU7YUFBTSxJQUNsRixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksS0FBSyx1QkFBdUIsRUFBRTtZQUFFLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1NBQUU7YUFBTSxJQUMvRixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksS0FBSyxNQUFNLEVBQUU7WUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztTQUFFO1FBRTNFLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEtBQUssaUJBQWlCLEVBQUU7WUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztTQUFFO2FBQU0sSUFDdEYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEtBQUssaUJBQWlCLEVBQUU7WUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztTQUFFO2FBQU0sSUFDckYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEtBQUssaUJBQWlCLEVBQUU7WUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztTQUFFO2FBQU0sSUFDckYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEtBQUssZUFBZSxFQUFFO1lBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7U0FBRTthQUFNLElBQ25GLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxLQUFLLGlCQUFpQixFQUFFO1lBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7U0FBRTtRQUVsRixRQUFRO1FBQ1IsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksS0FBSyxPQUFPLEVBQUU7WUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztTQUFFO2FBQU0sSUFDaEYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEtBQUssTUFBTSxFQUFFO1lBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7U0FBRTthQUFNLElBQzlFLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxLQUFLLGFBQWEsRUFBRTtZQUFFLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1NBQUU7UUFFbEYsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsS0FBSyw2QkFBNkIsRUFBRTtZQUFFLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1NBQUU7YUFBTSxJQUNyRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsS0FBSyxzQkFBc0IsRUFBRTtZQUFFLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1NBQUU7YUFBTSxJQUM3RixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsS0FBSyxxQkFBcUIsRUFBRTtZQUFFLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1NBQUU7UUFFekYsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksS0FBSyxJQUFJLEVBQUU7WUFBRSxZQUFZLEVBQUUsQ0FBQztTQUFFO1FBQ25FLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsS0FBSyxJQUFJLEVBQUU7WUFBRSxZQUFZLEVBQUUsQ0FBQztTQUFFO1FBQ3pFLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsS0FBSyxJQUFJLEVBQUU7WUFBRSxZQUFZLEVBQUUsQ0FBQztTQUFFO1FBQzFFLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEtBQUssSUFBSSxFQUFFO1lBQUUsWUFBWSxFQUFFLENBQUM7U0FBRTtRQUNyRSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxLQUFLLElBQUksRUFBRTtZQUFFLFlBQVksRUFBRSxDQUFDO1NBQUU7UUFDckUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsS0FBSyxJQUFJLEVBQUU7WUFBRSxZQUFZLEVBQUUsQ0FBQztTQUFFO1FBQ3BFLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsS0FBSyxJQUFJLEVBQUU7WUFBRSxZQUFZLEVBQUUsQ0FBQztTQUFFO1FBQzNFLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEtBQUssSUFBSSxFQUFFO1lBQUUsWUFBWSxFQUFFLENBQUM7U0FBRTtRQUNwRSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxLQUFLLElBQUksRUFBRTtZQUFFLFlBQVksRUFBRSxDQUFDO1NBQUU7UUFDckUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsS0FBSyxJQUFJLEVBQUU7WUFBRSxZQUFZLEVBQUUsQ0FBQztTQUFFO1FBRXJFLElBQUksWUFBWSxJQUFJLENBQUMsSUFBSSxZQUFZLElBQUksQ0FBQyxFQUFFO1lBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7U0FBRTthQUFNLElBQ3hFLFlBQVksSUFBSSxDQUFDLElBQUksWUFBWSxJQUFJLENBQUMsRUFBRTtZQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1NBQUU7YUFBTSxJQUN2RSxZQUFZLElBQUksQ0FBQyxFQUFFO1lBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7U0FBRTtRQUUvQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUV2RCxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxFQUFFO1lBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FBRTtJQUNyRCxDQUFDO0lBRUQsaURBQWlCLEdBQWpCLFVBQWtCLE1BQU0sRUFBRSxVQUFVO1FBQXBDLGlCQXNCQztRQXJCQyxJQUFJLENBQUMsYUFBYTthQUNmLDBCQUEwQixDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUM7YUFDOUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNaLElBQUssTUFBYyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7Z0JBQ3RDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNoQztpQkFBTSxJQUFLLE1BQWMsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUM3QyxLQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztnQkFDM0MsSUFBSSxDQUNGLHVCQUF1QixFQUN2Qix3RUFBd0UsRUFDeEUsU0FBUyxDQUNWLENBQUM7YUFDSDtpQkFBTSxJQUFLLE1BQWMsQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO2dCQUM5QyxLQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztnQkFDM0MsSUFBSSxDQUNGLHNCQUFzQixFQUN0Qix3RUFBd0UsRUFDeEUsUUFBUSxDQUNULENBQUM7YUFDSDtRQUNILENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFsQixDQUFrQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELDhDQUFjLEdBQWQsVUFBZSxNQUFNO1FBQXJCLGlCQTJCQztRQTFCQyxJQUFJLENBQUMsYUFBYTthQUNmLG1CQUFtQixDQUFDLE1BQU0sQ0FBQzthQUMzQixJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1YsSUFBSyxNQUFjLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtnQkFDdEMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2hDO2lCQUFNLElBQUssTUFBYyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQy9DLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNqQjtpQkFBTTtnQkFDTCxJQUFJLENBQ0YsT0FBTyxFQUNQLHlDQUF5QyxFQUN6QyxPQUFPLENBQ1IsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQztRQUV0QyxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBdkUsQ0FBdUUsQ0FBQyxDQUFDO1lBQzdHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQXJFLENBQXFFLENBQUMsQ0FBQztTQUM1RzthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFoRCxDQUFnRCxDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBckUsQ0FBcUUsQ0FBQyxDQUFDO1NBQzVHO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1RyxDQUFDO0lBRUQsOENBQWMsR0FBZCxVQUFlLEtBQUs7UUFDbEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxvREFBb0IsR0FBcEIsVUFBcUIsTUFBTTtRQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO0lBQ3BDLENBQUM7SUFFRCx5Q0FBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBRUQsaURBQWlCLEdBQWpCLFVBQWtCLEtBQUs7UUFDckIsSUFBSSxDQUNGLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLEdBQUcsRUFDVCxPQUFPLENBQ1IsQ0FBQztJQUNKLENBQUM7SUFFRCxzQ0FBTSxHQUFOO1FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBcjBCUTtRQUFSLFlBQUssRUFBRTtrQ0FBa0IsaUNBQWU7a0VBQUM7SUE1Qi9CLHFCQUFxQjtRQU5qQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGVBQWU7WUFDekIsV0FBVyxFQUFFLDZEQUE2RDtZQUMxRSxTQUFTLEVBQUUsQ0FBQyw0REFBNEQsQ0FBQztTQUMxRSxDQUFDO1FBc0VDLFdBQUEsYUFBTSxDQUFDLDJCQUFRLENBQUMsQ0FBQTt5Q0FBbUIsUUFBUTtZQUM1QixlQUFNO1lBQ0MsOEJBQWE7WUFDWixnQ0FBYztZQUNqQixvQ0FBVztZQUNWLDRCQUFZO09BekV2QixxQkFBcUIsQ0FrMkJqQztJQUFELDRCQUFDO0NBbDJCRCxBQWsyQkMsSUFBQTtBQWwyQlksc0RBQXFCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2NsaWVudC1zdGF0dXMvY2xpZW50LXN0YXR1cy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NsaWVudFwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdHVkZW50XCI7XHJcbmltcG9ydCB7IFN1aXRhYmlsaXR5Rm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3VpdGFiaWxpdHlGb3JtXCI7XHJcbmltcG9ydCB7IENvbnNlbnRGb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb25zZW50Rm9ybVwiO1xyXG5pbXBvcnQgeyBMZWFybmluZ1N0eWxlRm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvbGVhcm5pbmdTdHlsZUZvcm1cIjtcclxuaW1wb3J0IHsgQ2xpZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jbGllbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBGaWxlc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmlsZXMuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcbmRlY2xhcmUgdmFyIEZpbGVTYXZlcjogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdjbGllbnQtc3RhdHVzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvY2xpZW50LXN0YXR1cy9jbGllbnQtc3RhdHVzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQ2xpZW50U3RhdHVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBkYXRhOiBhbnlbXTtcclxuICBhbGxDbGllbnRzOiBDbGllbnRbXTtcclxuICBzdWl0YWJpbGl0eUZvcm1zOiBTdWl0YWJpbGl0eUZvcm1bXTtcclxuICBjb25zZW50Rm9ybXM6IENvbnNlbnRGb3JtW107XHJcbiAgbGVhcm5pbmdTdHlsZUZvcm1zOiBMZWFybmluZ1N0eWxlRm9ybVtdO1xyXG4gIGNsaWVudFRvdGFsOiBhbnk7XHJcbiAgYWN0aW9uSXRlbXM6IGFueVtdO1xyXG4gIGVycm9yOiBhbnk7XHJcblxyXG4gIGNsaWVudFZpZXc6IENsaWVudDtcclxuICBjdXJyZW50Q2xpZW50RW1haWw6IHN0cmluZztcclxuICBjbGllbnRFZGl0OiBDbGllbnQ7XHJcbiAgcGhvbmUxOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcGhvbmUyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgbG9uZzE6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBsb25nMjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGNvbnNlbnRWaWV3OiBDb25zZW50Rm9ybTtcclxuICBzZWxlY3RlZENvbnNlbnRGb3JtOiBzdHJpbmc7XHJcbiAgY2xpZW50Q29uc2VudEZvcm1zOiBDb25zZW50Rm9ybVtdO1xyXG4gIHN1aXRhYmlsaXR5VmlldzogU3VpdGFiaWxpdHlGb3JtO1xyXG4gIGxlYXJuaW5nU3R5bGVWaWV3OiBMZWFybmluZ1N0eWxlRm9ybTtcclxuXHJcbiAgc2hvd1N1aXRhYmlsaXR5RWRpdDogYm9vbGVhbjtcclxuICBzaG93R2VuZXJhbEluZm9FZGl0OiBib29sZWFuO1xyXG4gIHNob3dBc3Nlc3NtZW50UmVzdWx0czogYm9vbGVhbjtcclxuXHJcbiAgYWRkU3VpdGFiaWxpdHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBzdWl0YWJpbGl0eUZvcm06IFN1aXRhYmlsaXR5Rm9ybTtcclxuICBjbGllbnRTdWl0YWJpbGl0eTogQ2xpZW50W107XHJcbiAgd2FybmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGNhbGN1bGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwYXJ0QVBvaW50cyA9IDA7XHJcbiAgcGFydEJQb2ludHMgPSAwO1xyXG4gIHRvdGFsUG9pbnRzID0gMDtcclxuXHJcbiAgc3RhdHVzUmVwb3J0OiBib29sZWFuID0gdHJ1ZTtcclxuICBzaG93R2VuZXJhbDogYm9vbGVhbiA9IHRydWU7XHJcbiAgc2hvd1N1aXRhYmlsaXR5OiBib29sZWFuO1xyXG4gIHNob3dDb25zZW50OiBib29sZWFuO1xyXG4gIHNob3dMZWFybmluZ1N0eWxlOiBib29sZWFuO1xyXG4gIHNob3dGaWxlczogYm9vbGVhbjtcclxuXHJcbiAgLy9kb3VnaG51dCBjaGFydCAoY2xpZW50IHN0YXR1cylcclxuICBkb3VnaG51dENoYXJ0TGFiZWxzOiBzdHJpbmdbXTtcclxuICBkb3VnaG51dENoYXJ0RGF0YTogbnVtYmVyW107XHJcbiAgZG91Z2hudXRDaGFydFR5cGU6IHN0cmluZztcclxuICBkb3VnaG51dENoYXJ0Q29sb3JzOiBhbnlbXSA9IFt7IGJhY2tncm91bmRDb2xvcjogW1wiI0ZGNDIwN1wiLCBcIiNGOEU5MDNcIiwgXCIjMzA5RUZGXCIsIFwiIzJBRDMwOFwiXSB9XTtcclxuICBzdGFnZTE6IGFueTtcclxuICBzdGFnZTI6IGFueTtcclxuICBzdGFnZTM6IGFueTtcclxuICBzdGFnZTQ6IGFueTtcclxuXHJcbiAgZmlsZXM6IGFueVtdO1xyXG4gIGNsaWVudEZpbGVzOiBhbnlbXTtcclxuXHJcbiAgLy9iYXIgY2hhcnQgKGxlYXJuaW5nIHN0eWxlKVxyXG4gIGJhckNoYXJ0T3B0aW9uczogYW55ID0ge1xyXG4gICAgc2NhbGVTaG93VmVydGljYWxMaW5lczogZmFsc2UsXHJcbiAgICByZXNwb25zaXZlOiB0cnVlXHJcbiAgfTtcclxuICBiYXJDaGFydExhYmVsczogc3RyaW5nW10gPSBbJ0hlYXJpbmcnLCAnU2VlaW5nJywgJ0RvaW5nJ107XHJcbiAgYmFyQ2hhcnRUeXBlOiBzdHJpbmcgPSAnYmFyJztcclxuICBiYXJDaGFydExlZ2VuZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGJhckNoYXJ0RGF0YTogYW55O1xyXG4gIGJhckNoYXJ0Q29sb3JzOiBhbnlbXSA9IFt7IGJhY2tncm91bmRDb2xvcjogW1wiI0ZGNDIwN1wiLCBcIiNGOEU5MDNcIiwgXCIjMkFEMzA4XCJdIH1dO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcclxuICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gIHByaXZhdGUgY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSxcclxuICBwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSxcclxuICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcclxuICBwcml2YXRlIGZpbGVzU2VydmljZTogRmlsZXNTZXJ2aWNlKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZ2V0Q2xpZW50cygpO1xyXG4gICAgdGhpcy5nZXRGaWxlcygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2xpZW50cygpIHtcclxuICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAuZ2V0Q2xpZW50cygpXHJcbiAgICAgIC50aGVuKG9iamVjdHMgPT4ge1xyXG4gICAgICAgIGlmICgob2JqZWN0cyBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5kYXRhID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQob2JqZWN0cyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc2V0RGF0YShvYmplY3RzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgc2V0RGF0YShvYmplY3RzKSB7XHJcbiAgICB0aGlzLmRhdGEgPSBvYmplY3RzLmNsaWVudHM7XHJcbiAgICBmb3IgKGxldCBjbGllbnQgb2YgdGhpcy5kYXRhKSB7XHJcbiAgICAgIGNsaWVudC5mdWxsTmFtZSA9IGNsaWVudC5maXJzdE5hbWUgKyBcIiBcIiArIGNsaWVudC5sYXN0TmFtZTtcclxuICAgICAgaWYgKGNsaWVudC5iYW5uZXIgPT0gbnVsbCkge1xyXG4gICAgICAgIGNsaWVudC5iYW5uZXIgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY2xpZW50LmNhbSA9PSBudWxsKSB7XHJcbiAgICAgICAgY2xpZW50LmNhbSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmFsbENsaWVudHMgPSBvYmplY3RzLmNsaWVudHM7XHJcbiAgICB0aGlzLmNsaWVudFRvdGFsID0gb2JqZWN0cy5jbGllbnRzLmxlbmd0aDtcclxuICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtcyA9IG9iamVjdHMuc3VpdGFiaWxpdHlGb3JtcztcclxuICAgIHRoaXMuY29uc2VudEZvcm1zID0gb2JqZWN0cy5jb25zZW50Rm9ybXM7XHJcbiAgICB0aGlzLmxlYXJuaW5nU3R5bGVGb3JtcyA9IG9iamVjdHMubGVhcm5pbmdTdHlsZUZvcm1zO1xyXG4gICAgdGhpcy5zdGFnZTEgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4geC5zdWl0YWJpbGl0eSk7XHJcbiAgICB0aGlzLnN0YWdlMiA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiB4LmNvbnNlbnQgJiYgeC5sZWFybmluZ1N0eWxlKTtcclxuICAgIHRoaXMuc3RhZ2UzID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmICF4LmNvbnNlbnQgJiYgIXgubGVhcm5pbmdTdHlsZSk7XHJcbiAgICB0aGlzLnN0YWdlNCA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmICF4LmxlYXJuaW5nU3R5bGUgJiYgeC5iYW5uZXIgJiYgeC5jYW0pO1xyXG4gICAgdGhpcy5kb3VnaG51dENoYXJ0TGFiZWxzID0gWydTdWl0YWJpbGl0eScsICdDb25zZW50L0xlYXJuaW5nIFN0eWxlJywgJ0Jhbm5lci9DQU0nLCAnVHJhbnNmZXIgUmVhZHknXTtcclxuICAgIHRoaXMuZG91Z2hudXRDaGFydERhdGEgPSBbdGhpcy5zdGFnZTEubGVuZ3RoLCB0aGlzLnN0YWdlMi5sZW5ndGgsIHRoaXMuc3RhZ2UzLmxlbmd0aCwgdGhpcy5zdGFnZTQubGVuZ3RoXTtcclxuICAgIHRoaXMuZG91Z2hudXRDaGFydFR5cGUgPSAnZG91Z2hudXQnO1xyXG4gICAgdGhpcy5hZGRTdWl0YWJpbGl0eSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmlsZXMoKSB7XHJcbiAgICB0aGlzLmZpbGVzU2VydmljZVxyXG4gICAgICAuZ2V0RmlsZXMoKVxyXG4gICAgICAudGhlbihmaWxlcyA9PiB7XHJcbiAgICAgICAgaWYgKChmaWxlcyBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5maWxlcyA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KGZpbGVzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5maWxlcyA9IGZpbGVzO1xyXG4gICAgICAgICAgZm9yIChsZXQgZmlsZSBvZiB0aGlzLmZpbGVzKSB7XHJcbiAgICAgICAgICAgIGZpbGUudXNlcklEID0gK2ZpbGUudXNlcklEO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGRvd25sb2FkKGZpbGUpIHtcclxuICAgIGNvbnNvbGUubG9nKGZpbGUpO1xyXG4gICAgdmFyIGZpbGVuYW1lID0gZmlsZS5taWxsaXNlY29uZHMgKyBcIl9cIiArIGZpbGUudXNlcklEICsgXCJfXCIgKyBmaWxlLmZpbGVuYW1lO1xyXG4gICAgdGhpcy5maWxlc1NlcnZpY2VcclxuICAgICAgLmRvd25sb2FkKGZpbGVuYW1lKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbcmVzcG9uc2VdLCB7IHR5cGU6IFwiYXBwbGljYXRpb24vcGRmXCIgfSk7XHJcbiAgICAgICAgLy9jaGFuZ2UgZG93bmxvYWQucGRmIHRvIHRoZSBuYW1lIG9mIHdoYXRldmVyIHlvdSB3YW50IHlvdXIgZmlsZSB0byBiZVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGJsb2IpO1xyXG4gICAgICAgIHNhdmVBcyhibG9iLCBmaWxlLmZpbGVuYW1lKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUZpbGVBbGVydChmaWxlKSB7XHJcbiAgICB2YXIgZmlsZW5hbWUgPSBmaWxlLm1pbGxpc2Vjb25kcyArIFwiX1wiICsgZmlsZS51c2VySUQgKyBcIl9cIiArIGZpbGUuZmlsZW5hbWU7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdEZWxldGUgZmlsZSAoJyArIGZpbGUuZmlsZW5hbWUgKyAnKT8nLFxyXG4gICAgICB0ZXh0OiBcIllvdSB3b24ndCBiZSBhYmxlIHRvIHJldmVydCB0aGlzIVwiLFxyXG4gICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgZGVsZXRlIGl0ISdcclxuICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICB0aGlzLmRlbGV0ZUZpbGUoZmlsZW5hbWUpO1xyXG4gICAgICB9XHJcbiAgICB9KS5jYXRjaChlcnJvciA9PiBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBkZWxldGVGaWxlKGZpbGVuYW1lKSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIHRoaXMuZmlsZXNTZXJ2aWNlXHJcbiAgICAgIC5kZWxldGUoZmlsZW5hbWUpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgdGhpcy5nZXRGaWxlcygpO1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0RlbGV0ZWQhJyxcclxuICAgICAgICAgICAgJ0ZpbGUgaGFzIGJlZW4gZGVsZXRlZC4nLFxyXG4gICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGFkZEZpbGUoKSB7XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9maWxlLXVwbG9hZCddKTtcclxuICB9XHJcblxyXG4gIGFkZENsaWVudCgpIHtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3N1aXRhYmlsaXR5J10pO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlQWxlcnQoY2xpZW50OiBDbGllbnQpIHtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ0RlbGV0ZSBjbGllbnQgKCcgKyBjbGllbnQuZmlyc3ROYW1lICsgJyAnICsgY2xpZW50Lmxhc3ROYW1lICsgJyk/JyxcclxuICAgICAgdGV4dDogXCJZb3Ugd29uJ3QgYmUgYWJsZSB0byByZXZlcnQgdGhpcyFcIixcclxuICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIGRlbGV0ZSBpdCEnXHJcbiAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhpc0NvbmZpcm0uZGlzbWlzcyk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgdGhpcy5kZWxldGVDbGllbnQoY2xpZW50KTtcclxuICAgICAgfVxyXG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAvL2NvbnNvbGUubG9nKFwiQ2FuY2VsZWRcIik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUNsaWVudChjbGllbnQ6IENsaWVudCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgLmRlbGV0ZShjbGllbnQpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgdGhpcy5zaG93U3RhdHVzUmVwb3J0KCk7XHJcbiAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuZmlsdGVyKGggPT4gaCAhPT0gY2xpZW50KTtcclxuICAgICAgICAgIHRoaXMuYWxsQ2xpZW50cyA9IHRoaXMuYWxsQ2xpZW50cy5maWx0ZXIoaCA9PiBoICE9PSBjbGllbnQpO1xyXG4gICAgICAgICAgdGhpcy5zdGFnZTEgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4geC5zdWl0YWJpbGl0eSk7XHJcbiAgICAgICAgICB0aGlzLnN0YWdlMiA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiB4LmNvbnNlbnQgJiYgeC5sZWFybmluZ1N0eWxlKTtcclxuICAgICAgICAgIHRoaXMuc3RhZ2UzID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmICF4LmNvbnNlbnQgJiYgIXgubGVhcm5pbmdTdHlsZSk7XHJcbiAgICAgICAgICB0aGlzLnN0YWdlNCA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmICF4LmxlYXJuaW5nU3R5bGUgJiYgeC5iYW5uZXIgJiYgeC5jYW0pO1xyXG4gICAgICAgICAgdGhpcy5kb3VnaG51dENoYXJ0RGF0YSA9IFt0aGlzLnN0YWdlMS5sZW5ndGgsIHRoaXMuc3RhZ2UyLmxlbmd0aCwgdGhpcy5zdGFnZTMubGVuZ3RoLCB0aGlzLnN0YWdlNC5sZW5ndGhdO1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0RlbGV0ZWQhJyxcclxuICAgICAgICAgICAgJ0NsaWVudCByZWNvcmQgaGFzIGJlZW4gZGVsZXRlZC4nLFxyXG4gICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB0aGlzLmNsaWVudFRvdGFsID0gdGhpcy5kYXRhLmxlbmd0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIHNob3dDbGllbnRWaWV3KGNsaWVudDogQ2xpZW50KSB7XHJcbiAgICB0aGlzLmN1cnJlbnRDbGllbnRFbWFpbCA9IGNsaWVudC5lbWFpbDtcclxuICAgIHRoaXMuY2xpZW50VmlldyA9IGNsaWVudDtcclxuICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICB0aGlzLnNob3dHZW5lcmFsID0gdHJ1ZTtcclxuICAgIHRoaXMuY2xpZW50RmlsZXMgPSB0aGlzLmZpbGVzLmZpbHRlcih4ID0+IHgudXNlcklEID09PSB0aGlzLmNsaWVudFZpZXcudXNlcklEKTtcclxuICAgIHZhciBzdWl0YWJpbGl0eUZvcm0gPSB0aGlzLmdldFN1aXRhYmlsaXR5Rm9ybUJ5RmlsdGVyKGNsaWVudC51c2VySUQpO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eVZpZXcgPSBzdWl0YWJpbGl0eUZvcm1bMF07XHJcblxyXG4gICAgdmFyIGNvbnNlbnRGb3JtcyA9IHRoaXMuZ2V0Q29uc2VudEZvcm1CeVVzZXJJRChjbGllbnQudXNlcklEKTtcclxuICAgIHRoaXMuY2xpZW50Q29uc2VudEZvcm1zID0gY29uc2VudEZvcm1zO1xyXG4gICAgLy8gdGhpcy5jbGllbnRDb25zZW50Rm9ybXMuc29ydChmdW5jdGlvbiBjb21wYXJlKGEsIGIpIHtcclxuICAgIC8vICAgdmFyIGRhdGVBID0gbmV3IERhdGUoYS5kYXRlLmdldFRpbWUoKSk7XHJcbiAgICAvLyAgIHZhciBkYXRlQiA9IG5ldyBEYXRlKGIuZGF0ZS5nZXRUaW1lKCkpO1xyXG4gICAgLy8gICByZXR1cm4gZGF0ZUEgLSBkYXRlQjtcclxuICAgIC8vIH0pO1xyXG4gICAgLy90aGlzLmNvbnNlbnRWaWV3ID0gY29uc2VudEZvcm1zWzBdO1xyXG5cclxuICAgIHZhciBsZWFybmluZ1N0eWxlRm9ybSA9IHRoaXMuZ2V0TGVhcm5pbmdTdHlsZUZvcm1CeUZpbHRlcihjbGllbnQudXNlcklEKTtcclxuICAgIHRoaXMubGVhcm5pbmdTdHlsZVZpZXcgPSBsZWFybmluZ1N0eWxlRm9ybVswXTtcclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVWaWV3KSB7XHJcbiAgICAgIHRoaXMuYmFyQ2hhcnREYXRhID0gW3sgZGF0YTogW3RoaXMubGVhcm5pbmdTdHlsZVZpZXcuaGVhcmluZywgdGhpcy5sZWFybmluZ1N0eWxlVmlldy5zZWVpbmcsIHRoaXMubGVhcm5pbmdTdHlsZVZpZXcuZG9pbmddIH1dO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0U3VpdGFiaWxpdHlGb3JtQnlGaWx0ZXIoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLnN1aXRhYmlsaXR5Rm9ybXMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IGlkKTtcclxuICB9XHJcblxyXG4gIGdldENvbnNlbnRGb3JtQnlVc2VySUQoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbnNlbnRGb3Jtcy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gaWQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29uc2VudEZvcm1CeUNvbnNlbnRJRChpZCkge1xyXG4gICAgaWQgPSAraWQ7XHJcbiAgICB2YXIgY29uc2VudEZvcm0gPSB0aGlzLmNsaWVudENvbnNlbnRGb3Jtcy5maWx0ZXIoeCA9PiB4LmNvbnNlbnRJRCA9PT0gaWQpO1xyXG4gICAgcmV0dXJuIGNvbnNlbnRGb3JtO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGVhcm5pbmdTdHlsZUZvcm1CeUZpbHRlcihpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGVhcm5pbmdTdHlsZUZvcm1zLmZpbHRlcih4ID0+IHgudXNlcklEID09PSBpZCk7XHJcbiAgfVxyXG5cclxuICBzZWN0aW9uQnRuQ2xpY2tlZChldmVudCwgc2VjdGlvbikge1xyXG4gICAgaWYgKHNlY3Rpb24gPT09IFwiZ2VuZXJhbFwiKSB7XHJcbiAgICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICAgIHRoaXMuc2hvd0dlbmVyYWwgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChzZWN0aW9uID09PSBcInN1aXRhYmlsaXR5XCIpIHtcclxuICAgICAgdGhpcy5yZXNldFZpZXcoKTtcclxuICAgICAgdGhpcy5zaG93U3VpdGFiaWxpdHkgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChzZWN0aW9uID09PSBcImNvbnNlbnRcIikge1xyXG4gICAgICB0aGlzLnJlc2V0VmlldygpO1xyXG4gICAgICB0aGlzLnNob3dDb25zZW50ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAoc2VjdGlvbiA9PT0gXCJsZWFybmluZ1N0eWxlXCIpIHtcclxuICAgICAgdGhpcy5yZXNldFZpZXcoKTtcclxuICAgICAgdGhpcy5zaG93TGVhcm5pbmdTdHlsZSA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHNlY3Rpb24gPT09IFwiZmlsZXNcIikge1xyXG4gICAgICB0aGlzLnJlc2V0VmlldygpO1xyXG4gICAgICB0aGlzLnNob3dGaWxlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzaG93U3RhdHVzUmVwb3J0KCkge1xyXG4gICAgdGhpcy5zaG93U3VpdGFiaWxpdHlFZGl0ID0gZmFsc2U7XHJcbiAgICB0aGlzLnNob3dHZW5lcmFsSW5mb0VkaXQgPSBmYWxzZTtcclxuICAgIHRoaXMuYWRkU3VpdGFiaWxpdHkgPSBmYWxzZTtcclxuICAgIHRoaXMuc3RhdHVzUmVwb3J0ID0gdHJ1ZTtcclxuICAgIHRoaXMuY2xpZW50U3VpdGFiaWxpdHkgPSBudWxsO1xyXG4gICAgdGhpcy5jbGllbnRWaWV3ID0gbnVsbDtcclxuICAgIHRoaXMuYWRkU3VpdGFiaWxpdHkgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNoYXJ0Q2xpY2tlZChlOiBhbnkpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciBpbmRleCA9IGUuYWN0aXZlWzBdLl9pbmRleDtcclxuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5hbGxDbGllbnRzLmZpbHRlcih4ID0+IHguc3VpdGFiaWxpdHkpO1xyXG4gICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAxKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5hbGxDbGllbnRzLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmIHguY29uc2VudCAmJiB4LmxlYXJuaW5nU3R5bGUpO1xyXG4gICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAyKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5hbGxDbGllbnRzLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmICF4LmNvbnNlbnQgJiYgIXgubGVhcm5pbmdTdHlsZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IDMpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmFsbENsaWVudHMuZmlsdGVyKHggPT4gIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiAheC5sZWFybmluZ1N0eWxlICYmIHguYmFubmVyICYmIHguY2FtKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHRoaXMuZGF0YSA9IHRoaXMuYWxsQ2xpZW50cztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoYXJ0SG92ZXJlZChlOiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgfVxyXG5cclxuICBjcmVhdGVBc1N0dWRlbnQoY2xpZW50OiBDbGllbnQpIHtcclxuICAgIGlmIChjbGllbnQuc3R1ZGVudE51bWJlciA9PT0gJ1RCRCcpIHtcclxuICAgICAgdGhpcy5zdHVkZW50TnVtYmVyKGNsaWVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogJ1N0dWRlbnQgTnVtYmVyJyxcclxuICAgICAgICB0eXBlOiAnaW5mbycsXHJcbiAgICAgICAgdGV4dDogJ1ByZXZpb3VzbHkgYXR0ZW5kZWQgZ2VvcmdpYW46ICcgKyBjbGllbnQuc3R1ZGVudE51bWJlcixcclxuICAgICAgICBpbnB1dDogXCJ0ZXh0XCIsXHJcbiAgICAgICAgaW5wdXRQbGFjZWhvbGRlcjogJ1BsZWFzZSByZS1lbnRlciBzdHVkZW50IG51bWJlciBkaXNwbGF5ZWQgYWJvdmUnLFxyXG4gICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgYW5pbWF0aW9uOiBcInNsaWRlLWZyb20tdG9wXCIsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1NhdmUnXHJcbiAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICBpZiAoaXNDb25maXJtLmRpc21pc3MgPT09IFwiY2FuY2VsXCIgfHwgaXNDb25maXJtLmRpc21pc3MgPT09IFwib3ZlcmxheVwiKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhpc0NvbmZpcm0uZGlzbWlzcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgIGNsaWVudC5zdHVkZW50TnVtYmVyID0gaXNDb25maXJtLnZhbHVlO1xyXG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGVydChjbGllbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTsgLy8gVE9ETzogRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHN0dWRlbnROdW1iZXIoY2xpZW50KSB7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdTdHVkZW50IE51bWJlcicsXHJcbiAgICAgIHR5cGU6ICdpbmZvJyxcclxuICAgICAgdGV4dDogJ1BsZWFzZSBlbnRlciBzdHVkZW50IG51bWJlciBmb3IgJyArIGNsaWVudC5maXJzdE5hbWUgKyAnICcgKyBjbGllbnQubGFzdE5hbWUgKyAnJyxcclxuICAgICAgaW5wdXQ6IFwidGV4dFwiLFxyXG4gICAgICBpbnB1dFBsYWNlaG9sZGVyOiBcIkVudGVyIFN0dWRlbnQgTnVtYmVyXCIsXHJcbiAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgIGFuaW1hdGlvbjogXCJzbGlkZS1mcm9tLXRvcFwiLFxyXG4gICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdTYXZlJ1xyXG4gICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICBpZiAoaXNDb25maXJtLmRpc21pc3MgPT09IFwiY2FuY2VsXCIgfHwgaXNDb25maXJtLmRpc21pc3MgPT09IFwib3ZlcmxheVwiKSB7XHJcbiAgICAgICAgLy8gY2FuY2VsZWRcclxuICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICBjbGllbnQuc3R1ZGVudE51bWJlciA9IGlzQ29uZmlybS52YWx1ZTtcclxuICAgICAgICB0aGlzLnJlbW92ZUFsZXJ0KGNsaWVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpOyAvLyBUT0RPOiBEaXNwbGF5IGVycm9yIG1lc3NhZ2VcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQWxlcnQoY2xpZW50KSB7XHJcbiAgICBpZiAoY2xpZW50LnN0dWRlbnROdW1iZXIgPT0gbnVsbCB8fCBjbGllbnQuc3R1ZGVudE51bWJlciA9PT0gJycpIHtcclxuICAgICAgdGhpcy5zdHVkZW50TnVtYmVyKGNsaWVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogJ1RyYW5zZmVyIGNsaWVudCAoJyArIGNsaWVudC5maXJzdE5hbWUgKyAnICcgKyBjbGllbnQubGFzdE5hbWUgKyAnKT8nLFxyXG4gICAgICAgIHRleHQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY3JlYXRlIGFzIHN0dWRlbnQgd2l0aCAjJyArIGNsaWVudC5zdHVkZW50TnVtYmVyICsgJz8nLFxyXG4gICAgICAgIHR5cGU6ICdxdWVzdGlvbicsXHJcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCB0cmFuc2ZlciEnXHJcbiAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICBpZiAoaXNDb25maXJtLmRpc21pc3MgPT09IFwiY2FuY2VsXCIgfHwgaXNDb25maXJtLmRpc21pc3MgPT09IFwib3ZlcmxheVwiKSB7XHJcbiAgICAgICAgICAvLyBjYW5jZWxlZFxyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgdGl0bGU6ICdUcmFuc2ZlcnJpbmcuLi4nXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgICAgLnBvc3ROZXcoY2xpZW50KVxyXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KChyZXN1bHQgYXMgYW55KSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbUNsaWVudFRhYmxlKGNsaWVudC51c2VySUQpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpOyAvLyBUT0RPOiBEaXNwbGF5IGVycm9yIG1lc3NhZ2VcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7IC8vIFRPRE86IERpc3BsYXkgZXJyb3IgbWVzc2FnZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb21DbGllbnRUYWJsZSh1c2VySUQpOiB2b2lkIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgIC5yZW1vdmVGcm9tQ2xpZW50VGFibGUodXNlcklEKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KChyZXN1bHQgYXMgYW55KSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoaCA9PiBoLnVzZXJJRCAhPT0gdXNlcklEKTtcclxuICAgICAgICAgIHRoaXMuc3RhZ2UzID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+IHgudXNlcklEICE9PSB1c2VySUQgJiYgIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiAheC5sZWFybmluZ1N0eWxlKTtcclxuICAgICAgICAgIHRoaXMuc3RhZ2U0ID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+IHgudXNlcklEICE9PSB1c2VySUQgJiYgIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiAheC5sZWFybmluZ1N0eWxlICYmIHguYmFubmVyICYmIHguY2FtKTtcclxuICAgICAgICAgIHRoaXMuZG91Z2hudXRDaGFydERhdGEgPSBbdGhpcy5zdGFnZTEubGVuZ3RoLCB0aGlzLnN0YWdlMi5sZW5ndGgsIHRoaXMuc3RhZ2UzLmxlbmd0aCwgdGhpcy5zdGFnZTQubGVuZ3RoXTtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdUcmFuc2ZlcmVkJyxcclxuICAgICAgICAgICAgJ0NsaWVudCByZWNvcmQgaGFzIGJlZW4gdHJhbnNmZXJlZCB0byB0aGUgc3R1ZGVudCB0YWJsZS4nLFxyXG4gICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFsnL3N0dWRlbnRzJ10pO1xyXG4gICAgICAgICAgdGhpcy5jbGllbnRUb3RhbCA9IHRoaXMuZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBhZGRTdWl0YWJpbGl0eUluZm8oY2xpZW50KSB7XHJcbiAgICB0aGlzLmNsaWVudFZpZXcgPSBjbGllbnQ7XHJcbiAgICB0aGlzLmFkZFN1aXRhYmlsaXR5ID0gdHJ1ZTtcclxuICAgIHRoaXMuc2hvd0dlbmVyYWwgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0NvbnNlbnQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0xlYXJuaW5nU3R5bGUgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5RWRpdCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zdGF0dXNSZXBvcnQgPSBmYWxzZTtcclxuICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtID0gbmV3IFN1aXRhYmlsaXR5Rm9ybSgpO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0udHJhbnNjcmlwdCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uYXBwcm9wcmlhdGVHb2FsID0gZmFsc2U7XHJcbiAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pc1ZhbGlkQWdlID0gZmFsc2U7XHJcbiAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5nb3Zlcm5tZW50SUQgPSBmYWxzZTtcclxuICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLnNjaG9vbFJlZ2lzdHJhdGlvbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uYXZhaWxhYmxlRHVyaW5nQ2xhc3MgPSBmYWxzZTtcclxuICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhlYWx0aCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySW5zdHJ1Y3Rpb25zID0gZmFsc2U7XHJcbiAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JDb21tdW5pY2F0aW9uID0gZmFsc2U7XHJcbiAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JMYW5ndWFnZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yQ29tcHV0ZXIgPSBmYWxzZTtcclxuICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhvdXNpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvclRyYW5zcG9ydGF0aW9uID0gZmFsc2U7XHJcbiAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JEYXljYXJlID0gZmFsc2U7XHJcbiAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JJbnRlcm5ldCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yUGVyc29uYWwgPSBmYWxzZTtcclxuICAgIHRoaXMuY2xpZW50U3VpdGFiaWxpdHkgPSBjbGllbnQ7XHJcbiAgfVxyXG5cclxuICBlZGl0R2VuZXJhbEluZm8oY2xpZW50KSB7XHJcbiAgICB0aGlzLnN0YXR1c1JlcG9ydCA9IGZhbHNlO1xyXG4gICAgdGhpcy5jbGllbnRFZGl0ID0gY2xpZW50O1xyXG4gICAgdmFyIHNwbGl0UGhvbmUgPSB0aGlzLmNsaWVudEVkaXQucGhvbmUuc3BsaXQoJyAnKTtcclxuICAgIGlmICh0aGlzLmNsaWVudEVkaXQucGhvbmUuaW5kZXhPZignKzEnKSAhPT0gLTEpIHtcclxuICAgICAgdGhpcy5sb25nMSA9IHRydWU7XHJcbiAgICAgIHRoaXMuY2xpZW50RWRpdC5waG9uZSA9IHNwbGl0UGhvbmVbMV0gKyBcIiBcIiArIHNwbGl0UGhvbmVbMl07XHJcbiAgICAgIGlmIChzcGxpdFBob25lWzNdID09PSAnSG9tZScpIHtcclxuICAgICAgICB0aGlzLnBob25lMSA9IGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGhvbmUxID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sb25nMSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmNsaWVudEVkaXQucGhvbmUgPSBzcGxpdFBob25lWzBdICsgXCIgXCIgKyBzcGxpdFBob25lWzFdO1xyXG4gICAgICBpZiAoc3BsaXRQaG9uZVsyXSA9PT0gJ0hvbWUnKSB7XHJcbiAgICAgICAgdGhpcy5waG9uZTEgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBob25lMSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHZhciBzcGxpdEFsdGVybmF0ZSA9IHRoaXMuY2xpZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIuc3BsaXQoJyAnKTtcclxuICAgIGlmICh0aGlzLmNsaWVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyLmluZGV4T2YoJysxJykgIT09IC0xKSB7XHJcbiAgICAgIHRoaXMubG9uZzIgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNsaWVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyID0gc3BsaXRBbHRlcm5hdGVbMV0gKyBcIiBcIiArIHNwbGl0QWx0ZXJuYXRlWzJdO1xyXG4gICAgICBpZiAoc3BsaXRBbHRlcm5hdGVbM10gPT09ICdIb21lJykge1xyXG4gICAgICAgIHRoaXMucGhvbmUyID0gZmFsc2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5waG9uZTIgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxvbmcyID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuY2xpZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgPSBzcGxpdEFsdGVybmF0ZVswXSArIFwiIFwiICsgc3BsaXRBbHRlcm5hdGVbMV07XHJcbiAgICAgIGlmIChzcGxpdEFsdGVybmF0ZVsyXSA9PT0gJ0hvbWUnKSB7XHJcbiAgICAgICAgdGhpcy5waG9uZTIgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBob25lMiA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc2hvd0dlbmVyYWwgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0dlbmVyYWxJbmZvRWRpdCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVHZW5lcmFsSW5mbygpIHtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ1VwZGF0aW5nLi4uJ1xyXG4gICAgfSk7XHJcbiAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICB2YXIgcGhvbmVTcGxpdCA9IHRoaXMuY2xpZW50RWRpdC5waG9uZS5zcGxpdCgnICcpO1xyXG4gICAgdGhpcy5jbGllbnRFZGl0LnBob25lID0gcGhvbmVTcGxpdFswXSArIFwiIFwiICsgcGhvbmVTcGxpdFsxXTtcclxuICAgIGlmICh0aGlzLnBob25lMSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmNsaWVudEVkaXQucGhvbmUgPSB0aGlzLmNsaWVudEVkaXQucGhvbmUgKyBcIiBDZWxsXCI7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucGhvbmUxID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLmNsaWVudEVkaXQucGhvbmUgPSB0aGlzLmNsaWVudEVkaXQucGhvbmUgKyBcIiBIb21lXCI7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5sb25nMSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmNsaWVudEVkaXQucGhvbmUgPSBcIisxIFwiICsgdGhpcy5jbGllbnRFZGl0LnBob25lO1xyXG4gICAgfVxyXG4gICAgdmFyIGFsdGVybmF0ZVNwbGl0ID0gdGhpcy5jbGllbnRFZGl0LmFsdGVybmF0ZU51bWJlci5zcGxpdCgnICcpO1xyXG4gICAgdGhpcy5jbGllbnRFZGl0LmFsdGVybmF0ZU51bWJlciA9IGFsdGVybmF0ZVNwbGl0WzBdICsgXCIgXCIgKyBhbHRlcm5hdGVTcGxpdFsxXTtcclxuICAgIGlmICh0aGlzLnBob25lMiA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmNsaWVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyID0gdGhpcy5jbGllbnRFZGl0LmFsdGVybmF0ZU51bWJlciArIFwiIENlbGxcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5waG9uZTIgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuY2xpZW50RWRpdC5hbHRlcm5hdGVOdW1iZXIgPSB0aGlzLmNsaWVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyICsgXCIgSG9tZVwiO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubG9uZzIgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5jbGllbnRFZGl0LmFsdGVybmF0ZU51bWJlciA9IFwiKzEgXCIgKyB0aGlzLmNsaWVudEVkaXQuYWx0ZXJuYXRlTnVtYmVyO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgIC51cGRhdGVHZW5lcmFsSW5mbyh0aGlzLmNsaWVudEVkaXQpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoKHJlc3VsdCBhcyBhbnkpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5tc2cgPT09IFwiVXNlcm5hbWUgaXMgYWxyZWFkeSBpbiB1c2UuXCIpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdVc2VybmFtZSB0YWtlbicsXHJcbiAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBkaWZmZXJlbnQgdXNlcm5hbWUuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLm1zZyA9PT0gXCJFbWFpbCBpcyBhbHJlYWR5IGluIHVzZS5cIikge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0VtYWlsIGluIHVzZScsXHJcbiAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBkaWZmZXJlbnQgZW1haWwuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLm1zZyA9PT0gXCJJbmNvcnJlY3QgZW1haWwgZm9ybWF0LlwiKSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnSW5jb3JyZWN0IGVtYWlsIGZvcm1hdCcsXHJcbiAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBwcm9wZXIgZW1haWwuJyxcclxuICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpcy5jbGllbnRWaWV3LmVtYWlsID0gdGhpcy5jdXJyZW50Q2xpZW50RW1haWw7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgIHRoaXMuc2hvd1N0YXR1c1JlcG9ydCgpO1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ1N1Y2Nlc3MhJyxcclxuICAgICAgICAgICAgJ0NsaWVudCBpbmZvcm1hdGlvbiBoYXMgYmVlbiB1cGRhdGVkIScsXHJcbiAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGVkaXRTdWl0YWJpbGl0eShjbGllbnQpIHtcclxuICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICB0aGlzLnNob3dTdWl0YWJpbGl0eUVkaXQgPSB0cnVlO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0gPSB0aGlzLmdldFN1aXRhYmlsaXR5Rm9ybUJ5RmlsdGVyKGNsaWVudC51c2VySUQpWzBdO1xyXG5cclxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModGhpcy5zdWl0YWJpbGl0eUZvcm0pO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5zdWl0YWJpbGl0eUZvcm1ba2V5c1tpXV0gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm1ba2V5c1tpXV0gPT09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybVtrZXlzW2ldXSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybVtrZXlzW2ldXSA9PT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybVtrZXlzW2ldXSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm1ba2V5c1tpXV0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm1ba2V5c1tpXV0gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuY2xpZW50U3VpdGFiaWxpdHkgPSBjbGllbnQ7XHJcbiAgfVxyXG5cclxuICBzYXZlU3VpdGFiaWxpdHkoKSB7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdTYXZpbmcuLi4nXHJcbiAgICB9KTtcclxuICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5zdWl0YWJpbGl0eUlEKSB7XHJcbiAgICAgIHRoaXMudGFsbHlQb2ludHMoKTtcclxuICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZGJUb3RhbFBvaW50cyA9IHRoaXMudG90YWxQb2ludHM7XHJcbiAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgIC51cGRhdGVTdWl0YWJpbGl0eSh0aGlzLnN1aXRhYmlsaXR5Rm9ybSlcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydCgocmVzdWx0IGFzIGFueSkpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRDbGllbnRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1N0YXR1c1JlcG9ydCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMDtcclxuICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAnU3VjY2VzcyEnLFxyXG4gICAgICAgICAgICAgICdTdWl0YWJpbGl0eSBmb3JtIHVwZGF0ZWQhJyxcclxuICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudGFsbHlQb2ludHMoKTtcclxuICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZGJUb3RhbFBvaW50cyA9IHRoaXMudG90YWxQb2ludHM7XHJcbiAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgIC5hZGRTdWl0YWJpbGl0eSh0aGlzLmNsaWVudFN1aXRhYmlsaXR5LCB0aGlzLnN1aXRhYmlsaXR5Rm9ybSlcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydCgocmVzdWx0IGFzIGFueSkpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRDbGllbnRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1N0YXR1c1JlcG9ydCgpO1xyXG4gICAgICAgICAgICAvLyB2YXIgdXBkYXRlZENsaWVudCA9IHRoaXMuYWxsQ2xpZW50cy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gdGhpcy5jbGllbnRWaWV3LnVzZXJJRCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2hvd0NsaWVudFZpZXcodXBkYXRlZENsaWVudFswXSk7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwO1xyXG4gICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICdTdWNjZXNzIScsXHJcbiAgICAgICAgICAgICAgJ1N1aXRhYmlsaXR5IGZvcm0gaW5pdGlhbGl6ZWQhJyxcclxuICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBjYWxjdWxhdGUoKSB7XHJcbiAgICB0aGlzLnRhbGx5UG9pbnRzKCk7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgdGFsbHlQb2ludHMoKSB7XHJcbiAgICB2YXIgZmFjdG9yUG9pbnRzID0gMDtcclxuICAgIHRoaXMucGFydEFQb2ludHMgPSAwO1xyXG4gICAgdGhpcy5wYXJ0QlBvaW50cyA9IDA7XHJcbiAgICB0aGlzLnRvdGFsUG9pbnRzID0gMDtcclxuICAgIHRoaXMud2FybmluZyA9IGZhbHNlO1xyXG4gICAgLy8gUEFSVCBBXHJcbiAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0ub2ZmZXJTdGFydERhdGUgPT09ICdMZXNzIHRoYW4gb25lIHllYXInKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5vZmZlclN0YXJ0RGF0ZSA9PT0gJ0luIG9uZSB5ZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ub2ZmZXJTdGFydERhdGUgPT09ICdNb3JlIHRoYW4gYSBZZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0ubWVldHNHb2FsID09PSAnTm8nKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5tZWV0c0dvYWwgPT09ICdZZXMgYnV0IGxhY2tzIHNraWxscy9oaWdoIGVub3VnaCBtYXJrcycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLm1lZXRzR29hbCA9PT0gJ1llcycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLnRpbWVPdXRPZlNjaG9vbCA9PT0gJzYgb3IgbW9yZSB5ZWFycycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLnRpbWVPdXRPZlNjaG9vbCA9PT0gJzEtNiB5ZWFycycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLnRpbWVPdXRPZlNjaG9vbCA9PT0gJ0xlc3MgdGhhbiAxIHllYXInKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pblByb2dyYW1CZWZvcmUgPT09ICdOby9MZWZ0IHdpdGggYXBwcm9wcmlhdGUgcmVhc29ucycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluUHJvZ3JhbUJlZm9yZSA9PT0gJ1llcyAtIEFwcHJvcHJpYXRlIHByb2dyZXNzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5Qcm9ncmFtQmVmb3JlID09PSAnWWVzIOKAkyBObyBwcm9ncmVzcycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmVtcGxveW1lbnQgPT09ICdOb3Qgd29ya2luZycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmVtcGxveW1lbnQgPT09ICdXb3JraW5nIHBhcnQgdGltZScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmVtcGxveW1lbnQgPT09ICdXb3JraW5nIGZ1bGwgdGltZScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ0VJJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnT1cnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdPRFNQJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnQ3Jvd24gV2FyZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ1NlbGYtZW1wbG95ZWQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdTZWNvbmQgQ2FyZWVyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnTm8gaW5jb21lJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnRGVwZW5kZW50IG9mIE9XL09EU1AnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdFbXBsb3llZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ0ludGVybmF0aW9uYWwgU3R1ZGVudCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAwOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ1dTSUInKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMDsgfVxyXG5cclxuICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZSA9PT0gJzQ1LTY1IHllYXJzIG9sZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlID09PSAnMTYtMTggeWVhcnMgb2xkJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDA7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2UgPT09ICcxOS0yOSB5ZWFycyBvbGQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZSA9PT0gJzY1KyB5ZWFycyBvbGQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMDsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZSA9PT0gJzMwLTQ0IHllYXJzIG9sZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgLy9QQVJUIEJcclxuICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5ob3Vyc1BlcldlZWsgPT09ICcxMC0yMCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmhvdXJzUGVyV2VlayA9PT0gJzUtMTAnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5ob3Vyc1BlcldlZWsgPT09ICdMZXNzIHRoYW4gNScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLndvcmtIaXN0b3J5ID09PSAnTGVzcyB0aGFuIDEgeWVhciBleHBlcmllbmNlJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ud29ya0hpc3RvcnkgPT09ICcxLTQgeWVhcnMgZXhwZXJpZW5jZScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLndvcmtIaXN0b3J5ID09PSAnNCsgeWVhcnMgZXhwZXJpZW5jZScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhlYWx0aCA9PT0gdHJ1ZSkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3Rvckluc3RydWN0aW9ucyA9PT0gdHJ1ZSkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckNvbW11bmljYXRpb24gPT09IHRydWUpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JMYW5ndWFnZSA9PT0gdHJ1ZSkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckNvbXB1dGVyID09PSB0cnVlKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySG91c2luZyA9PT0gdHJ1ZSkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvclRyYW5zcG9ydGF0aW9uID09PSB0cnVlKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yRGF5Y2FyZSA9PT0gdHJ1ZSkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckludGVybmV0ID09PSB0cnVlKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yUGVyc29uYWwgPT09IHRydWUpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuXHJcbiAgICBpZiAoZmFjdG9yUG9pbnRzID49IDAgJiYgZmFjdG9yUG9pbnRzIDw9IDQpIHsgdGhpcy5wYXJ0QlBvaW50cyA9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAoZmFjdG9yUG9pbnRzID49IDUgJiYgZmFjdG9yUG9pbnRzIDw9IDgpIHsgdGhpcy5wYXJ0QlBvaW50cyA9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAoZmFjdG9yUG9pbnRzID49IDkpIHsgdGhpcy5wYXJ0QlBvaW50cyA9IDE7IH1cclxuXHJcbiAgICB0aGlzLnRvdGFsUG9pbnRzID0gdGhpcy5wYXJ0QVBvaW50cyArIHRoaXMucGFydEJQb2ludHM7XHJcblxyXG4gICAgaWYgKHRoaXMudG90YWxQb2ludHMgPCAxOCkgeyB0aGlzLndhcm5pbmcgPSB0cnVlOyB9XHJcbiAgfVxyXG5cclxuICBhbGxvd0NsaWVudFRvRWRpdChjbGllbnQsIHBlcm1pc3Npb24pIHtcclxuICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAuZ3JhbnRDb25zZW50RWRpdFBlcm1pc3Npb24oY2xpZW50LCBwZXJtaXNzaW9uKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZ3JhbnRlZCcpIHtcclxuICAgICAgICAgIHRoaXMuY2xpZW50Vmlldy5lZGl0Q29uc2VudFJlcXVlc3QgPSBmYWxzZTtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdDbGllbnQgQWNjZXNzIEdyYW50ZWQnLFxyXG4gICAgICAgICAgICAnQ2xpZW50IHdpbGwgYmUgc2VudCBhbiBlbWFpbCBpbmZvcm1pbmcgdGhhdCB0aGV5IGNhbiBub3cgZWRpdCBjb25lc250LicsXHJcbiAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdkZW5pZWQnKSB7XHJcbiAgICAgICAgICB0aGlzLmNsaWVudFZpZXcuZWRpdENvbnNlbnRSZXF1ZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnQ2xpZW50IEFjY2VzcyBEZW5pZWQnLFxyXG4gICAgICAgICAgICAnQ2xpZW50IHdpbGwgYmUgc2VudCBhbiBlbWFpbCBpbmZvcm1pbmcgdGhhdCB0aGV5IGNhbiBOT1QgZWRpdCBjb25lc250LicsXHJcbiAgICAgICAgICAgICdkYW5nZXInXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGNoZWNrYm94Q2hhbmdlKGNsaWVudCkge1xyXG4gICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgIC51cGRhdGVCYW5uZXJDYW1Cb29sKGNsaWVudClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICB0aGlzLm5nT25Jbml0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcblxyXG4gICAgaWYgKGNsaWVudC5iYW5uZXIgJiYgY2xpZW50LmNhbSkge1xyXG4gICAgICB0aGlzLnN0YWdlMyA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmICF4LmxlYXJuaW5nU3R5bGUgJiYgIXguYmFubmVyICYmICF4LmNhbSk7XHJcbiAgICAgIHRoaXMuc3RhZ2U0ID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmICF4LmNvbnNlbnQgJiYgIXgubGVhcm5pbmdTdHlsZSAmJiB4LmJhbm5lciAmJiB4LmNhbSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnN0YWdlMyA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmICF4LmxlYXJuaW5nU3R5bGUpO1xyXG4gICAgICB0aGlzLnN0YWdlNCA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmICF4LmxlYXJuaW5nU3R5bGUgJiYgeC5iYW5uZXIgJiYgeC5jYW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZG91Z2hudXRDaGFydERhdGEgPSBbdGhpcy5zdGFnZTEubGVuZ3RoLCB0aGlzLnN0YWdlMi5sZW5ndGgsIHRoaXMuc3RhZ2UzLmxlbmd0aCwgdGhpcy5zdGFnZTQubGVuZ3RoXTtcclxuICB9XHJcblxyXG4gIG9uU2VsZWN0Q2hhbmdlKGV2ZW50KSB7XHJcbiAgICB2YXIgY29uc2VudEZvcm0gPSB0aGlzLmdldENvbnNlbnRGb3JtQnlDb25zZW50SUQodGhpcy5zZWxlY3RlZENvbnNlbnRGb3JtKTtcclxuICAgIHRoaXMuY29uc2VudFZpZXcgPSBjb25zZW50Rm9ybVswXTtcclxuICB9XHJcblxyXG4gIGFkZEFzc2Vzc21lbnRSZXN1bHRzKGNsaWVudCkge1xyXG4gICAgdGhpcy5zaG93Q2xpZW50VmlldyhjbGllbnQpO1xyXG4gICAgdGhpcy5yZXNldFZpZXcoKTtcclxuICAgIHRoaXMuc2hvd0Fzc2Vzc21lbnRSZXN1bHRzID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHJlc2V0VmlldygpIHtcclxuICAgIHRoaXMuY29uc2VudFZpZXcgPSBudWxsO1xyXG4gICAgdGhpcy5zaG93QXNzZXNzbWVudFJlc3VsdHMgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd0ZpbGVzID0gZmFsc2U7XHJcbiAgICB0aGlzLnN0YXR1c1JlcG9ydCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaG93R2VuZXJhbCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaG93R2VuZXJhbEluZm9FZGl0ID0gZmFsc2U7XHJcbiAgICB0aGlzLnNob3dDb25zZW50ID0gZmFsc2U7XHJcbiAgICB0aGlzLnNob3dMZWFybmluZ1N0eWxlID0gZmFsc2U7XHJcbiAgICB0aGlzLnNob3dTdWl0YWJpbGl0eSA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaG93U3VpdGFiaWxpdHlFZGl0ID0gZmFsc2U7XHJcbiAgICB0aGlzLmFkZFN1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5RXJyb3JBbGVydChlcnJvcikge1xyXG4gICAgc3dhbChcclxuICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgIGVycm9yLm1zZyxcclxuICAgICAgJ2Vycm9yJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
