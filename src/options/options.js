export { openPopups, showPopup, hidePopup };

let timeoutId;
const openPopups = [];

document.documentElement.lang = chrome.i18n.getMessage('locale_lang');
document.body.dir = chrome.i18n.getMessage('locale_dir');

const reviewsPage = document.getElementById('reviewsPage');
if (reviewsPage) reviewsPage.href = navigator.userAgent.includes('Firefox') ? reviewsPage.dataset.firefoxLink : navigator.userAgent.includes('Edg') ? reviewsPage.dataset.edgeLink : reviewsPage.dataset.chromeLink;

try {
    navigator.mediaSession.setActionHandler('enterpictureinpicture', function () { });
} catch { document.body.classList.add('autoPipUnsupported') }

await load(chrome.runtime.getURL('options/tabs/video-grid.html'), document.getElementById('video-grid'));
await load(chrome.runtime.getURL('options/tabs/homepage.html'), document.getElementById('homepage'));
await load(chrome.runtime.getURL('options/tabs/subscriptions-page.html'), document.getElementById('subscriptions-page'));
await load(chrome.runtime.getURL('options/tabs/channel-page.html'), document.getElementById('channel-page'));
await load(chrome.runtime.getURL('options/tabs/player.html'), document.getElementById('player'));
await load(chrome.runtime.getURL('options/tabs/watch-page.html'), document.getElementById('watch-page'));
await load(chrome.runtime.getURL('options/tabs/search-page.html'), document.getElementById('search-page'));
await load(chrome.runtime.getURL('options/tabs/header-bar.html'), document.getElementById('header-bar'));
await load(chrome.runtime.getURL('options/tabs/left-sidebar.html'), document.getElementById('left-sidebar'));
await load(chrome.runtime.getURL('options/tabs/themes.html'), document.getElementById('themes'));
await load(chrome.runtime.getURL('options/tabs/other.html'), document.getElementById('other'));
await load(chrome.runtime.getURL('options/tabs/custom-code.html'), document.getElementById('custom-code'));
await load(chrome.runtime.getURL('options/tabs/user-settings.html'), document.getElementById('user-settings'));

function load(url, element) {
    if (!element) return;
    return fetch(url)
        .then(function (data) {
            return data.text();
        })
        .then(function (data) {
            element.insertAdjacentHTML('afterbegin', data);
        });
}

for (const el of document.querySelectorAll(':is([data-text], [text-title], [text-placeholder], [number-title], [aria-label], [title], [placeholder])')) {
    if (el.attributes['data-text']) showLocalizedText('data-text');
    if (el.attributes['text-title']) showLocalizedText('text-title');
    if (el.attributes['text-placeholder']) showLocalizedText('text-placeholder');
    if (el.attributes['number-title']) showLocalizedText('number-title');
    if (el.attributes['aria-label']) showLocalizedText('aria-label');
    if (el.title) showLocalizedText('title');
    if (el.placeholder) showLocalizedText('placeholder');

    function showLocalizedText(attr) {
        const msg = chrome.i18n.getMessage(el.getAttribute(attr));
        if (msg) {
            attr == 'data-text' ? el.prepend(document.createTextNode(msg)) : el.setAttribute(attr, msg);
        }
    }
}

chrome.storage.local.get().then(function (settings) {
    for (const key in settings) {
        restoreSetting(document.getElementById(key), settings[key]);
    }
});

document.addEventListener('click', function (e) {
    let button;

    if (openPopups.length && !openPopups[openPopups.length - 1].contains(e.target) || e.target.closest('.close')) {
        e.preventDefault();
        hidePopup();
    }

    else if (button = e.target.closest('.export')) {
        exportSettings(button);
    }

    else if (button = e.target.closest('.tabHeading')) {
        handleTabClick(button);
    }

    else e.target.closest('button')?.action?.();
});

document.addEventListener('input', function (e) {
    if (e.target.matches('.search')) {
        handleSearch(e.target);
    }

    else if (e.target.matches('.import')) {
        importSettings(e.target);
    }

    else saveSetting(e);
});

document.addEventListener('focus', function(e) {
    if (openPopups.length && e.target.matches(':focus-visible') && !e.target.closest('.popup')) {
        openPopups[openPopups.length - 1].label.children[1].focus();
        hidePopup();
    }
}, true);

async function saveSetting(obj) {
    const setting = obj instanceof Event ? { [obj.target.id]: obj.target.type == 'checkbox' ? obj.target.checked : obj.target.type == 'number' ? obj.target.valueAsNumber : obj.target.value } : obj;
    
    const expandableDiv = obj.target?.parentElement.nextElementSibling;

    if (expandableDiv?.matches('.expandable:not([matcher])')) {
        toggleExpandedDiv(expandableDiv, setting[obj.target.id]);
    }

    await chrome.storage.local.set(setting);
}

function restoreSetting(button, setting) {
    if (!button) return;

    const expandableDiv = button.parentElement.nextElementSibling;

    if (expandableDiv?.matches('.expandable:not([matcher])')) {
        expandableDiv.classList.remove('expanded');
        if (setting) toggleExpandedDiv(expandableDiv, setting);
    }

    if (button.type == 'checkbox') button.checked = setting;
    else button.value = setting.commandMetadata?.webCommandMetadata?.url || setting;
}

function showPopup(popup, button, centered) {
    document.body.appendChild(popup);
    openPopups.push(popup);
    popup.label = button.parentElement;
    popup.label.classList.add('open');
    popup.classList.add('popup');
    popup.clientWidth;
    popup.classList.add('open');

    if (centered) {
        popup.style = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transform-origin: 0 0;
        box-shadow: 0 0 0 100vh rgba(0, 0, 0, 0.6);
        `;
    } else {
        const vwTop = button.getBoundingClientRect().top + button.offsetHeight;

        if (vwTop + popup.offsetHeight > window.innerHeight) {
            popup.style.top = `calc(${(button.offsetTop + button.offsetHeight) - (popup.offsetHeight - (window.innerHeight - vwTop))}px - var(--spacing-2x))`;
        } else {
            popup.style.top = `${button.offsetTop + button.offsetHeight}px`;
        }

        popup.style.left = document.body.dir == 'rtl' ? button.offsetLeft : button.offsetLeft - popup.clientWidth + button.clientWidth;
    }

    if (popup.hasAttribute('tabindex')) {
        popup.addEventListener('transitionend', function () {
            popup.focus({ focusVisible: false });
        }, { once: true });
    }
}

function hidePopup() {
    const popup = openPopups[openPopups.length - 1];
    openPopups.splice(openPopups.indexOf(popup), 1);
    popup.classList.remove('open');
    popup.label.classList.remove('open');
    document.body.classList.remove('showOverlay');

    popup.addEventListener('transitionend', function () {
        popup.remove();
    }, { once: true });
}

function toggleExpandedDiv(div, value) {
    for (const child of div.children) {
        const matcher = child.getAttribute('matcher');
        if (matcher) {
            if (new RegExp(matcher).test(value)) {
                if (!child.matches('.expanded')) expandedClass(child, 'add', div.matches('.expanded'));
            }
            else if (child.matches('.expanded')) {
                expandedClass(child, 'remove', div.matches('.expanded'));
            }
        }
    }

    if (value && div.matches('.expanded')) return;
    expandedClass(div, 'toggle', div.clientWidth);

    function expandedClass(div, method, animateHeight) {
        if (animateHeight) {
            div.style.height = div.scrollHeight + 'px';

            div.addEventListener('transitionend', function () {
                div.style.height = '';
            }, { once: true });

            div.clientHeight;
            div.classList[method]('expanded');
        }

        else div.classList[method]('expanded');
    }
}

function handleTabClick(button) {
    button.parentElement.querySelector('[aria-selected]').removeAttribute('aria-selected');
    button.setAttribute('aria-selected', true);

    document.querySelector('.tabContent:not(.hidden)').classList.add('hidden');
    document.querySelector(`.tabContent:nth-child(${[...button.parentElement.children].indexOf(button) + 1}`).classList.remove('hidden');

    document.querySelector('.clearSearch').click();
    scrollTo({top: 0, behavior: 'instant'});
}

function exportSettings(button) {
    chrome.storage.local.get().then(function (data) {
        navigator.clipboard.writeText(JSON.stringify(data));

        button.ogTextContent = button.ogTextContent || button.previousElementSibling.textContent;
        button.previousElementSibling.textContent = chrome.i18n.getMessage('export_settings_feedback');

        setTimeout(function () {
            button.previousElementSibling.textContent = button.ogTextContent;
        }, 3000)
    });
}

async function importSettings(input) {
    const data = JSON.parse(input.value);
    await saveSetting(data);
    location.reload();
}

function handleSearch(input) {
    document.documentElement.classList.remove('searchMode');
    let els = document.querySelectorAll('label, section');
    for (const el of els) {
        el.classList.remove('hidden', 'tprBorder');
        if (el.children[0].matches('.tempHeading')) el.children[0].remove();
    }

    if (input?.value) {
        document.documentElement.classList.add('searchMode');
        const matcher = new RegExp(input.value.replaceAll(' ', '.*'), 'i');
        for (const el of els) el.classList.add('hidden');

        els = document.querySelectorAll('section > h4, label');
        for (let i = 0; i < els.length; i++) {
            if (matcher.test(els[i].textContent)) unhideSearcRelatedEl(els[i], i);
        }

        fixMessedUpSeparators();
    }

    function unhideSearcRelatedEl(el, index) {
        const section = el.closest('section')
        section.classList.remove('hidden');

        if (!(section.children[0].matches('.tempHeading'))) {
            const tab = document.querySelector(`.tabHeading:nth-child(${[...el.closest('main').children].indexOf(el.closest('.tabContent')) + 1}`).textContent;
            const h4 = document.createElement('H4');
            h4.classList.add('tempHeading');
            h4.textContent = tab + (section.children[0].tagName == 'H4' ? ' > ' + section.children[0].textContent : '');
            section.prepend(h4);
        }

        if (el.tagName == 'H4') {
            index++;

            for (; ;) {
                if (section.contains(els[index])) {
                    els[index].classList.remove('hidden');
                    els[index].parentElement.classList.remove('hidden');
                    index++
                } else break;
            }
        } else {
            el.classList.remove('hidden');

            if (el.attributes.section?.value == 'header') {
                unhideSectionContent(index);
            }
            else if (el.attributes.section?.value == 'content') {
                getSectionHeader(index).classList.remove('hidden');
            }

            let expandableDiv = el.nextElementSibling;

            if (expandableDiv?.matches('.expandable')) {
                index++;

                for (; ;) {
                    if (expandableDiv.contains(els[index])) {
                        els[index].classList.remove('hidden');
                        index++;
                    } else break;
                }
            }

            if (el.parentElement.matches('.expandable')) {
                expandableDiv = el.parentElement;

                for (; ;) {
                    if (expandableDiv.matches('[matcher]')) expandableDiv = expandableDiv.parentElement;

                    if (expandableDiv.matches('.expandable')) {
                        const prevSibling = expandableDiv.previousElementSibling;
                        prevSibling?.classList.remove('hidden');
                        expandableDiv = prevSibling.parentElement;
                    } else break;
                }
            }
        }
    }

    function getSectionHeader(index) {
        index--;
        let header = els[index];

        for (; ;) {
            if (header.attributes.section?.value == 'header') return header;
            else {
                index--;
                header = els[index];
            }
        }
    }

    function unhideSectionContent(index) {
        index++;
        let option = els[index];

        for (; ;) {
            if (option?.attributes.section?.value == 'content') {
                option.classList.remove('hidden');
                option.parentElement.classList.remove('hidden');
                index++
                option = els[index];
            } else break;
        }
    }

    function fixMessedUpSeparators() {
        for (const section of document.querySelectorAll('section')) {
            const children = section.querySelectorAll('label:not(.hidden)');
            children[0]?.classList.add('tprBorder');
        }
    }
}