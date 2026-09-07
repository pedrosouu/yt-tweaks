import { showPopup } from '/options/options.js';

let picker, button;

class ColorPickerButton extends HTMLButtonElement {
    constructor() {
        super();

        this.action = openPicker;
        this.classList.add('colorPicker');

        const checker = document.createElement('div');
        const selectedColor = document.createElement('div');
        checker.classList.add('checker');
        selectedColor.classList.add('selectedColor');
        this.append(checker, selectedColor);

        let value = this.value;

        selectedColor.style.background = value;

        Object.defineProperty(this, 'value', {
            get() {
                return value;
            },
            set(arg) {
                value = arg;
                selectedColor.style.background = arg;
            },
            configurable: true
        });
    }
}

function openPicker() {
    button = this;

    picker = document.createElement('div');
    picker.id = 'colorPicker';
    picker.setAttribute('tabindex', '-1');

    picker.insertAdjacentHTML('afterbegin', `
    <div style="--trackColor: linear-gradient(to right, ${document.body.dir == 'ltr' ? 'hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(0, 100%, 50%)' : 'hsl(0, 100%, 50%), hsl(300, 100%, 50%), hsl(240, 100%, 50%), hsl(180, 100%, 50%), hsl(120, 100%, 50%), hsl(60, 100%, 50%), hsl(0, 100%, 50%)'})">
      <div class="gradient"></div>
      <input min="0" max="360" type="range">
    </div>
    <div>
      <div class="gradient"></div>
      <input min="0" max="100" type="range">
    </div>
    <div>
      <div class="gradient"></div>
      <input min="0" max="100" type="range">
    </div>
    <div>
      <div class="track checker"></div>
      <div class="gradient"></div>
      <input min="0" max="1" step="0.01" type="range">
    </div>
    <input class="hsla button" type="text" pattern="(\\d+|\\d+\\.\\d+|\\.\\d+), (\\d+|\\d+\\.\\d+|\\.\\d+)%, (\\d+|\\d+\\.\\d+|\\.\\d+)%, (\\d+|\\d+\\.\\d+|\\.\\d+)$" spellcheck="false"></input>
    `);

    picker.addEventListener('input', function (e) {
        e.stopPropagation();
        updateUI(e.target);
    });

    picker.addEventListener('change', function() {
        button.dispatchEvent(new Event('input', {
            bubbles: true
        }));
    });

    updateUI(button);
    showPopup(picker, button);
}

let hsl;
function updateUI(obj) {
    hsl = [];

    if (obj.type == 'range') {
        for (let i = 0; i < 4; i++) {
            hsl.push(picker.children[i].lastElementChild.value);
        }
    } else {
        if (obj.validity?.valid == false) return;
        hsl = obj.value.match(/\.\d+|\d+\.\d+|\d+/g);

        for (let i = 0; i < 4; i++) {
            picker.children[i].lastElementChild.value = hsl[i];
        }
    }

    button.value = `hsla(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%, ${hsl[3]})`;

    picker.children[1].style.setProperty('--trackColor', `linear-gradient(to right, ${document.body.dir == 'rtl' ? `hsl(${hsl[0]}, 100%, ${hsl[2]}%), hsl(${hsl[0]}, 0%, ${hsl[2]}%)` : `hsl(${hsl[0]}, 0%, ${hsl[2]}%), hsl(${hsl[0]}, 100%, ${hsl[2]}%)`}`);
    picker.children[2].style.setProperty('--trackColor', `linear-gradient(to right, ${document.body.dir == 'rtl' ? `hsla(0, 0%, 100%), hsl(${hsl[0]}, ${hsl[1]}%, 50%), hsl(0, 0%, 0%)` : `hsl(0, 0%, 0%), hsl(${hsl[0]}, ${hsl[1]}%, 50%), hsla(0, 0%, 100%))`}`);
    picker.children[3].style.setProperty('--trackColor', `linear-gradient(to right, ${document.body.dir == 'rtl' ? `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%), hsla(0, 0%, 0%, 0)` : `hsla(0, 0%, 0%, 0), hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`}`);
    picker.lastElementChild.value = `${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%, ${hsl[3]}`;
}

customElements.define('color-picker', ColorPickerButton, { extends: 'button' });