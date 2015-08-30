'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('MainCtrl', function($scope,$position,$http,$cookies) {
 
  // send OPTIONS request:
  // http://stackoverflow.com/questions/17931158/angularjs-django-rest-framework-cors-csrf-cookie-not-showing-up-in-client
  $http({
      method: 'POST',
      url: "http://localhost:8000/api/",
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      //data: {"csrfmiddlewaretoken" : $cookies.csrftoken, _method: "OPTIONS"}
      data: "csrfmiddlewaretoken="+$cookies.csrftoken+"&_method=OPTIONS"
      //data: "csrfmiddlewaretoken=3j34uCDp1KQLtAp6YFZRDljc3w9nKLj3&_method=OPTIONS"
  }).
  then(function(response) {
    console.log(response.status);
    console.log(response.data);
  }, function(response) {
    console.log(response.status);
    console.log(response.data);
    });  
    
  });
