'use strict';

/**
 * mf namespace
 */
var mf = mf || {};

/**
 * JibeDocs.controllers namespace
 */
mf.controllers = mf.controllers || {};



/**
 * User controller.
 * @param {!angular.$scope} $scope module.
 * @param {!angular.$window} $window module.
 * @param {!angular.$location} $location module.
 * @param {mf.services.API} API service.
 * @constructor
 * @ngInject
 **/
mf.controllers.UserController =
    function($scope, $window, $location, API) {
  this.$scope = $scope;
  this.$window = $window;
  this.$location = $location;
  this.clientID_ =  'dcd6712d07b04d0aa6e34c1a032dd89d';
  this.accessToken_ = null;

  this.$scope.$watch(function(){
    return this.$location.url();
  }.bind(this), function(value){
    if (value.indexOf('#access_token') > -1) {
      this.parseAccessToken(value);
    }
  }.bind(this));
};


/**
 * class exports
 */
module.exports = mf.controllers.UserController;


/**
 * User signs in via Oauth/Instagram API
 */
mf.controllers.UserController.prototype.getUser = function() {
  this.$window.location.href=
      'https://api.instagram.com/oauth/authorize/?client_id=' +
      this.clientID_ +
      '&redirect_uri=http://0.0.0.0:3000/&response_type=token';
};


/**
 * User access token exists, parse from URL and store.
 */
mf.controllers.UserController.prototype.parseAccessToken = function(value) {
  this.accessToken_ = value.replace('/#access_token=','');
  console.log('access token is: ', this.accessToken_);
};
