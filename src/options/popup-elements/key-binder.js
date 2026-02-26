import { saveSettings, handlePopupDisplay, openPopup } from '/options/options.js';
import { listUpdated } from '/options/popup-elements/list.js';

export { getKeyBinder };

function getKeyBinder(button) {
    let keyBinder, strg;

    button.blur();
    strg = '';

    const h4 = document.createElement('h4');
    keyBinder = document.createElement('div');
    keyBinder.textContent = 'Press a key or combination for ';
    h4.textContent = openPopup.length ? openPopup[0].label.children[0].childNodes[0].textContent : button.previousElementSibling.childNodes[0].textContent;
    keyBinder.id = 'keyBinder';
    keyBinder.setAttribute('tabindex', '0');
    keyBinder.appendChild(h4);

    keyBinder.addEventListener('keydown', function (e) {
        e.preventDefault();
        if (e.repeat) return;
        strg += strg ? '+' + e.code : e.code;
    });

    keyBinder.addEventListener('keyup', function () {
        let alreadyAssigned = document.querySelector(`.keyBinder[value="${strg}"]`);

        if (alreadyAssigned) {
            alreadyAssigned.value = '';
            if (alreadyAssigned.id) saveSettings({ [alreadyAssigned.id]: '' });
        }

        else {
            alreadyAssigned = document.querySelectorAll(`[listType^="hotkey"]`);
            for (const button of alreadyAssigned) {
                if (button.value?.[strg]) {
                    delete button.value[strg];
                    saveSettings({ [button.id]: Object.keys(button.value).length ? button.value : ''});
                }
            }
        }

        button.value = strg;
        if (openPopup.length > 1) listUpdated();
        else saveSettings({ [button.id]: strg }, button);

        handlePopupDisplay();
        button.focus();
    }, {once : true});

    return keyBinder;
}