"use strict";
var express = require("express");
var CourseController = require("../controllers/CourseController");
var router = express.Router();
var CourseRoutes = (function () {
    function CourseRoutes() {
        this._CourseController = new CourseController();
    }
    Object.defineProperty(CourseRoutes.prototype, "routes", {
        get: function () {
            var controller = this._CourseController;
            router.get("/course", controller.retrieve);
            //router.post("/Courses", controller.create);
            //router.put("/Courses/:_id", controller.update);
            //router.get("/Courses/:_id", controller.findById);
            //router.delete("/Courses/:_id", controller.delete);
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return CourseRoutes;
}());
Object.seal(CourseRoutes);
module.exports = CourseRoutes;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL0NvdXJzZVJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQW9DO0FBQ3BDLGtFQUFxRTtBQUVyRSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDOUI7SUFHSTtRQUNJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUNELHNCQUFJLGdDQUFNO2FBQVY7WUFDSSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFFeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLDZDQUE2QztZQUM3QyxpREFBaUQ7WUFDakQsbURBQW1EO1lBQ25ELG9EQUFvRDtZQUVwRCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7OztPQUFBO0lBR0wsbUJBQUM7QUFBRCxDQW5CQSxBQW1CQyxJQUFBO0FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMxQixpQkFBUyxZQUFZLENBQUMiLCJmaWxlIjoicm91dGVzL0NvdXJzZVJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbmltcG9ydCBDb3Vyc2VDb250cm9sbGVyID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL0NvdXJzZUNvbnRyb2xsZXJcIik7XHJcblxyXG52YXIgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuY2xhc3MgQ291cnNlUm91dGVzIHtcclxuICAgIHByaXZhdGUgX0NvdXJzZUNvbnRyb2xsZXI6IENvdXJzZUNvbnRyb2xsZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fQ291cnNlQ29udHJvbGxlciA9IG5ldyBDb3Vyc2VDb250cm9sbGVyKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgcm91dGVzKCkge1xyXG4gICAgICAgIHZhciBjb250cm9sbGVyID0gdGhpcy5fQ291cnNlQ29udHJvbGxlcjtcclxuXHJcbiAgICAgICAgcm91dGVyLmdldChcIi9jb3Vyc2VcIiwgY29udHJvbGxlci5yZXRyaWV2ZSk7XHJcbiAgICAgICAgLy9yb3V0ZXIucG9zdChcIi9Db3Vyc2VzXCIsIGNvbnRyb2xsZXIuY3JlYXRlKTtcclxuICAgICAgICAvL3JvdXRlci5wdXQoXCIvQ291cnNlcy86X2lkXCIsIGNvbnRyb2xsZXIudXBkYXRlKTtcclxuICAgICAgICAvL3JvdXRlci5nZXQoXCIvQ291cnNlcy86X2lkXCIsIGNvbnRyb2xsZXIuZmluZEJ5SWQpO1xyXG4gICAgICAgIC8vcm91dGVyLmRlbGV0ZShcIi9Db3Vyc2VzLzpfaWRcIiwgY29udHJvbGxlci5kZWxldGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gcm91dGVyO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbk9iamVjdC5zZWFsKENvdXJzZVJvdXRlcyk7XHJcbmV4cG9ydCA9IENvdXJzZVJvdXRlcztcclxuIl19
