"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let InstructorSelectItemPipe = class InstructorSelectItemPipe {
    transform(users) {
        if (!users) {
            return undefined;
        }
        else {
            return users.map(s => ({ label: s.firstName + ' ' + s.lastName, value: s.userID }));
        }
    }
};
InstructorSelectItemPipe = __decorate([
    core_1.Pipe({
        name: "instructorToSelectItem"
    })
], InstructorSelectItemPipe);
exports.InstructorSelectItemPipe = InstructorSelectItemPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvcGlwZXMvaW5zdHJ1Y3Rvci10by1zZWxlY3QtaXRlbS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0Esd0NBQWtEO0FBT2xELElBQWEsd0JBQXdCLEdBQXJDO0lBRVMsU0FBUyxDQUFDLEtBQWE7UUFDNUIsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDckY7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQVRZLHdCQUF3QjtJQUhwQyxXQUFJLENBQUM7UUFDRixJQUFJLEVBQUUsd0JBQXdCO0tBQ2pDLENBQUM7R0FDVyx3QkFBd0IsQ0FTcEM7QUFUWSw0REFBd0IiLCJmaWxlIjoiYXBwL3BpcGVzL2luc3RydWN0b3ItdG8tc2VsZWN0LWl0ZW0ucGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL21vZGVscy9Vc2VyXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiBcImluc3RydWN0b3JUb1NlbGVjdEl0ZW1cIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW5zdHJ1Y3RvclNlbGVjdEl0ZW1QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcblxyXG4gIHB1YmxpYyB0cmFuc2Zvcm0odXNlcnM6IFVzZXJbXSk6IFNlbGVjdEl0ZW1bXSB7XHJcbiAgICBpZiAoIXVzZXJzKSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdXNlcnMubWFwKHMgPT4gKHsgbGFiZWw6IHMuZmlyc3ROYW1lICsgJyAnICsgcy5sYXN0TmFtZSwgdmFsdWU6IHMudXNlcklEIH0pKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19
