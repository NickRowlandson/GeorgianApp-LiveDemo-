"use strict";
var express = require("express");
var StudentController = require("../controllers/StudentController");
var router = express.Router();
var StudentRoutes = (function () {
    function StudentRoutes() {
        this._studentController = new StudentController();
    }
    Object.defineProperty(StudentRoutes.prototype, "routes", {
        get: function () {
            var controller = this._studentController;
            router.get("/students", controller.retrieve);
            router.post("/students", controller.create);
            router.post("/get-students-id", controller.getStudentsById);
            router.put("/students/:_id", controller.update);
            router.get("/students/:_id", controller.findById);
            router.delete("/students/:_id", controller.delete);
            router.post("/enroll/:_userID/:_courseID/:_instructorID", controller.addToTimetable);
            router.delete("/drop/:_userID/:_courseID", controller.removeFromTimetable);
            router.get("/timetables", controller.getTimetables);
            router.get("/timetables-course-id/:_courseID", controller.getTimetablesByCourseId);
            router.get("/timetable/:userID", controller.getTimetablesByUserId);
            router.post("/caseNotes/:_studentID", controller.createNote);
            router.post("/attendance", controller.insertAttendance);
            router.get("/caseNotes/:_studentID", controller.getNote);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL1N0dWRlbnRSb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlDQUFvQztBQUNwQyxvRUFBdUU7QUFFdkUsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzlCO0lBR0k7UUFDSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFDRCxzQkFBSSxpQ0FBTTthQUFWO1lBQ0ksSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBRXpDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDNUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsRUFBRSxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDckYsTUFBTSxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsRUFBRSxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMzRSxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsRUFBRSxVQUFVLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNuRixNQUFNLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3hELE1BQU0sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7OztPQUFBO0lBR0wsb0JBQUM7QUFBRCxDQTVCQSxBQTRCQyxJQUFBO0FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMzQixpQkFBUyxhQUFhLENBQUMiLCJmaWxlIjoicm91dGVzL1N0dWRlbnRSb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xyXG5pbXBvcnQgU3R1ZGVudENvbnRyb2xsZXIgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvU3R1ZGVudENvbnRyb2xsZXJcIik7XHJcblxyXG52YXIgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuY2xhc3MgU3R1ZGVudFJvdXRlcyB7XHJcbiAgICBwcml2YXRlIF9zdHVkZW50Q29udHJvbGxlcjogU3R1ZGVudENvbnRyb2xsZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgICAgIHRoaXMuX3N0dWRlbnRDb250cm9sbGVyID0gbmV3IFN0dWRlbnRDb250cm9sbGVyKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgcm91dGVzICgpIHtcclxuICAgICAgICB2YXIgY29udHJvbGxlciA9IHRoaXMuX3N0dWRlbnRDb250cm9sbGVyO1xyXG5cclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL3N0dWRlbnRzXCIsIGNvbnRyb2xsZXIucmV0cmlldmUpO1xyXG4gICAgICAgIHJvdXRlci5wb3N0KFwiL3N0dWRlbnRzXCIsIGNvbnRyb2xsZXIuY3JlYXRlKTtcclxuICAgICAgICByb3V0ZXIucG9zdChcIi9nZXQtc3R1ZGVudHMtaWRcIiwgY29udHJvbGxlci5nZXRTdHVkZW50c0J5SWQpO1xyXG4gICAgICAgIHJvdXRlci5wdXQoXCIvc3R1ZGVudHMvOl9pZFwiLCBjb250cm9sbGVyLnVwZGF0ZSk7XHJcbiAgICAgICAgcm91dGVyLmdldChcIi9zdHVkZW50cy86X2lkXCIsIGNvbnRyb2xsZXIuZmluZEJ5SWQpO1xyXG4gICAgICAgIHJvdXRlci5kZWxldGUoXCIvc3R1ZGVudHMvOl9pZFwiLCBjb250cm9sbGVyLmRlbGV0ZSk7XHJcbiAgICAgICAgcm91dGVyLnBvc3QoXCIvZW5yb2xsLzpfdXNlcklELzpfY291cnNlSUQvOl9pbnN0cnVjdG9ySURcIiwgY29udHJvbGxlci5hZGRUb1RpbWV0YWJsZSk7XHJcbiAgICAgICAgcm91dGVyLmRlbGV0ZShcIi9kcm9wLzpfdXNlcklELzpfY291cnNlSURcIiwgY29udHJvbGxlci5yZW1vdmVGcm9tVGltZXRhYmxlKTtcclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL3RpbWV0YWJsZXNcIiwgY29udHJvbGxlci5nZXRUaW1ldGFibGVzKTtcclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL3RpbWV0YWJsZXMtY291cnNlLWlkLzpfY291cnNlSURcIiwgY29udHJvbGxlci5nZXRUaW1ldGFibGVzQnlDb3Vyc2VJZCk7XHJcbiAgICAgICAgcm91dGVyLmdldChcIi90aW1ldGFibGUvOnVzZXJJRFwiLCBjb250cm9sbGVyLmdldFRpbWV0YWJsZXNCeVVzZXJJZCk7XHJcbiAgICAgICAgcm91dGVyLnBvc3QoXCIvY2FzZU5vdGVzLzpfc3R1ZGVudElEXCIsIGNvbnRyb2xsZXIuY3JlYXRlTm90ZSk7XHJcbiAgICAgICAgcm91dGVyLnBvc3QoXCIvYXR0ZW5kYW5jZVwiLCBjb250cm9sbGVyLmluc2VydEF0dGVuZGFuY2UpO1xyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvY2FzZU5vdGVzLzpfc3R1ZGVudElEXCIsIGNvbnRyb2xsZXIuZ2V0Tm90ZSk7XHJcbiAgICAgICAgcm91dGVyLmdldChcIi9wcmYvOl9pZFwiLCBjb250cm9sbGVyLnBvcHVsYXRlUFJGKTtcclxuICAgICAgICByZXR1cm4gcm91dGVyO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbk9iamVjdC5zZWFsKFN0dWRlbnRSb3V0ZXMpO1xyXG5leHBvcnQgPSBTdHVkZW50Um91dGVzO1xyXG4iXX0=
