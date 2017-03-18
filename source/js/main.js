'use strict';

var angular = require('angular');
var uiRouter = require('angular-ui-router');
var ngAnimate = require('angular-animate');
var ngSanitize = require('angular-sanitize');

/** @ngInject */
angular.module('mf', [uiRouter, ngAnimate, ngSanitize])
  .controller(
    'UserController',
    require('./controllers/user-controller')
  )
  .service(
    'API',
    require('./services/api-service')
  )
  .config(require('./config'))

  .run(['$rootScope', '$state', '$stateParams', '$window', '$location', function($rootScope, $state, $stateParams, $window, $location) {

    $rootScope.$on('$stateChangeStart', function(event, toState, fromState) {
      $rootScope.loading = true;
    }.bind(this));

    $rootScope.$on('$stateChangeSuccess', function(event, toState, fromState) {
      $rootScope.loading = false;
    }.bind(this));
  }]);
angular.bootstrap(document, ['mf']);
