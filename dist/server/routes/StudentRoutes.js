"use strict";
var express = require("express");
var StudentController = require("../controllers/StudentController");
var router = express.Router();
var StudentRoutes = /** @class */ (function () {
    function StudentRoutes() {
        this._studentController = new StudentController();
    }
    Object.defineProperty(StudentRoutes.prototype, "routes", {
        get: function () {
            var controller = this._studentController;
            router.get("/students", controller.retrieve);
            router.get("/get-student-archive", controller.getStudentArchive);
            router.post("/students", controller.create);
            router.post("/archive-student", controller.archiveStudent);
            router.post("/get-students-id", controller.getStudentsById);
            router.put("/students/general-info-update", controller.updateGeneralInfo);
            router.put("/students/:_id/requestEditConsent", controller.editConsentRequest);
            router.put("/students/grantConsentEditPermission", controller.grantConsentEditPermission);
            router.get("/students/:_id", controller.findById);
            router.post("/enroll", controller.addToTimetable);
            router.delete("/drop/:_userID/:_courseID", controller.removeFromTimetable);
            router.get("/timetables", controller.getTimetables);
            router.get("/timetables-course-id/:_courseID", controller.getTimetablesByCourseId);
            router.get("/timetable/:userID", controller.getTimetablesByUserId);
            router.post("/caseNotes/:_studentID", controller.createNote);
            router.get("/caseNotes/:_studentID", controller.getNote);
            router.delete("/caseNotes/:_id", controller.deleteNote);
            router.post("/attendance", controller.insertAttendance);
            router.get("/attendance-report", controller.getAllAttendance);
            router.get("/prf/:_id", controller.populatePRF);
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return StudentRoutes;
}());
Object.seal(StudentRoutes);
module.exports = StudentRoutes;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL1N0dWRlbnRSb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlDQUFvQztBQUNwQyxvRUFBdUU7QUFFdkUsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzlCO0lBR0k7UUFDSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFDRCxzQkFBSSxpQ0FBTTthQUFWO1lBQ0ksSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBRXpDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMzRCxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM1RCxNQUFNLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEVBQUUsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDL0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsRUFBRSxVQUFVLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUMxRixNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsRUFBRSxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMzRSxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsRUFBRSxVQUFVLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNuRixNQUFNLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzdELE1BQU0sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELE1BQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3hELE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDOUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2hELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7OztPQUFBO0lBR0wsb0JBQUM7QUFBRCxDQWpDQSxBQWlDQyxJQUFBO0FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMzQixpQkFBUyxhQUFhLENBQUMiLCJmaWxlIjoicm91dGVzL1N0dWRlbnRSb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xyXG5pbXBvcnQgU3R1ZGVudENvbnRyb2xsZXIgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvU3R1ZGVudENvbnRyb2xsZXJcIik7XHJcblxyXG52YXIgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuY2xhc3MgU3R1ZGVudFJvdXRlcyB7XHJcbiAgICBwcml2YXRlIF9zdHVkZW50Q29udHJvbGxlcjogU3R1ZGVudENvbnRyb2xsZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgICAgIHRoaXMuX3N0dWRlbnRDb250cm9sbGVyID0gbmV3IFN0dWRlbnRDb250cm9sbGVyKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgcm91dGVzICgpIHtcclxuICAgICAgICB2YXIgY29udHJvbGxlciA9IHRoaXMuX3N0dWRlbnRDb250cm9sbGVyO1xyXG5cclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL3N0dWRlbnRzXCIsIGNvbnRyb2xsZXIucmV0cmlldmUpO1xyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvZ2V0LXN0dWRlbnQtYXJjaGl2ZVwiLCBjb250cm9sbGVyLmdldFN0dWRlbnRBcmNoaXZlKTtcclxuICAgICAgICByb3V0ZXIucG9zdChcIi9zdHVkZW50c1wiLCBjb250cm9sbGVyLmNyZWF0ZSk7XHJcbiAgICAgICAgcm91dGVyLnBvc3QoXCIvYXJjaGl2ZS1zdHVkZW50XCIsIGNvbnRyb2xsZXIuYXJjaGl2ZVN0dWRlbnQpO1xyXG4gICAgICAgIHJvdXRlci5wb3N0KFwiL2dldC1zdHVkZW50cy1pZFwiLCBjb250cm9sbGVyLmdldFN0dWRlbnRzQnlJZCk7XHJcbiAgICAgICAgcm91dGVyLnB1dChcIi9zdHVkZW50cy9nZW5lcmFsLWluZm8tdXBkYXRlXCIsIGNvbnRyb2xsZXIudXBkYXRlR2VuZXJhbEluZm8pO1xyXG4gICAgICAgIHJvdXRlci5wdXQoXCIvc3R1ZGVudHMvOl9pZC9yZXF1ZXN0RWRpdENvbnNlbnRcIiwgY29udHJvbGxlci5lZGl0Q29uc2VudFJlcXVlc3QpO1xyXG4gICAgICAgIHJvdXRlci5wdXQoXCIvc3R1ZGVudHMvZ3JhbnRDb25zZW50RWRpdFBlcm1pc3Npb25cIiwgY29udHJvbGxlci5ncmFudENvbnNlbnRFZGl0UGVybWlzc2lvbik7XHJcbiAgICAgICAgcm91dGVyLmdldChcIi9zdHVkZW50cy86X2lkXCIsIGNvbnRyb2xsZXIuZmluZEJ5SWQpO1xyXG4gICAgICAgIHJvdXRlci5wb3N0KFwiL2Vucm9sbFwiLCBjb250cm9sbGVyLmFkZFRvVGltZXRhYmxlKTtcclxuICAgICAgICByb3V0ZXIuZGVsZXRlKFwiL2Ryb3AvOl91c2VySUQvOl9jb3Vyc2VJRFwiLCBjb250cm9sbGVyLnJlbW92ZUZyb21UaW1ldGFibGUpO1xyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvdGltZXRhYmxlc1wiLCBjb250cm9sbGVyLmdldFRpbWV0YWJsZXMpO1xyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvdGltZXRhYmxlcy1jb3Vyc2UtaWQvOl9jb3Vyc2VJRFwiLCBjb250cm9sbGVyLmdldFRpbWV0YWJsZXNCeUNvdXJzZUlkKTtcclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL3RpbWV0YWJsZS86dXNlcklEXCIsIGNvbnRyb2xsZXIuZ2V0VGltZXRhYmxlc0J5VXNlcklkKTtcclxuICAgICAgICByb3V0ZXIucG9zdChcIi9jYXNlTm90ZXMvOl9zdHVkZW50SURcIiwgY29udHJvbGxlci5jcmVhdGVOb3RlKTtcclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL2Nhc2VOb3Rlcy86X3N0dWRlbnRJRFwiLCBjb250cm9sbGVyLmdldE5vdGUpO1xyXG4gICAgICAgIHJvdXRlci5kZWxldGUoXCIvY2FzZU5vdGVzLzpfaWRcIiwgY29udHJvbGxlci5kZWxldGVOb3RlKTtcclxuICAgICAgICByb3V0ZXIucG9zdChcIi9hdHRlbmRhbmNlXCIsIGNvbnRyb2xsZXIuaW5zZXJ0QXR0ZW5kYW5jZSk7XHJcbiAgICAgICAgcm91dGVyLmdldChcIi9hdHRlbmRhbmNlLXJlcG9ydFwiLCBjb250cm9sbGVyLmdldEFsbEF0dGVuZGFuY2UpO1xyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvcHJmLzpfaWRcIiwgY29udHJvbGxlci5wb3B1bGF0ZVBSRik7XHJcbiAgICAgICAgcmV0dXJuIHJvdXRlcjtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5PYmplY3Quc2VhbChTdHVkZW50Um91dGVzKTtcclxuZXhwb3J0ID0gU3R1ZGVudFJvdXRlcztcclxuIl19
