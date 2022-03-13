import Level from './Level.js';
import Matrix from '../Matrix.js';
import RedCircle from '../cards/RedCircle.js';
import RedSquare from '../cards/RedSquare.js';
import RedTriangle from '../cards/RedTriangle.js';
import Heart from '../cards/Heart.js';
import Bomb from '../cards/Bomb.js';
import DementiaEvent from '../DementiaEvent.js';

class AllRed3by3Rotation extends Level {

    totalMatches = 4;
    welcomeMessage = "OK, let's have a little fun.";
    playTimer = 10;
    matches = 0;
    rotateLevel = 0;
    congratsMessage = "Don't relax, things are going to speed up."
    nextLevel = '16a';

    constructor(details = {}) {
        super();

        const arrayOfCards = [
            new RedTriangle(),
            new RedTriangle(),
            new RedCircle(),
            new RedCircle(),
            new Bomb(),
            new RedSquare(),
            new RedSquare(),
            new Heart(),
            new Heart()
        ];

        this.matrix = new Matrix(3, 3, arrayOfCards);
    }

    afterClick(details = {}) {
        if (details.matches !== this.matches && this.rotateLevel !== details.matches) {
            this.rotateLevel = details.matches;
            DementiaEvent.dispatch('rotate-gameboard', {
                degrees: 90
            });
        }
        return true;
    }

}

export { AllRed3by3Rotation };