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
            router.get("/attendance-report", controller.getAllAttendance);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL1N0dWRlbnRSb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlDQUFvQztBQUNwQyxvRUFBdUU7QUFFdkUsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzlCO0lBR0k7UUFDSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFDRCxzQkFBSSxpQ0FBTTthQUFWO1lBQ0ksSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBRXpDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDNUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsRUFBRSxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDckYsTUFBTSxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsRUFBRSxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMzRSxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsRUFBRSxVQUFVLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNuRixNQUFNLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3hELE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDOUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbEIsQ0FBQzs7O09BQUE7SUFHTCxvQkFBQztBQUFELENBN0JBLEFBNkJDLElBQUE7QUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzNCLGlCQUFTLGFBQWEsQ0FBQyIsImZpbGUiOiJyb3V0ZXMvU3R1ZGVudFJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbmltcG9ydCBTdHVkZW50Q29udHJvbGxlciA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9TdHVkZW50Q29udHJvbGxlclwiKTtcclxuXHJcbnZhciByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5jbGFzcyBTdHVkZW50Um91dGVzIHtcclxuICAgIHByaXZhdGUgX3N0dWRlbnRDb250cm9sbGVyOiBTdHVkZW50Q29udHJvbGxlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICAgICAgdGhpcy5fc3R1ZGVudENvbnRyb2xsZXIgPSBuZXcgU3R1ZGVudENvbnRyb2xsZXIoKTtcclxuICAgIH1cclxuICAgIGdldCByb3V0ZXMgKCkge1xyXG4gICAgICAgIHZhciBjb250cm9sbGVyID0gdGhpcy5fc3R1ZGVudENvbnRyb2xsZXI7XHJcblxyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvc3R1ZGVudHNcIiwgY29udHJvbGxlci5yZXRyaWV2ZSk7XHJcbiAgICAgICAgcm91dGVyLnBvc3QoXCIvc3R1ZGVudHNcIiwgY29udHJvbGxlci5jcmVhdGUpO1xyXG4gICAgICAgIHJvdXRlci5wb3N0KFwiL2dldC1zdHVkZW50cy1pZFwiLCBjb250cm9sbGVyLmdldFN0dWRlbnRzQnlJZCk7XHJcbiAgICAgICAgcm91dGVyLnB1dChcIi9zdHVkZW50cy86X2lkXCIsIGNvbnRyb2xsZXIudXBkYXRlKTtcclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL3N0dWRlbnRzLzpfaWRcIiwgY29udHJvbGxlci5maW5kQnlJZCk7XHJcbiAgICAgICAgcm91dGVyLmRlbGV0ZShcIi9zdHVkZW50cy86X2lkXCIsIGNvbnRyb2xsZXIuZGVsZXRlKTtcclxuICAgICAgICByb3V0ZXIucG9zdChcIi9lbnJvbGwvOl91c2VySUQvOl9jb3Vyc2VJRC86X2luc3RydWN0b3JJRFwiLCBjb250cm9sbGVyLmFkZFRvVGltZXRhYmxlKTtcclxuICAgICAgICByb3V0ZXIuZGVsZXRlKFwiL2Ryb3AvOl91c2VySUQvOl9jb3Vyc2VJRFwiLCBjb250cm9sbGVyLnJlbW92ZUZyb21UaW1ldGFibGUpO1xyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvdGltZXRhYmxlc1wiLCBjb250cm9sbGVyLmdldFRpbWV0YWJsZXMpO1xyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvdGltZXRhYmxlcy1jb3Vyc2UtaWQvOl9jb3Vyc2VJRFwiLCBjb250cm9sbGVyLmdldFRpbWV0YWJsZXNCeUNvdXJzZUlkKTtcclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL3RpbWV0YWJsZS86dXNlcklEXCIsIGNvbnRyb2xsZXIuZ2V0VGltZXRhYmxlc0J5VXNlcklkKTtcclxuICAgICAgICByb3V0ZXIucG9zdChcIi9jYXNlTm90ZXMvOl9zdHVkZW50SURcIiwgY29udHJvbGxlci5jcmVhdGVOb3RlKTtcclxuICAgICAgICByb3V0ZXIucG9zdChcIi9hdHRlbmRhbmNlXCIsIGNvbnRyb2xsZXIuaW5zZXJ0QXR0ZW5kYW5jZSk7XHJcbiAgICAgICAgcm91dGVyLmdldChcIi9hdHRlbmRhbmNlLXJlcG9ydFwiLCBjb250cm9sbGVyLmdldEFsbEF0dGVuZGFuY2UpO1xyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvY2FzZU5vdGVzLzpfc3R1ZGVudElEXCIsIGNvbnRyb2xsZXIuZ2V0Tm90ZSk7XHJcbiAgICAgICAgcm91dGVyLmdldChcIi9wcmYvOl9pZFwiLCBjb250cm9sbGVyLnBvcHVsYXRlUFJGKTtcclxuICAgICAgICByZXR1cm4gcm91dGVyO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbk9iamVjdC5zZWFsKFN0dWRlbnRSb3V0ZXMpO1xyXG5leHBvcnQgPSBTdHVkZW50Um91dGVzO1xyXG4iXX0=
