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
 * @param {!angular.$sce} $sce Angular $sce Module.
 * @constructor
 * @ngInject
 */
mf.services.API = function($http, $sce) {
  this.$http = $http;
  this.$sce = $sce;
  this.token = null;
};


/**
 * class export
 */
module.exports = mf.services.API;


/**
 * Gets Instagram photos
 * @TODO if this wasn't a sandbox app, our API endpoints would be much greater.
 *    Since I'm the sandbox manager, I'll just use the data I'm easily allowed
 *    access to.
 * @return {object}
 */
mf.services.API.prototype.getInstagramPhotos = function(token) {
  // return Julie's last 20 photos
  // since we don't have a real back end, we have to use Angular's $sce.trustAsResourceUrl
  //    because of CORS.
  return this.$http.jsonp(this.$sce.trustAsResourceUrl('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + token), {jsonpCallbackParam: 'callback'});

};
