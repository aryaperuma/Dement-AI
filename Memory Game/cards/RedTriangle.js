import Card from './Card.js';

export default class RedTriangle extends Card {
    name = 'RedTriangle';
    
    constructor(options = {}) {
        super(options);
        this.image = 'redtriangle.svg';
        this.size = '60%';
    }
    
}