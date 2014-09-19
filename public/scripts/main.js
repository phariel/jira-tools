angular.module('jiraHelper', [])
	.controller('loginCtrl', ['$scope', '$http', function ($scope, $http) {

		$scope.login = function () {
			console.log($scope.user);
			$http.post('/login', $scope.user).success(function (data) {
				console.log(data);
				if (data && data.success === 'true') {
					console.log('ok');
					setTimeout(function () {
						$scope.configVisible = true;
						$scope.$apply();
					}, 0);

				} else {

				}
			});
		};
	}]);