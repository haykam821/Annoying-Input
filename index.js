class CharSliderElement extends HTMLElement {
	constructor(...args) {
		super(...args);

		this.style.display = "block";

		this.mustReset = this.hasAttribute("must-reset") || false;
		this.confirm = this.hasAttribute("confirm") || false;
		this.shift = this.hasAttribute("shift") || false;

		this.childInput = document.createElement("input");
		this.childInput.disabled = this.shift;

		this.childInput.type = "range";

		this.childInput.min = 31;
		this.childInput.max = 122;

		this.childInput.value = this.childInput.min;

		if (this.shift) {
			this.leftButton = document.createElement("button");
			this.leftButton.innerText = "-";
			this.leftButton.addEventListener("click", () => {
				this.childInput.value -= 1;
				this.updateLabel();
			});

			this.append(this.leftButton);
		}

		this.append(this.childInput);

		if (this.shift) {
			this.rightButton = document.createElement("button");
			this.rightButton.innerText = "+";
			this.rightButton.addEventListener("click", () => {
				this.childInput.value = parseInt(this.childInput.value) + 1;
				this.updateLabel();
			});

			this.append(this.rightButton);
		}

		this.childLabel = document.createElement("button");
		this.childLabel.innerText = this.charCode(this.childInput.value)[1];
		this.append(this.childLabel);

		this.append(document.createElement("br"));

		this.childFinish = document.createElement("input");
		this.childFinish.type = this.hasAttribute("password") ? "password" : "text";

		this.childFinish.readOnly = true;
		this.append(this.childFinish);

		this.childInput.addEventListener("input", () => this.updateLabel());
		this.childLabel.addEventListener("click", () => {
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
				return [String.fromCodePoint(code), String.fromCodePoint(code)];
		}
	}

	updateLabel() {
		return this.childLabel.innerText = this.charCode(this.childInput.value)[1];
	}

	get value() {
		return this.childFinish.value;
	}
}

window.customElements.define("char-slider", CharSliderElement);
