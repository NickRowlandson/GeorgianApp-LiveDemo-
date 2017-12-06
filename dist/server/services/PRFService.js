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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvc2VydmljZXMvUFJGU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEseUNBQXlDO0FBRXpDO0lBQUE7SUFnQ0EsQ0FBQztJQS9CQyxnQ0FBVyxHQUFYLFVBQVksSUFBSTtRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1lBQ2pELDBDQUEwQztZQUMxQyxpREFBaUQ7WUFDakQsZUFBZTtZQUNmLGlDQUFpQztZQUNqQyxrQ0FBa0M7WUFDbEMsS0FBSztZQUNMLDZCQUE2QjtZQUM3QixFQUFFO1lBQ0YsaUdBQWlHO1lBQ2pHLGlCQUFpQjtZQUNqQiwwQkFBMEI7WUFDMUIsZUFBZTtZQUNmLHVDQUF1QztZQUN2QyxRQUFRO1lBQ1IsTUFBTTtZQUVOLHdFQUF3RTtZQUN4RSx3QkFBd0I7WUFDeEIsRUFBRTtZQUNGLCtGQUErRjtZQUMvRiwwQkFBMEI7WUFDMUIsNEJBQTRCO1lBQzVCLE1BQU07UUFDUixDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQztJQUNILENBQUM7SUFDSCxpQkFBQztBQUFELENBaENBLEFBZ0NDLElBQUE7QUFDRCxpQkFBUyxVQUFVLENBQUMiLCJmaWxlIjoic2VydmljZXMvUFJGU2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vY29uc3QgcGRmZmlsbGVyID0gcmVxdWlyZSgncGRmZmlsbGVyJyk7XHJcblxyXG5jbGFzcyBQUkZTZXJ2aWNlIHtcclxuICBwb3B1bGF0ZVBSRihpbmZvKTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZyhpbmZvKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiUFJGIGZ1bmN0aW9uIG5vdCB5ZXQgYXZhaWxhYmxlLi4uXCIpO1xyXG4gICAgICAvLyB2YXIgc291cmNlUERGID0gXCIuL3BkZi9wcmYtc291cmNlLnBkZlwiO1xyXG4gICAgICAvLyB2YXIgZGVzdGluYXRpb25QREYgPSBcIi4vcGRmL3ByZl9jb21wbGV0ZS5wZGZcIjtcclxuICAgICAgLy8gdmFyIGRhdGEgPSB7XHJcbiAgICAgIC8vICAgICBcIkxhc3ROYW1lXCI6IGluZm8ubGFzdE5hbWUsXHJcbiAgICAgIC8vICAgICBcIkZpcnN0TmFtZVwiOiBpbmZvLmZpcnN0TmFtZVxyXG4gICAgICAvLyB9O1xyXG4gICAgICAvLyB2YXIgc2hvdWxkRmxhdHRlbiA9IGZhbHNlO1xyXG4gICAgICAvL1xyXG4gICAgICAvLyBwZGZmaWxsZXIuZmlsbEZvcm1XaXRoRmxhdHRlbiggc291cmNlUERGLCBkZXN0aW5hdGlvblBERiwgZGF0YSwgc2hvdWxkRmxhdHRlbiwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgIC8vICAgICBpZiAoZXJyKSB7XHJcbiAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgICAvLyAgICAgICBjb25zb2xlLmxvZyhcIlBSRiBHRU5FUkFURUQuXCIpO1xyXG4gICAgICAvLyAgICAgfVxyXG4gICAgICAvLyB9KTtcclxuXHJcbiAgICAgIC8vIE92ZXJyaWRlIHRoZSBkZWZhdWx0IGZpZWxkIG5hbWUgcmVnZXguIERlZmF1bHQ6IC9GaWVsZE5hbWU6IChbXlxcbl0qKS9cclxuICAgICAgLy8gdmFyIG5hbWVSZWdleCA9IG51bGw7XHJcbiAgICAgIC8vXHJcbiAgICAgIC8vIHZhciBGREZfZGF0YSA9IHBkZmZpbGxlci5nZW5lcmF0ZUZERlRlbXBsYXRlKCBzb3VyY2VQREYsIG5hbWVSZWdleCwgZnVuY3Rpb24oZXJyLCBmZGZEYXRhKSB7XHJcbiAgICAgIC8vICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcbiAgICAgIC8vICAgICBjb25zb2xlLmxvZyhmZGZEYXRhKTtcclxuICAgICAgLy8gfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuZXhwb3J0ID0gUFJGU2VydmljZTtcclxuIl19
