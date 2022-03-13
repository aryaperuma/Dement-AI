import Card from './Card.js';

export default class Empty extends Card {

    name = 'Empty';
    color = 'transparent';
 
    constructor() {
        super();
        this.empty = true;
        this._button = document.createElement('div');
        this._button.classList.add('gb-empty');
        this._button.style.backgroundColor = this.color;
    }

}