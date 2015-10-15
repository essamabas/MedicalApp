
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
							
							// append input-box - checkbox
							createInputField(div, 'input', option, ' ','checkbox', field, data, vm.fmDataName );
							AppendFlag = true;

							
						} else if(option.type =="string") {

							// append input-box - text
							if(option.max_length!== undefined) {
								createInputField(div, 'input', option, ' form-control ng-pristine','text', field, data, vm.fmDataName );	
							} else {
								createInputField(div, 'textarea', option, ' form-control ng-pristine','text', field, data, vm.fmDataName );
							}
							
							// insert ul
							AppendFlag = true;

						} else if((option.type =="choice") || 
							((option.type =="field") && (option.choices!== undefined) )) {
							
							// append select box
							createInputField(div, 'select', option, ' form-control','', field, data, vm.fmDataName );

							AppendFlag = true;
							
						}
						
						if(AppendFlag) {

							// help-block with-errors
							//div.innerHTML += '<div class="help-block with-errors"></div>';
							
							//div.innerHTML +=  data;

							
							// append div to element
							element.append(div);
							// enable validation
							//element.validator();
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
};

// Insert Validation Attributes - here
function  InsertNgValidation(option, fieldName, errMessageDiv, input) {

	errMessageDiv.setAttribute("ng-messages", "myForm."+fieldName + ".$error");
	errMessageDiv.setAttribute("role", "alert");
	
	// errMessageDiv.innerHTML += '<div ng-message="postError">  {{' + 'myForm.'+fieldName + '.$error}} </div>';
	
	// check-required fieldName
	if(option.required) {
		input.setAttribute("required", 'required');
		errMessageDiv.innerHTML += '<div ng-message="required">This field is required</div>';
	}
	// check-min_length field
	if(option.min_length!== undefined) {
		input.setAttribute("data-minlength", option.min_length );
		input.setAttribute("ng-minlength", option.min_length );
		errMessageDiv.innerHTML += '<div ng-message="minlength">Ensure that field has at least ' + option.min_length + ' characters </div>';

	}
	// check-max_length field
	if(option.max_length!== undefined) {
		input.setAttribute("data-maxlength", option.max_length );
		input.setAttribute("ng-maxlength",  option.max_length );
		errMessageDiv.innerHTML += '<div ng-message="maxlength">Ensure that field has at most ' + option.max_length + ' characters </div>';
	}	
};

// Wrap INPUT-ANGULAR 1.x - Forms Validation Here
//createInputField(div, option, 'text', field, data, vm.fmDataName );
function createInputField (div, elemType, option, className, typeName, fieldName, data, ngItemName) {
	
	if(option.type =="string") {
		
		// append input-box - text
		var input = document.createElement(elemType);
		input.className = className;
		// set attributes
		input.setAttribute("id", "myForm."+fieldName);
		input.setAttribute("name", fieldName);
		input.setAttribute("value", data);
		input.setAttribute("ng-model", ngItemName + "." + fieldName );
		input.setAttribute("type", typeName);							
		//scope.Item[fieldName] = data;
		
		// Append Input-Validation
		var errMessageDiv = document.createElement('div');
		//errMessageDiv.className = 'help-block with-errors';
		InsertNgValidation(option, fieldName, errMessageDiv, input);

		// insert label/input						
		div.innerHTML = '<label class="control-label" for="myForm.'+fieldName + '" >' + option.label + ' </label>';
		div.innerHTML +=(input.outerHTML);
		div.innerHTML +=(errMessageDiv.outerHTML);		
		
	} else if((option.type =="choice") || 
			((option.type =="field") && (option.choices!== undefined) )) {
	
			var select = document.createElement(elemType);
			select.className = className;
			// set attributes
			select.setAttribute("id", "myForm."+fieldName);
			select.setAttribute("name", fieldName);
			//input.setAttribute("value", data);
			select.setAttribute("ng-model", ngItemName + "." + fieldName );

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
			div.innerHTML += '<label class="control-label" for="myForm.'+fieldName + '" >' + option.label + ' </label>';							
			div.innerHTML +=(select.outerHTML);
	
	// input-boolean 
	} else if(option.type =="boolean") {
							
			// append input-box
			var input = document.createElement('input');
			//input.className = ' form-control ng-pristine ';
			// set attributes
			input.setAttribute("id", "myForm."+fieldName);
			input.setAttribute("name", fieldName);
			input.setAttribute("ng-true-value", true);
			input.setAttribute("ng-false-value", false);
		
			if(data) {
				input.setAttribute("checked", "");	
			}
			input.setAttribute("ng-model", ngItemName + "." + fieldName );
			input.setAttribute("type", typeName);

			// check-required field
			if(option.required) {
				input.setAttribute("required", 'required');
			}

			// insert label/input
			div.innerHTML += '<div class="checkbox"> <label class="control-label" >' + (input.outerHTML) + ' '
			 + option.label + ' </label> </div>';
	}
	
	
	if(option.help_text !== undefined) {
		// Insert help-block
		div.innerHTML += '<p class="help-block">' + option.help_text + '</p>';
	}
};