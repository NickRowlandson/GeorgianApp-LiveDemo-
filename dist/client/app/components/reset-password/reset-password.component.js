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
            if (result.result === 'error') {
                _this.displayErrorAlert(result);
            }
            else if (result.result === 'invalid') {
                swal(result.title, result.msg, 'error');
            }
            else if (result.result === 'success') {
                swal(result.title, result.msg, 'success');
                window.history.back();
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
                if (result.result === 'error') {
                    _this.displayErrorAlert(result);
                }
                else if (result.result === 'invalid') {
                    swal(result.title, result.msg, 'error');
                }
                else if (result.result === 'success') {
                    swal(result.title, result.msg, 'success');
                    //this.router.navigate(['/login']);
                    window.history.back();
                }
                else {
                    console.log("There was an error with your request...");
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    };
    ResetPasswordComponent.prototype.displayErrorAlert = function (error) {
        swal(error.title, error.msg, 'error');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9yZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQXlDO0FBQ3pDLGdGQUFvRTtBQVVwRTtJQWFFLGdDQUFxQixNQUFjLEVBQVUsV0FBd0I7UUFBaEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBVjdELGNBQVMsR0FBVyxFQUFFLENBQUM7UUFDdkIsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUUvQixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUkvQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtTQUVyQjthQUFNO1NBRU47SUFDTCxDQUFDO0lBRUQsNENBQVcsR0FBWDtRQUNFLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztRQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUc7Z0JBQzNDLFlBQVksRUFBRSxDQUFDO2FBQ2hCO1NBQ0Y7UUFFRCxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssS0FBSyxF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QU0sRUFBdUIsb0NBQVc7T0FiMUQsc0JBQXNCLENBdUlsQztJQUFELDZCQUFDO0NBdklELEFBdUlDLElBQUE7QUF2SVksd0RBQXNCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3Jlc2V0LXBhc3N3b3JkL3Jlc2V0LXBhc3N3b3JkLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdjb25zZW50Rm9ybScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvcmVzZXQtcGFzc3dvcmQvcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvcmVzZXQtcGFzc3dvcmQvcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFJlc2V0UGFzc3dvcmRDb21wb25lbnQge1xyXG4gIGVycm9yOiBhbnk7XHJcbiAgcHJpdmF0ZSBjdXJyZW50VXNlcjogYW55O1xyXG4gIHByaXZhdGUgcGFzc3dvcmQxOiBzdHJpbmcgPSBcIlwiO1xyXG4gIHByaXZhdGUgcGFzc3dvcmQyOiBzdHJpbmcgPSBcIlwiO1xyXG4gIHByaXZhdGUgZW1haWw6IHN0cmluZztcclxuICBzaG93U3VibWl0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgcGFzc0xlbmd0aDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGNhcGl0YWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICB3ZWFrUGFzczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGlsbGVnYWxDaGFyYWN0ZXJzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cclxuICBjb25zdHJ1Y3RvciggcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcclxuICAgICAgdGhpcy5jdXJyZW50VXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRVc2VyJykpO1xyXG4gICAgICBpZiAodGhpcy5jdXJyZW50VXNlcikge1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIGlucHV0Q2hhbmdlKCkge1xyXG4gICAgdmFyIGNhcGl0YWxDb3VudCA9IDA7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGFzc3dvcmQxLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICgvW0EtWl0vLnRlc3QodGhpcy5wYXNzd29yZDEuY2hhckF0KGkpKSkgIHtcclxuICAgICAgICBjYXBpdGFsQ291bnQrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICgvXlthLXpBLVowLTktIF0qJC8udGVzdCh0aGlzLnBhc3N3b3JkMSkgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuaWxsZWdhbENoYXJhY3RlcnMgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbGxlZ2FsQ2hhcmFjdGVycyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnBhc3N3b3JkMS5sZW5ndGggPj0gOCAmJiB0aGlzLnBhc3N3b3JkMS5sZW5ndGggPD0gMjUpIHtcclxuICAgICAgdGhpcy5wYXNzTGVuZ3RoID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wYXNzd29yZDEubGVuZ3RoID4gMjUpIHtcclxuICAgICAgdGhpcy5wYXNzTGVuZ3RoID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhc3NMZW5ndGggPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wYXNzd29yZDEubGVuZ3RoIDwgMTAgJiYgdGhpcy5wYXNzd29yZDEubGVuZ3RoID49IDggJiYgY2FwaXRhbENvdW50IDwgMiAmJiBjYXBpdGFsQ291bnQgIT09IDApIHtcclxuICAgICAgdGhpcy53ZWFrUGFzcyA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLndlYWtQYXNzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNhcGl0YWxDb3VudCA+PSAxKSB7XHJcbiAgICAgIHRoaXMuY2FwaXRhbCA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNhcGl0YWwgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wYXNzd29yZDEgPT09IHRoaXMucGFzc3dvcmQyICYmIHRoaXMucGFzc0xlbmd0aCAmJiB0aGlzLmNhcGl0YWwpIHtcclxuICAgICAgdGhpcy5zaG93U3VibWl0ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2hvd1N1Ym1pdCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRQYXNzd29yZCgpIHtcclxuICAgIHRoaXMuYXV0aFNlcnZpY2UucmVzZXRQYXNzd29yZCh0aGlzLmN1cnJlbnRVc2VyLnVzZXJJRCwgdGhpcy5wYXNzd29yZDEpXHJcbiAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnaW52YWxpZCcpIHtcclxuICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAocmVzdWx0IGFzIGFueSkudGl0bGUsXHJcbiAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KS5tc2csXHJcbiAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KS50aXRsZSxcclxuICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLm1zZyxcclxuICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgKTtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUaGVyZSB3YXMgYW4gZXJyb3Igd2l0aCB5b3VyIHJlcXVlc3QuLi5cIik7XHJcbiAgICAgIH1cclxuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXF1ZXN0UmVzZXQoKSB7XHJcbiAgICBpZiAodGhpcy5lbWFpbCA9PSBudWxsIHx8IHRoaXMuZW1haWwgPT09IFwiXCIpIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAnUGxlYXNlIGVudGVyIHlvdXIgZW1haWwgYWRkcmVzcy4nLFxyXG4gICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmF1dGhTZXJ2aWNlLnJlcXVlc3RSZXNldCh0aGlzLmVtYWlsKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnaW52YWxpZCcpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLnRpdGxlLFxyXG4gICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KS5tc2csXHJcbiAgICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSkudGl0bGUsXHJcbiAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLm1zZyxcclxuICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xyXG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZXJlIHdhcyBhbiBlcnJvciB3aXRoIHlvdXIgcmVxdWVzdC4uLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGlzcGxheUVycm9yQWxlcnQoZXJyb3IpIHtcclxuICAgIHN3YWwoXHJcbiAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICBlcnJvci5tc2csXHJcbiAgICAgICdlcnJvcidcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xyXG4gIH1cclxufVxyXG4iXX0=
