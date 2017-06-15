"use strict";
var pdffiller = require('pdffiller');
var PRFService = (function () {
    function PRFService() {
    }
    PRFService.prototype.populatePRF = function (info) {
        console.log(info);
        try {
            var sourcePDF = "./pdf/prf-source.pdf";
            var destinationPDF = "./pdf/prf_complete.pdf";
            var data = {
                "LastName": info.lastName,
                "FirstName": info.firstName
            };
            var shouldFlatten = false;
            pdffiller.fillFormWithFlatten(sourcePDF, destinationPDF, data, shouldFlatten, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("PRF GENERATED.");
                }
            });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvc2VydmljZXMvUFJGU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRXZDO0lBQUE7SUErQkEsQ0FBQztJQTlCQyxnQ0FBVyxHQUFYLFVBQVksSUFBSTtRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDO1lBQ0gsSUFBSSxTQUFTLEdBQUcsc0JBQXNCLENBQUM7WUFDdkMsSUFBSSxjQUFjLEdBQUcsd0JBQXdCLENBQUM7WUFDOUMsSUFBSSxJQUFJLEdBQUc7Z0JBQ1AsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVM7YUFDOUIsQ0FBQztZQUNGLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztZQUUxQixTQUFTLENBQUMsbUJBQW1CLENBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLFVBQVMsR0FBRztnQkFDdkYsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsd0VBQXdFO1lBQ3hFLHdCQUF3QjtZQUN4QixFQUFFO1lBQ0YsK0ZBQStGO1lBQy9GLDBCQUEwQjtZQUMxQiw0QkFBNEI7WUFDNUIsTUFBTTtRQUNSLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDO0lBQ0gsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0EvQkEsQUErQkMsSUFBQTtBQUNELGlCQUFTLFVBQVUsQ0FBQyIsImZpbGUiOiJzZXJ2aWNlcy9QUkZTZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcGRmZmlsbGVyID0gcmVxdWlyZSgncGRmZmlsbGVyJyk7XHJcblxyXG5jbGFzcyBQUkZTZXJ2aWNlIHtcclxuICBwb3B1bGF0ZVBSRihpbmZvKTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZyhpbmZvKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciBzb3VyY2VQREYgPSBcIi4vcGRmL3ByZi1zb3VyY2UucGRmXCI7XHJcbiAgICAgIHZhciBkZXN0aW5hdGlvblBERiA9IFwiLi9wZGYvcHJmX2NvbXBsZXRlLnBkZlwiO1xyXG4gICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgIFwiTGFzdE5hbWVcIjogaW5mby5sYXN0TmFtZSxcclxuICAgICAgICAgIFwiRmlyc3ROYW1lXCI6IGluZm8uZmlyc3ROYW1lXHJcbiAgICAgIH07XHJcbiAgICAgIHZhciBzaG91bGRGbGF0dGVuID0gZmFsc2U7XHJcblxyXG4gICAgICBwZGZmaWxsZXIuZmlsbEZvcm1XaXRoRmxhdHRlbiggc291cmNlUERGLCBkZXN0aW5hdGlvblBERiwgZGF0YSwgc2hvdWxkRmxhdHRlbiwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBSRiBHRU5FUkFURUQuXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIE92ZXJyaWRlIHRoZSBkZWZhdWx0IGZpZWxkIG5hbWUgcmVnZXguIERlZmF1bHQ6IC9GaWVsZE5hbWU6IChbXlxcbl0qKS9cclxuICAgICAgLy8gdmFyIG5hbWVSZWdleCA9IG51bGw7XHJcbiAgICAgIC8vXHJcbiAgICAgIC8vIHZhciBGREZfZGF0YSA9IHBkZmZpbGxlci5nZW5lcmF0ZUZERlRlbXBsYXRlKCBzb3VyY2VQREYsIG5hbWVSZWdleCwgZnVuY3Rpb24oZXJyLCBmZGZEYXRhKSB7XHJcbiAgICAgIC8vICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcbiAgICAgIC8vICAgICBjb25zb2xlLmxvZyhmZGZEYXRhKTtcclxuICAgICAgLy8gfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuZXhwb3J0ID0gUFJGU2VydmljZTtcclxuIl19
