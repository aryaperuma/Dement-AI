import Level from './Level.js';
import Matrix from '../Matrix.js';
import GreenSquare from '../cards/GreenSquare.js';
import RedCircle from '../cards/RedCircle.js';
import Empty from '../cards/Empty.js';
import GoldStar from '../cards/GoldStar.js';
import BlueSquare from '../cards/BlueSquare.js';

class Level3 extends Level {

    totalMatches = 4;
    congratsMessage = "Fantastic! You are getting the hang of this fast. Let's add a little danger.";

    constructor() {
        super();

        const arrayOfCards = [
            new GreenSquare(),
            new RedCircle(),
            new GoldStar(),
            new BlueSquare(),
            new Empty(),
            new GoldStar(),
            new BlueSquare(),
            new RedCircle(),
            new GreenSquare()
        ];

        this.matrix = new Matrix(3, 3, arrayOfCards, false);
    }

}

export { Level3 };