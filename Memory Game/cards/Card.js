export default class Card {
    // define name in subclasses
    // name;
    empty = false;
    disabled = false;
    _button = undefined;
    _back = undefined;
    _conceal = false;

    constructor(options = {}) {
        this._button = document.createElement('button');
        this._conceal = (options?.conceal === true); 

        let front = document.createElement('span');
        front.classList.add('front');

        this._back = document.createElement('span');
        this._back.classList.add('back');
        this._back.style.backgroundRepeat = `no-repeat`;
        this._back.style.backgroundPosition = 'center';
        this._back.style.backgroundSize = '50%';

        this._button.appendChild(front);
        this._button.appendChild(this._back);

        // cards are hidden by default
        this.hide({ tabindex: -1, disabled: true });
    }

    set image(imgFile) {
        this._back.style.backgroundImage = `url(images/${imgFile})`;
    }

    set size(sz) {
        this._back.style.backgroundSize = sz;
    } 

    get dom() {
        return this._button;
    }

    disappear() {
        this._button.style.display = 'none';
    }

    // This sets the actual disabled attribute on the button to prevent
    // focus from being set on the button.
    setDisabledAttribute(bool) {
        this._button.disabled = bool;
    }

    show(options) {
        if (this.empty) {
            return;
        }

        const tabindex = options.tabindex || 0;
        this.disabled = options.disabled === true || false ? options.disabled : false;
        
        this._button.setAttribute('tabindex', tabindex);
        this._button.dataset.disabled = this.disabled;

        if (options.conceal && this._conceal) {
            this._button.classList.add('conceal');
        }
        else {
            this._button.classList.remove('hide');
            this._button.classList.add('show');
        }
    }

    hide(options) {
        if (this.empty) {
            return;
        }

        const tabindex = options.tabindex || 0;
        this.disabled = options.disabled === true || false ? options.disabled : false;

        this._button.classList.remove('show', 'conceal');
        this._button.classList.add('hide');
        this._button.setAttribute('tabindex', tabindex);
        this._button.dataset.disabled = this.disabled;

        if (this.empty) {
            this.button.disabled = true;
        }
    }

    isShowing() {
        return this._button.classList.contains('show');
    }

}