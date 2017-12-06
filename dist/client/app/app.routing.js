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
var attendance_list_component_1 = require("./components/attendance-list/attendance-list.component");
var attendance_report_component_1 = require("./components/attendance-report/attendance-report.component");
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
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true });

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvYXBwLnJvdXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQ0FBdUQ7QUFFdkQsa0RBQWdEO0FBQ2hELG9EQUFrRDtBQUNsRCxvREFBa0Q7QUFDbEQsd0RBQXNEO0FBQ3RELHNEQUFvRDtBQUNwRCw4REFBNEQ7QUFDNUQsc0RBQW9EO0FBRXBELHNFQUFzRTtBQUN0RSxrRkFBa0Y7QUFDbEYsMkZBQXdGO0FBQ3hGLHFGQUFtRjtBQUNuRixpR0FBOEY7QUFDOUYsMkZBQXlGO0FBQ3pGLDhGQUE0RjtBQUM1Rix1R0FBb0c7QUFDcEcsMkZBQXdGO0FBQ3hGLHFGQUFrRjtBQUNsRiw4RkFBMkY7QUFDM0Ysd0ZBQXFGO0FBQ3JGLCtFQUE0RTtBQUM1RSxnSEFBd0c7QUFDeEcsNkdBQTBHO0FBQzFHLGtGQUFnRjtBQUNoRixvR0FBaUc7QUFDakcsMEdBQXVHO0FBRXZHLElBQU0sU0FBUyxHQUFXO0lBQ3RCO1FBQ0ksSUFBSSxFQUFFLEVBQUU7UUFDUixVQUFVLEVBQUUsWUFBWTtRQUN4QixTQUFTLEVBQUUsTUFBTTtLQUNwQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLE9BQU87UUFDYixTQUFTLEVBQUUsZ0NBQWM7S0FDNUI7SUFDRDtRQUNJLElBQUksRUFBRSxXQUFXO1FBQ2pCLFNBQVMsRUFBRSx3Q0FBa0I7UUFDN0IsV0FBVyxFQUFFLENBQUMsc0JBQVMsQ0FBQztLQUMzQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixTQUFTLEVBQUUsNkNBQW9CO1FBQy9CLFdBQVcsRUFBRSxDQUFDLHNCQUFTLEVBQUUsd0JBQVUsQ0FBQztLQUN2QztJQUNEO1FBQ0ksSUFBSSxFQUFFLFVBQVU7UUFDaEIsU0FBUyxFQUFFLGlEQUFzQjtRQUNqQyxXQUFXLEVBQUUsQ0FBQyxzQkFBUyxFQUFFLHdCQUFVLENBQUM7S0FDdkM7SUFDRDtRQUNJLElBQUksRUFBRSxTQUFTO1FBQ2YsU0FBUyxFQUFFLCtDQUFxQjtRQUNoQyxXQUFXLEVBQUUsQ0FBQyxzQkFBUyxFQUFFLHdCQUFVLENBQUM7S0FDdkM7SUFDRDtRQUNJLElBQUksRUFBRSxPQUFPO1FBQ2IsU0FBUyxFQUFFLDZDQUFvQjtRQUMvQixXQUFXLEVBQUUsQ0FBQyxzQkFBUyxFQUFFLHdCQUFVLENBQUM7S0FDdkM7SUFDRDtRQUNJLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsU0FBUyxFQUFFLHlDQUFrQjtRQUM3QixXQUFXLEVBQUUsQ0FBQyxzQkFBUyxFQUFFLHdCQUFVLENBQUM7S0FDdkM7SUFDRDtRQUNJLElBQUksRUFBRSxhQUFhO1FBQ25CLFNBQVMsRUFBRSxxREFBd0I7UUFDbkMsV0FBVyxFQUFFLENBQUMsc0JBQVMsRUFBRSx3QkFBVSxDQUFDO0tBQ3ZDO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsU0FBUztRQUNmLFNBQVMsRUFBRSw2Q0FBb0I7UUFDL0IsV0FBVyxFQUFFLENBQUMsc0JBQVMsRUFBRSwwQkFBVyxDQUFDO0tBQ3hDO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsWUFBWTtRQUNsQixTQUFTLEVBQUUseUNBQWtCO1FBQzdCLFdBQVcsRUFBRSxDQUFDLHNCQUFTLEVBQUUsMEJBQVcsQ0FBQztLQUN4QztJQUNEO1FBQ0ksSUFBSSxFQUFFLFNBQVM7UUFDZixTQUFTLEVBQUUsK0NBQXFCO1FBQ2hDLFdBQVcsRUFBRSxDQUFDLHNCQUFTLEVBQUUsd0JBQVUsQ0FBQztLQUN2QztJQUNEO1FBQ0ksSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixTQUFTLEVBQUUsMkNBQW1CO1FBQzlCLFdBQVcsRUFBRSxDQUFDLHNCQUFTLEVBQUUsd0JBQVUsQ0FBQztLQUN2QztJQUNEO1FBQ0ksSUFBSSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUscUNBQWdCO1FBQzNCLFdBQVcsRUFBRSxDQUFDLHNCQUFTLENBQUM7S0FDM0I7SUFDRDtRQUNJLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsU0FBUyxFQUFFLHNEQUFzQjtRQUNqQyxXQUFXLEVBQUUsQ0FBQyxzQkFBUyxFQUFFLDBCQUFXLENBQUM7S0FDeEM7SUFDRDtRQUNJLElBQUksRUFBRSxXQUFXO1FBQ2pCLFNBQVMsRUFBRSx3Q0FBa0I7UUFDN0IsV0FBVyxFQUFFLENBQUMsc0JBQVMsRUFBRSw0QkFBWSxDQUFDO0tBQ3pDO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsd0RBQXdEO1FBQzlELFNBQVMsRUFBRSx5REFBMEI7UUFDckMsV0FBVyxFQUFFLENBQUMsc0JBQVMsRUFBRSx3QkFBVSxDQUFDO0tBQ3ZDO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLFNBQVMsRUFBRSxtREFBdUI7UUFDbEMsV0FBVyxFQUFFLENBQUMsc0JBQVMsRUFBRSxrQ0FBZSxDQUFDO0tBQzVDO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsbUJBQW1CO1FBQ3pCLFNBQVMsRUFBRSx1REFBeUI7UUFDcEMsV0FBVyxFQUFFLENBQUMsc0JBQVMsRUFBRSwwQkFBVyxDQUFDO0tBQ3hDO0NBRUosQ0FBQztBQUVXLFFBQUEsT0FBTyxHQUFHLHFCQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDIiwiZmlsZSI6ImFwcC9hcHAucm91dGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL2F1dGguZ3VhcmQnO1xyXG5pbXBvcnQgeyBBZG1pbkd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvYWRtaW4uZ3VhcmQnO1xyXG5pbXBvcnQgeyBTdGFmZkd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvc3RhZmYuZ3VhcmQnO1xyXG5pbXBvcnQgeyBTdHVkZW50R3VhcmQgfSBmcm9tICcuL2d1YXJkcy9zdHVkZW50Lmd1YXJkJztcclxuaW1wb3J0IHsgQ2xpZW50R3VhcmQgfSBmcm9tICcuL2d1YXJkcy9jbGllbnQuZ3VhcmQnO1xyXG5pbXBvcnQgeyBJbnN0cnVjdG9yR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9pbnN0cnVjdG9yLmd1YXJkJztcclxuaW1wb3J0IHsgU2hhcmVkR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9zaGFyZWQuZ3VhcmQnO1xyXG5cclxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSAgIGZyb20gJy4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEYXNoYm9hcmRDb21wb25lbnQgfSAgIGZyb20gJy4vY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0YWZmTWFuYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N0YWZmLW1hbmFnZS9zdGFmZi1tYW5hZ2UuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3RhZmZFZGl0Q29tcG9uZW50IH0gIGZyb20gJy4vY29tcG9uZW50cy9zdGFmZi1lZGl0L3N0YWZmLWVkaXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3R1ZGVudE1hbmFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdHVkZW50RWRpdENvbXBvbmVudCB9ICBmcm9tICcuL2NvbXBvbmVudHMvc3R1ZGVudC1lZGl0L3N0dWRlbnQtZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDbGllbnRTdGF0dXNDb21wb25lbnQgfSAgZnJvbSAnLi9jb21wb25lbnRzL2NsaWVudC1zdGF0dXMvY2xpZW50LXN0YXR1cy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdWl0YWJpbGl0eUZvcm1Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3VpdGFiaWxpdHktZm9ybS9zdWl0YWJpbGl0eS1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbnNlbnRGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbnNlbnQtZm9ybS9jb25zZW50LWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ2FzZU5vdGVzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Nhc2Utbm90ZXMvY2FzZS1ub3Rlcy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb3Vyc2VNYW5hZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY291cnNlLW1hbmFnZS9jb3Vyc2UtbWFuYWdlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvdXJzZUVkaXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY291cnNlLWVkaXQvY291cnNlLWVkaXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUHJmRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wcmYtZm9ybS9wcmYtZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMZWFybmluZ1N0eWxlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xlYXJuaW5nLXN0eWxlLWZvcm0vbGVhcm5pbmctc3R5bGUtZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdHVkZW50RW5yb2xsbWVudENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdHVkZW50LWVucm9sbG1lbnQvc3R1ZGVudC1lbnJvbGxtZW50LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRpbWV0YWJsZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90aW1ldGFibGUvdGltZXRhYmxlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEF0dGVuZGFuY2VMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2F0dGVuZGFuY2UtbGlzdC9hdHRlbmRhbmNlLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXR0ZW5kYW5jZVJlcG9ydENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hdHRlbmRhbmNlLXJlcG9ydC9hdHRlbmRhbmNlLXJlcG9ydC5jb21wb25lbnQnO1xyXG5cclxuY29uc3QgYXBwUm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJycsXHJcbiAgICAgICAgcmVkaXJlY3RUbzogJy9kYXNoYm9hcmQnLFxyXG4gICAgICAgIHBhdGhNYXRjaDogJ2Z1bGwnXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICdsb2dpbicsXHJcbiAgICAgICAgY29tcG9uZW50OiBMb2dpbkNvbXBvbmVudFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnZGFzaGJvYXJkJyxcclxuICAgICAgICBjb21wb25lbnQ6IERhc2hib2FyZENvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ3N0dWRlbnQtZWRpdC86aWQnLFxyXG4gICAgICAgIGNvbXBvbmVudDogU3R1ZGVudEVkaXRDb21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIFN0YWZmR3VhcmRdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICdzdHVkZW50cycsXHJcbiAgICAgICAgY29tcG9uZW50OiBTdHVkZW50TWFuYWdlQ29tcG9uZW50LFxyXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkLCBTdGFmZkd1YXJkXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnY2xpZW50cycsXHJcbiAgICAgICAgY29tcG9uZW50OiBDbGllbnRTdGF0dXNDb21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIFN0YWZmR3VhcmRdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICdzdGFmZicsXHJcbiAgICAgICAgY29tcG9uZW50OiBTdGFmZk1hbmFnZUNvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgQWRtaW5HdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ3N0YWZmLWVkaXQvOmlkJyxcclxuICAgICAgICBjb21wb25lbnQ6IFN0YWZmRWRpdENvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgQWRtaW5HdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ3N1aXRhYmlsaXR5JyxcclxuICAgICAgICBjb21wb25lbnQ6IFN1aXRhYmlsaXR5Rm9ybUNvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgU3RhZmZHdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ2NvbnNlbnQnLFxyXG4gICAgICAgIGNvbXBvbmVudDogQ29uc2VudEZvcm1Db21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIENsaWVudEd1YXJkXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnY2FzZS1ub3RlcycsXHJcbiAgICAgICAgY29tcG9uZW50OiBDYXNlTm90ZXNDb21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIFNoYXJlZEd1YXJkXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnY291cnNlcycsXHJcbiAgICAgICAgY29tcG9uZW50OiBDb3Vyc2VNYW5hZ2VDb21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIFN0YWZmR3VhcmRdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICdjb3Vyc2UtZWRpdC86aWQnLFxyXG4gICAgICAgIGNvbXBvbmVudDogQ291cnNlRWRpdENvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgQWRtaW5HdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ3ByZicsXHJcbiAgICAgICAgY29tcG9uZW50OiBQcmZGb3JtQ29tcG9uZW50LFxyXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnbGVhcm5pbmctc3R5bGUnLFxyXG4gICAgICAgIGNvbXBvbmVudDogTGVhcm5pbmdTdHlsZUNvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgQ2xpZW50R3VhcmRdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICd0aW1ldGFibGUnLFxyXG4gICAgICAgIGNvbXBvbmVudDogVGltZXRhYmxlQ29tcG9uZW50LFxyXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkLCBTdHVkZW50R3VhcmRdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICdzdHVkZW50LWVucm9sbG1lbnQvOmNvdXJzZUlELzppbnN0cnVjdG9ySUQvOmNvdXJzZU5hbWUnLFxyXG4gICAgICAgIGNvbXBvbmVudDogU3R1ZGVudEVucm9sbG1lbnRDb21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIFN0YWZmR3VhcmRdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICdhdHRlbmRhbmNlLWxpc3QnLFxyXG4gICAgICAgIGNvbXBvbmVudDogQXR0ZW5kYW5jZUxpc3RDb21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIEluc3RydWN0b3JHdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ2F0dGVuZGFuY2UtcmVwb3J0JyxcclxuICAgICAgICBjb21wb25lbnQ6IEF0dGVuZGFuY2VSZXBvcnRDb21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIFNoYXJlZEd1YXJkXVxyXG4gICAgfVxyXG5cclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCByb3V0aW5nID0gUm91dGVyTW9kdWxlLmZvclJvb3QoYXBwUm91dGVzLCB7IHVzZUhhc2g6IHRydWUgfSk7XHJcbiJdfQ==
