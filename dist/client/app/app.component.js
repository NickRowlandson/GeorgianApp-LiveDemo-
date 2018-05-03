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
var AppComponent = /** @class */ (function () {
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
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './app/app.html',
            styleUrls: ['./app/app.component.css']
        }),
        __metadata("design:paramtypes", [authentication_service_1.AuthService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvYXBwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEwQztBQUMxQyw0RUFBZ0U7QUFRaEU7SUFJSSxzQkFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFINUMsVUFBSyxHQUFHLGlDQUFpQyxDQUFDO1FBQ2xDLGdCQUFXLEdBQVEsSUFBSSxDQUFDO0lBR2hDLENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQUEsaUJBY0M7UUFiRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQ2pDLFVBQUEsSUFBSTtZQUNBLElBQUksSUFBSSxFQUFFO2dCQUNOLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMxQyxLQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQzthQUMvQjtpQkFBTTtnQkFDSCxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQzthQUMzQjtRQUNMLENBQUMsRUFDRCxVQUFBLEdBQUc7WUFDQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQXJCUSxZQUFZO1FBTnhCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsZ0JBQWdCO1lBQzdCLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1NBQ3pDLENBQUM7eUNBTW1DLG9DQUFXO09BSm5DLFlBQVksQ0F1QnhCO0lBQUQsbUJBQUM7Q0F2QkQsQUF1QkMsSUFBQTtBQXZCWSxvQ0FBWSIsImZpbGUiOiJhcHAvYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbXktYXBwJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvYXBwLmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2FwcC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xyXG4gICAgdGl0bGUgPSAnQWNhZGVtaWMgYW5kIENhcmVlciBQcmVwYXJhdGlvbic7XHJcbiAgICBwcml2YXRlIGN1cnJlbnRVc2VyOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dnZWRVc2VyLnN1YnNjcmliZShcclxuICAgICAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1c2VybmFtZSA9IGRhdGEucmVwbGFjZSgvWydcIl0rL2csICcnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRVc2VyID0gdXNlcm5hbWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFVzZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==
