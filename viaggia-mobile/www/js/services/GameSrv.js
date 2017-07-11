angular.module('viaggia.services.game', [])

    .factory('GameSrv', function ($q, $http, Config, userService) {
        var gameService = {};

        var localStatus = null;
        var localRanking = null;
        // var NOTIFICATIONS_MAPPING = {
        //     badge:
        //     [
        //         {
        //             db_types: "BADGE",
        //             style: "NEW_BADGE"
        //         }
        //     ]
        //     ,
        //     challenge: [
        //         {
        //             db_types: "CHALLENGE_WON",
        //             style: "WON_CHALLENGE"
        //         },
        //         {
        //             db_types: "CHALLENGE",
        //             style: "NEW_CHALLENGE"
        //         }
        //     ],
        //     trip: [
        //         {
        //             db_types: "BADGE",
        //             style: "NEW_BADGE"
        //         }
        //     ],
        //     ranking: [
        //         {
        //             db_types: "BADGE",
        //             style: "NEW_BADGE"
        //         }
        //     ],
        //     allnotifications: [
        //         {
        //             db_types: "BADGE",
        //             style: "NEW_BADGE"
        //         }
        //     ]
        // }
        var NOTIFICATIONS_MAPPING = {
            BADGE: {
                string: "msg_won_badge",
                color: "#60b35c",
                icon: "ic_game_badge"
            },
            CHALLENGE: {
                string: "msg_won_challenge",
                color: "#922d67",
                icon: "ic_game_challenge"
            }
        }


        var NOTIFICATIONS_STYLES = {
            END_TRIP_WALK: {
                string: "msg_trip_walk",
                color: "#60b35c",
                icon: "ic_foot"
            },
            END_TRIP_BIKE: {
                string: "msg_trip_bike",
                color: "#922d67",
                icon: "ic_bike"
            },
            END_TRIP_BUS: {
                string: "msg_trip_bus",
                color: "#ea8817",
                icon: "ic_urban-bus"
            },
            END_TRIP_TRAIN: {
                string: "msg_trip_train",
                color: "#cd251c",
                icon: "ic_train"
            },
            END_TRIP_MULTIMODAL: {
                string: "msg_trip_multimodal",
                color: "#2975a7",
                icon: "ic_game_multimodal_trip"
            },
            NEW_BADGE: {
                string: "msg_won_badge",
                color: "#60b35c",
                icon: "ic_game_badge"
            },
            WON_CHALLENGE: {
                string: "msg_won_challenge",
                color: "#60b35c",
                icon: "ic_game_challenge"
            },
            NEW_CHALLENGE: {
                string: "msg_new_challenge",
                color: "#60b35c",
                icon: "ic_game_challenge_assign"
            },
            NEW_FRIEND: {
                string: "msg_new_friend",
                color: "#3cbacf",
                icon: "ic_game_friend"
            },
            NEW_RANKING_WEEK: {
                string: "msg_pub_ranking",
                color: "#3cbacf",
                icon: "ic_game_classification"
            },
        }
        var returnValue = {
            "firstBefore": 1475186400000,
            "firstAfter": 1478214000000,
            "stats": [
                {
                    "from": 1475272800000,
                    "to": 1475359199000,
                    "data": {
                        "free tracking": 1,
                        "walk": 0.01113068647287049
                    }
                },
                {
                    "from": 1475532000000,
                    "to": 1475618399000,
                    "data": {
                        "free tracking": 2,
                        "walk": 0.13049454731428348
                    }
                },
                {
                    "from": 1475704800000,
                    "to": 1475791199000,
                    "data": {
                        "free tracking": 1,
                        "planned": 2,
                        "transit": 17.95396647921341,
                        "walk": 1.8251372116081936
                    }
                },
                {
                    "from": 1476136800000,
                    "to": 1476223199000,
                    "data": {
                        "free tracking": 2,
                        "walk": 0.08257453364882839
                    }
                },
                {
                    "from": 1476309600000,
                    "to": 1476395999000,
                    "data": {
                        "bike": 0.04427607554555679,
                        "free tracking": 2,
                        "walk": 0.03888304501602912
                    }
                },
                {
                    "from": 1476396000000,
                    "to": 1476482399000,
                    "data": {
                        "planned": 1,
                        "transit": 8.976983239606545,
                        "walk": 0.8652789999999999
                    }
                },
                {
                    "from": 1477260000000,
                    "to": 1477346399000,
                    "data": {
                        "bike": 0.9439528951907973,
                        "free tracking": 1
                    }
                },
                {
                    "from": 1477692000000,
                    "to": 1477778399000,
                    "data": {
                        "bike": 4.324641387105223,
                        "free tracking": 2
                    }
                },
                {
                    "from": 1477868400000,
                    "to": 1477954799000,
                    "data": {
                        "bike": 1.0606265297022681,
                        "free tracking": 1
                    }
                }
            ]
        }

        var ArrMax = {
            "userId": "24122",
            "updateTime": 1498552227657,
            "stats": {
                "total": {
                    "date max bike": {
                        "from": 978303600000,
                        "to": 1498514400000
                    },
                    "date max free tracking": {
                        "from": 978303600000,
                        "to": 1498514400000
                    },
                    "date max planned": {
                        "from": 978303600000,
                        "to": 1498514400000
                    },
                    "date max transit": {
                        "from": 978303600000,
                        "to": 1498514400000
                    },
                    "date max walk": {
                        "from": 978303600000,
                        "to": 1498514400000
                    },
                    "maxbike": 6.649041845265036,
                    "maxfree tracking": 26,
                    "maxplanned": 8,
                    "maxtransit": 108.7630345280771,
                    "maxwalk": 7.646344053298546
                },
                "day": {
                    "date max bike": {
                        "from": 1477692000000,
                        "to": 1477692000000
                    },
                    "date max free tracking": {
                        "from": 1475100000000,
                        "to": 1475100000000
                    },
                    "date max planned": {
                        "from": 1475704800000,
                        "to": 1475704800000
                    },
                    "date max transit": {
                        "from": 1478214000000,
                        "to": 1478214000000
                    },
                    "date max walk": {
                        "from": 1475704800000,
                        "to": 1475704800000
                    },
                    "maxbike": 4.324641387105223,
                    "maxfree tracking": 3,
                    "maxplanned": 2,
                    "maxtransit": 21.292706110014688,
                    "maxwalk": 1.8251372116081936
                },
                "month": {
                    "date max bike": {
                        "from": 1475272800000,
                        "to": 1477868400000
                    },
                    "date max free tracking": {
                        "from": 1472680800000,
                        "to": 1475186400000
                    },
                    "date max planned": {
                        "from": 1477954800000,
                        "to": 1480460400000
                    },
                    "date max transit": {
                        "from": 1477954800000,
                        "to": 1480460400000
                    },
                    "date max walk": {
                        "from": 1477954800000,
                        "to": 1480460400000
                    },
                    "maxbike": 6.373496887543846,
                    "maxfree tracking": 12,
                    "maxplanned": 5,
                    "maxtransit": 81.83208480925715,
                    "maxwalk": 3.824537
                },
                "week": {
                    "date max bike": {
                        "from": 1477260000000,
                        "to": 1477778400000
                    },
                    "date max free tracking": {
                        "from": 1474840800000,
                        "to": 1475359200000
                    },
                    "date max planned": {
                        "from": 1479682800000,
                        "to": 1480201200000
                    },
                    "date max transit": {
                        "from": 1479682800000,
                        "to": 1480201200000
                    },
                    "date max walk": {
                        "from": 1475445600000,
                        "to": 1475964000000
                    },
                    "maxbike": 5.268594282296021,
                    "maxfree tracking": 9,
                    "maxplanned": 2,
                    "maxtransit": 30.26968934962123,
                    "maxwalk": 1.955631758922477
                }
            }
        }

         var ServerHow = {
                "Daily": "day",
            "Weekly": "week",
            "Monthly": "month",
            "Total": "total",
         }

        gameService.getServerHow = function(how) {
            var filter = how;
            var returnhow = ServerHow[filter];
            return returnhow;
        }

        gameService.getStyleColor = function (message) {
            return NOTIFICATIONS_MAPPING[message.type].color;
        }
        gameService.getIcon = function (message) {
            return NOTIFICATIONS_MAPPING[message.type].icon;
        }
         gameService.getString = function (message) {
            return NOTIFICATIONS_MAPPING[message.type].string;
        }
        gameService.getNotificationTypes = function () {
            return NOTIFICATIONS_TYPES;
        }

        gameService.getDiary = function (type, from, to) {
            var deferred = $q.defer();
            $http.get('data/messages.json').success(function (messages) {
                var returnValue = messages;
                var returnNotifications = [];
                userService.getValidToken().then(
                    function (token) {
                        for (var i = returnValue.length - 1; i > 0; i--) {
                            if (returnValue[i].timestamp > from && returnValue[i].timestamp < to)
                                returnNotifications.push(returnValue[i]);
                        }
                        deferred.resolve(returnNotifications);
                    });
            });
            return deferred.promise;
        }



        gameService.getMaxStat = function (type) {
            var deferred = $q.defer();
            var MaxStats = []
            userService.getValidToken().then(
                function (token) {
                    if (type == "Daily") {
                        MaxStats.push(ArrMax.stats.day)
                        //MaxStats = ArrMax.stats.day
                    }
                    if (type == "Weekly") {
                        MaxStats.push(ArrMax.stats.week)
                    }
                    if (type == "Monthly") {
                        MaxStats.push(ArrMax.stats.month)
                    }
                    if (type == "Total") {
                        MaxStats.push(ArrMax.stats.total)
                    }
                    deferred.resolve(MaxStats);
                });
            return deferred.promise;
        }

        gameService.getStatistics = function (how, from, to) {
            var deferred = $q.defer();
            var returnValuee = {
                "firstBefore": 1475186400000,
                "firstAfter": 1478214000000,
                "stats": []
            };
            userService.getValidToken().then(
//                function (token) {
//                    for (var i = returnValue.stats.length - 1; i > 0; i--) {
//                        if (returnValue.stats[i].from > from && returnValue.stats[i].to < to)
//                            returnValuee.stats.push(returnValue.stats[i]);
//                    }
//
//
//                    deferred.resolve(returnValuee);
//                    //                deferred.reject();
//                });
                function (token) {
                    $http.get(Config.getGamificationURL() + '/statistics/player?granularity='+how+'&from='+from+'&to='+to,
                              {
                              headers:
                              {
                              'Authorization': 'Bearer '+token,
                              'AppId': Config.getAppId()
                              }
                                })
                        .success(function (status) {
                            localStatus = status;
                            deferred.resolve(localStatus);
                        })

                        .error(function (response) {
                            deferred.reject(response);
                        });
                })
            return deferred.promise;
        }
        /* get remote status */
        gameService.getStatus = function () {
            var deferred = $q.defer();

            userService.getValidToken().then(
                function (token) {
                    $http.get(Config.getGamificationURL() + '/out/rest/status' + '?token=' + token, Config.getHTTPConfig())

                        .success(function (status) {
                            localStatus = status;
                            deferred.resolve(localStatus);
                        })

                        .error(function (response) {
                            deferred.reject(response);
                        });
                },
                function () {
                    deferred.reject();
                }
            );

            return deferred.promise;
        };

        /* get local status (get remote first if null) */
        gameService.resetLocalStatus = function () {
            localStatus = null;
        }


        /* get local status (get remote first if null) */
        gameService.getLocalStatus = function () {
            var deferred = $q.defer();

            //		if (!localStatus) {
            gameService.getStatus().then(
                function (localStatus) {
                    deferred.resolve(localStatus);
                },
                function (response) {
                    deferred.reject(response);
                }
            );
            //		} else {
            //			deferred.resolve(localStatus);
            //		}

            return deferred.promise;
        };

        /* get ranking */
        gameService.getRanking = function (when, start, end) {
            var deferred = $q.defer();

            userService.getValidToken().then(
                function (token) {
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

                    var config = Config.getHTTPConfig();
                    if (!config.params) {
                        config.params = {};
                    }

                    config.params['token'] = token;

                    if ((!!timestamp && timestamp < 0) || (!!start && start < 0) || (!!end && end < 1) || (!!start && !!end && end <= start)) {
                        deferred.reject();
                    }

                    if (!!timestamp) {
                        config.params['timestamp'] = timestamp;
                    }

                    if (!!start) {
                        config.params['start'] = start;
                    }

                    if (!!end) {
                        config.params['end'] = end;
                    }

                    $http.get(Config.getGamificationURL() + '/out/rest/classification', config)

                        .success(function (ranking) {
                            localRanking = ranking;
                            deferred.resolve(localRanking);
                        })

                        .error(function (response) {
                            deferred.reject(response);
                        });
                },
                function () {
                    deferred.reject();
                }
            );

            return deferred.promise;
        };

        return gameService;
    });
