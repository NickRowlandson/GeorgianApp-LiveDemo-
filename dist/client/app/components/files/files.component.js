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
var http_1 = require("@angular/http");
var files_service_1 = require("../../services/files.service");
var FilesComponent = /** @class */ (function () {
    function FilesComponent(http, router, route, authService, filesService) {
        this.http = http;
        this.router = router;
        this.route = route;
        this.authService = authService;
        this.filesService = filesService;
    }
    FilesComponent.prototype.ngOnInit = function () {
        this.getFiles();
    };
    FilesComponent.prototype.getFiles = function () {
        var _this = this;
        this.filesService
            .getFiles()
            .then(function (files) {
            _this.files = files;
        })
            .catch(function (error) { return error; });
    };
    FilesComponent.prototype.download = function (file) {
        var filename = file.milliseconds + "_" + file.filename;
        this.filesService
            .download(filename)
            .then(function (response) {
            var blob = new Blob([response], { type: "application/pdf" });
            //change download.pdf to the name of whatever you want your file to be
            console.log(blob);
            saveAs(blob, file.filename);
        })
            .catch(function (error) { return error; });
    };
    FilesComponent.prototype.deleteAlert = function (file) {
        var _this = this;
        var filename = file.milliseconds + "_" + file.filename;
        swal({
            title: 'Delete file (' + file.filename + ')?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (isConfirm) {
            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                console.log(isConfirm.dismiss);
            }
            else if (isConfirm) {
                _this.deleteFile(filename);
            }
        }).catch(function (error) { return error; });
    };
    FilesComponent.prototype.deleteFile = function (filename) {
        var _this = this;
        event.stopPropagation();
        this.filesService
            .delete(filename)
            .then(function (res) {
            _this.getFiles();
            swal('Deleted!', 'File has been deleted.', 'success');
        })
            .catch(function (error) { return error; });
    };
    FilesComponent.prototype.addFile = function () {
        this.router.navigate(['/file-upload']);
    };
    FilesComponent.prototype.goBack = function () {
        window.history.back();
    };
    FilesComponent = __decorate([
        core_1.Component({
            selector: 'files',
            templateUrl: './app/components/files/files.component.html',
            styleUrls: ['./app/components/files/files.component.css']
        }),
        __metadata("design:paramtypes", [http_1.Http, router_1.Router, router_2.ActivatedRoute, authentication_service_1.AuthService, files_service_1.FilesService])
    ], FilesComponent);
    return FilesComponent;
}());
exports.FilesComponent = FilesComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9maWxlcy9maWxlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUQ7QUFDekQsMENBQXlDO0FBQ3pDLDBDQUF5RDtBQUN6RCxnRkFBb0U7QUFDcEUsc0NBQXdFO0FBQ3hFLDhEQUE0RDtBQVc1RDtJQUVFLHdCQUFvQixJQUFVLEVBQVUsTUFBYyxFQUFVLEtBQXFCLEVBQVUsV0FBd0IsRUFBVSxZQUEwQjtRQUF2SSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUUzSixDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkMsSUFBSSxDQUFDLFlBQVk7YUFDWixRQUFRLEVBQUU7YUFDVixJQUFJLENBQUMsVUFBQSxLQUFLO1lBQ1QsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxFQUFMLENBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxpQ0FBUSxHQUFSLFVBQVMsSUFBSTtRQUNYLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkQsSUFBSSxDQUFDLFlBQVk7YUFDWixRQUFRLENBQUMsUUFBUSxDQUFDO2FBQ2xCLElBQUksQ0FBQyxVQUFBLFFBQVE7WUFDWixJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFDLENBQUMsQ0FBQztZQUMzRCxzRUFBc0U7WUFDdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLEVBQUwsQ0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELG9DQUFXLEdBQVgsVUFBWSxJQUFJO1FBQWhCLGlCQWlCQztRQWhCRyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZELElBQUksQ0FBQztZQUNELEtBQUssRUFBRSxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJO1lBQzdDLElBQUksRUFBRSxtQ0FBbUM7WUFDekMsSUFBSSxFQUFFLFNBQVM7WUFDZixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLGtCQUFrQixFQUFFLFNBQVM7WUFDN0IsaUJBQWlCLEVBQUUsTUFBTTtZQUN6QixpQkFBaUIsRUFBRSxpQkFBaUI7U0FDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFNBQVM7WUFDZixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxLQUFLLFFBQVEsSUFBSSxTQUFTLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDckIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxFQUFMLENBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxtQ0FBVSxHQUFWLFVBQVcsUUFBUTtRQUFuQixpQkFhQztRQVpHLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWTthQUNaLE1BQU0sQ0FBQyxRQUFRLENBQUM7YUFDaEIsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUNMLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQ0EsVUFBVSxFQUNWLHdCQUF3QixFQUN4QixTQUFTLENBQ1osQ0FBQztRQUNOLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssRUFBTCxDQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsZ0NBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQXhFVSxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsT0FBTztZQUNqQixXQUFXLEVBQUUsNkNBQTZDO1lBQzFELFNBQVMsRUFBRSxDQUFDLDRDQUE0QyxDQUFDO1NBQzVELENBQUM7eUNBSTBCLFdBQUksRUFBa0IsZUFBTSxFQUFpQix1QkFBYyxFQUF1QixvQ0FBVyxFQUF3Qiw0QkFBWTtPQUZoSixjQUFjLENBeUUxQjtJQUFELHFCQUFDO0NBekVELEFBeUVDLElBQUE7QUF6RVksd0NBQWMiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvZmlsZXMvZmlsZXMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSwgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgRmlsZXNTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ZpbGVzLnNlcnZpY2VcIjtcclxuXHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuZGVjbGFyZSB2YXIgRmlsZVNhdmVyOiBhbnk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZmlsZXMnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9jb21wb25lbnRzL2ZpbGVzL2ZpbGVzLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL2ZpbGVzL2ZpbGVzLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEZpbGVzQ29tcG9uZW50IHtcclxuICBwcml2YXRlIGZpbGVzOiBhbnlbXTtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBmaWxlc1NlcnZpY2U6IEZpbGVzU2VydmljZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5nZXRGaWxlcygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RmlsZXMoKSB7XHJcbiAgICB0aGlzLmZpbGVzU2VydmljZVxyXG4gICAgICAgIC5nZXRGaWxlcygpXHJcbiAgICAgICAgLnRoZW4oZmlsZXMgPT4ge1xyXG4gICAgICAgICAgdGhpcy5maWxlcyA9IGZpbGVzO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGRvd25sb2FkKGZpbGUpIHtcclxuICAgIHZhciBmaWxlbmFtZSA9IGZpbGUubWlsbGlzZWNvbmRzICsgXCJfXCIgKyBmaWxlLmZpbGVuYW1lO1xyXG4gICAgdGhpcy5maWxlc1NlcnZpY2VcclxuICAgICAgICAuZG93bmxvYWQoZmlsZW5hbWUpXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbcmVzcG9uc2VdLCB7dHlwZTogXCJhcHBsaWNhdGlvbi9wZGZcIn0pO1xyXG4gICAgICAgICAgLy9jaGFuZ2UgZG93bmxvYWQucGRmIHRvIHRoZSBuYW1lIG9mIHdoYXRldmVyIHlvdSB3YW50IHlvdXIgZmlsZSB0byBiZVxyXG4gICAgICAgICAgY29uc29sZS5sb2coYmxvYik7XHJcbiAgICAgICAgICBzYXZlQXMoYmxvYiwgZmlsZS5maWxlbmFtZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlQWxlcnQoZmlsZSkge1xyXG4gICAgICB2YXIgZmlsZW5hbWUgPSBmaWxlLm1pbGxpc2Vjb25kcyArIFwiX1wiICsgZmlsZS5maWxlbmFtZTtcclxuICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ0RlbGV0ZSBmaWxlICgnICsgZmlsZS5maWxlbmFtZSArICcpPycsXHJcbiAgICAgICAgICB0ZXh0OiBcIllvdSB3b24ndCBiZSBhYmxlIHRvIHJldmVydCB0aGlzIVwiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCBkZWxldGUgaXQhJ1xyXG4gICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgaWYgKGlzQ29uZmlybS5kaXNtaXNzID09PSBcImNhbmNlbFwiIHx8IGlzQ29uZmlybS5kaXNtaXNzID09PSBcIm92ZXJsYXlcIikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coaXNDb25maXJtLmRpc21pc3MpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICB0aGlzLmRlbGV0ZUZpbGUoZmlsZW5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlRmlsZShmaWxlbmFtZSkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgdGhpcy5maWxlc1NlcnZpY2VcclxuICAgICAgICAgIC5kZWxldGUoZmlsZW5hbWUpXHJcbiAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuZ2V0RmlsZXMoKTtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAnRGVsZXRlZCEnLFxyXG4gICAgICAgICAgICAgICAgICAnRmlsZSBoYXMgYmVlbiBkZWxldGVkLicsXHJcbiAgICAgICAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGFkZEZpbGUoKSB7XHJcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2ZpbGUtdXBsb2FkJ10pO1xyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
