var App = angular.module('myApp', []);

App.controller('CardsController', function($scope, getdata) {
	getdata.fetch().then(function(data) {
		var dataArray = [];
		dataArray = data.data;
		var tempNum = Math.floor(dataArray.length/3);
		var rest = dataArray.length%3;
		var num;
		if (rest ===0) {
			num = tempNum;
		} else {
			num = tempNum +1;
		}	

		function chunk(arr, size) {
		  var newArr = [];
		  for (var i=0; i<arr.length; i+=size) {
		    newArr.push(arr.slice(i, i+size));
		  }
		  return newArr;
		}

		$scope.group = chunk(data.data, 3);
		console.log($scope.group);
		for (var i=0; i<$scope.group.length; i++) {
			$scope.toStacks = $scope.group[i]
			// console.log($scope.toStacks);
			for (var j=0; j<$scope.group[i].length; j++) {
				$scope.item = $scope.group[i][j];
				$scope.item.index = i*num+j;
				if ($scope.item.subType === "Lecture") {
	          		($scope.item.image = "shapes/triangle.png");
	          	} else if ($scope.item.subType === "Award Nominee") {
	          		$scope.item.image = "shapes/square.png";
	          	} else if ($scope.item.subType === "Show") {
	          		$scope.item.image = "shapes/circle.png";
	          	}
				
				// console.log($scope.item);
			}
		}


        
        $scope.myClass = [];
      
       
       

        /*
        for (var i=0; i<$scope.group.length; i++) {
        	($scope.group)[i].index = i;
        	if (($scope.group)[i].subType === "Lecture") {
          		($scope.group)[i].image = "shapes/triangle.png";
          	} else if (($scope.group)[i].subType === "Award Nominee") {
          		($scope.group)[i].image = "shapes/square.png";
          	} else if (($scope.group)[i].subType === "Show") {
          		($scope.group)[i].image = "shapes/circle.png";
          	}
          	if ($scope.group[i].index%3===0) {
          		
          		// $scope.myClass.push("col-md-6");
          		// console.log($scope.toStacks[i]);
          	}          	
        }
        */
        
        // $scope.myClass.push("col-md-6");

    });
});


App.directive('myCards', ['$compile', 'getdata', function($compile, getdata){
	var linkFn;
	var per = 3;
	linkFn = function(scope, element, attrs) {

		var num, rest, tempNum;
		getdata.fetch().then(function(data){
			
        		var dataArray = [];
        		dataArray = data.data;
				var tempNum = Math.floor(dataArray.length/3);
				var rest = dataArray.length%3;
				var num;
				if (rest ===0) {
					num = tempNum;
				} else {
					num = tempNum +1;
				}	
				// console.log("num: " + num + " rest: " + rest);	

				var each = angular.element(element.children());
		
				// angular.element(each).css({
				// 	'transform': 'translateX(' + i +'px ) translateY(' + i +'px )',
		  //       	'z-index': 999999 - i,
				// });
				// i = i + 5;
				// 
				var index = scope.index;
				var object = (scope.$parent).item;
				// scope.$watch(each.wrapper, function(newVal){
	   //              jQuery.merge(object, element);
	   //              if (newVal) {
	   //                  object.wrapAll('<div />');
	   //                  object = angular.element();
	   //              }
	   //          });
				
				
				if (object.index % per === 0) {
					// angular.element(element.children()[0]).addClass("col-md-6");
					// angular.element(element.children()[0]).removeClass("item");
					angular.element(element).css({
						// 'width': '40%',
						'z-index': 0,
						'position': 'relative'
					});
					
					
				}
				if (object.index % per ===1) {
					// console.log((scope.$parent).item);
					// console.log(each);
					// angular.element(element.children()[0]).addClass("col-md-6");
					angular.element(element).css({

						// 'position': 'absolute',
						// 'width': '40%',
						'transform': 'translateX('  + 5 +'px ) translateY(' + 50 +'px )',
						'z-index': -1,
					});
				}
				if (object.index % per === 2) {
					// angular.element(element.children()[0]).addClass("col-md-6");
					angular.element(element).css({
						// 'position': 'absolute',
						// 'width': '40%',
						'transform': 'translateX(' + 5 +'px ) translateY(' + 100 +'px )',
						'z-index': -2,
					});
				}
				console.log(angular.element(element));
				angular.element(each[5]).css({
					'top': '5%',
					'right': '5%',
					'position': 'absolute'
				});

        });    

		

		
	};


    return {
        restrict: 'ACE',
		// scope: {
  //           index: '@'
  //       },
		link: linkFn
    }
}]);

/*
App.directive('myCards', function(){
	var linkFn;
	var i;
	linkFn = function(scope, element, attrs) {
		
		var each = (angular.element(element.children()[0]));
		
		// angular.element(each).css({
		// 	'transform': 'translateX(' + i +'px ) translateY(' + i +'px )',
  //       	'z-index': 999999 - i,
		// });
		// i = i + 5;
		// console.log(each);
		var index = scope.index;
		var object = (scope.$parent).item;
		console.log();
		if (object.index ===0) {
			console.log((scope.$parent).item);
		}	
	};
	return {
		restrict: 'ACE',
		scope: {
            index: '@'
        },
		link: linkFn
	}
});
*/


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










