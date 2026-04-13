ytTweaks.tweaks.push(function (settings) {
    if (settings.hideShorts2) ytTweaks.sheet.textContent += `
    [page-subtype="subscriptions"] ytd-rich-section-renderer:has([is-shorts]),
    [page-subtype="subscriptions"] ytd-reel-shelf-renderer {
      display: none !important;
    }
    `;

    if (settings.hideWatchVideos2) {
        ytTweaks.sheet.textContent += `
        [page-subtype=subscriptions] :is(ytd-rich-item-renderer, ytd-item-section-renderer):has(:is(
        .ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment, .ytd-thumbnail-overlay-resume-playback-renderer)${settings.hideWatchVideos2 == 'All videos' ? '' : `:is(
        ${settings.hideWatchVideos2 == '50-100%' ?
                    '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 7"]:not([style^="width: 7%"]), [style^="width: 6"]:not([style^="width: 6%"]), [style^="width: 5"]:not([style^="width: 5%"])' :
                    settings.hideWatchVideos2 == '70-100%' ?
                        '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 7"]:not([style^="width: 7%"])' :
                        settings.hideWatchVideos2 == '75-100%' ?
                            '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 79%"], [style^="width: 78%"], [style^="width: 77%"], [style^="width: 76%"], [style^="width: 75%"]' :
                            settings.hideWatchVideos2 == '80-100%' ?
                                '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"])' :
                                settings.hideWatchVideos2 == '85-100%' ?
                                    '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 89%"], [style^="width: 88%"], [style^="width: 87%"], [style^="width: 86%"], [style^="width: 85%"]' :
                                    settings.hideWatchVideos2 == '90-100%' ?
                                        '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"])' :
                                        settings.hideWatchVideos2 == '95-100%' ?
                                            '[style="width: 100%;"], [style^="width: 99%"], [style^="width: 98%"], [style^="width: 97%"], [style^="width: 96%"], [style^="width: 95%"]' :
                                            '[style="width: 100%;"]'})`}
        ) {
            display: none !important;
        }`;
    }

    if (settings.dimWatchVideos2) {
        ytTweaks.sheet.textContent += `
        [page-subtype=subscriptions] :is(ytd-rich-item-renderer, ytd-item-section-renderer):has(:is(
        .ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment, .ytd-thumbnail-overlay-resume-playback-renderer)${settings.dimWatchVideos2 == 'dimAllVideos' ? '' : `:is(
        ${settings.dimWatchVideos2 == '50-100%' ?
                    '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 7"]:not([style^="width: 7%"]), [style^="width: 6"]:not([style^="width: 6%"]), [style^="width: 5"]:not([style^="width: 5%"])' :
                    settings.dimWatchVideos2 == '70-100%' ?
                        '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 7"]:not([style^="width: 7%"])' :
                        settings.dimWatchVideos2 == '75-100%' ?
                            '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 79%"], [style^="width: 78%"], [style^="width: 77%"], [style^="width: 76%"], [style^="width: 75%"]' :
                            settings.dimWatchVideos2 == '80-100%' ?
                                '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"])' :
                                settings.dimWatchVideos2 == '85-100%' ?
                                    '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 89%"], [style^="width: 88%"], [style^="width: 87%"], [style^="width: 86%"], [style^="width: 85%"]' :
                                    settings.dimWatchVideos2 == '90-100%' ?
                                        '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"])' :
                                        settings.dimWatchVideos2 == '95-100%' ?
                                            '[style="width: 100%;"], [style^="width: 99%"], [style^="width: 98%"], [style^="width: 97%"], [style^="width: 96%"], [style^="width: 95%"]' :
                                            '[style="width: 100%;"]'})`}
        ) {
            opacity: ${settings.watchVideoOpacity2 ?? '.3'};
        }`;
    }

    if (settings.hideUpcoming2) {
        ytTweaks.sheet.textContent += `
        [page-subtype=subscriptions] :is(ytd-rich-item-renderer, ytd-item-section-renderer):has(:is([overlay-style=UPCOMING], lockup-attachments-view-model)) {
          display: none !important;
        }
        `;
    }

    if (settings.hideLiveStreams2) {
        ytTweaks.sheet.textContent += `
        [page-subtype=subscriptions] :is(ytd-rich-item-renderer, ytd-item-section-renderer):has(:is(
            ${settings.hideLiveStreams2 == 'completed' ? '' : '.ytBadgeShapeLive, .ytBadgeShapeThumbnailLive,'}
            ${settings.hideLiveStreams2 == 'current' ? '' : '[aria-label="yttw-streamed"]' + (ytTweaks.hideStreamedVideos() || '')}
        )){
          display: none !important;
        }
        `;
    }

    if (settings.redToSubsHotkey) {
        ytTweaks.listenForHotkeys();

        ytTweaks.getHotkeys()[settings.redToSubsHotkey] = function () {
            document.querySelector('ytd-app').handleNavigate({
                command: {
                    "commandMetadata": {
                        "webCommandMetadata": {
                            "url": "/feed/subscriptions",
                            "webPageType": "WEB_PAGE_TYPE_BROWSE",
                            "rootVe": 96368,
                            "apiUrl": "/youtubei/v1/browse"
                        }
                    }
                }
            });
        }
    }
});