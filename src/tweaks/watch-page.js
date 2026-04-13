ytTweaks.tweaks.push(function (settings) {
    if (settings.videoDescription) {
        if (settings.videoDescription == 'Minimalist') ytTweaks.sheet.textContent += `
        .ytd-watch-metadata #snippet.ytd-text-inline-expander {
          display: none;
        }
        `;
        else {
            document.addEventListener('yt-player-updated', expand);
            document.addEventListener('yt-text-inline-expander-expanded-changed', expand2);

            function expand(e) {
                if (e.target.className.includes('ytd-watch-flexy')) {
                    document.removeEventListener('yt-player-updated', expand);

                    let desc;
                    new MutationObserver(function () {
                        desc = document.querySelector('div#description');
                        if (desc) {
                            desc.click()
                            this.disconnect();
                        }
                    }).observe(e.target, {
                        childList: true,
                        subtree: true
                    });
                }
            }

            function expand2(e) {
                e.target.click();
            }

            ytTweaks.expandedDescription = {
                storageChanged: function () {
                    document.removeEventListener('yt-player-updated', expand);
                    document.removeEventListener('yt-text-inline-expander-expanded-changed', expand2);
                }
            };
        }
    }

    if (settings.autoExpandComments) ytTweaks.sheet.textContent += `
    #expander {
      --ytd-expander-max-lines: none !important;
    }
    `;

    if (settings.sidebarComments) {
        const strg = `
        ytd-watch-flexy {
          --yttw-sidebar-comments-height: ${settings.scUsePlayerHeight ? 'var(--ytd-watch-flexy-panel-max-height)' : `calc(${settings.scHeight ?? 100}vh - var(--ytd-margin-6x) - var(--ytd-toolbar-height));`};
        }
    
        #below.ytd-watch-flexy {
          position: relative;
        }
    
        ytd-watch-flexy[is-two-columns_] #comments {
          position: absolute;
          width: var(--ytd-watch-flexy-sidebar-width);
          height: var(--yttw-sidebar-comments-height);
          overflow: auto;
        }
      
        ytd-watch-flexy[is-two-columns_] #comments::-webkit-scrollbar {
          width: 16px;
        }
      
        ytd-watch-flexy[is-two-columns_] #comments::-webkit-scrollbar-thumb {
          height: 56px;
          border-radius: 8px;
          border: 4px solid transparent;
          background-clip: content-box;
          background-color: var(--yt-spec-text-secondary);
        }
      
        ytd-watch-flexy[is-two-columns_] #comments::-webkit-scrollbar-thumb:hover {
          background-color: var(--yt-spec-icon-disabled);
        }
      
        ytd-watch-flexy[is-two-columns_][default-layout] #comments {
          top: calc(0px - var(--ytd-watch-flexy-panel-max-height) - var(--ytd-margin-3x));
        }
      
        ytd-watch-flexy[is-two-columns_]:not([default-layout]) #comments {
          top: var(--ytd-margin-3x);
        }
      
        ytd-watch-flexy[is-two-columns_]:has(#comments:not([hidden])) {
          --yttw-sc-margin: calc(var(--yttw-sidebar-comments-height) + var(--ytd-margin-6x));
        }
    
        ytd-watch-flexy[is-two-columns_]:has(:is(ytd-live-chat-frame:not([collapsed]), ytd-engagement-panel-section-list-renderer[visibility=ENGAGEMENT_PANEL_VISIBILITY_EXPANDED][target-id="engagement-panel-searchable-transcript"])) {
          --yttw-sc-hide: none;
          --yttw-sc-margin: 0 !important;
        }
      
        #comments {
          display: var(--yttw-sc-hide);
        }
      
        #secondary.ytd-watch-flexy {
          margin-top: var(--yttw-sc-margin) !important;
        }
        
        body[dir=ltr] ytd-watch-flexy[is-two-columns_] #comments {
          right: calc(0px - var(--ytd-watch-flexy-sidebar-width) - var(--ytd-margin-6x));
        }
        
        body[dir=rtl] ytd-watch-flexy[is-two-columns_] #comments {
          left: calc(0px - var(--ytd-watch-flexy-sidebar-width) - var(--ytd-margin-6x));
        }
        `

        if (settings.autoSidebarComments != false) ytTweaks.sheet.textContent += strg;

        if (settings.toggleSidebarCommentsHotkey) {
            ytTweaks.listenForHotkeys();

            ytTweaks.getHotkeys()[settings.toggleSidebarCommentsHotkey] = function () {
                if (ytTweaks.sheet.textContent.includes(strg)) {
                    ytTweaks.sheet.textContent = ytTweaks.sheet.textContent.replace(strg, '');
                }

                else ytTweaks.sheet.textContent += strg
            }
        }
    }

    if (settings.fixChannelLinks) {
        let channelName, command, sidebar;

        ytTweaks.sheet.textContent += `
        .yttw-channel-name {
          text-decoration: none;
          color: currentColor;
        }

        .yttw-channel-name:hover {
          color: var(--tffc2fd3a644f6275);
        }
        `;

        document.addEventListener('yt-player-updated', main);

        function main() {
            if ((sidebar = document.querySelector('#secondary.ytd-watch-flexy'))) {
                document.removeEventListener('yt-player-updated', main);

                sidebar.addEventListener('mouseenter', fixChannelLink, true);
                sidebar.addEventListener('click', redirectToChannel, true);
            }
        }

        function fixChannelLink(e) {
            if (e.target.matches('h3 + * :first-child > SPAN')) {
                channelName = e.target;
                const videoContainer = e.target.closest('yt-lockup-view-model');
                command = videoContainer.rawProps.data().metadata.lockupMetadataViewModel.image.decoratedAvatarViewModel.rendererContext.commandContext.onTap.innertubeCommand;
                const channelUrl = command.commandMetadata.webCommandMetadata.url;

                if (channelName.parentElement.tagName == 'A') {
                    channelName.parentElement.href = channelUrl;
                } else {
                    const a = document.createElement('a');
                    a.href = channelUrl;
                    a.classList.add('yttw-channel-name');
                    channelName.before(a);
                    a.appendChild(channelName);
                }
            }
        }

        function redirectToChannel(e) {
            if (e.target == channelName) {
                e.stopPropagation();
                e.preventDefault();
                document.querySelector('ytd-app').handleNavigate({
                    command: command
                });
            }
        }

        ytTweaks.fixChannelLinks = {
            storageChanged: function () {
                document.removeEventListener('yt-player-updated', main);
                sidebar?.removeEventListener('mouseenter', fixChannelLink, true);
                sidebar?.removeEventListener('click', redirectToChannel, true);
            }
        };
    }

    if (settings.hideShorts4) ytTweaks.sheet.textContent += `
    ytd-watch-flexy ytd-reel-shelf-renderer {
      display: none !important;
    }
    `;

    if (settings.hideWatchVideos3) {
        ytTweaks.sheet.textContent += `
        :is(ytd-watch-flexy yt-lockup-view-model, ytd-compact-video-renderer):has(:is(
        .ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment, .ytd-thumbnail-overlay-resume-playback-renderer)${settings.hideWatchVideos3 == 'All videos' ? '' : `:is(
        ${settings.hideWatchVideos3 == '50-100%' ?
                    '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 7"]:not([style^="width: 7%"]), [style^="width: 6"]:not([style^="width: 6%"]), [style^="width: 5"]:not([style^="width: 5%"])' :
                    settings.hideWatchVideos3 == '70-100%' ?
                        '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 7"]:not([style^="width: 7%"])' :
                        settings.hideWatchVideos3 == '75-100%' ?
                            '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 79%"], [style^="width: 78%"], [style^="width: 77%"], [style^="width: 76%"], [style^="width: 75%"]' :
                            settings.hideWatchVideos3 == '80-100%' ?
                                '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"])' :
                                settings.hideWatchVideos3 == '85-100%' ?
                                    '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 89%"], [style^="width: 88%"], [style^="width: 87%"], [style^="width: 86%"], [style^="width: 85%"]' :
                                    settings.hideWatchVideos3 == '90-100%' ?
                                        '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"])' :
                                        settings.hideWatchVideos3 == '95-100%' ?
                                            '[style="width: 100%;"], [style^="width: 99%"], [style^="width: 98%"], [style^="width: 97%"], [style^="width: 96%"], [style^="width: 95%"]' :
                                            '[style="width: 100%;"]'})`}
        ) {
            display: none !important;
        }`;
    }

    if (settings.dimWatchVideos3) {
        ytTweaks.sheet.textContent += `
        :is(ytd-watch-flexy yt-lockup-view-model, ytd-compact-video-renderer):has(:is(
        .ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment, .ytd-thumbnail-overlay-resume-playback-renderer)${settings.dimWatchVideos3 == 'dimAllVideos' ? '' : `:is(
        ${settings.dimWatchVideos3 == '50-100%' ?
                    '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 7"]:not([style^="width: 7%"]), [style^="width: 6"]:not([style^="width: 6%"]), [style^="width: 5"]:not([style^="width: 5%"])' :
                    settings.dimWatchVideos3 == '70-100%' ?
                        '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 7"]:not([style^="width: 7%"])' :
                        settings.dimWatchVideos3 == '75-100%' ?
                            '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"]), [style^="width: 79%"], [style^="width: 78%"], [style^="width: 77%"], [style^="width: 76%"], [style^="width: 75%"]' :
                            settings.dimWatchVideos3 == '80-100%' ?
                                '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 8"]:not([style^="width: 8%"])' :
                                settings.dimWatchVideos3 == '85-100%' ?
                                    '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"]), [style^="width: 89%"], [style^="width: 88%"], [style^="width: 87%"], [style^="width: 86%"], [style^="width: 85%"]' :
                                    settings.dimWatchVideos3 == '90-100%' ?
                                        '[style="width: 100%;"], [style^="width: 9"]:not([style^="width: 9%"])' :
                                        settings.dimWatchVideos3 == '95-100%' ?
                                            '[style="width: 100%;"], [style^="width: 99%"], [style^="width: 98%"], [style^="width: 97%"], [style^="width: 96%"], [style^="width: 95%"]' :
                                            '[style="width: 100%;"]'})`}
        ) {
            opacity: ${settings.watchVideoOpacity3 ?? '.3'};
        }`;
    }

    if (settings.hideMixes2) ytTweaks.sheet.textContent += `
    ytd-compact-radio-renderer,
    ytd-watch-flexy yt-lockup-view-model:has([href*="start_radio=1"]) {
      display: none !important;
    }
    `;

    if (settings.hideLiveStreams3) ytTweaks.sheet.textContent += `
    ytd-watch-flexy yt-lockup-view-model:has(:is(
        ${settings.hideLiveStreams3 == 'completed' ? '' : '.ytBadgeShapeLive, .ytBadgeShapeThumbnailLive,'}
        ${settings.hideLiveStreams3 == 'current' ? '' : '[aria-label="yttw-streamed"]' + (ytTweaks.hideStreamedVideos() || '')}
    )) {
      display: none !important;
    }
    `;

    if (settings.hideShareButton) ytTweaks.sheet.textContent += `
    #top-level-buttons-computed yt-button-view-model {
      display: none !important;
    }
    `;

    if (settings.hideDownloadButton) ytTweaks.sheet.textContent += `
    #flexible-item-buttons .ytd-menu-renderer:has([d="M12 2a1 1 0 00-1 1v11.586l-4.293-4.293a1 1 0 10-1.414 1.414L12 18.414l6.707-6.707a1 1 0 10-1.414-1.414L13 14.586V3a1 1 0 00-1-1Zm7 18H5a1 1 0 000 2h14a1 1 0 000-2Z"]) {
      display: none !important;
    }
    `;

    if (settings.hideClipButton) ytTweaks.sheet.textContent += `
    #flexible-item-buttons .ytd-menu-renderer:has([d="M6 2.002a4 4 0 102.03 7.445L10.586 12l-2.554 2.555a4 4 0 101.414 1.414L12 13.416l7.07 7.071a2 2 0 002.829 0L9.446 8.032A4 4 0 006 2.002Zm8.826 8.588 7.073-7.074a2 2 0 00-2.828 0l-5.66 5.66 1.415 1.414ZM8 6a2 2 0 11-4 0 2 2 0 014 0Zm0 12a2 2 0 11-4 0 2 2 0 014 0Z"]) {
      display: none !important;
    }
    `;

    if (settings.hideThanksButton) ytTweaks.sheet.textContent += `
    #flexible-item-buttons .ytd-menu-renderer:has([d="M16.25 2A6.7 6.7 0 0012 3.509 6.75 6.75 0 001 8.75c0 4.497 2.784 7.818 5.207 9.87a23.498 23.498 0 004.839 3.143l.096.044.03.013.01.005.003.002.002.001c.273-.609.544-1.218.813-1.828 0 0-9-4-9-11.25a4.75 4.75 0 018.932-2.247A1 1 0 0011 7.5v.638c-.357.1-.689.26-.979.49A2.35 2.35 0 009.13 10.5c-.007.424.112.84.342 1.197.21.31.497.563.831.734.546.29 1.23.411 1.693.502.557.109.899.19 1.117.315.086.048.109.082.114.09.004.006.028.045.028.162 0 .024-.008.118-.165.235-.162.122-.5.27-1.09.27-.721 0-1.049-.21-1.181-.323a.6.6 0 01-.142-.168l.005.013.006.014.002.009a.996.996 0 00-1.884.64l.947-.316-.003.001c-.875.292-.939.314-.943.317l.001.003.003.006.004.015.012.032c.045.111.1.218.162.321.146.236.324.444.535.624.357.306.841.566 1.476.702v.605a1 1 0 002 0v-.614c1.29-.289 2.245-1.144 2.245-2.386 0-.44-.103-.852-.327-1.212-.22-.355-.52-.6-.82-.77-.555-.316-1.244-.445-1.719-.539-.567-.111-.915-.185-1.143-.305a.5.5 0 01-.1-.07l-.004-.003-.003-.009a.4.4 0 01-.009-.092c0-.158.053-.244.14-.314.109-.086.341-.19.74-.19.373-.001.73.144.997.404a.996.996 0 001.518-1.286l-.699.58.698-.582v-.001l-.002-.001-.002-.003-.006-.006-.016-.018a2.984 2.984 0 00-.178-.182A3.45 3.45 0 0013 8.154V7.5a1 1 0 00-.933-.997A4.75 4.75 0 0121 8.75C21 16 12 20 12 20l.813 1.827.002-.001.003-.001.01-.005.029-.013.097-.045c.081-.037.191-.09.33-.16a23.5 23.5 0 004.509-2.982C20.216 16.568 23 13.248 23 8.75A6.75 6.75 0 0016.25 2Zm-3.437 19.827L12 20l-.813 1.828.813.36.813-.361Z"]) {
      display: none !important;
    }
    `;

    if (settings.hideSaveButton) ytTweaks.sheet.textContent += `
    #flexible-item-buttons .ytd-menu-renderer:has([d="M19 2H5a2 2 0 00-2 2v16.887c0 1.266 1.382 2.048 2.469 1.399L12 18.366l6.531 3.919c1.087.652 2.469-.131 2.469-1.397V4a2 2 0 00-2-2ZM5 20.233V4h14v16.233l-6.485-3.89-.515-.309-.515.309L5 20.233Z"]) {
      display: none !important;
    }
    `;

    if (settings.compactButtons) ytTweaks.sheet.textContent += `
    #top-level-buttons-computed yt-button-view-model .yt-spec-button-shape-next__button-text-content, 
    #flexible-item-buttons .yt-spec-button-shape-next__button-text-content {
      display: none !important;
    }
  
    #top-level-buttons-computed yt-button-view-model .yt-spec-button-shape-next__icon, 
    #flexible-item-buttons .yt-spec-button-shape-next__icon {
      margin: 0;
    }
  
    #top-level-buttons-computed yt-button-view-model .yt-spec-button-shape-next--size-m, 
    #flexible-item-buttons .yt-spec-button-shape-next--size-m {
      padding: 0 6px;
    }
    `;

    // Hotkeys

    if (settings.likeUnlikeHotkey || settings.dislikeUndislikeHotkey) {
        ytTweaks.listenForHotkeys();

        if (settings.likeUnlikeHotkey) {
            ytTweaks.getHotkeys()[settings.likeUnlikeHotkey] = function () {
                let like = getButton('like');
                if (!like?.clientWidth && !document.fullscreenElement) return;

                like.click();
            }
        }

        if (settings.dislikeUndislikeHotkey) {
            ytTweaks.getHotkeys()[settings.dislikeUndislikeHotkey] = function () {
                let dislike = getButton('dislike');
                if (!dislike?.clientWidth && !document.fullscreenElement) return;

                dislike.click();
            }
        }

        function getButton(type) {
            return document.querySelector(`[role="main"] ${location.pathname.includes('shorts') ? '': '#below'} ${type}-button-view-model button`);
        }
    }

    if (settings.redToShortsHotkey) {
        ytTweaks.listenForHotkeys();
        let button;

        ytTweaks.getHotkeys()[settings.redToShortsHotkey] = function () {
            if (!button?.isConnected) {
                button = document.createElement('ytd-guide-entry-renderer');
                button.style.display = 'none';
                button.data = { "icon": { "iconType": "TAB_SHORTS_CAIRO" }, "trackingParams": "CIQBEJyBCRgBIhMImp2OiM6EjAMVZcdJBx3zpwNP", "formattedTitle": { "simpleText": "Shorts" }, "accessibility": { "accessibilityData": { "label": "Shorts" } }, "serviceEndpoint": { "clickTrackingParams": "CIQBEJyBCRgBIhMImp2OiM6EjAMVZcdJBx3zpwNPmgECCDo=", "commandMetadata": { "webCommandMetadata": { "url": "/shorts/", "webPageType": "WEB_PAGE_TYPE_SHORTS", "rootVe": 37414 } }, "reelWatchEndpoint": { "playerParams": "8AEBuAQPkAcC", "overlay": { "reelPlayerOverlayRenderer": { "style": "REEL_PLAYER_OVERLAY_STYLE_SHORTS", "trackingParams": "CIUBELC1BCITCJqdjojOhIwDFWXHSQcd86cDTw==", "reelPlayerNavigationModel": "REEL_PLAYER_NAVIGATION_MODEL_UNSPECIFIED" } }, "params": "CA8%3D", "sequenceProvider": "REEL_WATCH_SEQUENCE_PROVIDER_RPC", "inputType": "REEL_WATCH_INPUT_TYPE_SEEDLESS", "updateKey": "EhhTSE9SVFNfU0VFRExFU1NfRU5EUE9JTlQg5gEoAQ%3D%3D", "loggingContext": { "vssLoggingContext": { "serializedContextData": "CgIIDA%3D%3D" }, "qoeLoggingContext": { "serializedContextData": "CgIIDA%3D%3D" } }, "ustreamerConfig": "CAw=" } }, "isPrimary": true }
                document.querySelector('ytd-app')?.appendChild(button);
            }
            button.click();
        }
    }
});