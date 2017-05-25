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
var authentication_service_1 = require("./services/authentication.service");
var AppComponent = (function () {
    function AppComponent(authService) {
        this.authService = authService;
        this.title = 'Academic and Career Preparation';
        this.currentUser = null;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.loggedUser.subscribe(function (data) {
            if (data) {
                var username = data.replace(/['"]+/g, '');
                _this.currentUser = username;
            }
            else {
                _this.currentUser = null;
            }
        }, function (err) {
            console.log(err);
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app/app.html',
        styleUrls: ['./app/app.component.css']
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthService])
], AppComponent);
exports.AppComponent = AppComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvYXBwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEwQztBQUMxQyw0RUFBZ0U7QUFRaEUsSUFBYSxZQUFZO0lBSXJCLHNCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUg1QyxVQUFLLEdBQUcsaUNBQWlDLENBQUM7UUFDbEMsZ0JBQVcsR0FBUSxJQUFJLENBQUM7SUFHaEMsQ0FBQztJQUVELCtCQUFRLEdBQVI7UUFBQSxpQkFjQztRQWJHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FDakMsVUFBQSxJQUFJO1lBQ0EsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDUCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDMUMsS0FBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7WUFDaEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQzVCLENBQUM7UUFDTCxDQUFDLEVBQ0QsVUFBQSxHQUFHO1lBQ0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFTCxtQkFBQztBQUFELENBdkJBLEFBdUJDLElBQUE7QUF2QlksWUFBWTtJQU54QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFFBQVE7UUFDbEIsV0FBVyxFQUFFLGdCQUFnQjtRQUM3QixTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztLQUN6QyxDQUFDO3FDQU1tQyxvQ0FBVztHQUpuQyxZQUFZLENBdUJ4QjtBQXZCWSxvQ0FBWSIsImZpbGUiOiJhcHAvYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbXktYXBwJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvYXBwLmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2FwcC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xyXG4gICAgdGl0bGUgPSAnQWNhZGVtaWMgYW5kIENhcmVlciBQcmVwYXJhdGlvbic7XHJcbiAgICBwcml2YXRlIGN1cnJlbnRVc2VyOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dnZWRVc2VyLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1c2VybmFtZSA9IGRhdGEucmVwbGFjZSgvWydcIl0rL2csICcnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRVc2VyID0gdXNlcm5hbWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFVzZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==
