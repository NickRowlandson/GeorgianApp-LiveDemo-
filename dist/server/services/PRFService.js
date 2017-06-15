"use strict";
//const pdffiller = require('pdffiller');
var PRFService = (function () {
    function PRFService() {
    }
    PRFService.prototype.populatePRF = function (info) {
        //   console.log(info);
        //   try {
        //     var sourcePDF = "./pdf/prf-source.pdf";
        //     var destinationPDF = "./pdf/prf_complete.pdf";
        //     var data = {
        //         "LastName": info.lastName,
        //         "FirstName": info.firstName
        //     };
        //     var shouldFlatten = false;
        //
        //     pdffiller.fillFormWithFlatten( sourcePDF, destinationPDF, data, shouldFlatten, function(err) {
        //         if (err) {
        //           console.log(err);
        //         } else {
        //           console.log("PRF GENERATED.");
        //         }
        //     });
        //
        //     // Override the default field name regex. Default: /FieldName: ([^\n]*)/
        //     // var nameRegex = null;
        //     //
        //     // var FDF_data = pdffiller.generateFDFTemplate( sourcePDF, nameRegex, function(err, fdfData) {
        //     //     if (err) throw err;
        //     //     console.log(fdfData);
        //     // });
        //   } catch (err) {
        //     console.log(err);
        //   }
    };
    return PRFService;
}());
module.exports = PRFService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9zcmMvc2VydmljZXMvUFJGU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEseUNBQXlDO0FBRXpDO0lBQUE7SUErQkEsQ0FBQztJQTlCQyxnQ0FBVyxHQUFYLFVBQVksSUFBSTtRQUNoQix1QkFBdUI7UUFDdkIsVUFBVTtRQUNWLDhDQUE4QztRQUM5QyxxREFBcUQ7UUFDckQsbUJBQW1CO1FBQ25CLHFDQUFxQztRQUNyQyxzQ0FBc0M7UUFDdEMsU0FBUztRQUNULGlDQUFpQztRQUNqQyxFQUFFO1FBQ0YscUdBQXFHO1FBQ3JHLHFCQUFxQjtRQUNyQiw4QkFBOEI7UUFDOUIsbUJBQW1CO1FBQ25CLDJDQUEyQztRQUMzQyxZQUFZO1FBQ1osVUFBVTtRQUNWLEVBQUU7UUFDRiwrRUFBK0U7UUFDL0UsK0JBQStCO1FBQy9CLFNBQVM7UUFDVCxzR0FBc0c7UUFDdEcsaUNBQWlDO1FBQ2pDLG1DQUFtQztRQUNuQyxhQUFhO1FBQ2Isb0JBQW9CO1FBQ3BCLHdCQUF3QjtRQUN4QixNQUFNO0lBQ04sQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0EvQkEsQUErQkMsSUFBQTtBQUNELGlCQUFTLFVBQVUsQ0FBQyIsImZpbGUiOiJzZXJ2aWNlcy9QUkZTZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9jb25zdCBwZGZmaWxsZXIgPSByZXF1aXJlKCdwZGZmaWxsZXInKTtcclxuXHJcbmNsYXNzIFBSRlNlcnZpY2Uge1xyXG4gIHBvcHVsYXRlUFJGKGluZm8pOiB2b2lkIHtcclxuICAvLyAgIGNvbnNvbGUubG9nKGluZm8pO1xyXG4gIC8vICAgdHJ5IHtcclxuICAvLyAgICAgdmFyIHNvdXJjZVBERiA9IFwiLi9wZGYvcHJmLXNvdXJjZS5wZGZcIjtcclxuICAvLyAgICAgdmFyIGRlc3RpbmF0aW9uUERGID0gXCIuL3BkZi9wcmZfY29tcGxldGUucGRmXCI7XHJcbiAgLy8gICAgIHZhciBkYXRhID0ge1xyXG4gIC8vICAgICAgICAgXCJMYXN0TmFtZVwiOiBpbmZvLmxhc3ROYW1lLFxyXG4gIC8vICAgICAgICAgXCJGaXJzdE5hbWVcIjogaW5mby5maXJzdE5hbWVcclxuICAvLyAgICAgfTtcclxuICAvLyAgICAgdmFyIHNob3VsZEZsYXR0ZW4gPSBmYWxzZTtcclxuICAvL1xyXG4gIC8vICAgICBwZGZmaWxsZXIuZmlsbEZvcm1XaXRoRmxhdHRlbiggc291cmNlUERGLCBkZXN0aW5hdGlvblBERiwgZGF0YSwgc2hvdWxkRmxhdHRlbiwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgLy8gICAgICAgICBpZiAoZXJyKSB7XHJcbiAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gIC8vICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBSRiBHRU5FUkFURUQuXCIpO1xyXG4gIC8vICAgICAgICAgfVxyXG4gIC8vICAgICB9KTtcclxuICAvL1xyXG4gIC8vICAgICAvLyBPdmVycmlkZSB0aGUgZGVmYXVsdCBmaWVsZCBuYW1lIHJlZ2V4LiBEZWZhdWx0OiAvRmllbGROYW1lOiAoW15cXG5dKikvXHJcbiAgLy8gICAgIC8vIHZhciBuYW1lUmVnZXggPSBudWxsO1xyXG4gIC8vICAgICAvL1xyXG4gIC8vICAgICAvLyB2YXIgRkRGX2RhdGEgPSBwZGZmaWxsZXIuZ2VuZXJhdGVGREZUZW1wbGF0ZSggc291cmNlUERGLCBuYW1lUmVnZXgsIGZ1bmN0aW9uKGVyciwgZmRmRGF0YSkge1xyXG4gIC8vICAgICAvLyAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xyXG4gIC8vICAgICAvLyAgICAgY29uc29sZS5sb2coZmRmRGF0YSk7XHJcbiAgLy8gICAgIC8vIH0pO1xyXG4gIC8vICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgLy8gICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgLy8gICB9XHJcbiAgfVxyXG59XHJcbmV4cG9ydCA9IFBSRlNlcnZpY2U7XHJcbiJdfQ==
