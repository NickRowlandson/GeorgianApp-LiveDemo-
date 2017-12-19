System.register(["@angular/http", "@angular/core", "@angular/forms", "@angular/platform-browser", "ng2-charts/ng2-charts", "./app.component", "./app.routing", "primeng/primeng", "./components/login/login.component", "./components/dashboard/dashboard.component", "./components/staff-manage/staff-manage.component", "./components/staff-edit/staff-edit.component", "./components/student-manage/student-manage.component", "./components/student-edit/student-edit.component", "./components/client-status/client-status.component", "./components/suitability-form/suitability-form.component", "./components/consent-form/consent-form.component", "./components/case-notes/case-notes.component", "./components/course-manage/course-manage.component", "./components/course-edit/course-edit.component", "./components/prf-form/prf-form.component", "./components/learning-style-form/learning-style-form.component", "./components/student-enrollment/student-enrollment.component", "./components/timetable/timetable.component", "./components/attendance-list/attendance-list.component", "./components/attendance-report/attendance-report.component", "./components/reset-password/reset-password.component", "./pipes/user-filter.pipe", "./pipes/course-filter.pipe", "./pipes/campus-filter.pipe", "./guards/auth.guard", "./guards/admin.guard", "./guards/staff.guard", "./guards/student.guard", "./guards/client.guard", "./guards/instructor.guard", "./guards/shared.guard", "./services/authentication.service", "./services/student.service", "./services/client.service", "./services/staff.service", "./services/course.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var http_1, core_1, forms_1, platform_browser_1, ng2_charts_1, app_component_1, app_routing_1, primeng_1, primeng_2, primeng_3, primeng_4, primeng_5, primeng_6, primeng_7, primeng_8, primeng_9, primeng_10, primeng_11, login_component_1, dashboard_component_1, staff_manage_component_1, staff_edit_component_1, student_manage_component_1, student_edit_component_1, client_status_component_1, suitability_form_component_1, consent_form_component_1, case_notes_component_1, course_manage_component_1, course_edit_component_1, prf_form_component_1, learning_style_form_component_1, student_enrollment_component_1, timetable_component_1, attendance_list_component_1, attendance_report_component_1, reset_password_component_1, user_filter_pipe_1, course_filter_pipe_1, campus_filter_pipe_1, auth_guard_1, admin_guard_1, staff_guard_1, student_guard_1, client_guard_1, instructor_guard_1, shared_guard_1, authentication_service_1, student_service_1, client_service_1, staff_service_1, course_service_1, AppModule;
    return {
        setters: [
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (ng2_charts_1_1) {
                ng2_charts_1 = ng2_charts_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (app_routing_1_1) {
                app_routing_1 = app_routing_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
                primeng_2 = primeng_1_1;
                primeng_3 = primeng_1_1;
                primeng_4 = primeng_1_1;
                primeng_5 = primeng_1_1;
                primeng_6 = primeng_1_1;
                primeng_7 = primeng_1_1;
                primeng_8 = primeng_1_1;
                primeng_9 = primeng_1_1;
                primeng_10 = primeng_1_1;
                primeng_11 = primeng_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (staff_manage_component_1_1) {
                staff_manage_component_1 = staff_manage_component_1_1;
            },
            function (staff_edit_component_1_1) {
                staff_edit_component_1 = staff_edit_component_1_1;
            },
            function (student_manage_component_1_1) {
                student_manage_component_1 = student_manage_component_1_1;
            },
            function (student_edit_component_1_1) {
                student_edit_component_1 = student_edit_component_1_1;
            },
            function (client_status_component_1_1) {
                client_status_component_1 = client_status_component_1_1;
            },
            function (suitability_form_component_1_1) {
                suitability_form_component_1 = suitability_form_component_1_1;
            },
            function (consent_form_component_1_1) {
                consent_form_component_1 = consent_form_component_1_1;
            },
            function (case_notes_component_1_1) {
                case_notes_component_1 = case_notes_component_1_1;
            },
            function (course_manage_component_1_1) {
                course_manage_component_1 = course_manage_component_1_1;
            },
            function (course_edit_component_1_1) {
                course_edit_component_1 = course_edit_component_1_1;
            },
            function (prf_form_component_1_1) {
                prf_form_component_1 = prf_form_component_1_1;
            },
            function (learning_style_form_component_1_1) {
                learning_style_form_component_1 = learning_style_form_component_1_1;
            },
            function (student_enrollment_component_1_1) {
                student_enrollment_component_1 = student_enrollment_component_1_1;
            },
            function (timetable_component_1_1) {
                timetable_component_1 = timetable_component_1_1;
            },
            function (attendance_list_component_1_1) {
                attendance_list_component_1 = attendance_list_component_1_1;
            },
            function (attendance_report_component_1_1) {
                attendance_report_component_1 = attendance_report_component_1_1;
            },
            function (reset_password_component_1_1) {
                reset_password_component_1 = reset_password_component_1_1;
            },
            function (user_filter_pipe_1_1) {
                user_filter_pipe_1 = user_filter_pipe_1_1;
            },
            function (course_filter_pipe_1_1) {
                course_filter_pipe_1 = course_filter_pipe_1_1;
            },
            function (campus_filter_pipe_1_1) {
                campus_filter_pipe_1 = campus_filter_pipe_1_1;
            },
            function (auth_guard_1_1) {
                auth_guard_1 = auth_guard_1_1;
            },
            function (admin_guard_1_1) {
                admin_guard_1 = admin_guard_1_1;
            },
            function (staff_guard_1_1) {
                staff_guard_1 = staff_guard_1_1;
            },
            function (student_guard_1_1) {
                student_guard_1 = student_guard_1_1;
            },
            function (client_guard_1_1) {
                client_guard_1 = client_guard_1_1;
            },
            function (instructor_guard_1_1) {
                instructor_guard_1 = instructor_guard_1_1;
            },
            function (shared_guard_1_1) {
                shared_guard_1 = shared_guard_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (student_service_1_1) {
                student_service_1 = student_service_1_1;
            },
            function (client_service_1_1) {
                client_service_1 = client_service_1_1;
            },
            function (staff_service_1_1) {
                staff_service_1 = staff_service_1_1;
            },
            function (course_service_1_1) {
                course_service_1 = course_service_1_1;
            }
        ],
        execute: function () {
            AppModule = /** @class */ (function () {
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
                            primeng_11.InputMaskModule
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
                            campus_filter_pipe_1.CampusFilterPipe,
                            attendance_list_component_1.AttendanceListComponent,
                            attendance_report_component_1.AttendanceReportComponent,
                            reset_password_component_1.ResetPasswordComponent
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
            exports_1("AppModule", AppModule);
        }
    };
});

//# sourceMappingURL=app.module.js.map
