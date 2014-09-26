angular.module('jiraHelper', ['ui.bootstrap'])
	.controller('loginCtrl', ['$scope', '$rootScope', '$http', '$modal', function ($scope, $rootScope, $http, $modal) {
		var loginFailCtrl = function ($scope, $modalInstance) {
			$scope.close = function () {
				$modalInstance.dismiss('cancel');
			};
		};

		$scope.login = function () {
			console.log($scope.user);
			$http.post('/login', $scope.user).success(function (data) {
				if (data && data.success) {
					$rootScope.logined = true;
				} else {
					$modal.open({
						templateUrl: 'loginFail.html',
						size: 'sm',
						controller: loginFailCtrl
					});
				}
			});
		};
	}])
	.controller('releaseSearch', ['$scope', '$http', function ($scope, $http) {
		$scope.items = [''];
		$scope.generate = function () {
			var fv = $scope.fixversion;
			var loading = $scope.generaing;
			if (fv) {
				loading = true;
				$http.post('/release/get', {
					fixversion: fv
				}).success(function (data) {
					console.log(data);
				});
			}
		};
	}]);