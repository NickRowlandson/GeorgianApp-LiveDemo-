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
            router.get("/clientForms/consent/:_id", controller.getConsentById);
            router.get("/clientForms/learningStyle/:_id", controller.getLearningStyleById);
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return ClientFormsRoutes;
}());
Object.seal(ClientFormsRoutes);
module.exports = ClientFormsRoutes;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL0NsaWVudEZvcm1zUm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQ0FBb0M7QUFDcEMsNEVBQStFO0FBRS9FLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUM5QjtJQUdJO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQztJQUM5RCxDQUFDO0lBQ0Qsc0JBQUkscUNBQU07YUFBVjtZQUNJLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztZQUU3QyxNQUFNLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNqRSxNQUFNLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzdFLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzVELE1BQU0sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEVBQUUsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDL0UsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNsQixDQUFDOzs7T0FBQTtJQUdMLHdCQUFDO0FBQUQsQ0FsQkEsQUFrQkMsSUFBQTtBQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUMvQixpQkFBUyxpQkFBaUIsQ0FBQyIsImZpbGUiOiJyb3V0ZXMvQ2xpZW50Rm9ybXNSb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xyXG5pbXBvcnQgQ2xpZW50Rm9ybXNDb250cm9sbGVyID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL0NsaWVudEZvcm1zQ29udHJvbGxlclwiKTtcclxuXHJcbnZhciByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5jbGFzcyBDbGllbnRGb3Jtc1JvdXRlcyB7XHJcbiAgICBwcml2YXRlIF9jbGllbnRGb3Jtc0NvbnRyb2xsZXI6IENsaWVudEZvcm1zQ29udHJvbGxlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICAgICAgdGhpcy5fY2xpZW50Rm9ybXNDb250cm9sbGVyID0gbmV3IENsaWVudEZvcm1zQ29udHJvbGxlcigpO1xyXG4gICAgfVxyXG4gICAgZ2V0IHJvdXRlcyAoKSB7XHJcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSB0aGlzLl9jbGllbnRGb3Jtc0NvbnRyb2xsZXI7XHJcblxyXG4gICAgICAgIHJvdXRlci5wb3N0KFwiL2NsaWVudEZvcm1zLzpfaWQvY29uc2VudFwiLCBjb250cm9sbGVyLmNvbnNlbnRGb3JtKTtcclxuICAgICAgICByb3V0ZXIucG9zdChcIi9jbGllbnRGb3Jtcy86X2lkL2xlYXJuaW5nU3R5bGVcIiwgY29udHJvbGxlci5sZWFybmluZ1N0eWxlRm9ybSk7XHJcbiAgICAgICAgcm91dGVyLmdldChcIi9jbGllbnRGb3Jtcy86X2lkXCIsIGNvbnRyb2xsZXIuZ2V0QWxsRm9ybXNCeUlEKTtcclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL2NsaWVudEZvcm1zL2NvbnNlbnQvOl9pZFwiLCBjb250cm9sbGVyLmdldENvbnNlbnRCeUlkKTtcclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL2NsaWVudEZvcm1zL2xlYXJuaW5nU3R5bGUvOl9pZFwiLCBjb250cm9sbGVyLmdldExlYXJuaW5nU3R5bGVCeUlkKTtcclxuICAgICAgICByZXR1cm4gcm91dGVyO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbk9iamVjdC5zZWFsKENsaWVudEZvcm1zUm91dGVzKTtcclxuZXhwb3J0ID0gQ2xpZW50Rm9ybXNSb3V0ZXM7XHJcbiJdfQ==
