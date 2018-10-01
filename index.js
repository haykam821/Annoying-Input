class CharSliderElement extends HTMLElement {
    constructor(obj) {
        super(...arguments);

        this.style.display = "block";

        this.mustReset = this.hasAttribute("must-reset") || false;
        this.confirm = this.hasAttribute("confirm") || false;
        
        this.childInput = document.createElement("input");

        this.childInput.type = "range";

        this.childInput.min = 31;
        this.childInput.max = 122;

        this.childInput.value = this.childInput.min;

        this.appendChild(this.childInput);

        const childLabel = document.createElement("button");
        childLabel.innerText = this.charCode(this.childInput.value)[1];
        this.appendChild(childLabel);

        this.appendChild(document.createElement("br"));

        this.childFinish = document.createElement("input");
        this.childFinish.type = this.hasAttribute("password") ? "password" : "text";

        this.childFinish.readOnly = true;
        this.appendChild(this.childFinish);

        this.childInput.addEventListener("input", event => {
            childLabel.innerText = this.charCode(this.childInput.value)[1];
        });
        childLabel.addEventListener("click", () => {
            if (this.confirm && !confirm("Are you sure?")) {
                return;
            }

            const rawVal = this.charCode(this.childInput.value)[0];

            switch (rawVal) {
                case null:
                    return this.childFinish.value = null;
                case "\b":
                    return this.childFinish.value = this.childFinish.value.slice(0, -1);
                default:
                    return this.childFinish.value += this.charCode(this.childInput.value)[0];
            }
        });
    }

    charCode(code) {
        switch (code) {
            case "31":
                return this.mustReset ? [null, "Reset"] : ["\b", "Backspace"];
            case "32":
                return [" ", "Space"];
            default:
                return [String.fromCharCode(code), String.fromCharCode(code)];
        }
    }

    get value() {
        return this.childFinish.value;
    }
}

window.customElements.define("char-slider", CharSliderElement);
