
define(function(require) {

    var angular = require("angular"),
        name = "djangularappApp.scheduler",
        ngModule;

    // ------------------------------------------
    // Load Required Dependencies ---------------
    // ------------------------------------------
    require("ngResource");
    require("ngCookies");
    require("ui.bootstrap");

    // Load Calendar Required Dependencies
    require("ui.calendar");
    //require("ui.select");
    // Load Jobs Required Dependencies
    require("jquery");
    require("datatables");
    require("angularDatatables");

    paths = {
        partials: '/static/scripts/scheduler/partials/'
    };

    ngModule = angular.module(name, ["ui.calendar","ui.bootstrap","ngResource","ngCookies","datatables"])
        // Events Sub-Module
        .factory('EventService', require("./services/event.service"))
        .factory('CalendarEventService', require("./services/calendar.event.service"))
        // Calendar Sub-Module
        .constant('CalendarPartials',paths.partials)
        .factory('CalendarService', require("./services/calendar.service"))
        .controller("CalendarController", require("./controllers/calendar.controller"))
        // Job Sub-Module
        .factory('JobService', require("./services/job.service"))
        .controller("JobListController", require("./controllers/job.list.controller"))
        .controller("JobFormController", require("./controllers/job.form.controller"))
        // Project Sub-Module
        .directive('myTable',require("./directives/datatable.directive"))
        .controller("ProjectController", require("./controllers/project.controller"))
        .factory('ProjectService', require("./services/project.service"))
        //.controller("TaskController", require("./controllers/task.controller"))
        ;

    return {
        name: name,
        ngModule: ngModule
    };
});






/*
(function () {
  'use strict';

    //define([
    //  "angular",
    //  "jquery",
    //  "..\\..\\bower_components\\moment\\moment",
    //  "..\\..\\bower_components\\fullcalendar\\dist\\fullcalendar",
    //  "..\\..\\bower_components\\angular-bootstrap\\ui-bootstrap",
    //  "..\\..\\bower_components\\angular-ui-calendar\\src\\calendar",
    //  ".\\controllers\\calendar.controller"
    //]);

define([
  //".\\my_directive"
]);

require([
  'angular'
  ], function(angular) {
        var myapp;
        try {
            // Check if Angular-Module djangularappApp - exists
            myapp = angular.module("djangularappApp.calendar");
            return myapp;
        } catch(err) {
            define([
              'angular',
              'moment',
              'fullcalendar',
              'angular-bootstrap',
              'angular-ui-calendar',
              '..\\calendar\\controllers\\calendar.controller'
            ], function(angular) {
              angular
                .module('djangularappApp.calendar', [
                  'moment','fullcalendar',
                  'ui.calendar',
                  'ui.bootstrap',
                  'djangularappApp.calendar.controllers'
                ]);
            });

        };
  });
})();

*/