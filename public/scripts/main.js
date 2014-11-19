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
	.controller('releaseSearch', ['$scope', '$http', '$modal', function ($scope, $http, $modal) {
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
						var list = data.items.issues;
						var newList = [];

						// filter closed status
						for (var i = 0; i < list.length; i++) {
							if (list[i].fields.status.id != 6) {
								newList.push(list[i]);
							}
						}
						
						$scope.list = newList;
						$scope.listTitle = data.fixversion;
						$scope.total = newList.length;
					}
				});
			}
		};
		var exportSuccessCtrl = function ($scope, $modalInstance, emailAddress) {
			$scope.emailAddress = emailAddress;
			$scope.close = function () {
				$modalInstance.dismiss('cancel');
			};
		};
		$scope.exportMail = function () {
			$scope.exporting = true;
			$http.post('/release/export', {
				subject: $scope.fixversion + ' Release GL Reminder',
				mainbody: encodeURIComponent(document.getElementById("list").innerHTML)
			}).success(function (data) {
				$scope.exporting = false;
				if (data.success) {
					$modal.open({
						templateUrl: 'exportSuccess.html',
						size: 'sm',
						controller: exportSuccessCtrl,
						resolve: {
							emailAddress: function () {
								return data.emailAddress;
							}
						}
					});
				}
			});
		};
	}]);