export default class DementiaEvent {

    static _getNewQueueId() {
        return Math.floor(Math.random() * 999999);
    }

    static dispatch(type, details = {}) {
        details.type = type;
        console.log('DementiaEvent.dispatch: ', details);
        const event = new CustomEvent('dementia-event', { detail: details });
        document.body.dispatchEvent(event);
    }
    
    static trigger(func) {
        const event = new CustomEvent('dementia-event', {
            detail: { payload: func }
         });
        document.body.dispatchEvent(event);
    }

    static queue(eventArr) {
        const queueId = DementiaEvent._getNewQueueId();
        for (let i = 0; i < eventArr.length - 1; i++) {
            const event = new CustomEvent('dementia-event', {
                detail: {
                    type: 'queued',
                    payload: eventArr[i],
                    status: { queueId: queueId, done: false}
                }
            });
            document.body.dispatchEvent(event);
        }
        const event = new CustomEvent('dementia-event', {
            detail: {
                type: 'queued',
                payload: eventArr[eventArr.length - 1],
                status: { queueId: queueId, done: true }
            }
        });
        document.body.dispatchEvent(event);
    }
}