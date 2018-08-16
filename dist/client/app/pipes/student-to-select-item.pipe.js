"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var StudentSelectItemPipe = /** @class */ (function () {
    function StudentSelectItemPipe() {
    }
    StudentSelectItemPipe.prototype.transform = function (students) {
        if (!students) {
            return undefined;
        }
        else {
            return students.map(function (s) { return ({ label: s.firstName + ' ' + s.lastName, value: s.userID }); });
        }
    };
    StudentSelectItemPipe = __decorate([
        core_1.Pipe({
            name: "studentToSelectItem"
        })
    ], StudentSelectItemPipe);
    return StudentSelectItemPipe;
}());
exports.StudentSelectItemPipe = StudentSelectItemPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvcGlwZXMvc3R1ZGVudC10by1zZWxlY3QtaXRlbS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0Esc0NBQWtEO0FBT2xEO0lBQUE7SUFTQSxDQUFDO0lBUFEseUNBQVMsR0FBaEIsVUFBaUIsUUFBbUI7UUFDbEMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO2FBQU07WUFDTCxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUE1RCxDQUE0RCxDQUFDLENBQUM7U0FDeEY7SUFDSCxDQUFDO0lBUlUscUJBQXFCO1FBSGpDLFdBQUksQ0FBQztZQUNGLElBQUksRUFBRSxxQkFBcUI7U0FDOUIsQ0FBQztPQUNXLHFCQUFxQixDQVNqQztJQUFELDRCQUFDO0NBVEQsQUFTQyxJQUFBO0FBVFksc0RBQXFCIiwiZmlsZSI6ImFwcC9waXBlcy9zdHVkZW50LXRvLXNlbGVjdC1pdGVtLnBpcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi9tb2RlbHMvU3R1ZGVudFwiO1xyXG5cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogXCJzdHVkZW50VG9TZWxlY3RJdGVtXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIFN0dWRlbnRTZWxlY3RJdGVtUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICBwdWJsaWMgdHJhbnNmb3JtKHN0dWRlbnRzOiBTdHVkZW50W10pOiBTZWxlY3RJdGVtW10ge1xyXG4gICAgaWYgKCFzdHVkZW50cykge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHN0dWRlbnRzLm1hcChzID0+ICh7IGxhYmVsOiBzLmZpcnN0TmFtZSArICcgJyArIHMubGFzdE5hbWUsIHZhbHVlOiBzLnVzZXJJRCB9KSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==
