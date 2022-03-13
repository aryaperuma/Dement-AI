import Card from './Card.js';

export default class RedSquare extends Card {
    name = 'RedSquare';

    constructor() {
        super();
        this.image = 'redsquare.svg';
        this.size = '50%';
    }
}