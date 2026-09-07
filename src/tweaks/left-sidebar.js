ytTweaks.tweaks.push(function (settings) {
    if (settings.compactLeftSidebar) ytTweaks.sheet.textContent += `
    ytd-app {
      --app-drawer-width: 82px;
    }
  
    ytd-guide-renderer.ytd-app,
    #guide-skeleton {
      width: 82px;
    }
  
    body[dir=ltr] ytd-app[guide-persistent-and-visible] ytd-page-manager.ytd-app {
      margin-left: var(--app-drawer-width);
    }
  
    body[dir=rtl] ytd-app[guide-persistent-and-visible] ytd-page-manager.ytd-app {
      margin-right: var(--app-drawer-width);
    }
  
    ytd-guide-section-renderer {
      --paper-item-min-height: 48px;
    }
  
    ytd-guide-entry-renderer {
      width: var(--paper-item-min-height);
    }
  
    #guide-content ytd-topbar-logo-renderer,
    h3.ytd-guide-section-renderer,
    ytd-guide-entry-renderer[is-header] .title.ytd-guide-entry-renderer,
    .title.ytd-guide-entry-renderer,
    .ytd-guide-renderer:is(#guide-links-primary, #guide-links-secondary, #footer, ytd-guide-signin-promo-renderer) {
      display: none;
    }
  
    ytd-guide-entry-renderer[is-header] [href="/feed/subscriptions"] path {
      d: path("M18 1H6a2 2 0 00-2 2h16a2 2 0 00-2-2Zm3 4H3a2 2 0 00-2 2v13a2 2 0 002 2h18a2 2 0 002-2V7a2 2 0 00-2-2ZM3 20V7h18v13H3Zm13-6.5L10 10v7l6-3.5Z");
      clip-rule: evenodd;
      fill-rule: evenodd;
    }

    ytd-guide-entry-renderer[is-header][active] [href="/feed/subscriptions"] path {
      d: path("M6 1a2 2 0 00-2 2h16a2 2 0 00-2-2H6ZM1 7v13a2 2 0 002 2h18a2 2 0 002-2V7a2 2 0 00-2-2H3a2 2 0 00-2 2Zm9 10v-7l6 3.5-6 3.5Z");
    }

    ytd-guide-entry-renderer[is-header] [href="/feed/you"] path {
      d: path("M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm0 2a9 9 0 016.447 15.276 7 7 0 00-12.895 0A9 9 0 0112 3Zm0 2a4 4 0 100 8 4 4 0 000-8Zm0 2a2 2 0 110 4 2 2 0 010-4Zm-.1 9.001L11.899 16a5 5 0 014.904 3.61A8.96 8.96 0 0112 21a8.96 8.96 0 01-4.804-1.391 5 5 0 014.704-3.608Z");
      clip-rule: evenodd;
      fill-rule: evenodd;
    }

    ytd-guide-entry-renderer[is-header][active] [href="/feed/you"] path {
      d: path("M12 1C5.925 1 1 5.925 1 12a10.98 10.98 0 004.68 9c1.788 1.258 3.967 2 6.32 2s4.532-.742 6.32-2c.227-.159.447-.325.66-.499v.001A10.98 10.98 0 0023 12c0-6.075-4.925-11-11-11Zm0 4a3.5 3.5 0 110 7 3.5 3.5 0 010-7Zm0 9a7 7 0 016.446 4.276A8.97 8.97 0 0112 21a8.97 8.97 0 01-6.447-2.724 7 7 0 013.768-3.743A6.998 6.998 0 0112 14Z");
    }

    ytd-guide-entry-renderer[is-header] .arrow-icon.ytd-guide-entry-renderer {
      width: 24px !important;
      height: 24px !important;
    }
  
    .guide-icon.ytd-guide-entry-renderer,
    yt-img-shadow.ytd-guide-entry-renderer {
      margin: 0px;
    }
  
    yt-img-shadow.ytd-guide-entry-renderer {
      margin-bottom: 3px;
    }
  
    tp-yt-paper-item.ytd-guide-entry-renderer {
      flex-direction: column;
      justify-content: center;
    }
  
    ytd-guide-entry-renderer,
    #endpoint.yt-simple-endpoint.ytd-guide-entry-renderer:is(:hover, :focus, :active),
    yt-interaction.ytd-guide-entry-renderer,
    tp-yt-paper-item.ytd-guide-entry-renderer {
      border-radius: 50%;
      --paper-item-focused-before-border-radius: 50%;
    }
    `;

    if (settings.hideShortsButton) ytTweaks.sheet.textContent += `
    #endpoint.yt-simple-endpoint:has([d="m13.467 1.19-8 4.7a5 5 0 00-.255 8.46 5 5 0 005.32 8.462l8-4.7a5 5 0 00.258-8.462 5 5 0 001.641-6.464l-.12-.217a5 5 0 00-6.844-1.78m5.12 2.79a2.999 2.999 0 01-1.067 4.107l-1.327.78a1 1 0 00.096 1.775l.943.423a3 3 0 01.288 5.323l-8 4.7a3 3 0 01-3.039-5.173l1.327-.78a1 1 0 00-.097-1.775l-.942-.423a3 3 0 01-.288-5.323l8-4.7a3 3 0 014.106 1.066ZM15 12l-5-3v6l5-3Z"]) {
      display: none !important;
    }
    `;

    if (settings.hideExplore) ytTweaks.sheet.textContent += `
    ytd-guide-section-renderer:nth-last-child(3) {
      display: none !important;
    }
    `;

    if (settings.hideMoreFromYt) ytTweaks.sheet.textContent += `
    ytd-guide-section-renderer:nth-last-child(2) {
      display: none !important;
    }
    `;
});