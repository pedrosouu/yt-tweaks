ytTweaks.tweaks.push(function (settings) {
    if (settings.videosPerRow) {
        // Videos
        let maxNumOfColumns = settings.maxNumOfColumns ?? 6;
        let minColumnWidth = settings.minColumnWidth ?? 270;

        // Shorts
        let maxNumOfColumns2 = settings.maxNumOfColumns2 ?? 12;
        let minColumnWidth2 = settings.minColumnWidth2 ?? 170;

        // Posts
        let maxNumOfColumns3 = settings.maxNumOfColumns3 ?? 6;
        let minColumnWidth3 = settings.minColumnWidth3 ?? 326;

        ytTweaks.sheet.textContent += `  
        /* Channel page - Video container */
        ytd-rich-grid-media[mini-mode] {
          max-width: initial;
        }

        /* Channel page - Videos tab */
        ytd-two-column-browse-results-renderer[page-subtype=channels]:has(ytd-rich-grid-renderer:not([is-shorts-grid])) {
          width: calc(100% - 32px) !important;
          max-width: calc(var(--yttw-videos-per-row) * (var(--ytd-rich-grid-item-max-width) + var(--ytd-rich-grid-item-margin))) !important;
        }

        /* Channel page - Shorts tab */
        ytd-two-column-browse-results-renderer[page-subtype=channels]:has(ytd-rich-grid-renderer[is-shorts-grid]) {
          width: calc(100% - 32px) !important;
          max-width: calc(var(--yttw-shorts-per-row) * (var(--ytd-rich-grid-slim-item-max-width) + var(--ytd-rich-grid-shorts-item-margin))) !important;
        }

        /* Homepage skeleton */
        #home-page-skeleton .rich-grid-media-skeleton {
          min-width: ${minColumnWidth - 16}px !important;
          flex-basis: ${minColumnWidth - 16}px !important;
        }

        /* Watch page - related videos grid (it appears below the player when the sidebar is not present) */
        ytd-item-section-renderer[lockup-container-type="2"][is-grid-view-enabled] #contents.ytd-item-section-renderer {
          grid-template-columns: repeat(auto-fill, minmax(max(${minColumnWidth - 16}px, calc((100%/${maxNumOfColumns}) - 16px)), 1fr));
        }
        `;

        Object.defineProperty(Object.prototype, 'elementsPerRow', {
            get: function () {
                if (typeof this.elementsPerRowValue == 'number') {
                    let type, n;

                    if ((typeof this.isSlimMediaShelfRenderer == 'function' ? this.isSlimMediaShelfRenderer() : this.isSlimMediaShelfRenderer) || (typeof this.isGameCardShelf == 'function' ? this.isGameCardShelf() : this.isGameCardShelf) || (typeof this.isMiniGameCardShelf == 'function' ? this.isMiniGameCardShelf() : this.isMiniGameCardShelf)) type = 'short';
                    else if ((typeof this.isPostShelfRenderer == 'function' ? this.isPostShelfRenderer() : this.isPostShelfRenderer)) type = 'post';
                    else type = 'video';

                    n = calcNumOfElements(type, this.containerWidth || document.body.clientWidth) || 1;
                    this.hostElement?.style?.setProperty('--ytd-rich-grid-items-per-row', n);

                    return n;
                }

                return this.elementsPerRowValue;
            },
            set: function (x) {
                this.elementsPerRowValue = x;
            },
            configurable: true
        });

        Object.defineProperty(Object.prototype, 'slimItemsPerRow', {
            get: function () {
                if (typeof this.slimItemsPerRowValue == 'number') {
                    return calcNumOfElements('short', this.containerWidth || document.body.clientWidth) || 1;
                }

                return this.slimItemsPerRowValue;
            },
            set: function (x) {
                this.slimItemsPerRowValue = x;
            },
            configurable: true
        });

        function calcNumOfElements(type, width) {
            if (type == 'video') {
                for (let i = maxNumOfColumns; i > 0; i--) {
                    if (width / i >= minColumnWidth) {
                        document.documentElement.style.setProperty('--yttw-videos-per-row', i);
                        return +i;
                    }
                }
            } else if (type == 'short') {
                for (let i = maxNumOfColumns2; i > 0; i--) {
                    if (width / i >= minColumnWidth2) {
                        document.documentElement.style.setProperty('--yttw-shorts-per-row', i);
                        return +i;
                    }
                }
            } else {
                for (let i = maxNumOfColumns3; i > 0; i--) {
                    if (width / i >= minColumnWidth3) {
                        return +i;
                    }
                }
            }
        }

        ytTweaks.videosPerRow = {
            storageChanged: function () {
                setTimeout(function () {
                    document.querySelector('[role="main"] ytd-rich-grid-renderer')?.resizeObserved();
                    const contentsShelf = document.documentElement.querySelectorAll('[role="main"] ytd-rich-shelf-renderer');
                    for (const el of contentsShelf) {
                        el.onDataChange();
                    }
                }, 0);
            }
        };
    }

    if (settings.hideProfilePictures) ytTweaks.sheet.textContent += `
    :root {
      --yttw-hpp-display: none;
    }
  
    /* Old el */ 
    #avatar-container.ytd-rich-grid-media,
    /* New el */ 
    ytd-rich-item-renderer .yt-lockup-metadata-view-model__avatar,
    /* Homepage loading: skeleton el */
     #home-page-skeleton .channel-avatar,
    /* Skeleton el */
    .channel-avatar.ytd-ghost-grid-renderer {
      display: none !important;
    }
    `;

    if (settings.decreaseFontSize) ytTweaks.sheet.textContent += `
    :root {
      --yttw-dfs-1-4rem: 1.4rem;
      --yttw-dfs-2rem: 2rem;
      --yttw-dfs-1-2rem: 1.2rem;
      --yttw-dfs-1-8rem: 1.8rem;
    }
    
    ytd-rich-grid-media h3 yt-formatted-string,
    ytd-rich-item-renderer h3 span,
    ytd-rich-item-renderer #title {
      font-size: 1.4rem !important;
      line-height: 2rem !important;
    }
    
    ytd-rich-grid-media h3 + * yt-formatted-string,
    ytd-rich-item-renderer h3 + * span,
    ytd-rich-item-renderer #title ~ yt-formatted-string {
      font-size: 1.2rem !important;
      line-height: 1.8rem !important;
    }
    `;
});