import { Group, Mesh, MeshBasicMaterial } from "three";
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
            // TODO: Too many ifs, refactor
            const model = this.gltfModel.getObjectByName(`${k.note}${k.octave}`) as Mesh;
            const key = this.isBlackNote(k.note) ? new BlackKey(k.note, k.octave, model) : new WhiteKey(k.note, k.octave, model);
            key.baseY = this.isBlackNote(k.note) ? 3 : 0.6;
            key.keyDownAnimationTo = this.isBlackNote(k.note) ?
                { yPos: key.baseY - 0.7, zRot: -0.05 } :
                { yPos: key.baseY, zRot: 0.06 }
            const color = this.isBlackNote(k.note) ? 0x222222 : 0xcccccc;
            key.model.material = new MeshBasicMaterial({ color });

            this.keys.push(key);
            this.model.add(key.model);
        }
    }
}

const loader = new GLTFLoader();
const gltf = await loader.loadAsync(`src/piano/model/blender/glb/piano-keys.glb`)
export const piano = new PianoBlender({ from: { note: 'A', octave: 0 }, to: { note: 'C', octave: 8 } }, gltf.scene)
// export const piano = new PianoThreeJs({ from: { note: 'A', octave: 0 }, to: { note: 'C', octave: 8 } })