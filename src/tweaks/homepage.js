ytTweaks.tweaks.push(function (settings) {
    if (settings.hideShorts) ytTweaks.sheet.textContent += `
    [page-subtype="home"] ytd-rich-section-renderer:has([is-shorts]) {
      display: none !important;
    }
    `;

    if (settings.hideWatchVideos) {
        ytTweaks.sheet.textContent += `
        [page-subtype=home] ytd-rich-item-renderer:has(:is(
        .ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment, .ytd-thumbnail-overlay-resume-playback-renderer)${settings.hideWatchVideos == 'All videos' ? '' : `:is(
        ${settings.hideWatchVideos == '50-100%' ?
                    '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 7"]:not([style^="width: 7%"]), [style^="width: 6"]:not([style^="width: 6%"]), [style^="width: 5"]:not([style^="width: 5%"])' :
                    settings.hideWatchVideos == '70-100%' ?
                        '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 7"]:not([style^="width: 7%"])' :
                        settings.hideWatchVideos == '75-100%' ?
                            '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 79%"], [style^="width: 78%"], [style^="width: 77%"], [style^="width: 76%"], [style^="width: 75%"]' :
                            settings.hideWatchVideos == '80-100%' ?
                                '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"])' :
                                settings.hideWatchVideos == '85-100%' ?
                                    '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 89%"], [style^="width: 88%"], [style^="width: 87%"], [style^="width: 86%"], [style^="width: 85%"]' :
                                    settings.hideWatchVideos == '90-100%' ?
                                        '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"])' :
                                        settings.hideWatchVideos == '95-100%' ?
                                            '[style="width: 100%;"], [style^="width: 99%"], [style^="width: 98%"], [style^="width: 97%"], [style^="width: 96%"], [style^="width: 95%"]' :
                                            '[style="width: 100%;"]'})`}
        ) {
            display: none !important;
        }`;

        document.documentElement.classList.add('yttw-grid-fix');
    }

    if (settings.dimWatchVideos) {
        ytTweaks.sheet.textContent += `
        [page-subtype=home] ytd-rich-item-renderer:has(:is(
        .ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment, .ytd-thumbnail-overlay-resume-playback-renderer)${settings.dimWatchVideos == 'dimAllVideos' ? '' : `:is(
        ${settings.dimWatchVideos == '50-100%' ?
                    '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 7"]:not([style^="width: 7%"]), [style^="width: 6"]:not([style^="width: 6%"]), [style^="width: 5"]:not([style^="width: 5%"])' :
                    settings.dimWatchVideos == '70-100%' ?
                        '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 7"]:not([style^="width: 7%"])' :
                        settings.dimWatchVideos == '75-100%' ?
                            '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 79%"], [style^="width: 78%"], [style^="width: 77%"], [style^="width: 76%"], [style^="width: 75%"]' :
                            settings.dimWatchVideos == '80-100%' ?
                                '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"])' :
                                settings.dimWatchVideos == '85-100%' ?
                                    '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 89%"], [style^="width: 88%"], [style^="width: 87%"], [style^="width: 86%"], [style^="width: 85%"]' :
                                    settings.dimWatchVideos == '90-100%' ?
                                        '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"])' :
                                        settings.dimWatchVideos == '95-100%' ?
                                            '[style="width: 100%;"], [style^="width: 99%"], [style^="width: 98%"], [style^="width: 97%"], [style^="width: 96%"], [style^="width: 95%"]' :
                                            '[style="width: 100%;"]'})`}
        ) {
            opacity: ${settings.watchVideoOpacity ?? '.3'};
        }`;
    }

    if (settings.hideLiveStreams) {
        ytTweaks.sheet.textContent += `
        [page-subtype=home] ytd-rich-item-renderer:has(:is(
            ${settings.hideLiveStreams == 'completed' ? '' : '.ytBadgeShapeLive, .ytBadgeShapeThumbnailLive,'}
            ${settings.hideLiveStreams == 'current' ? '' : '[aria-label="yttw-streamed"]' + (ytTweaks.hideStreamedVideos() || '')}
        )) {
          display: none !important;
        }
        `;
    }

    if (settings.hideMixes) {
        ytTweaks.sheet.textContent += `
        [page-subtype=home] ytd-rich-item-renderer:has([href*="start_radio=1"]) {
          display: none !important;
        }
        `;
    }

    if (settings.hideUpcoming) {
        ytTweaks.sheet.textContent += `
        [page-subtype=home] ytd-rich-item-renderer:has(:is([overlay-style=UPCOMING], lockup-attachments-view-model /* For the newest version of the grid */)) {
          display: none !important;
        }
        `;
    }

    if (settings.hideRecommendationBar) ytTweaks.sheet.textContent += `
    [page-subtype=home] ytd-feed-filter-chip-bar-renderer,
    #home-chips {
      display: none;
    }
  
    #frosted-glass {
      height: var(--ytd-toolbar-height) !important;
    }
    `;

    if (settings.hideLatestYouTubePosts) ytTweaks.sheet.textContent += `
    ytd-rich-section-renderer:has([is-post]) {
      display: none;
    }
    `;

    if (settings.redToHomeHotkey) {
        ytTweaks.listenForHotkeys();

        ytTweaks.getHotkeys()[settings.redToHomeHotkey] = function () {
            document.querySelector('ytd-app').handleNavigate({
                command: {
                    "commandMetadata": {
                        "webCommandMetadata": {
                            "url": "/",
                            "webPageType": "WEB_PAGE_TYPE_BROWSE",
                            "rootVe": 3854,
                            "apiUrl": "/youtubei/v1/browse"
                        }
                    }
                }
            });
        }
    }
});