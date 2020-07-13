import { Component, OnInit } from '@angular/core';
declare var ko: any;
declare var ajaxcall: any;
declare var reportViewModel: any;

@Component({
  selector: 'app-dotnetreport',
  templateUrl: './dotnetreport.component.html',
})

export class DotNetReportComponent implements OnInit{

	constructor() {

	}

	ngOnInit() {

			ajaxcall({ url: '/api/ReportApi/GetUsersAndRoles' }).done(function (data) {
				var vm = new reportViewModel({
					runReportUrl: '/Report/Report',
					reportWizard: $("#modal-reportbuilder"),
					lookupListUrl: '/api/ReportApi/GetLookupList',
					apiUrl: '/api/ReportApi/CallReportApi',
					runReportApiUrl: '/api/ReportApi/RunReportApi',
					getUsersAndRolesUrl: '/api/ReportApi/GetUsersAndRoles',
					//reportId: @(Context.Request.Query["reportId"].Any() ? Context.Request.Query["reportId"].First() : "0"),
					userSettings: data
					//dataFilters: { EmployeeId: '1,2' }, // You can also pass a list of Global Data filters using format { Column1: 'val1, val2, ...', Column2: '1,2,3,...', ...}
				});

				vm.init(0, data.noAccount);
				ko.applyBindings(vm);
			});
		};
	
}
