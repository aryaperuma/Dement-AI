export default class Messages {
    
    _welcome = {};
    _congrats = {};
    _services = undefined;

    _bombMessage = {
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

    constructor(services) {
        this._services = services;
    }

    showWelcome(message) {
        const currLevel = this._services.scoreboard.level;
        if (!this._welcome[currLevel]) {
            this._welcome[currLevel] = true;
            this._services.modal.show({
                message,
                onClose: () => {
                    const showCardsButton = document.getElementById('show-cards');
                    if (showCardsButton) {
                        showCardsButton.focus();
                    }
                }
            });
        }
    }

    bomb() {
        const messageArray = this._bombMessage['rude'];
        const message = messageArray[Math.floor(Math.random() * messageArray.length)];
        console.log(`Messages.bomb returning: `, message);
        return message;
    }


}