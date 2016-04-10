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

    // Abort if jQuery is not loaded
    if (!window.jQuery || !$) {
        throw new Error('jquery.privateShare needs jQuery Library to be loaded - which is not.')
    }

    // Save all functions in here
    var functions = {};

    // Register the jQuery plugin
    $.fn.privateShare = function(action, options) {
        if (typeof functions[action] === "function") {
            return this.each(function () {
                functions[action]($(this), options)
            });
        } else {
            throw new Error('jquery.privateShare has no function "' + action + '"!' );
        }
    }

}(jQuery));