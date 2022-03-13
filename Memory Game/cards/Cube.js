import Card from './Card.js';

export default class Cube extends Card {
    name = 'Cube';

    constructor(options = {}) {
        super(options);
        this.image = 'cube.svg';
        this.size = '50%';
    }
}