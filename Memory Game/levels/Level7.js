import Level from './Level.js';
import Matrix from '../Matrix.js';
import GreenTriangle from '../cards/GreenTriangle.js';
import RedCircle from '../cards/RedCircle.js';
import Bomb from '../cards/Bomb.js';
import GoldStar from '../cards/GoldStar.js';
import BlueSquare from '../cards/BlueSquare.js';
import Cube from '../cards/Cube.js';

class Level7 extends Level {

    totalMatches = 5;
    congratsMessage = `Wow, that was a tough one. Good thing you had plenty of time to find your matches.`;
    showTimer = 7;
    
    constructor() {
        super();
        
        const arrayOfCards = [
            new GreenTriangle(),
            new RedCircle(),
            new GoldStar(),
            new BlueSquare(),
            new Bomb(),
            new GoldStar(),
            new BlueSquare(),
            new RedCircle(),
            new GreenTriangle(),
            new Bomb(),
            new Cube(),
            new Cube()
        ];

        this.matrix = new Matrix(3, 4, arrayOfCards);
    }

}

export { Level7 };