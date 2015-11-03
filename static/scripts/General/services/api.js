

'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.factory:PatientService
 * @description
 * # PatientService
 * factory of the sbAdminApp
 */
 
 //source: https://gist.github.com/brucecoddington/92a8d4b92478573d0f42
 //		 : https://objectpartners.com/2014/06/03/extending-angulars-resource-service-for-a-consistent-api/
 
 angular.module('sbAdminApp', ['ngResource'])
  .factory('api', function ($resource) {

    var api = {
      defaultConfig : {id: '@id'},

      extraMethods: {
        'update' : {
          method: 'PUT'
        }
      },

      add : function (config) {
        var params, 
          url;
      
        // If the add() function is called with a
        // String, create the default configuration.
        if (angular.isString(config)) {
          var configObj = {
            resource: config,
            url: '/' + config
          };
          config = configObj;
        }


        // If the url follows the expected pattern, we can set cool defaults
        if (!config.unnatural) {
          var orig = angular.copy(api.defaultConfig);
          params = angular.extend(orig, config.params);
          url = config.url + '/:id';

        // otherwise we have to declare the entire configuration. 
        } else {
          params = config.params;
          url = config.url;
        }
        
        // If we supply a method configuration, use that instead of the default extra. 
        var methods = config.methods || api.extraMethods;

        api[config.resource] = $resource(url, params, methods);
      }
    };    
    
    return api;
  })
    
  .provider('data', {
    
    list : function (resource, query) {
      return [
        'data',
        function (data) {  // inject the data service
          return data.list(resource, query);
        }
      ]
    },
    
    get: function (resource, query) {
      return [
        'data',
        function(data) {
          return data.get(resource, query);
        }
      ]
    },
    
    $get: function (api) {
      
      var data = {

        list: function (resource, query) {
          return api[resource].get(query).$promise;  
        },
        
        get : function (resource, query) {
            return api[resource].get(query).$promise;
        },

        create : function (resource, model) {
          return api[resource].save(model).$promise;
        }, 

        update : function (resource, model) {
          return api[resource].update(model).$promise;
        },

        remove : function (resource, model) {
          return data.remove(resource, model).$promise;
        }
      };

      return data;
    }
  });
 