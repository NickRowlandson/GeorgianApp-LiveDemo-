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
var help_component_1 = require("./components/help/help.component");
//Import pipes
var user_filter_pipe_1 = require("./pipes/user-filter.pipe");
var course_filter_pipe_1 = require("./pipes/course-filter.pipe");
var campus_filter_pipe_1 = require("./pipes/campus-filter.pipe");
var select_item_pipe_1 = require("./pipes/select-item.pipe");
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
                select_item_pipe_1.SelectItemPipe,
                attendance_list_component_1.AttendanceListComponent,
                attendance_report_component_1.AttendanceReportComponent,
                reset_password_component_1.ResetPasswordComponent,
                file_upload_component_1.FileUploadComponent,
                files_component_1.FilesComponent,
                help_component_1.HelpComponent
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvYXBwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBeUM7QUFDekMsd0NBQTZDO0FBQzdDLDhEQUEwRDtBQUMxRCxvREFBcUQ7QUFDckQsaURBQStDO0FBQy9DLDZDQUF3QztBQUN4QywyQ0FBa0Q7QUFDbEQsMkNBQWlEO0FBQ2pELDJDQUFpRDtBQUNqRCwyQ0FBaUQ7QUFDakQsMkNBQWlEO0FBQ2pELDJDQUFvRDtBQUNwRCwyQ0FBb0Q7QUFDcEQsMkNBQXFEO0FBQ3JELDJDQUErQztBQUMvQyw0Q0FBb0Q7QUFDcEQsNENBQWtEO0FBQ2xELDRDQUFvRDtBQUNwRCxxRkFBa0Y7QUFFbEYsbUJBQW1CO0FBQ25CLHNFQUFvRTtBQUNwRSxrRkFBZ0Y7QUFDaEYsMkZBQXdGO0FBQ3hGLDhGQUEyRjtBQUMzRixpR0FBOEY7QUFDOUYsMkZBQXdGO0FBQ3hGLDhGQUEyRjtBQUMzRix1R0FBb0c7QUFDcEcsMkZBQXdGO0FBQ3hGLHFGQUFrRjtBQUNsRiw4RkFBMkY7QUFDM0Ysd0ZBQXFGO0FBQ3JGLCtFQUE0RTtBQUM1RSxnSEFBd0c7QUFDeEcsNkdBQTBHO0FBQzFHLGtGQUFnRjtBQUNoRixvR0FBaUc7QUFDakcsMEdBQXVHO0FBQ3ZHLGlHQUE4RjtBQUM5Rix3RkFBcUY7QUFDckYsc0VBQW9FO0FBQ3BFLG1FQUFpRTtBQUVqRSxjQUFjO0FBQ2QsNkRBQTBEO0FBQzFELGlFQUE4RDtBQUM5RCxpRUFBOEQ7QUFDOUQsNkRBQTBEO0FBRTFELGlCQUFpQjtBQUNqQixrREFBZ0Q7QUFDaEQsb0RBQWtEO0FBQ2xELG9EQUFrRDtBQUNsRCx3REFBc0Q7QUFDdEQsc0RBQW9EO0FBQ3BELDhEQUE0RDtBQUM1RCxzREFBb0Q7QUFDcEQsNEVBQWdFO0FBQ2hFLDhEQUE0RDtBQUM1RCw0REFBMEQ7QUFDMUQsMERBQXdEO0FBQ3hELDREQUEwRDtBQUMxRCwwREFBd0Q7QUFxRXhEO0lBQUE7SUFBeUIsQ0FBQztJQUFiLFNBQVM7UUFuRXJCLGVBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxnQ0FBYTtnQkFDYixpQkFBVTtnQkFDVixtQkFBVztnQkFDWCxxQkFBTztnQkFDUCx5QkFBWTtnQkFDWix5QkFBZTtnQkFDZix3QkFBYztnQkFDZCx3QkFBYztnQkFDZCx3QkFBYztnQkFDZCx3QkFBYztnQkFDZCwyQkFBaUI7Z0JBQ2pCLDJCQUFpQjtnQkFDakIsNEJBQWtCO2dCQUNsQixzQkFBWTtnQkFDWiw0QkFBaUI7Z0JBQ2pCLDBCQUFlO2dCQUNmLDRCQUFpQjtnQkFDakIscUNBQWdCO2FBQ2Y7WUFDSCxZQUFZLEVBQUU7Z0JBQ1osNEJBQVk7Z0JBQ1osZ0NBQWM7Z0JBQ2Qsd0NBQWtCO2dCQUNsQiw2Q0FBb0I7Z0JBQ3BCLCtDQUFxQjtnQkFDckIsaURBQXNCO2dCQUN0Qiw2Q0FBb0I7Z0JBQ3BCLCtDQUFxQjtnQkFDckIscURBQXdCO2dCQUN4Qiw2Q0FBb0I7Z0JBQ3BCLHlDQUFrQjtnQkFDbEIsK0NBQXFCO2dCQUNyQiwyQ0FBbUI7Z0JBQ25CLHFDQUFnQjtnQkFDaEIsc0RBQXNCO2dCQUN0Qix5REFBMEI7Z0JBQzFCLHdDQUFrQjtnQkFDbEIsaUNBQWM7Z0JBQ2QscUNBQWdCO2dCQUNoQixxQ0FBZ0I7Z0JBQ2hCLGlDQUFjO2dCQUNkLG1EQUF1QjtnQkFDdkIsdURBQXlCO2dCQUN6QixpREFBc0I7Z0JBQ3RCLDJDQUFtQjtnQkFDbkIsZ0NBQWM7Z0JBQ2QsOEJBQWE7YUFDZDtZQUNELFNBQVMsRUFBRTtnQkFDVCxzQkFBUztnQkFDVCx3QkFBVTtnQkFDVix3QkFBVTtnQkFDViw0QkFBWTtnQkFDWiwwQkFBVztnQkFDWCxrQ0FBZTtnQkFDZiwwQkFBVztnQkFDWCxvQ0FBVztnQkFDWCxnQ0FBYztnQkFDZCw0QkFBWTtnQkFDWiw4QkFBYTtnQkFDYiw4QkFBYTtnQkFDYiw0QkFBWTthQUNiO1lBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztTQUMxQixDQUFDO09BQ1csU0FBUyxDQUFJO0lBQUQsZ0JBQUM7Q0FBMUIsQUFBMEIsSUFBQTtBQUFiLDhCQUFTIiwiZmlsZSI6ImFwcC9hcHAubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBDaGFydHNNb2R1bGUgfSBmcm9tICduZzItY2hhcnRzL25nMi1jaGFydHMnO1xyXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tICcuL2FwcC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyByb3V0aW5nIH0gZnJvbSAnLi9hcHAucm91dGluZyc7XHJcbmltcG9ydCB7IERhdGFUYWJsZU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmltcG9ydCB7IFNjaGVkdWxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJNb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5pbXBvcnQgeyBEcm9wZG93bk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmltcG9ydCB7IENoZWNrYm94TW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgSW5wdXRTd2l0Y2hNb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5pbXBvcnQgeyBSYWRpb0J1dHRvbk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmltcG9ydCB7IFRvZ2dsZUJ1dHRvbk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmltcG9ydCB7IERpYWxvZ01vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmltcG9ydCB7IFNwbGl0QnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgSW5wdXRNYXNrTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgTXVsdGlTZWxlY3RNb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5pbXBvcnQgeyBGaWxlVXBsb2FkTW9kdWxlIH0gZnJvbSBcIm5nMi1maWxlLXVwbG9hZC9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5tb2R1bGVcIjtcclxuXHJcbi8vSW1wb3J0IGNvbXBvbmVudHNcclxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbG9naW4vbG9naW4uY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGFzaGJvYXJkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3RhZmZNYW5hZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RhZmYtbWFuYWdlL3N0YWZmLW1hbmFnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdGFmZkRldGFpbHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RhZmYtZGV0YWlscy9zdGFmZi1kZXRhaWxzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0dWRlbnRNYW5hZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3R1ZGVudC1tYW5hZ2Uvc3R1ZGVudC1tYW5hZ2UuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3R1ZGVudEVkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3R1ZGVudC1lZGl0L3N0dWRlbnQtZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDbGllbnRTdGF0dXNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2xpZW50LXN0YXR1cy9jbGllbnQtc3RhdHVzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN1aXRhYmlsaXR5Rm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdWl0YWJpbGl0eS1mb3JtL3N1aXRhYmlsaXR5LWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29uc2VudEZvcm1Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29uc2VudC1mb3JtL2NvbnNlbnQtZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDYXNlTm90ZXNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FzZS1ub3Rlcy9jYXNlLW5vdGVzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvdXJzZU1hbmFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb3Vyc2UtbWFuYWdlL2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ291cnNlRWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQcmZGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3ByZi1mb3JtL3ByZi1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExlYXJuaW5nU3R5bGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbGVhcm5pbmctc3R5bGUtZm9ybS9sZWFybmluZy1zdHlsZS1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0dWRlbnRFbnJvbGxtZW50Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N0dWRlbnQtZW5yb2xsbWVudC9zdHVkZW50LWVucm9sbG1lbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGltZXRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RpbWV0YWJsZS90aW1ldGFibGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXR0ZW5kYW5jZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1saXN0L2F0dGVuZGFuY2UtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBdHRlbmRhbmNlUmVwb3J0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2F0dGVuZGFuY2UtcmVwb3J0L2F0dGVuZGFuY2UtcmVwb3J0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcmVzZXQtcGFzc3dvcmQvcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRmlsZVVwbG9hZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGaWxlc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9maWxlcy9maWxlcy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBIZWxwQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2hlbHAvaGVscC5jb21wb25lbnQnO1xyXG5cclxuLy9JbXBvcnQgcGlwZXNcclxuaW1wb3J0IHsgVXNlckZpbHRlclBpcGUgfSBmcm9tIFwiLi9waXBlcy91c2VyLWZpbHRlci5waXBlXCI7XHJcbmltcG9ydCB7IENvdXJzZUZpbHRlclBpcGUgfSBmcm9tIFwiLi9waXBlcy9jb3Vyc2UtZmlsdGVyLnBpcGVcIjtcclxuaW1wb3J0IHsgQ2FtcHVzRmlsdGVyUGlwZSB9IGZyb20gXCIuL3BpcGVzL2NhbXB1cy1maWx0ZXIucGlwZVwiO1xyXG5pbXBvcnQgeyBTZWxlY3RJdGVtUGlwZSB9IGZyb20gXCIuL3BpcGVzL3NlbGVjdC1pdGVtLnBpcGVcIjtcclxuXHJcbi8vSW1wb3J0IHNlcnZpY2VzXHJcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL2F1dGguZ3VhcmQnO1xyXG5pbXBvcnQgeyBBZG1pbkd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvYWRtaW4uZ3VhcmQnO1xyXG5pbXBvcnQgeyBTdGFmZkd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvc3RhZmYuZ3VhcmQnO1xyXG5pbXBvcnQgeyBTdHVkZW50R3VhcmQgfSBmcm9tICcuL2d1YXJkcy9zdHVkZW50Lmd1YXJkJztcclxuaW1wb3J0IHsgQ2xpZW50R3VhcmQgfSBmcm9tICcuL2d1YXJkcy9jbGllbnQuZ3VhcmQnO1xyXG5pbXBvcnQgeyBJbnN0cnVjdG9yR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9pbnN0cnVjdG9yLmd1YXJkJztcclxuaW1wb3J0IHsgU2hhcmVkR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9zaGFyZWQuZ3VhcmQnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jbGllbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0YWZmU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvc3RhZmYuc2VydmljZSc7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRmlsZXNTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvZmlsZXMuc2VydmljZVwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBCcm93c2VyTW9kdWxlLFxyXG4gICAgSHR0cE1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgcm91dGluZyxcclxuICAgIENoYXJ0c01vZHVsZSxcclxuICAgIERhdGFUYWJsZU1vZHVsZSxcclxuICAgIFNjaGVkdWxlTW9kdWxlLFxyXG4gICAgQ2FsZW5kYXJNb2R1bGUsXHJcbiAgICBEcm9wZG93bk1vZHVsZSxcclxuICAgIENoZWNrYm94TW9kdWxlLFxyXG4gICAgSW5wdXRTd2l0Y2hNb2R1bGUsXHJcbiAgICBSYWRpb0J1dHRvbk1vZHVsZSxcclxuICAgIFRvZ2dsZUJ1dHRvbk1vZHVsZSxcclxuICAgIERpYWxvZ01vZHVsZSxcclxuICAgIFNwbGl0QnV0dG9uTW9kdWxlLFxyXG4gICAgSW5wdXRNYXNrTW9kdWxlLFxyXG4gICAgTXVsdGlTZWxlY3RNb2R1bGUsXHJcbiAgICBGaWxlVXBsb2FkTW9kdWxlXHJcbiAgICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQXBwQ29tcG9uZW50LFxyXG4gICAgTG9naW5Db21wb25lbnQsXHJcbiAgICBEYXNoYm9hcmRDb21wb25lbnQsXHJcbiAgICBTdGFmZk1hbmFnZUNvbXBvbmVudCxcclxuICAgIFN0YWZmRGV0YWlsc0NvbXBvbmVudCxcclxuICAgIFN0dWRlbnRNYW5hZ2VDb21wb25lbnQsXHJcbiAgICBTdHVkZW50RWRpdENvbXBvbmVudCxcclxuICAgIENsaWVudFN0YXR1c0NvbXBvbmVudCxcclxuICAgIFN1aXRhYmlsaXR5Rm9ybUNvbXBvbmVudCxcclxuICAgIENvbnNlbnRGb3JtQ29tcG9uZW50LFxyXG4gICAgQ2FzZU5vdGVzQ29tcG9uZW50LFxyXG4gICAgQ291cnNlTWFuYWdlQ29tcG9uZW50LFxyXG4gICAgQ291cnNlRWRpdENvbXBvbmVudCxcclxuICAgIFByZkZvcm1Db21wb25lbnQsXHJcbiAgICBMZWFybmluZ1N0eWxlQ29tcG9uZW50LFxyXG4gICAgU3R1ZGVudEVucm9sbG1lbnRDb21wb25lbnQsXHJcbiAgICBUaW1ldGFibGVDb21wb25lbnQsXHJcbiAgICBVc2VyRmlsdGVyUGlwZSxcclxuICAgIENvdXJzZUZpbHRlclBpcGUsXHJcbiAgICBDYW1wdXNGaWx0ZXJQaXBlLFxyXG4gICAgU2VsZWN0SXRlbVBpcGUsXHJcbiAgICBBdHRlbmRhbmNlTGlzdENvbXBvbmVudCxcclxuICAgIEF0dGVuZGFuY2VSZXBvcnRDb21wb25lbnQsXHJcbiAgICBSZXNldFBhc3N3b3JkQ29tcG9uZW50LFxyXG4gICAgRmlsZVVwbG9hZENvbXBvbmVudCxcclxuICAgIEZpbGVzQ29tcG9uZW50LFxyXG4gICAgSGVscENvbXBvbmVudFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBBdXRoR3VhcmQsXHJcbiAgICBBZG1pbkd1YXJkLFxyXG4gICAgU3RhZmZHdWFyZCxcclxuICAgIFN0dWRlbnRHdWFyZCxcclxuICAgIENsaWVudEd1YXJkLFxyXG4gICAgSW5zdHJ1Y3Rvckd1YXJkLFxyXG4gICAgU2hhcmVkR3VhcmQsXHJcbiAgICBBdXRoU2VydmljZSxcclxuICAgIFN0dWRlbnRTZXJ2aWNlLFxyXG4gICAgU3RhZmZTZXJ2aWNlLFxyXG4gICAgQ2xpZW50U2VydmljZSxcclxuICAgIENvdXJzZVNlcnZpY2UsXHJcbiAgICBGaWxlc1NlcnZpY2VcclxuICBdLFxyXG4gIGJvb3RzdHJhcDogW0FwcENvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cclxuIl19
