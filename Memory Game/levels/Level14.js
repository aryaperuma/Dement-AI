import Level from './Level.js';
import Matrix from '../Matrix.js';
import GoldStar from '../cards/GoldStar.js';
import Cube from '../cards/Cube.js';
import GreenSquare from '../cards/GreenSquare.js';
import RedTriangle from '../cards/RedTriangle.js';
import Bomb from '../cards/Bomb.js';
import BlueCircle from '../cards/BlueCircle.js';
import BlueSquare from '../cards/BlueSquare.js';
import GreenTriangle from '../cards/GreenTriangle.js';

class Level14 extends Level {

    totalMatches = 7;
    totalClicks = 24;
    showTimer = 10;
    playTimer = 20;

    constructor() {
        super();

        const arrayOfCards = [
            new Cube(),
            new Cube(),
            new GoldStar(),
            new GoldStar(),
            new GreenSquare({ conceal: true }),
            new GreenSquare({ conceal: true }),
            new RedTriangle(),
            new RedTriangle(),
            new Bomb(),
            new Bomb(),
            new BlueCircle({ conceal: true }),
            new BlueCircle({ conceal: true }),
            new BlueSquare(),
            new BlueSquare(),
            new GreenTriangle(),
            new GreenTriangle()
        ];

        this.matrix = new Matrix(4, 4, arrayOfCards);
    }

}

export { Level14 };