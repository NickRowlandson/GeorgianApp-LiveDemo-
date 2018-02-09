"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var auth_guard_1 = require("./guards/auth.guard");
var admin_guard_1 = require("./guards/admin.guard");
var staff_guard_1 = require("./guards/staff.guard");
var student_guard_1 = require("./guards/student.guard");
var client_guard_1 = require("./guards/client.guard");
var instructor_guard_1 = require("./guards/instructor.guard");
var shared_guard_1 = require("./guards/shared.guard");
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
var appRoutes = [
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
        path: 'staff-details/:id',
        component: staff_details_component_1.StaffDetailsComponent,
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
        canActivate: [auth_guard_1.AuthGuard, client_guard_1.ClientGuard]
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
        path: 'attendance-list',
        component: attendance_list_component_1.AttendanceListComponent,
        canActivate: [auth_guard_1.AuthGuard, instructor_guard_1.InstructorGuard]
    },
    {
        path: 'attendance-report',
        component: attendance_report_component_1.AttendanceReportComponent,
        canActivate: [auth_guard_1.AuthGuard, shared_guard_1.SharedGuard]
    },
    {
        path: 'reset-password',
        component: reset_password_component_1.ResetPasswordComponent,
        canActivate: []
    },
    {
        path: 'file-upload',
        component: file_upload_component_1.FileUploadComponent,
        canActivate: [auth_guard_1.AuthGuard, staff_guard_1.StaffGuard]
    },
    {
        path: 'files',
        component: files_component_1.FilesComponent,
        canActivate: [auth_guard_1.AuthGuard, staff_guard_1.StaffGuard]
    },
    {
        path: 'help',
        component: help_component_1.HelpComponent,
        canActivate: [auth_guard_1.AuthGuard]
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true });

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvYXBwLnJvdXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQ0FBdUQ7QUFFdkQsa0RBQWdEO0FBQ2hELG9EQUFrRDtBQUNsRCxvREFBa0Q7QUFDbEQsd0RBQXNEO0FBQ3RELHNEQUFvRDtBQUNwRCw4REFBNEQ7QUFDNUQsc0RBQW9EO0FBRXBELHNFQUFzRTtBQUN0RSxrRkFBa0Y7QUFDbEYsMkZBQXdGO0FBQ3hGLDhGQUE0RjtBQUM1RixpR0FBOEY7QUFDOUYsMkZBQXlGO0FBQ3pGLDhGQUE0RjtBQUM1Rix1R0FBb0c7QUFDcEcsMkZBQXdGO0FBQ3hGLHFGQUFrRjtBQUNsRiw4RkFBMkY7QUFDM0Ysd0ZBQXFGO0FBQ3JGLCtFQUE0RTtBQUM1RSxnSEFBd0c7QUFDeEcsNkdBQTBHO0FBQzFHLGtGQUFnRjtBQUNoRixvR0FBaUc7QUFDakcsMEdBQXVHO0FBQ3ZHLGlHQUE4RjtBQUM5Rix3RkFBcUY7QUFDckYsc0VBQW9FO0FBQ3BFLG1FQUFpRTtBQUVqRSxJQUFNLFNBQVMsR0FBVztJQUN0QjtRQUNJLElBQUksRUFBRSxFQUFFO1FBQ1IsVUFBVSxFQUFFLFlBQVk7UUFDeEIsU0FBUyxFQUFFLE1BQU07S0FDcEI7SUFDRDtRQUNJLElBQUksRUFBRSxPQUFPO1FBQ2IsU0FBUyxFQUFFLGdDQUFjO0tBQzVCO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsV0FBVztRQUNqQixTQUFTLEVBQUUsd0NBQWtCO1FBQzdCLFdBQVcsRUFBRSxDQUFDLHNCQUFTLENBQUM7S0FDM0I7SUFDRDtRQUNJLElBQUksRUFBRSxrQkFBa0I7UUFDeEIsU0FBUyxFQUFFLDZDQUFvQjtRQUMvQixXQUFXLEVBQUUsQ0FBQyxzQkFBUyxFQUFFLHdCQUFVLENBQUM7S0FDdkM7SUFDRDtRQUNJLElBQUksRUFBRSxVQUFVO1FBQ2hCLFNBQVMsRUFBRSxpREFBc0I7UUFDakMsV0FBVyxFQUFFLENBQUMsc0JBQVMsRUFBRSx3QkFBVSxDQUFDO0tB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QyxDQUFDIiwiZmlsZSI6ImFwcC9hcHAucm91dGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL2F1dGguZ3VhcmQnO1xyXG5pbXBvcnQgeyBBZG1pbkd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvYWRtaW4uZ3VhcmQnO1xyXG5pbXBvcnQgeyBTdGFmZkd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvc3RhZmYuZ3VhcmQnO1xyXG5pbXBvcnQgeyBTdHVkZW50R3VhcmQgfSBmcm9tICcuL2d1YXJkcy9zdHVkZW50Lmd1YXJkJztcclxuaW1wb3J0IHsgQ2xpZW50R3VhcmQgfSBmcm9tICcuL2d1YXJkcy9jbGllbnQuZ3VhcmQnO1xyXG5pbXBvcnQgeyBJbnN0cnVjdG9yR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9pbnN0cnVjdG9yLmd1YXJkJztcclxuaW1wb3J0IHsgU2hhcmVkR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9zaGFyZWQuZ3VhcmQnO1xyXG5cclxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSAgIGZyb20gJy4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEYXNoYm9hcmRDb21wb25lbnQgfSAgIGZyb20gJy4vY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0YWZmTWFuYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N0YWZmLW1hbmFnZS9zdGFmZi1tYW5hZ2UuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3RhZmZEZXRhaWxzQ29tcG9uZW50IH0gIGZyb20gJy4vY29tcG9uZW50cy9zdGFmZi1kZXRhaWxzL3N0YWZmLWRldGFpbHMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3R1ZGVudE1hbmFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdHVkZW50RWRpdENvbXBvbmVudCB9ICBmcm9tICcuL2NvbXBvbmVudHMvc3R1ZGVudC1lZGl0L3N0dWRlbnQtZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDbGllbnRTdGF0dXNDb21wb25lbnQgfSAgZnJvbSAnLi9jb21wb25lbnRzL2NsaWVudC1zdGF0dXMvY2xpZW50LXN0YXR1cy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdWl0YWJpbGl0eUZvcm1Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3VpdGFiaWxpdHktZm9ybS9zdWl0YWJpbGl0eS1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbnNlbnRGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbnNlbnQtZm9ybS9jb25zZW50LWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ2FzZU5vdGVzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Nhc2Utbm90ZXMvY2FzZS1ub3Rlcy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb3Vyc2VNYW5hZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY291cnNlLW1hbmFnZS9jb3Vyc2UtbWFuYWdlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvdXJzZUVkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY291cnNlLWVkaXQvY291cnNlLWVkaXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUHJmRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wcmYtZm9ybS9wcmYtZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMZWFybmluZ1N0eWxlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xlYXJuaW5nLXN0eWxlLWZvcm0vbGVhcm5pbmctc3R5bGUtZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdHVkZW50RW5yb2xsbWVudENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdHVkZW50LWVucm9sbG1lbnQvc3R1ZGVudC1lbnJvbGxtZW50LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRpbWV0YWJsZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEF0dGVuZGFuY2VMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2F0dGVuZGFuY2UtbGlzdC9hdHRlbmRhbmNlLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXR0ZW5kYW5jZVJlcG9ydENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hdHRlbmRhbmNlLXJlcG9ydC9hdHRlbmRhbmNlLXJlcG9ydC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSZXNldFBhc3N3b3JkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Jlc2V0LXBhc3N3b3JkL3Jlc2V0LXBhc3N3b3JkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZpbGVVcGxvYWRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZmlsZS11cGxvYWQvZmlsZS11cGxvYWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRmlsZXNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZmlsZXMvZmlsZXMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgSGVscENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9oZWxwL2hlbHAuY29tcG9uZW50JztcclxuXHJcbmNvbnN0IGFwcFJvdXRlczogUm91dGVzID0gW1xyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICcnLFxyXG4gICAgICAgIHJlZGlyZWN0VG86ICcvZGFzaGJvYXJkJyxcclxuICAgICAgICBwYXRoTWF0Y2g6ICdmdWxsJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnbG9naW4nLFxyXG4gICAgICAgIGNvbXBvbmVudDogTG9naW5Db21wb25lbnRcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgY29tcG9uZW50OiBEYXNoYm9hcmRDb21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmRdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICdzdHVkZW50LWVkaXQvOmlkJyxcclxuICAgICAgICBjb21wb25lbnQ6IFN0dWRlbnRFZGl0Q29tcG9uZW50LFxyXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkLCBTdGFmZkd1YXJkXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnc3R1ZGVudHMnLFxyXG4gICAgICAgIGNvbXBvbmVudDogU3R1ZGVudE1hbmFnZUNvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgU3RhZmZHdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ2NsaWVudHMnLFxyXG4gICAgICAgIGNvbXBvbmVudDogQ2xpZW50U3RhdHVzQ29tcG9uZW50LFxyXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkLCBTdGFmZkd1YXJkXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnc3RhZmYnLFxyXG4gICAgICAgIGNvbXBvbmVudDogU3RhZmZNYW5hZ2VDb21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIEFkbWluR3VhcmRdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICdzdGFmZi1kZXRhaWxzLzppZCcsXHJcbiAgICAgICAgY29tcG9uZW50OiBTdGFmZkRldGFpbHNDb21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIEFkbWluR3VhcmRdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICdzdWl0YWJpbGl0eScsXHJcbiAgICAgICAgY29tcG9uZW50OiBTdWl0YWJpbGl0eUZvcm1Db21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIFN0YWZmR3VhcmRdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICdjb25zZW50JyxcclxuICAgICAgICBjb21wb25lbnQ6IENvbnNlbnRGb3JtQ29tcG9uZW50LFxyXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkLCBDbGllbnRHdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ2Nhc2Utbm90ZXMnLFxyXG4gICAgICAgIGNvbXBvbmVudDogQ2FzZU5vdGVzQ29tcG9uZW50LFxyXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkLCBTaGFyZWRHdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ2NvdXJzZXMnLFxyXG4gICAgICAgIGNvbXBvbmVudDogQ291cnNlTWFuYWdlQ29tcG9uZW50LFxyXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkLCBTdGFmZkd1YXJkXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnY291cnNlLWVkaXQvOmlkJyxcclxuICAgICAgICBjb21wb25lbnQ6IENvdXJzZUVkaXRDb21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIEFkbWluR3VhcmRdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICdwcmYnLFxyXG4gICAgICAgIGNvbXBvbmVudDogUHJmRm9ybUNvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ2xlYXJuaW5nLXN0eWxlJyxcclxuICAgICAgICBjb21wb25lbnQ6IExlYXJuaW5nU3R5bGVDb21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIENsaWVudEd1YXJkXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAndGltZXRhYmxlJyxcclxuICAgICAgICBjb21wb25lbnQ6IFRpbWV0YWJsZUNvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgU3R1ZGVudEd1YXJkXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnc3R1ZGVudC1lbnJvbGxtZW50Lzpjb3Vyc2VJRC86aW5zdHJ1Y3RvcklELzpjb3Vyc2VOYW1lJyxcclxuICAgICAgICBjb21wb25lbnQ6IFN0dWRlbnRFbnJvbGxtZW50Q29tcG9uZW50LFxyXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkLCBTdGFmZkd1YXJkXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnYXR0ZW5kYW5jZS1saXN0JyxcclxuICAgICAgICBjb21wb25lbnQ6IEF0dGVuZGFuY2VMaXN0Q29tcG9uZW50LFxyXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkLCBJbnN0cnVjdG9yR3VhcmRdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICdhdHRlbmRhbmNlLXJlcG9ydCcsXHJcbiAgICAgICAgY29tcG9uZW50OiBBdHRlbmRhbmNlUmVwb3J0Q29tcG9uZW50LFxyXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkLCBTaGFyZWRHdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ3Jlc2V0LXBhc3N3b3JkJyxcclxuICAgICAgICBjb21wb25lbnQ6IFJlc2V0UGFzc3dvcmRDb21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICdmaWxlLXVwbG9hZCcsXHJcbiAgICAgICAgY29tcG9uZW50OiBGaWxlVXBsb2FkQ29tcG9uZW50LFxyXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkLCBTdGFmZkd1YXJkXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnZmlsZXMnLFxyXG4gICAgICAgIGNvbXBvbmVudDogRmlsZXNDb21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIFN0YWZmR3VhcmRdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICdoZWxwJyxcclxuICAgICAgICBjb21wb25lbnQ6IEhlbHBDb21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmRdXHJcbiAgICB9XHJcblxyXG5cclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCByb3V0aW5nID0gUm91dGVyTW9kdWxlLmZvclJvb3QoYXBwUm91dGVzLCB7IHVzZUhhc2g6IHRydWUgfSk7XHJcbiJdfQ==
