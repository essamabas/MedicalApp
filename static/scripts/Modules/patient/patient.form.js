

angular.module('sbAdminApp')
  .factory('PatientService', ['$resource','$cookies', '$http', PatientService])
    // End of PatientCtrl
  .directive('genericView', genericView)
  .controller('PatientFormCtrl', ['$scope','$stateParams', 'PatientService',PatientFormCtrl])
;


// --------------------------------------------
// Services 
// -----------
function PatientService($resource,$cookies,$http) {
  return apiService($resource,$cookies,$http,'/api/Patient/:Id');
}

// --------------------------------------------
// Controllers 
// -----------
function PatientFormCtrl($scope, $stateParams, PatientService) {
  return GenericFormController($scope, $stateParams, PatientService);
}