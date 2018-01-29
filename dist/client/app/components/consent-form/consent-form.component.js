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
var consentForm_1 = require("../../models/consentForm");
var client_service_1 = require("../../services/client.service");
var authentication_service_1 = require("../../services/authentication.service");
var ConsentFormComponent = /** @class */ (function () {
    function ConsentFormComponent(clientService, router, authService) {
        var _this = this;
        this.clientService = clientService;
        this.router = router;
        this.authService = authService;
        this.otherChecked = false;
        this.loading = true;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userID = this.currentUser.userID;
        this.date = new Date();
        this.clientService
            .getClient(userID)
            .then(function (result) {
            _this.clientName = result.client[0].firstName + " " + result.client[0].lastName;
            _this.consentForm = new consentForm_1.ConsentForm();
            _this.completeConsentForm = result.client[0].consent;
            if (!result.client[0].consent) {
                _this.clientService
                    .getConsentById()
                    .then(function (result) {
                    _this.consentForm = result[0];
                    _this.loading = false;
                    swal('Read Only', "You have already submitted this form. Select 'Request to Edit' if you would like to make changes.", 'warning');
                    console.log(_this.completeConsentForm);
                })
                    .catch(function (err) { return _this.error = err; });
                if (_this.consentForm.other == null || _this.consentForm.other === '') {
                    _this.otherChecked = false;
                }
                else {
                    _this.otherChecked = true;
                }
            }
            else {
                _this.consentForm.ontarioWorks = false;
                _this.consentForm.ontarioDisabilityProgram = false;
                _this.consentForm.employmentInsurance = false;
                _this.consentForm.employmentServices = false;
                _this.consentForm.wsib = false;
                _this.loading = false;
            }
        })
            .catch(function (err) { return _this.error = err; });
        if (this.currentUser.userType !== "Client") {
            swal('Read Only', "You are logged in as '" + this.currentUser.userType + "'. Only clients can submit this form.", 'warning');
        }
    }
    ConsentFormComponent.prototype.saveConsent = function () {
        var _this = this;
        // if (!this.consentForm.allowDetailedMessage) {
        //   if (!this.consentForm.alternateNumber) {
        //     swal(
        //         'Whoops!',
        //         'Please enter an alternate phone number.',
        //         'warning'
        //     );
        //   } else {
        //     if (!this.consentForm.contactName || !this.consentForm.contactNum ) {
        //       swal(
        //           'Whoops!',
        //           'Please fill out all form fields.',
        //           'warning'
        //       );
        //     } else {
        //       this.consentForm.date = this.date;
        //       this.clientService
        //           .saveConsent(this.consentForm)
        //           .then(client => {
        //               this.router.navigate(['/dashboard']);
        //           })
        //           .catch(error => this.error = error);
        //     }
        //   }
        // } else {
        //   if (!this.consentForm.contactName || !this.consentForm.contactNum ) {
        //     swal(
        //         'Whoops!',
        //         'Please fill out all form fields.',
        //         'warning'
        //     );
        //   } else {
        //     this.consentForm.date = this.date;
        //     this.clientService
        //         .saveConsent(this.consentForm)
        //         .then(client => {
        //             this.router.navigate(['/dashboard']);
        //         })
        //         .catch(error => this.error = error);
        //   }
        // }
        this.consentForm.date = this.date;
        this.clientService
            .saveConsent(this.consentForm)
            .then(function (client) {
            _this.router.navigate(['/dashboard']);
        })
            .catch(function (error) { return _this.error = error; });
    };
    ConsentFormComponent.prototype.requestEdit = function () {
    };
    ConsentFormComponent.prototype.goBack = function () {
        window.history.back();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", consentForm_1.ConsentForm)
    ], ConsentFormComponent.prototype, "consentForm", void 0);
    ConsentFormComponent = __decorate([
        core_1.Component({
            selector: 'consentForm',
            templateUrl: './app/components/consent-form/consent-form.component.html',
            styleUrls: ['./app/components/consent-form/consent-form.component.css']
        }),
        __metadata("design:paramtypes", [client_service_1.ClientService, router_1.Router, authentication_service_1.AuthService])
    ], ConsentFormComponent);
    return ConsentFormComponent;
}());
exports.ConsentFormComponent = ConsentFormComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCwwQ0FBeUM7QUFDekMsd0RBQXVEO0FBQ3ZELGdFQUE4RDtBQUM5RCxnRkFBb0U7QUFVcEU7SUFVRSw4QkFBb0IsYUFBNEIsRUFBVSxNQUFjLEVBQVUsV0FBd0I7UUFBMUcsaUJBZ0RDO1FBaERtQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUgxRyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixZQUFPLEdBQVksSUFBSSxDQUFDO1FBR3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbkUsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRXZCLElBQUksQ0FBQyxhQUFhO2FBQ2pCLFNBQVMsQ0FBQyxNQUFNLENBQUM7YUFDakIsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNWLEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQy9FLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSx5QkFBVyxFQUFFLENBQUM7WUFDckMsS0FBSSxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3BELEVBQUUsQ0FB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SUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLGFBQWE7YUFDYixXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzthQUM3QixJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFsQixDQUFrQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELDBDQUFXLEdBQVg7SUFFQSxDQUFDO0lBRUQscUNBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQXBIUTtRQUFSLFlBQUssRUFBRTtrQ0FBYyx5QkFBVzs2REFBQztJQUR2QixvQkFBb0I7UUFQaEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSwyREFBMkQ7WUFDeEUsU0FBUyxFQUFFLENBQUMsMERBQTBELENBQUM7U0FDMUUsQ0FBQzt5Q0FhbUMsOEJBQWEsRUFBa0IsZUFBTSxFQUF1QixvQ0FBVztPQVYvRixvQkFBb0IsQ0F1SGhDO0lBQUQsMkJBQUM7Q0F2SEQsQUF1SEMsSUFBQTtBQXZIWSxvREFBb0IiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvY29uc2VudC1mb3JtL2NvbnNlbnQtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ29uc2VudEZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbnNlbnRGb3JtXCI7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY2xpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2NvbnNlbnRGb3JtJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL2NvbnNlbnQtZm9ybS9jb25zZW50LWZvcm0uY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENvbnNlbnRGb3JtQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBjb25zZW50Rm9ybTogQ29uc2VudEZvcm07XHJcbiAgZXJyb3I6IGFueTtcclxuICBkYXRlOiBhbnk7XHJcbiAgY2xpZW50TmFtZTogc3RyaW5nO1xyXG4gIGNvbXBsZXRlQ29uc2VudEZvcm06IGJvb2xlYW47XHJcbiAgY3VycmVudFVzZXI6IGFueTtcclxuICBvdGhlckNoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBsb2FkaW5nOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjbGllbnRTZXJ2aWNlOiBDbGllbnRTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcbiAgICAgIHZhciB1c2VySUQgPSB0aGlzLmN1cnJlbnRVc2VyLnVzZXJJRDtcclxuICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAuZ2V0Q2xpZW50KHVzZXJJRClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICB0aGlzLmNsaWVudE5hbWUgPSByZXN1bHQuY2xpZW50WzBdLmZpcnN0TmFtZSArIFwiIFwiICsgcmVzdWx0LmNsaWVudFswXS5sYXN0TmFtZTtcclxuICAgICAgICB0aGlzLmNvbnNlbnRGb3JtID0gbmV3IENvbnNlbnRGb3JtKCk7XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZUNvbnNlbnRGb3JtID0gcmVzdWx0LmNsaWVudFswXS5jb25zZW50O1xyXG4gICAgICAgIGlmICghcmVzdWx0LmNsaWVudFswXS5jb25zZW50KSB7XHJcbiAgICAgICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgIC5nZXRDb25zZW50QnlJZCgpXHJcbiAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtID0gcmVzdWx0WzBdO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICdSZWFkIE9ubHknLFxyXG4gICAgICAgICAgICAgICAgXCJZb3UgaGF2ZSBhbHJlYWR5IHN1Ym1pdHRlZCB0aGlzIGZvcm0uIFNlbGVjdCAnUmVxdWVzdCB0byBFZGl0JyBpZiB5b3Ugd291bGQgbGlrZSB0byBtYWtlIGNoYW5nZXMuXCIsXHJcbiAgICAgICAgICAgICAgICAnd2FybmluZydcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jb21wbGV0ZUNvbnNlbnRGb3JtKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyID0+IHRoaXMuZXJyb3IgPSBlcnIpO1xyXG4gICAgICAgICAgaWYgKHRoaXMuY29uc2VudEZvcm0ub3RoZXIgPT0gbnVsbCB8fCB0aGlzLmNvbnNlbnRGb3JtLm90aGVyID09PSAnJykge1xyXG4gICAgICAgICAgICB0aGlzLm90aGVyQ2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vdGhlckNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtLm9udGFyaW9Xb3JrcyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5jb25zZW50Rm9ybS5vbnRhcmlvRGlzYWJpbGl0eVByb2dyYW0gPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuY29uc2VudEZvcm0uZW1wbG95bWVudEluc3VyYW5jZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5jb25zZW50Rm9ybS5lbXBsb3ltZW50U2VydmljZXMgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuY29uc2VudEZvcm0ud3NpYiA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyID0+IHRoaXMuZXJyb3IgPSBlcnIpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuY3VycmVudFVzZXIudXNlclR5cGUgIT09IFwiQ2xpZW50XCIpIHtcclxuICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnUmVhZCBPbmx5JyxcclxuICAgICAgICAgICAgXCJZb3UgYXJlIGxvZ2dlZCBpbiBhcyAnXCIgKyB0aGlzLmN1cnJlbnRVc2VyLnVzZXJUeXBlICsgXCInLiBPbmx5IGNsaWVudHMgY2FuIHN1Ym1pdCB0aGlzIGZvcm0uXCIsXHJcbiAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIHNhdmVDb25zZW50KCkge1xyXG4gICAgLy8gaWYgKCF0aGlzLmNvbnNlbnRGb3JtLmFsbG93RGV0YWlsZWRNZXNzYWdlKSB7XHJcbiAgICAvLyAgIGlmICghdGhpcy5jb25zZW50Rm9ybS5hbHRlcm5hdGVOdW1iZXIpIHtcclxuICAgIC8vICAgICBzd2FsKFxyXG4gICAgLy8gICAgICAgICAnV2hvb3BzIScsXHJcbiAgICAvLyAgICAgICAgICdQbGVhc2UgZW50ZXIgYW4gYWx0ZXJuYXRlIHBob25lIG51bWJlci4nLFxyXG4gICAgLy8gICAgICAgICAnd2FybmluZydcclxuICAgIC8vICAgICApO1xyXG4gICAgLy8gICB9IGVsc2Uge1xyXG4gICAgLy8gICAgIGlmICghdGhpcy5jb25zZW50Rm9ybS5jb250YWN0TmFtZSB8fCAhdGhpcy5jb25zZW50Rm9ybS5jb250YWN0TnVtICkge1xyXG4gICAgLy8gICAgICAgc3dhbChcclxuICAgIC8vICAgICAgICAgICAnV2hvb3BzIScsXHJcbiAgICAvLyAgICAgICAgICAgJ1BsZWFzZSBmaWxsIG91dCBhbGwgZm9ybSBmaWVsZHMuJyxcclxuICAgIC8vICAgICAgICAgICAnd2FybmluZydcclxuICAgIC8vICAgICAgICk7XHJcbiAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgIHRoaXMuY29uc2VudEZvcm0uZGF0ZSA9IHRoaXMuZGF0ZTtcclxuICAgIC8vICAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgLy8gICAgICAgICAgIC5zYXZlQ29uc2VudCh0aGlzLmNvbnNlbnRGb3JtKVxyXG4gICAgLy8gICAgICAgICAgIC50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKTtcclxuICAgIC8vICAgICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSBlbHNlIHtcclxuICAgIC8vICAgaWYgKCF0aGlzLmNvbnNlbnRGb3JtLmNvbnRhY3ROYW1lIHx8ICF0aGlzLmNvbnNlbnRGb3JtLmNvbnRhY3ROdW0gKSB7XHJcbiAgICAvLyAgICAgc3dhbChcclxuICAgIC8vICAgICAgICAgJ1dob29wcyEnLFxyXG4gICAgLy8gICAgICAgICAnUGxlYXNlIGZpbGwgb3V0IGFsbCBmb3JtIGZpZWxkcy4nLFxyXG4gICAgLy8gICAgICAgICAnd2FybmluZydcclxuICAgIC8vICAgICApO1xyXG4gICAgLy8gICB9IGVsc2Uge1xyXG4gICAgLy8gICAgIHRoaXMuY29uc2VudEZvcm0uZGF0ZSA9IHRoaXMuZGF0ZTtcclxuICAgIC8vICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgIC8vICAgICAgICAgLnNhdmVDb25zZW50KHRoaXMuY29uc2VudEZvcm0pXHJcbiAgICAvLyAgICAgICAgIC50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XHJcbiAgICAvLyAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9XHJcbiAgICB0aGlzLmNvbnNlbnRGb3JtLmRhdGUgPSB0aGlzLmRhdGU7XHJcbiAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAuc2F2ZUNvbnNlbnQodGhpcy5jb25zZW50Rm9ybSlcclxuICAgICAgICAudGhlbihjbGllbnQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIHJlcXVlc3RFZGl0KCkge1xyXG5cclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19
