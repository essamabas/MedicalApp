

/*
* @namespace DataTableController
*/
function DataTableController( $scope, GenericService) {

    var vm = this;
    
    // Initialize new service
    $scope.newItem = new GenericService();
    
    vm.addItem = function() {
        // we can create an instance as well
        var newItem = new GenericService();
        newItem.$save();
    }
    // Delete Item Management
    vm.deleteItem = function(ItemId){
        GenericService.delete({id:ItemId});
        vm.reloadData();
    };

    // Define Columns Layout
    // vm.ColumnsData = ['ID', 'title', 'display_url', 'Actions'];
    
    // Define Columns Layout
    GenericService.options().$promise.then(function(options) {
        // Name of the List
        vm.listname = options.name;
        
        vm.options =  options.actions.POST;
        // Copy keys into vm.ColumsData
        vm.ColumnsData = Object.keys(vm.options);
        // Define Columns Properties
        vm.dtColumnDefs = [];
        
        $scope.columnDefs = [ 
            { "mData": "category", "aTargets":[0]},
            { "mData": "name", "aTargets":[1] },
            { "mData": "price", "aTargets":[2] }
        ];
        $scope.columns = [ {"sTitle": "Category"}, {"sTitle": "Name"},{"sTitle": "Price"}];
                
        for(var i=0; i< vm.ColumnsData.length; i++) {
            vm.dtColumnDefs.push(DTColumnDefBuilder.newColumnDef(i));
            
            // hide url field to be shown
            if(vm.ColumnsData[i] =="url") {
                $scope.columnDefs.push({"mData": vm.ColumnsData[i],"aTargets": [i],"visible": false,"searchable": false};    
            } else {
                $scope.columnDefs.push({ "mData": "category", "aTargets":[i]});    
            }
            
            // Make last Column notsortable
            if(i== vm.ColumnsData.length -1) {
                vm.dtColumnDefs.push(DTColumnDefBuilder.newColumnDef(i).notSortable());
            }
        }           
    });

    // Get Items-List
    vm.reloadData = function() {
        GenericService.query().$promise.then(function(Items) {
            for (var i = 0; i < Items.length; i++) {
                // Copy to id
                Items[i].id = Items[i].pk;
            }
            vm.Items=Items;
            vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
        });
    };
    vm.reloadData();
}