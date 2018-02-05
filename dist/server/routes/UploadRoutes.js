"use strict";
var express = require("express");
var multer = require("multer");
var moment = require("moment");
var uploads = './uploads/';
var fs = require('fs');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
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
                fs.readdir(__dirname + '/../../../uploads', function (err, files) {
                    files.forEach(function (file) {
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
                                console.log(err);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL1VwbG9hZFJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQW9DO0FBQ3BDLCtCQUFrQztBQUNsQywrQkFBa0M7QUFDbEMsSUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDO0FBQzdCLElBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQy9CLFdBQVcsRUFBRSxVQUFTLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNqQyxFQUFFLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFBO0lBQ3hCLENBQUM7SUFDRCxRQUFRLEVBQUUsVUFBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDOUIsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNqRCxDQUFDO0NBQ0YsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7QUFFeEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRTlCO0lBQ0k7SUFFQSxDQUFDO0lBQ0Qsc0JBQUksZ0NBQU07YUFBVjtZQUNJLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQVMsR0FBRyxFQUFFLEdBQUc7Z0JBQ3ZDLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztnQkFDbkIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLEVBQUUsVUFBQyxHQUFHLEVBQUUsS0FBSztvQkFDckQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7d0JBQ2hCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxD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R0FBRyxFQUFFLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7Z0JBQy9ELEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3pCLHVDQUF1QztnQkFDdkMsMkRBQTJEO1lBQzdELENBQUMsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNsQixDQUFDOzs7T0FBQTtJQUNMLG1CQUFDO0FBQUQsQ0FsRUEsQUFrRUMsSUFBQTtBQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDMUIsaUJBQVMsWUFBWSxDQUFDIiwiZmlsZSI6InJvdXRlcy9VcGxvYWRSb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xyXG5pbXBvcnQgbXVsdGVyID0gcmVxdWlyZShcIm11bHRlclwiKTtcclxuaW1wb3J0IG1vbWVudCA9IHJlcXVpcmUoXCJtb21lbnRcIik7XHJcbmNvbnN0IHVwbG9hZHMgPSAnLi91cGxvYWRzLyc7XHJcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcclxuXHJcbnZhciBzdG9yYWdlID0gbXVsdGVyLmRpc2tTdG9yYWdlKHtcclxuICBkZXN0aW5hdGlvbjogZnVuY3Rpb24ocmVxLCBmaWxlLCBjYikge1xyXG4gICAgY2IobnVsbCwgJy4vdXBsb2Fkcy8nKVxyXG4gIH0sXHJcbiAgZmlsZW5hbWU6IGZ1bmN0aW9uKHJlcSwgZmlsZSwgY2IpIHtcclxuICAgIGNiKG51bGwsIERhdGUubm93KCkgKyAnXycgKyBmaWxlLm9yaWdpbmFsbmFtZSk7XHJcbiAgfVxyXG59KTtcclxudmFyIHVwbG9hZCA9IG11bHRlcih7c3RvcmFnZTogc3RvcmFnZX0pO1xyXG5cclxudmFyIHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG5jbGFzcyBVcGxvYWRSb3V0ZXMge1xyXG4gICAgY29uc3RydWN0b3IgKCkge1xyXG5cclxuICAgIH1cclxuICAgIGdldCByb3V0ZXMgKCkge1xyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvZ2V0RmlsZXNcIiwgZnVuY3Rpb24ocmVxLCByZXMpIHtcclxuICAgICAgICAgIHZhciBmaWxlc0xpc3QgPSBbXTtcclxuICAgICAgICAgIGZzLnJlYWRkaXIoX19kaXJuYW1lICsgJy8uLi8uLi8uLi91cGxvYWRzJywgKGVyciwgZmlsZXMpID0+IHtcclxuICAgICAgICAgICAgZmlsZXMuZm9yRWFjaChmaWxlID0+IHtcclxuICAgICAgICAgICAgICB2YXIgZmlsZVNwbGl0TmFtZSA9IGZpbGUuc3BsaXQoL18oLispLylbMV07XHJcbiAgICAgICAgICAgICAgdmFyIGZpbGVTcGxpdERhdGUgPSBmaWxlLnNwbGl0KC9fKC4rKS8pWzBdO1xyXG4gICAgICAgICAgICAgIHZhciB0b0ludCA9IHBhcnNlSW50KGZpbGVTcGxpdERhdGUpO1xyXG4gICAgICAgICAgICAgIHZhciBkYXRlT2JqID0gbmV3IERhdGUodG9JbnQpO1xyXG4gICAgICAgICAgICAgIHZhciBmb3JtYXR0ZWREYXRlID0gbW9tZW50KGRhdGVPYmopLmZvcm1hdCgnTU1NTSBEbyBZWVlZLCBoOm1tOnNzIGEnKTtcclxuICAgICAgICAgICAgICAvL2ZpbGVTcGxpdERhdGUuZGF0ZSA9IG5ldyBEYXRlKGZpbGVTcGxpdERhdGUuZGF0ZUluTWlsbGlvblNlY29uZHMpO1xyXG4gICAgICAgICAgICAgIC8vdmFyIGZpbGVEYXRlID0gbmV3IERhdGUoZmlsZVNwbGl0RGF0ZSkudG9JU09TdHJpbmcoKTtcclxuICAgICAgICAgICAgICB2YXIgZmlsZUluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICBmaWxlbmFtZTogZmlsZVNwbGl0TmFtZSxcclxuICAgICAgICAgICAgICAgIGRhdGU6IGZvcm1hdHRlZERhdGUsXHJcbiAgICAgICAgICAgICAgICBtaWxsaXNlY29uZHM6IGZpbGVTcGxpdERhdGVcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgIGZpbGVzTGlzdC5wdXNoKGZpbGVJbmZvKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKGZpbGVzTGlzdCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcm91dGVyLnBvc3QoXCIvZG93bmxvYWQvOl9maWxlXCIsIGZ1bmN0aW9uKHJlcSwgcmVzKXtcclxuICAgICAgICAgIHZhciBfZmlsZW5hbWU6IHN0cmluZyA9IHJlcS5wYXJhbXMuX2ZpbGU7XHJcbiAgICAgICAgICB2YXIgZG93bmxvYWRGaWxlO1xyXG4gICAgICAgICAgZnMucmVhZGRpcih1cGxvYWRzLCAoZXJyLCBmaWxlcykgPT4ge1xyXG4gICAgICAgICAgICBmaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xyXG4gICAgICAgICAgICAgIGlmKGZpbGUgPT09IF9maWxlbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgZG93bmxvYWRGaWxlID0gZmlsZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LWRpc3Bvc2l0aW9uJywgJ2F0dGFjaG1lbnQ7IGZpbGVuYW1lPScgKyBkb3dubG9hZEZpbGUpO1xyXG4gICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vcGRmJyk7XHJcbiAgICAgICAgICAgIHZhciBmaWxlRGF0YSA9IGZzLnJlYWRGaWxlU3luYyhfX2Rpcm5hbWUgKyBcIi8uLi8uLi8uLi91cGxvYWRzL1wiICsgZG93bmxvYWRGaWxlKTtcclxuICAgICAgICAgICAgdmFyIGJhc2U2NERhdGEgPSBuZXcgQnVmZmVyKGZpbGVEYXRhKS50b1N0cmluZygnYmFzZTY0Jyk7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKGJhc2U2NERhdGEpO1xyXG4gICAgICAgICAgICAvL3Jlcy5kb3dubG9hZChfX2Rpcm5hbWUgKyBcIi8uLi8uLi8uLi91cGxvYWRzL1wiICsgZG93bmxvYWRGaWxlLCAnYmluYXJ5Jyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcm91dGVyLmRlbGV0ZShcIi9kZWxldGVGaWxlLzpfZmlsZVwiLCBmdW5jdGlvbihyZXEsIHJlcyl7XHJcbiAgICAgICAgICB2YXIgX2ZpbGVuYW1lOiBzdHJpbmcgPSByZXEucGFyYW1zLl9maWxlO1xyXG4gICAgICAgICAgZnMucmVhZGRpcih1cGxvYWRzLCAoZXJyLCBmaWxlcykgPT4ge1xyXG4gICAgICAgICAgICBmaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xyXG4gICAgICAgICAgICAgIGlmKGZpbGUgPT09IF9maWxlbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgZnMudW5saW5rKF9fZGlybmFtZSArIFwiLy4uLy4uLy4uL3VwbG9hZHMvXCIgKyBfZmlsZW5hbWUsIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmVzLnNlbmQoJ3N1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJvdXRlci5wb3N0KFwiL3VwbG9hZEZpbGVcIiwgdXBsb2FkLmFueSgpLCBmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICAgIHJlcy5lbmQoJ2ZpbGUgdXBsb2FkZWQnKTtcclxuICAgICAgICAgIC8vIHJlcS5maWxlcyBpcyBhcnJheSBvZiBgcGhvdG9zYCBmaWxlc1xyXG4gICAgICAgICAgLy8gcmVxLmJvZHkgd2lsbCBjb250YWluIHRoZSB0ZXh0IGZpZWxkcywgaWYgdGhlcmUgd2VyZSBhbnlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByb3V0ZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcbk9iamVjdC5zZWFsKFVwbG9hZFJvdXRlcyk7XHJcbmV4cG9ydCA9IFVwbG9hZFJvdXRlcztcclxuIl19
