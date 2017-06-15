"use strict";
var express = require("express");
var ClientFormsController = require("../controllers/ClientFormsController");
var router = express.Router();
var ClientFormsRoutes = (function () {
    function ClientFormsRoutes() {
        this._clientFormsController = new ClientFormsController();
    }
    Object.defineProperty(ClientFormsRoutes.prototype, "routes", {
        get: function () {
            var controller = this._clientFormsController;
            router.post("/clientForms/:_id/consent", controller.consentForm);
            router.post("/clientForms/:_id/learningStyle", controller.learningStyleForm);
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return ClientFormsRoutes;
}());
Object.seal(ClientFormsRoutes);
module.exports = ClientFormsRoutes;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL0NsaWVudEZvcm1zUm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQ0FBb0M7QUFDcEMsNEVBQStFO0FBRS9FLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUM5QjtJQUdJO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQztJQUM5RCxDQUFDO0lBQ0Qsc0JBQUkscUNBQU07YUFBVjtZQUNJLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztZQUU3QyxNQUFNLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNqRSxNQUFNLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzdFLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbEIsQ0FBQzs7O09BQUE7SUFHTCx3QkFBQztBQUFELENBZkEsQUFlQyxJQUFBO0FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQy9CLGlCQUFTLGlCQUFpQixDQUFDIiwiZmlsZSI6InJvdXRlcy9DbGllbnRGb3Jtc1JvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbmltcG9ydCBDbGllbnRGb3Jtc0NvbnRyb2xsZXIgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvQ2xpZW50Rm9ybXNDb250cm9sbGVyXCIpO1xyXG5cclxudmFyIHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcbmNsYXNzIENsaWVudEZvcm1zUm91dGVzIHtcclxuICAgIHByaXZhdGUgX2NsaWVudEZvcm1zQ29udHJvbGxlcjogQ2xpZW50Rm9ybXNDb250cm9sbGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9jbGllbnRGb3Jtc0NvbnRyb2xsZXIgPSBuZXcgQ2xpZW50Rm9ybXNDb250cm9sbGVyKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgcm91dGVzICgpIHtcclxuICAgICAgICB2YXIgY29udHJvbGxlciA9IHRoaXMuX2NsaWVudEZvcm1zQ29udHJvbGxlcjtcclxuXHJcbiAgICAgICAgcm91dGVyLnBvc3QoXCIvY2xpZW50Rm9ybXMvOl9pZC9jb25zZW50XCIsIGNvbnRyb2xsZXIuY29uc2VudEZvcm0pO1xyXG4gICAgICAgIHJvdXRlci5wb3N0KFwiL2NsaWVudEZvcm1zLzpfaWQvbGVhcm5pbmdTdHlsZVwiLCBjb250cm9sbGVyLmxlYXJuaW5nU3R5bGVGb3JtKTtcclxuICAgICAgICByZXR1cm4gcm91dGVyO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbk9iamVjdC5zZWFsKENsaWVudEZvcm1zUm91dGVzKTtcclxuZXhwb3J0ID0gQ2xpZW50Rm9ybXNSb3V0ZXM7XHJcbiJdfQ==
