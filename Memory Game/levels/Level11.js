import Level from './Level.js';
import Matrix from '../Matrix.js';
import GoldStar from '../cards/GoldStar.js';
import Cube from '../cards/Cube.js';
import DementiaEvent from '../DementiaEvent.js';

class Level11 extends Level {

    totalMatches = 2;
    totalClicks = 4;
    congratsMessage = `I really don't think we would make you have a perfect game every time. That would be ridiculous.`;
    levelDetails = undefined;

    constructor(details = {}) {
        super();
        this.levelDetails = details;

        const arrayOfCards = [
            new Cube(),
            new Cube(),
            new GoldStar(),
            new GoldStar()
        ];

        this.matrix = new Matrix(2, 2, arrayOfCards);
    }

    onClick(details = {}) {
        if (details.clicks === 3 && !this.levelDetails.clickedOut) {
            DementiaEvent.dispatch('message', {
                message: 'Pay special attention to the clicks indicator at the top. Notice that it is counting down instead of up. Don\'t let it get to 0 before you find all the matches.',
                from: details.card.dom
            });
        }

        return true;
    }

}

export { Level11 };