"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let CourseTypeSelectItemPipe = class CourseTypeSelectItemPipe {
    transform(courseType) {
        if (!courseType) {
            return undefined;
        }
        else {
            return courseType.map(s => ({ label: s.courseType, value: s.courseType }));
        }
    }
};
CourseTypeSelectItemPipe = __decorate([
    core_1.Pipe({
        name: "courseTypeToSelectItem"
    })
], CourseTypeSelectItemPipe);
exports.CourseTypeSelectItemPipe = CourseTypeSelectItemPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvcGlwZXMvY291cnNlLXR5cGUtdG8tc2VsZWN0LWl0ZW0ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBLHdDQUFrRDtBQU9sRCxJQUFhLHdCQUF3QixHQUFyQztJQUVTLFNBQVMsQ0FBQyxVQUFpQjtRQUNoQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsT0FBTyxTQUFTLENBQUM7U0FDbEI7YUFBTTtZQUNMLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM1RTtJQUNILENBQUM7Q0FDRixDQUFBO0FBVFksd0JBQXdCO0lBSHBDLFdBQUksQ0FBQztRQUNGLElBQUksRUFBRSx3QkFBd0I7S0FDakMsQ0FBQztHQUNXLHdCQUF3QixDQVNwQztBQVRZLDREQUF3QiIsImZpbGUiOiJhcHAvcGlwZXMvY291cnNlLXR5cGUtdG8tc2VsZWN0LWl0ZW0ucGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5pbXBvcnQgeyBDb3Vyc2UgfSBmcm9tIFwiLi4vbW9kZWxzL0NvdXJzZVwiO1xyXG5cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogXCJjb3Vyc2VUeXBlVG9TZWxlY3RJdGVtXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIENvdXJzZVR5cGVTZWxlY3RJdGVtUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICBwdWJsaWMgdHJhbnNmb3JtKGNvdXJzZVR5cGU6IGFueVtdKTogU2VsZWN0SXRlbVtdIHtcclxuICAgIGlmICghY291cnNlVHlwZSkge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGNvdXJzZVR5cGUubWFwKHMgPT4gKHsgbGFiZWw6IHMuY291cnNlVHlwZSwgdmFsdWU6IHMuY291cnNlVHlwZSB9KSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==
