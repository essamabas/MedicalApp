
// Generic Servie to read API CRUD / OPTIONS
function apiService($cookies,$http, URL) {
    //options: {method : "POST", params:{ format: 'json'}, data: "csrfmiddlewaretoken="+$cookies.csrftoken+"&_method=OPTIONS"}
	//var service = $resource(URL, {'Id': '@id'}, {query:  {method: 'GET', params: { format: 'json'}, isArray: false} });
	
	var service = {};
	// query(get) all Items
	service.query = function() {
		return $http({
			method: 'GET',
			url: service.url(),
			contentType: "application/json",
			dataType: "json",		
			headers: {'Content-Type': 'application/json'},
			params:{"format": "json"},
			beforeSend: function(xhr, settings) {
				  xhr.setRequestHeader("X-CSRFToken", $cookies.get('csrftoken'));
				}			
		});		
	};
	
	// Add URL to Service Provider - needed to navigate Controllers to Add/Edit/View Pages
	service.url = function() {
		var url = URL;
		if(URL.lastIndexOf("/:")> -1) {
			url =  URL.slice(0,URL.lastIndexOf("/:")+1);
		}
		return url;
	};
	
	service.retrieve = function(id) {
		return $http({
			method: 'GET',
			url: service.url() + id + "/",
			contentType: "application/json",
			dataType: "json",		
			headers: {'Content-Type': 'application/json'},
			params:{"format": "json"},
			beforeSend: function(xhr, settings) {
				  xhr.setRequestHeader("X-CSRFToken", $cookies.get('csrftoken'));
				}			
		});		
	};
	
	// source: http://stackoverflow.com/questions/23149151/jquery-and-django-rest-framework-bulk-send-list
	service.create = function(data) {
		return $http({
			method: 'POST',
			url: service.url(),
			contentType: "application/json; charset=utf-8",
			dataType: "json",			
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			//params:{"format": "json"},
			data: "csrfmiddlewaretoken=" + $cookies.get('csrftoken') + "&_content_type=application/json" + "&_content="+JSON.stringify(data),
			//data: JSON.stringify(data),
			beforeSend: function(xhr, settings) {
				  xhr.setRequestHeader("X-CSRFToken", $cookies.get('csrftoken'));
				}			
		});
	};
	
	// update certain Item - PUT Request - as defined in django-rest-framework
	// url should include the Item-id
	// Ref: http://www.django-rest-framework.org/tutorial/2-requests-and-responses/
	service.update = function(url, data) {
		return $http({
			method: 'PUT',
			url: url,
			//contentType: "application/json; charset=utf-8",
			contentType: "application/json",
			dataType: "json",
			media_type: "application/x-www-form-urlencoded",		
			//headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			headers: {'Content-Type': 'application/json'},
			//params:{"format": "json"},
			//data: "csrfmiddlewaretoken=" + $cookies.get('csrftoken') + "&_content_type=application/json" + "&_content="+JSON.stringify(data),
			data: JSON.stringify(data),
			beforeSend: function(xhr, settings) {
				  xhr.setRequestHeader("X-CSRFToken", $cookies.get('csrftoken'));
				}			
		});
	};
	
	// update certain Item - PUT Request - as defined in django-rest-framework
	// url should include the Item-id
	// Ref: http://www.django-rest-framework.org/tutorial/2-requests-and-responses/
	service.delete = function(url) {
		return $http({
			method: 'DELETE',
			url: url,
			//contentType: "application/json; charset=utf-8",
			contentType: "application/json",
			dataType: "json",
			media_type: "application/x-www-form-urlencoded",		
			//headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			headers: {'Content-Type': 'application/json'},
			//params:{"format": "json"},
			//data: "csrfmiddlewaretoken=" + $cookies.get('csrftoken') + "&_content_type=application/json" + "&_content="+JSON.stringify(data),
			//data: JSON.stringify(data),
			beforeSend: function(xhr, settings) {
				  xhr.setRequestHeader("X-CSRFToken", $cookies.get('csrftoken'));
				}			
		});
	};	
	
	
	// add any methods here using prototype
	service.options = function() {
		var url = URL;
		if(URL.lastIndexOf("/:")> -1) {
			url =  URL.slice(0,URL.lastIndexOf("/:")+1);
		} 
		return $http({
			method: 'OPTIONS',
			url: url,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			//headers: {'Content-Type': 'application/json'},
			params:{"format": "json"},
			data: "csrfmiddlewaretoken="+$cookies.get('csrftoken')+"&_method=OPTIONS"
		});
	};
	return service;  
}