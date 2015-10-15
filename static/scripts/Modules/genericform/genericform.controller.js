

/**
* @namespace GenericFormController
*/
function GenericFormController($scope, $stateParams, GenericService) {

    var vm = this;
	// Initialize Post-Options
	//$scope.PostOptions = {};
	$scope.ShowpostErrors = false;
	$scope.postErrors = "";
	$scope.enableEdit = false;

	$scope.enableEditFn = function() {
		$scope.enableEdit = true;
	}
	// initialize Item - to be passed in form
	$scope.Item = {};
    $scope.ListName = "List";
	
	// Get Item - if id is provided
	if($stateParams.id !== undefined) {
		//vm.Item = GenericService.get({id:$stateParams.id }, function(data) {
  		//	$scope.Item = data.results[0];
		//});
		vm.Item = GenericService.retrieve($stateParams.id)
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
	}
	
	
    // Initialize new item
	$scope.updateItem = function() {
		// Empty PostErrors messages 
		$scope.postErrors = "";
		$scope.ShowpostErrors = false;
		GenericService.update($scope.Item.url, $scope.Item)
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
	
	// Update item
    $scope.addItem = function() {
		// Empty PostErrors messages 
		$scope.postErrors = "";
		$scope.ShowpostErrors = false;
		GenericService.create($scope.Item)
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
    $scope.deleteItem = function(){
		bootbox.confirm("You are about to delete this Item from database - Are you Sure?", function(result) {
			//Example.show("Confirm result: "+result);
			if(result == true) {
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
			}
		});		
		

    };

    // Define Columns Layout - via API OPTIONS Request
	vm.getOptions = function() {
		// Define Columns Layout
		GenericService.options().then(function(options) {
			if(options.data!== undefined) {
				// Name of the List
				$scope.ListName = options.data.name.replace("List","");
				// Retrieve Post-Options
				$scope.PostOptions =  options.data.actions.POST; 
				// Get Data
				//vm.reloadData(); 				
			}
		});
	};

	// Call Options
    vm.getOptions();

	// Link Template to Controller
	// $scope.reloadData = vm.reloadData;

}