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
            router.delete("/course/:_id", controller.delete);
            router.get("/getProfessors", controller.getProfessor);
            router.get("/getCampuses", controller.getCampuses);
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return CourseRoutes;
}());
Object.seal(CourseRoutes);
module.exports = CourseRoutes;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL0NvdXJzZVJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQW9DO0FBQ3BDLGtFQUFxRTtBQUVyRSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDOUI7SUFHSTtRQUNJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUNELHNCQUFJLGdDQUFNO2FBQVY7WUFDSSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFFeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDeEUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5QyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pELE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3RELE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNuRCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7OztPQUFBO0lBQ0wsbUJBQUM7QUFBRCxDQW5CQSxBQW1CQyxJQUFBO0FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMxQixpQkFBUyxZQUFZLENBQUMiLCJmaWxlIjoicm91dGVzL0NvdXJzZVJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbmltcG9ydCBDb3Vyc2VDb250cm9sbGVyID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL0NvdXJzZUNvbnRyb2xsZXJcIik7XHJcblxyXG52YXIgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuY2xhc3MgQ291cnNlUm91dGVzIHtcclxuICAgIHByaXZhdGUgX0NvdXJzZUNvbnRyb2xsZXI6IENvdXJzZUNvbnRyb2xsZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fQ291cnNlQ29udHJvbGxlciA9IG5ldyBDb3Vyc2VDb250cm9sbGVyKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgcm91dGVzKCkge1xyXG4gICAgICAgIHZhciBjb250cm9sbGVyID0gdGhpcy5fQ291cnNlQ29udHJvbGxlcjtcclxuXHJcbiAgICAgICAgcm91dGVyLmdldChcIi9jb3Vyc2VcIiwgY29udHJvbGxlci5yZXRyaWV2ZSk7XHJcbiAgICAgICAgcm91dGVyLmdldChcIi9pbnN0cnVjdG9yLWNvdXJzZXMvOl9pZFwiLCBjb250cm9sbGVyLmdldEluc3RydWN0b3JDb3Vyc2VzKTtcclxuICAgICAgICByb3V0ZXIucG9zdChcIi9jb3Vyc2VcIiwgY29udHJvbGxlci5jcmVhdGUpO1xyXG4gICAgICAgIHJvdXRlci5wdXQoXCIvY291cnNlLzpfaWRcIiwgY29udHJvbGxlci51cGRhdGUpO1xyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvY291cnNlLzpfaWRcIiwgY29udHJvbGxlci5maW5kQnlJZCk7XHJcbiAgICAgICAgcm91dGVyLmRlbGV0ZShcIi9jb3Vyc2UvOl9pZFwiLCBjb250cm9sbGVyLmRlbGV0ZSk7XHJcbiAgICAgICAgcm91dGVyLmdldChcIi9nZXRQcm9mZXNzb3JzXCIsIGNvbnRyb2xsZXIuZ2V0UHJvZmVzc29yKTtcclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL2dldENhbXB1c2VzXCIsIGNvbnRyb2xsZXIuZ2V0Q2FtcHVzZXMpO1xyXG4gICAgICAgIHJldHVybiByb3V0ZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcbk9iamVjdC5zZWFsKENvdXJzZVJvdXRlcyk7XHJcbmV4cG9ydCA9IENvdXJzZVJvdXRlcztcclxuIl19
