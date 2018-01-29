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
var UserFilterPipe = /** @class */ (function () {
    function UserFilterPipe() {
    }
    UserFilterPipe.prototype.transform = function (array, query) {
        if (query) {
            return _.filter(array, function (row) { return ((row.firstName) + " " + (row.lastName)).toLowerCase().indexOf(query.toLowerCase()) > -1; });
        }
        return array;
    };
    UserFilterPipe = __decorate([
        core_1.Pipe({
            name: "userFilter"
        })
    ], UserFilterPipe);
    return UserFilterPipe;
}());
exports.UserFilterPipe = UserFilterPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvcGlwZXMvdXNlci1maWx0ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDBCQUE0QjtBQUM1QixzQ0FBa0Q7QUFLbEQ7SUFBQTtJQVFBLENBQUM7SUFORyxrQ0FBUyxHQUFULFVBQVUsS0FBWSxFQUFFLEtBQWE7UUFDakMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNSLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxVQUFBLEdBQUcsSUFBSSxPQUFBLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUF4RixDQUF3RixDQUFDLENBQUM7UUFDNUgsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQVBRLGNBQWM7UUFIMUIsV0FBSSxDQUFDO1lBQ0YsSUFBSSxFQUFFLFlBQVk7U0FDckIsQ0FBQztPQUNXLGNBQWMsQ0FRMUI7SUFBRCxxQkFBQztDQVJELEFBUUMsSUFBQTtBQVJZLHdDQUFjIiwiZmlsZSI6ImFwcC9waXBlcy91c2VyLWZpbHRlci5waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6IFwidXNlckZpbHRlclwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVc2VyRmlsdGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICAgIHRyYW5zZm9ybShhcnJheTogYW55W10sIHF1ZXJ5OiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGlmIChxdWVyeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gXy5maWx0ZXIoYXJyYXksIHJvdyA9PiAoKHJvdy5maXJzdE5hbWUpICsgXCIgXCIgKyAocm93Lmxhc3ROYW1lKSkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHF1ZXJ5LnRvTG93ZXJDYXNlKCkpID4gLTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9XHJcbn1cclxuIl19
