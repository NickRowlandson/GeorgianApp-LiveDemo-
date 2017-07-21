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
var User_1 = require("../../models/User");
var router_1 = require("@angular/router");
var staff_service_1 = require("../../services/staff.service");
var StaffEditComponent = (function () {
    function StaffEditComponent(staffService, route) {
        this.staffService = staffService;
        this.route = route;
        this.newUser = false;
        this.navigated = false; // true if navigated here
    }
    StaffEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['id'];
            if (id === 'new') {
                _this.newUser = true;
                _this.user = new User_1.User();
            }
            else {
                _this.newUser = false;
                _this.staffService.getUser(id).then(function (user) { return _this.user = user; });
            }
        });
    };
    StaffEditComponent.prototype.save = function () {
        var _this = this;
        this.staffService
            .save(this.user)
            .then(function (user) {
            _this.user = user; // saved user, w/ id if new
            _this.goBack();
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    StaffEditComponent.prototype.goBack = function () {
        window.history.back();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", User_1.User)
    ], StaffEditComponent.prototype, "user", void 0);
    StaffEditComponent = __decorate([
        core_1.Component({
            selector: 'staff-edit',
            templateUrl: './app/components/staff-edit/staff-edit.component.html',
            styleUrls: ['./app/components/staff-edit/staff-edit.component.css']
        }),
        __metadata("design:paramtypes", [staff_service_1.StaffService, router_1.ActivatedRoute])
    ], StaffEditComponent);
    return StaffEditComponent;
}());
exports.StaffEditComponent = StaffEditComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zdGFmZi1lZGl0L3N0YWZmLWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXlEO0FBQ3pELDBDQUF5QztBQUN6QywwQ0FBeUQ7QUFDekQsOERBQTREO0FBUTVEO0lBT0ksNEJBQW9CLFlBQTBCLEVBQVUsS0FBcUI7UUFBekQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUw3RSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRWhCLGNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyx5QkFBeUI7SUFLNUMsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFBQSxpQkFXQztRQVZHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQWM7WUFDckMsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7WUFDM0IsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO1lBQ2pFLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxpQ0FBSSxHQUFKO1FBQUEsaUJBUUM7UUFQRyxJQUFJLENBQUMsWUFBWTthQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2YsSUFBSSxDQUFDLFVBQUEsSUFBSTtZQUNOLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsMkJBQTJCO1lBQzdDLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDLENBQUMsOEJBQThCO0lBQzNFLENBQUM7SUFFRCxtQ0FBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBbkNRO1FBQVIsWUFBSyxFQUFFO2tDQUFPLFdBQUk7b0RBQUM7SUFEWCxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFdBQVcsRUFBRSx1REFBdUQ7WUFDcEUsU0FBUyxFQUFFLENBQUMsc0RBQXNELENBQUM7U0FDdEUsQ0FBQzt5Q0FTb0MsNEJBQVksRUFBaUIsdUJBQWM7T0FQcEUsa0JBQWtCLENBcUM5QjtJQUFELHlCQUFDO0NBckNELEFBcUNDLElBQUE7QUFyQ1ksZ0RBQWtCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3N0YWZmLWVkaXQvc3RhZmYtZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvVXNlclwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3RhZmZTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0YWZmLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdzdGFmZi1lZGl0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9zdGFmZi1lZGl0L3N0YWZmLWVkaXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvc3RhZmYtZWRpdC9zdGFmZi1lZGl0LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0YWZmRWRpdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSB1c2VyOiBVc2VyO1xyXG4gICAgbmV3VXNlciA9IGZhbHNlO1xyXG4gICAgZXJyb3I6IGFueTtcclxuICAgIG5hdmlnYXRlZCA9IGZhbHNlOyAvLyB0cnVlIGlmIG5hdmlnYXRlZCBoZXJlXHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RhZmZTZXJ2aWNlOiBTdGFmZlNlcnZpY2UsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMucm91dGUucGFyYW1zLmZvckVhY2goKHBhcmFtczogUGFyYW1zKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHBhcmFtc1snaWQnXTtcclxuICAgICAgICAgICAgaWYgKGlkID09PSAnbmV3Jykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdVc2VyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld1VzZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhZmZTZXJ2aWNlLmdldFVzZXIoaWQpLnRoZW4odXNlciA9PiB0aGlzLnVzZXIgPSB1c2VyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmUoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFmZlNlcnZpY2VcclxuICAgICAgICAgICAgLnNhdmUodGhpcy51c2VyKVxyXG4gICAgICAgICAgICAudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7IC8vIHNhdmVkIHVzZXIsIHcvIGlkIGlmIG5ld1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb0JhY2soKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7IC8vIFRPRE86IERpc3BsYXkgZXJyb3IgbWVzc2FnZVxyXG4gICAgfVxyXG5cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICB9XHJcbn1cclxuIl19
