import { hidePopup, showPopup } from '/options/options.js';

let menu, button, timeoutId;
let strg = '';

class SelectButton extends HTMLButtonElement {
    constructor() {
        super();

        this.role = 'combobox';
        this.setAttribute('aria-haspopup', 'listbox');
        this.action = openMenu;

        const selectedOption = this.querySelector('[selected]') || this.children[0].children[0];
        const span = document.createElement('span');
        span.textContent = selectedOption.textContent;
        this.appendChild(span);
        this.insertAdjacentHTML('beforeend', `
        <svg width="24" viewBox="0 0 24 24">
          <path d="m11.35 14.25-2.575-2.6q-.45-.45-.213-1.013t.863-.562h5.15q.625 0 .863.562.237.563-.188 1.013l-2.6 2.6q-.15.125-.312.2-.163.075-.338.075t-.337-.075-.313-.2"/>
        </svg>
        `);

        let value = selectedOption.attributes.value.value;

        Object.defineProperty(this, 'value', {
            get() {
                return value
            },
            set(arg) {
                this.children[1].textContent = this.querySelector(`[value="${arg}"`).textContent;
                value = arg;
            },
            configurable: true
        });
    }
}

customElements.define('select-button', SelectButton, { extends: 'button' });

function openMenu() {
    button = this;
    menu = button.children[0].cloneNode(true);
    menu.role = 'listbox';
    for (const option of menu.children) option.role = 'option';

    const selectedOption = menu.querySelector(`[value="${button.value}"`);
    selectedOption.classList.add('focused');
    selectedOption.setAttribute('aria-selected', true);
    selectedOption.tabIndex = '-1';

    menu.addEventListener('click', function (e) {
        e.stopPropagation();
        handleSelection(e.target);
    });

    menu.addEventListener('transitionstart', function () {
        menu.scrollTo({
            top: selectedOption.offsetTop - menu.clientHeight + selectedOption.offsetHeight + menu.children[0].offsetTop
        });
    }, { once: true });

    menu.addEventListener('transitionend', function () {
        selectedOption.focus({ focusVisible: false });
    }, { once: true });

    showPopup(menu, button);
}

function handleSelection(option) {
    if (option == menu) return;

    button.value = option.attributes.value.value;
    button.dispatchEvent(new Event('input', {
        bubbles: true
    }));

    hidePopup();
    button.focus();
}

document.addEventListener('keydown', function (e) {
    if (menu?.isConnected && menu.matches('.popup')) {
        if (e.key == 'Enter') {
            e.preventDefault();
            handleSelection(menu.querySelector('.focused'));
        } else {
            if (e.key == 'Tab' || e.key == 'Dead') return;
            handleKeyboardNav(e);
        }
    }
    else if (document.activeElement.matches('[is="select-button"]')) {
        if (e.key == 'Tab' || e.key == 'Enter' || e.key == 'Dead') return;
        menu = document.activeElement.children[0];
        button = document.activeElement;
        handleKeyboardNav(e, true);
    }
});

function handleKeyboardNav(e, closedMenu) {
    const focusedOption = closedMenu ? menu.querySelector(`[value="${button.value}"`) || menu.children[0] : menu.querySelector('.focused');

    if (e.key.includes('Arrow')) {
        e.preventDefault();
        let sibling = (e.key == 'ArrowDown' || e.key == 'ArrowRight') ? 'nextElementSibling' : 'previousElementSibling';
        if (focusedOption[sibling]) {
            closedMenu ? handleSelection(focusedOption[sibling]) : addFocusToOption(focusedOption, focusedOption[sibling]);
        }
    } else {
        strg += e.key.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        if (strg[0] == ' ') {
            strg = '';
            return;
        } else e.preventDefault();
        if (strg[0] == strg[1]) strg = strg[0];

        for (const option of menu.children) {
            if ((focusedOption.compareDocumentPosition(option) == 4 || strg.length > 1 && option == focusedOption) && option.textContent.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().startsWith(strg)) {
                closedMenu ? handleSelection(option) : addFocusToOption(focusedOption, option);
                break;
            }
            else if (!option.nextElementSibling) {
                for (const option of menu.children) {
                    if (option.textContent.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().startsWith(strg)) {
                        closedMenu ? handleSelection(option) : addFocusToOption(focusedOption, option);
                        break;
                    }
                }
            }
        }

        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            strg = '';
        }, 500);
    }

    function addFocusToOption(option, option2) {
        option.classList.remove('focused');
        option2.classList.add('focused');
        scrollIfOutOfView(option2);
    }

    function scrollIfOutOfView(element) {
        const y = element.offsetTop;
        const yInverted = menu.scrollHeight - (element.offsetTop + element.clientHeight);
        const scrollBottom = menu.scrollHeight - menu.scrollTop - menu.clientHeight;

        if ((y - menu.scrollTop) + element.offsetHeight > menu.clientHeight) {
            menu.scrollTo({
                top: menu.scrollTop + element.offsetHeight + menu.children[0].offsetTop - (menu.clientHeight - (y - menu.scrollTop))
            });
        } else if ((yInverted - scrollBottom) + element.offsetHeight > menu.clientHeight) {
            menu.scrollTo({
                top: menu.scrollTop - (element.offsetHeight + menu.children[0].offsetTop - (menu.clientHeight - (yInverted - scrollBottom)))
            });
        }
    }
}