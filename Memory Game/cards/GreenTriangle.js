import Card from './Card.js';

export default class GreenTriangle extends Card {
    name = 'GreenTriangle';
    
    constructor(options = {}) {
        super(options);
        this.image = 'greentriangle.svg';
        this.size = '60%';
    }
    
}