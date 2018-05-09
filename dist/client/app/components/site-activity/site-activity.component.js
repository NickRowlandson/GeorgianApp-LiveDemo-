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
var staff_service_1 = require("../../services/staff.service");
var SiteActivityComponent = /** @class */ (function () {
    function SiteActivityComponent(router, StaffService) {
        this.router = router;
        this.StaffService = StaffService;
    }
    SiteActivityComponent.prototype.ngOnInit = function () {
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();
        this.getSiteActivity();
        //this.getTimetables();
    };
    SiteActivityComponent.prototype.getSiteActivity = function () {
        var _this = this;
        this.StaffService
            .getSiteActivity()
            .then(function (results) {
            if (results.result === 'error') {
                _this.activity = null;
                _this.displayErrorAlert(results);
            }
            else {
                _this.activity = results;
                swal.close();
            }
        })
            .catch(function (error) { return console.log("Error - Get activity: " + error); });
    };
    SiteActivityComponent.prototype.onPrint = function () {
        window.print();
    };
    SiteActivityComponent.prototype.displayErrorAlert = function (error) {
        swal(error.title, error.msg, 'error');
    };
    SiteActivityComponent.prototype.goBack = function () {
        window.history.back();
    };
    SiteActivityComponent = __decorate([
        core_1.Component({
            selector: 'waitList',
            templateUrl: './app/components/site-activity/site-activity.component.html',
            styleUrls: ['./app/components/site-activity/site-activity.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, staff_service_1.StaffService])
    ], SiteActivityComponent);
    return SiteActivityComponent;
}());
exports.SiteActivityComponent = SiteActivityComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zaXRlLWFjdGl2aXR5L3NpdGUtYWN0aXZpdHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF5QztBQUN6Qyw4REFBNEQ7QUFVNUQ7SUFHRSwrQkFBb0IsTUFBYyxFQUFVLFlBQTBCO1FBQWxELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUV0RSxDQUFDO0lBRUQsd0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQztZQUNILEtBQUssRUFBRSxZQUFZO1lBQ25CLGlCQUFpQixFQUFFLEtBQUs7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2Qix1QkFBdUI7SUFDekIsQ0FBQztJQUVELCtDQUFlLEdBQWY7UUFBQSxpQkFhQztRQVpDLElBQUksQ0FBQyxZQUFZO2FBQ2QsZUFBZSxFQUFFO2FBQ2pCLElBQUksQ0FBQyxVQUFBLE9BQU87WUFDWCxJQUFLLE9BQWUsQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO2dCQUN2QyxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDckIsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2pDO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO2dCQUN4QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDZDtRQUNILENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEdBQUcsS0FBSyxDQUFDLEVBQTdDLENBQTZDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsdUNBQU8sR0FBUDtRQUNHLE1BQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsaURBQWlCLEdBQWpCLFVBQWtCLEtBQUs7UUFDckIsSUFBSSxDQUNGLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLEdBQUcsRUFDVCxPQUFPLENBQ1IsQ0FBQztJQUNKLENBQUM7SUFFRCxzQ0FBTSxHQUFOO1FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBOUNVLHFCQUFxQjtRQU5qQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLDZEQUE2RDtZQUMxRSxTQUFTLEVBQUUsQ0FBQyw0REFBNEQsQ0FBQztTQUMxRSxDQUFDO3lDQUs0QixlQUFNLEVBQXdCLDRCQUFZO09BSDNELHFCQUFxQixDQStDakM7SUFBRCw0QkFBQztDQS9DRCxBQStDQyxJQUFBO0FBL0NZLHNEQUFxQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9zaXRlLWFjdGl2aXR5L3NpdGUtYWN0aXZpdHkuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3RhZmZTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3N0YWZmLnNlcnZpY2VcIjtcclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5kZWNsYXJlIHZhciBtb21lbnQ7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3dhaXRMaXN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvc2l0ZS1hY3Rpdml0eS9zaXRlLWFjdGl2aXR5LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9zaXRlLWFjdGl2aXR5L3NpdGUtYWN0aXZpdHkuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU2l0ZUFjdGl2aXR5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBhY3Rpdml0eTogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIFN0YWZmU2VydmljZTogU3RhZmZTZXJ2aWNlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdMb2FkaW5nLi4uJyxcclxuICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgIHRoaXMuZ2V0U2l0ZUFjdGl2aXR5KCk7XHJcbiAgICAvL3RoaXMuZ2V0VGltZXRhYmxlcygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2l0ZUFjdGl2aXR5KCkge1xyXG4gICAgdGhpcy5TdGFmZlNlcnZpY2VcclxuICAgICAgLmdldFNpdGVBY3Rpdml0eSgpXHJcbiAgICAgIC50aGVuKHJlc3VsdHMgPT4ge1xyXG4gICAgICAgIGlmICgocmVzdWx0cyBhcyBhbnkpLnJlc3VsdCA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgdGhpcy5hY3Rpdml0eSA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlFcnJvckFsZXJ0KHJlc3VsdHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmFjdGl2aXR5ID0gcmVzdWx0cztcclxuICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkVycm9yIC0gR2V0IGFjdGl2aXR5OiBcIiArIGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBvblByaW50KCkge1xyXG4gICAgKHdpbmRvdyBhcyBhbnkpLnByaW50KCk7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5RXJyb3JBbGVydChlcnJvcikge1xyXG4gICAgc3dhbChcclxuICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgIGVycm9yLm1zZyxcclxuICAgICAgJ2Vycm9yJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
