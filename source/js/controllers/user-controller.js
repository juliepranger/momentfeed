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
  this.API = API;
  this.clientID_ =  'dcd6712d07b04d0aa6e34c1a032dd89d';
  this.accessToken = null;
  this.loading = true;
  this.images;

  this.initialize();
};


/**
 * class exports
 */
module.exports = mf.controllers.UserController;


/**
 * Initialize the watchers
 */
mf.controllers.UserController.prototype.initialize = function() {
  // watch the URL
  this.$scope.$watch(function(){
    return this.$location.url();
  }.bind(this), function(value){
    // if the access token is in the URL, great! Let's parse that.
    if (value.indexOf('#access_token') > -1) {
      this.parseAccessToken(value);
    }
  }.bind(this));
};


/**
 * User signs in via Oauth/Instagram API
 */
mf.controllers.UserController.prototype.getUser = function() {
  // setup redirect URL for Oauth
  this.$window.location.href=
      'https://api.instagram.com/oauth/authorize/?client_id=' +
      this.clientID_ +
      '&redirect_uri=http://0.0.0.0:3000/&response_type=token' +
      '&scope=public_content';
};


/**
 * User access token exists, parse from URL and store.
 */
mf.controllers.UserController.prototype.parseAccessToken = function(value) {
  // parse unnecessary bits, get the access token
  this.accessToken = value.replace('/#access_token=','');

  // get the photos!
  this.API.getInstagramPhotos(this.accessToken).then(function(response) {
    this.images = response.data.data;
    // page content ready to display
    this.loading = false;
  }.bind(this))
};
