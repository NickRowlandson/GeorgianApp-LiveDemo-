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
const staff_service_1 = require("../../services/staff.service");
let SiteActivityComponent = class SiteActivityComponent {
    constructor(router, StaffService) {
        this.router = router;
        this.StaffService = StaffService;
    }
    ngOnInit() {
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();
        this.getSiteActivity();
        //this.getTimetables();
    }
    getSiteActivity() {
        this.StaffService
            .getSiteActivity()
            .then(results => {
            if (results.result === 'error') {
                this.activity = null;
                this.displayErrorAlert(results);
            }
            else {
                this.activity = results;
                swal.close();
            }
        })
            .catch(error => console.log("Error - Get activity: " + error));
    }
    onPrint() {
        window.print();
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
        window.history.back();
    }
};
SiteActivityComponent = __decorate([
    core_1.Component({
        selector: 'waitList',
        templateUrl: './app/components/site-activity/site-activity.component.html',
        styleUrls: ['./app/components/site-activity/site-activity.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, staff_service_1.StaffService])
], SiteActivityComponent);
exports.SiteActivityComponent = SiteActivityComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zaXRlLWFjdGl2aXR5L3NpdGUtYWN0aXZpdHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0NBQWtEO0FBQ2xELDRDQUF5QztBQUN6QyxnRUFBNEQ7QUFVNUQsSUFBYSxxQkFBcUIsR0FBbEM7SUFHRSxZQUFvQixNQUFjLEVBQVUsWUFBMEI7UUFBbEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBRXRFLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDO1lBQ0gsS0FBSyxFQUFFLFlBQVk7WUFDbkIsaUJBQWlCLEVBQUUsS0FBSztTQUN6QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLHVCQUF1QjtJQUN6QixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxZQUFZO2FBQ2QsZUFBZSxFQUFFO2FBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNkLElBQUssT0FBZSxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDakM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNkO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxPQUFPO1FBQ0osTUFBYyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxLQUFLO1FBQ3JCLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxZQUFZLEVBQUU7WUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FDRixLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssQ0FBQyxHQUFHLEVBQ1QsTUFBTSxDQUNQLENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBSSxDQUNGLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLEdBQUcsRUFDVCxPQUFPLENBQ1IsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVELE1BQU07UUFDSixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7Q0FDRixDQUFBO0FBeERZLHFCQUFxQjtJQU5qQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFVBQVU7UUFDcEIsV0FBVyxFQUFFLDZEQUE2RDtRQUMxRSxTQUFTLEVBQUUsQ0FBQyw0REFBNEQsQ0FBQztLQUMxRSxDQUFDO3FDQUs0QixlQUFNLEVBQXdCLDRCQUFZO0dBSDNELHFCQUFxQixDQXdEakM7QUF4RFksc0RBQXFCIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL3NpdGUtYWN0aXZpdHkvc2l0ZS1hY3Rpdml0eS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdGFmZlNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3RhZmYuc2VydmljZVwiO1xyXG5kZWNsYXJlIHZhciBzd2FsOiBhbnk7XHJcbmRlY2xhcmUgdmFyIG1vbWVudDtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnd2FpdExpc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9zaXRlLWFjdGl2aXR5L3NpdGUtYWN0aXZpdHkuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL3NpdGUtYWN0aXZpdHkvc2l0ZS1hY3Rpdml0eS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTaXRlQWN0aXZpdHlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGFjdGl2aXR5OiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgU3RhZmZTZXJ2aWNlOiBTdGFmZlNlcnZpY2UpIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHN3YWwoe1xyXG4gICAgICB0aXRsZTogJ0xvYWRpbmcuLi4nLFxyXG4gICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgc3dhbC5zaG93TG9hZGluZygpO1xyXG4gICAgdGhpcy5nZXRTaXRlQWN0aXZpdHkoKTtcclxuICAgIC8vdGhpcy5nZXRUaW1ldGFibGVzKCk7XHJcbiAgfVxyXG5cclxuICBnZXRTaXRlQWN0aXZpdHkoKSB7XHJcbiAgICB0aGlzLlN0YWZmU2VydmljZVxyXG4gICAgICAuZ2V0U2l0ZUFjdGl2aXR5KClcclxuICAgICAgLnRoZW4ocmVzdWx0cyA9PiB7XHJcbiAgICAgICAgaWYgKChyZXN1bHRzIGFzIGFueSkucmVzdWx0ID09PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICB0aGlzLmFjdGl2aXR5ID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yQWxlcnQocmVzdWx0cyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuYWN0aXZpdHkgPSByZXN1bHRzO1xyXG4gICAgICAgICAgc3dhbC5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiRXJyb3IgLSBHZXQgYWN0aXZpdHk6IFwiICsgZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIG9uUHJpbnQoKSB7XHJcbiAgICAod2luZG93IGFzIGFueSkucHJpbnQoKTtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlFcnJvckFsZXJ0KGVycm9yKSB7XHJcbiAgICBpZiAoZXJyb3IudGl0bGUgPT09IFwiQXV0aCBFcnJvclwiKSB7XHJcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xyXG4gICAgICBzd2FsKFxyXG4gICAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICAgIGVycm9yLm1zZyxcclxuICAgICAgICAnaW5mbydcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN3YWwoXHJcbiAgICAgICAgZXJyb3IudGl0bGUsXHJcbiAgICAgICAgZXJyb3IubXNnLFxyXG4gICAgICAgICdlcnJvcidcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
