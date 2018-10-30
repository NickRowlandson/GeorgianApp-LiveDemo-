"use strict";
const moment = require("moment");
var sql = require('mssql');
var config = require('../config');
const db = config.db;
class ActivityService {
    reportActivity(type, action, result, affectedID, facultyID, info) {
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
    }
}
module.exports = ActivityService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvc2VydmljZXMvQWN0aXZpdHlTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQ0FBa0M7QUFDbEMsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNsQyxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO0FBRXJCO0lBRUEsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSTtRQUM5RCxJQUFJLFdBQVcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNwQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQzthQUNaLElBQUksQ0FBQyxVQUFTLFVBQVU7WUFDdkIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztpQkFDMUIsS0FBSyxDQUFDLG9DQUFvQyxHQUFHLElBQUksR0FBRyxNQUFNLEdBQUcsVUFBVSxHQUFHLE1BQU0sR0FBRyxTQUFTLEdBQUcsTUFBTSxHQUFHLFdBQVcsR0FBRyxLQUFLLEdBQUcsTUFBTSxHQUFHLEtBQUssR0FBRyxNQUFNLEdBQUcsS0FBSyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7aUJBQzFLLElBQUksQ0FBQyxVQUFTLElBQUk7WUFDbkIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVMsR0FBRztnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpREFBaUQsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUN2RSxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLEdBQUc7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrREFBK0QsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNyRixDQUFDLENBQUMsQ0FBQztRQUNILElBQUcsQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLElBQUksS0FBSyxRQUFRLENBQUMsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO1lBQ25FLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2lCQUNaLElBQUksQ0FBQyxVQUFTLFVBQVU7Z0JBQ3ZCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7cUJBQ3hCLEtBQUssQ0FBQyxpQ0FBaUMsR0FBRyxVQUFVLEdBQUcsTUFBTSxHQUFHLFNBQVMsR0FBRyxNQUFNLEdBQUcsSUFBSSxHQUFHLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsR0FBRyxJQUFJLENBQUM7cUJBQ3JKLElBQUksQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxHQUFHO29CQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLEdBQUc7Z0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDN0MsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7Q0FHQTtBQUNELGlCQUFTLGVBQWUsQ0FBQyIsImZpbGUiOiJzZXJ2aWNlcy9BY3Rpdml0eVNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9tZW50ID0gcmVxdWlyZShcIm1vbWVudFwiKTtcclxudmFyIHNxbCA9IHJlcXVpcmUoJ21zc3FsJyk7XHJcbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcclxuY29uc3QgZGIgPSBjb25maWcuZGI7XHJcblxyXG5jbGFzcyBBY3Rpdml0eVNlcnZpY2Uge1xyXG5cclxucmVwb3J0QWN0aXZpdHkodHlwZSwgYWN0aW9uLCByZXN1bHQsIGFmZmVjdGVkSUQsIGZhY3VsdHlJRCwgaW5mbykge1xyXG4gIHZhciBDdXJyZW50RGF0ZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xyXG4gIHNxbC5jb25uZWN0KGRiKVxyXG4gICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICBuZXcgc3FsLlJlcXVlc3QoY29ubmVjdGlvbilcclxuICAgICAgLnF1ZXJ5KFwiSU5TRVJUIElOVE8gU2l0ZUFjdGl2aXR5IFZBTFVFUyAoJ1wiICsgdHlwZSArIFwiJywgJ1wiICsgYWZmZWN0ZWRJRCArIFwiJywgJ1wiICsgZmFjdWx0eUlEICsgXCInLCAnXCIgKyBDdXJyZW50RGF0ZSArIFwiJywnXCIgKyBhY3Rpb24gKyBcIicsJ1wiICsgcmVzdWx0ICsgXCInLCdcIiArIGluZm8gKyBcIicpXCIpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24odXNlcikge1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtIEluc2VydCBuZXcgcmVjb3JkIGludG8gYWN0aXZpdHkgdGFibGU6IFwiICsgZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkRCIENvbm5lY3Rpb24gZXJyb3IgLSBJbnNlcnQgbmV3IHJlY29yZCBpbnRvIGFjdGl2aXR5IHRhYmxlOiBcIiArIGVycik7XHJcbiAgICB9KTtcclxuICAgIGlmKCh0eXBlID09PSAnc3R1ZGVudCcgfHwgdHlwZSA9PT0gJ2NsaWVudCcpICYmIGFmZmVjdGVkSUQgIT09IG51bGwpIHtcclxuICAgICAgc3FsLmNvbm5lY3QoZGIpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oY29ubmVjdGlvbikge1xyXG4gICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KGNvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgIC5xdWVyeShcIklOU0VSVCBJTlRPIENhc2VOb3RlcyBWQUxVRVMgKCdcIiArIGFmZmVjdGVkSUQgKyBcIicsICdcIiArIGZhY3VsdHlJRCArIFwiJywgJ1wiICsgaW5mbyArIFwiJywgJ1wiICsgbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzIGEnKSArIFwiJylcIilcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLSBJbnNlcnQgbmV3IG5vdGUgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiREIgQ29ubmVjdGlvbiBlcnJvcjogXCIgKyBlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxufVxyXG5leHBvcnQgPSBBY3Rpdml0eVNlcnZpY2U7XHJcbiJdfQ==
