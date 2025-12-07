export class Beep {
  private context = new AudioContext();

  public beep(firstBeep: [number, number], ...beeps: [number, number][]) {
    this.playSound(firstBeep[0], firstBeep[1], () => {
      if (beeps.length > 0) {
        // @ts-expect-error - Recursive call with rest parameters
        this.beep(...beeps);
      }
    });
    // const oscillator = this.context.createOscillator();
    // const gainNode = this.context.createGain();
    //
    // oscillator.connect(gainNode);
    // gainNode.connect(this.context.destination);
    //
    // gainNode.gain.value = 1;
    // oscillator.frequency.value = 800;
    // oscillator.type = "sine";
    //
    // oscillator.start();
    //
    // setTimeout(
    //   function () {
    //     oscillator.stop();
    //   },
    //   150
    // );
  }

  playSound(freq: number, duration: number, then: () => void) {
    let source: OscillatorNode;
    if (freq !== 0) {
      source = this.context.createOscillator();
      source.frequency.value = freq;
      source.type = "sine";
      source.connect(this.context.destination);

      source.start();
    }

    setTimeout(function () {
      source?.stop();
      then();
    }, duration);
  }

  beepModeAdd = () => {
    this.beep([600, 50], [800, 50]);
  };

  beepModeRemove = () => {
    this.beep([850, 50], [600, 50]);
  };

  regularBeep = () => {
    this.beep([900, 100]);
  };

  beepError = () => {
    this.beep([800, 50], [0, 50], [800, 50], [0, 50], [800, 50]);
  };
}
