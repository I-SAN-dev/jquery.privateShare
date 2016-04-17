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
        /**
         * Holds some constants
         */
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
            },
            POPUPSETTINGS: {
                directories: 0,
                fullscreen: 0,
                location: 0,
                menubar: 0,
                status: 0,
                titlebar: 0,
                toolbar: 0
            }
        },

        /**
         * Holds the functions to generate the sharelinks
         * @type {{}}
         */
        getShareLink = {
            /**
             * Generates a facebook share link
             * @param {string} url
             * @returns {string}
             */
            FB: function (url) {
                return 'todo';
            },
            /**
             * Generates a Google+ Share Link
             * @param {string} url
             * @returns {string}
             */
            GP: function (url) {
                return 'todo';
            },
            /**
             * Generates a Twitter tweet link with an optional message
             * @param {string} url
             * @param {string} message
             * @returns {string}
             */
            TW: function (url, message) {
                return 'todo';
            }
        },

        /**
         * Opens a popup for a share-service with specific dimensions.
         * Opens a new tab on mobile view instead
         * @param {string} service - FB (Facebook), GP (Google+), TW (Twitter)
         * @param {string} link - the link to be called containing all share parameters
         * @return {Window} - the opened window instance
         */
        openPopup = function (service, link) {
            var width = constants[service].POPUP.WIDTH,
                height = constants[service].POPUP.HEIGHT,
                $win = $(window),
                wwidth = $win.width(),
                wheight = $win.height,
                settings = constants.POPUPSETTINGS,
                settingsstring = '',
                win;

            // Open in a new tab if the popup would exceed the parent windows dimensions
            if (width > wwidth || height > wheight) {
                win = window.open(link, '_blank');
                win.focus();
                return win;
            }

            // Otherwise open as a correctly sized and positioned popup
            settings.width = width;
            settings.height = height;
            settings.top = (wheight - height) / 2;
            settings.left = (wwidth - width) / 2;

            $.each(function (key, value) {
                settingsstring += (key + "=" + value + ",");
            });
            win = window.open(link, "privateSharePopup", settingsstring);
            win.focus();
            return win;
        },

        /**
         * Attaches the sharelink functionality to a supplied link element
         * @param {jQuery} $link - a jQuery link object
         * @param {string} service - FB (Facebook), GP (Google+), TW (Twitter)
         * @param {string} url - the link that shall be shared
         * @param {string} message - an additional message, only for tweet links
         * @return {jQuery}
         */
        attachSharelink = function ($link, service, url, message) {

            // if no url is supplied, use the current one
            if (!url) {
                url = window.location.href;
            }

            // get the share link
            var href = getSharelink[service](url, message),
                alreadyClicked = false;

            // set the sharelink
            $link.attr('href', href);
            $link.on('click touchstart', function (e) {

                // Only fire once every 500ms preventing ghostclicks,
                // this allows us to listen for touchstart as well
                if (!alreadyClicked) {
                    alreadyClicked = true;
                    setTimeout(function () { alreadyClicked = false; }, 500);

                    // Open the sharelink
                    openPopup(service, href);
                }

                e.preventDefault();
            });
        },

        // Save all functions in here
        publicFunctions = {
            /**
             * Attaches a facebook-sharelink
             * @param {jQuery] $this
             * @param {Object} options
             */
            shareFb: function ($this, options) {
                attachSharelink($this, 'FB', options.url);
            },

            /**
             * Attaches a googleplus-sharelink
             * @param {jQuery] $this
             * @param {Object} options
             */
            shareGp: function ($this, options) {
                attachSharelink($this, 'GP', options.url);
            },

            /**
             * Attaches a twitter-tweetlink
             * param {jQuery] $this
             * @param options
             */
            shareTw: function ($this, options) {
                attachSharelink($this, 'TW', options.url, options.message);
            }
        };

    /**
     * Initializes the privateShare functionality
     * @param {string} action - what to do
     * @param {Object} options - some options, optional
     * @returns {jQuery}
     */
    $.fn.privateShare = function (action, options) {
        if (typeof publicFunctions[action] === "function") {
            return this.each(function () {
                publicFunctions[action]($(this), options);
            });
        }
        throw new Error('jquery.privateShare has no function "' + action + '"!' );
    };

}(jQuery));