ytTweaks.tweaks.push(function (settings) {
    if (settings.compactHeaderBar) ytTweaks.sheet.textContent += `
    :root {
      --ytd-toolbar-height: 36px;
    }
  
    ytd-feed-filter-chip-bar-renderer {
      --ytd-rich-grid-chips-bar-top: var(--ytd-toolbar-height);
    }
  
    ytd-app:not([scrolling]) {
      --ytd-masthead-height: var(--ytd-toolbar-height) !important;
    }
  
    .ytd-masthead:is(#container, #background),
    #header.ytd-app,
    ytd-masthead.shell {
      height: var(--ytd-toolbar-height);
    }
  
    #player.skeleton.theater {
      margin-top: var(--ytd-toolbar-height);
    }
  
    yt-searchbox,
    .ytd-searchbox:is(#search-form, #search-icon-legacy),
    #masthead .yt-spec-button-shape-next--overlay {
      height: 30px !important;
    }
  
    yt-icon-button:is(.ytd-topbar-menu-button-renderer, .ytd-masthead, .ytd-notification-topbar-button-renderer),
    #masthead .yt-spec-button-shape-next--icon-only-default,
    #guide-button.ytd-app,
    .ytSearchboxComponentClearButton {
      width: 30px !important;
      height: 30px !important;
      padding: 3px;
    }
  
    .ytSearchboxComponentSuggestionsContainer {
      top: 30px;
    }
  
    yt-icon.ytd-logo {
      padding-top: 8px;
      padding-bottom: 8px;
    }
  
    #container.ytd-masthead,
    #header.ytd-app {
      padding: 0 21px;
    }
    `;

    if (settings.ytLogoSubsPage) {
        let logo, command;

        document.addEventListener('yt-navigate-finish', function () {
            logo = document.querySelector('a#logo');
            logo.addEventListener('click', redirect);
            if (command) logo.href = command.commandMetadata.webCommandMetadata.url;
        }, { once: true });

        if (settings.ylspPage == '') {
            document.addEventListener('yt-navigate-finish', setCustomPage);
        } else {
            command = settings.ylspPage ? settings.ylspPage : { "commandMetadata": { "webCommandMetadata": { "url": "/feed/subscriptions", "webPageType": "WEB_PAGE_TYPE_BROWSE", "rootVe": 96368, "apiUrl": "/youtubei/v1/browse" } } };
        }

        function setCustomPage(e) {
            if (e.detail.endpoint && confirm(`Make logo redirect to this page? (${e.detail.endpoint?.commandMetadata?.webCommandMetadata?.url})`)) {
                document.removeEventListener('yt-navigate-finish', setCustomPage);

                command = e.detail.endpoint;
                logo.href = command.commandMetadata.webCommandMetadata.url;
                document.dispatchEvent(new CustomEvent('yttwSaveSetting', {
                    detail: {
                        ylspPage: e.detail.endpoint
                    }
                }));
            }
        }

        function redirect(e) {
            e.stopImmediatePropagation();
            e.preventDefault();
            document.querySelector('ytd-app').handleNavigate({ command: command });
        }

        ytTweaks.ytLogoSubsPage = {
            storageChanged: function () {
                document.removeEventListener('yt-navigate-finish', setCustomPage);
                logo?.removeEventListener('click', redirect);
                if (logo) logo.href = '/';
            }
        };
    }

    if (settings.sResultsInNewTab) {
        ytTweaks.sheet.textContent += `
        #yttw-new-tab-button {
          height: 24px;
          width: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          cursor: pointer;
          border-radius: 50%;
          outline-offset: 5px
        }
    
        #yttw-new-tab-button:focus-visible {
          outline: 1px solid;
        }
    
        input[placeholder]:not(:placeholder-shown) + #yttw-new-tab-button {
          visibility: visible !important;
        }
        `;

        let input;
        let div = document.createElement('div');
        div.style = 'visibility: hidden;';
        div.setAttribute('tabindex', '0');
        div.id = 'yttw-new-tab-button';
        div.insertAdjacentHTML('afterbegin', `
        <svg viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" width="24px" height="24px" stroke-linejoin="round" stroke-width="2" fill="none">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
        `);
        div.addEventListener('click', openInNewTab);
        div.addEventListener("keydown", function (e) {
            if (e.code == "Space" || e.code == "Enter") {
                openInNewTab();
            }
        });

        function openInNewTab() {
            window.open(`https://www.youtube.com/results?search_query=${input.value}`, '_blank');
        }

        document.addEventListener('yt-navigate-finish', function () {
            input = document.querySelector('input[type="text"]');
            input.after(div);
        }, { once: true });

        ytTweaks.sResultsInNewTab = {
            storageChanged: function () {
                div.remove?.();
                div = '';
            }
        };
    }
});