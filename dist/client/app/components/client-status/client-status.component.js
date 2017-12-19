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
var suitabilityForm_1 = require("../../models/suitabilityForm");
var client_service_1 = require("../../services/client.service");
var student_service_1 = require("../../services/student.service");
var authentication_service_1 = require("../../services/authentication.service");
var ClientStatusComponent = /** @class */ (function () {
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
            if (client.banner == null) {
                client.banner = false;
            }
            if (client.cam == null) {
                client.cam = false;
            }
        }
        console.log(this.data);
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
    ClientStatusComponent.prototype.showStatusReport = function () {
        this.showSuitabilityEdit = false;
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
                client.studentNumber = inputValue.value;
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
    ClientStatusComponent.prototype.editSuitability = function (client) {
        this.statusReport = false;
        this.clientView = null;
        this.addSuitability = false;
        this.showSuitabilityEdit = true;
        this.suitabilityForm = this.getSuitabilityFormByFilter(client.userID)[0];
        this.clientSuitability = client;
    };
    ClientStatusComponent.prototype.saveSuitability = function () {
        var _this = this;
        if (this.suitabilityForm.suitabilityID) {
            this.tallyPoints();
            this.suitabilityForm.dbTotalPoints = this.totalPoints;
            this.clientService
                .updateSuitability(this.suitabilityForm)
                .then(function (res) {
                _this.showSuitabilityEdit = false;
                _this.clientView = null;
                _this.ngOnInit();
            })
                .catch();
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
exports.ClientStatusComponent = ClientStatusComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXdEO0FBQ3hELDBDQUF5QztBQUd6QyxnRUFBK0Q7QUFHL0QsZ0VBQThEO0FBQzlELGtFQUFnRTtBQUNoRSxnRkFBb0U7QUFTcEU7SUFzREksK0JBQW9CLE1BQWMsRUFBVSxhQUE0QixFQUFVLGNBQThCLEVBQVUsV0FBd0I7UUFBOUgsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFyQ2xKLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBR2hDLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFFNUIsaUJBQVksR0FBWSxJQUFJLENBQUM7UUFDN0IsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFTNUIsd0JBQW1CLEdBQVUsQ0FBQyxFQUFFLGVBQWUsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQU1qRyw0QkFBNEI7UUFDNUIsb0JBQWUsR0FBTztZQUNwQixzQkFBc0IsRUFBRSxLQUFLO1lBQzdCLFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUM7UUFDRixtQkFBYyxHQUFZLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6RCxpQkFBWSxHQUFVLEtBQUssQ0FBQztRQUM1QixtQkFBYyxHQUFXLEtB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LEtBQUssa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDaEcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDdEYsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBRTdFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxLQUFLLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQzNGLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEtBQUssaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDeEYsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsS0FBSyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFFaEYsUUFBUTtRQUNSLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxLQUFLLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUM1RixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUNqRixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFFMUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEtBQUssMENBQTBDLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDdkgsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsS0FBSyxtQ0FBbUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUM3RyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxLQUFLLGtDQUFrQyxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUVwRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDMUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDaEUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDakUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQzVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUFDLFlBQVksRUFBRSxDQUFDO1FBQUMsQ0FBQztRQUM1RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDM0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDbEUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQzNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUFDLFlBQVksRUFBRSxDQUFDO1FBQUMsQ0FBQztRQUM1RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFFNUQsRUFBRSxDQUFDLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQzlFLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQzFFLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMs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QUNqQyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBRUQsc0NBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQXhiUTtRQUFSLFlBQUssRUFBRTtrQ0FBa0IsaUNBQWU7a0VBQUM7SUFsQmpDLHFCQUFxQjtRQU5qQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsV0FBVyxFQUFFLDZEQUE2RDtZQUMxRSxTQUFTLEVBQUUsQ0FBQyw0REFBNEQsQ0FBQztTQUM1RSxDQUFDO3lDQXdEOEIsZUFBTSxFQUF5Qiw4QkFBYSxFQUEwQixnQ0FBYyxFQUF1QixvQ0FBVztPQXREekkscUJBQXFCLENBMmNqQztJQUFELDRCQUFDO0NBM2NELEFBMmNDLElBQUE7QUEzY1ksc0RBQXFCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2NsaWVudC1zdGF0dXMvY2xpZW50LXN0YXR1cy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NsaWVudFwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdHVkZW50XCI7XHJcbmltcG9ydCB7IFN1aXRhYmlsaXR5Rm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3VpdGFiaWxpdHlGb3JtXCI7XHJcbmltcG9ydCB7IENvbnNlbnRGb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb25zZW50Rm9ybVwiO1xyXG5pbXBvcnQgeyBMZWFybmluZ1N0eWxlRm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvbGVhcm5pbmdTdHlsZUZvcm1cIjtcclxuaW1wb3J0IHsgQ2xpZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jbGllbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZVwiO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnY2xpZW50LXN0YXR1cycsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvY2xpZW50LXN0YXR1cy9jbGllbnQtc3RhdHVzLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL2NsaWVudC1zdGF0dXMvY2xpZW50LXN0YXR1cy5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBDbGllbnRTdGF0dXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgZGF0YTogYW55W107XHJcbiAgICBhbGxDbGllbnRzOiBDbGllbnRbXTtcclxuICAgIHN1aXRhYmlsaXR5Rm9ybXM6IFN1aXRhYmlsaXR5Rm9ybVtdO1xyXG4gICAgY29uc2VudEZvcm1zOiBDb25zZW50Rm9ybVtdO1xyXG4gICAgbGVhcm5pbmdTdHlsZUZvcm1zOiBMZWFybmluZ1N0eWxlRm9ybVtdO1xyXG4gICAgY2xpZW50VG90YWw6IGFueTtcclxuICAgIGFjdGlvbkl0ZW1zOiBhbnlbXTtcclxuICAgIGVycm9yOiBhbnk7XHJcblxyXG4gICAgY2xpZW50VmlldzogQ2xpZW50O1xyXG4gICAgY29uc2VudFZpZXc6IENvbnNlbnRGb3JtO1xyXG4gICAgc3VpdGFiaWxpdHlWaWV3OiBTdWl0YWJpbGl0eUZvcm07XHJcbiAgICBsZWFybmluZ1N0eWxlVmlldzogTGVhcm5pbmdTdHlsZUZvcm07XHJcblxyXG4gICAgc2hvd1N1aXRhYmlsaXR5RWRpdDogYm9vbGVhbjtcclxuXHJcbiAgICBhZGRTdWl0YWJpbGl0eTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgc3VpdGFiaWxpdHlGb3JtOiBTdWl0YWJpbGl0eUZvcm07XHJcbiAgICBjbGllbnRTdWl0YWJpbGl0eTogQ2xpZW50W107XHJcbiAgICBwYXJ0QVdhcm5pbmcgPSBmYWxzZTtcclxuICAgIHBhcnRCV2FybmluZyA9IGZhbHNlO1xyXG4gICAgcGFydEFQb2ludHMgPSAwO1xyXG4gICAgcGFydEJQb2ludHMgPSAwO1xyXG4gICAgdG90YWxQb2ludHMgPSAwO1xyXG4gICAgY2FsY3VsYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHN0YXR1c1JlcG9ydDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBzaG93R2VuZXJhbDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBzaG93U3VpdGFiaWxpdHk6IGJvb2xlYW47XHJcbiAgICBzaG93Q29uc2VudDogYm9vbGVhbjtcclxuICAgIHNob3dMZWFybmluZ1N0eWxlOiBib29sZWFuO1xyXG5cclxuICAgIC8vZG91Z2hudXQgY2hhcnQgKGNsaWVudCBzdGF0dXMpXHJcbiAgICBkb3VnaG51dENoYXJ0TGFiZWxzOiBzdHJpbmdbXTtcclxuICAgIGRvdWdobnV0Q2hhcnREYXRhOiBudW1iZXJbXTtcclxuICAgIGRvdWdobnV0Q2hhcnRUeXBlOiBzdHJpbmc7XHJcbiAgICBkb3VnaG51dENoYXJ0Q29sb3JzOiBhbnlbXSA9IFt7IGJhY2tncm91bmRDb2xvcjogW1wiI0ZGNDIwN1wiLCBcIiNGOEU5MDNcIiwgXCIjMzA5RUZGXCIsIFwiIzJBRDMwOFwiXSB9XTtcclxuICAgIHN0YWdlMTogYW55O1xyXG4gICAgc3RhZ2UyOiBhbnk7XHJcbiAgICBzdGFnZTM6IGFueTtcclxuICAgIHN0YWdlNDogYW55O1xyXG5cclxuICAgIC8vYmFyIGNoYXJ0IChsZWFybmluZyBzdHlsZSlcclxuICAgIGJhckNoYXJ0T3B0aW9uczphbnkgPSB7XHJcbiAgICAgIHNjYWxlU2hvd1ZlcnRpY2FsTGluZXM6IGZhbHNlLFxyXG4gICAgICByZXNwb25zaXZlOiB0cnVlXHJcbiAgICB9O1xyXG4gICAgYmFyQ2hhcnRMYWJlbHM6c3RyaW5nW10gPSBbJ0hlYXJpbmcnLCAnU2VlaW5nJywgJ0RvaW5nJ107XHJcbiAgICBiYXJDaGFydFR5cGU6c3RyaW5nID0gJ2Jhcic7XHJcbiAgICBiYXJDaGFydExlZ2VuZDpib29sZWFuID0gZmFsc2U7XHJcbiAgICBiYXJDaGFydERhdGE6YW55O1xyXG4gICAgYmFyQ2hhcnRDb2xvcnM6IGFueVtdID0gW3sgYmFja2dyb3VuZENvbG9yOiBbXCIjRkY0MjA3XCIsIFwiI0Y4RTkwM1wiLCBcIiMyQUQzMDhcIl0gfV07XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBjbGllbnRTZXJ2aWNlOiBDbGllbnRTZXJ2aWNlLCBwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmdldENsaWVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDbGllbnRzKCkge1xyXG4gICAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgICAgICAuZ2V0Q2xpZW50cygpXHJcbiAgICAgICAgICAgIC50aGVuKG9iamVjdHMgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKChvYmplY3RzIGFzIGFueSkuc3RhdHVzID09PSBcIjQwM1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKG9iamVjdHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZXZlbnQpIHtcclxuICAgICAgY29uc29sZS5sb2coKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREYXRhKG9iamVjdHMpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBvYmplY3RzLmNsaWVudHM7XHJcbiAgICAgICAgZm9yIChsZXQgY2xpZW50IG9mIHRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgY2xpZW50LmZ1bGxOYW1lID0gY2xpZW50LmZpcnN0TmFtZSArIFwiIFwiICsgY2xpZW50Lmxhc3ROYW1lO1xyXG4gICAgICAgICAgaWYgKGNsaWVudC5iYW5uZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjbGllbnQuYmFubmVyID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoY2xpZW50LmNhbSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNsaWVudC5jYW0gPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhKTtcclxuICAgICAgICB0aGlzLmFsbENsaWVudHMgPSBvYmplY3RzLmNsaWVudHM7XHJcbiAgICAgICAgdGhpcy5jbGllbnRUb3RhbCA9IG9iamVjdHMuY2xpZW50cy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm1zID0gb2JqZWN0cy5zdWl0YWJpbGl0eUZvcm1zO1xyXG4gICAgICAgIHRoaXMuY29uc2VudEZvcm1zID0gb2JqZWN0cy5jb25zZW50Rm9ybXM7XHJcbiAgICAgICAgdGhpcy5sZWFybmluZ1N0eWxlRm9ybXMgPSBvYmplY3RzLmxlYXJuaW5nU3R5bGVGb3JtcztcclxuICAgICAgICB0aGlzLnN0YWdlMSA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiB4LnN1aXRhYmlsaXR5KTtcclxuICAgICAgICB0aGlzLnN0YWdlMiA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiB4LmNvbnNlbnQgJiYgeC5sZWFybmluZ1N0eWxlKTtcclxuICAgICAgICB0aGlzLnN0YWdlMyA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmICF4LmxlYXJuaW5nU3R5bGUpO1xyXG4gICAgICAgIHRoaXMuc3RhZ2U0ID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmICF4LmNvbnNlbnQgJiYgIXgubGVhcm5pbmdTdHlsZSAmJiB4LmJhbm5lciAmJiB4LmNhbSk7XHJcbiAgICAgICAgdGhpcy5kb3VnaG51dENoYXJ0TGFiZWxzID0gWydTdWl0YWJpbGl0eScsICdDb25zZW50L0xlYXJuaW5nIFN0eWxlJywgJ0Jhbm5lci9DQU0nLCAnVHJhbnNmZXIgUmVhZHknXTtcclxuICAgICAgICB0aGlzLmRvdWdobnV0Q2hhcnREYXRhID0gW3RoaXMuc3RhZ2UxLmxlbmd0aCwgdGhpcy5zdGFnZTIubGVuZ3RoLCB0aGlzLnN0YWdlMy5sZW5ndGgsIHRoaXMuc3RhZ2U0Lmxlbmd0aF07XHJcbiAgICAgICAgdGhpcy5kb3VnaG51dENoYXJ0VHlwZSA9ICdkb3VnaG51dCc7XHJcbiAgICAgICAgdGhpcy5hZGRTdWl0YWJpbGl0eSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzUmVwb3J0ID0gdHJ1ZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWRkQ2xpZW50KCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3N1aXRhYmlsaXR5J10pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUFsZXJ0KGNsaWVudDogQ2xpZW50KSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnRGVsZXRlIGNsaWVudCAoJyArIGNsaWVudC5maXJzdE5hbWUgKyAnICcgKyBjbGllbnQubGFzdE5hbWUgKyAnKT8nLFxyXG4gICAgICAgICAgICB0ZXh0OiBcIllvdSB3b24ndCBiZSBhYmxlIHRvIHJldmVydCB0aGlzIVwiLFxyXG4gICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgZGVsZXRlIGl0ISdcclxuICAgICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgICBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlQ2xpZW50KGNsaWVudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNhbmNlbGVkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUNsaWVudChjbGllbnQ6IENsaWVudCkge1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgICAgICAuZGVsZXRlKGNsaWVudClcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1N0YXR1c1JlcG9ydCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmZpbHRlcihoID0+IGggIT09IGNsaWVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbENsaWVudHMgPSB0aGlzLmFsbENsaWVudHMuZmlsdGVyKGggPT4gaCAhPT0gY2xpZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2UxID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+IHguc3VpdGFiaWxpdHkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZTIgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4gIXguc3VpdGFiaWxpdHkgJiYgeC5jb25zZW50ICYmIHgubGVhcm5pbmdTdHlsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlMyA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmICF4LmxlYXJuaW5nU3R5bGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZTQgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4gIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiAheC5sZWFybmluZ1N0eWxlICYmIHguYmFubmVyICYmIHguY2FtKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZG91Z2hudXRDaGFydERhdGEgPSBbdGhpcy5zdGFnZTEubGVuZ3RoLCB0aGlzLnN0YWdlMi5sZW5ndGgsIHRoaXMuc3RhZ2UzLmxlbmd0aCwgdGhpcy5zdGFnZTQubGVuZ3RoXTtcclxuICAgICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICAgJ0RlbGV0ZWQhJyxcclxuICAgICAgICAgICAgICAgICAgICAnQ2xpZW50IHJlY29yZCBoYXMgYmVlbiBkZWxldGVkLicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGllbnRUb3RhbCA9IHRoaXMuZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dDbGllbnRWaWV3KGNsaWVudDogQ2xpZW50KSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnRWaWV3ID0gY2xpZW50O1xyXG4gICAgICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICAgICAgdGhpcy5zaG93R2VuZXJhbCA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBzdWl0YWJpbGl0eUZvcm0gPSB0aGlzLmdldFN1aXRhYmlsaXR5Rm9ybUJ5RmlsdGVyKGNsaWVudC51c2VySUQpO1xyXG4gICAgICAgIHRoaXMuc3VpdGFiaWxpdHlWaWV3ID0gc3VpdGFiaWxpdHlGb3JtWzBdO1xyXG5cclxuICAgICAgICB2YXIgY29uc2VudEZvcm0gPSB0aGlzLmdldENvbnNlbnRGb3JtQnlGaWx0ZXIoY2xpZW50LnVzZXJJRCk7XHJcbiAgICAgICAgdGhpcy5jb25zZW50VmlldyA9IGNvbnNlbnRGb3JtWzBdO1xyXG5cclxuICAgICAgICB2YXIgbGVhcm5pbmdTdHlsZUZvcm0gPSB0aGlzLmdldExlYXJuaW5nU3R5bGVGb3JtQnlGaWx0ZXIoY2xpZW50LnVzZXJJRCk7XHJcbiAgICAgICAgdGhpcy5sZWFybmluZ1N0eWxlVmlldyA9IGxlYXJuaW5nU3R5bGVGb3JtWzBdO1xyXG4gICAgICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVWaWV3KSB7XHJcbiAgICAgICAgICB0aGlzLmJhckNoYXJ0RGF0YSA9IFt7IGRhdGE6IFt0aGlzLmxlYXJuaW5nU3R5bGVWaWV3LmhlYXJpbmcsIHRoaXMubGVhcm5pbmdTdHlsZVZpZXcuc2VlaW5nLCB0aGlzLmxlYXJuaW5nU3R5bGVWaWV3LmRvaW5nXX1dO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRTdWl0YWJpbGl0eUZvcm1CeUZpbHRlcihpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN1aXRhYmlsaXR5Rm9ybXMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb25zZW50Rm9ybUJ5RmlsdGVyKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc2VudEZvcm1zLmZpbHRlcih4ID0+IHgudXNlcklEID09PSBpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGVhcm5pbmdTdHlsZUZvcm1CeUZpbHRlcihpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxlYXJuaW5nU3R5bGVGb3Jtcy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlY3Rpb25CdG5DbGlja2VkKGV2ZW50LCBzZWN0aW9uKSB7XHJcbiAgICAgICAgaWYgKHNlY3Rpb24gPT09IFwiZ2VuZXJhbFwiKSB7XHJcbiAgICAgICAgICB0aGlzLnJlc2V0VmlldygpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dHZW5lcmFsID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNlY3Rpb24gPT09IFwic3VpdGFiaWxpdHlcIikge1xyXG4gICAgICAgICAgdGhpcy5yZXNldFZpZXcoKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93U3VpdGFiaWxpdHkgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2VjdGlvbiA9PT0gXCJjb25zZW50XCIpIHtcclxuICAgICAgICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0NvbnNlbnQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2VjdGlvbiA9PT0gXCJsZWFybmluZ1N0eWxlXCIpIHtcclxuICAgICAgICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0xlYXJuaW5nU3R5bGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93U3RhdHVzUmVwb3J0KCkge1xyXG4gICAgICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5RWRpdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWRkU3VpdGFiaWxpdHkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXR1c1JlcG9ydCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jbGllbnRTdWl0YWJpbGl0eSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jbGllbnRWaWV3ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmFkZFN1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhcnRDbGlja2VkKGU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGUuYWN0aXZlWzBdLl9pbmRleDtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmFsbENsaWVudHMuZmlsdGVyKHggPT4geC5zdWl0YWJpbGl0eSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuYWxsQ2xpZW50cy5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiB4LmNvbnNlbnQgJiYgeC5sZWFybmluZ1N0eWxlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5hbGxDbGllbnRzLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmICF4LmNvbnNlbnQgJiYgIXgubGVhcm5pbmdTdHlsZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IDMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuYWxsQ2xpZW50cy5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmICF4LmxlYXJuaW5nU3R5bGUgJiYgeC5iYW5uZXIgJiYgeC5jYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuYWxsQ2xpZW50cztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhcnRIb3ZlcmVkKGU6IGFueSk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVBc1N0dWRlbnQoY2xpZW50OiBTdHVkZW50KSB7XHJcbiAgICAgIHRoaXMuc3R1ZGVudE51bWJlcihjbGllbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0dWRlbnROdW1iZXIoY2xpZW50KSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdTdHVkZW50IE51bWJlcicsXHJcbiAgICAgICAgICB0eXBlOiAnaW5mbycsXHJcbiAgICAgICAgICB0ZXh0OiAnUGxlYXNlIGVudGVyIHN0dWRlbnQgbnVtYmVyIGZvciAnICsgY2xpZW50LmZpcnN0TmFtZSArICcgJyArIGNsaWVudC5sYXN0TmFtZSArICcnLFxyXG4gICAgICAgICAgaW5wdXQ6IFwidGV4dFwiLFxyXG4gICAgICAgICAgaW5wdXRQbGFjZWhvbGRlcjogXCJFbnRlciBTdHVkZW50IE51bWJlclwiLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGFuaW1hdGlvbjogXCJzbGlkZS1mcm9tLXRvcFwiLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdTYXZlJ1xyXG4gICAgICB9KS50aGVuKGlucHV0VmFsdWUgPT4ge1xyXG4gICAgICAgIGlmIChpbnB1dFZhbHVlKSB7XHJcbiAgICAgICAgICBjbGllbnQuc3R1ZGVudE51bWJlciA9IGlucHV0VmFsdWUudmFsdWU7XHJcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsZXJ0KGNsaWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDYW5jZWxlZCBcIiArIGVycm9yKTsgLy8gVE9ETzogRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUFsZXJ0KGNsaWVudCkge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnVHJhbnNmZXIgY2xpZW50ICgnICsgY2xpZW50LmZpcnN0TmFtZSArICcgJyArIGNsaWVudC5sYXN0TmFtZSArICcpPycsXHJcbiAgICAgICAgICB0ZXh0OiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNyZWF0ZSBhcyBzdHVkZW50IHdpdGggIycgKyBjbGllbnQuc3R1ZGVudE51bWJlciArICc/JyxcclxuICAgICAgICAgIHR5cGU6ICdxdWVzdGlvbicsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIHRyYW5zZmVyISdcclxuICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgICAgICAucG9zdE5ldyhjbGllbnQpXHJcbiAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbUNsaWVudFRhYmxlKGNsaWVudC51c2VySUQpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7IC8vIFRPRE86IERpc3BsYXkgZXJyb3IgbWVzc2FnZVxyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2FuY2VsZWRcIik7IC8vIFRPRE86IERpc3BsYXkgZXJyb3IgbWVzc2FnZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVGcm9tQ2xpZW50VGFibGUodXNlcklEKTogdm9pZCB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgIC5yZW1vdmVGcm9tQ2xpZW50VGFibGUodXNlcklEKVxyXG4gICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuZmlsdGVyKGggPT4gaC51c2VySUQgIT09IHVzZXJJRCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5zdGFnZTMgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4geC51c2VySUQgIT09IHVzZXJJRCAmJiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmICF4LmxlYXJuaW5nU3R5bGUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuc3RhZ2U0ID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+IHgudXNlcklEICE9PSB1c2VySUQgJiYgIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiAheC5sZWFybmluZ1N0eWxlICYmIHguYmFubmVyICYmIHguY2FtKTtcclxuICAgICAgICAgICAgICB0aGlzLmRvdWdobnV0Q2hhcnREYXRhID0gW3RoaXMuc3RhZ2UxLmxlbmd0aCwgdGhpcy5zdGFnZTIubGVuZ3RoLCB0aGlzLnN0YWdlMy5sZW5ndGgsIHRoaXMuc3RhZ2U0Lmxlbmd0aF07XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgJ1RyYW5zZmVyZWQnLFxyXG4gICAgICAgICAgICAgICAgICAnQ2xpZW50IHJlY29yZCBoYXMgYmVlbiB0cmFuc2ZlcmVkIHRvIHRoZSBzdHVkZW50IHRhYmxlLicsXHJcbiAgICAgICAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jbGllbnRUb3RhbCA9IHRoaXMuZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkU3VpdGFiaWxpdHlJbmZvKGNsaWVudCkge1xyXG4gICAgICB0aGlzLmNsaWVudFZpZXcgPSBudWxsO1xyXG4gICAgICB0aGlzLmFkZFN1aXRhYmlsaXR5ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zaG93U3VpdGFiaWxpdHlFZGl0ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3RhdHVzUmVwb3J0ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtID0gbmV3IFN1aXRhYmlsaXR5Rm9ybSgpO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS50cmFuc2NyaXB0ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFwcHJvcHJpYXRlR29hbCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pc1ZhbGlkQWdlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmdvdmVybm1lbnRJRCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5zY2hvb2xSZWdpc3RyYXRpb24gPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uYXZhaWxhYmxlRHVyaW5nQ2xhc3MgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySGVhbHRoID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3Rvckluc3RydWN0aW9ucyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JDb21tdW5pY2F0aW9uID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3Rvckxhbmd1YWdlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckNvbXB1dGVyID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhvdXNpbmcgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yVHJhbnNwb3J0YXRpb24gPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yRGF5Y2FyZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JJbnRlcm5ldCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JQZXJzb25hbCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmNsaWVudFN1aXRhYmlsaXR5ID0gY2xpZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXRTdWl0YWJpbGl0eShjbGllbnQpIHtcclxuICAgICAgdGhpcy5zdGF0dXNSZXBvcnQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5jbGllbnRWaWV3ID0gbnVsbDtcclxuICAgICAgdGhpcy5hZGRTdWl0YWJpbGl0eSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnNob3dTdWl0YWJpbGl0eUVkaXQgPSB0cnVlO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybSA9IHRoaXMuZ2V0U3VpdGFiaWxpdHlGb3JtQnlGaWx0ZXIoY2xpZW50LnVzZXJJRClbMF07XHJcbiAgICAgIHRoaXMuY2xpZW50U3VpdGFiaWxpdHkgPSBjbGllbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVN1aXRhYmlsaXR5KCkge1xyXG4gICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uc3VpdGFiaWxpdHlJRCkge1xyXG4gICAgICAgIHRoaXMudGFsbHlQb2ludHMoKTtcclxuICAgICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5kYlRvdGFsUG9pbnRzID0gdGhpcy50b3RhbFBvaW50cztcclxuICAgICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgIC51cGRhdGVTdWl0YWJpbGl0eSh0aGlzLnN1aXRhYmlsaXR5Rm9ybSlcclxuICAgICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dTdWl0YWJpbGl0eUVkaXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRWaWV3ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5uZ09uSW5pdCgpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudGFsbHlQb2ludHMoKTtcclxuICAgICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5kYlRvdGFsUG9pbnRzID0gdGhpcy50b3RhbFBvaW50cztcclxuICAgICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgIC5hZGRTdWl0YWJpbGl0eSh0aGlzLmNsaWVudFN1aXRhYmlsaXR5LCB0aGlzLnN1aXRhYmlsaXR5Rm9ybSlcclxuICAgICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm5nT25Jbml0KCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlKCkge1xyXG4gICAgICB0aGlzLnRhbGx5UG9pbnRzKCk7XHJcbiAgICAgIHRoaXMuY2FsY3VsYXRlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdGFsbHlQb2ludHMoKSB7XHJcbiAgICAgICAgdmFyIGZhY3RvclBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy5wYXJ0QVBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy5wYXJ0QlBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy50b3RhbFBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy5wYXJ0QVdhcm5pbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBhcnRCV2FybmluZyA9IGZhbHNlO1xyXG4gICAgICAgIC8vIFBBUlQgQVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5vZmZlclN0YXJ0RGF0ZSA9PT0gJ0xlc3MgdGhhbiBvbmUgeWVhcicpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ub2ZmZXJTdGFydERhdGUgPT09ICdJbiBvbmUgeWVhcicpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ub2ZmZXJTdGFydERhdGUgPT09ICdNb3JlIHRoYW4gYSBZZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLm1lZXRzR29hbCA9PT0gJ05vJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5tZWV0c0dvYWwgPT09ICdZZXMgYnV0IGxhY2tzIHNraWxscy9oaWdoIGVub3VnaCBtYXJrcycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ubWVldHNHb2FsID09PSAnWWVzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLnRpbWVPdXRPZlNjaG9vbCA9PT0gJzYgb3IgbW9yZSB5ZWFycycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0udGltZU91dE9mU2Nob29sID09PSAnMS02IHllYXJzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS50aW1lT3V0T2ZTY2hvb2wgPT09ICdMZXNzIHRoYW4gMSB5ZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluUHJvZ3JhbUJlZm9yZSA9PT0gJ05vL0xlZnQgd2l0aCBhcHByb3ByaWF0ZSByZWFzb25zJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pblByb2dyYW1CZWZvcmUgPT09ICdZZXMgLSBBcHByb3ByaWF0ZSBwcm9ncmVzcycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5Qcm9ncmFtQmVmb3JlID09PSAnWWVzIOKAkyBObyBwcm9ncmVzcycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5lbXBsb3ltZW50ID09PSAnTm90IHdvcmtpbmcnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmVtcGxveW1lbnQgPT09ICdXb3JraW5nIHBhcnQgdGltZScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZW1wbG95bWVudCA9PT0gJ1dvcmtpbmcgZnVsbCB0aW1lJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ09XICBPRFNQICBFSSAgU0MnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ05vIGluY29tZScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnRW1wbG95ZWQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2UgPT09ICcxOS0yOSB5ZWFycyBvbGQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlID09PSAnMzAtNDQgeWVhcnMgb2xkJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZSA9PT0gJzQ1LTY1IHllYXJzIG9sZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9XHJcblxyXG4gICAgICAgIC8vUEFSVCBCXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmhvdXJzUGVyV2VlayA9PT0gJzFMZXNzIHRoYW4gNScpIHsgdGhpcy5wYXJ0QlBvaW50cyArPSAxOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaG91cnNQZXJXZWVrID09PSAnNS0xMCcpIHsgdGhpcy5wYXJ0QlBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaG91cnNQZXJXZWVrID09PSAnMTAtMjAnKSB7IHRoaXMucGFydEJQb2ludHMgKz0gMzsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0ud29ya0hpc3RvcnkgPT09ICdMZXNzIHRoYW4gMSB5ZWFyIGV4cGVyaWVuY2UgaW4gdGhlIGZpZWxkJykgeyB0aGlzLnBhcnRCUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS53b3JrSGlzdG9yeSA9PT0gJzEtNCB5ZWFycyBleHBlcmllbmNlIGluIHRoZSBmaWVsZCcpIHsgdGhpcy5wYXJ0QlBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ud29ya0hpc3RvcnkgPT09ICc0KyB5ZWFycyBleHBlcmllbmNlIGluIHRoZSBmaWVsZCcpIHsgdGhpcy5wYXJ0QlBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JIZWFsdGgpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySW5zdHJ1Y3Rpb25zKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckNvbW11bmljYXRpb24pIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yTGFuZ3VhZ2UpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yQ29tcHV0ZXIpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySG91c2luZykgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JUcmFuc3BvcnRhdGlvbikgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JEYXljYXJlKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckludGVybmV0KSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvclBlcnNvbmFsKSB7IGZhY3RvclBvaW50cysrOyB9XHJcblxyXG4gICAgICAgIGlmIChmYWN0b3JQb2ludHMgPj0gMCAmJiBmYWN0b3JQb2ludHMgPD0gNCkgeyB0aGlzLnBhcnRCUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgIChmYWN0b3JQb2ludHMgPiA0ICYmIGZhY3RvclBvaW50cyA8PSA4KSB7IHRoaXMucGFydEJQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICAgKGZhY3RvclBvaW50cyA+IDgpIHsgdGhpcy5wYXJ0QlBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgICAgIHRoaXMudG90YWxQb2ludHMgPSB0aGlzLnBhcnRBUG9pbnRzIC0gdGhpcy5wYXJ0QlBvaW50cztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGFydEFQb2ludHMgPCAxNCkgeyB0aGlzLnBhcnRBV2FybmluZyA9IHRydWU7IH1cclxuICAgICAgICBpZiAodGhpcy5wYXJ0QlBvaW50cyA8IDQpIHsgdGhpcy5wYXJ0Qldhcm5pbmcgPSB0cnVlOyB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNoZWNrYm94Q2hhbmdlKGNsaWVudCkge1xyXG4gICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAudXBkYXRlQmFubmVyQ2FtQm9vbChjbGllbnQpXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICB0aGlzLm5nT25Jbml0KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKTtcclxuXHJcbiAgICAgIGlmIChjbGllbnQuYmFubmVyICYmIGNsaWVudC5jYW0pIHtcclxuICAgICAgICB0aGlzLnN0YWdlMyA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmICF4LmxlYXJuaW5nU3R5bGUgJiYgIXguYmFubmVyICYmICF4LmNhbSk7XHJcbiAgICAgICAgdGhpcy5zdGFnZTQgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4gIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiAheC5sZWFybmluZ1N0eWxlICYmIHguYmFubmVyICYmIHguY2FtKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnN0YWdlMyA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmICF4LmxlYXJuaW5nU3R5bGUpO1xyXG4gICAgICAgIHRoaXMuc3RhZ2U0ID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmICF4LmNvbnNlbnQgJiYgIXgubGVhcm5pbmdTdHlsZSAmJiB4LmJhbm5lciAmJiB4LmNhbSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZG91Z2hudXRDaGFydERhdGEgPSBbdGhpcy5zdGFnZTEubGVuZ3RoLCB0aGlzLnN0YWdlMi5sZW5ndGgsIHRoaXMuc3RhZ2UzLmxlbmd0aCwgdGhpcy5zdGFnZTQubGVuZ3RoXTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldFZpZXcoKSB7XHJcbiAgICAgIHRoaXMuc3RhdHVzUmVwb3J0ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc2hvd0dlbmVyYWwgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zaG93Q29uc2VudCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnNob3dMZWFybmluZ1N0eWxlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5RWRpdCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmFkZFN1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgIH1cclxufVxyXG4iXX0=
