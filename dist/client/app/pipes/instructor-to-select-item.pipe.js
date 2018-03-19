"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var InstructorSelectItemPipe = /** @class */ (function () {
    function InstructorSelectItemPipe() {
    }
    InstructorSelectItemPipe.prototype.transform = function (users) {
        if (!users) {
            return undefined;
        }
        else {
            return users.map(function (s) { return ({ label: s.firstName + ' ' + s.lastName, value: s.userID }); });
        }
    };
    InstructorSelectItemPipe = __decorate([
        core_1.Pipe({
            name: "instructorToSelectItem"
        })
    ], InstructorSelectItemPipe);
    return InstructorSelectItemPipe;
}());
exports.InstructorSelectItemPipe = InstructorSelectItemPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvcGlwZXMvaW5zdHJ1Y3Rvci10by1zZWxlY3QtaXRlbS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0Esc0NBQWtEO0FBT2xEO0lBQUE7SUFTQSxDQUFDO0lBUFEsNENBQVMsR0FBaEIsVUFBaUIsS0FBYTtRQUM1QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ25CLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBNUQsQ0FBNEQsQ0FBQyxDQUFDO1FBQ3RGLENBQUM7SUFDSCxDQUFDO0lBUlUsd0JBQXdCO1FBSHBDLFdBQUksQ0FBQztZQUNGLElBQUksRUFBRSx3QkFBd0I7U0FDakMsQ0FBQztPQUNXLHdCQUF3QixDQVNwQztJQUFELCtCQUFDO0NBVEQsQUFTQyxJQUFBO0FBVFksNERBQXdCIiwiZmlsZSI6ImFwcC9waXBlcy9pbnN0cnVjdG9yLXRvLXNlbGVjdC1pdGVtLnBpcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9tb2RlbHMvVXNlclwiO1xyXG5cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogXCJpbnN0cnVjdG9yVG9TZWxlY3RJdGVtXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIEluc3RydWN0b3JTZWxlY3RJdGVtUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICBwdWJsaWMgdHJhbnNmb3JtKHVzZXJzOiBVc2VyW10pOiBTZWxlY3RJdGVtW10ge1xyXG4gICAgaWYgKCF1c2Vycykge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHVzZXJzLm1hcChzID0+ICh7IGxhYmVsOiBzLmZpcnN0TmFtZSArICcgJyArIHMubGFzdE5hbWUsIHZhbHVlOiBzLnVzZXJJRCB9KSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==
