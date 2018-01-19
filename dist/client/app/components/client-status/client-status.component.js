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
        this.warning = false;
        this.calculated = false;
        this.partAPoints = 0;
        this.partBPoints = 0;
        this.totalPoints = 0;
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
            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                console.log(isConfirm.dismiss);
            }
            else if (isConfirm) {
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
        }).then(function (isConfirm) {
            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                console.log(isConfirm.dismiss);
            }
            else if (isConfirm) {
                client.studentNumber = isConfirm.value;
                _this.removeAlert(client);
            }
        }).catch(function (error) {
            console.log(error); // TODO: Display error message
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
            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                console.log(isConfirm.dismiss);
            }
            else if (isConfirm) {
                _this.studentService
                    .postNew(client)
                    .then(function (result) {
                    _this.removeFromClientTable(client.userID);
                })
                    .catch(function (error) { return _this.error = error; }); // TODO: Display error message
            }
        }).catch(function (error) {
            console.log(error); // TODO: Display error message
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
        var keys = Object.keys(this.suitabilityForm);
        for (var i = 0; i < keys.length; i++) {
            if (typeof this.suitabilityForm[keys[i]] === "string") {
                if (this.suitabilityForm[keys[i]] === "true") {
                    this.suitabilityForm[keys[i]] = true;
                }
                else if (this.suitabilityForm[keys[i]] === "false") {
                    this.suitabilityForm[keys[i]] = false;
                }
                else if (this.suitabilityForm[keys[i]] == null) {
                    this.suitabilityForm[keys[i]] = false;
                }
            }
        }
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
        if (this.suitabilityForm.incomeSource === 'OW  ODSP  EI  SC') {
            this.partAPoints += 3;
        }
        else if (this.suitabilityForm.incomeSource === 'No income') {
            this.partAPoints += 2;
        }
        else if (this.suitabilityForm.incomeSource === 'Employed') {
            this.partAPoints += 1;
        }
        if (this.suitabilityForm.ageRange === '45-65 years old') {
            this.partAPoints += 3;
        }
        else if (this.suitabilityForm.ageRange === '19-29 years old') {
            this.partAPoints += 2;
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
        if (this.suitabilityForm.factorHealth === true) {
            factorPoints++;
        }
        if (this.suitabilityForm.factorInstructions === true) {
            factorPoints++;
        }
        if (this.suitabilityForm.factorCommunication === true) {
            factorPoints++;
        }
        if (this.suitabilityForm.factorLanguage === true) {
            factorPoints++;
        }
        if (this.suitabilityForm.factorComputer === true) {
            factorPoints++;
        }
        if (this.suitabilityForm.factorHousing === true) {
            factorPoints++;
        }
        if (this.suitabilityForm.factorTransportation === true) {
            factorPoints++;
        }
        if (this.suitabilityForm.factorDaycare === true) {
            factorPoints++;
        }
        if (this.suitabilityForm.factorInternet === true) {
            factorPoints++;
        }
        if (this.suitabilityForm.factorPersonal === true) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXdEO0FBQ3hELDBDQUF5QztBQUd6QyxnRUFBK0Q7QUFHL0QsZ0VBQThEO0FBQzlELGtFQUFnRTtBQUNoRSxnRkFBb0U7QUFTcEU7SUFxREksK0JBQW9CLE1BQWMsRUFBVSxhQUE0QixFQUFVLGNBQThCLEVBQVUsV0FBd0I7UUFBOUgsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFwQ2xKLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBR2hDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUVoQixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixnQkFBVyxHQUFZLElBQUksQ0FBQztRQVM1Qix3QkFBbUIsR0FBVSxDQUFDLEVBQUUsZUFBZSxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBTWpHLDRCQUE0QjtRQUM1QixvQkFBZSxHQUFPO1lBQ3BCLHNCQUFzQixFQUFFLEtBQUs7WUFDN0IsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQztRQUNGLG1CQUFjLEdBQVksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELGlCQUFZLEdBQVUsS0FBSyxDQUFDO1FBQzVCLG1CQUFjLEdBQVcsS0FBSyxDQUFDO1FBRS9CLG1CQUFjLEdBQVUsQ0FBQyxFQUFFLGVBQWUsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBR2pGLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCwwQ0FBVSxHQUFWO1FBQUEsaUJBV0M7UUFWRyxJQUFJLENBQUMsYUFBYTthQUNiLFVBQVUsRUFBRTthQUNaLElBQUksQ0FBQyxVQUFBLE9BQU87WUFDVCxFQUFFLENBQUMsQ0FBRSxPQUFlLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFCLENBQUM7UUFDTCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxzQ0FBTSxHQUFOLFVBQU8sS0FBSztRQUNWLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsdUNBQU8sR0FBUCxVQUFRLE9BQU87UUFDWCxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDNUIsR0FBRyxDQUFDLENBQWUsVUFBUyxFQUFULEtBQUEsSUFBSSxDQUFDLElBQUksRUFBVCxjQUFTLEVBQVQsSUFBUztZQUF2QixJQUFJLE1BQU0sU0FBQTtZQUNiLE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUMzRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLENBQUM7U0FDRjtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNsQyxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDakQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUM7UUFDckQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxXQUFXLEVBQWIsQ0FBYSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxhQUFhLEVBQTlDLENBQThDLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQWhELENBQWdELENBQUMsQ0FBQztRQUN0RixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFyRSxDQUFxRSxDQUFDLENBQUM7UUFDM0csSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsYUFBYSxFQUFFLHdCQUF3QixFQUFFLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3JHLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUcsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFVBQVUsQ0FBQztRQUNwQyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUU3QixDQUFDO0lBRUQseUNBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsMkNBQVcsR0FBWCxVQUFZLE1BQWM7UUFBMUIsaUJBa0JDO1FBakJHLElBQUksQ0FBQztZQUNELEtBQUssRUFBRSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUk7WUFDMUUsSUFBSSxFQUFFLG1DQUFtQztZQUN6QyxJQUFJLEVBQUUsU0FBUztZQUNmLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsa0JBQWtCLEVBQUUsU0FBUztZQUM3QixpQkFBaUIsRUFBRSxNQUFNO1lBQ3pCLGlCQUFpQixFQUFFLGlCQUFpQjtTQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsU0FBUztZQUNmLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEtBQUssUUFBUSxJQUFJLFNBQVMsQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakMsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLO1lBQ1osMEJBQTBCO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDRDQUFZLEdBQVosVUFBYSxNQUFjO1FBQTNCLGlCQXFCQztRQXBCRyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWE7YUFDYixNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ2QsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUNMLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEtBQUssTUFBTSxFQUFaLENBQVksQ0FBQyxDQUFDO1lBQ2hELEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEtBQUssTUFBTSxFQUFaLENBQVksQ0FBQyxDQUFDO1lBQzVELEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsV0FBVyxFQUFiLENBQWEsQ0FBQyxDQUFDO1lBQ25ELEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsYUFBYSxFQUE5QyxDQUE4QyxDQUFDLENBQUM7WUFDcEYsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFoRCxDQUFnRCxDQUFDLENBQUM7WUFDdEYsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBckUsQ0FBcUUsQ0FBQyxDQUFDO1lBQzNHLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUcsSUFBSSxDQUNBLFVBQVUsRUFDVixpQ0FBaUMsRUFDakMsU0FBUyxDQUNaLENBQUM7WUFDRixLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3hDLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFsQixDQUFrQixDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELDhDQUFjLEdBQWQsVUFBZSxNQUFjO1FBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUV4QixJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTFDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEMsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsNEJBQTRCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQy9ILENBQUM7SUFDTCxDQUFDO0lBRUQsMERBQTBCLEdBQTFCLFVBQTJCLEVBQUU7UUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsc0RBQXNCLEdBQXRCLFVBQXVCLEVBQUU7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELDREQUE0QixHQUE1QixVQUE2QixFQUFFO1FBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELGlEQUFpQixHQUFqQixVQUFrQixLQUFLLEVBQUUsT0FBTztRQUM1QixFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDNUIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZUFBZSxDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0RBQWdCLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQ2hDLENBQUM7SUFFRCw0Q0FBWSxHQUFaLFVBQWEsQ0FBTTtRQUNmLElBQUksQ0FBQztZQUNELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsV0FBVyxFQUFiLENBQWEsQ0FBQyxDQUFDO1lBQzNELENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsYUFBYSxFQUE5QyxDQUE4QyxDQUFDLENBQUM7WUFDNUYsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFoRCxDQUFnRCxDQUFDLENBQUM7WUFDOUYsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBckUsQ0FBcUUsQ0FBQyxDQUFDO1lBQ25ILENBQUM7UUFDTCxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNoQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDRDQUFZLEdBQVosVUFBYSxDQUFNO0lBRW5CLENBQUM7SUFFRCwrQ0FBZSxHQUFmLFVBQWdCLE1BQWU7UUFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsNkNBQWEsR0FBYixVQUFjLE1BQU07UUFBcEIsaUJBc0JDO1FBckJDLElBQUksQ0FBQztZQUNELEtBQUssRUFBRSxnQkFBZ0I7WUFDdkIsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsa0NBQWtDLEdBQUcsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsR0FBRyxFQUFFO1lBQ3hGLEtBQUssRUFBRSxNQUFNO1lBQ2IsZ0JBQWdCLEVBQUUsc0JBQXNCO1lBQ3hDLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsU0FBUyxFQUFFLGdCQUFnQjtZQUMzQixrQkFBa0IsRUFBRSxTQUFTO1lBQzdCLGlCQUFpQixFQUFFLE1BQU07WUFDekIsaUJBQWlCLEVBQUUsTUFBTTtTQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsU0FBUztZQUNmLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEtBQUssUUFBUSxJQUFJLFNBQVMsQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakMsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixNQUFNLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7Z0JBQ3ZDLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0IsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEtBQUs7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsOEJBQThCO1FBQ3BELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDJDQUFXLEdBQVgsVUFBWSxNQUFNO1FBQWxCLGlCQXVCQztRQXRCQyxJQUFJLENBQUM7WUFDRCxLQUFLLEVBQUUsbUJBQW1CLEdBQUcsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJO1lBQzVFLElBQUksRUFBRSxtREFBbUQsR0FBRyxNQUFNLENBQUMsYUFBYSxHQUFHLEdBQUc7WUFDdEYsSUFBSSxFQUFFLFVBQVU7WUFDaEIsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixrQkFBa0IsRUFBRSxTQUFTO1lBQzdCLGlCQUFpQixFQUFFLE1BQU07WUFDekIsaUJBQWlCLEVBQUUsZ0JBQWdCO1NBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxTQUFTO1lBQ2YsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sS0FBSyxRQUFRLElBQUksU0FBUyxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN0RSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxjQUFjO3FCQUNkLE9BQU8sQ0FBQyxNQUFNLENBQUM7cUJBQ2YsSUFBSSxDQUFDLFVBQUEsTUFBTTtvQkFDVixLQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1QyxDQUFDLENBQUM7cUJBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQyxDQUFDLDhCQUE4QjtZQUN6RSxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSztZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyw4QkFBOEI7UUFDcEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQscURBQXFCLEdBQXJCLFVBQXNCLE1BQU07UUFBNUIsaUJBaUJDO1FBaEJDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsYUFBYTthQUNiLHFCQUFxQixDQUFDLE1BQU0sQ0FBQzthQUM3QixJQUFJLENBQUMsVUFBQSxHQUFHO1lBQ0wsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFuQixDQUFtQixDQUFDLENBQUM7WUFDdkQsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUF2RSxDQUF1RSxDQUFDLENBQUM7WUFDN0csS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBNUYsQ0FBNEYsQ0FBQyxDQUFDO1lBQ2xJLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUcsSUFBSSxDQUNBLFlBQVksRUFDWix5REFBeUQsRUFDekQsU0FBUyxDQUNaLENBQUM7WUFDRixLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3hDLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFsQixDQUFrQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELGtEQUFrQixHQUFsQixVQUFtQixNQUFNO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGlDQUFlLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDbEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFDLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQ2hELElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQ2pELElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNDLElBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQ2xELElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUM7SUFDbEMsQ0FBQztJQUVELCtDQUFlLEdBQWYsVUFBZ0IsTUFBTTtRQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV6RSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM3QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNuQyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDcEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUMzQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDekMsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNuRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDMUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUMvQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDMUMsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztJQUNsQyxDQUFDO0lBRUQsK0NBQWUsR0FBZjtRQUFBLGlCQXVCQztRQXRCQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDdEQsSUFBSSxDQUFDLGFBQWE7aUJBQ2YsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztpQkFDdkMsSUFBSSxDQUFFLFVBQUEsR0FBRztnQkFDUixLQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO2dCQUNqQyxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDdkIsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2xCLENBQUMsQ0FBQztpQkFDRCxLQUFLLEVBQUUsQ0FBQztRQUNiLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ3RELElBQUksQ0FBQyxhQUFhO2lCQUNmLGNBQWMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQztpQkFDNUQsSUFBSSxDQUFFLFVBQUEsR0FBRztnQkFDUixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEIsQ0FBQyxDQUFDO2lCQUNELEtBQUssRUFBRSxDQUFDO1FBQ2IsQ0FBQztJQUVILENBQUM7SUFFRCx5Q0FBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFRCwyQ0FBVyxHQUFYO1FBQ0UsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLFNBQVM7UUFDVCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsS0FBSyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUNwRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUMxRixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxLQUFLLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUV2RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDL0UsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsS0FBSyx3Q0FBd0MsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUNoSCxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFFckUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEtBQUssaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDbEcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDekYsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsS0FBSyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFFeEYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEtBQUssa0NBQWtDLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDbkgsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsS0FBSyw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUMxRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxLQUFLLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUV6RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDekYsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsS0FBSyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUM1RixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxLQUFLLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUVwRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksS0FBSyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUNoRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUN0RixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFFN0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEtBQUssaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDM0YsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsS0FBSyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUN4RixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxLQUFLLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUVoRixRQUFRO1FBQ1IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQ3JGLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQ2pGLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUVoRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsS0FBSyw2QkFBNkIsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUMxRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxLQUFLLHNCQUFzQixDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQ2hHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEtBQUsscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFBQyxDQUFDO1FBRXZGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDbkUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQ3pFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUFDLFlBQVksRUFBRSxDQUFDO1FBQUMsQ0FBQztRQUMxRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQ3JFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDckUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUFDLFlBQVksRUFBRSxDQUFDO1FBQUMsQ0FBQztRQUNwRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLG9CQUFvQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDM0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUFDLFlBQVksRUFBRSxDQUFDO1FBQUMsQ0FBQztRQUNwRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQUMsWUFBWSxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQ3JFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFFckUsRUFBRSxDQUFDLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQzdFLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQzFFLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFdkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFBQyxDQUFDO0lBQ3JELENBQUM7SUFHRCw4Q0FBYyxHQUFkLFVBQWUsTUFBTTtRQUFyQixpQkFpQkM7UUFoQkMsSUFBSSxDQUFDLGFBQWE7YUFDZixtQkFBbUIsQ0FBQyxNQUFNLENBQUM7YUFDM0IsSUFBSSxDQUFFLFVBQUEsR0FBRztZQUNSLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQixDQUFDLENBQUM7YUFDRCxLQUFLLEVBQUUsQ0FBQztRQUVYLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQXZFLENBQXVFLENBQUMsQ0FBQztZQUM3RyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFyRSxDQUFxRSxDQUFDLENBQUM7UUFDN0csQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFoRCxDQUFnRCxDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBckUsQ0FBcUUsQ0FBQyxDQUFDO1FBQzdHLENBQUM7UUFFRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVHLENBQUM7SUFFRCx5Q0FBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUFFRCxzQ0FBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBdmNRO1FBQVIsWUFBSyxFQUFFO2tDQUFrQixpQ0FBZTtrRUFBQztJQWxCakMscUJBQXFCO1FBTmpDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUsNkRBQTZEO1lBQzFFLFNBQVMsRUFBRSxDQUFDLDREQUE0RCxDQUFDO1NBQzVFLENBQUM7eUNBdUQ4QixlQUFNLEVBQXlCLDhCQUFhLEVBQTBCLGdDQUFjLEVBQXVCLG9DQUFXO09BckR6SSxxQkFBcUIsQ0EwZGpDO0lBQUQsNEJBQUM7Q0ExZEQsQUEwZEMsSUFBQTtBQTFkWSxzREFBcUIiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvY2xpZW50LXN0YXR1cy9jbGllbnQtc3RhdHVzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENsaWVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2xpZW50XCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N0dWRlbnRcIjtcclxuaW1wb3J0IHsgU3VpdGFiaWxpdHlGb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdWl0YWJpbGl0eUZvcm1cIjtcclxuaW1wb3J0IHsgQ29uc2VudEZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbnNlbnRGb3JtXCI7XHJcbmltcG9ydCB7IExlYXJuaW5nU3R5bGVGb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9sZWFybmluZ1N0eWxlRm9ybVwiO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlXCI7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdjbGllbnQtc3RhdHVzJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvY2xpZW50LXN0YXR1cy9jbGllbnQtc3RhdHVzLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIENsaWVudFN0YXR1c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBkYXRhOiBhbnlbXTtcclxuICAgIGFsbENsaWVudHM6IENsaWVudFtdO1xyXG4gICAgc3VpdGFiaWxpdHlGb3JtczogU3VpdGFiaWxpdHlGb3JtW107XHJcbiAgICBjb25zZW50Rm9ybXM6IENvbnNlbnRGb3JtW107XHJcbiAgICBsZWFybmluZ1N0eWxlRm9ybXM6IExlYXJuaW5nU3R5bGVGb3JtW107XHJcbiAgICBjbGllbnRUb3RhbDogYW55O1xyXG4gICAgYWN0aW9uSXRlbXM6IGFueVtdO1xyXG4gICAgZXJyb3I6IGFueTtcclxuXHJcbiAgICBjbGllbnRWaWV3OiBDbGllbnQ7XHJcbiAgICBjb25zZW50VmlldzogQ29uc2VudEZvcm07XHJcbiAgICBzdWl0YWJpbGl0eVZpZXc6IFN1aXRhYmlsaXR5Rm9ybTtcclxuICAgIGxlYXJuaW5nU3R5bGVWaWV3OiBMZWFybmluZ1N0eWxlRm9ybTtcclxuXHJcbiAgICBzaG93U3VpdGFiaWxpdHlFZGl0OiBib29sZWFuO1xyXG5cclxuICAgIGFkZFN1aXRhYmlsaXR5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBzdWl0YWJpbGl0eUZvcm06IFN1aXRhYmlsaXR5Rm9ybTtcclxuICAgIGNsaWVudFN1aXRhYmlsaXR5OiBDbGllbnRbXTtcclxuICAgIHdhcm5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGNhbGN1bGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHBhcnRBUG9pbnRzID0gMDtcclxuICAgIHBhcnRCUG9pbnRzID0gMDtcclxuICAgIHRvdGFsUG9pbnRzID0gMDtcclxuXHJcbiAgICBzdGF0dXNSZXBvcnQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2hvd0dlbmVyYWw6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2hvd1N1aXRhYmlsaXR5OiBib29sZWFuO1xyXG4gICAgc2hvd0NvbnNlbnQ6IGJvb2xlYW47XHJcbiAgICBzaG93TGVhcm5pbmdTdHlsZTogYm9vbGVhbjtcclxuXHJcbiAgICAvL2RvdWdobnV0IGNoYXJ0IChjbGllbnQgc3RhdHVzKVxyXG4gICAgZG91Z2hudXRDaGFydExhYmVsczogc3RyaW5nW107XHJcbiAgICBkb3VnaG51dENoYXJ0RGF0YTogbnVtYmVyW107XHJcbiAgICBkb3VnaG51dENoYXJ0VHlwZTogc3RyaW5nO1xyXG4gICAgZG91Z2hudXRDaGFydENvbG9yczogYW55W10gPSBbeyBiYWNrZ3JvdW5kQ29sb3I6IFtcIiNGRjQyMDdcIiwgXCIjRjhFOTAzXCIsIFwiIzMwOUVGRlwiLCBcIiMyQUQzMDhcIl0gfV07XHJcbiAgICBzdGFnZTE6IGFueTtcclxuICAgIHN0YWdlMjogYW55O1xyXG4gICAgc3RhZ2UzOiBhbnk7XHJcbiAgICBzdGFnZTQ6IGFueTtcclxuXHJcbiAgICAvL2JhciBjaGFydCAobGVhcm5pbmcgc3R5bGUpXHJcbiAgICBiYXJDaGFydE9wdGlvbnM6YW55ID0ge1xyXG4gICAgICBzY2FsZVNob3dWZXJ0aWNhbExpbmVzOiBmYWxzZSxcclxuICAgICAgcmVzcG9uc2l2ZTogdHJ1ZVxyXG4gICAgfTtcclxuICAgIGJhckNoYXJ0TGFiZWxzOnN0cmluZ1tdID0gWydIZWFyaW5nJywgJ1NlZWluZycsICdEb2luZyddO1xyXG4gICAgYmFyQ2hhcnRUeXBlOnN0cmluZyA9ICdiYXInO1xyXG4gICAgYmFyQ2hhcnRMZWdlbmQ6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgYmFyQ2hhcnREYXRhOmFueTtcclxuICAgIGJhckNoYXJ0Q29sb3JzOiBhbnlbXSA9IFt7IGJhY2tncm91bmRDb2xvcjogW1wiI0ZGNDIwN1wiLCBcIiNGOEU5MDNcIiwgXCIjMkFEMzA4XCJdIH1dO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSwgcHJpdmF0ZSBzdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRDbGllbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2xpZW50cygpIHtcclxuICAgICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgICAgLmdldENsaWVudHMoKVxyXG4gICAgICAgICAgICAudGhlbihvYmplY3RzID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgob2JqZWN0cyBhcyBhbnkpLnN0YXR1cyA9PT0gXCI0MDNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YShvYmplY3RzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGV2ZW50KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGF0YShvYmplY3RzKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gb2JqZWN0cy5jbGllbnRzO1xyXG4gICAgICAgIGZvciAobGV0IGNsaWVudCBvZiB0aGlzLmRhdGEpIHtcclxuICAgICAgICAgIGNsaWVudC5mdWxsTmFtZSA9IGNsaWVudC5maXJzdE5hbWUgKyBcIiBcIiArIGNsaWVudC5sYXN0TmFtZTtcclxuICAgICAgICAgIGlmIChjbGllbnQuYmFubmVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgY2xpZW50LmJhbm5lciA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGNsaWVudC5jYW0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjbGllbnQuY2FtID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWxsQ2xpZW50cyA9IG9iamVjdHMuY2xpZW50cztcclxuICAgICAgICB0aGlzLmNsaWVudFRvdGFsID0gb2JqZWN0cy5jbGllbnRzLmxlbmd0aDtcclxuICAgICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybXMgPSBvYmplY3RzLnN1aXRhYmlsaXR5Rm9ybXM7XHJcbiAgICAgICAgdGhpcy5jb25zZW50Rm9ybXMgPSBvYmplY3RzLmNvbnNlbnRGb3JtcztcclxuICAgICAgICB0aGlzLmxlYXJuaW5nU3R5bGVGb3JtcyA9IG9iamVjdHMubGVhcm5pbmdTdHlsZUZvcm1zO1xyXG4gICAgICAgIHRoaXMuc3RhZ2UxID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+IHguc3VpdGFiaWxpdHkpO1xyXG4gICAgICAgIHRoaXMuc3RhZ2UyID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmIHguY29uc2VudCAmJiB4LmxlYXJuaW5nU3R5bGUpO1xyXG4gICAgICAgIHRoaXMuc3RhZ2UzID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmICF4LmNvbnNlbnQgJiYgIXgubGVhcm5pbmdTdHlsZSk7XHJcbiAgICAgICAgdGhpcy5zdGFnZTQgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4gIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiAheC5sZWFybmluZ1N0eWxlICYmIHguYmFubmVyICYmIHguY2FtKTtcclxuICAgICAgICB0aGlzLmRvdWdobnV0Q2hhcnRMYWJlbHMgPSBbJ1N1aXRhYmlsaXR5JywgJ0NvbnNlbnQvTGVhcm5pbmcgU3R5bGUnLCAnQmFubmVyL0NBTScsICdUcmFuc2ZlciBSZWFkeSddO1xyXG4gICAgICAgIHRoaXMuZG91Z2hudXRDaGFydERhdGEgPSBbdGhpcy5zdGFnZTEubGVuZ3RoLCB0aGlzLnN0YWdlMi5sZW5ndGgsIHRoaXMuc3RhZ2UzLmxlbmd0aCwgdGhpcy5zdGFnZTQubGVuZ3RoXTtcclxuICAgICAgICB0aGlzLmRvdWdobnV0Q2hhcnRUeXBlID0gJ2RvdWdobnV0JztcclxuICAgICAgICB0aGlzLmFkZFN1aXRhYmlsaXR5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGF0dXNSZXBvcnQgPSB0cnVlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhZGRDbGllbnQoKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc3VpdGFiaWxpdHknXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlQWxlcnQoY2xpZW50OiBDbGllbnQpIHtcclxuICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgdGl0bGU6ICdEZWxldGUgY2xpZW50ICgnICsgY2xpZW50LmZpcnN0TmFtZSArICcgJyArIGNsaWVudC5sYXN0TmFtZSArICcpPycsXHJcbiAgICAgICAgICAgIHRleHQ6IFwiWW91IHdvbid0IGJlIGFibGUgdG8gcmV2ZXJ0IHRoaXMhXCIsXHJcbiAgICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBkZWxldGUgaXQhJ1xyXG4gICAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtLmRpc21pc3MpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVDbGllbnQoY2xpZW50KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ2FuY2VsZWRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlQ2xpZW50KGNsaWVudDogQ2xpZW50KSB7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5kZWxldGUoY2xpZW50KVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U3RhdHVzUmVwb3J0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuZmlsdGVyKGggPT4gaCAhPT0gY2xpZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxsQ2xpZW50cyA9IHRoaXMuYWxsQ2xpZW50cy5maWx0ZXIoaCA9PiBoICE9PSBjbGllbnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZTEgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4geC5zdWl0YWJpbGl0eSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlMiA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiB4LmNvbnNlbnQgJiYgeC5sZWFybmluZ1N0eWxlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2UzID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmICF4LmNvbnNlbnQgJiYgIXgubGVhcm5pbmdTdHlsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlNCA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmICF4LmxlYXJuaW5nU3R5bGUgJiYgeC5iYW5uZXIgJiYgeC5jYW0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb3VnaG51dENoYXJ0RGF0YSA9IFt0aGlzLnN0YWdlMS5sZW5ndGgsIHRoaXMuc3RhZ2UyLmxlbmd0aCwgdGhpcy5zdGFnZTMubGVuZ3RoLCB0aGlzLnN0YWdlNC5sZW5ndGhdO1xyXG4gICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAnRGVsZXRlZCEnLFxyXG4gICAgICAgICAgICAgICAgICAgICdDbGllbnQgcmVjb3JkIGhhcyBiZWVuIGRlbGV0ZWQuJyxcclxuICAgICAgICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWVudFRvdGFsID0gdGhpcy5kYXRhLmxlbmd0aDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0NsaWVudFZpZXcoY2xpZW50OiBDbGllbnQpIHtcclxuICAgICAgICB0aGlzLmNsaWVudFZpZXcgPSBjbGllbnQ7XHJcbiAgICAgICAgdGhpcy5yZXNldFZpZXcoKTtcclxuICAgICAgICB0aGlzLnNob3dHZW5lcmFsID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdmFyIHN1aXRhYmlsaXR5Rm9ybSA9IHRoaXMuZ2V0U3VpdGFiaWxpdHlGb3JtQnlGaWx0ZXIoY2xpZW50LnVzZXJJRCk7XHJcbiAgICAgICAgdGhpcy5zdWl0YWJpbGl0eVZpZXcgPSBzdWl0YWJpbGl0eUZvcm1bMF07XHJcblxyXG4gICAgICAgIHZhciBjb25zZW50Rm9ybSA9IHRoaXMuZ2V0Q29uc2VudEZvcm1CeUZpbHRlcihjbGllbnQudXNlcklEKTtcclxuICAgICAgICB0aGlzLmNvbnNlbnRWaWV3ID0gY29uc2VudEZvcm1bMF07XHJcblxyXG4gICAgICAgIHZhciBsZWFybmluZ1N0eWxlRm9ybSA9IHRoaXMuZ2V0TGVhcm5pbmdTdHlsZUZvcm1CeUZpbHRlcihjbGllbnQudXNlcklEKTtcclxuICAgICAgICB0aGlzLmxlYXJuaW5nU3R5bGVWaWV3ID0gbGVhcm5pbmdTdHlsZUZvcm1bMF07XHJcbiAgICAgICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZVZpZXcpIHtcclxuICAgICAgICAgIHRoaXMuYmFyQ2hhcnREYXRhID0gW3sgZGF0YTogW3RoaXMubGVhcm5pbmdTdHlsZVZpZXcuaGVhcmluZywgdGhpcy5sZWFybmluZ1N0eWxlVmlldy5zZWVpbmcsIHRoaXMubGVhcm5pbmdTdHlsZVZpZXcuZG9pbmddfV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFN1aXRhYmlsaXR5Rm9ybUJ5RmlsdGVyKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VpdGFiaWxpdHlGb3Jtcy5maWx0ZXIoeCA9PiB4LnVzZXJJRCA9PT0gaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvbnNlbnRGb3JtQnlGaWx0ZXIoaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25zZW50Rm9ybXMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMZWFybmluZ1N0eWxlRm9ybUJ5RmlsdGVyKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGVhcm5pbmdTdHlsZUZvcm1zLmZpbHRlcih4ID0+IHgudXNlcklEID09PSBpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VjdGlvbkJ0bkNsaWNrZWQoZXZlbnQsIHNlY3Rpb24pIHtcclxuICAgICAgICBpZiAoc2VjdGlvbiA9PT0gXCJnZW5lcmFsXCIpIHtcclxuICAgICAgICAgIHRoaXMucmVzZXRWaWV3KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0dlbmVyYWwgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2VjdGlvbiA9PT0gXCJzdWl0YWJpbGl0eVwiKSB7XHJcbiAgICAgICAgICB0aGlzLnJlc2V0VmlldygpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dTdWl0YWJpbGl0eSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzZWN0aW9uID09PSBcImNvbnNlbnRcIikge1xyXG4gICAgICAgICAgdGhpcy5yZXNldFZpZXcoKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93Q29uc2VudCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzZWN0aW9uID09PSBcImxlYXJuaW5nU3R5bGVcIikge1xyXG4gICAgICAgICAgdGhpcy5yZXNldFZpZXcoKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93TGVhcm5pbmdTdHlsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dTdGF0dXNSZXBvcnQoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93U3VpdGFiaWxpdHlFZGl0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hZGRTdWl0YWJpbGl0eSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzUmVwb3J0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNsaWVudFN1aXRhYmlsaXR5ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNsaWVudFZpZXcgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYWRkU3VpdGFiaWxpdHkgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFydENsaWNrZWQoZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZS5hY3RpdmVbMF0uX2luZGV4O1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuYWxsQ2xpZW50cy5maWx0ZXIoeCA9PiB4LnN1aXRhYmlsaXR5KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5hbGxDbGllbnRzLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmIHguY29uc2VudCAmJiB4LmxlYXJuaW5nU3R5bGUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmFsbENsaWVudHMuZmlsdGVyKHggPT4gIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiAheC5sZWFybmluZ1N0eWxlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5hbGxDbGllbnRzLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmICF4LmNvbnNlbnQgJiYgIXgubGVhcm5pbmdTdHlsZSAmJiB4LmJhbm5lciAmJiB4LmNhbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5hbGxDbGllbnRzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFydEhvdmVyZWQoZTogYW55KTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUFzU3R1ZGVudChjbGllbnQ6IFN0dWRlbnQpIHtcclxuICAgICAgdGhpcy5zdHVkZW50TnVtYmVyKGNsaWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3R1ZGVudE51bWJlcihjbGllbnQpIHtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ1N0dWRlbnQgTnVtYmVyJyxcclxuICAgICAgICAgIHR5cGU6ICdpbmZvJyxcclxuICAgICAgICAgIHRleHQ6ICdQbGVhc2UgZW50ZXIgc3R1ZGVudCBudW1iZXIgZm9yICcgKyBjbGllbnQuZmlyc3ROYW1lICsgJyAnICsgY2xpZW50Lmxhc3ROYW1lICsgJycsXHJcbiAgICAgICAgICBpbnB1dDogXCJ0ZXh0XCIsXHJcbiAgICAgICAgICBpbnB1dFBsYWNlaG9sZGVyOiBcIkVudGVyIFN0dWRlbnQgTnVtYmVyXCIsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgYW5pbWF0aW9uOiBcInNsaWRlLWZyb20tdG9wXCIsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1NhdmUnXHJcbiAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICBpZiAoaXNDb25maXJtLmRpc21pc3MgPT09IFwiY2FuY2VsXCIgfHwgaXNDb25maXJtLmRpc21pc3MgPT09IFwib3ZlcmxheVwiKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhpc0NvbmZpcm0uZGlzbWlzcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgIGNsaWVudC5zdHVkZW50TnVtYmVyID0gaXNDb25maXJtLnZhbHVlO1xyXG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGVydChjbGllbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTsgLy8gVE9ETzogRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUFsZXJ0KGNsaWVudCkge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnVHJhbnNmZXIgY2xpZW50ICgnICsgY2xpZW50LmZpcnN0TmFtZSArICcgJyArIGNsaWVudC5sYXN0TmFtZSArICcpPycsXHJcbiAgICAgICAgICB0ZXh0OiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNyZWF0ZSBhcyBzdHVkZW50IHdpdGggIycgKyBjbGllbnQuc3R1ZGVudE51bWJlciArICc/JyxcclxuICAgICAgICAgIHR5cGU6ICdxdWVzdGlvbicsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIHRyYW5zZmVyISdcclxuICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgICAgICAgIC5wb3N0TmV3KGNsaWVudClcclxuICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tQ2xpZW50VGFibGUoY2xpZW50LnVzZXJJRCk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTsgLy8gVE9ETzogRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpOyAvLyBUT0RPOiBEaXNwbGF5IGVycm9yIG1lc3NhZ2VcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlRnJvbUNsaWVudFRhYmxlKHVzZXJJRCk6IHZvaWQge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgICAucmVtb3ZlRnJvbUNsaWVudFRhYmxlKHVzZXJJRClcclxuICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmZpbHRlcihoID0+IGgudXNlcklEICE9PSB1c2VySUQpO1xyXG4gICAgICAgICAgICAgIHRoaXMuc3RhZ2UzID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+IHgudXNlcklEICE9PSB1c2VySUQgJiYgIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiAheC5sZWFybmluZ1N0eWxlKTtcclxuICAgICAgICAgICAgICB0aGlzLnN0YWdlNCA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiB4LnVzZXJJRCAhPT0gdXNlcklEICYmICF4LnN1aXRhYmlsaXR5ICYmICF4LmNvbnNlbnQgJiYgIXgubGVhcm5pbmdTdHlsZSAmJiB4LmJhbm5lciAmJiB4LmNhbSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5kb3VnaG51dENoYXJ0RGF0YSA9IFt0aGlzLnN0YWdlMS5sZW5ndGgsIHRoaXMuc3RhZ2UyLmxlbmd0aCwgdGhpcy5zdGFnZTMubGVuZ3RoLCB0aGlzLnN0YWdlNC5sZW5ndGhdO1xyXG4gICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICdUcmFuc2ZlcmVkJyxcclxuICAgICAgICAgICAgICAgICAgJ0NsaWVudCByZWNvcmQgaGFzIGJlZW4gdHJhbnNmZXJlZCB0byB0aGUgc3R1ZGVudCB0YWJsZS4nLFxyXG4gICAgICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIHRoaXMuY2xpZW50VG90YWwgPSB0aGlzLmRhdGEubGVuZ3RoO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFN1aXRhYmlsaXR5SW5mbyhjbGllbnQpIHtcclxuICAgICAgdGhpcy5jbGllbnRWaWV3ID0gbnVsbDtcclxuICAgICAgdGhpcy5hZGRTdWl0YWJpbGl0eSA9IHRydWU7XHJcbiAgICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5RWRpdCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN0YXR1c1JlcG9ydCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybSA9IG5ldyBTdWl0YWJpbGl0eUZvcm0oKTtcclxuICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0udHJhbnNjcmlwdCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hcHByb3ByaWF0ZUdvYWwgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uaXNWYWxpZEFnZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5nb3Zlcm5tZW50SUQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uc2Nob29sUmVnaXN0cmF0aW9uID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmF2YWlsYWJsZUR1cmluZ0NsYXNzID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckhlYWx0aCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JJbnN0cnVjdGlvbnMgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yQ29tbXVuaWNhdGlvbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JMYW5ndWFnZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JDb21wdXRlciA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JIb3VzaW5nID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvclRyYW5zcG9ydGF0aW9uID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckRheWNhcmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySW50ZXJuZXQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yUGVyc29uYWwgPSBmYWxzZTtcclxuICAgICAgdGhpcy5jbGllbnRTdWl0YWJpbGl0eSA9IGNsaWVudDtcclxuICAgIH1cclxuXHJcbiAgICBlZGl0U3VpdGFiaWxpdHkoY2xpZW50KSB7XHJcbiAgICAgIHRoaXMuc3RhdHVzUmVwb3J0ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuY2xpZW50VmlldyA9IG51bGw7XHJcbiAgICAgIHRoaXMuYWRkU3VpdGFiaWxpdHkgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zaG93U3VpdGFiaWxpdHlFZGl0ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0gPSB0aGlzLmdldFN1aXRhYmlsaXR5Rm9ybUJ5RmlsdGVyKGNsaWVudC51c2VySUQpWzBdO1xyXG5cclxuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLnN1aXRhYmlsaXR5Rm9ybSk7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnN1aXRhYmlsaXR5Rm9ybVtrZXlzW2ldXSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybVtrZXlzW2ldXSA9PT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm1ba2V5c1tpXV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm1ba2V5c1tpXV0gPT09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybVtrZXlzW2ldXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm1ba2V5c1tpXV0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybVtrZXlzW2ldXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLmNsaWVudFN1aXRhYmlsaXR5ID0gY2xpZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVTdWl0YWJpbGl0eSgpIHtcclxuICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLnN1aXRhYmlsaXR5SUQpIHtcclxuICAgICAgICB0aGlzLnRhbGx5UG9pbnRzKCk7XHJcbiAgICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZGJUb3RhbFBvaW50cyA9IHRoaXMudG90YWxQb2ludHM7XHJcbiAgICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgICAudXBkYXRlU3VpdGFiaWxpdHkodGhpcy5zdWl0YWJpbGl0eUZvcm0pXHJcbiAgICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93U3VpdGFiaWxpdHlFZGl0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50VmlldyA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMubmdPbkluaXQoKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnRhbGx5UG9pbnRzKCk7XHJcbiAgICAgICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0uZGJUb3RhbFBvaW50cyA9IHRoaXMudG90YWxQb2ludHM7XHJcbiAgICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgICAuYWRkU3VpdGFiaWxpdHkodGhpcy5jbGllbnRTdWl0YWJpbGl0eSwgdGhpcy5zdWl0YWJpbGl0eUZvcm0pXHJcbiAgICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy5uZ09uSW5pdCgpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZSgpIHtcclxuICAgICAgdGhpcy50YWxseVBvaW50cygpO1xyXG4gICAgICB0aGlzLmNhbGN1bGF0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHRhbGx5UG9pbnRzKCkge1xyXG4gICAgICB2YXIgZmFjdG9yUG9pbnRzID0gMDtcclxuICAgICAgdGhpcy5wYXJ0QVBvaW50cyA9IDA7XHJcbiAgICAgIHRoaXMucGFydEJQb2ludHMgPSAwO1xyXG4gICAgICB0aGlzLnRvdGFsUG9pbnRzID0gMDtcclxuICAgICAgdGhpcy53YXJuaW5nID0gZmFsc2U7XHJcbiAgICAgIC8vIFBBUlQgQVxyXG4gICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0ub2ZmZXJTdGFydERhdGUgPT09ICdMZXNzIHRoYW4gb25lIHllYXInKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5vZmZlclN0YXJ0RGF0ZSA9PT0gJ0luIG9uZSB5ZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ub2ZmZXJTdGFydERhdGUgPT09ICdNb3JlIHRoYW4gYSBZZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5tZWV0c0dvYWwgPT09ICdObycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLm1lZXRzR29hbCA9PT0gJ1llcyBidXQgbGFja3Mgc2tpbGxzL2hpZ2ggZW5vdWdoIG1hcmtzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ubWVldHNHb2FsID09PSAnWWVzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS50aW1lT3V0T2ZTY2hvb2wgPT09ICc2IG9yIG1vcmUgeWVhcnMnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS50aW1lT3V0T2ZTY2hvb2wgPT09ICcxLTYgeWVhcnMnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS50aW1lT3V0T2ZTY2hvb2wgPT09ICdMZXNzIHRoYW4gMSB5ZWFyJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pblByb2dyYW1CZWZvcmUgPT09ICdOby9MZWZ0IHdpdGggYXBwcm9wcmlhdGUgcmVhc29ucycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAzOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmluUHJvZ3JhbUJlZm9yZSA9PT0gJ1llcyAtIEFwcHJvcHJpYXRlIHByb2dyZXNzJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5Qcm9ncmFtQmVmb3JlID09PSAnWWVzIOKAkyBObyBwcm9ncmVzcycpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZW1wbG95bWVudCA9PT0gJ05vdCB3b3JraW5nJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZW1wbG95bWVudCA9PT0gJ1dvcmtpbmcgcGFydCB0aW1lJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZW1wbG95bWVudCA9PT0gJ1dvcmtpbmcgZnVsbCB0aW1lJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDE7IH1cclxuXHJcbiAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5pbmNvbWVTb3VyY2UgPT09ICdPVyAgT0RTUCAgRUkgIFNDJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnTm8gaW5jb21lJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaW5jb21lU291cmNlID09PSAnRW1wbG95ZWQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmFnZVJhbmdlID09PSAnNDUtNjUgeWVhcnMgb2xkJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uYWdlUmFuZ2UgPT09ICcxOS0yOSB5ZWFycyBvbGQnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMjsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5hZ2VSYW5nZSA9PT0gJzMwLTQ0IHllYXJzIG9sZCcpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgICAvL1BBUlQgQlxyXG4gICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaG91cnNQZXJXZWVrID09PSAnMTAtMjAnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMzsgfSBlbHNlIGlmXHJcbiAgICAgICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5ob3Vyc1BlcldlZWsgPT09ICc1LTEwJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDI7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0uaG91cnNQZXJXZWVrID09PSAnTGVzcyB0aGFuIDUnKSB7IHRoaXMucGFydEFQb2ludHMgKz0gMTsgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLndvcmtIaXN0b3J5ID09PSAnTGVzcyB0aGFuIDEgeWVhciBleHBlcmllbmNlJykgeyB0aGlzLnBhcnRBUG9pbnRzICs9IDM7IH0gZWxzZSBpZlxyXG4gICAgICAodGhpcy5zdWl0YWJpbGl0eUZvcm0ud29ya0hpc3RvcnkgPT09ICcxLTQgeWVhcnMgZXhwZXJpZW5jZScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAyOyB9IGVsc2UgaWZcclxuICAgICAgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLndvcmtIaXN0b3J5ID09PSAnNCsgeWVhcnMgZXhwZXJpZW5jZScpIHsgdGhpcy5wYXJ0QVBvaW50cyArPSAxOyB9XHJcblxyXG4gICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySGVhbHRoID09PSB0cnVlKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JJbnN0cnVjdGlvbnMgPT09IHRydWUpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckNvbW11bmljYXRpb24gPT09IHRydWUpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3Rvckxhbmd1YWdlID09PSB0cnVlKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JDb21wdXRlciA9PT0gdHJ1ZSkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9ySG91c2luZyA9PT0gdHJ1ZSkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG4gICAgICBpZiAodGhpcy5zdWl0YWJpbGl0eUZvcm0uZmFjdG9yVHJhbnNwb3J0YXRpb24gPT09IHRydWUpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckRheWNhcmUgPT09IHRydWUpIHsgZmFjdG9yUG9pbnRzKys7IH1cclxuICAgICAgaWYgKHRoaXMuc3VpdGFiaWxpdHlGb3JtLmZhY3RvckludGVybmV0ID09PSB0cnVlKSB7IGZhY3RvclBvaW50cysrOyB9XHJcbiAgICAgIGlmICh0aGlzLnN1aXRhYmlsaXR5Rm9ybS5mYWN0b3JQZXJzb25hbCA9PT0gdHJ1ZSkgeyBmYWN0b3JQb2ludHMrKzsgfVxyXG5cclxuICAgICAgaWYgKGZhY3RvclBvaW50cyA+PSAwICYmIGZhY3RvclBvaW50cyA8PSA0KSB7IHRoaXMucGFydEJQb2ludHMgPSAzOyB9IGVsc2UgaWZcclxuICAgICAgKGZhY3RvclBvaW50cyA+PSA1ICYmIGZhY3RvclBvaW50cyA8PSA4KSB7IHRoaXMucGFydEJQb2ludHMgPSAyOyB9IGVsc2UgaWZcclxuICAgICAgKGZhY3RvclBvaW50cyA+PSA5KSB7IHRoaXMucGFydEJQb2ludHMgPSAxOyB9XHJcblxyXG4gICAgICB0aGlzLnRvdGFsUG9pbnRzID0gdGhpcy5wYXJ0QVBvaW50cyArIHRoaXMucGFydEJQb2ludHM7XHJcblxyXG4gICAgICBpZiAodGhpcy50b3RhbFBvaW50cyA8IDE4KSB7IHRoaXMud2FybmluZyA9IHRydWU7IH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgY2hlY2tib3hDaGFuZ2UoY2xpZW50KSB7XHJcbiAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgIC51cGRhdGVCYW5uZXJDYW1Cb29sKGNsaWVudClcclxuICAgICAgICAudGhlbiggcmVzID0+IHtcclxuICAgICAgICAgIHRoaXMubmdPbkluaXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgpO1xyXG5cclxuICAgICAgaWYgKGNsaWVudC5iYW5uZXIgJiYgY2xpZW50LmNhbSkge1xyXG4gICAgICAgIHRoaXMuc3RhZ2UzID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmICF4LmNvbnNlbnQgJiYgIXgubGVhcm5pbmdTdHlsZSAmJiAheC5iYW5uZXIgJiYgIXguY2FtKTtcclxuICAgICAgICB0aGlzLnN0YWdlNCA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiAheC5zdWl0YWJpbGl0eSAmJiAheC5jb25zZW50ICYmICF4LmxlYXJuaW5nU3R5bGUgJiYgeC5iYW5uZXIgJiYgeC5jYW0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3RhZ2UzID0gdGhpcy5kYXRhLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmICF4LmNvbnNlbnQgJiYgIXgubGVhcm5pbmdTdHlsZSk7XHJcbiAgICAgICAgdGhpcy5zdGFnZTQgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4gIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiAheC5sZWFybmluZ1N0eWxlICYmIHguYmFubmVyICYmIHguY2FtKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5kb3VnaG51dENoYXJ0RGF0YSA9IFt0aGlzLnN0YWdlMS5sZW5ndGgsIHRoaXMuc3RhZ2UyLmxlbmd0aCwgdGhpcy5zdGFnZTMubGVuZ3RoLCB0aGlzLnN0YWdlNC5sZW5ndGhdO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0VmlldygpIHtcclxuICAgICAgdGhpcy5zdGF0dXNSZXBvcnQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zaG93R2VuZXJhbCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnNob3dDb25zZW50ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc2hvd0xlYXJuaW5nU3R5bGUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zaG93U3VpdGFiaWxpdHkgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zaG93U3VpdGFiaWxpdHlFZGl0ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuYWRkU3VpdGFiaWxpdHkgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnb0JhY2soKSB7XHJcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
