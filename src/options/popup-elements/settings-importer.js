import { saveSettings } from '/options/options.js';
export { getSettingsImporter };

function getSettingsImporter() {
    const importer = document.createElement('div');
    importer.id = 'importer';
    importer.textContent = 'Paste the exported settings into the box bellow';

    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('button');
    importer.appendChild(input);

    importer.addEventListener('input', async function (e) {
        e.stopPropagation();
        let data = JSON.parse(e.target.value);
        await saveSettings(data);
        location.reload(); 
    });

    importer.addEventListener('transitionend', function () {
        importer.lastElementChild.focus();
    }, { once: true });

    return importer;
}