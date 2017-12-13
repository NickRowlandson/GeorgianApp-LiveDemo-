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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXdEO0FBQ3hELDBDQUF5QztBQUd6QyxnRUFBK0Q7QUFHL0QsZ0VBQThEO0FBQzlELGtFQUFnRTtBQUNoRSxnRkFBb0U7QUFTcEU7SUFzREksK0JBQW9CLE1BQWMsRUFBVSxhQUE0QixFQUFVLGNBQThCLEVBQVUsV0FBd0I7UUFBOUgsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFyQ2xKLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBR2hDLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFFNUIsaUJBQVksR0FBWSxJQUFJLENBQUM7UUFDN0IsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFTNUIsd0JBQW1CLEdBQVUsQ0FBQyxFQUFFLGVBQWUsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQU1qRyw0QkFBNEI7UUFDNUIsb0JBQWUsR0FBTztZQUNwQixzQkFBc0IsRUFBRSxLQUFLO1lBQzdCLFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUM7UUFDRixtQkFBYyxHQUFZLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6RCxpQkFBWSxHQUFVLEtBQUssQ0FBQztRQUM1QixtQkFBYyxHQUFXLEtB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LENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQ3RGLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUU3RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsS0FBSyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUMzRixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxLQUFLLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQ3hGLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEtBQUssaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBRWhGLFFBQVE7UUFDUixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksS0FBSyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDNUYsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDakYsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBRTFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxLQUFLLDBDQUEwQyxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQ3ZILENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEtBQUssbUNBQW1DLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDN0csQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsS0FBSyxrQ0FBa0MsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFFcEcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQzFELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQ2hFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQ2pFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUFDLFlBQVksRUFBRSxDQUFDO1FBQUMsQ0FBQztRQUM1RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDNUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQzNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQ2xFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUFDLFlBQVksRUFBRSxDQUFDO1FBQUMsQ0FBQztRQUMzRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDNUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBRTVELEVBQUUsQ0FBQyxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUM5RSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUMxRSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBRXZELEVBQUUsQ0FBQyxD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QUFDO0lBQzFCLENBQUM7SUFoYlE7UUFBUixZQUFLLEVBQUU7a0NBQWtCLGlDQUFlO2tFQUFDO0lBbEJqQyxxQkFBcUI7UUFOakMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFdBQVcsRUFBRSw2REFBNkQ7WUFDMUUsU0FBUyxFQUFFLENBQUMsNERBQTRELENBQUM7U0FDNUUsQ0FBQzt5Q0F3RDhCLGVBQU0sRUFBeUIsOEJBQWEsRUFBMEIsZ0NBQWMsRUFBdUIsb0NBQVc7T0F0RHpJLHFCQUFxQixDQW1jakM7SUFBRCw0QkFBQztDQW5jRCxBQW1jQyxJQUFBO0FBbmNZLHNEQUFxQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jbGllbnRcIjtcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBTdWl0YWJpbGl0eUZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N1aXRhYmlsaXR5Rm9ybVwiO1xyXG5pbXBvcnQgeyBDb25zZW50Rm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29uc2VudEZvcm1cIjtcclxuaW1wb3J0IHsgTGVhcm5pbmdTdHlsZUZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2xlYXJuaW5nU3R5bGVGb3JtXCI7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY2xpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2VcIjtcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2NsaWVudC1zdGF0dXMnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2NsaWVudC1zdGF0dXMvY2xpZW50LXN0YXR1cy5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQ2xpZW50U3RhdHVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGRhdGE6IGFueVtdO1xyXG4gICAgYWxsQ2xpZW50czogQ2xpZW50W107XHJcbiAgICBzdWl0YWJpbGl0eUZvcm1zOiBTdWl0YWJpbGl0eUZvcm1bXTtcclxuICAgIGNvbnNlbnRGb3JtczogQ29uc2VudEZvcm1bXTtcclxuICAgIGxlYXJuaW5nU3R5bGVGb3JtczogTGVhcm5pbmdTdHlsZUZvcm1bXTtcclxuICAgIGNsaWVudFRvdGFsOiBhbnk7XHJcbiAgICBhY3Rpb25JdGVtczogYW55W107XHJcbiAgICBlcnJvcjogYW55O1xyXG5cclxuICAgIGNsaWVudFZpZXc6IENsaWVudDtcclxuICAgIGNvbnNlbnRWaWV3OiBDb25zZW50Rm9ybTtcclxuICAgIHN1aXRhYmlsaXR5VmlldzogU3VpdGFiaWxpdHlGb3JtO1xyXG4gICAgbGVhcm5pbmdTdHlsZVZpZXc6IExlYXJuaW5nU3R5bGVGb3JtO1xyXG5cclxuICAgIHNob3dTdWl0YWJpbGl0eUVkaXQ6IGJvb2xlYW47XHJcblxyXG4gICAgYWRkU3VpdGFiaWxpdHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHN1aXRhYmlsaXR5Rm9ybTogU3VpdGFiaWxpdHlGb3JtO1xyXG4gICAgY2xpZW50U3VpdGFiaWxpdHk6IENsaWVudFtdO1xyXG4gICAgcGFydEFXYXJuaW5nID0gZmFsc2U7XHJcbiAgICBwYXJ0Qldhcm5pbmcgPSBmYWxzZTtcclxuICAgIHBhcnRBUG9pbnRzID0gMDtcclxuICAgIHBhcnRCUG9pbnRzID0gMDtcclxuICAgIHRvdGFsUG9pbnRzID0gMDtcclxuICAgIGNhbGN1bGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBzdGF0dXNSZXBvcnQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2hvd0dlbmVyYWw6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2hvd1N1aXRhYmlsaXR5OiBib29sZWFuO1xyXG4gICAgc2hvd0NvbnNlbnQ6IGJvb2xlYW47XHJcbiAgICBzaG93TGVhcm5pbmdTdHlsZTogYm9vbGVhbjtcclxuXHJcbiAgICAvL2RvdWdobnV0IGNoYXJ0IChjbGllbnQgc3RhdHVzKVxyXG4gICAgZG91Z2hudXRDaGFydExhYmVsczogc3RyaW5nW107XHJcbiAgICBkb3VnaG51dENoYXJ0RGF0YTogbnVtYmVyW107XHJcbiAgICBkb3VnaG51dENoYXJ0VHlwZTogc3RyaW5nO1xyXG4gICAgZG91Z2hudXRDaGFydENvbG9yczogYW55W10gPSBbeyBiYWNrZ3JvdW5kQ29sb3I6IFtcIiNGRjQyMDdcIiwgXCIjRjhFOTAzXCIsIFwiIzMwOUVGRlwiLCBcIiMyQUQzMDhcIl0gfV07XHJcbiAgICBzdGFnZTE6IGFueTtcclxuICAgIHN0YWdlMjogYW55O1xyXG4gICAgc3RhZ2UzOiBhbnk7XHJcbiAgICBzdGFnZTQ6IGFueTtcclxuXHJcbiAgICAvL2JhciBjaGFydCAobGVhcm5pbmcgc3R5bGUpXHJcbiAgICBiYXJDaGFydE9wdGlvbnM6YW55ID0ge1xyXG4gICAgICBzY2FsZVNob3dWZXJ0aWNhbExpbmVzOiBmYWxzZSxcclxuICAgICAgcmVzcG9uc2l2ZTogdHJ1ZVxyXG4gICAgfTtcclxuICAgIGJhckNoYXJ0TGFiZWxzOnN0cmluZ1tdID0gWydIZWFyaW5nJywgJ1NlZWluZycsICdEb2luZyddO1xyXG4gICAgYmFyQ2hhcnRUeXBlOnN0cmluZyA9ICdiYXInO1xyXG4gICAgYmFyQ2hhcnRMZWdlbmQ6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgYmFyQ2hhcnREYXRhOmFueTtcclxuICAgIGJhckNoYXJ0Q29sb3JzOiBhbnlbXSA9IFt7IGJhY2tncm91bmRDb2xvcjogW1wiI0ZGNDIwN1wiLCBcIiNGOEU5MDNcIiwgXCIjMkFEMzA4XCJdIH1dO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSwgcHJpdmF0ZSBzdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRDbGllbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2xpZW50cygpIHtcclxuICAgICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgICAgLmdldENsaWVudHMoKVxyXG4gICAgICAgICAgICAudGhlbihvYmplY3RzID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgob2JqZWN0cyBhcyBhbnkpLnN0YXR1cyA9PT0gXCI0MDNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YShvYmplY3RzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGV2ZW50KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGF0YShvYmplY3RzKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gb2JqZWN0cy5jbGllbnRzO1xyXG4gICAgICAgIGZvciAobGV0IGNsaWVudCBvZiB0aGlzLmRhdGEpIHtcclxuICAgICAgICAgIGNsaWVudC5mdWxsTmFtZSA9IGNsaWVudC5maXJzdE5hbWUgKyBcIiBcIiArIGNsaWVudC5sYXN0TmFtZTtcclxuICAgICAgICAgIGlmIChjbGllbnQuYmFubmVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgY2xpZW50LmJhbm5lciA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGNsaWVudC5jYW0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjbGllbnQuY2FtID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWxsQ2xpZW50cyA9IG9iamVjdHMuY2xpZW50cztcclxuICAgICAgICB0aGlzLmNsaWVudFRvdGFsID0gb2JqZWN0cy5jbGllbnRzLmxlbmd0aDtcclxuICAgICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybXMgPSBvYmplY3RzLnN1aXRhYmlsaXR5Rm9ybXM7XHJcbiAgICAgICAgdGhpcy5jb25zZW50Rm9ybXMgPSBvYmplY3RzLmNvbnNlbnRGb3JtcztcclxuICAgICAgICB0aGlzLmxlYXJuaW5nU3R5bGVGb3JtcyA9IG9iamVjdHMubGVhcm5pbmdTdHlsZUZvcm1zO1xyXG4gICAgICAgIHRoaXMuc3RhZ2UxID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+IHguc3VpdGFiaWxpdHkpO1xyXG4gICAgICAgIHRoaXMuc3RhZ2UyID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmIHguY29uc2VudCAmJiB4LmxlYXJuaW5nU3R5bGUpO1xyXG4gICAgICAgIHRoaXMuc3RhZ2UzID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmICF4LmNvbnNlbnQgJiYgIXgubGVhcm5pbmdTdHlsZSk7XHJcbiAgICAgICAgdGhpcy5zdGFnZTQgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4gIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiAheC5sZWFybmluZ1N0eWxlICYmIHguYmFubmVyICYmIHguY2FtKTtcclxuICAgICAgICB0aGlzLmRvdWdobnV0Q2hhcnRMYWJlbHMgPSBbJ1N1aXRhYmlsaXR5JywgJ0NvbnNlbnQvTGVhcm5pbmcgU3R5bGUnLCAnQmFubmVyL0NBTScsICdUcmFuc2ZlciBSZWFkeSddO1xyXG4gICAgICAgIHRoaXMuZG91Z2hudXRDaGFydERhdGEgPSBbdGhpcy5zdGFnZTEubGVuZ3RoLCB0aGlzLnN0YWdlMi5sZW5ndGgsIHRoaXMuc3RhZ2UzLmxlbmd0aCwgdGhpcy5zdGFnZTQubGVuZ3RoXTtcclxuICAgICAgICB0aGlzLmRvdWdobnV0Q2hhcnRUeXBlID0gJ2RvdWdobnV0JztcclxuICAgICAgICB0aGlzLmFkZFN1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGF0dXNSZXBvcnQgPSB0cnVlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhZGRDbGllbnQoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3VpdGFiaWxpdHknXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlQWxlcnQoY2xpZW50OiBDbGllbnQpIHtcclxuICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgdGl0bGU6ICdEZWxldGUgY2xpZW50ICgnICsgY2xpZW50LmZpcnN0TmFtZSArICcgJyArIGNsaWVudC5sYXN0TmFtZSArICcpPycsXHJcbiAgICAgICAgICAgIHRleHQ6IFwiWW91IHdvbid0IGJlIGFibGUgdG8gcmV2ZXJ0IHRoaXMhXCIsXHJcbiAgICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBkZWxldGUgaXQhJ1xyXG4gICAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICAgIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVDbGllbnQoY2xpZW50KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ2FuY2VsZWRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlQ2xpZW50KGNsaWVudDogQ2xpZW50KSB7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5kZWxldGUoY2xpZW50KVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmZpbHRlcihoID0+IGggIT09IGNsaWVudCk7XHJcbiAgICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAgICdEZWxldGVkIScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0NsaWVudCByZWNvcmQgaGFzIGJlZW4gZGVsZXRlZC4nLFxyXG4gICAgICAgICAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpZW50VG90YWwgPSB0aGlzLmRhdGEubGVuZ3RoO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93Q2xpZW50VmlldyhjbGllbnQ6IENsaWVudCkge1xyXG4gICAgICAgIHRoaXMuY2xpZW50VmlldyA9IGNsaWVudDtcclxuICAgICAgICB0aGlzLnJlc2V0VmlldygpO1xyXG4gICAgICAgIHRoaXMuc2hvd0dlbmVyYWwgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgc3VpdGFiaWxpdHlGb3JtID0gdGhpcy5nZXRTdWl0YWJpbGl0eUZvcm1CeUZpbHRlcihjbGllbnQudXNlcklEKTtcclxuICAgICAgICB0aGlzLnN1aXRhYmlsaXR5VmlldyA9IHN1aXRhYmlsaXR5Rm9ybVswXTtcclxuXHJcbiAgICAgICAgdmFyIGNvbnNlbnRGb3JtID0gdGhpcy5nZXRDb25zZW50Rm9ybUJ5RmlsdGVyKGNsaWVudC51c2VySUQpO1xyXG4gICAgICAgIHRoaXMuY29uc2VudFZpZXcgPSBjb25zZW50Rm9ybVswXTtcclxuXHJcbiAgICAgICAgdmFyIGxlYXJuaW5nU3R5bGVGb3JtID0gdGhpcy5nZXRMZWFybmluZ1N0eWxlRm9ybUJ5RmlsdGVyKGNsaWVudC51c2VySUQpO1xyXG4gICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZVZpZXcgPSBsZWFybmluZ1N0eWxlRm9ybVswXTtcclxuICAgICAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlVmlldykge1xyXG4gICAgICAgICAgdGhpcy5iYXJDaGFydERhdGEgPSBbeyBkYXRhOiBbdGhpcy5sZWFybmluZ1N0eWxlVmlldy5oZWFyaW5nLCB0aGlzLmxlYXJuaW5nU3R5bGVWaWV3LnNlZWluZywgdGhpcy5sZWFybmluZ1N0eWxlVmlldy5kb2luZ119XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3VpdGFiaWxpdHlGb3JtQnlGaWx0ZXIoaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdWl0YWJpbGl0eUZvcm1zLmZpbHRlcih4ID0+IHgudXNlcklEID09PSBpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29uc2VudEZvcm1CeUZpbHRlcihpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnNlbnRGb3Jtcy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExlYXJuaW5nU3R5bGVGb3JtQnlGaWx0ZXIoaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sZWFybmluZ1N0eWxlRm9ybXMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWN0aW9uQnRuQ2xpY2tlZChldmVudCwgc2VjdGlvbikge1xyXG4gICAgICAgIGlmIChzZWN0aW9uID09PSBcImdlbmVyYWxcIikge1xyXG4gICAgICAgICAgdGhpcy5yZXNldFZpZXcoKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93R2VuZXJhbCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzZWN0aW9uID09PSBcInN1aXRhYmlsaXR5XCIpIHtcclxuICAgICAgICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5ID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNlY3Rpb24gPT09IFwiY29uc2VudFwiKSB7XHJcbiAgICAgICAgICB0aGlzLnJlc2V0VmlldygpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dDb25zZW50ID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNlY3Rpb24gPT09IFwibGVhcm5pbmdTdHlsZVwiKSB7XHJcbiAgICAgICAgICB0aGlzLnJlc2V0VmlldygpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dMZWFybmluZ1N0eWxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1N0YXR1c1JlcG9ydChldmVudCkge1xyXG4gICAgICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5RWRpdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWRkU3VpdGFiaWxpdHkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXR1c1JlcG9ydCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jbGllbnRTdWl0YWJpbGl0eSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jbGllbnRWaWV3ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmFkZFN1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhcnRDbGlja2VkKGU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGUuYWN0aXZlWzBdLl9pbmRleDtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmFsbENsaWVudHMuZmlsdGVyKHggPT4geC5zdWl0YWJpbGl0eSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuYWxsQ2xpZW50cy5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiB4LmNvbnNlbnQgJiYgeC5sZWFybmluZ1N0eWxlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5hbGxDbGllbnRzLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmICF4LmNvbnNlbnQgJiYgIXgubGVhcm5pbmdTdHlsZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IDMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuYWxsQ2xpZW50cy5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmICF4LmxlYXJuaW5nU3R5bGUgJiYgeC5iYW5uZXIgJiYgeC5jYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuYWxsQ2xpZW50cztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhcnRIb3ZlcmVkKGU6IGFueSk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVBc1N0dWRlbnQoY2xpZW50OiBTdHVkZW50KSB7XHJcbiAgICAgIHRoaXMuc3R1ZGVudE51bWJlcihjbGllbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0dWRlbnROdW1iZXIoY2xpZW50KSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdTdHVkZW50IE51bWJlcicsXHJcbiAgICAgICAgICB0eXBlOiAnaW5mbycsXHJcbiAgICAgICAgICB0ZXh0OiAnUGxlYXNlIGVudGVyIHN0dWRlbnQgbnVtYmVyIGZvciAnICsgY2xpZW50LmZpcnN0TmFtZSArICcgJyArIGNsaWVudC5sYXN0TmFtZSArICcnLFxyXG4gICAgICAgICAgaW5wdXQ6IFwidGV4dFwiLFxyXG4gICAgICAgICAgaW5wdXRQbGFjZWhvbGRlcjogXCJFbnRlciBTdHVkZW50IE51bWJlclwiLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGFuaW1hdGlvbjogXCJzbGlkZS1mcm9tLXRvcFwiLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdTYXZlJ1xyXG4gICAgICB9KS50aGVuKGlucHV0VmFsdWUgPT4ge1xyXG4gICAgICAgIGlmIChpbnB1dFZhbHVlKSB7XHJcbiAgICAgICAgICBjbGllbnQuc3R1ZGVudE51bWJlciA9IGlucHV0VmFsdWU7XHJcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsZXJ0KGNsaWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDYW5jZWxlZCBcIiArIGVycm9yKTsgLy8gVE9ETzogRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUFsZXJ0KGNsaWVudCkge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnVHJhbnNmZXIgY2xpZW50ICgnICsgY2xpZW50LmZpcnN0TmFtZSArICcgJyArIGNsaWVudC5sYXN0TmFtZSArICcpPycsXHJcbiAgICAgICAgICB0ZXh0OiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNyZWF0ZSBhcyBzdHVkZW50IHdpdGggIycgKyBjbGllbnQuc3R1ZGVudE51bWJlciArICc/JyxcclxuICAgICAgICAgIHR5cGU6ICdxdWVzdGlvbicsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIHRyYW5zZmVyISdcclxuICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAgICAgICAucG9zdE5ldyhjbGllbnQpXHJcbiAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRnJvbUNsaWVudFRhYmxlKGNsaWVudC51c2VySUQpO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7IC8vIFRPRE86IERpc3BsYXkgZXJyb3IgbWVzc2FnZVxyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2FuY2VsZWRcIik7IC8vIFRPRE86IERpc3BsYXkgZXJyb3IgbWVzc2FnZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVGcm9tQ2xpZW50VGFibGUodXNlcklEKTogdm9pZCB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgIC5yZW1vdmVGcm9tQ2xpZW50VGFibGUodXNlcklEKVxyXG4gICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuZmlsdGVyKGggPT4gaC51c2VySUQgIT09IHVzZXJJRCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5zdGFnZTMgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4geC51c2VySUQgIT09IHVzZXJJRCAmJiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmICF4LmxlYXJuaW5nU3R5bGUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuc3RhZ2U0ID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+IHgudXNlcklEICE9PSB1c2VySUQgJiYgIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiAheC5sZWFybmluZ1N0eWxlICYmIHguYmFubmVyICYmIHguY2FtKTtcclxuICAgICAgICAgICAgICB0aGlzLmRvdWdobnV0Q2hhcnREYXRhID0gW3RoaXMuc3RhZ2UxLmxlbmd0aCwgdGhpcy5zdGFnZTIubGVuZ3RoLCB0aGlzLnN0YWdlMy5sZW5ndGgsIHRoaXMuc3RhZ2U0Lmxlbmd0aF07XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgJ1RyYW5zZmVyZWQnLFxyXG4gICAgICAgICAgICAgICAgICAnQ2xpZW50IHJlY29yZCBoYXMgYmVlbiB0cmFuc2ZlcmVkIHRvIHRoZSBzdHVkZW50IHRhYmxlLicsXHJcbiAgICAgICAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jbGllbnRUb3RhbCA9IHRoaXMuZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkU3VpdGFiaWxpdHlJbmZvKGNsaWVudCkge1xyXG4gICAgICB0aGlzLmNsaWVudFZpZXcgPSBudWxsO1xyXG4gICAgICB0aGlzLmFkZFN1aXRhYmlsaXR5ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zaG93U3VpdGFiaWxpdHlFZGl0ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3RhdHVzUmVwb3J0ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtID0gbmV3IFN1aXRhYmlsaXR5Rm9ybSgpO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS50cmFuc2NyaXB0ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFwcHJvcHJpYXRlR29hbCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pc1ZhbGlkQWdlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmdvdmVybm1lbnRJRCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5zY2hvb2xSZWdpc3RyYXRpb24gPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uYXZhaWxhYmxlRHVyaW5nQ2xhc3MgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySGVhbHRoID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3Rvckluc3RydWN0aW9ucyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JDb21tdW5pY2F0aW9uID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3Rvckxhbmd1YWdlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckNvbXB1dGVyID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhvdXNpbmcgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yVHJhbnNwb3J0YXRpb24gPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yRGF5Y2FyZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JJbnRlcm5ldCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JQZXJzb25hbCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmNsaWVudFN1aXRhYmlsaXR5ID0gY2xpZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXRTdWl0YWJpbGl0eShjbGllbnQpIHtcclxuICAgICAgdGhpcy5zdGF0dXNSZXBvcnQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5jbGllbnRWaWV3ID0gbnVsbDtcclxuICAgICAgdGhpcy5hZGRTdWl0YWJpbGl0eSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnNob3dTdWl0YWJpbGl0eUVkaXQgPSB0cnVlO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybSA9IHRoaXMuZ2V0U3VpdGFiaWxpdHlGb3JtQnlGaWx0ZXIoY2xpZW50LnVzZXJJRClbMF07XHJcbiAgICAgIHRoaXMuY2xpZW50U3VpdGFiaWxpdHkgPSBjbGllbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVN1aXRhYmlsaXR5KCkge1xyXG4gICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uc3VpdGFiaWxpdHlJRCkge1xyXG4gICAgICAgIHRoaXMudGFsbHlQb2ludHMoKTtcclxuICAgICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5kYlRvdGFsUG9pbnRzID0gdGhpcy50b3RhbFBvaW50cztcclxuICAgICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgIC51cGRhdGVTdWl0YWJpbGl0eSh0aGlzLnN1aXRhYmlsaXR5Rm9ybSlcclxuICAgICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dTdWl0YWJpbGl0eUVkaXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRWaWV3ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5uZ09uSW5pdCgpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudGFsbHlQb2ludHMoKTtcclxuICAgICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5kYlRvdGFsUG9pbnRzID0gdGhpcy50b3RhbFBvaW50cztcclxuICAgICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgIC5hZGRTdWl0YWJpbGl0eSh0aGlzLmNsaWVudFN1aXRhYmlsaXR5LCB0aGlzLnN1aXRhYmlsaXR5Rm9ybSlcclxuICAgICAgICAgIC50aGVuKCByZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm5nT25Jbml0KCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlKCkge1xyXG4gICAgICB0aGlzLnRhbGx5UG9pbnRzKCk7XHJcbiAgICAgIHRoaXMuY2FsY3VsYXRlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdGFsbHlQb2ludHMoKSB7XHJcbiAgICAgICAgdmFyIGZhY3RvclBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy5wYXJ0QVBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy5wYXJ0QlBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy50b3RhbFBvaW50cyA9IDA7XHJcbiAgICAgICAgdGhpcy5wYXJ0QVdhcm5pbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBhcnRCV2FybmluZyA9IGZhbHNlO1xyXG4gICAgICAgIC8vIFBBUlQgQVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5vZmZlclN0YXJ0RGF0ZSA9PT0gJ0xlc3MgdGhhbiBvbmUgeWVhcicpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ub2ZmZXJTdGFydERhdGUgPT09ICdJbiBvbmUgeWVhcicpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ub2ZmZXJTdGFydERhdGUgPT09ICdNb3JlIHRoYW4gYSBZZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLm1lZXRzR29hbCA9PT0gJ05vJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5tZWV0c0dvYWwgPT09ICdZZXMgYnV0IGxhY2tzIHNraWxscy9oaWdoIGVub3VnaCBtYXJrcycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ubWVldHNHb2FsID09PSAnWWVzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLnRpbWVPdXRPZlNjaG9vbCA9PT0gJzYgb3IgbW9yZSB5ZWFycycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0udGltZU91dE9mU2Nob29sID09PSAnMS02IHllYXJzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS50aW1lT3V0T2ZTY2hvb2wgPT09ICdMZXNzIHRoYW4gMSB5ZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluUHJvZ3JhbUJlZm9yZSA9PT0gJ05vL0xlZnQgd2l0aCBhcHByb3ByaWF0ZSByZWFzb25zJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pblByb2dyYW1CZWZvcmUgPT09ICdZZXMgLSBBcHByb3ByaWF0ZSBwcm9ncmVzcycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5Qcm9ncmFtQmVmb3JlID09PSAnWWVzIOKAkyBObyBwcm9ncmVzcycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5lbXBsb3ltZW50ID09PSAnTm90IHdvcmtpbmcnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmVtcGxveW1lbnQgPT09ICdXb3JraW5nIHBhcnQgdGltZScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZW1wbG95bWVudCA9PT0gJ1dvcmtpbmcgZnVsbCB0aW1lJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ09XICBPRFNQICBFSSAgU0MnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluY29tZVNvdXJjZSA9PT0gJ05vIGluY29tZScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnRW1wbG95ZWQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2UgPT09ICcxOS0yOSB5ZWFycyBvbGQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfSBlbHNlIGlmXHJcbiAgICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlID09PSAnMzAtNDQgeWVhcnMgb2xkJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZSA9PT0gJzQ1LTY1IHllYXJzIG9sZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9XHJcblxyXG4gICAgICAgIC8vUEFSVCBCXHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmhvdXJzUGVyV2VlayA9PT0gJzFMZXNzIHRoYW4gNScpIHsgdGhpcy5wYXJ0QlBvaW50cyArPSAxOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaG91cnNQZXJXZWVrID09PSAnNS0xMCcpIHsgdGhpcy5wYXJ0QlBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaG91cnNQZXJXZWVrID09PSAnMTAtMjAnKSB7IHRoaXMucGFydEJQb2ludHMgKz0gMzsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0ud29ya0hpc3RvcnkgPT09ICdMZXNzIHRoYW4gMSB5ZWFyIGV4cGVyaWVuY2UgaW4gdGhlIGZpZWxkJykgeyB0aGlzLnBhcnRCUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS53b3JrSGlzdG9yeSA9PT0gJzEtNCB5ZWFycyBleHBlcmllbmNlIGluIHRoZSBmaWVsZCcpIHsgdGhpcy5wYXJ0QlBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ud29ya0hpc3RvcnkgPT09ICc0KyB5ZWFycyBleHBlcmllbmNlIGluIHRoZSBmaWVsZCcpIHsgdGhpcy5wYXJ0QlBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JIZWFsdGgpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySW5zdHJ1Y3Rpb25zKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckNvbW11bmljYXRpb24pIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yTGFuZ3VhZ2UpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yQ29tcHV0ZXIpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySG91c2luZykgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JUcmFuc3BvcnRhdGlvbikgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JEYXljYXJlKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckludGVybmV0KSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvclBlcnNvbmFsKSB7IGZhY3RvclBvaW50cysrOyB9XHJcblxyXG4gICAgICAgIGlmIChmYWN0b3JQb2ludHMgPj0gMCAmJiBmYWN0b3JQb2ludHMgPD0gNCkgeyB0aGlzLnBhcnRCUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAgIChmYWN0b3JQb2ludHMgPiA0ICYmIGZhY3RvclBvaW50cyA8PSA4KSB7IHRoaXMucGFydEJQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICAgKGZhY3RvclBvaW50cyA+IDgpIHsgdGhpcy5wYXJ0QlBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgICAgIHRoaXMudG90YWxQb2ludHMgPSB0aGlzLnBhcnRBUG9pbnRzIC0gdGhpcy5wYXJ0QlBvaW50cztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGFydEFQb2ludHMgPCAxNCkgeyB0aGlzLnBhcnRBV2FybmluZyA9IHRydWU7IH1cclxuICAgICAgICBpZiAodGhpcy5wYXJ0QlBvaW50cyA8IDQpIHsgdGhpcy5wYXJ0Qldhcm5pbmcgPSB0cnVlOyB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNoZWNrYm94Q2hhbmdlKGNsaWVudCkge1xyXG4gICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAudXBkYXRlQmFubmVyQ2FtQm9vbChjbGllbnQpXHJcbiAgICAgICAgLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICB0aGlzLm5nT25Jbml0KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKTtcclxuXHJcbiAgICAgIGlmIChjbGllbnQuYmFubmVyICYmIGNsaWVudC5jYW0pIHtcclxuICAgICAgICB0aGlzLnN0YWdlMyA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmICF4LmxlYXJuaW5nU3R5bGUgJiYgIXguYmFubmVyICYmICF4LmNhbSk7XHJcbiAgICAgICAgdGhpcy5zdGFnZTQgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4gIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiAheC5sZWFybmluZ1N0eWxlICYmIHguYmFubmVyICYmIHguY2FtKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnN0YWdlMyA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmICF4LmxlYXJuaW5nU3R5bGUpO1xyXG4gICAgICAgIHRoaXMuc3RhZ2U0ID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmICF4LmNvbnNlbnQgJiYgIXgubGVhcm5pbmdTdHlsZSAmJiB4LmJhbm5lciAmJiB4LmNhbSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZG91Z2hudXRDaGFydERhdGEgPSBbdGhpcy5zdGFnZTEubGVuZ3RoLCB0aGlzLnN0YWdlMi5sZW5ndGgsIHRoaXMuc3RhZ2UzLmxlbmd0aCwgdGhpcy5zdGFnZTQubGVuZ3RoXTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldFZpZXcoKSB7XHJcbiAgICAgIHRoaXMuc3RhdHVzUmVwb3J0ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc2hvd0dlbmVyYWwgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zaG93Q29uc2VudCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnNob3dMZWFybmluZ1N0eWxlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5RWRpdCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmFkZFN1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgIH1cclxufVxyXG4iXX0=
