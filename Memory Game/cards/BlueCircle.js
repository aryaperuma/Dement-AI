import Card from './Card.js';

export default class BlueCircle extends Card {
    name = 'BlueCircle';
    
    constructor(options = {}) {
        super(options);
        this.image = 'bluecircle.svg';
        this.size = '60%';
    }
    
}