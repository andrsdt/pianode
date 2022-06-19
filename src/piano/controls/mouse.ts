import { piano } from './../active-piano-handler';
import { Raycaster, Vector2 } from "three";
import { camera } from "../../core/camera";
import { PianoKey } from '../piano-key';
import { scene } from "../../scene/scene";
import { pressKey, releaseKey } from './controller';

// TODO: replace this with https://github.com/markuslerner/THREE.Interactive

const raycaster = new Raycaster();
const pointer = new Vector2();

let keyBeingClicked: PianoKey | undefined = undefined;
let isMouseDown = false;

const getHoveredElement = (e: MouseEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects(scene.children);
    return intersects.length > 0 ? intersects[0].object : undefined;
}

const handleMove = (e: MouseEvent) => {
    if (!isMouseDown) return; // Don't do anything if the mouse is not being clicked

    const intersected = getHoveredElement(e)
    if (intersected) {
        if (intersected.name === 'sustain-button') {
            piano.toggleSustainButton()
            return;
        }

        const keyBeingHovered = piano.keys.find(k => k.uuid === intersected.uuid);
        if (keyBeingClicked !== keyBeingHovered) releaseKey(keyBeingClicked); // This depresses a key that is no longer hovered
        pressKey(keyBeingHovered); // This presses the key that is now hovered
        keyBeingClicked = keyBeingHovered // 
    } else {
        releaseKey(keyBeingClicked)
        keyBeingClicked = undefined
    }
}

const handleMouseDown = (e: MouseEvent) => {
    isMouseDown = true;
    handleMove(e)
}

const handleMouseUp = () => {
    isMouseDown = false;
    releaseKey(keyBeingClicked)
    keyBeingClicked = undefined
}

window.addEventListener('mousemove', handleMove); // For allowing glissandos on mouse move while clicking
window.addEventListener('mousedown', handleMouseDown);
window.addEventListener('mouseup', handleMouseUp);
