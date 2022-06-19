import { Group, Mesh, MeshBasicMaterial, MeshStandardMaterial, Texture, TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Key } from "../../../types/key";
import { Piano } from "../../piano";
import { BlackKeyBlender } from "./black-key-blender";
import { WhiteKeyBlender } from "./white-key-blender";

export class PianoBlender extends Piano {
    private gltfModel: Group;
    private materials: { [key: string]: MeshStandardMaterial }

    public constructor({ from, to }: { from: Key, to: Key }, gltfModel: Group, textures: { whiteWood: Texture; blackWood: Texture; }) {
        super();
        this.model.translateZ(170)
        this.model.scale.set(0.72, 0.72, 0.72);
        this.model.rotateY(-Math.PI / 2);

        this.gltfModel = gltfModel
        this.materials = {
            "whiteWood": new MeshStandardMaterial({ map: textures.whiteWood }),
            "blackWood": new MeshStandardMaterial({ map: textures.blackWood })
        };
        this.createStructure()
        this.createKeys(from, to)
        this.createFeltStrip()
        this.createLogo()
    }
    private createStructure = () => {
        this.model.add(this.gltfModel.getObjectByName("base") as Mesh)
    }

    private createLogo = () => {
        for (const m of ["github-logo", "andrsdt"]) {
            const model = this.gltfModel.getObjectByName(m) as Mesh
            model.material = this.materials.whiteWood
            this.model.add(model)
        }
    }

    private createKeys = (from: Key, to: Key) => {
        const keys = this.getKeyRange(from, to);
        for (const k of keys) {
            const model = this.gltfModel.getObjectByName(`${k.note}${k.octave}`) as Mesh;

            const key = this.isBlackNote(k.note) ?
                new BlackKeyBlender(k.note, k.octave, model) :
                new WhiteKeyBlender(k.note, k.octave, model);

            key.model.material = this.isBlackNote(key.key.note) ?
                this.materials.blackWood :
                this.materials.whiteWood;

            this.keys.push(key);
            this.model.add(key.model);
        }
    }

    private createFeltStrip = () => {
        const strip = this.gltfModel.getObjectByName("felt") as Mesh;
        strip.material = new MeshBasicMaterial({ color: 0x880000 });
        this.model.add(strip);
    }
}

const modelLoader = new GLTFLoader();
const textureLoader = new TextureLoader()
const gltf = await modelLoader.loadAsync("/piano-three-js/models/piano-keys.glb")
const whiteWood = await textureLoader.loadAsync("/piano-three-js/textures/white-wood.png");
const blackWood = await textureLoader.loadAsync("/piano-three-js/textures/black-wood.png");
export const pianoBlender = new PianoBlender({ from: { note: 'A', octave: 0 }, to: { note: 'C', octave: 8 } }, gltf.scene, { whiteWood, blackWood })