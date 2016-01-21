angular.module('viaggia.services.info', [])

/**
 * A SERVICE TO WORK WITH PARKING DATA FROM SERVER
 */
.factory('parkingService', function ($http, $q, $filter, Config, DataManager, GeoLocate) {
  var generateId = function(name) {
    return name ? name.replace('/','_') : '_';
  };
  return {
    getParkings : function(agencyId) {
      var deferred = $q.defer();
      $http.get(Config.getServerURL()+'/getparkingsbyagency/'+agencyId,
                Config.getHTTPConfig())
        .success(function(data) {
          if (data) {
            data.forEach(function(d, idx) {
                  d.id = generateId(d.name);
            });
            var all = [];
            GeoLocate.locate().then(function(pos) {
              data.forEach(function(p) {
                all.push(GeoLocate.distanceTo(p.position));
              });
              $q.all(all).then(function(positions){
                data.forEach(function(d, idx) {
                  d.distance = positions[idx];
                });
                deferred.resolve(data);
              });
            }, function(err) {
              deferred.resolve(data);
            });
          } else {
            deferred.resolve(data);
          }
        })
        .error(function(err) {
          deferred.reject(err);
        });


      return deferred.promise;
    }
  }
})

.factory('bikeSharingService', function ($http, $q, $filter, Config, DataManager, GeoLocate) {
  return {
    getStations : function(agencyId) {
      var deferred = $q.defer();
      $http.get(Config.getServerURL()+'/bikesharing/'+agencyId,
                Config.getHTTPConfig())
        .success(function(data) {
          if (data) {
            var all = [];
            GeoLocate.locate().then(function(pos) {
              data.forEach(function(p) {
                all.push(GeoLocate.distanceTo(p.position));
              });
              $q.all(all).then(function(positions){
                data.forEach(function(d, idx) {
                  d.distance = positions[idx];
                });
                deferred.resolve(data);
              });
            }, function(err) {
              deferred.resolve(data);
            });
          } else {
            deferred.resolve(data);
          }
        })
        .error(function(err) {
          deferred.reject(err);
        });


      return deferred.promise;
    }
  }
})

