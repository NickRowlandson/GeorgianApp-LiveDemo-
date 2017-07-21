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
var ng2_datetime_1 = require("ng2-datetime/ng2-datetime");
var primeng_1 = require("primeng/primeng");
var primeng_2 = require("primeng/primeng");
var primeng_3 = require("primeng/primeng");
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
var student_enrollment_component_1 = require("./components/student-enrollment/student-enrollment.component");
var timetable_component_1 = require("./components/timetable/timetable.component");
var visview_component_1 = require("./components/visview/visview.component");
var attendance_list_component_1 = require("./components/attendance-list/attendance-list.component");
//Import pipes
var user_filter_pipe_1 = require("./pipes/user-filter.pipe");
var course_filter_pipe_1 = require("./pipes/course-filter.pipe");
var campus_filter_pipe_1 = require("./pipes/campus-filter.pipe");
//Import services
var auth_guard_1 = require("./guards/auth.guard");
var admin_guard_1 = require("./guards/admin.guard");
var staff_guard_1 = require("./guards/staff.guard");
var student_guard_1 = require("./guards/student.guard");
var client_guard_1 = require("./guards/client.guard");
var instructor_guard_1 = require("./guards/instructor.guard");
var shared_guard_1 = require("./guards/shared.guard");
var authentication_service_1 = require("./services/authentication.service");
var student_service_1 = require("./services/student.service");
var client_service_1 = require("./services/client.service");
var staff_service_1 = require("./services/staff.service");
var course_service_1 = require("./services/course.service");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                app_routing_1.routing,
                ng2_charts_1.ChartsModule,
                angular2_datatable_1.DataTableModule,
                ng2_datetime_1.NKDatetimeModule,
                primeng_1.ScheduleModule,
                primeng_2.CalendarModule,
                primeng_3.DropdownModule
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
                student_enrollment_component_1.StudentEnrollmentComponent,
                timetable_component_1.TimetableComponent,
                user_filter_pipe_1.UserFilterPipe,
                course_filter_pipe_1.CourseFilterPipe,
                visview_component_1.VisviewComponent,
                campus_filter_pipe_1.CampusFilterPipe,
                attendance_list_component_1.AttendanceListComponent
            ],
            providers: [
                auth_guard_1.AuthGuard,
                admin_guard_1.AdminGuard,
                staff_guard_1.StaffGuard,
                student_guard_1.StudentGuard,
                client_guard_1.ClientGuard,
                instructor_guard_1.InstructorGuard,
                shared_guard_1.SharedGuard,
                authentication_service_1.AuthService,
                student_service_1.StudentService,
                staff_service_1.StaffService,
                client_service_1.ClientService,
                course_service_1.CourseService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvYXBwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBeUM7QUFDekMsd0NBQTZDO0FBQzdDLDhEQUEwRDtBQUMxRCxvREFBcUQ7QUFDckQsaURBQStDO0FBQy9DLDZDQUF3QztBQUN4Qyx5REFBcUQ7QUFDckQsMERBQTZEO0FBQzdELDJDQUFpRDtBQUNqRCwyQ0FBaUQ7QUFDakQsMkNBQWlEO0FBRWpELG1CQUFtQjtBQUNuQixzRUFBb0U7QUFDcEUsa0ZBQWdGO0FBQ2hGLDJGQUF3RjtBQUN4RixxRkFBa0Y7QUFDbEYsaUdBQThGO0FBQzlGLDJGQUF3RjtBQUN4Riw4RkFBMkY7QUFDM0YsdUdBQW9HO0FBQ3BHLDJGQUF3RjtBQUN4RixxRkFBa0Y7QUFDbEYsOEZBQTJGO0FBQzNGLHdGQUFxRjtBQUNyRiwrRUFBNEU7QUFDNUUsZ0hBQXdHO0FBQ3hHLDZHQUEwRztBQUMxRyxrRkFBZ0Y7QUFDaEYsNEVBQTBFO0FBQzFFLG9HQUFpRztBQUVqRyxjQUFjO0FBQ2QsNkRBQTBEO0FBQzFELGlFQUE4RDtBQUM5RCxpRUFBOEQ7QUFFOUQsaUJBQWlCO0FBQ2pCLGtEQUFnRDtBQUNoRCxvREFBa0Q7QUFDbEQsb0RBQWtEO0FBQ2xELHdEQUFzRDtBQUN0RCxzREFBb0Q7QUFDcEQsOERBQTREO0FBQzVELHNEQUFvRDtBQUNwRCw0RUFBZ0U7QUFDaEUsOERBQTREO0FBQzVELDREQUEwRDtBQUMxRCwwREFBd0Q7QUFDeEQsNERBQTBEO0FBd0QxRDtJQUFBO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBckRyQixlQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsZ0NBQWE7Z0JBQ2IsaUJBQVU7Z0JBQ1YsbUJBQVc7Z0JBQ1gscUJBQU87Z0JBQ1AseUJBQVk7Z0JBQ1osb0NBQWU7Z0JBQ2YsK0JBQWdCO2dCQUNoQix3QkFBYztnQkFDZCx3QkFBYztnQkFDZCx3QkFBYzthQUNiO1lBQ0gsWUFBWSxFQUFFO2dCQUNaLDRCQUFZO2dCQUNaLGdDQUFjO2dCQUNkLHdDQUFrQjtnQkFDbEIsNkNBQW9CO2dCQUNwQix5Q0FBa0I7Z0JBQ2xCLGlEQUFzQjtnQkFDdEIsNkNBQW9CO2dCQUNwQiwrQ0FBcUI7Z0JBQ3JCLHFEQUF3QjtnQkFDeEIsNkNBQW9CO2dCQUNwQix5Q0FBa0I7Z0JBQ2xCLCtDQUFxQjtnQkFDckIsMkNBQW1CO2dCQUNuQixxQ0FBZ0I7Z0JBQ2hCLHNEQUFzQjtnQkFDdEIseURBQTBCO2dCQUMxQix3Q0FBa0I7Z0JBQ2xCLGlDQUFjO2dCQUNkLHFDQUFnQjtnQkFDaEIsb0NBQWdCO2dCQUNoQixxQ0FBZ0I7Z0JBQ2hCLG1EQUF1QjthQUN4QjtZQUNELFNBQVMsRUFBRTtnQkFDVCxzQkFBUztnQkFDVCx3QkFBVTtnQkFDVix3QkFBVTtnQkFDViw0QkFBWTtnQkFDWiwwQkFBVztnQkFDWCxrQ0FBZTtnQkFDZiwwQkFBVztnQkFDWCxvQ0FBVztnQkFDWCxnQ0FBYztnQkFDZCw0QkFBWTtnQkFDWiw4QkFBYTtnQkFDYiw4QkFBYTthQUNkO1lBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztTQUMxQixDQUFDO09BQ1csU0FBUyxDQUFJO0lBQUQsZ0JBQUM7Q0FBMUIsQUFBMEIsSUFBQTtBQUFiLDhCQUFTIiwiZmlsZSI6ImFwcC9hcHAubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBDaGFydHNNb2R1bGUgfSBmcm9tICduZzItY2hhcnRzL25nMi1jaGFydHMnO1xyXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tICcuL2FwcC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyByb3V0aW5nIH0gZnJvbSAnLi9hcHAucm91dGluZyc7XHJcbmltcG9ydCB7IERhdGFUYWJsZU1vZHVsZSB9IGZyb20gJ2FuZ3VsYXIyLWRhdGF0YWJsZSc7XHJcbmltcG9ydCB7IE5LRGF0ZXRpbWVNb2R1bGUgfSBmcm9tICduZzItZGF0ZXRpbWUvbmcyLWRhdGV0aW1lJztcclxuaW1wb3J0IHsgU2NoZWR1bGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5pbXBvcnQgeyBDYWxlbmRhck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmltcG9ydCB7IERyb3Bkb3duTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuXHJcbi8vSW1wb3J0IGNvbXBvbmVudHNcclxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbG9naW4vbG9naW4uY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGFzaGJvYXJkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3RhZmZNYW5hZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RhZmYtbWFuYWdlL3N0YWZmLW1hbmFnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdGFmZkVkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RhZmYtZWRpdC9zdGFmZi1lZGl0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0dWRlbnRNYW5hZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3R1ZGVudC1tYW5hZ2Uvc3R1ZGVudC1tYW5hZ2UuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3R1ZGVudEVkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3R1ZGVudC1lZGl0L3N0dWRlbnQtZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDbGllbnRTdGF0dXNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2xpZW50LXN0YXR1cy9jbGllbnQtc3RhdHVzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN1aXRhYmlsaXR5Rm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdWl0YWJpbGl0eS1mb3JtL3N1aXRhYmlsaXR5LWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29uc2VudEZvcm1Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29uc2VudC1mb3JtL2NvbnNlbnQtZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDYXNlTm90ZXNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FzZS1ub3Rlcy9jYXNlLW5vdGVzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvdXJzZU1hbmFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb3Vyc2UtbWFuYWdlL2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ291cnNlRWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQcmZGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3ByZi1mb3JtL3ByZi1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExlYXJuaW5nU3R5bGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbGVhcm5pbmctc3R5bGUtZm9ybS9sZWFybmluZy1zdHlsZS1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0dWRlbnRFbnJvbGxtZW50Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N0dWRlbnQtZW5yb2xsbWVudC9zdHVkZW50LWVucm9sbG1lbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGltZXRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RpbWV0YWJsZS90aW1ldGFibGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVmlzdmlld0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy92aXN2aWV3L3Zpc3ZpZXcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXR0ZW5kYW5jZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1saXN0L2F0dGVuZGFuY2UtbGlzdC5jb21wb25lbnQnO1xyXG5cclxuLy9JbXBvcnQgcGlwZXNcclxuaW1wb3J0IHsgVXNlckZpbHRlclBpcGUgfSBmcm9tIFwiLi9waXBlcy91c2VyLWZpbHRlci5waXBlXCI7XHJcbmltcG9ydCB7IENvdXJzZUZpbHRlclBpcGUgfSBmcm9tIFwiLi9waXBlcy9jb3Vyc2UtZmlsdGVyLnBpcGVcIjtcclxuaW1wb3J0IHsgQ2FtcHVzRmlsdGVyUGlwZSB9IGZyb20gXCIuL3BpcGVzL2NhbXB1cy1maWx0ZXIucGlwZVwiO1xyXG5cclxuLy9JbXBvcnQgc2VydmljZXNcclxuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvYXV0aC5ndWFyZCc7XHJcbmltcG9ydCB7IEFkbWluR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9hZG1pbi5ndWFyZCc7XHJcbmltcG9ydCB7IFN0YWZmR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9zdGFmZi5ndWFyZCc7XHJcbmltcG9ydCB7IFN0dWRlbnRHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL3N0dWRlbnQuZ3VhcmQnO1xyXG5pbXBvcnQgeyBDbGllbnRHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL2NsaWVudC5ndWFyZCc7XHJcbmltcG9ydCB7IEluc3RydWN0b3JHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL2luc3RydWN0b3IuZ3VhcmQnO1xyXG5pbXBvcnQgeyBTaGFyZWRHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL3NoYXJlZC5ndWFyZCc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RhZmZTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zdGFmZi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ291cnNlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY291cnNlLnNlcnZpY2UnO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQnJvd3Nlck1vZHVsZSxcclxuICAgIEh0dHBNb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIHJvdXRpbmcsXHJcbiAgICBDaGFydHNNb2R1bGUsXHJcbiAgICBEYXRhVGFibGVNb2R1bGUsXHJcbiAgICBOS0RhdGV0aW1lTW9kdWxlLFxyXG4gICAgU2NoZWR1bGVNb2R1bGUsXHJcbiAgICBDYWxlbmRhck1vZHVsZSxcclxuICAgIERyb3Bkb3duTW9kdWxlXHJcbiAgICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQXBwQ29tcG9uZW50LFxyXG4gICAgTG9naW5Db21wb25lbnQsXHJcbiAgICBEYXNoYm9hcmRDb21wb25lbnQsXHJcbiAgICBTdGFmZk1hbmFnZUNvbXBvbmVudCxcclxuICAgIFN0YWZmRWRpdENvbXBvbmVudCxcclxuICAgIFN0dWRlbnRNYW5hZ2VDb21wb25lbnQsXHJcbiAgICBTdHVkZW50RWRpdENvbXBvbmVudCxcclxuICAgIENsaWVudFN0YXR1c0NvbXBvbmVudCxcclxuICAgIFN1aXRhYmlsaXR5Rm9ybUNvbXBvbmVudCxcclxuICAgIENvbnNlbnRGb3JtQ29tcG9uZW50LFxyXG4gICAgQ2FzZU5vdGVzQ29tcG9uZW50LFxyXG4gICAgQ291cnNlTWFuYWdlQ29tcG9uZW50LFxyXG4gICAgQ291cnNlRWRpdENvbXBvbmVudCxcclxuICAgIFByZkZvcm1Db21wb25lbnQsXHJcbiAgICBMZWFybmluZ1N0eWxlQ29tcG9uZW50LFxyXG4gICAgU3R1ZGVudEVucm9sbG1lbnRDb21wb25lbnQsXHJcbiAgICBUaW1ldGFibGVDb21wb25lbnQsXHJcbiAgICBVc2VyRmlsdGVyUGlwZSxcclxuICAgIENvdXJzZUZpbHRlclBpcGUsXHJcbiAgICBWaXN2aWV3Q29tcG9uZW50LFxyXG4gICAgQ2FtcHVzRmlsdGVyUGlwZSxcclxuICAgIEF0dGVuZGFuY2VMaXN0Q29tcG9uZW50XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIEF1dGhHdWFyZCxcclxuICAgIEFkbWluR3VhcmQsXHJcbiAgICBTdGFmZkd1YXJkLFxyXG4gICAgU3R1ZGVudEd1YXJkLFxyXG4gICAgQ2xpZW50R3VhcmQsXHJcbiAgICBJbnN0cnVjdG9yR3VhcmQsXHJcbiAgICBTaGFyZWRHdWFyZCxcclxuICAgIEF1dGhTZXJ2aWNlLFxyXG4gICAgU3R1ZGVudFNlcnZpY2UsXHJcbiAgICBTdGFmZlNlcnZpY2UsXHJcbiAgICBDbGllbnRTZXJ2aWNlLFxyXG4gICAgQ291cnNlU2VydmljZVxyXG4gIF0sXHJcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxyXG4iXX0=
