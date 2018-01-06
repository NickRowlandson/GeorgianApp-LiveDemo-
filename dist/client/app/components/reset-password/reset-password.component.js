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
var authentication_service_1 = require("../../services/authentication.service");
var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.password1 = "";
        this.password2 = "";
        this.showSubmit = false;
        this.passLength = false;
        this.capital = false;
        this.weakPass = false;
        this.illegalCharacters = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
        }
        else {
        }
    }
    ResetPasswordComponent.prototype.inputChange = function () {
        var capitalCount = 0;
        for (var i = 0; i < this.password1.length; i++) {
            if (/[A-Z]/.test(this.password1.charAt(i))) {
                capitalCount++;
            }
        }
        if (/^[a-zA-Z0-9- ]*$/.test(this.password1) === false) {
            this.illegalCharacters = true;
        }
        else {
            this.illegalCharacters = false;
        }
        if (this.password1.length >= 8 && this.password1.length <= 25) {
            this.passLength = true;
        }
        else if (this.password1.length > 25) {
            this.passLength = false;
        }
        else {
            this.passLength = false;
        }
        if (this.password1.length < 10 && this.password1.length >= 8 && capitalCount < 2 && capitalCount !== 0) {
            this.weakPass = true;
        }
        else {
            this.weakPass = false;
        }
        if (capitalCount >= 1) {
            this.capital = true;
        }
        else {
            this.capital = false;
        }
        if (this.password1 === this.password2 && this.passLength && this.capital) {
            this.showSubmit = true;
        }
        else {
            this.showSubmit = false;
        }
    };
    ResetPasswordComponent.prototype.resetPassword = function () {
        var _this = this;
        this.authService.resetPassword(this.currentUser.userID, this.password1)
            .then(function (result) {
            if (result) {
                _this.router.navigate(['/login']);
            }
            else {
                console.log("There was an error with your request...");
            }
        }).catch(function (error) {
            console.log(error);
        });
    };
    ResetPasswordComponent.prototype.requestReset = function () {
        var _this = this;
        this.authService.requestReset(this.email)
            .then(function (result) {
            if (result) {
                _this.router.navigate(['/login']);
            }
            else {
                console.log("There was an error with your request...");
            }
        }).catch(function (error) {
            console.log(error);
        });
    };
    ResetPasswordComponent.prototype.goBack = function () {
        this.router.navigate(['/login']);
    };
    ResetPasswordComponent = __decorate([
        core_1.Component({
            selector: 'consentForm',
            templateUrl: './app/components/reset-password/reset-password.component.html',
            styleUrls: ['./app/components/reset-password/reset-password.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, authentication_service_1.AuthService])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9yZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQXlDO0FBQ3pDLGdGQUFvRTtBQVNwRTtJQWFFLGdDQUFxQixNQUFjLEVBQVUsV0FBd0I7UUFBaEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBVjdELGNBQVMsR0FBVyxFQUFFLENBQUM7UUFDdkIsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUUvQixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUkvQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ25FLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBRXZCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztRQUVSLENBQUM7SUFDTCxDQUFDO0lBRUQsNENBQVcsR0FBWDtRQUNFLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDL0MsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQztnQkFDNUMsWUFBWSxFQUFF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QUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDWCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbkMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQztZQUN6RCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSztZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsdUNBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBM0ZVLHNCQUFzQjtRQVBsQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLCtEQUErRDtZQUM1RSxTQUFTLEVBQUUsQ0FBQyw4REFBOEQsQ0FBQztTQUM5RSxDQUFDO3lDQWdCNkIsZUFBTSxFQUF1QixvQ0FBVztPQWIxRCxzQkFBc0IsQ0E0RmxDO0lBQUQsNkJBQUM7Q0E1RkQsQUE0RkMsSUFBQTtBQTVGWSx3REFBc0IiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvcmVzZXQtcGFzc3dvcmQvcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdjb25zZW50Rm9ybScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvcmVzZXQtcGFzc3dvcmQvcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvcmVzZXQtcGFzc3dvcmQvcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFJlc2V0UGFzc3dvcmRDb21wb25lbnQge1xyXG4gIGVycm9yOiBhbnk7XHJcbiAgcHJpdmF0ZSBjdXJyZW50VXNlcjogYW55O1xyXG4gIHByaXZhdGUgcGFzc3dvcmQxOiBzdHJpbmcgPSBcIlwiO1xyXG4gIHByaXZhdGUgcGFzc3dvcmQyOiBzdHJpbmcgPSBcIlwiO1xyXG4gIHByaXZhdGUgZW1haWw6IHN0cmluZztcclxuICBzaG93U3VibWl0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgcGFzc0xlbmd0aDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGNhcGl0YWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICB3ZWFrUGFzczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGlsbGVnYWxDaGFyYWN0ZXJzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cclxuICBjb25zdHJ1Y3RvciggcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcclxuICAgICAgdGhpcy5jdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgICBpZiAodGhpcy5jdXJyZW50VXNlcikge1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIGlucHV0Q2hhbmdlKCkge1xyXG4gICAgdmFyIGNhcGl0YWxDb3VudCA9IDA7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGFzc3dvcmQxLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICgvW0EtWl0vLnRlc3QodGhpcy5wYXNzd29yZDEuY2hhckF0KGkpKSkgIHtcclxuICAgICAgICBjYXBpdGFsQ291bnQrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICgvXlthLXpBLVowLTktIF0qJC8udGVzdCh0aGlzLnBhc3N3b3JkMSkgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuaWxsZWdhbENoYXJhY3RlcnMgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbGxlZ2FsQ2hhcmFjdGVycyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnBhc3N3b3JkMS5sZW5ndGggPj0gOCAmJiB0aGlzLnBhc3N3b3JkMS5sZW5ndGggPD0gMjUpIHtcclxuICAgICAgdGhpcy5wYXNzTGVuZ3RoID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wYXNzd29yZDEubGVuZ3RoID4gMjUpIHtcclxuICAgICAgdGhpcy5wYXNzTGVuZ3RoID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhc3NMZW5ndGggPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wYXNzd29yZDEubGVuZ3RoIDwgMTAgJiYgdGhpcy5wYXNzd29yZDEubGVuZ3RoID49IDggJiYgY2FwaXRhbENvdW50IDwgMiAmJiBjYXBpdGFsQ291bnQgIT09IDApIHtcclxuICAgICAgdGhpcy53ZWFrUGFzcyA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLndlYWtQYXNzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNhcGl0YWxDb3VudCA+PSAxKSB7XHJcbiAgICAgIHRoaXMuY2FwaXRhbCA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNhcGl0YWwgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wYXNzd29yZDEgPT09IHRoaXMucGFzc3dvcmQyICYmIHRoaXMucGFzc0xlbmd0aCAmJiB0aGlzLmNhcGl0YWwpIHtcclxuICAgICAgdGhpcy5zaG93U3VibWl0ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2hvd1N1Ym1pdCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRQYXNzd29yZCgpIHtcclxuICAgIHRoaXMuYXV0aFNlcnZpY2UucmVzZXRQYXNzd29yZCh0aGlzLmN1cnJlbnRVc2VyLnVzZXJJRCwgdGhpcy5wYXNzd29yZDEpXHJcbiAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUaGVyZSB3YXMgYW4gZXJyb3Igd2l0aCB5b3VyIHJlcXVlc3QuLi5cIik7XHJcbiAgICAgIH1cclxuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXF1ZXN0UmVzZXQoKSB7XHJcbiAgICB0aGlzLmF1dGhTZXJ2aWNlLnJlcXVlc3RSZXNldCh0aGlzLmVtYWlsKVxyXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGhlcmUgd2FzIGFuIGVycm9yIHdpdGggeW91ciByZXF1ZXN0Li4uXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sb2dpbiddKTtcclxuICB9XHJcbn1cclxuIl19
