export default class MainEventHandler {
 
    _handlers = new Map();
    _id = 1;
    _gameController = undefined;
    _queued = false;
    _queueId = 0;
    _transitionQueue = [];

    constructor(gc) {
        this._gameController = gc;
    }

    get transitionMessage() {
        if (this._transitionQueue.length > 0) {
            return this._transitionQueue.shift();
        }
        return null;
    }

    register(element, listenerEventType, whichElement, handler) {
        const handlerId = this._id++;
        element.addEventListener(listenerEventType, (e) => {
            this._mainHandler(e, whichElement, handlerId);
        });
        this._handlers.set(handlerId, handler);
    }

    async _mainHandler(e, whichElement, id) {

        // look inside, if we are rotating then check for a message
        // to be displayed after the transition is done
        if (e.detail?.type === 'rotate-gameboard' && typeof e.detail.message === 'string') {
            console.log('adding transition message to queue');
            this._transitionQueue.push({ message: e.detail.message, from: e.detail.from });
            console.log(this._transitionQueue);
        }


        //const startTime = Date.now();

        // if we have a card click then we need to check if the gameboard
        // is active
        if (whichElement === 'onCard' && e.type === 'click') {
            if (this._gameController.isCardsActive()) {
                this.cardsActive = false;
                const handler = this._handlers.get(id);
                //e.startTime = startTime;
                handler(e);
            }
            /*
            else {
                document.getElementById('logging').innerHTML = 'cards not active';
            }
            */
            return;
        }

        if (e.type === 'dementia-event' && e.detail.type === 'queued') {
            if (!this._queued) {
                this._queueId = e.detail.status.queueId;
            }
            this._queued = true;
        }

        //console.log(`MainEventHandler._mainHandler: _queued = ${this._queued}`);

        if (this._queued) {
            this._gameController.gamePlaying = false;
            let queueId;
            
            try {
                queueId = e.detail.status.queueId;
            }
            catch (err) {
                console.log('MainEventHandler is queued but this event does not have a queueId: ' + err.message);
                console.log(e);
                return;
            }

            if (e.detail.type === 'queued' && typeof e.detail.payload === 'function') {
                //console.log('MainEventHandler._mainHandler: calling payload function');
                await e.detail.payload(e.detail.status);
                if (e.detail.status.done === true) {
                    //console.log('MainEventHandler._mainHandler: last event in queue');
                    this._queued = false;
                }
                return;
            }
            if (queueId !== this._queueId) {
                //console.log('MainEventHandler._mainHandler: event is not queued: ', e);
                return;
            }
            const handler = this._handlers.get(id);
            //console.log('MainEventHandler._mainHandler: calling handler');
            handler(e);
            return;
        }

        if (!this._gameController.isGamePlaying()) {
            //console.log('MainEventHandler._mainHandler: game is not playing: ', e);
            return;
        }

        // if we have a card click then we need to check if the gameboard
        // is active
        /*
        if (whichElement === 'onCard') {
            if (!this._gameController.isCardsActive()) {
                //console.log('MainEventHandler._mainHandler: Cards are not active', e);
                return;
            }
            // we want to deactivate cards so we can process 
            this.cardsActive = false;
        }
        */

        const handler = this._handlers.get(id);
        handler(e);
    }

    set cardsActive(active) {
        this._gameController.cardsActive = active;
    }

    set gamePlaying(playing) {
        this._gameController.gamePlaying = playing;
    }

}