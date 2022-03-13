import Level from './Level.js';
import Matrix from '../Matrix.js';
import GoldStar from '../cards/GoldStar.js';
import Cube from '../cards/Cube.js';
import GreenSquare from '../cards/GreenSquare.js';
import Empty from '../cards/Empty.js';
import RedTriangle from '../cards/RedTriangle.js';

class Level12 extends Level {

    totalMatches = 4;
    totalClicks = 8;
    congratsMessage = `OK, maybe we did want one more perfect game. I can't see us doing that three times in row.`;

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
            new Empty()
        ];

        this.matrix = new Matrix(3, 3, arrayOfCards);
    }

}

export { Level12 };