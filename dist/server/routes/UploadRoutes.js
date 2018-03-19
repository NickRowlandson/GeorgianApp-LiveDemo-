"use strict";
var express = require("express");
var multer = require("multer");
var moment = require("moment");
var uploads = __dirname + '/../../../uploads';
var fs = require('fs');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploads);
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, Date.now() + '_' + file.originalname);
    }
});
var upload = multer({ storage: storage });
var router = express.Router();
var UploadRoutes = /** @class */ (function () {
    function UploadRoutes() {
    }
    Object.defineProperty(UploadRoutes.prototype, "routes", {
        get: function () {
            router.get("/getFiles", function (req, res) {
                var filesList = [];
                fs.readdir(uploads, function (err, files) {
                    files.forEach(function (file) {
                        if (file === '.gitkeep') {
                        }
                        else {
                            var fileSplitNameID = file.split(/_(.+)/)[1];
                            var fileSplitName = fileSplitNameID.split(/_(.+)/)[1];
                            var fileSplitID = fileSplitNameID.split(/_(.+)/)[0];
                            var fileSplitDate = file.split(/_(.+)/)[0];
                            var toInt = parseInt(fileSplitDate);
                            var dateObj = new Date(toInt);
                            var formattedDate = moment(dateObj).format('MMMM Do YYYY, h:mm:ss a');
                            //fileSplitDate.date = new Date(fileSplitDate.dateInMillionSeconds);
                            //var fileDate = new Date(fileSplitDate).toISOString();
                            var fileInfo = {
                                filename: fileSplitName,
                                userID: fileSplitID,
                                date: formattedDate,
                                milliseconds: fileSplitDate
                            };
                            filesList.push(fileInfo);
                        }
                    });
                    res.send(filesList);
                });
            });
            router.post("/download/:_file", function (req, res) {
                try {
                    var _filename = req.params._file;
                    var downloadFile;
                    fs.readdir(uploads, function (err, files) {
                        files.forEach(function (file) {
                            if (file === _filename) {
                                downloadFile = file;
                            }
                        });
                        res.setHeader('Content-disposition', 'attachment; filename=' + downloadFile);
                        res.setHeader('Content-type', 'application/pdf');
                        var fileData = fs.readFileSync(__dirname + "/../../../uploads/" + downloadFile);
                        var base64Data = new Buffer(fileData).toString('base64');
                        res.send(base64Data);
                        //res.download(__dirname + "/../../../uploads/" + downloadFile, 'binary');
                    });
                }
                catch (e) {
                    res.send({ status: "error" });
                }
            });
            router.delete("/deleteFile/:_file", function (req, res) {
                var _filename = req.params._file;
                fs.readdir(uploads, function (err, files) {
                    files.forEach(function (file) {
                        if (file === _filename) {
                            fs.unlink(__dirname + "/../../../uploads/" + _filename, function (err) {
                                if (err) {
                                    console.log(err);
                                }
                            });
                            res.send('success');
                        }
                    });
                });
            });
            router.post("/uploadFile", upload.any(), function (req, res, next) {
                res.end('file uploaded');
                // req.files is array of `photos` files
                console.log("studentID: " + req.body.studentID);
            });
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return UploadRoutes;
}());
Object.seal(UploadRoutes);
module.exports = UploadRoutes;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL1VwbG9hZFJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQW9DO0FBQ3BDLCtCQUFrQztBQUNsQywrQkFBa0M7QUFDbEMsSUFBTSxPQUFPLEdBQUcsU0FBUyxHQUFHLG1CQUFtQixDQUFDO0FBQ2hELElBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQy9CLFdBQVcsRUFBRSxVQUFTLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNqQyxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ25CLENBQUM7SUFDRCxRQUFRLEVBQUUsVUFBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2pELENBQUM7Q0FDRixDQUFDLENBQUM7QUFDSCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztBQUV4QyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFOUI7SUFDSTtJQUVBLENBQUM7SUFDRCxzQkFBSSxnQ0FBTTthQUFWO1lBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsVUFBUyxHQUFHLEVBQUUsR0FBRztnQkFDdkMsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO2dCQUNuQixFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFDLEdBQUcsRUFBRSxLQUFLO29CQUM3QixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTt3QkFDaEIs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QUFDO2dCQUN6QyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFDLEdBQUcsRUFBRSxLQUFLO29CQUM3QixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTt3QkFDaEIsRUFBRSxDQUFBLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7NEJBQ3RCLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLG9CQUFvQixHQUFHLFNBQVMsRUFBRSxVQUFVLEdBQUc7Z0NBQ25FLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0NBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDbkIsQ0FBQzs0QkFDSCxDQUFDLENBQUMsQ0FBQzs0QkFDSCxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUN0QixDQUFDO29CQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7Z0JBQy9ELEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3pCLHVDQUF1QztnQkFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQTtZQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbEIsQ0FBQzs7O09BQUE7SUFDTCxtQkFBQztBQUFELENBL0VBLEFBK0VDLElBQUE7QUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzFCLGlCQUFTLFlBQVksQ0FBQyIsImZpbGUiOiJyb3V0ZXMvVXBsb2FkUm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcclxuaW1wb3J0IG11bHRlciA9IHJlcXVpcmUoXCJtdWx0ZXJcIik7XHJcbmltcG9ydCBtb21lbnQgPSByZXF1aXJlKFwibW9tZW50XCIpO1xyXG5jb25zdCB1cGxvYWRzID0gX19kaXJuYW1lICsgJy8uLi8uLi8uLi91cGxvYWRzJztcclxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xyXG5cclxudmFyIHN0b3JhZ2UgPSBtdWx0ZXIuZGlza1N0b3JhZ2Uoe1xyXG4gIGRlc3RpbmF0aW9uOiBmdW5jdGlvbihyZXEsIGZpbGUsIGNiKSB7XHJcbiAgICBjYihudWxsLCB1cGxvYWRzKVxyXG4gIH0sXHJcbiAgZmlsZW5hbWU6IGZ1bmN0aW9uKHJlcSwgZmlsZSwgY2IpIHtcclxuICAgIGNvbnNvbGUubG9nKGZpbGUpO1xyXG4gICAgY2IobnVsbCwgRGF0ZS5ub3coKSArICdfJyArIGZpbGUub3JpZ2luYWxuYW1lKTtcclxuICB9XHJcbn0pO1xyXG52YXIgdXBsb2FkID0gbXVsdGVyKHtzdG9yYWdlOiBzdG9yYWdlfSk7XHJcblxyXG52YXIgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcbmNsYXNzIFVwbG9hZFJvdXRlcyB7XHJcbiAgICBjb25zdHJ1Y3RvciAoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgZ2V0IHJvdXRlcyAoKSB7XHJcbiAgICAgICAgcm91dGVyLmdldChcIi9nZXRGaWxlc1wiLCBmdW5jdGlvbihyZXEsIHJlcykge1xyXG4gICAgICAgICAgdmFyIGZpbGVzTGlzdCA9IFtdO1xyXG4gICAgICAgICAgZnMucmVhZGRpcih1cGxvYWRzLCAoZXJyLCBmaWxlcykgPT4ge1xyXG4gICAgICAgICAgICBmaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xyXG4gICAgICAgICAgICAgIGlmKGZpbGUgPT09ICcuZ2l0a2VlcCcpIHtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpbGVTcGxpdE5hbWVJRCA9IGZpbGUuc3BsaXQoL18oLispLylbMV07XHJcbiAgICAgICAgICAgICAgICB2YXIgZmlsZVNwbGl0TmFtZSA9IGZpbGVTcGxpdE5hbWVJRC5zcGxpdCgvXyguKykvKVsxXTtcclxuICAgICAgICAgICAgICAgIHZhciBmaWxlU3BsaXRJRCA9IGZpbGVTcGxpdE5hbWVJRC5zcGxpdCgvXyguKykvKVswXTtcclxuICAgICAgICAgICAgICAgIHZhciBmaWxlU3BsaXREYXRlID0gZmlsZS5zcGxpdCgvXyguKykvKVswXTtcclxuICAgICAgICAgICAgICAgIHZhciB0b0ludCA9IHBhcnNlSW50KGZpbGVTcGxpdERhdGUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGVPYmogPSBuZXcgRGF0ZSh0b0ludCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZm9ybWF0dGVkRGF0ZSA9IG1vbWVudChkYXRlT2JqKS5mb3JtYXQoJ01NTU0gRG8gWVlZWSwgaDptbTpzcyBhJyk7XHJcbiAgICAgICAgICAgICAgICAvL2ZpbGVTcGxpdERhdGUuZGF0ZSA9IG5ldyBEYXRlKGZpbGVTcGxpdERhdGUuZGF0ZUluTWlsbGlvblNlY29uZHMpO1xyXG4gICAgICAgICAgICAgICAgLy92YXIgZmlsZURhdGUgPSBuZXcgRGF0ZShmaWxlU3BsaXREYXRlKS50b0lTT1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpbGVJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgICBmaWxlbmFtZTogZmlsZVNwbGl0TmFtZSxcclxuICAgICAgICAgICAgICAgICAgdXNlcklEOiBmaWxlU3BsaXRJRCxcclxuICAgICAgICAgICAgICAgICAgZGF0ZTogZm9ybWF0dGVkRGF0ZSxcclxuICAgICAgICAgICAgICAgICAgbWlsbGlzZWNvbmRzOiBmaWxlU3BsaXREYXRlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgZmlsZXNMaXN0LnB1c2goZmlsZUluZm8pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKGZpbGVzTGlzdCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcm91dGVyLnBvc3QoXCIvZG93bmxvYWQvOl9maWxlXCIsIGZ1bmN0aW9uKHJlcSwgcmVzKXtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBfZmlsZW5hbWU6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2ZpbGU7XHJcbiAgICAgICAgICAgIHZhciBkb3dubG9hZEZpbGU7XHJcbiAgICAgICAgICAgIGZzLnJlYWRkaXIodXBsb2FkcywgKGVyciwgZmlsZXMpID0+IHtcclxuICAgICAgICAgICAgICBmaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoZmlsZSA9PT0gX2ZpbGVuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgIGRvd25sb2FkRmlsZSA9IGZpbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgcmVzLnNldEhlYWRlcignQ29udGVudC1kaXNwb3NpdGlvbicsICdhdHRhY2htZW50OyBmaWxlbmFtZT0nICsgZG93bmxvYWRGaWxlKTtcclxuICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vcGRmJyk7XHJcbiAgICAgICAgICAgICAgdmFyIGZpbGVEYXRhID0gZnMucmVhZEZpbGVTeW5jKF9fZGlybmFtZSArIFwiLy4uLy4uLy4uL3VwbG9hZHMvXCIgKyBkb3dubG9hZEZpbGUpO1xyXG4gICAgICAgICAgICAgIHZhciBiYXNlNjREYXRhID0gbmV3IEJ1ZmZlcihmaWxlRGF0YSkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZW5kKGJhc2U2NERhdGEpO1xyXG4gICAgICAgICAgICAgIC8vcmVzLmRvd25sb2FkKF9fZGlybmFtZSArIFwiLy4uLy4uLy4uL3VwbG9hZHMvXCIgKyBkb3dubG9hZEZpbGUsICdiaW5hcnknKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgcmVzLnNlbmQoe3N0YXR1czogXCJlcnJvclwifSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByb3V0ZXIuZGVsZXRlKFwiL2RlbGV0ZUZpbGUvOl9maWxlXCIsIGZ1bmN0aW9uKHJlcSwgcmVzKXtcclxuICAgICAgICAgIHZhciBfZmlsZW5hbWU6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2ZpbGU7XHJcbiAgICAgICAgICBmcy5yZWFkZGlyKHVwbG9hZHMsIChlcnIsIGZpbGVzKSA9PiB7XHJcbiAgICAgICAgICAgIGZpbGVzLmZvckVhY2goZmlsZSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYoZmlsZSA9PT0gX2ZpbGVuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBmcy51bmxpbmsoX19kaXJuYW1lICsgXCIvLi4vLi4vLi4vdXBsb2Fkcy9cIiArIF9maWxlbmFtZSwgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBpZihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKCdzdWNjZXNzJyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByb3V0ZXIucG9zdChcIi91cGxvYWRGaWxlXCIsIHVwbG9hZC5hbnkoKSwgZnVuY3Rpb24gKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgICByZXMuZW5kKCdmaWxlIHVwbG9hZGVkJyk7XHJcbiAgICAgICAgICAvLyByZXEuZmlsZXMgaXMgYXJyYXkgb2YgYHBob3Rvc2AgZmlsZXNcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwic3R1ZGVudElEOiBcIiArIHJlcS5ib2R5LnN0dWRlbnRJRCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcm91dGVyO1xyXG4gICAgfVxyXG59XHJcblxyXG5PYmplY3Quc2VhbChVcGxvYWRSb3V0ZXMpO1xyXG5leHBvcnQgPSBVcGxvYWRSb3V0ZXM7XHJcbiJdfQ==
