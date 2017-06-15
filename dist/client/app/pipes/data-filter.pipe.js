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
var DataFilterPipe = (function () {
    function DataFilterPipe() {
    }
    DataFilterPipe.prototype.transform = function (array, query) {
        if (query) {
            return _.filter(array, function (row) { return row.firstName.indexOf(query) > -1; });
        }
        return array;
    };
    return DataFilterPipe;
}());
DataFilterPipe = __decorate([
    core_1.Pipe({
        name: "dataFilter"
    })
], DataFilterPipe);
exports.DataFilterPipe = DataFilterPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvcGlwZXMvZGF0YS1maWx0ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDBCQUE0QjtBQUM1QixzQ0FBa0Q7QUFLbEQsSUFBYSxjQUFjO0lBQTNCO0lBUUEsQ0FBQztJQU5HLGtDQUFTLEdBQVQsVUFBVSxLQUFZLEVBQUUsS0FBYTtRQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1IsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQVJBLEFBUUMsSUFBQTtBQVJZLGNBQWM7SUFIMUIsV0FBSSxDQUFDO1FBQ0YsSUFBSSxFQUFFLFlBQVk7S0FDckIsQ0FBQztHQUNXLGNBQWMsQ0FRMUI7QUFSWSx3Q0FBYyIsImZpbGUiOiJhcHAvcGlwZXMvZGF0YS1maWx0ZXIucGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiBcImRhdGFGaWx0ZXJcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0YUZpbHRlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgICB0cmFuc2Zvcm0oYXJyYXk6IGFueVtdLCBxdWVyeTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBpZiAocXVlcnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKGFycmF5LCByb3cgPT4gcm93LmZpcnN0TmFtZS5pbmRleE9mKHF1ZXJ5KSA+IC0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
