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
 * @param {mf.services.PubSub} PubSub service.
 * @constructor
 * @ngInject
 */
mf.services.API = function($http, $sce, PubSub) {
  this.$http = $http;
  this.$sce = $sce;
  this.PubSub = PubSub;
  this.token = null;
};


/**
 * class export
 */
module.exports = mf.services.API;


/**
 * PubSub callback - get token in message
 * @param {String=} message PubSub publish message
 * @return {object}
 */
mf.services.API.prototype.getAccessToken = function(message) {
  if (message.token) {
    this.token = message.token;
  }
  return this.token;
};


/**
 * Gets documents based on access levels
 * @return {object}
 */
mf.services.API.prototype.getInstagramPhotos = function(token) {
  return this.$http.jsonp(this.$sce.trustAsResourceUrl('https://api.instagram.com/v1/users/self/?access_token=' + token), {jsonpCallbackParam: 'callback'});
  // return this.$http.get('/api/v1/files/folders/');
};
