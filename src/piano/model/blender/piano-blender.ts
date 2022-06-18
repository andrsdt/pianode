import { Group, Mesh, MeshBasicMaterial, Texture, TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Key } from "../../../types/key";
import { Piano } from "../../piano";
import { BlackKeyBlender } from "./black-key-blender";
import { WhiteKeyBlender } from "./white-key-blender";

export class PianoBlender extends Piano {
    private gltfModel: Group;

    public constructor({ from, to }: { from: Key, to: Key }, gltfModel: Group, textures: { whiteWood: Texture; blackWood: Texture; }) {
        super();
        this.model.translateZ(170)
        this.model.scale.set(0.72, 0.72, 0.72);
        this.model.rotateY(-Math.PI / 2);
        this.gltfModel = gltfModel
        this.createKeys(from, to)
        this.paintFeltStrip()
        this.paintKeys(textures)
    }

    private createKeys = (from: Key, to: Key) => {
        const keys = this.getKeyRange(from, to);
        for (const k of keys) {
            const model = this.gltfModel.getObjectByName(`${k.note}${k.octave}`) as Mesh;

            const key = this.isBlackNote(k.note) ?
                new BlackKeyBlender(k.note, k.octave, model) :
                new WhiteKeyBlender(k.note, k.octave, model);

            this.keys.push(key);
            this.model.add(key.model);
        }
    }

    private paintFeltStrip = () => {
        const strip = this.gltfModel.getObjectByName('FELT') as Mesh;
        strip.material = new MeshBasicMaterial({ color: 0x880000 });
        this.model.add(strip);
    }

    private paintKeys = (textures: { whiteWood: Texture; blackWood: Texture; }) => {
        const materials = {
            "whiteWood": new MeshBasicMaterial({ map: textures.whiteWood }),
            "blackWood": new MeshBasicMaterial({ map: textures.blackWood })
        };

        for (const key of this.keys) {
            key.model.material = this.isBlackNote(key.key.note) ? materials.blackWood : materials.whiteWood;
        }
    }
}

const modelLoader = new GLTFLoader();
const textureLoader = new TextureLoader()
const gltf = await modelLoader.loadAsync("/models/piano-keys.glb")
const whiteWood = await textureLoader.loadAsync("/textures/white-wood.png");
const blackWood = await textureLoader.loadAsync("/textures/black-wood.png");
export const pianoBlender = new PianoBlender({ from: { note: 'A', octave: 0 }, to: { note: 'C', octave: 8 } }, gltf.scene, { whiteWood, blackWood })