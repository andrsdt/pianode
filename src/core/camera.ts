import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js';
import { PerspectiveCamera } from "three";
import { renderer } from './renderer';

const VERTICAL_FIELD_OF_VIEW = 45; // Normal

export const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const aspectRatio = sizes.width / sizes.height;

export const camera = new PerspectiveCamera(
    VERTICAL_FIELD_OF_VIEW,
    aspectRatio
)

camera.position.set(-87.76, 80, 87.76)
camera.rotation.set(-Math.PI / 2, -0.9, -Math.PI / 2)

export const cameraControls = new OrbitControls(camera, renderer.domElement)
cameraControls.enableDamping = true
cameraControls.dampingFactor = 0.25
cameraControls.target.set(0, 0, 87.75)
cameraControls.enabled = false // Disable by default

window.addEventListener('resize', () => {
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
})

const cameras = { // Target position coordinates for each camera
    "top": { x: -5, y: 120, z: 87.76 },
    "tilted": { x: -87.76, y: 80, z: 87.76 },
    "side": { x: -20, y: 10, z: -20 }
}

export const changeToCamera = (c: 'top' | 'tilted' | 'side') => {
    cameraControls.enabled = false
    new TWEEN.Tween(camera.position)
        .to(cameras[c], 1000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()
}
