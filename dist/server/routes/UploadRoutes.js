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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL1VwbG9hZFJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQW9DO0FBQ3BDLCtCQUFrQztBQUNsQywrQkFBa0M7QUFDbEMsSUFBTSxPQUFPLEdBQUcsU0FBUyxHQUFHLG1CQUFtQixDQUFDO0FBQ2hELElBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQy9CLFdBQVcsRUFBRSxVQUFTLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNqQyxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ25CLENBQUM7SUFDRCxRQUFRLEVBQUUsVUFBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2pELENBQUM7Q0FDRixDQUFDLENBQUM7QUFDSCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztBQUV4QyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFOUI7SUFDSTtJQUVBLENBQUM7SUFDRCxzQkFBSSxnQ0FBTTthQUFWO1lBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsVUFBUyxHQUFHLEVBQUUsR0FBRztnQkFDdkMsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO2dCQUNuQixFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFDLEdBQUcsRUFBRSxLQUFLO29CQUM3QixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTt3QkFDaEIs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SUFBRyxJQUFJLEtBQUssU0FBUyxFQUFFOzRCQUNyQixFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsR0FBRyxTQUFTLEVBQUUsVUFBVSxHQUFHO2dDQUNuRSxJQUFHLEdBQUcsRUFBRTtvQ0FDTixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lDQUNsQjs0QkFDSCxDQUFDLENBQUMsQ0FBQzs0QkFDSCxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3lCQUNyQjtvQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO2dCQUMvRCxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUN6Qix1Q0FBdUM7Z0JBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUE7WUFDRixPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDOzs7T0FBQTtJQUNMLG1CQUFDO0FBQUQsQ0EvRUEsQUErRUMsSUFBQTtBQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDMUIsaUJBQVMsWUFBWSxDQUFDIiwiZmlsZSI6InJvdXRlcy9VcGxvYWRSb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xyXG5pbXBvcnQgbXVsdGVyID0gcmVxdWlyZShcIm11bHRlclwiKTtcclxuaW1wb3J0IG1vbWVudCA9IHJlcXVpcmUoXCJtb21lbnRcIik7XHJcbmNvbnN0IHVwbG9hZHMgPSBfX2Rpcm5hbWUgKyAnLy4uLy4uLy4uL3VwbG9hZHMnO1xyXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XHJcblxyXG52YXIgc3RvcmFnZSA9IG11bHRlci5kaXNrU3RvcmFnZSh7XHJcbiAgZGVzdGluYXRpb246IGZ1bmN0aW9uKHJlcSwgZmlsZSwgY2IpIHtcclxuICAgIGNiKG51bGwsIHVwbG9hZHMpXHJcbiAgfSxcclxuICBmaWxlbmFtZTogZnVuY3Rpb24ocmVxLCBmaWxlLCBjYikge1xyXG4gICAgY29uc29sZS5sb2coZmlsZSk7XHJcbiAgICBjYihudWxsLCBEYXRlLm5vdygpICsgJ18nICsgZmlsZS5vcmlnaW5hbG5hbWUpO1xyXG4gIH1cclxufSk7XHJcbnZhciB1cGxvYWQgPSBtdWx0ZXIoe3N0b3JhZ2U6IHN0b3JhZ2V9KTtcclxuXHJcbnZhciByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxuY2xhc3MgVXBsb2FkUm91dGVzIHtcclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuXHJcbiAgICB9XHJcbiAgICBnZXQgcm91dGVzICgpIHtcclxuICAgICAgICByb3V0ZXIuZ2V0KFwiL2dldEZpbGVzXCIsIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgICB2YXIgZmlsZXNMaXN0ID0gW107XHJcbiAgICAgICAgICBmcy5yZWFkZGlyKHVwbG9hZHMsIChlcnIsIGZpbGVzKSA9PiB7XHJcbiAgICAgICAgICAgIGZpbGVzLmZvckVhY2goZmlsZSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYoZmlsZSA9PT0gJy5naXRrZWVwJykge1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmlsZVNwbGl0TmFtZUlEID0gZmlsZS5zcGxpdCgvXyguKykvKVsxXTtcclxuICAgICAgICAgICAgICAgIHZhciBmaWxlU3BsaXROYW1lID0gZmlsZVNwbGl0TmFtZUlELnNwbGl0KC9fKC4rKS8pWzFdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpbGVTcGxpdElEID0gZmlsZVNwbGl0TmFtZUlELnNwbGl0KC9fKC4rKS8pWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpbGVTcGxpdERhdGUgPSBmaWxlLnNwbGl0KC9fKC4rKS8pWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvSW50ID0gcGFyc2VJbnQoZmlsZVNwbGl0RGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZU9iaiA9IG5ldyBEYXRlKHRvSW50KTtcclxuICAgICAgICAgICAgICAgIHZhciBmb3JtYXR0ZWREYXRlID0gbW9tZW50KGRhdGVPYmopLmZvcm1hdCgnTU1NTSBEbyBZWVlZLCBoOm1tOnNzIGEnKTtcclxuICAgICAgICAgICAgICAgIC8vZmlsZVNwbGl0RGF0ZS5kYXRlID0gbmV3IERhdGUoZmlsZVNwbGl0RGF0ZS5kYXRlSW5NaWxsaW9uU2Vjb25kcyk7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBmaWxlRGF0ZSA9IG5ldyBEYXRlKGZpbGVTcGxpdERhdGUpLnRvSVNPU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmlsZUluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBmaWxlU3BsaXROYW1lLFxyXG4gICAgICAgICAgICAgICAgICB1c2VySUQ6IGZpbGVTcGxpdElELFxyXG4gICAgICAgICAgICAgICAgICBkYXRlOiBmb3JtYXR0ZWREYXRlLFxyXG4gICAgICAgICAgICAgICAgICBtaWxsaXNlY29uZHM6IGZpbGVTcGxpdERhdGVcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBmaWxlc0xpc3QucHVzaChmaWxlSW5mbyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmVzLnNlbmQoZmlsZXNMaXN0KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByb3V0ZXIucG9zdChcIi9kb3dubG9hZC86X2ZpbGVcIiwgZnVuY3Rpb24ocmVxLCByZXMpe1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIF9maWxlbmFtZTogc3RyaW5nID0gcmVxLnBhcmFtcy5fZmlsZTtcclxuICAgICAgICAgICAgdmFyIGRvd25sb2FkRmlsZTtcclxuICAgICAgICAgICAgZnMucmVhZGRpcih1cGxvYWRzLCAoZXJyLCBmaWxlcykgPT4ge1xyXG4gICAgICAgICAgICAgIGZpbGVzLmZvckVhY2goZmlsZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihmaWxlID09PSBfZmlsZW5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgZG93bmxvYWRGaWxlID0gZmlsZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LWRpc3Bvc2l0aW9uJywgJ2F0dGFjaG1lbnQ7IGZpbGVuYW1lPScgKyBkb3dubG9hZEZpbGUpO1xyXG4gICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9wZGYnKTtcclxuICAgICAgICAgICAgICB2YXIgZmlsZURhdGEgPSBmcy5yZWFkRmlsZVN5bmMoX19kaXJuYW1lICsgXCIvLi4vLi4vLi4vdXBsb2Fkcy9cIiArIGRvd25sb2FkRmlsZSk7XHJcbiAgICAgICAgICAgICAgdmFyIGJhc2U2NERhdGEgPSBuZXcgQnVmZmVyKGZpbGVEYXRhKS50b1N0cmluZygnYmFzZTY0Jyk7XHJcbiAgICAgICAgICAgICAgcmVzLnNlbmQoYmFzZTY0RGF0YSk7XHJcbiAgICAgICAgICAgICAgLy9yZXMuZG93bmxvYWQoX19kaXJuYW1lICsgXCIvLi4vLi4vLi4vdXBsb2Fkcy9cIiArIGRvd25sb2FkRmlsZSwgJ2JpbmFyeScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICByZXMuc2VuZCh7c3RhdHVzOiBcImVycm9yXCJ9KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJvdXRlci5kZWxldGUoXCIvZGVsZXRlRmlsZS86X2ZpbGVcIiwgZnVuY3Rpb24ocmVxLCByZXMpe1xyXG4gICAgICAgICAgdmFyIF9maWxlbmFtZTogc3RyaW5nID0gcmVxLnBhcmFtcy5fZmlsZTtcclxuICAgICAgICAgIGZzLnJlYWRkaXIodXBsb2FkcywgKGVyciwgZmlsZXMpID0+IHtcclxuICAgICAgICAgICAgZmlsZXMuZm9yRWFjaChmaWxlID0+IHtcclxuICAgICAgICAgICAgICBpZihmaWxlID09PSBfZmlsZW5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGZzLnVubGluayhfX2Rpcm5hbWUgKyBcIi8uLi8uLi8uLi91cGxvYWRzL1wiICsgX2ZpbGVuYW1lLCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoJ3N1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJvdXRlci5wb3N0KFwiL3VwbG9hZEZpbGVcIiwgdXBsb2FkLmFueSgpLCBmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICAgIHJlcy5lbmQoJ2ZpbGUgdXBsb2FkZWQnKTtcclxuICAgICAgICAgIC8vIHJlcS5maWxlcyBpcyBhcnJheSBvZiBgcGhvdG9zYCBmaWxlc1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJzdHVkZW50SUQ6IFwiICsgcmVxLmJvZHkuc3R1ZGVudElEKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByb3V0ZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcbk9iamVjdC5zZWFsKFVwbG9hZFJvdXRlcyk7XHJcbmV4cG9ydCA9IFVwbG9hZFJvdXRlcztcclxuIl19
