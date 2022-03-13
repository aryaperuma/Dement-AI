import Level from './Level.js';
import Matrix from '../Matrix.js';
import RedCircle from '../cards/RedCircle.js';
import RedSquare from '../cards/RedSquare.js';
import RedTriangle from '../cards/RedTriangle.js';
import Heart from '../cards/Heart.js';
import Bomb from '../cards/Bomb.js';
import DementiaEvent from '../DementiaEvent.js';

class AllRed3by3Rotation2 extends Level {

    totalMatches = 4;
    showTimer = 4;
    playTimer = 10;
    matches = 0;
    rotateLevel = 0;
    nextLevel = '16b';
    skipShowCardsButton = true;
    congratsMessage = "Hope you aren't getting dizzy.";

    constructor(details = {}) {
        super();

        const arrayOfCards = [
            new RedTriangle({conceal: true}),
            new RedTriangle(),
            new RedCircle(),
            new RedCircle({ conceal: true }),
            new Bomb(),
            new RedSquare(),
            new RedSquare({ conceal: true }),
            new Heart({ conceal: true }),
            new Heart()
        ];

        this.matrix = new Matrix(3, 3, arrayOfCards);
    }

    afterClick(details = {}) {
        const rotate = Math.floor(Math.random() * 10);
        if (rotate < 4 && details.matches !== 4) {
            DementiaEvent.dispatch('rotate-gameboard', {
                degrees: 90
            });
        }
        return true;
    }

}

export { AllRed3by3Rotation2 };