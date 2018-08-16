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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUQ7QUFDekQsMENBQXlDO0FBQ3pDLDBDQUF5RDtBQUN6RCxnRkFBb0U7QUFDcEUsa0VBQWdFO0FBQ2hFLGdFQUE4RDtBQUM5RCxtREFBK0M7QUFJL0MsSUFBTSxHQUFHLEdBQUcsZ0JBQWdCLENBQUM7QUFRN0I7SUFPRSw2QkFBb0IsTUFBYyxFQUFVLEtBQXFCLEVBQVUsV0FBd0IsRUFBVSxjQUE4QixFQUFVLGFBQTRCO1FBQTdKLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFGakwsVUFBSyxHQUFVLEVBQUUsQ0FBQztRQWlEWCx3QkFBbUIsR0FBVyxLQUFLLENBQUM7UUE5Q3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSw4QkFBWSxDQUFDLEVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUcsVUFBQyxJQUFRLEVBQUUsUUFBWSxFQUFFLE1BQVUsRUFBRSxPQUFXO1lBQzNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBQUEsaUJBNEJDO1FBM0JDLElBQUksQ0FBQyxjQUFjO2FBQ2QsV0FBVyxFQUFFO2FBQ2IsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUNWLEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLEtBQW9CLFVBQWEsRUFBYixLQUFBLEtBQUksQ0FBQyxRQUFRLEVBQWIsY0FBYSxFQUFiLElBQWEsRUFBRTtnQkFBOUIsSUFBSSxPQUFPLFNBQUE7Z0JBQ2QsSUFBSSxJQUFJLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN4RixLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN2QjtRQUNMLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUs7WUFDVixlQUFlO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsSUFBSSxDQUFDLGFBQWE7YUFDYixVQUFVLEVBQUU7YUFDWixJQUFJLENBQUMsVUFBQSxPQUFPO1lBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuQixLQUFJLENBQUMsT0FBTyxHQUFJLE9BQWUsQ0FBQyxPQUFPLENBQUM7WUFDeEMsS0FBbUIsVUFBWSxFQUFaLEtBQUEsS0FBSSxDQUFDLE9BQU8sRUFBWixjQUFZLEVBQVosSUFBWSxFQUFFO2dCQUE1QixJQUFJLE1BQU0sU0FBQTtnQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwQixJQUFJLElBQUksR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3JGLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZCO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSztZQUNWLGVBQWU7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsd0NBQVUsR0FBVjtRQUFBLGlCQVFDO1FBUEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbEMsNkJBQTZCO1FBQzdCLDZEQUE2RDtRQUM3RCxNQUFNO1FBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsR0FBRyxVQUFDLElBQUk7WUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDL0QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUlNLDBDQUFZLEdBQW5CLFVBQW9CLENBQUs7UUFDdkIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsb0NBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQTlEVSxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFdBQVcsRUFBRSx5REFBeUQ7WUFDdEUsU0FBUyxFQUFFLENBQUMsd0RBQXdELENBQUM7U0FDeEUsQ0FBQzt5Q0FTNEIsZUFBTSxFQUFpQix1QkFBYyxFQUF1QixvQ0FBVyxFQUEwQixnQ0FBYyxFQUF5Qiw4QkFBYTtPQVB0SyxtQkFBbUIsQ0ErRC9CO0lBQUQsMEJBQUM7Q0EvREQsQUErREMsSUFBQTtBQS9EWSxrREFBbUIiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvZmlsZS11cGxvYWQvZmlsZS11cGxvYWQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jbGllbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IEZpbGVVcGxvYWRlciB9IGZyb20gJ25nMi1maWxlLXVwbG9hZCc7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL1N0dWRlbnRcIjtcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9DbGllbnRcIjtcclxuXHJcbmNvbnN0IFVSTCA9ICdhcGkvdXBsb2FkRmlsZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZmlsZVVwbG9hZCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvZmlsZS11cGxvYWQvZmlsZS11cGxvYWQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvZmlsZS11cGxvYWQvZmlsZS11cGxvYWQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRmlsZVVwbG9hZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHVibGljIHVwbG9hZGVyOkZpbGVVcGxvYWRlcjtcclxuICBzdHVkZW50czogU3R1ZGVudFtdO1xyXG4gIGNsaWVudHM6IENsaWVudFtdO1xyXG4gIHNlbGVjdGVkU3R1ZGVudDogbnVtYmVyO1xyXG4gIHVzZXJzOiBhbnlbXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlLCBwcml2YXRlIGNsaWVudFNlcnZpY2U6IENsaWVudFNlcnZpY2UpIHtcclxuICAgIHRoaXMudXBsb2FkZXIgPSBuZXcgRmlsZVVwbG9hZGVyKHt1cmw6IFVSTH0pO1xyXG4gICAgdGhpcy51cGxvYWRlci5vbkNvbXBsZXRlSXRlbSA9IChpdGVtOmFueSwgcmVzcG9uc2U6YW55LCBzdGF0dXM6YW55LCBoZWFkZXJzOmFueSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW1hZ2VVcGxvYWQ6dXBsb2FkZWQ6XCIsIGl0ZW0sIHN0YXR1cyk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgLmdldFN0dWRlbnRzKClcclxuICAgICAgICAudGhlbihzdHVkZW50cyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3R1ZGVudHMgPSBzdHVkZW50cztcclxuICAgICAgICAgICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLnN0dWRlbnRzKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGluZm8gPSB7IGxhYmVsOiBzdHVkZW50LmZpcnN0TmFtZSArICcgJyArIHN0dWRlbnQubGFzdE5hbWUsIHZhbHVlOiBzdHVkZW50LnVzZXJJRCB9O1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlcnMucHVzaChpbmZvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgIC8vIGRvIHNvbWV0aGluZ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgIC5nZXRDbGllbnRzKClcclxuICAgICAgICAgIC50aGVuKGNsaWVudHMgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjbGllbnRzKTtcclxuICAgICAgICAgICAgICB0aGlzLmNsaWVudHMgPSAoY2xpZW50cyBhcyBhbnkpLmNsaWVudHM7XHJcbiAgICAgICAgICAgICAgZm9yIChsZXQgY2xpZW50IG9mIHRoaXMuY2xpZW50cykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY2xpZW50KTtcclxuICAgICAgICAgICAgICAgIHZhciBpbmZvID0geyBsYWJlbDogY2xpZW50LmZpcnN0TmFtZSArICcgJyArIGNsaWVudC5sYXN0TmFtZSwgdmFsdWU6IGNsaWVudC51c2VySUQgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlcnMucHVzaChpbmZvKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy51c2Vycyk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgLy8gZG8gc29tZXRoaW5nXHJcbiAgICAgICAgICB9KTtcclxuICB9XHJcblxyXG4gIHVzZXJTZWxlY3QoKSB7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLnNlbGVjdGVkU3R1ZGVudCk7XHJcbiAgICAvLyB0aGlzLnVwbG9hZGVyLnNldE9wdGlvbnMoe1xyXG4gICAgLy8gICBhZGRpdGlvbmFsUGFyYW1ldGVyOiB7IHN0dWRlbnRJRDogdGhpcy5zZWxlY3RlZFN0dWRlbnQgfVxyXG4gICAgLy8gfSk7XHJcbiAgICB0aGlzLnVwbG9hZGVyLm9uQmVmb3JlVXBsb2FkSXRlbSA9IChpdGVtKSA9PiB7XHJcbiAgICAgIGl0ZW0uZmlsZS5uYW1lID0gdGhpcy5zZWxlY3RlZFN0dWRlbnQgKyAnXycgKyBpdGVtLmZpbGUubmFtZTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGFzQmFzZURyb3Bab25lT3Zlcjpib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIHB1YmxpYyBmaWxlT3ZlckJhc2UoZTphbnkpOnZvaWQge1xyXG4gICAgdGhpcy5oYXNCYXNlRHJvcFpvbmVPdmVyID0gZTtcclxuICB9XHJcblxyXG4gIGdvQmFjaygpIHtcclxuICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gIH1cclxufVxyXG4iXX0=
