var App = angular.module('myApp', []);

App.controller('CardsController', function($scope, getdata) {
	getdata.fetch().then(function(data) {
		
		var tempNum = Math.floor(data.data.length/3);
		var rest = data.data.length%3;
		var num;
		if (rest ===0) {
			num = tempNum;
		} else {
			num = tempNum +1;
		}	
		//group & wrap
		function chunk(arr, size) {
		  var newArr = [];
		  for (var i=0; i<arr.length; i+=size) {
		    newArr.push(arr.slice(i, i+size));
		  }
		  return newArr;
		}
		$scope.group = chunk(data.data, 3);

		for (var i=0; i<$scope.group.length; i++) {
			$scope.toStacks = $scope.group[i]
			// console.log($scope.toStacks);
			for (var j=0; j<$scope.group[i].length; j++) {
				$scope.item = $scope.group[i][j];
				$scope.item.$index = i*(num-1)+j;
				console.log($scope.item.$index);
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

    });
});


App.directive('myCards', ['$compile', 'getdata', function($compile, getdata){
	var linkFn;
	var per = 3;
	linkFn = function(scope, element, attrs) {

		
		getdata.fetch().then(function(data){
				var one = angular.element(element);
				var each = angular.element(element.children());
		
				var index = scope.item.$index;
				var object = scope.item;
				console.log(index);
				// layout	
				if (index % per === 0) {
					angular.element(element).css({
						'position': 'absolute',
					});	
				} else if (index % per ===1) {
					angular.element(element).css({
						'position': 'absolute',
						'transform': 'translateY(' + 40 +'px ) translateZ(' + (-10) + 'px)',
					});
				} else if (index % per === 2) {
					angular.element(element).css({
						'position': 'absolute',
						'transform': 'translateY(' + 80 +'px ) translateZ(' + (-20) + 'px)'
					});
					
				}
				
				//image
				angular.element(each[5]).css({
					'top': '5%',
					'right': '5%',
					'position': 'absolute'
				});

				// animation
				// var animate = function() {
				// 	console.log("woff");
				// 	$(this).animate({
		  //               top: '+=50'
		  //           });
				// }
				// console.log(one);
				// $(one).on('Click', animate);

        });    

		

		
	};


    return {
        restrict: 'ACE',
		link: linkFn
    }
}]);


App.directive('myCards', function($animate){


	return {
		restrict: 'ACE',
		link: function(scope, element, attrs) {
			// console.log(element);
			element.bind('click', function(){
				console.log("woof");
			});
		}
	}
});



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










