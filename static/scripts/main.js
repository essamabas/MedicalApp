/*global requirejs, angular, jQuery*/
"use strict"

//define('angular', function() { return angular; });
define('jquery', function() { return jQuery; });

requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '/static/scripts',
    waitSeconds: 600,

    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        // ------------ Angular packages -------------------------
        angular: '../bower_components/angular/angular',
        'ngAnimate': '../bower_components/angular-animate/angular-animate',
        'ngCookies': '../bower_components/angular-cookies/angular-cookies',
        'angular-mocks': '../bower_components/angular-mocks/angular-mocks',
        'ngResource': '../bower_components/angular-resource/angular-resource',
        'ngSanitize': '../bower_components/angular-sanitize/angular-sanitize',
        'angular-scenario': '../bower_components/angular-scenario/angular-scenario',
        'angular-touch': '../bower_components/angular-touch/angular-touch',
        //'ngRoute': '../bower_components/angular-route/angular-route',
        'ui.router': '../bower_components/angular-ui-router/release/angular-ui-router',
        'angular-loading-bar': '../bower_components/angular-loading-bar/build/loading-bar.min',
        'ipCookie': '../bower_components/angular-cookie/angular-cookie',
        'ng-token-auth': '../bower_components/ng-token-auth/dist/ng-token-auth',
        'toggle-switch':'../bower_components/angular-toggle-switch/angular-toggle-switch.min',
        // ------------ Bootstrap packages -------------------------
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
        //'bootstrap-colorpicker': '../bower_components/bootstrap-colorpicker/js/bootstrap-colorpicker',
        // ------------ Third Party packages -------------------------
        'moment':"../bower_components/moment/moment",
        'fullcalendar': '../bower_components/fullcalendar/dist/fullcalendar',
        'gcal': '../bower_components/fullcalendar/dist/gcal',
        // ------------ Jquery packages -------------------------
        'jquery': '../bower_components/jquery/dist/jquery',
        'datatables': '../bower_components/datatables/media/js/jquery.dataTables',
        //'jstree': '../bower_components/jstree/dist/jstree',
        // ------------ Angular-UI packages -------------------------
        //'ui.bootstrap.showErrors': '../bower_components/angular-bootstrap-show-errors/src/showErrors',
        //'ui.calendar': '../bower_components/angular-ui-calendar/src/calendar',
        'ui.bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        //'ui.select': '../bower_components/angular-ui-select/dist/select',
        //'jsTree.directive': '../bower_components/jsTree-directive/jsTree.directive',
        //'angularDatatables': '../bower_components/angular-datatables/dist/angular-datatables'
    },
    // use shim for non/RequireJS modules
    shim: {
        angular: {
          exports: 'angular'
        },
        'ngCookies': [
          'angular'
        ],
        'ngSanitize': [
          'angular'
        ],
        'ngResource': [
          'angular'
        ],
        'ngAnimate': [
          'angular'
        ],
        'ngTouch': [
          'angular'
        ],
        'ngRoute': [
          'angular'
        ],
        'angular-mocks': {
          deps: [
            'angular'
          ],
          exports: 'angular.mock'
        },
        'ui.bootstrap': [
          'angular',
          'bootstrap'
        ],
        'ui.select': [
          'angular',
        ],
        'datatables': [
          'jquery',
        ],
        'jsTree.directive': [
          'jquery',
          'jstree',
          'angular',
        ],
        'angularDatatables':[
            'angular',
            'jquery',
            'datatables'
        ],
        'ui.calendar': [
          'jquery',
          'angular',
          'fullcalendar'
        ],
        'ui.bootstrap.showErrors': [
          'angular',
          'angular-mocks',
          'bootstrap'
        ]
    },
    priority: [
        'angular'
    ],
    // Packages should be defined here --- Angular Package should be included also in app.js script
    packages: [
        { name: 'sbAdminApp.scheduler',
          location: 'scheduler',         // default 'packagename'
          main: 'scheduler.module'       // default 'main'
        },
        { name: 'sbAdminApp.filebrowser',
          location: 'filebrowser',         // default 'packagename'
          main: 'filebrowser.module'       // default 'main'
        }
    ]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
//window.name = 'NG_DEFER_BOOTSTRAP!';
require(['main.app'], function (app) {
  app.init();
});
