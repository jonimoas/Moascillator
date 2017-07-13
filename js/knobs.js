function initKnobs() {
    var freqknob = document.getElementById("freqknob");
    var freqinput = document.getElementById("freqinput");
    var volknob = document.getElementById("volknob");
    var volinput = document.getElementById("volinput");
    var doublerknob = document.getElementById("doublerknob");
    var doublerinput = document.getElementById("doublerinput");
    var musicvol = document.getElementById("musicvol");
    var release = document.getElementById("release");
    var musicvolinput = document.getElementById("musicvolinput");
    var releaseinput = document.getElementById("releaseinput");
    var vibrato = document.getElementById("vibrato");
    var vibratoinput = document.getElementById("vibratoinput");
    var vibratoW = document.getElementById("vibratoW");
    var vibratoinputW = document.getElementById("vibratoinputW");
    var attack = document.getElementById("attack");
    var attackinput = document.getElementById("attackinput");
    freqknob.setAttribute("max", 20000);
    attack.setAttribute("max", 5);
    vibratoW.setAttribute("max", 2);
    doublerknob.setAttribute("max", 5);
    release.setAttribute("max", 5);
    vibrato.setAttribute("max", 10);
    attack.value = 0;
    attackinput.value = 0;
    vibratoW.value = 0;
    vibratoinputW.value = 0;
    vibrato.value = 0;
    vibratoinput.value = 0;
    volinput.value = 0;
    freqinput.value = 440;
    freqknob.value = 440;
    volknob.value = 0;
    musicvol.value = 30;
    musicvolinput.value = 30;
    release.value = 0;
    releaseinput.value = 0;
    doublerinput.value = 0;
    doublerknob.value = 0;
    freqknob.onchange = function () {
        freqinput.value = ~~freqknob.value;
        frequencyMain(freqknob.value);
    };

    freqinput.onchange = function () {
        freqknob.value = ~~freqinput.value;
        frequencyMain(freqknob.value);
    };

    volknob.onchange = function () {
        volinput.value = ~~volknob.value;
        volumeMain(volknob.value,doublerknob.value);
    };

    volinput.onchange = function () {
        volknob.value = ~~volinput.value;
        volumeMain(volknob.value,doublerknob.value);
    };

    doublerknob.onchange = function () {
        doublerinput.value = ~~doublerknob.value;
        doublerCount(doublerknob.value);
    };

    doublerinput.onchange = function () {
        doublerknob.value = ~~doublerinput.value;
        doublerCount(doublerknob.value);
    };
    musicvol.onchange = function () {
        musicvolinput.value = ~~musicvol.value;
        changeVol(musicvol.value);
    };

    musicvolinput.onchange = function () {
        musicvol.value = ~~musicvolinput.value;
        changeVol(musicvol.value);
    };

    release.onchange = function () {
        releaseinput.value = ~~release.value;
        Release(release.value);
    };

    releaseinput.onchange = function () {
        release.value = ~~releaseinput.value;
        Release(release.value);
    };
    vibrato.onchange = function () {
        vibratoinput.value = ~~vibrato.value;
        Vibrato(vibrato.value);
    };

    vibratoinput.onchange = function () {
        vibrato.value = ~~vibratoinput.value;
        Vibrato(vibrato.value);
    };

    vibratoW.onchange = function () {
        vibratoinputW.value = ~~vibratoW.value;
        VibratoW(vibratoW.value);
    };

    vibratoinputW.onchange = function () {
        vibratoW.value = ~~vibratoinputW.value;
        VibratoW(vibratoW.value);
    };

    attack.onchange = function () {
        attackinput.value = ~~attack.value;
        Attack(attack.value);
    };

    attackinput.onchange = function () {
        attack.value = ~~attackinput.value;
        Attack(attack.value);
    };
}