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
            router.get("/getInstructors", controller.getInstructors);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL0NvdXJzZVJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQW9DO0FBQ3BDLGtFQUFxRTtBQUVyRSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDOUI7SUFHSTtRQUNJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUNELHNCQUFJLGdDQUFNO2FBQVY7WUFDSSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFFeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDeEUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5QyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pELE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNuRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDOzs7T0FBQTtJQUNMLG1CQUFDO0FBQUQsQ0FuQkEsQUFtQkMsSUFBQTtBQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDMUIsaUJBQVMsWUFBWSxDQUFDIiwiZmlsZSI6InJvdXRlcy9Db3Vyc2VSb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xyXG5pbXBvcnQgQ291cnNlQ29udHJvbGxlciA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9Db3Vyc2VDb250cm9sbGVyXCIpO1xyXG5cclxudmFyIHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcbmNsYXNzIENvdXJzZVJvdXRlcyB7XHJcbiAgICBwcml2YXRlIF9Db3Vyc2VDb250cm9sbGVyOiBDb3Vyc2VDb250cm9sbGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX0NvdXJzZUNvbnRyb2xsZXIgPSBuZXcgQ291cnNlQ29udHJvbGxlcigpO1xyXG4gICAgfVxyXG4gICAgZ2V0IHJvdXRlcygpIHtcclxuICAgICAgICB2YXIgY29udHJvbGxlciA9IHRoaXMuX0NvdXJzZUNvbnRyb2xsZXI7XHJcblxyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvY291cnNlXCIsIGNvbnRyb2xsZXIucmV0cmlldmUpO1xyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvaW5zdHJ1Y3Rvci1jb3Vyc2VzLzpfaWRcIiwgY29udHJvbGxlci5nZXRJbnN0cnVjdG9yQ291cnNlcyk7XHJcbiAgICAgICAgcm91dGVyLnBvc3QoXCIvY291cnNlXCIsIGNvbnRyb2xsZXIuY3JlYXRlKTtcclxuICAgICAgICByb3V0ZXIucHV0KFwiL2NvdXJzZS86X2lkXCIsIGNvbnRyb2xsZXIudXBkYXRlKTtcclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL2NvdXJzZS86X2lkXCIsIGNvbnRyb2xsZXIuZmluZEJ5SWQpO1xyXG4gICAgICAgIHJvdXRlci5kZWxldGUoXCIvY291cnNlLzpfaWRcIiwgY29udHJvbGxlci5kZWxldGUpO1xyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvZ2V0SW5zdHJ1Y3RvcnNcIiwgY29udHJvbGxlci5nZXRJbnN0cnVjdG9ycyk7XHJcbiAgICAgICAgcm91dGVyLmdldChcIi9nZXRDYW1wdXNlc1wiLCBjb250cm9sbGVyLmdldENhbXB1c2VzKTtcclxuICAgICAgICByZXR1cm4gcm91dGVyO1xyXG4gICAgfVxyXG59XHJcblxyXG5PYmplY3Quc2VhbChDb3Vyc2VSb3V0ZXMpO1xyXG5leHBvcnQgPSBDb3Vyc2VSb3V0ZXM7XHJcbiJdfQ==
