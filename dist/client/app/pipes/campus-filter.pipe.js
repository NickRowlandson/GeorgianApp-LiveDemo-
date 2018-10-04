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
let CampusFilterPipe = class CampusFilterPipe {
    transform(array, query) {
        if (query) {
            return _.filter(array, row => row.campusId.indexOf(query) > -1);
        }
        return array;
    }
};
CampusFilterPipe = __decorate([
    core_1.Pipe({
        name: "campusFilter"
    })
], CampusFilterPipe);
exports.CampusFilterPipe = CampusFilterPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvcGlwZXMvY2FtcHVzLWZpbHRlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsNEJBQTRCO0FBQzVCLHdDQUFrRDtBQUtsRCxJQUFhLGdCQUFnQixHQUE3QjtJQUVJLFNBQVMsQ0FBQyxLQUFZLEVBQUUsS0FBYTtRQUNqQyxJQUFJLEtBQUssRUFBRTtZQUNQLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25FO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztDQUNKLENBQUE7QUFSWSxnQkFBZ0I7SUFINUIsV0FBSSxDQUFDO1FBQ0YsSUFBSSxFQUFFLGNBQWM7S0FDdkIsQ0FBQztHQUNXLGdCQUFnQixDQVE1QjtBQVJZLDRDQUFnQiIsImZpbGUiOiJhcHAvcGlwZXMvY2FtcHVzLWZpbHRlci5waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6IFwiY2FtcHVzRmlsdGVyXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIENhbXB1c0ZpbHRlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgICB0cmFuc2Zvcm0oYXJyYXk6IGFueVtdLCBxdWVyeTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBpZiAocXVlcnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKGFycmF5LCByb3cgPT4gcm93LmNhbXB1c0lkLmluZGV4T2YocXVlcnkpID4gLTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9XHJcbn1cclxuIl19
