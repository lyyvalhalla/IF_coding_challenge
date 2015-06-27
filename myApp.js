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


App.directive('myCards', ['$compile', 'getdata', function($compile, getdata){
    return {
        restrict: 'ACE',
        link: function (scope, element, attrs) {
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
				console.log(num);
        	});       
        }
    }
}]);



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










