   
// Inject into the Main App
angular.module('sbAdminApp',['ngMessages',{
  files:[
    BaseUrl.url+'bower_components/angular-messages/angular-messages.min.js',
		BaseUrl.url+'bower_components/moment/moment.js'    
  ],
  cache: true
	}])
  .directive('formInput', ['$compile','BaseUrl',formInput])
  //.directive('formSelect', formSelect)
;

// --------------------------------------------
// Directives 
// -----------
function formInput ($compile,BaseUrl) {
  return {
    //templateUrl: BaseUrl.url+'scripts/Modules/genericform/formInput.html',
    restrict: 'E',
    scope: {},
    link: function(scope, element, attrs) {
      scope.opts = attrs;
      //Compile element - could be scope.$parent
      $compile(element.contents())(scope);
    }
  };
}

function formSelect ($compile,BaseUrl) {
  return {
    templateUrl: BaseUrl.url+'scripts/Modules/genericform/formSelect.html',
    restrict: 'E',
    scope: {},    
    link: function(scope, element, attrs) {
      scope.opts = attrs;
      //Compile element - could be scope.$parent
      $compile(element.contents())(scope);
    }
  };
}
    
    