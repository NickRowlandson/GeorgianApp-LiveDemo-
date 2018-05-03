"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var core_1 = require("@angular/core");
var CourseFilterPipe = /** @class */ (function () {
    function CourseFilterPipe() {
    }
    CourseFilterPipe.prototype.transform = function (array, query) {
        if (query) {
            return _.filter(array, function (row) { return (row.courseName).toLowerCase().indexOf(query.toLowerCase()) > -1; });
        }
        return array;
    };
    CourseFilterPipe = __decorate([
        core_1.Pipe({
            name: "courseFilter"
        })
    ], CourseFilterPipe);
    return CourseFilterPipe;
}());
exports.CourseFilterPipe = CourseFilterPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvcGlwZXMvY291cnNlLWZpbHRlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsMEJBQTRCO0FBQzVCLHNDQUFrRDtBQUtsRDtJQUFBO0lBUUEsQ0FBQztJQU5HLG9DQUFTLEdBQVQsVUFBVSxLQUFZLEVBQUUsS0FBYTtRQUNqQyxJQUFJLEtBQUssRUFBRTtZQUNQLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBQSxHQUFHLElBQUksT0FBQSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQWhFLENBQWdFLENBQUMsQ0FBQztTQUNuRztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFQUSxnQkFBZ0I7UUFINUIsV0FBSSxDQUFDO1lBQ0YsSUFBSSxFQUFFLGNBQWM7U0FDdkIsQ0FBQztPQUNXLGdCQUFnQixDQVE1QjtJQUFELHVCQUFDO0NBUkQsQUFRQyxJQUFBO0FBUlksNENBQWdCIiwiZmlsZSI6ImFwcC9waXBlcy9jb3Vyc2UtZmlsdGVyLnBpcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogXCJjb3Vyc2VGaWx0ZXJcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ291cnNlRmlsdGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICAgIHRyYW5zZm9ybShhcnJheTogYW55W10sIHF1ZXJ5OiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGlmIChxdWVyeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gXy5maWx0ZXIoYXJyYXksIHJvdyA9PiAocm93LmNvdXJzZU5hbWUpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihxdWVyeS50b0xvd2VyQ2FzZSgpKSA+IC0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
