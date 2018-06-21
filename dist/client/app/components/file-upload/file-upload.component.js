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
var student_service_1 = require("../../services/student.service");
var client_service_1 = require("../../services/client.service");
var ng2_file_upload_1 = require("ng2-file-upload");
var URL = 'api/uploadFile';
var FileUploadComponent = /** @class */ (function () {
    function FileUploadComponent(router, route, authService, studentService, clientService) {
        this.router = router;
        this.route = route;
        this.authService = authService;
        this.studentService = studentService;
        this.clientService = clientService;
        this.users = [];
        this.hasBaseDropZoneOver = false;
        this.uploader = new ng2_file_upload_1.FileUploader({ url: URL });
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            console.log("ImageUpload:uploaded:", item, status);
        };
    }
    FileUploadComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.studentService
            .getStudents()
            .then(function (students) {
            _this.students = students;
            for (var _i = 0, _a = _this.students; _i < _a.length; _i++) {
                var student = _a[_i];
                var info = { label: student.firstName + ' ' + student.lastName, value: student.userID };
                _this.users.push(info);
            }
        })
            .catch(function (error) {
            // do something
        });
        this.clientService
            .getClients()
            .then(function (clients) {
            console.log(clients);
            _this.clients = clients.clients;
            for (var _i = 0, _a = _this.clients; _i < _a.length; _i++) {
                var client = _a[_i];
                console.log(client);
                var info = { label: client.firstName + ' ' + client.lastName, value: client.userID };
                _this.users.push(info);
            }
            console.log(_this.users);
        })
            .catch(function (error) {
            // do something
        });
    };
    FileUploadComponent.prototype.userSelect = function () {
        var _this = this;
        console.log(this.selectedStudent);
        // this.uploader.setOptions({
        //   additionalParameter: { studentID: this.selectedStudent }
        // });
        this.uploader.onBeforeUploadItem = function (item) {
            item.file.name = _this.selectedStudent + '_' + item.file.name;
        };
    };
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
        __metadata("design:paramtypes", [router_1.Router, router_2.ActivatedRoute, authentication_service_1.AuthService, student_service_1.StudentService, client_service_1.ClientService])
    ], FileUploadComponent);
    return FileUploadComponent;
}());
exports.FileUploadComponent = FileUploadComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUQ7QUFDekQsMENBQXlDO0FBQ3pDLDBDQUF5RDtBQUN6RCxnRkFBb0U7QUFDcEUsa0VBQWdFO0FBQ2hFLGdFQUE4RDtBQUM5RCxtREFBK0M7QUFJL0MsSUFBTSxHQUFHLEdBQUcsZ0JBQWdCLENBQUM7QUFRN0I7SUFPRSw2QkFBb0IsTUFBYyxFQUFVLEtBQXFCLEVBQVUsV0FBd0IsRUFBVSxjQUE4QixFQUFVLGFBQTRCO1FBQTdKLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFGakwsVUFBSyxHQUFVLEVBQUUsQ0FBQztRQWlEWCx3QkFBbUIsR0FBVyxLQUFLLENBQUM7UUE5Q3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSw4QkFBWSxDQUFDLEVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUcsVUFBQyxJQUFRLEVBQUUsUUFBWSxFQUFFLE1BQVUsRUFBRSxPQUFXO1lBQzNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBQUEsaUJBNEJDO1FBM0JDLElBQUksQ0FBQyxjQUFjO2FBQ2QsV0FBVyxFQUFFO2FBQ2IsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUNWLEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLEtBQW9CLFVBQWEsRUFBYixLQUFBLEtBQUksQ0FBQyxRQUFRLEVBQWIsY0FBYSxFQUFiLElBQWE7Z0JBQTVCLElBQUksT0FBTyxTQUFBO2dCQUNkLElBQUksSUFBSSxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDeEYsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkI7UUFDTCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLO1lBQ1YsZUFBZTtRQUNqQixDQUFDLENBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxhQUFhO2FBQ2IsVUFBVSxFQUFFO2FBQ1osSUFBSSxDQUFDLFVBQUEsT0FBTztZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkIsS0FBSSxDQUFDLE9BQU8sR0FBSSxPQUFlLENBQUMsT0FBTyxDQUFDO1lBQ3hDLEtBQW1CLFVBQVksRUFBWixLQUFBLEtBQUksQ0FBQyxPQUFPLEVBQVosY0FBWSxFQUFaLElBQVk7Z0JBQTFCLElBQUksTUFBTSxTQUFBO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BCLElBQUksSUFBSSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDckYsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkI7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLO1lBQ1YsZUFBZTtRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCx3Q0FBVSxHQUFWO1FBQUEsaUJBUUM7UUFQQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNsQyw2QkFBNkI7UUFDN0IsNkRBQTZEO1FBQzdELE1BQU07UUFDTixJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixHQUFHLFVBQUMsSUFBSTtZQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsZUFBZSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMvRCxDQUFDLENBQUM7SUFDSixDQUFDO0lBSU0sMENBQVksR0FBbkIsVUFBb0IsQ0FBSztRQUN2QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxvQ0FBTSxHQUFOO1FBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBOURVLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsV0FBVyxFQUFFLHlEQUF5RDtZQUN0RSxTQUFTLEVBQUUsQ0FBQyx3REFBd0QsQ0FBQztTQUN4RSxDQUFDO3lDQVM0QixlQUFNLEVBQWlCLHVCQUFjLEVBQXVCLG9DQUFXLEVBQTBCLGdDQUFjLEVBQXlCLDhCQUFhO09BUHRLLG1CQUFtQixDQStEL0I7SUFBRCwwQkFBQztDQS9ERCxBQStEQyxJQUFBO0FBL0RZLGtEQUFtQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ2xpZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRmlsZVVwbG9hZGVyIH0gZnJvbSAnbmcyLWZpbGUtdXBsb2FkJztcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvU3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL0NsaWVudFwiO1xyXG5cclxuY29uc3QgVVJMID0gJ2FwaS91cGxvYWRGaWxlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdmaWxlVXBsb2FkJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHAvY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBwdWJsaWMgdXBsb2FkZXI6RmlsZVVwbG9hZGVyO1xyXG4gIHN0dWRlbnRzOiBTdHVkZW50W107XHJcbiAgY2xpZW50czogQ2xpZW50W107XHJcbiAgc2VsZWN0ZWRTdHVkZW50OiBudW1iZXI7XHJcbiAgdXNlcnM6IGFueVtdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSwgcHJpdmF0ZSBzdHVkZW50U2VydmljZTogU3R1ZGVudFNlcnZpY2UsIHByaXZhdGUgY2xpZW50U2VydmljZTogQ2xpZW50U2VydmljZSkge1xyXG4gICAgdGhpcy51cGxvYWRlciA9IG5ldyBGaWxlVXBsb2FkZXIoe3VybDogVVJMfSk7XHJcbiAgICB0aGlzLnVwbG9hZGVyLm9uQ29tcGxldGVJdGVtID0gKGl0ZW06YW55LCByZXNwb25zZTphbnksIHN0YXR1czphbnksIGhlYWRlcnM6YW55KSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJJbWFnZVVwbG9hZDp1cGxvYWRlZDpcIiwgaXRlbSwgc3RhdHVzKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3R1ZGVudFNlcnZpY2VcclxuICAgICAgICAuZ2V0U3R1ZGVudHMoKVxyXG4gICAgICAgIC50aGVuKHN0dWRlbnRzID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdHVkZW50cyA9IHN0dWRlbnRzO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBzdHVkZW50IG9mIHRoaXMuc3R1ZGVudHMpIHtcclxuICAgICAgICAgICAgICB2YXIgaW5mbyA9IHsgbGFiZWw6IHN0dWRlbnQuZmlyc3ROYW1lICsgJyAnICsgc3R1ZGVudC5sYXN0TmFtZSwgdmFsdWU6IHN0dWRlbnQudXNlcklEIH07XHJcbiAgICAgICAgICAgICAgdGhpcy51c2Vycy5wdXNoKGluZm8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgLy8gZG8gc29tZXRoaW5nXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgICAgLmdldENsaWVudHMoKVxyXG4gICAgICAgICAgLnRoZW4oY2xpZW50cyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNsaWVudHMpO1xyXG4gICAgICAgICAgICAgIHRoaXMuY2xpZW50cyA9IChjbGllbnRzIGFzIGFueSkuY2xpZW50cztcclxuICAgICAgICAgICAgICBmb3IgKGxldCBjbGllbnQgb2YgdGhpcy5jbGllbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjbGllbnQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZm8gPSB7IGxhYmVsOiBjbGllbnQuZmlyc3ROYW1lICsgJyAnICsgY2xpZW50Lmxhc3ROYW1lLCB2YWx1ZTogY2xpZW50LnVzZXJJRCB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2Vycy5wdXNoKGluZm8pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVzZXJzKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAvLyBkbyBzb21ldGhpbmdcclxuICAgICAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXNlclNlbGVjdCgpIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0ZWRTdHVkZW50KTtcclxuICAgIC8vIHRoaXMudXBsb2FkZXIuc2V0T3B0aW9ucyh7XHJcbiAgICAvLyAgIGFkZGl0aW9uYWxQYXJhbWV0ZXI6IHsgc3R1ZGVudElEOiB0aGlzLnNlbGVjdGVkU3R1ZGVudCB9XHJcbiAgICAvLyB9KTtcclxuICAgIHRoaXMudXBsb2FkZXIub25CZWZvcmVVcGxvYWRJdGVtID0gKGl0ZW0pID0+IHtcclxuICAgICAgaXRlbS5maWxlLm5hbWUgPSB0aGlzLnNlbGVjdGVkU3R1ZGVudCArICdfJyArIGl0ZW0uZmlsZS5uYW1lO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYXNCYXNlRHJvcFpvbmVPdmVyOmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgcHVibGljIGZpbGVPdmVyQmFzZShlOmFueSk6dm9pZCB7XHJcbiAgICB0aGlzLmhhc0Jhc2VEcm9wWm9uZU92ZXIgPSBlO1xyXG4gIH1cclxuXHJcbiAgZ29CYWNrKCkge1xyXG4gICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
