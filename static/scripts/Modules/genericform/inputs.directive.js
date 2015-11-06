   
// Inject into the Main App
angular.module('sbAdminApp',['ngMessages'])
  .directive('formInput', ['$compile','BaseUrl',formInput])
  //.directive('formSelect', formSelect)
;

// --------------------------------------------
// Directives 
// -----------
function formInput ($compile,BaseUrl) {
  return {
    templateUrl: BaseUrl.url+'scripts/Modules/genericform/formInput.html',
    restrict: 'E',
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
    link: function(scope, element, attrs) {
      scope.opts = attrs;
      //Compile element - could be scope.$parent
      $compile(element.contents())(scope);
    }
  };
}
    
    