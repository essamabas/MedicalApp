
BaseUrl = {url: '/static/'};
angular.module('sbAdminApp',[{
	files:[
		BaseUrl.url+'scripts/Modules/api/api.service.js',
		BaseUrl.url+'scripts/Modules/dtTable/dtTable.directive.js',
		BaseUrl.url+'scripts/Modules/dtTable/dtTable.controller.js',
		BaseUrl.url+'scripts/Modules/patient/patient.list.js'
		]}]
)
  .factory('PatientService', ['$cookies', '$http', PatientService])
  .directive('dtTable', dtTable)
  .controller('PatientListCtrl', ['$scope','PatientService', PatientListCtrl])
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