import anime from './libs/anime.es.js';
import ShowTimer from './ShowTimer.js';
import DementiaEvent from './DementiaEvent.js';

export default class Gameboard {

    //_modal = undefined;
    _currentLevel = undefined;
    _gameboardDiv = undefined;
    _gameboardButtons = undefined;
    _matrixMap = undefined;
    _clickHandlerActive = true;
    _flippedCards = [];
    _currentMatches = 0;
    _totalMatchesNeeded = 0;
    _clicks = 0;
    _totalClicks = 0;
    _services = undefined;

    _clickedOutMessages = [
        'Sorry, you ran out of clicks.',
        'You\'re going to wear your mouse out with all that clicking.',
        'Your finger is going to be huge with all that clicking you are doing.',
        'Are you training for the Click Olympics?',
        'The Click Store called, you\'re putting them out of business.',
        'You could train Pavlov\'s dog with all that clicking.',
        'I guess this game isn\'t clicking for you.'
    ];
    
    constructor(domId, services) {
        this._gameboardDiv = document.getElementById(domId);
        this._gameboardButtons = document.getElementById('gameboard-buttons');
        this._services = services;
        this.addHandlers();
    }

    get columns() {
        const [numRows, numCols] = this._currentLevel.matrix.getNumRowsCols();
        return numCols;
    }

    get level() {
        return this._currentLevel;
    }

    set level(newLevel) {
        this._currentLevel = newLevel;
        this._totalMatchesNeeded = newLevel.totalMatches;
        this._currentMatches = 0;
    }

    get failMessage() {
        const failArray = [
            'Nope',
            'Sorry',
            'Not Even',
            'As If',
            'Really?',
            'Try Again',
            'Fail',
            'Epic Fail',
            'Denied',
            'So Close',
            'No Way',
            'Get Out'
        ];

        const rand = Math.floor(Math.random() * failArray.length);
        return failArray[rand];
    }

    get successMessage() {
        const successArray = [
            'Match',
            'Good Job',
            'Proper',
            'Yes',
            'Superb',
            'Fabulous',
            'Match',
            'Terrific',
            'Nice',
            'Awesome'
        ];

        const rand = Math.floor(Math.random() * successArray.length);
        return successArray[rand];
    }

    init() {
        this._gameboardDiv.classList.remove('playing');
        this.draw();
        this.welcome();
        this._services.mainEventHandler.gamePlaying = true;
        document.getElementById('test-controls').classList.remove('hide');
    }

    welcome() {
        this._currentLevel.welcomeMessage && this._services.messages.showWelcome(this._currentLevel.welcomeMessage);
    }

    draw() {
        const totalClicks = this._currentLevel.totalClicks;
        document.body.classList.remove('exploding');
        this._gameboardButtons.innerHTML = '';
        this._services.scoreboard.reset(totalClicks, this._currentLevel.level);
        this._flippedCards = [];
        this.deactivateClickHandler();
        this._matrixMap = new Map();
        this._gameboardDiv.innerHTML = "";
        const [numRows, numCols] = this._currentLevel.matrix.getNumRowsCols();

        this._services.mainEventHandler.gamePlaying = true;

        for (let row = 0; row < numRows; row++) {
            const gb_row = document.createElement('div');
            gb_row.classList.add('gb-row');
            for (let col = 0; col < numCols; col++) {
                const div = document.createElement('div');
                div.classList.add('gb-cell');
                const id = `gb-cell-${row}-${col}`;
                div.id = id;
                this._matrixMap.set(id, this._currentLevel.matrix.getValue(row, col));
                const card = this._currentLevel.matrix.getValue(row, col).dom;
                card.dataset.row = row;
                card.dataset.col = col;

                // for accessibility
                const span = document.createElement('span');
                span.classList.add('visually-hidden');
                span.innerText = `${row + 1}, ${col + 1}`;
                card.appendChild(span);

                div.appendChild(card);
                gb_row.appendChild(div);
            }
            this._gameboardDiv.appendChild(gb_row);
        }

        if (this._currentLevel.skipShowCardsButton) {
            this.initiateShowCards();
        }
        else {
            this.addShowCardsButton();
        }
    }

    addShowCardsButton() {
        const showButton = document.createElement('button');
        showButton.innerHTML = 'Show Cards';
        showButton.id = 'show-cards-button';
        this._gameboardButtons.append(showButton);
        showButton.focus();
    }

    removeShowCardsButton() {
        document.getElementById('show-cards-button').remove();
    }

    addStartButton() {
        const showButton = document.createElement('button');
        showButton.innerHTML = 'Start';
        showButton.id = 'start-button';
        this._gameboardButtons.append(showButton);
        showButton.focus();
    }

    removeStartButton() {
        document.getElementById('start-button').remove();
    }

    // Hide all cards and make them ready for play
    hideCards() {
        for (const card of this._currentLevel.matrix) {
            card.hide({ tabindex: 0, disabled: false });
        }
    }

    // Show all cards and keep them from being focused
    showCards() {
        for (const card of this._currentLevel.matrix) {
            card.show({ tabindex: -1, disabled: true });
        }
    }

    deactivateClickHandler() {
        this._services.mainEventHandler.cardsActive = false;
        for (const card of this._currentLevel.matrix) {
            card.setDisabledAttribute(true);
        }
    }

    activateClickHandler() {
        this._services.mainEventHandler.cardsActive = true;
        for (const card of this._currentLevel.matrix) {
            card.setDisabledAttribute(false);
        }
    }
    
    isMatch() {
        if (this._flippedCards.length !== 2) {
            return false;
        }
        return this._flippedCards[0].name === this._flippedCards[1].name;
    }

    checkForMatch() {
        // match
        if (this.isMatch()) {
            this._services.soundPlayer.play('match');
            this._flippedCards[0].show({ tabindex: -1, disabled: true });
            this._flippedCards[1].show({ tabindex: -1, disabled: true });
            this._flippedCards = [];
            this._currentMatches++;
            this._services.scoreboard.matches = this._currentMatches;
            this._services.scoreboard.showSuccessMessage(this.successMessage);
            this.activateClickHandler();
            this.checkForCompletion();
        }
        // no match
        else {
            this._services.soundPlayer.play('nomatch');
            this._services.scoreboard.showFailMessage(this.failMessage);
            const [card1, card2] = [this._flippedCards[0], this._flippedCards[1]];
            this._flippedCards = [];
            this.activateClickHandler();
            setTimeout(() => {
                card1.hide({ tabindex: 0, disabled: false });
                card2.hide({ tabindex: 0, disabled: false });
            }, 350);
        }
    }

    checkForCompletion() {
        if (this._currentMatches === this._totalMatchesNeeded) {
            DementiaEvent.queue([
                this.completedLevel.bind(this),
                this.gotoNextLevel.bind(this)
            ]);
        }
    }

    completedLevel(status) {
        return new Promise(resolve => {
            DementiaEvent.dispatch('level-completed', { status });
            resolve();
        });
    }

    gotoNextLevel(status) {
        return new Promise(resolve => {
            if (typeof this._currentLevel.congratsMessage !== 'string') {
                const customEvent = new CustomEvent('dementia-event',
                    {
                        detail: {
                            type: 'goto-next-level',
                            status
                        }
                    }
                );
                document.body.dispatchEvent(customEvent);
                resolve();
            }
            else {
                setTimeout(() => {
                    this._services.modal.show({
                        message: this._currentLevel.congratsMessage,
                        onClose: () => {
                            const customEvent = new CustomEvent('dementia-event', {
                                detail: {
                                    type: 'goto-next-level',
                                    status
                                }
                            });
                            document.body.dispatchEvent(customEvent);
                            resolve();
                        }
                    });
                }, 250);
            }
        });
    }

    startPlay() {
        this._gameboardDiv.classList.add('playing');
        this.hideCards();
        this.activateClickHandler();
        this._gameboardDiv.focus();

        if (typeof this._currentLevel.playTimer === 'number') {
            setTimeout(() => {
                this._services.playTimer.start(this._currentLevel.playTimer);
            }, 1000);
        }
    }

    async initiateShowCards() {
        this.showCards();

        document.getElementById('test-controls').classList.add('hide');

        if (typeof this._currentLevel.showTimer === 'number') {
            await new Promise(resolve => setTimeout(resolve, 500));
            const timer = new ShowTimer(this._currentLevel.showTimer);
            for await (const sec of timer) {
                this._services.soundPlayer.play('showCards');
                if (sec > 0) {
                    this._gameboardButtons.innerHTML = sec;
                }
                else {
                    this._gameboardButtons.innerHTML = '';
                }
            }
            this.startPlay();
        }
        else {
            this.addStartButton();
        }
    }

    handleGameboardButtons(e) {
        if (e.target.id === 'show-cards-button') {
            this.removeShowCardsButton();
            this.initiateShowCards();
        }
        else if (e.target.id === 'start-button') {
            this.removeStartButton();
            this.startPlay();
        }
    }

    handleClickOnCards(e) {
        let target = e.target;
        if (target === this._gameboardDiv) {
            this.activateClickHandler();
            return;
        }
        while (!(target.classList.contains('gb-cell'))) {
            target = target.parentElement;
            if (target === this._gameboardDiv) {
                this.activateClickHandler();
                return;
            }
        }

        const card = this._matrixMap.get(target.id);

        if (card.disabled) {
            this.activateClickHandler();
            return;
        }

        e.preventDefault();

        this._services.scoreboard.addClick();
        let conceal = false;

        if (card.isShowing()) {
            card.hide({ tabindex: 0, disabled: false });
            this._flippedCards.pop(card);

            // check if we have any clicks left
            if (!this._services.scoreboard.clicksLeft()) {
                DementiaEvent.dispatch('clicked-out', {
                    clickedOut: true,
                    message: this._clickedOutMessages[Math.floor(Math.random() * this._clickedOutMessages.length)]
                });
            }

            this.activateClickHandler();
            return;
        }
        else {
            const now = Date.now();
            this._flippedCards.push(card);
            if (this._flippedCards.length > 1 && !this.isMatch()) {
                conceal = (this._flippedCards.length > 1);
            }
            card.show({ tabindex: 0, disabled: false, conceal });
        }

        let go_on = true;
        if (typeof this._currentLevel.onClick === 'function') {
            go_on = this._currentLevel.onClick({ card: card, clicks: this._services.scoreboard.clicks, conceal, matches: this._currentMatches });
        }

        if (go_on && typeof card.onClick === 'function') {
            go_on = card.onClick({ clicks: this._services.scoreboard.clicks, conceal, matches: this._currentMatches });
        }

        if (go_on) {
            if (this._flippedCards.length > 1) {
                this.deactivateClickHandler();
                this.checkForMatch();
            }
            else {
                this.activateClickHandler();
            }
            card.dom.focus();
        }

        // TODO:
        // We need to add some sort of check to see whether the level completed
        // because we don't want to do this if it has.
        if (typeof this._currentLevel.afterClick === 'function') {
            this._currentLevel.afterClick({ card: card, clicks: this._services.scoreboard.clicks, conceal, matches: this._currentMatches });
        }

        // check if we have any clicks left
        if (!this._services.scoreboard.clicksLeft()) {
            DementiaEvent.dispatch('clicked-out', {
                clickedOut: true,
                message: this._clickedOutMessages[Math.floor(Math.random() * this._clickedOutMessages.length)]
            });
        }

    }

    handleKeydown(e) {
        console.log('handleKeydown: ', e);
        const key = e.keyCode || e.which;
        const target = e.target;
        const thisRow = target?.dataset?.row ? Number(target.dataset.row) : undefined;
        const thisCol = target?.dataset?.col ? Number(target.dataset.col) : undefined;

        switch (key) {
            case 40: // down arrow
                this.setFocusOnNextDownCard(thisRow, thisCol);
                break;
            case 38: // up arrow
                this.setFocusOnNextUpCard(thisRow, thisCol);
                break;
            case 39: // right arrow
                this.setFocusOnNextRightCard(thisRow, thisCol);
                break;
            case 37: // left arrow
                this.setFocusOnNextLeftCard(thisRow, thisCol);
                break;
            default:

        }
    }

    addHandlers() {

        this._services.mainEventHandler.register(this._gameboardButtons, 'click', 'onGameboardButton', this.handleGameboardButtons.bind(this));
        
        this._services.mainEventHandler.register(this._gameboardDiv, 'click', 'onCard', this.handleClickOnCards.bind(this));

        this._services.mainEventHandler.register(this._gameboardDiv, 'keydown', 'onCard', this.handleKeydown.bind(this));

        this._gameboardDiv.addEventListener('transitionend', (e) => {
            this.redrawRotation(e);

        });

    }
    
    rotate(degrees, speed = 1) {
        this._services.playTimer.pause();
        this._gameboardDiv.style.transition = `transform ease-in ${speed}s`;
        this._gameboardDiv.style.transform = `rotate(${degrees}deg)`;
        this._currentLevel.matrix.rotate(degrees);
    }

    redrawRotation(e) {
        const degrees = Number(e.target.style.transform.replace(/[a-z\(\)]/g, ''));
        this._matrixMap = new Map();

        this._gameboardDiv.style.transition = 'transform 0s';
        this._gameboardDiv.style.transform = '';

        // We can do this in rotate() so that the matrix is ready when 
        // the transition ends.
        //this._currentLevel.matrix.rotate(degrees);
        const [numRows, numCols] = this._currentLevel.matrix.getNumRowsCols();

        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                const id = `gb-cell-${row}-${col}`;
                this._matrixMap.set(id, this._currentLevel.matrix.getValue(row, col));
                const cell = document.getElementById(id);
                const card = this._currentLevel.matrix.getValue(row, col).dom;
                card.dataset.row = row;
                card.dataset.col = col;
                cell.innerHTML = '';
                cell.appendChild(card);
            }
        }

        this.activateClickHandler();

        const transitionMessage = this._services.mainEventHandler.transitionMessage;
        if (transitionMessage !== null) {
            this._services.modal.show({
                message: transitionMessage.message,
                onClose: () => {
                    transitionMessage.from.focus();
                    this._services.playTimer.resume();
                }
            });
        }
        else {
            this._services.playTimer.resume();
        }
    }

    explode(bomb) {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

        document.body.classList.add('exploding');
        this._services.soundPlayer.play('bomb');

        for (const card of this._currentLevel.matrix) {

            if (card === bomb) {
                continue;
            }

            const dir = Math.floor(Math.random() * 4);
            const cardPosition = card.dom.getBoundingClientRect();
            let dirX = 0;
            let dirY = 0;
            if (dir === 0) {
                dirX = (cardPosition.left * -1) - 300;
                dirY = Math.floor(Math.random() * vh);
            }
            else if (dir === 1) {
                dirX = vw - cardPosition.left + 300;
                dirY = Math.floor(Math.random() * vh);
            }
            else if (dir === 2) {
                dirY = (cardPosition.top * -1) - 300;
                dirX = Math.floor(Math.random() * vw);
            }   
            else {
                dirY = vh - cardPosition.top + 300;
                dirX = Math.floor(Math.random() * vw);
            }
            
            anime({
                targets: card.dom,
                duration: 2000,
                translateX: dirX,
                translateY: dirY,
                easing: 'steps(30)',
                rotate: {
                    value: 1080,
                    duration: 2000
                },
                complete: function (anim) {
                    anim.set(anim.animatables[0].target, { display: 'none' });
                }
            });
        }
    }

    setFocusOnNextDownCard(thisRow = -1, thisCol = 0) {
        const [numRows,] = this._currentLevel.matrix.getNumRowsCols();
        const lastRow = numRows - 1;
        let currRow = thisRow;
        let nextCard;

        do {
            currRow = (currRow === lastRow) ? 0 : currRow + 1;
            nextCard = this._currentLevel.matrix.getValue(currRow, thisCol);

            if (!nextCard.empty) {
                nextCard.dom.focus();
                break;
            }
        }
        while (currRow !== thisRow);
    }

    setFocusOnNextUpCard(thisRow = 0, thisCol) {
        const [numRows, numCols] = this._currentLevel.matrix.getNumRowsCols();
        const lastRow = numRows - 1;

        if (thisCol === undefined) {
            thisCol = numCols - 1;
        }

        let currRow = thisRow;
        let nextCard;

        do {
            currRow = (currRow === 0) ? lastRow : currRow - 1;
            nextCard = this._currentLevel.matrix.getValue(currRow, thisCol);

            if (!nextCard.empty) {
                nextCard.dom.focus();
                break;
            }
        }
        while (currRow !== thisRow);
    }

    setFocusOnNextLeftCard(thisRow, thisCol = 0) {
        const [numRows ,numCols] = this._currentLevel.matrix.getNumRowsCols();
        const lastCol = numCols - 1;

        if (thisRow === undefined) {
            thisRow = numRows - 1;
        }

        let currCol = thisCol;
        let nextCard;

        do {
            currCol = (currCol === 0) ? lastCol : currCol - 1;
            nextCard = this._currentLevel.matrix.getValue(thisRow, currCol);

            if (!nextCard.empty) {
                nextCard.dom.focus();
                break;
            }
        }
        while (currCol !== thisCol);
    }

    setFocusOnNextRightCard(thisRow = 0, thisCol = -1) {
        const [numRows, numCols] = this._currentLevel.matrix.getNumRowsCols();
        const lastCol = numCols - 1;

        let currCol = thisCol;
        let nextCard;

        do {
            currCol = (currCol === lastCol) ? 0 : currCol + 1;
            nextCard = this._currentLevel.matrix.getValue(thisRow, currCol);

            if (!nextCard.empty) {
                nextCard.dom.focus();
                break;
            }
        }
        while (currCol !== thisCol);
    }

}
