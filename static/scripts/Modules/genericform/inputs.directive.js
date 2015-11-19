   
// Inject into the Main App
var BaseUrl = {url: '/static/'};
angular.module('sbAdminApp',['ngMessages',{
  files:[
    //BaseUrl.url+'bower_components/angular-messages/angular-messages.min.js',
    BaseUrl.url+'bower_components/moment/moment.js'
  ],
  cache: true
	}])
  .directive('formInput', ['$compile','BaseUrl',formInput])
  //.directive('formSelect', formSelect)
;

// --------------------------------------------
// Directives 
// ----------
// Use ngModel to link Model to ngMessages - as described in: http://jsfiddle.net/12sf82p3/
function formInput($compile,BaseUrl) {
    return {
        restrict: 'E',
        template:
						'<div class="form-group has-feedback ng-scope">' +
    				'<label class="col-sm-2 control-label" for="ctrl.inputname" ng-bind="ctrl.labeltext">  </label> ' +
						'<div class="col-sm-10">' + 
							'<input type="text" class="form-control" ng-model="ctrl.model" name="{{ctrl.inputname}}" id="{{ctrl.inputname}}" placeholder="{{ctrl.placeholder}}" ng-maxlength="ctrl.maxLength" > </input>' + 
							'<p class="help-block" ng-bind="ctrl.help_text"></p>' + 
							'<div ng-messages="ctrl.$error" role="alert">' +
								'<ng-transclude></ng-transclude>' +
							'</div>' + 
            '</div>',
        transclude: true,
        scope: {},
        require: ['ngModel', 'formInput'],
        link: function(scope, element, attrs, ctrls) {
            var ngModel = ctrls[0];
            var formInput = ctrls[1];
						formInput.inputname = "";
						formInput.max_length = "";
						formInput.min_length = "";
						formInput.placeholder = "";
						formInput.labeltext = "";
						formInput.help_text = "";
						attrs.$observe('options', function(newValue,oldValue){
							//check new value to be what you expect.
							if (newValue){
								newValue = JSON.parse(newValue);
								formInput.inputname = newValue.name;
								formInput.max_length = newValue.max_length;
								formInput.min_length = newValue.min_length;
								formInput.placeholder = newValue.label;
								formInput.labeltext = newValue.label;
								if(newValue.help_text) {formInput.help_text = newValue.label;}
								formInput.setModel(ngModel);
								//Compile element - could be scope.$parent
								//$compile(element.contents())(scope);
							}
						});
            formInput.setModel(ngModel);
        },
        controllerAs: 'ctrl',
        controller: function($scope) {
            var self = this;
            this.model = null;
            this.setModel = function(ngModel) {
                this.$error = ngModel.$error;
                ngModel.$render = function() {
                    self.model = ngModel.$viewValue;
                };
                $scope.$watch('ctrl.model', function(newval) {
                    ngModel.$setViewValue(newval);
                });
            };
        }
    };
}

function formInput2 ($compile,BaseUrl) {
  return {
    templateUrl: BaseUrl.url+'scripts/Modules/genericform/formInput.html',
    restrict: 'E, A, C',
    scope: {},
    link: function(scope, element, attrs) {
			scope.opts = {name:"", maxLength:"",minLength:"",placeholder:"",type:"",value:""};
			
			attrs.$observe('value', function(newValue,oldValue){
        //check new value to be what you expect.
        if (newValue){
					// your code goes here
					scope.opts = attrs;
					//Compile element - could be scope.$parent
					$compile(element.contents())(scope);
				}
			});
			
			/*
      scope.$watch(attrs.value,function(newValue,oldValue){
        //check new value to be what you expect.
        if (newValue){           
            // your code goes here
            scope.opts = attrs;
            //Compile element - could be scope.$parent
            $compile(element.contents())(scope);
        }
      });
			*/
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
    
    