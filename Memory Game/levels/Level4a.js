import Level from './Level.js';
import Matrix from '../Matrix.js';
import GreenSquare from '../cards/GreenSquare.js';
import RedCircle from '../cards/RedCircle.js';
import Bomb from '../cards/Bomb.js';
import GoldStar from '../cards/GoldStar.js';
import BlueSquare from '../cards/BlueSquare.js';

class Level4a extends Level {

    totalMatches = 4;
    congratsMessage = `Excellent, you avoided the bomb. I'd keep doing that from now on. Let's make it even more treacherous.`;
    bombMessage = `It's OK, you learn by your mistakes. Or at least most people do.`;

    constructor() {
        super();
        
        const arrayOfCards = [
            new GreenSquare(),
            new RedCircle(),
            new GoldStar(),
            new BlueSquare(),
            new Bomb(this.bombMessage),
            new GoldStar(),
            new BlueSquare(),
            new RedCircle(),
            new GreenSquare()
        ];

        this.matrix = new Matrix(3, 3, arrayOfCards);
    }

}

export { Level4a };