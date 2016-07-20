angular.module('viaggia.services.game', [])

.factory('GameSrv', function ($q, $http, Config) {
	var gameService = {};

	var token = '35cd7ce8-785b-4b5f-8a91-d30fa0228312';

	var localStatus = null;
	var localRanking = null;

	/* get remote status */
	gameService.getStatus = function () {
		var deferred = $q.defer();

		//$http.get('data/game/status.json')
		$http.get(Config.getGamificationURL() + '/out/rest/status' + '?token=' + token, Config.getHTTPConfig())

		.success(function (status) {
			localStatus = status;
			deferred.resolve(localStatus);
		})

		.error(function (response) {
			deferred.reject(response);
		});

		return deferred.promise;
	};

	/* get local status (get remote first if null) */
	gameService.getLocalStatus = function () {
		var deferred = $q.defer();

		if (!localStatus) {
			gameService.getStatus().then(
				function (localStatus) {
					deferred.resolve(localStatus);
				},
				function (response) {
					deferred.reject(response);
				}
			);
		} else {
			deferred.resolve(localStatus);
		}

		return deferred.promise;
	};

	/* get ranking */
	gameService.getRanking = function (when) {
		var deferred = $q.defer();

		var timestamp = null;

		// TODO handle "when"!
		if (when === 'now') {
			// Current week
			var d = new Date();
			timestamp = d.getTime();
		} else if (when === 'last') {
			// Last week
			var d = new Date();
			d.setDate(d.getDate() - 7);
			timestamp = d.getTime();
		}

		//$http.get('data/game/ranking.json')
		$http.get(Config.getGamificationURL() + '/out/rest/classification' + '?token=' + token + (!!timestamp ? '&timestamp=' + timestamp : ''), Config.getHTTPConfig())

		.success(function (ranking) {
			localRanking = ranking;
			deferred.resolve(localRanking);
		})

		.error(function (response) {
			deferred.reject(response);
		});

		return deferred.promise;
	};

	return gameService;
});
