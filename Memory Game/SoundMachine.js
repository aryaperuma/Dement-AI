export default class SoundMachine {

    _audioContext = new (window.AudioContext || window.webkitAudioContext)();
    _gainNode = undefined;
    _soundBuffers = new Map;
    _soundStatus = {
        showCards: { on: true, sound: 'beep', gain: 0.5 },
        playTimer: { on: true, sound: 'beep', gain: 0.5 },
        bomb: { on: true, sound: 'bomb', gain: 1 },
        match: { on: true, sound: 'ka-ching', gain: 1 },
        fail: { on: true, sound: 'trombone', gain: 1 },
        nomatch: { on: true, sound: 'buzzer', gain: 1}
        
    };

    constructor() {
        this._gainNode = this._audioContext.createGain();
        this._gainNode.connect(this._audioContext.destination);

        for (const sound of ['bomb', 'beep', 'ka-ching', 'trombone', 'buzzer']) {
            fetch(`sounds/${sound}.wav`)
                // when we get the asynchronous response, convert to an ArrayBuffer
            .then(response => response.arrayBuffer())
            .then(buffer => {
                // decode the ArrayBuffer as an AudioBuffer
                this._audioContext.decodeAudioData(buffer, decoded => {
                    // push the resulting sound to an array
                    this._soundBuffers.set(sound, decoded);
                });
            });
        }
    }

    _play(sound, gain = 1) {
        if (this._audioContext.state === 'suspended') {
            this._audioContext.resume();
        }
        try {
            const source = this._audioContext.createBufferSource();
            source.buffer = this._soundBuffers.get(sound);
            source.connect(this._gainNode);
            this._gainNode.gain.value = gain;
            source.start(0);
        }
        catch (e) {
            console.log(e.message);
        }
    }

    set(sound, on) {

        this._soundStatus[sound].on = on;
    }

    play(sound) {
        console.log(`play: ${this._soundStatus[sound].on}`);
        if (this._soundStatus[sound].on) {
            this._play(this._soundStatus[sound].sound, this._soundStatus[sound].gain);
        }
    }

}