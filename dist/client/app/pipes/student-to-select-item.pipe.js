"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let StudentSelectItemPipe = class StudentSelectItemPipe {
    transform(students) {
        if (!students) {
            return undefined;
        }
        else {
            return students.map(s => ({ label: s.firstName + ' ' + s.lastName, value: s.userID }));
        }
    }
};
StudentSelectItemPipe = __decorate([
    core_1.Pipe({
        name: "studentToSelectItem"
    })
], StudentSelectItemPipe);
exports.StudentSelectItemPipe = StudentSelectItemPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvcGlwZXMvc3R1ZGVudC10by1zZWxlY3QtaXRlbS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0Esd0NBQWtEO0FBT2xELElBQWEscUJBQXFCLEdBQWxDO0lBRVMsU0FBUyxDQUFDLFFBQW1CO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixPQUFPLFNBQVMsQ0FBQztTQUNsQjthQUFNO1lBQ0wsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3hGO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFUWSxxQkFBcUI7SUFIakMsV0FBSSxDQUFDO1FBQ0YsSUFBSSxFQUFFLHFCQUFxQjtLQUM5QixDQUFDO0dBQ1cscUJBQXFCLENBU2pDO0FBVFksc0RBQXFCIiwiZmlsZSI6ImFwcC9waXBlcy9zdHVkZW50LXRvLXNlbGVjdC1pdGVtLnBpcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi9tb2RlbHMvU3R1ZGVudFwiO1xyXG5cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogXCJzdHVkZW50VG9TZWxlY3RJdGVtXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIFN0dWRlbnRTZWxlY3RJdGVtUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICBwdWJsaWMgdHJhbnNmb3JtKHN0dWRlbnRzOiBTdHVkZW50W10pOiBTZWxlY3RJdGVtW10ge1xyXG4gICAgaWYgKCFzdHVkZW50cykge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHN0dWRlbnRzLm1hcChzID0+ICh7IGxhYmVsOiBzLmZpcnN0TmFtZSArICcgJyArIHMubGFzdE5hbWUsIHZhbHVlOiBzLnVzZXJJRCB9KSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==
