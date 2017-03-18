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
 * API Service
 * @param {!angular.$http} $http Angular $http Module.
 * @constructor
 * @ngInject
 */
mf.services.API = function($http) {
  this.$http = $http;
};


/**
 * class export
 */
module.exports = mf.services.API;

/**
 * Gets documents based on access levels
 * @return {object}
 */
mf.services.API.prototype.getInstagramPhotos = function() {
  var access_token = this.getAccessToken();
  return this.$http.get('https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=ACCESS_TOKEN');
  // return this.$http.get('/api/v1/files/folders/');
};
