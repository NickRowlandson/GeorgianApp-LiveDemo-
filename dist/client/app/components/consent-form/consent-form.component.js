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
const consentForm_1 = require("../../models/consentForm");
const client_service_1 = require("../../services/client.service");
const student_service_1 = require("../../services/student.service");
const authentication_service_1 = require("../../services/authentication.service");
let ConsentFormComponent = class ConsentFormComponent {
    constructor(clientService, studentService, router, authService) {
        this.clientService = clientService;
        this.studentService = studentService;
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
        if (this.currentUser.userType === "Instructor" || this.currentUser.userType === "Staff" || this.currentUser.userType === "Admin") {
            this.completeConsentForm = true;
            this.loading = false;
            swal('Read Only', "You are logged in as '" + this.currentUser.userType + "'. Only clients can submit this form.", 'info');
        }
        if (this.currentUser.userType === "Client") {
            this.clientService
                .getClient(userID)
                .then(result => {
                console.log(result);
                this.clientName = result[0].firstName + " " + result[0].lastName;
                this.editConsentRequest = result[0].editConsentRequest;
                this.editConsentPermission = result[0].editConsentPermission;
                this.completeConsentForm = result[0].consent;
                if (!result[0].consent) {
                    this.clientService
                        .getConsentById()
                        .then(result => {
                        this.consentForm = result[0];
                        this.loading = false;
                        if (this.editConsentRequest && !this.editConsentPermission) {
                            swal('Edit Request Submitted', "Check back once you have received an email.", 'info');
                        }
                        else if (this.editConsentPermission) {
                            swal('Edit Request Granted!', "You can now edit this form.", 'info');
                        }
                        else {
                            swal('Read Only', "You have already submitted this form. Select 'Request to Edit' if you would like to make changes.", 'info');
                        }
                    })
                        .catch(err => {
                        console.log(err);
                    });
                    if (this.consentForm.other == null || this.consentForm.other === '') {
                        this.otherChecked = false;
                    }
                    else {
                        this.otherChecked = true;
                    }
                }
                else {
                    this.consentForm.ontarioWorks = false;
                    this.consentForm.ontarioDisabilityProgram = false;
                    this.consentForm.employmentInsurance = false;
                    this.consentForm.employmentServices = false;
                    this.consentForm.wsib = false;
                    this.loading = false;
                }
            })
                .catch(err => {
                console.log(err);
            });
        }
        if (this.currentUser.userType === "Student") {
            this.studentService
                .getStudent(userID)
                .then(result => {
                console.log(result);
                this.clientName = result.firstName + " " + result.lastName;
                this.editConsentRequest = result.editConsentRequest;
                this.editConsentPermission = result.editConsentPermission;
                this.completeConsentForm = result.consent;
                if (!result.consent) {
                    this.clientService
                        .getConsentById()
                        .then(result => {
                        this.consentForm = result[0];
                        this.loading = false;
                        if (this.editConsentRequest && !this.editConsentPermission) {
                            swal('Edit Request Submitted', "Check back once you have received an email.", 'info');
                        }
                        else if (this.editConsentPermission) {
                            swal('Edit Request Granted!', "You can now edit this form.", 'info');
                        }
                        else {
                            swal('Read Only', "You have already submitted this form. Select 'Request to Edit' if you would like to make changes.", 'info');
                        }
                    })
                        .catch(err => {
                        console.log(err);
                    });
                    if (this.consentForm.other == null || this.consentForm.other === '') {
                        this.otherChecked = false;
                    }
                    else {
                        this.otherChecked = true;
                    }
                }
                else {
                    this.consentForm.ontarioWorks = false;
                    this.consentForm.ontarioDisabilityProgram = false;
                    this.consentForm.employmentInsurance = false;
                    this.consentForm.employmentServices = false;
                    this.consentForm.wsib = false;
                    this.loading = false;
                }
            })
                .catch(err => {
                console.log(err);
            });
        }
    }
    saveConsent() {
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
            .then(client => {
            this.router.navigate(['/dashboard']);
        })
            .catch(error => this.error = error);
    }
    requestEdit() {
        if (this.currentUser.userType === "Client") {
            this.clientService
                .requestEditConsent()
                .then(result => {
                if (result.status === 'success') {
                    swal('Request Sent!', 'You will receive an email once your request has been accepted.', 'info');
                    this.router.navigate(['/dashboard']);
                }
                else {
                    swal('Something went wrong...', 'Please try again. If the issue persists contact support.', 'error');
                }
            })
                .catch(error => this.error = error);
        }
        else if (this.currentUser.userType === "Student") {
            this.studentService
                .requestEditConsent()
                .then(result => {
                if (result.status === 'success') {
                    swal('Request Sent!', 'You will receive an email once your request has been accepted.', 'info');
                    this.router.navigate(['/dashboard']);
                }
                else {
                    swal('Something went wrong...', 'Please try again. If the issue persists contact support.', 'error');
                }
            })
                .catch(error => this.error = error);
        }
    }
    goBack() {
        window.history.back();
    }
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
    __metadata("design:paramtypes", [client_service_1.ClientService, student_service_1.StudentService, router_1.Router, authentication_service_1.AuthService])
], ConsentFormComponent);
exports.ConsentFormComponent = ConsentFormComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUF5RDtBQUN6RCw0Q0FBeUM7QUFDekMsMERBQXVEO0FBQ3ZELGtFQUE4RDtBQUM5RCxvRUFBZ0U7QUFDaEUsa0ZBQW9FO0FBVXBFLElBQWEsb0JBQW9CLEdBQWpDO0lBWUUsWUFBb0IsYUFBNEIsRUFBVSxjQUE4QixFQUFVLE1BQWMsRUFBVSxXQUF3QjtRQUE5SCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVJsSixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBQ3hCLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUNwQywwQkFBcUIsR0FBWSxLQUFLLENBQUM7UUFHdkMsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsWUFBTyxHQUFZLElBQUksQ0FBQztRQUd0QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUkseUJBQVcsRUFBRSxDQUFDO1FBRXJDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEtBQUssWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxLQUFLLE9BQU8sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7WUFDaEksSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQ0YsV0FBVyxFQUNYLHdCQUF3QixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLHVDQUF1QyxFQUM5RixNQUFNLENBQ1AsQ0FBQztTQUNIO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDMUMsSUFBSSxDQUFDLGFBQWE7aUJBQ2YsU0FBUyxDQUFDLE1BQU0sQ0FBQztpQkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFDakUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDN0QsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFO29CQUN0QixJQUFJLENBQUMsYUFBYTt5QkFDZixjQUFjLEVBQUU7eUJBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTt3QkFDYixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7d0JBQ3JCLElBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFOzRCQUMxRCxJQUFJLENBQ0Ysd0JBQXdCLEVBQ3hCLDZDQUE2QyxFQUM3QyxNQUFNLENBQ1AsQ0FBQzt5QkFDSDs2QkFBTSxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTs0QkFDckMsSUFBSSxDQUNGLHVCQUF1QixFQUN2Qiw2QkFBNkIsRUFDN0IsTUFBTSxDQUNQLENBQUM7eUJBQ0g7NkJBQU07NEJBQ0wsSUFBSSxDQUNGLFdBQVcsRUFDWCxtR0FBbUcsRUFDbkcsTUFBTSxDQUNQLENBQUM7eUJBQ0g7b0JBQ0gsQ0FBQyxDQUFDO3lCQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNuQixDQUFDLENBQUMsQ0FBQztvQkFDTCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7d0JBQ25FLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO3FCQUMzQjt5QkFBTTt3QkFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztxQkFDMUI7aUJBQ0Y7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO29CQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLHdCQUF3QixHQUFHLEtBQUssQ0FBQztvQkFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7b0JBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO29CQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7b0JBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2lCQUN0QjtZQUNILENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztTQUNOO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDM0MsSUFBSSxDQUFDLGNBQWM7aUJBQ2hCLFVBQVUsQ0FBQyxNQUFNLENBQUM7aUJBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQzNELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUMsa0JBQWtCLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxNQUFNLENBQUMscUJBQXFCLENBQUM7Z0JBQzFELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO2dCQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtvQkFDbkIsSUFBSSxDQUFDLGFBQWE7eUJBQ2YsY0FBYyxFQUFFO3lCQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7d0JBQ2IsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO3dCQUNyQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRTs0QkFDMUQsSUFBSSxDQUNGLHdCQUF3QixFQUN4Qiw2Q0FBNkMsRUFDN0MsTUFBTSxDQUNQLENBQUM7eUJBQ0g7NkJBQU0sSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7NEJBQ3JDLElBQUksQ0FDRix1QkFBdUIsRUFDdkIsNkJBQTZCLEVBQzdCLE1BQU0sQ0FDUCxDQUFDO3lCQUNIOzZCQUFNOzRCQUNMLElBQUksQ0FDRixXQUFXLEVBQ1gsbUdBQW1HLEVBQ25HLE1BQU0sQ0FDUCxDQUFDO3lCQUNIO29CQUNILENBQUMsQ0FBQzt5QkFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbkIsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssRUFBRSxFQUFFO3dCQUNuRSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztxQkFDM0I7eUJBQU07d0JBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7cUJBQzFCO2lCQUNGO3FCQUFNO29CQUNMLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztvQkFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7b0JBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO29CQUM3QyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztvQkFDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO29CQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztpQkFDdEI7WUFDSCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsZ0RBQWdEO1FBQ2hELDZDQUE2QztRQUM3QyxZQUFZO1FBQ1oscUJBQXFCO1FBQ3JCLHFEQUFxRDtRQUNyRCxvQkFBb0I7UUFDcEIsU0FBUztRQUNULGFBQWE7UUFDYiw0RUFBNEU7UUFDNUUsY0FBYztRQUNkLHVCQUF1QjtRQUN2QixnREFBZ0Q7UUFDaEQsc0JBQXNCO1FBQ3RCLFdBQVc7UUFDWCxlQUFlO1FBQ2YsMkNBQTJDO1FBQzNDLDJCQUEyQjtRQUMzQiwyQ0FBMkM7UUFDM0MsOEJBQThCO1FBQzlCLHNEQUFzRDtRQUN0RCxlQUFlO1FBQ2YsaURBQWlEO1FBQ2pELFFBQVE7UUFDUixNQUFNO1FBQ04sV0FBVztRQUNYLDBFQUEwRTtRQUMxRSxZQUFZO1FBQ1oscUJBQXFCO1FBQ3JCLDhDQUE4QztRQUM5QyxvQkFBb0I7UUFDcEIsU0FBUztRQUNULGFBQWE7UUFDYix5Q0FBeUM7UUFDekMseUJBQXlCO1FBQ3pCLHlDQUF5QztRQUN6Qyw0QkFBNEI7UUFDNUIsb0RBQW9EO1FBQ3BELGFBQWE7UUFDYiwrQ0FBK0M7UUFDL0MsTUFBTTtRQUNOLElBQUk7UUFDSixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhO2FBQ2YsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUMxQyxJQUFJLENBQUMsYUFBYTtpQkFDZixrQkFBa0IsRUFBRTtpQkFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNiLElBQUssTUFBYyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7b0JBQ3hDLElBQUksQ0FDRixlQUFlLEVBQ2YsZ0VBQWdFLEVBQ2hFLE1BQU0sQ0FDUCxDQUFDO29CQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztpQkFDdEM7cUJBQU07b0JBQ0wsSUFBSSxDQUNGLHlCQUF5QixFQUN6QiwwREFBMEQsRUFDMUQsT0FBTyxDQUNSLENBQUM7aUJBQ0g7WUFDSCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQztTQUN2QzthQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQ2xELElBQUksQ0FBQyxjQUFjO2lCQUNoQixrQkFBa0IsRUFBRTtpQkFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNiLElBQUssTUFBYyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7b0JBQ3hDLElBQUksQ0FDRixlQUFlLEVBQ2YsZ0VBQWdFLEVBQ2hFLE1BQU0sQ0FDUCxDQUFDO29CQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztpQkFDdEM7cUJBQU07b0JBQ0wsSUFBSSxDQUNGLHlCQUF5QixFQUN6QiwwREFBMEQsRUFDMUQsT0FBTyxDQUNSLENBQUM7aUJBQ0g7WUFDSCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7SUFFRCxNQUFNO1FBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0NBRUYsQ0FBQTtBQWpQVTtJQUFSLFlBQUssRUFBRTs4QkFBYyx5QkFBVzt5REFBQztBQUR2QixvQkFBb0I7SUFQaEMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFdBQVcsRUFBRSwyREFBMkQ7UUFDeEUsU0FBUyxFQUFFLENBQUMsMERBQTBELENBQUM7S0FDeEUsQ0FBQztxQ0FlbUMsOEJBQWEsRUFBMEIsZ0NBQWMsRUFBa0IsZUFBTSxFQUF1QixvQ0FBVztHQVp2SSxvQkFBb0IsQ0FrUGhDO0FBbFBZLG9EQUFvQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb25zZW50Rm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY29uc2VudEZvcm1cIjtcclxuaW1wb3J0IHsgQ2xpZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jbGllbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdjb25zZW50Rm9ybScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2NvbnNlbnQtZm9ybS9jb25zZW50LWZvcm0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL2NvbnNlbnQtZm9ybS9jb25zZW50LWZvcm0uY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENvbnNlbnRGb3JtQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBjb25zZW50Rm9ybTogQ29uc2VudEZvcm07XHJcbiAgZXJyb3I6IGFueTtcclxuICBkYXRlOiBhbnk7XHJcbiAgY2xpZW50TmFtZTogc3RyaW5nID0gJyc7XHJcbiAgZWRpdENvbnNlbnRSZXF1ZXN0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgZWRpdENvbnNlbnRQZXJtaXNzaW9uOiBib29sZWFuID0gZmFsc2U7XHJcbiAgY29tcGxldGVDb25zZW50Rm9ybTogYm9vbGVhbjtcclxuICBjdXJyZW50VXNlcjogYW55O1xyXG4gIG90aGVyQ2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGxvYWRpbmc6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNsaWVudFNlcnZpY2U6IENsaWVudFNlcnZpY2UsIHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xyXG4gICAgdGhpcy5jdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgdmFyIHVzZXJJRCA9IHRoaXMuY3VycmVudFVzZXIudXNlcklEO1xyXG4gICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcclxuICAgIHRoaXMuY29uc2VudEZvcm0gPSBuZXcgQ29uc2VudEZvcm0oKTtcclxuXHJcbiAgICBpZiAodGhpcy5jdXJyZW50VXNlci51c2VyVHlwZSA9PT0gXCJJbnN0cnVjdG9yXCIgfHwgdGhpcy5jdXJyZW50VXNlci51c2VyVHlwZSA9PT0gXCJTdGFmZlwiIHx8IHRoaXMuY3VycmVudFVzZXIudXNlclR5cGUgPT09IFwiQWRtaW5cIikge1xyXG4gICAgICB0aGlzLmNvbXBsZXRlQ29uc2VudEZvcm0gPSB0cnVlO1xyXG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgc3dhbChcclxuICAgICAgICAnUmVhZCBPbmx5JyxcclxuICAgICAgICBcIllvdSBhcmUgbG9nZ2VkIGluIGFzICdcIiArIHRoaXMuY3VycmVudFVzZXIudXNlclR5cGUgKyBcIicuIE9ubHkgY2xpZW50cyBjYW4gc3VibWl0IHRoaXMgZm9ybS5cIixcclxuICAgICAgICAnaW5mbydcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jdXJyZW50VXNlci51c2VyVHlwZSA9PT0gXCJDbGllbnRcIikge1xyXG4gICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAuZ2V0Q2xpZW50KHVzZXJJRClcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICAgIHRoaXMuY2xpZW50TmFtZSA9IHJlc3VsdFswXS5maXJzdE5hbWUgKyBcIiBcIiArIHJlc3VsdFswXS5sYXN0TmFtZTtcclxuICAgICAgICAgIHRoaXMuZWRpdENvbnNlbnRSZXF1ZXN0ID0gcmVzdWx0WzBdLmVkaXRDb25zZW50UmVxdWVzdDtcclxuICAgICAgICAgIHRoaXMuZWRpdENvbnNlbnRQZXJtaXNzaW9uID0gcmVzdWx0WzBdLmVkaXRDb25zZW50UGVybWlzc2lvbjtcclxuICAgICAgICAgIHRoaXMuY29tcGxldGVDb25zZW50Rm9ybSA9IHJlc3VsdFswXS5jb25zZW50O1xyXG4gICAgICAgICAgaWYgKCFyZXN1bHRbMF0uY29uc2VudCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgICAgICAuZ2V0Q29uc2VudEJ5SWQoKVxyXG4gICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtID0gcmVzdWx0WzBdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0Q29uc2VudFJlcXVlc3QgJiYgIXRoaXMuZWRpdENvbnNlbnRQZXJtaXNzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAgICAgJ0VkaXQgUmVxdWVzdCBTdWJtaXR0ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiQ2hlY2sgYmFjayBvbmNlIHlvdSBoYXZlIHJlY2VpdmVkIGFuIGVtYWlsLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICdpbmZvJ1xyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmVkaXRDb25zZW50UGVybWlzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAgICdFZGl0IFJlcXVlc3QgR3JhbnRlZCEnLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiWW91IGNhbiBub3cgZWRpdCB0aGlzIGZvcm0uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2luZm8nXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAgICdSZWFkIE9ubHknLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiWW91IGhhdmUgYWxyZWFkeSBzdWJtaXR0ZWQgdGhpcyBmb3JtLiBTZWxlY3QgJ1JlcXVlc3QgdG8gRWRpdCcgaWYgeW91IHdvdWxkIGxpa2UgdG8gbWFrZSBjaGFuZ2VzLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICdpbmZvJ1xyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25zZW50Rm9ybS5vdGhlciA9PSBudWxsIHx8IHRoaXMuY29uc2VudEZvcm0ub3RoZXIgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5vdGhlckNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLm90aGVyQ2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc2VudEZvcm0ub250YXJpb1dvcmtzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc2VudEZvcm0ub250YXJpb0Rpc2FiaWxpdHlQcm9ncmFtID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc2VudEZvcm0uZW1wbG95bWVudEluc3VyYW5jZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtLmVtcGxveW1lbnRTZXJ2aWNlcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtLndzaWIgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuY3VycmVudFVzZXIudXNlclR5cGUgPT09IFwiU3R1ZGVudFwiKSB7XHJcbiAgICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAuZ2V0U3R1ZGVudCh1c2VySUQpXHJcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICB0aGlzLmNsaWVudE5hbWUgPSByZXN1bHQuZmlyc3ROYW1lICsgXCIgXCIgKyByZXN1bHQubGFzdE5hbWU7XHJcbiAgICAgICAgICB0aGlzLmVkaXRDb25zZW50UmVxdWVzdCA9IHJlc3VsdC5lZGl0Q29uc2VudFJlcXVlc3Q7XHJcbiAgICAgICAgICB0aGlzLmVkaXRDb25zZW50UGVybWlzc2lvbiA9IHJlc3VsdC5lZGl0Q29uc2VudFBlcm1pc3Npb247XHJcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlQ29uc2VudEZvcm0gPSByZXN1bHQuY29uc2VudDtcclxuICAgICAgICAgIGlmICghcmVzdWx0LmNvbnNlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgLmdldENvbnNlbnRCeUlkKClcclxuICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybSA9IHJlc3VsdFswXTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdENvbnNlbnRSZXF1ZXN0ICYmICF0aGlzLmVkaXRDb25zZW50UGVybWlzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAgICdFZGl0IFJlcXVlc3QgU3VibWl0dGVkJyxcclxuICAgICAgICAgICAgICAgICAgICBcIkNoZWNrIGJhY2sgb25jZSB5b3UgaGF2ZSByZWNlaXZlZCBhbiBlbWFpbC5cIixcclxuICAgICAgICAgICAgICAgICAgICAnaW5mbydcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5lZGl0Q29uc2VudFBlcm1pc3Npb24pIHtcclxuICAgICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAnRWRpdCBSZXF1ZXN0IEdyYW50ZWQhJyxcclxuICAgICAgICAgICAgICAgICAgICBcIllvdSBjYW4gbm93IGVkaXQgdGhpcyBmb3JtLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICdpbmZvJ1xyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAnUmVhZCBPbmx5JyxcclxuICAgICAgICAgICAgICAgICAgICBcIllvdSBoYXZlIGFscmVhZHkgc3VibWl0dGVkIHRoaXMgZm9ybS4gU2VsZWN0ICdSZXF1ZXN0IHRvIEVkaXQnIGlmIHlvdSB3b3VsZCBsaWtlIHRvIG1ha2UgY2hhbmdlcy5cIixcclxuICAgICAgICAgICAgICAgICAgICAnaW5mbydcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29uc2VudEZvcm0ub3RoZXIgPT0gbnVsbCB8fCB0aGlzLmNvbnNlbnRGb3JtLm90aGVyID09PSAnJykge1xyXG4gICAgICAgICAgICAgIHRoaXMub3RoZXJDaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5vdGhlckNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtLm9udGFyaW9Xb3JrcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtLm9udGFyaW9EaXNhYmlsaXR5UHJvZ3JhbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnNlbnRGb3JtLmVtcGxveW1lbnRJbnN1cmFuY2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybS5lbXBsb3ltZW50U2VydmljZXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb25zZW50Rm9ybS53c2liID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2F2ZUNvbnNlbnQoKSB7XHJcbiAgICAvLyBpZiAoIXRoaXMuY29uc2VudEZvcm0uYWxsb3dEZXRhaWxlZE1lc3NhZ2UpIHtcclxuICAgIC8vICAgaWYgKCF0aGlzLmNvbnNlbnRGb3JtLmFsdGVybmF0ZU51bWJlcikge1xyXG4gICAgLy8gICAgIHN3YWwoXHJcbiAgICAvLyAgICAgICAgICdXaG9vcHMhJyxcclxuICAgIC8vICAgICAgICAgJ1BsZWFzZSBlbnRlciBhbiBhbHRlcm5hdGUgcGhvbmUgbnVtYmVyLicsXHJcbiAgICAvLyAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgLy8gICAgICk7XHJcbiAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgaWYgKCF0aGlzLmNvbnNlbnRGb3JtLmNvbnRhY3ROYW1lIHx8ICF0aGlzLmNvbnNlbnRGb3JtLmNvbnRhY3ROdW0gKSB7XHJcbiAgICAvLyAgICAgICBzd2FsKFxyXG4gICAgLy8gICAgICAgICAgICdXaG9vcHMhJyxcclxuICAgIC8vICAgICAgICAgICAnUGxlYXNlIGZpbGwgb3V0IGFsbCBmb3JtIGZpZWxkcy4nLFxyXG4gICAgLy8gICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgLy8gICAgICAgKTtcclxuICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgdGhpcy5jb25zZW50Rm9ybS5kYXRlID0gdGhpcy5kYXRlO1xyXG4gICAgLy8gICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAvLyAgICAgICAgICAgLnNhdmVDb25zZW50KHRoaXMuY29uc2VudEZvcm0pXHJcbiAgICAvLyAgICAgICAgICAgLnRoZW4oY2xpZW50ID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xyXG4gICAgLy8gICAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9IGVsc2Uge1xyXG4gICAgLy8gICBpZiAoIXRoaXMuY29uc2VudEZvcm0uY29udGFjdE5hbWUgfHwgIXRoaXMuY29uc2VudEZvcm0uY29udGFjdE51bSApIHtcclxuICAgIC8vICAgICBzd2FsKFxyXG4gICAgLy8gICAgICAgICAnV2hvb3BzIScsXHJcbiAgICAvLyAgICAgICAgICdQbGVhc2UgZmlsbCBvdXQgYWxsIGZvcm0gZmllbGRzLicsXHJcbiAgICAvLyAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgLy8gICAgICk7XHJcbiAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgdGhpcy5jb25zZW50Rm9ybS5kYXRlID0gdGhpcy5kYXRlO1xyXG4gICAgLy8gICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgLy8gICAgICAgICAuc2F2ZUNvbnNlbnQodGhpcy5jb25zZW50Rm9ybSlcclxuICAgIC8vICAgICAgICAgLnRoZW4oY2xpZW50ID0+IHtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKTtcclxuICAgIC8vICAgICAgICAgfSlcclxuICAgIC8vICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH1cclxuICAgIHRoaXMuY29uc2VudEZvcm0uZGF0ZSA9IHRoaXMuZGF0ZTtcclxuICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAuc2F2ZUNvbnNlbnQodGhpcy5jb25zZW50Rm9ybSlcclxuICAgICAgLnRoZW4oY2xpZW50ID0+IHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgcmVxdWVzdEVkaXQoKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50VXNlci51c2VyVHlwZSA9PT0gXCJDbGllbnRcIikge1xyXG4gICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAucmVxdWVzdEVkaXRDb25zZW50KClcclxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICdSZXF1ZXN0IFNlbnQhJyxcclxuICAgICAgICAgICAgICAnWW91IHdpbGwgcmVjZWl2ZSBhbiBlbWFpbCBvbmNlIHlvdXIgcmVxdWVzdCBoYXMgYmVlbiBhY2NlcHRlZC4nLFxyXG4gICAgICAgICAgICAgICdpbmZvJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZy4uLicsXHJcbiAgICAgICAgICAgICAgJ1BsZWFzZSB0cnkgYWdhaW4uIElmIHRoZSBpc3N1ZSBwZXJzaXN0cyBjb250YWN0IHN1cHBvcnQuJyxcclxuICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50VXNlci51c2VyVHlwZSA9PT0gXCJTdHVkZW50XCIpIHtcclxuICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAgIC5yZXF1ZXN0RWRpdENvbnNlbnQoKVxyXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgJ1JlcXVlc3QgU2VudCEnLFxyXG4gICAgICAgICAgICAgICdZb3Ugd2lsbCByZWNlaXZlIGFuIGVtYWlsIG9uY2UgeW91ciByZXF1ZXN0IGhhcyBiZWVuIGFjY2VwdGVkLicsXHJcbiAgICAgICAgICAgICAgJ2luZm8nXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLi4uJyxcclxuICAgICAgICAgICAgICAnUGxlYXNlIHRyeSBhZ2Fpbi4gSWYgdGhlIGlzc3VlIHBlcnNpc3RzIGNvbnRhY3Qgc3VwcG9ydC4nLFxyXG4gICAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19
