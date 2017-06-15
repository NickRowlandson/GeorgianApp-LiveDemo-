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
var ConsentFormComponent = (function () {
    function ConsentFormComponent(clientService, router, authService) {
        this.clientService = clientService;
        this.router = router;
        this.authService = authService;
        this.consentForm = new consentForm_1.ConsentForm();
        this.date = new Date();
    }
    ConsentFormComponent.prototype.saveConsent = function () {
        var _this = this;
        this.clientService
            .saveConsent(this.consentForm)
            .then(function (client) {
            _this.router.navigate(['/dashboard']);
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    ConsentFormComponent.prototype.goBack = function () {
        window.history.back();
    };
    return ConsentFormComponent;
}());
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
exports.ConsentFormComponent = ConsentFormComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCwwQ0FBeUM7QUFDekMsd0RBQXVEO0FBQ3ZELGdFQUE4RDtBQUM5RCxnRkFBb0U7QUFTcEUsSUFBYSxvQkFBb0I7SUFLL0IsOEJBQW9CLGFBQTRCLEVBQVUsTUFBYyxFQUFVLFdBQXdCO1FBQXRGLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3RHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSx5QkFBVyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCwwQ0FBVyxHQUFYO1FBQUEsaUJBT0M7UUFOQyxJQUFJLENBQUMsYUFBYTthQUNiLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQzdCLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDUixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQyxDQUFDLDhCQUE4QjtJQUN6RSxDQUFDO0lBRUQscUNBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0F0QkEsQUFzQkMsSUFBQTtBQXJCVTtJQUFSLFlBQUssRUFBRTs4QkFBYyx5QkFBVzt5REFBQztBQUR2QixvQkFBb0I7SUFQaEMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFdBQVcsRUFBRSwyREFBMkQ7UUFDeEUsU0FBUyxFQUFFLENBQUMsMERBQTBELENBQUM7S0FDMUUsQ0FBQztxQ0FRbUMsOEJBQWEsRUFBa0IsZUFBTSxFQUF1QixvQ0FBVztHQUwvRixvQkFBb0IsQ0FzQmhDO0FBdEJZLG9EQUFvQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb25zZW50Rm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29uc2VudEZvcm1cIjtcclxuaW1wb3J0IHsgQ2xpZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jbGllbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2NvbnNlbnRGb3JtJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL2NvbnNlbnQtZm9ybS9jb25zZW50LWZvcm0uY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENvbnNlbnRGb3JtQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBjb25zZW50Rm9ybTogQ29uc2VudEZvcm07XHJcbiAgZXJyb3I6IGFueTtcclxuICBkYXRlOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcclxuICAgICAgdGhpcy5jb25zZW50Rm9ybSA9IG5ldyBDb25zZW50Rm9ybSgpO1xyXG4gICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZUNvbnNlbnQoKSB7XHJcbiAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAuc2F2ZUNvbnNlbnQodGhpcy5jb25zZW50Rm9ybSlcclxuICAgICAgICAudGhlbihjbGllbnQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTsgLy8gVE9ETzogRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
