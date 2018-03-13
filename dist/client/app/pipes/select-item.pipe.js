"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SelectItemPipe = /** @class */ (function () {
    function SelectItemPipe() {
    }
    SelectItemPipe.prototype.transform = function (students) {
        if (!students) {
            return undefined;
        }
        else {
            return students.map(function (s) { return ({ label: s.firstName + ' ' + s.lastName, value: s.userID }); });
        }
    };
    SelectItemPipe = __decorate([
        core_1.Pipe({
            name: "toSelectItem"
        })
    ], SelectItemPipe);
    return SelectItemPipe;
}());
exports.SelectItemPipe = SelectItemPipe;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvcGlwZXMvc2VsZWN0LWl0ZW0ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBLHNDQUFrRDtBQU9sRDtJQUFBO0lBU0EsQ0FBQztJQVBRLGtDQUFTLEdBQWhCLFVBQWlCLFFBQW1CO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNkLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbkIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUE1RCxDQUE0RCxDQUFDLENBQUM7UUFDekYsQ0FBQztJQUNILENBQUM7SUFSVSxjQUFjO1FBSDFCLFdBQUksQ0FBQztZQUNGLElBQUksRUFBRSxjQUFjO1NBQ3ZCLENBQUM7T0FDVyxjQUFjLENBUzFCO0lBQUQscUJBQUM7Q0FURCxBQVNDLElBQUE7QUFUWSx3Q0FBYyIsImZpbGUiOiJhcHAvcGlwZXMvc2VsZWN0LWl0ZW0ucGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL3ByaW1lbmcnO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uL21vZGVscy9TdHVkZW50XCI7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiBcInRvU2VsZWN0SXRlbVwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3RJdGVtUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICBwdWJsaWMgdHJhbnNmb3JtKHN0dWRlbnRzOiBTdHVkZW50W10pOiBTZWxlY3RJdGVtW10ge1xyXG4gICAgaWYgKCFzdHVkZW50cykge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHN0dWRlbnRzLm1hcChzID0+ICh7IGxhYmVsOiBzLmZpcnN0TmFtZSArICcgJyArIHMubGFzdE5hbWUsIHZhbHVlOiBzLnVzZXJJRCB9KSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==
