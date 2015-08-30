

'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.factory:InsuranceInstituteService
 * @description
 * # MedicalSpecialityService
 * factory of the sbAdminApp
 */
angular.module('sbAdminApp',['ngResource','ngCookies'])
  .factory('MedicalSpecialityService', MedicalSpecialityService)
;

function MedicalSpecialityService($resource,$cookies) {
  return $resource('/api/MedicalSpeciality/:Id',
      {'Id': '@id'}, {
        options: {method : "POST", params:{}, data: "csrfmiddlewaretoken="+$cookies.csrftoken+"&_method=OPTIONS"}        
  });
}
/* EOF */