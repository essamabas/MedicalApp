

angular.module('sbAdminApp')
  .factory('PatientService', ['$resource','$cookies', '$http', PatientService])
  .directive('dtTable', dtTable)
  .controller('PatientListCtrl', PatientListCtrl)
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
function PatientListCtrl($scope, PatientService) {
  return dtTableController($scope, PatientService);
}