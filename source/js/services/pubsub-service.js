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
mf.services.PubSub = function() {
  var listeners = [];

  function subscribe(callback) {
      listeners.push(callback);
  }

  function unsubscribe(callback) {
      var index = listeners.indexOf(callback);
      if (index > -1) {
          listeners.splice(index, 1);
      }
  }

  function publish(message) {
    console.log(message);
      for (var i = 0; i < listeners.length; i++) {
          listeners[i](message);
      }
  }

  return {
      subscribe: subscribe,
      unsubscribe: unsubscribe,
      publish: publish
  };
};

/**
 * class export
 */
module.exports = mf.services.PubSub;
