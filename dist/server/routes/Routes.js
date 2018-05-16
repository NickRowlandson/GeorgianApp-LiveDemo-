"use strict";
var express = require("express");
var StudentRoutes = require("../routes/StudentRoutes");
var StaffRoutes = require("../routes/StaffRoutes");
var AuthRoutes = require("../routes/AuthRoutes");
var ClientRoutes = require("../routes/ClientRoutes");
var ClientFormsRoutes = require("../routes/ClientFormsRoutes");
var CourseRoutes = require("../routes/CourseRoutes");
var UploadRoutes = require("../routes/UploadRoutes");
var app = express();
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Object.defineProperty(Routes.prototype, "routes", {
        get: function () {
            app.use("/", new StudentRoutes().routes);
            app.use("/", new StaffRoutes().routes);
            app.use("/", new AuthRoutes().routes);
            app.use("/", new ClientRoutes().routes);
            app.use("/", new ClientFormsRoutes().routes);
            app.use("/", new CourseRoutes().routes);
            app.use("/", new UploadRoutes().routes);
            return app;
        },
        enumerable: true,
        configurable: true
    });
    return Routes;
}());
module.exports = Routes;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL1JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQW9DO0FBR3BDLHVEQUEwRDtBQUMxRCxtREFBc0Q7QUFDdEQsaURBQW9EO0FBQ3BELHFEQUF3RDtBQUN4RCwrREFBa0U7QUFDbEUscURBQXdEO0FBQ3hELHFEQUF3RDtBQUV4RCxJQUFJLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUVwQjtJQUFBO0lBYUEsQ0FBQztJQVhHLHNCQUFJLDBCQUFNO2FBQVY7WUFFSSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLGFBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksaUJBQWlCLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksWUFBWSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEMsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDOzs7T0FBQTtJQUNMLGFBQUM7QUFBRCxDQWJBLEFBYUMsSUFBQTtBQUNELGlCQUFTLE1BQU0sQ0FBQyIsImZpbGUiOiJyb3V0ZXMvUm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XHJcbmltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xyXG5cclxuaW1wb3J0IFN0dWRlbnRSb3V0ZXMgPSByZXF1aXJlKCcuLi9yb3V0ZXMvU3R1ZGVudFJvdXRlcycpO1xyXG5pbXBvcnQgU3RhZmZSb3V0ZXMgPSByZXF1aXJlKCcuLi9yb3V0ZXMvU3RhZmZSb3V0ZXMnKTtcclxuaW1wb3J0IEF1dGhSb3V0ZXMgPSByZXF1aXJlKCcuLi9yb3V0ZXMvQXV0aFJvdXRlcycpO1xyXG5pbXBvcnQgQ2xpZW50Um91dGVzID0gcmVxdWlyZSgnLi4vcm91dGVzL0NsaWVudFJvdXRlcycpO1xyXG5pbXBvcnQgQ2xpZW50Rm9ybXNSb3V0ZXMgPSByZXF1aXJlKCcuLi9yb3V0ZXMvQ2xpZW50Rm9ybXNSb3V0ZXMnKTtcclxuaW1wb3J0IENvdXJzZVJvdXRlcyA9IHJlcXVpcmUoJy4uL3JvdXRlcy9Db3Vyc2VSb3V0ZXMnKTtcclxuaW1wb3J0IFVwbG9hZFJvdXRlcyA9IHJlcXVpcmUoJy4uL3JvdXRlcy9VcGxvYWRSb3V0ZXMnKTtcclxuXHJcbnZhciBhcHAgPSBleHByZXNzKCk7XHJcblxyXG5jbGFzcyBSb3V0ZXMge1xyXG5cclxuICAgIGdldCByb3V0ZXMoKSB7XHJcblxyXG4gICAgICAgIGFwcC51c2UoXCIvXCIsIG5ldyBTdHVkZW50Um91dGVzKCkucm91dGVzKTtcclxuICAgICAgICBhcHAudXNlKFwiL1wiLCBuZXcgU3RhZmZSb3V0ZXMoKS5yb3V0ZXMpO1xyXG4gICAgICAgIGFwcC51c2UoXCIvXCIsIG5ldyBBdXRoUm91dGVzKCkucm91dGVzKTtcclxuICAgICAgICBhcHAudXNlKFwiL1wiLCBuZXcgQ2xpZW50Um91dGVzKCkucm91dGVzKTtcclxuICAgICAgICBhcHAudXNlKFwiL1wiLCBuZXcgQ2xpZW50Rm9ybXNSb3V0ZXMoKS5yb3V0ZXMpO1xyXG4gICAgICAgIGFwcC51c2UoXCIvXCIsIG5ldyBDb3Vyc2VSb3V0ZXMoKS5yb3V0ZXMpO1xyXG4gICAgICAgIGFwcC51c2UoXCIvXCIsIG5ldyBVcGxvYWRSb3V0ZXMoKS5yb3V0ZXMpO1xyXG4gICAgICAgIHJldHVybiBhcHA7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0ID0gUm91dGVzO1xyXG4iXX0=
