export default class Services {

    _services = new Map();

    constructor() {
        
    }

    add(name, object) {
        this._services.set(name, object);
        this[name] = object;
    }

}