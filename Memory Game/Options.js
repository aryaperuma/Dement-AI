export default class Options {

    _optionsDiv = document.getElementById('options');
    //_soundPlayer = undefined;
    _services = undefined;

    constructor(services) {
        this._services = services;
        this._optionsDiv.addEventListener('click', (e) => {
            this._handleClick(e)
        });
        this._optionsDiv.addEventListener('keydown', (e) => {
            this._handleKeydown(e)
        });
        this._tabbingEnabled(false);
    }

    _tabbingEnabled(status) {
        const tabIndex = status ? 0 : -1;
        // find all buttons in options content and set them to tabIndex
        const buttons = document.getElementById('options-content').querySelectorAll('button');
        buttons.forEach(button => {
            button.setAttribute('tabindex', tabIndex);
        });
    }

    _handleKeydown(e) {
        const key = e.keyCode || e.which;
        // escape
        if (key === 27) {
            this._tabbingEnabled(false);
            document.getElementById('options-button').setAttribute('aria-expanded', 'false');
            document.getElementById('options-content').setAttribute('aria-hidden', 'true');
            document.getElementById('options-button').focus();
            return false;
        }
    }

    _handleClick(e) {
        const target = e.target.id ? e.target : e.target.parentElement;

        if (target.id === 'options-button') {
            const newExpanded = target.getAttribute('aria-expanded') === 'true' ? false : true;
            target.setAttribute('aria-expanded', newExpanded);
            const content = document.getElementById('options-content');
            if (newExpanded) {
                content.setAttribute('aria-hidden', 'false');
                this._tabbingEnabled(true);
            }
            else {
                content.setAttribute('aria-hidden', 'true');
                this._tabbingEnabled(false);
            }
            return false;
        }
        
        if (target.id === 'options-close') {
            this._tabbingEnabled(false);
            document.getElementById('options-button').setAttribute('aria-expanded', 'false');
            document.getElementById('options-content').setAttribute('aria-hidden', 'true');
            document.getElementById('options-button').focus();
            return false;
        }

        // sounds
        if (typeof target.dataset.sound === 'string') {
            const checked = target.getAttribute('aria-checked') === 'true';
            if (checked) {
                target.setAttribute('aria-checked', false);
                this._services.soundPlayer.set(target.dataset.sound, false);
            }
            else {
                target.setAttribute('aria-checked', true);
                this._services.soundPlayer.set(target.dataset.sound, true);
            }
        }

    }


}