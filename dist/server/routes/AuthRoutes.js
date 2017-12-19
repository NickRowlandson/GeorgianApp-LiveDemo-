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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL0F1dGhSb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlDQUFvQztBQUNwQyw4REFBaUU7QUFFakUsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzlCO0lBR0k7UUFDSSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUNELHNCQUFJLDhCQUFNO2FBQVY7WUFDSSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBRXRDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN4RCxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUU3RCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7OztPQUFBO0lBQ0wsaUJBQUM7QUFBRCxDQWZBLEFBZUMsSUFBQTtBQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDeEIsaUJBQVMsVUFBVSxDQUFBIiwiZmlsZSI6InJvdXRlcy9BdXRoUm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcclxuaW1wb3J0IEF1dGhDb250cm9sbGVyID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL0F1dGhDb250cm9sbGVyXCIpO1xyXG5cclxudmFyIHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcbmNsYXNzIEF1dGhSb3V0ZXMge1xyXG4gICAgcHJpdmF0ZSBfYXV0aENvbnRyb2xsZXI6IEF1dGhDb250cm9sbGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9hdXRoQ29udHJvbGxlciA9IG5ldyBBdXRoQ29udHJvbGxlcigpO1xyXG4gICAgfVxyXG4gICAgZ2V0IHJvdXRlcyAoKSB7XHJcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSB0aGlzLl9hdXRoQ29udHJvbGxlcjtcclxuXHJcbiAgICAgICAgcm91dGVyLnBvc3QoXCIvYXV0aC9cIiwgY29udHJvbGxlci5hdXRoKTtcclxuICAgICAgICByb3V0ZXIucHV0KFwiL3Jlc2V0UGFzc3dvcmQvXCIsIGNvbnRyb2xsZXIucmVzZXRQYXNzd29yZCk7XHJcbiAgICAgICAgcm91dGVyLmdldChcIi9yZXF1ZXN0UmVzZXQvOl9lbWFpbFwiLCBjb250cm9sbGVyLnJlcXVlc3RSZXNldCk7XHJcblxyXG4gICAgICAgIHJldHVybiByb3V0ZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcbk9iamVjdC5zZWFsKEF1dGhSb3V0ZXMpO1xyXG5leHBvcnQgPSBBdXRoUm91dGVzXHJcbiJdfQ==
