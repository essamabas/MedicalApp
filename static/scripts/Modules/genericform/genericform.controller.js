

angular.module('sbAdminApp')
  .controller('GenericFormController', ['$scope','$stateParams','GenericService',GenericFormController])
;

/**
* @namespace GenericFormController
*/
function GenericFormController($scope, $stateParams, GenericService) {

    var vm = this;
	// Initialize Post-Options
	
	//FormError Model-Variables
	$scope.ShowpostErrors = false;
	$scope.postErrors = "";
	
	//EnableEdit Model-Variables
	$scope.enableEdit = false;
	$scope.enableEditFn = function() {
		$scope.enableEdit = true;
		$scope.ListName = $scope.ListName.replace("View","Edit");
		$scope.ListName = $scope.ListName.replace("Add","Edit");
	};
	// initialize Item - to be passed in form
	$scope.Item = {};
    $scope.ListName = "";
	
	// Get Item - if id is provided
	if($stateParams.id !== undefined) {
		//vm.Item = GenericService.get({id:$stateParams.id }, function(data) {
  		//	$scope.Item = data.results[0];
		//});
		GenericService.retrieve($stateParams.id)
			.then(function successCallback(response) {
			// this callback will be called asynchronously when the response is available
			console.log("Item retrieved successfully - response: " + JSON.stringify(response));
			$scope.Item = response.data;
		  }, function errorCallback(response) {
			// called asynchronously if an error occurs or server returns response with an error status.
			console.warn("Item is not retrieved  - response: " + JSON.stringify(response));
			// add radio for each choice
			$scope.ShowpostErrors = true;
			$scope.postErrors = JSON.stringify(response.data);
		  });		
	}
	
	// get url from GenericService
	vm.url = function() {
		var Url = GenericService.url().replace("api","#");
		Url = Url.replace("?format=json","");
		return Url;		
	};
	
	// Get Back to List
	$scope.BackToList = function() {
		window.location.href = vm.url();
	};
	
	
    // update Item - Model variable
	$scope.updateItem = function() {
		if($scope.Item.url === "") {
			// Add new Item
			vm.addItem();
		} else {
			// Edit Item
			vm.updateItem();
		}
	};
	
	// update Item - function
	vm.updateItem = function() {
		// Empty PostErrors messages 
		$scope.postErrors = "";
		$scope.ShowpostErrors = false;
		// create local data-copy
		vm.Item = jQuery.extend(true, {}, $scope.Item);
		vm.PreparePost(vm.Item, $scope.PostOptions);
		GenericService.update($scope.Item.url, vm.Item)
			.then(function successCallback(response) {
			// this callback will be called asynchronously when the response is available
			console.log("Item is updated successfully - response: " + JSON.stringify(response));
			bootbox.alert("Item is updated successfully!", function() {
				window.location.href = vm.url();
			});
		  }, function errorCallback(response) {
			// called asynchronously if an error occurs or server returns response with an error status.
			console.warn("Item is not updated  - response: " + JSON.stringify(response));
			// add radio for each choice
			$scope.ShowpostErrors = true;
			$scope.postErrors = JSON.stringify(response.data);
		  });		
	};
	
	// add new Item - function
    vm.addItem = function() {
		// Empty PostErrors messages 
		$scope.postErrors = "";
		$scope.ShowpostErrors = false;
		// create a copy of Item-Data
		vm.Item = jQuery.extend(true, {}, $scope.Item);
		vm.PreparePost(vm.Item, $scope.PostOptions);
		GenericService.create(vm.Item)
			.then(function successCallback(response) {
			// this callback will be called asynchronously when the response is available
			console.log("Item is added successfully - response: " + JSON.stringify(response));
			bootbox.alert("Item is added successfully!", function() {
				window.location.href = vm.url();
			});
		  }, function errorCallback(response) {
			// called asynchronously if an error occurs or server returns response with an error status.
			alert("Error");
			console.error("Item is not added  - response: " + JSON.stringify(response));
			// add radio for each choice
			$scope.ShowpostErrors = true;
			$scope.postErrors = JSON.stringify(response.data);
		  });
	};

	// Get item	 
	vm.getItem = function(ItemId){
		return GenericService.get({id:ItemId});
	};
	
	// Delete Item Management
	vm.deleteItem = function() {
		$scope.postErrors = "";
		$scope.ShowpostErrors = false;
		GenericService.delete($scope.Item.url)
			.then(function successCallback(response) {
			// this callback will be called asynchronously when the response is available
			console.log("Item is deleted successfully - response: " + JSON.stringify(response));
			bootbox.alert("Item is deleted successfully!", function() {
				window.location.href = vm.url();
			});
		}, function errorCallback(response) {
			// called asynchronously if an error occurs or server returns response with an error status.
			console.warn("Item is not deleted  - response: " + JSON.stringify(response));
			// add radio for each choice
			$scope.ShowpostErrors = true;
			$scope.postErrors = JSON.stringify(response.data);
		});		
	};
	
    // Delete Item Model-Function
    $scope.deleteItem = function(){
		if($scope.Item.url == "") {
			//Add Page - just discard the changes and navigate to List-Page
			bootbox.confirm("You are about to discard the changes - Are you Sure?", function(result) {
				if(result == true) {
					// Navigate to List-Page
					window.location.href = vm.url();
				}
			});					
			
		} else {
			// Delete Item
			bootbox.confirm("You are about to delete this Item from database - Are you Sure?", function(result) {
				//Example.show("Confirm result: "+result);
				if(result == true) {
					// Delete Item from DB
					vm.deleteItem();
				}
			});			
		}
		
		

    };

    // Define Columns Layout - via API OPTIONS Request
	vm.getOptions = function() {
		// Define Columns Layout
		GenericService.options().then(function(options) {
			if(options.data!== undefined) {
				// Name of the List
				$scope.ListName = options.data.name.replace("List","") + " View";
				// Retrieve Post-Options
				$scope.PostOptions =  options.data.actions.POST; 
				// Get Data
				//vm.reloadData();
				// Get Empty Data Fields
				if($stateParams.id == undefined) {
					vm.getDefaultData(options.data.actions.POST);
				}
			}
		});
	};
	
	// retrieve Default-Data from options
	vm.getDefaultData = function(dataoptions) {
		// Item structure
		$scope.Item ={};
		$scope.enableEdit = true;
		// loop to each field
		for (var field in dataoptions) {
			$scope.Item[field] = "";
		}
	};	

	// function should be called before posting data - in order to avoid errors between django-rest/ 
	vm.PreparePost =function(Item, options){
		//
		for (var field in Item) {
			// $scope.PostOptions
			var data = Item[field];
			var option = options[field];
			// convert date to string YYYY-MM-DD
			if(option.type == 'date') {
				if(data instanceof Date){
					// convert to string
					Item[field] = moment(data).format('YYYY-MM-DD');
				}
			}
		}


		
	};
		
	// Call Options
    vm.getOptions();

	// Link Template to Controller
	// $scope.reloadData = vm.reloadData;

}