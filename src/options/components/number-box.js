class NumberBox extends HTMLInputElement {
    constructor() {
        super();
        
        const addButton = document.createElement('button');
        const subtractButton = document.createElement('button');
        addButton.classList.add('numInputBtn', 'plus');
        subtractButton.classList.add('numInputBtn', 'minus');

        this.after(subtractButton, addButton);
        subtractButton.action = addButton.action = buttonClicked;
    }
}

function buttonClicked(e) {
    const input = this.parentElement.children[1];
    if (this.matches('.plus')) {
        input.stepUp();
    } else {
        input.stepDown();
    }

    input.dispatchEvent(new Event('input', {
        bubbles: true
    }));
}

customElements.define('number-box', NumberBox, { extends: 'input' });