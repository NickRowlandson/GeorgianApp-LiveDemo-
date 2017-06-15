"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var ng2_charts_1 = require("ng2-charts/ng2-charts");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var angular2_datatable_1 = require("angular2-datatable");
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
var prf_form_component_1 = require("./components/prf-form/prf-form.component");
var learning_style_form_component_1 = require("./components/learning-style-form/learning-style-form.component");
//Import pipes
var data_filter_pipe_1 = require("./pipes/data-filter.pipe");
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
var course_service_1 = require("./services/course.service");
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
            ng2_charts_1.ChartsModule,
            angular2_datatable_1.DataTableModule
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
            course_manage_component_1.CourseManageComponent,
            prf_form_component_1.PrfFormComponent,
            learning_style_form_component_1.LearningStyleComponent,
            data_filter_pipe_1.DataFilterPipe
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
            client_service_1.ClientService,
            course_service_1.CourseService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvYXBwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBeUM7QUFDekMsd0NBQTZDO0FBQzdDLDhEQUEwRDtBQUMxRCxvREFBcUQ7QUFDckQsaURBQStDO0FBQy9DLDZDQUF3QztBQUN4Qyx5REFBcUQ7QUFFckQsbUJBQW1CO0FBQ25CLHNFQUFvRTtBQUNwRSxrRkFBZ0Y7QUFDaEYsMkZBQXdGO0FBQ3hGLHFGQUFrRjtBQUNsRixpR0FBOEY7QUFDOUYsMkZBQXdGO0FBQ3hGLDhGQUEyRjtBQUMzRix1R0FBb0c7QUFDcEcsMkZBQXdGO0FBQ3hGLHFGQUFrRjtBQUNsRiw4RkFBMkY7QUFDM0YsK0VBQTRFO0FBQzVFLGdIQUF3RztBQUV4RyxjQUFjO0FBQ2QsNkRBQTBEO0FBRTFELGlCQUFpQjtBQUNqQixrREFBZ0Q7QUFDaEQsb0RBQWtEO0FBQ2xELG9EQUFrRDtBQUNsRCx3REFBc0Q7QUFDdEQsc0RBQW9EO0FBQ3BELDRFQUFnRTtBQUNoRSw4REFBNEQ7QUFDNUQsNERBQTBEO0FBQzFELDBEQUF3RDtBQUN4RCw0REFBMEQ7QUEyQzFELElBQWEsU0FBUztJQUF0QjtJQUF5QixDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUF6QixBQUEwQixJQUFBO0FBQWIsU0FBUztJQXhDckIsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsZ0NBQWE7WUFDYixpQkFBVTtZQUNWLG1CQUFXO1lBQ1gscUJBQU87WUFDUCx5QkFBWTtZQUNaLG9DQUFlO1NBQ2Q7UUFDSCxZQUFZLEVBQUU7WUFDWiw0QkFBWTtZQUNaLGdDQUFjO1lBQ2Qsd0NBQWtCO1lBQ2xCLDZDQUFvQjtZQUNwQix5Q0FBa0I7WUFDbEIsaURBQXNCO1lBQ3RCLDZDQUFvQjtZQUNwQiwrQ0FBcUI7WUFDckIscURBQXdCO1lBQ3hCLDZDQUFvQjtZQUNwQix5Q0FBa0I7WUFDbEIsK0NBQXFCO1lBQ3JCLHFDQUFnQjtZQUNoQixzREFBc0I7WUFDdEIsaUNBQWM7U0FDZjtRQUNELFNBQVMsRUFBRTtZQUNULHNCQUFTO1lBQ1Qsd0JBQVU7WUFDVix3QkFBVTtZQUNWLDRCQUFZO1lBQ1osMEJBQVc7WUFDWCxvQ0FBVztZQUNYLGdDQUFjO1lBQ2QsNEJBQVk7WUFDWiw4QkFBYTtZQUNiLDhCQUFhO1NBQ2Q7UUFDRCxTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO0tBQzFCLENBQUM7R0FDVyxTQUFTLENBQUk7QUFBYiw4QkFBUyIsImZpbGUiOiJhcHAvYXBwLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgQ2hhcnRzTW9kdWxlIH0gZnJvbSAnbmcyLWNoYXJ0cy9uZzItY2hhcnRzJztcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSAnLi9hcHAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgcm91dGluZyB9IGZyb20gJy4vYXBwLnJvdXRpbmcnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVNb2R1bGUgfSBmcm9tICdhbmd1bGFyMi1kYXRhdGFibGUnO1xyXG5cclxuLy9JbXBvcnQgY29tcG9uZW50c1xyXG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEYXNoYm9hcmRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdGFmZk1hbmFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdGFmZi1tYW5hZ2Uvc3RhZmYtbWFuYWdlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0YWZmRWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdGFmZi1lZGl0L3N0YWZmLWVkaXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3R1ZGVudE1hbmFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdHVkZW50RWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdHVkZW50LWVkaXQvc3R1ZGVudC1lZGl0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENsaWVudFN0YXR1c0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3VpdGFiaWxpdHlGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N1aXRhYmlsaXR5LWZvcm0vc3VpdGFiaWxpdHktZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb25zZW50Rm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENhc2VOb3Rlc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jYXNlLW5vdGVzL2Nhc2Utbm90ZXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ291cnNlTWFuYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvdXJzZS1tYW5hZ2UvY291cnNlLW1hbmFnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQcmZGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3ByZi1mb3JtL3ByZi1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExlYXJuaW5nU3R5bGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbGVhcm5pbmctc3R5bGUtZm9ybS9sZWFybmluZy1zdHlsZS1mb3JtLmNvbXBvbmVudCc7XHJcblxyXG4vL0ltcG9ydCBwaXBlc1xyXG5pbXBvcnQgeyBEYXRhRmlsdGVyUGlwZSB9IGZyb20gXCIuL3BpcGVzL2RhdGEtZmlsdGVyLnBpcGVcIjtcclxuXHJcbi8vSW1wb3J0IHNlcnZpY2VzXHJcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL2F1dGguZ3VhcmQnO1xyXG5pbXBvcnQgeyBBZG1pbkd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvYWRtaW4uZ3VhcmQnO1xyXG5pbXBvcnQgeyBTdGFmZkd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvc3RhZmYuZ3VhcmQnO1xyXG5pbXBvcnQgeyBTdHVkZW50R3VhcmQgfSBmcm9tICcuL2d1YXJkcy9zdHVkZW50Lmd1YXJkJztcclxuaW1wb3J0IHsgQ2xpZW50R3VhcmQgfSBmcm9tICcuL2d1YXJkcy9jbGllbnQuZ3VhcmQnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jbGllbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0YWZmU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvc3RhZmYuc2VydmljZSc7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlJztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIEJyb3dzZXJNb2R1bGUsXHJcbiAgICBIdHRwTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICByb3V0aW5nLFxyXG4gICAgQ2hhcnRzTW9kdWxlLFxyXG4gICAgRGF0YVRhYmxlTW9kdWxlXHJcbiAgICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQXBwQ29tcG9uZW50LFxyXG4gICAgTG9naW5Db21wb25lbnQsXHJcbiAgICBEYXNoYm9hcmRDb21wb25lbnQsXHJcbiAgICBTdGFmZk1hbmFnZUNvbXBvbmVudCxcclxuICAgIFN0YWZmRWRpdENvbXBvbmVudCxcclxuICAgIFN0dWRlbnRNYW5hZ2VDb21wb25lbnQsXHJcbiAgICBTdHVkZW50RWRpdENvbXBvbmVudCxcclxuICAgIENsaWVudFN0YXR1c0NvbXBvbmVudCxcclxuICAgIFN1aXRhYmlsaXR5Rm9ybUNvbXBvbmVudCxcclxuICAgIENvbnNlbnRGb3JtQ29tcG9uZW50LFxyXG4gICAgQ2FzZU5vdGVzQ29tcG9uZW50LFxyXG4gICAgQ291cnNlTWFuYWdlQ29tcG9uZW50LFxyXG4gICAgUHJmRm9ybUNvbXBvbmVudCxcclxuICAgIExlYXJuaW5nU3R5bGVDb21wb25lbnQsXHJcbiAgICBEYXRhRmlsdGVyUGlwZVxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBBdXRoR3VhcmQsXHJcbiAgICBBZG1pbkd1YXJkLFxyXG4gICAgU3RhZmZHdWFyZCxcclxuICAgIFN0dWRlbnRHdWFyZCxcclxuICAgIENsaWVudEd1YXJkLFxyXG4gICAgQXV0aFNlcnZpY2UsXHJcbiAgICBTdHVkZW50U2VydmljZSxcclxuICAgIFN0YWZmU2VydmljZSxcclxuICAgIENsaWVudFNlcnZpY2UsXHJcbiAgICBDb3Vyc2VTZXJ2aWNlXHJcbiAgXSxcclxuICBib290c3RyYXA6IFtBcHBDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XHJcbiJdfQ==
