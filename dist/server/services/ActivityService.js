"use strict";
var moment = require("moment");
var sql = require('mssql');
var config = require('../config');
var db = config.db;
var ActivityService = /** @class */ (function () {
    function ActivityService() {
    }
    ActivityService.prototype.reportActivity = function (type, action, result, affectedID, facultyID, info) {
        var CurrentDate = moment().format();
        sql.connect(db)
            .then(function (connection) {
            new sql.Request(connection)
                .query("INSERT INTO SiteActivity VALUES ('" + type + "', '" + affectedID + "', '" + facultyID + "', '" + CurrentDate + "','" + action + "','" + result + "','" + info + "')")
                .then(function (user) {
            }).catch(function (err) {
                console.log("Error - Insert new record into activity table: " + err);
            });
        }).catch(function (err) {
            console.log("DB Connection error - Insert new record into activity table: " + err);
        });
        if ((type === 'student' || type === 'client') && affectedID !== null) {
            sql.connect(db)
                .then(function (connection) {
                new sql.Request(connection)
                    .query("INSERT INTO CaseNotes VALUES ('" + affectedID + "', '" + facultyID + "', '" + info + "', '" + moment().format('YYYY-MM-DD HH:mm:ss a') + "')")
                    .then(function () {
                }).catch(function (err) {
                    console.log("Error - Insert new note " + err);
                });
            }).catch(function (err) {
                console.log("DB Connection error: " + err);
            });
        }
    };
    return ActivityService;
}());
module.exports = ActivityService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvc2VydmljZXMvQWN0aXZpdHlTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQkFBa0M7QUFDbEMsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNsQyxJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO0FBRXJCO0lBQUE7SUErQkEsQ0FBQztJQTdCRCx3Q0FBYyxHQUFkLFVBQWUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxJQUFJO1FBQzlELElBQUksV0FBVyxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3BDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2FBQ1osSUFBSSxDQUFDLFVBQVMsVUFBVTtZQUN2QixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO2lCQUMxQixLQUFLLENBQUMsb0NBQW9DLEdBQUcsSUFBSSxHQUFHLE1BQU0sR0FBRyxVQUFVLEdBQUcsTUFBTSxHQUFHLFNBQVMsR0FBRyxNQUFNLEdBQUcsV0FBVyxHQUFHLEtBQUssR0FBRyxNQUFNLEdBQUcsS0FBSyxHQUFHLE1BQU0sR0FBRyxLQUFLLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztpQkFDMUssSUFBSSxDQUFDLFVBQVMsSUFBSTtZQUNuQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxHQUFHO2dCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLGlEQUFpRCxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVMsR0FBRztZQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLCtEQUErRCxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3JGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBRyxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksSUFBSSxLQUFLLFFBQVEsQ0FBQyxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFDbkUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7aUJBQ1osSUFBSSxDQUFDLFVBQVMsVUFBVTtnQkFDdkIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztxQkFDeEIsS0FBSyxDQUFDLGlDQUFpQyxHQUFHLFVBQVUsR0FBRyxNQUFNLEdBQUcsU0FBUyxHQUFHLE1BQU0sR0FBRyxJQUFJLEdBQUcsTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLElBQUksQ0FBQztxQkFDckosSUFBSSxDQUFDO2dCQUNOLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLEdBQUc7b0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ2hELENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVMsR0FBRztnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUM3QyxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUdELHNCQUFDO0FBQUQsQ0EvQkEsQUErQkMsSUFBQTtBQUNELGlCQUFTLGVBQWUsQ0FBQyIsImZpbGUiOiJzZXJ2aWNlcy9BY3Rpdml0eVNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9tZW50ID0gcmVxdWlyZShcIm1vbWVudFwiKTtcclxudmFyIHNxbCA9IHJlcXVpcmUoJ21zc3FsJyk7XHJcbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcclxuY29uc3QgZGIgPSBjb25maWcuZGI7XHJcblxyXG5jbGFzcyBBY3Rpdml0eVNlcnZpY2Uge1xyXG5cclxucmVwb3J0QWN0aXZpdHkodHlwZSwgYWN0aW9uLCByZXN1bHQsIGFmZmVjdGVkSUQsIGZhY3VsdHlJRCwgaW5mbykge1xyXG4gIHZhciBDdXJyZW50RGF0ZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xyXG4gIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgLnF1ZXJ5KFwiSU5TRVJUIElOVE8gU2l0ZUFjdGl2aXR5IFZBTFVFUyAoJ1wiICsgdHlwZSArIFwiJywgJ1wiICsgYWZmZWN0ZWRJRCArIFwiJywgJ1wiICsgZmFjdWx0eUlEICsgXCInLCAnXCIgKyBDdXJyZW50RGF0ZSArIFwiJywnXCIgKyBhY3Rpb24gKyBcIicsJ1wiICsgcmVzdWx0ICsgXCInLCdcIiArIGluZm8gKyBcIicpXCIpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24odXNlcikge1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEluc2VydCBuZXcgcmVjb3JkIGludG8gYWN0aXZpdHkgdGFibGU6IFwiICsgZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBJbnNlcnQgbmV3IHJlY29yZCBpbnRvIGFjdGl2aXR5IHRhYmxlOiBcIiArIGVycik7XHJcbiAgICB9KTtcclxuICAgIGlmKCh0eXBlID09PSAnc3R1ZGVudCcgfHwgdHlwZSA9PT0gJ2NsaWVudCcpICYmIGFmZmVjdGVkSUQgIT09IG51bGwpIHtcclxuICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgIC5xdWVyeShcIklOU0VSVCBJTlRPIENhc2VOb3RlcyBWQUxVRVMgKCdcIiArIGFmZmVjdGVkSUQgKyBcIicsICdcIiArIGZhY3VsdHlJRCArIFwiJywgJ1wiICsgaW5mbyArIFwiJywgJ1wiICsgbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzIGEnKSArIFwiJylcIilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBJbnNlcnQgbmV3IG5vdGUgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxufVxyXG5leHBvcnQgPSBBY3Rpdml0eVNlcnZpY2U7XHJcbiJdfQ==
