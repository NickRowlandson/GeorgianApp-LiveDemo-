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
var client_service_1 = require("../../services/client.service");
var authentication_service_1 = require("../../services/authentication.service");
//var pdffiller = require('./pdffiller');
var ClientStatusComponent = (function () {
    function ClientStatusComponent(router, clientService, authService) {
        this.router = router;
        this.clientService = clientService;
        this.authService = authService;
        this.showGeneral = true;
    }
    ClientStatusComponent.prototype.ngOnInit = function () {
        this.getClients();
    };
    ClientStatusComponent.prototype.getClients = function () {
        var _this = this;
        this.clientService
            .getClients()
            .then(function (objects) {
            if (objects.status === "403") {
                _this.clients = null;
            }
            else {
                _this.setData(objects);
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    // generatePRF(client) {
    //     this.clientService
    //         .getClient(client.clientID)
    //         .then(object => {
    //             console.log(object);
    //             var sourcePDF = "../../assets/pdf/prf-source.pdf";
    //             var destinationPDF = "../../assets/pdf/test_complete.pdf";
    //             var data = {
    //                 "First Name": "John",
    //                 "Last Name": "Doe",
    //             };
    //
    //             pdffiller.fillForm(sourcePDF, destinationPDF, data, function(err) {
    //                 // if (err) {
    //                 //     throw err;
    //                 // }
    //                 // console.log("In callback (we're done).");
    //             });
    //         })
    //         .catch(error => console.log(error));
    // }
    ClientStatusComponent.prototype.setData = function (objects) {
        this.clients = objects.clients;
        this.allClients = objects.clients;
        this.clientTotal = objects.clients.length;
        this.suitabilityForms = objects.suitabilityForms;
        var stage1 = this.clients.filter(function (x) { return x.status === '1'; });
        var stage2 = this.clients.filter(function (x) { return x.status === '2'; });
        var stage3 = this.clients.filter(function (x) { return x.status === '3'; });
        this.doughnutChartLabels = ['Suitability', 'Consent', 'PRF'];
        this.doughnutChartData = [stage1.length, stage2.length, stage3.length];
        this.doughnutChartType = 'doughnut';
        this.doughnutChartColors = [{ backgroundColor: ["#FF4207", "#F8E903", "#2AD308"] }];
    };
    ClientStatusComponent.prototype.addClient = function () {
        this.router.navigate(['/suitability']);
    };
    ClientStatusComponent.prototype.gotoEdit = function (client, event) {
        this.router.navigate(['/clientEdit', client.clientID]);
    };
    ClientStatusComponent.prototype.deleteClient = function (client, event) {
        var _this = this;
        event.stopPropagation();
        this.clientService
            .delete(client)
            .then(function (res) {
            _this.clients = _this.clients.filter(function (h) { return h !== client; });
        })
            .catch(function (error) { return _this.error = error; });
    };
    ClientStatusComponent.prototype.showClientView = function (client) {
        this.clientView = client;
        var suitabilityForm = this.getSuitabilityFormByFilter(client.userID);
        this.suitabilityView = suitabilityForm[0];
    };
    ClientStatusComponent.prototype.getSuitabilityFormByFilter = function (id) {
        return this.suitabilityForms.filter(function (x) { return x.userID === id; });
    };
    ClientStatusComponent.prototype.sectionBtnClicked = function (event, section) {
        if (section === "general") {
            this.showGeneral = true;
            this.showSuitability = false;
        }
        else if (section === "suitability") {
            this.showGeneral = false;
            this.showSuitability = true;
        }
    };
    ClientStatusComponent.prototype.statusReport = function (event) {
        this.clientView = null;
    };
    ClientStatusComponent.prototype.chartClicked = function (e) {
        try {
            var index = e.active[0]._index;
            if (index === 0) {
                this.clients = this.allClients.filter(function (x) { return x.status === '1'; });
            }
            else if (index === 1) {
                this.clients = this.allClients.filter(function (x) { return x.status === '2'; });
            }
            else if (index === 2) {
                this.clients = this.allClients.filter(function (x) { return x.status === '3'; });
            }
        }
        catch (err) {
            this.clients = this.allClients;
        }
    };
    ClientStatusComponent.prototype.chartHovered = function (e) {
    };
    ClientStatusComponent.prototype.goBack = function () {
        window.history.back();
    };
    return ClientStatusComponent;
}());
ClientStatusComponent = __decorate([
    core_1.Component({
        selector: 'client-status',
        templateUrl: './app/components/client-status/client-status.component.html',
        styleUrls: ['./app/components/client-status/client-status.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, client_service_1.ClientService, authentication_service_1.AuthService])
], ClientStatusComponent);
exports.ClientStatusComponent = ClientStatusComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF5QztBQUd6QyxnRUFBOEQ7QUFDOUQsZ0ZBQW9FO0FBQ3BFLHlDQUF5QztBQVF6QyxJQUFhLHFCQUFxQjtJQWtCOUIsK0JBQW9CLE1BQWMsRUFBVSxhQUE0QixFQUFVLFdBQXdCO1FBQXRGLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBVDFHLGdCQUFXLEdBQVksSUFBSSxDQUFDO0lBVzVCLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCwwQ0FBVSxHQUFWO1FBQUEsaUJBV0M7UUFWRyxJQUFJLENBQUMsYUFBYTthQUNiLFVBQVUsRUFBRTthQUNaLElBQUksQ0FBQyxVQUFBLE9BQU87WUFDVCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFCLENBQUM7UUFDTCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCx3QkFBd0I7SUFDeEIseUJBQXlCO0lBQ3pCLHNDQUFzQztJQUN0Qyw0QkFBNEI7SUFDNUIsbUNBQW1DO0lBQ25DLGlFQUFpRTtJQUNqRSx5RUFBeUU7SUFDekUs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Q0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFoQixDQUFnQixDQUFDLENBQUM7WUFDakUsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFoQixDQUFnQixDQUFDLENBQUM7WUFDakUsQ0FBQztRQUNMLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ25DLENBQUM7SUFDTCxDQUFDO0lBRUQsNENBQVksR0FBWixVQUFhLENBQU07SUFFbkIsQ0FBQztJQUVELHNDQUFNLEdBQU47UUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFDTCw0QkFBQztBQUFELENBM0lBLEFBMklDLElBQUE7QUEzSVkscUJBQXFCO0lBTmpDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZUFBZTtRQUN6QixXQUFXLEVBQUUsNkRBQTZEO1FBQzFFLFNBQVMsRUFBRSxDQUFDLDREQUE0RCxDQUFDO0tBQzVFLENBQUM7cUNBb0I4QixlQUFNLEVBQXlCLDhCQUFhLEVBQXVCLG9DQUFXO0dBbEJqRyxxQkFBcUIsQ0EySWpDO0FBM0lZLHNEQUFxQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9jbGllbnRcIjtcclxuaW1wb3J0IHsgU3VpdGFiaWxpdHlGb3JtIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdWl0YWJpbGl0eUZvcm1cIjtcclxuaW1wb3J0IHsgQ2xpZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jbGllbnQuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlXCI7XHJcbi8vdmFyIHBkZmZpbGxlciA9IHJlcXVpcmUoJy4vcGRmZmlsbGVyJyk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnY2xpZW50LXN0YXR1cycsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2NvbXBvbmVudHMvY2xpZW50LXN0YXR1cy9jbGllbnQtc3RhdHVzLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2FwcC9jb21wb25lbnRzL2NsaWVudC1zdGF0dXMvY2xpZW50LXN0YXR1cy5jb21wb25lbnQuY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBDbGllbnRTdGF0dXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgY2xpZW50czogQ2xpZW50W107XHJcbiAgICBhbGxDbGllbnRzOiBDbGllbnRbXTtcclxuICAgIHN1aXRhYmlsaXR5Rm9ybXM6IFN1aXRhYmlsaXR5Rm9ybVtdO1xyXG4gICAgY2xpZW50VG90YWw6IGFueTtcclxuICAgIGVycm9yOiBhbnk7XHJcblxyXG4gICAgY2xpZW50VmlldzogQ2xpZW50O1xyXG4gICAgc3VpdGFiaWxpdHlWaWV3OiBTdWl0YWJpbGl0eUZvcm07XHJcbiAgICBzaG93R2VuZXJhbDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBzaG93U3VpdGFiaWxpdHk6IGJvb2xlYW47XHJcblxyXG4gICAgLy9DaGFydFxyXG4gICAgZG91Z2hudXRDaGFydExhYmVsczogc3RyaW5nW107XHJcbiAgICBkb3VnaG51dENoYXJ0RGF0YTogbnVtYmVyW107XHJcbiAgICBkb3VnaG51dENoYXJ0VHlwZTogc3RyaW5nO1xyXG4gICAgZG91Z2hudXRDaGFydENvbG9yczogYW55W107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBjbGllbnRTZXJ2aWNlOiBDbGllbnRTZXJ2aWNlLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmdldENsaWVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDbGllbnRzKCkge1xyXG4gICAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgICAgICAuZ2V0Q2xpZW50cygpXHJcbiAgICAgICAgICAgIC50aGVuKG9iamVjdHMgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHMuc3RhdHVzID09PSBcIjQwM1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGllbnRzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKG9iamVjdHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZW5lcmF0ZVBSRihjbGllbnQpIHtcclxuICAgIC8vICAgICB0aGlzLmNsaWVudFNlcnZpY2VcclxuICAgIC8vICAgICAgICAgLmdldENsaWVudChjbGllbnQuY2xpZW50SUQpXHJcbiAgICAvLyAgICAgICAgIC50aGVuKG9iamVjdCA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhvYmplY3QpO1xyXG4gICAgLy8gICAgICAgICAgICAgdmFyIHNvdXJjZVBERiA9IFwiLi4vLi4vYXNzZXRzL3BkZi9wcmYtc291cmNlLnBkZlwiO1xyXG4gICAgLy8gICAgICAgICAgICAgdmFyIGRlc3RpbmF0aW9uUERGID0gXCIuLi8uLi9hc3NldHMvcGRmL3Rlc3RfY29tcGxldGUucGRmXCI7XHJcbiAgICAvLyAgICAgICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBcIkZpcnN0IE5hbWVcIjogXCJKb2huXCIsXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgXCJMYXN0IE5hbWVcIjogXCJEb2VcIixcclxuICAgIC8vICAgICAgICAgICAgIH07XHJcbiAgICAvL1xyXG4gICAgLy8gICAgICAgICAgICAgcGRmZmlsbGVyLmZpbGxGb3JtKHNvdXJjZVBERiwgZGVzdGluYXRpb25QREYsIGRhdGEsIGZ1bmN0aW9uKGVycikge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIGlmIChlcnIpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgdGhyb3cgZXJyO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkluIGNhbGxiYWNrICh3ZSdyZSBkb25lKS5cIik7XHJcbiAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgfSlcclxuICAgIC8vICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgc2V0RGF0YShvYmplY3RzKSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnRzID0gb2JqZWN0cy5jbGllbnRzO1xyXG4gICAgICAgIHRoaXMuYWxsQ2xpZW50cyA9IG9iamVjdHMuY2xpZW50cztcclxuICAgICAgICB0aGlzLmNsaWVudFRvdGFsID0gb2JqZWN0cy5jbGllbnRzLmxlbmd0aDtcclxuICAgICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybXMgPSBvYmplY3RzLnN1aXRhYmlsaXR5Rm9ybXM7XHJcbiAgICAgICAgdmFyIHN0YWdlMSA9IHRoaXMuY2xpZW50cy5maWx0ZXIoeCA9PiB4LnN0YXR1cyA9PT0gJzEnKTtcclxuICAgICAgICB2YXIgc3RhZ2UyID0gdGhpcy5jbGllbnRzLmZpbHRlcih4ID0+IHguc3RhdHVzID09PSAnMicpO1xyXG4gICAgICAgIHZhciBzdGFnZTMgPSB0aGlzLmNsaWVudHMuZmlsdGVyKHggPT4geC5zdGF0dXMgPT09ICczJyk7XHJcbiAgICAgICAgdGhpcy5kb3VnaG51dENoYXJ0TGFiZWxzID0gWydTdWl0YWJpbGl0eScsICdDb25zZW50JywgJ1BSRiddO1xyXG4gICAgICAgIHRoaXMuZG91Z2hudXRDaGFydERhdGEgPSBbc3RhZ2UxLmxlbmd0aCwgc3RhZ2UyLmxlbmd0aCwgc3RhZ2UzLmxlbmd0aF07XHJcbiAgICAgICAgdGhpcy5kb3VnaG51dENoYXJ0VHlwZSA9ICdkb3VnaG51dCc7XHJcbiAgICAgICAgdGhpcy5kb3VnaG51dENoYXJ0Q29sb3JzID0gW3sgYmFja2dyb3VuZENvbG9yOiBbXCIjRkY0MjA3XCIsIFwiI0Y4RTkwM1wiLCBcIiMyQUQzMDhcIl0gfV07XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQ2xpZW50KCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3N1aXRhYmlsaXR5J10pO1xyXG4gICAgfVxyXG5cclxuICAgIGdvdG9FZGl0KGNsaWVudDogQ2xpZW50LCBldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvY2xpZW50RWRpdCcsIGNsaWVudC5jbGllbnRJRF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUNsaWVudChjbGllbnQ6IENsaWVudCwgZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgICAgICAuZGVsZXRlKGNsaWVudClcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpZW50cyA9IHRoaXMuY2xpZW50cy5maWx0ZXIoaCA9PiBoICE9PSBjbGllbnQpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93Q2xpZW50VmlldyhjbGllbnQ6IENsaWVudCkge1xyXG4gICAgICAgIHRoaXMuY2xpZW50VmlldyA9IGNsaWVudDtcclxuICAgICAgICB2YXIgc3VpdGFiaWxpdHlGb3JtID0gdGhpcy5nZXRTdWl0YWJpbGl0eUZvcm1CeUZpbHRlcihjbGllbnQudXNlcklEKTtcclxuICAgICAgICB0aGlzLnN1aXRhYmlsaXR5VmlldyA9IHN1aXRhYmlsaXR5Rm9ybVswXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdWl0YWJpbGl0eUZvcm1CeUZpbHRlcihpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN1aXRhYmlsaXR5Rm9ybXMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWN0aW9uQnRuQ2xpY2tlZChldmVudCwgc2VjdGlvbikge1xyXG4gICAgICAgIGlmIChzZWN0aW9uID09PSBcImdlbmVyYWxcIikge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dHZW5lcmFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93U3VpdGFiaWxpdHkgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNlY3Rpb24gPT09IFwic3VpdGFiaWxpdHlcIikge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dHZW5lcmFsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdHVzUmVwb3J0KGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnRWaWV3ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjaGFydENsaWNrZWQoZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZS5hY3RpdmVbMF0uX2luZGV4O1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpZW50cyA9IHRoaXMuYWxsQ2xpZW50cy5maWx0ZXIoeCA9PiB4LnN0YXR1cyA9PT0gJzEnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGllbnRzID0gdGhpcy5hbGxDbGllbnRzLmZpbHRlcih4ID0+IHguc3RhdHVzID09PSAnMicpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWVudHMgPSB0aGlzLmFsbENsaWVudHMuZmlsdGVyKHggPT4geC5zdGF0dXMgPT09ICczJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRzID0gdGhpcy5hbGxDbGllbnRzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFydEhvdmVyZWQoZTogYW55KTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICB9XHJcbn1cclxuIl19
