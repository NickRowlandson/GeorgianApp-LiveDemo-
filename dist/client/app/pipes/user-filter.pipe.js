"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const core_1 = require("@angular/core");
let UserFilterPipe = class UserFilterPipe {
    transform(array, query) {
        if (query) {
            return _.filter(array, row => ((row.firstName) + " " + (row.lastName)).toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
        return array;
    }
};
UserFilterPipe = __decorate([
    core_1.Pipe({
        name: "userFilter"
    })
], UserFilterPipe);
exports.UserFilterPipe = UserFilterPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvcGlwZXMvdXNlci1maWx0ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDRCQUE0QjtBQUM1Qix3Q0FBa0Q7QUFLbEQsSUFBYSxjQUFjLEdBQTNCO0lBRUksU0FBUyxDQUFDLEtBQVksRUFBRSxLQUFhO1FBQ2pDLElBQUksS0FBSyxFQUFFO1lBQ1AsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0g7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0osQ0FBQTtBQVJZLGNBQWM7SUFIMUIsV0FBSSxDQUFDO1FBQ0YsSUFBSSxFQUFFLFlBQVk7S0FDckIsQ0FBQztHQUNXLGNBQWMsQ0FRMUI7QUFSWSx3Q0FBYyIsImZpbGUiOiJhcHAvcGlwZXMvdXNlci1maWx0ZXIucGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiBcInVzZXJGaWx0ZXJcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgVXNlckZpbHRlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgICB0cmFuc2Zvcm0oYXJyYXk6IGFueVtdLCBxdWVyeTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBpZiAocXVlcnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKGFycmF5LCByb3cgPT4gKChyb3cuZmlyc3ROYW1lKSArIFwiIFwiICsgKHJvdy5sYXN0TmFtZSkpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihxdWVyeS50b0xvd2VyQ2FzZSgpKSA+IC0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
