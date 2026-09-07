import { hidePopup, showPopup, openPopups } from '/options/options.js';

class SetHotkeyButton extends HTMLButtonElement {
    constructor() {
        super();

        this.action = openDialog;

        const span = document.createElement('span');
        const placeholder = chrome.i18n.getMessage('set_hotkey');
        span.textContent = placeholder;
        this.prepend(span);

        let value;

        Object.defineProperty(this, 'value', {
            get() {
                return value;
            },
            set(arg) {
                this.children[0].textContent = arg || placeholder;
                if (arg && openPopups.length < 2 && !this.nextElementSibling?.matches('.unbind')) addUnbindButon(this);
                else if (!arg && this.nextElementSibling?.matches('.unbind')) this.nextElementSibling.remove();
                value = arg;
            },
            configurable: true
        });
    }
}

function addUnbindButon(button) {
    const unbind = document.createElement('button');
    unbind.classList.add('delete', 'unbind');
    unbind.title = chrome.i18n.getMessage('delete');
    unbind.setAttribute('arial-label', unbind.title);

    button.after(unbind);

    unbind.action = function() {
        button.value = '';
        unbind.remove();
        button.dispatchEvent(new Event('input', {
            bubbles: true
        }));
    };
}

function openDialog(e) {
    let keyBinder, strg;
    const button = this;

    button.blur();
    strg = '';

    const h4 = document.createElement('h4');
    keyBinder = document.createElement('div');
    keyBinder.textContent = chrome.i18n.getMessage('key_binder_instruction');
    h4.textContent = openPopups.length ? openPopups[0].label.children[0].childNodes[0].textContent : button.previousElementSibling.childNodes[0].textContent;
    keyBinder.id = 'keyBinder';
    keyBinder.setAttribute('tabindex', '0');
    keyBinder.appendChild(h4);

    keyBinder.addEventListener('keydown', function (e) {
        e.preventDefault();
        if (e.repeat) return;
        strg += strg ? '+' + e.code : e.code;
    });

    keyBinder.addEventListener('keyup', function () {
        for (const button of document.querySelectorAll('[is="set-hotkey"]')) {
            if (button.value == strg) {
                button.value = '';
                if (button.id) button.dispatchEvent(new Event('input', {
                    bubbles: true
                }));
                break;
            }
        }

        for (const button of document.querySelectorAll(`[listType^="hotkey"]`)) {
            if (button.value && strg in button.value) {
                delete button.value[strg];
                button.dispatchEvent(new Event('input', {
                    bubbles: true
                }));
                break;
            }
        }

        button.value = strg;
        button.dispatchEvent(new Event('input', {
            bubbles: true
        }));

        hidePopup();
        button.focus();
    }, { once: true });

    showPopup(keyBinder, button, true);
}

customElements.define('set-hotkey', SetHotkeyButton, { extends: 'button' });