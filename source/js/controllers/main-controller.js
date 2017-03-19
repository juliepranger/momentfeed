'use strict';

/**
 * mf namespace
 */
var mf = mf || {};

/**
 * mf.controllers namespace
 */
mf.controllers = mf.controllers || {};



/**
 * Main Controller handling application flow and gathering API data.
 * @param {!angular.$scope} $scope module.
 * @param {!angular.$window} $window module.
 * @param {!angular.$location} $location module.
 * @param {!angular.$timeout} $timeout module.
 * @param {mf.services.API} API service.
 * @constructor
 * @ngInject
 **/
mf.controllers.MainController =
    function($scope, $window, $location, $timeout, API) {
  this.$scope = $scope;
  this.$window = $window;
  this.$location = $location;
  this.$timeout = $timeout;
  this.API = API;
  // would normally be handled server-side, this will have to do for this exercise.
  this.clientID_ =  'dcd6712d07b04d0aa6e34c1a032dd89d';
  this.accessToken = null;
  this.images;
  this.loggedIn = false;
  this.loadIntroSequence = false;
  this.loadImageSequence = false;
  // initialize the controller.
  this.initialize();
};


/**
 * class exports
 */
module.exports = mf.controllers.MainController;


/**
 * Watch + look for access token in URL
 * When user is "logged in" + we have access token, begin the intro sequence.
 */
mf.controllers.MainController.prototype.initialize = function() {

  // watch the URL
  this.$scope.$watch(function(){
    return this.$location.url();
  }.bind(this), function(value){
    // if the access token is in the URL, great! Let's parse that.
    if (value.indexOf('#access_token') > -1) {
      this.parseAccessToken(value);

      this.$timeout(function() {
        this.loadIntroSequence = true;
        this.isLoggedIn = true;
      }.bind(this), 2000);
    }
  }.bind(this));
};


/**
 * User signs in via Oauth/Instagram API
 */
mf.controllers.MainController.prototype.getUser = function() {
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
mf.controllers.MainController.prototype.parseAccessToken = function(value) {
  // parse unnecessary bits, get the access token
  this.accessToken = value.replace('/#access_token=','');

  // get the photos!
  // @TODO store the access token on the backend, not insecurely here.
  this.API.getInstagramPhotos(this.accessToken).then(function(response) {
    this.images = response.data.data;
    var imageArray = [];

    for (var i = 0; i < this.images.length; i++) {
      var image = this.images[i];
      imageArray.push(image.images.standard_resolution.url);
    }

    // Preload the images; then, update display when returned.
    this.$timeout(function() {
      // page content ready to display
      this.loadIntroSequence = false;
      this.loadImageSequence = true;
    }.bind(this), 6000);
  }.bind(this));
};
