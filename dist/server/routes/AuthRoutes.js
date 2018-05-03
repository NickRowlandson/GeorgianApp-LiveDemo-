"use strict";
var express = require("express");
var AuthController = require("../controllers/AuthController");
var router = express.Router();
var AuthRoutes = /** @class */ (function () {
    function AuthRoutes() {
        this._authController = new AuthController();
    }
    Object.defineProperty(AuthRoutes.prototype, "routes", {
        get: function () {
            var controller = this._authController;
            router.post("/auth/", controller.auth);
            router.put("/resetPassword/", controller.resetPassword);
            router.get("/requestReset/:_email", controller.requestReset);
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return AuthRoutes;
}());
Object.seal(AuthRoutes);
module.exports = AuthRoutes;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL0F1dGhSb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlDQUFvQztBQUNwQyw4REFBaUU7QUFFakUsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzlCO0lBR0k7UUFDSSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUNELHNCQUFJLDhCQUFNO2FBQVY7WUFDSSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBRXRDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN4RCxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUU3RCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDOzs7T0FBQTtJQUNMLGlCQUFDO0FBQUQsQ0FmQSxBQWVDLElBQUE7QUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3hCLGlCQUFTLFVBQVUsQ0FBQSIsImZpbGUiOiJyb3V0ZXMvQXV0aFJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbmltcG9ydCBBdXRoQ29udHJvbGxlciA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9BdXRoQ29udHJvbGxlclwiKTtcclxuXHJcbnZhciByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5jbGFzcyBBdXRoUm91dGVzIHtcclxuICAgIHByaXZhdGUgX2F1dGhDb250cm9sbGVyOiBBdXRoQ29udHJvbGxlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICAgICAgdGhpcy5fYXV0aENvbnRyb2xsZXIgPSBuZXcgQXV0aENvbnRyb2xsZXIoKTtcclxuICAgIH1cclxuICAgIGdldCByb3V0ZXMgKCkge1xyXG4gICAgICAgIHZhciBjb250cm9sbGVyID0gdGhpcy5fYXV0aENvbnRyb2xsZXI7XHJcblxyXG4gICAgICAgIHJvdXRlci5wb3N0KFwiL2F1dGgvXCIsIGNvbnRyb2xsZXIuYXV0aCk7XHJcbiAgICAgICAgcm91dGVyLnB1dChcIi9yZXNldFBhc3N3b3JkL1wiLCBjb250cm9sbGVyLnJlc2V0UGFzc3dvcmQpO1xyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvcmVxdWVzdFJlc2V0LzpfZW1haWxcIiwgY29udHJvbGxlci5yZXF1ZXN0UmVzZXQpO1xyXG5cclxuICAgICAgICByZXR1cm4gcm91dGVyO1xyXG4gICAgfVxyXG59XHJcblxyXG5PYmplY3Quc2VhbChBdXRoUm91dGVzKTtcclxuZXhwb3J0ID0gQXV0aFJvdXRlc1xyXG4iXX0=
