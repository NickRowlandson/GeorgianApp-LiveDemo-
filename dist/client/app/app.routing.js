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
var visview_component_1 = require("./components/visview/visview.component");
var attendance_list_component_1 = require("./components/attendance-list/attendance-list.component");
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
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true });

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvYXBwLnJvdXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQ0FBdUQ7QUFFdkQsa0RBQWdEO0FBQ2hELG9EQUFrRDtBQUNsRCxvREFBa0Q7QUFDbEQsd0RBQXNEO0FBQ3RELHNEQUFvRDtBQUNwRCw4REFBNEQ7QUFDNUQsc0RBQW9EO0FBRXBELHNFQUFzRTtBQUN0RSxrRkFBa0Y7QUFDbEYsMkZBQXdGO0FBQ3hGLHFGQUFtRjtBQUNuRixpR0FBOEY7QUFDOUYsMkZBQXlGO0FBQ3pGLDhGQUE0RjtBQUM1Rix1R0FBb0c7QUFDcEcsMkZBQXdGO0FBQ3hGLHFGQUFrRjtBQUNsRiw4RkFBMkY7QUFDM0Ysd0ZBQXFGO0FBQ3JGLCtFQUE0RTtBQUM1RSxnSEFBd0c7QUFDeEcsNkdBQTBHO0FBQzFHLGtGQUFnRjtBQUNoRiw0RUFBMEU7QUFDMUUsb0dBQWlHO0FBRWpHLElBQU0sU0FBUyxHQUFXO0lBQ3RCO1FBQ0ksSUFBSSxFQUFFLEVBQUU7UUFDUixVQUFVLEVBQUUsWUFBWTtRQUN4QixTQUFTLEVBQUUsTUFBTTtLQUNwQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLE9BQU87UUFDYixTQUFTLEVBQUUsZ0NBQWM7S0FDNUI7SUFDRDtRQUNJLElBQUksRUFBRSxXQUFXO1FBQ2pCLFNBQVMsRUFBRSx3Q0FBa0I7UUFDN0IsV0FBVyxFQUFFLENBQUMsc0JBQVMsQ0FBQztLQUMzQjtJQUNEO1FBQ0ksSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixTQUFTLEVBQUUsNkNBQW9CO1FBQy9CLFdBQVcsRUFBRSxDQUFDLHNCQUFTLEVBQUUsd0JBQVUsQ0FBQztLQUN2QztJQUNEO1FBQ0ksSUFBSSxFQUFFLFVBQVU7UUFDaEIsU0FBUyxFQUFFLGlEQUFzQjtRQUNqQyxXQUFXLEVBQUUsQ0FBQyxzQkFBUyxFQUFFLHdCQUFVLENBQUM7S0FDdkM7SUFDRDtRQUNJLElBQUksRUFBRSxTQUFTO1FBQ2YsU0FBUyxFQUFFLCtDQUFxQjtRQUNoQyxXQUFXLEVBQUUsQ0FBQyxzQkFBUyxFQUFFLHdCQUFVLENBQUM7S0FDdkM7SUFDRDtRQUNJLElBQUksRUFBRSxPQUFPO1FBQ2IsU0FBUyxFQUFFLDZDQUFvQjtRQUMvQixXQUFXLEVBQUUsQ0FBQyxzQkFBUyxFQUFFLHdCQUFVLENBQUM7S0FDdkM7SUFDRDtRQUNJLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsU0FBUyxFQUFFLHlDQUFrQjtRQUM3QixXQUFXLEVBQUUsQ0FBQyxzQkFBUyxFQUFFLHdCQUFVLENBQUM7S0FDdkM7SUFDRDtRQUNJLElBQUksRUFBRSxhQUFhO1FBQ25CLFNBQVMsRUFBRSxxREFBd0I7UUFDbkMsV0FBVyxFQUFFLENBQUMsc0JBQVMsRUFBRSx3QkFBVSxDQUFDO0tBQ3ZDO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsU0FBUztRQUNmLFNBQVMsRUFBRSw2Q0FBb0I7UUFDL0IsV0FBVyxFQUFFLENBQUMsc0JBQVMsRUFBRSwwQkFBVyxDQUFDO0tBQ3hDO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsWUFBWTtRQUNsQixTQUFTLEVBQUUseUNBQWtCO1FBQzdCLFdBQVcsRUFBRSxDQUFDLHNCQUFTLEVBQUUsMEJBQVcsQ0FBQztLQUN4QztJQUNEO1FBQ0ksSUFBSSxFQUFFLFNBQVM7UUFDZixTQUFTLEVBQUUsK0NBQXFCO1FBQ2hDLFdBQVcsRUFBRSxDQUFDLHNCQUFTLEVBQUUsd0JBQVUsQ0FBQztLQUN2QztJQUNEO1FBQ0ksSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixTQUFTLEVBQUUsMkNBQW1CO1FBQzlCLFdBQVcsRUFBRSxDQUFDLHNCQUFTLEVBQUUsd0JBQVUsQ0FBQztLQUN2QztJQUNEO1FBQ0ksSUFBSSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUscUNBQWdCO1FBQzNCLFdBQVcsRUFBRSxDQUFDLHNCQUFTLENBQUM7S0FDM0I7SUFDRDtRQUNJLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsU0FBUyxFQUFFLHNEQUFzQjtRQUNqQyxXQUFXLEVBQUUsQ0FBQyxzQkFBUyxDQUFDO0tBQzNCO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsV0FBVztRQUNqQixTQUFTLEVBQUUsd0NBQWtCO1FBQzdCLFdBQVcsRUFBRSxDQUFDLHNCQUFTLEVBQUUsNEJBQVksQ0FBQztLQUN6QztJQUNEO1FBQ0ksSUFBSSxFQUFFLHdEQUF3RDtRQUM5RCxTQUFTLEVBQUUseURBQTBCO1FBQ3JDLFdBQVcsRUFBRSxDQUFDLHNCQUFTLEVBQUUsd0JBQVUsQ0FBQztLQUN2QztJQUNEO1FBQ0ksSUFBSSxFQUFFLFNBQVM7UUFDZixTQUFTLEVBQUUsb0NBQWdCO1FBQzNCLFdBQVcsRUFBRSxDQUFDLHNCQUFTLENBQUM7S0FDM0I7SUFDRDtRQUNJLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsU0FBUyxFQUFFLG1EQUF1QjtRQUNsQyxXQUFXLEVBQUUsQ0FBQyxzQkFBUyxFQUFFLGtDQUFlLENBQUM7S0FDNUM7Q0FFSixDQUFDO0FBRVcsUUFBQSxPQUFPLEdBQUcscUJBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMiLCJmaWxlIjoiYXBwL2FwcC5yb3V0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvYXV0aC5ndWFyZCc7XHJcbmltcG9ydCB7IEFkbWluR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9hZG1pbi5ndWFyZCc7XHJcbmltcG9ydCB7IFN0YWZmR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9zdGFmZi5ndWFyZCc7XHJcbmltcG9ydCB7IFN0dWRlbnRHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL3N0dWRlbnQuZ3VhcmQnO1xyXG5pbXBvcnQgeyBDbGllbnRHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL2NsaWVudC5ndWFyZCc7XHJcbmltcG9ydCB7IEluc3RydWN0b3JHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL2luc3RydWN0b3IuZ3VhcmQnO1xyXG5pbXBvcnQgeyBTaGFyZWRHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL3NoYXJlZC5ndWFyZCc7XHJcblxyXG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9ICAgZnJvbSAnLi9jb21wb25lbnRzL2xvZ2luL2xvZ2luLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERhc2hib2FyZENvbXBvbmVudCB9ICAgZnJvbSAnLi9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3RhZmZNYW5hZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RhZmYtbWFuYWdlL3N0YWZmLW1hbmFnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdGFmZkVkaXRDb21wb25lbnQgfSAgZnJvbSAnLi9jb21wb25lbnRzL3N0YWZmLWVkaXQvc3RhZmYtZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdHVkZW50TWFuYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N0dWRlbnQtbWFuYWdlL3N0dWRlbnQtbWFuYWdlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0dWRlbnRFZGl0Q29tcG9uZW50IH0gIGZyb20gJy4vY29tcG9uZW50cy9zdHVkZW50LWVkaXQvc3R1ZGVudC1lZGl0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENsaWVudFN0YXR1c0NvbXBvbmVudCB9ICBmcm9tICcuL2NvbXBvbmVudHMvY2xpZW50LXN0YXR1cy9jbGllbnQtc3RhdHVzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN1aXRhYmlsaXR5Rm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdWl0YWJpbGl0eS1mb3JtL3N1aXRhYmlsaXR5LWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29uc2VudEZvcm1Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29uc2VudC1mb3JtL2NvbnNlbnQtZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDYXNlTm90ZXNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FzZS1ub3Rlcy9jYXNlLW5vdGVzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvdXJzZU1hbmFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb3Vyc2UtbWFuYWdlL2NvdXJzZS1tYW5hZ2UuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ291cnNlRWRpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb3Vyc2UtZWRpdC9jb3Vyc2UtZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQcmZGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3ByZi1mb3JtL3ByZi1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExlYXJuaW5nU3R5bGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbGVhcm5pbmctc3R5bGUtZm9ybS9sZWFybmluZy1zdHlsZS1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0dWRlbnRFbnJvbGxtZW50Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N0dWRlbnQtZW5yb2xsbWVudC9zdHVkZW50LWVucm9sbG1lbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGltZXRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RpbWV0YWJsZS90aW1ldGFibGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVmlzdmlld0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy92aXN2aWV3L3Zpc3ZpZXcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXR0ZW5kYW5jZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXR0ZW5kYW5jZS1saXN0L2F0dGVuZGFuY2UtbGlzdC5jb21wb25lbnQnO1xyXG5cclxuY29uc3QgYXBwUm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJycsXHJcbiAgICAgICAgcmVkaXJlY3RUbzogJy9kYXNoYm9hcmQnLFxyXG4gICAgICAgIHBhdGhNYXRjaDogJ2Z1bGwnXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICdsb2dpbicsXHJcbiAgICAgICAgY29tcG9uZW50OiBMb2dpbkNvbXBvbmVudFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnZGFzaGJvYXJkJyxcclxuICAgICAgICBjb21wb25lbnQ6IERhc2hib2FyZENvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ3N0dWRlbnQtZWRpdC86aWQnLFxyXG4gICAgICAgIGNvbXBvbmVudDogU3R1ZGVudEVkaXRDb21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIFN0YWZmR3VhcmRdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICdzdHVkZW50cycsXHJcbiAgICAgICAgY29tcG9uZW50OiBTdHVkZW50TWFuYWdlQ29tcG9uZW50LFxyXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkLCBTdGFmZkd1YXJkXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnY2xpZW50cycsXHJcbiAgICAgICAgY29tcG9uZW50OiBDbGllbnRTdGF0dXNDb21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIFN0YWZmR3VhcmRdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICdzdGFmZicsXHJcbiAgICAgICAgY29tcG9uZW50OiBTdGFmZk1hbmFnZUNvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgQWRtaW5HdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ3N0YWZmLWVkaXQvOmlkJyxcclxuICAgICAgICBjb21wb25lbnQ6IFN0YWZmRWRpdENvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgQWRtaW5HdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ3N1aXRhYmlsaXR5JyxcclxuICAgICAgICBjb21wb25lbnQ6IFN1aXRhYmlsaXR5Rm9ybUNvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgU3RhZmZHdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ2NvbnNlbnQnLFxyXG4gICAgICAgIGNvbXBvbmVudDogQ29uc2VudEZvcm1Db21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIENsaWVudEd1YXJkXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnY2FzZS1ub3RlcycsXHJcbiAgICAgICAgY29tcG9uZW50OiBDYXNlTm90ZXNDb21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIFNoYXJlZEd1YXJkXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnY291cnNlcycsXHJcbiAgICAgICAgY29tcG9uZW50OiBDb3Vyc2VNYW5hZ2VDb21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIFN0YWZmR3VhcmRdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICdjb3Vyc2UtZWRpdC86aWQnLFxyXG4gICAgICAgIGNvbXBvbmVudDogQ291cnNlRWRpdENvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgQWRtaW5HdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ3ByZicsXHJcbiAgICAgICAgY29tcG9uZW50OiBQcmZGb3JtQ29tcG9uZW50LFxyXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnbGVhcm5pbmctc3R5bGUnLFxyXG4gICAgICAgIGNvbXBvbmVudDogTGVhcm5pbmdTdHlsZUNvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ3RpbWV0YWJsZScsXHJcbiAgICAgICAgY29tcG9uZW50OiBUaW1ldGFibGVDb21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIFN0dWRlbnRHdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ3N0dWRlbnQtZW5yb2xsbWVudC86Y291cnNlSUQvOmluc3RydWN0b3JJRC86Y291cnNlTmFtZScsXHJcbiAgICAgICAgY29tcG9uZW50OiBTdHVkZW50RW5yb2xsbWVudENvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgU3RhZmZHdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ3Zpc3ZpZXcnLFxyXG4gICAgICAgIGNvbXBvbmVudDogVmlzdmlld0NvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ2F0dGVuZGFuY2UtbGlzdCcsXHJcbiAgICAgICAgY29tcG9uZW50OiBBdHRlbmRhbmNlTGlzdENvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgSW5zdHJ1Y3Rvckd1YXJkXVxyXG4gICAgfVxyXG5cclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCByb3V0aW5nID0gUm91dGVyTW9kdWxlLmZvclJvb3QoYXBwUm91dGVzLCB7IHVzZUhhc2g6IHRydWUgfSk7XHJcbiJdfQ==
