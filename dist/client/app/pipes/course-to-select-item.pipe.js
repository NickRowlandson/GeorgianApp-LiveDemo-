"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CourseSelectItemPipe = /** @class */ (function () {
    function CourseSelectItemPipe() {
    }
    CourseSelectItemPipe.prototype.transform = function (course) {
        if (!course) {
            return undefined;
        }
        else {
            return course.map(function (s) { return ({ label: s.courseName, value: s.courseID }); });
        }
    };
    CourseSelectItemPipe = __decorate([
        core_1.Pipe({
            name: "courseToSelectItem"
        })
    ], CourseSelectItemPipe);
    return CourseSelectItemPipe;
}());
exports.CourseSelectItemPipe = CourseSelectItemPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvcGlwZXMvY291cnNlLXRvLXNlbGVjdC1pdGVtLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQSxzQ0FBa0Q7QUFPbEQ7SUFBQTtJQVNBLENBQUM7SUFQUSx3Q0FBUyxHQUFoQixVQUFpQixNQUFnQjtRQUMvQixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsT0FBTyxTQUFTLENBQUM7U0FDbEI7YUFBTTtZQUNMLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQTVDLENBQTRDLENBQUMsQ0FBQztTQUN0RTtJQUNILENBQUM7SUFSVSxvQkFBb0I7UUFIaEMsV0FBSSxDQUFDO1lBQ0YsSUFBSSxFQUFFLG9CQUFvQjtTQUM3QixDQUFDO09BQ1csb0JBQW9CLENBU2hDO0lBQUQsMkJBQUM7Q0FURCxBQVNDLElBQUE7QUFUWSxvREFBb0IiLCJmaWxlIjoiYXBwL3BpcGVzL2NvdXJzZS10by1zZWxlY3QtaXRlbS5waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmltcG9ydCB7IENvdXJzZSB9IGZyb20gXCIuLi9tb2RlbHMvQ291cnNlXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiBcImNvdXJzZVRvU2VsZWN0SXRlbVwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb3Vyc2VTZWxlY3RJdGVtUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICBwdWJsaWMgdHJhbnNmb3JtKGNvdXJzZTogQ291cnNlW10pOiBTZWxlY3RJdGVtW10ge1xyXG4gICAgaWYgKCFjb3Vyc2UpIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBjb3Vyc2UubWFwKHMgPT4gKHsgbGFiZWw6IHMuY291cnNlTmFtZSwgdmFsdWU6IHMuY291cnNlSUQgfSkpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
