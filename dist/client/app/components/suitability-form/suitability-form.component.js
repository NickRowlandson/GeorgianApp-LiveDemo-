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
        this.clientService
            .save(this.client, this.suitabilityForm)
            .then(function (client) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdWl0YWJpbGl0eS1mb3JtL3N1aXRhYmlsaXR5LWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWlEO0FBQ2pELDBDQUF5QztBQUN6Qyw4Q0FBNkM7QUFDN0MsZ0VBQStEO0FBQy9ELDBDQUF5RDtBQUN6RCxnRUFBOEQ7QUFDOUQsZ0ZBQW9FO0FBUXBFLElBQWEsd0JBQXdCO0lBcUJuQyxrQ0FBb0IsYUFBNEIsRUFBVSxNQUFjLEVBQVUsS0FBcUIsRUFBVSxXQUF3QjtRQUFySCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBZnpJLGNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyx5QkFBeUI7UUFDNUMsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFFckIsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFDdkIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFHdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxpQ0FBZSxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLElBQUksR0FBSSxJQUFJLElBQUksRUFBRSxD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QyxDQUFDIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3N1aXRhYmlsaXR5LWZvcm0vc3VpdGFiaWxpdHktZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENsaWVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2xpZW50XCI7XHJcbmltcG9ydCB7IFN1aXRhYmlsaXR5Rm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3VpdGFiaWxpdHlGb3JtXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnc3VpdGFiaWxpdHlGb3JtJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9zdWl0YWJpbGl0eS1mb3JtL3N1aXRhYmlsaXR5LWZvcm0uY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvc3VpdGFiaWxpdHktZm9ybS9zdWl0YWJpbGl0eS1mb3JtLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFN1aXRhYmlsaXR5Rm9ybUNvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgY2xpZW50OiBDbGllbnQ7XHJcbiAgQElucHV0KCkgc3VpdGFiaWxpdHlGb3JtOiBTdWl0YWJpbGl0eUZvcm07XHJcbiAgZXJyb3I6IGFueTtcclxuICBkYXRlOiBhbnk7XHJcbiAgY3VycmVudFVzZXI6YW55O1xyXG4gIG5hdmlnYXRlZCA9IGZhbHNlOyAvLyB0cnVlIGlmIG5hdmlnYXRlZCBoZXJlXHJcbiAgc2hvd1NlY3Rpb24xID0gdHJ1ZTtcclxuICBzaG93U2VjdGlvbjIgPSBmYWxzZTtcclxuICBzaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICBzaG93U2VjdGlvbjQgPSBmYWxzZTtcclxuICBzaG93U2VjdGlvbjUgPSBmYWxzZTtcclxuICBzaG93U2VjdGlvbjYgPSBmYWxzZTtcclxuXHJcbiAgc2hvd1NlY3Rpb25CdG4xID0gdHJ1ZTtcclxuICBzaG93U2VjdGlvbkJ0bjIgPSBmYWxzZTtcclxuICBzaG93U2VjdGlvbkJ0bjMgPSBmYWxzZTtcclxuICBzaG93U2VjdGlvbkJ0bjQgPSBmYWxzZTtcclxuICBzaG93U2VjdGlvbkJ0bjUgPSBmYWxzZTtcclxuICBzaG93U2VjdGlvbkJ0bjYgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjbGllbnRTZXJ2aWNlOiBDbGllbnRTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcclxuICAgIHRoaXMuY2xpZW50ID0gbmV3IENsaWVudCgpO1xyXG4gICAgdGhpcy5zdWl0YWJpbGl0eUZvcm0gPSBuZXcgU3VpdGFiaWxpdHlGb3JtKCk7XHJcbiAgICB0aGlzLmRhdGUgPSAgbmV3IERhdGUoKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG5cclxuICB9XHJcblxyXG4gIGNsaWNrZWQoZXZlbnQsIGl0ZW0pIHtcclxuICAgIHN3aXRjaCAoaXRlbSkge1xyXG4gICAgICBjYXNlICdzZWN0aW9uMSc6XHJcbiAgICAgICAgdGhpcy5zaG93U2VjdGlvbjEgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2hvd1NlY3Rpb24yID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNob3dTZWN0aW9uNCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd1NlY3Rpb241ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93U2VjdGlvbjYgPSBmYWxzZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnc2VjdGlvbjInOlxyXG4gICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93U2VjdGlvbjIgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2hvd1NlY3Rpb24zID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93U2VjdGlvbjQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNob3dTZWN0aW9uNSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd1NlY3Rpb242ID0gZmFsc2U7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3NlY3Rpb24zJzpcclxuICAgICAgICB0aGlzLnNob3dTZWN0aW9uMSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd1NlY3Rpb24yID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2hvd1NlY3Rpb240ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93U2VjdGlvbjUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNob3dTZWN0aW9uNiA9IGZhbHNlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzZWN0aW9uNCc6XHJcbiAgICAgICAgdGhpcy5zaG93U2VjdGlvbjEgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd1NlY3Rpb24zID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93U2VjdGlvbjQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2hvd1NlY3Rpb241ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93U2VjdGlvbjYgPSBmYWxzZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnc2VjdGlvbjUnOlxyXG4gICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93U2VjdGlvbjIgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNob3dTZWN0aW9uMyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd1NlY3Rpb240ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93U2VjdGlvbjUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2hvd1NlY3Rpb242ID0gZmFsc2U7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3NlY3Rpb242JzpcclxuICAgICAgICB0aGlzLnNob3dTZWN0aW9uMSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd1NlY3Rpb24yID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93U2VjdGlvbjMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNob3dTZWN0aW9uNCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd1NlY3Rpb241ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93U2VjdGlvbjYgPSB0cnVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRoaXMuc2hvd1NlY3Rpb24xID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNob3dTZWN0aW9uMiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd1NlY3Rpb24zID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93U2VjdGlvbjQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNob3dTZWN0aW9uNSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd1NlY3Rpb242ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZXh0KGV2ZW50LCBuZXh0U2VjdGlvbikge1xyXG4gICAgc3dpdGNoIChuZXh0U2VjdGlvbikge1xyXG4gICAgICBjYXNlICdzZWN0aW9uMic6XHJcbiAgICAgICAgdGhpcy5zaG93U2VjdGlvbkJ0bjIgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2xpY2tlZChldmVudCwgbmV4dFNlY3Rpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzZWN0aW9uMyc6XHJcbiAgICAgICAgdGhpcy5zaG93U2VjdGlvbkJ0bjMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2xpY2tlZChldmVudCwgbmV4dFNlY3Rpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzZWN0aW9uNCc6XHJcbiAgICAgICAgdGhpcy5zaG93U2VjdGlvbkJ0bjQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2xpY2tlZChldmVudCwgbmV4dFNlY3Rpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzZWN0aW9uNSc6XHJcbiAgICAgICAgdGhpcy5zaG93U2VjdGlvbkJ0bjUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2xpY2tlZChldmVudCwgbmV4dFNlY3Rpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzZWN0aW9uNic6XHJcbiAgICAgICAgdGhpcy5zaG93U2VjdGlvbkJ0bjYgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2xpY2tlZChldmVudCwgbmV4dFNlY3Rpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2F2ZSgpIHtcclxuICAgICAgdGhpcy5jbGllbnRbXCJpbnF1aXJ5RGF0ZVwiXSA9IHRoaXMuZGF0ZTtcclxuICAgICAgdGhpcy5jbGllbnRbXCJ1c2VybmFtZVwiXSA9IHRoaXMuY2xpZW50LmZpcnN0TmFtZSArIHRoaXMuY2xpZW50Lmxhc3ROYW1lO1xyXG4gICAgICB0aGlzLmNsaWVudFtcInBhc3N3b3JkXCJdID0gdGhpcy5jbGllbnQuYmlydGhkYXkucmVwbGFjZSgvLS9nLCBcIlwiKTtcclxuICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgICAuc2F2ZSh0aGlzLmNsaWVudCwgdGhpcy5zdWl0YWJpbGl0eUZvcm0pXHJcbiAgICAgICAgICAudGhlbihjbGllbnQgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuY2xpZW50ID0gY2xpZW50OyAvLyBzYXZlZCBjbGllbnQsIHcvIGlkIGlmIG5ld1xyXG4gICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2NsaWVudHMnXSk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7IC8vIFRPRE86IERpc3BsYXkgZXJyb3IgbWVzc2FnZVxyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59O1xyXG4iXX0=
