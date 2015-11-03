

angular.module('sbAdminApp')
  .directive('dtTable', dtTable)
;

// ------------------------
// Directives
// ------------------------

function dtTable () {
    return {
        restrict: 'E, A, C',
        scope: {
            aoColumnDefs: '@',
            aaData: '@',
            aoColumns: '@',
            fnRowCallback: '='              
        },
        link: function (scope, element, attrs, controller) {
			
			// Reference this element
			vm = this;
			vm.updateOptions = function () {
				// apply DataTable options, use defaults if none specified by user
				vm.options = {};
				if (attrs.dtTable.length > 0) {
					vm.options = scope.$eval(attrs.dtTable);
				} else {
					vm.options = {
						"bStateSave": true,
						"iCookieDuration": 2419200, /* 1 month */
						"bJQueryUI": false,
						"bPaginate": true,
						"bLengthChange": true,
						"bFilter": true,
						"bInfo": true,
						"bDestroy": true,
						"order": [],
						"sScrollX": "100%",
    					"bScrollCollapse": true						
					};
				}

				// aoColumnDefs is dataTables way of providing fine control over column config
				if (attrs.aoColumnDefs) {
					vm.options["aoColumnDefs"] = scope.$eval(attrs.aoColumnDefs);
				}

				// Tell the dataTables plugin what columns to use
				// We can either derive them from the dom, or use setup from the controller           
				var explicitColumns = [];
				element.find('th').each(function(index, elem) {
					explicitColumns.push($(elem).text());
				});
				if (explicitColumns.length > 0) {
					vm.options["aoColumns"] = explicitColumns;
				} else if (attrs.aoColumns) {
					//vm.options["aoColumns"] = scope.$eval(attrs.aoColumns);
				}
				//if (attrs.fnRow\Callback) {
				//	vm.options["fnRowCallback"] = scope.$eval(attrs.fnRowCallback);
				//}
			};
    
            // watch for any changes to our data, rebuild the DataTable
            scope.$parent.$watch(attrs.aaData, function(newVal, oldVal) {
				if (!Object.is(newVal, oldVal)) {
                //if (newVal!==oldVal) {
					// apply the plugin				
					vm.updateOptions();
					var dataTable = element.dataTable(options);
                    dataTable.fnClearTable();
                    dataTable.fnAddData(newVal);
					$('#dttable tbody').on( 'click', 'tr', function () {
						//console.log( dataTable.fnGetData( this ) );
						scope.fnRowCallback(dataTable.fnGetData( this ));				
					});
                }
            });
        }
    };
}