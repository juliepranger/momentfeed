'use strict';


/**
 * App config
 * @param {!angular.$interpolateProvider} $interpolateProvider
 * @param {!ui.$stateProvider} $stateProvider
 * @param {!ui.$urlRouterProvider} $urlRouterProvider
 * @param {!angular.$locationProvider} $locationProvider
 * @ngInject
 */
module.exports = function(
    $interpolateProvider,
    $stateProvider,
    $urlRouterProvider,
    $locationProvider) {

  $interpolateProvider.startSymbol('{[').endSymbol(']}');
  $locationProvider.html5Mode(true);
};
