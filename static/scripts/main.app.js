define(function (require) {
  'use strict';

    // Dependencies ---------------------------
    // Load Angular Modules
    var angular = require('angular');
    require("ngRoute");
    require("ngCookies");
    require("ngResource");


    // Load Packages
    var scheduler = require('djangularappApp.scheduler');
    var filebrowser = require('djangularappApp.filebrowser');

    var app = angular.module("djangularappApp", [
        "ngRoute",
        scheduler.name,
        filebrowser.name
    ]);

  app.init = function () {
      //angular.bootstrap(document, ['likeastore']);
      angular.bootstrap(document, [app.name]);
  };

  app.config(function($interpolateProvider) {
          $interpolateProvider.startSymbol('{$');
          $interpolateProvider.endSymbol('$}');
  });

  // Configure CSRFTocken for django post:
  // Source: http://django-angular.readthedocs.org/en/latest/basic-crud-operations.html
  app.run(function($http, $cookies) {
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        // Add the following two lines
        $http.defaults.xsrfCookieName = 'csrftoken';
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
   });

  return app;
});