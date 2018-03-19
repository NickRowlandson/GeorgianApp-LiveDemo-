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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvcGlwZXMvc3R1ZGVudC10by1zZWxlY3QtaXRlbS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0Esc0NBQWtEO0FBT2xEO0lBQUE7SUFTQSxDQUFDO0lBUFEseUNBQVMsR0FBaEIsVUFBaUIsUUFBbUI7UUFDbEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNuQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQTVELENBQTRELENBQUMsQ0FBQztRQUN6RixDQUFDO0lBQ0gsQ0FBQztJQVJVLHFCQUFxQjtRQUhqQyxXQUFJLENBQUM7WUFDRixJQUFJLEVBQUUscUJBQXFCO1NBQzlCLENBQUM7T0FDVyxxQkFBcUIsQ0FTakM7SUFBRCw0QkFBQztDQVRELEFBU0MsSUFBQTtBQVRZLHNEQUFxQiIsImZpbGUiOiJhcHAvcGlwZXMvc3R1ZGVudC10by1zZWxlY3QtaXRlbS5waXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vbW9kZWxzL1N0dWRlbnRcIjtcclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6IFwic3R1ZGVudFRvU2VsZWN0SXRlbVwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdHVkZW50U2VsZWN0SXRlbVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgcHVibGljIHRyYW5zZm9ybShzdHVkZW50czogU3R1ZGVudFtdKTogU2VsZWN0SXRlbVtdIHtcclxuICAgIGlmICghc3R1ZGVudHMpIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBzdHVkZW50cy5tYXAocyA9PiAoeyBsYWJlbDogcy5maXJzdE5hbWUgKyAnICcgKyBzLmxhc3ROYW1lLCB2YWx1ZTogcy51c2VySUQgfSkpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
