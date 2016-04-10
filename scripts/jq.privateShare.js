/**
 * jquery.privateShare
 *
 * A jquery plugin that renders sharebuttons for facebook, google+ and twitter
 * in accordance with the very restrictive german privacy laws - e.G. without loading any 3rd party API
 *
 * @author Sebastian Antosch
 * @email s.antosch@i-san.de
 * @copyright 2016 I-SAN.de Webdesign & Hosting GbR
 *
 */

(function ($) {
    "use strict";

    // Abort if jQuery is not loaded
    if (!window.jQuery || !$) {
        throw new Error('jquery.privateShare needs jQuery Library to be loaded - which is not.')
    }

    var
        constants = {
            FB: {
                POPUP: {
                    WIDTH: 560,
                    HEIGHT: 630
                }
            },
            GP: {
                POPUP: {
                    WIDTH: 505,
                    HEIGHT: 665
                }
            },
            TW: {
                POPUP: {
                    WIDTH: 695,
                    HEIGHT: 254
                }
            }
        },

    // Save all functions in here
        publicFunctions = {};

    // Register the jQuery plugin
    $.fn.privateShare = function (action, options) {
        if (typeof publicFunctions[action] === "function") {
            return this.each(function () {
                publicFunctions[action]($(this), options)
            });
        }
        throw new Error('jquery.privateShare has no function "' + action + '"!' );
    };

}(jQuery));