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
    validate() {
        if (this.client.firstName && this.client.lastName && this.client.campus) {
            var birthdate = new Date(this.client.birthdate);
            this.client.birthdate = moment(birthdate).format('DD/MM/YYYY');
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
        if (error.title === "Auth Error") {
            this.router.navigate(['/login']);
            swal(error.title, error.msg, 'info');
        }
        else {
            swal(error.title, error.msg, 'error');
        }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdWl0YWJpbGl0eS1mb3JtL3N1aXRhYmlsaXR5LWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0NBQWlEO0FBQ2pELDRDQUF5QztBQUN6QyxnREFBNkM7QUFDN0Msa0VBQStEO0FBQy9ELDRDQUF5RDtBQUN6RCxrRUFBOEQ7QUFDOUQsa0VBQThEO0FBQzlELGtGQUFvRTtBQVVwRSxJQUFhLHdCQUF3QixHQUFyQztJQXVCSSxZQUFvQixhQUE0QixFQUN0QyxhQUE0QixFQUM1QixNQUFjLEVBQ2QsS0FBcUIsRUFDckIsV0FBd0I7UUFKZCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUN0QyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFyQmxDLGNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyx5QkFBeUI7UUFDNUMsb0JBQWUsR0FBRyxDQUFDLENBQUM7UUFFcEIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUVoQixXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFFeEIsd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBR3JDLGdCQUFXLEdBQVUsRUFBRSxDQUFDO1FBQ3hCLHdCQUFtQixHQUFVLEVBQUUsQ0FBQztRQU81QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGlDQUFlLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsR0FBRyxJ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aWxpdHktZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENsaWVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2xpZW50XCI7XHJcbmltcG9ydCB7IFN1aXRhYmlsaXR5Rm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3VpdGFiaWxpdHlGb3JtXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY291cnNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5kZWNsYXJlIHZhciBtb21lbnQ6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdzdWl0YWJpbGl0eUZvcm0nLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3N1aXRhYmlsaXR5LWZvcm0vc3VpdGFiaWxpdHktZm9ybS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9zdWl0YWJpbGl0eS1mb3JtL3N1aXRhYmlsaXR5LWZvcm0uY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU3VpdGFiaWxpdHlGb3JtQ29tcG9uZW50IHtcclxuICAgIEBJbnB1dCgpIGNsaWVudDogQ2xpZW50O1xyXG4gICAgQElucHV0KCkgc3VpdGFiaWxpdHlGb3JtOiBTdWl0YWJpbGl0eUZvcm07XHJcbiAgICBlcnJvcjogYW55O1xyXG4gICAgZGF0ZTogYW55O1xyXG4gICAgY3VycmVudFVzZXI6IGFueTtcclxuICAgIG5hdmlnYXRlZCA9IGZhbHNlOyAvLyB0cnVlIGlmIG5hdmlnYXRlZCBoZXJlXHJcbiAgICBzZWxlY3RlZFNlY3Rpb24gPSAxO1xyXG5cclxuICAgIHdhcm5pbmcgPSBmYWxzZTtcclxuICAgIHBhcnRBUG9pbnRzID0gMDtcclxuICAgIHBhcnRCUG9pbnRzID0gMDtcclxuICAgIHRvdGFsUG9pbnRzID0gMDtcclxuXHJcbiAgICBwaG9uZTE6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHBob25lMjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHN0dWRlbnROdW1iZXJUb2dnbGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjYW1wdXNMaXN0OiBhbnk7XHJcbiAgICBjb3Vyc2VUeXBlczogYW55W10gPSBbXTtcclxuICAgIHNlbGVjdGVkQ291cnNlVHlwZXM6IGFueVtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb3Vyc2VTZXJ2aWNlOiBDb3Vyc2VTZXJ2aWNlLFxyXG4gICAgICBwcml2YXRlIGNsaWVudFNlcnZpY2U6IENsaWVudFNlcnZpY2UsXHJcbiAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuY2xpZW50ID0gbmV3IENsaWVudCgpO1xyXG4gICAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtID0gbmV3IFN1aXRhYmlsaXR5Rm9ybSgpO1xyXG4gICAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmlzVmFsaWRBZ2UgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmF2YWlsYWJsZUR1cmluZ0NsYXNzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hcHByb3ByaWF0ZUdvYWwgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdGhpcy5jbGllbnQuYWxsb3dEZXRhaWxlZE1lc3NhZ2UgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNsaWVudC5va2F5VG9UZXh0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jbGllbnQuYWxsb3dEZXRhaWxlZE1lc3NhZ2VBbHRlcm5hdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNsaWVudC5va2F5VG9UZXh0QWx0ZXJuYXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYW1wdXNMaXN0ID0gW1xyXG4gICAgICAgICAge2xhYmVsOiAnU2VsZWN0JywgdmFsdWU6IG51bGx9LFxyXG4gICAgICAgICAge2xhYmVsOiAnQmFycmllJywgdmFsdWU6ICdCYXJyaWUnfSxcclxuICAgICAgICAgIHtsYWJlbDogJ09yaWxsaWEnLCB2YWx1ZTogJ09yaWxsaWEnfSxcclxuICAgICAgICAgIHtsYWJlbDogJ093ZW4gU291bmQnLCB2YWx1ZTogJ093ZW4gU291bmQnfVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgIC8vIGdldCBjb3Vyc2UgdHlwZXNcclxuICAgICAgdGhpcy5jb3Vyc2VTZXJ2aWNlLmdldENvdXJzZVR5cGVzKClcclxuICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSBcImVycm9yXCIpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVzdWx0LmZvckVhY2goKGkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jb3Vyc2VUeXBlcy5wdXNoKHtcclxuICAgICAgICAgICAgICBsYWJlbDogaS5jb3Vyc2VUeXBlLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBpLmNvdXJzZVR5cGVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRhbGx5UG9pbnRzKCkge1xyXG4gICAgICAgIHZhciBmYWN0b3JQb2ludHMgPSAwO1xyXG4gICAgICAgIHRoaXMucGFydEFQb2ludHMgPSAwO1xyXG4gICAgICAgIHRoaXMucGFydEJQb2ludHMgPSAwO1xyXG4gICAgICAgIHRoaXMudG90YWxQb2ludHMgPSAwO1xyXG4gICAgICAgIHRoaXMud2FybmluZyA9IGZhbHNlO1xyXG4gICAgICAgIC8vIFBBUlQgQVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5vZmZlclN0YXJ0RGF0ZSA9PT0gJ0xlc3MgdGhhbiBvbmUgeWVhcicpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ub2ZmZXJTdGFydERhdGUgPT09ICdJbiBvbmUgeWVhcicpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ub2ZmZXJTdGFydERhdGUgPT09ICdNb3JlIHRoYW4gYSBZZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLm1lZXRzR29hbCA9PT0gJ05vJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5tZWV0c0dvYWwgPT09ICdZZXMgYnV0IGxhY2tzIHNraWxscy9oaWdoIGVub3VnaCBtYXJrcycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ubWVldHNHb2FsID09PSAnWWVzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLnRpbWVPdXRPZlNjaG9vbCA9PT0gJzYgb3IgbW9yZSB5ZWFycycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0udGltZU91dE9mU2Nob29sID09PSAnMS02IHllYXJzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS50aW1lT3V0T2ZTY2hvb2wgPT09ICdMZXNzIHRoYW4gMSB5ZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluUHJvZ3JhbUJlZm9yZSA9PT0gJ05vL0xlZnQgd2l0aCBhcHByb3ByaWF0ZSByZWFzb25zJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pblByb2dyYW1CZWZvcmUgPT09ICdZZXMgLSBBcHByb3ByaWF0ZSBwcm9ncmVzcycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5Qcm9ncmFtQmVmb3JlID09PSAnWWVzIOKAkyBObyBwcm9ncmVzcycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5lbXBsb3ltZW50ID09PSAnTm90IHdvcmtpbmcnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmVtcGxveW1lbnQgPT09ICdXb3JraW5nIHBhcnQgdGltZScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZW1wbG95bWVudCA9PT0gJ1dvcmtpbmcgZnVsbCB0aW1lJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ0VJJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdPVycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnT0RTUCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnQ3Jvd24gV2FyZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnU2VsZi1lbXBsb3llZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnU2Vjb25kIENhcmVlcicpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnTm8gaW5jb21lJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdEZXBlbmRlbnQgb2YgT1cvT0RTUCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnRW1wbG95ZWQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ0ludGVybmF0aW9uYWwgU3R1ZGVudCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAwOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnV1NJQicpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAwOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZSA9PT0gJzQ1LTY1IHllYXJzIG9sZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2UgPT09ICcxNi0xOCB5ZWFycyBvbGQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMDsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlID09PSAnMTktMjkgeWVhcnMgb2xkJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZSA9PT0gJzY1KyB5ZWFycyBvbGQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMDsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlID09PSAnMzAtNDQgeWVhcnMgb2xkJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgLy9QQVJUIEJcclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaG91cnNQZXJXZWVrID09PSAnMTAtMjAnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmhvdXJzUGVyV2VlayA9PT0gJzUtMTAnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmhvdXJzUGVyV2VlayA9PT0gJ0xlc3MgdGhhbiA1JykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLndvcmtIaXN0b3J5ID09PSAnTGVzcyB0aGFuIDEgeWVhciBleHBlcmllbmNlJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS53b3JrSGlzdG9yeSA9PT0gJzEtNCB5ZWFycyBleHBlcmllbmNlJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS53b3JrSGlzdG9yeSA9PT0gJzQrIHllYXJzIGV4cGVyaWVuY2UnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySGVhbHRoKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3Rvckluc3RydWN0aW9ucykgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JDb21tdW5pY2F0aW9uKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3Rvckxhbmd1YWdlKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckNvbXB1dGVyKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhvdXNpbmcpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yVHJhbnNwb3J0YXRpb24pIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yRGF5Y2FyZSkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JJbnRlcm5ldCkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JQZXJzb25hbCkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG5cclxuICAgICAgICBpZiAoZmFjdG9yUG9pbnRzID49IDAgJiYgZmFjdG9yUG9pbnRzIDw9IDQpIHsgdGhpcy5wYXJ0QlBvaW50cyA9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgIChmYWN0b3JQb2ludHMgPj0gNSAmJiBmYWN0b3JQb2ludHMgPD0gOCkgeyB0aGlzLnBhcnRCUG9pbnRzID0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICAgKGZhY3RvclBvaW50cyA+PSA5KSB7IHRoaXMucGFydEJQb2ludHMgPSAxOyB9XHJcblxyXG4gICAgICAgIHRoaXMudG90YWxQb2ludHMgPSB0aGlzLnBhcnRBUG9pbnRzICsgdGhpcy5wYXJ0QlBvaW50cztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudG90YWxQb2ludHMgPCAxOCkgeyB0aGlzLndhcm5pbmcgPSB0cnVlOyB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFsaWRhdGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2xpZW50LmZpcnN0TmFtZSAmJiB0aGlzLmNsaWVudC5sYXN0TmFtZSAmJiB0aGlzLmNsaWVudC5jYW1wdXMpIHtcclxuICAgICAgICAgIHZhciBiaXJ0aGRhdGUgPSBuZXcgRGF0ZSh0aGlzLmNsaWVudC5iaXJ0aGRhdGUpO1xyXG4gICAgICAgICAgdGhpcy5jbGllbnQuYmlydGhkYXRlID0gbW9tZW50KGJpcnRoZGF0ZSkuZm9ybWF0KCdERC9NTS9ZWVlZJyk7XHJcbiAgICAgICAgICB0aGlzLmNsaWVudC5pbnF1aXJ5RGF0ZSA9IHRoaXMuZGF0ZTtcclxuICAgICAgICAgIGlmICh0aGlzLnBob25lMSkge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudC5waG9uZSA9IHRoaXMuY2xpZW50LnBob25lICsgXCIgQ2VsbFwiO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnQucGhvbmUgPSB0aGlzLmNsaWVudC5waG9uZSArIFwiIEhvbWVcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLmNsaWVudC5sb25nRGlzdGFuY2UgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnQucGhvbmUgPSBcIisxIFwiICsgdGhpcy5jbGllbnQucGhvbmU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGhpcy5waG9uZTIpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnQuYWx0ZXJuYXRlTnVtYmVyID0gdGhpcy5jbGllbnQuYWx0ZXJuYXRlTnVtYmVyICsgXCIgQ2VsbFwiO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnQuYWx0ZXJuYXRlTnVtYmVyID0gdGhpcy5jbGllbnQuYWx0ZXJuYXRlTnVtYmVyICsgXCIgSG9tZVwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMuY2xpZW50LmxvbmdEaXN0YW5jZUFsdGVybmF0ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudC5hbHRlcm5hdGVOdW1iZXIgPSBcIisxIFwiICsgdGhpcy5jbGllbnQuYWx0ZXJuYXRlTnVtYmVyO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMuc3R1ZGVudE51bWJlclRvZ2dsZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICB0aGlzLmNsaWVudC5zdHVkZW50TnVtYmVyID0gJ1RCRCc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGhpcy5jbGllbnQuc3R1ZGVudE51bWJlciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAnV2hvb3BzLi4uJyxcclxuICAgICAgICAgICAgICAgIFwiUGxlYXNlIGVudGVyIGEgc3R1ZGVudCBudW1iZXIgb3Igc2VsZWN0ICdObycgZm9yICdBdHRlbmRlZCBHZXJvZ2lhbj8nXCIsXHJcbiAgICAgICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNlY3Rpb24gPSAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMuY2xpZW50LmVtYWlsID09IG51bGwgfHwgdGhpcy5jbGllbnQuZW1haWwgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xpZW50LmNhbXB1cyA9PT0gJ0JhcnJpZScpIHtcclxuICAgICAgICAgICAgICB0aGlzLmNsaWVudC5lbWFpbCA9ICdCQS5BQ1BAZ2VvcmdpYW5jb2xsZWdlLmNhJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNsaWVudC5jYW1wdXMgPT09ICdPcmlsbGlhJykge1xyXG4gICAgICAgICAgICAgIHRoaXMuY2xpZW50LmVtYWlsID0gJ09SLkFDUEBnZW9yZ2lhbmNvbGxlZ2UuY2EnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2xpZW50LmNhbXB1cyA9PT0gJ093ZW4gU291bmQnKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5jbGllbnQuZW1haWwgPSAnT1MuQUNQQGdlb3JnaWFuY29sbGVnZS5jYSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0ZZSScsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkFuIGVtYWlsIGhhcyBub3QgYmVlbiBlbnRlcmVkLCB0aGUgdXNlciB3aWxsIGJlIGFzc2lnbmVkIHRoZSBmb2xsb3dpbmcgZW1haWwgYWRkcmVzcyBiYXNlZCBvbiB0aGVpciBjYW1wdXM6IFwiICsgdGhpcy5jbGllbnQuZW1haWwgKyBcIi4gUGxlYXNlIGFzc2lzdCB0aGVtIGluIHNpZ25pbmcgaW5cIixcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcclxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgY29udGludWUnLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICAgICAgICBpZiAoaXNDb25maXJtLmRpc21pc3MgPT09IFwiY2FuY2VsXCIgfHwgaXNDb25maXJtLmRpc21pc3MgPT09IFwib3ZlcmxheVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWVudC5lbWFpbCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2VjdGlvbiA9IDE7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tTdWl0YWJpbGl0eSgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrU3VpdGFiaWxpdHkoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAnV2hvb3BzLi4uJyxcclxuICAgICAgICAgICAgICBcIlBsZWFzZSBjb21wbGV0ZSB0aGUgZmlyc3QgdGhyZWUgZmllbGRzIGluIHRoZSAnQ2xpZW50IEluZm8nIHNlY3Rpb25cIixcclxuICAgICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkU2VjdGlvbiA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrU3VpdGFiaWxpdHkoKSB7XHJcbiAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLnN1aXRhYmlsaXR5Rm9ybSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnU3VpdGFiaWxpdHkgSW5jb21wbGV0ZScsXHJcbiAgICAgICAgICAgIHRleHQ6IFwiVGhlIHN1aXRhYmlsaXR5IHNlY3Rpb24gb2YgdGhlIGZvcm0gaGFzIG5vdCBiZWVuIGZpbGxlZCBvdXQuIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjb250aW51ZT9cIixcclxuICAgICAgICAgICAgdHlwZTogJ2luZm8nLFxyXG4gICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIGNvbnRpbnVlJyxcclxuICAgICAgICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2VjdGlvbiA9IDI7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVDbGllbnQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zYXZlQ2xpZW50KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzYXZlQ2xpZW50KCkge1xyXG4gICAgICBpZiAodGhpcy5zZWxlY3RlZENvdXJzZVR5cGVzLnRvU3RyaW5nKCkgIT09ICcnKSB7XHJcbiAgICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uc2VsZWN0ZWRDb3Vyc2VUeXBlcyA9IHRoaXMuc2VsZWN0ZWRDb3Vyc2VUeXBlcy50b1N0cmluZygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogJ1NhdmluZy4uLicsXHJcbiAgICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICAgIH0pO1xyXG4gICAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgICAgLmNyZWF0ZSh0aGlzLmNsaWVudCwgdGhpcy5zdWl0YWJpbGl0eUZvcm0pXHJcbiAgICAgICAgICAudGhlbihjbGllbnQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2xpZW50LnJlc3VsdCA9PT0gXCJlcnJvclwiKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChjbGllbnQpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNsaWVudC5tc2cgPT09IFwidXNlcm5hbWUgaW4gdXNlXCIpIHtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAnVXNlcm5hbWUgdGFrZW4nLFxyXG4gICAgICAgICAgICAgICAgICAnUGxlYXNlIGVudGVyIGEgZGlmZmVyZW50IGZpcnN0IGFuZCBsYXN0IG5hbWUuJyxcclxuICAgICAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2VjdGlvbiA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2xpZW50Lm1zZyA9PT0gXCJlbWFpbCBpbiB1c2VcIikge1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICdFbWFpbCBhbHJlYWR5IGluIHVzZScsXHJcbiAgICAgICAgICAgICAgICAgICdQbGVhc2UgZW50ZXIgYSBkaWZmZXJlbnQgZW1haWwuJyxcclxuICAgICAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2VjdGlvbiA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2xpZW50Lm1zZyA9PT0gXCJpbmNvcnJlY3QgZW1haWwgZm9ybWF0XCIpIHtcclxuICAgICAgICAgICAgICBpZiAodGhpcy5jbGllbnQuZW1haWwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvY2xpZW50cyddKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAnSW5jb3JyZWN0IGVtYWlsIGZvcm1hdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ1BsZWFzZSBlbnRlciBhIHByb3BlciBlbWFpbC4nLFxyXG4gICAgICAgICAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRTZWN0aW9uID0gMTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gIGVsc2UgaWYgKGNsaWVudC5yZXN1bHQgPT09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgdmFyIEN1cnJlbnREYXRlID0gbW9tZW50KCkuZm9ybWF0KCk7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDb3Vyc2VUeXBlcy50b1N0cmluZygpICE9PSAnJykge1xyXG4gICAgICAgICAgICAgIGZvciAobGV0IGNvdXJzZVR5cGUgb2YgdGhpcy5zZWxlY3RlZENvdXJzZVR5cGVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvdXJzZVNlcnZpY2VcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVG9XYWl0TGlzdChjbGllbnQudXNlcklELCBjb3Vyc2VUeXBlLCBDdXJyZW50RGF0ZSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgYWRkaW5nIHN0dWRlbnQgdG8gd2FpdCBsaXN0LicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3IgLSBBZGQgc3R1ZGVudCB0byB3YWl0IGxpc3Q6IFwiICsgZXJyb3IpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2NsaWVudHMnXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNlY3Rpb24gPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBcIiArIGVycm9yICk7XHJcbiAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRhdGVDaGFuZ2UoYmlydGhkYXRlIDogc3RyaW5nICkge1xyXG4gICAgICB2YXIgeWVhcnMgPSBtb21lbnQoKS5kaWZmKGJpcnRoZGF0ZSwgJ3llYXJzJyk7XHJcbiAgICAgIGlmICh5ZWFycyA+PSAxNiAmJiB5ZWFycyA8PSAxOCkge1xyXG4gICAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlID0gXCIxNi0xOCB5ZWFycyBvbGRcIjtcclxuICAgICAgfSBlbHNlIGlmICh5ZWFycyA+PSAxOSAmJiB5ZWFycyA8PSAyOSkge1xyXG4gICAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlID0gXCIxOS0yOSB5ZWFycyBvbGRcIjtcclxuICAgICAgfSBlbHNlIGlmICh5ZWFycyA+PSAzMCAmJiB5ZWFycyA8PSA0NCkge1xyXG4gICAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlID0gXCIzMC00NCB5ZWFycyBvbGRcIjtcclxuICAgICAgfSBlbHNlIGlmICh5ZWFycyA+PSA0NSAmJiB5ZWFycyA8PSA2NSkge1xyXG4gICAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlID0gXCI0NS02NSB5ZWFycyBvbGRcIjtcclxuICAgICAgfSBlbHNlIGlmICh5ZWFycyA+IDY1KSB7XHJcbiAgICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2UgPSBcIjY1KyB5ZWFycyBvbGRcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlFcnJvckFsZXJ0KGVycm9yKSB7XHJcbiAgICAgIGlmIChlcnJvci50aXRsZSA9PT0gXCJBdXRoIEVycm9yXCIpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sb2dpbiddKTtcclxuICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgICAgICBlcnJvci5tc2csXHJcbiAgICAgICAgICAnaW5mbydcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN3YWwoXHJcbiAgICAgICAgICBlcnJvci50aXRsZSxcclxuICAgICAgICAgIGVycm9yLm1zZyxcclxuICAgICAgICAgICdlcnJvcidcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnQXJlIHlvdSBzdXJlPycsXHJcbiAgICAgICAgICB0ZXh0OiBcIkFueSBpbmZvcm1hdGlvbiBvbiB0aGlzIGZvcm0gd2lsbCBiZSBsb3N0IGlmIHlvdSBwcm9jZWVkIHdpdGhvdXQgc2F2aW5nLlwiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBjb250aW51ZSdcclxuICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcbiJdfQ==
