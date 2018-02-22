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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9yZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsMENBQXlDO0FBQ3pDLGdGQUFvRTtBQVVwRTtJQWFFLGdDQUFxQixNQUFjLEVBQVUsV0FBd0I7UUFBaEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBVjdELGNBQVMsR0FBVyxFQUFFLENBQUM7UUFDdkIsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUUvQixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUkvQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ25FLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBRXZCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztRQUVSLENBQUM7SUFDTCxDQUFDO0lBRUQsNENBQVcsR0FBWDtRQUNFLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDL0MsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQztnQkFDNUMsWUFBWSxFQUFF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SUFBSSxDQUNBLE9BQU8sRUFDUCxrQ0FBa0MsRUFDbEMsU0FBUyxDQUNaLENBQUM7UUFDSixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2lCQUN4QyxJQUFJLENBQUMsVUFBQSxNQUFNO2dCQUNWLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ1gsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQztnQkFDekQsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEtBQUs7Z0JBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO0lBRUQsdUNBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBbkdVLHNCQUFzQjtRQVBsQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLCtEQUErRDtZQUM1RSxTQUFTLEVBQUUsQ0FBQyw4REFBOEQsQ0FBQztTQUM5RSxDQUFDO3lDQWdCNkIsZUFBTSxFQUF1QixvQ0FBVztPQWIxRCxzQkFBc0IsQ0FvR2xDO0lBQUQsNkJBQUM7Q0FwR0QsQUFvR0MsSUFBQTtBQXBHWSx3REFBc0IiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvcmVzZXQtcGFzc3dvcmQvcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2NvbnNlbnRGb3JtJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9yZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9yZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUmVzZXRQYXNzd29yZENvbXBvbmVudCB7XHJcbiAgZXJyb3I6IGFueTtcclxuICBwcml2YXRlIGN1cnJlbnRVc2VyOiBhbnk7XHJcbiAgcHJpdmF0ZSBwYXNzd29yZDE6IHN0cmluZyA9IFwiXCI7XHJcbiAgcHJpdmF0ZSBwYXNzd29yZDI6IHN0cmluZyA9IFwiXCI7XHJcbiAgcHJpdmF0ZSBlbWFpbDogc3RyaW5nO1xyXG4gIHNob3dTdWJtaXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwYXNzTGVuZ3RoOiBib29sZWFuID0gZmFsc2U7XHJcbiAgY2FwaXRhbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHdlYWtQYXNzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgaWxsZWdhbENoYXJhY3RlcnM6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRVc2VyKSB7XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgaW5wdXRDaGFuZ2UoKSB7XHJcbiAgICB2YXIgY2FwaXRhbENvdW50ID0gMDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYXNzd29yZDEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKC9bQS1aXS8udGVzdCh0aGlzLnBhc3N3b3JkMS5jaGFyQXQoaSkpKSAge1xyXG4gICAgICAgIGNhcGl0YWxDb3VudCsrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKC9eW2EtekEtWjAtOS0gXSokLy50ZXN0KHRoaXMucGFzc3dvcmQxKSA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5pbGxlZ2FsQ2hhcmFjdGVycyA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlsbGVnYWxDaGFyYWN0ZXJzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucGFzc3dvcmQxLmxlbmd0aCA+PSA4ICYmIHRoaXMucGFzc3dvcmQxLmxlbmd0aCA8PSAyNSkge1xyXG4gICAgICB0aGlzLnBhc3NMZW5ndGggPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnBhc3N3b3JkMS5sZW5ndGggPiAyNSkge1xyXG4gICAgICB0aGlzLnBhc3NMZW5ndGggPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFzc0xlbmd0aCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnBhc3N3b3JkMS5sZW5ndGggPCAxMCAmJiB0aGlzLnBhc3N3b3JkMS5sZW5ndGggPj0gOCAmJiBjYXBpdGFsQ291bnQgPCAyICYmIGNhcGl0YWxDb3VudCAhPT0gMCkge1xyXG4gICAgICB0aGlzLndlYWtQYXNzID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMud2Vha1Bhc3MgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2FwaXRhbENvdW50ID49IDEpIHtcclxuICAgICAgdGhpcy5jYXBpdGFsID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2FwaXRhbCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnBhc3N3b3JkMSA9PT0gdGhpcy5wYXNzd29yZDIgJiYgdGhpcy5wYXNzTGVuZ3RoICYmIHRoaXMuY2FwaXRhbCkge1xyXG4gICAgICB0aGlzLnNob3dTdWJtaXQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zaG93U3VibWl0ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNldFBhc3N3b3JkKCkge1xyXG4gICAgdGhpcy5hdXRoU2VydmljZS5yZXNldFBhc3N3b3JkKHRoaXMuY3VycmVudFVzZXIudXNlcklELCB0aGlzLnBhc3N3b3JkMSlcclxuICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sb2dpbiddKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRoZXJlIHdhcyBhbiBlcnJvciB3aXRoIHlvdXIgcmVxdWVzdC4uLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlcXVlc3RSZXNldCgpIHtcclxuICAgIGlmICh0aGlzLmVtYWlsID09IG51bGwgfHwgdGhpcy5lbWFpbCA9PT0gXCJcIikge1xyXG4gICAgICBzd2FsKFxyXG4gICAgICAgICAgJ0Vycm9yJyxcclxuICAgICAgICAgICdQbGVhc2UgZW50ZXIgeW91ciBlbWFpbCBhZGRyZXNzLicsXHJcbiAgICAgICAgICAnd2FybmluZydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYXV0aFNlcnZpY2UucmVxdWVzdFJlc2V0KHRoaXMuZW1haWwpXHJcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlcmUgd2FzIGFuIGVycm9yIHdpdGggeW91ciByZXF1ZXN0Li4uXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xyXG4gIH1cclxufVxyXG4iXX0=
