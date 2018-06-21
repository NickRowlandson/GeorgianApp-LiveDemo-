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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var client_1 = require("../../models/client");
var suitabilityForm_1 = require("../../models/suitabilityForm");
var router_2 = require("@angular/router");
var client_service_1 = require("../../services/client.service");
var course_service_1 = require("../../services/course.service");
var authentication_service_1 = require("../../services/authentication.service");
var SuitabilityFormComponent = /** @class */ (function () {
    function SuitabilityFormComponent(courseService, clientService, router, route, authService) {
        this.courseService = courseService;
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
        this.courseTypes = [];
        this.selectedCourseTypes = [];
        this.client = new client_1.Client();
        this.suitabilityForm = new suitabilityForm_1.SuitabilityForm();
        this.date = new Date();
        this.client.allowDetailedMessage = false;
        this.client.okayToText = false;
        this.client.allowDetailedMessageAlternate = false;
        this.client.okayToTextAlternate = false;
        this.campusList = [
            { label: 'Select', value: null },
            { label: 'Barrie', value: 'Barrie' },
            { label: 'Orillia', value: 'Orillia' },
            { label: 'Owen Sound', value: 'Owen Sound' }
        ];
    }
    SuitabilityFormComponent.prototype.ngOnInit = function () {
        var _this = this;
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
    SuitabilityFormComponent.prototype.validate = function () {
        var _this = this;
        if (this.client.firstName && this.client.lastName && this.client.campus) {
            var birthday = new Date(this.client.birthday);
            var birthdayFormat = moment(birthday).format('DD-MM-YYYY');
            this.client.inquiryDate = this.date;
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
            if (this.client.studentNumber == null) {
                swal('Whoops...', "Please enter a student number or select 'No' for 'Attended Gerogian?'", 'warning');
                this.clicked('section1');
            }
            if (this.client.email == null || this.client.email === "") {
                if (this.client.campus === 'Barrie') {
                    this.client.email = 'BA.ACP@georgiancollege.ca';
                }
                else if (this.client.campus === 'Orillia') {
                    this.client.email = 'OR.ACP@georgiancollege.ca';
                }
                else if (this.client.campus === 'Owen Sound') {
                    this.client.email = 'OS.ACP@georgiancollege.ca';
                }
                swal({
                    title: 'FYI',
                    text: "An email has not been entered, the user will be assigned the following email address based on their campus: " + this.client.email + ". Please assist them in signing in",
                    type: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, continue',
                    allowOutsideClick: false
                }).then(function (isConfirm) {
                    if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                        _this.client.email = "";
                        _this.clicked('section1');
                    }
                    else if (isConfirm) {
                        _this.checkSuitability();
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
            else {
                this.checkSuitability();
            }
        }
        else {
            swal('Whoops...', "Please complete the first three fields in the 'Client Info' section", 'warning');
            this.clicked('section1');
        }
    };
    SuitabilityFormComponent.prototype.checkSuitability = function () {
        var _this = this;
        if (Object.keys(this.suitabilityForm).length === 0) {
            swal({
                title: 'Suitability Incomplete',
                text: "The suitability section of the form has not been filled out. Are you sure you want to continue?",
                type: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, continue',
                allowOutsideClick: false
            }).then(function (isConfirm) {
                if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
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
    };
    SuitabilityFormComponent.prototype.saveClient = function () {
        var _this = this;
        if (this.selectedCourseTypes.toString() !== '') {
            this.suitabilityForm.selectedCourseTypes = this.selectedCourseTypes.toString();
        }
        swal({
            title: 'Saving...',
            allowOutsideClick: false
        });
        swal.showLoading();
        this.clientService
            .create(this.client, this.suitabilityForm)
            .then(function (client) {
            if (client.result === "error") {
                _this.displayErrorAlert(client);
            }
            else if (client.msg === "username in use") {
                swal('Username taken', 'Please enter a different first and last name.', 'warning');
                _this.clicked('section1');
            }
            else if (client.msg === "email in use") {
                swal('Email already in use', 'Please enter a different email.', 'warning');
                _this.clicked('section1');
            }
            else if (client.msg === "incorrect email format") {
                if (_this.client.email == null) {
                    swal.close();
                    _this.router.navigate(['/clients']);
                }
                else {
                    swal('Incorrect email format', 'Please enter a proper email.', 'warning');
                    _this.clicked('section1');
                }
            }
            else if (client.result === "success") {
                console.log(client.userID);
                var CurrentDate = moment().format();
                if (_this.selectedCourseTypes.toString() !== '') {
                    for (var _i = 0, _a = _this.selectedCourseTypes; _i < _a.length; _i++) {
                        var courseType = _a[_i];
                        _this.courseService
                            .addToWaitList(client.userID, courseType, CurrentDate)
                            .then(function (result) {
                            if (result.result === 'error') {
                                _this.displayErrorAlert(result);
                            }
                            else if (result.result === 'success') {
                                swal.close();
                            }
                            else {
                                swal('Error', 'Something went wrong while adding student to wait list.', 'error');
                            }
                        })
                            .catch(function (error) { return console.log("Error - Add student to wait list: " + error); });
                    }
                }
                swal.close();
                _this.router.navigate(['/clients']);
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'warning');
                _this.clicked('section1');
            }
        })
            .catch(function (error) {
            console.log("Error " + error);
        });
    };
    SuitabilityFormComponent.prototype.displayErrorAlert = function (error) {
        swal(error.title, error.msg, 'error');
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
        __metadata("design:paramtypes", [course_service_1.CourseService,
            client_service_1.ClientService,
            router_1.Router,
            router_2.ActivatedRoute,
            authentication_service_1.AuthService])
    ], SuitabilityFormComponent);
    return SuitabilityFormComponent;
}());
exports.SuitabilityFormComponent = SuitabilityFormComponent;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdWl0YWJpbGl0eS1mb3JtL3N1aXRhYmlsaXR5LWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWlEO0FBQ2pELDBDQUF5QztBQUN6Qyw4Q0FBNkM7QUFDN0MsZ0VBQStEO0FBQy9ELDBDQUF5RDtBQUN6RCxnRUFBOEQ7QUFDOUQsZ0VBQThEO0FBQzlELGdGQUFvRTtBQVVwRTtJQW1DSSxrQ0FBb0IsYUFBNEIsRUFDdEMsYUFBNEIsRUFDNUIsTUFBYyxFQUNkLEtBQXFCLEVBQ3JCLFdBQXdCO1FBSmQsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDdEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBakNsQyxjQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMseUJBQXlCO1FBQzVDLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXJCLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBRXhCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsZ0JBQVcs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WUFDUCx1QkFBYztZQUNSLG9DQUFXO09BdkN6Qix3QkFBd0IsQ0FxYnBDO0lBQUQsK0JBQUM7Q0FyYkQsQUFxYkMsSUFBQTtBQXJiWSw0REFBd0I7QUFxYnBDLENBQUMiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvc3VpdGFiaWxpdHktZm9ybS9zdWl0YWJpbGl0eS1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jbGllbnRcIjtcclxuaW1wb3J0IHsgU3VpdGFiaWxpdHlGb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdWl0YWJpbGl0eUZvcm1cIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY2xpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291cnNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3Vyc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcbmRlY2xhcmUgdmFyIG1vbWVudDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3N1aXRhYmlsaXR5Rm9ybScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvc3VpdGFiaWxpdHktZm9ybS9zdWl0YWJpbGl0eS1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3N1aXRhYmlsaXR5LWZvcm0vc3VpdGFiaWxpdHktZm9ybS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTdWl0YWJpbGl0eUZvcm1Db21wb25lbnQge1xyXG4gICAgQElucHV0KCkgY2xpZW50OiBDbGllbnQ7XHJcbiAgICBASW5wdXQoKSBzdWl0YWJpbGl0eUZvcm06IFN1aXRhYmlsaXR5Rm9ybTtcclxuICAgIGVycm9yOiBhbnk7XHJcbiAgICBkYXRlOiBhbnk7XHJcbiAgICBjdXJyZW50VXNlcjogYW55O1xyXG4gICAgbmF2aWdhdGVkID0gZmFsc2U7IC8vIHRydWUgaWYgbmF2aWdhdGVkIGhlcmVcclxuICAgIHNob3dTZWN0aW9uMSA9IHRydWU7XHJcbiAgICBzaG93U2VjdGlvbjIgPSBmYWxzZTtcclxuICAgIHNob3dTZWN0aW9uMyA9IGZhbHNlO1xyXG4gICAgc2hvd1NlY3Rpb240ID0gZmFsc2U7XHJcbiAgICBzaG93U2VjdGlvbjUgPSBmYWxzZTtcclxuICAgIHNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG5cclxuICAgIHNob3dTZWN0aW9uQnRuMSA9IHRydWU7XHJcbiAgICBzaG93U2VjdGlvbkJ0bjIgPSBmYWxzZTtcclxuICAgIHNob3dTZWN0aW9uQnRuMyA9IGZhbHNlO1xyXG4gICAgc2hvd1NlY3Rpb25CdG40ID0gZmFsc2U7XHJcbiAgICBzaG93U2VjdGlvbkJ0bjUgPSBmYWxzZTtcclxuICAgIHNob3dTZWN0aW9uQnRuNiA9IGZhbHNlO1xyXG5cclxuICAgIHdhcm5pbmcgPSBmYWxzZTtcclxuICAgIHBhcnRBUG9pbnRzID0gMDtcclxuICAgIHBhcnRCUG9pbnRzID0gMDtcclxuICAgIHRvdGFsUG9pbnRzID0gMDtcclxuXHJcbiAgICBwaG9uZTE6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHBob25lMjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHN0dWRlbnROdW1iZXJUb2dnbGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjYW1wdXNMaXN0OiBhbnk7XHJcbiAgICBjb3Vyc2VUeXBlczogYW55W10gPSBbXTtcclxuICAgIHNlbGVjdGVkQ291cnNlVHlwZXM6IGFueVtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb3Vyc2VTZXJ2aWNlOiBDb3Vyc2VTZXJ2aWNlLFxyXG4gICAgICBwcml2YXRlIGNsaWVudFNlcnZpY2U6IENsaWVudFNlcnZpY2UsXHJcbiAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuY2xpZW50ID0gbmV3IENsaWVudCgpO1xyXG4gICAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtID0gbmV3IFN1aXRhYmlsaXR5Rm9ybSgpO1xyXG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdGhpcy5jbGllbnQuYWxsb3dEZXRhaWxlZE1lc3NhZ2UgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNsaWVudC5va2F5VG9UZXh0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jbGllbnQuYWxsb3dEZXRhaWxlZE1lc3NhZ2VBbHRlcm5hdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNsaWVudC5va2F5VG9UZXh0QWx0ZXJuYXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYW1wdXNMaXN0ID0gW1xyXG4gICAgICAgICAge2xhYmVsOiAnU2VsZWN0JywgdmFsdWU6IG51bGx9LFxyXG4gICAgICAgICAge2xhYmVsOiAnQmFycmllJywgdmFsdWU6ICdCYXJyaWUnfSxcclxuICAgICAgICAgIHtsYWJlbDogJ09yaWxsaWEnLCB2YWx1ZTogJ09yaWxsaWEnfSxcclxuICAgICAgICAgIHtsYWJlbDogJ093ZW4gU291bmQnLCB2YWx1ZTogJ093ZW4gU291bmQnfVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgIC8vIGdldCBjb3Vyc2UgdHlwZXNcclxuICAgICAgdGhpcy5jb3Vyc2VTZXJ2aWNlLmdldENvdXJzZVR5cGVzKClcclxuICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVzdWx0LmZvckVhY2goKGkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jb3Vyc2VUeXBlcy5wdXNoKHtcclxuICAgICAgICAgICAgICBsYWJlbDogaS5jb3Vyc2VUeXBlLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBpLmNvdXJzZVR5cGVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrZWQoaXRlbSkge1xyXG4gICAgICAgIHN3aXRjaCAoaXRlbSkge1xyXG4gICAgICAgICAgICBjYXNlICdzZWN0aW9uMSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb240ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjYgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzZWN0aW9uMic6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb240ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjYgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzZWN0aW9uMyc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24zID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb240ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjYgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzZWN0aW9uNCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24zID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjYgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzZWN0aW9uNSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24zID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjYgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzZWN0aW9uNic6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24zID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb242ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFsbHlQb2ludHMoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24zID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb242ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRhbGx5UG9pbnRzKCkge1xyXG4gICAgICAgIHZhciBmYWN0b3JQb2ludHMgPSAwO1xyXG4gICAgICAgIHRoaXMucGFydEFQb2ludHMgPSAwO1xyXG4gICAgICAgIHRoaXMucGFydEJQb2ludHMgPSAwO1xyXG4gICAgICAgIHRoaXMudG90YWxQb2ludHMgPSAwO1xyXG4gICAgICAgIHRoaXMud2FybmluZyA9IGZhbHNlO1xyXG4gICAgICAgIC8vIFBBUlQgQVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5vZmZlclN0YXJ0RGF0ZSA9PT0gJ0xlc3MgdGhhbiBvbmUgeWVhcicpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ub2ZmZXJTdGFydERhdGUgPT09ICdJbiBvbmUgeWVhcicpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ub2ZmZXJTdGFydERhdGUgPT09ICdNb3JlIHRoYW4gYSBZZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLm1lZXRzR29hbCA9PT0gJ05vJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5tZWV0c0dvYWwgPT09ICdZZXMgYnV0IGxhY2tzIHNraWxscy9oaWdoIGVub3VnaCBtYXJrcycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ubWVldHNHb2FsID09PSAnWWVzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLnRpbWVPdXRPZlNjaG9vbCA9PT0gJzYgb3IgbW9yZSB5ZWFycycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0udGltZU91dE9mU2Nob29sID09PSAnMS02IHllYXJzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS50aW1lT3V0T2ZTY2hvb2wgPT09ICdMZXNzIHRoYW4gMSB5ZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluUHJvZ3JhbUJlZm9yZSA9PT0gJ05vL0xlZnQgd2l0aCBhcHByb3ByaWF0ZSByZWFzb25zJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pblByb2dyYW1CZWZvcmUgPT09ICdZZXMgLSBBcHByb3ByaWF0ZSBwcm9ncmVzcycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5Qcm9ncmFtQmVmb3JlID09PSAnWWVzIOKAkyBObyBwcm9ncmVzcycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5lbXBsb3ltZW50ID09PSAnTm90IHdvcmtpbmcnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmVtcGxveW1lbnQgPT09ICdXb3JraW5nIHBhcnQgdGltZScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZW1wbG95bWVudCA9PT0gJ1dvcmtpbmcgZnVsbCB0aW1lJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ0VJJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdPVycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnT0RTUCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnQ3Jvd24gV2FyZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnU2VsZi1lbXBsb3llZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnU2Vjb25kIENhcmVlcicpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnTm8gaW5jb21lJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdEZXBlbmRlbnQgb2YgT1cvT0RTUCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnRW1wbG95ZWQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ0ludGVybmF0aW9uYWwgU3R1ZGVudCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAwOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnV1NJQicpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAwOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZSA9PT0gJzQ1LTY1IHllYXJzIG9sZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2UgPT09ICcxNi0xOCB5ZWFycyBvbGQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMDsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlID09PSAnMTktMjkgeWVhcnMgb2xkJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZSA9PT0gJzY1KyB5ZWFycyBvbGQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMDsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlID09PSAnMzAtNDQgeWVhcnMgb2xkJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgLy9QQVJUIEJcclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaG91cnNQZXJXZWVrID09PSAnMTAtMjAnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmhvdXJzUGVyV2VlayA9PT0gJzUtMTAnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmhvdXJzUGVyV2VlayA9PT0gJ0xlc3MgdGhhbiA1JykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLndvcmtIaXN0b3J5ID09PSAnTGVzcyB0aGFuIDEgeWVhciBleHBlcmllbmNlJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS53b3JrSGlzdG9yeSA9PT0gJzEtNCB5ZWFycyBleHBlcmllbmNlJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS53b3JrSGlzdG9yeSA9PT0gJzQrIHllYXJzIGV4cGVyaWVuY2UnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySGVhbHRoKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3Rvckluc3RydWN0aW9ucykgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JDb21tdW5pY2F0aW9uKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3Rvckxhbmd1YWdlKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckNvbXB1dGVyKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhvdXNpbmcpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yVHJhbnNwb3J0YXRpb24pIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yRGF5Y2FyZSkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JJbnRlcm5ldCkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JQZXJzb25hbCkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG5cclxuICAgICAgICBpZiAoZmFjdG9yUG9pbnRzID49IDAgJiYgZmFjdG9yUG9pbnRzIDw9IDQpIHsgdGhpcy5wYXJ0QlBvaW50cyA9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgIChmYWN0b3JQb2ludHMgPj0gNSAmJiBmYWN0b3JQb2ludHMgPD0gOCkgeyB0aGlzLnBhcnRCUG9pbnRzID0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICAgKGZhY3RvclBvaW50cyA+PSA5KSB7IHRoaXMucGFydEJQb2ludHMgPSAxOyB9XHJcblxyXG4gICAgICAgIHRoaXMudG90YWxQb2ludHMgPSB0aGlzLnBhcnRBUG9pbnRzICsgdGhpcy5wYXJ0QlBvaW50cztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudG90YWxQb2ludHMgPCAxOCkgeyB0aGlzLndhcm5pbmcgPSB0cnVlOyB9XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dChldmVudCwgbmV4dFNlY3Rpb24pIHtcclxuICAgICAgICBzd2l0Y2ggKG5leHRTZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24yJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb25CdG4yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZChuZXh0U2VjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc2VjdGlvbjMnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbkJ0bjMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkKG5leHRTZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzZWN0aW9uNCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uQnRuNCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrZWQobmV4dFNlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb241JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb25CdG41ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZChuZXh0U2VjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc2VjdGlvbjYnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbkJ0bjYgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkKG5leHRTZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YWxpZGF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5jbGllbnQuZmlyc3ROYW1lICYmIHRoaXMuY2xpZW50Lmxhc3ROYW1lICYmIHRoaXMuY2xpZW50LmNhbXB1cykge1xyXG4gICAgICAgICAgdmFyIGJpcnRoZGF5ID0gbmV3IERhdGUodGhpcy5jbGllbnQuYmlydGhkYXkpO1xyXG4gICAgICAgICAgdmFyIGJpcnRoZGF5Rm9ybWF0ID0gbW9tZW50KGJpcnRoZGF5KS5mb3JtYXQoJ0RELU1NLVlZWVknKTtcclxuICAgICAgICAgIHRoaXMuY2xpZW50LmlucXVpcnlEYXRlID0gdGhpcy5kYXRlO1xyXG4gICAgICAgICAgaWYgKHRoaXMucGhvbmUxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50LnBob25lID0gdGhpcy5jbGllbnQucGhvbmUgKyBcIiBDZWxsXCI7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudC5waG9uZSA9IHRoaXMuY2xpZW50LnBob25lICsgXCIgSG9tZVwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMuY2xpZW50LmxvbmdEaXN0YW5jZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudC5waG9uZSA9IFwiKzEgXCIgKyB0aGlzLmNsaWVudC5waG9uZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLnBob25lMikge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudC5hbHRlcm5hdGVOdW1iZXIgPSB0aGlzLmNsaWVudC5hbHRlcm5hdGVOdW1iZXIgKyBcIiBDZWxsXCI7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudC5hbHRlcm5hdGVOdW1iZXIgPSB0aGlzLmNsaWVudC5hbHRlcm5hdGVOdW1iZXIgKyBcIiBIb21lXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGhpcy5jbGllbnQubG9uZ0Rpc3RhbmNlQWx0ZXJuYXRlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50LmFsdGVybmF0ZU51bWJlciA9IFwiKzEgXCIgKyB0aGlzLmNsaWVudC5hbHRlcm5hdGVOdW1iZXI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGhpcy5zdHVkZW50TnVtYmVyVG9nZ2xlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuY2xpZW50LnN0dWRlbnROdW1iZXIgPSAnVEJEJztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLmNsaWVudC5zdHVkZW50TnVtYmVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICdXaG9vcHMuLi4nLFxyXG4gICAgICAgICAgICAgICAgXCJQbGVhc2UgZW50ZXIgYSBzdHVkZW50IG51bWJlciBvciBzZWxlY3QgJ05vJyBmb3IgJ0F0dGVuZGVkIEdlcm9naWFuPydcIixcclxuICAgICAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrZWQoJ3NlY3Rpb24xJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGhpcy5jbGllbnQuZW1haWwgPT0gbnVsbCB8fCB0aGlzLmNsaWVudC5lbWFpbCA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jbGllbnQuY2FtcHVzID09PSAnQmFycmllJykge1xyXG4gICAgICAgICAgICAgIHRoaXMuY2xpZW50LmVtYWlsID0gJ0JBLkFDUEBnZW9yZ2lhbmNvbGxlZ2UuY2EnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2xpZW50LmNhbXB1cyA9PT0gJ09yaWxsaWEnKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5jbGllbnQuZW1haWwgPSAnT1IuQUNQQGdlb3JnaWFuY29sbGVnZS5jYSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jbGllbnQuY2FtcHVzID09PSAnT3dlbiBTb3VuZCcpIHtcclxuICAgICAgICAgICAgICB0aGlzLmNsaWVudC5lbWFpbCA9ICdPUy5BQ1BAZ2VvcmdpYW5jb2xsZWdlLmNhJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnRllJJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwiQW4gZW1haWwgaGFzIG5vdCBiZWVuIGVudGVyZWQsIHRoZSB1c2VyIHdpbGwgYmUgYXNzaWduZWQgdGhlIGZvbGxvd2luZyBlbWFpbCBhZGRyZXNzIGJhc2VkIG9uIHRoZWlyIGNhbXB1czogXCIgKyB0aGlzLmNsaWVudC5lbWFpbCArIFwiLiBQbGVhc2UgYXNzaXN0IHRoZW0gaW4gc2lnbmluZyBpblwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2luZm8nLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBjb250aW51ZScsXHJcbiAgICAgICAgICAgICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2VcclxuICAgICAgICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpZW50LmVtYWlsID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZCgnc2VjdGlvbjEnKTtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1N1aXRhYmlsaXR5KCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tTdWl0YWJpbGl0eSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICdXaG9vcHMuLi4nLFxyXG4gICAgICAgICAgICAgIFwiUGxlYXNlIGNvbXBsZXRlIHRoZSBmaXJzdCB0aHJlZSBmaWVsZHMgaW4gdGhlICdDbGllbnQgSW5mbycgc2VjdGlvblwiLFxyXG4gICAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHRoaXMuY2xpY2tlZCgnc2VjdGlvbjEnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tTdWl0YWJpbGl0eSgpIHtcclxuICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuc3VpdGFiaWxpdHlGb3JtKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgdGl0bGU6ICdTdWl0YWJpbGl0eSBJbmNvbXBsZXRlJyxcclxuICAgICAgICAgICAgdGV4dDogXCJUaGUgc3VpdGFiaWxpdHkgc2VjdGlvbiBvZiB0aGUgZm9ybSBoYXMgbm90IGJlZW4gZmlsbGVkIG91dC4gQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNvbnRpbnVlP1wiLFxyXG4gICAgICAgICAgICB0eXBlOiAnaW5mbycsXHJcbiAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgY29udGludWUnLFxyXG4gICAgICAgICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2VcclxuICAgICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgICBpZiAoaXNDb25maXJtLmRpc21pc3MgPT09IFwiY2FuY2VsXCIgfHwgaXNDb25maXJtLmRpc21pc3MgPT09IFwib3ZlcmxheVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tlZCgnc2VjdGlvbjInKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZUNsaWVudCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNhdmVDbGllbnQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNhdmVDbGllbnQoKSB7XHJcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ291cnNlVHlwZXMudG9TdHJpbmcoKSAhPT0gJycpIHtcclxuICAgICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5zZWxlY3RlZENvdXJzZVR5cGVzID0gdGhpcy5zZWxlY3RlZENvdXJzZVR5cGVzLnRvU3RyaW5nKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiAnU2F2aW5nLi4uJyxcclxuICAgICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgICAuY3JlYXRlKHRoaXMuY2xpZW50LCB0aGlzLnN1aXRhYmlsaXR5Rm9ybSlcclxuICAgICAgICAgIC50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjbGllbnQucmVzdWx0ID09PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KGNsaWVudCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2xpZW50Lm1zZyA9PT0gXCJ1c2VybmFtZSBpbiB1c2VcIikge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICdVc2VybmFtZSB0YWtlbicsXHJcbiAgICAgICAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBkaWZmZXJlbnQgZmlyc3QgYW5kIGxhc3QgbmFtZS4nLFxyXG4gICAgICAgICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIHRoaXMuY2xpY2tlZCgnc2VjdGlvbjEnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjbGllbnQubXNnID09PSBcImVtYWlsIGluIHVzZVwiKSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgJ0VtYWlsIGFscmVhZHkgaW4gdXNlJyxcclxuICAgICAgICAgICAgICAgICAgJ1BsZWFzZSBlbnRlciBhIGRpZmZlcmVudCBlbWFpbC4nLFxyXG4gICAgICAgICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIHRoaXMuY2xpY2tlZCgnc2VjdGlvbjEnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjbGllbnQubXNnID09PSBcImluY29ycmVjdCBlbWFpbCBmb3JtYXRcIikge1xyXG4gICAgICAgICAgICAgIGlmICh0aGlzLmNsaWVudC5lbWFpbCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9jbGllbnRzJ10pO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAgICdJbmNvcnJlY3QgZW1haWwgZm9ybWF0JyxcclxuICAgICAgICAgICAgICAgICAgICAnUGxlYXNlIGVudGVyIGEgcHJvcGVyIGVtYWlsLicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkKCdzZWN0aW9uMScpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgZWxzZSBpZiAoY2xpZW50LnJlc3VsdCA9PT0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjbGllbnQudXNlcklEKTtcclxuICAgICAgICAgICAgICB2YXIgQ3VycmVudERhdGUgPSBtb21lbnQoKS5mb3JtYXQoKTtcclxuICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZENvdXJzZVR5cGVzLnRvU3RyaW5nKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgZm9yIChsZXQgY291cnNlVHlwZSBvZiB0aGlzLnNlbGVjdGVkQ291cnNlVHlwZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY291cnNlU2VydmljZVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUb1dhaXRMaXN0KGNsaWVudC51c2VySUQsIGNvdXJzZVR5cGUsIEN1cnJlbnREYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSBhZGRpbmcgc3R1ZGVudCB0byB3YWl0IGxpc3QuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvciAtIEFkZCBzdHVkZW50IHRvIHdhaXQgbGlzdDogXCIgKyBlcnJvcikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvY2xpZW50cyddKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHBsZWFzZSB0cnkgYWdhaW4uJyxcclxuICAgICAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB0aGlzLmNsaWNrZWQoJ3NlY3Rpb24xJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIFwiICsgZXJyb3IgKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlFcnJvckFsZXJ0KGVycm9yKSB7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgICAgZXJyb3IubXNnLFxyXG4gICAgICAgICdlcnJvcidcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBnb0JhY2soKSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdBcmUgeW91IHN1cmU/JyxcclxuICAgICAgICAgIHRleHQ6IFwiQW55IGluZm9ybWF0aW9uIG9uIHRoaXMgZm9ybSB3aWxsIGJlIGxvc3QgaWYgeW91IHByb2NlZWQgd2l0aG91dCBzYXZpbmcuXCIsXHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIGNvbnRpbnVlJ1xyXG4gICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtLmRpc21pc3MpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxufTtcclxuIl19
