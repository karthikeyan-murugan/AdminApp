/**
 * Created by Karthik on 6/1/15.
 */

(function() {
    'use strict';


    var app = angular.module('coreblue-admin', ['ngMaterial','ngRoute']);

    app.config(function($routeProvider, $httpProvider) {

        $routeProvider.
            when('/login/:loginError?', {//loginError not implemented yet.
                templateUrl : 'modules/login/login.html'
            }).when('/sku-config', {
                templateUrl : 'modules/sku-config.html'
            }).otherwise('/sku-config');

        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';  // To identity XHR in server.

    });

    app.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $mdUtil, $log) {
        $scope.toggleLoginNav = buildToggler('login-nav');
        $scope.toggleMenu = buildToggler('menu');



        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildToggler(navID) {
            var debounceFn =  $mdUtil.debounce(function(){
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            },300);
            return debounceFn;
        }

        $scope.close = function () {
            $mdSidenav('menu').close()
                .then(function () {
                    $log.debug("closed");
                });
        }
    });

    app.controller('LoginCtrl', function ($scope, $timeout, $mdSidenav, $mdUtil, $log) {
        $scope.login = function () {
            $mdSidenav('login-nav').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        }
    });

    app.controller('SkuConfigCtrl', function($scope) {
            var imagePath = 'img/list/60.jpeg';
            $scope.phones = [
                { type: 'Home', number: '(555) 251-1234' },
                { type: 'Cell', number: '(555) 786-9841' },
            ];
            $scope.todos = [
                {
                    carrier: 'ATT',
                    sku: '6123231',
                    price: " $139.29"
                },
                {
                    carrier: 'VEZ',
                    sku: '6123231',
                    price: " $239.29"
                },
                {
                    carrier: 'ATT',
                    sku: '6123231',
                    price: " $39.29"
                },
                {
                    carrier: 'SPR',
                    sku: '1238472',
                    price: " $390.29"
                },
                {
                    carrier: 'ATT',
                    sku: '6123231',
                    price: " $39.29"
                },
                {
                    carrier: 'ATT',
                    sku: '6123231',
                    price: " $39.29"
                },
                {
                    carrier: 'ATT',
                    sku: '6123231',
                    price: " $39.29"
                },
                {
                    carrier: 'ATT',
                    sku: '6123231',
                    price: " $39.29"
                },
                {
                    carrier: 'ATT',
                    sku: '6123231',
                    price: " $39.29"
                },
                {
                    carrier: 'ATT',
                    sku: '6123231',
                    price: " $39.29"
                }
            ];
        });

})();


