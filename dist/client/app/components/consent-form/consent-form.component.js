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
        var _this = this;
        this.clientService = clientService;
        this.router = router;
        this.authService = authService;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userID = currentUser.userID;
        this.clientService
            .getClient(userID)
            .then(function (result) {
            _this.phoneNumber = result.client[0].phone;
            _this.clientName = result.client[0].firstName + " " + result.client[0].lastName;
        })
            .catch(function (err) { return _this.error = err; });
        this.consentForm = new consentForm_1.ConsentForm();
        this.date = new Date();
    }
    ConsentFormComponent.prototype.saveConsent = function () {
        var _this = this;
        this.consentForm.date = this.date;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCwwQ0FBeUM7QUFDekMsd0RBQXVEO0FBQ3ZELGdFQUE4RDtBQUM5RCxnRkFBb0U7QUFTcEU7SUFPRSw4QkFBb0IsYUFBNEIsRUFBVSxNQUFjLEVBQVUsV0FBd0I7UUFBMUcsaUJBY0M7UUFkbUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDdEcsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUVoQyxJQUFJLENBQUMsYUFBYTthQUNqQixTQUFTLENBQUMsTUFBTSxDQUFDO2FBQ2pCLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDVixLQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQzFDLEtBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ2pGLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFoQixDQUFnQixDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHlCQUFXLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELDBDQUFXLEdBQVg7UUFBQSxpQkFRQztRQVBDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLGFBQWE7YUFDYixXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzthQUM3QixJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFsQixDQUFrQixDQUFDLENBQUMsQ0FBQyw4QkFBOEI7SUFDekUsQ0FBQztJQUVELHFDQUFNLEdBQU47UUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFsQ1E7UUFBUixZQUFLLEVBQUU7a0NBQWMseUJBQVc7NkRBQUM7SUFEdkIsb0JBQW9CO1FBUGhDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsMkRBQTJEO1lBQ3hFLFNBQVMsRUFBRSxDQUFDLDBEQUEwRCxDQUFDO1NBQzFFLENBQUM7eUNBVW1DLDhCQUFhLEVBQWtCLGVBQU0sRUFBdUIsb0NBQVc7T0FQL0Ysb0JBQW9CLENBb0NoQztJQUFELDJCQUFDO0NBcENELEFBb0NDLElBQUE7QUFwQ1ksb0RBQW9CIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2NvbnNlbnQtZm9ybS9jb25zZW50LWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvbnNlbnRGb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9jb25zZW50Rm9ybVwiO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnY29uc2VudEZvcm0nLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2NvbnNlbnQtZm9ybS9jb25zZW50LWZvcm0uY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvY29uc2VudC1mb3JtL2NvbnNlbnQtZm9ybS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQ29uc2VudEZvcm1Db21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGNvbnNlbnRGb3JtOiBDb25zZW50Rm9ybTtcclxuICBlcnJvcjogYW55O1xyXG4gIGRhdGU6IGFueTtcclxuICBwaG9uZU51bWJlcjogYW55O1xyXG4gIGNsaWVudE5hbWU6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjbGllbnRTZXJ2aWNlOiBDbGllbnRTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xyXG4gICAgICB2YXIgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgICAgdmFyIHVzZXJJRCA9IGN1cnJlbnRVc2VyLnVzZXJJRDtcclxuXHJcbiAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAuZ2V0Q2xpZW50KHVzZXJJRClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICB0aGlzLnBob25lTnVtYmVyID0gcmVzdWx0LmNsaWVudFswXS5waG9uZTtcclxuICAgICAgICB0aGlzLmNsaWVudE5hbWUgPSByZXN1bHQuY2xpZW50WzBdLmZpcnN0TmFtZSArIFwiIFwiICsgcmVzdWx0LmNsaWVudFswXS5sYXN0TmFtZTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB0aGlzLmVycm9yID0gZXJyKTtcclxuXHJcbiAgICAgIHRoaXMuY29uc2VudEZvcm0gPSBuZXcgQ29uc2VudEZvcm0oKTtcclxuICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcclxuICB9XHJcblxyXG4gIHNhdmVDb25zZW50KCkge1xyXG4gICAgdGhpcy5jb25zZW50Rm9ybS5kYXRlID0gdGhpcy5kYXRlO1xyXG4gICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgLnNhdmVDb25zZW50KHRoaXMuY29uc2VudEZvcm0pXHJcbiAgICAgICAgLnRoZW4oY2xpZW50ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7IC8vIFRPRE86IERpc3BsYXkgZXJyb3IgbWVzc2FnZVxyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
