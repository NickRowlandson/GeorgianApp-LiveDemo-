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
var ng2_charts_1 = require("ng2-charts/ng2-charts");
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
var prf_form_component_1 = require("./components/prf-form/prf-form.component");
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
            ng2_charts_1.ChartsModule
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
            prf_form_component_1.PrfFormComponent
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvYXBwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUF5QztBQUN6Qyw4REFBMEQ7QUFDMUQsd0NBQTZDO0FBQzdDLHNDQUEyQztBQUMzQyxvREFBcUQ7QUFDckQsaURBQStDO0FBQy9DLDZDQUF3QztBQUV4QyxtQkFBbUI7QUFDbkIsc0VBQW9FO0FBQ3BFLGtGQUFnRjtBQUNoRiwyRkFBd0Y7QUFDeEYscUZBQWtGO0FBQ2xGLGlHQUE4RjtBQUM5RiwyRkFBd0Y7QUFDeEYsOEZBQTJGO0FBQzNGLHVHQUFvRztBQUNwRywyRkFBd0Y7QUFDeEYscUZBQWtGO0FBQ2xGLDhGQUEyRjtBQUMzRiwrRUFBNEU7QUFFNUUsaUJBQWlCO0FBQ2pCLGtEQUFnRDtBQUNoRCxvREFBa0Q7QUFDbEQsb0RBQWtEO0FBQ2xELHdEQUFzRDtBQUN0RCxzREFBb0Q7QUFDcEQsNEVBQWdFO0FBQ2hFLDhEQUE0RDtBQUM1RCw0REFBMEQ7QUFDMUQsMERBQXdEO0FBc0N4RCxJQUFhLFNBQVM7SUFBdEI7SUFBeUIsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBekIsQUFBMEIsSUFBQTtBQUFiLFNBQVM7SUFwQ3JCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLGdDQUFhO1lBQ2IsaUJBQVU7WUFDVixtQkFBVztZQUNYLHFCQUFPO1lBQ1AseUJBQVk7U0FDWDtRQUNILFlBQVksRUFBRTtZQUNaLDRCQUFZO1lBQ1osZ0NBQWM7WUFDZCx3Q0FBa0I7WUFDbEIsNkNBQW9CO1lBQ3BCLHlDQUFrQjtZQUNsQixpREFBc0I7WUFDdEIsNkNBQW9CO1lBQ3BCLCtDQUFxQjtZQUNyQixxREFBd0I7WUFDeEIsNkNBQW9CO1lBQ3BCLHlDQUFrQjtZQUNsQiwrQ0FBcUI7WUFDckIscUNBQWdCO1NBQ2pCO1FBQ0QsU0FBUyxFQUFFO1lBQ1Qsc0JBQVM7WUFDVCx3QkFBVTtZQUNWLHdCQUFVO1lBQ1YsNEJBQVk7WUFDWiwwQkFBVztZQUNYLG9DQUFXO1lBQ1gsZ0NBQWM7WUFDZCw0QkFBWTtZQUNaLDhCQUFhO1NBQ2Q7UUFDRCxTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO0tBQzFCLENBQUM7R0FDVyxTQUFTLENBQUk7QUFBYiw4QkFBUyIsImZpbGUiOiJhcHAvYXBwLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgQ2hhcnRzTW9kdWxlIH0gZnJvbSAnbmcyLWNoYXJ0cy9uZzItY2hhcnRzJztcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSAnLi9hcHAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgcm91dGluZyB9IGZyb20gJy4vYXBwLnJvdXRpbmcnO1xyXG5cclxuLy9JbXBvcnQgY29tcG9uZW50c1xyXG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEYXNoYm9hcmRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdGFmZk1hbmFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdGFmZi1tYW5hZ2Uvc3RhZmYtbWFuYWdlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0YWZmRWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdGFmZi1lZGl0L3N0YWZmLWVkaXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3R1ZGVudE1hbmFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdHVkZW50RWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdHVkZW50LWVkaXQvc3R1ZGVudC1lZGl0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENsaWVudFN0YXR1c0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3VpdGFiaWxpdHlGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N1aXRhYmlsaXR5LWZvcm0vc3VpdGFiaWxpdHktZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb25zZW50Rm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENhc2VOb3Rlc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jYXNlLW5vdGVzL2Nhc2Utbm90ZXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ291cnNlTWFuYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvdXJzZS1tYW5hZ2UvY291cnNlLW1hbmFnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQcmZGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3ByZi1mb3JtL3ByZi1mb3JtLmNvbXBvbmVudCc7XHJcblxyXG4vL0ltcG9ydCBzZXJ2aWNlc1xyXG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9hdXRoLmd1YXJkJztcclxuaW1wb3J0IHsgQWRtaW5HdWFyZCB9IGZyb20gJy4vZ3VhcmRzL2FkbWluLmd1YXJkJztcclxuaW1wb3J0IHsgU3RhZmZHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL3N0YWZmLmd1YXJkJztcclxuaW1wb3J0IHsgU3R1ZGVudEd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvc3R1ZGVudC5ndWFyZCc7XHJcbmltcG9ydCB7IENsaWVudEd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvY2xpZW50Lmd1YXJkJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ2xpZW50U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY2xpZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdGFmZlNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3N0YWZmLnNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBCcm93c2VyTW9kdWxlLFxyXG4gICAgSHR0cE1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgcm91dGluZyxcclxuICAgIENoYXJ0c01vZHVsZVxyXG4gICAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEFwcENvbXBvbmVudCxcclxuICAgIExvZ2luQ29tcG9uZW50LFxyXG4gICAgRGFzaGJvYXJkQ29tcG9uZW50LFxyXG4gICAgU3RhZmZNYW5hZ2VDb21wb25lbnQsXHJcbiAgICBTdGFmZkVkaXRDb21wb25lbnQsXHJcbiAgICBTdHVkZW50TWFuYWdlQ29tcG9uZW50LFxyXG4gICAgU3R1ZGVudEVkaXRDb21wb25lbnQsXHJcbiAgICBDbGllbnRTdGF0dXNDb21wb25lbnQsXHJcbiAgICBTdWl0YWJpbGl0eUZvcm1Db21wb25lbnQsXHJcbiAgICBDb25zZW50Rm9ybUNvbXBvbmVudCxcclxuICAgIENhc2VOb3Rlc0NvbXBvbmVudCxcclxuICAgIENvdXJzZU1hbmFnZUNvbXBvbmVudCxcclxuICAgIFByZkZvcm1Db21wb25lbnRcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgQXV0aEd1YXJkLFxyXG4gICAgQWRtaW5HdWFyZCxcclxuICAgIFN0YWZmR3VhcmQsXHJcbiAgICBTdHVkZW50R3VhcmQsXHJcbiAgICBDbGllbnRHdWFyZCxcclxuICAgIEF1dGhTZXJ2aWNlLFxyXG4gICAgU3R1ZGVudFNlcnZpY2UsXHJcbiAgICBTdGFmZlNlcnZpY2UsXHJcbiAgICBDbGllbnRTZXJ2aWNlXHJcbiAgXSxcclxuICBib290c3RyYXA6IFtBcHBDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XHJcbiJdfQ==
