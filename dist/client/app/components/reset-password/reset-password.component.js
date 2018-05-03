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
        if (this.email == null || this.email === "") {
            swal('Error', 'Please enter your email address.', 'warning');
        }
        else {
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
        }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9yZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQXlDO0FBQ3pDLGdGQUFvRTtBQVVwRTtJQWFFLGdDQUFxQixNQUFjLEVBQVUsV0FBd0I7UUFBaEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBVjdELGNBQVMsR0FBVyxFQUFFLENBQUM7UUFDdkIsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUUvQixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUkvQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtTQUVyQjthQUFNO1NBRU47SUFDTCxDQUFDO0lBRUQsNENBQVcsR0FBWDtRQUNFLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztRQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUc7Z0JBQzNDLFlBQVksRUFBRSxDQUFDO2FBQ2hCO1NBQ0Y7UUFFRCxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssS0FBSyxF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QUFOO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFuR1Usc0JBQXNCO1FBUGxDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsK0RBQStEO1lBQzVFLFNBQVMsRUFBRSxDQUFDLDhEQUE4RCxDQUFDO1NBQzlFLENBQUM7eUNBZ0I2QixlQUFNLEVBQXVCLG9DQUFXO09BYjFELHNCQUFzQixDQW9HbEM7SUFBRCw2QkFBQztDQXBHRCxBQW9HQyxJQUFBO0FBcEdZLHdEQUFzQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9yZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnY29uc2VudEZvcm0nLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3Jlc2V0LXBhc3N3b3JkL3Jlc2V0LXBhc3N3b3JkLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3Jlc2V0LXBhc3N3b3JkL3Jlc2V0LXBhc3N3b3JkLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXNldFBhc3N3b3JkQ29tcG9uZW50IHtcclxuICBlcnJvcjogYW55O1xyXG4gIHByaXZhdGUgY3VycmVudFVzZXI6IGFueTtcclxuICBwcml2YXRlIHBhc3N3b3JkMTogc3RyaW5nID0gXCJcIjtcclxuICBwcml2YXRlIHBhc3N3b3JkMjogc3RyaW5nID0gXCJcIjtcclxuICBwcml2YXRlIGVtYWlsOiBzdHJpbmc7XHJcbiAgc2hvd1N1Ym1pdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHBhc3NMZW5ndGg6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBjYXBpdGFsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgd2Vha1Bhc3M6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBpbGxlZ2FsQ2hhcmFjdGVyczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IoIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICAgICAgaWYgKHRoaXMuY3VycmVudFVzZXIpIHtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICBpbnB1dENoYW5nZSgpIHtcclxuICAgIHZhciBjYXBpdGFsQ291bnQgPSAwO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBhc3N3b3JkMS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoL1tBLVpdLy50ZXN0KHRoaXMucGFzc3dvcmQxLmNoYXJBdChpKSkpICB7XHJcbiAgICAgICAgY2FwaXRhbENvdW50Kys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoL15bYS16QS1aMC05LSBdKiQvLnRlc3QodGhpcy5wYXNzd29yZDEpID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLmlsbGVnYWxDaGFyYWN0ZXJzID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaWxsZWdhbENoYXJhY3RlcnMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wYXNzd29yZDEubGVuZ3RoID49IDggJiYgdGhpcy5wYXNzd29yZDEubGVuZ3RoIDw9IDI1KSB7XHJcbiAgICAgIHRoaXMucGFzc0xlbmd0aCA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucGFzc3dvcmQxLmxlbmd0aCA+IDI1KSB7XHJcbiAgICAgIHRoaXMucGFzc0xlbmd0aCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYXNzTGVuZ3RoID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucGFzc3dvcmQxLmxlbmd0aCA8IDEwICYmIHRoaXMucGFzc3dvcmQxLmxlbmd0aCA+PSA4ICYmIGNhcGl0YWxDb3VudCA8IDIgJiYgY2FwaXRhbENvdW50ICE9PSAwKSB7XHJcbiAgICAgIHRoaXMud2Vha1Bhc3MgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy53ZWFrUGFzcyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjYXBpdGFsQ291bnQgPj0gMSkge1xyXG4gICAgICB0aGlzLmNhcGl0YWwgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jYXBpdGFsID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucGFzc3dvcmQxID09PSB0aGlzLnBhc3N3b3JkMiAmJiB0aGlzLnBhc3NMZW5ndGggJiYgdGhpcy5jYXBpdGFsKSB7XHJcbiAgICAgIHRoaXMuc2hvd1N1Ym1pdCA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNob3dTdWJtaXQgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2V0UGFzc3dvcmQoKSB7XHJcbiAgICB0aGlzLmF1dGhTZXJ2aWNlLnJlc2V0UGFzc3dvcmQodGhpcy5jdXJyZW50VXNlci51c2VySUQsIHRoaXMucGFzc3dvcmQxKVxyXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGhlcmUgd2FzIGFuIGVycm9yIHdpdGggeW91ciByZXF1ZXN0Li4uXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVxdWVzdFJlc2V0KCkge1xyXG4gICAgaWYgKHRoaXMuZW1haWwgPT0gbnVsbCB8fCB0aGlzLmVtYWlsID09PSBcIlwiKSB7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgICAnRXJyb3InLFxyXG4gICAgICAgICAgJ1BsZWFzZSBlbnRlciB5b3VyIGVtYWlsIGFkZHJlc3MuJyxcclxuICAgICAgICAgICd3YXJuaW5nJ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hdXRoU2VydmljZS5yZXF1ZXN0UmVzZXQodGhpcy5lbWFpbClcclxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sb2dpbiddKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJUaGVyZSB3YXMgYW4gZXJyb3Igd2l0aCB5b3VyIHJlcXVlc3QuLi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
