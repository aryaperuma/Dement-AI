let run = false;

onmessage = function (e) {
    const message = Number(e.data);
    console.log(`playTimerWorker: ${message}`);
    if (typeof message === 'number') {
        if (message === 0) {
            run = false;
        }
        else {
            run = true;
            countdown(message);
        }
    }
}

// 'from' is in milliseconds
async function countdown(from) {
    for (let i = from; i >= 0; i-=100) {
        if (!run) {
            break;
        }
        postMessage(i);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}