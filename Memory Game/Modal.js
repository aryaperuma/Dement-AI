export default class Modal {

    _id = undefined;
    _display = undefined;

    constructor(id) {
        this._id = id;
        this._display = document.getElementById(`${this._id}-content`);
        if (window.MicroModal.initialized === undefined) {
            this.initMicroModal();
            window.MicroModal.initialized = true;
        }
    }

    show(options) {
        this._display.innerHTML = options.message;
        MicroModal.show(this._id, options);
    }

    initMicroModal() {
        MicroModal.init({
            //onShow: modal => console.info(`${modal.id} is shown`), // [1]
            //onClose: modal => console.info(`${modal.id} is hidden`), // [2]
            //openTrigger: 'data-custom-open', // [3]
            //closeTrigger: 'data-custom-close', // [4]
            openClass: 'is-open', // [5]
            disableScroll: true, // [6]
            disableFocus: false, // [7]
            awaitOpenAnimation: true, // [8]
            awaitCloseAnimation: true, // [9]
            debugMode: false // [10]
        });
    }

}