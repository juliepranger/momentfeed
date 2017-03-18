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
  .directive(
    'imagemodal',
    require('./directives/imagemodal-directive')
  )
  .service(
    'API',
    require('./services/api-service')
  )
  .service(
    'PubSub',
    require('./services/pubsub-service')
  )
  .config(require('./config'))

  .run(['$rootScope', '$state', '$stateParams', '$window', '$location', function($rootScope, $state, $stateParams, $window, $location) {
  }]);
angular.bootstrap(document, ['mf']);
