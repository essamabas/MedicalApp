

angular.module('sbAdminApp')
  .factory('PatientService', ['$resource','$cookies', '$http', PatientService])
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

function PatientService($resource,$cookies,$http) {
  return _genericService($resource,$cookies,$http,'/api/Patient/:Id');
}

function InsuranceInstituteService($resource,$cookies) {
  return _genericService($resource,$cookies,'/api/InsuranceInstitute/:Id');
}

function MedicalSpecialityService($resource,$cookies) {
  return _genericService($resource,$cookies,'/api/MedicalSpeciality/:Id');
}

function _genericService($resource,$cookies,$http, URL) {
    //options: {method : "POST", params:{ format: 'json'}, data: "csrfmiddlewaretoken="+$cookies.csrftoken+"&_method=OPTIONS"}
	var service = $resource(URL,
		{'Id': '@id'}, {
		query: {method: 'GET', params: { format: 'json'}, isArray: false}                     
	});
	// Add URL to Service Provider - needed to navigate Controllers to Add/Edit/View Pages
	service.url = function() {
		var url = URL;
		if(URL.lastIndexOf("/:")> -1) {
			url =  URL.slice(0,URL.lastIndexOf("/:")+1);
		}
		return url; 		
	}
	// add any methods here using prototype
	service.options = function() {
		var url = URL;
		if(URL.lastIndexOf("/:")> -1) {
			url =  URL.slice(0,URL.lastIndexOf("/:")+1);
		} 
		return $http({
			method: 'POST',
			url: url,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			params:{"format": "json"},
			data: "csrfmiddlewaretoken="+$cookies.get('csrftoken')+"&_method=OPTIONS"
		})
	};
	return service;  
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
	// Initialize Post-Options
	vm.PostOptions = {};
	
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

	vm.getOptions = function() {
		// Define Columns Layout
		GenericService.options().then(function(options) {
			if(options.data!== undefined) {
				// Name of the List
				$scope.ListName = options.data.name;
				// Retrieve Post-Options
				vm.PostOptions =  options.data.actions.POST; 
				// Get Data
				vm.reloadData(); 				
			}
		});
	};
	
    // Get Items-List
    vm.reloadData = function() {
		// Retrieve All Data
		if(vm.PostOptions !=={}) {
			GenericService.query().$promise.then(function(data) {
				// if Data-Results exists
				$scope.columnDefs = [];
				$scope.columns = [];			
				if(data.count>0) {
					// Get Options
					$scope.Items = data.results;
					vm.ColumnsData = Object.keys($scope.Items[0]);
					
					for(var i=0; i< vm.ColumnsData.length; i++) {
						// hide type -fields to be shown
						if (vm.PostOptions[vm.ColumnsData[i]].type == "field") {
							if(vm.ColumnsData[i] =="url") {
								$scope.columnDefs.push({"sTitle": "Actions","aTargets":[i],
														"bVisible":true,
														"mData": null,
														"className": 'select-checkbox',
														//"sDefaultContent": '<button><a href="'+vm.ColumnsData[i]+'">Download</a></button>',
														"sDefaultContent": '<button type="button" class="btn btn-primary btn-circle"><i class="glyphicon glyphicon-edit"></i></button>',
													});
							} else {
								$scope.columnDefs.push({"sTitle": "","aTargets":[i],
														"bVisible":false,
														"mData": null
													});								
							}
						} else {
							$scope.columnDefs.push({"mData": vm.ColumnsData[i],"sTitle": vm.ColumnsData[i],"aTargets":[i]});
							//$scope.columns.push({"mData": vm.ColumnsData[i],"sTitle": vm.ColumnsData[i], "bSearchable": true, "bSortable": true });
						}
					}
				}
			});
		}
    };
	
	// Call Options
    vm.getOptions();
	
	// Link Template to Controller
	$scope.PostOptions = vm.PostOptions;
	$scope.reloadData = vm.reloadData;
	// handle Table Row-Click
	$scope.fnRowCallback = function(aData) {
		if(aData !== undefined) {
			if(aData.url!==undefined) {
				var ViewUrl = aData.url.replace("api","#");
				ViewUrl = ViewUrl.replace("?format=json","view");
				window.location.href = ViewUrl; 
				//$state.go(EditUrl);	
			}
		}
	};	
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


// ----------------------------------------------------
// Directives
// ----------
function FormViewDirective () {
    return {
        restrict: 'E, A, C',
        scope: {
            fmData: '=',
            fmOptions: '='              
        },
        link: function (scope, element, attrs, controller) {
			
			if((scope.fmData!== undefined) && (scope.fmOptions!== undefined)){
				for (var field in scope.fmData) {
					var data = scope.fmData['field'];
					var div = document.createElement('div');
					div.className = 'has-feedback form-group';

					var option = scope.fmOptions[field];
					if(option.type =="boolean") {
						
						// append checkbox-inline
						var inputclass = ' form-control ng-pristine ';
						var inputattributes = ' id="id_'+field +'" name="' + field + '" ng-model="' + field + '" + type="checkbox" ';
						var div_ul = '<ul class="djng-form-control-feedback djng-field-errors" ng-show="myform.'+ field + '.$dirty"> ';
						div_ul += 	 '  <li ng-show="myform.'+ field + '.$valid" class="valid"></li>';
												
						div.innerHTML = '<label class="checkbox-inline"> ' + option.label + ' </label>';
						div.innerHTML += '<input ' + inputattributes +  ' class="' + inputclass + '" >';
						div.innerHTML +=  data;
						if(option.help_text !== undefined) {
							// Insert help-block
							div.innerHTML += '<span class="help-block">' + option.help_text + '</span>';	
						}
						div.innerHTML += div_ul;
						div.innerHTML += '</ul>';
						div.innerHTML += '<ul class="djng-form-control-feedback djng-field-errors ng-hide" ng-show="myform.'+ field + '.$pristine"></ul>';
					
					} else if(option.type =="string") {
						
						// append input-box
						var inputclass = ' form-control ng-pristine ';
						var inputattributes = ' id="id_'+field +'" name="' + field + '" ng-model="' + field + '" + type="text" ';
						var div_ul = '<ul class="djng-form-control-feedback djng-field-errors" ng-show="myform.'+ field + '.$dirty"> ';
						div_ul += 	 '  <li ng-show="myform.'+ field + '.$valid" class="valid"></li>';
						
						if(option.required) {
							inputclass += ' ng-invalid ng-invalid-required ';
							inputattributes += ' required="required" ';
						}
						if(option.min_length!== undefined) {
							inputclass += ' ng-valid-minlength ';
							inputattributes += ' minlength="' + option.min_length + '" ng-minlength="' + option.min_length + '" ';
							div_ul += '<li ng-show="myform.'+ field + '.$error.minlength" class="invalid ng-hide">Ensure this value has at least '+ option.min_length + ' characters</li>';							
						}
						if(option.max_length!== undefined) {
							inputclass += ' ng-valid-maxlength ';
							inputattributes += ' maxlength="' + option.max_length + '" ng-maxlength="' + option.max_length + '" ';
							div_ul += '<li ng-show="myform.'+ field + '.$error.maxlength" class="invalid ng-hide">Ensure this value has at most '+ option.max_length + ' characters</li>';							
						}
						// insert label/input					
						div.innerHTML = '<label class="control-label" for="id_'+field + '" >' + option.label + ' </label>
						div.innerHTML += '<input ' + inputattributes +  ' class="' + inputclass + '" >';
						div.innerHTML +=  data;
						if(option.help_text !== undefined) {
							// Insert help-block
							div.innerHTML += '<span class="help-block">' + option.help_text + '</span>';	
						}
						// insert ul
						div.innerHTML += div_ul;
						div.innerHTML += '</ul>';
						div.innerHTML += '<ul class="djng-form-control-feedback djng-field-errors ng-hide" ng-show="myform.'+ field + '.$pristine"></ul>';						
					}
				}
				
			}
		}
	};	
}	

// ----------------------------------------------------
// General
// ----------
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