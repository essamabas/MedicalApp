// Inject into the Main App
angular.module('sbAdminApp')
.directive('genericView', genericView)
;

// --------------------------------------------
// Directives 
// -----------
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
					var AppendFlag = false;
					for (var field in vm.fmData) {

						var data = vm.fmData[field];
						var option = scope.fmOptions[field];
						
						// Create Input-Fields
						AppendFlag = createInputField (element, option, field, data, vm.fmDataName);
						// parse data if - date option is passed
						if(option.type == 'date') {
							if(!isNaN(Date.parse(data))) {
								vm.fmData[field] = new Date(data);
							}
						}
						
						// Append to element - if input created
						if(AppendFlag) {
							//Compile DOM and apply changes to Parent-Controller
							// Ref: https://docs.angularjs.org/api/ng/service/$compile
							$compile(element.contents())(scope.$parent);
						}						
					}
					
				}			
			};
			
            /* watch for any changes to our data, rebuild the DataTable
            scope.$parent.$watch(attrs.fmData, function(newVal, oldVal) {
				if (!Object.is(newVal, oldVal)) {
                //if (newVal!==oldVal) {
					// apply the plugin				
					vm.updateForm();
                }
            }); */
			
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
function createInputField (element, option, fieldName, data, ngItemName) {
	
	var AppendFlag = false;
	// Create div-Element to append input
	var div = document.createElement('div');
	div.className = 'form-group has-feedback';	
	
	if(option.type =="string") {

		var elemType = 'input';
		var className = ' form-control ng-pristine ';
		var typeName = 'text';
		
		// append input-box - text
		if(option.max_length == undefined) {
			elemType = 'textarea';
		}

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
		
		AppendFlag = true;
		
	} else if((option.type =="choice") || 
			((option.type =="field") && (option.choices!== undefined) )) {
	
			// select Item
			var elemType = 'select';
			var className = ' form-control ';
			var typeName = '';
		
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
		
			// Append Input-Validation
			var errMessageDiv = document.createElement('div');
			//errMessageDiv.className = 'help-block with-errors';
			InsertNgValidation(option, fieldName, errMessageDiv, select);		

			// insert Options
			div.innerHTML += '<label class="control-label" for="myForm.'+fieldName + '" >' + option.label + ' </label>';							
			div.innerHTML +=(select.outerHTML);
		
			AppendFlag = true;
	
	// input-boolean 
	} else if(option.type =="boolean") {

			var elemType = 'input';
			var className = ' ';
			var typeName = 'checkbox';
		
			// append input-box
			var input = document.createElement(elemType);
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
		
			AppendFlag = true;
		
	} else if(option.type =="date") {
		
		// Check if Valid Date passed
		var elemType = 'input';
		var className = ' form-control ng-pristine ';
		var typeName = 'date';

		// append input-box - date
		var input = document.createElement(elemType);
		input.className = className;
		// set attributes
		input.setAttribute("id", "myForm."+fieldName);
		input.setAttribute("name", fieldName);
		if(!isNaN(Date.parse(data))) {
			data = new Date(data);
			input.setAttribute("value", data);
		}
		input.setAttribute("ng-model", ngItemName + "." + fieldName );
		input.setAttribute("type", typeName);
		//
		input.setAttribute("placeholder", "yyyy-MM-dd");
		//scope.Item[fieldName] = data;

		// Append Input-Validation
		var errMessageDiv = document.createElement('div');
		//errMessageDiv.className = 'help-block with-errors';
		InsertNgValidation(option, fieldName, errMessageDiv, input);

		// insert label/input						
		div.innerHTML = '<label class="control-label" for="myForm.'+fieldName + '" >' + option.label + ' </label>';
		div.innerHTML +=(input.outerHTML);
		div.innerHTML +=(errMessageDiv.outerHTML);

		AppendFlag = true;
		

	}
	
	// Append to element - if input created
	if(AppendFlag) {
		// Append help_text
		if(option.help_text !== undefined) {
			// Insert help-block
			div.innerHTML += '<p class="help-block">' + option.help_text + '</p>';
		}		
		// append div to element
		element.append(div);
	}
	
	// return Flag to indicate element is inserted
	return AppendFlag;

};