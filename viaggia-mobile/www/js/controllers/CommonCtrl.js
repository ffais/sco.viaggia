angular.module('viaggia.controllers.common', [])

.controller('AppCtrl', function ($scope, $state, $rootScope, $location, $timeout, $ionicPlatform, DataManager, $ionicPopup, $ionicModal, $filter, $ionicLoading, Config, planService) {
    /*menu group*/
    $scope.shownGroup = false;
    $scope.toggleGroupRealTime = function () {
        if ($scope.isGroupRealTimeShown()) {
            $scope.shownGroup = false;
        } else {
            $scope.shownGroup = true;
        }
        localStorage.setItem(Config.getAppId() + '_shownGroup', $scope.shownGroup);

    };
    $scope.isGroupRealTimeShown = function () {
        return $scope.shownGroup === true;
    };

    $ionicModal.fromTemplateUrl('templates/credits.html', {
        id: '3',
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.creditsModal = modal;
    });
    $scope.closeCredits = function () {
        $scope.creditsModal.hide();
    };
    $scope.openCredits = function () {
        $scope.creditsModal.show();
    }

    $scope.openBetaTesting = function () {
        $scope.forced = false;
        showBetaPopup();
    }

    function showBetaPopup() {
        $scope.betapopup = $ionicPopup.show({
            templateUrl: 'templates/betatestingPopup.html',
            title: $filter('translate')('lbl_betatesting'),
            cssClass: 'parking-popup',
            scope: $scope

        });

    }
    $scope.closePopup = function () {
        $scope.betapopup.close();
    }
    $ionicPlatform.ready(function () {
        /*manage beta testing*/
        console.log("new start");
        Config.init().then(function () {
            //add counter on hard resume
            hardstart = JSON.parse(localStorage.getItem(Config.getAppId() + '_hardstart')) || 0;
            $scope.forced = false;

            hardstart++;
            localStorage.setItem(Config.getAppId() + '_hardstart', hardstart);
            document.addEventListener("resume", onResume, false);
            //check if open popup
            if (shouldForcePopup(hardstart, 'h')) {
                $scope.forced = true;
                localStorage.setItem(Config.getAppId() + '_forced', true);
                showBetaPopup();
            }
        });
    });

    function onResume() {
        // Handle the resume event
        console.log("resume");
        //add counter on soft resume
        $scope.forced = false;
        softstart = JSON.parse(localStorage.getItem(Config.getAppId() + '_softstart')) || 0;
        softstart++;
        localStorage.setItem(Config.getAppId() + '_softstart', softstart);
        //check if open popup
        if (shouldForcePopup(softstart, 's')) {
            $scope.forced = true;
            localStorage.setItem(Config.getAppId() + '_forced', true);
            showBetaPopup();
        }
    }

    function shouldForcePopup(counter, type) {
        if (!(JSON.parse(localStorage.getItem(Config.getAppId() + '_forced')) || false)) {
            if ((type === 'h' && counter === 5) || (type === 's' && counter === 10)) {
                return true;
            }
        }

        return false;
    }

    $scope.popupLoadingShow = function () {
        $ionicLoading.show({
            template: $filter('translate')("pop_up_loading")
        });
    };
    $scope.popupLoadingHide = function () {
        $ionicLoading.hide();
    };

    $scope.showConfirm = function (template, title, functionOnTap) {
        var confirmPopup = $ionicPopup.confirm({
            title: title,
            template: template,
            buttons: [
                {
                    text: $filter('translate')("pop_up_cancel"),
                    type: 'button-cancel'
                            },
                {
                    text: $filter('translate')("pop_up_ok"),
                    type: 'button-custom',
                    onTap: functionOnTap
                    }
            ]
        });
    }

    $scope.showNoConnection = function () {
        var alertPopup = $ionicPopup.alert({
            title: $filter('translate')("pop_up_no_connection_title"),
            template: $filter('translate')("pop_up__no_connection_template"),
            buttons: [
                {
                    text: $filter('translate')("pop_up_ok"),
                    type: 'button-custom'
                            }
            ]
        });
    };
    $scope.showErrorServer = function () {
        var alertPopup = $ionicPopup.alert({
            title: $filter('translate')("pop_up_error_server_title"),
            template: $filter('translate')("pop_up_error_server_template"),
            buttons: [
                {
                    text: $filter('translate')("pop_up_ok"),
                    type: 'button-custom'
                            }
            ]
        });
    };

    Config.init().then(function () {
        $scope.infomenu = Config.getInfoMenu();
        $scope.version = Config.getVersion();
        $scope.shownGroup = JSON.parse(localStorage.getItem(Config.getAppId() + '_shownGroup')) || false;

    });

    $scope.selectInfomenu = function (m) {
        //      m.data.label = m.label;
        //      Config.setInfoMenuParams(m.data);
        //      $state.go(m.state);
    };
})

.factory('Toast', function ($rootScope, $timeout, $ionicPopup, $cordovaToast) {
    return {
        show: function (message, duration, position) {
            message = message || "There was a problem...";
            duration = duration || 'short';
            position = position || 'top';

            if (!!window.cordova) {
                // Use the Cordova Toast plugin
                $cordovaToast.show(message, duration, position);
            } else {
                if (duration == 'short') {
                    duration = 2000;
                } else {
                    duration = 5000;
                }

                var myPopup = $ionicPopup.show({
                    template: "<div class='toast'>" + message + "</div>",
                    scope: $rootScope,
                    buttons: []
                });

                $timeout(function () {
                    myPopup.close();
                }, duration);
            }
        }
    };
})

.controller('TutorialCtrl', function ($scope, $ionicLoading) {});
