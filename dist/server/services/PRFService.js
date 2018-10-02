"use strict";
//const pdffiller = require('pdffiller');
class PRFService {
    populatePRF(info) {
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
    }
}
module.exports = PRFService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvc2VydmljZXMvUFJGU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEseUNBQXlDO0FBRXpDO0lBQ0UsV0FBVyxDQUFDLElBQUk7UUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLElBQUk7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7WUFDakQsMENBQTBDO1lBQzFDLGlEQUFpRDtZQUNqRCxlQUFlO1lBQ2YsaUNBQWlDO1lBQ2pDLGtDQUFrQztZQUNsQyxLQUFLO1lBQ0wsNkJBQTZCO1lBQzdCLEVBQUU7WUFDRixpR0FBaUc7WUFDakcsaUJBQWlCO1lBQ2pCLDBCQUEwQjtZQUMxQixlQUFlO1lBQ2YsdUNBQXVDO1lBQ3ZDLFFBQVE7WUFDUixNQUFNO1lBRU4sd0VBQXdFO1lBQ3hFLHdCQUF3QjtZQUN4QixFQUFFO1lBQ0YsK0ZBQStGO1lBQy9GLDBCQUEwQjtZQUMxQiw0QkFBNEI7WUFDNUIsTUFBTTtTQUNQO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztDQUNGO0FBQ0QsaUJBQVMsVUFBVSxDQUFDIiwiZmlsZSI6InNlcnZpY2VzL1BSRlNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2NvbnN0IHBkZmZpbGxlciA9IHJlcXVpcmUoJ3BkZmZpbGxlcicpO1xyXG5cclxuY2xhc3MgUFJGU2VydmljZSB7XHJcbiAgcG9wdWxhdGVQUkYoaW5mbyk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coaW5mbyk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlBSRiBmdW5jdGlvbiBub3QgeWV0IGF2YWlsYWJsZS4uLlwiKTtcclxuICAgICAgLy8gdmFyIHNvdXJjZVBERiA9IFwiLi9wZGYvcHJmLXNvdXJjZS5wZGZcIjtcclxuICAgICAgLy8gdmFyIGRlc3RpbmF0aW9uUERGID0gXCIuL3BkZi9wcmZfY29tcGxldGUucGRmXCI7XHJcbiAgICAgIC8vIHZhciBkYXRhID0ge1xyXG4gICAgICAvLyAgICAgXCJMYXN0TmFtZVwiOiBpbmZvLmxhc3ROYW1lLFxyXG4gICAgICAvLyAgICAgXCJGaXJzdE5hbWVcIjogaW5mby5maXJzdE5hbWVcclxuICAgICAgLy8gfTtcclxuICAgICAgLy8gdmFyIHNob3VsZEZsYXR0ZW4gPSBmYWxzZTtcclxuICAgICAgLy9cclxuICAgICAgLy8gcGRmZmlsbGVyLmZpbGxGb3JtV2l0aEZsYXR0ZW4oIHNvdXJjZVBERiwgZGVzdGluYXRpb25QREYsIGRhdGEsIHNob3VsZEZsYXR0ZW4sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAvLyAgICAgaWYgKGVycikge1xyXG4gICAgICAvLyAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgICAgLy8gICAgICAgY29uc29sZS5sb2coXCJQUkYgR0VORVJBVEVELlwiKTtcclxuICAgICAgLy8gICAgIH1cclxuICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAvLyBPdmVycmlkZSB0aGUgZGVmYXVsdCBmaWVsZCBuYW1lIHJlZ2V4LiBEZWZhdWx0OiAvRmllbGROYW1lOiAoW15cXG5dKikvXHJcbiAgICAgIC8vIHZhciBuYW1lUmVnZXggPSBudWxsO1xyXG4gICAgICAvL1xyXG4gICAgICAvLyB2YXIgRkRGX2RhdGEgPSBwZGZmaWxsZXIuZ2VuZXJhdGVGREZUZW1wbGF0ZSggc291cmNlUERGLCBuYW1lUmVnZXgsIGZ1bmN0aW9uKGVyciwgZmRmRGF0YSkge1xyXG4gICAgICAvLyAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xyXG4gICAgICAvLyAgICAgY29uc29sZS5sb2coZmRmRGF0YSk7XHJcbiAgICAgIC8vIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbmV4cG9ydCA9IFBSRlNlcnZpY2U7XHJcbiJdfQ==
