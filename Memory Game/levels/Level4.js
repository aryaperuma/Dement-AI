import Level from './Level.js';
import Matrix from '../Matrix.js';
import GreenSquare from '../cards/GreenSquare.js';
import Bomb from '../cards/Bomb.js';
import DementiaEvent from '../DementiaEvent.js';

class Level4 extends Level {

    totalMatches = 2;
    congratsMessage = ``;
    bombMessage = "Oops, sorry about that. I must have failed to mention that you shouldn't click on a bomb. My bad. Let's try it again.";

    constructor() {
        super();
        
        const arrayOfCards = [
            new GreenSquare(),
            new GreenSquare(),
            new Bomb(),
            new Bomb()
        ];

        this.matrix = new Matrix(2, 2, arrayOfCards);
    }


    explodeBomb(status) {
        return new Promise(resolve => {
            setTimeout(() => {
                DementiaEvent.dispatch('bomb-explode', { bomb: this, status });
                resolve();
            }, 250);
        });
    }

    gotoLevel4a(status) {
        return new Promise(resolve => {
            setTimeout(() => {
                DementiaEvent.dispatch('goto-level', { 
                    message: this.bombMessage,
                    level: '4a',
                    status
                });
                resolve();
            }, 2250);
        });
    }

    // This will run before Bomb.onClick()
    onClick(details = {}) {
        if (details.card.name !== 'Bomb') {
            return true;
        }
        
        DementiaEvent.queue([
            this.explodeBomb.bind(this),
            this.gotoLevel4a.bind(this)
        ]);

        return false;
    }

}

export { Level4 };