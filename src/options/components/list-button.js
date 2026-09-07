import { showPopup } from '/options/options.js';

let list, listType, button;

class ListButton extends HTMLButtonElement {
    constructor() {
        super();

        this.action = openList;
        
        const span = document.createElement('span');
        span.textContent = this.attributes.listType?.value == 'hotkey+number' ? chrome.i18n.getMessage('hotkeys') : '';
        this.prepend(span);

        let value;
    
        Object.defineProperty(this, 'value', {
            get() {
                return value;
            },
            set(arg) {
                value = arg;
            },
            configurable: true
        });
    }
}

function openList() {
    button = this;
    listType = button.attributes.listType?.value;

    list = document.createElement('div');
    list.id = 'list';
    list.setAttribute('tabindex', '-1');
    list.insertAdjacentHTML('afterbegin', `
    <button class="close" title="${chrome.i18n.getMessage('close')}" aria-label="${chrome.i18n.getMessage('close')}"></button>
    <search class="list">
      <input is="search-box">
    </search>
    </div>
      <div class="listItems">
    </div>
    `);

    list.addEventListener('click', function (e) {
        if (e.target.closest('.delete')) {
            e.stopPropagation();
            e.target.closest('.listItem').remove();
            listUpdated();
        }
    });

    list.addEventListener('input', function (e) {
        e.stopPropagation();
        if (e.target.matches('.search')) handleSearch(e);
        else listUpdated();
    }, true);

    if (button.hasAttribute('enablesearch')) list.classList.add('enableSearch');

    restoreList();
    showPopup(list, button, true);
}

function restoreList() {
    for (const key in button.value) addItem(document.createElement('div'), key, button.value[key]);
    addItem(document.createElement('div'));
}

function addItem(item, value1, value2) {
    item.classList.add('listItem');

    if (listType == 'text+number') item.append(getTextInput(value1), getNumberInput(value2));

    else if (listType == 'hotkey+number') item.append(getSetHotkeyBtn(value1), getNumberInput(value2));

    else item.appendChild(getTextInput(value2));

    item.insertAdjacentHTML('beforeend', `<button class="tinted delete" title="${chrome.i18n.getMessage('delete')}" aria-label="${chrome.i18n.getMessage('delete')}"></button>`);

    list.lastElementChild.appendChild(item);
}

function listUpdated() {
    button.value = listType?.includes('+') ? {} : [];

    const itemsContainer = list.lastElementChild;
    const items = itemsContainer.querySelectorAll('.listItem');

    for (const item of items) if (item.children[0].value) {
        if (listType?.includes('+')) button.value[item.children[0].value] = item.children[1].valueAsNumber || item.children[1].value;
        else button.value.push(item.children[0].value);
    }

    if (items[items.length - 1]?.children[0].value || !items.length) {
        addItem(document.createElement('div'));
        list.scrollTo({ top: list.scrollHeight });
    }

    if (!Object.keys(button.value).length) button.value = '';
    button.dispatchEvent(new Event('input', {
        bubbles: true
    }));
}

function handleSearch(e) {
    const els = list.querySelectorAll('.listItem');
    for (const el of els) el.classList.remove('hidden');

    if (e.target.value) {
        const matcher = new RegExp(e.target.value.replaceAll(' ', '.*'), 'i');
        for (const el of els) {
            if (!matcher.test(el.children[0].value + el.children[1].value)) el.classList.add('hidden');
        }
    }
}

function getNumberInput(value) {
    const number = document.createElement('input');
    number.classList.add('button', 'list');
    number.type = 'number';
    number.placeholder = button.getAttribute('number-placeholder') ?? '';
    number.title = button.getAttribute('number-title') ?? '';
    number.min = button.getAttribute('number-min') ?? '';
    number.step = button.getAttribute('number-step') ?? '';
    number.value = value ?? button.getAttribute('number-value') ?? '';

    return number;
}

function getTextInput(value) {
    const text = document.createElement('input');
    text.classList.add('button', 'list');
    text.type = 'text';
    text.spellcheck = false;
    text.placeholder = button.getAttribute('text-placeholder') ?? '';
    text.title = button.getAttribute('text-title') ?? '';
    text.value = value ?? button.getAttribute('text-value') ?? '';

    return text;
}

function getSetHotkeyBtn(value) {
    const button = document.createElement('button', { is: 'set-hotkey' });
    button.setAttribute('is', 'set-hotkey');
    if (value) button.value = value;

    return button;
}

customElements.define('list-button', ListButton, { extends: 'button' });