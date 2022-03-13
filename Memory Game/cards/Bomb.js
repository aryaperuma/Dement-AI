import Card from './Card.js';
import DementiaEvent from '../DementiaEvent.js';
import Messages from '../Messages.js';

export default class Bomb extends Card {

    name = 'Bomb';
    /*
    message = {
        nice: [
            `That's OK. I'm sure you'll do better next time.`,
            `Those bombs are frustrating, aren't they?`,
            `You are not alone. Everybody bombs once in a while.`,
            `You're good enough. You're smart enough. And doggone it, people like you.`,
            `Keep trying your best and you'll eventually overcome all your obstacles.`,
        ],
        sassy: [
            'Remember, you want to avoid the bombs.',
            'You do know what a bomb looks like, right?',
            'Do you not understand the concept of a bomb?',
            `Oops, I'm sure you didn't mean to click on that.`,
            `If I didn't know better I'd say you enjoy losing.`,
            'Welcome to Bombville, population "you."',
            'They set you up the bomb!',
            'You are really bombing at this game.',
        ],
        rude: [
            `Bomb fail! And life fail!`,
            `I wish the bomb would blow up your computer so you would stop wasting my time.`,
            `Time to face the truth. You suck at this game.`,
            `Remember when your life had meaning?`,
            `Just think of the bomb as the culmination of all the failed relationships in your life.`,
            `Time to turn off the computer and throw it in the garbage.`,
        ]
    };
    */

    message = undefined;

    constructor(altMessage) {
        super();
        this.image = 'bomb.svg';
        this.size = '85%';

        if (typeof altMessage === 'string') {
            this.message = altMessage;
        }

        console.log(`Bomb constructor: this.message = `, this.message);
    }

    explodeBomb(status) {
        return new Promise(resolve => {
            setTimeout(() => {
                DementiaEvent.dispatch('bomb-explode', {
                    bomb: this,
                    status
                });
                resolve();
            }, 250);
        });
    }

    replayLevel(status) {
        return new Promise(resolve => {
            const thisMessage = this.message || Messages.bomb();
            console.log(`message = `, thisMessage);

            setTimeout(() => {
                DementiaEvent.dispatch('replay-level', {
                    //message: messageArray[Math.floor(Math.random() * messageArray.length)],
                    message: thisMessage,
                    status
                });
                resolve();
            }, 2250);
        });
    }

    onClick() {
        DementiaEvent.queue([
            this.explodeBomb.bind(this),
            this.replayLevel.bind(this)
        ]);
        return false;
    }

}