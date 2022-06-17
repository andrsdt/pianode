import { Group, Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Key } from "../types/key";
import { PianoKey } from "./model/piano-key";
import { Piano } from "./piano";

export class PianoBlender extends Piano {

    public constructor({ from, to }: { from: Key, to: Key }) {
        super();

        this.model = new Group()
        this.model.translateZ(170)
        this.model.scale.set(0.5, 0.5, 0.5);
        this.model.rotateY(-Math.PI / 2);
        this.createKeys(from, to)
    }

    private createKeys = async (from: Key, to: Key) => {
        const blenderModel = await this.getBlenderModel();
        const keys = this.getKeyRange(from, to);
        for (const k of keys) {
            const key = new PianoKey(k.note, k.octave);
            key.model = blenderModel.getObjectByName(`${k.note}${k.octave}`) as Mesh;
            this.keys.push(key);
            this.model.add(key.model);
        }
    }

    private getBlenderModel = async (): Promise<Group> => {
        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync(`src/piano/model/glb/piano-keys.glb`)
        const group = gltf.scene;
        group.translateZ(170);
        group.scale.set(0.5, 0.5, 0.5);
        group.rotateY(-Math.PI / 2);
        return group || new Group();
    }
}

// export const piano = new PianoBlender({ from: { note: 'A', octave: 3 }, to: { note: 'C', octave: 9 } });
export const piano = new PianoBlender({ from: { note: 'A', octave: 3 }, to: { note: 'C', octave: 9 } })
