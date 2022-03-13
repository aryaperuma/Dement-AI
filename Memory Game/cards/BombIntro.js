// Special Bomb to be used only on Level 6

import Bomb from './Bomb.js';
import DementiaEvent from '../DementiaEvent.js';

export default class BombIntro extends Bomb {

    name = 'BombIntro';

    onClick = () => {
        DementiaEvent.dispatch('halt-play');
        setTimeout(() => {
            DementiaEvent.dispatch('goto-level', { message: this.message, level: '6a' });
        }, 500);
    };

}