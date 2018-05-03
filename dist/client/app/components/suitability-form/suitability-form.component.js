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
var authentication_service_1 = require("../../services/authentication.service");
var SuitabilityFormComponent = /** @class */ (function () {
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
        this.campusList = [
            { label: 'Select', value: null },
            { label: 'Barrie', value: 'Barrie' },
            { label: 'Orillia', value: 'Orillia' },
            { label: 'Owen Sound', value: 'Owen Sound' }
        ];
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
        swal({
            title: 'Saving...',
            allowOutsideClick: false
        });
        swal.showLoading();
        this.clientService
            .create(this.client, this.suitabilityForm)
            .then(function (client) {
            console.log(client);
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
        __metadata("design:paramtypes", [client_service_1.ClientService, router_1.Router, router_2.ActivatedRoute, authentication_service_1.AuthService])
    ], SuitabilityFormComponent);
    return SuitabilityFormComponent;
}());
exports.SuitabilityFormComponent = SuitabilityFormComponent;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdWl0YWJpbGl0eS1mb3JtL3N1aXRhYmlsaXR5LWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWlEO0FBQ2pELDBDQUF5QztBQUN6Qyw4Q0FBNkM7QUFDN0MsZ0VBQStEO0FBQy9ELDBDQUF5RDtBQUN6RCxnRUFBOEQ7QUFDOUQsZ0ZBQW9FO0FBVXBFO0lBaUNJLGtDQUFvQixhQUE0QixFQUFVLE1BQWMsRUFBVSxLQUFxQixFQUFVLFdBQXdCO1FBQXJILGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUEzQnpJLGNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyx5QkFBeUI7UUFDNUMsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFFckIsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFDdkIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFFeEIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUVoQixXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFFeEIsd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBS2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksaUNBQWUsRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyw2QkFBNkIsR0FBRyxLQUFLLENBQUM7UUFDbEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7UUFDeEMsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNoQixFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztZQUM5QixFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBQztZQUNsQyxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBQztZQUNwQyxFQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBQztTQUMzQyxDQUFDO0lBQ04sQ0FBQztJQUVELDJDQUFRLEdBQVI7SUFFQSxDQUFDO0lBRUQsMENBQU8sR0FBUCxVQUFRLElBQUk7UUFDUixRQUFRLElBQUksRUFBRTtZQUNWLEtBQUssVUFBVTtnQkFDWCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixNQUFNO1lBQ1YsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQzFCLE1BQU07WUFDVixLQUFLLFVBQVU7Z0JBQ1gsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsTUFBTTtZQUNWLEtBQUssVUFBVTtnQkFDWCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixNQUFNO1lBQ1YsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxL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QUU7WUFDakIsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2dCQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMxQixNQUFNO1lBQ1YsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2dCQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMxQixNQUFNO1lBQ1YsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2dCQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMxQixNQUFNO1lBQ1YsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2dCQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMxQixNQUFNO1lBQ1YsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2dCQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMxQixNQUFNO1lBQ1YsUUFBUTtTQUNYO0lBQ0wsQ0FBQztJQUVELDJDQUFRLEdBQVI7UUFBQSxpQkFzRUM7UUFyRUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUN2RSxJQUFJLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlDLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwQyxJQUFJLElBQUksQ0FB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LEtBQUssU0FBUyxFQUFFO2dCQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoQztpQkFBTSxJQUFJLFNBQVMsRUFBRTtnQkFDcEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN2QjtRQUNILENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEtBQUs7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXZZUTtRQUFSLFlBQUssRUFBRTtrQ0FBUyxlQUFNOzREQUFDO0lBQ2Y7UUFBUixZQUFLLEVBQUU7a0NBQWtCLGlDQUFlO3FFQUFDO0lBRmpDLHdCQUF3QjtRQU5wQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsbUVBQW1FO1lBQ2hGLFNBQVMsRUFBRSxDQUFDLGtFQUFrRSxDQUFDO1NBQ2xGLENBQUM7eUNBbUNxQyw4QkFBYSxFQUFrQixlQUFNLEVBQWlCLHVCQUFjLEVBQXVCLG9DQUFXO09BakNoSSx3QkFBd0IsQ0F5WXBDO0lBQUQsK0JBQUM7Q0F6WUQsQUF5WUMsSUFBQTtBQXpZWSw0REFBd0I7QUF5WXBDLENBQUMiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvc3VpdGFiaWxpdHktZm9ybS9zdWl0YWJpbGl0eS1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jbGllbnRcIjtcclxuaW1wb3J0IHsgU3VpdGFiaWxpdHlGb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdWl0YWJpbGl0eUZvcm1cIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY2xpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5kZWNsYXJlIHZhciBtb21lbnQ6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdzdWl0YWJpbGl0eUZvcm0nLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3N1aXRhYmlsaXR5LWZvcm0vc3VpdGFiaWxpdHktZm9ybS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9zdWl0YWJpbGl0eS1mb3JtL3N1aXRhYmlsaXR5LWZvcm0uY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU3VpdGFiaWxpdHlGb3JtQ29tcG9uZW50IHtcclxuICAgIEBJbnB1dCgpIGNsaWVudDogQ2xpZW50O1xyXG4gICAgQElucHV0KCkgc3VpdGFiaWxpdHlGb3JtOiBTdWl0YWJpbGl0eUZvcm07XHJcbiAgICBlcnJvcjogYW55O1xyXG4gICAgZGF0ZTogYW55O1xyXG4gICAgY3VycmVudFVzZXI6IGFueTtcclxuICAgIG5hdmlnYXRlZCA9IGZhbHNlOyAvLyB0cnVlIGlmIG5hdmlnYXRlZCBoZXJlXHJcbiAgICBzaG93U2VjdGlvbjEgPSB0cnVlO1xyXG4gICAgc2hvd1NlY3Rpb24yID0gZmFsc2U7XHJcbiAgICBzaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICAgIHNob3dTZWN0aW9uNCA9IGZhbHNlO1xyXG4gICAgc2hvd1NlY3Rpb241ID0gZmFsc2U7XHJcbiAgICBzaG93U2VjdGlvbjYgPSBmYWxzZTtcclxuXHJcbiAgICBzaG93U2VjdGlvbkJ0bjEgPSB0cnVlO1xyXG4gICAgc2hvd1NlY3Rpb25CdG4yID0gZmFsc2U7XHJcbiAgICBzaG93U2VjdGlvbkJ0bjMgPSBmYWxzZTtcclxuICAgIHNob3dTZWN0aW9uQnRuNCA9IGZhbHNlO1xyXG4gICAgc2hvd1NlY3Rpb25CdG41ID0gZmFsc2U7XHJcbiAgICBzaG93U2VjdGlvbkJ0bjYgPSBmYWxzZTtcclxuXHJcbiAgICB3YXJuaW5nID0gZmFsc2U7XHJcbiAgICBwYXJ0QVBvaW50cyA9IDA7XHJcbiAgICBwYXJ0QlBvaW50cyA9IDA7XHJcbiAgICB0b3RhbFBvaW50cyA9IDA7XHJcblxyXG4gICAgcGhvbmUxOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwaG9uZTI6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBzdHVkZW50TnVtYmVyVG9nZ2xlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY2FtcHVzTGlzdDogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnQgPSBuZXcgQ2xpZW50KCk7XHJcbiAgICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0gPSBuZXcgU3VpdGFiaWxpdHlGb3JtKCk7XHJcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB0aGlzLmNsaWVudC5hbGxvd0RldGFpbGVkTWVzc2FnZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2xpZW50Lm9rYXlUb1RleHQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNsaWVudC5hbGxvd0RldGFpbGVkTWVzc2FnZUFsdGVybmF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2xpZW50Lm9rYXlUb1RleHRBbHRlcm5hdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNhbXB1c0xpc3QgPSBbXHJcbiAgICAgICAgICB7bGFiZWw6ICdTZWxlY3QnLCB2YWx1ZTogbnVsbH0sXHJcbiAgICAgICAgICB7bGFiZWw6ICdCYXJyaWUnLCB2YWx1ZTogJ0JhcnJpZSd9LFxyXG4gICAgICAgICAge2xhYmVsOiAnT3JpbGxpYScsIHZhbHVlOiAnT3JpbGxpYSd9LFxyXG4gICAgICAgICAge2xhYmVsOiAnT3dlbiBTb3VuZCcsIHZhbHVlOiAnT3dlbiBTb3VuZCd9XHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tlZChpdGVtKSB7XHJcbiAgICAgICAgc3dpdGNoIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24xJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb241ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24yJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb241ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24zJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb241ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb240JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb240ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb241ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb241JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb240ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb242JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb240ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjYgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWxseVBvaW50cygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb240ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjYgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGFsbHlQb2ludHMoKSB7XHJcbiAgICAgICAgdmFyIGZhY3RvclBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy5wYXJ0QVBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy5wYXJ0QlBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy50b3RhbFBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy53YXJuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgLy8gUEFSVCBBXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLm9mZmVyU3RhcnREYXRlID09PSAnTGVzcyB0aGFuIG9uZSB5ZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5vZmZlclN0YXJ0RGF0ZSA9PT0gJ0luIG9uZSB5ZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5vZmZlclN0YXJ0RGF0ZSA9PT0gJ01vcmUgdGhhbiBhIFllYXInKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0ubWVldHNHb2FsID09PSAnTm8nKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLm1lZXRzR29hbCA9PT0gJ1llcyBidXQgbGFja3Mgc2tpbGxzL2hpZ2ggZW5vdWdoIG1hcmtzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5tZWV0c0dvYWwgPT09ICdZZXMnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0udGltZU91dE9mU2Nob29sID09PSAnNiBvciBtb3JlIHllYXJzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS50aW1lT3V0T2ZTY2hvb2wgPT09ICcxLTYgeWVhcnMnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLnRpbWVPdXRPZlNjaG9vbCA9PT0gJ0xlc3MgdGhhbiAxIHllYXInKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5Qcm9ncmFtQmVmb3JlID09PSAnTm8vTGVmdCB3aXRoIGFwcHJvcHJpYXRlIHJlYXNvbnMnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluUHJvZ3JhbUJlZm9yZSA9PT0gJ1llcyAtIEFwcHJvcHJpYXRlIHByb2dyZXNzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pblByb2dyYW1CZWZvcmUgPT09ICdZZXMg4oCTIE5vIHByb2dyZXNzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmVtcGxveW1lbnQgPT09ICdOb3Qgd29ya2luZycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZW1wbG95bWVudCA9PT0gJ1dvcmtpbmcgcGFydCB0aW1lJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5lbXBsb3ltZW50ID09PSAnV29ya2luZyBmdWxsIHRpbWUnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnRUknKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ09XJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdPRFNQJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdDcm93biBXYXJkJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdTZWxmLWVtcGxveWVkJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdTZWNvbmQgQ2FyZWVyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdObyBpbmNvbWUnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ0RlcGVuZGVudCBvZiBPVy9PRFNQJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdFbXBsb3llZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnSW50ZXJuYXRpb25hbCBTdHVkZW50JykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDA7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdXU0lCJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDA7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlID09PSAnNDUtNjUgeWVhcnMgb2xkJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZSA9PT0gJzE2LTE4IHllYXJzIG9sZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAwOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2UgPT09ICcxOS0yOSB5ZWFycyBvbGQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlID09PSAnNjUrIHllYXJzIG9sZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAwOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2UgPT09ICczMC00NCB5ZWFycyBvbGQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICAvL1BBUlQgQlxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5ob3Vyc1BlcldlZWsgPT09ICcxMC0yMCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaG91cnNQZXJXZWVrID09PSAnNS0xMCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaG91cnNQZXJXZWVrID09PSAnTGVzcyB0aGFuIDUnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0ud29ya0hpc3RvcnkgPT09ICdMZXNzIHRoYW4gMSB5ZWFyIGV4cGVyaWVuY2UnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLndvcmtIaXN0b3J5ID09PSAnMS00IHllYXJzIGV4cGVyaWVuY2UnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLndvcmtIaXN0b3J5ID09PSAnNCsgeWVhcnMgZXhwZXJpZW5jZScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JIZWFsdGgpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySW5zdHJ1Y3Rpb25zKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckNvbW11bmljYXRpb24pIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yTGFuZ3VhZ2UpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yQ29tcHV0ZXIpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySG91c2luZykgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JUcmFuc3BvcnRhdGlvbikgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JEYXljYXJlKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckludGVybmV0KSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvclBlcnNvbmFsKSB7IGZhY3RvclBvaW50cysrOyB9XHJcblxyXG4gICAgICAgIGlmIChmYWN0b3JQb2ludHMgPj0gMCAmJiBmYWN0b3JQb2ludHMgPD0gNCkgeyB0aGlzLnBhcnRCUG9pbnRzID0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKGZhY3RvclBvaW50cyA+PSA1ICYmIGZhY3RvclBvaW50cyA8PSA4KSB7IHRoaXMucGFydEJQb2ludHMgPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAoZmFjdG9yUG9pbnRzID49IDkpIHsgdGhpcy5wYXJ0QlBvaW50cyA9IDE7IH1cclxuXHJcbiAgICAgICAgdGhpcy50b3RhbFBvaW50cyA9IHRoaXMucGFydEFQb2ludHMgKyB0aGlzLnBhcnRCUG9pbnRzO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50b3RhbFBvaW50cyA8IDE4KSB7IHRoaXMud2FybmluZyA9IHRydWU7IH1cclxuICAgIH1cclxuXHJcbiAgICBuZXh0KGV2ZW50LCBuZXh0U2VjdGlvbikge1xyXG4gICAgICAgIHN3aXRjaCAobmV4dFNlY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSAnc2VjdGlvbjInOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbkJ0bjIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkKG5leHRTZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzZWN0aW9uMyc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uQnRuMyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrZWQobmV4dFNlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb240JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb25CdG40ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZChuZXh0U2VjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc2VjdGlvbjUnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbkJ0bjUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkKG5leHRTZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzZWN0aW9uNic6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uQnRuNiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrZWQobmV4dFNlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhbGlkYXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNsaWVudC5maXJzdE5hbWUgJiYgdGhpcy5jbGllbnQubGFzdE5hbWUgJiYgdGhpcy5jbGllbnQuY2FtcHVzKSB7XHJcbiAgICAgICAgICB2YXIgYmlydGhkYXkgPSBuZXcgRGF0ZSh0aGlzLmNsaWVudC5iaXJ0aGRheSk7XHJcbiAgICAgICAgICB2YXIgYmlydGhkYXlGb3JtYXQgPSBtb21lbnQoYmlydGhkYXkpLmZvcm1hdCgnREQtTU0tWVlZWScpO1xyXG4gICAgICAgICAgdGhpcy5jbGllbnQuaW5xdWlyeURhdGUgPSB0aGlzLmRhdGU7XHJcbiAgICAgICAgICBpZiAodGhpcy5waG9uZTEpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnQucGhvbmUgPSB0aGlzLmNsaWVudC5waG9uZSArIFwiIENlbGxcIjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50LnBob25lID0gdGhpcy5jbGllbnQucGhvbmUgKyBcIiBIb21lXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGhpcy5jbGllbnQubG9uZ0Rpc3RhbmNlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50LnBob25lID0gXCIrMSBcIiArIHRoaXMuY2xpZW50LnBob25lO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMucGhvbmUyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50LmFsdGVybmF0ZU51bWJlciA9IHRoaXMuY2xpZW50LmFsdGVybmF0ZU51bWJlciArIFwiIENlbGxcIjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50LmFsdGVybmF0ZU51bWJlciA9IHRoaXMuY2xpZW50LmFsdGVybmF0ZU51bWJlciArIFwiIEhvbWVcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLmNsaWVudC5sb25nRGlzdGFuY2VBbHRlcm5hdGUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnQuYWx0ZXJuYXRlTnVtYmVyID0gXCIrMSBcIiArIHRoaXMuY2xpZW50LmFsdGVybmF0ZU51bWJlcjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLnN0dWRlbnROdW1iZXJUb2dnbGUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5jbGllbnQuc3R1ZGVudE51bWJlciA9ICdUQkQnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMuY2xpZW50LnN0dWRlbnROdW1iZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgJ1dob29wcy4uLicsXHJcbiAgICAgICAgICAgICAgICBcIlBsZWFzZSBlbnRlciBhIHN0dWRlbnQgbnVtYmVyIG9yIHNlbGVjdCAnTm8nIGZvciAnQXR0ZW5kZWQgR2Vyb2dpYW4/J1wiLFxyXG4gICAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tlZCgnc2VjdGlvbjEnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLmNsaWVudC5lbWFpbCA9PSBudWxsIHx8IHRoaXMuY2xpZW50LmVtYWlsID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsaWVudC5jYW1wdXMgPT09ICdCYXJyaWUnKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5jbGllbnQuZW1haWwgPSAnQkEuQUNQQGdlb3JnaWFuY29sbGVnZS5jYSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jbGllbnQuY2FtcHVzID09PSAnT3JpbGxpYScpIHtcclxuICAgICAgICAgICAgICB0aGlzLmNsaWVudC5lbWFpbCA9ICdPUi5BQ1BAZ2VvcmdpYW5jb2xsZWdlLmNhJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNsaWVudC5jYW1wdXMgPT09ICdPd2VuIFNvdW5kJykge1xyXG4gICAgICAgICAgICAgIHRoaXMuY2xpZW50LmVtYWlsID0gJ09TLkFDUEBnZW9yZ2lhbmNvbGxlZ2UuY2EnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdGWUknLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJBbiBlbWFpbCBoYXMgbm90IGJlZW4gZW50ZXJlZCwgdGhlIHVzZXIgd2lsbCBiZSBhc3NpZ25lZCB0aGUgZm9sbG93aW5nIGVtYWlsIGFkZHJlc3MgYmFzZWQgb24gdGhlaXIgY2FtcHVzOiBcIiArIHRoaXMuY2xpZW50LmVtYWlsICsgXCIuIFBsZWFzZSBhc3Npc3QgdGhlbSBpbiBzaWduaW5nIGluXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW5mbycsXHJcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIGNvbnRpbnVlJyxcclxuICAgICAgICAgICAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgICAgICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGllbnQuZW1haWwgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkKCdzZWN0aW9uMScpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrU3VpdGFiaWxpdHkoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja1N1aXRhYmlsaXR5KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgJ1dob29wcy4uLicsXHJcbiAgICAgICAgICAgICAgXCJQbGVhc2UgY29tcGxldGUgdGhlIGZpcnN0IHRocmVlIGZpZWxkcyBpbiB0aGUgJ0NsaWVudCBJbmZvJyBzZWN0aW9uXCIsXHJcbiAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpcy5jbGlja2VkKCdzZWN0aW9uMScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja1N1aXRhYmlsaXR5KCkge1xyXG4gICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5zdWl0YWJpbGl0eUZvcm0pLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ1N1aXRhYmlsaXR5IEluY29tcGxldGUnLFxyXG4gICAgICAgICAgICB0ZXh0OiBcIlRoZSBzdWl0YWJpbGl0eSBzZWN0aW9uIG9mIHRoZSBmb3JtIGhhcyBub3QgYmVlbiBmaWxsZWQgb3V0LiBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY29udGludWU/XCIsXHJcbiAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcclxuICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBjb250aW51ZScsXHJcbiAgICAgICAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGlja2VkKCdzZWN0aW9uMicpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgICAgdGhpcy5zYXZlQ2xpZW50KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2F2ZUNsaWVudCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUNsaWVudCgpIHtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6ICdTYXZpbmcuLi4nLFxyXG4gICAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgICB9KTtcclxuICAgICAgc3dhbC5zaG93TG9hZGluZygpO1xyXG4gICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgIC5jcmVhdGUodGhpcy5jbGllbnQsIHRoaXMuc3VpdGFiaWxpdHlGb3JtKVxyXG4gICAgICAgICAgLnRoZW4oY2xpZW50ID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY2xpZW50KTtcclxuICAgICAgICAgICAgaWYgKGNsaWVudC5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoY2xpZW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjbGllbnQubXNnID09PSBcInVzZXJuYW1lIGluIHVzZVwiKSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgJ1VzZXJuYW1lIHRha2VuJyxcclxuICAgICAgICAgICAgICAgICAgJ1BsZWFzZSBlbnRlciBhIGRpZmZlcmVudCBmaXJzdCBhbmQgbGFzdCBuYW1lLicsXHJcbiAgICAgICAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jbGlja2VkKCdzZWN0aW9uMScpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNsaWVudC5tc2cgPT09IFwiZW1haWwgaW4gdXNlXCIpIHtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAnRW1haWwgYWxyZWFkeSBpbiB1c2UnLFxyXG4gICAgICAgICAgICAgICAgICAnUGxlYXNlIGVudGVyIGEgZGlmZmVyZW50IGVtYWlsLicsXHJcbiAgICAgICAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jbGlja2VkKCdzZWN0aW9uMScpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNsaWVudC5tc2cgPT09IFwiaW5jb3JyZWN0IGVtYWlsIGZvcm1hdFwiKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuY2xpZW50LmVtYWlsID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2NsaWVudHMnXSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICAgJ0luY29ycmVjdCBlbWFpbCBmb3JtYXQnLFxyXG4gICAgICAgICAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBwcm9wZXIgZW1haWwuJyxcclxuICAgICAgICAgICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrZWQoJ3NlY3Rpb24xJyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICBlbHNlIGlmIChjbGllbnQucmVzdWx0ID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9jbGllbnRzJ10pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIHRoaXMuY2xpY2tlZCgnc2VjdGlvbjEnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgXCIgKyBlcnJvciApO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheUVycm9yQWxlcnQoZXJyb3IpIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICBlcnJvci50aXRsZSxcclxuICAgICAgICBlcnJvci5tc2csXHJcbiAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ0FyZSB5b3Ugc3VyZT8nLFxyXG4gICAgICAgICAgdGV4dDogXCJBbnkgaW5mb3JtYXRpb24gb24gdGhpcyBmb3JtIHdpbGwgYmUgbG9zdCBpZiB5b3UgcHJvY2VlZCB3aXRob3V0IHNhdmluZy5cIixcclxuICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgY29udGludWUnXHJcbiAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICBpZiAoaXNDb25maXJtLmRpc21pc3MgPT09IFwiY2FuY2VsXCIgfHwgaXNDb25maXJtLmRpc21pc3MgPT09IFwib3ZlcmxheVwiKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhpc0NvbmZpcm0uZGlzbWlzcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG4iXX0=
