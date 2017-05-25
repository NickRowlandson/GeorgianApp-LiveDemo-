"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var auth_guard_1 = require("./guards/auth.guard");
var admin_guard_1 = require("./guards/admin.guard");
var staff_guard_1 = require("./guards/staff.guard");
var client_guard_1 = require("./guards/client.guard");
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
        canActivate: [auth_guard_1.AuthGuard, staff_guard_1.StaffGuard]
    },
    {
        path: 'courses',
        component: course_manage_component_1.CourseManageComponent,
        canActivate: [auth_guard_1.AuthGuard, staff_guard_1.StaffGuard]
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true });

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvYXBwLnJvdXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQ0FBdUQ7QUFFdkQsa0RBQWdEO0FBQ2hELG9EQUFrRDtBQUNsRCxvREFBa0Q7QUFFbEQsc0RBQW9EO0FBRXBELHNFQUFzRTtBQUN0RSxrRkFBa0Y7QUFDbEYsMkZBQXdGO0FBQ3hGLHFGQUFtRjtBQUNuRixpR0FBOEY7QUFDOUYsMkZBQXlGO0FBQ3pGLDhGQUE0RjtBQUM1Rix1R0FBb0c7QUFDcEcsMkZBQXdGO0FBQ3hGLHFGQUFrRjtBQUNsRiw4RkFBMkY7QUFFM0YsSUFBTSxTQUFTLEdBQVc7SUFDdEI7UUFDSSxJQUFJLEVBQUUsRUFBRTtRQUNSLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFNBQVMsRUFBRSxNQUFNO0tBQ3BCO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsT0FBTztRQUNiLFNBQVMsRUFBRSxnQ0FBYztLQUM1QjtJQUNEO1FBQ0ksSUFBSSxFQUFFLFdBQVc7UUFDakIsU0FBUyxFQUFFLHdDQUFrQjtRQUM3QixXQUFXLEVBQUUsQ0FBQyxzQkFBUyxDQUFDO0tBQzNCO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLFNBQVMsRUFBRSw2Q0FBb0I7UUFDL0IsV0FBVyxFQUFFLENBQUMsc0JBQVMsRUFBRSx3QkFBVSxDQUFDO0tBQ3ZDO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsVUFBVTtRQUNoQixTQUFTLEVBQUUsaURBQXNCO1FBQ2pDLFdBQVcsRUFBRSxDQUFDLHNCQUFTLEVBQUUsd0JBQVUsQ0FBQztLQUN2QztJQUNEO1FBQ0ksSUFBSSxFQUFFLFNBQVM7UUFDZixTQUFTLEVBQUUsK0NBQXFCO1FBQ2hDLFdBQVcsRUFBRSxDQUFDLHNCQUFTLEVBQUUsd0JBQVUsQ0FBQztLQUN2QztJQUNEO1FBQ0ksSUFBSSxFQUFFLE9BQU87UUFDYixTQUFTLEVBQUUsNkNBQW9CO1FBQy9CLFdBQVcsRUFBRSxDQUFDLHNCQUFTLEVBQUUsd0JBQVUsQ0FBQztLQUN2QztJQUNEO1FBQ0ksSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixTQUFTLEVBQUUseUNBQWtCO1FBQzdCLFdBQVcsRUFBRSxDQUFDLHNCQUFTLEVBQUUsd0JBQVUsQ0FBQztLQUN2QztJQUNEO1FBQ0ksSUFBSSxFQUFFLGFBQWE7UUFDbkIsU0FBUyxFQUFFLHFEQUF3QjtRQUNuQyxXQUFXLEVBQUUsQ0FBQyxzQkFBUyxFQUFFLHdCQUFVLENBQUM7S0FDdkM7SUFDRDtRQUNJLElBQUksRUFBRSxTQUFTO1FBQ2YsU0FBUyxFQUFFLDZDQUFvQjtRQUMvQixXQUFXLEVBQUUsQ0FBQyxzQkFBUyxFQUFFLDBCQUFXLENBQUM7S0FDeEM7SUFDRDtRQUNJLElBQUksRUFBRSxZQUFZO1FBQ2xCLFNBQVMsRUFBRSx5Q0FBa0I7UUFDN0IsV0FBVyxFQUFFLENBQUMsc0JBQVMsRUFBRSx3QkFBVSxDQUFDO0tBQ3ZDO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsU0FBUztRQUNmLFNBQVMsRUFBRSwrQ0FBcUI7UUFDaEMsV0FBVyxFQUFFLENBQUMsc0JBQVMsRUFBRSx3QkFBVSxDQUFDO0tBQ3ZDO0NBQ0osQ0FBQztBQUVXLFFBQUEsT0FBTyxHQUFHLHFCQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDIiwiZmlsZSI6ImFwcC9hcHAucm91dGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL2F1dGguZ3VhcmQnO1xyXG5pbXBvcnQgeyBBZG1pbkd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvYWRtaW4uZ3VhcmQnO1xyXG5pbXBvcnQgeyBTdGFmZkd1YXJkIH0gZnJvbSAnLi9ndWFyZHMvc3RhZmYuZ3VhcmQnO1xyXG5pbXBvcnQgeyBTdHVkZW50R3VhcmQgfSBmcm9tICcuL2d1YXJkcy9zdHVkZW50Lmd1YXJkJztcclxuaW1wb3J0IHsgQ2xpZW50R3VhcmQgfSBmcm9tICcuL2d1YXJkcy9jbGllbnQuZ3VhcmQnO1xyXG5cclxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSAgIGZyb20gJy4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEYXNoYm9hcmRDb21wb25lbnQgfSAgIGZyb20gJy4vY29tcG9uZW50cy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0YWZmTWFuYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N0YWZmLW1hbmFnZS9zdGFmZi1tYW5hZ2UuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3RhZmZFZGl0Q29tcG9uZW50IH0gIGZyb20gJy4vY29tcG9uZW50cy9zdGFmZi1lZGl0L3N0YWZmLWVkaXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3R1ZGVudE1hbmFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdHVkZW50LW1hbmFnZS9zdHVkZW50LW1hbmFnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdHVkZW50RWRpdENvbXBvbmVudCB9ICBmcm9tICcuL2NvbXBvbmVudHMvc3R1ZGVudC1lZGl0L3N0dWRlbnQtZWRpdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDbGllbnRTdGF0dXNDb21wb25lbnQgfSAgZnJvbSAnLi9jb21wb25lbnRzL2NsaWVudC1zdGF0dXMvY2xpZW50LXN0YXR1cy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdWl0YWJpbGl0eUZvcm1Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3VpdGFiaWxpdHktZm9ybS9zdWl0YWJpbGl0eS1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbnNlbnRGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbnNlbnQtZm9ybS9jb25zZW50LWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ2FzZU5vdGVzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Nhc2Utbm90ZXMvY2FzZS1ub3Rlcy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb3Vyc2VNYW5hZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY291cnNlLW1hbmFnZS9jb3Vyc2UtbWFuYWdlLmNvbXBvbmVudCc7XHJcblxyXG5jb25zdCBhcHBSb3V0ZXM6IFJvdXRlcyA9IFtcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnJyxcclxuICAgICAgICByZWRpcmVjdFRvOiAnL2Rhc2hib2FyZCcsXHJcbiAgICAgICAgcGF0aE1hdGNoOiAnZnVsbCdcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ2xvZ2luJyxcclxuICAgICAgICBjb21wb25lbnQ6IExvZ2luQ29tcG9uZW50XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICdkYXNoYm9hcmQnLFxyXG4gICAgICAgIGNvbXBvbmVudDogRGFzaGJvYXJkQ29tcG9uZW50LFxyXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnc3R1ZGVudC1lZGl0LzppZCcsXHJcbiAgICAgICAgY29tcG9uZW50OiBTdHVkZW50RWRpdENvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgU3RhZmZHdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ3N0dWRlbnRzJyxcclxuICAgICAgICBjb21wb25lbnQ6IFN0dWRlbnRNYW5hZ2VDb21wb25lbnQsXHJcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIFN0YWZmR3VhcmRdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICdjbGllbnRzJyxcclxuICAgICAgICBjb21wb25lbnQ6IENsaWVudFN0YXR1c0NvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgU3RhZmZHdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ3N0YWZmJyxcclxuICAgICAgICBjb21wb25lbnQ6IFN0YWZmTWFuYWdlQ29tcG9uZW50LFxyXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkLCBBZG1pbkd1YXJkXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnc3RhZmYtZWRpdC86aWQnLFxyXG4gICAgICAgIGNvbXBvbmVudDogU3RhZmZFZGl0Q29tcG9uZW50LFxyXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkLCBBZG1pbkd1YXJkXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnc3VpdGFiaWxpdHknLFxyXG4gICAgICAgIGNvbXBvbmVudDogU3VpdGFiaWxpdHlGb3JtQ29tcG9uZW50LFxyXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkLCBTdGFmZkd1YXJkXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiAnY29uc2VudCcsXHJcbiAgICAgICAgY29tcG9uZW50OiBDb25zZW50Rm9ybUNvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgQ2xpZW50R3VhcmRdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6ICdjYXNlLW5vdGVzJyxcclxuICAgICAgICBjb21wb25lbnQ6IENhc2VOb3Rlc0NvbXBvbmVudCxcclxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgU3RhZmZHdWFyZF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJ2NvdXJzZXMnLFxyXG4gICAgICAgIGNvbXBvbmVudDogQ291cnNlTWFuYWdlQ29tcG9uZW50LFxyXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkLCBTdGFmZkd1YXJkXVxyXG4gICAgfVxyXG5dO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJvdXRpbmcgPSBSb3V0ZXJNb2R1bGUuZm9yUm9vdChhcHBSb3V0ZXMsIHsgdXNlSGFzaDogdHJ1ZSB9KTtcclxuIl19
