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
import DementiaEvent from '../DementiaEvent.js';

class Level10 extends Level {

    totalMatches = 8;
    congratsMessage = `Ya, that was harder but at least you could keep clicking until you found all the matches.`;
    showTimer = 3;
    _numConceals = 0;

    constructor() {
        super();
        
        const arrayOfCards = [
            new GreenTriangle({conceal: true}),
            new RedCircle({ conceal: true }),
            new GoldStar({ conceal: true }),
            new GoldStar({ conceal: true }),
            new RedCircle({ conceal: true }),
            new GreenTriangle({ conceal: true }),
            new Cube({ conceal: true }),
            new Cube({ conceal: true }),
            new RedTriangle({ conceal: true }),
            new RedTriangle({ conceal: true }),
            new BlueCircle({ conceal: true }),
            new BlueCircle({ conceal: true }),
            new GreenSquare({ conceal: true }),
            new GreenSquare({ conceal: true }),
            new BlueSquare({ conceal: true }),
            new BlueSquare({ conceal: true })
        ];

        this.matrix = new Matrix(4, 4, arrayOfCards);
    }

    onClick(details = {}) {
        if (details.conceal) {
            this._numConceals++;
        }

        if (details.conceal && this._numConceals === 2) {
            DementiaEvent.dispatch('message', {
                message: 'Oh boy, I did it again. I forgot to tell you about a new feature. As you\'ve probably noticed, you won\'t always get to see the wrong card. Better stock up on those memory enhancing pills.',
                from: details.card.dom
            });
        }
        return true;
    }

}

export { Level10 };