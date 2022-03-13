import Level from './Level.js';
import Matrix from '../Matrix.js';
import GreenTriangle from '../cards/GreenTriangle.js';
import RedCircle from '../cards/RedCircle.js';
import GoldStar from '../cards/GoldStar.js';
import Cube from '../cards/Cube.js';
import RedTriangle from '../cards/RedTriangle.js';
import BlueCircle from '../cards/BlueCircle.js';
import GreenSquare from '../cards/GreenSquare.js';
import BlueSquare from '../cards/BlueSquare.js';

class Level9 extends Level {

    totalMatches = 8;
    congratsMessage = `Great job! Take a deep breath and wipe that sweat off your brow. I'm sure that was the toughest it will ever get.`;
    showTimer = 8;
    playTimer = 18;
    
    constructor() {
        super();
        
        const arrayOfCards = [
            new GreenTriangle(),
            new RedCircle(),
            new GoldStar(),
            new GoldStar(),
            new RedCircle(),
            new GreenTriangle(),
            new Cube(),
            new Cube(),
            new RedTriangle(),
            new RedTriangle(),
            new BlueCircle(),
            new BlueCircle(),
            new GreenSquare(),
            new GreenSquare(),
            new BlueSquare(),
            new BlueSquare()
        ];

        this.matrix = new Matrix(4, 4, arrayOfCards);
    }

}

export { Level9 };