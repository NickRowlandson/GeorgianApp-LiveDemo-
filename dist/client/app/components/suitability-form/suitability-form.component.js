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
var SuitabilityFormComponent = (function () {
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
        this.partAWarning = false;
        this.partBWarning = false;
        this.partAPoints = 0;
        this.partBPoints = 0;
        this.totalPoints = 0;
        this.client = new client_1.Client();
        this.suitabilityForm = new suitabilityForm_1.SuitabilityForm();
        this.date = new Date();
    }
    SuitabilityFormComponent.prototype.ngOnInit = function () {
    };
    SuitabilityFormComponent.prototype.clicked = function (event, item) {
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
        this.partAWarning = false;
        this.partBWarning = false;
        // PART A
        if (this.suitabilityForm.offerStartDate === '< 1 year') {
            this.partAPoints += 3;
        }
        else if (this.suitabilityForm.offerStartDate === '1 year') {
            this.partAPoints += 2;
        }
        else if (this.suitabilityForm.offerStartDate === '> 1 year') {
            this.partAPoints += 1;
        }
        if (this.suitabilityForm.meetsGoal === 'no') {
            this.partAPoints += 3;
        }
        else if (this.suitabilityForm.meetsGoal === 'lacking') {
            this.partAPoints += 2;
        }
        else if (this.suitabilityForm.meetsGoal === 'yes') {
            this.partAPoints += 1;
        }
        if (this.suitabilityForm.timeOutOfSchool === '6+') {
            this.partAPoints += 3;
        }
        else if (this.suitabilityForm.timeOutOfSchool === '1-6') {
            this.partAPoints += 2;
        }
        else if (this.suitabilityForm.timeOutOfSchool === '<1') {
            this.partAPoints += 1;
        }
        if (this.suitabilityForm.inProgramBefore === 'no') {
            this.partAPoints += 3;
        }
        else if (this.suitabilityForm.inProgramBefore === 'yesWithApp') {
            this.partAPoints += 2;
        }
        else if (this.suitabilityForm.inProgramBefore === 'yes') {
            this.partAPoints += 1;
        }
        if (this.suitabilityForm.employment === 'no') {
            this.partAPoints += 3;
        }
        else if (this.suitabilityForm.employment === 'part') {
            this.partAPoints += 2;
        }
        else if (this.suitabilityForm.employment === 'full') {
            this.partAPoints += 1;
        }
        if (this.suitabilityForm.incomeSource === 'no') {
            this.partAPoints += 3;
        }
        else if (this.suitabilityForm.incomeSource === 'noInc') {
            this.partAPoints += 2;
        }
        else if (this.suitabilityForm.incomeSource === 'yes') {
            this.partAPoints += 1;
        }
        if (this.suitabilityForm.ageRange === '45-65') {
            this.partAPoints += 3;
        }
        else if (this.suitabilityForm.ageRange === '19-29') {
            this.partAPoints += 2;
        }
        else if (this.suitabilityForm.ageRange === '30-44') {
            this.partAPoints += 1;
        }
        //PART B
        if (this.suitabilityForm.hoursPerWeek === '10-20') {
            this.partBPoints += 3;
        }
        else if (this.suitabilityForm.hoursPerWeek === '5-10') {
            this.partBPoints += 2;
        }
        else if (this.suitabilityForm.hoursPerWeek === '<5') {
            this.partBPoints += 1;
        }
        if (this.suitabilityForm.workHistory === '<1') {
            this.partBPoints += 3;
        }
        else if (this.suitabilityForm.workHistory === '1-4') {
            this.partBPoints += 2;
        }
        else if (this.suitabilityForm.workHistory === '>4') {
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
    SuitabilityFormComponent.prototype.next = function (event, nextSection) {
        switch (nextSection) {
            case 'section2':
                this.showSectionBtn2 = true;
                this.clicked(event, nextSection);
                break;
            case 'section3':
                this.showSectionBtn3 = true;
                this.clicked(event, nextSection);
                break;
            case 'section4':
                this.showSectionBtn4 = true;
                this.clicked(event, nextSection);
                break;
            case 'section5':
                this.showSectionBtn5 = true;
                this.clicked(event, nextSection);
                break;
            case 'section6':
                this.showSectionBtn6 = true;
                this.clicked(event, nextSection);
                break;
            default:
        }
    };
    SuitabilityFormComponent.prototype.save = function () {
        var _this = this;
        this.client["inquiryDate"] = this.date;
        this.client["username"] = this.client.firstName + this.client.lastName;
        this.client["password"] = this.client.birthday.replace(/-/g, "");
        console.log('save clicked');
        this.clientService
            .save(this.client, this.suitabilityForm)
            .then(function (client) {
            console.log('then');
            _this.client = client; // saved client, w/ id if new
            _this.router.navigate(['/clients']);
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    SuitabilityFormComponent.prototype.goBack = function () {
        window.history.back();
    };
    return SuitabilityFormComponent;
}());
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
exports.SuitabilityFormComponent = SuitabilityFormComponent;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdWl0YWJpbGl0eS1mb3JtL3N1aXRhYmlsaXR5LWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWlEO0FBQ2pELDBDQUF5QztBQUN6Qyw4Q0FBNkM7QUFDN0MsZ0VBQStEO0FBQy9ELDBDQUF5RDtBQUN6RCxnRUFBOEQ7QUFDOUQsZ0ZBQW9FO0FBUXBFLElBQWEsd0JBQXdCO0lBMkJqQyxrQ0FBb0IsYUFBNEIsRUFBVSxNQUFjLEVBQVUsS0FBcUIsRUFBVSxXQUF3QjtRQUFySCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBckJ6SSxjQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMseUJBQXlCO1FBQzVDLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXJCLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBRXhCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGdCQUFXLEdBQUcsQ0FBQyxDQUFD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QUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUMvRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUNqRixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFFckUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQ3JGLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQ25GLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUUxRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDckYsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDMUYsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBRTNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUNoRixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUMvRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFFdkUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQ2xGLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQ2xGLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUV4RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDakYsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDOUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBRXRFLFFBQVE7UUFDUixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDckYsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDakYsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBRXZFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUNqRixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUMvRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFFdEUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQzFELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQ2hFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQ2pFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUFDLFlBQVksRUFBRSxDQUFDO1FBQUMsQ0FBQztRQUM1RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDNUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQzNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQ2xFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUFDLFlBQVksRUFBRSxDQUFDO1FBQUMsQ0FBQztRQUMzRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDNUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBRTVELEVBQUUsQ0FBQyxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUM5RSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUMxRSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBRXZELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQUMsQ0FBQztRQUN4RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELHVDQUFJLEdBQUosVUFBSyxLQUFLLEVBQUUsV0FBVztRQUNu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eS1mb3JtL3N1aXRhYmlsaXR5LWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NsaWVudFwiO1xyXG5pbXBvcnQgeyBTdWl0YWJpbGl0eUZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N1aXRhYmlsaXR5Rm9ybVwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ2xpZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jbGllbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3N1aXRhYmlsaXR5Rm9ybScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvc3VpdGFiaWxpdHktZm9ybS9zdWl0YWJpbGl0eS1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3N1aXRhYmlsaXR5LWZvcm0vc3VpdGFiaWxpdHktZm9ybS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTdWl0YWJpbGl0eUZvcm1Db21wb25lbnQge1xyXG4gICAgQElucHV0KCkgY2xpZW50OiBDbGllbnQ7XHJcbiAgICBASW5wdXQoKSBzdWl0YWJpbGl0eUZvcm06IFN1aXRhYmlsaXR5Rm9ybTtcclxuICAgIGVycm9yOiBhbnk7XHJcbiAgICBkYXRlOiBhbnk7XHJcbiAgICBjdXJyZW50VXNlcjogYW55O1xyXG4gICAgbmF2aWdhdGVkID0gZmFsc2U7IC8vIHRydWUgaWYgbmF2aWdhdGVkIGhlcmVcclxuICAgIHNob3dTZWN0aW9uMSA9IHRydWU7XHJcbiAgICBzaG93U2VjdGlvbjIgPSBmYWxzZTtcclxuICAgIHNob3dTZWN0aW9uMyA9IGZhbHNlO1xyXG4gICAgc2hvd1NlY3Rpb240ID0gZmFsc2U7XHJcbiAgICBzaG93U2VjdGlvbjUgPSBmYWxzZTtcclxuICAgIHNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG5cclxuICAgIHNob3dTZWN0aW9uQnRuMSA9IHRydWU7XHJcbiAgICBzaG93U2VjdGlvbkJ0bjIgPSBmYWxzZTtcclxuICAgIHNob3dTZWN0aW9uQnRuMyA9IGZhbHNlO1xyXG4gICAgc2hvd1NlY3Rpb25CdG40ID0gZmFsc2U7XHJcbiAgICBzaG93U2VjdGlvbkJ0bjUgPSBmYWxzZTtcclxuICAgIHNob3dTZWN0aW9uQnRuNiA9IGZhbHNlO1xyXG5cclxuICAgIHBhcnRBV2FybmluZyA9IGZhbHNlO1xyXG4gICAgcGFydEJXYXJuaW5nID0gZmFsc2U7XHJcbiAgICBwYXJ0QVBvaW50cyA9IDA7XHJcbiAgICBwYXJ0QlBvaW50cyA9IDA7XHJcbiAgICB0b3RhbFBvaW50cyA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjbGllbnRTZXJ2aWNlOiBDbGllbnRTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLmNsaWVudCA9IG5ldyBDbGllbnQoKTtcclxuICAgICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybSA9IG5ldyBTdWl0YWJpbGl0eUZvcm0oKTtcclxuICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjbGlja2VkKGV2ZW50LCBpdGVtKSB7XHJcbiAgICAgICAgc3dpdGNoIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24xJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb241ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24yJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb241ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24zJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb241ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb240JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb240ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb241ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb241JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb240ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb242JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb240ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjYgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWxseVBvaW50cygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb240ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uNSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbjYgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGFsbHlQb2ludHMoKSB7XHJcbiAgICAgICAgdmFyIGZhY3RvclBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy5wYXJ0QVBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy5wYXJ0QlBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy50b3RhbFBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy5wYXJ0QVdhcm5pbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBhcnRCV2FybmluZyA9IGZhbHNlO1xyXG4gICAgICAgIC8vIFBBUlQgQVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5vZmZlclN0YXJ0RGF0ZSA9PT0gJzwgMSB5ZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5vZmZlclN0YXJ0RGF0ZSA9PT0gJzEgeWVhcicpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ub2ZmZXJTdGFydERhdGUgPT09ICc+IDEgeWVhcicpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5tZWV0c0dvYWwgPT09ICdubycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ubWVldHNHb2FsID09PSAnbGFja2luZycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ubWVldHNHb2FsID09PSAneWVzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLnRpbWVPdXRPZlNjaG9vbCA9PT0gJzYrJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS50aW1lT3V0T2ZTY2hvb2wgPT09ICcxLTYnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLnRpbWVPdXRPZlNjaG9vbCA9PT0gJzwxJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluUHJvZ3JhbUJlZm9yZSA9PT0gJ25vJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pblByb2dyYW1CZWZvcmUgPT09ICd5ZXNXaXRoQXBwJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pblByb2dyYW1CZWZvcmUgPT09ICd5ZXMnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZW1wbG95bWVudCA9PT0gJ25vJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5lbXBsb3ltZW50ID09PSAncGFydCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZW1wbG95bWVudCA9PT0gJ2Z1bGwnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnbm8nKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ25vSW5jJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICd5ZXMnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2UgPT09ICc0NS02NScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2UgPT09ICcxOS0yOScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2UgPT09ICczMC00NCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgICAgIC8vUEFSVCBCXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmhvdXJzUGVyV2VlayA9PT0gJzEwLTIwJykgeyB0aGlzLnBhcnRCUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5ob3Vyc1BlcldlZWsgPT09ICc1LTEwJykgeyB0aGlzLnBhcnRCUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5ob3Vyc1BlcldlZWsgPT09ICc8NScpIHsgdGhpcy5wYXJ0QlBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS53b3JrSGlzdG9yeSA9PT0gJzwxJykgeyB0aGlzLnBhcnRCUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS53b3JrSGlzdG9yeSA9PT0gJzEtNCcpIHsgdGhpcy5wYXJ0QlBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ud29ya0hpc3RvcnkgPT09ICc+NCcpIHsgdGhpcy5wYXJ0QlBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JIZWFsdGgpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySW5zdHJ1Y3Rpb25zKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckNvbW11bmljYXRpb24pIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yTGFuZ3VhZ2UpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yQ29tcHV0ZXIpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySG91c2luZykgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JUcmFuc3BvcnRhdGlvbikgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JEYXljYXJlKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckludGVybmV0KSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvclBlcnNvbmFsKSB7IGZhY3RvclBvaW50cysrOyB9XHJcblxyXG4gICAgICAgIGlmIChmYWN0b3JQb2ludHMgPj0gMCAmJiBmYWN0b3JQb2ludHMgPD0gNCkgeyB0aGlzLnBhcnRCUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgIChmYWN0b3JQb2ludHMgPiA0ICYmIGZhY3RvclBvaW50cyA8PSA4KSB7IHRoaXMucGFydEJQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICAgKGZhY3RvclBvaW50cyA+IDgpIHsgdGhpcy5wYXJ0QlBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgICAgIHRoaXMudG90YWxQb2ludHMgPSB0aGlzLnBhcnRBUG9pbnRzIC0gdGhpcy5wYXJ0QlBvaW50cztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGFydEFQb2ludHMgPCAxNCkgeyB0aGlzLnBhcnRBV2FybmluZyA9IHRydWU7IH1cclxuICAgICAgICBpZiAodGhpcy5wYXJ0QlBvaW50cyA8IDQpIHsgdGhpcy5wYXJ0Qldhcm5pbmcgPSB0cnVlOyB9XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dChldmVudCwgbmV4dFNlY3Rpb24pIHtcclxuICAgICAgICBzd2l0Y2ggKG5leHRTZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24yJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb25CdG4yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZChldmVudCwgbmV4dFNlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24zJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb25CdG4zID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZChldmVudCwgbmV4dFNlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb240JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb25CdG40ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZChldmVudCwgbmV4dFNlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb241JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb25CdG41ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZChldmVudCwgbmV4dFNlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb242JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb25CdG42ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZChldmVudCwgbmV4dFNlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNhdmUoKSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnRbXCJpbnF1aXJ5RGF0ZVwiXSA9IHRoaXMuZGF0ZTtcclxuICAgICAgICB0aGlzLmNsaWVudFtcInVzZXJuYW1lXCJdID0gdGhpcy5jbGllbnQuZmlyc3ROYW1lICsgdGhpcy5jbGllbnQubGFzdE5hbWU7XHJcbiAgICAgICAgdGhpcy5jbGllbnRbXCJwYXNzd29yZFwiXSA9IHRoaXMuY2xpZW50LmJpcnRoZGF5LnJlcGxhY2UoLy0vZywgXCJcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3NhdmUgY2xpY2tlZCcpO1xyXG4gICAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgICAgICAuc2F2ZSh0aGlzLmNsaWVudCwgdGhpcy5zdWl0YWJpbGl0eUZvcm0pXHJcbiAgICAgICAgICAgIC50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZW4nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpZW50ID0gY2xpZW50OyAvLyBzYXZlZCBjbGllbnQsIHcvIGlkIGlmIG5ld1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvY2xpZW50cyddKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7IC8vIFRPRE86IERpc3BsYXkgZXJyb3IgbWVzc2FnZVxyXG4gICAgfVxyXG5cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICB9XHJcbn07XHJcbiJdfQ==
