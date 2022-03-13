export default class Storage {
    
    _localStorage = undefined;
    _active = false;
    _altStorageObj = {};

    constructor() {

        try {
            this._localStorage = window.localStorage;
            const x = '__storage_test__';
            this._localStorage.setItem(x, x);
            this._localStorage.removeItem(x);
            this._active = true;
        }
        catch (e) {
            throw e;
        }

    }

    get(key) {
        if (this._active) {
            try {
                return this._localStorage.getItem(key);
            }
            catch(e) {
                throw e;
            }
        }
        else {
            return this._altStorageObj[key];
        }
    }

    set(key, value) {
        if (this._active) {
            try {
                this._localStorage.setItem(key, value);
                console.log(`set "${key}" to "${value}" in localStorage`);
            }
            catch(e) {
                throw e;
            }
        }
        else {
            this._altStorageObj[key] = value;
        }
    }

}