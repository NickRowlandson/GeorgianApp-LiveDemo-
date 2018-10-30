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
        if (error.title === "Auth Error") {
            this.router.navigate(['/login']);
            swal(error.title, error.msg, 'info');
        }
        else {
            swal(error.title, error.msg, 'error');
        }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9yZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBa0Q7QUFDbEQsNENBQXlDO0FBQ3pDLGtGQUFvRTtBQVVwRSxJQUFhLHNCQUFzQixHQUFuQztJQWFFLFlBQXFCLE1BQWMsRUFBVSxXQUF3QjtRQUFoRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFWN0QsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUN2QixjQUFTLEdBQVcsRUFBRSxDQUFDO1FBRS9CLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBSS9CLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzlDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFHO2dCQUMzQyxZQUFZLEVBQUUsQ0FBQzthQUNoQjtTQUNGO1FBRUQsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEtBQUssRUFBRTtZQUNyRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFB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USxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQ0YsQ0FBQTtBQTVJWSxzQkFBc0I7SUFQbEMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFdBQVcsRUFBRSwrREFBK0Q7UUFDNUUsU0FBUyxFQUFFLENBQUMsOERBQThELENBQUM7S0FDOUUsQ0FBQztxQ0FnQjZCLGVBQU0sRUFBdUIsb0NBQVc7R0FiMUQsc0JBQXNCLENBNElsQztBQTVJWSx3REFBc0IiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvcmVzZXQtcGFzc3dvcmQvcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2NvbnNlbnRGb3JtJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9yZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9yZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUmVzZXRQYXNzd29yZENvbXBvbmVudCB7XHJcbiAgZXJyb3I6IGFueTtcclxuICBwcml2YXRlIGN1cnJlbnRVc2VyOiBhbnk7XHJcbiAgcHJpdmF0ZSBwYXNzd29yZDE6IHN0cmluZyA9IFwiXCI7XHJcbiAgcHJpdmF0ZSBwYXNzd29yZDI6IHN0cmluZyA9IFwiXCI7XHJcbiAgcHJpdmF0ZSBlbWFpbDogc3RyaW5nO1xyXG4gIHNob3dTdWJtaXQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwYXNzTGVuZ3RoOiBib29sZWFuID0gZmFsc2U7XHJcbiAgY2FwaXRhbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHdlYWtQYXNzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgaWxsZWdhbENoYXJhY3RlcnM6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSk7XHJcbiAgfVxyXG5cclxuICBpbnB1dENoYW5nZSgpIHtcclxuICAgIHZhciBjYXBpdGFsQ291bnQgPSAwO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBhc3N3b3JkMS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoL1tBLVpdLy50ZXN0KHRoaXMucGFzc3dvcmQxLmNoYXJBdChpKSkpICB7XHJcbiAgICAgICAgY2FwaXRhbENvdW50Kys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoL15bYS16QS1aMC05LSBdKiQvLnRlc3QodGhpcy5wYXNzd29yZDEpID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLmlsbGVnYWxDaGFyYWN0ZXJzID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaWxsZWdhbENoYXJhY3RlcnMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wYXNzd29yZDEubGVuZ3RoID49IDggJiYgdGhpcy5wYXNzd29yZDEubGVuZ3RoIDw9IDI1KSB7XHJcbiAgICAgIHRoaXMucGFzc0xlbmd0aCA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucGFzc3dvcmQxLmxlbmd0aCA+IDI1KSB7XHJcbiAgICAgIHRoaXMucGFzc0xlbmd0aCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYXNzTGVuZ3RoID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucGFzc3dvcmQxLmxlbmd0aCA8IDEwICYmIHRoaXMucGFzc3dvcmQxLmxlbmd0aCA+PSA4ICYmIGNhcGl0YWxDb3VudCA8IDIgJiYgY2FwaXRhbENvdW50ICE9PSAwKSB7XHJcbiAgICAgIHRoaXMud2Vha1Bhc3MgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy53ZWFrUGFzcyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjYXBpdGFsQ291bnQgPj0gMSkge1xyXG4gICAgICB0aGlzLmNhcGl0YWwgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jYXBpdGFsID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucGFzc3dvcmQxID09PSB0aGlzLnBhc3N3b3JkMiAmJiB0aGlzLnBhc3NMZW5ndGggJiYgdGhpcy5jYXBpdGFsKSB7XHJcbiAgICAgIHRoaXMuc2hvd1N1Ym1pdCA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNob3dTdWJtaXQgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2V0UGFzc3dvcmQoKSB7XHJcbiAgICB0aGlzLmF1dGhTZXJ2aWNlLnJlc2V0UGFzc3dvcmQodGhpcy5jdXJyZW50VXNlci51c2VySUQsIHRoaXMucGFzc3dvcmQxKVxyXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCBhcyBhbnkpLnJlc3VsdCA9PT0gJ2ludmFsaWQnKSB7XHJcbiAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLnRpdGxlLFxyXG4gICAgICAgICAgICAocmVzdWx0IGFzIGFueSkubXNnLFxyXG4gICAgICAgICAgICAnZXJyb3InXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAocmVzdWx0IGFzIGFueSkudGl0bGUsXHJcbiAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KS5tc2csXHJcbiAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XHJcbiAgICAgICAgLy93aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUaGVyZSB3YXMgYW4gZXJyb3Igd2l0aCB5b3VyIHJlcXVlc3QuLi5cIik7XHJcbiAgICAgIH1cclxuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXF1ZXN0UmVzZXQoKSB7XHJcbiAgICBpZiAodGhpcy5lbWFpbCA9PSBudWxsIHx8IHRoaXMuZW1haWwgPT09IFwiXCIpIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICAgICdFcnJvcicsXHJcbiAgICAgICAgICAnUGxlYXNlIGVudGVyIHlvdXIgZW1haWwgYWRkcmVzcy4nLFxyXG4gICAgICAgICAgJ3dhcm5pbmcnXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmF1dGhTZXJ2aWNlLnJlcXVlc3RSZXNldCh0aGlzLmVtYWlsKVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0IGFzIGFueSkucmVzdWx0ID09PSAnaW52YWxpZCcpIHtcclxuICAgICAgICAgIHN3YWwoXHJcbiAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLnRpdGxlLFxyXG4gICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KS5tc2csXHJcbiAgICAgICAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgYXMgYW55KS5yZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSkudGl0bGUsXHJcbiAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpLm1zZyxcclxuICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICAvL3RoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xyXG4gICAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZXJlIHdhcyBhbiBlcnJvciB3aXRoIHlvdXIgcmVxdWVzdC4uLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGlzcGxheUVycm9yQWxlcnQoZXJyb3IpIHtcclxuICAgIGlmIChlcnJvci50aXRsZSA9PT0gXCJBdXRoIEVycm9yXCIpIHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgICAgZXJyb3IubXNnLFxyXG4gICAgICAgICdpbmZvJ1xyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dhbChcclxuICAgICAgICBlcnJvci50aXRsZSxcclxuICAgICAgICBlcnJvci5tc2csXHJcbiAgICAgICAgJ2Vycm9yJ1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sb2dpbiddKTtcclxuICB9XHJcbn1cclxuIl19
