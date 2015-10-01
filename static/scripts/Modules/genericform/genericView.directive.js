
function genericView () {
    return {
        restrict: 'E, A, C',
        scope: {
            fmData: '=',
            fmOptions: '='
        },
        link: function (scope, element, attrs, controller) {
			
			// Reference this element
			vm = this;
			// Update Form HTML
			vm.updateForm = function() {
				if((scope.fmData!== undefined) && (scope.fmOptions!== undefined)){
					for (var field in scope.fmData) {
						var data = scope.fmData['field'];
						var div = document.createElement('div');
						div.className = 'has-feedback form-group';

						var option = scope.fmOptions[field];
						if(option.type =="boolean") {

							// append checkbox-inline
							var inputclass = ' form-control ng-pristine ';
							var inputattributes = ' id="id_'+field +'" name="' + field + '" ng-model="Item.' + field + '" + type="checkbox" ';
							var div_ul = '<ul class="djng-form-control-feedback djng-field-errors" ng-show="myform.'+ field + '.$dirty"> ';
							div_ul += 	 '  <li ng-show="myform.'+ field + '.$valid" class="valid"></li>';

							div.innerHTML = '<label class="checkbox-inline"> ' + option.label + ' </label>';
							div.innerHTML += '<input ' + inputattributes +  ' class="' + inputclass + '" >';
							div.innerHTML +=  data;
							if(option.help_text !== undefined) {
								// Insert help-block
								div.innerHTML += '<span class="help-block">' + option.help_text + '</span>';	
							}
							div.innerHTML += div_ul;
							div.innerHTML += '</ul>';
							div.innerHTML += '<ul class="djng-form-control-feedback djng-field-errors ng-hide" ng-show="myform.'+ field + '.$pristine"></ul>';

						} else if(option.type =="string") {

							// append input-box
							var inputclass = ' form-control ng-pristine ';
							var inputattributes = ' id="id_'+field +'" name="' + field + '" ng-model="Item.' + field + '" + type="text" ';
							var div_ul = '<ul class="djng-form-control-feedback djng-field-errors" ng-show="myform.'+ field + '.$dirty"> ';
							div_ul += 	 '  <li ng-show="myform.'+ field + '.$valid" class="valid"></li>';

							if(option.required) {
								inputclass += ' ng-invalid ng-invalid-required ';
								inputattributes += ' required="required" ';
							}
							if(option.min_length!== undefined) {
								inputclass += ' ng-valid-minlength ';
								inputattributes += ' minlength="' + option.min_length + '" ng-minlength="' + option.min_length + '" ';
								div_ul += '<li ng-show="myform.'+ field + '.$error.minlength" class="invalid ng-hide">Ensure this value has at least '+ option.min_length + ' characters</li>';							
							}
							if(option.max_length!== undefined) {
								inputclass += ' ng-valid-maxlength ';
								inputattributes += ' maxlength="' + option.max_length + '" ng-maxlength="' + option.max_length + '" ';
								div_ul += '<li ng-show="myform.'+ field + '.$error.maxlength" class="invalid ng-hide">Ensure this value has at most '+ option.max_length + ' characters</li>';							
							}
							// insert label/input					
							div.innerHTML = '<label class="control-label" for="id_'+field + '" >' + option.label + ' </label>';
							div.innerHTML += '<input ' + inputattributes +  ' class="' + inputclass + '" >';
							div.innerHTML +=  data;
							if(option.help_text !== undefined) {
								// Insert help-block
								div.innerHTML += '<span class="help-block">' + option.help_text + '</span>';	
							}
							// insert ul
							div.innerHTML += div_ul;
							div.innerHTML += '</ul>';
							div.innerHTML += '<ul class="djng-form-control-feedback djng-field-errors ng-hide" ng-show="myform.'+ field + '.$pristine"></ul>';						
						}
					}
				}			
			};
			
            // watch for any changes to our data, rebuild the DataTable
            scope.$parent.$watch(attrs.fmData, function(newVal, oldVal) {
				if (!Object.is(newVal, oldVal)) {
                //if (newVal!==oldVal) {
					// apply the plugin				
					vm.updateForm();
                }
            });
			
            scope.$parent.$watch(attrs.fmOptions, function(newVal, oldVal) {
				if (!Object.is(newVal, oldVal)) {
                //if (newVal!==oldVal) {
					// apply the plugin				
					vm.updateForm();
                }
            });			
			

		}
	};	
}