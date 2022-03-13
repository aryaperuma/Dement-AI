import DementiaEvent from './DementiaEvent.js';

export default class PlayTimer {
    _gameboard_buttons = document.getElementById('gameboard-buttons');
    _message = [
        'Time is of the essence.',
        'Did you see the countdown clock below the gameboard?',
        'I guess you really like this level and just want to keep playing it over and over again?',
        'Here\'s a hint. Try memorizing some of the matches before you start playing.',
        'Are you wearing a blindfold?'
    ];
    _currentTime = 0;
    _worker = undefined;
    _running = false;

    constructor(soundPlayer) {
        this._soundPlayer = soundPlayer;
    }

    _createWorkAndListener() {
        this._worker = new Worker('./playTimerWorker.js');
        this._worker.onmessage = (e) => {
            this._handleDataFromWorker(Number(e.data));
        };
    }

    start(secs) {
        if (typeof secs === 'number') {
            this._currentTime = secs * 1000;
        }
        this._createWorkAndListener();
        this._worker.postMessage(this._currentTime);
        this._running = true;
    }
    
    _end(status) {
        return new Promise(resolve => {
            DementiaEvent.dispatch('timer-end', {
                message: this._message[Math.floor(Math.random() * this._message.length)],
                status
            });
            this._soundPlayer.play('fail');
            resolve();
        });
    }

    pause() {
        if (this._running) {
            this._worker.terminate();
            this._running = false;
        }
    }

    resume() {
        this.start();
    }

    stop() {
        if (this._running) {
            this._worker.terminate();
            this._gameboard_buttons.innerHTML = '';
            this._currentTime = 0;
            this._running = false;
        }
    }

    _handleDataFromWorker(time) {
        this._currentTime = time;

        if (time === 0) {
            this.stop();
            DementiaEvent.queue([
                this._end.bind(this)
            ]);
            return;
        }

        if (time >= 3000) {
            if (time % 1000 === 0) {
                    this._gameboard_buttons.innerHTML = time / 1000;
                    this._soundPlayer.play('playTimer');
            }
        }
        else {
            if (time % 1000 === 0) {
                this._gameboard_buttons.innerHTML = `${time/1000}.0`;
                this._soundPlayer.play('playTimer');
            }
            else {
                this._gameboard_buttons.innerHTML = time / 1000; 
            }
        }
    }

}