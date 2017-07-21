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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL0NsaWVudFJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQW9DO0FBQ3BDLGtFQUFxRTtBQUVyRSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDOUI7SUFHSTtRQUNJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUNELHNCQUFJLGdDQUFNO2FBQVY7WUFDSSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFFeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDL0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsRCxNQUFNLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNsRSxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7OztPQUFBO0lBR0wsbUJBQUM7QUFBRCxDQW5CQSxBQW1CQyxJQUFBO0FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMxQixpQkFBUyxZQUFZLENBQUMiLCJmaWxlIjoicm91dGVzL0NsaWVudFJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbmltcG9ydCBDbGllbnRDb250cm9sbGVyID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL0NsaWVudENvbnRyb2xsZXJcIik7XHJcblxyXG52YXIgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuY2xhc3MgQ2xpZW50Um91dGVzIHtcclxuICAgIHByaXZhdGUgX2NsaWVudENvbnRyb2xsZXI6IENsaWVudENvbnRyb2xsZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgICAgIHRoaXMuX2NsaWVudENvbnRyb2xsZXIgPSBuZXcgQ2xpZW50Q29udHJvbGxlcigpO1xyXG4gICAgfVxyXG4gICAgZ2V0IHJvdXRlcyAoKSB7XHJcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSB0aGlzLl9jbGllbnRDb250cm9sbGVyO1xyXG5cclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL2NsaWVudHNcIiwgY29udHJvbGxlci5yZXRyaWV2ZSk7XHJcbiAgICAgICAgcm91dGVyLnBvc3QoXCIvY2xpZW50c1wiLCBjb250cm9sbGVyLmNyZWF0ZSk7XHJcbiAgICAgICAgcm91dGVyLnB1dChcIi9jbGllbnRzLzpfaWRcIiwgY29udHJvbGxlci51cGRhdGUpO1xyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvY2xpZW50cy86X2lkXCIsIGNvbnRyb2xsZXIuZmluZEJ5SWQpO1xyXG4gICAgICAgIHJvdXRlci5kZWxldGUoXCIvY2xpZW50cy86X2lkXCIsIGNvbnRyb2xsZXIuZGVsZXRlKTtcclxuICAgICAgICByb3V0ZXIuZGVsZXRlKFwiL2NsaWVudHMvOl9pZC9yZW1vdmVcIiwgY29udHJvbGxlci5yZW1vdmVGcm9tVGFibGUpO1xyXG4gICAgICAgIHJldHVybiByb3V0ZXI7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuT2JqZWN0LnNlYWwoQ2xpZW50Um91dGVzKTtcclxuZXhwb3J0ID0gQ2xpZW50Um91dGVzO1xyXG4iXX0=
