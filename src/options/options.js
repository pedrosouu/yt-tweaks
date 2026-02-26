import { getSelectMenu } from '/options/popup-elements/select-menu.js';
import { getColorPicker } from '/options/popup-elements/color-picker.js';
import { getKeyBinder } from '/options/popup-elements/key-binder.js';
import { getList } from '/options/popup-elements/list.js';
import { getSettingsImporter } from '/options/popup-elements/settings-importer.js';

export { handlePopupDisplay, saveSettings, exportSettings, openPopup};

let timeoutId;
const openPopup = [];

chrome.storage.local.get().then(function (settings) {
    for (const key in settings) {
        applySettingsToUI(document.getElementById(key), key, settings);
    }
});

document.addEventListener('click', function(e) {
    let button;
    
    if (button = e.target.closest('.removeSetting')) {
        removeSettingBtnClicked(button);
    }

    else if (openPopup.length && !openPopup[openPopup.length - 1].contains(e.target) || e.target.closest('.close')) {
        e.preventDefault();
        handlePopupDisplay();
    }

    else if (button = e.target.closest('.openPopup')) {
        handlePopupDisplay(button);
    }

    else if (button = e.target.closest('.openPage')) {
        if (button.attributes.htmlFile) window.open(chrome.runtime.getURL(button.attributes.htmlFile.value), '_blank');
        else window.open(navigator.userAgent.includes('Firefox') ? button.attributes.firefox.value : navigator.userAgent.includes('Edg') ? button.attributes.edge.value : button.attributes.chrome.value, '_blank');
        e.preventDefault();
    }

    else if (button = e.target.closest('.expand')) {
        button.toggleAttribute('rotated');
        toggleExpandedDiv(button.parentElement.nextElementSibling);
    }

    else if (e.target.closest('.clearSearch')) {
        let input = e.target.closest('search').children[0];
        input.value = '';
        input.dispatchEvent(new Event('input', {
            bubbles: true
        }));
    }

    else if (button = e.target.closest('.export')) {
        exportSettings(button);
    }
});

document.addEventListener('input', function(e) {
    if (e.target.matches('.search')) handleSearch(e.target);
    else saveSettings(0, 0, e);
});

document.addEventListener('focus', function handler() {
    if (openPopup.length && !document.activeElement.closest('.popup')) {
        openPopup[openPopup.length - 1].label.children[1].focus();
        handlePopupDisplay();
    }
}, true);

document.addEventListener('mousedown', function(e) {
    if (e.target.matches('.numInputBtn')) {
        const input = e.target.closest('label').children[1];
        if (e.target.matches('.plus')) {
            input.stepUp();
            timeoutId = setTimeout(function() {
                timeoutId = setInterval(function() {
                    input.stepUp();
                }, 35);
            }, 150);
        } else {
            input.stepDown();
            timeoutId = setTimeout(function() {
                timeoutId = setInterval(function() {
                    input.stepDown();
                }, 35);
            }, 150);
        }
    }
});

document.addEventListener('mouseup', function(e) {
    clearTimeout(timeoutId);
    if (e.target.matches('.numInputBtn')) {
        const input = e.target.parentElement.children[1];
        saveSettings({[input.id]: input.valueAsNumber});
    }
});

async function saveSettings(settings, target, event) {
    if (event) {
        settings = { [event.target.id]: event.target.type == 'checkbox' ? event.target.checked : event.target.type == 'number' ? event.target.valueAsNumber : event.target.value };
        target = event.target;
    }

    const expandableDiv = target?.parentElement.nextElementSibling;

    if (expandableDiv?.matches('.expandable:not([matcher])')) {
        toggleExpandedDiv(expandableDiv, settings[target.id]);
    }

    await chrome.storage.local.set(settings);
}

function applySettingsToUI(button, key, data) {
    if (!button) return;

    const expandableDiv = button.parentElement.nextElementSibling;

    if (expandableDiv?.matches('.expandable:not([matcher])')) {
        expandableDiv.classList.remove('expanded');
        if (data[key]) toggleExpandedDiv(expandableDiv, data[key]);
    }

    if (button.type == 'checkbox') button.checked = data[key];

    switch (button.classList[0]) {
        case 'selectMenu':
            const selectedOption = button.querySelector(`[value="${data[key]}"]`);
            button.children[0].textContent = selectedOption?.textContent;
            button.querySelector('.selected')?.classList.remove('selected');
            selectedOption?.classList.add('selected');
            break;

        case 'colorPicker':
            button.style.setProperty('--selectedColor', data[key]);
            break;
        
        case 'page':
            button.value = data[key].commandMetadata?.webCommandMetadata?.url || data[key];
            break;

        default :
            if (typeof data[key] == 'object') {
                Object.defineProperty(button, 'value', {
                    value: data[key],
                    configurable: true
                });
            } else {
                button.value = data[key];
            }
    }
}

function handlePopupDisplay(button) {
    if (!button) {
        return hidePopup(openPopup[openPopup.length - 1]);
    }

    switch (button.classList[0]) {
        case 'selectMenu':
            showPopup(getSelectMenu(button), button);
            break;

        case 'colorPicker':
            showPopup(getColorPicker(button), button);
            break;

        case 'keyBinder':
            showPopup(getKeyBinder(button), button, true);
            break;

        case 'list':
            showPopup(getList(button), button, true);
            break;

        case 'import':
            showPopup(getSettingsImporter(button), button);
    }
}

function showPopup(popup, button, centered) {
    document.body.appendChild(popup);
    openPopup.push(popup);
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
            popup.style.top = `${(button.offsetTop + button.offsetHeight) - (popup.offsetHeight - (window.innerHeight - vwTop)) - document.body.children[0].offsetTop}px`;
        } else {
            popup.style.top = `${button.offsetTop + button.offsetHeight}px`;
        }
    }

    if (popup.hasAttribute('tabindex')) {
        popup.addEventListener('transitionend', function () {
            popup.focus();
        }, { once: true });
    }
}

function hidePopup(popup) {
    if (!popup) return;

    openPopup.splice(openPopup.indexOf(openPopup[openPopup.length - 1]), 1);
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
    expandedClass(div, 'toggle', true);

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

function removeSettingBtnClicked(button) {
    const prevSibling = button.previousElementSibling;
    prevSibling.value = '';
    prevSibling.focus();
    saveSettings({ [prevSibling.id]: ''}, prevSibling);
}

function exportSettings(button) {
    chrome.storage.local.get().then(function (data) {
        navigator.clipboard.writeText(JSON.stringify(data));

        button.previousElementSibling.textContent = 'Settings copied to clipboard!';

        setTimeout(function () {
            button.previousElementSibling.textContent = 'Export';
        }, 3000)
    });
}

function handleSearch(input) {
    document.documentElement.classList.remove('searchMode');
    let els = document.querySelectorAll(`label, section`);
    for (const el of els) el.classList.remove('hidden', 'tprBorder');

    if (input?.value) {
        document.documentElement.classList.add('searchMode');
        const matcher = new RegExp(input.value.replaceAll(' ', '.*'), 'i');
        for (const el of els) el.classList.add('hidden');

        els = document.querySelectorAll(`section > h4, label`);
        for (let i = 0; i < els.length; i++) {
            if (matcher.test(els[i].textContent)) unhideSearcRelatedEl(els[i], i);
        }
        
        fixMessedUpSeparators();
    }

    function unhideSearcRelatedEl(el, index) {
        el.closest('section').classList.remove('hidden');

        if (el.tagName == 'H4') {
            index++;

            for (; ;) {
                if (els[index]?.tagName == 'LABEL') {
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