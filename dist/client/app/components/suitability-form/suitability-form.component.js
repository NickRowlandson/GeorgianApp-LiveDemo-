System.register(["@angular/core", "@angular/router", "../../models/client", "../../models/suitabilityForm", "../../services/client.service", "../../services/authentication.service"], function (exports_1, context_1) {
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
    var core_1, router_1, client_1, suitabilityForm_1, router_2, client_service_1, authentication_service_1, SuitabilityFormComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (client_1_1) {
                client_1 = client_1_1;
            },
            function (suitabilityForm_1_1) {
                suitabilityForm_1 = suitabilityForm_1_1;
            },
            function (client_service_1_1) {
                client_service_1 = client_service_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }
        ],
        execute: function () {
            SuitabilityFormComponent = /** @class */ (function () {
                function SuitabilityFormComponent(clientService, router, route, authService) {
                    this.clientService = clientService;
                    this.router = router;
                    this.route = route;
                    this.authService = authService;
                    this.navigated = false; // true if navigated here
                    this.showSection1 = true;
                    this.showSection2 = false;
                    this.showSection3 = false;
                    this.showSection4 = false;
                    this.showSection5 = false;
                    this.showSection6 = false;
                    this.showSectionBtn1 = true;
                    this.showSectionBtn2 = false;
                    this.showSectionBtn3 = false;
                    this.showSectionBtn4 = false;
                    this.showSectionBtn5 = false;
                    this.showSectionBtn6 = false;
                    this.warning = false;
                    this.partAPoints = 0;
                    this.partBPoints = 0;
                    this.totalPoints = 0;
                    this.phone1 = false;
                    this.phone2 = false;
                    this.studentNumberToggle = false;
                    this.client = new client_1.Client();
                    this.suitabilityForm = new suitabilityForm_1.SuitabilityForm();
                    this.date = new Date();
                    this.client.allowDetailedMessage = false;
                    this.client.okayToText = false;
                    this.client.allowDetailedMessageAlternate = false;
                    this.client.okayToTextAlternate = false;
                }
                SuitabilityFormComponent.prototype.ngOnInit = function () {
                };
                SuitabilityFormComponent.prototype.clicked = function (item) {
                    switch (item) {
                        case 'section1':
                            this.showSection1 = true;
                            this.showSection2 = false;
                            this.showSection3 = false;
                            this.showSection4 = false;
                            this.showSection5 = false;
                            this.showSection6 = false;
                            break;
                        case 'section2':
                            this.showSection1 = false;
                            this.showSection2 = true;
                            this.showSection3 = false;
                            this.showSection4 = false;
                            this.showSection5 = false;
                            this.showSection6 = false;
                            break;
                        case 'section3':
                            this.showSection1 = false;
                            this.showSection2 = false;
                            this.showSection3 = true;
                            this.showSection4 = false;
                            this.showSection5 = false;
                            this.showSection6 = false;
                            break;
                        case 'section4':
                            this.showSection1 = false;
                            this.showSection2 = false;
                            this.showSection3 = false;
                            this.showSection4 = true;
                            this.showSection5 = false;
                            this.showSection6 = false;
                            break;
                        case 'section5':
                            this.showSection1 = false;
                            this.showSection2 = false;
                            this.showSection3 = false;
                            this.showSection4 = false;
                            this.showSection5 = true;
                            this.showSection6 = false;
                            break;
                        case 'section6':
                            this.showSection1 = false;
                            this.showSection2 = false;
                            this.showSection3 = false;
                            this.showSection4 = false;
                            this.showSection5 = false;
                            this.showSection6 = true;
                            this.tallyPoints();
                            break;
                        default:
                            this.showSection1 = true;
                            this.showSection2 = false;
                            this.showSection3 = false;
                            this.showSection4 = false;
                            this.showSection5 = false;
                            this.showSection6 = false;
                    }
                };
                SuitabilityFormComponent.prototype.tallyPoints = function () {
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
                SuitabilityFormComponent.prototype.next = function (event, nextSection) {
                    switch (nextSection) {
                        case 'section2':
                            this.showSectionBtn2 = true;
                            this.clicked(nextSection);
                            break;
                        case 'section3':
                            this.showSectionBtn3 = true;
                            this.clicked(nextSection);
                            break;
                        case 'section4':
                            this.showSectionBtn4 = true;
                            this.clicked(nextSection);
                            break;
                        case 'section5':
                            this.showSectionBtn5 = true;
                            this.clicked(nextSection);
                            break;
                        case 'section6':
                            this.showSectionBtn6 = true;
                            this.clicked(nextSection);
                            break;
                        default:
                    }
                };
                SuitabilityFormComponent.prototype.save = function () {
                    var _this = this;
                    if (this.client.firstName && this.client.lastName && this.client.email) {
                        var birthday = new Date(this.client.birthday);
                        var birthdayFormat = moment(birthday).format('DD-MM-YYYY');
                        this.client.inquiryDate = this.date;
                        this.client.username = this.client.firstName + this.client.lastName;
                        if (this.phone1) {
                            this.client.phone = this.client.phone + " Cell";
                        }
                        else {
                            this.client.phone = this.client.phone + " Home";
                        }
                        if (this.client.longDistance === true) {
                            this.client.phone = "+1 " + this.client.phone;
                        }
                        if (this.phone2) {
                            this.client.alternateNumber = this.client.alternateNumber + " Cell";
                        }
                        else {
                            this.client.alternateNumber = this.client.alternateNumber + " Home";
                        }
                        if (this.client.longDistanceAlternate === true) {
                            this.client.alternateNumber = "+1 " + this.client.alternateNumber;
                        }
                        if (this.studentNumberToggle === false) {
                            this.client.studentNumber = 'TBD';
                        }
                        console.log(this.client.studentNumber);
                        if (this.client.studentNumber == null) {
                            swal('Whoops...', "Please enter a student number or select 'No' for 'Attended Gerogian?'", 'warning');
                            this.clicked('section1');
                        }
                        else {
                            if (Object.keys(this.suitabilityForm).length === 0) {
                                swal({
                                    title: 'Suitability Incomplete',
                                    text: "The suitability section of the form has not been filled out. Are you sure you want to continue?",
                                    type: 'info',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Yes, continue'
                                }).then(function (isConfirm) {
                                    if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                                        console.log(isConfirm.dismiss);
                                        _this.clicked('section2');
                                    }
                                    else if (isConfirm) {
                                        _this.saveClient();
                                    }
                                }).catch(function (error) {
                                    console.log(error);
                                });
                            }
                            else {
                                this.saveClient();
                            }
                        }
                    }
                    else {
                        swal('Whoops...', "Please complete the first three fields in the 'Client Info' section", 'warning');
                        this.clicked('section1');
                    }
                };
                SuitabilityFormComponent.prototype.saveClient = function () {
                    var _this = this;
                    this.clientService
                        .save(this.client, this.suitabilityForm)
                        .then(function (client) {
                        console.log(client);
                        if (client.error === "username in use") {
                            swal('Username taken', 'Please enter a different first and last name.', 'warning');
                            _this.clicked('section1');
                        }
                        else if (client.error === "email in use") {
                            swal('Email already in use', 'Please enter a different email.', 'warning');
                            _this.clicked('section1');
                        }
                        else if (client.error === "incorrect email format") {
                            if (_this.client.email == null) {
                                _this.router.navigate(['/clients']);
                            }
                            else {
                                swal('Incorrect email format', 'Please enter a proper email.', 'warning');
                                _this.clicked('section1');
                            }
                        }
                        else if (client.success === "success") {
                            console.log("success");
                            _this.router.navigate(['/clients']);
                        }
                        else {
                            console.log("????");
                            _this.router.navigate(['/clients']);
                        }
                    })
                        .catch(function (error) {
                        console.log("Error " + error);
                    });
                };
                SuitabilityFormComponent.prototype.goBack = function () {
                    swal({
                        title: 'Are you sure?',
                        text: "Any information on this form will be lost if you proceed without saving.",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, continue'
                    }).then(function (isConfirm) {
                        if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                            console.log(isConfirm.dismiss);
                        }
                        else if (isConfirm) {
                            window.history.back();
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                };
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", client_1.Client)
                ], SuitabilityFormComponent.prototype, "client", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", suitabilityForm_1.SuitabilityForm)
                ], SuitabilityFormComponent.prototype, "suitabilityForm", void 0);
                SuitabilityFormComponent = __decorate([
                    core_1.Component({
                        selector: 'suitabilityForm',
                        templateUrl: './app/components/suitability-form/suitability-form.component.html',
                        styleUrls: ['./app/components/suitability-form/suitability-form.component.css']
                    }),
                    __metadata("design:paramtypes", [client_service_1.ClientService, router_1.Router, router_2.ActivatedRoute, authentication_service_1.AuthService])
                ], SuitabilityFormComponent);
                return SuitabilityFormComponent;
            }());
            exports_1("SuitabilityFormComponent", SuitabilityFormComponent);
            ;
        }
    };
});

//# sourceMappingURL=suitability-form.component.js.map
