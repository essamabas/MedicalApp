'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('notifications',function(BaseUrl){
		return {
        templateUrl:BaseUrl.url+'scripts/directives/notifications/notifications.html',
        restrict: 'E',
        replace: true,
    	}
	});


