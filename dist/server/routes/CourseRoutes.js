"use strict";
var express = require("express");
var CourseController = require("../controllers/CourseController");
var router = express.Router();
var CourseRoutes = /** @class */ (function () {
    function CourseRoutes() {
        this._CourseController = new CourseController();
    }
    Object.defineProperty(CourseRoutes.prototype, "routes", {
        get: function () {
            var controller = this._CourseController;
            router.get("/course", controller.retrieve);
            router.get("/instructor-courses/:_id", controller.getInstructorCourses);
            router.post("/course", controller.create);
            router.put("/course/:_id", controller.update);
            router.get("/course/:_id", controller.findById);
            router.get("/wait-list", controller.getWaitList);
            router.get("/wait-list-by-id/:_id", controller.getWaitListById);
            router.post("/addToWaitList", controller.addToWaitList);
            router.delete("/course/:_id", controller.delete);
            router.get("/getInstructors", controller.getInstructors);
            router.get("/getCampuses", controller.getCampuses);
            router.get("/getCourseTypes", controller.getCourseTypes);
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return CourseRoutes;
}());
Object.seal(CourseRoutes);
module.exports = CourseRoutes;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL0NvdXJzZVJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQW9DO0FBQ3BDLGtFQUFxRTtBQUVyRSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDOUI7SUFHSTtRQUNJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUNELHNCQUFJLGdDQUFNO2FBQVY7WUFDSSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFFeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDeEUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5QyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3hELE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqRCxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN6RCxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDekQsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQzs7O09BQUE7SUFDTCxtQkFBQztBQUFELENBdkJBLEFBdUJDLElBQUE7QUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzFCLGlCQUFTLFlBQVksQ0FBQyIsImZpbGUiOiJyb3V0ZXMvQ291cnNlUm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcclxuaW1wb3J0IENvdXJzZUNvbnRyb2xsZXIgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvQ291cnNlQ29udHJvbGxlclwiKTtcclxuXHJcbnZhciByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5jbGFzcyBDb3Vyc2VSb3V0ZXMge1xyXG4gICAgcHJpdmF0ZSBfQ291cnNlQ29udHJvbGxlcjogQ291cnNlQ29udHJvbGxlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9Db3Vyc2VDb250cm9sbGVyID0gbmV3IENvdXJzZUNvbnRyb2xsZXIoKTtcclxuICAgIH1cclxuICAgIGdldCByb3V0ZXMoKSB7XHJcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSB0aGlzLl9Db3Vyc2VDb250cm9sbGVyO1xyXG5cclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL2NvdXJzZVwiLCBjb250cm9sbGVyLnJldHJpZXZlKTtcclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL2luc3RydWN0b3ItY291cnNlcy86X2lkXCIsIGNvbnRyb2xsZXIuZ2V0SW5zdHJ1Y3RvckNvdXJzZXMpO1xyXG4gICAgICAgIHJvdXRlci5wb3N0KFwiL2NvdXJzZVwiLCBjb250cm9sbGVyLmNyZWF0ZSk7XHJcbiAgICAgICAgcm91dGVyLnB1dChcIi9jb3Vyc2UvOl9pZFwiLCBjb250cm9sbGVyLnVwZGF0ZSk7XHJcbiAgICAgICAgcm91dGVyLmdldChcIi9jb3Vyc2UvOl9pZFwiLCBjb250cm9sbGVyLmZpbmRCeUlkKTtcclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL3dhaXQtbGlzdFwiLCBjb250cm9sbGVyLmdldFdhaXRMaXN0KTtcclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL3dhaXQtbGlzdC1ieS1pZC86X2lkXCIsIGNvbnRyb2xsZXIuZ2V0V2FpdExpc3RCeUlkKTtcclxuICAgICAgICByb3V0ZXIucG9zdChcIi9hZGRUb1dhaXRMaXN0XCIsIGNvbnRyb2xsZXIuYWRkVG9XYWl0TGlzdCk7XHJcbiAgICAgICAgcm91dGVyLmRlbGV0ZShcIi9jb3Vyc2UvOl9pZFwiLCBjb250cm9sbGVyLmRlbGV0ZSk7XHJcbiAgICAgICAgcm91dGVyLmdldChcIi9nZXRJbnN0cnVjdG9yc1wiLCBjb250cm9sbGVyLmdldEluc3RydWN0b3JzKTtcclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL2dldENhbXB1c2VzXCIsIGNvbnRyb2xsZXIuZ2V0Q2FtcHVzZXMpO1xyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvZ2V0Q291cnNlVHlwZXNcIiwgY29udHJvbGxlci5nZXRDb3Vyc2VUeXBlcyk7XHJcbiAgICAgICAgcmV0dXJuIHJvdXRlcjtcclxuICAgIH1cclxufVxyXG5cclxuT2JqZWN0LnNlYWwoQ291cnNlUm91dGVzKTtcclxuZXhwb3J0ID0gQ291cnNlUm91dGVzO1xyXG4iXX0=
