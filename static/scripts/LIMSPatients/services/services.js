

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
  .factory('InsuranceInstituteService', InsuranceInstituteService)
  .factory('MedicalSpecialityService', MedicalSpecialityService)
;

function PatientService($resource,$cookies) {
  return _genericService($resource,$cookies,'/api/Patient/:Id');
}

function InsuranceInstituteService($resource,$cookies) {
  return _genericService($resource,$cookies,'/api/InsuranceInstitute/:Id');
}

function MedicalSpecialityService($resource,$cookies) {
  return _genericService($resource,$cookies,'/api/MedicalSpeciality/:Id');
}

function _genericService($resource,$cookies,URL) {
  return $resource(URL,
      {'Id': '@pk'}, {
        query: {method: 'GET', params: { format: 'json'}, isArray: true,},     
        options: {method : "POST", params:{ format: 'json'}, data: "csrfmiddlewaretoken="+$cookies.csrftoken+"&_method=OPTIONS"}        
  });
}

/* EOF */
