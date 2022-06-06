import { Key } from './../../types/key';

import TWEEN from "@tweenjs/tween.js";
import { Mesh } from "three";
import { piano } from "../tone";

export abstract class PianoKey { // TODO event dispatcher to handle the set of pressed keys? Every time a key gets added or removed, the play method will be triggered here
    uuid: string;
    key: Key
    pressed: boolean;
    model: Mesh;
    baseY: number;
    currentAnimation: any;

    constructor(note: string, octave: number) {
        this.key = { note, octave };
        this.pressed = false;
        this.model = new Mesh();
        this.uuid = this.model.uuid;
        this.baseY = this.model.position.y;
    }

    keyDown = (velocity = 1) => {
        if (this.pressed) return;

        // Sound
        piano.keyDown({ note: `${this.key.note}${this.key.octave}`, velocity });

        // Key animation
        const coords = { yPos: this.model.position.y, zRot: this.model.rotation.z }
        const to = { yPos: this.baseY - 0.5, zRot: 0.08 };

        this.currentAnimation?.stop() // Before starting a new animation, make sure to stop the one that is already running
        this.currentAnimation = new TWEEN.Tween(coords)
            .to(to, 100 / velocity)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(() => {
                this.model.position.y = coords.yPos
                this.model.rotation.z = coords.zRot
            }).start()

        this.pressed = true;
    }

    keyUp = () => {
        if (!this.pressed) return;

        // Sound
        piano.keyUp({ note: `${this.key.note}${this.key.octave}` })

        // Key animation
        const coords = { yPos: this.model.position.y, zRot: this.model.rotation.z }
        const to = { yPos: this.baseY, zRot: 0 };

        this.currentAnimation?.stop()  // Before starting a new animation, make sure to stop the one that is already running
        this.currentAnimation = new TWEEN.Tween(coords)
            .to(to, 600)
            .easing(TWEEN.Easing.Bounce.Out)
            .onUpdate(() => {
                this.model.position.y = coords.yPos
                this.model.rotation.z = coords.zRot
            }).start()

        this.pressed = false;
    }
}
