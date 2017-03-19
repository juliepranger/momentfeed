'use strict';

/**
 * mf namespace
 */
var mf = mf || {};

/**
 * mf.services namespace
 */
mf.services = mf.services || {};



/**
 * PubSub service to handle signals between controllers.
 * @constructor
 * @ngInject
 **/
mf.services.Preloader = function($q, $rootScope) {
	// I am the image SRC values to preload.
	this.imageLocations = null;

	// As the images load, we'll need to keep track of the load/error
	// counts when announing the progress on the loading.
	this.imageCount = null;
	this.loadCount = 0;
	this.errorCount = 0;

	// I am the possible states that the preloader can be in.
	this.states = {
		PENDING: 1,
		LOADING: 2,
		RESOLVED: 3,
		REJECTED: 4
	};

	// I keep track of the current state of the preloader.
	this.state = this.states.PENDING;

	// When loading the images, a promise will be returned to indicate
	// when the loading has completed (and / or progressed).
	this.deferred = $q.defer();
	this.promise = this.deferred.promise;

}

module.exports = mf.services.Preloader;
// ---
// STATIC METHODS.
// ---


// I reload the given images [Array] and return a promise. The promise
// will be resolved with the array of image locations.
mf.services.Preloader.prototype.preloadImages = function( imageLocations ) {
  this.imageLocations = imageLocations;
  this.imageCount = imageLocations.length;
	return( this.load(imageLocations) );

};


  	// ---
  	// INSTANCE METHODS.
  	// ---

  		// I determine if the preloader has started loading images yet.
mf.services.Preloader.prototype.isInitiated = function() {

	return( this.state !== this.states.PENDING );

};


// I determine if the preloader has failed to load all of the images.
mf.services.Preloader.prototype.isRejected = function() {

  return( this.state === this.states.REJECTED );

};


// I determine if the preloader has successfully loaded all of the images.
mf.services.Preloader.prototype.isResolved = function() {

	return( this.state === this.states.RESOLVED );

};


// I initiate the preload of the images. Returns a promise.
mf.services.Preloader.prototype.load = function(imageLocations) {
	// If the images are already loading, return the existing promise.
	if ( this.isInitiated() ) {
		return( this.promise );

	}

	this.state = this.states.LOADING;
	for ( var i = 0 ; i < this.imageCount ; i++ ) {

		this.loadImageLocation( imageLocations[ i ] );

	}

	// Return the deferred promise for the load event.
	return( this.promise );

};




// I handle the load-success of the given image location.
mf.services.Preloader.prototype.handleImageLoad = function( imageLocation ) {
	this.loadCount++;

	// If the preload action has already failed, ignore further action.
	if ( this.isRejected() ) {

		return;

	}

	// Notify the progress of the overall deferred. This is different
	// than Resolving the deferred - you can call notify many times
	// before the ultimate resolution (or rejection) of the deferred.
	this.deferred.notify({
		percent: Math.ceil( this.loadCount / this.imageCount * 100 ),
		imageLocation: imageLocation
	});

	// If all of the images have loaded, we can resolve the deferred
	// value that we returned to the calling context.
	if ( this.loadCount === this.imageCount ) {

		this.state = this.states.RESOLVED;

		this.deferred.resolve( this.imageLocations );
    return this.deferred.promise;
	}

};


// I load the given image location and then wire the load / error
// events back into the preloader instance.
mf.services.Preloader.prototype.loadImageLocation = function( imageLocation ) {
  console.log('imageLocation-->', imageLocation);
	var preloader = this;

  var image = new Image();
  image.onload = function() {
    imageLocation.src = this.src;
  }

  preloader.handleImageLoad( imageLocation);

};
