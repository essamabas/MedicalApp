

'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.factory:InsuranceInstituteService
 * @description
 * # InsuranceInstituteService
 * factory of the sbAdminApp
 */
angular.module('sbAdminApp',['ngResource','ngCookies'])
  .factory('InsuranceInstituteService', InsuranceInstituteService)
;

function InsuranceInstituteService($resource,$cookies) {
  return $resource('/api/InsuranceInstitute/:InsuranceInstituteId',
      {'Id': '@id'}, {
        options: {method : "POST", params:{}, data: "csrfmiddlewaretoken="+$cookies.csrftoken+"&_method=OPTIONS"}        
  });
}
/* EOF */