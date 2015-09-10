

angular.module('sbAdminApp')
  .factory('PatientService', ['$resource','$cookies', PatientService])
  .factory('InsuranceInstituteService', InsuranceInstituteService)
  .factory('MedicalSpecialityService', MedicalSpecialityService)
  .directive('dtTable', dtTable)
  .controller('PatientCtrl', PatientCtrl)
    // End of PatientCtrl
;


// --------------------------------------
// Services
// --------
function GetOPTIONS(url,$cookies) {
    $http({
        method: 'POST',
        url: url,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: "csrfmiddlewaretoken="+$cookies.get('csrftoken')+"&_method=OPTIONS"
    }).
    then(function(response) {
      console.log(response.status);
      console.log(response.data);
    }, function(response) {
      console.log(response.status);
      console.log(response.data);
      });     
}

function PatientService($resource,$cookies) {
  return _genericService($resource,$cookies,'/api/Patient/:Id');
}

function InsuranceInstituteService($resource,$cookies) {
  return _genericService($resource,$cookies,'/api/InsuranceInstitute/:Id');
}

function MedicalSpecialityService($resource,$cookies) {
  return _genericService($resource,$cookies,'/api/MedicalSpeciality/:Id');
}

function _genericService($resource,$cookies,URL) {
    //options: {method : "POST", params:{ format: 'json'}, data: "csrfmiddlewaretoken="+$cookies.csrftoken+"&_method=OPTIONS"}
  return $resource(URL,
        {'Id': '@id'}, {
        query: {method: 'GET', params: { format: 'json'}, isArray: false},     
        options: {
            method : "POST", 
            params:{ format: 'json'},
            data: "csrfmiddlewaretoken="+$cookies.csrftoken+"&_method=OPTIONS"
        }                
  });
}

// --------------------------------------------
// Controllers 
// -----------
function PatientCtrl($scope, PatientService) {
  return _dataTableController($scope, PatientService);
}

/** 
* @namespace _dataTableController
*/
function _dataTableController( $scope, GenericService, EditUrl, AddUrl) {

    var vm = this;
	$scope.columnDefs = [];
	$scope.columns = [];
	
    // Initialize new service
    $scope.newItem = new GenericService();
	$scope.Items = [];
    $scope.ListName = "List";
	
    vm.addItem = function() {
        // we can create an instance as well
        var newItem = new GenericService();
        newItem.$save();
    };

    // Delete Item Management
    vm.deleteItem = function(ItemId){
        GenericService.delete({id:ItemId});
        vm.reloadData();
    };

    // Define Columns Layout
    // vm.ColumnsData = ['ID', 'title', 'display_url', 'Actions'];


	//  Helper for open ModalBox with requested header, content and bottom
	function OpenModalBox(header, inner, bottom){
		var modalbox = $('#modalbox');
		modalbox.find('.modal-header-name span').html(header);
		modalbox.find('.devoops-modal-inner').html(inner);
		modalbox.find('.devoops-modal-bottom').html(bottom);
		modalbox.fadeIn('fast');
		$('body').addClass("body-expanded");
	}

	//  Close modalbox
	function CloseModalBox(){
		var modalbox = $('#modalbox');
		modalbox.fadeOut('fast', function(){
			modalbox.find('.modal-header-name span').children().remove();
			modalbox.find('.devoops-modal-inner').children().remove();
			modalbox.find('.devoops-modal-bottom').children().remove();
			$('body').removeClass("body-expanded");
		});
	}

    
	// handle Row-Click
	$scope.fnRowCallback = function(aData) {
		if(aData !== undefined) {
			if(aData.url!==undefined) {
				$state.go(EditUrl);	
			}
		}
	};
			
	vm.getOptions = function() {
		// Define Columns Layout
		GenericService.options().$promise.then(function(options) {
			// Name of the List
			$scope.ListName = options.name;
			// Retrieve Post-Options
			vm.PostOptions =  options.actions.POST;           
		});		
	};
	
    // Get Items-List
    vm.reloadData = function() {
		// Retrieve All Data
        GenericService.query().$promise.then(function(data) {
			// if Data-Results exists
			$scope.columnDefs = [];
			$scope.columns = [];			
			if(data.count>0) {
				// Get Options
				vm.getOptions();
				$scope.Items = data.results;
				vm.ColumnsData = Object.keys($scope.Items[0]);
				
				for(var i=0; i< vm.ColumnsData.length; i++) {
					// hide url field to be shown
					if(vm.ColumnsData[i] =="url") {
						$scope.columnDefs.push({"sTitle": "LINK","aTargets":[i],
												"bVisible":false,
												"mData": null,
												//"sDefaultContent": '<button><a href="'+vm.ColumnsData[i]+'">Download</a></button>',
												//"sDefaultContent": '<button>click</button>',
											   });
					} else {
						$scope.columnDefs.push({"mData": vm.ColumnsData[i],"sTitle": vm.ColumnsData[i],"aTargets":[i]});
						//$scope.columns.push({"mData": vm.ColumnsData[i],"sTitle": vm.ColumnsData[i], "bSearchable": true, "bSortable": true });
					}
					// Add Columns-Titles
				}
				
			}
        });
    };
	
    vm.reloadData();
	$scope.reloadData = vm.reloadData;
}


// ----------------------------------------------------
// Directives
// ----------
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
				//if (attrs.fnRowCallback) {
				//	vm.options["fnRowCallback"] = scope.$eval(attrs.fnRowCallback);
				//}
			};

    
            // apply the plugin
			//vm.updateOptions();
            //var dataTable = element.dataTable(vm.options);
    
            // watch for any changes to our data, rebuild the DataTable
            scope.$parent.$watch(attrs.aaData, function(newVal, oldVal) {
				if (!Object.is(newVal, oldVal)) {
                //if (newVal!==oldVal) {
					vm.updateOptions();
					dataTable = element.dataTable(options);
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