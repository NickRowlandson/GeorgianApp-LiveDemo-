"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let CourseSelectItemPipe = class CourseSelectItemPipe {
    transform(course) {
        if (!course) {
            return undefined;
        }
        else {
            return course.map(s => ({ label: s.courseName, value: s.courseID }));
        }
    }
};
CourseSelectItemPipe = __decorate([
    core_1.Pipe({
        name: "courseToSelectItem"
    })
], CourseSelectItemPipe);
exports.CourseSelectItemPipe = CourseSelectItemPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvcGlwZXMvY291cnNlLXRvLXNlbGVjdC1pdGVtLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQSx3Q0FBa0Q7QUFPbEQsSUFBYSxvQkFBb0IsR0FBakM7SUFFUyxTQUFTLENBQUMsTUFBZ0I7UUFDL0IsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO2FBQU07WUFDTCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDdEU7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQVRZLG9CQUFvQjtJQUhoQyxXQUFJLENBQUM7UUFDRixJQUFJLEVBQUUsb0JBQW9CO0tBQzdCLENBQUM7R0FDVyxvQkFBb0IsQ0FTaEM7QUFUWSxvREFBb0IiLCJmaWxlIjoiYXBwL3BpcGVzL2NvdXJzZS10by1zZWxlY3QtaXRlbS5waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gXCIuLi9tb2RlbHMvQ291cnNlXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiBcImNvdXJzZVRvU2VsZWN0SXRlbVwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb3Vyc2VTZWxlY3RJdGVtUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICBwdWJsaWMgdHJhbnNmb3JtKGNvdXJzZTogQ291cnNlW10pOiBTZWxlY3RJdGVtW10ge1xyXG4gICAgaWYgKCFjb3Vyc2UpIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBjb3Vyc2UubWFwKHMgPT4gKHsgbGFiZWw6IHMuY291cnNlTmFtZSwgdmFsdWU6IHMuY291cnNlSUQgfSkpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
