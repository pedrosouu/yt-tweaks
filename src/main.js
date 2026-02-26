(function() {
ytTweaks = {
    tweaks: [],
    sheet: document.createElement('style'),
    noop() { },
    getHotkeys() {
        return ytTweaks.hotkeys || (ytTweaks.hotkeys = {
            storageChanged: function () {
                delete ytTweaks.hotkeys;
            }
        })
    },
    listenForHotkeys() {
        ytTweaks.listenForHotkeys = ytTweaks.noop;
        let pressedKeys = [];
        let action;

        window.addEventListener('keydown', function (e) {
            if (e.target.isContentEditable || e.target.attributes.placeholder) return;
            ytTweaks.disableNumHotkeys?.main(e);
            if (ytTweaks.numbersThenKey?.main(e)) return;

            if (e.repeat) {
                if (!action) return;
                e.stopImmediatePropagation();
                e.preventDefault();
                action();
            }
            else {
                pressedKeys.push(e.code);
                action = ytTweaks.hotkeys?.[pressedKeys.join('+')];
                if (!action) return;
                e.stopImmediatePropagation();
                e.preventDefault();
                action();
            }
        }, true);

        window.addEventListener('keyup', function (e) {
            if (pressedKeys.length) pressedKeys.splice(pressedKeys.indexOf(e.code), 1);
        }, true);

        window.addEventListener('blur', function () {
            pressedKeys = [];
        });
    },
    hideStreamedVideos() {
        ytTweaks.hideStreamedVideos = ytTweaks.noop;

        let streamed;
        switch (document.documentElement.lang) {
            case 'af-ZA':
                streamed = 'Gestroom';
                break;
            case 'az-Latn-AZ':
                streamed = 'Yayım vaxtı';
                break;
            case 'id-ID':
                streamed = 'Streaming';
                break;
            case 'ms-MY':
                streamed = 'Distrim pada';
                break;
            case 'bs-Latn-BA':
                streamed = 'Preneseno';
                break;
            case 'ca-ES':
                streamed = 'Emès';
                break;
            case 'cs-CZ':
                streamed = 'Vysíláno';
                break;
            case 'da-DK':
                streamed = 'streamet';
                break;
            case 'de-DE':
                streamed = 'gestreamt';
                break;
            case 'et-EE':
                streamed = 'toimus';
                break;
            case 'en':
            case 'en-IN':
            case 'en-GB':
                streamed = 'Streamed';
                break;
            case 'es-ES':
                streamed = 'Emitido';
                break;
            case 'es-419':
            case 'es-US':
                streamed = 'Transmitido';
                break;
            case 'eu-ES':
                streamed = 'zen zuzenean';
                break;
            case 'fil-PH':
                streamed = 'Nai-stream';
                break;
            case 'fr-FR':
            case 'fr-CA':
                streamed = 'Diffusé';
                break;
            case 'gl-ES':
                streamed = 'Emitiuse';
                break;
            case 'hr-HR':
                streamed = 'streaminga';
                break;
            case 'zu-ZA':
                streamed = 'Kusakazwe';
                break;
            case 'is-IS':
                streamed = 'Streymt';
                break;
            case 'it-IT':
                streamed = 'Trasmesso';
                break;
            case 'sw-TZ':
                streamed = 'Ilitiririshwa';
                break;
            case 'lv-LV':
                streamed = 'Straumēts';
                break;
            case 'lt-LT':
                streamed = 'Perduota srautu';
                break;
            case 'hu-HU':
                streamed = 'Streamelve';
                break;
            case 'nl-NL':
                streamed = 'Gestreamd';
                break;
            case 'nb-NO':
                streamed = 'Strømmet';
                break;
            case 'uz-Latn-UZ':
                streamed = 'Translatsiya';
                break;
            case 'sq-AL':
                streamed = 'Transmetuar';
                break;
            case 'pl-PL':
                streamed = 'Transmisja';
                break;
            case 'pt-PT':
            case 'pt-BR':
                streamed = 'Transmitido';
                break;
            case 'ro-RO':
                streamed = 'Transmis';
                break;
            case 'sk-SK':
                streamed = 'Streamované';
                break;
            case 'sl-SI':
                streamed = 'Pretočno';
                break;
            case 'sr-Latn-RS':
                streamed = 'Strimovano';
                break;
            case 'fi-FI':
                streamed = 'Striimattu';
                break;
            case 'sv-SE':
                streamed = 'Streamat';
                break;
            case 'vi-VN':
                streamed = 'Phát trực tiếp';
                break;
            case 'tr-TR':
                streamed = 'yayınlandı';
                break;
            case 'be-BY':
                streamed = 'Трансляцыя';
                break;
            case 'bg-BG':
                streamed = 'Предавано поточно';
                break;
            case 'ky-KG':
                streamed = 'көрсөтүлдү';
                break;
            case 'kk-KZ':
                streamed = 'Көрсетілген';
                break;
            case 'mk-MK':
                streamed = 'Пренесувано';
                break;
            case 'mn-MN':
                streamed = 'өмнө дамжууллаа';
                break;
            case 'ru-RU':
                streamed = 'закончилась';
                break;
            case 'sr-Cyrl-RS':
                streamed = 'Стримовано';
                break;
            case 'uk-UA':
                streamed = 'відбулася';
                break;
            case 'el-GR':
                streamed = 'Μεταδόθηκε';
                break;
            case 'hy-AM':
                streamed = 'Հեռարձակումն';
                break;
            case 'he-IL':
                streamed = 'שודר';
                break;
            case 'ur-PK':
                streamed = 'وقت';
                break;
            case 'ar':
                streamed = 'البث';
                break;
            case 'fa-IR':
                streamed = 'پخش جریانی';
                break;
            case 'ne-NP':
                streamed = 'स्ट्रिम';
                break;
            case 'mr-IN':
                streamed = 'वाजता प्रवाहित';
                break;
            case 'hi-IN':
                streamed = 'स्ट्रीम';
                break;
            case 'as-IN':
                streamed = 'ষ্ট্ৰীম';
                break;
            case 'bn-BD':
                streamed = 'স্ট্রীম';
                break;
            case 'pa-Guru-IN':
                streamed = 'ਸਟ੍ਰੀਮ';
                break;
            case 'gu-IN':
                streamed = 'સ્ટ્રીમ';
                break;
            case 'or-IN':
                streamed = 'ଷ୍ଟ୍ରିମ୍';
                break;
            case 'ta-IN':
                streamed = 'ஸ்ட்ரீம்';
                break;
            case 'te-IN':
                streamed = 'స్ట్రీమ్';
                break;
            case 'kn-IN':
                streamed = 'ಸ್ಟ್ರೀಮ್';
                break;
            case 'ml-IN':
                streamed = 'സ്‌ട്രീം';
                break;
            case 'si-LK':
                streamed = 'ප්‍රවාහය කළ';
                break;
            case 'th-TH':
                streamed = 'สตรีมแล้วเมื่อ';
                break;
            case 'lo-LA':
                streamed = 'ຖ່າຍທອດເມື່ອ';
                break;
            case 'my-MM':
                streamed = 'ထုတ်လွှင့်ခဲ့သည်';
                break;
            case 'ka-GE':
                streamed = 'სტრიმინგი';
                break;
            case 'am-ET':
                streamed = 'የተለቀቀው';
                break;
            case 'km-KH':
                streamed = 'ផ្សាយផ្ទាល់';
                break;
            case 'zh-Hans-CN':
                streamed = '直播时间';
                break;
            case 'zh-Hant-TW':
                streamed = '直播時間';
                break;
            case 'zh-Hant-HK':
                streamed = '前曾經串流';
                break;
            case 'ja-JP':
                streamed = 'に配信済み';
                break;
            case 'ko-KR':
                streamed = '스트리밍';
        };

        // Let us redefine the value of the 'aria-label' attribute of past livestreams titles before the livestreams
        // are added to the DOM, that way we can target and hide them with CSS later.
        const ogPush = Array.prototype.push;
        Array.prototype.push = function () {
            if (arguments[0]?.data?.publishedTimeText?.simpleText?.includes?.(streamed)) {
                try { arguments[0].data.title.accessibility.accessibilityData.label = 'yttw-streamed'; }
                catch { }
            }

            // YT began using a differently structured 'data' object in the watch page.
            if (arguments[0]?.data?.metadata?.lockupMetadataViewModel?.metadata?.contentMetadataViewModel?.metadataRows?.[1]?.metadataParts?.[1]?.text?.content?.includes?.(streamed)) {
                try { arguments[0].data.rendererContext.accessibilityContext.label = 'yttw-streamed'; }
                catch { }
            }

            return ogPush.apply(this, arguments);
        }
    }
};

new MutationObserver(function () {
    if (document.body) {
        this.disconnect();
        document.documentElement.appendChild(ytTweaks.sheet);
    }
}).observe(document.documentElement, {
    childList: true
});

try {
    trustedTypes.createPolicy('default', {
        createHTML: function (s) { return s },
        createScript: function (s) { return s }
    })
} catch { }

document.addEventListener('yttwStorageChanged', function (e) {
    if (e.detail.changes.videosPerRow) {
        location.replace(location.href);
    }

    for (p in ytTweaks) ytTweaks[p]?.storageChanged?.();
    ytTweaks.sheet.textContent = '';
    initTweaks(e.detail.settings);

    document.dispatchEvent(new CustomEvent('yt-player-updated'));
    document.dispatchEvent(new CustomEvent('yt-navigate-finish', { detail: { pageType: yt.config_.TIMING_ACTION } }));
    for (const video of document.querySelectorAll('video')) {
        if (video.clientWidth) {
            video.dispatchEvent(new Event('loadstart'));
            break;
        }
    }
});

document.addEventListener('yttwStorageData', function (e) {
    initTweaks(e.detail);
}, { once: true });

function initTweaks(settings) {    
    for (const func of ytTweaks.tweaks) func(settings, fixMisalignedVideos);

    function fixMisalignedVideos() {
        fixMisalignedVideos = ytTweaks.noop;

        ytTweaks.sheet.textContent += `
        /* Removes the 24px margin from items in first column */
        ytd-rich-item-renderer[rendered-from-rich-grid]:not([is-shorts-grid]) {
          margin-left: calc(var(--ytd-rich-grid-item-margin, 16px) / 2) !important;
          margin-right: calc(var(--ytd-rich-grid-item-margin, 16px) / 2) !important;
        }

        /* Adds it to the grid container as a padding */
        body[dir="ltr"] #contents.ytd-rich-grid-renderer {
          padding-left: calc(var(--ytd-rich-grid-gutter-margin) * 2) !important;
        }

        body[dir="rtl"] #contents.ytd-rich-grid-renderer {
          padding-right: calc(var(--ytd-rich-grid-gutter-margin) * 2) !important;
        }

        /* Non-grid items remain unaffected */
        body[dir="ltr"] #contents.ytd-rich-grid-renderer > :not(ytd-rich-item-renderer) {
          margin-left: calc(var(--ytd-rich-grid-gutter-margin) * -1) !important;
          margin-right: var(--ytd-rich-grid-gutter-margin) !important;
        }

        body[dir="rtl"] #contents.ytd-rich-grid-renderer > :not(ytd-rich-item-renderer) {
          margin-left: var(--ytd-rich-grid-gutter-margin) !important;
          margin-right: calc(var(--ytd-rich-grid-gutter-margin) * -1) !important;
        }
        `;
    }
}
})();