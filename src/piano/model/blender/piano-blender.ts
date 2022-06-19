import { Group, Mesh, MeshStandardMaterial, Texture, TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Key } from "../../../types/key";
import { Piano } from "../../piano";
import { bloomEffect } from './../../../core/composer';
import { BlackKeyBlender } from "./black-key-blender";
import { PedalBlender } from "./pedal-blender";
import { WhiteKeyBlender } from "./white-key-blender";

export class PianoBlender extends Piano {
    private gltfModel: Group
    private materials: { [key: string]: MeshStandardMaterial }
    private pedal: PedalBlender
    private permanentSustain: boolean;

    public constructor({ from, to }: { from: Key, to: Key }, gltfModel: Group, textures: { whiteWood: Texture; blackWood: Texture; }) {
        super();
        this.model.translateZ(170)
        this.model.scale.set(0.72, 0.72, 0.72);
        this.model.rotateY(-Math.PI / 2);

        this.gltfModel = gltfModel
        this.materials = {
            "whiteWood": new MeshStandardMaterial({ map: textures.whiteWood }),
            "blackWood": new MeshStandardMaterial({ map: textures.blackWood }),
            "metallic": new MeshStandardMaterial({ metalness: 1.0 }),
            "red": new MeshStandardMaterial({ color: 0x880000 }),
            "gray": new MeshStandardMaterial({ color: 0xAAAAAA }),
            "transparent": new MeshStandardMaterial({ transparent: true, opacity: 0.5 }),
        };

        this.createStructure()
        this.createKeys(from, to)

        const pedalModel = this.model.getObjectByName("pedal-right") as Mesh
        this.pedal = new PedalBlender(pedalModel)

        this.permanentSustain = false;
    }

    private createStructure = () => {
        const elements = {

            // Room
            "walls": this.materials.gray,

            // Base
            "base": this.materials.blackWood,
            "panel": this.materials.blackWood,
            "felt": this.materials.red,

            // Buttons
            "sustain-button": this.materials.transparent,
            "sustain-text": this.materials.whiteWood,

            // Pedals
            "bar-left": this.materials.blackWood,
            "bar-right": this.materials.blackWood,
            "pedals-base": this.materials.blackWood,
            "pedal-left": this.materials.metallic,
            "pedal-center": this.materials.metallic,
            "pedal-right": this.materials.metallic,

            // Spam
            "github-logo": this.materials.whiteWood,
            "andrsdt": this.materials.whiteWood,
        }

        for (const e in elements) {
            const element = this.gltfModel.getObjectByName(e) as Mesh // Retrieve the element from the gltf model
            element.material = elements[e as keyof typeof elements] // Texturize it using the object above
            this.model.add(element) // And add it to the Piano group model
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

    pedalDown = () => {
        // Don't override the "SUSTAIN" button
        if (this.permanentSustain) return;
        this.pedal.pedalDown()
    }

    pedalUp = () => {
        // Don't override the "SUSTAIN" button
        if (this.permanentSustain) return;
        this.pedal.pedalUp()
    }

    toggleSustainButton = () => {
        this.permanentSustain = !this.permanentSustain

        const button = this.model.getObjectByName("sustain-button") as Mesh

        if (this.permanentSustain) {
            // Press the pedal down
            this.pedal.pedalDown()

            // Make the led red and light-emitting
            button.material = this.materials.red
            bloomEffect.selection.add(button)
            button.translateY(-0.3)

        } else {
            // Release the pedal
            this.pedal.pedalUp()

            button.material = this.materials.transparent
            bloomEffect.selection.delete(button)
            button.translateY(0.3)
        }
    }
}

const modelLoader = new GLTFLoader();
const textureLoader = new TextureLoader()
const gltf = await modelLoader.loadAsync("/piano-three-js/models/piano.glb")
const whiteWood = await textureLoader.loadAsync("/piano-three-js/textures/white-wood.png");
const blackWood = await textureLoader.loadAsync("/piano-three-js/textures/black-wood.png");
export const pianoBlender = new PianoBlender({ from: { note: 'A', octave: 0 }, to: { note: 'C', octave: 8 } }, gltf.scene, { whiteWood, blackWood })