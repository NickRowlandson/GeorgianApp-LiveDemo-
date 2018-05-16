System.register(["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, StudentSelectItemPipe;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            StudentSelectItemPipe = /** @class */ (function () {
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
            exports_1("StudentSelectItemPipe", StudentSelectItemPipe);
        }
    };
});

//# sourceMappingURL=student-to-select-item.pipe.js.map
