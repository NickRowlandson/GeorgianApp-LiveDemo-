"use strict";
var express = require("express");
var ClientFormsController = require("../controllers/ClientFormsController");
var router = express.Router();
var ClientFormsRoutes = /** @class */ (function () {
    function ClientFormsRoutes() {
        this._clientFormsController = new ClientFormsController();
    }
    Object.defineProperty(ClientFormsRoutes.prototype, "routes", {
        get: function () {
            var controller = this._clientFormsController;
            router.post("/clientForms/:_id/consent", controller.consentForm);
            router.post("/clientForms/:_id/learningStyle", controller.learningStyleForm);
            router.get("/clientForms/:_id", controller.getAllFormsByID);
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return ClientFormsRoutes;
}());
Object.seal(ClientFormsRoutes);
module.exports = ClientFormsRoutes;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL0NsaWVudEZvcm1zUm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQ0FBb0M7QUFDcEMsNEVBQStFO0FBRS9FLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUM5QjtJQUdJO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQztJQUM5RCxDQUFDO0lBQ0Qsc0JBQUkscUNBQU07YUFBVjtZQUNJLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztZQUU3QyxNQUFNLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNqRSxNQUFNLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzdFLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzVELE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbEIsQ0FBQzs7O09BQUE7SUFHTCx3QkFBQztBQUFELENBaEJBLEFBZ0JDLElBQUE7QUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDL0IsaUJBQVMsaUJBQWlCLENBQUMiLCJmaWxlIjoicm91dGVzL0NsaWVudEZvcm1zUm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcclxuaW1wb3J0IENsaWVudEZvcm1zQ29udHJvbGxlciA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9DbGllbnRGb3Jtc0NvbnRyb2xsZXJcIik7XHJcblxyXG52YXIgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuY2xhc3MgQ2xpZW50Rm9ybXNSb3V0ZXMge1xyXG4gICAgcHJpdmF0ZSBfY2xpZW50Rm9ybXNDb250cm9sbGVyOiBDbGllbnRGb3Jtc0NvbnRyb2xsZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgICAgIHRoaXMuX2NsaWVudEZvcm1zQ29udHJvbGxlciA9IG5ldyBDbGllbnRGb3Jtc0NvbnRyb2xsZXIoKTtcclxuICAgIH1cclxuICAgIGdldCByb3V0ZXMgKCkge1xyXG4gICAgICAgIHZhciBjb250cm9sbGVyID0gdGhpcy5fY2xpZW50Rm9ybXNDb250cm9sbGVyO1xyXG5cclxuICAgICAgICByb3V0ZXIucG9zdChcIi9jbGllbnRGb3Jtcy86X2lkL2NvbnNlbnRcIiwgY29udHJvbGxlci5jb25zZW50Rm9ybSk7XHJcbiAgICAgICAgcm91dGVyLnBvc3QoXCIvY2xpZW50Rm9ybXMvOl9pZC9sZWFybmluZ1N0eWxlXCIsIGNvbnRyb2xsZXIubGVhcm5pbmdTdHlsZUZvcm0pO1xyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvY2xpZW50Rm9ybXMvOl9pZFwiLCBjb250cm9sbGVyLmdldEFsbEZvcm1zQnlJRCk7XHJcbiAgICAgICAgcmV0dXJuIHJvdXRlcjtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5PYmplY3Quc2VhbChDbGllbnRGb3Jtc1JvdXRlcyk7XHJcbmV4cG9ydCA9IENsaWVudEZvcm1zUm91dGVzO1xyXG4iXX0=
