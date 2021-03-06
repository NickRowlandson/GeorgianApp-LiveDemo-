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
let CourseFilterPipe = class CourseFilterPipe {
    transform(array, query) {
        if (query) {
            return _.filter(array, row => (row.courseName).toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
        return array;
    }
};
CourseFilterPipe = __decorate([
    core_1.Pipe({
        name: "courseFilter"
    })
], CourseFilterPipe);
exports.CourseFilterPipe = CourseFilterPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvcGlwZXMvY291cnNlLWZpbHRlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsNEJBQTRCO0FBQzVCLHdDQUFrRDtBQUtsRCxJQUFhLGdCQUFnQixHQUE3QjtJQUVJLFNBQVMsQ0FBQyxLQUFZLEVBQUUsS0FBYTtRQUNqQyxJQUFJLEtBQUssRUFBRTtZQUNQLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuRztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FDSixDQUFBO0FBUlksZ0JBQWdCO0lBSDVCLFdBQUksQ0FBQztRQUNGLElBQUksRUFBRSxjQUFjO0tBQ3ZCLENBQUM7R0FDVyxnQkFBZ0IsQ0FRNUI7QUFSWSw0Q0FBZ0IiLCJmaWxlIjoiYXBwL3BpcGVzL2NvdXJzZS1maWx0ZXIucGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiBcImNvdXJzZUZpbHRlclwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb3Vyc2VGaWx0ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcblxyXG4gICAgdHJhbnNmb3JtKGFycmF5OiBhbnlbXSwgcXVlcnk6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgaWYgKHF1ZXJ5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfLmZpbHRlcihhcnJheSwgcm93ID0+IChyb3cuY291cnNlTmFtZSkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHF1ZXJ5LnRvTG93ZXJDYXNlKCkpID4gLTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9XHJcbn1cclxuIl19
