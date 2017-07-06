"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var VisviewComponent = (function () {
    // Create a DataSet (allows two way data-binding)
    function VisviewComponent(router) {
        this.router = router;
    }
    VisviewComponent.prototype.ngOnInit = function () {
        var container = document.getElementById('visualization');
        this.items = new vis.DataSet();
        this.groups = new vis.DataSet();
        this.items.add({ id: 0, content: 'Math Lv1', start: '2017-07-05 8:00', end: '2017-07-05 11:00', group: 0 });
        this.groups.add([
            { id: 0, content: 'Math' },
            { id: 1, content: 'Chemistry' },
            { id: 3, content: 'Comm' },
            { id: 4, content: 'Biology' }
        ]);
        // Configuration for the Timeline
        var options = {};
        // Create a Timeline
        this.timeline = new vis.Timeline(container, this.items, this.groups, options);
    };
    VisviewComponent.prototype.add = function () {
        this.items.add({ id: 1, content: 'Math LV2', start: '2017-07-06 16:00', end: '2017-07-06 19:00', group: 0 });
        this.timeline.setData(this.items);
    };
    VisviewComponent.prototype.add2 = function () {
        this.items.add({ id: 2, content: 'Comm Lv1', start: '2017-07-07 14:00 ', end: '2017-07-07 15:00', group: 3 });
        this.timeline.setData(this.items);
    };
    VisviewComponent.prototype.add3 = function () {
        this.items.add({ id: 3, content: 'Chemistry LV1', start: '2017-07-08 17:00', end: '2017-07-0820:00', group: 1 });
        this.timeline.setData(this.items);
    };
    return VisviewComponent;
}());
VisviewComponent = __decorate([
    core_1.Component({
        selector: 'visview',
        templateUrl: './app/components/visview/visview.component.html',
        styleUrls: ['./app/components/visview/visview.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router])
], VisviewComponent);
exports.VisviewComponent = VisviewComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy92aXN2aWV3L3Zpc3ZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF5QztBQVd6QyxJQUFhLGdCQUFnQjtJQUt6QixpREFBaUQ7SUFFakQsMEJBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBRWxDLENBQUM7SUFFRCxtQ0FBUSxHQUFSO1FBRUksSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNaLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFO1lBQzFCLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFO1lBQy9CLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFO1lBQzFCLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFO1NBQ2hDLENBQUMsQ0FBQztRQUNILGlDQUFpQztRQUNqQyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFFakIsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVELDhCQUFHLEdBQUg7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUV0QyxDQUFDO0lBRUQsK0JBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxHQUFHLEVBQUUsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCwrQkFBSSxHQUFKO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqSCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFdEMsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0E5Q0EsQUE4Q0MsSUFBQTtBQTlDWSxnQkFBZ0I7SUFQNUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxTQUFTO1FBQ25CLFdBQVcsRUFBRSxpREFBaUQ7UUFDOUQsU0FBUyxFQUFFLENBQUMsZ0RBQWdELENBQUM7S0FDaEUsQ0FBQztxQ0FVOEIsZUFBTTtHQVB6QixnQkFBZ0IsQ0E4QzVCO0FBOUNZLDRDQUFnQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy92aXN2aWV3L3Zpc3ZpZXcuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmRlY2xhcmUgdmFyIHZpcztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd2aXN2aWV3JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy92aXN2aWV3L3Zpc3ZpZXcuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvdmlzdmlldy92aXN2aWV3LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBWaXN2aWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGl0ZW1zOiBhbnk7XHJcbiAgICBncm91cHM6IGFueTtcclxuICAgIHRpbWVsaW5lOiBhbnk7XHJcbiAgICBlcnJvcjogYW55O1xyXG4gICAgLy8gQ3JlYXRlIGEgRGF0YVNldCAoYWxsb3dzIHR3byB3YXkgZGF0YS1iaW5kaW5nKVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcblxyXG4gICAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzdWFsaXphdGlvbicpO1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBuZXcgdmlzLkRhdGFTZXQoKTtcclxuICAgICAgICB0aGlzLmdyb3VwcyA9IG5ldyB2aXMuRGF0YVNldCgpO1xyXG4gICAgICAgIHRoaXMuaXRlbXMuYWRkKHsgaWQ6IDAsIGNvbnRlbnQ6ICdNYXRoIEx2MScsIHN0YXJ0OiAnMjAxNy0wNy0wNSA4OjAwJywgZW5kOiAnMjAxNy0wNy0wNSAxMTowMCcsIGdyb3VwOiAwIH0pO1xyXG4gICAgICAgIHRoaXMuZ3JvdXBzLmFkZChbXHJcbiAgICAgICAgICAgIHsgaWQ6IDAsIGNvbnRlbnQ6ICdNYXRoJyB9LFxyXG4gICAgICAgICAgICB7IGlkOiAxLCBjb250ZW50OiAnQ2hlbWlzdHJ5JyB9LFxyXG4gICAgICAgICAgICB7IGlkOiAzLCBjb250ZW50OiAnQ29tbScgfSxcclxuICAgICAgICAgICAgeyBpZDogNCwgY29udGVudDogJ0Jpb2xvZ3knIH1cclxuICAgICAgICBdKTtcclxuICAgICAgICAvLyBDb25maWd1cmF0aW9uIGZvciB0aGUgVGltZWxpbmVcclxuICAgICAgICB2YXIgb3B0aW9ucyA9IHt9O1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBUaW1lbGluZVxyXG4gICAgICAgIHRoaXMudGltZWxpbmUgPSBuZXcgdmlzLlRpbWVsaW5lKGNvbnRhaW5lciwgdGhpcy5pdGVtcywgdGhpcy5ncm91cHMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZCgpIHtcclxuICAgICAgICB0aGlzLml0ZW1zLmFkZCh7IGlkOiAxLCBjb250ZW50OiAnTWF0aCBMVjInLCBzdGFydDogJzIwMTctMDctMDYgMTY6MDAnLCBlbmQ6ICcyMDE3LTA3LTA2IDE5OjAwJywgZ3JvdXA6IDAgfSk7XHJcbiAgICAgICAgdGhpcy50aW1lbGluZS5zZXREYXRhKHRoaXMuaXRlbXMpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhZGQyKCkge1xyXG4gICAgICAgIHRoaXMuaXRlbXMuYWRkKHsgaWQ6IDIsIGNvbnRlbnQ6ICdDb21tIEx2MScsIHN0YXJ0OiAnMjAxNy0wNy0wNyAxNDowMCAnLCBlbmQ6ICcyMDE3LTA3LTA3IDE1OjAwJywgZ3JvdXA6IDMgfSk7XHJcbiAgICAgICAgdGhpcy50aW1lbGluZS5zZXREYXRhKHRoaXMuaXRlbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZDMoKSB7XHJcbiAgICAgICAgdGhpcy5pdGVtcy5hZGQoeyBpZDogMywgY29udGVudDogJ0NoZW1pc3RyeSBMVjEnLCBzdGFydDogJzIwMTctMDctMDggMTc6MDAnLCBlbmQ6ICcyMDE3LTA3LTA4MjA6MDAnLCBncm91cDogMSB9KTtcclxuICAgICAgICB0aGlzLnRpbWVsaW5lLnNldERhdGEodGhpcy5pdGVtcyk7XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==
