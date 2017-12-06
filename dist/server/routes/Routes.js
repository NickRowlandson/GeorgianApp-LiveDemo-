"use strict";
var express = require("express");
var StudentRoutes = require("../routes/StudentRoutes");
var StaffRoutes = require("../routes/StaffRoutes");
var AuthRoutes = require("../routes/AuthRoutes");
var ClientRoutes = require("../routes/ClientRoutes");
var ClientFormsRoutes = require("../routes/ClientFormsRoutes");
var CourseRoutes = require("../routes/CourseRoutes");
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
            return app;
        },
        enumerable: true,
        configurable: true
    });
    return Routes;
}());
module.exports = Routes;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL1JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQW9DO0FBR3BDLHVEQUEwRDtBQUMxRCxtREFBc0Q7QUFDdEQsaURBQW9EO0FBQ3BELHFEQUF3RDtBQUN4RCwrREFBa0U7QUFDbEUscURBQXdEO0FBQ3hELElBQUksR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0FBRXBCO0lBQUE7SUFZQSxDQUFDO0lBVkcsc0JBQUksMEJBQU07YUFBVjtZQUVJLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksYUFBYSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2QyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksWUFBWSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxpQkFBaUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksWUFBWSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNmLENBQUM7OztPQUFBO0lBQ0wsYUFBQztBQUFELENBWkEsQUFZQyxJQUFBO0FBQ0QsaUJBQVMsTUFBTSxDQUFDIiwiZmlsZSI6InJvdXRlcy9Sb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcclxuaW1wb3J0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XHJcblxyXG5pbXBvcnQgU3R1ZGVudFJvdXRlcyA9IHJlcXVpcmUoJy4uL3JvdXRlcy9TdHVkZW50Um91dGVzJyk7XHJcbmltcG9ydCBTdGFmZlJvdXRlcyA9IHJlcXVpcmUoJy4uL3JvdXRlcy9TdGFmZlJvdXRlcycpO1xyXG5pbXBvcnQgQXV0aFJvdXRlcyA9IHJlcXVpcmUoJy4uL3JvdXRlcy9BdXRoUm91dGVzJyk7XHJcbmltcG9ydCBDbGllbnRSb3V0ZXMgPSByZXF1aXJlKCcuLi9yb3V0ZXMvQ2xpZW50Um91dGVzJyk7XHJcbmltcG9ydCBDbGllbnRGb3Jtc1JvdXRlcyA9IHJlcXVpcmUoJy4uL3JvdXRlcy9DbGllbnRGb3Jtc1JvdXRlcycpO1xyXG5pbXBvcnQgQ291cnNlUm91dGVzID0gcmVxdWlyZSgnLi4vcm91dGVzL0NvdXJzZVJvdXRlcycpO1xyXG52YXIgYXBwID0gZXhwcmVzcygpO1xyXG5cclxuY2xhc3MgUm91dGVzIHtcclxuXHJcbiAgICBnZXQgcm91dGVzKCkge1xyXG5cclxuICAgICAgICBhcHAudXNlKFwiL1wiLCBuZXcgU3R1ZGVudFJvdXRlcygpLnJvdXRlcyk7XHJcbiAgICAgICAgYXBwLnVzZShcIi9cIiwgbmV3IFN0YWZmUm91dGVzKCkucm91dGVzKTtcclxuICAgICAgICBhcHAudXNlKFwiL1wiLCBuZXcgQXV0aFJvdXRlcygpLnJvdXRlcyk7XHJcbiAgICAgICAgYXBwLnVzZShcIi9cIiwgbmV3IENsaWVudFJvdXRlcygpLnJvdXRlcyk7XHJcbiAgICAgICAgYXBwLnVzZShcIi9cIiwgbmV3IENsaWVudEZvcm1zUm91dGVzKCkucm91dGVzKTtcclxuICAgICAgICBhcHAudXNlKFwiL1wiLCBuZXcgQ291cnNlUm91dGVzKCkucm91dGVzKTtcclxuICAgICAgICByZXR1cm4gYXBwO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCA9IFJvdXRlcztcclxuIl19
