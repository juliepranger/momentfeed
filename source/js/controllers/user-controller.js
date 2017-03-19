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
 * @param {!angular.$timeout} $timeout module.
 * @param {mf.services.API} API service.
 * @param {mf.services.Preloader} Preloader service.
 * @constructor
 * @ngInject
 **/
mf.controllers.UserController =
    function($scope, $window, $location, $timeout, API, Preloader) {
  this.$scope = $scope;
  this.$window = $window;
  this.$location = $location;
  this.$timeout = $timeout;
  this.Preloader = Preloader;
  this.API = API;
  this.clientID_ =  'dcd6712d07b04d0aa6e34c1a032dd89d';
  this.accessToken = null;
  this.images;
  this.loadIntroSequence = false;
  this.loadImageSequence = false;
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

  this.$timeout(function() {
    this.loadIntroSequence = true;
  }.bind(this), 2000);
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
    var imageArray = [];

    for (var i = 0; i < this.images.length; i++) {
      var image = this.images[i];
      imageArray.push(image.images.standard_resolution.url);
    }

    // Preload the images; then, update display when returned.
    this.Preloader.preloadImages( imageArray ).then(function(response) {
      this.$timeout(function() {
        // page content ready to display
        this.loadIntroSequence = false;
        this.loadImageSequence = true;
      }.bind(this), 6000);
    }.bind(this));
  }.bind(this));
};
