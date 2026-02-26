import { saveSettings, handlePopupDisplay } from '/options/options.js';
export { getSelectMenu };

let selectMenu, popupTrigger, timeoutId;
let strg = '';

function getSelectMenu(button) {
    popupTrigger = button;

    selectMenu = button.lastElementChild.cloneNode(true);
    selectMenu.addEventListener('click', function (e) {
        e.stopPropagation();
        handleSelection(e.target);
    });

    const selectedOption = selectMenu.querySelector('.selected') || selectMenu.children[0];
    selectedOption.classList.add('focused');

    requestAnimationFrame(function () {
        selectMenu.scrollTo({
            top: selectedOption.offsetTop - selectMenu.clientHeight + selectedOption.offsetHeight + selectMenu.children[0].offsetTop
        });
    });

    return selectMenu;
}

function handleSelection(option) {
    if (option == selectMenu) return;

    popupTrigger.children[0].textContent = option.textContent;

    popupTrigger.querySelector('.selected')?.classList.remove('selected');
    popupTrigger.querySelector(`[value="${option.getAttribute('value')}"]`).classList.add('selected');

    saveSettings({ [popupTrigger.id]: option.getAttribute('value') }, popupTrigger);
    handlePopupDisplay();
}

document.addEventListener('keydown', function (e) {
    if (selectMenu?.isConnected && selectMenu.matches('.popup')) {
        if (e.key == 'Enter') {
            e.preventDefault();
            handleSelection(selectMenu.querySelector('.focused'));
        } else {
            if (e.key == 'Tab' || e.key == 'Dead') return;
            handleKeyboardNavOpen(e);
        }
    }
    else if (document.activeElement.matches('.selectMenu')) {
        if (e.key == 'Tab' || e.key == 'Enter' || e.key == 'Dead') return;
        handleKeyboardNavClosed(e);
    }
});

function handleKeyboardNavOpen(e) {
    const focusedOption = selectMenu.querySelector('.focused');

    if (e.key.includes('Arrow')) {
        e.preventDefault();
        let sibling = (e.key == 'ArrowDown' || e.key == 'ArrowRight') ? 'nextElementSibling' : 'previousElementSibling';
        if (focusedOption[sibling]) {
            addFocusToOption(focusedOption, focusedOption[sibling]);
        }
    } else {
        strg += e.key.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        if (strg[0] == ' ') {
            strg = '';
            return;
        } else e.preventDefault();
        if (strg[0] == strg[1]) strg = strg[0];

        for (const option of selectMenu.children) {
            if ((focusedOption.compareDocumentPosition(option) == 4 || strg.length > 1 && option == focusedOption) && option.textContent.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().startsWith(strg)) {
                addFocusToOption(focusedOption, option);
                break;
            } 
            else if (!option.nextElementSibling) {
                for (const option of selectMenu.children) {
                    if (option.textContent.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().startsWith(strg)) {
                        addFocusToOption(focusedOption, option);
                        break;
                    }
                }
            }
        }

        clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
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
        const yInverted = selectMenu.scrollHeight - (element.offsetTop + element.clientHeight);
        const scrollBottom = selectMenu.scrollHeight - selectMenu.scrollTop - selectMenu.clientHeight;

        if ((y - selectMenu.scrollTop) + element.offsetHeight > selectMenu.clientHeight) {
            selectMenu.scrollTo({
                top: selectMenu.scrollTop + element.offsetHeight + selectMenu.children[0].offsetTop - (selectMenu.clientHeight - (y - selectMenu.scrollTop))
            });
        } else if ((yInverted - scrollBottom) + element.offsetHeight > selectMenu.clientHeight) {
            selectMenu.scrollTo({
                top: selectMenu.scrollTop - (element.offsetHeight + selectMenu.children[0].offsetTop - (selectMenu.clientHeight - (yInverted - scrollBottom)))
            });
        }
    }
}

function handleKeyboardNavClosed(e) {
    selectMenu = document.activeElement.lastElementChild;
    popupTrigger = document.activeElement;
    const selectedOption = selectMenu.querySelector('.selected') || selectMenu.children[0];

    if (e.key.includes('Arrow')) {
        e.preventDefault();
        let sibling = (e.key == 'ArrowDown' || e.key == 'ArrowRight') ? 'nextElementSibling' : 'previousElementSibling';
        if (selectedOption[sibling]) handleSelection(selectedOption[sibling]);
    } else {
        strg += e.key.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        if (strg[0] == ' ') {
            strg = '';
            return;
        } else e.preventDefault();
        if (strg[0] == strg[1]) strg = strg[0];

        for (const option of selectMenu.children) {
            if ((selectedOption.compareDocumentPosition(option) == 4 || strg.length > 1 && option == selectedOption) && option.textContent.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().startsWith(strg)) {
                handleSelection(option);
                break;
            } 
            else if (!option.nextElementSibling) {
                for (const option of selectMenu.children) {
                    if (option.textContent.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().startsWith(strg)) {
                        handleSelection(option);
                        break;
                    }
                }
            }
        }

        clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
            strg = '';
        }, 500);
    }
}