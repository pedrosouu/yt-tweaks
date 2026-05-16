import { saveSettings } from '/options/options.js';

export { getList, listUpdated };

let list, listType, popupTrigger;

function getList(button) {
    popupTrigger = button;
    listType = button.attributes.listType?.value;

    list = document.createElement('div');
    list.id = 'list';
    list.setAttribute('tabindex', '-1');
    list.insertAdjacentHTML('afterbegin', `
    <button class="close" title="Close"></button>
      <search class="list">
        <input class="search button" placeholder="Search" type="text">
        <svg class="clearSearch" viewBox="0 0 24 24">
          <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"></path>
        </svg>
        <svg class="searchIcon" viewBox="0 0 17 17">
          <path d="M.136 6.975c0 .896.17 1.738.508 2.528a6.58 6.58 0 0 0 3.481 3.481c.786.335 1.63.502 2.533.502.69 0 1.35-.102 1.979-.307a6.519 6.519 0 0 0 1.733-.862l3.814 3.825c.11.103.23.178.36.226.129.048.262.072.399.072.3 0 .547-.1.738-.298.192-.198.287-.448.287-.748a1.068 1.068 0 0 0-.287-.739l-3.794-3.804c.404-.54.718-1.14.944-1.8.225-.66.338-1.351.338-2.076 0-.902-.17-1.746-.508-2.533a6.64 6.64 0 0 0-1.4-2.076A6.52 6.52 0 0 0 9.186.961 6.348 6.348 0 0 0 6.658.454c-.903 0-1.747.169-2.533.507A6.597 6.597 0 0 0 2.05 2.366 6.597 6.597 0 0 0 .644 4.442a6.337 6.337 0 0 0-.508 2.533Zm1.58 0a4.885 4.885 0 0 1 1.44-3.496 5.036 5.036 0 0 1 1.58-1.062 4.829 4.829 0 0 1 1.922-.384c.683 0 1.323.128 1.917.384.595.257 1.12.61 1.574 1.062.455.45.81.975 1.067 1.574.256.598.384 1.239.384 1.922 0 .684-.128 1.323-.384 1.918a5.01 5.01 0 0 1-1.067 1.574 5.01 5.01 0 0 1-1.574 1.066 4.792 4.792 0 0 1-1.917.385 4.829 4.829 0 0 1-1.923-.385 4.993 4.993 0 0 1-2.64-2.64 4.848 4.848 0 0 1-.38-1.918Z"></path>
        </svg>
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
    return list;
}

function restoreList() {
    if (listType?.includes('+')) for (const key in popupTrigger.value) {
        addItem(document.createElement('div'), key, popupTrigger.value[key]);
    }

    else for (const value of popupTrigger.value) {
        addItem(document.createElement('div'), value);
    }

    addItem(document.createElement('div'));
}

function addItem(item, value1, value2) {
    item.classList.add('listItem');

    if (listType == 'text+number') item.append(getTextInput(value1), getNumberInput(value2));

    else if (listType == 'hotkey+number') item.append(getSetHotkeyBtn(value1), getNumberInput(value2));

    else item.appendChild(getTextInput(value1));

    item.insertAdjacentHTML('beforeend', `<button class="tinted delete iconButton" title="Delete"></button>`);

    list.lastElementChild.appendChild(item);
}

function listUpdated() {
    Object.defineProperty(popupTrigger, 'value', {
        value: listType?.includes('+') ? {} : [],
        configurable: true
    });

    const itemsContainer = list.lastElementChild;
    const items = itemsContainer.querySelectorAll('.listItem');

    if (listType?.includes('+')) {
        for (const item of items) {
            if (item.children[0].value) popupTrigger.value[item.children[0].value] = item.children[1].valueAsNumber || '';
        }
    }

    else {
        for (const item of items) {
            if (item.children[0].value) popupTrigger.value.push(item.children[0].value);
        }
    }

    if (items[items.length - 1]?.children[0].value || !items.length) {
        addItem(document.createElement('div'));
        list.scrollTo({ top: list.scrollHeight });
    }

    saveSettings({ [popupTrigger.id]: Object.keys(popupTrigger.value).length ? popupTrigger.value : ''});
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
    number.placeholder = popupTrigger.getAttribute('number-placeholder') ?? '';
    number.title = popupTrigger.getAttribute('number-title') ?? '';
    number.min = popupTrigger.getAttribute('number-min') ?? '';
    number.step = popupTrigger.getAttribute('number-step') ?? '';
    number.value = value ?? popupTrigger.getAttribute('number-value') ?? '';

    return number;
}

function getTextInput(value) {
    const text = document.createElement('input');
    text.classList.add('button', 'list');
    text.type = 'text';
    text.spellcheck = false;
    text.placeholder = popupTrigger.getAttribute('text-placeholder') ?? '';
    text.title = popupTrigger.getAttribute('text-title') ?? '';
    if (value) text.value = value;

    return text;
}

function getSetHotkeyBtn(value) {
    const button = document.createElement('button');
    button.classList.add('keyBinder', 'openPopup');
    button.setAttribute('placeholder', 'Set hotkey');
    if (value) button.value = value;

    return button;
}