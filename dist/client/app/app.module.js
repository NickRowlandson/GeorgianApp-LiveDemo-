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
var primeng_1 = require("primeng/primeng");
var primeng_2 = require("primeng/primeng");
var primeng_3 = require("primeng/primeng");
var primeng_4 = require("primeng/primeng");
var primeng_5 = require("primeng/primeng");
var primeng_6 = require("primeng/primeng");
var primeng_7 = require("primeng/primeng");
var primeng_8 = require("primeng/primeng");
var primeng_9 = require("primeng/primeng");
var primeng_10 = require("primeng/primeng");
var primeng_11 = require("primeng/primeng");
var primeng_12 = require("primeng/primeng");
var file_upload_module_1 = require("ng2-file-upload/file-upload/file-upload.module");
//Import components
var login_component_1 = require("./components/login/login.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var staff_manage_component_1 = require("./components/staff-manage/staff-manage.component");
var staff_details_component_1 = require("./components/staff-details/staff-details.component");
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
var attendance_list_component_1 = require("./components/attendance-list/attendance-list.component");
var attendance_report_component_1 = require("./components/attendance-report/attendance-report.component");
var reset_password_component_1 = require("./components/reset-password/reset-password.component");
var file_upload_component_1 = require("./components/file-upload/file-upload.component");
var files_component_1 = require("./components/files/files.component");
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
var files_service_1 = require("./services/files.service");
var AppModule = /** @class */ (function () {
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
                primeng_1.DataTableModule,
                primeng_2.ScheduleModule,
                primeng_3.CalendarModule,
                primeng_4.DropdownModule,
                primeng_5.CheckboxModule,
                primeng_6.InputSwitchModule,
                primeng_7.RadioButtonModule,
                primeng_8.ToggleButtonModule,
                primeng_9.DialogModule,
                primeng_10.SplitButtonModule,
                primeng_11.InputMaskModule,
                primeng_12.MultiSelectModule,
                file_upload_module_1.FileUploadModule
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                dashboard_component_1.DashboardComponent,
                staff_manage_component_1.StaffManageComponent,
                staff_details_component_1.StaffDetailsComponent,
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
                campus_filter_pipe_1.CampusFilterPipe,
                attendance_list_component_1.AttendanceListComponent,
                attendance_report_component_1.AttendanceReportComponent,
                reset_password_component_1.ResetPasswordComponent,
                file_upload_component_1.FileUploadComponent,
                files_component_1.FilesComponent
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
                course_service_1.CourseService,
                files_service_1.FilesService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvYXBwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBeUM7QUFDekMsd0NBQTZDO0FBQzdDLDhEQUEwRDtBQUMxRCxvREFBcUQ7QUFDckQsaURBQStDO0FBQy9DLDZDQUF3QztBQUN4QywyQ0FBa0Q7QUFDbEQsMkNBQWlEO0FBQ2pELDJDQUFpRDtBQUNqRCwyQ0FBaUQ7QUFDakQsMkNBQWlEO0FBQ2pELDJDQUFvRDtBQUNwRCwyQ0FBb0Q7QUFDcEQsMkNBQXFEO0FBQ3JELDJDQUErQztBQUMvQyw0Q0FBb0Q7QUFDcEQsNENBQWtEO0FBQ2xELDRDQUFvRDtBQUNwRCxxRkFBa0Y7QUFHbEYsbUJBQW1CO0FBQ25CLHNFQUFvRTtBQUNwRSxrRkFBZ0Y7QUFDaEYsMkZBQXdGO0FBQ3hGLDhGQUEyRjtBQUMzRixpR0FBOEY7QUFDOUYsMkZBQXdGO0FBQ3hGLDhGQUEyRjtBQUMzRix1R0FBb0c7QUFDcEcsMkZBQXdGO0FBQ3hGLHFGQUFrRjtBQUNsRiw4RkFBMkY7QUFDM0Ysd0ZBQXFGO0FBQ3JGLCtFQUE0RTtBQUM1RSxnSEFBd0c7QUFDeEcsNkdBQTBHO0FBQzFHLGtGQUFnRjtBQUNoRixvR0FBaUc7QUFDakcsMEdBQXVHO0FBQ3ZHLGlHQUE4RjtBQUM5Rix3RkFBcUY7QUFDckYsc0VBQW9FO0FBRXBFLGNBQWM7QUFDZCw2REFBMEQ7QUFDMUQsaUVBQThEO0FBQzlELGlFQUE4RDtBQUU5RCxpQkFBaUI7QUFDakIsa0RBQWdEO0FBQ2hELG9EQUFrRDtBQUNsRCxvREFBa0Q7QUFDbEQsd0RBQXNEO0FBQ3RELHNEQUFvRDtBQUNwRCw4REFBNEQ7QUFDNUQsc0RBQW9EO0FBQ3BELDRFQUFnRTtBQUNoRSw4REFBNEQ7QUFDNUQsNERBQTBEO0FBQzFELDBEQUF3RDtBQUN4RCw0REFBMEQ7QUFDMUQsMERBQXdEO0FBbUV4RDtJQUFBO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBakVyQixlQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsZ0NBQWE7Z0JBQ2IsaUJBQVU7Z0JBQ1YsbUJBQVc7Z0JBQ1gscUJBQU87Z0JBQ1AseUJBQVk7Z0JBQ1oseUJBQWU7Z0JBQ2Ysd0JBQWM7Z0JBQ2Qsd0JBQWM7Z0JBQ2Qsd0JBQWM7Z0JBQ2Qsd0JBQWM7Z0JBQ2QsMkJBQWlCO2dCQUNqQiwyQkFBaUI7Z0JBQ2pCLDRCQUFrQjtnQkFDbEIsc0JBQVk7Z0JBQ1osNEJBQWlCO2dCQUNqQiwwQkFBZTtnQkFDZiw0QkFBaUI7Z0JBQ2pCLHFDQUFnQjthQUNmO1lBQ0gsWUFBWSxFQUFFO2dCQUNaLDRCQUFZO2dCQUNaLGdDQUFjO2dCQUNkLHdDQUFrQjtnQkFDbEIsNkNBQW9CO2dCQUNwQiwrQ0FBcUI7Z0JBQ3JCLGlEQUFzQjtnQkFDdEIsNkNBQW9CO2dCQUNwQiwrQ0FBcUI7Z0JBQ3JCLHFEQUF3QjtnQkFDeEIsNkNBQW9CO2dCQUNwQix5Q0FBa0I7Z0JBQ2xCLCtDQUFxQjtnQkFDckIsMkNBQW1CO2dCQUNuQixxQ0FBZ0I7Z0JBQ2hCLHNEQUFzQjtnQkFDdEIseURBQTBCO2dCQUMxQix3Q0FBa0I7Z0JBQ2xCLGlDQUFjO2dCQUNkLHFDQUFnQjtnQkFDaEIscUNBQWdCO2dCQUNoQixtREFBdUI7Z0JBQ3ZCLHVEQUF5QjtnQkFDekIsaURBQXNCO2dCQUN0QiwyQ0FBbUI7Z0JBQ25CLGdDQUFjO2FBQ2Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1Qsc0JBQVM7Z0JBQ1Qsd0JBQVU7Z0JBQ1Ysd0JBQVU7Z0JBQ1YsNEJBQVk7Z0JBQ1osMEJBQVc7Z0JBQ1gsa0NBQWU7Z0JBQ2YsMEJBQVc7Z0JBQ1gsb0NBQVc7Z0JBQ1gsZ0NBQWM7Z0JBQ2QsNEJBQVk7Z0JBQ1osOEJBQWE7Z0JBQ2IsOEJBQWE7Z0JBQ2IsNEJBQVk7YUFDYjtZQUNELFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7U0FDMUIsQ0FBQztPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQTFCLEFBQTBCLElBQUE7QUFBYiw4QkFBUyIsImZpbGUiOiJhcHAvYXBwLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgQ2hhcnRzTW9kdWxlIH0gZnJvbSAnbmcyLWNoYXJ0cy9uZzItY2hhcnRzJztcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSAnLi9hcHAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgcm91dGluZyB9IGZyb20gJy4vYXBwLnJvdXRpbmcnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xuaW1wb3J0IHsgU2NoZWR1bGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5pbXBvcnQgeyBDYWxlbmRhck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmltcG9ydCB7IERyb3Bkb3duTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgQ2hlY2tib3hNb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5pbXBvcnQgeyBJbnB1dFN3aXRjaE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmltcG9ydCB7IFJhZGlvQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgVG9nZ2xlQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgRGlhbG9nTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgU3BsaXRCdXR0b25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5pbXBvcnQgeyBJbnB1dE1hc2tNb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5pbXBvcnQgeyBNdWx0aVNlbGVjdE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmltcG9ydCB7IEZpbGVVcGxvYWRNb2R1bGUgfSBmcm9tIFwibmcyLWZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLm1vZHVsZVwiO1xyXG5cclxuXHJcbi8vSW1wb3J0IGNvbXBvbmVudHNcclxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbG9naW4vbG9naW4uY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGFzaGJvYXJkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3RhZmZNYW5hZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RhZmYtbWFuYWdlL3N0YWZmLW1hbmFnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdGFmZkRldGFpbHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RhZmYtZGV0YWlscy9zdGFmZi1kZXRhaWxzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0dWRlbnRNYW5hZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3R1ZGVudC1tYW5hZ2Uvc3R1ZGVudC1tYW5hZ2UuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3R1ZGVudEVkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3R1ZGVudC1lZGl0L3N0dWRlbnQtZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDbGllbnRTdGF0dXNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2xpZW50LXN0YXR1cy9jbGllbnQtc3RhdHVzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN1aXRhYmlsaXR5Rm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdWl0YWJpbGl0eS1mb3JtL3N1aXRhYmlsaXR5LWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29uc2VudEZvcm1Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29uc2VudC1mb3JtL2NvbnNlbnQtZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDYXNlTm90ZXNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FzZS1ub3Rlcy9jYXNlLW5vdGVzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvdXJzZU1hbmFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb3Vyc2UtbWFuYWdlL2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ291cnNlRWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQcmZGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3ByZi1mb3JtL3ByZi1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExlYXJuaW5nU3R5bGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbGVhcm5pbmctc3R5bGUtZm9ybS9sZWFybmluZy1zdHlsZS1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0dWRlbnRFbnJvbGxtZW50Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N0dWRlbnQtZW5yb2xsbWVudC9zdHVkZW50LWVucm9sbG1lbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGltZXRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RpbWV0YWJsZS90aW1ldGFibGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXR0ZW5kYW5jZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1saXN0L2F0dGVuZGFuY2UtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBdHRlbmRhbmNlUmVwb3J0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2F0dGVuZGFuY2UtcmVwb3J0L2F0dGVuZGFuY2UtcmVwb3J0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcmVzZXQtcGFzc3dvcmQvcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRmlsZVVwbG9hZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGaWxlc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9maWxlcy9maWxlcy5jb21wb25lbnQnO1xyXG5cclxuLy9JbXBvcnQgcGlwZXNcclxuaW1wb3J0IHsgVXNlckZpbHRlclBpcGUgfSBmcm9tIFwiLi9waXBlcy91c2VyLWZpbHRlci5waXBlXCI7XHJcbmltcG9ydCB7IENvdXJzZUZpbHRlclBpcGUgfSBmcm9tIFwiLi9waXBlcy9jb3Vyc2UtZmlsdGVyLnBpcGVcIjtcclxuaW1wb3J0IHsgQ2FtcHVzRmlsdGVyUGlwZSB9IGZyb20gXCIuL3BpcGVzL2NhbXB1cy1maWx0ZXIucGlwZVwiO1xyXG5cclxuLy9JbXBvcnQgc2VydmljZXNcclxuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvYXV0aC5ndWFyZCc7XHJcbmltcG9ydCB7IEFkbWluR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9hZG1pbi5ndWFyZCc7XHJcbmltcG9ydCB7IFN0YWZmR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9zdGFmZi5ndWFyZCc7XHJcbmltcG9ydCB7IFN0dWRlbnRHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL3N0dWRlbnQuZ3VhcmQnO1xyXG5pbXBvcnQgeyBDbGllbnRHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL2NsaWVudC5ndWFyZCc7XHJcbmltcG9ydCB7IEluc3RydWN0b3JHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL2luc3RydWN0b3IuZ3VhcmQnO1xyXG5pbXBvcnQgeyBTaGFyZWRHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL3NoYXJlZC5ndWFyZCc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NsaWVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RhZmZTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zdGFmZi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ291cnNlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY291cnNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGaWxlc1NlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9maWxlcy5zZXJ2aWNlXCI7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIEJyb3dzZXJNb2R1bGUsXHJcbiAgICBIdHRwTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICByb3V0aW5nLFxyXG4gICAgQ2hhcnRzTW9kdWxlLFxyXG4gICAgRGF0YVRhYmxlTW9kdWxlLFxyXG4gICAgU2NoZWR1bGVNb2R1bGUsXHJcbiAgICBDYWxlbmRhck1vZHVsZSxcclxuICAgIERyb3Bkb3duTW9kdWxlLFxyXG4gICAgQ2hlY2tib3hNb2R1bGUsXHJcbiAgICBJbnB1dFN3aXRjaE1vZHVsZSxcclxuICAgIFJhZGlvQnV0dG9uTW9kdWxlLFxyXG4gICAgVG9nZ2xlQnV0dG9uTW9kdWxlLFxyXG4gICAgRGlhbG9nTW9kdWxlLFxyXG4gICAgU3BsaXRCdXR0b25Nb2R1bGUsXHJcbiAgICBJbnB1dE1hc2tNb2R1bGUsXHJcbiAgICBNdWx0aVNlbGVjdE1vZHVsZSxcclxuICAgIEZpbGVVcGxvYWRNb2R1bGVcclxuICAgIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBBcHBDb21wb25lbnQsXHJcbiAgICBMb2dpbkNvbXBvbmVudCxcclxuICAgIERhc2hib2FyZENvbXBvbmVudCxcclxuICAgIFN0YWZmTWFuYWdlQ29tcG9uZW50LFxyXG4gICAgU3RhZmZEZXRhaWxzQ29tcG9uZW50LFxyXG4gICAgU3R1ZGVudE1hbmFnZUNvbXBvbmVudCxcclxuICAgIFN0dWRlbnRFZGl0Q29tcG9uZW50LFxyXG4gICAgQ2xpZW50U3RhdHVzQ29tcG9uZW50LFxyXG4gICAgU3VpdGFiaWxpdHlGb3JtQ29tcG9uZW50LFxyXG4gICAgQ29uc2VudEZvcm1Db21wb25lbnQsXHJcbiAgICBDYXNlTm90ZXNDb21wb25lbnQsXHJcbiAgICBDb3Vyc2VNYW5hZ2VDb21wb25lbnQsXHJcbiAgICBDb3Vyc2VFZGl0Q29tcG9uZW50LFxyXG4gICAgUHJmRm9ybUNvbXBvbmVudCxcclxuICAgIExlYXJuaW5nU3R5bGVDb21wb25lbnQsXHJcbiAgICBTdHVkZW50RW5yb2xsbWVudENvbXBvbmVudCxcclxuICAgIFRpbWV0YWJsZUNvbXBvbmVudCxcclxuICAgIFVzZXJGaWx0ZXJQaXBlLFxyXG4gICAgQ291cnNlRmlsdGVyUGlwZSxcclxuICAgIENhbXB1c0ZpbHRlclBpcGUsXHJcbiAgICBBdHRlbmRhbmNlTGlzdENvbXBvbmVudCxcclxuICAgIEF0dGVuZGFuY2VSZXBvcnRDb21wb25lbnQsXHJcbiAgICBSZXNldFBhc3N3b3JkQ29tcG9uZW50LFxyXG4gICAgRmlsZVVwbG9hZENvbXBvbmVudCxcclxuICAgIEZpbGVzQ29tcG9uZW50XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIEF1dGhHdWFyZCxcclxuICAgIEFkbWluR3VhcmQsXHJcbiAgICBTdGFmZkd1YXJkLFxyXG4gICAgU3R1ZGVudEd1YXJkLFxyXG4gICAgQ2xpZW50R3VhcmQsXHJcbiAgICBJbnN0cnVjdG9yR3VhcmQsXHJcbiAgICBTaGFyZWRHdWFyZCxcclxuICAgIEF1dGhTZXJ2aWNlLFxyXG4gICAgU3R1ZGVudFNlcnZpY2UsXHJcbiAgICBTdGFmZlNlcnZpY2UsXHJcbiAgICBDbGllbnRTZXJ2aWNlLFxyXG4gICAgQ291cnNlU2VydmljZSxcclxuICAgIEZpbGVzU2VydmljZVxyXG4gIF0sXHJcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxyXG4iXX0=
