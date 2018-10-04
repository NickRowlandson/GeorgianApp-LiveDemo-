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
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const client_1 = require("../../models/client");
const suitabilityForm_1 = require("../../models/suitabilityForm");
const router_2 = require("@angular/router");
const client_service_1 = require("../../services/client.service");
const course_service_1 = require("../../services/course.service");
const authentication_service_1 = require("../../services/authentication.service");
let SuitabilityFormComponent = class SuitabilityFormComponent {
    constructor(courseService, clientService, router, route, authService) {
        this.courseService = courseService;
        this.clientService = clientService;
        this.router = router;
        this.route = route;
        this.authService = authService;
        this.navigated = false; // true if navigated here
        // showSection1 = true;
        // showSection2 = false;
        // showSection3 = false;
        // showSection4 = false;
        // showSection5 = false;
        // showSection6 = false;
        //
        // showSectionBtn1 = true;
        // showSectionBtn2 = false;
        // showSectionBtn3 = false;
        // showSectionBtn4 = false;
        // showSectionBtn5 = false;
        // showSectionBtn6 = false;
        this.selectedSection = 1;
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
        this.suitabilityForm.isValidAge = true;
        this.suitabilityForm.availableDuringClass = true;
        this.suitabilityForm.appropriateGoal = true;
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
    ngOnInit() {
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
    // clicked(item) {
    //     switch (item) {
    //         case 'section1':
    //             this.showSection1 = true;
    //             this.showSection2 = false;
    //             this.showSection3 = false;
    //             this.showSection4 = false;
    //             this.showSection5 = false;
    //             this.showSection6 = false;
    //             break;
    //         case 'section2':
    //             this.showSection1 = false;
    //             this.showSection2 = true;
    //             this.showSection3 = false;
    //             this.showSection4 = false;
    //             this.showSection5 = false;
    //             this.showSection6 = false;
    //             break;
    //         case 'section3':
    //             this.showSection1 = false;
    //             this.showSection2 = false;
    //             this.showSection3 = true;
    //             this.showSection4 = false;
    //             this.showSection5 = false;
    //             this.showSection6 = false;
    //             break;
    //         case 'section4':
    //             this.showSection1 = false;
    //             this.showSection2 = false;
    //             this.showSection3 = false;
    //             this.showSection4 = true;
    //             this.showSection5 = false;
    //             this.showSection6 = false;
    //             break;
    //         case 'section5':
    //             this.showSection1 = false;
    //             this.showSection2 = false;
    //             this.showSection3 = false;
    //             this.showSection4 = false;
    //             this.showSection5 = true;
    //             this.showSection6 = false;
    //             break;
    //         case 'section6':
    //             this.showSection1 = false;
    //             this.showSection2 = false;
    //             this.showSection3 = false;
    //             this.showSection4 = false;
    //             this.showSection5 = false;
    //             this.showSection6 = true;
    //             this.tallyPoints();
    //             break;
    //         default:
    //             this.showSection1 = true;
    //             this.showSection2 = false;
    //             this.showSection3 = false;
    //             this.showSection4 = false;
    //             this.showSection5 = false;
    //             this.showSection6 = false;
    //     }
    // }
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
    }
    // next(event, nextSection) {
    //     switch (nextSection) {
    //         case 'section2':
    //             this.showSectionBtn2 = true;
    //             this.clicked(nextSection);
    //             break;
    //         case 'section3':
    //             this.showSectionBtn3 = true;
    //             this.clicked(nextSection);
    //             break;
    //         case 'section4':
    //             this.showSectionBtn4 = true;
    //             this.clicked(nextSection);
    //             break;
    //         case 'section5':
    //             this.showSectionBtn5 = true;
    //             this.clicked(nextSection);
    //             break;
    //         case 'section6':
    //             this.showSectionBtn6 = true;
    //             this.clicked(nextSection);
    //             break;
    //         default:
    //     }
    // }
    validate() {
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
                this.selectedSection = 1;
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
                }).then(isConfirm => {
                    if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                        this.client.email = "";
                        this.selectedSection = 1;
                    }
                    else if (isConfirm) {
                        this.checkSuitability();
                    }
                }).catch(error => {
                    console.log(error);
                });
            }
            else {
                this.checkSuitability();
            }
        }
        else {
            swal('Whoops...', "Please complete the first three fields in the 'Client Info' section", 'warning');
            this.selectedSection = 1;
        }
    }
    checkSuitability() {
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
            }).then(isConfirm => {
                if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                    this.selectedSection = 2;
                }
                else if (isConfirm) {
                    this.saveClient();
                }
            }).catch(error => {
                console.log(error);
            });
        }
        else {
            this.saveClient();
        }
    }
    saveClient() {
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
            .then(client => {
            if (client.result === "error") {
                this.displayErrorAlert(client);
            }
            else if (client.msg === "username in use") {
                swal('Username taken', 'Please enter a different first and last name.', 'warning');
                this.selectedSection = 1;
            }
            else if (client.msg === "email in use") {
                swal('Email already in use', 'Please enter a different email.', 'warning');
                this.selectedSection = 1;
            }
            else if (client.msg === "incorrect email format") {
                if (this.client.email == null) {
                    swal.close();
                    this.router.navigate(['/clients']);
                }
                else {
                    swal('Incorrect email format', 'Please enter a proper email.', 'warning');
                    this.selectedSection = 1;
                }
            }
            else if (client.result === "success") {
                console.log(client.userID);
                var CurrentDate = moment().format();
                if (this.selectedCourseTypes.toString() !== '') {
                    for (let courseType of this.selectedCourseTypes) {
                        this.courseService
                            .addToWaitList(client.userID, courseType, CurrentDate)
                            .then(result => {
                            if (result.result === 'error') {
                                this.displayErrorAlert(result);
                            }
                            else if (result.result === 'success') {
                                swal.close();
                            }
                            else {
                                swal('Error', 'Something went wrong while adding student to wait list.', 'error');
                            }
                        })
                            .catch(error => console.log("Error - Add student to wait list: " + error));
                    }
                }
                swal.close();
                this.router.navigate(['/clients']);
            }
            else {
                swal('Error', 'Something went wrong, please try again.', 'warning');
                this.selectedSection = 1;
            }
        })
            .catch(error => {
            console.log("Error " + error);
        });
    }
    onDateChange(birthdate) {
        var years = moment().diff(birthdate, 'years');
        if (years >= 16 && years <= 18) {
            this.suitabilityForm.ageRange = "16-18 years old";
        }
        else if (years >= 19 && years <= 29) {
            this.suitabilityForm.ageRange = "19-29 years old";
        }
        else if (years >= 30 && years <= 44) {
            this.suitabilityForm.ageRange = "30-44 years old";
        }
        else if (years >= 45 && years <= 65) {
            this.suitabilityForm.ageRange = "45-65 years old";
        }
        else if (years > 65) {
            this.suitabilityForm.ageRange = "65+ years old";
        }
    }
    displayErrorAlert(error) {
        swal(error.title, error.msg, 'error');
    }
    goBack() {
        swal({
            title: 'Are you sure?',
            text: "Any information on this form will be lost if you proceed without saving.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, continue'
        }).then(isConfirm => {
            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                console.log(isConfirm.dismiss);
            }
            else if (isConfirm) {
                window.history.back();
            }
        }).catch(error => {
            console.log(error);
        });
    }
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
exports.SuitabilityFormComponent = SuitabilityFormComponent;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdWl0YWJpbGl0eS1mb3JtL3N1aXRhYmlsaXR5LWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0NBQWlEO0FBQ2pELDRDQUF5QztBQUN6QyxnREFBNkM7QUFDN0Msa0VBQStEO0FBQy9ELDRDQUF5RDtBQUN6RCxrRUFBOEQ7QUFDOUQsa0VBQThEO0FBQzlELGtGQUFvRTtBQVVwRSxJQUFhLHdCQUF3QixHQUFyQztJQXFDSSxZQUFvQixhQUE0QixFQUN0QyxhQUE0QixFQUM1QixNQUFjLEVBQ2QsS0FBcUIsRUFDckIsV0FBd0I7UUFKZCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUN0QyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFuQ2xDLGNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyx5QkFBeUI7UUFDNUMsdUJBQXVCO1FBQ3ZCLHdCQUF3QjtRQUN4Qix3QkFBd0I7UUFDeEIsd0JBQXdCO1FBQ3hCLHdCQUF3QjtRQUN4Qix3QkFBd0I7UUFDeEIsRUFBRTtRQUNGLDBCQUEwQjtRQUMxQiwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBQzNCLDJCQUEyQjtRQUMzQiwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBRTNCLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBRXBCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFFaEIsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixXQUFNLEdBQVksS0FBSyxDQUFDO1FBRXhCLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUdyQyxnQkFBVyxHQUFVLEVB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LEVBQUUsbUVBQW1FO1FBQ2hGLFNBQVMsRUFBRSxDQUFDLGtFQUFrRSxDQUFDO0tBQ2xGLENBQUM7cUNBdUNxQyw4QkFBYTtRQUN2Qiw4QkFBYTtRQUNwQixlQUFNO1FBQ1AsdUJBQWM7UUFDUixvQ0FBVztHQXpDekIsd0JBQXdCLENBeWNwQztBQXpjWSw0REFBd0I7QUF5Y3BDLENBQUMiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvc3VpdGFiaWxpdHktZm9ybS9zdWl0YWJpbGl0eS1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jbGllbnRcIjtcclxuaW1wb3J0IHsgU3VpdGFiaWxpdHlGb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdWl0YWJpbGl0eUZvcm1cIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY2xpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ291cnNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb3Vyc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcbmRlY2xhcmUgdmFyIG1vbWVudDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3N1aXRhYmlsaXR5Rm9ybScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvc3VpdGFiaWxpdHktZm9ybS9zdWl0YWJpbGl0eS1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3N1aXRhYmlsaXR5LWZvcm0vc3VpdGFiaWxpdHktZm9ybS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTdWl0YWJpbGl0eUZvcm1Db21wb25lbnQge1xyXG4gICAgQElucHV0KCkgY2xpZW50OiBDbGllbnQ7XHJcbiAgICBASW5wdXQoKSBzdWl0YWJpbGl0eUZvcm06IFN1aXRhYmlsaXR5Rm9ybTtcclxuICAgIGVycm9yOiBhbnk7XHJcbiAgICBkYXRlOiBhbnk7XHJcbiAgICBjdXJyZW50VXNlcjogYW55O1xyXG4gICAgbmF2aWdhdGVkID0gZmFsc2U7IC8vIHRydWUgaWYgbmF2aWdhdGVkIGhlcmVcclxuICAgIC8vIHNob3dTZWN0aW9uMSA9IHRydWU7XHJcbiAgICAvLyBzaG93U2VjdGlvbjIgPSBmYWxzZTtcclxuICAgIC8vIHNob3dTZWN0aW9uMyA9IGZhbHNlO1xyXG4gICAgLy8gc2hvd1NlY3Rpb240ID0gZmFsc2U7XHJcbiAgICAvLyBzaG93U2VjdGlvbjUgPSBmYWxzZTtcclxuICAgIC8vIHNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgLy9cclxuICAgIC8vIHNob3dTZWN0aW9uQnRuMSA9IHRydWU7XHJcbiAgICAvLyBzaG93U2VjdGlvbkJ0bjIgPSBmYWxzZTtcclxuICAgIC8vIHNob3dTZWN0aW9uQnRuMyA9IGZhbHNlO1xyXG4gICAgLy8gc2hvd1NlY3Rpb25CdG40ID0gZmFsc2U7XHJcbiAgICAvLyBzaG93U2VjdGlvbkJ0bjUgPSBmYWxzZTtcclxuICAgIC8vIHNob3dTZWN0aW9uQnRuNiA9IGZhbHNlO1xyXG5cclxuICAgIHNlbGVjdGVkU2VjdGlvbiA9IDE7XHJcblxyXG4gICAgd2FybmluZyA9IGZhbHNlO1xyXG4gICAgcGFydEFQb2ludHMgPSAwO1xyXG4gICAgcGFydEJQb2ludHMgPSAwO1xyXG4gICAgdG90YWxQb2ludHMgPSAwO1xyXG5cclxuICAgIHBob25lMTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcGhvbmUyOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgc3R1ZGVudE51bWJlclRvZ2dsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNhbXB1c0xpc3Q6IGFueTtcclxuICAgIGNvdXJzZVR5cGVzOiBhbnlbXSA9IFtdO1xyXG4gICAgc2VsZWN0ZWRDb3Vyc2VUeXBlczogYW55W10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvdXJzZVNlcnZpY2U6IENvdXJzZVNlcnZpY2UsXHJcbiAgICAgIHByaXZhdGUgY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSxcclxuICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnQgPSBuZXcgQ2xpZW50KCk7XHJcbiAgICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0gPSBuZXcgU3VpdGFiaWxpdHlGb3JtKCk7XHJcbiAgICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uaXNWYWxpZEFnZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uYXZhaWxhYmxlRHVyaW5nQ2xhc3MgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFwcHJvcHJpYXRlR29hbCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB0aGlzLmNsaWVudC5hbGxvd0RldGFpbGVkTWVzc2FnZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2xpZW50Lm9rYXlUb1RleHQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNsaWVudC5hbGxvd0RldGFpbGVkTWVzc2FnZUFsdGVybmF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2xpZW50Lm9rYXlUb1RleHRBbHRlcm5hdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNhbXB1c0xpc3QgPSBbXHJcbiAgICAgICAgICB7bGFiZWw6ICdTZWxlY3QnLCB2YWx1ZTogbnVsbH0sXHJcbiAgICAgICAgICB7bGFiZWw6ICdCYXJyaWUnLCB2YWx1ZTogJ0JhcnJpZSd9LFxyXG4gICAgICAgICAge2xhYmVsOiAnT3JpbGxpYScsIHZhbHVlOiAnT3JpbGxpYSd9LFxyXG4gICAgICAgICAge2xhYmVsOiAnT3dlbiBTb3VuZCcsIHZhbHVlOiAnT3dlbiBTb3VuZCd9XHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgLy8gZ2V0IGNvdXJzZSB0eXBlc1xyXG4gICAgICB0aGlzLmNvdXJzZVNlcnZpY2UuZ2V0Q291cnNlVHlwZXMoKVxyXG4gICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXN1bHQuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvdXJzZVR5cGVzLnB1c2goe1xyXG4gICAgICAgICAgICAgIGxhYmVsOiBpLmNvdXJzZVR5cGUsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IGkuY291cnNlVHlwZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2xpY2tlZChpdGVtKSB7XHJcbiAgICAvLyAgICAgc3dpdGNoIChpdGVtKSB7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgJ3NlY3Rpb24xJzpcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gdHJ1ZTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24yID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMyA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjQgPSBmYWxzZTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb241ID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgJ3NlY3Rpb24yJzpcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IHRydWU7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMyA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjQgPSBmYWxzZTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb241ID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgJ3NlY3Rpb24zJzpcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSB0cnVlO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjQgPSBmYWxzZTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb241ID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgJ3NlY3Rpb240JzpcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb240ID0gdHJ1ZTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb241ID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgJ3NlY3Rpb241JzpcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb240ID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNSA9IHRydWU7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgJ3NlY3Rpb242JzpcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb240ID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNSA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjYgPSB0cnVlO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy50YWxseVBvaW50cygpO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMSA9IHRydWU7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb240ID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNSA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjYgPSBmYWxzZTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgdGFsbHlQb2ludHMoKSB7XHJcbiAgICAgICAgdmFyIGZhY3RvclBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy5wYXJ0QVBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy5wYXJ0QlBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy50b3RhbFBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy53YXJuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgLy8gUEFSVCBBXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLm9mZmVyU3RhcnREYXRlID09PSAnTGVzcyB0aGFuIG9uZSB5ZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5vZmZlclN0YXJ0RGF0ZSA9PT0gJ0luIG9uZSB5ZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5vZmZlclN0YXJ0RGF0ZSA9PT0gJ01vcmUgdGhhbiBhIFllYXInKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0ubWVldHNHb2FsID09PSAnTm8nKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLm1lZXRzR29hbCA9PT0gJ1llcyBidXQgbGFja3Mgc2tpbGxzL2hpZ2ggZW5vdWdoIG1hcmtzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5tZWV0c0dvYWwgPT09ICdZZXMnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0udGltZU91dE9mU2Nob29sID09PSAnNiBvciBtb3JlIHllYXJzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS50aW1lT3V0T2ZTY2hvb2wgPT09ICcxLTYgeWVhcnMnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLnRpbWVPdXRPZlNjaG9vbCA9PT0gJ0xlc3MgdGhhbiAxIHllYXInKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5Qcm9ncmFtQmVmb3JlID09PSAnTm8vTGVmdCB3aXRoIGFwcHJvcHJpYXRlIHJlYXNvbnMnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluUHJvZ3JhbUJlZm9yZSA9PT0gJ1llcyAtIEFwcHJvcHJpYXRlIHByb2dyZXNzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pblByb2dyYW1CZWZvcmUgPT09ICdZZXMg4oCTIE5vIHByb2dyZXNzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmVtcGxveW1lbnQgPT09ICdOb3Qgd29ya2luZycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZW1wbG95bWVudCA9PT0gJ1dvcmtpbmcgcGFydCB0aW1lJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5lbXBsb3ltZW50ID09PSAnV29ya2luZyBmdWxsIHRpbWUnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnRUknKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ09XJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdPRFNQJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdDcm93biBXYXJkJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdTZWxmLWVtcGxveWVkJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdTZWNvbmQgQ2FyZWVyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdObyBpbmNvbWUnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ0RlcGVuZGVudCBvZiBPVy9PRFNQJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdFbXBsb3llZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnSW50ZXJuYXRpb25hbCBTdHVkZW50JykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDA7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdXU0lCJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDA7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlID09PSAnNDUtNjUgeWVhcnMgb2xkJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZSA9PT0gJzE2LTE4IHllYXJzIG9sZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAwOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2UgPT09ICcxOS0yOSB5ZWFycyBvbGQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlID09PSAnNjUrIHllYXJzIG9sZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAwOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2UgPT09ICczMC00NCB5ZWFycyBvbGQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICAvL1BBUlQgQlxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5ob3Vyc1BlcldlZWsgPT09ICcxMC0yMCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaG91cnNQZXJXZWVrID09PSAnNS0xMCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaG91cnNQZXJXZWVrID09PSAnTGVzcyB0aGFuIDUnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0ud29ya0hpc3RvcnkgPT09ICdMZXNzIHRoYW4gMSB5ZWFyIGV4cGVyaWVuY2UnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLndvcmtIaXN0b3J5ID09PSAnMS00IHllYXJzIGV4cGVyaWVuY2UnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLndvcmtIaXN0b3J5ID09PSAnNCsgeWVhcnMgZXhwZXJpZW5jZScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JIZWFsdGgpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySW5zdHJ1Y3Rpb25zKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckNvbW11bmljYXRpb24pIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yTGFuZ3VhZ2UpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yQ29tcHV0ZXIpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySG91c2luZykgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JUcmFuc3BvcnRhdGlvbikgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JEYXljYXJlKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckludGVybmV0KSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvclBlcnNvbmFsKSB7IGZhY3RvclBvaW50cysrOyB9XHJcblxyXG4gICAgICAgIGlmIChmYWN0b3JQb2ludHMgPj0gMCAmJiBmYWN0b3JQb2ludHMgPD0gNCkgeyB0aGlzLnBhcnRCUG9pbnRzID0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKGZhY3RvclBvaW50cyA+PSA1ICYmIGZhY3RvclBvaW50cyA8PSA4KSB7IHRoaXMucGFydEJQb2ludHMgPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAoZmFjdG9yUG9pbnRzID49IDkpIHsgdGhpcy5wYXJ0QlBvaW50cyA9IDE7IH1cclxuXHJcbiAgICAgICAgdGhpcy50b3RhbFBvaW50cyA9IHRoaXMucGFydEFQb2ludHMgKyB0aGlzLnBhcnRCUG9pbnRzO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50b3RhbFBvaW50cyA8IDE4KSB7IHRoaXMud2FybmluZyA9IHRydWU7IH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBuZXh0KGV2ZW50LCBuZXh0U2VjdGlvbikge1xyXG4gICAgLy8gICAgIHN3aXRjaCAobmV4dFNlY3Rpb24pIHtcclxuICAgIC8vICAgICAgICAgY2FzZSAnc2VjdGlvbjInOlxyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbkJ0bjIgPSB0cnVlO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5jbGlja2VkKG5leHRTZWN0aW9uKTtcclxuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICAgICAgICBjYXNlICdzZWN0aW9uMyc6XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uQnRuMyA9IHRydWU7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmNsaWNrZWQobmV4dFNlY3Rpb24pO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgJ3NlY3Rpb240JzpcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb25CdG40ID0gdHJ1ZTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuY2xpY2tlZChuZXh0U2VjdGlvbik7XHJcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgY2FzZSAnc2VjdGlvbjUnOlxyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbkJ0bjUgPSB0cnVlO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5jbGlja2VkKG5leHRTZWN0aW9uKTtcclxuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICAgICAgICBjYXNlICdzZWN0aW9uNic6XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uQnRuNiA9IHRydWU7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmNsaWNrZWQobmV4dFNlY3Rpb24pO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIHZhbGlkYXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNsaWVudC5maXJzdE5hbWUgJiYgdGhpcy5jbGllbnQubGFzdE5hbWUgJiYgdGhpcy5jbGllbnQuY2FtcHVzKSB7XHJcbiAgICAgICAgICB2YXIgYmlydGhkYXkgPSBuZXcgRGF0ZSh0aGlzLmNsaWVudC5iaXJ0aGRheSk7XHJcbiAgICAgICAgICB2YXIgYmlydGhkYXlGb3JtYXQgPSBtb21lbnQoYmlydGhkYXkpLmZvcm1hdCgnREQtTU0tWVlZWScpO1xyXG4gICAgICAgICAgdGhpcy5jbGllbnQuaW5xdWlyeURhdGUgPSB0aGlzLmRhdGU7XHJcbiAgICAgICAgICBpZiAodGhpcy5waG9uZTEpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnQucGhvbmUgPSB0aGlzLmNsaWVudC5waG9uZSArIFwiIENlbGxcIjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50LnBob25lID0gdGhpcy5jbGllbnQucGhvbmUgKyBcIiBIb21lXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGhpcy5jbGllbnQubG9uZ0Rpc3RhbmNlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50LnBob25lID0gXCIrMSBcIiArIHRoaXMuY2xpZW50LnBob25lO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMucGhvbmUyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50LmFsdGVybmF0ZU51bWJlciA9IHRoaXMuY2xpZW50LmFsdGVybmF0ZU51bWJlciArIFwiIENlbGxcIjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50LmFsdGVybmF0ZU51bWJlciA9IHRoaXMuY2xpZW50LmFsdGVybmF0ZU51bWJlciArIFwiIEhvbWVcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLmNsaWVudC5sb25nRGlzdGFuY2VBbHRlcm5hdGUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnQuYWx0ZXJuYXRlTnVtYmVyID0gXCIrMSBcIiArIHRoaXMuY2xpZW50LmFsdGVybmF0ZU51bWJlcjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLnN0dWRlbnROdW1iZXJUb2dnbGUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5jbGllbnQuc3R1ZGVudE51bWJlciA9ICdUQkQnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMuY2xpZW50LnN0dWRlbnROdW1iZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgJ1dob29wcy4uLicsXHJcbiAgICAgICAgICAgICAgICBcIlBsZWFzZSBlbnRlciBhIHN0dWRlbnQgbnVtYmVyIG9yIHNlbGVjdCAnTm8nIGZvciAnQXR0ZW5kZWQgR2Vyb2dpYW4/J1wiLFxyXG4gICAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTZWN0aW9uID0gMTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLmNsaWVudC5lbWFpbCA9PSBudWxsIHx8IHRoaXMuY2xpZW50LmVtYWlsID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsaWVudC5jYW1wdXMgPT09ICdCYXJyaWUnKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5jbGllbnQuZW1haWwgPSAnQkEuQUNQQGdlb3JnaWFuY29sbGVnZS5jYSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jbGllbnQuY2FtcHVzID09PSAnT3JpbGxpYScpIHtcclxuICAgICAgICAgICAgICB0aGlzLmNsaWVudC5lbWFpbCA9ICdPUi5BQ1BAZ2VvcmdpYW5jb2xsZWdlLmNhJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNsaWVudC5jYW1wdXMgPT09ICdPd2VuIFNvdW5kJykge1xyXG4gICAgICAgICAgICAgIHRoaXMuY2xpZW50LmVtYWlsID0gJ09TLkFDUEBnZW9yZ2lhbmNvbGxlZ2UuY2EnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdGWUknLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJBbiBlbWFpbCBoYXMgbm90IGJlZW4gZW50ZXJlZCwgdGhlIHVzZXIgd2lsbCBiZSBhc3NpZ25lZCB0aGUgZm9sbG93aW5nIGVtYWlsIGFkZHJlc3MgYmFzZWQgb24gdGhlaXIgY2FtcHVzOiBcIiArIHRoaXMuY2xpZW50LmVtYWlsICsgXCIuIFBsZWFzZSBhc3Npc3QgdGhlbSBpbiBzaWduaW5nIGluXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW5mbycsXHJcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIGNvbnRpbnVlJyxcclxuICAgICAgICAgICAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgICAgICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGllbnQuZW1haWwgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNlY3Rpb24gPSAxO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrU3VpdGFiaWxpdHkoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja1N1aXRhYmlsaXR5KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgJ1dob29wcy4uLicsXHJcbiAgICAgICAgICAgICAgXCJQbGVhc2UgY29tcGxldGUgdGhlIGZpcnN0IHRocmVlIGZpZWxkcyBpbiB0aGUgJ0NsaWVudCBJbmZvJyBzZWN0aW9uXCIsXHJcbiAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZFNlY3Rpb24gPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja1N1aXRhYmlsaXR5KCkge1xyXG4gICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5zdWl0YWJpbGl0eUZvcm0pLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ1N1aXRhYmlsaXR5IEluY29tcGxldGUnLFxyXG4gICAgICAgICAgICB0ZXh0OiBcIlRoZSBzdWl0YWJpbGl0eSBzZWN0aW9uIG9mIHRoZSBmb3JtIGhhcyBub3QgYmVlbiBmaWxsZWQgb3V0LiBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY29udGludWU/XCIsXHJcbiAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcclxuICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBjb250aW51ZScsXHJcbiAgICAgICAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNlY3Rpb24gPSAyO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgICAgdGhpcy5zYXZlQ2xpZW50KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2F2ZUNsaWVudCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUNsaWVudCgpIHtcclxuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDb3Vyc2VUeXBlcy50b1N0cmluZygpICE9PSAnJykge1xyXG4gICAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLnNlbGVjdGVkQ291cnNlVHlwZXMgPSB0aGlzLnNlbGVjdGVkQ291cnNlVHlwZXMudG9TdHJpbmcoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgdGl0bGU6ICdTYXZpbmcuLi4nLFxyXG4gICAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgICB9KTtcclxuICAgICAgc3dhbC5zaG93TG9hZGluZygpO1xyXG4gICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgIC5jcmVhdGUodGhpcy5jbGllbnQsIHRoaXMuc3VpdGFiaWxpdHlGb3JtKVxyXG4gICAgICAgICAgLnRoZW4oY2xpZW50ID0+IHtcclxuICAgICAgICAgICAgaWYgKGNsaWVudC5yZXN1bHQgPT09IFwiZXJyb3JcIikge1xyXG4gICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQoY2xpZW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjbGllbnQubXNnID09PSBcInVzZXJuYW1lIGluIHVzZVwiKSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgJ1VzZXJuYW1lIHRha2VuJyxcclxuICAgICAgICAgICAgICAgICAgJ1BsZWFzZSBlbnRlciBhIGRpZmZlcmVudCBmaXJzdCBhbmQgbGFzdCBuYW1lLicsXHJcbiAgICAgICAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNlY3Rpb24gPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNsaWVudC5tc2cgPT09IFwiZW1haWwgaW4gdXNlXCIpIHtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAnRW1haWwgYWxyZWFkeSBpbiB1c2UnLFxyXG4gICAgICAgICAgICAgICAgICAnUGxlYXNlIGVudGVyIGEgZGlmZmVyZW50IGVtYWlsLicsXHJcbiAgICAgICAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNlY3Rpb24gPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNsaWVudC5tc2cgPT09IFwiaW5jb3JyZWN0IGVtYWlsIGZvcm1hdFwiKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuY2xpZW50LmVtYWlsID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2NsaWVudHMnXSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICAgJ0luY29ycmVjdCBlbWFpbCBmb3JtYXQnLFxyXG4gICAgICAgICAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBwcm9wZXIgZW1haWwuJyxcclxuICAgICAgICAgICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2VjdGlvbiA9IDE7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICBlbHNlIGlmIChjbGllbnQucmVzdWx0ID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNsaWVudC51c2VySUQpO1xyXG4gICAgICAgICAgICAgIHZhciBDdXJyZW50RGF0ZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xyXG4gICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ291cnNlVHlwZXMudG9TdHJpbmcoKSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICBmb3IgKGxldCBjb3Vyc2VUeXBlIG9mIHRoaXMuc2VsZWN0ZWRDb3Vyc2VUeXBlcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3Vyc2VTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRvV2FpdExpc3QoY2xpZW50LnVzZXJJRCwgY291cnNlVHlwZSwgQ3VycmVudERhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoaWxlIGFkZGluZyBzdHVkZW50IHRvIHdhaXQgbGlzdC4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yIC0gQWRkIHN0dWRlbnQgdG8gd2FpdCBsaXN0OiBcIiArIGVycm9yKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9jbGllbnRzJ10pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTZWN0aW9uID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgXCIgKyBlcnJvciApO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EYXRlQ2hhbmdlKGJpcnRoZGF0ZSA6IHN0cmluZyApIHtcclxuICAgICAgdmFyIHllYXJzID0gbW9tZW50KCkuZGlmZihiaXJ0aGRhdGUsICd5ZWFycycpO1xyXG4gICAgICBpZiAoeWVhcnMgPj0gMTYgJiYgeWVhcnMgPD0gMTgpIHtcclxuICAgICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZSA9IFwiMTYtMTggeWVhcnMgb2xkXCI7XHJcbiAgICAgIH0gZWxzZSBpZiAoeWVhcnMgPj0gMTkgJiYgeWVhcnMgPD0gMjkpIHtcclxuICAgICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZSA9IFwiMTktMjkgeWVhcnMgb2xkXCI7XHJcbiAgICAgIH0gZWxzZSBpZiAoeWVhcnMgPj0gMzAgJiYgeWVhcnMgPD0gNDQpIHtcclxuICAgICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZSA9IFwiMzAtNDQgeWVhcnMgb2xkXCI7XHJcbiAgICAgIH0gZWxzZSBpZiAoeWVhcnMgPj0gNDUgJiYgeWVhcnMgPD0gNjUpIHtcclxuICAgICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZSA9IFwiNDUtNjUgeWVhcnMgb2xkXCI7XHJcbiAgICAgIH0gZWxzZSBpZiAoeWVhcnMgPiA2NSkge1xyXG4gICAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlID0gXCI2NSsgeWVhcnMgb2xkXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5RXJyb3JBbGVydChlcnJvcikge1xyXG4gICAgICBzd2FsKFxyXG4gICAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICAgIGVycm9yLm1zZyxcclxuICAgICAgICAnZXJyb3InXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnQXJlIHlvdSBzdXJlPycsXHJcbiAgICAgICAgICB0ZXh0OiBcIkFueSBpbmZvcm1hdGlvbiBvbiB0aGlzIGZvcm0gd2lsbCBiZSBsb3N0IGlmIHlvdSBwcm9jZWVkIHdpdGhvdXQgc2F2aW5nLlwiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBjb250aW51ZSdcclxuICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcbiJdfQ==
