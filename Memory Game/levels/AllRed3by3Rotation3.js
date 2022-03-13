import Level from './Level.js';
import Matrix from '../Matrix.js';
import RedCircle from '../cards/RedCircle.js';
import RedSquare from '../cards/RedSquare.js';
import RedTriangle from '../cards/RedTriangle.js';
import Heart from '../cards/Heart.js';
import Bomb from '../cards/Bomb.js';
import DementiaEvent from '../DementiaEvent.js';

class AllRed3by3Rotation3 extends Level {

    totalMatches = 4;
    showTimer = 3;
    playTimer = 7;
    skipShowCardsButton = true;
    totalClicks = 12;
    matches = 0;
    rotateLevel = 0;
    congratsMessage = 'Whew, that was tough. Congratulations on making it past all that spinning. I promise, no more 90 degree clockwise rotations for a while.'

    constructor(details = {}) {
        super();

        const arrayOfCards = [
            new RedTriangle(),
            new RedTriangle({ conceal: true }),
            new RedCircle({ conceal: true }),
            new RedCircle(),
            new Bomb(),
            new RedSquare({ conceal: true }),
            new RedSquare(),
            new Heart({ conceal: true }),
            new Heart()
        ];

        this.matrix = new Matrix(3, 3, arrayOfCards);
    }

    afterClick(details = {}) {
        const rotate = Math.floor(Math.random() * 10);
        if (rotate > 5 && details.matches !== 4) {
            DementiaEvent.dispatch('rotate-gameboard', {
                degrees: 90
            });
        }
        return true;
    }

}

export { AllRed3by3Rotation3 };