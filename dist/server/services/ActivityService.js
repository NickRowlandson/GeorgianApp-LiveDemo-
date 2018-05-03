"use strict";
var sql = require('mssql');
var config = require('../config');
var db = config.db;
var ActivityService = /** @class */ (function () {
    function ActivityService() {
    }
    ActivityService.prototype.reportActivity = function (action, result, userID) {
        var timestamp = new Date();
        sql.connect(db)
            .then(function (connection) {
            new sql.Request(connection)
                .query("INSERT INTO ActivityReport VALUES ('" + userID + "', '" + timestamp + "','" + action + "','" + result + "')")
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvc2VydmljZXMvQWN0aXZpdHlTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2xDLElBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7QUFFckI7SUFBQTtJQWtCQSxDQUFDO0lBaEJELHdDQUFjLEdBQWQsVUFBZSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU07UUFDbkMsSUFBSSxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMzQixHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQzthQUNaLElBQUksQ0FBQyxVQUFTLFVBQVU7WUFDdkIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztpQkFDMUIsS0FBSyxDQUFDLHNDQUFzQyxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsU0FBUyxHQUFHLEtBQUssR0FBRyxNQUFNLEdBQUcsS0FBSyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUM7aUJBQ2xILElBQUksQ0FBQyxVQUFTLElBQUk7WUFDbkIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVMsR0FBRztnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpREFBaUQsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUN2RSxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLEdBQUc7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrREFBK0QsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNyRixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHRCxzQkFBQztBQUFELENBbEJBLEFBa0JDLElBQUE7QUFDRCxpQkFBUyxlQUFlLENBQUMiLCJmaWxlIjoic2VydmljZXMvQWN0aXZpdHlTZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHNxbCA9IHJlcXVpcmUoJ21zc3FsJyk7XHJcbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcclxuY29uc3QgZGIgPSBjb25maWcuZGI7XHJcblxyXG5jbGFzcyBBY3Rpdml0eVNlcnZpY2Uge1xyXG5cclxucmVwb3J0QWN0aXZpdHkoYWN0aW9uLCByZXN1bHQsIHVzZXJJRCkge1xyXG4gIHZhciB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpO1xyXG4gIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgLnF1ZXJ5KFwiSU5TRVJUIElOVE8gQWN0aXZpdHlSZXBvcnQgVkFMVUVTICgnXCIgKyB1c2VySUQgKyBcIicsICdcIiArIHRpbWVzdGFtcCArIFwiJywnXCIgKyBhY3Rpb24gKyBcIicsJ1wiICsgcmVzdWx0ICsgXCInKVwiKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHVzZXIpIHtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBJbnNlcnQgbmV3IHJlY29yZCBpbnRvIGFjdGl2aXR5IHRhYmxlOiBcIiArIGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJEQiBDb25uZWN0aW9uIGVycm9yIC0gSW5zZXJ0IG5ldyByZWNvcmQgaW50byBhY3Rpdml0eSB0YWJsZTogXCIgKyBlcnIpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG59XHJcbmV4cG9ydCA9IEFjdGl2aXR5U2VydmljZTtcclxuIl19
