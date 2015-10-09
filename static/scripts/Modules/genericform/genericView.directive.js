
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
					scope.Item = {};
					for (var field in scope.fmData) {
						var data = scope.fmData[field];
						var div = document.createElement('div');
						div.className = 'form-group has-feedback';

						var option = scope.fmOptions[field];
						if(option.type =="boolean") {

							// append checkbox-inline
							var inputclass = " form-control ng-pristine";
							var inputattributes = " id='id_"+field +"' name='" + field + "'" + " value='" + data + "'" + " ng-model='Item." + field + "' type='checkbox' ";

							div.innerHTML = '<label class="checkbox-inline"> ' + option.label + ' </label>';
							div.innerHTML += '<input ' + inputattributes +  ' class="' + inputclass + '" >';
							div.innerHTML +=  data;
							if(option.help_text !== undefined) {
								// Insert help-block
								div.innerHTML += '<p class="help-block">' + option.help_text + '</p>';
							}
							// help-block with-errors
							div.innerHTML += '<div class="help-block with-errors"></div>';

						} else if(option.type =="string") {

							// append input-box
							var inputclass = ' form-control ng-pristine ';
							var inputattributes = " id='id_"+field +"' name='" + field + "'" + " value='" + data + "'" + " ng-model='Item." + field + "' type='text' ";
							//scope.Item[field] = data;

							if(option.required) {
								inputclass += ' ng-invalid ng-invalid-required ';
								inputattributes += ' required ';
							}
							if(option.min_length!== undefined) {
								inputclass += ' ng-valid-minlength ';
								inputattributes += ' data-minlength="' + option.min_length + '" ng-minlength="' + option.min_length + '" ';
								//inputattributes += ' data-error="Ensure this value has at least '+ option.min_length + ' characters " ';
							}
							if(option.max_length!== undefined) {
								inputclass += ' ng-valid-maxlength ';
								inputattributes += ' data-maxlength="' + option.max_length + '" ng-maxlength="' + option.max_length + '" ';
								//inputattributes += ' data-error="Ensure this value has at most '+ option.max_length + ' characters " ';
							}
							// insert label/input					
							div.innerHTML = '<label class="control-label" for="id_'+field + '" >' + option.label + ' </label>';
							div.innerHTML += '<input ' + inputattributes +  ' class="' + inputclass + '" >';
							// help-block with-errors
							div.innerHTML += '<div class="help-block with-errors"></div>';
							
							//div.innerHTML +=  data;
							if(option.help_text !== undefined) {
								// Insert help-block
								div.innerHTML += '<p class="help-block">' + option.help_text + '</p>';
							}
							// insert ul
							//div.innerHTML += div_ul;
						}
						// append div to element
						element.append(div);
						// enable validation
						element.validator();
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