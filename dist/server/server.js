"use strict";
/// <reference path="../typings/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var BaseRoutes = require("./routes/Routes");
var bodyParser = require("body-parser");
var path = require("path");
var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || 'production';
var app = express();
exports.app = app;
app.set('port', port);
app.use('/app', express.static(path.resolve(__dirname, '../client/app')));
app.use('/libs', express.static(path.resolve(__dirname, '../client/libs')));
// for system.js to work. Can be removed if bundling.
app.use(express.static(path.resolve(__dirname, '../client')));
app.use(express.static(path.resolve(__dirname, '../../node_modules')));
app.use(bodyParser.json());
app.use('/api', new BaseRoutes().routes);
var renderIndex = function (req, res) {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
};
app.get('/*', renderIndex);
if (env === 'developement') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        console.log(err);
        res.json({
            error: err,
            message: err.message
        });
    });
}
app.post('/populate', function (req, res, next) {
    console.log("ready");
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    next(err);
});
// production error handler
// no stacktrace leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4Q0FBOEM7O0FBRTlDLGlDQUFvQztBQUNwQyw0Q0FBK0M7QUFDL0Msd0NBQTJDO0FBSTNDLDJCQUE4QjtBQUM5QixJQUFJLElBQUksR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFDNUMsSUFBSSxHQUFHLEdBQVUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksY0FBYyxDQUFDO0FBRXhELElBQUksR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0FBbURYLGtCQUFHO0FBakRaLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRXRCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFNUUscURBQXFEO0FBQ3JELEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXZFLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUV6QyxJQUFJLFdBQVcsR0FBRyxVQUFDLEdBQW9CLEVBQUUsR0FBcUI7SUFDMUQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7QUFDbEUsQ0FBQyxDQUFBO0FBRUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFFM0IsRUFBRSxDQUFBLENBQUMsR0FBRyxLQUFLLGNBQWMsQ0FBQyxDQUFBLENBQUM7SUFDdkIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFTLEdBQUcsRUFBRSxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7UUFDekYsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNMLEtBQUssRUFBRSxHQUFHO1lBQ1YsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPO1NBQ3ZCLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFVBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO0lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkIsQ0FBQyxDQUFDLENBQUM7QUFFSCx5Q0FBeUM7QUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFTLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUFJO0lBQzlELElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNkLENBQUMsQ0FBQyxDQUFDO0FBRUgsMkJBQTJCO0FBQzNCLCtCQUErQjtBQUMvQixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVMsR0FBUSxFQUFFLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQjtJQUM5RixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUM7SUFDOUIsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNMLEtBQUssRUFBRSxFQUFFO1FBQ1QsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPO0tBQ3ZCLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL2luZGV4LmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XHJcbmltcG9ydCBCYXNlUm91dGVzID0gcmVxdWlyZShcIi4vcm91dGVzL1JvdXRlc1wiKTtcclxuaW1wb3J0IGJvZHlQYXJzZXIgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7XHJcbmltcG9ydCBjcm9uID0gcmVxdWlyZSgnbm9kZS1jcm9uJyk7XHJcbmltcG9ydCBub2RlbWFpbGVyID0gcmVxdWlyZSgnbm9kZW1haWxlcicpO1xyXG5cclxuaW1wb3J0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XHJcbnZhciBwb3J0OiBudW1iZXIgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDA7XHJcbnZhciBlbnY6c3RyaW5nID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgfHwgJ2RldmVsb3BlbWVudCc7XHJcblxyXG52YXIgYXBwID0gZXhwcmVzcygpO1xyXG5cclxuYXBwLnNldCgncG9ydCcsIHBvcnQpO1xyXG5cclxuYXBwLnVzZSgnL2FwcCcsIGV4cHJlc3Muc3RhdGljKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9jbGllbnQvYXBwJykpKTtcclxuYXBwLnVzZSgnL2xpYnMnLCBleHByZXNzLnN0YXRpYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vY2xpZW50L2xpYnMnKSkpO1xyXG5cclxuLy8gZm9yIHN5c3RlbS5qcyB0byB3b3JrLiBDYW4gYmUgcmVtb3ZlZCBpZiBidW5kbGluZy5cclxuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vY2xpZW50JykpKTtcclxuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vbm9kZV9tb2R1bGVzJykpKTtcclxuXHJcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xyXG5hcHAudXNlKCcvYXBpJywgbmV3IEJhc2VSb3V0ZXMoKS5yb3V0ZXMpO1xyXG5cclxudmFyIHJlbmRlckluZGV4ID0gKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpID0+IHtcclxuICAgIHJlcy5zZW5kRmlsZShwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vY2xpZW50L2luZGV4Lmh0bWwnKSk7XHJcbn1cclxuXHJcbmFwcC5nZXQoJy8qJywgcmVuZGVySW5kZXgpO1xyXG5cclxuaWYoZW52ID09PSAnZGV2ZWxvcGVtZW50Jyl7XHJcbiAgICBhcHAudXNlKGZ1bmN0aW9uKGVyciwgcmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSwgbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb24pIHtcclxuICAgICAgICByZXMuc3RhdHVzKGVyci5zdGF0dXMgfHwgNTAwKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIHJlcy5qc29uKHtcclxuICAgICAgICAgICAgZXJyb3I6IGVycixcclxuICAgICAgICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2VcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5hcHAucG9zdCgnL3BvcHVsYXRlJywgZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcclxuICBjb25zb2xlLmxvZyhcInJlYWR5XCIpO1xyXG59KTtcclxuXHJcbi8vIGNhdGNoIDQwNCBhbmQgZm9yd2FyZCB0byBlcnJvciBoYW5kbGVyXHJcbmFwcC51c2UoZnVuY3Rpb24ocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSwgbmV4dCkge1xyXG4gICAgbGV0IGVyciA9IG5ldyBFcnJvcihcIk5vdCBGb3VuZFwiKTtcclxuICAgIG5leHQoZXJyKTtcclxufSk7XHJcblxyXG4vLyBwcm9kdWN0aW9uIGVycm9yIGhhbmRsZXJcclxuLy8gbm8gc3RhY2t0cmFjZSBsZWFrZWQgdG8gdXNlclxyXG5hcHAudXNlKGZ1bmN0aW9uKGVycjogYW55LCByZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikge1xyXG4gICAgcmVzLnN0YXR1cyhlcnIuc3RhdHVzIHx8IDUwMCk7XHJcbiAgICByZXMuanNvbih7XHJcbiAgICAgICAgZXJyb3I6IHt9LFxyXG4gICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlXHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5leHBvcnQgeyBhcHAgfVxyXG4iXX0=
