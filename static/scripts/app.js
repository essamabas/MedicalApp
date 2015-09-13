'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */

angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'ngCookies',
    'ipCookie','ng-token-auth',
    'toggle-switch',
	'ngResource'
  ])
  
  .constant('BaseUrl', {
    url: '/static/'
    })  

  .config(['$httpProvider','$stateProvider','$urlRouterProvider','$ocLazyLoadProvider','BaseUrl',
    function($httpProvider, $stateProvider, $urlRouterProvider , $ocLazyLoadProvider , BaseUrl ) {
        
    // django and angular both support csrf tokens. This tells
    // angular which cookie to add to what header.
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.withCredentials = true;                
                
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });



    //$urlRouterProvider.otherwise('/login');
    //$urlRouterProvider.when("", "login");
    //$urlRouterProvider.when("/", "/dashboard/home");
    //    
    //$urlRouterProvider.otherwise('auth/login');
	$urlRouterProvider.otherwise('/patient');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: BaseUrl.url+'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    BaseUrl.url+'scripts/directives/header/header.js',
                    BaseUrl.url+'scripts/directives/header/header-notification/header-notification.js',
                    BaseUrl.url+'scripts/directives/sidebar/sidebar.js',
                    BaseUrl.url+'scripts/directives/sidebar/sidebar-search/sidebar-search.js'                    
                    ]
                });
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:BaseUrl.url+'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
                  BaseUrl.url+'scripts/controllers/main.js',
                  BaseUrl.url+'scripts/directives/timeline/timeline.js',
                  BaseUrl.url+'scripts/directives/notifications/notifications.js',
                  BaseUrl.url+'scripts/directives/chat/chat.js',
                  BaseUrl.url+'scripts/directives/dashboard/stats/stats.js'
              ]
            });
          }
        }
      })
      .state('dashboard.form',{
        templateUrl:BaseUrl.url+'views/form.html',
        url:'/form'
    })
      .state('dashboard.blank',{
        templateUrl:BaseUrl.url+'views/pages/blank.html',
        url:'/blank'
    })
      .state('dashboard.chart',{
        templateUrl:BaseUrl.url+'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                BaseUrl.url+'bower_components/angular-chart.js/dist/angular-chart.min.js',
                BaseUrl.url+'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'sbAdminApp',
                files:[BaseUrl.url+'scripts/controllers/chartContoller.js']
            });
          }
        }
    })
      .state('dashboard.table',{
        templateUrl:BaseUrl.url+'views/table.html',
        url:'/table'
    })
      .state('dashboard.panels-wells',{
          templateUrl:BaseUrl.url+'views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:BaseUrl.url+'views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:BaseUrl.url+'views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:BaseUrl.url+'views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:BaseUrl.url+'views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:BaseUrl.url+'views/ui-elements/grid.html',
       url:'/grid'
   })
      .state('starter',{
       templateUrl:BaseUrl.url+'views/pages/starter.html',
       url:'/starter'
   })
   //-----------------------------------------------------
   // Authentication Paths
   // --------------------
      .state('auth', {
        url:'/auth',
        template:'<div><div ui-view></div></div>',        
        resolve: {
            loadMyAuth:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    BaseUrl.url+'scripts/authentication/authController.js'
                    ]
                });
            }
        }
    })
      .state('auth.login',{
        controller:'AuthCtrl',        
        templateUrl:BaseUrl.url+'views/pages/login.html',
        url:'/login'
    })   
      .state('auth.register',{
       controller:'AuthCtrl',
       templateUrl:BaseUrl.url+'views/pages/register.html',
       url:'/register'
   })   
      .state('dashboard.patient',{
        templateUrl:BaseUrl.url+'scripts/LIMSPatients/views/patient.list.html',
        // prefix ^ means absolute urls
        url:'^/patient', 
       controller:'PatientCtrl',
        resolve: {
            loadMyLIMS:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
						          BaseUrl.url+'scripts/LIMSPatients/LIMSPatients.module.js'
                    ]
                });
            }
        }        
   })
      .state('dashboard.patient.view', {
          url: "^/patient/:id/view",
          templateUrl: BaseUrl.url+'scripts/LIMSPatients/views/patient.view.html',
          controller: 'PatientCtrl'
    })
      .state('dashboard.patient.edit', {
          url: "^/patient/:id/edit",
          templateUrl: BaseUrl.url+'scripts/LIMSPatients/views/patient.edit.html',
          controller: 'PatientCtrl'
    })
      .state('dashboard.patient.add', {
          url: "^/patient/:id/add",
          templateUrl: BaseUrl.url+'scripts/LIMSPatients/views/patient.add.html',
          controller: 'PatientCtrl'
    })       
;
  }]);
