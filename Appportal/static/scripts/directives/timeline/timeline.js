'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('timeline',function(AngularBaseUrl) {
    return {
        templateUrl:AngularBaseUrl.url+'scripts/directives/timeline/timeline.html',
        restrict: 'E',
        replace: true,
    }
  });
