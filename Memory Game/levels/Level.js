export default class Level {
    
    // This must be defined in the subclass
    totalMatches = undefined;

    // Most likely you'll want at least one of these defined
    // in the subclass.
    // Optional
    congratsMessage = undefined;
    // Optional
    welcomeMessage = undefined;
    // Optional
    nextLevel = undefined;

    _messages = undefined;

    constructor(details = {}, messages) {
        this._messages = messages;
        console.log(`Level constructor: _messages = `, this._messages);
    }

}