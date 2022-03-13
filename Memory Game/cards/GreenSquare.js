import Card from './Card.js';

export default class GreenSquare extends Card {
    name = 'GreenSquare';

    constructor(options = {}) {
        super(options);
        this.image = 'greensquare.svg';
        this.size = '50%';
    }
}