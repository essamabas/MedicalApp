'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('header',function(AngularBaseUrl){
		return {
        templateUrl:AngularBaseUrl.url+'scripts/directives/header/header.html',
        restrict: 'E',
        replace: true,
    	}
	});


