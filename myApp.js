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
		//img
		for (var i=0; i<$scope.group.length; i++) {
			$scope.toStacks = $scope.group[i]
			// console.log($scope.toStacks);
			for (var j=0; j<$scope.group[i].length; j++) {
				$scope.item = $scope.group[i][j];
				$scope.item.$index = i*(num-1)+j;
				// console.log($scope.item.$index);
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

// interface
App.directive('myCards', ['$compile', 'getdata', function($compile, getdata){
	var linkFn;
	var per = 3;
	var temp;
	linkFn = function(scope, element, attrs) {
		
		
				
				var one = angular.element(element);
				var each = angular.element(element.children());	
				var index = scope.item.$index;
				one.id = index;
				var object = scope.item;
				
				// stack by 3	
				function reorder() {
					if (index % per === 0) {
						one.css({
							'position': 'absolute',
						});
						temp = index; //上
					} else if (index % per ===1) {
						one.css({
							'position': 'absolute',
							'transform': 'translateY(' + 40 +'px ) translateZ(' + (-10) + 'px)',
						});
					} else if (index % per === 2) {
						one.css({
							'position': 'absolute',
							'transform': 'translateY(' + 80 +'px ) translateZ(' + (-20) + 'px)'
						});			
					}
					if(temp != one.id) {
						angular.element(one.children()[0]).css({
							'top': '80%',
							'fontSize': '16'
						}); 
					} else {
						angular.element(one.children()[0]).css({
							'top': '10%',
							'fontSize': '25'
						}); 
					}
				}
				
   
				//img style
				angular.element(each[5]).css({
					'top': '5%',
					'right': '5%',
					'position': 'absolute'
				});

				// interaction
				one.bind('click', function(){
					if (one.id === temp) {
						var difference = angular.element(one)[0].style.transform;
						// console.log(angular.element(one)[0].style[1]);
						// angular.element(one.children()[0]).css({
						// 	'top': '80%',
						// 	'fontSize': '16',
						// 	'transform': 'difference'
						// }); 
						
					}
					console.log(one.id);
					 //下
					pre = one.id;
					one.id = temp; 
					temp = pre;
					// one.css({
					// 	'position': 'absolute',
					// 	'transform': 'translateZ(' + 3 + 'px)'
					// });
					// angular.element(one.children()[0]).css({
					// 	'top': '10%',
					// 	'fontSize': '25'
					// }); 
					reorder();
				
				});

				reorder();

				// animate -- if top or layered


       		
	};


    return {
        restrict: 'ACE',
		link: linkFn
    }
}]);



// data
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










