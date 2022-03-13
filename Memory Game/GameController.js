export default class GameController {

    // does the gameboard accept click/keydown input
    _cardsActive = false;
    _gameboardDiv = document.getElementById('gameboard');
    _gamePlaying = false;

    isCardsActive() {
        return this._cardsActive;
    }

    set cardsActive(active) {
        this._cardsActive = active;
        if (active) {
            this._gameboardDiv.classList.remove('click-disabled');
        }
        else {
            this._gameboardDiv.classList.add('click-disabled');
        }
    }
    
    isGamePlaying() {
        return this._gamePlaying;
    }

    set gamePlaying(playing) {
        console.log(`GameController: setting gamePlaying to ${playing}`);
        this._gamePlaying = playing;
        if (!playing) {
            this._cardsActive = false;
        }
    }
}