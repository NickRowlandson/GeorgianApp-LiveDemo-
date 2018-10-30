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
const learningStyleForm_1 = require("../../models/learningStyleForm");
const client_service_1 = require("../../services/client.service");
const student_service_1 = require("../../services/student.service");
const authentication_service_1 = require("../../services/authentication.service");
let LearningStyleComponent = class LearningStyleComponent {
    constructor(clientService, studentService, router, authService) {
        this.clientService = clientService;
        this.studentService = studentService;
        this.router = router;
        this.authService = authService;
        this.showThreeChoices = false;
        this.submitVisible = true;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.learningStyleForm = new learningStyleForm_1.LearningStyleForm();
        if (this.currentUser.userType === "Client") {
            swal({
                title: 'Loading...'
            });
            swal.showLoading();
            this.clientService
                .getClient(this.currentUser.userID)
                .then(result => {
                if (!result[0].learningStyle) {
                    this.clientService
                        .getLearningStyleById()
                        .then(result => {
                        this.submitVisible = false;
                        swal.close();
                        swal('Read Only', "You have already submitted this form.", 'warning');
                    })
                        .catch(err => {
                        console.log(err);
                    });
                }
                else {
                    swal.close();
                }
            })
                .catch(err => {
                console.log(err);
            });
        }
        else if (this.currentUser.userType === "Student") {
            swal({
                title: 'Loading...'
            });
            swal.showLoading();
            this.studentService
                .getStudent(this.currentUser.userID)
                .then(result => {
                if (!result.learningStyle) {
                    this.clientService
                        .getLearningStyleById()
                        .then(result => {
                        this.submitVisible = false;
                        swal.close();
                        swal('Read Only', "You have already submitted this form.", 'warning');
                    })
                        .catch(err => {
                        console.log(err);
                    });
                }
                else {
                    swal.close();
                }
            })
                .catch(err => {
                console.log(err);
            });
        }
        else {
            swal('Read Only', "You are logged in as '" + this.currentUser.userType + "'. Only clients can submit this form.", 'warning');
        }
    }
    saveLearningStyle() {
        if (!this.learnBy && !this.doubleChoice) {
            swal('Incomplete form', 'Please fill out the form', 'warning');
        }
        else if (this.tripleChoice) {
            swal({
                title: 'You learn best by  ' + this.tripleChoice.firstChoice + ' and ' + this.tripleChoice.secondChoice + ' and ' + this.tripleChoice.thirdChoice,
                text: "Is this correct?",
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                allowOutsideClick: false,
                confirmButtonText: 'Yes!'
            }).then(isConfirm => {
                this.showThreeChoices = true;
            }).catch(error => {
                console.log(error);
            });
        }
        else if (this.doubleChoice) {
            swal({
                title: 'You learn best by ' + this.doubleChoice.firstChoice + ' and ' + this.doubleChoice.secondChoice,
                text: "Is this correct?",
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                allowOutsideClick: false,
                confirmButtonText: 'Yes!'
            }).then(isConfirm => {
                if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                    console.log(isConfirm.dismiss);
                }
                else if (isConfirm) {
                    swal({
                        title: 'Tie!',
                        text: "Please pick one that suits you better",
                        type: 'info',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#3085d6',
                        allowOutsideClick: false,
                        cancelButtonText: this.doubleChoice.firstChoice,
                        confirmButtonText: this.doubleChoice.secondChoice
                    }).then(isConfirm => {
                        if (isConfirm) {
                            this.learningStyleForm.learnBy = this.doubleChoice.secondChoice;
                            this.clientService
                                .saveLearningStyle(this.learningStyleForm)
                                .then(client => {
                                this.router.navigate(['/dashboard']);
                            })
                                .catch(error => this.error = error);
                        }
                    }).catch(error => {
                        this.learningStyleForm.learnBy = this.doubleChoice.firstChoice;
                        this.clientService
                            .saveLearningStyle(this.learningStyleForm)
                            .then(client => {
                            this.router.navigate(['/dashboard']);
                        })
                            .catch(error => this.error = error);
                    });
                }
            }).catch(error => {
                console.log(error);
            });
        }
        else {
            swal({
                title: 'You learn best by ' + this.learnBy + '',
                text: "Is this correct?",
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No',
                confirmButtonText: 'Yes!'
            }).then(isConfirm => {
                if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                    console.log(isConfirm.dismiss);
                }
                else if (isConfirm) {
                    this.learningStyleForm.learnBy = this.learnBy;
                    this.clientService
                        .saveLearningStyle(this.learningStyleForm)
                        .then(client => {
                        this.router.navigate(['/dashboard']);
                    })
                        .catch(error => this.error = error); // TODO: Display error message
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }
    choosePreference(preference) {
        this.learningStyleForm.learnBy = preference;
        this.clientService
            .saveLearningStyle(this.learningStyleForm)
            .then(client => {
            this.router.navigate(['/dashboard']);
        })
            .catch(error => this.error = error);
    }
    tallyPoints() {
        var seeingPoints = 0;
        var hearingPoints = 0;
        var doingPoints = 0;
        if (this.learningStyleForm.seeing1) {
            seeingPoints++;
        }
        if (this.learningStyleForm.seeing2) {
            seeingPoints++;
        }
        if (this.learningStyleForm.seeing3) {
            seeingPoints++;
        }
        if (this.learningStyleForm.seeing4) {
            seeingPoints++;
        }
        if (this.learningStyleForm.seeing5) {
            seeingPoints++;
        }
        if (this.learningStyleForm.seeing6) {
            seeingPoints++;
        }
        if (this.learningStyleForm.seeing7) {
            seeingPoints++;
        }
        this.totalSeeingPoints = seeingPoints;
        this.learningStyleForm.seeing = this.totalSeeingPoints;
        if (this.learningStyleForm.hearing1) {
            hearingPoints++;
        }
        if (this.learningStyleForm.hearing2) {
            hearingPoints++;
        }
        if (this.learningStyleForm.hearing3) {
            hearingPoints++;
        }
        if (this.learningStyleForm.hearing4) {
            hearingPoints++;
        }
        if (this.learningStyleForm.hearing5) {
            hearingPoints++;
        }
        if (this.learningStyleForm.hearing6) {
            hearingPoints++;
        }
        if (this.learningStyleForm.hearing7) {
            hearingPoints++;
        }
        this.totalHearingPoints = hearingPoints;
        this.learningStyleForm.hearing = this.totalHearingPoints;
        if (this.learningStyleForm.doing1) {
            doingPoints++;
        }
        if (this.learningStyleForm.doing2) {
            doingPoints++;
        }
        if (this.learningStyleForm.doing3) {
            doingPoints++;
        }
        if (this.learningStyleForm.doing4) {
            doingPoints++;
        }
        if (this.learningStyleForm.doing5) {
            doingPoints++;
        }
        if (this.learningStyleForm.doing6) {
            doingPoints++;
        }
        if (this.learningStyleForm.doing7) {
            doingPoints++;
        }
        this.totalDoingPoints = doingPoints;
        this.learningStyleForm.doing = this.totalDoingPoints;
        if (this.totalSeeingPoints > this.totalHearingPoints && this.totalSeeingPoints > this.totalDoingPoints) {
            this.doubleChoice = null;
            this.tripleChoice = null;
            this.learnBy = "Seeing";
        }
        else if (this.totalHearingPoints > this.totalSeeingPoints && this.totalHearingPoints > this.totalDoingPoints) {
            this.doubleChoice = null;
            this.tripleChoice = null;
            this.learnBy = "Hearing";
        }
        else if (this.totalDoingPoints > this.totalHearingPoints && this.totalDoingPoints > this.totalSeeingPoints) {
            this.doubleChoice = null;
            this.tripleChoice = null;
            this.learnBy = "Doing";
        }
        else if ((this.totalDoingPoints === this.totalSeeingPoints) && (this.totalHearingPoints === this.totalSeeingPoints)) {
            this.learnBy = null;
            this.doubleChoice = null;
            this.tripleChoice = {
                firstChoice: 'Seeing',
                secondChoice: 'Doing',
                thirdChoice: 'Hearing'
            };
        }
        else if (this.totalDoingPoints === this.totalSeeingPoints) {
            this.learnBy = null;
            this.tripleChoice = null;
            this.doubleChoice = {
                firstChoice: 'Doing',
                secondChoice: 'Seeing'
            };
        }
        else if (this.totalDoingPoints === this.totalHearingPoints) {
            this.learnBy = null;
            this.tripleChoice = null;
            this.doubleChoice = {
                firstChoice: 'Doing',
                secondChoice: 'Hearing'
            };
        }
        else if (this.totalSeeingPoints === this.totalHearingPoints) {
            this.learnBy = null;
            this.tripleChoice = null;
            this.doubleChoice = {
                firstChoice: 'Seeing',
                secondChoice: 'Hearing'
            };
        }
    }
    goBack() {
        window.history.back();
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", learningStyleForm_1.LearningStyleForm)
], LearningStyleComponent.prototype, "learningStyleForm", void 0);
LearningStyleComponent = __decorate([
    core_1.Component({
        selector: 'learningStyleForm',
        templateUrl: './app/components/learning-style-form/learning-style-form.component.html',
        styleUrls: ['./app/components/learning-style-form/learning-style-form.component.css']
    }),
    __metadata("design:paramtypes", [client_service_1.ClientService, student_service_1.StudentService, router_1.Router, authentication_service_1.AuthService])
], LearningStyleComponent);
exports.LearningStyleComponent = LearningStyleComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9sZWFybmluZy1zdHlsZS1mb3JtL2xlYXJuaW5nLXN0eWxlLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0NBQWlEO0FBQ2pELDRDQUF5QztBQUN6QyxzRUFBbUU7QUFDbkUsa0VBQThEO0FBQzlELG9FQUFnRTtBQUNoRSxrRkFBb0U7QUFTcEUsSUFBYSxzQkFBc0IsR0FBbkM7SUFhRSxZQUFvQixhQUE0QixFQUFVLGNBQThCLEVBQVUsTUFBYyxFQUFVLFdBQXdCO1FBQTlILGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBSmxKLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUVsQyxrQkFBYSxHQUFZLElBQUksQ0FBQztRQUc1QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7UUFFakQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDMUMsSUFBSSxDQUFDO2dCQUNILEtBQUssRUFBRSxZQUFZO2FBQ3BCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsYUFBYTtpQkFDakIsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO2lCQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUU7b0JBQzVCLElBQUksQ0FBQyxhQUFhO3lCQUNqQixvQkFBb0IsRUFBRTt5QkFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO3dCQUNiLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO3dCQUMzQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQ2IsSUFBSSxDQUNBLFdBQVcsRUFDWCx1Q0FBdUMsRUFDdkMsU0FBUyxDQUNaLENBQUM7b0JBQ0osQ0FBQyxDQUFDO3lCQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNuQixDQUFDLENBQUMsQ0FBQztpQkFDSjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ2Q7WUFDSCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQ2xELElBQUksQ0FBQztnQkFDSCxLQUFLLEVBQUUsWUFBWTthQUNwQixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLGNBQWM7aUJBQ2xCLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztpQkFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFO29CQUN6QixJQUFJLENBQUMsYUFBYTt5QkFDakIsb0JBQW9CLEVBQUU7eUJBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTt3QkFDYixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQzt3QkFDM0IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUNiLElBQUksQ0FDQSxXQUFXLEVBQ1gsdUNBQXVDLEVBQ3ZDLFNBQVMsQ0FDWixDQUFDO29CQUNKLENBQUMsQ0FBQzt5QkFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbkIsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUNkO1lBQ0gsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLElBQUksQ0FDQSxXQUFXLEVBQ1gsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsdUNBQXVDLEVBQzlGLFNBQVMsQ0FDWixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3ZDLElBQUksQ0FDQSxpQkFBaUIsRUFDakIsMEJBQTBCLEVBQzFCLFNBQVMsQ0FDWixDQUFDO1NBQ0g7YUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDNUIsSUFBSSxDQUFDO2dCQUNELEtBQUssRUFBRSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVztnQkFDakosSUFBSSxFQUFFLGtCQUFrQjtnQkFDeEIsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLGdCQUFnQixFQUFFLElBQUk7Z0JBQ3RCLGtCQUFrQixFQUFFLFNBQVM7Z0JBQzdCLGlCQUFpQixFQUFFLE1BQU07Z0JBQ3pCLGlCQUFpQixFQUFFLEtBQUs7Z0JBQ3hCLGlCQUFpQixFQUFFLE1BQU07YUFDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzVCLElBQUksQ0FBQztnQkFDRCxLQUFLLEVBQUUsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWTtnQkFDdEcsSUFBSSxFQUFFLGtCQUFrQjtnQkFDeEIsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLGdCQUFnQixFQUFFLElBQUk7Z0JBQ3RCLGtCQUFrQixFQUFFLFNBQVM7Z0JBQzdCLGlCQUFpQixFQUFFLE1BQU07Z0JBQ3pCLGlCQUFpQixFQUFFLEtBQUs7Z0JBQ3hCLGlCQUFpQixFQUFFLE1BQU07YUFDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDbEIsSUFBSSxTQUFTLENBQUMsT0FBTyxLQUFLLFFBQVEsSUFBSSxTQUFTLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtvQkFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ2hDO3FCQUFNLElBQUksU0FBUyxFQUFFO29CQUNwQixJQUFJLENBQUM7d0JBQ0QsS0FBSyxFQUFFLE1BQU07d0JBQ2IsSUFBSSxFQUFFLHVDQUF1Qzt3QkFDN0MsSUFBSSxFQUFFLE1BQU07d0JBQ1osZ0JBQWdCLEVBQUUsSUFBSTt3QkFDdEIsa0JBQWtCLEVBQUUsU0FBUzt3QkFDN0IsaUJBQWlCLEVBQUUsU0FBUzt3QkFDNUIsaUJBQWlCLEVBQUUsS0FBSzt3QkFDeEIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXO3dCQUMvQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVk7cUJBQ3BELENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQ2xCLElBQUksU0FBUyxFQUFFOzRCQUNiLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUM7NEJBQ2hFLElBQUksQ0FBQyxhQUFhO2lDQUNiLGlCQUFpQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztpQ0FDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dDQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzs0QkFDekMsQ0FBQyxDQUFDO2lDQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUM7eUJBQ3pDO29CQUNILENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTt3QkFDZixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDO3dCQUNoRSxJQUFJLENBQUMsYUFBYTs2QkFDYixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7NkJBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTs0QkFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7d0JBQ3pDLENBQUMsQ0FBQzs2QkFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDO29CQUMxQyxDQUFDLENBQUMsQ0FBQztpQkFDSjtZQUNILENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLElBQUksQ0FBQztnQkFDRCxLQUFLLEVBQUUsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUMvQyxJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsZ0JBQWdCLEVBQUUsSUFBSTtnQkFDdEIsa0JBQWtCLEVBQUUsU0FBUztnQkFDN0IsaUJBQWlCLEVBQUUsTUFBTTtnQkFDekIsZ0JBQWdCLEVBQUUsSUFBSTtnQkFDdEIsaUJBQWlCLEVBQUUsTUFBTTthQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUNsQixJQUFJLFNBQVMsQ0FBQyxPQUFPLEtBQUssUUFBUSxJQUFJLFNBQVMsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO29CQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDaEM7cUJBQU0sSUFBSSxTQUFTLEVBQUU7b0JBQ3BCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDL0MsSUFBSSxDQUFDLGFBQWE7eUJBQ2IsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO3lCQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7d0JBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUN6QyxDQUFDLENBQUM7eUJBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLDhCQUE4QjtpQkFDeEU7WUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztTQUNKO0lBRUgsQ0FBQztJQUVELGdCQUFnQixDQUFDLFVBQVU7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDNUMsSUFBSSxDQUFDLGFBQWE7YUFDYixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7YUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztRQUVwQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUU7WUFBRSxZQUFZLEVBQUUsQ0FBQztTQUFFO1FBQ3ZELElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRTtZQUFFLFlBQVksRUFBRSxDQUFDO1NBQUU7UUFDdkQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFO1lBQUUsWUFBWSxFQUFFLENBQUM7U0FBRTtRQUN2RCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUU7WUFBRSxZQUFZLEVBQUUsQ0FBQztTQUFFO1FBQ3ZELElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRTtZQUFFLFlBQVksRUFBRSxDQUFDO1NBQUU7UUFDdkQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFO1lBQUUsWUFBWSxFQUFFLENBQUM7U0FBRTtRQUN2RCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUU7WUFBRSxZQUFZLEVBQUUsQ0FBQztTQUFFO1FBQ3ZELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxZQUFZLENBQUM7UUFDdEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFFdkQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFO1lBQUUsYUFBYSxFQUFFLENBQUM7U0FBRTtRQUN6RCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUU7WUFBRSxhQUFhLEVBQUUsQ0FBQztTQUFFO1FBQ3pELElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRTtZQUFFLGFBQWEsRUFBRSxDQUFDO1NBQUU7UUFDekQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFO1lBQUUsYUFBYSxFQUFFLENBQUM7U0FBRTtRQUN6RCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUU7WUFBRSxhQUFhLEVBQUUsQ0FBQztTQUFFO1FBQ3pELElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRTtZQUFFLGFBQWEsRUFBRSxDQUFDO1NBQUU7UUFDekQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFO1lBQUUsYUFBYSxFQUFFLENBQUM7U0FBRTtRQUN6RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBRXpELElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRTtZQUFFLFdBQVcsRUFBRSxDQUFDO1NBQUU7UUFDckQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFO1lBQUUsV0FBVyxFQUFFLENBQUM7U0FBRTtRQUNyRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUU7WUFBRSxXQUFXLEVBQUUsQ0FBQztTQUFFO1FBQ3JELElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRTtZQUFFLFdBQVcsRUFBRSxDQUFDO1NBQUU7UUFDckQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFO1lBQUUsV0FBVyxFQUFFLENBQUM7U0FBRTtRQUNyRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUU7WUFBRSxXQUFXLEVBQUUsQ0FBQztTQUFFO1FBQ3JELElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRTtZQUFFLFdBQVcsRUFBRSxDQUFDO1NBQUU7UUFDckQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFdBQVcsQ0FBQztRQUNwQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUVyRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN0RyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztTQUN6QjthQUFNLElBQUksSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQzlHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1NBQzFCO2FBQU0sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDNUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDeEI7YUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixLQUFLLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixLQUFLLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQ3JILElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUc7Z0JBQ2xCLFdBQVcsRUFBRSxRQUFRO2dCQUNyQixZQUFZLEVBQUUsT0FBTztnQkFDckIsV0FBVyxFQUFFLFNBQVM7YUFDdkIsQ0FBQztTQUNIO2FBQU0sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUc7Z0JBQ2xCLFdBQVcsRUFBRSxPQUFPO2dCQUNwQixZQUFZLEVBQUUsUUFBUTthQUN2QixDQUFDO1NBQ0g7YUFBTSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDNUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRztnQkFDbEIsV0FBVyxFQUFFLE9BQU87Z0JBQ3BCLFlBQVksRUFBRSxTQUFTO2FBQ3hCLENBQUM7U0FDSDthQUFNLElBQUksSUFBSSxDQUFDLGlCQUFpQixLQUFLLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUM3RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHO2dCQUNsQixXQUFXLEVBQUUsUUFBUTtnQkFDckIsWUFBWSxFQUFFLFNBQVM7YUFDeEIsQ0FBQztTQUNIO0lBRUgsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7Q0FDRixDQUFBO0FBcFJVO0lBQVIsWUFBSyxFQUFFOzhCQUFvQixxQ0FBaUI7aUVBQUM7QUFEbkMsc0JBQXNCO0lBTmxDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLFdBQVcsRUFBRSx5RUFBeUU7UUFDdEYsU0FBUyxFQUFFLENBQUMsd0VBQXdFLENBQUM7S0FDeEYsQ0FBQztxQ0FlbUMsOEJBQWEsRUFBMEIsZ0NBQWMsRUFBa0IsZUFBTSxFQUF1QixvQ0FBVztHQWJ2SSxzQkFBc0IsQ0FxUmxDO0FBclJZLHdEQUFzQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9sZWFybmluZy1zdHlsZS1mb3JtL2xlYXJuaW5nLXN0eWxlLWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBMZWFybmluZ1N0eWxlRm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvbGVhcm5pbmdTdHlsZUZvcm1cIjtcclxuaW1wb3J0IHsgQ2xpZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jbGllbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2xlYXJuaW5nU3R5bGVGb3JtJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9sZWFybmluZy1zdHlsZS1mb3JtL2xlYXJuaW5nLXN0eWxlLWZvcm0uY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvbGVhcm5pbmctc3R5bGUtZm9ybS9sZWFybmluZy1zdHlsZS1mb3JtLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIExlYXJuaW5nU3R5bGVDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGxlYXJuaW5nU3R5bGVGb3JtOiBMZWFybmluZ1N0eWxlRm9ybTtcclxuICBlcnJvcjogYW55O1xyXG4gIHRvdGFsU2VlaW5nUG9pbnRzOiBudW1iZXI7XHJcbiAgdG90YWxIZWFyaW5nUG9pbnRzOiBudW1iZXI7XHJcbiAgdG90YWxEb2luZ1BvaW50czogbnVtYmVyO1xyXG4gIGxlYXJuQnk6IGFueTtcclxuICBkb3VibGVDaG9pY2U6IGFueTtcclxuICB0cmlwbGVDaG9pY2U6IGFueTtcclxuICBzaG93VGhyZWVDaG9pY2VzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgY3VycmVudFVzZXI6IGFueTtcclxuICBzdWJtaXRWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjbGllbnRTZXJ2aWNlOiBDbGllbnRTZXJ2aWNlLCBwcml2YXRlIHN0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcclxuICAgIHRoaXMuY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgIHRoaXMubGVhcm5pbmdTdHlsZUZvcm0gPSBuZXcgTGVhcm5pbmdTdHlsZUZvcm0oKTtcclxuXHJcbiAgICBpZiAodGhpcy5jdXJyZW50VXNlci51c2VyVHlwZSA9PT0gXCJDbGllbnRcIikge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogJ0xvYWRpbmcuLi4nXHJcbiAgICAgIH0pO1xyXG4gICAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAuZ2V0Q2xpZW50KHRoaXMuY3VycmVudFVzZXIudXNlcklEKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICghcmVzdWx0WzBdLmxlYXJuaW5nU3R5bGUpIHtcclxuICAgICAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgICAgLmdldExlYXJuaW5nU3R5bGVCeUlkKClcclxuICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3VibWl0VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgICAnUmVhZCBPbmx5JyxcclxuICAgICAgICAgICAgICAgIFwiWW91IGhhdmUgYWxyZWFkeSBzdWJtaXR0ZWQgdGhpcyBmb3JtLlwiLFxyXG4gICAgICAgICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFVzZXIudXNlclR5cGUgPT09IFwiU3R1ZGVudFwiKSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiAnTG9hZGluZy4uLidcclxuICAgICAgfSk7XHJcbiAgICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgICAgdGhpcy5zdHVkZW50U2VydmljZVxyXG4gICAgICAuZ2V0U3R1ZGVudCh0aGlzLmN1cnJlbnRVc2VyLnVzZXJJRClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAoIXJlc3VsdC5sZWFybmluZ1N0eWxlKSB7XHJcbiAgICAgICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgIC5nZXRMZWFybmluZ1N0eWxlQnlJZCgpXHJcbiAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdFZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgJ1JlYWQgT25seScsXHJcbiAgICAgICAgICAgICAgICBcIllvdSBoYXZlIGFscmVhZHkgc3VibWl0dGVkIHRoaXMgZm9ybS5cIixcclxuICAgICAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICAgICdSZWFkIE9ubHknLFxyXG4gICAgICAgICAgXCJZb3UgYXJlIGxvZ2dlZCBpbiBhcyAnXCIgKyB0aGlzLmN1cnJlbnRVc2VyLnVzZXJUeXBlICsgXCInLiBPbmx5IGNsaWVudHMgY2FuIHN1Ym1pdCB0aGlzIGZvcm0uXCIsXHJcbiAgICAgICAgICAnd2FybmluZydcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNhdmVMZWFybmluZ1N0eWxlKCkge1xyXG4gICAgaWYgKCF0aGlzLmxlYXJuQnkgJiYgIXRoaXMuZG91YmxlQ2hvaWNlKSB7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgICAnSW5jb21wbGV0ZSBmb3JtJyxcclxuICAgICAgICAgICdQbGVhc2UgZmlsbCBvdXQgdGhlIGZvcm0nLFxyXG4gICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMudHJpcGxlQ2hvaWNlKSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdZb3UgbGVhcm4gYmVzdCBieSAgJyArIHRoaXMudHJpcGxlQ2hvaWNlLmZpcnN0Q2hvaWNlICsgJyBhbmQgJyArIHRoaXMudHJpcGxlQ2hvaWNlLnNlY29uZENob2ljZSArICcgYW5kICcgKyB0aGlzLnRyaXBsZUNob2ljZS50aGlyZENob2ljZSxcclxuICAgICAgICAgIHRleHQ6IFwiSXMgdGhpcyBjb3JyZWN0P1wiLFxyXG4gICAgICAgICAgdHlwZTogJ3F1ZXN0aW9uJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2UsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcyEnXHJcbiAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICB0aGlzLnNob3dUaHJlZUNob2ljZXMgPSB0cnVlO1xyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5kb3VibGVDaG9pY2UpIHtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ1lvdSBsZWFybiBiZXN0IGJ5ICcgKyB0aGlzLmRvdWJsZUNob2ljZS5maXJzdENob2ljZSArICcgYW5kICcgKyB0aGlzLmRvdWJsZUNob2ljZS5zZWNvbmRDaG9pY2UsXHJcbiAgICAgICAgICB0ZXh0OiBcIklzIHRoaXMgY29ycmVjdD9cIixcclxuICAgICAgICAgIHR5cGU6ICdxdWVzdGlvbicsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMhJ1xyXG4gICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtLmRpc21pc3MpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ1RpZSEnLFxyXG4gICAgICAgICAgICAgIHRleHQ6IFwiUGxlYXNlIHBpY2sgb25lIHRoYXQgc3VpdHMgeW91IGJldHRlclwiLFxyXG4gICAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcclxuICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IHRoaXMuZG91YmxlQ2hvaWNlLmZpcnN0Q2hvaWNlLFxyXG4gICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiB0aGlzLmRvdWJsZUNob2ljZS5zZWNvbmRDaG9pY2VcclxuICAgICAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICAgICAgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZUZvcm0ubGVhcm5CeSA9IHRoaXMuZG91YmxlQ2hvaWNlLnNlY29uZENob2ljZTtcclxuICAgICAgICAgICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgICAgICAgICAgLnNhdmVMZWFybmluZ1N0eWxlKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0pXHJcbiAgICAgICAgICAgICAgICAgIC50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZUZvcm0ubGVhcm5CeSAgPSB0aGlzLmRvdWJsZUNob2ljZS5maXJzdENob2ljZTtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAuc2F2ZUxlYXJuaW5nU3R5bGUodGhpcy5sZWFybmluZ1N0eWxlRm9ybSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdZb3UgbGVhcm4gYmVzdCBieSAnICsgdGhpcy5sZWFybkJ5ICsgJycsXHJcbiAgICAgICAgICB0ZXh0OiBcIklzIHRoaXMgY29ycmVjdD9cIixcclxuICAgICAgICAgIHR5cGU6ICdxdWVzdGlvbicsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ05vJyxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzISdcclxuICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgdGhpcy5sZWFybmluZ1N0eWxlRm9ybS5sZWFybkJ5ICA9IHRoaXMubGVhcm5CeTtcclxuICAgICAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgICAgICAgIC5zYXZlTGVhcm5pbmdTdHlsZSh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtKVxyXG4gICAgICAgICAgICAgIC50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpOyAvLyBUT0RPOiBEaXNwbGF5IGVycm9yIG1lc3NhZ2VcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGNob29zZVByZWZlcmVuY2UocHJlZmVyZW5jZSkge1xyXG4gICAgdGhpcy5sZWFybmluZ1N0eWxlRm9ybS5sZWFybkJ5ID0gcHJlZmVyZW5jZTtcclxuICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgIC5zYXZlTGVhcm5pbmdTdHlsZSh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtKVxyXG4gICAgICAgIC50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgdGFsbHlQb2ludHMoKSB7XHJcbiAgICB2YXIgc2VlaW5nUG9pbnRzID0gMDtcclxuICAgIHZhciBoZWFyaW5nUG9pbnRzID0gMDtcclxuICAgIHZhciBkb2luZ1BvaW50cyA9IDA7XHJcblxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uc2VlaW5nMSkgeyBzZWVpbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uc2VlaW5nMikgeyBzZWVpbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uc2VlaW5nMykgeyBzZWVpbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uc2VlaW5nNCkgeyBzZWVpbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uc2VlaW5nNSkgeyBzZWVpbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uc2VlaW5nNikgeyBzZWVpbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uc2VlaW5nNykgeyBzZWVpbmdQb2ludHMrKzsgfVxyXG4gICAgdGhpcy50b3RhbFNlZWluZ1BvaW50cyA9IHNlZWluZ1BvaW50cztcclxuICAgIHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uc2VlaW5nID0gdGhpcy50b3RhbFNlZWluZ1BvaW50cztcclxuXHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5oZWFyaW5nMSkgeyBoZWFyaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmhlYXJpbmcyKSB7IGhlYXJpbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uaGVhcmluZzMpIHsgaGVhcmluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5oZWFyaW5nNCkgeyBoZWFyaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmhlYXJpbmc1KSB7IGhlYXJpbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uaGVhcmluZzYpIHsgaGVhcmluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5oZWFyaW5nNykgeyBoZWFyaW5nUG9pbnRzKys7IH1cclxuICAgIHRoaXMudG90YWxIZWFyaW5nUG9pbnRzID0gaGVhcmluZ1BvaW50cztcclxuICAgIHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uaGVhcmluZyA9IHRoaXMudG90YWxIZWFyaW5nUG9pbnRzO1xyXG5cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmRvaW5nMSkgeyBkb2luZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5kb2luZzIpIHsgZG9pbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uZG9pbmczKSB7IGRvaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmRvaW5nNCkgeyBkb2luZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5kb2luZzUpIHsgZG9pbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uZG9pbmc2KSB7IGRvaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmRvaW5nNykgeyBkb2luZ1BvaW50cysrOyB9XHJcbiAgICB0aGlzLnRvdGFsRG9pbmdQb2ludHMgPSBkb2luZ1BvaW50cztcclxuICAgIHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uZG9pbmcgPSB0aGlzLnRvdGFsRG9pbmdQb2ludHM7XHJcblxyXG4gICAgaWYgKHRoaXMudG90YWxTZWVpbmdQb2ludHMgPiB0aGlzLnRvdGFsSGVhcmluZ1BvaW50cyAmJiB0aGlzLnRvdGFsU2VlaW5nUG9pbnRzID4gdGhpcy50b3RhbERvaW5nUG9pbnRzKSB7XHJcbiAgICAgIHRoaXMuZG91YmxlQ2hvaWNlID0gbnVsbDtcclxuICAgICAgdGhpcy50cmlwbGVDaG9pY2UgPSBudWxsO1xyXG4gICAgICB0aGlzLmxlYXJuQnkgPSBcIlNlZWluZ1wiO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnRvdGFsSGVhcmluZ1BvaW50cyA+IHRoaXMudG90YWxTZWVpbmdQb2ludHMgJiYgdGhpcy50b3RhbEhlYXJpbmdQb2ludHMgPiB0aGlzLnRvdGFsRG9pbmdQb2ludHMpIHtcclxuICAgICAgdGhpcy5kb3VibGVDaG9pY2UgPSBudWxsO1xyXG4gICAgICB0aGlzLnRyaXBsZUNob2ljZSA9IG51bGw7XHJcbiAgICAgIHRoaXMubGVhcm5CeSA9IFwiSGVhcmluZ1wiO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnRvdGFsRG9pbmdQb2ludHMgPiB0aGlzLnRvdGFsSGVhcmluZ1BvaW50cyAmJiB0aGlzLnRvdGFsRG9pbmdQb2ludHMgPiB0aGlzLnRvdGFsU2VlaW5nUG9pbnRzKSB7XHJcbiAgICAgIHRoaXMuZG91YmxlQ2hvaWNlID0gbnVsbDtcclxuICAgICAgdGhpcy50cmlwbGVDaG9pY2UgPSBudWxsO1xyXG4gICAgICB0aGlzLmxlYXJuQnkgPSBcIkRvaW5nXCI7XHJcbiAgICB9IGVsc2UgaWYgKCh0aGlzLnRvdGFsRG9pbmdQb2ludHMgPT09IHRoaXMudG90YWxTZWVpbmdQb2ludHMpICYmICh0aGlzLnRvdGFsSGVhcmluZ1BvaW50cyA9PT0gdGhpcy50b3RhbFNlZWluZ1BvaW50cykpIHtcclxuICAgICAgdGhpcy5sZWFybkJ5ID0gbnVsbDtcclxuICAgICAgdGhpcy5kb3VibGVDaG9pY2UgPSBudWxsO1xyXG4gICAgICB0aGlzLnRyaXBsZUNob2ljZSA9IHtcclxuICAgICAgICBmaXJzdENob2ljZTogJ1NlZWluZycsXHJcbiAgICAgICAgc2Vjb25kQ2hvaWNlOiAnRG9pbmcnLFxyXG4gICAgICAgIHRoaXJkQ2hvaWNlOiAnSGVhcmluZydcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy50b3RhbERvaW5nUG9pbnRzID09PSB0aGlzLnRvdGFsU2VlaW5nUG9pbnRzKSB7XHJcbiAgICAgIHRoaXMubGVhcm5CeSA9IG51bGw7XHJcbiAgICAgIHRoaXMudHJpcGxlQ2hvaWNlID0gbnVsbDtcclxuICAgICAgdGhpcy5kb3VibGVDaG9pY2UgPSB7XHJcbiAgICAgICAgZmlyc3RDaG9pY2U6ICdEb2luZycsXHJcbiAgICAgICAgc2Vjb25kQ2hvaWNlOiAnU2VlaW5nJ1xyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnRvdGFsRG9pbmdQb2ludHMgPT09IHRoaXMudG90YWxIZWFyaW5nUG9pbnRzKSB7XHJcbiAgICAgIHRoaXMubGVhcm5CeSA9IG51bGw7XHJcbiAgICAgIHRoaXMudHJpcGxlQ2hvaWNlID0gbnVsbDtcclxuICAgICAgdGhpcy5kb3VibGVDaG9pY2UgPSB7XHJcbiAgICAgICAgZmlyc3RDaG9pY2U6ICdEb2luZycsXHJcbiAgICAgICAgc2Vjb25kQ2hvaWNlOiAnSGVhcmluZydcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy50b3RhbFNlZWluZ1BvaW50cyA9PT0gdGhpcy50b3RhbEhlYXJpbmdQb2ludHMpIHtcclxuICAgICAgdGhpcy5sZWFybkJ5ID0gbnVsbDtcclxuICAgICAgdGhpcy50cmlwbGVDaG9pY2UgPSBudWxsO1xyXG4gICAgICB0aGlzLmRvdWJsZUNob2ljZSA9IHtcclxuICAgICAgICBmaXJzdENob2ljZTogJ1NlZWluZycsXHJcbiAgICAgICAgc2Vjb25kQ2hvaWNlOiAnSGVhcmluZydcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
