"use strict";
var express = require("express");
var StudentRoutes = require("../routes/StudentRoutes");
var StaffRoutes = require("../routes/StaffRoutes");
var AuthRoutes = require("../routes/AuthRoutes");
var ClientRoutes = require("../routes/ClientRoutes");
var app = express();
var Routes = (function () {
    function Routes() {
    }
    Object.defineProperty(Routes.prototype, "routes", {
        get: function () {
            app.use("/", new StudentRoutes().routes);
            app.use("/", new StaffRoutes().routes);
            app.use("/", new AuthRoutes().routes);
            app.use("/", new ClientRoutes().routes);
            return app;
        },
        enumerable: true,
        configurable: true
    });
    return Routes;
}());
module.exports = Routes;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL1JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQW9DO0FBR3BDLHVEQUEwRDtBQUMxRCxtREFBc0Q7QUFDdEQsaURBQW9EO0FBQ3BELHFEQUF3RDtBQUV4RCxJQUFJLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUVwQjtJQUFBO0lBV0EsQ0FBQztJQVRHLHNCQUFJLDBCQUFNO2FBQVY7WUFFSSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLGFBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXhDLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDZixDQUFDOzs7T0FBQTtJQUNMLGFBQUM7QUFBRCxDQVhBLEFBV0MsSUFBQTtBQUNELGlCQUFTLE1BQU0sQ0FBQyIsImZpbGUiOiJyb3V0ZXMvUm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XHJcbmltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xyXG5cclxuaW1wb3J0IFN0dWRlbnRSb3V0ZXMgPSByZXF1aXJlKCcuLi9yb3V0ZXMvU3R1ZGVudFJvdXRlcycpO1xyXG5pbXBvcnQgU3RhZmZSb3V0ZXMgPSByZXF1aXJlKCcuLi9yb3V0ZXMvU3RhZmZSb3V0ZXMnKTtcclxuaW1wb3J0IEF1dGhSb3V0ZXMgPSByZXF1aXJlKCcuLi9yb3V0ZXMvQXV0aFJvdXRlcycpO1xyXG5pbXBvcnQgQ2xpZW50Um91dGVzID0gcmVxdWlyZSgnLi4vcm91dGVzL0NsaWVudFJvdXRlcycpO1xyXG5cclxudmFyIGFwcCA9IGV4cHJlc3MoKTtcclxuXHJcbmNsYXNzIFJvdXRlcyB7XHJcblxyXG4gICAgZ2V0IHJvdXRlcygpIHtcclxuXHJcbiAgICAgICAgYXBwLnVzZShcIi9cIiwgbmV3IFN0dWRlbnRSb3V0ZXMoKS5yb3V0ZXMpO1xyXG4gICAgICAgIGFwcC51c2UoXCIvXCIsIG5ldyBTdGFmZlJvdXRlcygpLnJvdXRlcyk7XHJcbiAgICAgICAgYXBwLnVzZShcIi9cIiwgbmV3IEF1dGhSb3V0ZXMoKS5yb3V0ZXMpO1xyXG4gICAgICAgIGFwcC51c2UoXCIvXCIsIG5ldyBDbGllbnRSb3V0ZXMoKS5yb3V0ZXMpO1xyXG5cclxuICAgICAgICByZXR1cm4gYXBwO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCA9IFJvdXRlcztcclxuIl19
