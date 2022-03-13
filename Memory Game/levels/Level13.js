import Level from './Level.js';
import Matrix from '../Matrix.js';
import GoldStar from '../cards/GoldStar.js';
import Cube from '../cards/Cube.js';
import GreenSquare from '../cards/GreenSquare.js';
import RedTriangle from '../cards/RedTriangle.js';
import Bomb from '../cards/Bomb.js';
import BlueCircle from '../cards/BlueCircle.js';

class Level13 extends Level {

    totalMatches = 5;
    totalClicks = 10;
    congratsMessage = `This time I promise. The next level will not require perfection.`;

    constructor() {
        super();

        const arrayOfCards = [
            new Cube(),
            new Cube(),
            new GoldStar(),
            new GoldStar(),
            new GreenSquare(),
            new GreenSquare(),
            new RedTriangle(),
            new RedTriangle(),
            new Bomb(),
            new Bomb(),
            new BlueCircle(),
            new BlueCircle
        ];

        this.matrix = new Matrix(3, 4, arrayOfCards);
    }

}

export { Level13 };