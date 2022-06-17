import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";
import { PianoKey } from "./piano-key";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const WHITE_KEY_X_SIZE = 13
const WHITE_KEY_Y_SIZE = 3
const WHITE_KEY_Z_SIZE = 3

export class WhiteKey extends PianoKey {
    // constructor(note: string, octave: number) {
    //     super(note, octave);
    //     this.model.geometry = new BoxGeometry(WHITE_KEY_X_SIZE, WHITE_KEY_Y_SIZE, WHITE_KEY_Z_SIZE)
    //     this.model.material = new MeshStandardMaterial({ color: '#fff' })
    //     this.baseY = 0
    // }

    constructor(note: string, octave: number) {
        super(note, octave);

        loader.load(`src/piano/model/glb/white-key.glb`, (gltf) => {
            const key = gltf.scene.children[0] as Mesh;
            key.scale.set(0.5, 0.5, 0.5);
            key.rotateY(-Math.PI / 2);
            this.model = key;
        }, undefined, function (error) {
            console.error(error);
        });
        this.baseY = 0
    }
}
