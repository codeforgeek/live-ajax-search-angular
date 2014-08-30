app.controller('main_control',function($scope,$http){
			load_demos();
			function load_demos(){
					
					$http.get("http://localhost:7001/load").success(function(data){
							$scope.loaded_demos=data;
						})
						
				}
			
	});
