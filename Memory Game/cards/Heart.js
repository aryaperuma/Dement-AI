import Card from './Card.js';

export default class Heart extends Card {
    name = 'Heart';

    constructor() {
        super();
        this.image = 'heart.svg';
        this.size = '60%';
    }
}