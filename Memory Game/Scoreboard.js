class DIRECTION {
    static UP = 0;
    static DOWN = 1;
}

export default class Scoreboard {

    _scoreboardDiv = document.getElementById('scoreboard');
    _clicksDiv = undefined;
    _messageDiv = undefined;
    _levelDiv = undefined;
    _clicks = 0;
    _level = 0;
    _direction = DIRECTION.DOWN;

    constructor() {
        this._scoreboardDiv.innerHTML = '<span id="clicks">Clicks:<span id="clicks-num"></span></span><span id="message">&#160;</span><span id="level">Level:<span id="level-num"></span></span>';
        this._clicksDiv = document.getElementById('clicks-num');
        this._messageDiv = document.getElementById('message');
        this._levelDiv = document.getElementById('level-num');
    }

    set clicks(num) {
        this._clicks = num;
        this._clicksDiv.innerText = num;
    }

    get clicks() {
        return this._clicks;
    }

    get level() {
        return this._level;
    }

    set level(num) {
        this._level = num;
        if (typeof num === 'string') {
            num = num.replace(/[^0-9]/, '');
        }
        this._levelDiv.innerText = num;
    }

    set message(mesg) {
        this._messageDiv.innerHTML = mesg;
        setTimeout(() => {
            this._messageDiv.innerHTML = '&#160;'; 
        }, 1000);
    }

    addClick() {
        if (this._direction === DIRECTION.UP) {
            this._clicks++;
            this.clicks = this._clicks;
        }
        else {
            this._clicks--;
            this.clicks = this._clicks;
        }
    }

    showFailMessage(mesg) {
        this._messageDiv.style.color = 'red';
        this.message = mesg;
    }

    showSuccessMessage(mesg) {
        this._messageDiv.style.color = 'green';
        this.message = mesg;
    }

    reset(clicks, level) {
        if (typeof clicks === 'number') {
            this.clicks = clicks;
            this._direction = DIRECTION.DOWN;
            this._clicksDiv.classList.add('down');
        }
        else {
            this.clicks = 0;
            this._direction = DIRECTION.UP;
            this._clicksDiv.classList.add('down');
        }
        if (level) {
            this.level = level;
        }
    }
    
    clicksLeft() {
        if (this._direction === DIRECTION.UP) {
            return true;
        }
        return this.clicks > 0;
    }
}