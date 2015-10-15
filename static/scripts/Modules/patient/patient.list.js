

angular.module('sbAdminApp')
  .factory('PatientService', ['$cookies', '$http', PatientService])
  .directive('dtTable', dtTable)
  .controller('PatientListCtrl', PatientListCtrl)
;


// --------------------------------------------
// Services 
// -----------
function PatientService($cookies,$http) {
  return apiService($cookies,$http,'/api/Patient/');
}

// --------------------------------------------
// Controllers 
// -----------
function PatientListCtrl($scope, PatientService) {
  return dtTableController($scope, PatientService);
}