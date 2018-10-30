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
const student_service_1 = require("../../services/student.service");
const client_service_1 = require("../../services/client.service");
const ng2_file_upload_1 = require("ng2-file-upload");
const URL = 'api/uploadFile';
let FileUploadComponent = class FileUploadComponent {
    constructor(router, route, authService, studentService, clientService) {
        this.router = router;
        this.route = route;
        this.authService = authService;
        this.studentService = studentService;
        this.clientService = clientService;
        this.users = [];
        this.hasBaseDropZoneOver = false;
        this.uploader = new ng2_file_upload_1.FileUploader({ url: URL });
        this.uploader.onCompleteItem = (item, response, status, headers) => {
            // console.log("ImageUpload:uploaded:", item, status);
        };
    }
    ngOnInit() {
        this.studentService
            .getStudents()
            .then(students => {
            this.students = students;
            for (let student of this.students) {
                var info = { label: student.firstName + ' ' + student.lastName, value: student.userID };
                this.users.push(info);
            }
        })
            .catch(error => {
            // do something
        });
        this.clientService
            .getClients()
            .then(clients => {
            this.clients = clients.clients;
            for (let client of this.clients) {
                var info = { label: client.firstName + ' ' + client.lastName, value: client.userID };
                this.users.push(info);
            }
        })
            .catch(error => {
            // do something
        });
    }
    userSelect() {
        // this.uploader.setOptions({
        //   additionalParameter: { studentID: this.selectedStudent }
        // });
        this.uploader.onBeforeUploadItem = (item) => {
            item.file.name = this.selectedStudent + '_' + item.file.name;
        };
    }
    fileOverBase(e) {
        this.hasBaseDropZoneOver = e;
    }
    goBack() {
        window.history.back();
    }
};
FileUploadComponent = __decorate([
    core_1.Component({
        selector: 'fileUpload',
        templateUrl: './app/components/file-upload/file-upload.component.html',
        styleUrls: ['./app/components/file-upload/file-upload.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, router_2.ActivatedRoute, authentication_service_1.AuthService, student_service_1.StudentService, client_service_1.ClientService])
], FileUploadComponent);
exports.FileUploadComponent = FileUploadComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBeUQ7QUFDekQsNENBQXlDO0FBQ3pDLDRDQUF5RDtBQUN6RCxrRkFBb0U7QUFDcEUsb0VBQWdFO0FBQ2hFLGtFQUE4RDtBQUM5RCxxREFBK0M7QUFJL0MsTUFBTSxHQUFHLEdBQUcsZ0JBQWdCLENBQUM7QUFRN0IsSUFBYSxtQkFBbUIsR0FBaEM7SUFPRSxZQUFvQixNQUFjLEVBQVUsS0FBcUIsRUFBVSxXQUF3QixFQUFVLGNBQThCLEVBQVUsYUFBNEI7UUFBN0osV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUZqTCxVQUFLLEdBQVUsRUFBRSxDQUFDO1FBNkNYLHdCQUFtQixHQUFXLEtBQUssQ0FBQztRQTFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLDhCQUFZLENBQUMsRUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBRyxDQUFDLElBQVEsRUFBRSxRQUFZLEVBQUUsTUFBVSxFQUFFLE9BQVcsRUFBRSxFQUFFO1lBQy9FLHNEQUFzRDtRQUMxRCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxjQUFjO2FBQ2QsV0FBVyxFQUFFO2FBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDekIsS0FBSyxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNqQyxJQUFJLElBQUksR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3hGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZCO1FBQ0wsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2IsZUFBZTtRQUNqQixDQUFDLENBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxhQUFhO2FBQ2IsVUFBVSxFQUFFO2FBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1osSUFBSSxDQUFDLE9BQU8sR0FBSSxPQUFlLENBQUMsT0FBTyxDQUFDO1lBQ3hDLEtBQUssSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDL0IsSUFBSSxJQUFJLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNyRixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN2QjtRQUNMLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNiLGVBQWU7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsVUFBVTtRQUNSLDZCQUE2QjtRQUM3Qiw2REFBNkQ7UUFDN0QsTUFBTTtRQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMvRCxDQUFDLENBQUM7SUFDSixDQUFDO0lBSU0sWUFBWSxDQUFDLENBQUs7UUFDdkIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztDQUNGLENBQUE7QUEzRFksbUJBQW1CO0lBTi9CLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsWUFBWTtRQUN0QixXQUFXLEVBQUUseURBQXlEO1FBQ3RFLFNBQVMsRUFBRSxDQUFDLHdEQUF3RCxDQUFDO0tBQ3hFLENBQUM7cUNBUzRCLGVBQU0sRUFBaUIsdUJBQWMsRUFBdUIsb0NBQVcsRUFBMEIsZ0NBQWMsRUFBeUIsOEJBQWE7R0FQdEssbUJBQW1CLENBMkQvQjtBQTNEWSxrREFBbUIiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvZmlsZS11cGxvYWQvZmlsZS11cGxvYWQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jbGllbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IEZpbGVVcGxvYWRlciB9IGZyb20gJ25nMi1maWxlLXVwbG9hZCc7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL1N0dWRlbnRcIjtcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9DbGllbnRcIjtcclxuXHJcbmNvbnN0IFVSTCA9ICdhcGkvdXBsb2FkRmlsZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZmlsZVVwbG9hZCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvZmlsZS11cGxvYWQvZmlsZS11cGxvYWQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvZmlsZS11cGxvYWQvZmlsZS11cGxvYWQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRmlsZVVwbG9hZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHVibGljIHVwbG9hZGVyOkZpbGVVcGxvYWRlcjtcclxuICBzdHVkZW50czogU3R1ZGVudFtdO1xyXG4gIGNsaWVudHM6IENsaWVudFtdO1xyXG4gIHNlbGVjdGVkU3R1ZGVudDogbnVtYmVyO1xyXG4gIHVzZXJzOiBhbnlbXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsIHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlLCBwcml2YXRlIGNsaWVudFNlcnZpY2U6IENsaWVudFNlcnZpY2UpIHtcclxuICAgIHRoaXMudXBsb2FkZXIgPSBuZXcgRmlsZVVwbG9hZGVyKHt1cmw6IFVSTH0pO1xyXG4gICAgdGhpcy51cGxvYWRlci5vbkNvbXBsZXRlSXRlbSA9IChpdGVtOmFueSwgcmVzcG9uc2U6YW55LCBzdGF0dXM6YW55LCBoZWFkZXJzOmFueSkgPT4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiSW1hZ2VVcGxvYWQ6dXBsb2FkZWQ6XCIsIGl0ZW0sIHN0YXR1cyk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgLmdldFN0dWRlbnRzKClcclxuICAgICAgICAudGhlbihzdHVkZW50cyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3R1ZGVudHMgPSBzdHVkZW50cztcclxuICAgICAgICAgICAgZm9yIChsZXQgc3R1ZGVudCBvZiB0aGlzLnN0dWRlbnRzKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGluZm8gPSB7IGxhYmVsOiBzdHVkZW50LmZpcnN0TmFtZSArICcgJyArIHN0dWRlbnQubGFzdE5hbWUsIHZhbHVlOiBzdHVkZW50LnVzZXJJRCB9O1xyXG4gICAgICAgICAgICAgIHRoaXMudXNlcnMucHVzaChpbmZvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgIC8vIGRvIHNvbWV0aGluZ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgICAgICAgIC5nZXRDbGllbnRzKClcclxuICAgICAgICAgIC50aGVuKGNsaWVudHMgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuY2xpZW50cyA9IChjbGllbnRzIGFzIGFueSkuY2xpZW50cztcclxuICAgICAgICAgICAgICBmb3IgKGxldCBjbGllbnQgb2YgdGhpcy5jbGllbnRzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5mbyA9IHsgbGFiZWw6IGNsaWVudC5maXJzdE5hbWUgKyAnICcgKyBjbGllbnQubGFzdE5hbWUsIHZhbHVlOiBjbGllbnQudXNlcklEIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJzLnB1c2goaW5mbyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIC8vIGRvIHNvbWV0aGluZ1xyXG4gICAgICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICB1c2VyU2VsZWN0KCkge1xyXG4gICAgLy8gdGhpcy51cGxvYWRlci5zZXRPcHRpb25zKHtcclxuICAgIC8vICAgYWRkaXRpb25hbFBhcmFtZXRlcjogeyBzdHVkZW50SUQ6IHRoaXMuc2VsZWN0ZWRTdHVkZW50IH1cclxuICAgIC8vIH0pO1xyXG4gICAgdGhpcy51cGxvYWRlci5vbkJlZm9yZVVwbG9hZEl0ZW0gPSAoaXRlbSkgPT4ge1xyXG4gICAgICBpdGVtLmZpbGUubmFtZSA9IHRoaXMuc2VsZWN0ZWRTdHVkZW50ICsgJ18nICsgaXRlbS5maWxlLm5hbWU7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhhc0Jhc2VEcm9wWm9uZU92ZXI6Ym9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBwdWJsaWMgZmlsZU92ZXJCYXNlKGU6YW55KTp2b2lkIHtcclxuICAgIHRoaXMuaGFzQmFzZURyb3Bab25lT3ZlciA9IGU7XHJcbiAgfVxyXG5cclxuICBnb0JhY2soKSB7XHJcbiAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19
