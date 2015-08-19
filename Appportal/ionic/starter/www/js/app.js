// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic', 
  'starter.controllers', 
  'starter.services',
  'oc.lazyLoad',
  'angular-loading-bar',
  'ipCookie','ng-token-auth'
  ])

.constant('ApiEndpoint', {
  url: 'http://localhost:4000/api'
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider , $ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });
    
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  
  .state('tab.projects', {
      url: '/projects',
      views: {
        'tab-projects': {
          templateUrl: 'templates/tab-projects.html',
          controller: 'TodoCtrl'
        }
      }
    })
    .state('tab.project-detail', {
      url: '/projects/:projectId',
      views: {
        'tab-projects': {
          templateUrl: 'templates/project-detail.html',
          controller: 'TodoCtrl'
        }
      }
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
                    name:'starter',
                    files:['js/authentication/authController.js']
                }),
                $ocLazyLoad.load(
                {
                  name:'ng-token-auth',
                  files:['lib/ionic/js/ng-token-auth/dist/ng-token-auth.js']
                }),
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['lib/ionic/js/angular-cookies/angular-cookies.js']
                }),             
                $ocLazyLoad.load(
                {
                  name:'ipCookie',
                  files:['lib/ionic/js/angular-cookie/angular-cookie.js']
                })
            }
        }
    })
      .state('auth.login',{
        controller:'AuthCtrl',        
        templateUrl:'templates/login.html',
        url:'/login'
    })     
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
