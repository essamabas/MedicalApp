

angular.module('sbAdminApp',['ngResource','ngCookies','datatables'])
  .factory('PatientService', PatientService)
  .factory('InsuranceInstituteService', InsuranceInstituteService)
  .factory('MedicalSpecialityService', MedicalSpecialityService)
  .directive('dtTable', dtTable)
  .controller('PatientCtrl', ['PatientService', function PatientCtrl( PatientService) {
      
        var vm = this;
        
        // Delete Item Management
        vm.deleteItem = function(ItemId){
            PatientService.delete({pk:ItemId});
            vm.reloadData();
        };
    
        // Define Columns Layout
        // vm.ColumnsData = ['ID', 'title', 'display_url', 'Actions'];
        
        // Define Columns Layout
        PatientService.options().$promise.then(function(options) {
            // Name of the List
            vm.listname = options.name;
            
            vm.options =  options.actions.POST;
            // Copy keys into vm.ColumsData
            vm.ColumnsData = Object.keys(vm.options);
            // Define Columns Properties
            vm.dtColumnDefs = [];
            for(var i=0; i< vm.ColumnsData.length; i++) {
                vm.dtColumnDefs.push(DTColumnDefBuilder.newColumnDef(i));
                // Make last Column notsortable
                if(i== vm.ColumnsData.length -1) {
                    vm.dtColumnDefs.push(DTColumnDefBuilder.newColumnDef(i).notSortable());
                }
            }           
        });
    
        // Get Items-List
        vm.reloadData = function() {
            PatientService.query().$promise.then(function(Items) {
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
    // End of PatientCtrl
]);