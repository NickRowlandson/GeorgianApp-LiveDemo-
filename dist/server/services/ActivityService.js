"use strict";
var sql = require('mssql');
var config = require('../config');
var db = config.db;
var ActivityService = /** @class */ (function () {
    function ActivityService() {
    }
    ActivityService.prototype.reportActivity = function (action, result, userID, info) {
        var timestamp = new Date();
        sql.connect(db)
            .then(function (connection) {
            new sql.Request(connection)
                .query("INSERT INTO ActivityReport VALUES ('" + userID + "', '" + timestamp + "','" + action + "','" + result + "','" + info + "')")
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvc2VydmljZXMvQWN0aXZpdHlTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2xDLElBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7QUFFckI7SUFBQTtJQWtCQSxDQUFDO0lBaEJELHdDQUFjLEdBQWQsVUFBZSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJO1FBQ3pDLElBQUksU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDM0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7YUFDWixJQUFJLENBQUMsVUFBUyxVQUFVO1lBQ3ZCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7aUJBQzFCLEtBQUssQ0FBQyxzQ0FBc0MsR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLFNBQVMsR0FBRyxLQUFLLEdBQUcsTUFBTSxHQUFHLEtBQUssR0FBRyxNQUFNLEdBQUcsS0FBSyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7aUJBQ2pJLElBQUksQ0FBQyxVQUFTLElBQUk7WUFDbkIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVMsR0FBRztnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpREFBaUQsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUN2RSxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLEdBQUc7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrREFBK0QsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNyRixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHRCxzQkFBQztBQUFELENBbEJBLEFBa0JDLElBQUE7QUFDRCxpQkFBUyxlQUFlLENBQUMiLCJmaWxlIjoic2VydmljZXMvQWN0aXZpdHlTZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHNxbCA9IHJlcXVpcmUoJ21zc3FsJyk7XHJcbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcclxuY29uc3QgZGIgPSBjb25maWcuZGI7XHJcblxyXG5jbGFzcyBBY3Rpdml0eVNlcnZpY2Uge1xyXG5cclxucmVwb3J0QWN0aXZpdHkoYWN0aW9uLCByZXN1bHQsIHVzZXJJRCwgaW5mbykge1xyXG4gIHZhciB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpO1xyXG4gIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgLnF1ZXJ5KFwiSU5TRVJUIElOVE8gQWN0aXZpdHlSZXBvcnQgVkFMVUVTICgnXCIgKyB1c2VySUQgKyBcIicsICdcIiArIHRpbWVzdGFtcCArIFwiJywnXCIgKyBhY3Rpb24gKyBcIicsJ1wiICsgcmVzdWx0ICsgXCInLCdcIiArIGluZm8gKyBcIicpXCIpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24odXNlcikge1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEluc2VydCBuZXcgcmVjb3JkIGludG8gYWN0aXZpdHkgdGFibGU6IFwiICsgZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBJbnNlcnQgbmV3IHJlY29yZCBpbnRvIGFjdGl2aXR5IHRhYmxlOiBcIiArIGVycik7XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbn1cclxuZXhwb3J0ID0gQWN0aXZpdHlTZXJ2aWNlO1xyXG4iXX0=
