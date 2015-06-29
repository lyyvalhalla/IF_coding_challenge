var App = angular.module('myApp', []);

App.controller('CardsController', function($scope, getdata) {
	getdata.fetch().then(function(data) {
        $scope.toStacks = data.data;
        

        for (var i=0; i<$scope.toStacks.length; i++) {
        	($scope.toStacks)[i].index = i;
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


// App.directive('myCards', ['$compile', 'getdata', function($compile, getdata){
//     return {
//         restrict: 'ACE',
//         link: function (scope, element, attrs) {
//         	getdata.fetch().then(function(data){
//         		var dataArray = [];
//         		dataArray = data.data;
// 				var tempNum = Math.floor(dataArray.length/3);
// 				var rest = dataArray.length%3;
// 				var num;
// 				if (rest ===0) {
// 					num = tempNum;
// 				} else {
// 					num = tempNum +1;
// 				}
				
// 				var array = angular.element(element);
				
				
// 				console.log(array);
//         	});       
//         }
//     }
// }]);


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
		console.log(each[0]);
		console.log();
		
	};
	return {
		restrict: 'ACE',
		scope: {
            index: '@'
        },
		link: linkFn
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










