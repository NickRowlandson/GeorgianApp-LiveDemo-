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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvcGlwZXMvdXNlci1maWx0ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDBCQUE0QjtBQUM1QixzQ0FBa0Q7QUFLbEQ7SUFBQTtJQVFBLENBQUM7SUFORyxrQ0FBUyxHQUFULFVBQVUsS0FBWSxFQUFFLEtBQWE7UUFDakMsSUFBSSxLQUFLLEVBQUU7WUFDUCxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFVBQUEsR0FBRyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQXhGLENBQXdGLENBQUMsQ0FBQztTQUMzSDtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFQUSxjQUFjO1FBSDFCLFdBQUksQ0FBQztZQUNGLElBQUksRUFBRSxZQUFZO1NBQ3JCLENBQUM7T0FDVyxjQUFjLENBUTFCO0lBQUQscUJBQUM7Q0FSRCxBQVFDLElBQUE7QUFSWSx3Q0FBYyIsImZpbGUiOiJhcHAvcGlwZXMvdXNlci1maWx0ZXIucGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiBcInVzZXJGaWx0ZXJcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgVXNlckZpbHRlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgICB0cmFuc2Zvcm0oYXJyYXk6IGFueVtdLCBxdWVyeTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBpZiAocXVlcnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKGFycmF5LCByb3cgPT4gKChyb3cuZmlyc3ROYW1lKSArIFwiIFwiICsgKHJvdy5sYXN0TmFtZSkpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihxdWVyeS50b0xvd2VyQ2FzZSgpKSA+IC0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
