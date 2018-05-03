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
            router.post("/students", controller.create);
            router.post("/get-students-id", controller.getStudentsById);
            router.put("/students/general-info-update", controller.updateGeneralInfo);
            router.put("/students/:_id/requestEditConsent", controller.editConsentRequest);
            router.put("/students/grantConsentEditPermission", controller.grantConsentEditPermission);
            router.get("/students/:_id", controller.findById);
            router.delete("/students/:_id", controller.delete);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL1N0dWRlbnRSb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlDQUFvQztBQUNwQyxvRUFBdUU7QUFFdkUsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzlCO0lBR0k7UUFDSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFDRCxzQkFBSSxpQ0FBTTthQUFWO1lBQ0ksSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBRXpDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDNUQsTUFBTSxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsRUFBRSxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUMxRSxNQUFNLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxFQUFFLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQy9FLE1BQU0sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLEVBQUUsVUFBVSxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFDMUYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxNQUFNLENBQUMsMkJBQTJCLEVBQUUsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDM0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLEVBQUUsVUFBVSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDbkYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxVQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNuRSxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3RCxNQUFNLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6RCxNQUFNLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4RCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN4RCxNQUFNLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzlELE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNoRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDOzs7T0FBQTtJQUdMLG9CQUFDO0FBQUQsQ0FoQ0EsQUFnQ0MsSUFBQTtBQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0IsaUJBQVMsYUFBYSxDQUFDIiwiZmlsZSI6InJvdXRlcy9TdHVkZW50Um91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcclxuaW1wb3J0IFN0dWRlbnRDb250cm9sbGVyID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL1N0dWRlbnRDb250cm9sbGVyXCIpO1xyXG5cclxudmFyIHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcbmNsYXNzIFN0dWRlbnRSb3V0ZXMge1xyXG4gICAgcHJpdmF0ZSBfc3R1ZGVudENvbnRyb2xsZXI6IFN0dWRlbnRDb250cm9sbGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9zdHVkZW50Q29udHJvbGxlciA9IG5ldyBTdHVkZW50Q29udHJvbGxlcigpO1xyXG4gICAgfVxyXG4gICAgZ2V0IHJvdXRlcyAoKSB7XHJcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSB0aGlzLl9zdHVkZW50Q29udHJvbGxlcjtcclxuXHJcbiAgICAgICAgcm91dGVyLmdldChcIi9zdHVkZW50c1wiLCBjb250cm9sbGVyLnJldHJpZXZlKTtcclxuICAgICAgICByb3V0ZXIucG9zdChcIi9zdHVkZW50c1wiLCBjb250cm9sbGVyLmNyZWF0ZSk7XHJcbiAgICAgICAgcm91dGVyLnBvc3QoXCIvZ2V0LXN0dWRlbnRzLWlkXCIsIGNvbnRyb2xsZXIuZ2V0U3R1ZGVudHNCeUlkKTtcclxuICAgICAgICByb3V0ZXIucHV0KFwiL3N0dWRlbnRzL2dlbmVyYWwtaW5mby11cGRhdGVcIiwgY29udHJvbGxlci51cGRhdGVHZW5lcmFsSW5mbyk7XHJcbiAgICAgICAgcm91dGVyLnB1dChcIi9zdHVkZW50cy86X2lkL3JlcXVlc3RFZGl0Q29uc2VudFwiLCBjb250cm9sbGVyLmVkaXRDb25zZW50UmVxdWVzdCk7XHJcbiAgICAgICAgcm91dGVyLnB1dChcIi9zdHVkZW50cy9ncmFudENvbnNlbnRFZGl0UGVybWlzc2lvblwiLCBjb250cm9sbGVyLmdyYW50Q29uc2VudEVkaXRQZXJtaXNzaW9uKTtcclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL3N0dWRlbnRzLzpfaWRcIiwgY29udHJvbGxlci5maW5kQnlJZCk7XHJcbiAgICAgICAgcm91dGVyLmRlbGV0ZShcIi9zdHVkZW50cy86X2lkXCIsIGNvbnRyb2xsZXIuZGVsZXRlKTtcclxuICAgICAgICByb3V0ZXIucG9zdChcIi9lbnJvbGxcIiwgY29udHJvbGxlci5hZGRUb1RpbWV0YWJsZSk7XHJcbiAgICAgICAgcm91dGVyLmRlbGV0ZShcIi9kcm9wLzpfdXNlcklELzpfY291cnNlSURcIiwgY29udHJvbGxlci5yZW1vdmVGcm9tVGltZXRhYmxlKTtcclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL3RpbWV0YWJsZXNcIiwgY29udHJvbGxlci5nZXRUaW1ldGFibGVzKTtcclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL3RpbWV0YWJsZXMtY291cnNlLWlkLzpfY291cnNlSURcIiwgY29udHJvbGxlci5nZXRUaW1ldGFibGVzQnlDb3Vyc2VJZCk7XHJcbiAgICAgICAgcm91dGVyLmdldChcIi90aW1ldGFibGUvOnVzZXJJRFwiLCBjb250cm9sbGVyLmdldFRpbWV0YWJsZXNCeVVzZXJJZCk7XHJcbiAgICAgICAgcm91dGVyLnBvc3QoXCIvY2FzZU5vdGVzLzpfc3R1ZGVudElEXCIsIGNvbnRyb2xsZXIuY3JlYXRlTm90ZSk7XHJcbiAgICAgICAgcm91dGVyLmdldChcIi9jYXNlTm90ZXMvOl9zdHVkZW50SURcIiwgY29udHJvbGxlci5nZXROb3RlKTtcclxuICAgICAgICByb3V0ZXIuZGVsZXRlKFwiL2Nhc2VOb3Rlcy86X2lkXCIsIGNvbnRyb2xsZXIuZGVsZXRlTm90ZSk7XHJcbiAgICAgICAgcm91dGVyLnBvc3QoXCIvYXR0ZW5kYW5jZVwiLCBjb250cm9sbGVyLmluc2VydEF0dGVuZGFuY2UpO1xyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvYXR0ZW5kYW5jZS1yZXBvcnRcIiwgY29udHJvbGxlci5nZXRBbGxBdHRlbmRhbmNlKTtcclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL3ByZi86X2lkXCIsIGNvbnRyb2xsZXIucG9wdWxhdGVQUkYpO1xyXG4gICAgICAgIHJldHVybiByb3V0ZXI7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuT2JqZWN0LnNlYWwoU3R1ZGVudFJvdXRlcyk7XHJcbmV4cG9ydCA9IFN0dWRlbnRSb3V0ZXM7XHJcbiJdfQ==
