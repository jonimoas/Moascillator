function makeKey() {
    var context = new AudioContext(),
            settings = {
                id: 'keyboard',
                width: 600,
                height: 150,
                startNote: 'C2',
                whiteNotesColour: '#fff',
                blackNotesColour: '#000',
                borderColour: '#000',
                activeColour: 'yellow',
                octaves: 2
            },
    keyboard = new QwertyHancock(settings);
    nodes = [];
    gains = [];
	deadnodes = [];
    maxvol = 0.3;
    attack = 0;
    release = 0;
    type = 'square';
    types = ['square', 'sine', 'sawtooth', 'triangle'];
    currentType = 0;
    sineGain = context.createGain();
    sine = context.createOscillator();
    sine.type = 'sine';
    sine.start(0);
    sineGain.gain.value = 0;
    sine.frequency.value = 0;
    sine.connect(sineGain);
    
    keyboard.keyDown = function (note, frequency) {
        now = context.currentTime;
        var gain = context.createGain();
        gain.gain.value = 0.0;
        gain.connect(context.destination);
        var oscillator = context.createOscillator();
        sineGain.connect(oscillator.frequency);
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        oscillator.connect(gain);
        oscillator.start(0);
        if (attack == 0) {
            gain.gain.linearRampToValueAtTime(maxvol, now);
        } else {
            gain.gain.setTargetAtTime(maxvol, now, 7 * secondsToTimeConstant(parseFloat(attack)));
        }
        nodes.push(oscillator);
        gains.push(gain);
    };

    keyboard.keyUp = function (note, frequency) {
        now = context.currentTime;
        var new_nodes = [];
        var new_gains = [];
        for (var i = 0; i < nodes.length; i++) {
            if (Math.round(nodes[i].frequency.value) === Math.round(frequency)) {
                gains[i].gain.setTargetAtTime(gains[i].gain.value, now, 0.000001);
                gains[i].gain.linearRampToValueAtTime(0.0, now + parseFloat(release));
				deadnodes.push(nodes[i]);
            } else {
                new_nodes.push(nodes[i]);
                new_gains.push(gains[i]);
            }
        }
        gains = new_gains;
        nodes = new_nodes;
		deadnodes.pop().stop(now+parseFloat(release));
    };
}

function changeVol(vol) {
    this.maxvol = vol / 100;
}

function Release(release) {
    this.release = release;
}

function nextType() {
    if (currentType == 3) {
        currentType = 0;
    } else {
        currentType++;
    }
    type = types[currentType];
}

function previousType() {
    if (currentType == 0) {
        currentType = 3;
    } else {
        currentType--;
    }
    type = types[currentType];
}

function Vibrato(vibrato) {
    sine.frequency.value = parseFloat(vibrato);
}

function VibratoW(vibratoW) {
    sineGain.gain.value = parseFloat(vibratoW);
}

function secondsToTimeConstant(sec) {
    return (sec * 2) / 10;
}

function Attack(attack) {
    this.attack = attack;
}