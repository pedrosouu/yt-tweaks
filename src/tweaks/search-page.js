ytTweaks.tweaks.push(function (settings) {
    if (settings.gridSearchResults) {
        ytTweaks.sheet.textContent += `
        ytd-search {
          padding-left: 16px !important;
          padding-right: 16px !important;
        }

        ytd-search ytd-search-pyv-renderer,
        ytd-search ytd-ad-slot-renderer,
        ytd-search .metadata-snippet-container-one-line.ytd-video-renderer,
        ytd-search .metadata-snippet-container.ytd-video-renderer,
        ytd-search #description-text.ytd-video-renderer,
        ytd-search #description.ytd-channel-renderer,
        ytd-search #expandable-metadata.ytd-video-renderer:not(:empty),
        ytd-search ytd-exploratory-results-renderer.ytd-item-section-renderer,
        ytd-search ytd-horizontal-card-list-renderer.ytd-item-section-renderer:not(:first-child),
        ytd-search ytd-reel-shelf-renderer.ytd-item-section-renderer,
        ytd-search ytd-shelf-renderer.ytd-item-section-renderer,
        ytd-search grid-shelf-view-model /* YT experiment: shorts container in grid format */,
        ytd-search #channel-name.ytd-video-renderer,
        ytd-search #separator.ytd-video-meta-block,
        ytd-search .ytContentMetadataViewModelMetadataRow:not(:first-child):not(:last-child) {
          display: none !important;
        }

        ytd-search #metadata.ytd-video-meta-block,
        ytd-search #byline-container[hidden] {
          display: block !important;
        }

        ytd-search #container.ytd-search {
          max-width: calc(var(--yttw-videos-per-row) * (var(--ytd-rich-grid-item-max-width) + var(--ytd-rich-grid-item-margin)) + var(--sidebarWidth, 0px));
          min-width: calc(var(--sidebarWidth) + var(--ytd-rich-grid-item-max-width));
        }

        ytd-search #header.ytd-search,
        ytd-search ytd-two-column-search-results-renderer,
        ytd-search #primary.ytd-two-column-search-results-renderer {
          max-width: 100% !important;
        }

        ytd-search #contents > ytd-item-section-renderer,
        ytd-search #contents > ytd-item-section-renderer > #contents {
          display: contents;
        }

        /* Fix for elements appearing in wrong spots */
        ytd-search ytd-item-section-renderer[can-show-more]:after {
          content: "";
          width: 100%;
          min-height: 7000px;
        }

        ytd-search #contents.ytd-section-list-renderer {
          display: flex;
          flex-wrap: wrap;
        }

        ytd-search #contents > .ytd-item-section-renderer {
          margin-left: calc(var(--ytd-rich-grid-item-margin)/2);
          margin-right: calc(var(--ytd-rich-grid-item-margin)/2);
          width: calc(100%/var(--yttw-videos-per-row) - var(--ytd-rich-grid-item-margin) - 0.01px);
          margin-bottom: 24px;
        }

        ytd-search ytd-movie-renderer {
          width: calc(200%/var(--yttw-videos-per-row) - var(--ytd-rich-grid-item-margin) - 0.01px) !important;
        }

        /* This element replaces the right sidebar in a new YT exp. UI */
        ytd-search yt-official-card-view-model {
          width: calc(100% - var(--ytd-rich-grid-item-margin) - 0.01px) !important;
          box-sizing: border-box;
        }

        /* Videos container inside 'yt-official-card-view-model' */
        ytd-search yt-official-card-view-model > horizontal-shelf-view-model .ytwHorizontalShelfViewModelItems {
          display: flex;
          flex-wrap: wrap !important;
          width: 100% !important;
        }

        /* Inside 'yt-official-card-view-model' */
        ytd-search yt-official-card-view-model > horizontal-shelf-view-model .ytwHorizontalShelfViewModelOuterContainer,
        ytd-search yt-official-card-view-model > horizontal-shelf-view-model .ytwHorizontalShelfViewModelHorizontalContainer {
          width: 100% !important;
        }

        /* Videos inside 'yt-official-card-view-model' */
        ytd-search yt-official-card-view-model > horizontal-shelf-view-model .ytwHorizontalShelfViewModelItems > div {
          width: calc(100% / var(--yttw-videos-per-row) - 16px - 0.01px) !important;
          max-width: calc(((var(--yttw-videos-per-row) * (var(--ytd-rich-grid-item-max-width) + var(--ytd-rich-grid-item-margin)) - 48px)/var(--yttw-videos-per-row) - var(--ytd-rich-grid-item-margin) - 0.01px)) !important;
          margin-left: calc(var(--ytd-rich-grid-item-margin)/2) !important;
          margin-right: calc(var(--ytd-rich-grid-item-margin)/2) !important;
          margin-bottom: 24px;
        }

        /* Next button inside 'yt-official-card-view-model' */
        ytd-search yt-official-card-view-model > horizontal-shelf-view-model .yt-spec-button-shape-next {
          display: none !important;
        }

        /* Avatars inside 'yt-official-card-view-model' */
        ytd-search yt-official-card-view-model > horizontal-shelf-view-model .yt-lockup-metadata-view-model__avatar {
          display: var(--yttw-hpp-display, block) !important;
          ;
        }

        ytd-search yt-did-you-mean-renderer,
        ytd-search yt-showing-results-for-renderer,
        ytd-search ytd-thumbnail.ytd-video-renderer,
        ytd-search ytd-playlist-thumbnail.ytd-radio-renderer,
        ytd-search ytd-playlist-thumbnail.ytd-playlist-renderer,
        ytd-search ytd-playlist-thumbnail.ytd-show-renderer {
          min-width: 100% !important;
        }

        ytd-search .ytLockupViewModelContentImage /* Playlist related */
        {
          width: 100% !important;
        }

        ytd-search ytd-playlist-thumbnail.ytd-show-renderer {
          flex: 0 !important;
        }

        ytd-search ytd-playlist-thumbnail.ytd-playlist-renderer {
          margin: 0 !important;
        }

        ytd-search .thumbnail-container.ytd-movie-renderer {
          min-width: 0 !important;
        }

        ytd-search ytd-item-section-renderer[top-spacing-zero]:first-child #contents.ytd-item-section-renderer .ytd-item-section-renderer:first-child:not(yt-did-you-mean-renderer):not(yt-showing-results-for-renderer) {
          margin-top: 16px;
        }

        ytd-search #dismissible.ytd-video-renderer,
        ytd-search ytd-radio-renderer,
        ytd-search ytd-playlist-renderer,
        ytd-search .ytLockupViewModelHorizontal /* Playlist related */,
        ytd-search #content-section.ytd-channel-renderer,
        ytd-search #info-section.ytd-channel-renderer,
        ytd-search ytd-show-renderer {
          flex-direction: column;
        }

        ytd-search #video-title:not(.ytd-child-video-renderer),
        ytd-search .ytLockupMetadataViewModelTitle {
          font-size: var(--yttw-dfs-1-4rem, 1.6rem) !important;
          line-height: var(--yttw-dfs-2rem, 2.2rem) !important;
          font-weight: 500 !important;
        }

        ytd-search h3:not(.ytd-movie-renderer) {
          margin: 12px 0 4px 0 !important;
        }

        ytd-search #channel-title.ytd-channel-renderer {
          font-size: var(--yttw-dfs-1-4rem, 1.6rem);
          line-height: var(--yttw-dfs-2rem, 2.2rem);
          font-weight: 500;
          margin: 12px 0 4px 0;
          align-self: center;
        }

        ytd-search :is(#metadata-line, #byline-container),
        ytd-search .ytContentMetadataViewModelMetadataText /* Playlist related */,
        ytd-search #metadata.ytd-channel-renderer {
          font-size: var(--yttw-dfs-1-2rem, 1.4rem) !important;
          line-height: var(--yttw-dfs-1-8rem, 2rem) !important;
          max-height: 3.6rem !important;
        }

        ytd-search #content.ytd-playlist-renderer,
        ytd-search #content.ytd-radio-renderer {
          flex-basis: 100%;
        }

        ytd-search #info.ytd-channel-renderer {
          padding: 0 0px 16px 0;
          text-align: center;
        }

        ytd-search .ytd-channel-renderer yt-formatted-string {
          text-align: center !important;
        }

        ytd-search #avatar-section.ytd-channel-renderer {
          min-width: 100% !important;
        }

        ytd-search .ytd-channel-renderer:is(#buttons, #purchase-button, #subscribe-button) {
          padding: 0 !important;
          align-self: center;
        }

        ytd-search #badges.ytd-video-renderer {
          margin: 4px 0 0 0;
        }

        ytd-search .text-wrapper.ytd-video-renderer {
          position: relative;
          width: 100%;
        }

        ytd-search #channel-thumbnail.ytd-video-renderer {
          position: absolute;
          top: 12px;
          display: var(--yttw-hpp-display, block);
        }

        ytd-search yt-img-shadow.ytd-video-renderer img.yt-img-shadow {
          width: 36px;
          height: 36px;
        }

        ytd-search ytd-video-renderer[use-search-ui] #channel-info.ytd-video-renderer {
          padding: 0;
        }

        body[dir="ltr"] ytd-search :is(ytd-menu-renderer.ytd-video-renderer, .ytLockupMetadataViewModelMenuButton) {
          position: absolute;
          right: -12px;
          margin: 4px 0 0 0;
        }

        body[dir="ltr"] ytd-search #title-wrapper.ytd-video-renderer {
          padding-right: 24px;
        }

        body[dir="ltr"] ytd-search .ytd-video-renderer:is(#title-wrapper, #channel-name, #badges, #buttons),
        body[dir="ltr"] ytd-search ytd-video-meta-block.ytd-video-renderer {
          padding-left: var(--yttw-hpp-display, 48px);
        }

        body[dir="rtl"] ytd-search :is(ytd-menu-renderer.ytd-video-renderer, .ytLockupMetadataViewModelMenuButton) {
          position: absolute;
          left: -12px;
          margin: 4px 0 0 0;
        }

        body[dir="rtl"] ytd-search #title-wrapper.ytd-video-renderer {
          padding-left: 24px;
        }

        body[dir="rtl"] ytd-search .ytd-video-renderer:is(#title-wrapper, #channel-name, #badges, #buttons),
        body[dir="rtl"] ytd-search ytd-video-meta-block.ytd-video-renderer {
          padding-right: var(--yttw-hpp-display, 48px);
        }

        .yttw-channel-search-page #description-text.ytd-video-renderer {
          display: none;
        }

        .yttw-channel-search-page #metadata.ytd-video-meta-block {
          display: block;
        }

        .yttw-channel-search-page ytd-browse[page-subtype=channels] ytd-two-column-browse-results-renderer {
          width: calc(100% - 32px) !important;
          max-width: calc(var(--yttw-videos-per-row) * (var(--ytd-rich-grid-item-max-width) + var(--ytd-rich-grid-item-margin))) !important;
        }

        .yttw-channel-search-page #contents.ytd-item-section-renderer,
        .yttw-channel-search-page ytd-item-section-renderer.ytd-section-list-renderer {
          display: contents;
        }

        .yttw-channel-search-page #contents.ytd-section-list-renderer {
          display: flex;
          flex-wrap: wrap;
        }

        .yttw-channel-search-page ytd-video-renderer,
        .yttw-channel-search-page ytd-playlist-renderer,
        .yttw-channel-search-page ytd-show-renderer {
          width: calc(100% / var(--yttw-videos-per-row) - var(--ytd-rich-grid-item-margin) - 0.01px);
          margin-left: calc(var(--ytd-rich-grid-item-margin) / 2);
          margin-right: calc(var(--ytd-rich-grid-item-margin) / 2);
          margin-bottom: 24px;
        }

        .yttw-channel-search-page ytd-thumbnail.ytd-video-renderer,
        .yttw-channel-search-page ytd-playlist-thumbnail.ytd-playlist-renderer,
        .yttw-channel-search-page ytd-playlist-thumbnail.ytd-show-renderer {
          width: 100% !important;
          height: 100% !important;
          flex: 0 !important;
        }

        .yttw-channel-search-page ytd-thumbnail.ytd-video-renderer:before,
        .yttw-channel-search-page ytd-playlist-thumbnail.ytd-playlist-renderer:before,
        .yttw-channel-search-page ytd-playlist-thumbnail.ytd-show-renderer:before {
          display: block;
          content: "";
          padding-top: 56.11%;
        }

        .yttw-channel-search-page #dismissible.ytd-video-renderer,
        .yttw-channel-search-page ytd-playlist-renderer,
        .yttw-channel-search-page ytd-show-renderer {
          flex-direction: column;
        }

        .yttw-channel-search-page #video-title:not(.ytd-child-video-renderer) {
          font-size: var(--yttw-dfs-1-4rem, 1.6rem) !important;
          line-height: var(--yttw-dfs-2rem, 2.2rem) !important;
          font-weight: 500 !important;
        }

        .yttw-channel-search-page :is(#byline-container, #metadata-line) {
          font-size: var(--yttw-dfs-1-2rem, 1.4rem) !important;
          line-height: var(--yttw-dfs-1-8rem, 2rem) !important;
          max-height: 3.6rem !important;
        }

        .yttw-channel-search-page .title-and-badge.ytd-video-renderer,
        .yttw-channel-search-page h3:is(.ytd-playlist-renderer, .ytd-show-renderer) {
          margin: 12px 0 4px 0;
        }

        .yttw-channel-search-page #badges.ytd-video-renderer {
          margin: 4px 0 0 0;
        }

        .yttw-channel-search-page #content.ytd-playlist-renderer {
          flex-basis: 100%;
        }

        .yttw-channel-search-page .text-wrapper.ytd-video-renderer {
          max-width: 100%;
        }

        .yttw-channel-search-page body[dir="ltr"] ytd-menu-renderer.ytd-video-renderer {
          position: absolute;
          right: -12px;
          margin-top: 4px;
        }

        .yttw-channel-search-page body[dir="ltr"] #meta.ytd-video-renderer {
          padding-right: 24px;
        }

        .yttw-channel-search-page body[dir="rtl"] ytd-menu-renderer.ytd-video-renderer {
          position: absolute;
          left: -12px;
          margin-top: 4px;
        }

        .yttw-channel-search-page body[dir="rtl"] #meta.ytd-video-renderer {
          padding-left: 24px;
        }

        ${settings.hideRightSidebar ? `
        ytd-secondary-search-container-renderer {
            display: none !important;
        }
        `: `
        @media (min-width: 1091px) {
            #page-manager:has(ytd-search[role][has-secondary-content]) {
                --sidebarWidth: 425px;
            }
        }
        `}
        `;

        let div = document.createElement('div');
        div.style = 'position: absolute; width: calc(100% - 32px - var(--sidebarWidth, 0px))';

        const gridResized = new ResizeObserver(setNumberOfVideos);

        const maxNumOfColumns = settings.videosPerRow ? (settings.maxNumOfColumns ?? 6) : 6;
        const minColumnWidth = settings.videosPerRow ? (settings.minColumnWidth ?? 270) : 326;

        document.addEventListener('yt-navigate-finish', function () {
            let pm = document.getElementById('page-manager');
            pm.style.position = 'relative';
            pm.appendChild(div);

            gridResized.observe(div);
        }, { once: true });

        function setNumberOfVideos() {
            document.documentElement.style.setProperty('--yttw-videos-per-row', calcNumOfVideos() || 1);
        }

        function calcNumOfVideos() {
            for (let i = maxNumOfColumns; i > 0; i--) {
                if (div.clientWidth / i >= minColumnWidth) {
                    return i;
                }
            }
        }

        function isUserSearchingInChannel(e) {
            if (e.detail.pageType == 'channel' && window.location.pathname.includes('/search')) {
                document.documentElement.classList.add('yttw-channel-search-page');
            } else {
                document.documentElement.classList.remove('yttw-channel-search-page');
            }
        }

        document.addEventListener('yt-navigate-finish', isUserSearchingInChannel);

        ytTweaks.gridSearchResults = {
            storageChanged: function () {
                div.remove();
                document.removeEventListener('yt-navigate-finish', isUserSearchingInChannel);
            }
        };
    }

    if (settings.hideShorts5) ytTweaks.sheet.textContent += `
    ytd-search ytd-reel-shelf-renderer,
    ytd-search :is(grid-shelf-view-model /* YT experiment: shorts container in grid format */, ytd-video-renderer):has([href*="/shorts/"]) {
      display: none !important;
    }
    `;

    if (settings.hideWatchVideos4) {
        ytTweaks.sheet.textContent += `
        ytd-video-renderer[is-search]:has(:is(
        .ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment, .ytd-thumbnail-overlay-resume-playback-renderer)${settings.hideWatchVideos4 == 'All videos' ? '' : `:is(
        ${settings.hideWatchVideos4 == '50-100%' ?
                    '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 7"]:not([style^="width: 7%"]), [style^="width: 6"]:not([style^="width: 6%"]), [style^="width: 5"]:not([style^="width: 5%"])' :
                    settings.hideWatchVideos4 == '70-100%' ?
                        '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 7"]:not([style^="width: 7%"])' :
                        settings.hideWatchVideos4 == '75-100%' ?
                            '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 79%"], [style^="width: 78%"], [style^="width: 77%"], [style^="width: 76%"], [style^="width: 75%"]' :
                            settings.hideWatchVideos4 == '80-100%' ?
                                '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"])' :
                                settings.hideWatchVideos4 == '85-100%' ?
                                    '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 89%"], [style^="width: 88%"], [style^="width: 87%"], [style^="width: 86%"], [style^="width: 85%"]' :
                                    settings.hideWatchVideos4 == '90-100%' ?
                                        '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"])' :
                                        settings.hideWatchVideos4 == '95-100%' ?
                                            '[style="width: 100%;"], [style^="width: 99%"], [style^="width: 98%"], [style^="width: 97%"], [style^="width: 96%"], [style^="width: 95%"]' :
                                            '[style="width: 100%;"]'})`}
        ) {
            display: none !important;
        }`;
    }

    if (settings.dimWatchVideos4) {
        ytTweaks.sheet.textContent += `
        ytd-video-renderer[is-search]:has(:is(
        .ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment, .ytd-thumbnail-overlay-resume-playback-renderer)${settings.dimWatchVideos4 == 'dimAllVideos' ? '' : `:is(
        ${settings.dimWatchVideos4 == '50-100%' ?
                    '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 7"]:not([style^="width: 7%"]), [style^="width: 6"]:not([style^="width: 6%"]), [style^="width: 5"]:not([style^="width: 5%"])' :
                    settings.dimWatchVideos4 == '70-100%' ?
                        '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 7"]:not([style^="width: 7%"])' :
                        settings.dimWatchVideos4 == '75-100%' ?
                            '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 79%"], [style^="width: 78%"], [style^="width: 77%"], [style^="width: 76%"], [style^="width: 75%"]' :
                            settings.dimWatchVideos4 == '80-100%' ?
                                '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"])' :
                                settings.dimWatchVideos4 == '85-100%' ?
                                    '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 89%"], [style^="width: 88%"], [style^="width: 87%"], [style^="width: 86%"], [style^="width: 85%"]' :
                                    settings.dimWatchVideos4 == '90-100%' ?
                                        '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"])' :
                                        settings.dimWatchVideos4 == '95-100%' ?
                                            '[style="width: 100%;"], [style^="width: 99%"], [style^="width: 98%"], [style^="width: 97%"], [style^="width: 96%"], [style^="width: 95%"]' :
                                            '[style="width: 100%;"]'})`}
        ) {
            opacity: ${settings.watchVideoOpacity4 ?? '.3'};
        }`;
    }

    if (settings.hideMixes3) ytTweaks.sheet.textContent += `
    ytd-radio-renderer,
    ytd-search yt-lockup-view-model:has([href*="start_radio=1"]) {
      display: none !important;
    }
    `;

    if (settings.hideLiveStreams4) ytTweaks.sheet.textContent += `
    ytd-video-renderer[is-search]:has(:is(
        ${settings.hideLiveStreams4 == 'completed' ? '' : '.yt-badge-shape--live, .yt-badge-shape--thumbnail-live,'}
        ${settings.hideLiveStreams4 == 'current' ? '' : '[aria-label="yttw-streamed"]' + (ytTweaks.hideStreamedVideos() || '')}
    )) {
        display: none !important;
    }
    `;

    if (settings.hideUpcoming3) ytTweaks.sheet.textContent += `
    ytd-video-renderer[is-search]:has(:is([overlay-style=UPCOMING], lockup-attachments-view-model)) {
      display: none !important;
    }
    `;

    if (settings.hideSearchResults) ytTweaks.sheet.textContent += `
    [is-search] ytd-shelf-renderer.ytd-item-section-renderer:not(ytd-channel-renderer + ytd-shelf-renderer),
    [is-search] ytd-horizontal-card-list-renderer.ytd-item-section-renderer:not(:first-child),
    [is-search] ytd-exploratory-results-renderer.ytd-item-section-renderer {
      display: none !important;
    }
    `;
});