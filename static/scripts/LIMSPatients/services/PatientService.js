

'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.factory:PatientService
 * @description
 * # PatientService
 * factory of the sbAdminApp
 */
angular.module('sbAdminApp',['ngResource','ngCookies'])
  .factory('PatientService', PatientService)
;


/**
* @namespace PatientService
*/
function PatientService($resource,$cookies) {
  return $resource('/api/Patient/:PatientId',
      {'PatientId': '@pk'}, {
        options: {method : "POST", params:{}, data: "csrfmiddlewaretoken="+$cookies.csrftoken+"&_method=OPTIONS"}        
  });
}
/* EOF */
