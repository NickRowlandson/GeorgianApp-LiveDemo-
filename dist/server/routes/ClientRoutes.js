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
            router.post("/add-assessment-results", controller.addAssessmentResults);
            router.put("/edit-assessment-results", controller.editAssessmentResults);
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return ClientRoutes;
}());
Object.seal(ClientRoutes);
module.exports = ClientRoutes;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL0NsaWVudFJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQW9DO0FBQ3BDLGtFQUFxRTtBQUVyRSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDOUI7SUFHSTtRQUNJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUNELHNCQUFJLGdDQUFNO2FBQVY7WUFDSSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFFeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDeEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNoRSxNQUFNLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDcEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsRCxNQUFNLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3hFLE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsVUFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDekUsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQzs7O09BQUE7SUFHTCxtQkFBQztBQUFELENBeEJBLEFBd0JDLElBQUE7QUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzFCLGlCQUFTLFlBQVksQ0FBQyIsImZpbGUiOiJyb3V0ZXMvQ2xpZW50Um91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcclxuaW1wb3J0IENsaWVudENvbnRyb2xsZXIgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvQ2xpZW50Q29udHJvbGxlclwiKTtcclxuXHJcbnZhciByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5jbGFzcyBDbGllbnRSb3V0ZXMge1xyXG4gICAgcHJpdmF0ZSBfY2xpZW50Q29udHJvbGxlcjogQ2xpZW50Q29udHJvbGxlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICAgICAgdGhpcy5fY2xpZW50Q29udHJvbGxlciA9IG5ldyBDbGllbnRDb250cm9sbGVyKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgcm91dGVzICgpIHtcclxuICAgICAgICB2YXIgY29udHJvbGxlciA9IHRoaXMuX2NsaWVudENvbnRyb2xsZXI7XHJcblxyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvY2xpZW50c1wiLCBjb250cm9sbGVyLnJldHJpZXZlKTtcclxuICAgICAgICByb3V0ZXIucG9zdChcIi9jbGllbnRzXCIsIGNvbnRyb2xsZXIuY3JlYXRlKTtcclxuICAgICAgICByb3V0ZXIucG9zdChcIi9jbGllbnRzLzpfaWRcIiwgY29udHJvbGxlci5hZGRTdWl0YWJpbGl0eSk7XHJcbiAgICAgICAgcm91dGVyLnB1dChcIi9zdWl0YWJpbGl0eS11cGRhdGVcIiwgY29udHJvbGxlci51cGRhdGVTdWl0YWJpbGl0eSk7XHJcbiAgICAgICAgcm91dGVyLnB1dChcIi9nZW5lcmFsLWluZm8tdXBkYXRlXCIsIGNvbnRyb2xsZXIudXBkYXRlR2VuZXJhbEluZm8pO1xyXG4gICAgICAgIHJvdXRlci5wdXQoXCIvYmFubmVyQ2FtQm9vbC11cGRhdGVcIiwgY29udHJvbGxlci51cGRhdGVCYW5uZXJDYW1Cb29sKTtcclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL2NsaWVudHMvOl9pZFwiLCBjb250cm9sbGVyLmZpbmRCeUlkKTtcclxuICAgICAgICByb3V0ZXIuZGVsZXRlKFwiL2NsaWVudHMvOl9pZFwiLCBjb250cm9sbGVyLmRlbGV0ZSk7XHJcbiAgICAgICAgcm91dGVyLmRlbGV0ZShcIi9jbGllbnRzLzpfaWQvcmVtb3ZlXCIsIGNvbnRyb2xsZXIucmVtb3ZlRnJvbVRhYmxlKTtcclxuICAgICAgICByb3V0ZXIucG9zdChcIi9hZGQtYXNzZXNzbWVudC1yZXN1bHRzXCIsIGNvbnRyb2xsZXIuYWRkQXNzZXNzbWVudFJlc3VsdHMpO1xyXG4gICAgICAgIHJvdXRlci5wdXQoXCIvZWRpdC1hc3Nlc3NtZW50LXJlc3VsdHNcIiwgY29udHJvbGxlci5lZGl0QXNzZXNzbWVudFJlc3VsdHMpO1xyXG4gICAgICAgIHJldHVybiByb3V0ZXI7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuT2JqZWN0LnNlYWwoQ2xpZW50Um91dGVzKTtcclxuZXhwb3J0ID0gQ2xpZW50Um91dGVzO1xyXG4iXX0=
