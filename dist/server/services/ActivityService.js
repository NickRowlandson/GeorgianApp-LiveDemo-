"use strict";
var moment = require("moment");
var sql = require('mssql');
var config = require('../config');
var db = config.db;
var ActivityService = /** @class */ (function () {
    function ActivityService() {
    }
    ActivityService.prototype.reportActivity = function (action, result, userID, info) {
        var CurrentDate = moment().format();
        sql.connect(db)
            .then(function (connection) {
            new sql.Request(connection)
                .query("INSERT INTO SiteActivity VALUES ('" + userID + "', '" + CurrentDate + "','" + action + "','" + result + "','" + info + "')")
                .then(function (user) {
            }).catch(function (err) {
                console.log("Error - Insert new record into activity table: " + err);
            });
        }).catch(function (err) {
            console.log("DB Connection error - Insert new record into activity table: " + err);
        });
    };
    return ActivityService;
}());
module.exports = ActivityService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvc2VydmljZXMvQWN0aXZpdHlTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQkFBa0M7QUFDbEMsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNsQyxJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO0FBRXJCO0lBQUE7SUFrQkEsQ0FBQztJQWhCRCx3Q0FBYyxHQUFkLFVBQWUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSTtRQUN6QyxJQUFJLFdBQVcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNwQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQzthQUNaLElBQUksQ0FBQyxVQUFTLFVBQVU7WUFDdkIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztpQkFDMUIsS0FBSyxDQUFDLG9DQUFvQyxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsV0FBVyxHQUFHLEtBQUssR0FBRyxNQUFNLEdBQUcsS0FBSyxHQUFHLE1BQU0sR0FBRyxLQUFLLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztpQkFDakksSUFBSSxDQUFDLFVBQVMsSUFBSTtZQUNuQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxHQUFHO2dCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLGlEQUFpRCxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVMsR0FBRztZQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLCtEQUErRCxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3JGLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUdELHNCQUFDO0FBQUQsQ0FsQkEsQUFrQkMsSUFBQTtBQUNELGlCQUFTLGVBQWUsQ0FBQyIsImZpbGUiOiJzZXJ2aWNlcy9BY3Rpdml0eVNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9tZW50ID0gcmVxdWlyZShcIm1vbWVudFwiKTtcclxudmFyIHNxbCA9IHJlcXVpcmUoJ21zc3FsJyk7XHJcbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcclxuY29uc3QgZGIgPSBjb25maWcuZGI7XHJcblxyXG5jbGFzcyBBY3Rpdml0eVNlcnZpY2Uge1xyXG5cclxucmVwb3J0QWN0aXZpdHkoYWN0aW9uLCByZXN1bHQsIHVzZXJJRCwgaW5mbykge1xyXG4gIHZhciBDdXJyZW50RGF0ZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xyXG4gIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgLnF1ZXJ5KFwiSU5TRVJUIElOVE8gU2l0ZUFjdGl2aXR5IFZBTFVFUyAoJ1wiICsgdXNlcklEICsgXCInLCAnXCIgKyBDdXJyZW50RGF0ZSArIFwiJywnXCIgKyBhY3Rpb24gKyBcIicsJ1wiICsgcmVzdWx0ICsgXCInLCdcIiArIGluZm8gKyBcIicpXCIpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24odXNlcikge1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEluc2VydCBuZXcgcmVjb3JkIGludG8gYWN0aXZpdHkgdGFibGU6IFwiICsgZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBJbnNlcnQgbmV3IHJlY29yZCBpbnRvIGFjdGl2aXR5IHRhYmxlOiBcIiArIGVycik7XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbn1cclxuZXhwb3J0ID0gQWN0aXZpdHlTZXJ2aWNlO1xyXG4iXX0=
