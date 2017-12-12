System.register(["@angular/core", "@angular/router", "../../models/learningStyleForm", "../../services/client.service", "../../services/authentication.service"], function (exports_1, context_1) {
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
    var core_1, router_1, learningStyleForm_1, client_service_1, authentication_service_1, LearningStyleComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (learningStyleForm_1_1) {
                learningStyleForm_1 = learningStyleForm_1_1;
            },
            function (client_service_1_1) {
                client_service_1 = client_service_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }
        ],
        execute: function () {
            LearningStyleComponent = /** @class */ (function () {
                function LearningStyleComponent(clientService, router, authService) {
                    this.clientService = clientService;
                    this.router = router;
                    this.authService = authService;
                    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    this.learningStyleForm = new learningStyleForm_1.LearningStyleForm();
                    if (this.currentUser.userType !== "Client") {
                        swal('Read Only', "You are logged in as '" + this.currentUser.userType + "'. Only clients can submit this form.", 'warning');
                    }
                }
                LearningStyleComponent.prototype.saveLearningStyle = function () {
                    var _this = this;
                    if (!this.learnBy && !this.multiChoice) {
                        swal('Incomplete form', 'Please fill out the form', 'warning');
                    }
                    else if (this.multiChoice) {
                        swal({
                            title: 'You learn best by ' + this.multiChoice.firstChoice + ' and ' + this.multiChoice.secondChoice + '',
                            text: "Is this correct?",
                            type: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            allowOutsideClick: false,
                            confirmButtonText: 'Yes!'
                        }).then(function (isConfirm) {
                            if (isConfirm) {
                                swal({
                                    title: 'Tie!',
                                    text: "Please pick one that suits you better",
                                    type: 'info',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#3085d6',
                                    allowOutsideClick: false,
                                    cancelButtonText: _this.multiChoice.firstChoice,
                                    confirmButtonText: _this.multiChoice.secondChoice
                                }).then(function (isConfirm) {
                                    if (isConfirm) {
                                        _this.learningStyleForm.learnBy = _this.multiChoice.secondChoice;
                                        _this.clientService
                                            .saveLearningStyle(_this.learningStyleForm)
                                            .then(function (client) {
                                            _this.router.navigate(['/dashboard']);
                                        })
                                            .catch(function (error) { return _this.error = error; });
                                    }
                                }).catch(function (error) {
                                    _this.learningStyleForm.learnBy = _this.multiChoice.firstChoice;
                                    _this.clientService
                                        .saveLearningStyle(_this.learningStyleForm)
                                        .then(function (client) {
                                        _this.router.navigate(['/dashboard']);
                                    })
                                        .catch(function (error) { return _this.error = error; });
                                });
                            }
                        }).catch(function (error) {
                        });
                    }
                    else {
                        swal({
                            title: 'You learn best by ' + this.learnBy + '',
                            text: "Is this correct?",
                            type: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            cancelButtonText: 'No',
                            confirmButtonText: 'Yes!'
                        }).then(function (isConfirm) {
                            if (isConfirm) {
                                _this.learningStyleForm.learnBy = _this.learnBy;
                                _this.clientService
                                    .saveLearningStyle(_this.learningStyleForm)
                                    .then(function (client) {
                                    _this.router.navigate(['/dashboard']);
                                })
                                    .catch(function (error) { return _this.error = error; }); // TODO: Display error message
                            }
                        }).catch(function (error) {
                            //console.log("Canceled");
                        });
                    }
                };
                LearningStyleComponent.prototype.tallyPoints = function () {
                    var seeingPoints = 0;
                    var hearingPoints = 0;
                    var doingPoints = 0;
                    if (this.learningStyleForm.seeing1) {
                        seeingPoints++;
                    }
                    if (this.learningStyleForm.seeing2) {
                        seeingPoints++;
                    }
                    if (this.learningStyleForm.seeing3) {
                        seeingPoints++;
                    }
                    if (this.learningStyleForm.seeing4) {
                        seeingPoints++;
                    }
                    if (this.learningStyleForm.seeing5) {
                        seeingPoints++;
                    }
                    if (this.learningStyleForm.seeing6) {
                        seeingPoints++;
                    }
                    if (this.learningStyleForm.seeing7) {
                        seeingPoints++;
                    }
                    this.totalSeeingPoints = seeingPoints;
                    this.learningStyleForm.seeing = this.totalSeeingPoints;
                    if (this.learningStyleForm.hearing1) {
                        hearingPoints++;
                    }
                    if (this.learningStyleForm.hearing2) {
                        hearingPoints++;
                    }
                    if (this.learningStyleForm.hearing3) {
                        hearingPoints++;
                    }
                    if (this.learningStyleForm.hearing4) {
                        hearingPoints++;
                    }
                    if (this.learningStyleForm.hearing5) {
                        hearingPoints++;
                    }
                    if (this.learningStyleForm.hearing6) {
                        hearingPoints++;
                    }
                    if (this.learningStyleForm.hearing7) {
                        hearingPoints++;
                    }
                    this.totalHearingPoints = hearingPoints;
                    this.learningStyleForm.hearing = this.totalHearingPoints;
                    if (this.learningStyleForm.doing1) {
                        doingPoints++;
                    }
                    if (this.learningStyleForm.doing2) {
                        doingPoints++;
                    }
                    if (this.learningStyleForm.doing3) {
                        doingPoints++;
                    }
                    if (this.learningStyleForm.doing4) {
                        doingPoints++;
                    }
                    if (this.learningStyleForm.doing5) {
                        doingPoints++;
                    }
                    if (this.learningStyleForm.doing6) {
                        doingPoints++;
                    }
                    if (this.learningStyleForm.doing7) {
                        doingPoints++;
                    }
                    this.totalDoingPoints = doingPoints;
                    this.learningStyleForm.doing = this.totalDoingPoints;
                    if (this.totalSeeingPoints > this.totalHearingPoints && this.totalSeeingPoints > this.totalDoingPoints) {
                        this.multiChoice = null;
                        this.learnBy = "Seeing";
                    }
                    else if (this.totalHearingPoints > this.totalSeeingPoints && this.totalHearingPoints > this.totalDoingPoints) {
                        this.multiChoice = null;
                        this.learnBy = "Hearing";
                    }
                    else if (this.totalDoingPoints > this.totalHearingPoints && this.totalDoingPoints > this.totalSeeingPoints) {
                        this.multiChoice = null;
                        this.learnBy = "Doing";
                    }
                    else if (this.totalDoingPoints === this.totalSeeingPoints) {
                        this.learnBy = null;
                        this.multiChoice = {
                            firstChoice: 'Doing',
                            secondChoice: 'Seeing'
                        };
                    }
                    else if (this.totalDoingPoints === this.totalHearingPoints) {
                        this.learnBy = null;
                        this.multiChoice = {
                            firstChoice: 'Doing',
                            secondChoice: 'Hearing'
                        };
                    }
                    else if (this.totalSeeingPoints === this.totalHearingPoints) {
                        this.learnBy = null;
                        this.multiChoice = {
                            firstChoice: 'Seeing',
                            secondChoice: 'Hearing'
                        };
                    }
                };
                LearningStyleComponent.prototype.goBack = function () {
                    window.history.back();
                };
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", learningStyleForm_1.LearningStyleForm)
                ], LearningStyleComponent.prototype, "learningStyleForm", void 0);
                LearningStyleComponent = __decorate([
                    core_1.Component({
                        selector: 'learningStyleForm',
                        templateUrl: './app/components/learning-style-form/learning-style-form.component.html',
                        styleUrls: ['./app/components/learning-style-form/learning-style-form.component.css']
                    }),
                    __metadata("design:paramtypes", [client_service_1.ClientService, router_1.Router, authentication_service_1.AuthService])
                ], LearningStyleComponent);
                return LearningStyleComponent;
            }());
            exports_1("LearningStyleComponent", LearningStyleComponent);
        }
    };
});

//# sourceMappingURL=learning-style-form.component.js.map
