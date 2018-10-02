"use strict";
const express = require("express");
const multer = require("multer");
const moment = require("moment");
const uploads = __dirname + '/../../../uploads';
const fs = require('fs');
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
class UploadRoutes {
    constructor() {
    }
    get routes() {
        router.get("/getFiles", function (req, res) {
            var filesList = [];
            fs.readdir(uploads, (err, files) => {
                files.forEach(file => {
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
                fs.readdir(uploads, (err, files) => {
                    files.forEach(file => {
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
            fs.readdir(uploads, (err, files) => {
                files.forEach(file => {
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
    }
}
Object.seal(UploadRoutes);
module.exports = UploadRoutes;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvcm91dGVzL1VwbG9hZFJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsbUNBQW9DO0FBQ3BDLGlDQUFrQztBQUNsQyxpQ0FBa0M7QUFDbEMsTUFBTSxPQUFPLEdBQUcsU0FBUyxHQUFHLG1CQUFtQixDQUFDO0FBQ2hELE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQy9CLFdBQVcsRUFBRSxVQUFTLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNqQyxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ25CLENBQUM7SUFDRCxRQUFRLEVBQUUsVUFBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2pELENBQUM7Q0FDRixDQUFDLENBQUM7QUFDSCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztBQUV4QyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFOUI7SUFDSTtJQUVBLENBQUM7SUFDRCxJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxVQUFTLEdBQUcsRUFBRSxHQUFHO1lBQ3ZDLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNuQixFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDakMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtv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TyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNuQixJQUFHLElBQUksS0FBSyxTQUFTLEVBQUU7d0JBQ3JCLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLG9CQUFvQixHQUFHLFNBQVMsRUFBRSxVQUFVLEdBQUc7NEJBQ25FLElBQUcsR0FBRyxFQUFFO2dDQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7NkJBQ2xCO3dCQUNILENBQUMsQ0FBQyxDQUFDO3dCQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQ3JCO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtZQUMvRCxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3pCLHVDQUF1QztZQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztDQUNKO0FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMxQixpQkFBUyxZQUFZLENBQUMiLCJmaWxlIjoicm91dGVzL1VwbG9hZFJvdXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbmltcG9ydCBtdWx0ZXIgPSByZXF1aXJlKFwibXVsdGVyXCIpO1xyXG5pbXBvcnQgbW9tZW50ID0gcmVxdWlyZShcIm1vbWVudFwiKTtcclxuY29uc3QgdXBsb2FkcyA9IF9fZGlybmFtZSArICcvLi4vLi4vLi4vdXBsb2Fkcyc7XHJcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcclxuXHJcbnZhciBzdG9yYWdlID0gbXVsdGVyLmRpc2tTdG9yYWdlKHtcclxuICBkZXN0aW5hdGlvbjogZnVuY3Rpb24ocmVxLCBmaWxlLCBjYikge1xyXG4gICAgY2IobnVsbCwgdXBsb2FkcylcclxuICB9LFxyXG4gIGZpbGVuYW1lOiBmdW5jdGlvbihyZXEsIGZpbGUsIGNiKSB7XHJcbiAgICBjb25zb2xlLmxvZyhmaWxlKTtcclxuICAgIGNiKG51bGwsIERhdGUubm93KCkgKyAnXycgKyBmaWxlLm9yaWdpbmFsbmFtZSk7XHJcbiAgfVxyXG59KTtcclxudmFyIHVwbG9hZCA9IG11bHRlcih7c3RvcmFnZTogc3RvcmFnZX0pO1xyXG5cclxudmFyIHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG5jbGFzcyBVcGxvYWRSb3V0ZXMge1xyXG4gICAgY29uc3RydWN0b3IgKCkge1xyXG5cclxuICAgIH1cclxuICAgIGdldCByb3V0ZXMgKCkge1xyXG4gICAgICAgIHJvdXRlci5nZXQoXCIvZ2V0RmlsZXNcIiwgZnVuY3Rpb24ocmVxLCByZXMpIHtcclxuICAgICAgICAgIHZhciBmaWxlc0xpc3QgPSBbXTtcclxuICAgICAgICAgIGZzLnJlYWRkaXIodXBsb2FkcywgKGVyciwgZmlsZXMpID0+IHtcclxuICAgICAgICAgICAgZmlsZXMuZm9yRWFjaChmaWxlID0+IHtcclxuICAgICAgICAgICAgICBpZihmaWxlID09PSAnLmdpdGtlZXAnKSB7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBmaWxlU3BsaXROYW1lSUQgPSBmaWxlLnNwbGl0KC9fKC4rKS8pWzFdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpbGVTcGxpdE5hbWUgPSBmaWxlU3BsaXROYW1lSUQuc3BsaXQoL18oLispLylbMV07XHJcbiAgICAgICAgICAgICAgICB2YXIgZmlsZVNwbGl0SUQgPSBmaWxlU3BsaXROYW1lSUQuc3BsaXQoL18oLispLylbMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgZmlsZVNwbGl0RGF0ZSA9IGZpbGUuc3BsaXQoL18oLispLylbMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9JbnQgPSBwYXJzZUludChmaWxlU3BsaXREYXRlKTtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRlT2JqID0gbmV3IERhdGUodG9JbnQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZvcm1hdHRlZERhdGUgPSBtb21lbnQoZGF0ZU9iaikuZm9ybWF0KCdNTU1NIERvIFlZWVksIGg6bW06c3MgYScpO1xyXG4gICAgICAgICAgICAgICAgLy9maWxlU3BsaXREYXRlLmRhdGUgPSBuZXcgRGF0ZShmaWxlU3BsaXREYXRlLmRhdGVJbk1pbGxpb25TZWNvbmRzKTtcclxuICAgICAgICAgICAgICAgIC8vdmFyIGZpbGVEYXRlID0gbmV3IERhdGUoZmlsZVNwbGl0RGF0ZSkudG9JU09TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHZhciBmaWxlSW5mbyA9IHtcclxuICAgICAgICAgICAgICAgICAgZmlsZW5hbWU6IGZpbGVTcGxpdE5hbWUsXHJcbiAgICAgICAgICAgICAgICAgIHVzZXJJRDogZmlsZVNwbGl0SUQsXHJcbiAgICAgICAgICAgICAgICAgIGRhdGU6IGZvcm1hdHRlZERhdGUsXHJcbiAgICAgICAgICAgICAgICAgIG1pbGxpc2Vjb25kczogZmlsZVNwbGl0RGF0ZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGZpbGVzTGlzdC5wdXNoKGZpbGVJbmZvKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXMuc2VuZChmaWxlc0xpc3QpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJvdXRlci5wb3N0KFwiL2Rvd25sb2FkLzpfZmlsZVwiLCBmdW5jdGlvbihyZXEsIHJlcyl7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgX2ZpbGVuYW1lOiBzdHJpbmcgPSByZXEucGFyYW1zLl9maWxlO1xyXG4gICAgICAgICAgICB2YXIgZG93bmxvYWRGaWxlO1xyXG4gICAgICAgICAgICBmcy5yZWFkZGlyKHVwbG9hZHMsIChlcnIsIGZpbGVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgZmlsZXMuZm9yRWFjaChmaWxlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGZpbGUgPT09IF9maWxlbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICBkb3dubG9hZEZpbGUgPSBmaWxlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtZGlzcG9zaXRpb24nLCAnYXR0YWNobWVudDsgZmlsZW5hbWU9JyArIGRvd25sb2FkRmlsZSk7XHJcbiAgICAgICAgICAgICAgcmVzLnNldEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3BkZicpO1xyXG4gICAgICAgICAgICAgIHZhciBmaWxlRGF0YSA9IGZzLnJlYWRGaWxlU3luYyhfX2Rpcm5hbWUgKyBcIi8uLi8uLi8uLi91cGxvYWRzL1wiICsgZG93bmxvYWRGaWxlKTtcclxuICAgICAgICAgICAgICB2YXIgYmFzZTY0RGF0YSA9IG5ldyBCdWZmZXIoZmlsZURhdGEpLnRvU3RyaW5nKCdiYXNlNjQnKTtcclxuICAgICAgICAgICAgICByZXMuc2VuZChiYXNlNjREYXRhKTtcclxuICAgICAgICAgICAgICAvL3Jlcy5kb3dubG9hZChfX2Rpcm5hbWUgKyBcIi8uLi8uLi8uLi91cGxvYWRzL1wiICsgZG93bmxvYWRGaWxlLCAnYmluYXJ5Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBjYXRjaChlKSB7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kKHtzdGF0dXM6IFwiZXJyb3JcIn0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcm91dGVyLmRlbGV0ZShcIi9kZWxldGVGaWxlLzpfZmlsZVwiLCBmdW5jdGlvbihyZXEsIHJlcyl7XHJcbiAgICAgICAgICB2YXIgX2ZpbGVuYW1lOiBzdHJpbmcgPSByZXEucGFyYW1zLl9maWxlO1xyXG4gICAgICAgICAgZnMucmVhZGRpcih1cGxvYWRzLCAoZXJyLCBmaWxlcykgPT4ge1xyXG4gICAgICAgICAgICBmaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xyXG4gICAgICAgICAgICAgIGlmKGZpbGUgPT09IF9maWxlbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgZnMudW5saW5rKF9fZGlybmFtZSArIFwiLy4uLy4uLy4uL3VwbG9hZHMvXCIgKyBfZmlsZW5hbWUsIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgaWYoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXMuc2VuZCgnc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcm91dGVyLnBvc3QoXCIvdXBsb2FkRmlsZVwiLCB1cGxvYWQuYW55KCksIGZ1bmN0aW9uIChyZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgICAgcmVzLmVuZCgnZmlsZSB1cGxvYWRlZCcpO1xyXG4gICAgICAgICAgLy8gcmVxLmZpbGVzIGlzIGFycmF5IG9mIGBwaG90b3NgIGZpbGVzXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInN0dWRlbnRJRDogXCIgKyByZXEuYm9keS5zdHVkZW50SUQpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHJvdXRlcjtcclxuICAgIH1cclxufVxyXG5cclxuT2JqZWN0LnNlYWwoVXBsb2FkUm91dGVzKTtcclxuZXhwb3J0ID0gVXBsb2FkUm91dGVzO1xyXG4iXX0=
