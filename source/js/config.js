'use strict';


/**
 * App config
 * @param {!angular.$interpolateProvider} $interpolateProvider
 * @param {!ui.$stateProvider} $stateProvider
 * @param {!ui.$urlRouterProvider} $urlRouterProvider
 * @ngInject
 */
module.exports = function(
    $interpolateProvider,
    $stateProvider,
    $urlRouterProvider) {

  $interpolateProvider.startSymbol('{[').endSymbol(']}');

};
