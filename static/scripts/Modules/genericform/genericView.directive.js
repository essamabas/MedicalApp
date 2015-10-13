
function genericView ($compile) {
    return {
        restrict: 'E, A, C',
		transclude: true,
        scope: {
            fmData: '=',
            fmOptions: '='
        },
        link: function (scope, element, attrs, controller) {
			// Reference this element
			var vm = this;
			
			
			//vm.fmData = "Item";
			//vm.fmData = scope.fmData;
			
			// Update Form HTML
			vm.updateForm = function() {
				
				//vm.fmData = scope.$parent[scope.fmData];
				vm.fmData = scope.fmData;
				// name of fmData - it should be evaluated as: scope.fmData
				//vm.fmDataName = scope.fmData;
				vm.fmDataName = "Item";
				vm.fmOptions = scope.fmOptions;
				scope[vm.fmDataName] = scope.fmData;
				
				if((vm.fmData!== undefined) && (scope.fmOptions!== undefined)){
					//scope.Item = {};
					for (var field in vm.fmData) {
						var data = vm.fmData[field];
						
						var div = document.createElement('div');
						div.className = 'form-group has-feedback';
						
						var AppendFlag = false;
						
						var option = scope.fmOptions[field];
						if(option.type =="boolean") {
							
							// append input-box
							var input = document.createElement('input');
							//input.className = ' form-control ng-pristine ';
							// set attributes
							input.setAttribute("id", "id_"+field);
							input.setAttribute("name", "id_"+field);
							if(data) {
								input.setAttribute("checked", "");	
							}
							input.setAttribute("ng-model", vm.fmDataName + "." + field );
							input.setAttribute("type", 'checkbox');
							
							// check-required field
							if(option.required) {
								input.setAttribute("required", 'required');
							}
														
							// insert label/input
							div.innerHTML += '<div class="checkbox"> <label class="control-label" >' + (input.outerHTML) + ' '
							 + option.label + ' </label> </div>';
														
							AppendFlag = true;

						} else if(option.type =="string") {

							// append input-box
							var input = document.createElement('input');
							input.className = ' form-control ng-pristine ';
							// set attributes
							input.setAttribute("id", "id_"+field);
							input.setAttribute("name", "id_"+field);
							input.setAttribute("value", data);
							input.setAttribute("ng-model", vm.fmDataName + "." + field );
							input.setAttribute("type", 'text');							
							//scope.Item[field] = data;
							
							// check-required field
							if(option.required) {
								input.setAttribute("required", 'required');
							}
							// check-min_length field
							if(option.min_length!== undefined) {
								input.setAttribute("data-minlength", option.min_length );
								input.setAttribute("ng-minlength", option.min_length );
							}
							// check-max_length field
							if(option.max_length!== undefined) {
								input.setAttribute("data-maxlength", option.max_length );
								input.setAttribute("ng-maxlength",  option.max_length );								
							}
							// insert label/input						
							div.innerHTML = '<label class="control-label" for="id_'+field + '" >' + option.label + ' </label>';
							div.innerHTML +=(input.outerHTML);

							// insert ul
							AppendFlag = true;

						} else if((option.type =="choice") || 
							((option.type =="field") && (option.choices!== undefined) )) {
														
							var select = document.createElement('select');
							select.className = ' form-control ng-pristine ';
							// set attributes
							select.setAttribute("id", "id_"+field);
							select.setAttribute("name", "id_"+field);
							//input.setAttribute("value", data);
							select.setAttribute("ng-model", vm.fmDataName + "." + field );

							// add radio for each choice
							option.choices.forEach(function(choice) {
								// append input-box
								var coption = document.createElement("option");
								coption.text = choice.display_name;
								coption.value = choice.value;
								if(data ==choice.value ) {
									coption.setAttribute("selected", "");	
								}
								select.add(coption);														
							});
							
							// insert Options
							div.innerHTML += '<label class="control-label" for="id_'+field + '" >' + option.label + ' </label>';							
							div.innerHTML +=(select.outerHTML);
							AppendFlag = true;
							
						}
						
						if(AppendFlag) {

							// help-block with-errors
							div.innerHTML += '<div class="help-block with-errors"></div>';
							
							//div.innerHTML +=  data;
							if(option.help_text !== undefined) {
								// Insert help-block
								div.innerHTML += '<p class="help-block">' + option.help_text + '</p>';
							}
							
							// append div to element
							element.append(div);
							// enable validation
							element.validator();
							//
							//Compile DOM and apply changes to Parent-Controller
							// Ref: https://docs.angularjs.org/api/ng/service/$compile
							$compile(element.contents())(scope.$parent);
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