import Level from './Level.js';
import Matrix from '../Matrix.js';
import GreenTriangle from '../cards/GreenTriangle.js';
import RedCircle from '../cards/RedCircle.js';
import Bomb from '../cards/Bomb.js';
import GoldStar from '../cards/GoldStar.js';
import Cube from '../cards/Cube.js';

class Level8 extends Level {

    totalMatches = 4;
    congratsMessage = `No pressure. I guarantee that the play clock won't get any shorter.`;
    showTimer = 5;
    playTimer = 12;
    
    constructor(details, messages) {
        super(details, messages);
        
        const arrayOfCards = [
            new GreenTriangle(),
            new RedCircle(),
            new GoldStar(),
            new GoldStar(),
            new RedCircle(),
            new GreenTriangle(),
            new Bomb(),
            new Cube(),
            new Cube()
        ];

        this.matrix = new Matrix(3, 3, arrayOfCards);
    }

}

export { Level8 };