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
        this.clientName = '';
        this.editConsentRequest = false;
        this.editConsentPermission = false;
        this.otherChecked = false;
        this.loading = true;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userID = this.currentUser.userID;
        this.date = new Date();
        this.consentForm = new consentForm_1.ConsentForm();
        if (this.currentUser.userType !== "Client") {
            this.completeConsentForm = true;
            this.loading = false;
            swal('Read Only', "You are logged in as '" + this.currentUser.userType + "'. Only clients can submit this form.", 'info');
        }
        else {
            this.clientService
                .getClient(userID)
                .then(function (result) {
                _this.clientName = result.client[0].firstName + " " + result.client[0].lastName;
                _this.editConsentRequest = result.client[0].editConsentRequest;
                _this.editConsentPermission = result.client[0].editConsentPermission;
                _this.completeConsentForm = result.client[0].consent;
                if (!result.client[0].consent) {
                    _this.clientService
                        .getConsentById()
                        .then(function (result) {
                        _this.consentForm = result[0];
                        _this.loading = false;
                        if (_this.editConsentRequest && !_this.editConsentPermission) {
                            swal('Edit Request Submitted', "Check back once you have recieved an email.", 'info');
                        }
                        else if (_this.editConsentPermission) {
                            swal('Edit Request Granted!', "You can now edit this form.", 'info');
                        }
                        else {
                            swal('Read Only', "You have already submitted this form. Select 'Request to Edit' if you would like to make changes.", 'info');
                        }
                    })
                        .catch(function (err) {
                        console.log(err);
                    });
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
                .catch(function (err) {
                console.log(err);
            });
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
        var _this = this;
        this.clientService
            .requestEditConsent()
            .then(function (result) {
            if (result.status === 'success') {
                swal('Request Sent!', 'You will recieve an email once your request has been accepted.', 'info');
                _this.router.navigate(['/dashboard']);
            }
            else {
                swal('Something went wrong...', 'Please try again. If the issue persists contact support.', 'error');
            }
        })
            .catch(function (error) { return _this.error = error; });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCwwQ0FBeUM7QUFDekMsd0RBQXVEO0FBQ3ZELGdFQUE4RDtBQUM5RCxnRkFBb0U7QUFVcEU7SUFZRSw4QkFBb0IsYUFBNEIsRUFBVSxNQUFjLEVBQVUsV0FBd0I7UUFBMUcsaUJBcUVDO1FBckVtQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVIxRyxlQUFVLEdBQVcsRUFBRSxDQUFDO1FBQ3hCLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUNwQywwQkFBcUIsR0FBWSxLQUFLLENBQUM7UUFHdkMsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsWUFBTyxHQUFZLElBQUksQ0FBQztRQUd0QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUkseUJBQVcsRUFBRSxDQUFDO1FBRXJDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQ0YsV0FBVyxFQUNYLHdCQUF3QixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLHVDQUF1QyxFQUM5RixNQUFNLENBQ1AsQ0FBQztRQUNKLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxhQUFhO2lCQUNmLFNBQVMsQ0FBQyxNQUFNLENBQUM7aUJBQ2pCLElBQUksQ0FBQyxVQUFBLE1BQU07Z0JBQ1YsS0FBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7Z0JBQy9FLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO2dCQUM5RCxLQUFJLENBQUMscUJBQXFCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDcEUsS0FBSSxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUNwRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsS0FBSSxDQUFDLGFBQWE7eUJBQ2YsY0FBYyxFQUFFO3lCQUNoQixJQUFJLENBQUMsVUFBQSxNQUFNO3dCQUNWLEtBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3QixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzt3QkFDckIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLGtCQUFrQixJQUFJLENBQUMsS0FBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQzs0QkFDM0QsSUFBSSxDQUNGLHdCQUF3QixFQUN4Qiw2Q0FBNkMsRUFDN0MsTUFBTSxDQUNQLENBQUM7d0JBQ0osQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQzs0QkFDdEMsSUFBSSxDQUNGLHVCQUF1QixFQUN2Qiw2QkFBNkIsRUFDN0IsTUFBTSxDQUNQLENBQUM7d0JBQ0osQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixJQUFJLENBQ0YsV0FBVyxFQUNYLG1HQUFtRyxFQUNuRyxNQUFNLENBQ1AsQ0FBQzt3QkFDSixDQUFDO29CQUNILENBQUMsQ0FBQzt5QkFDRCxLQUFLLENBQUMsVUFBQSxHQUFHO3dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ25CLENBQUMsQ0FBQyxDQUFDO29CQUNMLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNwRSxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztvQkFDNUIsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixLQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztvQkFDM0IsQ0FBQztnQkFDSCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLEtBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztvQkFDdEMsS0FBSSxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7b0JBQ2xELEtBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO29CQUM3QyxLQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztvQkFDNUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO29CQUM5QixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDdkIsQ0FBQztZQUNILENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsVUFBQSxHQUFHO2dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0gsQ0FBQztJQUVELDBDQUFXLEdBQVg7UUFBQSxpQkFpREM7UUFoREMsZ0RBQWdEO1FBQ2hELDZDQUE2QztRQUM3QyxZQUFZO1FBQ1oscUJBQXFCO1FBQ3JCLHFEQUFxRDtRQUNyRCxvQkFBb0I7UUFDcEIsU0FBUztRQUNULGFBQWE7UUFDYiw0RUFBNEU7UUFDNUUsY0FBYztRQUNkLHVCQUF1QjtRQUN2QixnREFBZ0Q7UUFDaEQsc0JBQXNCO1FBQ3RCLFdBQVc7UUFDWCxlQUFlO1FBQ2YsMkNBQTJDO1FBQzNDLDJCQUEyQjtRQUMzQiwyQ0FBMkM7UUFDM0MsOEJBQThCO1FBQzlCLHNEQUFzRDtRQUN0RCxlQUFlO1FBQ2YsaURBQWlEO1FBQ2pELFFBQVE7UUFDUixNQUFNO1FBQ04sV0FBVztRQUNYLDBFQUEwRTtRQUMxRSxZQUFZO1FBQ1oscUJBQXFCO1FBQ3JCLDhDQUE4QztRQUM5QyxvQkFBb0I7UUFDcEIsU0FBUztRQUNULGFBQWE7UUFDYix5Q0FBeUM7UUFDekMseUJBQXlCO1FBQ3pCLHlDQUF5QztRQUN6Qyw0QkFBNEI7UUFDNUIsb0RBQW9EO1FBQ3BELGFBQWE7UUFDYiwrQ0FBK0M7UUFDL0MsTUFBTTtRQUNOLElBQUk7UUFDSixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhO2FBQ2YsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDN0IsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNWLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCwwQ0FBVyxHQUFYO1FBQUEsaUJBb0JDO1FBbkJDLElBQUksQ0FBQyxhQUFhO2FBQ2Ysa0JBQWtCLEVBQUU7YUFDcEIsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNWLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUNGLGVBQWUsRUFDZixnRUFBZ0UsRUFDaEUsTUFBTSxDQUNQLENBQUM7Z0JBQ0YsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQ0YseUJBQXlCLEVBQ3pCLDBEQUEwRCxFQUMxRCxPQUFPLENBQ1IsQ0FBQztZQUNKLENBQUM7UUFDSCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxxQ0FBTSxHQUFOO1FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBN0pRO1FBQVIsWUFBSyxFQUFFO2tDQUFjLHlCQUFXOzZEQUFDO0lBRHZCLG9CQUFvQjtRQVBoQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLDJEQUEyRDtZQUN4RSxTQUFTLEVBQUUsQ0FBQywwREFBMEQsQ0FBQztTQUN4RSxDQUFDO3lDQWVtQyw4QkFBYSxFQUFrQixlQUFNLEVBQXVCLG9DQUFXO09BWi9GLG9CQUFvQixDQWdLaEM7SUFBRCwyQkFBQztDQWhLRCxBQWdLQyxJQUFBO0FBaEtZLG9EQUFvQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb25zZW50Rm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29uc2VudEZvcm1cIjtcclxuaW1wb3J0IHsgQ2xpZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jbGllbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2NvbnNlbnRGb3JtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvY29uc2VudC1mb3JtL2NvbnNlbnQtZm9ybS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvY29uc2VudC1mb3JtL2NvbnNlbnQtZm9ybS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQ29uc2VudEZvcm1Db21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGNvbnNlbnRGb3JtOiBDb25zZW50Rm9ybTtcclxuICBlcnJvcjogYW55O1xyXG4gIGRhdGU6IGFueTtcclxuICBjbGllbnROYW1lOiBzdHJpbmcgPSAnJztcclxuICBlZGl0Q29uc2VudFJlcXVlc3Q6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBlZGl0Q29uc2VudFBlcm1pc3Npb246IGJvb2xlYW4gPSBmYWxzZTtcclxuICBjb21wbGV0ZUNvbnNlbnRGb3JtOiBib29sZWFuO1xyXG4gIGN1cnJlbnRVc2VyOiBhbnk7XHJcbiAgb3RoZXJDaGVja2VkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgbG9hZGluZzogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcclxuICAgIHRoaXMuY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgIHZhciB1c2VySUQgPSB0aGlzLmN1cnJlbnRVc2VyLnVzZXJJRDtcclxuICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICB0aGlzLmNvbnNlbnRGb3JtID0gbmV3IENvbnNlbnRGb3JtKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuY3VycmVudFVzZXIudXNlclR5cGUgIT09IFwiQ2xpZW50XCIpIHtcclxuICAgICAgdGhpcy5jb21wbGV0ZUNvbnNlbnRGb3JtID0gdHJ1ZTtcclxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgJ1JlYWQgT25seScsXHJcbiAgICAgICAgXCJZb3UgYXJlIGxvZ2dlZCBpbiBhcyAnXCIgKyB0aGlzLmN1cnJlbnRVc2VyLnVzZXJUeXBlICsgXCInLiBPbmx5IGNsaWVudHMgY2FuIHN1Ym1pdCB0aGlzIGZvcm0uXCIsXHJcbiAgICAgICAgJ2luZm8nXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAuZ2V0Q2xpZW50KHVzZXJJRClcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jbGllbnROYW1lID0gcmVzdWx0LmNsaWVudFswXS5maXJzdE5hbWUgKyBcIiBcIiArIHJlc3VsdC5jbGllbnRbMF0ubGFzdE5hbWU7XHJcbiAgICAgICAgICB0aGlzLmVkaXRDb25zZW50UmVxdWVzdCA9IHJlc3VsdC5jbGllbnRbMF0uZWRpdENvbnNlbnRSZXF1ZXN0O1xyXG4gICAgICAgICAgdGhpcy5lZGl0Q29uc2VudFBlcm1pc3Npb24gPSByZXN1bHQuY2xpZW50WzBdLmVkaXRDb25zZW50UGVybWlzc2lvbjtcclxuICAgICAgICAgIHRoaXMuY29tcGxldGVDb25zZW50Rm9ybSA9IHJlc3VsdC5jbGllbnRbMF0uY29uc2VudDtcclxuICAgICAgICAgIGlmICghcmVzdWx0LmNsaWVudFswXS5jb25zZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgICAgICAgIC5nZXRDb25zZW50QnlJZCgpXHJcbiAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uc2VudEZvcm0gPSByZXN1bHRbMF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVkaXRDb25zZW50UmVxdWVzdCAmJiAhdGhpcy5lZGl0Q29uc2VudFBlcm1pc3Npb24pIHtcclxuICAgICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAnRWRpdCBSZXF1ZXN0IFN1Ym1pdHRlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJDaGVjayBiYWNrIG9uY2UgeW91IGhhdmUgcmVjaWV2ZWQgYW4gZW1haWwuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2luZm8nXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZWRpdENvbnNlbnRQZXJtaXNzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICAgJ0VkaXQgUmVxdWVzdCBHcmFudGVkIScsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJZb3UgY2FuIG5vdyBlZGl0IHRoaXMgZm9ybS5cIixcclxuICAgICAgICAgICAgICAgICAgICAnaW5mbydcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICAgJ1JlYWQgT25seScsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJZb3UgaGF2ZSBhbHJlYWR5IHN1Ym1pdHRlZCB0aGlzIGZvcm0uIFNlbGVjdCAnUmVxdWVzdCB0byBFZGl0JyBpZiB5b3Ugd291bGQgbGlrZSB0byBtYWtlIGNoYW5nZXMuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2luZm8nXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnNlbnRGb3JtLm90aGVyID09IG51bGwgfHwgdGhpcy5jb25zZW50Rm9ybS5vdGhlciA9PT0gJycpIHtcclxuICAgICAgICAgICAgICB0aGlzLm90aGVyQ2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMub3RoZXJDaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybS5vbnRhcmlvV29ya3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybS5vbnRhcmlvRGlzYWJpbGl0eVByb2dyYW0gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybS5lbXBsb3ltZW50SW5zdXJhbmNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc2VudEZvcm0uZW1wbG95bWVudFNlcnZpY2VzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc2VudEZvcm0ud3NpYiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNhdmVDb25zZW50KCkge1xyXG4gICAgLy8gaWYgKCF0aGlzLmNvbnNlbnRGb3JtLmFsbG93RGV0YWlsZWRNZXNzYWdlKSB7XHJcbiAgICAvLyAgIGlmICghdGhpcy5jb25zZW50Rm9ybS5hbHRlcm5hdGVOdW1iZXIpIHtcclxuICAgIC8vICAgICBzd2FsKFxyXG4gICAgLy8gICAgICAgICAnV2hvb3BzIScsXHJcbiAgICAvLyAgICAgICAgICdQbGVhc2UgZW50ZXIgYW4gYWx0ZXJuYXRlIHBob25lIG51bWJlci4nLFxyXG4gICAgLy8gICAgICAgICAnd2FybmluZydcclxuICAgIC8vICAgICApO1xyXG4gICAgLy8gICB9IGVsc2Uge1xyXG4gICAgLy8gICAgIGlmICghdGhpcy5jb25zZW50Rm9ybS5jb250YWN0TmFtZSB8fCAhdGhpcy5jb25zZW50Rm9ybS5jb250YWN0TnVtICkge1xyXG4gICAgLy8gICAgICAgc3dhbChcclxuICAgIC8vICAgICAgICAgICAnV2hvb3BzIScsXHJcbiAgICAvLyAgICAgICAgICAgJ1BsZWFzZSBmaWxsIG91dCBhbGwgZm9ybSBmaWVsZHMuJyxcclxuICAgIC8vICAgICAgICAgICAnd2FybmluZydcclxuICAgIC8vICAgICAgICk7XHJcbiAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgIHRoaXMuY29uc2VudEZvcm0uZGF0ZSA9IHRoaXMuZGF0ZTtcclxuICAgIC8vICAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgLy8gICAgICAgICAgIC5zYXZlQ29uc2VudCh0aGlzLmNvbnNlbnRGb3JtKVxyXG4gICAgLy8gICAgICAgICAgIC50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKTtcclxuICAgIC8vICAgICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSBlbHNlIHtcclxuICAgIC8vICAgaWYgKCF0aGlzLmNvbnNlbnRGb3JtLmNvbnRhY3ROYW1lIHx8ICF0aGlzLmNvbnNlbnRGb3JtLmNvbnRhY3ROdW0gKSB7XHJcbiAgICAvLyAgICAgc3dhbChcclxuICAgIC8vICAgICAgICAgJ1dob29wcyEnLFxyXG4gICAgLy8gICAgICAgICAnUGxlYXNlIGZpbGwgb3V0IGFsbCBmb3JtIGZpZWxkcy4nLFxyXG4gICAgLy8gICAgICAgICAnd2FybmluZydcclxuICAgIC8vICAgICApO1xyXG4gICAgLy8gICB9IGVsc2Uge1xyXG4gICAgLy8gICAgIHRoaXMuY29uc2VudEZvcm0uZGF0ZSA9IHRoaXMuZGF0ZTtcclxuICAgIC8vICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgIC8vICAgICAgICAgLnNhdmVDb25zZW50KHRoaXMuY29uc2VudEZvcm0pXHJcbiAgICAvLyAgICAgICAgIC50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XHJcbiAgICAvLyAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9XHJcbiAgICB0aGlzLmNvbnNlbnRGb3JtLmRhdGUgPSB0aGlzLmRhdGU7XHJcbiAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgLnNhdmVDb25zZW50KHRoaXMuY29uc2VudEZvcm0pXHJcbiAgICAgIC50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICB9XHJcblxyXG4gIHJlcXVlc3RFZGl0KCkge1xyXG4gICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgIC5yZXF1ZXN0RWRpdENvbnNlbnQoKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICdSZXF1ZXN0IFNlbnQhJyxcclxuICAgICAgICAgICAgJ1lvdSB3aWxsIHJlY2lldmUgYW4gZW1haWwgb25jZSB5b3VyIHJlcXVlc3QgaGFzIGJlZW4gYWNjZXB0ZWQuJyxcclxuICAgICAgICAgICAgJ2luZm8nXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAnU29tZXRoaW5nIHdlbnQgd3JvbmcuLi4nLFxyXG4gICAgICAgICAgICAnUGxlYXNlIHRyeSBhZ2Fpbi4gSWYgdGhlIGlzc3VlIHBlcnNpc3RzIGNvbnRhY3Qgc3VwcG9ydC4nLFxyXG4gICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=
