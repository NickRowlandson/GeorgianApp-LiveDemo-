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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9sZWFybmluZy1zdHlsZS1mb3JtL2xlYXJuaW5nLXN0eWxlLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWlEO0FBQ2pELDBDQUF5QztBQUN6QyxvRUFBbUU7QUFDbkUsZ0VBQThEO0FBQzlELGdGQUFvRTtBQVNwRTtJQVVFLGdDQUFvQixhQUE0QixFQUFVLE1BQWMsRUFBVSxXQUF3QjtRQUF0RixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4RyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLHFDQUFpQixFQUFFLENBQUM7UUFFakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQ0EsV0FBVyxFQUNYLHdCQUF3QixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLHVDQUF1QyxFQUM5RixTQUFTLENBQ1osQ0FBQztRQUNKLENBQUM7SUFDSCxDQUFDO0lBRUQsa0RBQWlCLEdBQWpCO1FBQUEsaUJBaUZDO1FBaEZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FDQSxpQkFBaUIsRUFDakIsMEJBQTBCLEVBQzFCLFNBQVMsQ0FDWixDQUFDO1FBQ0osQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUM1QixJ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QyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQTdLUTtRQUFSLFlBQUssRUFBRTtrQ0FBb0IscUNBQWlCO3FFQUFDO0lBRG5DLHNCQUFzQjtRQU5sQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixXQUFXLEVBQUUseUVBQXlFO1lBQ3RGLFNBQVMsRUFBRSxDQUFDLHdFQUF3RSxDQUFDO1NBQ3hGLENBQUM7eUNBWW1DLDhCQUFhLEVBQWtCLGVBQU0sRUFBdUIsb0NBQVc7T0FWL0Ysc0JBQXNCLENBK0tsQztJQUFELDZCQUFDO0NBL0tELEFBK0tDLElBQUE7QUEvS1ksd0RBQXNCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL2xlYXJuaW5nLXN0eWxlLWZvcm0vbGVhcm5pbmctc3R5bGUtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IExlYXJuaW5nU3R5bGVGb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9sZWFybmluZ1N0eWxlRm9ybVwiO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdsZWFybmluZ1N0eWxlRm9ybScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvbGVhcm5pbmctc3R5bGUtZm9ybS9sZWFybmluZy1zdHlsZS1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL2xlYXJuaW5nLXN0eWxlLWZvcm0vbGVhcm5pbmctc3R5bGUtZm9ybS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBMZWFybmluZ1N0eWxlQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBsZWFybmluZ1N0eWxlRm9ybTogTGVhcm5pbmdTdHlsZUZvcm07XHJcbiAgZXJyb3I6IGFueTtcclxuICB0b3RhbFNlZWluZ1BvaW50czogbnVtYmVyO1xyXG4gIHRvdGFsSGVhcmluZ1BvaW50czogbnVtYmVyO1xyXG4gIHRvdGFsRG9pbmdQb2ludHM6IG51bWJlcjtcclxuICBsZWFybkJ5OiBhbnk7XHJcbiAgbXVsdGlDaG9pY2U6IGFueTtcclxuICBjdXJyZW50VXNlcjogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNsaWVudFNlcnZpY2U6IENsaWVudFNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcbiAgICB0aGlzLmxlYXJuaW5nU3R5bGVGb3JtID0gbmV3IExlYXJuaW5nU3R5bGVGb3JtKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuY3VycmVudFVzZXIudXNlclR5cGUgIT09IFwiQ2xpZW50XCIpIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICAgICdSZWFkIE9ubHknLFxyXG4gICAgICAgICAgXCJZb3UgYXJlIGxvZ2dlZCBpbiBhcyAnXCIgKyB0aGlzLmN1cnJlbnRVc2VyLnVzZXJUeXBlICsgXCInLiBPbmx5IGNsaWVudHMgY2FuIHN1Ym1pdCB0aGlzIGZvcm0uXCIsXHJcbiAgICAgICAgICAnd2FybmluZydcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNhdmVMZWFybmluZ1N0eWxlKCkge1xyXG4gICAgaWYgKCF0aGlzLmxlYXJuQnkgJiYgIXRoaXMubXVsdGlDaG9pY2UpIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICAgICdJbmNvbXBsZXRlIGZvcm0nLFxyXG4gICAgICAgICAgJ1BsZWFzZSBmaWxsIG91dCB0aGUgZm9ybScsXHJcbiAgICAgICAgICAnd2FybmluZydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5tdWx0aUNob2ljZSkge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnWW91IGxlYXJuIGJlc3QgYnkgJyArIHRoaXMubXVsdGlDaG9pY2UuZmlyc3RDaG9pY2UgKyAnIGFuZCAnICsgdGhpcy5tdWx0aUNob2ljZS5zZWNvbmRDaG9pY2UgKyAnJyxcclxuICAgICAgICAgIHRleHQ6IFwiSXMgdGhpcyBjb3JyZWN0P1wiLFxyXG4gICAgICAgICAgdHlwZTogJ3F1ZXN0aW9uJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2UsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcyEnXHJcbiAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICBpZiAoaXNDb25maXJtLmRpc21pc3MgPT09IFwiY2FuY2VsXCIgfHwgaXNDb25maXJtLmRpc21pc3MgPT09IFwib3ZlcmxheVwiKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhpc0NvbmZpcm0uZGlzbWlzcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnVGllIScsXHJcbiAgICAgICAgICAgICAgdGV4dDogXCJQbGVhc2UgcGljayBvbmUgdGhhdCBzdWl0cyB5b3UgYmV0dGVyXCIsXHJcbiAgICAgICAgICAgICAgdHlwZTogJ2luZm8nLFxyXG4gICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogdGhpcy5tdWx0aUNob2ljZS5maXJzdENob2ljZSxcclxuICAgICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogdGhpcy5tdWx0aUNob2ljZS5zZWNvbmRDaG9pY2VcclxuICAgICAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICAgICAgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZUZvcm0ubGVhcm5CeSA9IHRoaXMubXVsdGlDaG9pY2Uuc2Vjb25kQ2hvaWNlO1xyXG4gICAgICAgICAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgICAgICAgICAgICAuc2F2ZUxlYXJuaW5nU3R5bGUodGhpcy5sZWFybmluZ1N0eWxlRm9ybSlcclxuICAgICAgICAgICAgICAgICAgLnRoZW4oY2xpZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKTtcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sZWFybmluZ1N0eWxlRm9ybS5sZWFybkJ5ICA9IHRoaXMubXVsdGlDaG9pY2UuZmlyc3RDaG9pY2U7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgICAgICAgICAgLnNhdmVMZWFybmluZ1N0eWxlKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihjbGllbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnWW91IGxlYXJuIGJlc3QgYnkgJyArIHRoaXMubGVhcm5CeSArICcnLFxyXG4gICAgICAgICAgdGV4dDogXCJJcyB0aGlzIGNvcnJlY3Q/XCIsXHJcbiAgICAgICAgICB0eXBlOiAncXVlc3Rpb24nLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdObycsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcyEnXHJcbiAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICBpZiAoaXNDb25maXJtLmRpc21pc3MgPT09IFwiY2FuY2VsXCIgfHwgaXNDb25maXJtLmRpc21pc3MgPT09IFwib3ZlcmxheVwiKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhpc0NvbmZpcm0uZGlzbWlzcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0NvbmZpcm0pIHtcclxuICAgICAgICAgIHRoaXMubGVhcm5pbmdTdHlsZUZvcm0ubGVhcm5CeSAgPSB0aGlzLmxlYXJuQnk7XHJcbiAgICAgICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgICAgICAuc2F2ZUxlYXJuaW5nU3R5bGUodGhpcy5sZWFybmluZ1N0eWxlRm9ybSlcclxuICAgICAgICAgICAgICAudGhlbihjbGllbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTsgLy8gVE9ETzogRGlzcGxheSBlcnJvciBtZXNzYWdlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICB0YWxseVBvaW50cygpIHtcclxuICAgIHZhciBzZWVpbmdQb2ludHMgPSAwO1xyXG4gICAgdmFyIGhlYXJpbmdQb2ludHMgPSAwO1xyXG4gICAgdmFyIGRvaW5nUG9pbnRzID0gMDtcclxuXHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5zZWVpbmcxKSB7IHNlZWluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5zZWVpbmcyKSB7IHNlZWluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5zZWVpbmczKSB7IHNlZWluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5zZWVpbmc0KSB7IHNlZWluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5zZWVpbmc1KSB7IHNlZWluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5zZWVpbmc2KSB7IHNlZWluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5zZWVpbmc3KSB7IHNlZWluZ1BvaW50cysrOyB9XHJcbiAgICB0aGlzLnRvdGFsU2VlaW5nUG9pbnRzID0gc2VlaW5nUG9pbnRzO1xyXG4gICAgdGhpcy5sZWFybmluZ1N0eWxlRm9ybS5zZWVpbmcgPSB0aGlzLnRvdGFsU2VlaW5nUG9pbnRzO1xyXG5cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmhlYXJpbmcxKSB7IGhlYXJpbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uaGVhcmluZzIpIHsgaGVhcmluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5oZWFyaW5nMykgeyBoZWFyaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmhlYXJpbmc0KSB7IGhlYXJpbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uaGVhcmluZzUpIHsgaGVhcmluZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5oZWFyaW5nNikgeyBoZWFyaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmhlYXJpbmc3KSB7IGhlYXJpbmdQb2ludHMrKzsgfVxyXG4gICAgdGhpcy50b3RhbEhlYXJpbmdQb2ludHMgPSBoZWFyaW5nUG9pbnRzO1xyXG4gICAgdGhpcy5sZWFybmluZ1N0eWxlRm9ybS5oZWFyaW5nID0gdGhpcy50b3RhbEhlYXJpbmdQb2ludHM7XHJcblxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uZG9pbmcxKSB7IGRvaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmRvaW5nMikgeyBkb2luZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5kb2luZzMpIHsgZG9pbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uZG9pbmc0KSB7IGRvaW5nUG9pbnRzKys7IH1cclxuICAgIGlmICh0aGlzLmxlYXJuaW5nU3R5bGVGb3JtLmRvaW5nNSkgeyBkb2luZ1BvaW50cysrOyB9XHJcbiAgICBpZiAodGhpcy5sZWFybmluZ1N0eWxlRm9ybS5kb2luZzYpIHsgZG9pbmdQb2ludHMrKzsgfVxyXG4gICAgaWYgKHRoaXMubGVhcm5pbmdTdHlsZUZvcm0uZG9pbmc3KSB7IGRvaW5nUG9pbnRzKys7IH1cclxuICAgIHRoaXMudG90YWxEb2luZ1BvaW50cyA9IGRvaW5nUG9pbnRzO1xyXG4gICAgdGhpcy5sZWFybmluZ1N0eWxlRm9ybS5kb2luZyA9IHRoaXMudG90YWxEb2luZ1BvaW50cztcclxuXHJcbiAgICBpZiAodGhpcy50b3RhbFNlZWluZ1BvaW50cyA+IHRoaXMudG90YWxIZWFyaW5nUG9pbnRzICYmIHRoaXMudG90YWxTZWVpbmdQb2ludHMgPiB0aGlzLnRvdGFsRG9pbmdQb2ludHMpIHtcclxuICAgICAgdGhpcy5tdWx0aUNob2ljZSA9IG51bGw7XHJcbiAgICAgIHRoaXMubGVhcm5CeSA9IFwiU2VlaW5nXCI7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMudG90YWxIZWFyaW5nUG9pbnRzID4gdGhpcy50b3RhbFNlZWluZ1BvaW50cyAmJiB0aGlzLnRvdGFsSGVhcmluZ1BvaW50cyA+IHRoaXMudG90YWxEb2luZ1BvaW50cykge1xyXG4gICAgICB0aGlzLm11bHRpQ2hvaWNlID0gbnVsbDtcclxuICAgICAgdGhpcy5sZWFybkJ5ID0gXCJIZWFyaW5nXCI7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMudG90YWxEb2luZ1BvaW50cyA+IHRoaXMudG90YWxIZWFyaW5nUG9pbnRzICYmIHRoaXMudG90YWxEb2luZ1BvaW50cyA+IHRoaXMudG90YWxTZWVpbmdQb2ludHMpIHtcclxuICAgICAgdGhpcy5tdWx0aUNob2ljZSA9IG51bGw7XHJcbiAgICAgIHRoaXMubGVhcm5CeSA9IFwiRG9pbmdcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy50b3RhbERvaW5nUG9pbnRzID09PSB0aGlzLnRvdGFsU2VlaW5nUG9pbnRzKSB7XHJcbiAgICAgIHRoaXMubGVhcm5CeSA9IG51bGw7XHJcbiAgICAgIHRoaXMubXVsdGlDaG9pY2UgPSB7XHJcbiAgICAgICAgZmlyc3RDaG9pY2U6ICdEb2luZycsXHJcbiAgICAgICAgc2Vjb25kQ2hvaWNlOiAnU2VlaW5nJ1xyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnRvdGFsRG9pbmdQb2ludHMgPT09IHRoaXMudG90YWxIZWFyaW5nUG9pbnRzKSB7XHJcbiAgICAgIHRoaXMubGVhcm5CeSA9IG51bGw7XHJcbiAgICAgIHRoaXMubXVsdGlDaG9pY2UgPSB7XHJcbiAgICAgICAgZmlyc3RDaG9pY2U6ICdEb2luZycsXHJcbiAgICAgICAgc2Vjb25kQ2hvaWNlOiAnSGVhcmluZydcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy50b3RhbFNlZWluZ1BvaW50cyA9PT0gdGhpcy50b3RhbEhlYXJpbmdQb2ludHMpIHtcclxuICAgICAgdGhpcy5sZWFybkJ5ID0gbnVsbDtcclxuICAgICAgdGhpcy5tdWx0aUNob2ljZSA9IHtcclxuICAgICAgICBmaXJzdENob2ljZTogJ1NlZWluZycsXHJcbiAgICAgICAgc2Vjb25kQ2hvaWNlOiAnSGVhcmluZydcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
