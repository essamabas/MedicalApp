

/**
* @namespace GenericFormController
*/
function GenericFormController($scope, $stateParams, GenericService) {

    var vm = this;
	// Initialize Post-Options
	$scope.PostOptions = {};
	$scope.ShowpostErrors = false;
	$scope.postErrors = "";
	

	// initialize Item - to be passed in form
	$scope.Item = {};
    $scope.ListName = "List";
	
	// Get Item - if id is provided
	if($stateParams.id !== undefined) {
		vm.Item = GenericService.get({id:$stateParams.id }, function(data) {
  			$scope.Item = data.results[0];
		});
	}
	
	// get url from GenericService
	vm.url = function() {
		var Url = GenericService.url.replace("api","#");
		Url = Url.replace("?format=json","");
		return Url;		
	};
	
    // Initialize new item
    $scope.addItem = function() {
		// we can create an instance as well
		//$scope.Item.$save(function() {
		GenericService.save($scope.Item, function() {
			// on success - Redirect to List
			window.location.href = vm.url;
		});
    };
	
	// Update item
	$scope.updateItem = function() {
		// First get a note object from the factory
		//var note = Notes.get({ id:$routeParams.id });
		//$id = note.id;
		// Now call update passing in the ID first then the object you are updating
		//Notes.update({ id:$id }, note);
		$scope.postErrors = "";
		$scope.ShowpostErrors = false;
		GenericService.create($scope.Item)
			.then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available
			alert("Success");
			window.location.href = vm.url;
		  }, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			alert("Error");
			// add radio for each choice
			$scope.ShowpostErrors = true;
			$scope.postErrors = JSON.stringify(response.data);
			//for (var key in response.data) {
			//	$scope.myForm[key].$error = {postError: JSON.stringify(response.data[key]) };
			//}
			
			//$scope.Item.Message = JSON.stringify()
		  });		
		//vm.Item = GenericService.update({id:$stateParams.id },$scope.Item);
		//vm.Item.$update(function() {
			// on success - Redirect to List
		//	window.location.href = vm.url;
    	//});
	};

	// Get item	 
	vm.getItem = function(ItemId){
		return GenericService.get({id:ItemId});
	};
	
    // Delete Item Management
    vm.deleteItem = function(ItemId){
        GenericService.delete({id:ItemId});
		// on success - Redirect to List
        window.location.href = vm.url;
    };

    // Define Columns Layout - via API OPTIONS Request
	vm.getOptions = function() {
		// Define Columns Layout
		GenericService.options().then(function(options) {
			if(options.data!== undefined) {
				// Name of the List
				$scope.ListName = options.data.name;
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