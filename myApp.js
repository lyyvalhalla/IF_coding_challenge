var App = angular.module('myApp', []);

App.controller('CardsController', function($scope, getdata) {
	getdata.fetch().then(function(data) {
        $scope.toStacks = data.data;
        console.log($scope.toStacks);

        for (var i=0; i<$scope.toStacks.length; i++) {
        	if (($scope.toStacks)[i].subType === "Lecture") {
          		($scope.toStacks)[i].image = "shapes/triangle.png";
          	} else if (($scope.toStacks)[i].subType === "Award Nominee") {
          		($scope.toStacks)[i].image = "shapes/square.png";
          	} else if (($scope.toStacks)[i].subType === "Show") {
          		($scope.toStacks)[i].image = "shapes/circle.png";
          	}
        }
    });
});

App.directive('myCards', function(getdata){
	getdata.fetch().then(function(data) {
		var dataArray=[];
        dataArray = data.data;

		var tempNum = Math.floor(dataArray.length/3);
		var rest = dataArray.length%3;
		var num;
		if (rest ===0) {
			num = tempNum;
		} else {
			num = tempNum +1;
		}

		var linkFn;
		linkFn = function(scope, element, attrs) {
			
		} 

		return function() {
   			restrict: 'E',
        	link: linkFn
	});
}); 


// App.controller('CardsController', function($scope, $http, $element){
// 	$http.get('bubbles.json')
//        .then(function(res){
//           $scope.toStacks = (res.data).data; 
//           var dataArray=[];
//           dataArray = $scope.toStacks;
          
          
// 	      for (var i=0; i<$scope.toStacks.length; i++) {
	      	
//           	if (($scope.toStacks)[i].subType === "Lecture") {
//           		($scope.toStacks)[i].image = "shapes/triangle.png";
//           	} else if (($scope.toStacks)[i].subType === "Award Nominee") {
//           		($scope.toStacks)[i].image = "shapes/square.png";
//           	} else if (($scope.toStacks)[i].subType === "Show") {
//           		($scope.toStacks)[i].image = "shapes/circle.png";
//           	}
//           }

//           var tempNum = Math.floor(dataArray.length/3);
//           var rest = dataArray.length%3;
//           var num;
//           if (rest ===0) {
//           	num = tempNum;
//           } else {
//           	num = tempNum +1;
//           }

          

//           console.log($element[0].children)

//     //       var newArray = [];
//     //       for(var i=0; i<dataArray.length; i++) {
//     //       	// newArray.push(dataArray.splice(0,3));
//     //       } 
// 		  // console.log(newArray)

//     //       
//     //       var card = angular.element.find("#item");
         

//         });
// 	});


App.factory('getdata', function($q, $timeout, $http){
	var GetData = {
		fetch: function(callback) {
        
            var deferred = $q.defer();

            $timeout(function() {
                $http.get('bubbles.json').success(function(data) {
                    deferred.resolve(data);
                });
            }, 30);

            return deferred.promise;
        }
	};

	return GetData;
});










