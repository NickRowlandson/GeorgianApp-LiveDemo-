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
                            var fileSplitName = file.split(/_(.+)/)[1];
                            var fileSplitDate = file.split(/_(.+)/)[0];
                            var toInt = parseInt(fileSplitDate);
                            var dateObj = new Date(toInt);
                            var formattedDate = moment(dateObj).format('MMMM Do YYYY, h:mm:ss a');
                            //fileSplitDate.date = new Date(fileSplitDate.dateInMillionSeconds);
                            //var fileDate = new Date(fileSplitDate).toISOString();
                            var fileInfo = {
                                filename: fileSplitName,
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
                // req.body will contain the text fields, if there were any
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL1VwbG9hZFJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQW9DO0FBQ3BDLCtCQUFrQztBQUNsQywrQkFBa0M7QUFDbEMsSUFBTSxPQUFPLEdBQUcsU0FBUyxHQUFHLG1CQUFtQixDQUFDO0FBQ2hELElBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQy9CLFdBQVcsRUFBRSxVQUFTLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNqQyxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ25CLENBQUM7SUFDRCxRQUFRLEVBQUUsVUFBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDOUIsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNqRCxDQUFDO0NBQ0YsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7QUFFeEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRTlCO0lBQ0k7SUFFQSxDQUFDO0lBQ0Qsc0JBQUksZ0NBQU07YUFBVjtZQUNJLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQVMsR0FBRyxFQUFFLEdBQUc7Z0JBQ3ZDLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztnQkFDbkIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBQyxHQUFHLEVBQUUsS0FBSztvQkFDN0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7d0JBQ2hCLEVBQUUsQ0FBQSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsQ0FBQyxD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QUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUN0QixDQUFDO29CQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7Z0JBQy9ELEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3pCLHVDQUF1QztnQkFDdkMsMkRBQTJEO1lBQzdELENBQUMsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNsQixDQUFDOzs7T0FBQTtJQUNMLG1CQUFDO0FBQUQsQ0F2RUEsQUF1RUMsSUFBQTtBQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDMUIsaUJBQVMsWUFBWSxDQUFDIiwiZmlsZSI6InJvdXRlcy9VcGxvYWRSb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xyXG5pbXBvcnQgbXVsdGVyID0gcmVxdWlyZShcIm11bHRlclwiKTtcclxuaW1wb3J0IG1vbWVudCA9IHJlcXVpcmUoXCJtb21lbnRcIik7XHJcbmNvbnN0IHVwbG9hZHMgPSBfX2Rpcm5hbWUgKyAnLy4uLy4uLy4uL3VwbG9hZHMnO1xyXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XHJcblxyXG52YXIgc3RvcmFnZSA9IG11bHRlci5kaXNrU3RvcmFnZSh7XHJcbiAgZGVzdGluYXRpb246IGZ1bmN0aW9uKHJlcSwgZmlsZSwgY2IpIHtcclxuICAgIGNiKG51bGwsIHVwbG9hZHMpXHJcbiAgfSxcclxuICBmaWxlbmFtZTogZnVuY3Rpb24ocmVxLCBmaWxlLCBjYikge1xyXG4gICAgY2IobnVsbCwgRGF0ZS5ub3coKSArICdfJyArIGZpbGUub3JpZ2luYWxuYW1lKTtcclxuICB9XHJcbn0pO1xyXG52YXIgdXBsb2FkID0gbXVsdGVyKHtzdG9yYWdlOiBzdG9yYWdlfSk7XHJcblxyXG52YXIgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcbmNsYXNzIFVwbG9hZFJvdXRlcyB7XHJcbiAgICBjb25zdHJ1Y3RvciAoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgZ2V0IHJvdXRlcyAoKSB7XHJcbiAgICAgICAgcm91dGVyLmdldChcIi9nZXRGaWxlc1wiLCBmdW5jdGlvbihyZXEsIHJlcykge1xyXG4gICAgICAgICAgdmFyIGZpbGVzTGlzdCA9IFtdO1xyXG4gICAgICAgICAgZnMucmVhZGRpcih1cGxvYWRzLCAoZXJyLCBmaWxlcykgPT4ge1xyXG4gICAgICAgICAgICBmaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xyXG4gICAgICAgICAgICAgIGlmKGZpbGUgPT09ICcuZ2l0a2VlcCcpIHtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpbGVTcGxpdE5hbWUgPSBmaWxlLnNwbGl0KC9fKC4rKS8pWzFdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpbGVTcGxpdERhdGUgPSBmaWxlLnNwbGl0KC9fKC4rKS8pWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvSW50ID0gcGFyc2VJbnQoZmlsZVNwbGl0RGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZU9iaiA9IG5ldyBEYXRlKHRvSW50KTtcclxuICAgICAgICAgICAgICAgIHZhciBmb3JtYXR0ZWREYXRlID0gbW9tZW50KGRhdGVPYmopLmZvcm1hdCgnTU1NTSBEbyBZWVlZLCBoOm1tOnNzIGEnKTtcclxuICAgICAgICAgICAgICAgIC8vZmlsZVNwbGl0RGF0ZS5kYXRlID0gbmV3IERhdGUoZmlsZVNwbGl0RGF0ZS5kYXRlSW5NaWxsaW9uU2Vjb25kcyk7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBmaWxlRGF0ZSA9IG5ldyBEYXRlKGZpbGVTcGxpdERhdGUpLnRvSVNPU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmlsZUluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBmaWxlU3BsaXROYW1lLFxyXG4gICAgICAgICAgICAgICAgICBkYXRlOiBmb3JtYXR0ZWREYXRlLFxyXG4gICAgICAgICAgICAgICAgICBtaWxsaXNlY29uZHM6IGZpbGVTcGxpdERhdGVcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBmaWxlc0xpc3QucHVzaChmaWxlSW5mbyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmVzLnNlbmQoZmlsZXNMaXN0KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByb3V0ZXIucG9zdChcIi9kb3dubG9hZC86X2ZpbGVcIiwgZnVuY3Rpb24ocmVxLCByZXMpe1xyXG4gICAgICAgICAgdmFyIF9maWxlbmFtZTogc3RyaW5nID0gcmVxLnBhcmFtcy5fZmlsZTtcclxuICAgICAgICAgIHZhciBkb3dubG9hZEZpbGU7XHJcbiAgICAgICAgICBmcy5yZWFkZGlyKHVwbG9hZHMsIChlcnIsIGZpbGVzKSA9PiB7XHJcbiAgICAgICAgICAgIGZpbGVzLmZvckVhY2goZmlsZSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYoZmlsZSA9PT0gX2ZpbGVuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBkb3dubG9hZEZpbGUgPSBmaWxlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtZGlzcG9zaXRpb24nLCAnYXR0YWNobWVudDsgZmlsZW5hbWU9JyArIGRvd25sb2FkRmlsZSk7XHJcbiAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9wZGYnKTtcclxuICAgICAgICAgICAgdmFyIGZpbGVEYXRhID0gZnMucmVhZEZpbGVTeW5jKF9fZGlybmFtZSArIFwiLy4uLy4uLy4uL3VwbG9hZHMvXCIgKyBkb3dubG9hZEZpbGUpO1xyXG4gICAgICAgICAgICB2YXIgYmFzZTY0RGF0YSA9IG5ldyBCdWZmZXIoZmlsZURhdGEpLnRvU3RyaW5nKCdiYXNlNjQnKTtcclxuICAgICAgICAgICAgcmVzLnNlbmQoYmFzZTY0RGF0YSk7XHJcbiAgICAgICAgICAgIC8vcmVzLmRvd25sb2FkKF9fZGlybmFtZSArIFwiLy4uLy4uLy4uL3VwbG9hZHMvXCIgKyBkb3dubG9hZEZpbGUsICdiaW5hcnknKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByb3V0ZXIuZGVsZXRlKFwiL2RlbGV0ZUZpbGUvOl9maWxlXCIsIGZ1bmN0aW9uKHJlcSwgcmVzKXtcclxuICAgICAgICAgIHZhciBfZmlsZW5hbWU6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2ZpbGU7XHJcbiAgICAgICAgICBmcy5yZWFkZGlyKHVwbG9hZHMsIChlcnIsIGZpbGVzKSA9PiB7XHJcbiAgICAgICAgICAgIGZpbGVzLmZvckVhY2goZmlsZSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYoZmlsZSA9PT0gX2ZpbGVuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBmcy51bmxpbmsoX19kaXJuYW1lICsgXCIvLi4vLi4vLi4vdXBsb2Fkcy9cIiArIF9maWxlbmFtZSwgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBpZihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKCdzdWNjZXNzJyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByb3V0ZXIucG9zdChcIi91cGxvYWRGaWxlXCIsIHVwbG9hZC5hbnkoKSwgZnVuY3Rpb24gKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICAgICAgICByZXMuZW5kKCdmaWxlIHVwbG9hZGVkJyk7XHJcbiAgICAgICAgICAvLyByZXEuZmlsZXMgaXMgYXJyYXkgb2YgYHBob3Rvc2AgZmlsZXNcclxuICAgICAgICAgIC8vIHJlcS5ib2R5IHdpbGwgY29udGFpbiB0aGUgdGV4dCBmaWVsZHMsIGlmIHRoZXJlIHdlcmUgYW55XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcm91dGVyO1xyXG4gICAgfVxyXG59XHJcblxyXG5PYmplY3Quc2VhbChVcGxvYWRSb3V0ZXMpO1xyXG5leHBvcnQgPSBVcGxvYWRSb3V0ZXM7XHJcbiJdfQ==
