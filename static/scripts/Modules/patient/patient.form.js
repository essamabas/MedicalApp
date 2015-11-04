
BaseUrl = {url: '/static/'};
angular.module('sbAdminApp',['ngMessages',{
	files:[
		BaseUrl.url+'scripts/Modules/genericform/genericform.style.css',
		BaseUrl.url+'bower_components/angular-messages/angular-messages.min.js',
		BaseUrl.url+'bower_components/moment/moment.js',
		BaseUrl.url+'scripts/Modules/api/api.service.js',
		BaseUrl.url+'scripts/Modules/genericform/genericform.controller.js',
		BaseUrl.url+'scripts/Modules/genericform/genericView.directive.js'
		],
	cache: true
	}])
  .factory('PatientService', ['$cookies', '$http', PatientService])
    // End of PatientCtrl
  //.directive('genericView', genericView)
  .controller('PatientFormCtrl', ['$scope','$stateParams', 'PatientService',PatientFormCtrl])
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
function PatientFormCtrl($scope, $stateParams, PatientService) {
  return GenericFormController($scope, $stateParams, PatientService);
}