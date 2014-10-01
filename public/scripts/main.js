angular.module('jiraHelper', ['ui.bootstrap'])
	.controller('loginCtrl', ['$scope', '$rootScope', '$http', '$modal', function ($scope, $rootScope, $http, $modal) {
		var loginFailCtrl = function ($scope, $modalInstance) {
			$scope.close = function () {
				$modalInstance.dismiss('cancel');
			};
		};

		$scope.login = function () {
			$scope.logging = true;
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
				$scope.logging = false;
			});
		};
	}])
	.controller('releaseSearch', ['$scope', '$http', function ($scope, $http) {
		$scope.items = [
			'42-1 10/15/2014',
			'45-1 11/5/2014',
			'48-1 11/26/2014',
			'50-1 12/10/2014'
		];
		$scope.generate = function () {
			var fv = $scope.fixversion;
			if (fv) {
				$scope.generating = true;
				$http.post('/release/get', {
					fixversion: fv
				}).success(function (data) {
					$scope.generating = false;
					if (data.success) {
						$scope.list = data.items.issues;
						$scope.listTitle = data.fixversion;
						$scope.total = data.items.total;
					}
				});
			}
		};
		$scope.exportMail = function () {
			var body = document.getElementById("list").innerHTML;
			var link = 'mailto:ETSchool.PC@ef.com,ETSchool.Dragon@ef.com';
			link += '?subject=' + $scope.fixversion + ' Release GL Reminder';
			link += '&body=' + encodeURIComponent(body);
			window.location.href = link;
		};
	}]);