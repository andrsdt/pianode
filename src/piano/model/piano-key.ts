
import TWEEN from "@tweenjs/tween.js";
import { Mesh } from "three";
import { piano } from "../tone";

export abstract class PianoKey {
    uuid: string;
    note: string;
    octave: number;
    pressed: boolean;
    model: Mesh;
    baseY: number;

    constructor(note: string, octave: number) {
        this.note = note;
        this.octave = octave;
        this.pressed = false;
        this.model = new Mesh();
        this.uuid = this.model.uuid;
        this.baseY = this.model.position.y;
    }

    keyDown = () => {
        if (this.pressed) return;

        // Sound
        piano.keyDown({ note: `${this.note}${this.octave}` })

        // Key animation
        const coords = { yPos: this.model.position.y, zRot: this.model.rotation.z }
        const to = { yPos: this.baseY - 0.5, zRot: 0.08 };
        new TWEEN.Tween(coords)
            .to(to, 100)
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
        piano.keyUp({ note: `${this.note}${this.octave}` })

        // Key animation
        const coords = { yPos: this.model.position.y, zRot: this.model.rotation.z }
        const to = { yPos: this.baseY, zRot: 0 };
        new TWEEN.Tween(coords)
            .to(to, 600)
            .easing(TWEEN.Easing.Bounce.Out)
            .onUpdate(() => {
                this.model.position.y = coords.yPos
                this.model.rotation.z = coords.zRot
            }).start()

        this.pressed = false;
    }
}
