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
  ])
  
  .constant('AngularBaseUrl', {
    url: '/static/'
    })
  .constant('BowerBaseUrl', {
    url: '/static/'
    })    

  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider','AngularBaseUrl','BowerBaseUrl',
    function($stateProvider, $urlRouterProvider , $ocLazyLoadProvider , AngularBaseUrl , BowerBaseUrl ) {
        
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    //$urlRouterProvider.otherwise('/login');
    $urlRouterProvider.when("/", "/dashboard/home");
    //    
    $urlRouterProvider.otherwise('auth/login');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: AngularBaseUrl.url+'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    AngularBaseUrl.url+'scripts/directives/header/header.js',
                    AngularBaseUrl.url+'scripts/directives/header/header-notification/header-notification.js',
                    AngularBaseUrl.url+'scripts/directives/sidebar/sidebar.js',
                    AngularBaseUrl.url+'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:[BowerBaseUrl.url+"bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          BowerBaseUrl.url+"bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:[BowerBaseUrl.url+'bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:[BowerBaseUrl.url+'bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:[BowerBaseUrl.url+'bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:[BowerBaseUrl.url+'bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:[BowerBaseUrl.url+'bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:AngularBaseUrl.url+'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              AngularBaseUrl.url+'scripts/controllers/main.js',
              AngularBaseUrl.url+'scripts/directives/timeline/timeline.js',
              AngularBaseUrl.url+'scripts/directives/notifications/notifications.js',
              AngularBaseUrl.url+'scripts/directives/chat/chat.js',
              AngularBaseUrl.url+'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.form',{
        templateUrl:AngularBaseUrl.url+'views/form.html',
        url:'/form'
    })
      .state('dashboard.blank',{
        templateUrl:AngularBaseUrl.url+'views/pages/blank.html',
        url:'/blank'
    })
      .state('dashboard.chart',{
        templateUrl:AngularBaseUrl.url+'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                BowerBaseUrl.url+'bower_components/angular-chart.js/dist/angular-chart.min.js',
                BowerBaseUrl.url+'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'sbAdminApp',
                files:[AngularBaseUrl.url+'scripts/controllers/chartContoller.js']
            })
          }
        }
    })
      .state('dashboard.table',{
        templateUrl:AngularBaseUrl.url+'views/table.html',
        url:'/table'
    })
      .state('dashboard.panels-wells',{
          templateUrl:AngularBaseUrl.url+'views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:AngularBaseUrl.url+'views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:AngularBaseUrl.url+'views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:AngularBaseUrl.url+'views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:AngularBaseUrl.url+'views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:AngularBaseUrl.url+'views/ui-elements/grid.html',
       url:'/grid'
   })
      .state('starter',{
       templateUrl:AngularBaseUrl.url+'views/pages/starter.html',
       url:'/starter'
   })
   //-----------------------------------------------------
   // Authentication Paths
   // --------------------
      .state('auth', {
        url:'/auth',
        templateUrl:AngularBaseUrl.url+'views/pages/login.html',        
        resolve: {
            loadMyAuth:function($ocLazyLoad){

                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    AngularBaseUrl.url+'scripts/authentication/authController.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ng-token-auth',
                  files:[BowerBaseUrl.url+'bower_components/ng-token-auth/dist/ng-token-auth.js']
                }),
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:[BowerBaseUrl.url+'bower_components/angular-cookies/angular-cookies.js']
                })
            }
        }
    })
      .state('auth.login',{
        controller:'AuthCtrl',        
        templateUrl:AngularBaseUrl.url+'views/pages/login.html',
        url:'/login'
    })   
      .state('auth.register',{
       controller:'AuthCtrl',
       templateUrl:AngularBaseUrl.url+'views/pages/register.html',
       url:'/register'
   })
   
  }]);

    
