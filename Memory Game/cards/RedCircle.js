import Card from './Card.js';

export default class RedCircle extends Card {
    name = 'RedCircle';
    
    constructor(options = {}) {
        super(options);
        this.image = 'redcircle.svg';
        this.size = '50%';
    }
    
}