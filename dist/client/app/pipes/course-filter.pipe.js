System.register(["lodash", "@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var _, core_1, CourseFilterPipe;
    return {
        setters: [
            function (_1) {
                _ = _1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            CourseFilterPipe = (function () {
                function CourseFilterPipe() {
                }
                CourseFilterPipe.prototype.transform = function (array, query) {
                    if (query) {
                        return _.filter(array, function (row) { return (row.courseName).toLowerCase().indexOf(query.toLowerCase()) > -1; });
                    }
                    return array;
                };
                CourseFilterPipe = __decorate([
                    core_1.Pipe({
                        name: "courseFilter"
                    })
                ], CourseFilterPipe);
                return CourseFilterPipe;
            }());
            exports_1("CourseFilterPipe", CourseFilterPipe);
        }
    };
});

//# sourceMappingURL=course-filter.pipe.js.map
