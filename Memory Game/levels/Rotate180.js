import Level from './Level.js';
import Matrix from '../Matrix.js';
import BlueCircle from '../cards/BlueCircle.js';
import Cube from '../cards/Cube.js';
import GoldStar from '../cards/GoldStar.js';
import Heart from '../cards/Heart.js';
import Bomb from '../cards/Bomb.js';
import DementiaEvent from '../DementiaEvent.js';

class Rotate180 extends Level {

    totalMatches = 4;
    matches = 0;
    rotateLevel = 0;
    congratsMessage = 'Technically, there were no lies told during this level.';

    constructor(details = {}) {
        super();

        const arrayOfCards = [
            new Cube(),
            new Cube(),
            new BlueCircle(),
            new BlueCircle(),
            new Bomb(),
            new GoldStar(),
            new GoldStar(),
            new Heart(),
            new Heart()
        ];

        this.matrix = new Matrix(3, 3, arrayOfCards);
    }

    afterClick(details = {}) {
        if (details.matches !== this.matches && this.rotateLevel !== details.matches) {
            this.rotateLevel = details.matches;

            if (details.matches === 1) {
                DementiaEvent.dispatch('rotate-gameboard', {
                    degrees: 180,
                    speed: 1.25,
                    message: 'Hey, I didn\'t say anything about 180 degree rotations.',
                    from: details.card.dom
                });
            }
            else if (details.matches === 2) {
                DementiaEvent.dispatch('rotate-gameboard', {
                    degrees: -90,
                    message: 'Counterclockwise rotations were not mentioned either.',
                    from: details.card.dom
                });
            }
            else if (details.matches === 3) {
                DementiaEvent.dispatch('rotate-gameboard', {
                    degrees: 270,
                    speed: 1.5,
                    message: 'By now I\'m sure you weren\'t surprised to see a 270 degree clockwise rotation either.',
                    from: details.card.dom
                });
            }
        }
        return true;
    }

}

export { Rotate180 };