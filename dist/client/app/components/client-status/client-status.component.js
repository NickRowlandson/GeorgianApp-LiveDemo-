System.register(["@angular/core", "@angular/router", "../../models/suitabilityForm", "../../services/client.service", "../../services/student.service", "../../services/authentication.service"], function (exports_1, context_1) {
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
    var core_1, router_1, suitabilityForm_1, client_service_1, student_service_1, authentication_service_1, ClientStatusComponent;
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
            }
        ],
        execute: function () {
            ClientStatusComponent = (function () {
                function ClientStatusComponent(router, clientService, studentService, authService) {
                    this.router = router;
                    this.clientService = clientService;
                    this.studentService = studentService;
                    this.authService = authService;
                    this.addSuitability = false;
                    this.partAWarning = false;
                    this.partBWarning = false;
                    this.partAPoints = 0;
                    this.partBPoints = 0;
                    this.totalPoints = 0;
                    this.calculated = false;
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
                    }
                    console.log(this.data);
                    this.allClients = objects.clients;
                    this.clientTotal = objects.clients.length;
                    this.suitabilityForms = objects.suitabilityForms;
                    this.consentForms = objects.consentForms;
                    this.learningStyleForms = objects.learningStyleForms;
                    this.stage1 = this.data.filter(function (x) { return x.suitability; });
                    this.stage2 = this.data.filter(function (x) { return !x.suitability; });
                    this.stage3 = this.data.filter(function (x) { return !x.suitability && !x.consent && !x.learningStyle; });
                    this.stage4 = this.data.filter(function (x) { return !x.suitability && !x.consent && !x.learningStyle && x.banner && x.cam; });
                    this.doughnutChartLabels = ['Suitability', 'Consent/Learning Style', 'Banner/CAM', 'Transfer Ready'];
                    this.doughnutChartData = [this.stage1.length, this.stage2.length, this.stage3.length, this.stage4.length];
                    this.doughnutChartType = 'doughnut';
                    this.addSuitability = false;
                    this.statusReport = true;
                    // this.actionItems = [
                    //   {label: 'Create as Student', icon: 'fa-refresh', command: (data) =>  this.createAsStudent(data)},
                    //   {label: 'Add Suitability Info', icon: 'fa-check', command: (data) => this.addSuitabilityInfo(data)},
                    //   {label: 'View Info', icon: 'fa-eye', command: (data) => this.showClientView(data)},
                    //   {label: 'Delete', icon: 'fa-trash-o', command: (data) => this.deleteAlert(data)}
                    // ];
                };
                ClientStatusComponent.prototype.addClient = function () {
                    this.router.navigate(['/suitability']);
                };
                // gotoEdit(client: Client, event: any) {
                //     this.router.navigate(['/clientEdit', client.clientID]);
                // }
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
                        if (isConfirm) {
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
                        _this.data = _this.data.filter(function (h) { return h !== client; });
                        swal('Deleted!', 'Client record has been deleted.', 'success');
                        _this.clientTotal = _this.data.length;
                    })
                        .catch(function (error) { return _this.error = error; });
                };
                ClientStatusComponent.prototype.showClientView = function (client) {
                    this.clientView = client;
                    this.resetView();
                    this.showGeneral = true;
                    var suitabilityForm = this.getSuitabilityFormByFilter(client.userID);
                    this.suitabilityView = suitabilityForm[0];
                    var consentForm = this.getConsentFormByFilter(client.userID);
                    this.consentView = consentForm[0];
                    var learningStyleForm = this.getLearningStyleFormByFilter(client.userID);
                    this.learningStyleView = learningStyleForm[0];
                    if (this.learningStyleView) {
                        this.barChartData = [{ data: [this.learningStyleView.hearing, this.learningStyleView.seeing, this.learningStyleView.doing] }];
                    }
                };
                ClientStatusComponent.prototype.getSuitabilityFormByFilter = function (id) {
                    return this.suitabilityForms.filter(function (x) { return x.userID === id; });
                };
                ClientStatusComponent.prototype.getConsentFormByFilter = function (id) {
                    return this.consentForms.filter(function (x) { return x.userID === id; });
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
                };
                ClientStatusComponent.prototype.showStatusReport = function (event) {
                    this.statusReport = true;
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
                    this.studentNumber(client);
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
                    }).then(function (inputValue) {
                        if (inputValue) {
                            client.studentNumber = inputValue;
                            _this.removeAlert(client);
                        }
                    }).catch(function (error) {
                        console.log("Canceled " + error); // TODO: Display error message
                    });
                };
                ClientStatusComponent.prototype.removeAlert = function (client) {
                    var _this = this;
                    swal({
                        title: 'Transfer client (' + client.firstName + ' ' + client.lastName + ')?',
                        text: 'Are you sure you want to create as student with #' + client.studentNumber + '?',
                        type: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, transfer!'
                    }).then(function (isConfirm) {
                        if (isConfirm) {
                            _this.studentService
                                .postNew(client)
                                .then(function (result) {
                                _this.removeFromClientTable(client.userID);
                            })
                                .catch(function (error) { return _this.error = error; }); // TODO: Display error message
                        }
                    }).catch(function (error) {
                        console.log("Canceled"); // TODO: Display error message
                    });
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
                        swal('Transfered', 'Client record has been transfered to the student table.', 'success');
                        _this.clientTotal = _this.data.length;
                    })
                        .catch(function (error) { return _this.error = error; });
                };
                ClientStatusComponent.prototype.addSuitabilityInfo = function (client) {
                    this.clientView = null;
                    this.addSuitability = true;
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
                ClientStatusComponent.prototype.editSuitability = function (id) {
                    this.resetView();
                    this.showSuitabilityEdit = true;
                    this.suitabilityForm = this.getSuitabilityFormByFilter(id)[0];
                };
                ClientStatusComponent.prototype.saveSuitability = function () {
                    var _this = this;
                    if (this.suitabilityForm.suitabilityID) {
                    }
                    else {
                        this.tallyPoints();
                        this.suitabilityForm.dbTotalPoints = this.totalPoints;
                        this.clientService
                            .addSuitability(this.clientSuitability, this.suitabilityForm)
                            .then(function (res) {
                            _this.ngOnInit();
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
                    this.partAWarning = false;
                    this.partBWarning = false;
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
                    if (this.suitabilityForm.incomeSource === 'OW  ODSP  EI  SC') {
                        this.partAPoints += 3;
                    }
                    else if (this.suitabilityForm.incomeSource === 'No income') {
                        this.partAPoints += 2;
                    }
                    else if (this.suitabilityForm.incomeSource === 'Employed') {
                        this.partAPoints += 1;
                    }
                    if (this.suitabilityForm.ageRange === '19-29 years old') {
                        this.partAPoints += 1;
                    }
                    else if (this.suitabilityForm.ageRange === '30-44 years old') {
                        this.partAPoints += 2;
                    }
                    else if (this.suitabilityForm.ageRange === '45-65 years old') {
                        this.partAPoints += 3;
                    }
                    //PART B
                    if (this.suitabilityForm.hoursPerWeek === '1Less than 5') {
                        this.partBPoints += 1;
                    }
                    else if (this.suitabilityForm.hoursPerWeek === '5-10') {
                        this.partBPoints += 2;
                    }
                    else if (this.suitabilityForm.hoursPerWeek === '10-20') {
                        this.partBPoints += 3;
                    }
                    if (this.suitabilityForm.workHistory === 'Less than 1 year experience in the field') {
                        this.partBPoints += 3;
                    }
                    else if (this.suitabilityForm.workHistory === '1-4 years experience in the field') {
                        this.partBPoints += 2;
                    }
                    else if (this.suitabilityForm.workHistory === '4+ years experience in the field') {
                        this.partBPoints += 1;
                    }
                    if (this.suitabilityForm.factorHealth) {
                        factorPoints++;
                    }
                    if (this.suitabilityForm.factorInstructions) {
                        factorPoints++;
                    }
                    if (this.suitabilityForm.factorCommunication) {
                        factorPoints++;
                    }
                    if (this.suitabilityForm.factorLanguage) {
                        factorPoints++;
                    }
                    if (this.suitabilityForm.factorComputer) {
                        factorPoints++;
                    }
                    if (this.suitabilityForm.factorHousing) {
                        factorPoints++;
                    }
                    if (this.suitabilityForm.factorTransportation) {
                        factorPoints++;
                    }
                    if (this.suitabilityForm.factorDaycare) {
                        factorPoints++;
                    }
                    if (this.suitabilityForm.factorInternet) {
                        factorPoints++;
                    }
                    if (this.suitabilityForm.factorPersonal) {
                        factorPoints++;
                    }
                    if (factorPoints >= 0 && factorPoints <= 4) {
                        this.partBPoints += 3;
                    }
                    else if (factorPoints > 4 && factorPoints <= 8) {
                        this.partBPoints += 2;
                    }
                    else if (factorPoints > 8) {
                        this.partBPoints += 1;
                    }
                    this.totalPoints = this.partAPoints - this.partBPoints;
                    if (this.partAPoints < 14) {
                        this.partAWarning = true;
                    }
                    if (this.partBPoints < 4) {
                        this.partBWarning = true;
                    }
                };
                ClientStatusComponent.prototype.checkboxChange = function (client) {
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
                ClientStatusComponent.prototype.resetView = function () {
                    this.statusReport = false;
                    this.showGeneral = false;
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
                    __metadata("design:paramtypes", [router_1.Router, client_service_1.ClientService, student_service_1.StudentService, authentication_service_1.AuthService])
                ], ClientStatusComponent);
                return ClientStatusComponent;
            }());
            exports_1("ClientStatusComponent", ClientStatusComponent);
        }
    };
});

//# sourceMappingURL=client-status.component.js.map
