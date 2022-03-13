import Level from './Level.js';
import Matrix from '../Matrix.js';
import GoldStar from '../cards/GoldStar.js';
import Cube from '../cards/Cube.js';
import Empty from '../cards/Empty.js';
import BlueCircle from '../cards/BlueCircle.js';
import RedTriangle from '../cards/RedTriangle.js';
import DementiaEvent from '../DementiaEvent.js';

class FirstRotation extends Level {

    totalMatches = 4;
    levelDetails = undefined;
    welcomeMessage = "Let's get back to the basics, shall we? A simple 3x3 grid with no bombs, no time constraints, no click limits. Only four matches to memorize. What could possibly be so hard?";
    rotated = false;

    constructor(details = {}) {
        super();
        this.levelDetails = details;

        console.log(this.levelDetails);

        const arrayOfCards = [
            new Cube(),
            new Cube(),
            new GoldStar(),
            new GoldStar(),
            new Empty(),
            new BlueCircle(),
            new BlueCircle(),
            new RedTriangle(),
            new RedTriangle()
        ];

        this.matrix = new Matrix(3, 3, arrayOfCards);
    }

    afterClick(details = {}) {
        if (details.matches === 2 && !this.rotated) {
            this.rotated = true;
            DementiaEvent.dispatch('rotate-gameboard', {
                degrees: 90,
                message: 'No, you are not experiencing vertigo. The gameboard did rotate clockwise. I don\'t know about you, but that just seems a little bit unfair.',
                from: details.card.dom
            });
        }
        return true;
    }

}

export { FirstRotation };