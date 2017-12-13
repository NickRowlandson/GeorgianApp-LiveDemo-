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
var learningStyleForm_1 = require("../../models/learningStyleForm");
var client_service_1 = require("../../services/client.service");
var authentication_service_1 = require("../../services/authentication.service");
var LearningStyleComponent = /** @class */ (function () {
    function LearningStyleComponent(clientService, router, authService) {
        this.clientService = clientService;
        this.router = router;
        this.authService = authService;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.learningStyleForm = new learningStyleForm_1.LearningStyleForm();
        if (this.currentUser.userType !== "Client") {
            swal('Read Only', "You are logged in as '" + this.currentUser.userType + "'. Only clients can submit this form.", 'warning');
        }
    }
    LearningStyleComponent.prototype.saveLearningStyle = function () {
        var _this = this;
        if (!this.learnBy && !this.multiChoice) {
            swal('Incomplete form', 'Please fill out the form', 'warning');
        }
        else if (this.multiChoice) {
            swal({
                title: 'You learn best by ' + this.multiChoice.firstChoice + ' and ' + this.multiChoice.secondChoice + '',
                text: "Is this correct?",
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                allowOutsideClick: false,
                confirmButtonText: 'Yes!'
            }).then(function (isConfirm) {
                if (isConfirm) {
                    swal({
                        title: 'Tie!',
                        text: "Please pick one that suits you better",
                        type: 'info',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#3085d6',
                        allowOutsideClick: false,
                        cancelButtonText: _this.multiChoice.firstChoice,
                        confirmButtonText: _this.multiChoice.secondChoice
                    }).then(function (isConfirm) {
                        if (isConfirm) {
                            _this.learningStyleForm.learnBy = _this.multiChoice.secondChoice;
                            _this.clientService
                                .saveLearningStyle(_this.learningStyleForm)
                                .then(function (client) {
                                _this.router.navigate(['/dashboard']);
                            })
                                .catch(function (error) { return _this.error = error; });
                        }
                    }).catch(function (error) {
                        _this.learningStyleForm.learnBy = _this.multiChoice.firstChoice;
                        _this.clientService
                            .saveLearningStyle(_this.learningStyleForm)
                            .then(function (client) {
                            _this.router.navigate(['/dashboard']);
                        })
                            .catch(function (error) { return _this.error = error; });
                    });
                }
            }).catch(function (error) {
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
            }).then(function (isConfirm) {
                if (isConfirm) {
                    _this.learningStyleForm.learnBy = _this.learnBy;
                    _this.clientService
                        .saveLearningStyle(_this.learningStyleForm)
                        .then(function (client) {
                        _this.router.navigate(['/dashboard']);
                    })
                        .catch(function (error) { return _this.error = error; }); // TODO: Display error message
                }
            }).catch(function (error) {
                //console.log("Canceled");
            });
        }
    };
    LearningStyleComponent.prototype.tallyPoints = function () {
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
            this.multiChoice = null;
            this.learnBy = "Seeing";
        }
        else if (this.totalHearingPoints > this.totalSeeingPoints && this.totalHearingPoints > this.totalDoingPoints) {
            this.multiChoice = null;
            this.learnBy = "Hearing";
        }
        else if (this.totalDoingPoints > this.totalHearingPoints && this.totalDoingPoints > this.totalSeeingPoints) {
            this.multiChoice = null;
            this.learnBy = "Doing";
        }
        else if (this.totalDoingPoints === this.totalSeeingPoints) {
            this.learnBy = null;
            this.multiChoice = {
                firstChoice: 'Doing',
                secondChoice: 'Seeing'
            };
        }
        else if (this.totalDoingPoints === this.totalHearingPoints) {
            this.learnBy = null;
            this.multiChoice = {
                firstChoice: 'Doing',
                secondChoice: 'Hearing'
            };
        }
        else if (this.totalSeeingPoints === this.totalHearingPoints) {
            this.learnBy = null;
            this.multiChoice = {
                firstChoice: 'Seeing',
                secondChoice: 'Hearing'
            };
        }
    };
    LearningStyleComponent.prototype.goBack = function () {
        window.history.back();
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
        __metadata("design:paramtypes", [client_service_1.ClientService, router_1.Router, authentication_service_1.AuthService])
    ], LearningStyleComponent);
    return LearningStyleComponent;
}());
exports.LearningStyleComponent = LearningStyleComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9sZWFybmluZy1zdHlsZS1mb3JtL2xlYXJuaW5nLXN0eWxlLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWlEO0FBQ2pELDBDQUF5QztBQUN6QyxvRUFBbUU7QUFDbkUsZ0VBQThEO0FBQzlELGdGQUFvRTtBQVNwRTtJQVVFLGdDQUFvQixhQUE0QixFQUFVLE1BQWMsRUFBVSxXQUF3QjtRQUF0RixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4RyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7UUFFakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQ0EsV0FBVyxFQUNYLHdCQUF3QixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLHVDQUF1QyxFQUM5RixTQUFTLENBQ1osQ0FBQztRQUNKLENBQUM7SUFDSCxDQUFDO0lBRUQsa0RBQWlCLEdBQWpCO1FBQUEsaUJBNkVDO1FBNUVDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FDQSxpQkFBaUIsRUFDakIsMEJBQTBCLEVBQzFCLFNBQVMsQ0FDWixDQUFDO1FBQ0osQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUM7Z0JBQ0QsS0FBSyxFQUFFLG9CQUFvQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksR0FBRyxFQUFFO2dCQUN6RyxJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsZ0JBQWdCLEVBQUUsSUFBSTtnQkFDdEIsa0JBQWtCLEVBQUUsU0FBUztnQkFDN0IsaUJBQWlCLEVBQUUsTUFBTTtnQkFDekIsaUJBQWlCLEVBQUUsS0FBSztnQkFDeEIsaUJBQWlCLEVBQUUsTUFBTTthQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsU0FBUztnQkFDZixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNkLElBQUksQ0FBQzt3QkFDRCxLQUFLLEVBQUUsTUFBTTt3QkFDYixJQUFJLEVBQUUsdUNBQXVDO3dCQUM3QyxJQUFJLEVBQUUsTUFBTTt3QkFDWixnQkFBZ0IsRUFBRSxJQUFJO3dCQUN0QixrQkFBa0IsRUFBRSxTQUFTO3dCQUM3QixpQkFBaUIsRUFBRSxTQUFTO3dCQUM1QixpQkFBaUIsRUFBRSxLQUFLO3dCQUN4QixnQkFBZ0IsRUFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLFdBQVc7d0JBQzlDLGlCQUFpQixFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsWUFBWTtxQkFDbkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFNBQVM7d0JBQ2YsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDZCxLQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDOzRCQUMvRCxLQUFJLENBQUMsYUFBYTtpQ0FDYixpQkFBaUIsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUM7aUNBQ3pDLElBQUksQ0FBQyxVQUFBLE1BQU07Z0NBQ1IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOzRCQUN6QyxDQUFDLENBQUM7aUNBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQzt3QkFDMUMsQ0FBQztvQkFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLO3dCQUNaLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUksS0FBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7d0JBQy9ELEtBQUksQ0FBQyxhQUFhOzZCQUNiLGlCQUFpQixDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQzs2QkFDekMsSUFBSSxDQUFDLFVBQUEsTUFBTTs0QkFDUixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7d0JBQ3pDLENBQUMsQ0FBQzs2QkFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO29CQUMxQyxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSztZQUVkLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDO2dCQUNELEtBQUssRUFBRSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQy9DLElBQUksRUFBRSxrQkFBa0I7Z0JBQ3hCLElBQUksRUFBRSxVQUFVO2dCQUNoQixnQkFBZ0IsRUFBRSxJQUFJO2dCQUN0QixrQkFBa0IsRUFBRSxTQUFTO2dCQUM3QixpQkFBaUIsRUFBRSxNQUFNO2dCQUN6QixnQkFBZ0IsRUFBRSxJQUFJO2dCQUN0QixpQkFBaUIsRUFBRSxNQUFNO2FBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxTQUFTO2dCQUNmLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ2QsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBSSxLQUFJLENBQUMsT0FBTyxDQUFDO29CQUMvQyxLQUFJLENBQUMsYUFBYTt5QkFDYixpQkFBaUIsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUM7eUJBQ3pDLElBQUksQ0FBQyxVQUFBLE1BQU07d0JBQ1IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUN6QyxDQUFDLENBQUM7eUJBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQyxDQUFDLDhCQUE4QjtnQkFDekUsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEtBQUs7Z0JBQ1osMEJBQTBCO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUVILENBQUM7SUFFRCw0Q0FBVyxHQUFYO1FBQ0UsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFFcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDdkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDdkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDdkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDdkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDdkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDdkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFBQyxZQUFZLEVBQUUsQ0FBQztRQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFlBQVksQ0FBQztRQUN0QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUV2RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUFDLGFBQWEsRUFBRSxDQUFDO1FBQUMsQ0FBQztRQUN6RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUFDLGFBQWEsRUFBRSxDQUFDO1FBQUMsQ0FBQztRQUN6RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUFDLGFBQWEsRUFBRSxDQUFDO1FBQUMsQ0FBQztRQUN6RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUFDLGFBQWEsRUFBRSxDQUFDO1FBQUMsQ0FBQztRQUN6RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUFDLGFBQWEsRUFBRSxDQUFDO1FBQUMsQ0FBQztRQUN6RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUFDLGFBQWEsRUFBRSxDQUFDO1FBQUMsQ0FBQztRQUN6RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUFDLGFBQWEsRUFBRSxDQUFDO1FBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBRXpELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQUMsV0FBVyxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQUMsV0FBVyxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQUMsV0FBVyxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQUMsV0FBVyxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQUMsV0FBVyxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQUMsV0FBVyxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQUMsV0FBVyxFQUFFLENBQUM7UUFBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxXQUFXLENBQUM7UUFDcEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFFckQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUN2RyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztRQUMxQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDL0csSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDM0IsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQzdHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixLQUFLLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRztnQkFDakIsV0FBVyxFQUFFLE9BQU87Z0JBQ3BCLFlBQVksRUFBRSxRQUFRO2FBQ3ZCLENBQUM7UUFDSixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUc7Z0JBQ2pCLFdBQVcsRUFBRSxPQUFPO2dCQUNwQixZQUFZLEVBQUUsU0FBUzthQUN4QixDQUFDO1FBQ0osQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEtBQUssSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHO2dCQUNqQixXQUFXLEVBQUUsUUFBUTtnQkFDckIsWUFBWSxFQUFFLFNBQVM7YUFDeEIsQ0FBQztRQUNKLENBQUM7SUFFSCxDQUFDO0lBRUQsdUNBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQXpLUTtRQUFSLFlBQUssRUFBRTtrQ0FBb0IscUNBQWlCO3FFQUFDO0lBRG5DLHNCQUFzQjtRQU5sQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixXQUFXLEVBQUUseUVBQXlFO1lBQ3RGLFNBQVMsRUFBRSxDQUFDLHdFQUF3RSxDQUFDO1NBQ3hGLENBQUM7eUNBWW1DLDhCQUFhLEVBQWtCLGVBQU0sRUFBdUIsb0NBQVc7T0FWL0Ysc0JBQXNCLENBMktsQztJQUFELDZCQUFDO0NBM0tELEFBMktDLElBQUE7QUEzS1ksd0RBQXNCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2xlYXJuaW5nLXN0eWxlLWZvcm0vbGVhcm5pbmctc3R5bGUtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IExlYXJuaW5nU3R5bGVGb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9sZWFybmluZ1N0eWxlRm9ybVwiO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdsZWFybmluZ1N0eWxlRm9ybScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvbGVhcm5pbmctc3R5bGUtZm9ybS9sZWFybmluZy1zdHlsZS1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL2xlYXJuaW5nLXN0eWxlLWZvcm0vbGVhcm5pbmctc3R5bGUtZm9ybS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBMZWFybmluZ1N0eWxlQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBsZWFybmluZ1N0eWxlRm9ybTogTGVhcm5pbmdTdHlsZUZvcm07XHJcbiAgZXJyb3I6IGFueTtcclxuICB0b3RhbFNlZWluZ1BvaW50czogbnVtYmVyO1xyXG4gIHRvdGFsSGVhcmluZ1BvaW50czogbnVtYmVyO1xyXG4gIHRvdGFsRG9pbmdQb2ludHM6IG51bWJlcjtcclxuICBsZWFybkJ5OiBhbnk7XHJcbiAgbXVsdGlDaG9pY2U6IGFueTtcclxuICBjdXJyZW50VXNlcjogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNsaWVudFNlcnZpY2U6IENsaWVudFNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcbiAgICB0aGlzLmxlYXJuaW5nU3R5bGVGb3JtID0gbmV3IExlYXJuaW5nU3R5bGVGb3JtKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuY3VycmVudFVzZXIudXNlclR5cGUgIT09IFwiQ2xpZW50XCIpIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICAgICdSZWFkIE9ubHknLFxyXG4gICAgICAgICAgXCJZb3UgYXJlIGxvZ2dlZCBpbiBhcyAnXCIgKyB0aGlzLmN1cnJlbnRVc2VyLnVzZXJUeXBlICsgXCInLiBPbmx5IGNsaWVudHMgY2FuIHN1Ym1pdCB0aGlzIGZvcm0uXCIsXHJcbiAgICAgICAgICAnd2FybmluZydcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNhdmVMZWFybmluZ1N0eWxlKCkge1xyXG4gICAgaWYgKCF0aGlzLmxlYXJuQnkgJiYgIXRoaXMubXVsdGlDaG9pY2UpIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICAgICdJbmNvbXBsZXRlIGZvcm0nLFxyXG4gICAgICAgICAgJ1BsZWFzZSBmaWxsIG91dCB0aGUgZm9ybScsXHJcbiAgICAgICAgICAnd2FybmluZydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5tdWx0aUNob2ljZSkge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnWW91IGxlYXJuIGJlc3QgYnkgJyArIHRoaXMubXVsdGlDaG9pY2UuZmlyc3RDaG9pY2UgKyAnIGFuZCAnICsgdGhpcy5tdWx0aUNob2ljZS5zZWNvbmRDaG9pY2UgKyAnJyxcclxuICAgICAgICAgIHRleHQ6IFwiSXMgdGhpcyBjb3JyZWN0P1wiLFxyXG4gICAgICAgICAgdHlwZTogJ3F1ZXN0aW9uJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2UsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcyEnXHJcbiAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgICB0aXRsZTogJ1RpZSEnLFxyXG4gICAgICAgICAgICAgIHRleHQ6IFwiUGxlYXNlIHBpY2sgb25lIHRoYXQgc3VpdHMgeW91IGJldHRlclwiLFxyXG4gICAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcclxuICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IHRoaXMubXVsdGlDaG9pY2UuZmlyc3RDaG9pY2UsXHJcbiAgICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IHRoaXMubXVsdGlDaG9pY2Uuc2Vjb25kQ2hvaWNlXHJcbiAgICAgICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgICAgICB0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmxlYXJuQnkgPSB0aGlzLm11bHRpQ2hvaWNlLnNlY29uZENob2ljZTtcclxuICAgICAgICAgICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgICAgICAgICAgLnNhdmVMZWFybmluZ1N0eWxlKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0pXHJcbiAgICAgICAgICAgICAgICAgIC50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZUZvcm0ubGVhcm5CeSAgPSB0aGlzLm11bHRpQ2hvaWNlLmZpcnN0Q2hvaWNlO1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgICAgICAgIC5zYXZlTGVhcm5pbmdTdHlsZSh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oY2xpZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ1lvdSBsZWFybiBiZXN0IGJ5ICcgKyB0aGlzLmxlYXJuQnkgKyAnJyxcclxuICAgICAgICAgIHRleHQ6IFwiSXMgdGhpcyBjb3JyZWN0P1wiLFxyXG4gICAgICAgICAgdHlwZTogJ3F1ZXN0aW9uJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnTm8nLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMhJ1xyXG4gICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgdGhpcy5sZWFybmluZ1N0eWxlRm9ybS5sZWFybkJ5ICA9IHRoaXMubGVhcm5CeTtcclxuICAgICAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgICAgICAgIC5zYXZlTGVhcm5pbmdTdHlsZSh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtKVxyXG4gICAgICAgICAgICAgIC50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpOyAvLyBUT0RPOiBEaXNwbGF5IGVycm9yIG1lc3NhZ2VcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ2FuY2VsZWRcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHRhbGx5UG9pbnRzKCkge1xyXG4gICAgdmFyIHNlZWluZ1BvaW50cyA9IDA7XHJcbiAgICB2YXIgaGVhcmluZ1BvaW50cyA9IDA7XHJcbiAgICB2YXIgZG9pbmdQb2ludHMgPSAwO1xyXG5cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLnNlZWluZzEpIHsgc2VlaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLnNlZWluZzIpIHsgc2VlaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLnNlZWluZzMpIHsgc2VlaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLnNlZWluZzQpIHsgc2VlaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLnNlZWluZzUpIHsgc2VlaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLnNlZWluZzYpIHsgc2VlaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLnNlZWluZzcpIHsgc2VlaW5nUG9pbnRzKys7IH1cclxuICAgIHRoaXMudG90YWxTZWVpbmdQb2ludHMgPSBzZWVpbmdQb2ludHM7XHJcbiAgICB0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLnNlZWluZyA9IHRoaXMudG90YWxTZWVpbmdQb2ludHM7XHJcblxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uaGVhcmluZzEpIHsgaGVhcmluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5oZWFyaW5nMikgeyBoZWFyaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmhlYXJpbmczKSB7IGhlYXJpbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uaGVhcmluZzQpIHsgaGVhcmluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5oZWFyaW5nNSkgeyBoZWFyaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmhlYXJpbmc2KSB7IGhlYXJpbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uaGVhcmluZzcpIHsgaGVhcmluZ1BvaW50cysrOyB9XHJcbiAgICB0aGlzLnRvdGFsSGVhcmluZ1BvaW50cyA9IGhlYXJpbmdQb2ludHM7XHJcbiAgICB0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmhlYXJpbmcgPSB0aGlzLnRvdGFsSGVhcmluZ1BvaW50cztcclxuXHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5kb2luZzEpIHsgZG9pbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uZG9pbmcyKSB7IGRvaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmRvaW5nMykgeyBkb2luZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5kb2luZzQpIHsgZG9pbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uZG9pbmc1KSB7IGRvaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmRvaW5nNikgeyBkb2luZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5kb2luZzcpIHsgZG9pbmdQb2ludHMrKzsgfVxyXG4gICAgdGhpcy50b3RhbERvaW5nUG9pbnRzID0gZG9pbmdQb2ludHM7XHJcbiAgICB0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmRvaW5nID0gdGhpcy50b3RhbERvaW5nUG9pbnRzO1xyXG5cclxuICAgIGlmICh0aGlzLnRvdGFsU2VlaW5nUG9pbnRzID4gdGhpcy50b3RhbEhlYXJpbmdQb2ludHMgJiYgdGhpcy50b3RhbFNlZWluZ1BvaW50cyA+IHRoaXMudG90YWxEb2luZ1BvaW50cykge1xyXG4gICAgICB0aGlzLm11bHRpQ2hvaWNlID0gbnVsbDtcclxuICAgICAgdGhpcy5sZWFybkJ5ID0gXCJTZWVpbmdcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy50b3RhbEhlYXJpbmdQb2ludHMgPiB0aGlzLnRvdGFsU2VlaW5nUG9pbnRzICYmIHRoaXMudG90YWxIZWFyaW5nUG9pbnRzID4gdGhpcy50b3RhbERvaW5nUG9pbnRzKSB7XHJcbiAgICAgIHRoaXMubXVsdGlDaG9pY2UgPSBudWxsO1xyXG4gICAgICB0aGlzLmxlYXJuQnkgPSBcIkhlYXJpbmdcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy50b3RhbERvaW5nUG9pbnRzID4gdGhpcy50b3RhbEhlYXJpbmdQb2ludHMgJiYgdGhpcy50b3RhbERvaW5nUG9pbnRzID4gdGhpcy50b3RhbFNlZWluZ1BvaW50cykge1xyXG4gICAgICB0aGlzLm11bHRpQ2hvaWNlID0gbnVsbDtcclxuICAgICAgdGhpcy5sZWFybkJ5ID0gXCJEb2luZ1wiO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnRvdGFsRG9pbmdQb2ludHMgPT09IHRoaXMudG90YWxTZWVpbmdQb2ludHMpIHtcclxuICAgICAgdGhpcy5sZWFybkJ5ID0gbnVsbDtcclxuICAgICAgdGhpcy5tdWx0aUNob2ljZSA9IHtcclxuICAgICAgICBmaXJzdENob2ljZTogJ0RvaW5nJyxcclxuICAgICAgICBzZWNvbmRDaG9pY2U6ICdTZWVpbmcnXHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMudG90YWxEb2luZ1BvaW50cyA9PT0gdGhpcy50b3RhbEhlYXJpbmdQb2ludHMpIHtcclxuICAgICAgdGhpcy5sZWFybkJ5ID0gbnVsbDtcclxuICAgICAgdGhpcy5tdWx0aUNob2ljZSA9IHtcclxuICAgICAgICBmaXJzdENob2ljZTogJ0RvaW5nJyxcclxuICAgICAgICBzZWNvbmRDaG9pY2U6ICdIZWFyaW5nJ1xyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnRvdGFsU2VlaW5nUG9pbnRzID09PSB0aGlzLnRvdGFsSGVhcmluZ1BvaW50cykge1xyXG4gICAgICB0aGlzLmxlYXJuQnkgPSBudWxsO1xyXG4gICAgICB0aGlzLm11bHRpQ2hvaWNlID0ge1xyXG4gICAgICAgIGZpcnN0Q2hvaWNlOiAnU2VlaW5nJyxcclxuICAgICAgICBzZWNvbmRDaG9pY2U6ICdIZWFyaW5nJ1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=
