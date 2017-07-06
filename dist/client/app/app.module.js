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
var course_edit_component_1 = require("./components/course-edit/course-edit.component");
var prf_form_component_1 = require("./components/prf-form/prf-form.component");
var learning_style_form_component_1 = require("./components/learning-style-form/learning-style-form.component");
var course_selection_component_1 = require("./components/course-selection/course-selection.component");
var timetable_component_1 = require("./components/timetable/timetable.component");
var visview_component_1 = require("./components/visview/visview.component");
//Import pipes
var user_filter_pipe_1 = require("./pipes/user-filter.pipe");
var course_filter_pipe_1 = require("./pipes/course-filter.pipe");
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
            course_edit_component_1.CourseEditComponent,
            prf_form_component_1.PrfFormComponent,
            learning_style_form_component_1.LearningStyleComponent,
            course_selection_component_1.CourseSelectionComponent,
            timetable_component_1.TimetableComponent,
            user_filter_pipe_1.UserFilterPipe,
            course_filter_pipe_1.CourseFilterPipe,
            visview_component_1.VisviewComponent
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvYXBwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBeUM7QUFDekMsd0NBQTZDO0FBQzdDLDhEQUEwRDtBQUMxRCxvREFBcUQ7QUFDckQsaURBQStDO0FBQy9DLDZDQUF3QztBQUN4Qyx5REFBcUQ7QUFFckQsbUJBQW1CO0FBQ25CLHNFQUFvRTtBQUNwRSxrRkFBZ0Y7QUFDaEYsMkZBQXdGO0FBQ3hGLHFGQUFrRjtBQUNsRixpR0FBOEY7QUFDOUYsMkZBQXdGO0FBQ3hGLDhGQUEyRjtBQUMzRix1R0FBb0c7QUFDcEcsMkZBQXdGO0FBQ3hGLHFGQUFrRjtBQUNsRiw4RkFBMkY7QUFDM0Ysd0ZBQXFGO0FBQ3JGLCtFQUE0RTtBQUM1RSxnSEFBd0c7QUFDeEcsdUdBQW9HO0FBQ3BHLGtGQUFnRjtBQUNoRiw0RUFBMEU7QUFFMUUsY0FBYztBQUNkLDZEQUEwRDtBQUMxRCxpRUFBOEQ7QUFFOUQsaUJBQWlCO0FBQ2pCLGtEQUFnRDtBQUNoRCxvREFBa0Q7QUFDbEQsb0RBQWtEO0FBQ2xELHdEQUFzRDtBQUN0RCxzREFBb0Q7QUFDcEQsNEVBQWdFO0FBQ2hFLDhEQUE0RDtBQUM1RCw0REFBMEQ7QUFDMUQsMERBQXdEO0FBQ3hELDREQUEwRDtBQWdEMUQsSUFBYSxTQUFTO0lBQXRCO0lBQXlCLENBQUM7SUFBRCxnQkFBQztBQUFELENBQXpCLEFBQTBCLElBQUE7QUFBYixTQUFTO0lBN0NyQixlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxnQ0FBYTtZQUNiLGlCQUFVO1lBQ1YsbUJBQVc7WUFDWCxxQkFBTztZQUNQLHlCQUFZO1lBQ1osb0NBQWU7U0FDZDtRQUNILFlBQVksRUFBRTtZQUNaLDRCQUFZO1lBQ1osZ0NBQWM7WUFDZCx3Q0FBa0I7WUFDbEIsNkNBQW9CO1lBQ3BCLHlDQUFrQjtZQUNsQixpREFBc0I7WUFDdEIsNkNBQW9CO1lBQ3BCLCtDQUFxQjtZQUNyQixxREFBd0I7WUFDeEIsNkNBQW9CO1lBQ3BCLHlDQUFrQjtZQUNsQiwrQ0FBcUI7WUFDckIsMkNBQW1CO1lBQ25CLHFDQUFnQjtZQUNoQixzREFBc0I7WUFDdEIscURBQXdCO1lBQ3hCLHdDQUFrQjtZQUNsQixpQ0FBYztZQUNkLHFDQUFnQjtZQUNoQixvQ0FBZ0I7U0FDakI7UUFDRCxTQUFTLEVBQUU7WUFDVCxzQkFBUztZQUNULHdCQUFVO1lBQ1Ysd0JBQVU7WUFDViw0QkFBWTtZQUNaLDBCQUFXO1lBQ1gsb0NBQVc7WUFDWCxnQ0FBYztZQUNkLDRCQUFZO1lBQ1osOEJBQWE7WUFDYiw4QkFBYTtTQUNkO1FBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztLQUMxQixDQUFDO0dBQ1csU0FBUyxDQUFJO0FBQWIsOEJBQVMiLCJmaWxlIjoiYXBwL2FwcC5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IENoYXJ0c01vZHVsZSB9IGZyb20gJ25nMi1jaGFydHMvbmcyLWNoYXJ0cyc7XHJcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gJy4vYXBwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IHJvdXRpbmcgfSBmcm9tICcuL2FwcC5yb3V0aW5nJztcclxuaW1wb3J0IHsgRGF0YVRhYmxlTW9kdWxlIH0gZnJvbSAnYW5ndWxhcjItZGF0YXRhYmxlJztcclxuXHJcbi8vSW1wb3J0IGNvbXBvbmVudHNcclxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbG9naW4vbG9naW4uY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGFzaGJvYXJkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3RhZmZNYW5hZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RhZmYtbWFuYWdlL3N0YWZmLW1hbmFnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdGFmZkVkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RhZmYtZWRpdC9zdGFmZi1lZGl0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0dWRlbnRNYW5hZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3R1ZGVudC1tYW5hZ2Uvc3R1ZGVudC1tYW5hZ2UuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3R1ZGVudEVkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3R1ZGVudC1lZGl0L3N0dWRlbnQtZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDbGllbnRTdGF0dXNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2xpZW50LXN0YXR1cy9jbGllbnQtc3RhdHVzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN1aXRhYmlsaXR5Rm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdWl0YWJpbGl0eS1mb3JtL3N1aXRhYmlsaXR5LWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29uc2VudEZvcm1Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29uc2VudC1mb3JtL2NvbnNlbnQtZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDYXNlTm90ZXNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FzZS1ub3Rlcy9jYXNlLW5vdGVzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvdXJzZU1hbmFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb3Vyc2UtbWFuYWdlL2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ291cnNlRWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQcmZGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3ByZi1mb3JtL3ByZi1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExlYXJuaW5nU3R5bGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbGVhcm5pbmctc3R5bGUtZm9ybS9sZWFybmluZy1zdHlsZS1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvdXJzZVNlbGVjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb3Vyc2Utc2VsZWN0aW9uL2NvdXJzZS1zZWxlY3Rpb24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGltZXRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RpbWV0YWJsZS90aW1ldGFibGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVmlzdmlld0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy92aXN2aWV3L3Zpc3ZpZXcuY29tcG9uZW50JztcclxuXHJcbi8vSW1wb3J0IHBpcGVzXHJcbmltcG9ydCB7IFVzZXJGaWx0ZXJQaXBlIH0gZnJvbSBcIi4vcGlwZXMvdXNlci1maWx0ZXIucGlwZVwiO1xyXG5pbXBvcnQgeyBDb3Vyc2VGaWx0ZXJQaXBlIH0gZnJvbSBcIi4vcGlwZXMvY291cnNlLWZpbHRlci5waXBlXCI7XHJcblxyXG4vL0ltcG9ydCBzZXJ2aWNlc1xyXG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9hdXRoLmd1YXJkJztcclxuaW1wb3J0IHsgQWRtaW5HdWFyZCB9IGZyb20gJy4vZ3VhcmRzL2FkbWluLmd1YXJkJztcclxuaW1wb3J0IHsgU3RhZmZHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL3N0YWZmLmd1YXJkJztcclxuaW1wb3J0IHsgU3R1ZGVudEd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvc3R1ZGVudC5ndWFyZCc7XHJcbmltcG9ydCB7IENsaWVudEd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvY2xpZW50Lmd1YXJkJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ2xpZW50U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY2xpZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdGFmZlNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3N0YWZmLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb3Vyc2VTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb3Vyc2Uuc2VydmljZSc7XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBCcm93c2VyTW9kdWxlLFxyXG4gICAgSHR0cE1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgcm91dGluZyxcclxuICAgIENoYXJ0c01vZHVsZSxcclxuICAgIERhdGFUYWJsZU1vZHVsZVxyXG4gICAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEFwcENvbXBvbmVudCxcclxuICAgIExvZ2luQ29tcG9uZW50LFxyXG4gICAgRGFzaGJvYXJkQ29tcG9uZW50LFxyXG4gICAgU3RhZmZNYW5hZ2VDb21wb25lbnQsXHJcbiAgICBTdGFmZkVkaXRDb21wb25lbnQsXHJcbiAgICBTdHVkZW50TWFuYWdlQ29tcG9uZW50LFxyXG4gICAgU3R1ZGVudEVkaXRDb21wb25lbnQsXHJcbiAgICBDbGllbnRTdGF0dXNDb21wb25lbnQsXHJcbiAgICBTdWl0YWJpbGl0eUZvcm1Db21wb25lbnQsXHJcbiAgICBDb25zZW50Rm9ybUNvbXBvbmVudCxcclxuICAgIENhc2VOb3Rlc0NvbXBvbmVudCxcclxuICAgIENvdXJzZU1hbmFnZUNvbXBvbmVudCxcclxuICAgIENvdXJzZUVkaXRDb21wb25lbnQsXHJcbiAgICBQcmZGb3JtQ29tcG9uZW50LFxyXG4gICAgTGVhcm5pbmdTdHlsZUNvbXBvbmVudCxcclxuICAgIENvdXJzZVNlbGVjdGlvbkNvbXBvbmVudCxcclxuICAgIFRpbWV0YWJsZUNvbXBvbmVudCxcclxuICAgIFVzZXJGaWx0ZXJQaXBlLFxyXG4gICAgQ291cnNlRmlsdGVyUGlwZSxcclxuICAgIFZpc3ZpZXdDb21wb25lbnRcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgQXV0aEd1YXJkLFxyXG4gICAgQWRtaW5HdWFyZCxcclxuICAgIFN0YWZmR3VhcmQsXHJcbiAgICBTdHVkZW50R3VhcmQsXHJcbiAgICBDbGllbnRHdWFyZCxcclxuICAgIEF1dGhTZXJ2aWNlLFxyXG4gICAgU3R1ZGVudFNlcnZpY2UsXHJcbiAgICBTdGFmZlNlcnZpY2UsXHJcbiAgICBDbGllbnRTZXJ2aWNlLFxyXG4gICAgQ291cnNlU2VydmljZVxyXG4gIF0sXHJcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxyXG4iXX0=
