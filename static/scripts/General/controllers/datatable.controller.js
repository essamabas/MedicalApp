


function PatientCtrl($scope, PatientService) {
  return _dataTableController($scope, PatientService);
}

/*
* @namespace DataTableController
*/
function _dataTableController( $scope, GenericService) {

    var vm = this;
	$scope.columnDefs = [];
	$scope.columns = [];
	
    // Initialize new service
    $scope.newItem = new GenericService();
    
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
		GenericService.options().$promise.then(function(options) {
			// Name of the List
			$scope.listname = options.name;
			// Retrieve Post-Options
			vm.PostOptions =  options.actions.POST;           
		});		
	};
	
    // Get Items-List
    vm.reloadData = function() {
		// Retrieve All Data
        GenericService.query().$promise.then(function(data) {
			// if Data-Results exists
			if(data.count>0) {
				// Get Options
				vm.getOptions();
				$scope.Items = data.results;
				vm.ColumnsData = Object.keys($scope.Items[0]);
				
				for(var i=0; i< vm.ColumnsData.length; i++) {
					// hide url field to be shown
					if(vm.ColumnsData[i] =="url") {
						$scope.columnDefs.push({"mData": vm.ColumnsData[i],"aTargets": [i],"visible": false,"searchable": false});
					} else {
						$scope.columnDefs.push({ "mData": "category", "aTargets":[i]});
					}
					// Add Columns-Titles
					$scope.columns.push({ "sTitle": vm.ColumnsData[i] });
					// Make last Column notsortable
					//if(i== vm.ColumnsData.length -1) {
					//	vm.dtColumnDefs.push(DTColumnDefBuilder.newColumnDef(i).notSortable());
					//}
				}
				
			}
			
            //for (var i = 0; i < Items.length; i++) {
            //    // Copy to id
			//	if(Items[i].pk !== undefined) {
			//		Items[i].id = Items[i].pk;	
			//	}
            //}
        });
    };
	
    vm.reloadData();
}