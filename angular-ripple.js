/*!
 * angular-ripple.js v0.0.5 - A standalone AngularJS implementation of the Google Material Design ripple effect.
 * Copyright (c) 2014 Nelson Cash - http://github.com/nelsoncash/angular-ripple
 * http://codepen.io/MikeMcChillin/pen/XJrLwg
 * License: MIT
 * editted to for hover events by Sil van Diepen
 */

(function(window, angular, undefined) {
  'use strict';
  if(!angular) {
    return;
  }

  var rip = angular.module('angularRipple', []);

  rip.directive('angularRipple', function() {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        console.log(attrs);
        var x, y, size, offsets,
          func = function(e){
            var ripple = this.querySelector('.angular-ripple');
            var eventType = e.type;
            // Ripple
            if (ripple === null) {
              // Create ripple
              ripple = document.createElement('span');
              ripple.className += ' angular-ripple';

              // Prepend ripple to element
              this.insertBefore(ripple, this.firstChild);

              // Set ripple size
              if (!ripple.offsetHeight && !ripple.offsetWidth) {
                size = Math.max(element[0].offsetWidth, element[0].offsetHeight);
                ripple.style.width = size + 'px';
                ripple.style.height = size + 'px';
              }
            }

            // Remove animation effect
            ripple.className = ripple.className.replace(/ ?(animate)/g, '');

            // get click coordinates by event type
            x = e.offsetX;
            y = e.offsetY;

            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            // Add animation effect
            ripple.className += ' animate';
          };

        element.on('mouseover', func);

        //remove the event listener on scope destroy
        scope.$on('$destroy',function() {
          element.off('mouseover', func);
        });
      }
    };
  });
})(window, window.angular);
