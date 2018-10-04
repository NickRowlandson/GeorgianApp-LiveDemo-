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
const authentication_service_1 = require("./services/authentication.service");
let AppComponent = class AppComponent {
    constructor(authService) {
        this.authService = authService;
        this.title = 'Academic and Career Preparation';
        this.currentUser = null;
    }
    ngOnInit() {
        this.authService.loggedUser.subscribe(data => {
            if (data) {
                var username = data.replace(/['"]+/g, '');
                this.currentUser = username;
            }
            else {
                this.currentUser = null;
            }
        }, err => {
            console.log(err);
        });
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app/app.html',
        styleUrls: ['./app/app.component.css']
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthService])
], AppComponent);
exports.AppComponent = AppComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvYXBwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUEwQztBQUMxQyw4RUFBZ0U7QUFRaEUsSUFBYSxZQUFZLEdBQXpCO0lBSUksWUFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFINUMsVUFBSyxHQUFHLGlDQUFpQyxDQUFDO1FBQ2xDLGdCQUFXLEdBQVEsSUFBSSxDQUFDO0lBR2hDLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUNqQyxJQUFJLENBQUMsRUFBRTtZQUNILElBQUksSUFBSSxFQUFFO2dCQUNOLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQzthQUMvQjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQzthQUMzQjtRQUNMLENBQUMsRUFDRCxHQUFHLENBQUMsRUFBRTtZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0NBRUosQ0FBQTtBQXZCWSxZQUFZO0lBTnhCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsUUFBUTtRQUNsQixXQUFXLEVBQUUsZ0JBQWdCO1FBQzdCLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO0tBQ3pDLENBQUM7cUNBTW1DLG9DQUFXO0dBSm5DLFlBQVksQ0F1QnhCO0FBdkJZLG9DQUFZIiwiZmlsZSI6ImFwcC9hcHAuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdteS1hcHAnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9hcHAuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvYXBwLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XHJcbiAgICB0aXRsZSA9ICdBY2FkZW1pYyBhbmQgQ2FyZWVyIFByZXBhcmF0aW9uJztcclxuICAgIHByaXZhdGUgY3VycmVudFVzZXI6IGFueSA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmxvZ2dlZFVzZXIuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gZGF0YS5yZXBsYWNlKC9bJ1wiXSsvZywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFVzZXIgPSB1c2VybmFtZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VXNlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19
