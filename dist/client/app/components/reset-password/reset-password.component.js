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
const authentication_service_1 = require("../../services/authentication.service");
let ResetPasswordComponent = class ResetPasswordComponent {
    constructor(router, authService) {
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
    }
    inputChange() {
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
    }
    resetPassword() {
        this.authService.resetPassword(this.currentUser.userID, this.password1)
            .then(result => {
            if (result.result === 'error') {
                this.displayErrorAlert(result);
            }
            else if (result.result === 'invalid') {
                swal(result.title, result.msg, 'error');
            }
            else if (result.result === 'success') {
                swal(result.title, result.msg, 'success');
                this.router.navigate(['/login']);
                //window.history.back();
            }
            else {
                console.log("There was an error with your request...");
            }
        }).catch(error => {
            console.log(error);
        });
    }
    requestReset() {
        if (this.email == null || this.email === "") {
            swal('Error', 'Please enter your email address.', 'warning');
        }
        else {
            this.authService.requestReset(this.email)
                .then(result => {
                if (result.result === 'error') {
                    this.displayErrorAlert(result);
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
            }).catch(error => {
                console.log(error);
            });
        }
    }
    displayErrorAlert(error) {
        swal(error.title, error.msg, 'error');
    }
    goBack() {
        this.router.navigate(['/login']);
    }
};
ResetPasswordComponent = __decorate([
    core_1.Component({
        selector: 'consentForm',
        templateUrl: './app/components/reset-password/reset-password.component.html',
        styleUrls: ['./app/components/reset-password/reset-password.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, authentication_service_1.AuthService])
], ResetPasswordComponent);
exports.ResetPasswordComponent = ResetPasswordComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9yZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBa0Q7QUFDbEQsNENBQXlDO0FBQ3pDLGtGQUFvRTtBQVVwRSxJQUFhLHNCQUFzQixHQUFuQztJQWFFLFlBQXFCLE1BQWMsRUFBVSxXQUF3QjtRQUFoRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFWN0QsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUN2QixjQUFTLEdBQVcsRUFBRSxDQUFDO1FBRS9CLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBSS9CLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzlDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFHO2dCQUMzQyxZQUFZLEVBQUUsQ0FBQzthQUNoQjtTQUNGO1FBRUQsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEtBQUssRUFBRTtZQUNyRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFB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QkFBc0IsQ0FtSWxDO0FBbklZLHdEQUFzQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9yZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnY29uc2VudEZvcm0nLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3Jlc2V0LXBhc3N3b3JkL3Jlc2V0LXBhc3N3b3JkLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3Jlc2V0LXBhc3N3b3JkL3Jlc2V0LXBhc3N3b3JkLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXNldFBhc3N3b3JkQ29tcG9uZW50IHtcclxuICBlcnJvcjogYW55O1xyXG4gIHByaXZhdGUgY3VycmVudFVzZXI6IGFueTtcclxuICBwcml2YXRlIHBhc3N3b3JkMTogc3RyaW5nID0gXCJcIjtcclxuICBwcml2YXRlIHBhc3N3b3JkMjogc3RyaW5nID0gXCJcIjtcclxuICBwcml2YXRlIGVtYWlsOiBzdHJpbmc7XHJcbiAgc2hvd1N1Ym1pdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHBhc3NMZW5ndGg6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBjYXBpdGFsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgd2Vha1Bhc3M6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBpbGxlZ2FsQ2hhcmFjdGVyczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IoIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKTtcclxuICB9XHJcblxyXG4gIGlucHV0Q2hhbmdlKCkge1xyXG4gICAgdmFyIGNhcGl0YWxDb3VudCA9IDA7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGFzc3dvcmQxLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICgvW0EtWl0vLnRlc3QodGhpcy5wYXNzd29yZDEuY2hhckF0KGkpKSkgIHtcclxuICAgICAgICBjYXBpdGFsQ291bnQrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICgvXlthLXpBLVowLTktIF0qJC8udGVzdCh0aGlzLnBhc3N3b3JkMSkgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuaWxsZWdhbENoYXJhY3RlcnMgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbGxlZ2FsQ2hhcmFjdGVycyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnBhc3N3b3JkMS5sZW5ndGggPj0gOCAmJiB0aGlzLnBhc3N3b3JkMS5sZW5ndGggPD0gMjUpIHtcclxuICAgICAgdGhpcy5wYXNzTGVuZ3RoID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wYXNzd29yZDEubGVuZ3RoID4gMjUpIHtcclxuICAgICAgdGhpcy5wYXNzTGVuZ3RoID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhc3NMZW5ndGggPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wYXNzd29yZDEubGVuZ3RoIDwgMTAgJiYgdGhpcy5wYXNzd29yZDEubGVuZ3RoID49IDggJiYgY2FwaXRhbENvdW50IDwgMiAmJiBjYXBpdGFsQ291bnQgIT09IDApIHtcclxuICAgICAgdGhpcy53ZWFrUGFzcyA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLndlYWtQYXNzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNhcGl0YWxDb3VudCA+PSAxKSB7XHJcbiAgICAgIHRoaXMuY2FwaXRhbCA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNhcGl0YWwgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wYXNzd29yZDEgPT09IHRoaXMucGFzc3dvcmQyICYmIHRoaXMucGFzc0xlbmd0aCAmJiB0aGlzLmNhcGl0YWwpIHtcclxuICAgICAgdGhpcy5zaG93U3VibWl0ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2hvd1N1Ym1pdCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRQYXNzd29yZCgpIHtcclxuICAgIHRoaXMuYXV0aFNlcnZpY2UucmVzZXRQYXNzd29yZCh0aGlzLmN1cnJlbnRVc2VyLnVzZXJJRCwgdGhpcy5wYXNzd29yZDEpXHJcbiAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnaW52YWxpZCcpIHtcclxuICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAocmVzdWx0IGFzIGFueSkudGl0bGUsXHJcbiAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KS5tc2csXHJcbiAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KS50aXRsZSxcclxuICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLm1zZyxcclxuICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sb2dpbiddKTtcclxuICAgICAgICAvL3dpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRoZXJlIHdhcyBhbiBlcnJvciB3aXRoIHlvdXIgcmVxdWVzdC4uLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlcXVlc3RSZXNldCgpIHtcclxuICAgIGlmICh0aGlzLmVtYWlsID09IG51bGwgfHwgdGhpcy5lbWFpbCA9PT0gXCJcIikge1xyXG4gICAgICBzd2FsKFxyXG4gICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICdQbGVhc2UgZW50ZXIgeW91ciBlbWFpbCBhZGRyZXNzLicsXHJcbiAgICAgICAgICAnd2FybmluZydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYXV0aFNlcnZpY2UucmVxdWVzdFJlc2V0KHRoaXMuZW1haWwpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdpbnZhbGlkJykge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSkudGl0bGUsXHJcbiAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLm1zZyxcclxuICAgICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KS50aXRsZSxcclxuICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSkubXNnLFxyXG4gICAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XHJcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlcmUgd2FzIGFuIGVycm9yIHdpdGggeW91ciByZXF1ZXN0Li4uXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5RXJyb3JBbGVydChlcnJvcikge1xyXG4gICAgc3dhbChcclxuICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgIGVycm9yLm1zZyxcclxuICAgICAgJ2Vycm9yJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
