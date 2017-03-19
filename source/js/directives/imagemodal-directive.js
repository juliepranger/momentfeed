'use strict';

/**
 * mf namespace
 */
var mf = mf || {};

/**
 * mf.directives namespace
 */
mf.directives = mf.directives || {};



/**
 * Directive used for handling multiple checkboxes in a form.
 * Reports to the FormboxForm.
 * @constructor
 * @ngInject
 **/
mf.directives.imagemodal = function() {
  return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.bind('mouseover mouseout', function() {
          element.toggleClass('active');
        });
      }
  };
};

/**
 * class exports
 */
module.exports = mf.directives.imagemodal;
