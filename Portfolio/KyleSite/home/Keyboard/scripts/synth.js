var keyboard = new QwertyHancock({
     id: 'keyboard',
     width: 600,
     height: 150,
     octaves: 2
});

var context = new AudioContext();
 
keyboard.keyDown = function (note, frequency) {
    var osc = context.createOscillator();
 
    osc.connect(context.destination);
 
    osc.start(context.currentTime);
    osc.stop(context.currentTime + 1);
};

var context = new AudioContext(),
    masterVolume = context.createGain();
 
masterVolume.gain.value = 0.3;
masterVolume.connect(context.destination);
 
keyboard.keyDown = function (note, frequency) {

};

var oscillators = {};
 

keyboard.keyDown = function (note, frequency) {
    var osc = context.createOscillator(),
        osc2 = context.createOscillator();
 
    osc.frequency.value = frequency;
    osc.type = 'sawtooth';
 
    osc2.frequency.value = frequency;
    osc2.type = 'square';
 
    osc.connect(masterVolume);
    osc2.connect(masterVolume);
 
    masterVolume.connect(context.destination);
 
    oscillators[frequency] = [osc, osc2];
 
    osc.start(context.currentTime);
    osc2.start(context.currentTime);
};
 
keyboard.keyUp = function (note, frequency) {
    oscillators[frequency].forEach(function (oscillator) {
        oscillator.stop(context.currentTime);
    });
};

osc.detune.value = -10;
osc2.detune.value = 10;









