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
var student_service_1 = require("../../services/student.service");
var authentication_service_1 = require("../../services/authentication.service");
var ClientStatusComponent = (function () {
    function ClientStatusComponent(router, clientService, studentService, authService) {
        this.router = router;
        this.clientService = clientService;
        this.studentService = studentService;
        this.authService = authService;
        this.filterQuery = "";
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
                _this.data = null;
            }
            else {
                _this.setData(objects);
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    ClientStatusComponent.prototype.populatePRF = function (client) {
        swal('Sorry...', 'This feature is not yet available', 'info');
        // this.clientService
        //     .populatePRF(client.userID)
        //     .then(response => {
        //
        //     })
        //     .catch(error => console.log(error));
    };
    ClientStatusComponent.prototype.setData = function (objects) {
        this.data = objects.clients;
        this.allClients = objects.clients;
        this.clientTotal = objects.clients.length;
        this.suitabilityForms = objects.suitabilityForms;
        this.stage1 = this.data.filter(function (x) { return x.suitability; });
        this.stage2 = this.data.filter(function (x) { return !x.suitability && x.consent && x.learningStyle; });
        this.stage3 = this.data.filter(function (x) { return !x.suitability && !x.consent && !x.learningStyle; });
        this.doughnutChartLabels = ['Suitability', 'Consent/Learning Style', 'Forms Complete'];
        this.doughnutChartData = [this.stage1.length, this.stage2.length, this.stage3.length];
        this.doughnutChartType = 'doughnut';
        this.doughnutChartColors = [{ backgroundColor: ["#FF4207", "#F8E903", "#2AD308"] }];
    };
    ClientStatusComponent.prototype.addClient = function () {
        this.router.navigate(['/suitability']);
    };
    // gotoEdit(client: Client, event: any) {
    //     this.router.navigate(['/clientEdit', client.clientID]);
    // }
    ClientStatusComponent.prototype.deleteAlert = function (client, event) {
        var _this = this;
        swal({
            title: 'Delete client (' + client.firstName + ' ' + client.lastName + ')?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (isConfirm) {
            if (isConfirm) {
                _this.deleteClient(client, event);
            }
        });
    };
    ClientStatusComponent.prototype.deleteClient = function (client, event) {
        var _this = this;
        event.stopPropagation();
        this.clientService
            .delete(client)
            .then(function (res) {
            _this.data = _this.data.filter(function (h) { return h !== client; });
            swal('Deleted!', 'Client record has been deleted.', 'success');
            _this.clientTotal = _this.data.length;
        })
            .catch(function (error) { return _this.error = error; });
    };
    ClientStatusComponent.prototype.showClientView = function (client) {
        this.showGeneral = true;
        this.showSuitability = false;
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
                this.data = this.allClients.filter(function (x) { return x.suitability; });
            }
            else if (index === 1) {
                this.data = this.allClients.filter(function (x) { return !x.suitability && x.consent && x.learningStyle; });
            }
            else if (index === 2) {
                this.data = this.allClients.filter(function (x) { return !x.suitability && !x.consent && !x.learningStyle; });
            }
        }
        catch (err) {
            this.data = this.allClients;
        }
    };
    ClientStatusComponent.prototype.chartHovered = function (e) {
    };
    ClientStatusComponent.prototype.createAsStudent = function (client) {
        var _this = this;
        this.studentService
            .save(client)
            .then(function (result) {
            console.log(result);
            _this.removeAlert(client);
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    ClientStatusComponent.prototype.removeAlert = function (client) {
        var _this = this;
        swal({
            title: 'Transfer client (' + client.firstName + ' ' + client.lastName + ')?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, transfer it!'
        }).then(function (isConfirm) {
            if (isConfirm) {
                _this.removeFromClientTable(client.userID);
            }
        });
    };
    ClientStatusComponent.prototype.removeFromClientTable = function (userID) {
        var _this = this;
        event.stopPropagation();
        this.clientService
            .removeFromClientTable(userID)
            .then(function (res) {
            _this.data = _this.data.filter(function (h) { return h.userID !== userID; });
            _this.stage3 = _this.data.filter(function (x) { return x.userID !== userID && !x.suitability && !x.consent && !x.learningStyle; });
            _this.doughnutChartData = [_this.stage1.length, _this.stage2.length, _this.stage3.length];
            swal('Transfered', 'Client record has been transfered to the student table.', 'success');
            _this.clientTotal = _this.data.length;
        })
            .catch(function (error) { return _this.error = error; });
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
    __metadata("design:paramtypes", [router_1.Router, client_service_1.ClientService, student_service_1.StudentService, authentication_service_1.AuthService])
], ClientStatusComponent);
exports.ClientStatusComponent = ClientStatusComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWlEO0FBQ2pELDBDQUF5QztBQUl6QyxnRUFBOEQ7QUFDOUQsa0VBQWdFO0FBQ2hFLGdGQUFvRTtBQVVwRSxJQUFhLHFCQUFxQjtJQXNCOUIsK0JBQW9CLE1BQWMsRUFBVSxhQUE0QixFQUFVLGNBQThCLEVBQVUsV0FBd0I7UUFBOUgsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFwQmxKLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBUWpCLGdCQUFXLEdBQVksSUFBSSxDQUFDO0lBYTVCLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCwwQ0FBVSxHQUFWO1FBQUEsaUJBV0M7UUFWRyxJQUFJLENBQUMsYUFBYTthQUNiLFVBQVUsRUFBRTthQUNaLElBQUksQ0FBQyxVQUFBLE9BQU87WUFDVCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFCLENBQUM7UUFDTCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCwyQ0FBVyxHQUFYLFVBQVksTUFBTTtRQUNo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QUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFsQixDQUFrQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELHNDQUFNLEdBQU47UUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFDTCw0QkFBQztBQUFELENBMU1BLEFBME1DLElBQUE7QUExTVkscUJBQXFCO0lBTmpDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZUFBZTtRQUN6QixXQUFXLEVBQUUsNkRBQTZEO1FBQzFFLFNBQVMsRUFBRSxDQUFDLDREQUE0RCxDQUFDO0tBQzVFLENBQUM7cUNBd0I4QixlQUFNLEVBQXlCLDhCQUFhLEVBQTBCLGdDQUFjLEVBQXVCLG9DQUFXO0dBdEJ6SSxxQkFBcUIsQ0EwTWpDO0FBMU1ZLHNEQUFxQiIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NsaWVudFwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdHVkZW50XCI7XHJcbmltcG9ydCB7IFN1aXRhYmlsaXR5Rm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3VpdGFiaWxpdHlGb3JtXCI7XHJcbmltcG9ydCB7IENsaWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY2xpZW50LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2VcIjtcclxuXHJcbmRlY2xhcmUgdmFyIHN3YWw6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdjbGllbnQtc3RhdHVzJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9jbGllbnQtc3RhdHVzL2NsaWVudC1zdGF0dXMuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwL2NvbXBvbmVudHMvY2xpZW50LXN0YXR1cy9jbGllbnQtc3RhdHVzLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIENsaWVudFN0YXR1c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBkYXRhOiBhbnlbXTtcclxuICAgIGZpbHRlclF1ZXJ5ID0gXCJcIjtcclxuICAgIGFsbENsaWVudHM6IENsaWVudFtdO1xyXG4gICAgc3VpdGFiaWxpdHlGb3JtczogU3VpdGFiaWxpdHlGb3JtW107XHJcbiAgICBjbGllbnRUb3RhbDogYW55O1xyXG4gICAgZXJyb3I6IGFueTtcclxuXHJcbiAgICBjbGllbnRWaWV3OiBDbGllbnQ7XHJcbiAgICBzdWl0YWJpbGl0eVZpZXc6IFN1aXRhYmlsaXR5Rm9ybTtcclxuICAgIHNob3dHZW5lcmFsOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHNob3dTdWl0YWJpbGl0eTogYm9vbGVhbjtcclxuXHJcbiAgICAvL0NoYXJ0XHJcbiAgICBkb3VnaG51dENoYXJ0TGFiZWxzOiBzdHJpbmdbXTtcclxuICAgIGRvdWdobnV0Q2hhcnREYXRhOiBudW1iZXJbXTtcclxuICAgIGRvdWdobnV0Q2hhcnRUeXBlOiBzdHJpbmc7XHJcbiAgICBkb3VnaG51dENoYXJ0Q29sb3JzOiBhbnlbXTtcclxuICAgIHN0YWdlMTogYW55O1xyXG4gICAgc3RhZ2UyOiBhbnk7XHJcbiAgICBzdGFnZTM6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGNsaWVudFNlcnZpY2U6IENsaWVudFNlcnZpY2UsIHByaXZhdGUgc3R1ZGVudFNlcnZpY2U6IFN0dWRlbnRTZXJ2aWNlLCBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0Q2xpZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENsaWVudHMoKSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgICAgIC5nZXRDbGllbnRzKClcclxuICAgICAgICAgICAgLnRoZW4ob2JqZWN0cyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0cy5zdGF0dXMgPT09IFwiNDAzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEob2JqZWN0cyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB0aGlzLmVycm9yID0gZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHBvcHVsYXRlUFJGKGNsaWVudCkge1xyXG4gICAgICBzd2FsKFxyXG4gICAgICAgICAgJ1NvcnJ5Li4uJyxcclxuICAgICAgICAgICdUaGlzIGZlYXR1cmUgaXMgbm90IHlldCBhdmFpbGFibGUnLFxyXG4gICAgICAgICAgJ2luZm8nXHJcbiAgICAgICk7XHJcbiAgICAgICAgLy8gdGhpcy5jbGllbnRTZXJ2aWNlXHJcbiAgICAgICAgLy8gICAgIC5wb3B1bGF0ZVBSRihjbGllbnQudXNlcklEKVxyXG4gICAgICAgIC8vICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAvLyAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGF0YShvYmplY3RzKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gb2JqZWN0cy5jbGllbnRzO1xyXG4gICAgICAgIHRoaXMuYWxsQ2xpZW50cyA9IG9iamVjdHMuY2xpZW50cztcclxuICAgICAgICB0aGlzLmNsaWVudFRvdGFsID0gb2JqZWN0cy5jbGllbnRzLmxlbmd0aDtcclxuICAgICAgICB0aGlzLnN1aXRhYmlsaXR5Rm9ybXMgPSBvYmplY3RzLnN1aXRhYmlsaXR5Rm9ybXM7XHJcbiAgICAgICAgdGhpcy5zdGFnZTEgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4geC5zdWl0YWJpbGl0eSk7XHJcbiAgICAgICAgdGhpcy5zdGFnZTIgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4gIXguc3VpdGFiaWxpdHkgJiYgeC5jb25zZW50ICYmIHgubGVhcm5pbmdTdHlsZSk7XHJcbiAgICAgICAgdGhpcy5zdGFnZTMgPSB0aGlzLmRhdGEuZmlsdGVyKHggPT4gIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiAheC5sZWFybmluZ1N0eWxlKTtcclxuICAgICAgICB0aGlzLmRvdWdobnV0Q2hhcnRMYWJlbHMgPSBbJ1N1aXRhYmlsaXR5JywgJ0NvbnNlbnQvTGVhcm5pbmcgU3R5bGUnLCAnRm9ybXMgQ29tcGxldGUnXTtcclxuICAgICAgICB0aGlzLmRvdWdobnV0Q2hhcnREYXRhID0gW3RoaXMuc3RhZ2UxLmxlbmd0aCwgdGhpcy5zdGFnZTIubGVuZ3RoLCB0aGlzLnN0YWdlMy5sZW5ndGhdO1xyXG4gICAgICAgIHRoaXMuZG91Z2hudXRDaGFydFR5cGUgPSAnZG91Z2hudXQnO1xyXG4gICAgICAgIHRoaXMuZG91Z2hudXRDaGFydENvbG9ycyA9IFt7IGJhY2tncm91bmRDb2xvcjogW1wiI0ZGNDIwN1wiLCBcIiNGOEU5MDNcIiwgXCIjMkFEMzA4XCJdIH1dO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZENsaWVudCgpIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zdWl0YWJpbGl0eSddKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnb3RvRWRpdChjbGllbnQ6IENsaWVudCwgZXZlbnQ6IGFueSkge1xyXG4gICAgLy8gICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2NsaWVudEVkaXQnLCBjbGllbnQuY2xpZW50SURdKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBkZWxldGVBbGVydChjbGllbnQsIGV2ZW50KSB7XHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnRGVsZXRlIGNsaWVudCAoJyArIGNsaWVudC5maXJzdE5hbWUgKyAnICcgKyBjbGllbnQubGFzdE5hbWUgKyAnKT8nLFxyXG4gICAgICAgICAgICB0ZXh0OiBcIllvdSB3b24ndCBiZSBhYmxlIHRvIHJldmVydCB0aGlzIVwiLFxyXG4gICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgZGVsZXRlIGl0ISdcclxuICAgICAgICB9KS50aGVuKGlzQ29uZmlybSA9PiB7XHJcbiAgICAgICAgICBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlQ2xpZW50KGNsaWVudCwgZXZlbnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUNsaWVudChjbGllbnQ6IENsaWVudCwgZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgICAgICAuZGVsZXRlKGNsaWVudClcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoaCA9PiBoICE9PSBjbGllbnQpO1xyXG4gICAgICAgICAgICAgICAgc3dhbChcclxuICAgICAgICAgICAgICAgICAgICAnRGVsZXRlZCEnLFxyXG4gICAgICAgICAgICAgICAgICAgICdDbGllbnQgcmVjb3JkIGhhcyBiZWVuIGRlbGV0ZWQuJyxcclxuICAgICAgICAgICAgICAgICAgICAnc3VjY2VzcydcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWVudFRvdGFsID0gdGhpcy5kYXRhLmxlbmd0aDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0NsaWVudFZpZXcoY2xpZW50OiBDbGllbnQpIHtcclxuICAgICAgICB0aGlzLnNob3dHZW5lcmFsID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNob3dTdWl0YWJpbGl0eSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2xpZW50VmlldyA9IGNsaWVudDtcclxuICAgICAgICB2YXIgc3VpdGFiaWxpdHlGb3JtID0gdGhpcy5nZXRTdWl0YWJpbGl0eUZvcm1CeUZpbHRlcihjbGllbnQudXNlcklEKTtcclxuICAgICAgICB0aGlzLnN1aXRhYmlsaXR5VmlldyA9IHN1aXRhYmlsaXR5Rm9ybVswXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdWl0YWJpbGl0eUZvcm1CeUZpbHRlcihpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN1aXRhYmlsaXR5Rm9ybXMuZmlsdGVyKHggPT4geC51c2VySUQgPT09IGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWN0aW9uQnRuQ2xpY2tlZChldmVudCwgc2VjdGlvbikge1xyXG4gICAgICAgIGlmIChzZWN0aW9uID09PSBcImdlbmVyYWxcIikge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dHZW5lcmFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93U3VpdGFiaWxpdHkgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNlY3Rpb24gPT09IFwic3VpdGFiaWxpdHlcIikge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dHZW5lcmFsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1N1aXRhYmlsaXR5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdHVzUmVwb3J0KGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnRWaWV3ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjaGFydENsaWNrZWQoZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZS5hY3RpdmVbMF0uX2luZGV4O1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuYWxsQ2xpZW50cy5maWx0ZXIoeCA9PiB4LnN1aXRhYmlsaXR5KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5hbGxDbGllbnRzLmZpbHRlcih4ID0+ICF4LnN1aXRhYmlsaXR5ICYmIHguY29uc2VudCAmJiB4LmxlYXJuaW5nU3R5bGUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmFsbENsaWVudHMuZmlsdGVyKHggPT4gIXguc3VpdGFiaWxpdHkgJiYgIXguY29uc2VudCAmJiAheC5sZWFybmluZ1N0eWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmFsbENsaWVudHM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoYXJ0SG92ZXJlZChlOiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQXNTdHVkZW50KGNsaWVudDogU3R1ZGVudCkge1xyXG4gICAgICB0aGlzLnN0dWRlbnRTZXJ2aWNlXHJcbiAgICAgICAgICAuc2F2ZShjbGllbnQpXHJcbiAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsZXJ0KGNsaWVudCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHRoaXMuZXJyb3IgPSBlcnJvcik7IC8vIFRPRE86IERpc3BsYXkgZXJyb3IgbWVzc2FnZVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUFsZXJ0KGNsaWVudCkge1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnVHJhbnNmZXIgY2xpZW50ICgnICsgY2xpZW50LmZpcnN0TmFtZSArICcgJyArIGNsaWVudC5sYXN0TmFtZSArICcpPycsXHJcbiAgICAgICAgICB0ZXh0OiBcIllvdSB3b24ndCBiZSBhYmxlIHRvIHJldmVydCB0aGlzIVwiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnWWVzLCB0cmFuc2ZlciBpdCEnXHJcbiAgICAgIH0pLnRoZW4oaXNDb25maXJtID0+IHtcclxuICAgICAgICBpZiAoaXNDb25maXJtKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbW92ZUZyb21DbGllbnRUYWJsZShjbGllbnQudXNlcklEKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUZyb21DbGllbnRUYWJsZSh1c2VySUQpOiB2b2lkIHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHRoaXMuY2xpZW50U2VydmljZVxyXG4gICAgICAgICAgLnJlbW92ZUZyb21DbGllbnRUYWJsZSh1c2VySUQpXHJcbiAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoaCA9PiBoLnVzZXJJRCAhPT0gdXNlcklEKTtcclxuICAgICAgICAgICAgICB0aGlzLnN0YWdlMyA9IHRoaXMuZGF0YS5maWx0ZXIoeCA9PiB4LnVzZXJJRCAhPT0gdXNlcklEICYmICF4LnN1aXRhYmlsaXR5ICYmICF4LmNvbnNlbnQgJiYgIXgubGVhcm5pbmdTdHlsZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5kb3VnaG51dENoYXJ0RGF0YSA9IFt0aGlzLnN0YWdlMS5sZW5ndGgsIHRoaXMuc3RhZ2UyLmxlbmd0aCwgdGhpcy5zdGFnZTMubGVuZ3RoXTtcclxuICAgICAgICAgICAgICBzd2FsKFxyXG4gICAgICAgICAgICAgICAgICAnVHJhbnNmZXJlZCcsXHJcbiAgICAgICAgICAgICAgICAgICdDbGllbnQgcmVjb3JkIGhhcyBiZWVuIHRyYW5zZmVyZWQgdG8gdGhlIHN0dWRlbnQgdGFibGUuJyxcclxuICAgICAgICAgICAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB0aGlzLmNsaWVudFRvdGFsID0gdGhpcy5kYXRhLmxlbmd0aDtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gdGhpcy5lcnJvciA9IGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBnb0JhY2soKSB7XHJcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
