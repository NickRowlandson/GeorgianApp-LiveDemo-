"use strict";
var express = require("express");
var ClientController = require("../controllers/ClientController");
var router = express.Router();
var ClientRoutes = /** @class */ (function () {
    function ClientRoutes() {
        this._clientController = new ClientController();
    }
    Object.defineProperty(ClientRoutes.prototype, "routes", {
        get: function () {
            var controller = this._clientController;
            router.get("/clients", controller.retrieve);
            router.post("/clients", controller.create);
            router.post("/clients/:_id", controller.addSuitability);
            router.put("/suitability-update", controller.updateSuitability);
            router.put("/general-info-update", controller.updateGeneralInfo);
            router.put("/bannerCamBool-update", controller.updateBannerCamBool);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL0NsaWVudFJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQW9DO0FBQ3BDLGtFQUFxRTtBQUVyRSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDOUI7SUFHSTtRQUNJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUNELHNCQUFJLGdDQUFNO2FBQVY7WUFDSSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFFeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDeEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNoRSxNQUFNLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDcEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsRCxNQUFNLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNsRSxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDOzs7T0FBQTtJQUdMLG1CQUFDO0FBQUQsQ0F0QkEsQUFzQkMsSUFBQTtBQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDMUIsaUJBQVMsWUFBWSxDQUFDIiwiZmlsZSI6InJvdXRlcy9DbGllbnRSb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xyXG5pbXBvcnQgQ2xpZW50Q29udHJvbGxlciA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9DbGllbnRDb250cm9sbGVyXCIpO1xyXG5cclxudmFyIHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcbmNsYXNzIENsaWVudFJvdXRlcyB7XHJcbiAgICBwcml2YXRlIF9jbGllbnRDb250cm9sbGVyOiBDbGllbnRDb250cm9sbGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9jbGllbnRDb250cm9sbGVyID0gbmV3IENsaWVudENvbnRyb2xsZXIoKTtcclxuICAgIH1cclxuICAgIGdldCByb3V0ZXMgKCkge1xyXG4gICAgICAgIHZhciBjb250cm9sbGVyID0gdGhpcy5fY2xpZW50Q29udHJvbGxlcjtcclxuXHJcbiAgICAgICAgcm91dGVyLmdldChcIi9jbGllbnRzXCIsIGNvbnRyb2xsZXIucmV0cmlldmUpO1xyXG4gICAgICAgIHJvdXRlci5wb3N0KFwiL2NsaWVudHNcIiwgY29udHJvbGxlci5jcmVhdGUpO1xyXG4gICAgICAgIHJvdXRlci5wb3N0KFwiL2NsaWVudHMvOl9pZFwiLCBjb250cm9sbGVyLmFkZFN1aXRhYmlsaXR5KTtcclxuICAgICAgICByb3V0ZXIucHV0KFwiL3N1aXRhYmlsaXR5LXVwZGF0ZVwiLCBjb250cm9sbGVyLnVwZGF0ZVN1aXRhYmlsaXR5KTtcclxuICAgICAgICByb3V0ZXIucHV0KFwiL2dlbmVyYWwtaW5mby11cGRhdGVcIiwgY29udHJvbGxlci51cGRhdGVHZW5lcmFsSW5mbyk7XHJcbiAgICAgICAgcm91dGVyLnB1dChcIi9iYW5uZXJDYW1Cb29sLXVwZGF0ZVwiLCBjb250cm9sbGVyLnVwZGF0ZUJhbm5lckNhbUJvb2wpO1xyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvY2xpZW50cy86X2lkXCIsIGNvbnRyb2xsZXIuZmluZEJ5SWQpO1xyXG4gICAgICAgIHJvdXRlci5kZWxldGUoXCIvY2xpZW50cy86X2lkXCIsIGNvbnRyb2xsZXIuZGVsZXRlKTtcclxuICAgICAgICByb3V0ZXIuZGVsZXRlKFwiL2NsaWVudHMvOl9pZC9yZW1vdmVcIiwgY29udHJvbGxlci5yZW1vdmVGcm9tVGFibGUpO1xyXG4gICAgICAgIHJldHVybiByb3V0ZXI7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuT2JqZWN0LnNlYWwoQ2xpZW50Um91dGVzKTtcclxuZXhwb3J0ID0gQ2xpZW50Um91dGVzO1xyXG4iXX0=
