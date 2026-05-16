ytTweaks.tweaks.push(function (settings) {
    if (settings.videosAsDefaultTab) {
        if (document.readyState == 'loading' && /(@|\/c\/|\/channel\/)(?!.*\/)/.test(location.pathname)) {
            location.pathname += '/videos';
        }

        document.addEventListener('yt-navigate-finish', overwriteHandleNavigate, {once: true});

        function overwriteHandleNavigate(e) {
            const handleNavigate = e.target.handleNavigate;
            e.target.handleNavigate = function name(d) {
                if (d?.command?.commandMetadata?.webCommandMetadata?.webPageType == 'WEB_PAGE_TYPE_CHANNEL' && /(@|\/c\/|\/channel\/)(?!.*\/)/.test(d.command.commandMetadata.webCommandMetadata.url)) {
                    if (d.command.browseEndpoint) d.command.browseEndpoint.params = 'EgZ2aWRlb3PyBgQKAjoA';
                }

                handleNavigate.apply(this, arguments);
            }
        }
    }

    if (settings.hideShorts3) ytTweaks.sheet.textContent += `
    [page-subtype="channels"] ytd-reel-shelf-renderer {
      display: none !important;
    }
    `;

    if (settings.hideWatchVideos5) {
        ytTweaks.sheet.textContent += `
        [page-subtype=channels] ytd-rich-item-renderer:has(:is(
        .ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment, .ytd-thumbnail-overlay-resume-playback-renderer)${settings.hideWatchVideos5 == 'All videos' ? '' : `:is(
        ${settings.hideWatchVideos5 == '50-100%' ?
                    '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 7"]:not([style^="width: 7%"]), [style^="width: 6"]:not([style^="width: 6%"]), [style^="width: 5"]:not([style^="width: 5%"])' :
                    settings.hideWatchVideos5 == '70-100%' ?
                        '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 7"]:not([style^="width: 7%"])' :
                        settings.hideWatchVideos5 == '75-100%' ?
                            '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 79%"], [style^="width: 78%"], [style^="width: 77%"], [style^="width: 76%"], [style^="width: 75%"]' :
                            settings.hideWatchVideos5 == '80-100%' ?
                                '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"])' :
                                settings.hideWatchVideos5 == '85-100%' ?
                                    '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 89%"], [style^="width: 88%"], [style^="width: 87%"], [style^="width: 86%"], [style^="width: 85%"]' :
                                    settings.hideWatchVideos5 == '90-100%' ?
                                        '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"])' :
                                        settings.hideWatchVideos5 == '95-100%' ?
                                            '[style="width: 100%;"], [style^="width: 99%"], [style^="width: 98%"], [style^="width: 97%"], [style^="width: 96%"], [style^="width: 95%"]' :
                                            '[style="width: 100%;"]'})`}
        ) {
            display: none !important;
        }`;
    }

    if (settings.dimWatchVideos5) {
        ytTweaks.sheet.textContent += `
        [page-subtype=channels] :is(ytd-rich-item-renderer, ytd-grid-video-renderer):has(:is(
        .ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment, .ytd-thumbnail-overlay-resume-playback-renderer)${settings.dimWatchVideos5 == 'dimAllVideos' ? '' : `:is(
        ${settings.dimWatchVideos5 == '50-100%' ?
                    '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 7"]:not([style^="width: 7%"]), [style^="width: 6"]:not([style^="width: 6%"]), [style^="width: 5"]:not([style^="width: 5%"])' :
                    settings.dimWatchVideos5 == '70-100%' ?
                        '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 7"]:not([style^="width: 7%"])' :
                        settings.dimWatchVideos5 == '75-100%' ?
                            '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 79%"], [style^="width: 78%"], [style^="width: 77%"], [style^="width: 76%"], [style^="width: 75%"]' :
                            settings.dimWatchVideos5 == '80-100%' ?
                                '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"])' :
                                settings.dimWatchVideos5 == '85-100%' ?
                                    '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 89%"], [style^="width: 88%"], [style^="width: 87%"], [style^="width: 86%"], [style^="width: 85%"]' :
                                    settings.dimWatchVideos5 == '90-100%' ?
                                        '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"])' :
                                        settings.dimWatchVideos5 == '95-100%' ?
                                            '[style="width: 100%;"], [style^="width: 99%"], [style^="width: 98%"], [style^="width: 97%"], [style^="width: 96%"], [style^="width: 95%"]' :
                                            '[style="width: 100%;"]'})`}
        ) {
            opacity: ${settings.watchVideoOpacity5 ?? '.3'};
        }`;
    }
});