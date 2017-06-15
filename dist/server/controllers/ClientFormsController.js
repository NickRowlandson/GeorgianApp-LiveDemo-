"use strict";
var AuthController = require("../controllers/AuthController");
var MailService = require("../services/MailService");
var PRFService = require("../services/PRFService");
var sql = require('mssql');
var auth = ["Admin", "Staff", "Client"];
var ClientFormsController = (function () {
    function ClientFormsController() {
    }
    ClientFormsController.prototype.consentForm = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var consentForm = req.body.consentForm;
                    var _id = req.params._id;
                    sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function () {
                        var consentQuery = "'" + _id + "', '" +
                            consentForm.date + "', '" +
                            consentForm.detailedMessageYes + "', '" +
                            consentForm.detailedMessageNo + "', '" +
                            consentForm.ontarioWorks + "', '" +
                            consentForm.ontarioDisabilityProgram + "', '" +
                            consentForm.employmentInsurance + "', '" +
                            consentForm.employmentServices + "', '" +
                            consentForm.other + "', '" +
                            consentForm.contactName + "', '" +
                            consentForm.contactNum + "', '" +
                            consentForm.literacyAgencies + "', '" +
                            consentForm.literacyWitness + "'";
                        new sql.Request().query("INSERT INTO Consent VALUES (" + consentQuery + ")").then(function () {
                            new sql.Request().query("UPDATE Clients SET consent= 'false' WHERE userID = '" + _id + "'").then(function () {
                                res.send({ "success": "success" });
                            }).catch(function (err) {
                                res.send({ "error": "error" });
                                console.log("Update client " + err);
                            });
                        }).catch(function (err) {
                            console.log("Save consent form " + err);
                            res.send({ "error": "error" });
                        });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    ClientFormsController.prototype.learningStyleForm = function (req, res) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    var learningStyleForm = req.body.learningStyleForm;
                    var _id = req.params._id;
                    sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function () {
                        var learningStyleQuery = "'" + _id + "', '" +
                            learningStyleForm.seeing + "', '" +
                            learningStyleForm.hearing + "', '" +
                            learningStyleForm.doing + "'";
                        new sql.Request().query("INSERT INTO LearningStyle VALUES (" + learningStyleQuery + ")").then(function () {
                            new sql.Request().query("UPDATE Clients SET learningStyle= 'false' WHERE userID = '" + _id + "'").then(function () {
                                res.send({ "success": "success" });
                            }).catch(function (err) {
                                res.send({ "error": "error" });
                                console.log("Update client " + err);
                            });
                        }).catch(function (err) {
                            console.log("Save learning style form " + err);
                            res.send({ "error": "error" });
                        });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    return ClientFormsController;
}());
module.exports = ClientFormsController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvY29udHJvbGxlcnMvQ2xpZW50Rm9ybXNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSw4REFBaUU7QUFFakUsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDdkQsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDckQsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNCLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUV4QztJQUFBO0lBcUVBLENBQUM7SUFwRUcsMkNBQVcsR0FBWCxVQUFZLEdBQW9CLEVBQUUsR0FBcUI7UUFDbkQsSUFBSSxDQUFDO1lBQ0QsSUFBSSxjQUFjLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQkFDcEMsWUFBWSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7b0JBQ3RCLElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO29CQUN2QyxJQUFJLEdBQUcsR0FBVyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztvQkFDakMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxnR0FBZ0csQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDL0csSUFBSSxZQUFZLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxNQUFNOzRCQUNqQyxXQUFXLENBQUMsSUFBSSxHQUFHLE1BQU07NEJBQ3pCLFdBQVcsQ0FBQyxrQkFBa0IsR0FBRyxNQUFNOzRCQUN2QyxXQUFXLENBQUMsaUJBQWlCLEdBQUcsTUFBTTs0QkFDdEMsV0FBVyxDQUFDLFlBQVksR0FBRyxNQUFNOzRCQUNqQyxXQUFXLENBQUMsd0JBQXdCLEdBQUcsTUFBTTs0QkFDN0MsV0FBVyxDQUFDLG1CQUFtQixHQUFHLE1BQU07NEJB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QUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO2dDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLENBQUM7NEJBQ3hFLENBQUMsQ0FBQyxDQUFDO3dCQUNQLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLEdBQUc7NEJBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEdBQUcsR0FBRyxDQUFDLENBQUM7NEJBQy9DLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQzt3QkFDbkMsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQzthQUNKLENBQUMsQ0FBQztRQUNQLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELENBQUM7SUFDTCxDQUFDO0lBQ0wsNEJBQUM7QUFBRCxDQXJFQSxBQXFFQyxJQUFBO0FBQ0QsaUJBQVMscUJBQXFCLENBQUMiLCJmaWxlIjoiY29udHJvbGxlcnMvQ2xpZW50Rm9ybXNDb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcclxuaW1wb3J0IGp3dCA9IHJlcXVpcmUoJ2pzb253ZWJ0b2tlbicpO1xyXG5pbXBvcnQgYmNyeXB0ID0gcmVxdWlyZSgnYmNyeXB0Jyk7XHJcbmltcG9ydCBBdXRoQ29udHJvbGxlciA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9BdXRoQ29udHJvbGxlclwiKTtcclxuaW1wb3J0IENsaWVudENvbnRyb2xsZXIgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvQ2xpZW50Q29udHJvbGxlclwiKTtcclxuY29uc3QgTWFpbFNlcnZpY2UgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvTWFpbFNlcnZpY2VcIik7XHJcbmNvbnN0IFBSRlNlcnZpY2UgPSByZXF1aXJlKFwiLi4vc2VydmljZXMvUFJGU2VydmljZVwiKTtcclxudmFyIHNxbCA9IHJlcXVpcmUoJ21zc3FsJyk7XHJcbnZhciBhdXRoID0gW1wiQWRtaW5cIiwgXCJTdGFmZlwiLCBcIkNsaWVudFwiXTtcclxuXHJcbmNsYXNzIENsaWVudEZvcm1zQ29udHJvbGxlciB7XHJcbiAgICBjb25zZW50Rm9ybShyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbmV3IEF1dGhDb250cm9sbGVyKCkuYXV0aFVzZXIocmVxLCByZXMsIHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkQXV0aDogYXV0aCwgZG9uZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnNlbnRGb3JtID0gcmVxLmJvZHkuY29uc2VudEZvcm07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9pZDogc3RyaW5nID0gcmVxLnBhcmFtcy5faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc3FsLmNvbm5lY3QoXCJtc3NxbDovL05pY2tSb3dsYW5kc29uOmdlb3JnaWFuVGVzdDFAbnItY29tcDIwMDcuZGF0YWJhc2Uud2luZG93cy5uZXQvR2VvcmdpYW5BcHA/ZW5jcnlwdD10cnVlXCIpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25zZW50UXVlcnkgPSBcIidcIiArIF9pZCArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmRhdGUgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5kZXRhaWxlZE1lc3NhZ2VZZXMgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5kZXRhaWxlZE1lc3NhZ2VObyArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLm9udGFyaW9Xb3JrcyArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLm9udGFyaW9EaXNhYmlsaXR5UHJvZ3JhbSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmVtcGxveW1lbnRJbnN1cmFuY2UgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5lbXBsb3ltZW50U2VydmljZXMgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5vdGhlciArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmNvbnRhY3ROYW1lICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc2VudEZvcm0uY29udGFjdE51bSArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNlbnRGb3JtLmxpdGVyYWN5QWdlbmNpZXMgKyBcIicsICdcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zZW50Rm9ybS5saXRlcmFjeVdpdG5lc3MgKyBcIidcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHNxbC5SZXF1ZXN0KCkucXVlcnkoXCJJTlNFUlQgSU5UTyBDb25zZW50IFZBTFVFUyAoXCIgKyBjb25zZW50UXVlcnkgKyBcIilcIikudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdCgpLnF1ZXJ5KFwiVVBEQVRFIENsaWVudHMgU0VUIGNvbnNlbnQ9ICdmYWxzZScgV0hFUkUgdXNlcklEID0gJ1wiICsgX2lkICsgXCInXCIpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcInN1Y2Nlc3NcIjogXCJzdWNjZXNzXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pOyBjb25zb2xlLmxvZyhcIlVwZGF0ZSBjbGllbnQgXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTYXZlIGNvbnNlbnQgZm9ybSBcIiArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3IgaW4geW91ciByZXF1ZXN0XCIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxlYXJuaW5nU3R5bGVGb3JtKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpOiB2b2lkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBuZXcgQXV0aENvbnRyb2xsZXIoKS5hdXRoVXNlcihyZXEsIHJlcywge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWRBdXRoOiBhdXRoLCBkb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGVhcm5pbmdTdHlsZUZvcm0gPSByZXEuYm9keS5sZWFybmluZ1N0eWxlRm9ybTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2lkOiBzdHJpbmcgPSByZXEucGFyYW1zLl9pZDtcclxuICAgICAgICAgICAgICAgICAgICBzcWwuY29ubmVjdChcIm1zc3FsOi8vTmlja1Jvd2xhbmRzb246Z2VvcmdpYW5UZXN0MUBuci1jb21wMjAwNy5kYXRhYmFzZS53aW5kb3dzLm5ldC9HZW9yZ2lhbkFwcD9lbmNyeXB0PXRydWVcIikudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxlYXJuaW5nU3R5bGVRdWVyeSA9IFwiJ1wiICsgX2lkICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhcm5pbmdTdHlsZUZvcm0uc2VlaW5nICsgXCInLCAnXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVhcm5pbmdTdHlsZUZvcm0uaGVhcmluZyArIFwiJywgJ1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlYXJuaW5nU3R5bGVGb3JtLmRvaW5nICsgXCInXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBzcWwuUmVxdWVzdCgpLnF1ZXJ5KFwiSU5TRVJUIElOVE8gTGVhcm5pbmdTdHlsZSBWQUxVRVMgKFwiICsgbGVhcm5pbmdTdHlsZVF1ZXJ5ICsgXCIpXCIpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgc3FsLlJlcXVlc3QoKS5xdWVyeShcIlVQREFURSBDbGllbnRzIFNFVCBsZWFybmluZ1N0eWxlPSAnZmFsc2UnIFdIRVJFIHVzZXJJRCA9ICdcIiArIF9pZCArIFwiJ1wiKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJzdWNjZXNzXCI6IFwic3VjY2Vzc1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmQoeyBcImVycm9yXCI6IFwiZXJyb3JcIiB9KTsgY29uc29sZS5sb2coXCJVcGRhdGUgY2xpZW50IFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2F2ZSBsZWFybmluZyBzdHlsZSBmb3JtIFwiICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kKHsgXCJlcnJvclwiOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICByZXMuc2VuZCh7IFwiZXJyb3JcIjogXCJlcnJvciBpbiB5b3VyIHJlcXVlc3RcIiB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0ID0gQ2xpZW50Rm9ybXNDb250cm9sbGVyO1xyXG4iXX0=
