var mainCtx;
var mainOsc;
var mainVol;
var doublerOsc = [];
var doublerVol = [];

function createMain() {
    mainCtx = new AudioContext();
    mainOsc = mainCtx.createOscillator();
    mainVol = mainCtx.createGain();
    mainOsc.type = 'sine';
    mainOsc.frequency.value = 440;
    mainVol.gain.value = 0.0;
    mainOsc.connect(mainVol);
    mainVol.connect(mainCtx.destination);
    startMain();
}

function startMain() {
    mainOsc.start();
}

function stopMain() {
    mainOsc.stop();
}

function frequencyMain(value) {
    mainOsc.frequency.value = value;
    updateDoubler(value);
}

function volumeMain(value,doublers) {
    var fraction = parseInt(value) / 100;
    mainVol.gain.value = fraction;
    doublerCountChange(doublers);
}

function doublerReset() {
    for (var i = 0; i < 10; i++) {
        doublerVol[i].gain.value = 0.0;
    }
}

function doublerCount(value) {
    doublerReset();
    doublerCountChange(value);
}

function doublerCountChange(value) {
    switch (Math.floor(value)) {
        case 1:
            doublerVol[5].gain.value = mainVol.gain.value;
            doublerVol[4].gain.value = mainVol.gain.value;
            break;
        case 2:
            doublerVol[6].gain.value = mainVol.gain.value;
            doublerVol[3].gain.value = mainVol.gain.value;
            doublerCountChange(1);
            break;
        case 3:
            doublerVol[7].gain.value = mainVol.gain.value;
            doublerVol[2].gain.value = mainVol.gain.value;
            doublerCountChange(2);
            break;
        case 4:
            doublerVol[8].gain.value = mainVol.gain.value;
            doublerVol[1].gain.value = mainVol.gain.value;
            doublerCountChange(3);
            break;
        case 5:
            doublerVol[9].gain.value = mainVol.gain.value;
            doublerVol[0].gain.value = mainVol.gain.value;
            doublerCountChange(4);
            break;
    }
}

function createDoubler() {
    var f = 420;
    for (var i = 0; i < 10; i++) {
        doublerOsc[i] = mainCtx.createOscillator();
        doublerVol[i] = mainCtx.createGain();
        doublerOsc[i].connect(doublerVol[i]);
        doublerVol[i].connect(mainCtx.destination);
        doublerOsc[i].frequency.value = f;
        doublerVol[i].gain.value = 0.0;
        doublerOsc[i].start();
        f = f + 4;
        if (f == 440) {
            f = f + 4;
        }
        doublerOsc[i].type = 'sine';
    }
}

function updateDoubler(value) {
    f = value - 20;
    for (var i = 0; i < 10; i++) {
        doublerOsc[i].frequency.value = f;
        f = f + 4;
        if (f == value) {
            f = f + 4;
        }
    }
}