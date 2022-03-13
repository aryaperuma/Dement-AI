import Card from './Card.js';

export default class GoldStar extends Card {
    name = 'GoldStar';
    
    constructor(options = {}) {
        super(options);
        this.image = 'goldstar.svg';
        this.size = '70%';
    }
}
