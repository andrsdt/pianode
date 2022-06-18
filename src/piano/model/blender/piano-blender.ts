import { Group, Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Key } from "../../../types/key";
import { BlackKey } from "../../black-key";
import { Piano } from "../../piano";
import { WhiteKey } from "../../white-key";

export class PianoBlender extends Piano {
    private gltfModel: Group;

    public constructor({ from, to }: { from: Key, to: Key }, gltfModel: Group) {
        super();
        this.model.translateZ(170)
        this.model.scale.set(0.5, 0.5, 0.5);
        this.model.rotateY(-Math.PI / 2);
        this.gltfModel = gltfModel
        this.createKeys(from, to)
    }

    private createKeys = (from: Key, to: Key) => {
        const keys = this.getKeyRange(from, to);
        for (const k of keys) {
            const key = this.isBlackNote(k.note) ? new BlackKey(k.note, k.octave) : new WhiteKey(k.note, k.octave);
            key.baseY = this.isBlackNote(k.note) ? 3 : -.5;
            key.keyDownAnimationTo = this.isBlackNote(k.note) ? { yPos: key.baseY + 0.5, zRot: 0.8 } :
                { yPos: key.baseY - 0.8, zRot: 0.08 }
            key.model = this.gltfModel.getObjectByName(`${k.note}${k.octave}`) as Mesh;
            this.keys.push(key);
            this.model.add(key.model);
        }
    }
}

const loader = new GLTFLoader();
const gltf = await loader.loadAsync(`src/piano/model/blender/glb/piano-keys.glb`)
export const piano = new PianoBlender({ from: { note: 'A', octave: 0 }, to: { note: 'C', octave: 8 } }, gltf.scene)
// export const piano = new PianoThreeJs({ from: { note: 'A', octave: 0 }, to: { note: 'C', octave: 8 } })