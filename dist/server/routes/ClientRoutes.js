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
            router.post("/submit-assessment-results", controller.submitAssessmentResults);
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return ClientRoutes;
}());
Object.seal(ClientRoutes);
module.exports = ClientRoutes;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL0NsaWVudFJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQW9DO0FBQ3BDLGtFQUFxRTtBQUVyRSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDOUI7SUFHSTtRQUNJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUNELHNCQUFJLGdDQUFNO2FBQVY7WUFDSSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFFeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDeEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNoRSxNQUFNLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDcEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsRCxNQUFNLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQzlFLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7OztPQUFBO0lBR0wsbUJBQUM7QUFBRCxDQXZCQSxBQXVCQyxJQUFBO0FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMxQixpQkFBUyxZQUFZLENBQUMiLCJmaWxlIjoicm91dGVzL0NsaWVudFJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbmltcG9ydCBDbGllbnRDb250cm9sbGVyID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL0NsaWVudENvbnRyb2xsZXJcIik7XHJcblxyXG52YXIgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuY2xhc3MgQ2xpZW50Um91dGVzIHtcclxuICAgIHByaXZhdGUgX2NsaWVudENvbnRyb2xsZXI6IENsaWVudENvbnRyb2xsZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgICAgIHRoaXMuX2NsaWVudENvbnRyb2xsZXIgPSBuZXcgQ2xpZW50Q29udHJvbGxlcigpO1xyXG4gICAgfVxyXG4gICAgZ2V0IHJvdXRlcyAoKSB7XHJcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSB0aGlzLl9jbGllbnRDb250cm9sbGVyO1xyXG5cclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL2NsaWVudHNcIiwgY29udHJvbGxlci5yZXRyaWV2ZSk7XHJcbiAgICAgICAgcm91dGVyLnBvc3QoXCIvY2xpZW50c1wiLCBjb250cm9sbGVyLmNyZWF0ZSk7XHJcbiAgICAgICAgcm91dGVyLnBvc3QoXCIvY2xpZW50cy86X2lkXCIsIGNvbnRyb2xsZXIuYWRkU3VpdGFiaWxpdHkpO1xyXG4gICAgICAgIHJvdXRlci5wdXQoXCIvc3VpdGFiaWxpdHktdXBkYXRlXCIsIGNvbnRyb2xsZXIudXBkYXRlU3VpdGFiaWxpdHkpO1xyXG4gICAgICAgIHJvdXRlci5wdXQoXCIvZ2VuZXJhbC1pbmZvLXVwZGF0ZVwiLCBjb250cm9sbGVyLnVwZGF0ZUdlbmVyYWxJbmZvKTtcclxuICAgICAgICByb3V0ZXIucHV0KFwiL2Jhbm5lckNhbUJvb2wtdXBkYXRlXCIsIGNvbnRyb2xsZXIudXBkYXRlQmFubmVyQ2FtQm9vbCk7XHJcbiAgICAgICAgcm91dGVyLmdldChcIi9jbGllbnRzLzpfaWRcIiwgY29udHJvbGxlci5maW5kQnlJZCk7XHJcbiAgICAgICAgcm91dGVyLmRlbGV0ZShcIi9jbGllbnRzLzpfaWRcIiwgY29udHJvbGxlci5kZWxldGUpO1xyXG4gICAgICAgIHJvdXRlci5kZWxldGUoXCIvY2xpZW50cy86X2lkL3JlbW92ZVwiLCBjb250cm9sbGVyLnJlbW92ZUZyb21UYWJsZSk7XHJcbiAgICAgICAgcm91dGVyLnBvc3QoXCIvc3VibWl0LWFzc2Vzc21lbnQtcmVzdWx0c1wiLCBjb250cm9sbGVyLnN1Ym1pdEFzc2Vzc21lbnRSZXN1bHRzKTtcclxuICAgICAgICByZXR1cm4gcm91dGVyO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbk9iamVjdC5zZWFsKENsaWVudFJvdXRlcyk7XHJcbmV4cG9ydCA9IENsaWVudFJvdXRlcztcclxuIl19
