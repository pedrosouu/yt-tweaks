ytTweaks.tweaks.push(function (settings) {
    if (settings.showFullVideoTitles) ytTweaks.sheet.textContent += `
    h3 a[href^="/watch"] span,
    h3 a[href^="/watch"],
    a[href^="/watch"] + * h3,
    h3 a[href^="/shorts"] span,
    h3 a[href^="/shorts"],
    a[href^="/shorts"] + * h3,
    #video-title {
      -webkit-line-clamp: initial !important;
      max-height: initial !important;
    }
    `;

    if (settings.scrollUpButton) {
        const buttonColor = settings.scrollUpBtnColor || '#f1f1f1';
        const svgColor = settings.scrollUpBtnSvgColor || '#0f0f0f';
        ytTweaks.sheet.textContent += `
        html {
          height: 100vh;
        }
  
        #yttw-scroll-up-button {
          display: inline-block;
          background-color: ${buttonColor};
          color: ${svgColor};
          fill: currentcolor;
          width: ${settings.scrollUpBtnWidth ?? '36'}px;
          height: ${settings.scrollUpBtnWidth ?? '36'}px;
          text-align: center;
          border-radius: ${settings.scrollUpBtnRoundCorners ?? '18'}px;
          position: fixed;
          bottom: 10px;
          opacity: 0;
          visibility: hidden;
          z-index: 9999;
          cursor: pointer;
          transition: opacity 0.2s ease-in, visibility 0.2s;
          box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.1);
        }
  
        #yttw-scroll-up-button.show {
          opacity: 1;
          visibility: visible;
          transition: opacity 0.2s ease-out, visibility 0.2s;
        }
  
        #yttw-scroll-up-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          border-radius: inherit;
        }
  
        #yttw-scroll-up-button:hover::before {
          background-color: currentcolor;
          opacity: 0.2;
        }
  
        #yttw-scroll-up-button:active::before {
          background: currentcolor;
          opacity: 0.4;
        }
  
        #yttw-scroll-up-button > svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70%;
          height: 70%;
        }
        `;

        switch (settings.scrollUpButton) {
            case 'On the right':
                ytTweaks.sheet.textContent += `
                #yttw-scroll-up-button {
                  right: 10px;
                }
                `;
                break;

            case 'On the left':
                ytTweaks.sheet.textContent += `
                #yttw-scroll-up-button {
                  left: 10px;
                }
                `;
                break;

            case 'Centered':
                ytTweaks.sheet.textContent += `
                #yttw-scroll-up-button {
                  left: 50%;
                  transform: translateX(-50%);
                }
                `;
        }

        const button = document.createElement('div');
        button.id = 'yttw-scroll-up-button';
        button.insertAdjacentHTML('afterbegin', '<svg viewBox="0 0 24 24" height="24px" width="24px"><polygon points="19.35,11.5 11.5,3.65 3.65,11.5 4.35,12.21 11,5.56 11,20 12,20 12,5.56 18.65,12.21"></polygon></svg>');
        document.documentElement.appendChild(button);
        const userScrolled = new IntersectionObserver(function (entries) {
            entries[0].isIntersecting ? button.classList.remove('show') : button.classList.add('show');
        });
        userScrolled.observe(document.documentElement);
        button.addEventListener('click', scrollToTop);
        function scrollToTop() {
            window.scrollTo({
                top: 0,
            });
        }

        ytTweaks.scrollUpButton = {
            storageChanged: function () {
                button.remove();
                userScrolled.disconnect();
            }
        };
    }

    if (settings.scrollToTopHotkey) {
        ytTweaks.listenForHotkeys();

        ytTweaks.getHotkeys()[settings.scrollToTopHotkey] = function () {
            window.scrollTo({
                top: 0,
            });
        }
    }

    if (settings.moreAnimations) ytTweaks.sheet.textContent += `
    ytd-video-renderer,
    ytd-channel-renderer,
    ytd-rich-item-renderer,
    ytd-playlist-video-renderer,
    ytd-playlist-renderer,
    yt-lockup-view-model,
    .ytd-grid-renderer:is(ytd-grid-video-renderer, ytd-grid-playlist-renderer, ytd-grid-show-renderer, ytd-grid-channel-renderer, ytd-vertical-product-card-renderer),
    .ytd-item-section-renderer:is(ytd-radio-renderer, ytd-playlist-renderer, ytd-compact-video-renderer, ytd-compact-playlist-renderer, ytd-compact-radio-renderer, ytd-backstage-post-thread-renderer, ytd-channel-video-player-renderer, ytd-message-renderer, ytd-background-promo-renderer),
    ytd-comment-view-model,
    #expander.ytd-comment-replies-renderer,
    #description:is(.ytd-watch-metadata, .ytd-video-secondary-info-renderer),
    ytd-metadata-row-container-renderer,
    ytd-video-primary-info-renderer,
    .arrow.yt-horizontal-list-renderer {
      animation: cubic-bezier(0.4, 0, 0.2, 1) fadeInUp ${settings.maAnimationsSpeed ?? 0.75}s;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0px);
      }
    }
  
    .ytd-recognition-shelf-renderer:is(#avatars-container, #action-button),
    .ytd-channel-sub-menu-renderer:is(#sort-menu, ytd-menu-renderer),
    #subscribe-button.ytd-shelf-renderer,
    #menu:is(.ytd-watch-metadata, .ytd-rich-shelf-renderer, .ytd-shelf-renderer),
    #sort-filter.ytd-horizontal-card-list-renderer,
    ytd-menu-renderer.ytd-reel-shelf-renderer {
      animation: cubic-bezier(0.4, 0, 0.2, 1) fadeInLeft ${settings.maAnimationsSpeed ?? 0.75}s;
    }
    
    @keyframes fadeInLeft {
      from {
        opacity: 0;
        transform: translateX(20px);
      }
      to {
        opacity: 1;
        transform: translateX(0px);
      }
    }
  
    #text-container.ytd-recognition-shelf-renderer,
    #items:is(.yt-horizontal-list-renderer, .ytd-horizontal-card-list-renderer),
    h2:is(.ytd-rich-shelf-renderer, .ytd-shelf-renderer),
    #subtitle.ytd-shelf-renderer,
    #primary-items.ytd-channel-sub-menu-renderer,
    .ytd-watch-metadata:is(h1, ytd-badge-supported-renderer, #owner),
    .thumbnail-and-metadata-wrapper.ytd-playlist-header-renderer,
    h3.ytd-channel-featured-content-renderer,
    .ytd-horizontal-card-list-renderer:is(#header, #header-button),
    h2.ytd-reel-shelf-renderer {
      animation: cubic-bezier(0.4, 0, 0.2, 1) fadeInRight ${settings.maAnimationsSpeed ?? 0.75}s;
    }
    
    @keyframes fadeInRight {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0px);
      }
    }
    `;

    if (settings.redSubscribeButton) ytTweaks.sheet.textContent += `
    :is(yt-subscribe-button-view-model, ytd-subscribe-button-renderer) .ytSpecButtonShapeNextFilled.ytSpecButtonShapeNextMono {
      background: #cc0000 !important;
      color: #ffff !important;
    }
    
    :is(yt-subscribe-button-view-model, ytd-subscribe-button-renderer) .ytSpecButtonShapeNextFilled.ytSpecButtonShapeNextMono:hover {
      background: #b70000 !important;
    }       
    `;

    if (settings.customCss) ytTweaks.sheet.textContent += settings.customCss;

    if (settings.customJs && !ytTweaks.script) {
        ytTweaks.script = document.createElement('script');
        ytTweaks.script.textContent = settings.customJs;

        document.documentElement.appendChild(ytTweaks.script);
    }
});