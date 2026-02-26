import { saveSettings } from '/options/options.js';
export { getColorPicker };

let colorPicker, hsl;

function getColorPicker(button) {
    colorPicker = document.createElement('div');
    colorPicker.id = 'colorPicker';
    colorPicker.setAttribute('tabindex', '-1');

    colorPicker.insertAdjacentHTML('afterbegin', `
    <div style="--trackColor: linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(0, 100%, 50%))">
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

    colorPicker.addEventListener('input', function (e) {
        e.stopPropagation();
        updateUI(e.target);
        saveSetting(button);
    });

    updateUI({ value: button.style.getPropertyValue('--selectedColor') });
    return colorPicker;
}

function updateUI(obj) {
    hsl = [];

    if (obj.type == 'range') {
        for (let i = 0; i < 4; i++) {
            hsl.push(colorPicker.children[i].lastElementChild.value);
        }
    } else {
        if (obj.validity?.valid == false) return;
        hsl = obj.value.match(/\.\d+|\d+\.\d+|\d+/g);
    
        for (let i = 0; i < 4; i++) {
            colorPicker.children[i].lastElementChild.value = hsl[i];
        }
    }

    colorPicker.children[1].style.setProperty('--trackColor', `linear-gradient(to right, hsl(${hsl[0]}, 0%, ${hsl[2]}%), hsl(${hsl[0]}, 100%, ${hsl[2]}%))`);
    colorPicker.children[2].style.setProperty('--trackColor', `linear-gradient(to right, hsl(0, 0%, 0%), hsl(${hsl[0]}, ${hsl[1]}%, 50%), hsla(0, 0%, 100%))`);
    colorPicker.children[3].style.setProperty('--trackColor', `linear-gradient(to right, hsla(0, 0%, 0%, 0), hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`);
    colorPicker.lastElementChild.value = `${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%, ${hsl[3]}`;
}

function saveSetting(button) {
    if (!hsl.length) return;
    button.value = `hsla(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%, ${hsl[3]})`;
    button.style.setProperty('--selectedColor', `hsla(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%, ${hsl[3]})`);
    saveSettings({ [button.id]: button.value });
}