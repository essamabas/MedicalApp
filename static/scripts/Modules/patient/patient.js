

angular.module('sbAdminApp')
  .factory('PatientService', ['$resource','$cookies', '$http', PatientService])
  .directive('dtTable', dtTable)
  .controller('PatientCtrl', PatientCtrl)
    // End of PatientCtrl
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
function PatientCtrl($scope, PatientService) {
  return dtTableController($scope, PatientService);
}