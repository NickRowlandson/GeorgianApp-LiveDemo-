"use strict";
var express = require("express");
var StaffController = require("../controllers/StaffController");
var router = express.Router();
var StaffRoutes = /** @class */ (function () {
    function StaffRoutes() {
        this._staffController = new StaffController();
    }
    Object.defineProperty(StaffRoutes.prototype, "routes", {
        get: function () {
            var controller = this._staffController;
            router.get("/staff", controller.retrieve);
            router.post("/staff", controller.create);
            router.put("/staff/:_id", controller.update);
            router.get("/staff/:_id", controller.findById);
            router.delete("/staff/:_id", controller.delete);
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return StaffRoutes;
}());
Object.seal(StaffRoutes);
module.exports = StaffRoutes;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL1N0YWZmUm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQ0FBb0M7QUFDcEMsZ0VBQW1FO0FBRW5FLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUM5QjtJQUdJO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUNELHNCQUFJLCtCQUFNO2FBQVY7WUFDSSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7WUFFdkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQy9DLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVoRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDOzs7T0FBQTtJQUdMLGtCQUFDO0FBQUQsQ0FuQkEsQUFtQkMsSUFBQTtBQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDekIsaUJBQVMsV0FBVyxDQUFDIiwiZmlsZSI6InJvdXRlcy9TdGFmZlJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbmltcG9ydCBTdGFmZkNvbnRyb2xsZXIgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvU3RhZmZDb250cm9sbGVyXCIpO1xyXG5cclxudmFyIHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcbmNsYXNzIFN0YWZmUm91dGVzIHtcclxuICAgIHByaXZhdGUgX3N0YWZmQ29udHJvbGxlcjogU3RhZmZDb250cm9sbGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9zdGFmZkNvbnRyb2xsZXIgPSBuZXcgU3RhZmZDb250cm9sbGVyKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgcm91dGVzICgpIHtcclxuICAgICAgICB2YXIgY29udHJvbGxlciA9IHRoaXMuX3N0YWZmQ29udHJvbGxlcjtcclxuXHJcbiAgICAgICAgcm91dGVyLmdldChcIi9zdGFmZlwiLCBjb250cm9sbGVyLnJldHJpZXZlKTtcclxuICAgICAgICByb3V0ZXIucG9zdChcIi9zdGFmZlwiLCBjb250cm9sbGVyLmNyZWF0ZSk7XHJcbiAgICAgICAgcm91dGVyLnB1dChcIi9zdGFmZi86X2lkXCIsIGNvbnRyb2xsZXIudXBkYXRlKTtcclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL3N0YWZmLzpfaWRcIiwgY29udHJvbGxlci5maW5kQnlJZCk7XHJcbiAgICAgICAgcm91dGVyLmRlbGV0ZShcIi9zdGFmZi86X2lkXCIsIGNvbnRyb2xsZXIuZGVsZXRlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJvdXRlcjtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5PYmplY3Quc2VhbChTdGFmZlJvdXRlcyk7XHJcbmV4cG9ydCA9IFN0YWZmUm91dGVzO1xyXG4iXX0=
