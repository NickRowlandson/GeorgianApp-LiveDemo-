"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/http");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const platform_browser_1 = require("@angular/platform-browser");
const ng2_charts_1 = require("ng2-charts/ng2-charts");
const app_component_1 = require("./app.component");
const app_routing_1 = require("./app.routing");
const primeng_1 = require("primeng/primeng");
const primeng_2 = require("primeng/primeng");
const primeng_3 = require("primeng/primeng");
const primeng_4 = require("primeng/primeng");
const primeng_5 = require("primeng/primeng");
const primeng_6 = require("primeng/primeng");
const primeng_7 = require("primeng/primeng");
const primeng_8 = require("primeng/primeng");
const primeng_9 = require("primeng/primeng");
const primeng_10 = require("primeng/primeng");
const primeng_11 = require("primeng/primeng");
const primeng_12 = require("primeng/primeng");
const file_upload_module_1 = require("ng2-file-upload/file-upload/file-upload.module");
//Import components
const login_component_1 = require("./components/login/login.component");
const dashboard_component_1 = require("./components/dashboard/dashboard.component");
const staff_manage_component_1 = require("./components/staff-manage/staff-manage.component");
const staff_details_component_1 = require("./components/staff-details/staff-details.component");
const student_manage_component_1 = require("./components/student-manage/student-manage.component");
const client_status_component_1 = require("./components/client-status/client-status.component");
const suitability_form_component_1 = require("./components/suitability-form/suitability-form.component");
const consent_form_component_1 = require("./components/consent-form/consent-form.component");
const case_notes_component_1 = require("./components/case-notes/case-notes.component");
const course_manage_component_1 = require("./components/course-manage/course-manage.component");
const course_edit_component_1 = require("./components/course-edit/course-edit.component");
const prf_form_component_1 = require("./components/prf-form/prf-form.component");
const learning_style_form_component_1 = require("./components/learning-style-form/learning-style-form.component");
const student_enrollment_component_1 = require("./components/student-enrollment/student-enrollment.component");
const timetable_component_1 = require("./components/timetable/timetable.component");
const attendance_list_component_1 = require("./components/attendance-list/attendance-list.component");
const attendance_report_component_1 = require("./components/attendance-report/attendance-report.component");
const reset_password_component_1 = require("./components/reset-password/reset-password.component");
const file_upload_component_1 = require("./components/file-upload/file-upload.component");
const files_component_1 = require("./components/files/files.component");
const help_component_1 = require("./components/help/help.component");
const not_found_component_1 = require("./components/not-found/not-found.component");
const wait_list_component_1 = require("./components/wait-list/wait-list.component");
const site_activity_component_1 = require("./components/site-activity/site-activity.component");
const student_archive_component_1 = require("./components/student-archive/student-archive.component");
//Import pipes
const user_filter_pipe_1 = require("./pipes/user-filter.pipe");
const course_filter_pipe_1 = require("./pipes/course-filter.pipe");
const campus_filter_pipe_1 = require("./pipes/campus-filter.pipe");
const student_to_select_item_pipe_1 = require("./pipes/student-to-select-item.pipe");
const instructor_to_select_item_pipe_1 = require("./pipes/instructor-to-select-item.pipe");
const course_to_select_item_pipe_1 = require("./pipes/course-to-select-item.pipe");
const course_type_to_select_item_pipe_1 = require("./pipes/course-type-to-select-item.pipe");
//Import services
const auth_guard_1 = require("./guards/auth.guard");
const admin_guard_1 = require("./guards/admin.guard");
const staff_guard_1 = require("./guards/staff.guard");
const student_guard_1 = require("./guards/student.guard");
const client_guard_1 = require("./guards/client.guard");
const instructor_guard_1 = require("./guards/instructor.guard");
const shared_guard_1 = require("./guards/shared.guard");
const authentication_service_1 = require("./services/authentication.service");
const student_service_1 = require("./services/student.service");
const client_service_1 = require("./services/client.service");
const staff_service_1 = require("./services/staff.service");
const course_service_1 = require("./services/course.service");
const files_service_1 = require("./services/files.service");
let AppModule = class AppModule {
};
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
            course_to_select_item_pipe_1.CourseSelectItemPipe,
            course_type_to_select_item_pipe_1.CourseTypeSelectItemPipe,
            attendance_list_component_1.AttendanceListComponent,
            attendance_report_component_1.AttendanceReportComponent,
            reset_password_component_1.ResetPasswordComponent,
            file_upload_component_1.FileUploadComponent,
            files_component_1.FilesComponent,
            help_component_1.HelpComponent,
            not_found_component_1.NotFoundComponent,
            wait_list_component_1.WaitListComponent,
            site_activity_component_1.SiteActivityComponent,
            student_archive_component_1.StudentArchiveComponent
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
exports.AppModule = AppModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvYXBwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx3Q0FBeUM7QUFDekMsMENBQTZDO0FBQzdDLGdFQUEwRDtBQUMxRCxzREFBcUQ7QUFDckQsbURBQStDO0FBQy9DLCtDQUF3QztBQUN4Qyw2Q0FBa0Q7QUFDbEQsNkNBQWlEO0FBQ2pELDZDQUFpRDtBQUNqRCw2Q0FBaUQ7QUFDakQsNkNBQWlEO0FBQ2pELDZDQUFvRDtBQUNwRCw2Q0FBb0Q7QUFDcEQsNkNBQXFEO0FBQ3JELDZDQUErQztBQUMvQyw4Q0FBb0Q7QUFDcEQsOENBQWtEO0FBQ2xELDhDQUFvRDtBQUNwRCx1RkFBa0Y7QUFFbEYsbUJBQW1CO0FBQ25CLHdFQUFvRTtBQUNwRSxvRkFBZ0Y7QUFDaEYsNkZBQXdGO0FBQ3hGLGdHQUEyRjtBQUMzRixtR0FBOEY7QUFDOUYsZ0dBQTJGO0FBQzNGLHlHQUFvRztBQUNwRyw2RkFBd0Y7QUFDeEYsdUZBQWtGO0FBQ2xGLGdHQUEyRjtBQUMzRiwwRkFBcUY7QUFDckYsaUZBQTRFO0FBQzVFLGtIQUF3RztBQUN4RywrR0FBMEc7QUFDMUcsb0ZBQWdGO0FBQ2hGLHNHQUFpRztBQUNqRyw0R0FBdUc7QUFDdkcsbUdBQThGO0FBQzlGLDBGQUFxRjtBQUNyRix3RUFBb0U7QUFDcEUscUVBQWlFO0FBQ2pFLG9GQUErRTtBQUMvRSxvRkFBK0U7QUFDL0UsZ0dBQTJGO0FBQzNGLHNHQUFpRztBQUVqRyxjQUFjO0FBQ2QsK0RBQTBEO0FBQzFELG1FQUE4RDtBQUM5RCxtRUFBOEQ7QUFDOUQscUZBQTRFO0FBQzVFLDJGQUFrRjtBQUNsRixtRkFBMEU7QUFDMUUsNkZBQW1GO0FBRW5GLGlCQUFpQjtBQUNqQixvREFBZ0Q7QUFDaEQsc0RBQWtEO0FBQ2xELHNEQUFrRDtBQUNsRCwwREFBc0Q7QUFDdEQsd0RBQW9EO0FBQ3BELGdFQUE0RDtBQUM1RCx3REFBb0Q7QUFDcEQsOEVBQWdFO0FBQ2hFLGdFQUE0RDtBQUM1RCw4REFBMEQ7QUFDMUQsNERBQXdEO0FBQ3hELDhEQUEwRDtBQUMxRCw0REFBd0Q7QUEyRXhELElBQWEsU0FBUyxHQUF0QjtDQUEwQixDQUFBO0FBQWIsU0FBUztJQXpFckIsZUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsZ0NBQWE7WUFDYixpQkFBVTtZQUNWLG1CQUFXO1lBQ1gscUJBQU87WUFDUCx5QkFBWTtZQUNaLHlCQUFlO1lBQ2Ysd0JBQWM7WUFDZCx3QkFBYztZQUNkLHdCQUFjO1lBQ2Qsd0JBQWM7WUFDZCwyQkFBaUI7WUFDakIsMkJBQWlCO1lBQ2pCLDRCQUFrQjtZQUNsQixzQkFBWTtZQUNaLDRCQUFpQjtZQUNqQiwwQkFBZTtZQUNmLDRCQUFpQjtZQUNqQixxQ0FBZ0I7U0FDZjtRQUNILFlBQVksRUFBRTtZQUNaLDRCQUFZO1lBQ1osZ0NBQWM7WUFDZCx3Q0FBa0I7WUFDbEIsNkNBQW9CO1lBQ3BCLCtDQUFxQjtZQUNyQixpREFBc0I7WUFDdEIsK0NBQXFCO1lBQ3JCLHFEQUF3QjtZQUN4Qiw2Q0FBb0I7WUFDcEIseUNBQWtCO1lBQ2xCLCtDQUFxQjtZQUNyQiwyQ0FBbUI7WUFDbkIscUNBQWdCO1lBQ2hCLHNEQUFzQjtZQUN0Qix5REFBMEI7WUFDMUIsd0NBQWtCO1lBQ2xCLGlDQUFjO1lBQ2QscUNBQWdCO1lBQ2hCLHFDQUFnQjtZQUNoQixtREFBcUI7WUFDckIseURBQXdCO1lBQ3hCLGlEQUFvQjtZQUNwQiwwREFBd0I7WUFDeEIsbURBQXVCO1lBQ3ZCLHVEQUF5QjtZQUN6QixpREFBc0I7WUFDdEIsMkNBQW1CO1lBQ25CLGdDQUFjO1lBQ2QsOEJBQWE7WUFDYix1Q0FBaUI7WUFDakIsdUNBQWlCO1lBQ2pCLCtDQUFxQjtZQUNyQixtREFBdUI7U0FDeEI7UUFDRCxTQUFTLEVBQUU7WUFDVCxzQkFBUztZQUNULHdCQUFVO1lBQ1Ysd0JBQVU7WUFDViw0QkFBWTtZQUNaLDBCQUFXO1lBQ1gsa0NBQWU7WUFDZiwwQkFBVztZQUNYLG9DQUFXO1lBQ1gsZ0NBQWM7WUFDZCw0QkFBWTtZQUNaLDhCQUFhO1lBQ2IsOEJBQWE7WUFDYiw0QkFBWTtTQUNiO1FBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztLQUMxQixDQUFDO0dBQ1csU0FBUyxDQUFJO0FBQWIsOEJBQVMiLCJmaWxlIjoiYXBwL2FwcC5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IENoYXJ0c01vZHVsZSB9IGZyb20gJ25nMi1jaGFydHMvbmcyLWNoYXJ0cyc7XHJcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gJy4vYXBwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IHJvdXRpbmcgfSBmcm9tICcuL2FwcC5yb3V0aW5nJztcclxuaW1wb3J0IHsgRGF0YVRhYmxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgU2NoZWR1bGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5pbXBvcnQgeyBDYWxlbmRhck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmltcG9ydCB7IERyb3Bkb3duTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgQ2hlY2tib3hNb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5pbXBvcnQgeyBJbnB1dFN3aXRjaE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmltcG9ydCB7IFJhZGlvQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgVG9nZ2xlQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgRGlhbG9nTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgU3BsaXRCdXR0b25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5pbXBvcnQgeyBJbnB1dE1hc2tNb2R1bGUgfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5pbXBvcnQgeyBNdWx0aVNlbGVjdE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmltcG9ydCB7IEZpbGVVcGxvYWRNb2R1bGUgfSBmcm9tIFwibmcyLWZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLm1vZHVsZVwiO1xyXG5cclxuLy9JbXBvcnQgY29tcG9uZW50c1xyXG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEYXNoYm9hcmRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdGFmZk1hbmFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdGFmZi1tYW5hZ2Uvc3RhZmYtbWFuYWdlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0YWZmRGV0YWlsc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdGFmZi1kZXRhaWxzL3N0YWZmLWRldGFpbHMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3R1ZGVudE1hbmFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDbGllbnRTdGF0dXNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2xpZW50LXN0YXR1cy9jbGllbnQtc3RhdHVzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN1aXRhYmlsaXR5Rm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdWl0YWJpbGl0eS1mb3JtL3N1aXRhYmlsaXR5LWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29uc2VudEZvcm1Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29uc2VudC1mb3JtL2NvbnNlbnQtZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDYXNlTm90ZXNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FzZS1ub3Rlcy9jYXNlLW5vdGVzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvdXJzZU1hbmFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb3Vyc2UtbWFuYWdlL2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ291cnNlRWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQcmZGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3ByZi1mb3JtL3ByZi1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExlYXJuaW5nU3R5bGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbGVhcm5pbmctc3R5bGUtZm9ybS9sZWFybmluZy1zdHlsZS1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0dWRlbnRFbnJvbGxtZW50Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N0dWRlbnQtZW5yb2xsbWVudC9zdHVkZW50LWVucm9sbG1lbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGltZXRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RpbWV0YWJsZS90aW1ldGFibGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXR0ZW5kYW5jZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1saXN0L2F0dGVuZGFuY2UtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBdHRlbmRhbmNlUmVwb3J0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2F0dGVuZGFuY2UtcmVwb3J0L2F0dGVuZGFuY2UtcmVwb3J0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcmVzZXQtcGFzc3dvcmQvcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRmlsZVVwbG9hZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGaWxlc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9maWxlcy9maWxlcy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBIZWxwQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2hlbHAvaGVscC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOb3RGb3VuZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9ub3QtZm91bmQvbm90LWZvdW5kLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFdhaXRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3dhaXQtbGlzdC93YWl0LWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2l0ZUFjdGl2aXR5Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3NpdGUtYWN0aXZpdHkvc2l0ZS1hY3Rpdml0eS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdHVkZW50QXJjaGl2ZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdHVkZW50LWFyY2hpdmUvc3R1ZGVudC1hcmNoaXZlLmNvbXBvbmVudCc7XHJcblxyXG4vL0ltcG9ydCBwaXBlc1xyXG5pbXBvcnQgeyBVc2VyRmlsdGVyUGlwZSB9IGZyb20gXCIuL3BpcGVzL3VzZXItZmlsdGVyLnBpcGVcIjtcclxuaW1wb3J0IHsgQ291cnNlRmlsdGVyUGlwZSB9IGZyb20gXCIuL3BpcGVzL2NvdXJzZS1maWx0ZXIucGlwZVwiO1xyXG5pbXBvcnQgeyBDYW1wdXNGaWx0ZXJQaXBlIH0gZnJvbSBcIi4vcGlwZXMvY2FtcHVzLWZpbHRlci5waXBlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnRTZWxlY3RJdGVtUGlwZSB9IGZyb20gXCIuL3BpcGVzL3N0dWRlbnQtdG8tc2VsZWN0LWl0ZW0ucGlwZVwiO1xyXG5pbXBvcnQgeyBJbnN0cnVjdG9yU2VsZWN0SXRlbVBpcGUgfSBmcm9tIFwiLi9waXBlcy9pbnN0cnVjdG9yLXRvLXNlbGVjdC1pdGVtLnBpcGVcIjtcclxuaW1wb3J0IHsgQ291cnNlU2VsZWN0SXRlbVBpcGUgfSBmcm9tIFwiLi9waXBlcy9jb3Vyc2UtdG8tc2VsZWN0LWl0ZW0ucGlwZVwiO1xyXG5pbXBvcnQgeyBDb3Vyc2VUeXBlU2VsZWN0SXRlbVBpcGUgfSBmcm9tIFwiLi9waXBlcy9jb3Vyc2UtdHlwZS10by1zZWxlY3QtaXRlbS5waXBlXCI7XHJcblxyXG4vL0ltcG9ydCBzZXJ2aWNlc1xyXG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9hdXRoLmd1YXJkJztcclxuaW1wb3J0IHsgQWRtaW5HdWFyZCB9IGZyb20gJy4vZ3VhcmRzL2FkbWluLmd1YXJkJztcclxuaW1wb3J0IHsgU3RhZmZHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL3N0YWZmLmd1YXJkJztcclxuaW1wb3J0IHsgU3R1ZGVudEd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvc3R1ZGVudC5ndWFyZCc7XHJcbmltcG9ydCB7IENsaWVudEd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvY2xpZW50Lmd1YXJkJztcclxuaW1wb3J0IHsgSW5zdHJ1Y3Rvckd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvaW5zdHJ1Y3Rvci5ndWFyZCc7XHJcbmltcG9ydCB7IFNoYXJlZEd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvc2hhcmVkLmd1YXJkJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ2xpZW50U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY2xpZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdGFmZlNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3N0YWZmLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb3Vyc2VTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb3Vyc2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IEZpbGVzU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2ZpbGVzLnNlcnZpY2VcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQnJvd3Nlck1vZHVsZSxcclxuICAgIEh0dHBNb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIHJvdXRpbmcsXHJcbiAgICBDaGFydHNNb2R1bGUsXHJcbiAgICBEYXRhVGFibGVNb2R1bGUsXHJcbiAgICBTY2hlZHVsZU1vZHVsZSxcclxuICAgIENhbGVuZGFyTW9kdWxlLFxyXG4gICAgRHJvcGRvd25Nb2R1bGUsXHJcbiAgICBDaGVja2JveE1vZHVsZSxcclxuICAgIElucHV0U3dpdGNoTW9kdWxlLFxyXG4gICAgUmFkaW9CdXR0b25Nb2R1bGUsXHJcbiAgICBUb2dnbGVCdXR0b25Nb2R1bGUsXHJcbiAgICBEaWFsb2dNb2R1bGUsXHJcbiAgICBTcGxpdEJ1dHRvbk1vZHVsZSxcclxuICAgIElucHV0TWFza01vZHVsZSxcclxuICAgIE11bHRpU2VsZWN0TW9kdWxlLFxyXG4gICAgRmlsZVVwbG9hZE1vZHVsZVxyXG4gICAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEFwcENvbXBvbmVudCxcclxuICAgIExvZ2luQ29tcG9uZW50LFxyXG4gICAgRGFzaGJvYXJkQ29tcG9uZW50LFxyXG4gICAgU3RhZmZNYW5hZ2VDb21wb25lbnQsXHJcbiAgICBTdGFmZkRldGFpbHNDb21wb25lbnQsXHJcbiAgICBTdHVkZW50TWFuYWdlQ29tcG9uZW50LFxyXG4gICAgQ2xpZW50U3RhdHVzQ29tcG9uZW50LFxyXG4gICAgU3VpdGFiaWxpdHlGb3JtQ29tcG9uZW50LFxyXG4gICAgQ29uc2VudEZvcm1Db21wb25lbnQsXHJcbiAgICBDYXNlTm90ZXNDb21wb25lbnQsXHJcbiAgICBDb3Vyc2VNYW5hZ2VDb21wb25lbnQsXHJcbiAgICBDb3Vyc2VFZGl0Q29tcG9uZW50LFxyXG4gICAgUHJmRm9ybUNvbXBvbmVudCxcclxuICAgIExlYXJuaW5nU3R5bGVDb21wb25lbnQsXHJcbiAgICBTdHVkZW50RW5yb2xsbWVudENvbXBvbmVudCxcclxuICAgIFRpbWV0YWJsZUNvbXBvbmVudCxcclxuICAgIFVzZXJGaWx0ZXJQaXBlLFxyXG4gICAgQ291cnNlRmlsdGVyUGlwZSxcclxuICAgIENhbXB1c0ZpbHRlclBpcGUsXHJcbiAgICBTdHVkZW50U2VsZWN0SXRlbVBpcGUsXHJcbiAgICBJbnN0cnVjdG9yU2VsZWN0SXRlbVBpcGUsXHJcbiAgICBDb3Vyc2VTZWxlY3RJdGVtUGlwZSxcclxuICAgIENvdXJzZVR5cGVTZWxlY3RJdGVtUGlwZSxcclxuICAgIEF0dGVuZGFuY2VMaXN0Q29tcG9uZW50LFxyXG4gICAgQXR0ZW5kYW5jZVJlcG9ydENvbXBvbmVudCxcclxuICAgIFJlc2V0UGFzc3dvcmRDb21wb25lbnQsXHJcbiAgICBGaWxlVXBsb2FkQ29tcG9uZW50LFxyXG4gICAgRmlsZXNDb21wb25lbnQsXHJcbiAgICBIZWxwQ29tcG9uZW50LFxyXG4gICAgTm90Rm91bmRDb21wb25lbnQsXHJcbiAgICBXYWl0TGlzdENvbXBvbmVudCxcclxuICAgIFNpdGVBY3Rpdml0eUNvbXBvbmVudCxcclxuICAgIFN0dWRlbnRBcmNoaXZlQ29tcG9uZW50XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIEF1dGhHdWFyZCxcclxuICAgIEFkbWluR3VhcmQsXHJcbiAgICBTdGFmZkd1YXJkLFxyXG4gICAgU3R1ZGVudEd1YXJkLFxyXG4gICAgQ2xpZW50R3VhcmQsXHJcbiAgICBJbnN0cnVjdG9yR3VhcmQsXHJcbiAgICBTaGFyZWRHdWFyZCxcclxuICAgIEF1dGhTZXJ2aWNlLFxyXG4gICAgU3R1ZGVudFNlcnZpY2UsXHJcbiAgICBTdGFmZlNlcnZpY2UsXHJcbiAgICBDbGllbnRTZXJ2aWNlLFxyXG4gICAgQ291cnNlU2VydmljZSxcclxuICAgIEZpbGVzU2VydmljZVxyXG4gIF0sXHJcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxyXG4iXX0=
