System.register(["@angular/core", "@angular/router", "../../models/suitabilityForm", "../../services/client.service", "../../services/student.service", "../../services/authentication.service", "../../services/files.service"], function (exports_1, context_1) {
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
    var core_1, router_1, suitabilityForm_1, client_service_1, student_service_1, authentication_service_1, files_service_1, ClientStatusComponent;
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
            function (client_service_1_1) {
                client_service_1 = client_service_1_1;
            },
            function (student_service_1_1) {
                student_service_1 = student_service_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (files_service_1_1) {
                files_service_1 = files_service_1_1;
            }
        ],
        execute: function () {
            ClientStatusComponent = /** @class */ (function () {
                function ClientStatusComponent(router, clientService, studentService, authService, filesService) {
                    this.router = router;
                    this.clientService = clientService;
                    this.studentService = studentService;
                    this.authService = authService;
                    this.filesService = filesService;
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
                        if (objects.status === "403") {
                            _this.data = null;
                        }
                        else {
                            _this.setData(objects);
                        }
                    })
                        .catch(function (error) { return _this.error = error; });
                };
                ClientStatusComponent.prototype.update = function (event) {
                    console.log();
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
                    this.statusReport = true;
                };
                ClientStatusComponent.prototype.getFiles = function () {
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
                        console.log(_this.files);
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
                        .then(function (res) {
                        _this.getFiles();
                        swal('Deleted!', 'File has been deleted.', 'success');
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
                        .then(function (res) {
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
                    })
                        .catch(function (error) { return _this.error = error; });
                };
                ClientStatusComponent.prototype.showClientView = function (client) {
                    var _this = this;
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
                            console.log(isConfirm.dismiss);
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
                                console.log(isConfirm.dismiss);
                            }
                            else if (isConfirm) {
                                swal({
                                    title: 'Transferring...'
                                });
                                swal.showLoading();
                                _this.studentService
                                    .postNew(client)
                                    .then(function (result) {
                                    console.log(result);
                                    if (result.status === 'success') {
                                        _this.removeFromClientTable(client.userID);
                                    }
                                    else {
                                        swal('Error', 'Something went wrong, please try again.', 'warning');
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
                        .then(function (res) {
                        _this.data = _this.data.filter(function (h) { return h.userID !== userID; });
                        _this.stage3 = _this.data.filter(function (x) { return x.userID !== userID && !x.suitability && !x.consent && !x.learningStyle; });
                        _this.stage4 = _this.data.filter(function (x) { return x.userID !== userID && !x.suitability && !x.consent && !x.learningStyle && x.banner && x.cam; });
                        _this.doughnutChartData = [_this.stage1.length, _this.stage2.length, _this.stage3.length, _this.stage4.length];
                        swal.close();
                        swal('Transfered', 'Client record has been transfered to the student table.', 'success');
                        _this.router.navigate(['/students']);
                        //this.clientTotal = this.data.length;
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
                    this.showGeneral = false;
                    this.showGeneralInfoEdit = true;
                };
                ClientStatusComponent.prototype.updateGeneralInfo = function () {
                    var _this = this;
                    swal({
                        title: 'Updating...'
                    });
                    swal.showLoading();
                    this.clientService
                        .updateGeneralInfo(this.clientEdit)
                        .then(function (res) {
                        _this.showGeneralInfoEdit = false;
                        _this.clientView = null;
                        _this.ngOnInit();
                        swal.close();
                    })
                        .catch();
                };
                ClientStatusComponent.prototype.editSuitability = function (client) {
                    this.showGeneralInfoEdit = false;
                    this.statusReport = false;
                    this.showSuitability = false;
                    this.addSuitability = false;
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
                            .then(function (res) {
                            _this.showSuitabilityEdit = false;
                            _this.clientView = null;
                            _this.ngOnInit();
                            swal.close();
                        })
                            .catch();
                    }
                    else {
                        this.tallyPoints();
                        this.suitabilityForm.dbTotalPoints = this.totalPoints;
                        this.clientService
                            .addSuitability(this.clientSuitability, this.suitabilityForm)
                            .then(function (res) {
                            _this.showSuitabilityEdit = false;
                            _this.clientView = null;
                            _this.ngOnInit();
                            swal.close();
                        })
                            .catch();
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
                        .then(function (res) {
                        console.log(res);
                        if (res.status === 'granted') {
                            _this.clientView.editConsentRequest = false;
                            swal('Client Access Granted', 'Client will be sent an email informing that they can now edit conesnt.', 'success');
                        }
                        else if (res.status === 'denied') {
                            _this.clientView.editConsentRequest = false;
                            swal('Client Access Denied', 'Client will be sent an email informing that they can NOT edit conesnt.', 'danger');
                        }
                    }).catch();
                    // if (value) {
                    //   console.log(client);
                    //   console.log("Access granted: " + value);
                    // } else {
                    //   console.log(client);
                    //   console.log("Access denied: " + value);
                    // }
                };
                ClientStatusComponent.prototype.checkboxChange = function (client) {
                    var _this = this;
                    this.clientService
                        .updateBannerCamBool(client)
                        .then(function (res) {
                        _this.ngOnInit();
                    })
                        .catch();
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
                ClientStatusComponent.prototype.resetView = function () {
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
                    __metadata("design:paramtypes", [router_1.Router, client_service_1.ClientService, student_service_1.StudentService, authentication_service_1.AuthService, files_service_1.FilesService])
                ], ClientStatusComponent);
                return ClientStatusComponent;
            }());
            exports_1("ClientStatusComponent", ClientStatusComponent);
        }
    };
});

//# sourceMappingURL=client-status.component.js.map
