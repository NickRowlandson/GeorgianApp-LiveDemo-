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
var CampusFilterPipe = (function () {
    function CampusFilterPipe() {
    }
    CampusFilterPipe.prototype.transform = function (array, query) {
        if (query) {
            return _.filter(array, function (row) { return row.campusId.indexOf(query) > -1; });
        }
        return array;
    };
    CampusFilterPipe = __decorate([
        core_1.Pipe({
            name: "campusFilter"
        })
    ], CampusFilterPipe);
    return CampusFilterPipe;
}());
exports.CampusFilterPipe = CampusFilterPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvcGlwZXMvY2FtcHVzLWZpbHRlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsMEJBQTRCO0FBQzVCLHNDQUFrRDtBQUtsRDtJQUFBO0lBUUEsQ0FBQztJQU5HLG9DQUFTLEdBQVQsVUFBVSxLQUFZLEVBQUUsS0FBYTtRQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1IsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQWhDLENBQWdDLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBUFEsZ0JBQWdCO1FBSDVCLFdBQUksQ0FBQztZQUNGLElBQUksRUFBRSxjQUFjO1NBQ3ZCLENBQUM7T0FDVyxnQkFBZ0IsQ0FRNUI7SUFBRCx1QkFBQztDQVJELEFBUUMsSUFBQTtBQVJZLDRDQUFnQiIsImZpbGUiOiJhcHAvcGlwZXMvY2FtcHVzLWZpbHRlci5waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6IFwiY2FtcHVzRmlsdGVyXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIENhbXB1c0ZpbHRlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgICB0cmFuc2Zvcm0oYXJyYXk6IGFueVtdLCBxdWVyeTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBpZiAocXVlcnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKGFycmF5LCByb3cgPT4gcm93LmNhbXB1c0lkLmluZGV4T2YocXVlcnkpID4gLTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9XHJcbn1cclxuIl19
