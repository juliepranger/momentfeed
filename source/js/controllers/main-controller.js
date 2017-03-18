'use strict';

/**
 *  momentfeed namespace
 */
var mf =  || {};

/**
 * mf.controllers namespace
 */
mf.controllers = mf.controllers || {};



/**
 * Controller for main constroller.
 * @param {!angular.$scope} $scope module.
 * @param {mf.services.API} API service.
 * @constructor
 * @ngInject
 **/
mf.controllers.MainController = function($scope, API) {
  this.$scope = $scope;
  this.API = API;

  this.init();
};


/**
 * class exports
 */
module.exports = mf.controllers.MainController;


/**
 * Initalizes the listing view.
 */
mf.controllers.MainController.prototype.init = function() {
  console.log('Main Ctrl init');
};
