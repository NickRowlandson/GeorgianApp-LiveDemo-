"use strict";
const express = require("express");
const StudentRoutes = require("../routes/StudentRoutes");
const StaffRoutes = require("../routes/StaffRoutes");
const AuthRoutes = require("../routes/AuthRoutes");
const ClientRoutes = require("../routes/ClientRoutes");
const ClientFormsRoutes = require("../routes/ClientFormsRoutes");
const CourseRoutes = require("../routes/CourseRoutes");
const UploadRoutes = require("../routes/UploadRoutes");
var app = express();
class Routes {
    get routes() {
        app.use("/", new StudentRoutes().routes);
        app.use("/", new StaffRoutes().routes);
        app.use("/", new AuthRoutes().routes);
        app.use("/", new ClientRoutes().routes);
        app.use("/", new ClientFormsRoutes().routes);
        app.use("/", new CourseRoutes().routes);
        app.use("/", new UploadRoutes().routes);
        return app;
    }
}
module.exports = Routes;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL1JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsbUNBQW9DO0FBR3BDLHlEQUEwRDtBQUMxRCxxREFBc0Q7QUFDdEQsbURBQW9EO0FBQ3BELHVEQUF3RDtBQUN4RCxpRUFBa0U7QUFDbEUsdURBQXdEO0FBQ3hELHVEQUF3RDtBQUV4RCxJQUFJLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUVwQjtJQUVJLElBQUksTUFBTTtRQUVOLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksYUFBYSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksWUFBWSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxpQkFBaUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksWUFBWSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QyxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7Q0FDSjtBQUNELGlCQUFTLE1BQU0sQ0FBQyIsImZpbGUiOiJyb3V0ZXMvUm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XHJcbmltcG9ydCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xyXG5cclxuaW1wb3J0IFN0dWRlbnRSb3V0ZXMgPSByZXF1aXJlKCcuLi9yb3V0ZXMvU3R1ZGVudFJvdXRlcycpO1xyXG5pbXBvcnQgU3RhZmZSb3V0ZXMgPSByZXF1aXJlKCcuLi9yb3V0ZXMvU3RhZmZSb3V0ZXMnKTtcclxuaW1wb3J0IEF1dGhSb3V0ZXMgPSByZXF1aXJlKCcuLi9yb3V0ZXMvQXV0aFJvdXRlcycpO1xyXG5pbXBvcnQgQ2xpZW50Um91dGVzID0gcmVxdWlyZSgnLi4vcm91dGVzL0NsaWVudFJvdXRlcycpO1xyXG5pbXBvcnQgQ2xpZW50Rm9ybXNSb3V0ZXMgPSByZXF1aXJlKCcuLi9yb3V0ZXMvQ2xpZW50Rm9ybXNSb3V0ZXMnKTtcclxuaW1wb3J0IENvdXJzZVJvdXRlcyA9IHJlcXVpcmUoJy4uL3JvdXRlcy9Db3Vyc2VSb3V0ZXMnKTtcclxuaW1wb3J0IFVwbG9hZFJvdXRlcyA9IHJlcXVpcmUoJy4uL3JvdXRlcy9VcGxvYWRSb3V0ZXMnKTtcclxuXHJcbnZhciBhcHAgPSBleHByZXNzKCk7XHJcblxyXG5jbGFzcyBSb3V0ZXMge1xyXG5cclxuICAgIGdldCByb3V0ZXMoKSB7XHJcblxyXG4gICAgICAgIGFwcC51c2UoXCIvXCIsIG5ldyBTdHVkZW50Um91dGVzKCkucm91dGVzKTtcclxuICAgICAgICBhcHAudXNlKFwiL1wiLCBuZXcgU3RhZmZSb3V0ZXMoKS5yb3V0ZXMpO1xyXG4gICAgICAgIGFwcC51c2UoXCIvXCIsIG5ldyBBdXRoUm91dGVzKCkucm91dGVzKTtcclxuICAgICAgICBhcHAudXNlKFwiL1wiLCBuZXcgQ2xpZW50Um91dGVzKCkucm91dGVzKTtcclxuICAgICAgICBhcHAudXNlKFwiL1wiLCBuZXcgQ2xpZW50Rm9ybXNSb3V0ZXMoKS5yb3V0ZXMpO1xyXG4gICAgICAgIGFwcC51c2UoXCIvXCIsIG5ldyBDb3Vyc2VSb3V0ZXMoKS5yb3V0ZXMpO1xyXG4gICAgICAgIGFwcC51c2UoXCIvXCIsIG5ldyBVcGxvYWRSb3V0ZXMoKS5yb3V0ZXMpO1xyXG4gICAgICAgIHJldHVybiBhcHA7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0ID0gUm91dGVzO1xyXG4iXX0=
