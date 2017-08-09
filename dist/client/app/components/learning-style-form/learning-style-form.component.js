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
var LearningStyleComponent = (function () {
    function LearningStyleComponent(clientService, router, authService) {
        this.clientService = clientService;
        this.router = router;
        this.authService = authService;
        this.learningStyleForm = new learningStyleForm_1.LearningStyleForm();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9sZWFybmluZy1zdHlsZS1mb3JtL2xlYXJuaW5nLXN0eWxlLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWlEO0FBQ2pELDBDQUF5QztBQUN6QyxvRUFBbUU7QUFDbkUsZ0VBQThEO0FBQzlELGdGQUFvRTtBQVNwRTtJQVNFLGdDQUFvQixhQUE0QixFQUFVLE1BQWMsRUFBVSxXQUF3QjtRQUF0RixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4RyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxxQ0FBaUIsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFRCxrREFBaUIsR0FBakI7UUFBQSxpQkE2RUM7UUE1RUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUNBLGlCQUFpQixFQUNqQiwwQkFBMEIsRUFDMUIsU0FBUyxDQUNaLENBQUM7UUFDSixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQztnQkFDRCxLQUFLLEVBQUUsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHLEVBQUU7Z0JBQ3pHLElBQUksRUFBRSxrQkFBa0I7Z0JBQ3hCLElBQUksRUFBRSxVQUFVO2dCQUNoQixnQkFBZ0IsRUFBRSxJQUFJO2dCQUN0QixrQkFBa0IsRUFBRSxTQUFTO2dCQUM3QixpQkFBaUIsRUFBRSxNQUFNO2dCQUN6QixpQkFBaUIsRUFBRSxLQUFLO2dCQUN4Qixp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LEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUc7Z0JBQ2pCLFdBQVcsRUFBRSxRQUFRO2dCQUNyQixZQUFZLEVBQUUsU0FBUzthQUN4QixDQUFDO1FBQ0osQ0FBQztJQUVILENBQUM7SUFFRCx1Q0FBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBL0pRO1FBQVIsWUFBSyxFQUFFO2tDQUFvQixxQ0FBaUI7cUVBQUM7SUFEbkMsc0JBQXNCO1FBTmxDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFdBQVcsRUFBRSx5RUFBeUU7WUFDdEYsU0FBUyxFQUFFLENBQUMsd0VBQXdFLENBQUM7U0FDeEYsQ0FBQzt5Q0FXbUMsOEJBQWEsRUFBa0IsZUFBTSxFQUF1QixvQ0FBVztPQVQvRixzQkFBc0IsQ0FpS2xDO0lBQUQsNkJBQUM7Q0FqS0QsQUFpS0MsSUFBQTtBQWpLWSx3REFBc0IiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvbGVhcm5pbmctc3R5bGUtZm9ybS9sZWFybmluZy1zdHlsZS1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgTGVhcm5pbmdTdHlsZUZvcm0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2xlYXJuaW5nU3R5bGVGb3JtXCI7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY2xpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2xlYXJuaW5nU3R5bGVGb3JtJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9sZWFybmluZy1zdHlsZS1mb3JtL2xlYXJuaW5nLXN0eWxlLWZvcm0uY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvbGVhcm5pbmctc3R5bGUtZm9ybS9sZWFybmluZy1zdHlsZS1mb3JtLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIExlYXJuaW5nU3R5bGVDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGxlYXJuaW5nU3R5bGVGb3JtOiBMZWFybmluZ1N0eWxlRm9ybTtcclxuICBlcnJvcjogYW55O1xyXG4gIHRvdGFsU2VlaW5nUG9pbnRzOiBudW1iZXI7XHJcbiAgdG90YWxIZWFyaW5nUG9pbnRzOiBudW1iZXI7XHJcbiAgdG90YWxEb2luZ1BvaW50czogbnVtYmVyO1xyXG4gIGxlYXJuQnk6IGFueTtcclxuICBtdWx0aUNob2ljZTogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNsaWVudFNlcnZpY2U6IENsaWVudFNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLmxlYXJuaW5nU3R5bGVGb3JtID0gbmV3IExlYXJuaW5nU3R5bGVGb3JtKCk7XHJcbiAgfVxyXG5cclxuICBzYXZlTGVhcm5pbmdTdHlsZSgpIHtcclxuICAgIGlmICghdGhpcy5sZWFybkJ5ICYmICF0aGlzLm11bHRpQ2hvaWNlKSB7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgICAnSW5jb21wbGV0ZSBmb3JtJyxcclxuICAgICAgICAgICdQbGVhc2UgZmlsbCBvdXQgdGhlIGZvcm0nLFxyXG4gICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMubXVsdGlDaG9pY2UpIHtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ1lvdSBsZWFybiBiZXN0IGJ5ICcgKyB0aGlzLm11bHRpQ2hvaWNlLmZpcnN0Q2hvaWNlICsgJyBhbmQgJyArIHRoaXMubXVsdGlDaG9pY2Uuc2Vjb25kQ2hvaWNlICsgJycsXHJcbiAgICAgICAgICB0ZXh0OiBcIklzIHRoaXMgY29ycmVjdD9cIixcclxuICAgICAgICAgIHR5cGU6ICdxdWVzdGlvbicsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMhJ1xyXG4gICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdUaWUhJyxcclxuICAgICAgICAgICAgICB0ZXh0OiBcIlBsZWFzZSBwaWNrIG9uZSB0aGF0IHN1aXRzIHlvdSBiZXR0ZXJcIixcclxuICAgICAgICAgICAgICB0eXBlOiAnaW5mbycsXHJcbiAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgICAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZSxcclxuICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiB0aGlzLm11bHRpQ2hvaWNlLmZpcnN0Q2hvaWNlLFxyXG4gICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiB0aGlzLm11bHRpQ2hvaWNlLnNlY29uZENob2ljZVxyXG4gICAgICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5sZWFybmluZ1N0eWxlRm9ybS5sZWFybkJ5ID0gdGhpcy5tdWx0aUNob2ljZS5zZWNvbmRDaG9pY2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAgIC5zYXZlTGVhcm5pbmdTdHlsZSh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtKVxyXG4gICAgICAgICAgICAgICAgICAudGhlbihjbGllbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmxlYXJuQnkgID0gdGhpcy5tdWx0aUNob2ljZS5maXJzdENob2ljZTtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAuc2F2ZUxlYXJuaW5nU3R5bGUodGhpcy5sZWFybmluZ1N0eWxlRm9ybSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGNsaWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZGFzaGJvYXJkJ10pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcblxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdZb3UgbGVhcm4gYmVzdCBieSAnICsgdGhpcy5sZWFybkJ5ICsgJycsXHJcbiAgICAgICAgICB0ZXh0OiBcIklzIHRoaXMgY29ycmVjdD9cIixcclxuICAgICAgICAgIHR5cGU6ICdxdWVzdGlvbicsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ05vJyxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzISdcclxuICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZUZvcm0ubGVhcm5CeSAgPSB0aGlzLmxlYXJuQnk7XHJcbiAgICAgICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgICAgICAuc2F2ZUxlYXJuaW5nU3R5bGUodGhpcy5sZWFybmluZ1N0eWxlRm9ybSlcclxuICAgICAgICAgICAgICAudGhlbihjbGllbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTsgLy8gVE9ETzogRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNhbmNlbGVkXCIpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICB0YWxseVBvaW50cygpIHtcclxuICAgIHZhciBzZWVpbmdQb2ludHMgPSAwO1xyXG4gICAgdmFyIGhlYXJpbmdQb2ludHMgPSAwO1xyXG4gICAgdmFyIGRvaW5nUG9pbnRzID0gMDtcclxuXHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5zZWVpbmcxKSB7IHNlZWluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5zZWVpbmcyKSB7IHNlZWluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5zZWVpbmczKSB7IHNlZWluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5zZWVpbmc0KSB7IHNlZWluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5zZWVpbmc1KSB7IHNlZWluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5zZWVpbmc2KSB7IHNlZWluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5zZWVpbmc3KSB7IHNlZWluZ1BvaW50cysrOyB9XHJcbiAgICB0aGlzLnRvdGFsU2VlaW5nUG9pbnRzID0gc2VlaW5nUG9pbnRzO1xyXG4gICAgdGhpcy5sZWFybmluZ1N0eWxlRm9ybS5zZWVpbmcgPSB0aGlzLnRvdGFsU2VlaW5nUG9pbnRzO1xyXG5cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmhlYXJpbmcxKSB7IGhlYXJpbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uaGVhcmluZzIpIHsgaGVhcmluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5oZWFyaW5nMykgeyBoZWFyaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmhlYXJpbmc0KSB7IGhlYXJpbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uaGVhcmluZzUpIHsgaGVhcmluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5oZWFyaW5nNikgeyBoZWFyaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmhlYXJpbmc3KSB7IGhlYXJpbmdQb2ludHMrKzsgfVxyXG4gICAgdGhpcy50b3RhbEhlYXJpbmdQb2ludHMgPSBoZWFyaW5nUG9pbnRzO1xyXG4gICAgdGhpcy5sZWFybmluZ1N0eWxlRm9ybS5oZWFyaW5nID0gdGhpcy50b3RhbEhlYXJpbmdQb2ludHM7XHJcblxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uZG9pbmcxKSB7IGRvaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmRvaW5nMikgeyBkb2luZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5kb2luZzMpIHsgZG9pbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uZG9pbmc0KSB7IGRvaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmRvaW5nNSkgeyBkb2luZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5kb2luZzYpIHsgZG9pbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uZG9pbmc3KSB7IGRvaW5nUG9pbnRzKys7IH1cclxuICAgIHRoaXMudG90YWxEb2luZ1BvaW50cyA9IGRvaW5nUG9pbnRzO1xyXG4gICAgdGhpcy5sZWFybmluZ1N0eWxlRm9ybS5kb2luZyA9IHRoaXMudG90YWxEb2luZ1BvaW50cztcclxuXHJcbiAgICBpZiAodGhpcy50b3RhbFNlZWluZ1BvaW50cyA+IHRoaXMudG90YWxIZWFyaW5nUG9pbnRzICYmIHRoaXMudG90YWxTZWVpbmdQb2ludHMgPiB0aGlzLnRvdGFsRG9pbmdQb2ludHMpIHtcclxuICAgICAgdGhpcy5tdWx0aUNob2ljZSA9IG51bGw7XHJcbiAgICAgIHRoaXMubGVhcm5CeSA9IFwiU2VlaW5nXCI7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMudG90YWxIZWFyaW5nUG9pbnRzID4gdGhpcy50b3RhbFNlZWluZ1BvaW50cyAmJiB0aGlzLnRvdGFsSGVhcmluZ1BvaW50cyA+IHRoaXMudG90YWxEb2luZ1BvaW50cykge1xyXG4gICAgICB0aGlzLm11bHRpQ2hvaWNlID0gbnVsbDtcclxuICAgICAgdGhpcy5sZWFybkJ5ID0gXCJIZWFyaW5nXCI7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMudG90YWxEb2luZ1BvaW50cyA+IHRoaXMudG90YWxIZWFyaW5nUG9pbnRzICYmIHRoaXMudG90YWxEb2luZ1BvaW50cyA+IHRoaXMudG90YWxTZWVpbmdQb2ludHMpIHtcclxuICAgICAgdGhpcy5tdWx0aUNob2ljZSA9IG51bGw7XHJcbiAgICAgIHRoaXMubGVhcm5CeSA9IFwiRG9pbmdcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy50b3RhbERvaW5nUG9pbnRzID09PSB0aGlzLnRvdGFsU2VlaW5nUG9pbnRzKSB7XHJcbiAgICAgIHRoaXMubGVhcm5CeSA9IG51bGw7XHJcbiAgICAgIHRoaXMubXVsdGlDaG9pY2UgPSB7XHJcbiAgICAgICAgZmlyc3RDaG9pY2U6ICdEb2luZycsXHJcbiAgICAgICAgc2Vjb25kQ2hvaWNlOiAnU2VlaW5nJ1xyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnRvdGFsRG9pbmdQb2ludHMgPT09IHRoaXMudG90YWxIZWFyaW5nUG9pbnRzKSB7XHJcbiAgICAgIHRoaXMubGVhcm5CeSA9IG51bGw7XHJcbiAgICAgIHRoaXMubXVsdGlDaG9pY2UgPSB7XHJcbiAgICAgICAgZmlyc3RDaG9pY2U6ICdEb2luZycsXHJcbiAgICAgICAgc2Vjb25kQ2hvaWNlOiAnSGVhcmluZydcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy50b3RhbFNlZWluZ1BvaW50cyA9PT0gdGhpcy50b3RhbEhlYXJpbmdQb2ludHMpIHtcclxuICAgICAgdGhpcy5sZWFybkJ5ID0gbnVsbDtcclxuICAgICAgdGhpcy5tdWx0aUNob2ljZSA9IHtcclxuICAgICAgICBmaXJzdENob2ljZTogJ1NlZWluZycsXHJcbiAgICAgICAgc2Vjb25kQ2hvaWNlOiAnSGVhcmluZydcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
