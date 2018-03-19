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
var not_found_component_1 = require("./components/not-found/not-found.component");
//Import pipes
var user_filter_pipe_1 = require("./pipes/user-filter.pipe");
var course_filter_pipe_1 = require("./pipes/course-filter.pipe");
var campus_filter_pipe_1 = require("./pipes/campus-filter.pipe");
var student_to_select_item_pipe_1 = require("./pipes/student-to-select-item.pipe");
var instructor_to_select_item_pipe_1 = require("./pipes/instructor-to-select-item.pipe");
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
                student_to_select_item_pipe_1.StudentSelectItemPipe,
                instructor_to_select_item_pipe_1.InstructorSelectItemPipe,
                attendance_list_component_1.AttendanceListComponent,
                attendance_report_component_1.AttendanceReportComponent,
                reset_password_component_1.ResetPasswordComponent,
                file_upload_component_1.FileUploadComponent,
                files_component_1.FilesComponent,
                help_component_1.HelpComponent,
                not_found_component_1.NotFoundComponent
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvYXBwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBeUM7QUFDekMsd0NBQTZDO0FBQzdDLDhEQUEwRDtBQUMxRCxvREFBcUQ7QUFDckQsaURBQStDO0FBQy9DLDZDQUF3QztBQUN4QywyQ0FBa0Q7QUFDbEQsMkNBQWlEO0FBQ2pELDJDQUFpRDtBQUNqRCwyQ0FBaUQ7QUFDakQsMkNBQWlEO0FBQ2pELDJDQUFvRDtBQUNwRCwyQ0FBb0Q7QUFDcEQsMkNBQXFEO0FBQ3JELDJDQUErQztBQUMvQyw0Q0FBb0Q7QUFDcEQsNENBQWtEO0FBQ2xELDRDQUFvRDtBQUNwRCxxRkFBa0Y7QUFFbEYsbUJBQW1CO0FBQ25CLHNFQUFvRTtBQUNwRSxrRkFBZ0Y7QUFDaEYsMkZBQXdGO0FBQ3hGLDhGQUEyRjtBQUMzRixpR0FBOEY7QUFDOUYsMkZBQXdGO0FBQ3hGLDhGQUEyRjtBQUMzRix1R0FBb0c7QUFDcEcsMkZBQXdGO0FBQ3hGLHFGQUFrRjtBQUNsRiw4RkFBMkY7QUFDM0Ysd0ZBQXFGO0FBQ3JGLCtFQUE0RTtBQUM1RSxnSEFBd0c7QUFDeEcsNkdBQTBHO0FBQzFHLGtGQUFnRjtBQUNoRixvR0FBaUc7QUFDakcsMEdBQXVHO0FBQ3ZHLGlHQUE4RjtBQUM5Rix3RkFBcUY7QUFDckYsc0VBQW9FO0FBQ3BFLG1FQUFpRTtBQUNqRSxrRkFBK0U7QUFHL0UsY0FBYztBQUNkLDZEQUEwRDtBQUMxRCxpRUFBOEQ7QUFDOUQsaUVBQThEO0FBQzlELG1GQUE0RTtBQUM1RSx5RkFBa0Y7QUFFbEYsaUJBQWlCO0FBQ2pCLGtEQUFnRDtBQUNoRCxvREFBa0Q7QUFDbEQsb0RBQWtEO0FBQ2xELHdEQUFzRDtBQUN0RCxzREFBb0Q7QUFDcEQsOERBQTREO0FBQzVELHNEQUFvRDtBQUNwRCw0RUFBZ0U7QUFDaEUsOERBQTREO0FBQzVELDREQUEwRDtBQUMxRCwwREFBd0Q7QUFDeEQsNERBQTBEO0FBQzFELDBEQUF3RDtBQXVFeEQ7SUFBQTtJQUF5QixDQUFDO0lBQWIsU0FBUztRQXJFckIsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLGdDQUFhO2dCQUNiLGlCQUFVO2dCQUNWLG1CQUFXO2dCQUNYLHFCQUFPO2dCQUNQLHlCQUFZO2dCQUNaLHlCQUFlO2dCQUNmLHdCQUFjO2dCQUNkLHdCQUFjO2dCQUNkLHdCQUFjO2dCQUNkLHdCQUFjO2dCQUNkLDJCQUFpQjtnQkFDakIsMkJBQWlCO2dCQUNqQiw0QkFBa0I7Z0JBQ2xCLHNCQUFZO2dCQUNaLDRCQUFpQjtnQkFDakIsMEJBQWU7Z0JBQ2YsNEJBQWlCO2dCQUNqQixxQ0FBZ0I7YUFDZjtZQUNILFlBQVksRUFBRTtnQkFDWiw0QkFBWTtnQkFDWixnQ0FBYztnQkFDZCx3Q0FBa0I7Z0JBQ2xCLDZDQUFvQjtnQkFDcEIsK0NBQXFCO2dCQUNyQixpREFBc0I7Z0JBQ3RCLDZDQUFvQjtnQkFDcEIsK0NBQXFCO2dCQUNyQixxREFBd0I7Z0JBQ3hCLDZDQUFvQjtnQkFDcEIseUNBQWtCO2dCQUNsQiwrQ0FBcUI7Z0JBQ3JCLDJDQUFtQjtnQkFDbkIscUNBQWdCO2dCQUNoQixzREFBc0I7Z0JBQ3RCLHlEQUEwQjtnQkFDMUIsd0NBQWtCO2dCQUNsQixpQ0FBYztnQkFDZCxxQ0FBZ0I7Z0JBQ2hCLHFDQUFnQjtnQkFDaEIsbURBQXFCO2dCQUNyQix5REFBd0I7Z0JBQ3hCLG1EQUF1QjtnQkFDdkIsdURBQXlCO2dCQUN6QixpREFBc0I7Z0JBQ3RCLDJDQUFtQjtnQkFDbkIsZ0NBQWM7Z0JBQ2QsOEJBQWE7Z0JBQ2IsdUNBQWlCO2FBQ2xCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULHNCQUFTO2dCQUNULHdCQUFVO2dCQUNWLHdCQUFVO2dCQUNWLDRCQUFZO2dCQUNaLDBCQUFXO2dCQUNYLGtDQUFlO2dCQUNmLDBCQUFXO2dCQUNYLG9DQUFXO2dCQUNYLGdDQUFjO2dCQUNkLDRCQUFZO2dCQUNaLDhCQUFhO2dCQUNiLDhCQUFhO2dCQUNiLDRCQUFZO2FBQ2I7WUFDRCxTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO1NBQzFCLENBQUM7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUExQixBQUEwQixJQUFBO0FBQWIsOEJBQVMiLCJmaWxlIjoiYXBwL2FwcC5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IENoYXJ0c01vZHVsZSB9IGZyb20gJ25nMi1jaGFydHMvbmcyLWNoYXJ0cyc7XHJcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gJy4vYXBwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IHJvdXRpbmcgfSBmcm9tICcuL2FwcC5yb3V0aW5nJztcclxuaW1wb3J0IHsgRGF0YVRhYmxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgU2NoZWR1bGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5pbXBvcnQgeyBDYWxlbmRhck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmltcG9ydCB7IERyb3Bkb3duTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgQ2hlY2tib3hNb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5pbXBvcnQgeyBJbnB1dFN3aXRjaE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmltcG9ydCB7IFJhZGlvQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgVG9nZ2xlQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgRGlhbG9nTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgU3BsaXRCdXR0b25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5pbXBvcnQgeyBJbnB1dE1hc2tNb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5pbXBvcnQgeyBNdWx0aVNlbGVjdE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmltcG9ydCB7IEZpbGVVcGxvYWRNb2R1bGUgfSBmcm9tIFwibmcyLWZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLm1vZHVsZVwiO1xyXG5cclxuLy9JbXBvcnQgY29tcG9uZW50c1xyXG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEYXNoYm9hcmRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdGFmZk1hbmFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdGFmZi1tYW5hZ2Uvc3RhZmYtbWFuYWdlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0YWZmRGV0YWlsc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdGFmZi1kZXRhaWxzL3N0YWZmLWRldGFpbHMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3R1ZGVudE1hbmFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdHVkZW50RWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdHVkZW50LWVkaXQvc3R1ZGVudC1lZGl0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENsaWVudFN0YXR1c0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3VpdGFiaWxpdHlGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N1aXRhYmlsaXR5LWZvcm0vc3VpdGFiaWxpdHktZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb25zZW50Rm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb25zZW50LWZvcm0vY29uc2VudC1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENhc2VOb3Rlc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jYXNlLW5vdGVzL2Nhc2Utbm90ZXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ291cnNlTWFuYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvdXJzZS1tYW5hZ2UvY291cnNlLW1hbmFnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb3Vyc2VFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvdXJzZS1lZGl0L2NvdXJzZS1lZGl0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFByZkZvcm1Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJmLWZvcm0vcHJmLWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGVhcm5pbmdTdHlsZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sZWFybmluZy1zdHlsZS1mb3JtL2xlYXJuaW5nLXN0eWxlLWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3R1ZGVudEVucm9sbG1lbnRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3R1ZGVudC1lbnJvbGxtZW50L3N0dWRlbnQtZW5yb2xsbWVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUaW1ldGFibGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGltZXRhYmxlL3RpbWV0YWJsZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBdHRlbmRhbmNlTGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hdHRlbmRhbmNlLWxpc3QvYXR0ZW5kYW5jZS1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEF0dGVuZGFuY2VSZXBvcnRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1yZXBvcnQvYXR0ZW5kYW5jZS1yZXBvcnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUmVzZXRQYXNzd29yZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9yZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGaWxlVXBsb2FkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZpbGVzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ZpbGVzL2ZpbGVzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEhlbHBDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvaGVscC9oZWxwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5vdEZvdW5kQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL25vdC1mb3VuZC9ub3QtZm91bmQuY29tcG9uZW50JztcclxuXHJcblxyXG4vL0ltcG9ydCBwaXBlc1xyXG5pbXBvcnQgeyBVc2VyRmlsdGVyUGlwZSB9IGZyb20gXCIuL3BpcGVzL3VzZXItZmlsdGVyLnBpcGVcIjtcclxuaW1wb3J0IHsgQ291cnNlRmlsdGVyUGlwZSB9IGZyb20gXCIuL3BpcGVzL2NvdXJzZS1maWx0ZXIucGlwZVwiO1xyXG5pbXBvcnQgeyBDYW1wdXNGaWx0ZXJQaXBlIH0gZnJvbSBcIi4vcGlwZXMvY2FtcHVzLWZpbHRlci5waXBlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnRTZWxlY3RJdGVtUGlwZSB9IGZyb20gXCIuL3BpcGVzL3N0dWRlbnQtdG8tc2VsZWN0LWl0ZW0ucGlwZVwiO1xyXG5pbXBvcnQgeyBJbnN0cnVjdG9yU2VsZWN0SXRlbVBpcGUgfSBmcm9tIFwiLi9waXBlcy9pbnN0cnVjdG9yLXRvLXNlbGVjdC1pdGVtLnBpcGVcIjtcclxuXHJcbi8vSW1wb3J0IHNlcnZpY2VzXHJcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL2F1dGguZ3VhcmQnO1xyXG5pbXBvcnQgeyBBZG1pbkd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvYWRtaW4uZ3VhcmQnO1xyXG5pbXBvcnQgeyBTdGFmZkd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvc3RhZmYuZ3VhcmQnO1xyXG5pbXBvcnQgeyBTdHVkZW50R3VhcmQgfSBmcm9tICcuL2d1YXJkcy9zdHVkZW50Lmd1YXJkJztcclxuaW1wb3J0IHsgQ2xpZW50R3VhcmQgfSBmcm9tICcuL2d1YXJkcy9jbGllbnQuZ3VhcmQnO1xyXG5pbXBvcnQgeyBJbnN0cnVjdG9yR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9pbnN0cnVjdG9yLmd1YXJkJztcclxuaW1wb3J0IHsgU2hhcmVkR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9zaGFyZWQuZ3VhcmQnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXV0aGVudGljYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFN0dWRlbnRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDbGllbnRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jbGllbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0YWZmU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvc3RhZmYuc2VydmljZSc7XHJcbmltcG9ydCB7IENvdXJzZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvdXJzZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRmlsZXNTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvZmlsZXMuc2VydmljZVwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBCcm93c2VyTW9kdWxlLFxyXG4gICAgSHR0cE1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgcm91dGluZyxcclxuICAgIENoYXJ0c01vZHVsZSxcclxuICAgIERhdGFUYWJsZU1vZHVsZSxcclxuICAgIFNjaGVkdWxlTW9kdWxlLFxyXG4gICAgQ2FsZW5kYXJNb2R1bGUsXHJcbiAgICBEcm9wZG93bk1vZHVsZSxcclxuICAgIENoZWNrYm94TW9kdWxlLFxyXG4gICAgSW5wdXRTd2l0Y2hNb2R1bGUsXHJcbiAgICBSYWRpb0J1dHRvbk1vZHVsZSxcclxuICAgIFRvZ2dsZUJ1dHRvbk1vZHVsZSxcclxuICAgIERpYWxvZ01vZHVsZSxcclxuICAgIFNwbGl0QnV0dG9uTW9kdWxlLFxyXG4gICAgSW5wdXRNYXNrTW9kdWxlLFxyXG4gICAgTXVsdGlTZWxlY3RNb2R1bGUsXHJcbiAgICBGaWxlVXBsb2FkTW9kdWxlXHJcbiAgICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQXBwQ29tcG9uZW50LFxyXG4gICAgTG9naW5Db21wb25lbnQsXHJcbiAgICBEYXNoYm9hcmRDb21wb25lbnQsXHJcbiAgICBTdGFmZk1hbmFnZUNvbXBvbmVudCxcclxuICAgIFN0YWZmRGV0YWlsc0NvbXBvbmVudCxcclxuICAgIFN0dWRlbnRNYW5hZ2VDb21wb25lbnQsXHJcbiAgICBTdHVkZW50RWRpdENvbXBvbmVudCxcclxuICAgIENsaWVudFN0YXR1c0NvbXBvbmVudCxcclxuICAgIFN1aXRhYmlsaXR5Rm9ybUNvbXBvbmVudCxcclxuICAgIENvbnNlbnRGb3JtQ29tcG9uZW50LFxyXG4gICAgQ2FzZU5vdGVzQ29tcG9uZW50LFxyXG4gICAgQ291cnNlTWFuYWdlQ29tcG9uZW50LFxyXG4gICAgQ291cnNlRWRpdENvbXBvbmVudCxcclxuICAgIFByZkZvcm1Db21wb25lbnQsXHJcbiAgICBMZWFybmluZ1N0eWxlQ29tcG9uZW50LFxyXG4gICAgU3R1ZGVudEVucm9sbG1lbnRDb21wb25lbnQsXHJcbiAgICBUaW1ldGFibGVDb21wb25lbnQsXHJcbiAgICBVc2VyRmlsdGVyUGlwZSxcclxuICAgIENvdXJzZUZpbHRlclBpcGUsXHJcbiAgICBDYW1wdXNGaWx0ZXJQaXBlLFxyXG4gICAgU3R1ZGVudFNlbGVjdEl0ZW1QaXBlLFxyXG4gICAgSW5zdHJ1Y3RvclNlbGVjdEl0ZW1QaXBlLFxyXG4gICAgQXR0ZW5kYW5jZUxpc3RDb21wb25lbnQsXHJcbiAgICBBdHRlbmRhbmNlUmVwb3J0Q29tcG9uZW50LFxyXG4gICAgUmVzZXRQYXNzd29yZENvbXBvbmVudCxcclxuICAgIEZpbGVVcGxvYWRDb21wb25lbnQsXHJcbiAgICBGaWxlc0NvbXBvbmVudCxcclxuICAgIEhlbHBDb21wb25lbnQsXHJcbiAgICBOb3RGb3VuZENvbXBvbmVudFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBBdXRoR3VhcmQsXHJcbiAgICBBZG1pbkd1YXJkLFxyXG4gICAgU3RhZmZHdWFyZCxcclxuICAgIFN0dWRlbnRHdWFyZCxcclxuICAgIENsaWVudEd1YXJkLFxyXG4gICAgSW5zdHJ1Y3Rvckd1YXJkLFxyXG4gICAgU2hhcmVkR3VhcmQsXHJcbiAgICBBdXRoU2VydmljZSxcclxuICAgIFN0dWRlbnRTZXJ2aWNlLFxyXG4gICAgU3RhZmZTZXJ2aWNlLFxyXG4gICAgQ2xpZW50U2VydmljZSxcclxuICAgIENvdXJzZVNlcnZpY2UsXHJcbiAgICBGaWxlc1NlcnZpY2VcclxuICBdLFxyXG4gIGJvb3RzdHJhcDogW0FwcENvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cclxuIl19
