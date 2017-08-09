System.register(["@angular/router", "./guards/auth.guard", "./guards/admin.guard", "./guards/staff.guard", "./guards/student.guard", "./guards/client.guard", "./guards/instructor.guard", "./guards/shared.guard", "./components/login/login.component", "./components/dashboard/dashboard.component", "./components/staff-manage/staff-manage.component", "./components/staff-edit/staff-edit.component", "./components/student-manage/student-manage.component", "./components/student-edit/student-edit.component", "./components/client-status/client-status.component", "./components/suitability-form/suitability-form.component", "./components/consent-form/consent-form.component", "./components/case-notes/case-notes.component", "./components/course-manage/course-manage.component", "./components/course-edit/course-edit.component", "./components/prf-form/prf-form.component", "./components/learning-style-form/learning-style-form.component", "./components/student-enrollment/student-enrollment.component", "./components/timetable/timetable.component", "./components/visview/visview.component", "./components/attendance-list/attendance-list.component", "./components/attendance-report/attendance-report.component"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, auth_guard_1, admin_guard_1, staff_guard_1, student_guard_1, client_guard_1, instructor_guard_1, shared_guard_1, login_component_1, dashboard_component_1, staff_manage_component_1, staff_edit_component_1, student_manage_component_1, student_edit_component_1, client_status_component_1, suitability_form_component_1, consent_form_component_1, case_notes_component_1, course_manage_component_1, course_edit_component_1, prf_form_component_1, learning_style_form_component_1, student_enrollment_component_1, timetable_component_1, visview_component_1, attendance_list_component_1, attendance_report_component_1, appRoutes, routing;
    return {
        setters: [
            function (router_1_1) {
                router_1 = router_1_1;
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
            function (visview_component_1_1) {
                visview_component_1 = visview_component_1_1;
            },
            function (attendance_list_component_1_1) {
                attendance_list_component_1 = attendance_list_component_1_1;
            },
            function (attendance_report_component_1_1) {
                attendance_report_component_1 = attendance_report_component_1_1;
            }
        ],
        execute: function () {
            appRoutes = [
                {
                    path: '',
                    redirectTo: '/dashboard',
                    pathMatch: 'full'
                },
                {
                    path: 'login',
                    component: login_component_1.LoginComponent
                },
                {
                    path: 'dashboard',
                    component: dashboard_component_1.DashboardComponent,
                    canActivate: [auth_guard_1.AuthGuard]
                },
                {
                    path: 'student-edit/:id',
                    component: student_edit_component_1.StudentEditComponent,
                    canActivate: [auth_guard_1.AuthGuard, staff_guard_1.StaffGuard]
                },
                {
                    path: 'students',
                    component: student_manage_component_1.StudentManageComponent,
                    canActivate: [auth_guard_1.AuthGuard, staff_guard_1.StaffGuard]
                },
                {
                    path: 'clients',
                    component: client_status_component_1.ClientStatusComponent,
                    canActivate: [auth_guard_1.AuthGuard, staff_guard_1.StaffGuard]
                },
                {
                    path: 'staff',
                    component: staff_manage_component_1.StaffManageComponent,
                    canActivate: [auth_guard_1.AuthGuard, admin_guard_1.AdminGuard]
                },
                {
                    path: 'staff-edit/:id',
                    component: staff_edit_component_1.StaffEditComponent,
                    canActivate: [auth_guard_1.AuthGuard, admin_guard_1.AdminGuard]
                },
                {
                    path: 'suitability',
                    component: suitability_form_component_1.SuitabilityFormComponent,
                    canActivate: [auth_guard_1.AuthGuard, staff_guard_1.StaffGuard]
                },
                {
                    path: 'consent',
                    component: consent_form_component_1.ConsentFormComponent,
                    canActivate: [auth_guard_1.AuthGuard, client_guard_1.ClientGuard]
                },
                {
                    path: 'case-notes',
                    component: case_notes_component_1.CaseNotesComponent,
                    canActivate: [auth_guard_1.AuthGuard, shared_guard_1.SharedGuard]
                },
                {
                    path: 'courses',
                    component: course_manage_component_1.CourseManageComponent,
                    canActivate: [auth_guard_1.AuthGuard, staff_guard_1.StaffGuard]
                },
                {
                    path: 'course-edit/:id',
                    component: course_edit_component_1.CourseEditComponent,
                    canActivate: [auth_guard_1.AuthGuard, admin_guard_1.AdminGuard]
                },
                {
                    path: 'prf',
                    component: prf_form_component_1.PrfFormComponent,
                    canActivate: [auth_guard_1.AuthGuard]
                },
                {
                    path: 'learning-style',
                    component: learning_style_form_component_1.LearningStyleComponent,
                    canActivate: [auth_guard_1.AuthGuard]
                },
                {
                    path: 'timetable',
                    component: timetable_component_1.TimetableComponent,
                    canActivate: [auth_guard_1.AuthGuard, student_guard_1.StudentGuard]
                },
                {
                    path: 'student-enrollment/:courseID/:instructorID/:courseName',
                    component: student_enrollment_component_1.StudentEnrollmentComponent,
                    canActivate: [auth_guard_1.AuthGuard, staff_guard_1.StaffGuard]
                },
                {
                    path: 'visview',
                    component: visview_component_1.VisviewComponent,
                    canActivate: [auth_guard_1.AuthGuard]
                },
                {
                    path: 'attendance-list',
                    component: attendance_list_component_1.AttendanceListComponent,
                    canActivate: [auth_guard_1.AuthGuard, instructor_guard_1.InstructorGuard]
                },
                {
                    path: 'attendance-report',
                    component: attendance_report_component_1.AttendanceReportComponent,
                    canActivate: [auth_guard_1.AuthGuard, shared_guard_1.SharedGuard]
                }
            ];
            exports_1("routing", routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true }));
        }
    };
});

//# sourceMappingURL=app.routing.js.map
