import Gameboard from './Gameboard.js';
import Modal from './Modal.js';
import Storage from './Storage.js';
import GameController from './GameController.js';
import MainEventHandler from './MainEventHandler.js';
import levelFiles from './levelFiles.js';
import SoundMachine from './SoundMachine.js';
import Options from './Options.js';
import Services from './Services.js';
import PlayTimer from './PlayTimer.js';
import Scoreboard from './Scoreboard.js';
import Messages from './Messages.js';

const services = new Services();
services.add('modal', new Modal('modal-1'));
services.add('scoreboard', new Scoreboard());
services.add('mainEventHandler', new MainEventHandler(new GameController()));
services.add('soundPlayer', new SoundMachine());
services.add('playTimer', new PlayTimer(services.soundPlayer));


const messagesServices = new Services();
messagesServices.add('modal', services.modal);
messagesServices.add('scoreboard', services.scoreboard);
services.add('messages', new Messages(messagesServices));

const gameboard = new Gameboard('gameboard', services);
let storage = undefined;
let currentLevel = null; // this will be stored as a string
const main = document.getElementsByTagName('main')[0];
const options = new Options(services);

async function loadLevel(levelStr, details = {}) {
    currentLevel = String(levelStr);
    storage.set('currentLevel', currentLevel);

    if (currentLevel === '0') {
        document.getElementById('main').dataset.columns = 0;
        document.getElementById('gameboard').innerHTML = '';
        document.getElementById('welcome').classList.add('show');
        document.getElementById('gameboard-buttons').innerHTML = '';
        main.dataset.level = 0;
        return;
    }
    document.getElementById('welcome').classList.remove('show');

    let module;
    try {
        const levelFile = levelFiles[currentLevel];
        module = await import(`./levels/${levelFile}.js`);
    }
    catch (e) {
        console.log(`Couldn\'t load level ${levelStr}: ` + e.message);
        console.trace();
        document.getElementById('test-controls').classList.remove('hide');
        if (document.getElementById('main').dataset.level === "0") {
            document.getElementById('welcome').classList.add('show');
        }
        return;
    }
    console.log(`module = `, module);
    console.log(`services.messages = `, services.messages);
    let level = new module[levelFiles[currentLevel]](details, services.messages);
    level.level = currentLevel;
    gameboard.level = level;
    gameboard.init();
    main.dataset.level = levelStr;
    main.dataset.columns = gameboard.columns;
}

function loadNextLevel() {
    currentLevel = gameboard.level.nextLevel || String(parseInt(currentLevel) + 1);
    try {
        storage.set('currentLevel', currentLevel);
    }
    catch (e) {
        console.log('error setting currentLevel in storage: ', e);
    }
    loadLevel(currentLevel);
}

function stopPlayTimer() {
    services.playTimer.stop();
}

document.getElementById('enter-game').addEventListener('click', function () {
    document.getElementById('welcome').classList.remove('show');
    loadLevel(1);
});


services.mainEventHandler.register(document.body, 'dementia-event', 'onBody', handleDementiaEvents);


function handleDementiaEvents(e) {

    if (e.detail.type === 'timer-end') {
        services.modal.show({
            message: e.detail.message,
            onClose: () => {
                loadLevel(currentLevel);
            }
        });
        return;
    }

    if (e.detail.type === 'message') {
        services.modal.show({
            message: e.detail.message,
            onClose: () => {
                e.detail.from.focus();
            }
        });
        return;
    }

    if (e.detail.type === 'rotate-gameboard') {
        gameboard.deactivateClickHandler();
        gameboard.rotate(e.detail.degrees, e.detail.speed);
        return;
    }

    stopPlayTimer();

    if (e.detail.type === 'clicked-out') {
        services.modal.show({
            message: e.detail.message,
            onClose: () => {
                loadLevel(currentLevel, e.detail);
            }
        });
        return;
    }

    if (e.detail.type === 'level-completed') {
        try {
            storage.set('currentLevel', String(parseInt(currentLevel) + 1));
        }
        catch (e) {
            console.log(`error setting currentLevel in storage: `, e);
        }
        return;
    }


    if (e.detail.type === 'goto-next-level') {
        loadNextLevel();
        return;
    }
    
    if (e.detail.type === 'halt-play') {
        gameboard.deactivateClickHandler();
        return;
    }

    if (e.detail.type === 'replay-level') {
        if (e.detail.message) {
            services.modal.show({
                message: e.detail.message,
                onClose: () => {
                    loadLevel(currentLevel);
                }
            });
        }
        else {
            loadLevel(currentLevel);
        }
        return;
    }

    if (e.detail.type === 'goto-level') {
        if (e.detail.message) {
            services.modal.show({
                message: e.detail.message,
                onClose: () => {
                    loadLevel(e.detail.level);
                }
            });
        }
        else {
            loadLevel(e.detail.level);
        }
        return;
    }

    if (e.detail.type === 'bomb-explode') {
        gameboard.explode(e.detail.bomb);
        return;
    }
    
    console.log(`Error handling dementia-event: don't know how to handle type: `, e);

}

try {
    storage = new Storage();
    console.log('storage ready');
}
catch (e) {
    console.log(e);
}

// check to see if user has already advanced to a certain level
try {
    currentLevel = storage.get('currentLevel');
    if (typeof currentLevel === 'string') {
        if (!(/^[1-9]/.test(currentLevel))) {
            currentLevel = null;
        }
        else {
            currentLevel = String(parseInt(currentLevel));
        }
    }
}
catch (e) {
    currentLevel = null;
    console.log('error getting currentLevel from storage: ', e);
}

console.log(`currentLevel = ${currentLevel}`);

if (currentLevel !== null && currentLevel !== 0) {
    //document.getElementById('welcome').innerHTML = "";
    loadLevel(currentLevel);
}
else {
    document.getElementById('welcome').classList.add('show');
}

document.getElementById('start-over').addEventListener('click', function () {
    document.getElementById('start-over').style.removeProperty('display');
    loadLevel('0');
});

document.getElementById('gotolevel').addEventListener('change', function (e) {
    stopPlayTimer();
    loadLevel(e.target.value);
});

const select = document.getElementById('gotolevel');

const levelFilesKeys = Object.keys(levelFiles);
const levelFilesSet = new Set(levelFilesKeys.map(key => parseInt(key))); 

for (let levelNum = 1; levelNum <= levelFilesSet.size; levelNum++) {
    const option = document.createElement('option');
    option.value = levelNum;
    option.innerHTML = levelNum;
    select.appendChild(option);
}