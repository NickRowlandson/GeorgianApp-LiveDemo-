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
exports.SuitabilityFormComponent = SuitabilityFormComponent;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdWl0YWJpbGl0eS1mb3JtL3N1aXRhYmlsaXR5LWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWlEO0FBQ2pELDBDQUF5QztBQUN6Qyw4Q0FBNkM7QUFDN0MsZ0VBQStEO0FBQy9ELDBDQUF5RDtBQUN6RCxnRUFBOEQ7QUFDOUQsZ0ZBQW9FO0FBVXBFO0lBK0JJLGtDQUFvQixhQUE0QixFQUFVLE1BQWMsRUFBVSxLQUFxQixFQUFVLFdBQXdCO1FBQXJILGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUF6QnpJLGNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyx5QkFBeUI7UUFDNUMsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFFckIsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFDdkIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFFeEIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUVoQixXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLFdBQU0sR0FB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LEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQy9FLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQ2pGLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQ3ZGLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEtBQUssZUFBZSxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQzFGLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEtBQUssZUFBZSxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQzFGLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQ3RGLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEtBQUssc0JBQXNCLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDakcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDckYsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksS0FBSyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUNsRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFFekUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEtBQUssaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDM0YsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsS0FBSyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUN4RixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxLQUFLLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQ3hGLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEtBQUssZUFBZSxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQ3RGLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEtBQUssaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBRWhGLFFBQVE7UUFDUixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDckYsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDakYsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBRWhGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxLQUFLLDZCQUE2QixDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQzFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEtBQUssc0JBQXNCLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDaEcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsS0FBSyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFFdkYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQzFELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQ2hFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQ2pFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUFDLFlBQVksRUFBRSxDQUFDO1FBQUMsQ0FBQztRQUM1RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDNUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQzNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQ2xFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUFDLFlBQVksRUFBRSxDQUFDO1FBQUMsQ0FBQztRQUMzRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDNUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBRTVELEVBQUUsQ0FBQyxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUM3RSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUMxRSxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBRXZELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsdUNBQUksR0FBSixVQUFLLEtBQUssRUFBRSxXQUFXO1FBQ25CLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbEIsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2dCQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMxQixLQUFLLENBQUM7WUFDVixLQUFLLFVBQVU7Z0JBQ1gsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzFCLEtBQUssQ0FBQztZQUNWLEtBQUssVUFBVTtnQkFDWCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztnQkFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDMUIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2dCQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMxQixLQUFLLENBQUM7WUFDVixLQUFLLFVBQVU7Z0JBQ1gsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzFCLEtBQUssQ0FBQztZQUNWLFFBQVE7UUFDWixDQUFDO0lBQ0wsQ0FBQztJQUVELHVDQUFJLEdBQUo7UUFBQSxpQkFnRUM7UUEvREcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUMsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7WUFDbEQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztZQUNsRCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2hELENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDO1lBQ3RFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUM7WUFDdEUsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO1lBQ3BFLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQ3RDLENBQUM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxDQUNBLFdBQVcsRUFDWCx1RUFBdUUsRUFDdkUsU0FBUyxDQUNaLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ25ELElBQUksQ0FBQzt3QkFDRCxLQUFLLEVBQUUsd0JBQXdCO3dCQUMvQixJQUFJLEVBQUUsaUdBQWlHO3dCQUN2RyxJQUFJLEVBQUUsTUFBTTt3QkFDWixnQkFBZ0IsRUFBRSxJQUFJO3dCQUN0QixrQkFBa0IsRUFBRSxTQUFTO3dCQUM3QixpQkFBaUIsRUFBRSxNQUFNO3dCQUN6QixpQkFBaUIsRUFBRSxlQUFlO3FCQUNyQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsU0FBUzt3QkFDZixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxLQUFLLFFBQVEsSUFBSSxTQUFTLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7NEJBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUMvQixLQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUMzQixDQUFDO3dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzRCQUNyQixLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7d0JBQ3BCLENBQUM7b0JBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSzt3QkFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNyQixDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDcEIsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQ0EsV0FBVyxFQUNYLHFFQUFxRSxFQUNyRSxTQUFTLENBQ1osQ0FBQztZQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0IsQ0FBQztJQUNMLENBQUM7SUFFRCw2Q0FBVSxHQUFWO1FBQUEsaUJBeUNDO1FBeENDLElBQUksQ0FBQyxhQUFhO2FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQzthQUN2QyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUNBLGdCQUFnQixFQUNoQiwrQ0FBK0MsRUFDL0MsU0FBUyxDQUNaLENBQUM7Z0JBQ0YsS0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUNBLHNCQUFzQixFQUN0QixpQ0FBaUMsRUFDakMsU0FBUyxDQUNaLENBQUM7Z0JBQ0YsS0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssd0JBQXdCLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUM5QixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sSUFBSSxDQUNBLHdCQUF3QixFQUN4Qiw4QkFBOEIsRUFDOUIsU0FBUyxDQUNaLENBQUM7b0JBQ0YsS0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDM0IsQ0FBQztZQUNILENBQUM7WUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN2QixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDckMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BCLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNyQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSztZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBRSxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQUVELHlDQUFNLEdBQU47UUFDRSxJQUFJLENBQUM7WUFDRCxLQUFLLEVBQUUsZUFBZTtZQUN0QixJQUFJLEVBQUUsMEVBQTBFO1lBQ2hGLElBQUksRUFBRSxTQUFTO1lBQ2YsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixrQkFBa0IsRUFBRSxTQUFTO1lBQzdCLGlCQUFpQixFQUFFLE1BQU07WUFDekIsaUJBQWlCLEVBQUUsZUFBZTtTQUNyQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsU0FBUztZQUNmLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEtBQUssUUFBUSxJQUFJLFNBQVMsQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakMsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3hCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUE1VVE7UUFBUixZQUFLLEVBQUU7a0NBQVMsZUFBTTs0REFBQztJQUNmO1FBQVIsWUFBSyxFQUFFO2tDQUFrQixpQ0FBZTtxRUFBQztJQUZqQyx3QkFBd0I7UUFOcEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsV0FBVyxFQUFFLG1FQUFtRTtZQUNoRixTQUFTLEVBQUUsQ0FBQyxrRUFBa0UsQ0FBQztTQUNsRixDQUFDO3lDQWlDcUMsOEJBQWEsRUFBa0IsZUFBTSxFQUFpQix1QkFBYyxFQUF1QixvQ0FBVztPQS9CaEksd0JBQXdCLENBOFVwQztJQUFELCtCQUFDO0NBOVVELEFBOFVDLElBQUE7QUE5VVksNERBQXdCO0FBOFVwQyxDQUFDIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3N1aXRhYmlsaXR5LWZvcm0vc3VpdGFiaWxpdHktZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENsaWVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2xpZW50XCI7XHJcbmltcG9ydCB7IFN1aXRhYmlsaXR5Rm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3VpdGFiaWxpdHlGb3JtXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuZGVjbGFyZSB2YXIgbW9tZW50OiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnc3VpdGFiaWxpdHlGb3JtJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9zdWl0YWJpbGl0eS1mb3JtL3N1aXRhYmlsaXR5LWZvcm0uY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvc3VpdGFiaWxpdHktZm9ybS9zdWl0YWJpbGl0eS1mb3JtLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFN1aXRhYmlsaXR5Rm9ybUNvbXBvbmVudCB7XHJcbiAgICBASW5wdXQoKSBjbGllbnQ6IENsaWVudDtcclxuICAgIEBJbnB1dCgpIHN1aXRhYmlsaXR5Rm9ybTogU3VpdGFiaWxpdHlGb3JtO1xyXG4gICAgZXJyb3I6IGFueTtcclxuICAgIGRhdGU6IGFueTtcclxuICAgIGN1cnJlbnRVc2VyOiBhbnk7XHJcbiAgICBuYXZpZ2F0ZWQgPSBmYWxzZTsgLy8gdHJ1ZSBpZiBuYXZpZ2F0ZWQgaGVyZVxyXG4gICAgc2hvd1NlY3Rpb24xID0gdHJ1ZTtcclxuICAgIHNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgc2hvd1NlY3Rpb24zID0gZmFsc2U7XHJcbiAgICBzaG93U2VjdGlvbjQgPSBmYWxzZTtcclxuICAgIHNob3dTZWN0aW9uNSA9IGZhbHNlO1xyXG4gICAgc2hvd1NlY3Rpb242ID0gZmFsc2U7XHJcblxyXG4gICAgc2hvd1NlY3Rpb25CdG4xID0gdHJ1ZTtcclxuICAgIHNob3dTZWN0aW9uQnRuMiA9IGZhbHNlO1xyXG4gICAgc2hvd1NlY3Rpb25CdG4zID0gZmFsc2U7XHJcbiAgICBzaG93U2VjdGlvbkJ0bjQgPSBmYWxzZTtcclxuICAgIHNob3dTZWN0aW9uQnRuNSA9IGZhbHNlO1xyXG4gICAgc2hvd1NlY3Rpb25CdG42ID0gZmFsc2U7XHJcblxyXG4gICAgd2FybmluZyA9IGZhbHNlO1xyXG4gICAgcGFydEFQb2ludHMgPSAwO1xyXG4gICAgcGFydEJQb2ludHMgPSAwO1xyXG4gICAgdG90YWxQb2ludHMgPSAwO1xyXG5cclxuICAgIHBob25lMTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcGhvbmUyOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgc3R1ZGVudE51bWJlclRvZ2dsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnQgPSBuZXcgQ2xpZW50KCk7XHJcbiAgICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0gPSBuZXcgU3VpdGFiaWxpdHlGb3JtKCk7XHJcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB0aGlzLmNsaWVudC5hbGxvd0RldGFpbGVkTWVzc2FnZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2xpZW50Lm9rYXlUb1RleHQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNsaWVudC5hbGxvd0RldGFpbGVkTWVzc2FnZUFsdGVybmF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2xpZW50Lm9rYXlUb1RleHRBbHRlcm5hdGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tlZChpdGVtKSB7XHJcbiAgICAgICAgc3dpdGNoIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24xJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb241ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24yJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb241ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24zJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb241ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb240JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb240ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb241ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb241JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb240ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb242JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb240ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjYgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWxseVBvaW50cygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb240ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjYgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGFsbHlQb2ludHMoKSB7XHJcbiAgICAgICAgdmFyIGZhY3RvclBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy5wYXJ0QVBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy5wYXJ0QlBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy50b3RhbFBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy53YXJuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgLy8gUEFSVCBBXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLm9mZmVyU3RhcnREYXRlID09PSAnTGVzcyB0aGFuIG9uZSB5ZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5vZmZlclN0YXJ0RGF0ZSA9PT0gJ0luIG9uZSB5ZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5vZmZlclN0YXJ0RGF0ZSA9PT0gJ01vcmUgdGhhbiBhIFllYXInKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0ubWVldHNHb2FsID09PSAnTm8nKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLm1lZXRzR29hbCA9PT0gJ1llcyBidXQgbGFja3Mgc2tpbGxzL2hpZ2ggZW5vdWdoIG1hcmtzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5tZWV0c0dvYWwgPT09ICdZZXMnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0udGltZU91dE9mU2Nob29sID09PSAnNiBvciBtb3JlIHllYXJzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS50aW1lT3V0T2ZTY2hvb2wgPT09ICcxLTYgeWVhcnMnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLnRpbWVPdXRPZlNjaG9vbCA9PT0gJ0xlc3MgdGhhbiAxIHllYXInKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5Qcm9ncmFtQmVmb3JlID09PSAnTm8vTGVmdCB3aXRoIGFwcHJvcHJpYXRlIHJlYXNvbnMnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluUHJvZ3JhbUJlZm9yZSA9PT0gJ1llcyAtIEFwcHJvcHJpYXRlIHByb2dyZXNzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pblByb2dyYW1CZWZvcmUgPT09ICdZZXMg4oCTIE5vIHByb2dyZXNzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmVtcGxveW1lbnQgPT09ICdOb3Qgd29ya2luZycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZW1wbG95bWVudCA9PT0gJ1dvcmtpbmcgcGFydCB0aW1lJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5lbXBsb3ltZW50ID09PSAnV29ya2luZyBmdWxsIHRpbWUnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnRUknKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ09XJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdPRFNQJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdDcm93biBXYXJkJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdTZWxmLWVtcGxveWVkJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdTZWNvbmQgQ2FyZWVyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdObyBpbmNvbWUnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ0RlcGVuZGVudCBvZiBPVy9PRFNQJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdFbXBsb3llZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnSW50ZXJuYXRpb25hbCBTdHVkZW50JykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDA7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdXU0lCJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDA7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlID09PSAnNDUtNjUgeWVhcnMgb2xkJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZSA9PT0gJzE2LTE4IHllYXJzIG9sZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAwOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2UgPT09ICcxOS0yOSB5ZWFycyBvbGQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlID09PSAnNjUrIHllYXJzIG9sZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAwOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2UgPT09ICczMC00NCB5ZWFycyBvbGQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICAvL1BBUlQgQlxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5ob3Vyc1BlcldlZWsgPT09ICcxMC0yMCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaG91cnNQZXJXZWVrID09PSAnNS0xMCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaG91cnNQZXJXZWVrID09PSAnTGVzcyB0aGFuIDUnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0ud29ya0hpc3RvcnkgPT09ICdMZXNzIHRoYW4gMSB5ZWFyIGV4cGVyaWVuY2UnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLndvcmtIaXN0b3J5ID09PSAnMS00IHllYXJzIGV4cGVyaWVuY2UnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLndvcmtIaXN0b3J5ID09PSAnNCsgeWVhcnMgZXhwZXJpZW5jZScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JIZWFsdGgpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySW5zdHJ1Y3Rpb25zKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckNvbW11bmljYXRpb24pIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yTGFuZ3VhZ2UpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yQ29tcHV0ZXIpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySG91c2luZykgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JUcmFuc3BvcnRhdGlvbikgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JEYXljYXJlKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckludGVybmV0KSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvclBlcnNvbmFsKSB7IGZhY3RvclBvaW50cysrOyB9XHJcblxyXG4gICAgICAgIGlmIChmYWN0b3JQb2ludHMgPj0gMCAmJiBmYWN0b3JQb2ludHMgPD0gNCkgeyB0aGlzLnBhcnRCUG9pbnRzID0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKGZhY3RvclBvaW50cyA+PSA1ICYmIGZhY3RvclBvaW50cyA8PSA4KSB7IHRoaXMucGFydEJQb2ludHMgPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAoZmFjdG9yUG9pbnRzID49IDkpIHsgdGhpcy5wYXJ0QlBvaW50cyA9IDE7IH1cclxuXHJcbiAgICAgICAgdGhpcy50b3RhbFBvaW50cyA9IHRoaXMucGFydEFQb2ludHMgKyB0aGlzLnBhcnRCUG9pbnRzO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50b3RhbFBvaW50cyA8IDE4KSB7IHRoaXMud2FybmluZyA9IHRydWU7IH1cclxuICAgIH1cclxuXHJcbiAgICBuZXh0KGV2ZW50LCBuZXh0U2VjdGlvbikge1xyXG4gICAgICAgIHN3aXRjaCAobmV4dFNlY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSAnc2VjdGlvbjInOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbkJ0bjIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkKG5leHRTZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzZWN0aW9uMyc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uQnRuMyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrZWQobmV4dFNlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb240JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb25CdG40ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZChuZXh0U2VjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc2VjdGlvbjUnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbkJ0bjUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkKG5leHRTZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzZWN0aW9uNic6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uQnRuNiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrZWQobmV4dFNlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNhdmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2xpZW50LmZpcnN0TmFtZSAmJiB0aGlzLmNsaWVudC5sYXN0TmFtZSAmJiB0aGlzLmNsaWVudC5lbWFpbCkge1xyXG4gICAgICAgICAgdmFyIGJpcnRoZGF5ID0gbmV3IERhdGUodGhpcy5jbGllbnQuYmlydGhkYXkpO1xyXG4gICAgICAgICAgdmFyIGJpcnRoZGF5Rm9ybWF0ID0gbW9tZW50KGJpcnRoZGF5KS5mb3JtYXQoJ0RELU1NLVlZWVknKTtcclxuICAgICAgICAgIHRoaXMuY2xpZW50LmlucXVpcnlEYXRlID0gdGhpcy5kYXRlO1xyXG4gICAgICAgICAgaWYgKHRoaXMucGhvbmUxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50LnBob25lID0gdGhpcy5jbGllbnQucGhvbmUgKyBcIiBDZWxsXCI7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudC5waG9uZSA9IHRoaXMuY2xpZW50LnBob25lICsgXCIgSG9tZVwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMuY2xpZW50LmxvbmdEaXN0YW5jZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudC5waG9uZSA9IFwiKzEgXCIgKyB0aGlzLmNsaWVudC5waG9uZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLnBob25lMikge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudC5hbHRlcm5hdGVOdW1iZXIgPSB0aGlzLmNsaWVudC5hbHRlcm5hdGVOdW1iZXIgKyBcIiBDZWxsXCI7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudC5hbHRlcm5hdGVOdW1iZXIgPSB0aGlzLmNsaWVudC5hbHRlcm5hdGVOdW1iZXIgKyBcIiBIb21lXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGhpcy5jbGllbnQubG9uZ0Rpc3RhbmNlQWx0ZXJuYXRlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50LmFsdGVybmF0ZU51bWJlciA9IFwiKzEgXCIgKyB0aGlzLmNsaWVudC5hbHRlcm5hdGVOdW1iZXI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGhpcy5zdHVkZW50TnVtYmVyVG9nZ2xlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuY2xpZW50LnN0dWRlbnROdW1iZXIgPSAnVEJEJztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2xpZW50LnN0dWRlbnROdW1iZXIpO1xyXG4gICAgICAgICAgaWYgKHRoaXMuY2xpZW50LnN0dWRlbnROdW1iZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgJ1dob29wcy4uLicsXHJcbiAgICAgICAgICAgICAgICBcIlBsZWFzZSBlbnRlciBhIHN0dWRlbnQgbnVtYmVyIG9yIHNlbGVjdCAnTm8nIGZvciAnQXR0ZW5kZWQgR2Vyb2dpYW4/J1wiLFxyXG4gICAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tlZCgnc2VjdGlvbjEnKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLnN1aXRhYmlsaXR5Rm9ybSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAnU3VpdGFiaWxpdHkgSW5jb21wbGV0ZScsXHJcbiAgICAgICAgICAgICAgICAgIHRleHQ6IFwiVGhlIHN1aXRhYmlsaXR5IHNlY3Rpb24gb2YgdGhlIGZvcm0gaGFzIG5vdCBiZWVuIGZpbGxlZCBvdXQuIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjb250aW51ZT9cIixcclxuICAgICAgICAgICAgICAgICAgdHlwZTogJ2luZm8nLFxyXG4gICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIGNvbnRpbnVlJ1xyXG4gICAgICAgICAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtLmRpc21pc3MpO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmNsaWNrZWQoJ3NlY3Rpb24yJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnNhdmVDbGllbnQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zYXZlQ2xpZW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAnV2hvb3BzLi4uJyxcclxuICAgICAgICAgICAgICBcIlBsZWFzZSBjb21wbGV0ZSB0aGUgZmlyc3QgdGhyZWUgZmllbGRzIGluIHRoZSAnQ2xpZW50IEluZm8nIHNlY3Rpb25cIixcclxuICAgICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB0aGlzLmNsaWNrZWQoJ3NlY3Rpb24xJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNhdmVDbGllbnQoKSB7XHJcbiAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgICAgLnNhdmUodGhpcy5jbGllbnQsIHRoaXMuc3VpdGFiaWxpdHlGb3JtKVxyXG4gICAgICAgICAgLnRoZW4oY2xpZW50ID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY2xpZW50KTtcclxuICAgICAgICAgICAgaWYgKGNsaWVudC5lcnJvciA9PT0gXCJ1c2VybmFtZSBpbiB1c2VcIikge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICdVc2VybmFtZSB0YWtlbicsXHJcbiAgICAgICAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBkaWZmZXJlbnQgZmlyc3QgYW5kIGxhc3QgbmFtZS4nLFxyXG4gICAgICAgICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIHRoaXMuY2xpY2tlZCgnc2VjdGlvbjEnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjbGllbnQuZXJyb3IgPT09IFwiZW1haWwgaW4gdXNlXCIpIHtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAnRW1haWwgYWxyZWFkeSBpbiB1c2UnLFxyXG4gICAgICAgICAgICAgICAgICAnUGxlYXNlIGVudGVyIGEgZGlmZmVyZW50IGVtYWlsLicsXHJcbiAgICAgICAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jbGlja2VkKCdzZWN0aW9uMScpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNsaWVudC5lcnJvciA9PT0gXCJpbmNvcnJlY3QgZW1haWwgZm9ybWF0XCIpIHtcclxuICAgICAgICAgICAgICBpZiAodGhpcy5jbGllbnQuZW1haWwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvY2xpZW50cyddKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAnSW5jb3JyZWN0IGVtYWlsIGZvcm1hdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ1BsZWFzZSBlbnRlciBhIHByb3BlciBlbWFpbC4nLFxyXG4gICAgICAgICAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZCgnc2VjdGlvbjEnKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gIGVsc2UgaWYgKGNsaWVudC5zdWNjZXNzID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9jbGllbnRzJ10pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPz8/P1wiKTtcclxuICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9jbGllbnRzJ10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBcIiArIGVycm9yICk7XHJcbiAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnb0JhY2soKSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdBcmUgeW91IHN1cmU/JyxcclxuICAgICAgICAgIHRleHQ6IFwiQW55IGluZm9ybWF0aW9uIG9uIHRoaXMgZm9ybSB3aWxsIGJlIGxvc3QgaWYgeW91IHByb2NlZWQgd2l0aG91dCBzYXZpbmcuXCIsXHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIGNvbnRpbnVlJ1xyXG4gICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtLmRpc21pc3MpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxufTtcclxuIl19
