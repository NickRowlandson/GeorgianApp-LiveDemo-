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
var router_2 = require("@angular/router");
var authentication_service_1 = require("../../services/authentication.service");
var ng2_file_upload_1 = require("ng2-file-upload");
var URL = 'api/uploadFile';
var FileUploadComponent = /** @class */ (function () {
    function FileUploadComponent(router, route, authService) {
        this.router = router;
        this.route = route;
        this.authService = authService;
        this.hasBaseDropZoneOver = false;
        this.uploader = new ng2_file_upload_1.FileUploader({ url: URL });
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            console.log("ImageUpload:uploaded:", item, status);
        };
    }
    FileUploadComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    FileUploadComponent.prototype.goBack = function () {
        window.history.back();
    };
    FileUploadComponent = __decorate([
        core_1.Component({
            selector: 'fileUpload',
            templateUrl: './app/components/file-upload/file-upload.component.html',
            styleUrls: ['./app/components/file-upload/file-upload.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, router_2.ActivatedRoute, authentication_service_1.AuthService])
    ], FileUploadComponent);
    return FileUploadComponent;
}());
exports.FileUploadComponent = FileUploadComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBaUQ7QUFDakQsMENBQXlDO0FBQ3pDLDBDQUF5RDtBQUN6RCxnRkFBb0U7QUFDcEUsbURBQStDO0FBRS9DLElBQU0sR0FBRyxHQUFHLGdCQUFnQixDQUFDO0FBUTdCO0lBR0UsNkJBQW9CLE1BQWMsRUFBVSxLQUFxQixFQUFVLFdBQXdCO1FBQS9FLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBTzVGLHdCQUFtQixHQUFXLEtBQUssQ0FBQztRQU56QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksOEJBQVksQ0FBQyxFQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxHQUFHLFVBQUMsSUFBUSxFQUFFLFFBQVksRUFBRSxNQUFVLEVBQUUsT0FBVztZQUMzRSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUM7SUFDSixDQUFDO0lBSU0sMENBQVksR0FBbkIsVUFBb0IsQ0FBSztRQUN2QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxvQ0FBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBbEJVLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsV0FBVyxFQUFFLHlEQUF5RDtZQUN0RSxTQUFTLEVBQUUsQ0FBQyx3REFBd0QsQ0FBQztTQUN4RSxDQUFDO3lDQUs0QixlQUFNLEVBQWlCLHVCQUFjLEVBQXVCLG9DQUFXO09BSHhGLG1CQUFtQixDQW1CL0I7SUFBRCwwQkFBQztDQW5CRCxBQW1CQyxJQUFBO0FBbkJZLGtEQUFtQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGaWxlVXBsb2FkZXIgfSBmcm9tICduZzItZmlsZS11cGxvYWQnO1xyXG5cclxuY29uc3QgVVJMID0gJ2FwaS91cGxvYWRGaWxlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdmaWxlVXBsb2FkJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkQ29tcG9uZW50IHtcclxuICBwdWJsaWMgdXBsb2FkZXI6RmlsZVVwbG9hZGVyO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHtcclxuICAgIHRoaXMudXBsb2FkZXIgPSBuZXcgRmlsZVVwbG9hZGVyKHt1cmw6IFVSTH0pO1xyXG4gICAgdGhpcy51cGxvYWRlci5vbkNvbXBsZXRlSXRlbSA9IChpdGVtOmFueSwgcmVzcG9uc2U6YW55LCBzdGF0dXM6YW55LCBoZWFkZXJzOmFueSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW1hZ2VVcGxvYWQ6dXBsb2FkZWQ6XCIsIGl0ZW0sIHN0YXR1cyk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhhc0Jhc2VEcm9wWm9uZU92ZXI6Ym9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBwdWJsaWMgZmlsZU92ZXJCYXNlKGU6YW55KTp2b2lkIHtcclxuICAgIHRoaXMuaGFzQmFzZURyb3Bab25lT3ZlciA9IGU7XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
