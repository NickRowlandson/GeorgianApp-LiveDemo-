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
        swal(error.title, error.msg, 'error');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9zaXRlLWFjdGl2aXR5L3NpdGUtYWN0aXZpdHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0NBQWtEO0FBQ2xELDRDQUF5QztBQUN6QyxnRUFBNEQ7QUFVNUQsSUFBYSxxQkFBcUIsR0FBbEM7SUFHRSxZQUFvQixNQUFjLEVBQVUsWUFBMEI7UUFBbEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBRXRFLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDO1lBQ0gsS0FBSyxFQUFFLFlBQVk7WUFDbkIsaUJBQWlCLEVBQUUsS0FBSztTQUN6QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLHVCQUF1QjtJQUN6QixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxZQUFZO2FBQ2QsZUFBZSxFQUFFO2FBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNkLElBQUssT0FBZSxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDakM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNkO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxPQUFPO1FBQ0osTUFBYyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxLQUFLO1FBQ3JCLElBQUksQ0FDRixLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssQ0FBQyxHQUFHLEVBQ1QsT0FBTyxDQUNSLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTTtRQUNKLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQztDQUNGLENBQUE7QUEvQ1kscUJBQXFCO0lBTmpDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsVUFBVTtRQUNwQixXQUFXLEVBQUUsNkRBQTZEO1FBQzFFLFNBQVMsRUFBRSxDQUFDLDREQUE0RCxDQUFDO0tBQzFFLENBQUM7cUNBSzRCLGVBQU0sRUFBd0IsNEJBQVk7R0FIM0QscUJBQXFCLENBK0NqQztBQS9DWSxzREFBcUIiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvc2l0ZS1hY3Rpdml0eS9zaXRlLWFjdGl2aXR5LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN0YWZmU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdGFmZi5zZXJ2aWNlXCI7XHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuZGVjbGFyZSB2YXIgbW9tZW50O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd3YWl0TGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL3NpdGUtYWN0aXZpdHkvc2l0ZS1hY3Rpdml0eS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvc2l0ZS1hY3Rpdml0eS9zaXRlLWFjdGl2aXR5LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpdGVBY3Rpdml0eUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgYWN0aXZpdHk6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBTdGFmZlNlcnZpY2U6IFN0YWZmU2VydmljZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgc3dhbCh7XHJcbiAgICAgIHRpdGxlOiAnTG9hZGluZy4uLicsXHJcbiAgICAgIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBzd2FsLnNob3dMb2FkaW5nKCk7XHJcbiAgICB0aGlzLmdldFNpdGVBY3Rpdml0eSgpO1xyXG4gICAgLy90aGlzLmdldFRpbWV0YWJsZXMoKTtcclxuICB9XHJcblxyXG4gIGdldFNpdGVBY3Rpdml0eSgpIHtcclxuICAgIHRoaXMuU3RhZmZTZXJ2aWNlXHJcbiAgICAgIC5nZXRTaXRlQWN0aXZpdHkoKVxyXG4gICAgICAudGhlbihyZXN1bHRzID0+IHtcclxuICAgICAgICBpZiAoKHJlc3VsdHMgYXMgYW55KS5yZXN1bHQgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIHRoaXMuYWN0aXZpdHkgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3JBbGVydChyZXN1bHRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5hY3Rpdml0eSA9IHJlc3VsdHM7XHJcbiAgICAgICAgICBzd2FsLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvciAtIEdldCBhY3Rpdml0eTogXCIgKyBlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgb25QcmludCgpIHtcclxuICAgICh3aW5kb3cgYXMgYW55KS5wcmludCgpO1xyXG4gIH1cclxuXHJcbiAgZGlzcGxheUVycm9yQWxlcnQoZXJyb3IpIHtcclxuICAgIHN3YWwoXHJcbiAgICAgIGVycm9yLnRpdGxlLFxyXG4gICAgICBlcnJvci5tc2csXHJcbiAgICAgICdlcnJvcidcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
