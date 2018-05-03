"use strict";
//const pdffiller = require('pdffiller');
var PRFService = /** @class */ (function () {
    function PRFService() {
    }
    PRFService.prototype.populatePRF = function (info) {
        console.log(info);
        try {
            console.log("PRF function not yet available...");
            // var sourcePDF = "./pdf/prf-source.pdf";
            // var destinationPDF = "./pdf/prf_complete.pdf";
            // var data = {
            //     "LastName": info.lastName,
            //     "FirstName": info.firstName
            // };
            // var shouldFlatten = false;
            //
            // pdffiller.fillFormWithFlatten( sourcePDF, destinationPDF, data, shouldFlatten, function(err) {
            //     if (err) {
            //       console.log(err);
            //     } else {
            //       console.log("PRF GENERATED.");
            //     }
            // });
            // Override the default field name regex. Default: /FieldName: ([^\n]*)/
            // var nameRegex = null;
            //
            // var FDF_data = pdffiller.generateFDFTemplate( sourcePDF, nameRegex, function(err, fdfData) {
            //     if (err) throw err;
            //     console.log(fdfData);
            // });
        }
        catch (err) {
            console.log(err);
        }
    };
    return PRFService;
}());
module.exports = PRFService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvc2VydmljZXMvUFJGU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEseUNBQXlDO0FBRXpDO0lBQUE7SUFnQ0EsQ0FBQztJQS9CQyxnQ0FBVyxHQUFYLFVBQVksSUFBSTtRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsSUFBSTtZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQztZQUNqRCwwQ0FBMEM7WUFDMUMsaURBQWlEO1lBQ2pELGVBQWU7WUFDZixpQ0FBaUM7WUFDakMsa0NBQWtDO1lBQ2xDLEtBQUs7WUFDTCw2QkFBNkI7WUFDN0IsRUFBRTtZQUNGLGlHQUFpRztZQUNqRyxpQkFBaUI7WUFDakIsMEJBQTBCO1lBQzFCLGVBQWU7WUFDZix1Q0FBdUM7WUFDdkMsUUFBUTtZQUNSLE1BQU07WUFFTix3RUFBd0U7WUFDeEUsd0JBQXdCO1lBQ3hCLEVBQUU7WUFDRiwrRkFBK0Y7WUFDL0YsMEJBQTBCO1lBQzFCLDRCQUE0QjtZQUM1QixNQUFNO1NBQ1A7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbEI7SUFDSCxDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQWhDQSxBQWdDQyxJQUFBO0FBQ0QsaUJBQVMsVUFBVSxDQUFDIiwiZmlsZSI6InNlcnZpY2VzL1BSRlNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2NvbnN0IHBkZmZpbGxlciA9IHJlcXVpcmUoJ3BkZmZpbGxlcicpO1xyXG5cclxuY2xhc3MgUFJGU2VydmljZSB7XHJcbiAgcG9wdWxhdGVQUkYoaW5mbyk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coaW5mbyk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlBSRiBmdW5jdGlvbiBub3QgeWV0IGF2YWlsYWJsZS4uLlwiKTtcclxuICAgICAgLy8gdmFyIHNvdXJjZVBERiA9IFwiLi9wZGYvcHJmLXNvdXJjZS5wZGZcIjtcclxuICAgICAgLy8gdmFyIGRlc3RpbmF0aW9uUERGID0gXCIuL3BkZi9wcmZfY29tcGxldGUucGRmXCI7XHJcbiAgICAgIC8vIHZhciBkYXRhID0ge1xyXG4gICAgICAvLyAgICAgXCJMYXN0TmFtZVwiOiBpbmZvLmxhc3ROYW1lLFxyXG4gICAgICAvLyAgICAgXCJGaXJzdE5hbWVcIjogaW5mby5maXJzdE5hbWVcclxuICAgICAgLy8gfTtcclxuICAgICAgLy8gdmFyIHNob3VsZEZsYXR0ZW4gPSBmYWxzZTtcclxuICAgICAgLy9cclxuICAgICAgLy8gcGRmZmlsbGVyLmZpbGxGb3JtV2l0aEZsYXR0ZW4oIHNvdXJjZVBERiwgZGVzdGluYXRpb25QREYsIGRhdGEsIHNob3VsZEZsYXR0ZW4sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAvLyAgICAgaWYgKGVycikge1xyXG4gICAgICAvLyAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgICAgLy8gICAgICAgY29uc29sZS5sb2coXCJQUkYgR0VORVJBVEVELlwiKTtcclxuICAgICAgLy8gICAgIH1cclxuICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAvLyBPdmVycmlkZSB0aGUgZGVmYXVsdCBmaWVsZCBuYW1lIHJlZ2V4LiBEZWZhdWx0OiAvRmllbGROYW1lOiAoW15cXG5dKikvXHJcbiAgICAgIC8vIHZhciBuYW1lUmVnZXggPSBudWxsO1xyXG4gICAgICAvL1xyXG4gICAgICAvLyB2YXIgRkRGX2RhdGEgPSBwZGZmaWxsZXIuZ2VuZXJhdGVGREZUZW1wbGF0ZSggc291cmNlUERGLCBuYW1lUmVnZXgsIGZ1bmN0aW9uKGVyciwgZmRmRGF0YSkge1xyXG4gICAgICAvLyAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xyXG4gICAgICAvLyAgICAgY29uc29sZS5sb2coZmRmRGF0YSk7XHJcbiAgICAgIC8vIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbmV4cG9ydCA9IFBSRlNlcnZpY2U7XHJcbiJdfQ==
