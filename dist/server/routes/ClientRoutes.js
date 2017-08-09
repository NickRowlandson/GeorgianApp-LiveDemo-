"use strict";
var express = require("express");
var ClientController = require("../controllers/ClientController");
var router = express.Router();
var ClientRoutes = (function () {
    function ClientRoutes() {
        this._clientController = new ClientController();
    }
    Object.defineProperty(ClientRoutes.prototype, "routes", {
        get: function () {
            var controller = this._clientController;
            router.get("/clients", controller.retrieve);
            router.post("/clients", controller.create);
            router.post("/clients/:_id", controller.addSuitability);
            router.put("/clients/:_id", controller.update);
            router.get("/clients/:_id", controller.findById);
            router.delete("/clients/:_id", controller.delete);
            router.delete("/clients/:_id/remove", controller.removeFromTable);
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return ClientRoutes;
}());
Object.seal(ClientRoutes);
module.exports = ClientRoutes;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL0NsaWVudFJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQW9DO0FBQ3BDLGtFQUFxRTtBQUVyRSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDOUI7SUFHSTtRQUNJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUNELHNCQUFJLGdDQUFNO2FBQVY7WUFDSSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFFeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDeEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9DLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqRCxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDbEUsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNsQixDQUFDOzs7T0FBQTtJQUdMLG1CQUFDO0FBQUQsQ0FwQkEsQUFvQkMsSUFBQTtBQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDMUIsaUJBQVMsWUFBWSxDQUFDIiwiZmlsZSI6InJvdXRlcy9DbGllbnRSb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xyXG5pbXBvcnQgQ2xpZW50Q29udHJvbGxlciA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9DbGllbnRDb250cm9sbGVyXCIpO1xyXG5cclxudmFyIHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcbmNsYXNzIENsaWVudFJvdXRlcyB7XHJcbiAgICBwcml2YXRlIF9jbGllbnRDb250cm9sbGVyOiBDbGllbnRDb250cm9sbGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9jbGllbnRDb250cm9sbGVyID0gbmV3IENsaWVudENvbnRyb2xsZXIoKTtcclxuICAgIH1cclxuICAgIGdldCByb3V0ZXMgKCkge1xyXG4gICAgICAgIHZhciBjb250cm9sbGVyID0gdGhpcy5fY2xpZW50Q29udHJvbGxlcjtcclxuXHJcbiAgICAgICAgcm91dGVyLmdldChcIi9jbGllbnRzXCIsIGNvbnRyb2xsZXIucmV0cmlldmUpO1xyXG4gICAgICAgIHJvdXRlci5wb3N0KFwiL2NsaWVudHNcIiwgY29udHJvbGxlci5jcmVhdGUpO1xyXG4gICAgICAgIHJvdXRlci5wb3N0KFwiL2NsaWVudHMvOl9pZFwiLCBjb250cm9sbGVyLmFkZFN1aXRhYmlsaXR5KTtcclxuICAgICAgICByb3V0ZXIucHV0KFwiL2NsaWVudHMvOl9pZFwiLCBjb250cm9sbGVyLnVwZGF0ZSk7XHJcbiAgICAgICAgcm91dGVyLmdldChcIi9jbGllbnRzLzpfaWRcIiwgY29udHJvbGxlci5maW5kQnlJZCk7XHJcbiAgICAgICAgcm91dGVyLmRlbGV0ZShcIi9jbGllbnRzLzpfaWRcIiwgY29udHJvbGxlci5kZWxldGUpO1xyXG4gICAgICAgIHJvdXRlci5kZWxldGUoXCIvY2xpZW50cy86X2lkL3JlbW92ZVwiLCBjb250cm9sbGVyLnJlbW92ZUZyb21UYWJsZSk7XHJcbiAgICAgICAgcmV0dXJuIHJvdXRlcjtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5PYmplY3Quc2VhbChDbGllbnRSb3V0ZXMpO1xyXG5leHBvcnQgPSBDbGllbnRSb3V0ZXM7XHJcbiJdfQ==
