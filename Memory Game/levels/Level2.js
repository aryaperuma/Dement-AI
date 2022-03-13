import Level from './Level.js';
import Matrix from '../Matrix.js';
import RedTriangle from '../cards/RedTriangle.js';
import GreenSquare from '../cards/GreenSquare.js';
import BlueCircle from '../cards/BlueCircle.js';

class Level2 extends Level {

    totalMatches = 3;
    congratsMessage = "Excellent! Let's keep going. Even more cards.";

    constructor() {
        super();

        const arrayOfCards = [
            new RedTriangle(),
            new RedTriangle(),
            new BlueCircle(),
            new BlueCircle(),
            new GreenSquare(),
            new GreenSquare()
        ];

        this.matrix = new Matrix(2, 3, arrayOfCards);
    }

}

export { Level2 };