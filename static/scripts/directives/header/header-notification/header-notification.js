'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('headerNotification',function(BaseUrl){
		return {
        templateUrl:BaseUrl.url+'scripts/directives/header/header-notification/header-notification.html',
        restrict: 'E',
        replace: true,
    	}
	});


