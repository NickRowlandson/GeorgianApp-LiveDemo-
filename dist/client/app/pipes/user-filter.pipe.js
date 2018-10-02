System.register(["lodash", "@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var _, core_1, UserFilterPipe;
    var __moduleName = context_1 && context_1.id;
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
            UserFilterPipe = class UserFilterPipe {
                transform(array, query) {
                    if (query) {
                        return _.filter(array, row => ((row.firstName) + " " + (row.lastName)).toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }
                    return array;
                }
            };
            UserFilterPipe = __decorate([
                core_1.Pipe({
                    name: "userFilter"
                })
            ], UserFilterPipe);
            exports_1("UserFilterPipe", UserFilterPipe);
        }
    };
});

//# sourceMappingURL=user-filter.pipe.js.map
