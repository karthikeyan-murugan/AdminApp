/**
 * Created by Karthik on 6/1/15.
 */

(function () {
    'use strict';


    var app = angular.module('coreblue-admin', ['ngMaterial', 'ngRoute']);

    app.config(function ($routeProvider, $httpProvider) {

        $routeProvider.
            when('/login/:loginError?', {//loginError not implemented yet.
                templateUrl: 'modules/login/login.html'
            }).when('/sku-config', {
                templateUrl: 'modules/sku-config.html'
            }).otherwise('/');

        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';  // To identity XHR in server.

    });

    app.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $mdUtil, $log,$location,$filter) {
        $scope.toggleLoginNav = buildToggler('login-nav');
        $scope.toggleMenu = buildToggler('menu');


        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildToggler(navID) {
            var debounceFn = $mdUtil.debounce(function () {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 300);
            return debounceFn;
        }

        $scope.close = function () {
            $mdSidenav('menu').close()
                .then(function () {
                    $log.debug("closed");
                });
        }

        $scope.goTo = function (location) {
            $mdSidenav('menu').close()
                .then(function () {
                    $log.debug("closed");
                });
            $location.path(location);
        }

        /**
         * To check if path passed is the current path. Used to set active link.
         */
        $scope.isMenuActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.activePage = function() {
            var menuItem = $filter('filter')($scope.menuItems,{"location":$location.path()})[0];
            return menuItem.name;
        }

        $scope.menuItems = [
            {location: '/', name: ''},
            {location: '/app-property', name: 'Application Property'},
            {location: '/cache-manager', name: 'Cache Manager'},
            {location: '/sku-config', name: 'Sku Configuration'},
            {location: '/product-config', name: 'Product Configuration'},
            {location: '/carrier-plans', name: 'Carrier Plans'}
        ];


    });

    app.controller('LoginCtrl', function ($scope, $timeout, $mdSidenav, $mdUtil, $log) {
        $scope.login = function () {
            $mdSidenav('login-nav').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        }
    });

    app.controller('SkuConfigCtrl', function ($scope,$mdDialog, $log,$mdToast) {
        $scope.skuConfigs = [
            {
                carrier: 'ATT',
                sku: '6123231',
                price: "139.29",
                leastTerm1MonthlyPrice : 10.40


            },
            {
                carrier: 'VEZ',
                sku: '6123231',
                price: "239.29"
            },
            {
                carrier: 'ATT',
                sku: '6123231',
                price: "39.29",
                leastTerm1MonthlyPrice : 15.40,
                leastTerm2MonthlyPrice : 10.40


            },
            {
                carrier: 'SPR',
                sku: '1238472',
                price: "390.29"
            },
            {
                carrier: 'ATT',
                sku: '6123231',
                price: "39.29"
            },
            {
                carrier: 'ATT',
                sku: '6123231',
                price: "39.29"
            },
            {
                carrier: 'ATT',
                sku: '6123231',
                price: "39.29",
                leastTerm1MonthlyPrice : 15.40,
                leastTerm2MonthlyPrice : 10.40,
                leastTerm3MonthlyPrice : 7.45

            },
            {
                carrier: 'ATT',
                sku: '6123231',
                price: "39.29"
            },
            {
                carrier: 'ATT',
                sku: '6123231',
                price: "39.29"
            },
            {
                carrier: 'ATT',
                sku: '6123231',
                price: "39.29"
            }
        ];

        $scope.addSkuDialog = function(ev) {
            $scope.skuConfig = {};
            $log.debug("show");
            $mdDialog.show({
                templateUrl: 'modules/add-sku-modal.html',
                targetEvent: ev,
                scope: $scope,
                preserveScope: true
            })
                .then(function(answer) {
                    //$scope.alert = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.alert = 'You cancelled the dialog.';
                });
        };

        $scope.closeDialog = function() {
            // Easily hides most recent dialog shown...
            // no specific instance reference is needed.
            $log.debug("close LEFT is done");
            $mdDialog.hide();
        };

        $scope.addSkuConfig = function(skuConfig) {
            $log.debug(skuConfig);
            $mdDialog.hide();
            $mdToast.show(
                $mdToast.simple()
                    .content('Sku config added!')
                    .position('top right')
                    .hideDelay(3000)
            );
        };

        $scope.editSkuDialog = function(skuConfig,ev) {

            $scope.skuConfig = angular.copy(skuConfig);
            $log.debug("show");
            $mdDialog.show({
                templateUrl: 'modules/edit-sku-modal.html',
                targetEvent: ev,
                scope: $scope,
                preserveScope: true
            })
                .then(function(answer) {
                    //$scope.alert = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.alert = 'You cancelled the dialog.';
                });
        };

        $scope.updateSkuConfig = function(skuConfig) {
            $log.debug(skuConfig);
            $mdDialog.hide();
            $mdToast.show(
                $mdToast.simple()
                    .content('Sku config saved!')
                    .position('top right')
                    .hideDelay(3000)
            );
        };

    });


})();


