import Level from './Level.js';
import Matrix from '../Matrix.js';
import GreenTriangle from '../cards/GreenTriangle.js';
import RedCircle from '../cards/RedCircle.js';
import Bomb from '../cards/Bomb.js';
import GoldStar from '../cards/GoldStar.js';
import BlueSquare from '../cards/BlueSquare.js';


class Level6 extends Level {

    totalMatches = 4;
    congratsMessage = `No pressure. I'm sure the countdowns won't get any quicker.`;
    showTimer = 10;
    
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
            new GreenTriangle()
        ];

        this.matrix = new Matrix(3, 3, arrayOfCards);
    }

}

export { Level6 };