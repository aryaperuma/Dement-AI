import Card from './Card.js';

export default class BlueSquare extends Card {
    name = 'BlueSquare';
    
    constructor(options = {}) {
        super(options);
        this.image = 'bluesquare.svg';
        this.size = '50%';
    }
}