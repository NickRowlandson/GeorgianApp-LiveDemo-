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
        var _this = this;
        this.clientService = clientService;
        this.router = router;
        this.authService = authService;
        this.submitVisible = true;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.learningStyleForm = new learningStyleForm_1.LearningStyleForm();
        if (this.currentUser.userType !== "Client") {
            swal('Read Only', "You are logged in as '" + this.currentUser.userType + "'. Only clients can submit this form.", 'warning');
        }
        else {
            swal({
                title: 'Loading...'
            });
            swal.showLoading();
            this.clientService
                .getClient(this.currentUser.userID)
                .then(function (result) {
                if (!result.client[0].learningStyle) {
                    _this.clientService
                        .getLearningStyleById()
                        .then(function (result) {
                        _this.submitVisible = false;
                        swal.close();
                        swal('Read Only', "You have already submitted this form.", 'warning');
                    })
                        .catch(function (err) {
                        console.log(err);
                    });
                }
                else {
                    swal.close();
                }
            })
                .catch(function (err) {
                console.log(err);
            });
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
            }).then(function (isConfirm) {
                if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                    console.log(isConfirm.dismiss);
                }
                else if (isConfirm) {
                    _this.learningStyleForm.learnBy = _this.learnBy;
                    _this.clientService
                        .saveLearningStyle(_this.learningStyleForm)
                        .then(function (client) {
                        _this.router.navigate(['/dashboard']);
                    })
                        .catch(function (error) { return _this.error = error; }); // TODO: Display error message
                }
            }).catch(function (error) {
                console.log(error);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9sZWFybmluZy1zdHlsZS1mb3JtL2xlYXJuaW5nLXN0eWxlLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWlEO0FBQ2pELDBDQUF5QztBQUN6QyxvRUFBbUU7QUFDbkUsZ0VBQThEO0FBQzlELGdGQUFvRTtBQVNwRTtJQVdFLGdDQUFvQixhQUE0QixFQUFVLE1BQWMsRUFBVSxXQUF3QjtRQUExRyxpQkF5Q0M7UUF6Q21CLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBRjFHLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBRzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUkscUNBQWlCLEVBQUUsQ0FBQztRQUVqRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUMxQyxJQUFJLENBQ0EsV0FBVyxFQUNYLHdCQUF3QixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLHVDQUF1QyxFQUM5RixTQUFTLENBQ1osQ0FBQztTQUNIO2FBQU07WUFDTCxJQUFJLENBQUM7Z0JBQ0gsS0FBSyxFQUFFLFlBQVk7YUFDcEIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxhQUFhO2lCQUNqQixTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7aUJBQ2xDLElBQUksQ0FBQyxVQUFBLE1BQU07Z0JBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxF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LHNCQUFzQixDQThNbEM7SUFBRCw2QkFBQztDQTlNRCxBQThNQyxJQUFBO0FBOU1ZLHdEQUFzQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9sZWFybmluZy1zdHlsZS1mb3JtL2xlYXJuaW5nLXN0eWxlLWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBMZWFybmluZ1N0eWxlRm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvbGVhcm5pbmdTdHlsZUZvcm1cIjtcclxuaW1wb3J0IHsgQ2xpZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jbGllbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbGVhcm5pbmdTdHlsZUZvcm0nLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2xlYXJuaW5nLXN0eWxlLWZvcm0vbGVhcm5pbmctc3R5bGUtZm9ybS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9sZWFybmluZy1zdHlsZS1mb3JtL2xlYXJuaW5nLXN0eWxlLWZvcm0uY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTGVhcm5pbmdTdHlsZUNvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgbGVhcm5pbmdTdHlsZUZvcm06IExlYXJuaW5nU3R5bGVGb3JtO1xyXG4gIGVycm9yOiBhbnk7XHJcbiAgdG90YWxTZWVpbmdQb2ludHM6IG51bWJlcjtcclxuICB0b3RhbEhlYXJpbmdQb2ludHM6IG51bWJlcjtcclxuICB0b3RhbERvaW5nUG9pbnRzOiBudW1iZXI7XHJcbiAgbGVhcm5CeTogYW55O1xyXG4gIG11bHRpQ2hvaWNlOiBhbnk7XHJcbiAgY3VycmVudFVzZXI6IGFueTtcclxuICBzdWJtaXRWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjbGllbnRTZXJ2aWNlOiBDbGllbnRTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xyXG4gICAgdGhpcy5jdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgdGhpcy5sZWFybmluZ1N0eWxlRm9ybSA9IG5ldyBMZWFybmluZ1N0eWxlRm9ybSgpO1xyXG5cclxuICAgIGlmICh0aGlzLmN1cnJlbnRVc2VyLnVzZXJUeXBlICE9PSBcIkNsaWVudFwiKSB7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgICAnUmVhZCBPbmx5JyxcclxuICAgICAgICAgIFwiWW91IGFyZSBsb2dnZWQgaW4gYXMgJ1wiICsgdGhpcy5jdXJyZW50VXNlci51c2VyVHlwZSArIFwiJy4gT25seSBjbGllbnRzIGNhbiBzdWJtaXQgdGhpcyBmb3JtLlwiLFxyXG4gICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICB0aXRsZTogJ0xvYWRpbmcuLi4nXHJcbiAgICAgIH0pO1xyXG4gICAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAuZ2V0Q2xpZW50KHRoaXMuY3VycmVudFVzZXIudXNlcklEKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICghcmVzdWx0LmNsaWVudFswXS5sZWFybmluZ1N0eWxlKSB7XHJcbiAgICAgICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgIC5nZXRMZWFybmluZ1N0eWxlQnlJZCgpXHJcbiAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdFZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgJ1JlYWQgT25seScsXHJcbiAgICAgICAgICAgICAgICBcIllvdSBoYXZlIGFscmVhZHkgc3VibWl0dGVkIHRoaXMgZm9ybS5cIixcclxuICAgICAgICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2F2ZUxlYXJuaW5nU3R5bGUoKSB7XHJcbiAgICBpZiAoIXRoaXMubGVhcm5CeSAmJiAhdGhpcy5tdWx0aUNob2ljZSkge1xyXG4gICAgICBzd2FsKFxyXG4gICAgICAgICAgJ0luY29tcGxldGUgZm9ybScsXHJcbiAgICAgICAgICAnUGxlYXNlIGZpbGwgb3V0IHRoZSBmb3JtJyxcclxuICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLm11bHRpQ2hvaWNlKSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdZb3UgbGVhcm4gYmVzdCBieSAnICsgdGhpcy5tdWx0aUNob2ljZS5maXJzdENob2ljZSArICcgYW5kICcgKyB0aGlzLm11bHRpQ2hvaWNlLnNlY29uZENob2ljZSArICcnLFxyXG4gICAgICAgICAgdGV4dDogXCJJcyB0aGlzIGNvcnJlY3Q/XCIsXHJcbiAgICAgICAgICB0eXBlOiAncXVlc3Rpb24nLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzISdcclxuICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdUaWUhJyxcclxuICAgICAgICAgICAgICB0ZXh0OiBcIlBsZWFzZSBwaWNrIG9uZSB0aGF0IHN1aXRzIHlvdSBiZXR0ZXJcIixcclxuICAgICAgICAgICAgICB0eXBlOiAnaW5mbycsXHJcbiAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgICAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZSxcclxuICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiB0aGlzLm11bHRpQ2hvaWNlLmZpcnN0Q2hvaWNlLFxyXG4gICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiB0aGlzLm11bHRpQ2hvaWNlLnNlY29uZENob2ljZVxyXG4gICAgICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5sZWFybmluZ1N0eWxlRm9ybS5sZWFybkJ5ID0gdGhpcy5tdWx0aUNob2ljZS5zZWNvbmRDaG9pY2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAgIC5zYXZlTGVhcm5pbmdTdHlsZSh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtKVxyXG4gICAgICAgICAgICAgICAgICAudGhlbihjbGllbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmxlYXJuQnkgID0gdGhpcy5tdWx0aUNob2ljZS5maXJzdENob2ljZTtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAuc2F2ZUxlYXJuaW5nU3R5bGUodGhpcy5sZWFybmluZ1N0eWxlRm9ybSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdZb3UgbGVhcm4gYmVzdCBieSAnICsgdGhpcy5sZWFybkJ5ICsgJycsXHJcbiAgICAgICAgICB0ZXh0OiBcIklzIHRoaXMgY29ycmVjdD9cIixcclxuICAgICAgICAgIHR5cGU6ICdxdWVzdGlvbicsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ05vJyxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzISdcclxuICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgdGhpcy5sZWFybmluZ1N0eWxlRm9ybS5sZWFybkJ5ICA9IHRoaXMubGVhcm5CeTtcclxuICAgICAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgICAgICAgIC5zYXZlTGVhcm5pbmdTdHlsZSh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtKVxyXG4gICAgICAgICAgICAgIC50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpOyAvLyBUT0RPOiBEaXNwbGF5IGVycm9yIG1lc3NhZ2VcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHRhbGx5UG9pbnRzKCkge1xyXG4gICAgdmFyIHNlZWluZ1BvaW50cyA9IDA7XHJcbiAgICB2YXIgaGVhcmluZ1BvaW50cyA9IDA7XHJcbiAgICB2YXIgZG9pbmdQb2ludHMgPSAwO1xyXG5cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLnNlZWluZzEpIHsgc2VlaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLnNlZWluZzIpIHsgc2VlaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLnNlZWluZzMpIHsgc2VlaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLnNlZWluZzQpIHsgc2VlaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLnNlZWluZzUpIHsgc2VlaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLnNlZWluZzYpIHsgc2VlaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLnNlZWluZzcpIHsgc2VlaW5nUG9pbnRzKys7IH1cclxuICAgIHRoaXMudG90YWxTZWVpbmdQb2ludHMgPSBzZWVpbmdQb2ludHM7XHJcbiAgICB0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLnNlZWluZyA9IHRoaXMudG90YWxTZWVpbmdQb2ludHM7XHJcblxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uaGVhcmluZzEpIHsgaGVhcmluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5oZWFyaW5nMikgeyBoZWFyaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmhlYXJpbmczKSB7IGhlYXJpbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uaGVhcmluZzQpIHsgaGVhcmluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5oZWFyaW5nNSkgeyBoZWFyaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmhlYXJpbmc2KSB7IGhlYXJpbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uaGVhcmluZzcpIHsgaGVhcmluZ1BvaW50cysrOyB9XHJcbiAgICB0aGlzLnRvdGFsSGVhcmluZ1BvaW50cyA9IGhlYXJpbmdQb2ludHM7XHJcbiAgICB0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmhlYXJpbmcgPSB0aGlzLnRvdGFsSGVhcmluZ1BvaW50cztcclxuXHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5kb2luZzEpIHsgZG9pbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uZG9pbmcyKSB7IGRvaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmRvaW5nMykgeyBkb2luZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5kb2luZzQpIHsgZG9pbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uZG9pbmc1KSB7IGRvaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmRvaW5nNikgeyBkb2luZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5kb2luZzcpIHsgZG9pbmdQb2ludHMrKzsgfVxyXG4gICAgdGhpcy50b3RhbERvaW5nUG9pbnRzID0gZG9pbmdQb2ludHM7XHJcbiAgICB0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmRvaW5nID0gdGhpcy50b3RhbERvaW5nUG9pbnRzO1xyXG5cclxuICAgIGlmICh0aGlzLnRvdGFsU2VlaW5nUG9pbnRzID4gdGhpcy50b3RhbEhlYXJpbmdQb2ludHMgJiYgdGhpcy50b3RhbFNlZWluZ1BvaW50cyA+IHRoaXMudG90YWxEb2luZ1BvaW50cykge1xyXG4gICAgICB0aGlzLm11bHRpQ2hvaWNlID0gbnVsbDtcclxuICAgICAgdGhpcy5sZWFybkJ5ID0gXCJTZWVpbmdcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy50b3RhbEhlYXJpbmdQb2ludHMgPiB0aGlzLnRvdGFsU2VlaW5nUG9pbnRzICYmIHRoaXMudG90YWxIZWFyaW5nUG9pbnRzID4gdGhpcy50b3RhbERvaW5nUG9pbnRzKSB7XHJcbiAgICAgIHRoaXMubXVsdGlDaG9pY2UgPSBudWxsO1xyXG4gICAgICB0aGlzLmxlYXJuQnkgPSBcIkhlYXJpbmdcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy50b3RhbERvaW5nUG9pbnRzID4gdGhpcy50b3RhbEhlYXJpbmdQb2ludHMgJiYgdGhpcy50b3RhbERvaW5nUG9pbnRzID4gdGhpcy50b3RhbFNlZWluZ1BvaW50cykge1xyXG4gICAgICB0aGlzLm11bHRpQ2hvaWNlID0gbnVsbDtcclxuICAgICAgdGhpcy5sZWFybkJ5ID0gXCJEb2luZ1wiO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnRvdGFsRG9pbmdQb2ludHMgPT09IHRoaXMudG90YWxTZWVpbmdQb2ludHMpIHtcclxuICAgICAgdGhpcy5sZWFybkJ5ID0gbnVsbDtcclxuICAgICAgdGhpcy5tdWx0aUNob2ljZSA9IHtcclxuICAgICAgICBmaXJzdENob2ljZTogJ0RvaW5nJyxcclxuICAgICAgICBzZWNvbmRDaG9pY2U6ICdTZWVpbmcnXHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMudG90YWxEb2luZ1BvaW50cyA9PT0gdGhpcy50b3RhbEhlYXJpbmdQb2ludHMpIHtcclxuICAgICAgdGhpcy5sZWFybkJ5ID0gbnVsbDtcclxuICAgICAgdGhpcy5tdWx0aUNob2ljZSA9IHtcclxuICAgICAgICBmaXJzdENob2ljZTogJ0RvaW5nJyxcclxuICAgICAgICBzZWNvbmRDaG9pY2U6ICdIZWFyaW5nJ1xyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnRvdGFsU2VlaW5nUG9pbnRzID09PSB0aGlzLnRvdGFsSGVhcmluZ1BvaW50cykge1xyXG4gICAgICB0aGlzLmxlYXJuQnkgPSBudWxsO1xyXG4gICAgICB0aGlzLm11bHRpQ2hvaWNlID0ge1xyXG4gICAgICAgIGZpcnN0Q2hvaWNlOiAnU2VlaW5nJyxcclxuICAgICAgICBzZWNvbmRDaG9pY2U6ICdIZWFyaW5nJ1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=
