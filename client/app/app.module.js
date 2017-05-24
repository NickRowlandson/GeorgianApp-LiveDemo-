"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var charts_1 = require("ng2-charts/charts/charts");
//import { Pdffiller } from 'pdffiller/index';
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
//Import components
var login_component_1 = require("./components/login/login.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var staff_manage_component_1 = require("./components/staff-manage/staff-manage.component");
var staff_edit_component_1 = require("./components/staff-edit/staff-edit.component");
var student_manage_component_1 = require("./components/student-manage/student-manage.component");
var student_edit_component_1 = require("./components/student-edit/student-edit.component");
var client_status_component_1 = require("./components/client-status/client-status.component");
var suitability_form_component_1 = require("./components/suitability-form/suitability-form.component");
var consent_form_component_1 = require("./components/consent-form/consent-form.component");
var case_notes_component_1 = require("./components/case-notes/case-notes.component");
var course_manage_component_1 = require("./components/course-manage/course-manage.component");
//Import services
var auth_guard_1 = require("./guards/auth.guard");
var admin_guard_1 = require("./guards/admin.guard");
var staff_guard_1 = require("./guards/staff.guard");
var student_guard_1 = require("./guards/student.guard");
var client_guard_1 = require("./guards/client.guard");
var authentication_service_1 = require("./services/authentication.service");
var student_service_1 = require("./services/student.service");
var client_service_1 = require("./services/client.service");
var staff_service_1 = require("./services/staff.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            app_routing_1.routing,
            charts_1.ChartsModule
        ],
        declarations: [
            app_component_1.AppComponent,
            login_component_1.LoginComponent,
            dashboard_component_1.DashboardComponent,
            staff_manage_component_1.StaffManageComponent,
            staff_edit_component_1.StaffEditComponent,
            student_manage_component_1.StudentManageComponent,
            student_edit_component_1.StudentEditComponent,
            client_status_component_1.ClientStatusComponent,
            suitability_form_component_1.SuitabilityFormComponent,
            consent_form_component_1.ConsentFormComponent,
            case_notes_component_1.CaseNotesComponent,
            course_manage_component_1.CourseManageComponent
        ],
        providers: [
            auth_guard_1.AuthGuard,
            admin_guard_1.AdminGuard,
            staff_guard_1.StaffGuard,
            student_guard_1.StudentGuard,
            client_guard_1.ClientGuard,
            authentication_service_1.AuthService,
            student_service_1.StudentService,
            staff_service_1.StaffService,
            client_service_1.ClientService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvYXBwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUF5QztBQUN6Qyw4REFBMEQ7QUFDMUQsd0NBQTZDO0FBQzdDLHNDQUEyQztBQUMzQyxtREFBd0Q7QUFDeEQsOENBQThDO0FBQzlDLGlEQUErQztBQUMvQyw2Q0FBd0M7QUFFeEMsbUJBQW1CO0FBQ25CLHNFQUFvRTtBQUNwRSxrRkFBZ0Y7QUFDaEYsMkZBQXdGO0FBQ3hGLHFGQUFrRjtBQUNsRixpR0FBOEY7QUFDOUYsMkZBQXdGO0FBQ3hGLDhGQUEyRjtBQUMzRix1R0FBb0c7QUFDcEcsMkZBQXdGO0FBQ3hGLHFGQUFrRjtBQUNsRiw4RkFBMkY7QUFFM0YsaUJBQWlCO0FBQ2pCLGtEQUFnRDtBQUNoRCxvREFBa0Q7QUFDbEQsb0RBQWtEO0FBQ2xELHdEQUFzRDtBQUN0RCxzREFBb0Q7QUFDcEQsNEVBQWdFO0FBQ2hFLDhEQUE0RDtBQUM1RCw0REFBMEQ7QUFDMUQsMERBQXdEO0FBcUN4RCxJQUFhLFNBQVM7SUFBdEI7SUFBeUIsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBekIsQUFBMEIsSUFBQTtBQUFiLFNBQVM7SUFuQ3JCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLGdDQUFhO1lBQ2IsaUJBQVU7WUFDVixtQkFBVztZQUNYLHFCQUFPO1lBQ1AscUJBQVk7U0FDWDtRQUNILFlBQVksRUFBRTtZQUNaLDRCQUFZO1lBQ1osZ0NBQWM7WUFDZCx3Q0FBa0I7WUFDbEIsNkNBQW9CO1lBQ3BCLHlDQUFrQjtZQUNsQixpREFBc0I7WUFDdEIsNkNBQW9CO1lBQ3BCLCtDQUFxQjtZQUNyQixxREFBd0I7WUFDeEIsNkNBQW9CO1lBQ3BCLHlDQUFrQjtZQUNsQiwrQ0FBcUI7U0FDdEI7UUFDRCxTQUFTLEVBQUU7WUFDVCxzQkFBUztZQUNULHdCQUFVO1lBQ1Ysd0JBQVU7WUFDViw0QkFBWTtZQUNaLDBCQUFXO1lBQ1gsb0NBQVc7WUFDWCxnQ0FBYztZQUNkLDRCQUFZO1lBQ1osOEJBQWE7U0FDZDtRQUNELFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7S0FDMUIsQ0FBQztHQUNXLFNBQVMsQ0FBSTtBQUFiLDhCQUFTIiwiZmlsZSI6ImFwcC9hcHAubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBDaGFydHNNb2R1bGUgfSBmcm9tICduZzItY2hhcnRzL2NoYXJ0cy9jaGFydHMnO1xyXG4vL2ltcG9ydCB7IFBkZmZpbGxlciB9IGZyb20gJ3BkZmZpbGxlci9pbmRleCc7XHJcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gJy4vYXBwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IHJvdXRpbmcgfSBmcm9tICcuL2FwcC5yb3V0aW5nJztcclxuXHJcbi8vSW1wb3J0IGNvbXBvbmVudHNcclxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbG9naW4vbG9naW4uY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGFzaGJvYXJkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3RhZmZNYW5hZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RhZmYtbWFuYWdlL3N0YWZmLW1hbmFnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdGFmZkVkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RhZmYtZWRpdC9zdGFmZi1lZGl0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0dWRlbnRNYW5hZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3R1ZGVudC1tYW5hZ2Uvc3R1ZGVudC1tYW5hZ2UuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3R1ZGVudEVkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3R1ZGVudC1lZGl0L3N0dWRlbnQtZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDbGllbnRTdGF0dXNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2xpZW50LXN0YXR1cy9jbGllbnQtc3RhdHVzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN1aXRhYmlsaXR5Rm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdWl0YWJpbGl0eS1mb3JtL3N1aXRhYmlsaXR5LWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29uc2VudEZvcm1Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29uc2VudC1mb3JtL2NvbnNlbnQtZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDYXNlTm90ZXNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FzZS1ub3Rlcy9jYXNlLW5vdGVzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvdXJzZU1hbmFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb3Vyc2UtbWFuYWdlL2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50JztcclxuXHJcbi8vSW1wb3J0IHNlcnZpY2VzXHJcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL2F1dGguZ3VhcmQnO1xyXG5pbXBvcnQgeyBBZG1pbkd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvYWRtaW4uZ3VhcmQnO1xyXG5pbXBvcnQgeyBTdGFmZkd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvc3RhZmYuZ3VhcmQnO1xyXG5pbXBvcnQgeyBTdHVkZW50R3VhcmQgfSBmcm9tICcuL2d1YXJkcy9zdHVkZW50Lmd1YXJkJztcclxuaW1wb3J0IHsgQ2xpZW50R3VhcmQgfSBmcm9tICcuL2d1YXJkcy9jbGllbnQuZ3VhcmQnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jbGllbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0YWZmU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvc3RhZmYuc2VydmljZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIEJyb3dzZXJNb2R1bGUsXHJcbiAgICBIdHRwTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICByb3V0aW5nLFxyXG4gICAgQ2hhcnRzTW9kdWxlXHJcbiAgICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQXBwQ29tcG9uZW50LFxyXG4gICAgTG9naW5Db21wb25lbnQsXHJcbiAgICBEYXNoYm9hcmRDb21wb25lbnQsXHJcbiAgICBTdGFmZk1hbmFnZUNvbXBvbmVudCxcclxuICAgIFN0YWZmRWRpdENvbXBvbmVudCxcclxuICAgIFN0dWRlbnRNYW5hZ2VDb21wb25lbnQsXHJcbiAgICBTdHVkZW50RWRpdENvbXBvbmVudCxcclxuICAgIENsaWVudFN0YXR1c0NvbXBvbmVudCxcclxuICAgIFN1aXRhYmlsaXR5Rm9ybUNvbXBvbmVudCxcclxuICAgIENvbnNlbnRGb3JtQ29tcG9uZW50LFxyXG4gICAgQ2FzZU5vdGVzQ29tcG9uZW50LFxyXG4gICAgQ291cnNlTWFuYWdlQ29tcG9uZW50XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIEF1dGhHdWFyZCxcclxuICAgIEFkbWluR3VhcmQsXHJcbiAgICBTdGFmZkd1YXJkLFxyXG4gICAgU3R1ZGVudEd1YXJkLFxyXG4gICAgQ2xpZW50R3VhcmQsXHJcbiAgICBBdXRoU2VydmljZSxcclxuICAgIFN0dWRlbnRTZXJ2aWNlLFxyXG4gICAgU3RhZmZTZXJ2aWNlLFxyXG4gICAgQ2xpZW50U2VydmljZVxyXG4gIF0sXHJcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxyXG4iXX0=
