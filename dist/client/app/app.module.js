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
var primeng_1 = require("primeng/primeng");
var primeng_2 = require("primeng/primeng");
var primeng_3 = require("primeng/primeng");
var primeng_4 = require("primeng/primeng");
var primeng_5 = require("primeng/primeng");
var primeng_6 = require("primeng/primeng");
var primeng_7 = require("primeng/primeng");
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
var attendance_report_component_1 = require("./components/attendance-report/attendance-report.component");
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
                primeng_1.ScheduleModule,
                primeng_2.CalendarModule,
                primeng_3.DropdownModule,
                primeng_4.CheckboxModule,
                primeng_5.SplitButtonModule,
                primeng_6.RadioButtonModule,
                primeng_7.ToggleButtonModule
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
                attendance_list_component_1.AttendanceListComponent,
                attendance_report_component_1.AttendanceReportComponent
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvYXBwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBeUM7QUFDekMsd0NBQTZDO0FBQzdDLDhEQUEwRDtBQUMxRCxvREFBcUQ7QUFDckQsaURBQStDO0FBQy9DLDZDQUF3QztBQUN4Qyx5REFBcUQ7QUFDckQsMkNBQWlEO0FBQ2pELDJDQUFpRDtBQUNqRCwyQ0FBaUQ7QUFDakQsMkNBQWlEO0FBQ2pELDJDQUFvRDtBQUNwRCwyQ0FBb0Q7QUFDcEQsMkNBQXFEO0FBRXJELG1CQUFtQjtBQUNuQixzRUFBb0U7QUFDcEUsa0ZBQWdGO0FBQ2hGLDJGQUF3RjtBQUN4RixxRkFBa0Y7QUFDbEYsaUdBQThGO0FBQzlGLDJGQUF3RjtBQUN4Riw4RkFBMkY7QUFDM0YsdUdBQW9HO0FBQ3BHLDJGQUF3RjtBQUN4RixxRkFBa0Y7QUFDbEYsOEZBQTJGO0FBQzNGLHdGQUFxRjtBQUNyRiwrRUFBNEU7QUFDNUUsZ0hBQXdHO0FBQ3hHLDZHQUEwRztBQUMxRyxrRkFBZ0Y7QUFDaEYsNEVBQTBFO0FBQzFFLG9HQUFpRztBQUNqRywwR0FBdUc7QUFFdkcsY0FBYztBQUNkLDZEQUEwRDtBQUMxRCxpRUFBOEQ7QUFDOUQsaUVBQThEO0FBRTlELGlCQUFpQjtBQUNqQixrREFBZ0Q7QUFDaEQsb0RBQWtEO0FBQ2xELG9EQUFrRDtBQUNsRCx3REFBc0Q7QUFDdEQsc0RBQW9EO0FBQ3BELDhEQUE0RDtBQUM1RCxzREFBb0Q7QUFDcEQsNEVBQWdFO0FBQ2hFLDhEQUE0RDtBQUM1RCw0REFBMEQ7QUFDMUQsMERBQXdEO0FBQ3hELDREQUEwRDtBQTREMUQ7SUFBQTtJQUF5QixDQUFDO0lBQWIsU0FBUztRQXpEckIsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLGdDQUFhO2dCQUNiLGlCQUFVO2dCQUNWLG1CQUFXO2dCQUNYLHFCQUFPO2dCQUNQLHlCQUFZO2dCQUNaLG9DQUFlO2dCQUNmLHdCQUFjO2dCQUNkLHdCQUFjO2dCQUNkLHdCQUFjO2dCQUNkLHdCQUFjO2dCQUNkLDJCQUFpQjtnQkFDakIsMkJBQWlCO2dCQUNqQiw0QkFBa0I7YUFDakI7WUFDSCxZQUFZLEVBQUU7Z0JBQ1osNEJBQVk7Z0JBQ1osZ0NBQWM7Z0JBQ2Qsd0NBQWtCO2dCQUNsQiw2Q0FBb0I7Z0JBQ3BCLHlDQUFrQjtnQkFDbEIsaURBQXNCO2dCQUN0Qiw2Q0FBb0I7Z0JBQ3BCLCtDQUFxQjtnQkFDckIscURBQXdCO2dCQUN4Qiw2Q0FBb0I7Z0JBQ3BCLHlDQUFrQjtnQkFDbEIsK0NBQXFCO2dCQUNyQiwyQ0FBbUI7Z0JBQ25CLHFDQUFnQjtnQkFDaEIsc0RBQXNCO2dCQUN0Qix5REFBMEI7Z0JBQzFCLHdDQUFrQjtnQkFDbEIsaUNBQWM7Z0JBQ2QscUNBQWdCO2dCQUNoQixvQ0FBZ0I7Z0JBQ2hCLHFDQUFnQjtnQkFDaEIsbURBQXVCO2dCQUN2Qix1REFBeUI7YUFDMUI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Qsc0JBQVM7Z0JBQ1Qsd0JBQVU7Z0JBQ1Ysd0JBQVU7Z0JBQ1YsNEJBQVk7Z0JBQ1osMEJBQVc7Z0JBQ1gsa0NBQWU7Z0JBQ2YsMEJBQVc7Z0JBQ1gsb0NBQVc7Z0JBQ1gsZ0NBQWM7Z0JBQ2QsNEJBQVk7Z0JBQ1osOEJBQWE7Z0JBQ2IsOEJBQWE7YUFDZDtZQUNELFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7U0FDMUIsQ0FBQztPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQTFCLEFBQTBCLElBQUE7QUFBYiw4QkFBUyIsImZpbGUiOiJhcHAvYXBwLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgQ2hhcnRzTW9kdWxlIH0gZnJvbSAnbmcyLWNoYXJ0cy9uZzItY2hhcnRzJztcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSAnLi9hcHAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgcm91dGluZyB9IGZyb20gJy4vYXBwLnJvdXRpbmcnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVNb2R1bGUgfSBmcm9tICdhbmd1bGFyMi1kYXRhdGFibGUnO1xyXG5pbXBvcnQgeyBTY2hlZHVsZU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmltcG9ydCB7IENhbGVuZGFyTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgRHJvcGRvd25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5pbXBvcnQgeyBDaGVja2JveE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmltcG9ydCB7IFNwbGl0QnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgUmFkaW9CdXR0b25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5pbXBvcnQgeyBUb2dnbGVCdXR0b25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5cclxuLy9JbXBvcnQgY29tcG9uZW50c1xyXG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEYXNoYm9hcmRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdGFmZk1hbmFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdGFmZi1tYW5hZ2Uvc3RhZmYtbWFuYWdlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0YWZmRWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdGFmZi1lZGl0L3N0YWZmLWVkaXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3R1ZGVudE1hbmFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdHVkZW50RWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdHVkZW50LWVkaXQvc3R1ZGVudC1lZGl0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENsaWVudFN0YXR1c0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3VpdGFiaWxpdHlGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N1aXRhYmlsaXR5LWZvcm0vc3VpdGFiaWxpdHktZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb25zZW50Rm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENhc2VOb3Rlc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jYXNlLW5vdGVzL2Nhc2Utbm90ZXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ291cnNlTWFuYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvdXJzZS1tYW5hZ2UvY291cnNlLW1hbmFnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb3Vyc2VFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvdXJzZS1lZGl0L2NvdXJzZS1lZGl0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFByZkZvcm1Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJmLWZvcm0vcHJmLWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGVhcm5pbmdTdHlsZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sZWFybmluZy1zdHlsZS1mb3JtL2xlYXJuaW5nLXN0eWxlLWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3R1ZGVudEVucm9sbG1lbnRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3R1ZGVudC1lbnJvbGxtZW50L3N0dWRlbnQtZW5yb2xsbWVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUaW1ldGFibGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGltZXRhYmxlL3RpbWV0YWJsZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBWaXN2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Zpc3ZpZXcvdmlzdmlldy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBdHRlbmRhbmNlTGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hdHRlbmRhbmNlLWxpc3QvYXR0ZW5kYW5jZS1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEF0dGVuZGFuY2VSZXBvcnRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1yZXBvcnQvYXR0ZW5kYW5jZS1yZXBvcnQuY29tcG9uZW50JztcclxuXHJcbi8vSW1wb3J0IHBpcGVzXHJcbmltcG9ydCB7IFVzZXJGaWx0ZXJQaXBlIH0gZnJvbSBcIi4vcGlwZXMvdXNlci1maWx0ZXIucGlwZVwiO1xyXG5pbXBvcnQgeyBDb3Vyc2VGaWx0ZXJQaXBlIH0gZnJvbSBcIi4vcGlwZXMvY291cnNlLWZpbHRlci5waXBlXCI7XHJcbmltcG9ydCB7IENhbXB1c0ZpbHRlclBpcGUgfSBmcm9tIFwiLi9waXBlcy9jYW1wdXMtZmlsdGVyLnBpcGVcIjtcclxuXHJcbi8vSW1wb3J0IHNlcnZpY2VzXHJcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL2F1dGguZ3VhcmQnO1xyXG5pbXBvcnQgeyBBZG1pbkd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvYWRtaW4uZ3VhcmQnO1xyXG5pbXBvcnQgeyBTdGFmZkd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvc3RhZmYuZ3VhcmQnO1xyXG5pbXBvcnQgeyBTdHVkZW50R3VhcmQgfSBmcm9tICcuL2d1YXJkcy9zdHVkZW50Lmd1YXJkJztcclxuaW1wb3J0IHsgQ2xpZW50R3VhcmQgfSBmcm9tICcuL2d1YXJkcy9jbGllbnQuZ3VhcmQnO1xyXG5pbXBvcnQgeyBJbnN0cnVjdG9yR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9pbnN0cnVjdG9yLmd1YXJkJztcclxuaW1wb3J0IHsgU2hhcmVkR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9zaGFyZWQuZ3VhcmQnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jbGllbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0YWZmU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvc3RhZmYuc2VydmljZSc7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlJztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIEJyb3dzZXJNb2R1bGUsXHJcbiAgICBIdHRwTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICByb3V0aW5nLFxyXG4gICAgQ2hhcnRzTW9kdWxlLFxyXG4gICAgRGF0YVRhYmxlTW9kdWxlLFxyXG4gICAgU2NoZWR1bGVNb2R1bGUsXHJcbiAgICBDYWxlbmRhck1vZHVsZSxcclxuICAgIERyb3Bkb3duTW9kdWxlLFxyXG4gICAgQ2hlY2tib3hNb2R1bGUsXHJcbiAgICBTcGxpdEJ1dHRvbk1vZHVsZSxcclxuICAgIFJhZGlvQnV0dG9uTW9kdWxlLFxyXG4gICAgVG9nZ2xlQnV0dG9uTW9kdWxlXHJcbiAgICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQXBwQ29tcG9uZW50LFxyXG4gICAgTG9naW5Db21wb25lbnQsXHJcbiAgICBEYXNoYm9hcmRDb21wb25lbnQsXHJcbiAgICBTdGFmZk1hbmFnZUNvbXBvbmVudCxcclxuICAgIFN0YWZmRWRpdENvbXBvbmVudCxcclxuICAgIFN0dWRlbnRNYW5hZ2VDb21wb25lbnQsXHJcbiAgICBTdHVkZW50RWRpdENvbXBvbmVudCxcclxuICAgIENsaWVudFN0YXR1c0NvbXBvbmVudCxcclxuICAgIFN1aXRhYmlsaXR5Rm9ybUNvbXBvbmVudCxcclxuICAgIENvbnNlbnRGb3JtQ29tcG9uZW50LFxyXG4gICAgQ2FzZU5vdGVzQ29tcG9uZW50LFxyXG4gICAgQ291cnNlTWFuYWdlQ29tcG9uZW50LFxyXG4gICAgQ291cnNlRWRpdENvbXBvbmVudCxcclxuICAgIFByZkZvcm1Db21wb25lbnQsXHJcbiAgICBMZWFybmluZ1N0eWxlQ29tcG9uZW50LFxyXG4gICAgU3R1ZGVudEVucm9sbG1lbnRDb21wb25lbnQsXHJcbiAgICBUaW1ldGFibGVDb21wb25lbnQsXHJcbiAgICBVc2VyRmlsdGVyUGlwZSxcclxuICAgIENvdXJzZUZpbHRlclBpcGUsXHJcbiAgICBWaXN2aWV3Q29tcG9uZW50LFxyXG4gICAgQ2FtcHVzRmlsdGVyUGlwZSxcclxuICAgIEF0dGVuZGFuY2VMaXN0Q29tcG9uZW50LFxyXG4gICAgQXR0ZW5kYW5jZVJlcG9ydENvbXBvbmVudFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBBdXRoR3VhcmQsXHJcbiAgICBBZG1pbkd1YXJkLFxyXG4gICAgU3RhZmZHdWFyZCxcclxuICAgIFN0dWRlbnRHdWFyZCxcclxuICAgIENsaWVudEd1YXJkLFxyXG4gICAgSW5zdHJ1Y3Rvckd1YXJkLFxyXG4gICAgU2hhcmVkR3VhcmQsXHJcbiAgICBBdXRoU2VydmljZSxcclxuICAgIFN0dWRlbnRTZXJ2aWNlLFxyXG4gICAgU3RhZmZTZXJ2aWNlLFxyXG4gICAgQ2xpZW50U2VydmljZSxcclxuICAgIENvdXJzZVNlcnZpY2VcclxuICBdLFxyXG4gIGJvb3RzdHJhcDogW0FwcENvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cclxuIl19
