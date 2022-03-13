export default class ShowTimer {
    
    _seconds = 0;

    constructor(secs) {
        if (typeof secs !== 'number') {
            throw new Error('ShowTimer constructor must be passed a number');
        }
        this._seconds = secs;
    }

    async *[Symbol.asyncIterator]() {
        for (let sec = this._seconds; sec >= 0; sec--) {
            yield sec;
            if (sec > 0) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }

}