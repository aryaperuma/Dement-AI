import Level from './Level.js';
import Matrix from '../Matrix.js';
import GreenSquare from '../cards/GreenSquare.js';
import RedCircle from '../cards/RedCircle.js';
import Bomb from '../cards/Bomb.js';
import GoldStar from '../cards/GoldStar.js';

class Level5 extends Level {

    totalMatches = 3;
    congratsMessage = `Well done. For the next round, time is of the essence.`;
    
    constructor() {
        super();
        
        const arrayOfCards = [
            new GreenSquare(),
            new RedCircle(),
            new GoldStar(),
            new Bomb(),
            new Bomb(),
            new GoldStar(),
            new Bomb(),
            new RedCircle(),
            new GreenSquare()
        ];

        this.matrix = new Matrix(3, 3, arrayOfCards);
    }

}

export { Level5 };