import TWEEN from '@tweenjs/tween.js';
import { Mesh } from 'three';
import { piano } from "../../tone";

export class PedalBlender {
    isDown: boolean;
    currentAnimation: any;
    pedalModel: any;

    constructor(pedalModel: Mesh) {
        this.isDown = false;
        this.pedalModel = pedalModel;
    }

    pedalDown = () => {
        if (this.isDown) return;

        // Sound
        piano.pedalDown();

        // Animation
        const from = { zRot: this.pedalModel.rotation.z }
        const to = { zRot: Math.PI + Math.PI / 12 }

        this.currentAnimation?.stop() // Before starting a new animation, make sure to stop the one that is already running
        this.currentAnimation = new TWEEN.Tween(from)
            .to(to, 200)
            .easing(TWEEN.Easing.Sinusoidal.In)
            .onUpdate(() => {
                this.pedalModel.rotation.z = from.zRot
            }).start()

        this.isDown = true;
    }

    pedalUp = () => {
        if (!this.isDown) return;

        // Sound
        piano.pedalUp();

        // Animation
        const from = { zRot: this.pedalModel.rotation.z }
        const to = { zRot: Math.PI } // No rotation

        this.currentAnimation?.stop() // Before starting a new animation, make sure to stop the one that is already running
        this.currentAnimation = new TWEEN.Tween(from)
            .to(to, 250)
            .easing(TWEEN.Easing.Sinusoidal.Out)
            .onUpdate(() => {
                this.pedalModel.rotation.z = from.zRot
            }).start()

        this.isDown = false;
    }
}