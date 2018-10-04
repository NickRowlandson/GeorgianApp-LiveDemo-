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
const router_2 = require("@angular/router");
const authentication_service_1 = require("../../services/authentication.service");
const http_1 = require("@angular/http");
const files_service_1 = require("../../services/files.service");
let FilesComponent = class FilesComponent {
    constructor(http, router, route, authService, filesService) {
        this.http = http;
        this.router = router;
        this.route = route;
        this.authService = authService;
        this.filesService = filesService;
    }
    ngOnInit() {
        swal({
            title: 'Loading...',
            allowOutsideClick: false
        });
        swal.showLoading();
        this.getFiles();
    }
    getFiles() {
        this.filesService
            .getFiles()
            .then(files => {
            this.files = files;
            swal.close();
        })
            .catch(error => error);
    }
    download(file) {
        var filename = file.milliseconds + "_" + file.userID + "_" + file.filename;
        this.filesService
            .download(filename)
            .then(response => {
            var blob = new Blob([response], { type: "application/pdf" });
            saveAs(blob, file.filename);
        })
            .catch(error => error);
    }
    deleteAlert(file) {
        var filename = file.milliseconds + "_" + file.userID + "_" + file.filename;
        swal({
            title: 'Delete file (' + file.filename + ')?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(isConfirm => {
            if (isConfirm.dismiss === "cancel" || isConfirm.dismiss === "overlay") {
                console.log(isConfirm.dismiss);
            }
            else if (isConfirm) {
                this.deleteFile(filename);
            }
        }).catch(error => error);
    }
    deleteFile(filename) {
        event.stopPropagation();
        this.filesService
            .delete(filename)
            .then(res => {
            this.getFiles();
            swal('Deleted!', 'File has been deleted.', 'success');
        })
            .catch(error => error);
    }
    addFile() {
        this.router.navigate(['/file-upload']);
    }
    goBack() {
        window.history.back();
    }
};
FilesComponent = __decorate([
    core_1.Component({
        selector: 'files',
        templateUrl: './app/components/files/files.component.html',
        styleUrls: ['./app/components/files/files.component.css']
    }),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router, router_2.ActivatedRoute, authentication_service_1.AuthService, files_service_1.FilesService])
], FilesComponent);
exports.FilesComponent = FilesComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9maWxlcy9maWxlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBeUQ7QUFDekQsNENBQXlDO0FBQ3pDLDRDQUF5RDtBQUN6RCxrRkFBb0U7QUFDcEUsd0NBQXdFO0FBQ3hFLGdFQUE0RDtBQVc1RCxJQUFhLGNBQWMsR0FBM0I7SUFFRSxZQUFvQixJQUFVLEVBQVUsTUFBYyxFQUFVLEtBQXFCLEVBQVUsV0FBd0IsRUFBVSxZQUEwQjtRQUF2SSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUUzSixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQztZQUNILEtBQUssRUFBRSxZQUFZO1lBQ25CLGlCQUFpQixFQUFFLEtBQUs7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZO2FBQ1osUUFBUSxFQUFFO2FBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMzRSxJQUFJLENBQUMsWUFBWTthQUNaLFFBQVEsQ0FBQyxRQUFRLENBQUM7YUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2YsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBQyxDQUFDLENBQUM7WUFDM0QsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFJO1FBQ1osSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMzRSxJQUFJLENBQUM7WUFDRCxLQUFLLEVBQUUsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSTtZQUM3QyxJQUFJLEVBQUUsbUNBQW1DO1lBQ3pDLElBQUksRUFBRSxTQUFTO1lBQ2YsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixrQkFBa0IsRUFBRSxTQUFTO1lBQzdCLGlCQUFpQixFQUFFLE1BQU07WUFDekIsaUJBQWlCLEVBQUUsaUJBQWlCO1NBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDbEIsSUFBSSxTQUFTLENBQUMsT0FBTyxLQUFLLFFBQVEsSUFBSSxTQUFTLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtnQkFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDaEM7aUJBQU0sSUFBSSxTQUFTLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDM0I7UUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsVUFBVSxDQUFDLFFBQVE7UUFDZixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVk7YUFDWixNQUFNLENBQUMsUUFBUSxDQUFDO2FBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNSLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQ0EsVUFBVSxFQUNWLHdCQUF3QixFQUN4QixTQUFTLENBQ1osQ0FBQztRQUNOLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxNQUFNO1FBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0NBQ0YsQ0FBQTtBQTdFWSxjQUFjO0lBTjFCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsT0FBTztRQUNqQixXQUFXLEVBQUUsNkNBQTZDO1FBQzFELFNBQVMsRUFBRSxDQUFDLDRDQUE0QyxDQUFDO0tBQzVELENBQUM7cUNBSTBCLFdBQUksRUFBa0IsZUFBTSxFQUFpQix1QkFBYyxFQUF1QixvQ0FBVyxFQUF3Qiw0QkFBWTtHQUZoSixjQUFjLENBNkUxQjtBQTdFWSx3Q0FBYyIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9maWxlcy9maWxlcy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEh0dHAsIEhlYWRlcnMsIFJlc3BvbnNlLCBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBGaWxlc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmlsZXMuc2VydmljZVwiO1xyXG5cclxuZGVjbGFyZSB2YXIgc3dhbDogYW55O1xyXG5kZWNsYXJlIHZhciBGaWxlU2F2ZXI6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdmaWxlcycsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvZmlsZXMvZmlsZXMuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvZmlsZXMvZmlsZXMuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRmlsZXNDb21wb25lbnQge1xyXG4gIHByaXZhdGUgZmlsZXM6IGFueVtdO1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIGZpbGVzU2VydmljZTogRmlsZXNTZXJ2aWNlKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBzd2FsKHtcclxuICAgICAgdGl0bGU6ICdMb2FkaW5nLi4uJyxcclxuICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIHN3YWwuc2hvd0xvYWRpbmcoKTtcclxuICAgIHRoaXMuZ2V0RmlsZXMoKTtcclxuICB9XHJcblxyXG4gIGdldEZpbGVzKCkge1xyXG4gICAgdGhpcy5maWxlc1NlcnZpY2VcclxuICAgICAgICAuZ2V0RmlsZXMoKVxyXG4gICAgICAgIC50aGVuKGZpbGVzID0+IHtcclxuICAgICAgICAgIHRoaXMuZmlsZXMgPSBmaWxlcztcclxuICAgICAgICAgIHN3YWwuY2xvc2UoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBkb3dubG9hZChmaWxlKSB7XHJcbiAgICB2YXIgZmlsZW5hbWUgPSBmaWxlLm1pbGxpc2Vjb25kcyArIFwiX1wiICsgZmlsZS51c2VySUQgKyBcIl9cIiArIGZpbGUuZmlsZW5hbWU7XHJcbiAgICB0aGlzLmZpbGVzU2VydmljZVxyXG4gICAgICAgIC5kb3dubG9hZChmaWxlbmFtZSlcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICB2YXIgYmxvYiA9IG5ldyBCbG9iKFtyZXNwb25zZV0sIHt0eXBlOiBcImFwcGxpY2F0aW9uL3BkZlwifSk7XHJcbiAgICAgICAgICBzYXZlQXMoYmxvYiwgZmlsZS5maWxlbmFtZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlQWxlcnQoZmlsZSkge1xyXG4gICAgICB2YXIgZmlsZW5hbWUgPSBmaWxlLm1pbGxpc2Vjb25kcyArIFwiX1wiICsgZmlsZS51c2VySUQgKyBcIl9cIiArIGZpbGUuZmlsZW5hbWU7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdEZWxldGUgZmlsZSAoJyArIGZpbGUuZmlsZW5hbWUgKyAnKT8nLFxyXG4gICAgICAgICAgdGV4dDogXCJZb3Ugd29uJ3QgYmUgYWJsZSB0byByZXZlcnQgdGhpcyFcIixcclxuICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgZGVsZXRlIGl0ISdcclxuICAgICAgfSkudGhlbihpc0NvbmZpcm0gPT4ge1xyXG4gICAgICAgIGlmIChpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJjYW5jZWxcIiB8fCBpc0NvbmZpcm0uZGlzbWlzcyA9PT0gXCJvdmVybGF5XCIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGlzQ29uZmlybS5kaXNtaXNzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzQ29uZmlybSkge1xyXG4gICAgICAgICAgdGhpcy5kZWxldGVGaWxlKGZpbGVuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZUZpbGUoZmlsZW5hbWUpIHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHRoaXMuZmlsZXNTZXJ2aWNlXHJcbiAgICAgICAgICAuZGVsZXRlKGZpbGVuYW1lKVxyXG4gICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmdldEZpbGVzKCk7XHJcbiAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgJ0RlbGV0ZWQhJyxcclxuICAgICAgICAgICAgICAgICAgJ0ZpbGUgaGFzIGJlZW4gZGVsZXRlZC4nLFxyXG4gICAgICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBlcnJvcik7XHJcbiAgfVxyXG5cclxuICBhZGRGaWxlKCkge1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9maWxlLXVwbG9hZCddKTtcclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=
