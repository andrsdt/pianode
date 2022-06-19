import { OrthographicCamera, PerspectiveCamera } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { renderer } from "./renderer";

const VERTICAL_FIELD_OF_VIEW = 45; // Normal

export const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const aspectRatio = sizes.width / sizes.height;

// Free camera
const freeCamera = new PerspectiveCamera(
    VERTICAL_FIELD_OF_VIEW,
    aspectRatio,
)
freeCamera.position.set(-90, 80, 85)

export const cameraControls = new OrbitControls(freeCamera, renderer.domElement)
cameraControls.enableDamping = true
cameraControls.dampingFactor = 0.25
cameraControls.target.set(0, 0, 87.75)

// Perspective camera
const perspectiveCameraTilted = new PerspectiveCamera(
    VERTICAL_FIELD_OF_VIEW,
    aspectRatio
)
perspectiveCameraTilted.position.set(-90, 80, 85)
perspectiveCameraTilted.rotation.set(-Math.PI / 2, -0.9, -Math.PI / 2)

// Side camera
const perspectiveCameraSide = new PerspectiveCamera(
    VERTICAL_FIELD_OF_VIEW,
    aspectRatio
)
perspectiveCameraSide.position.set(-20, 10, -20)
perspectiveCameraSide.lookAt(0, 0, 87.75)

// Ortographic camera
const viewSize = 100;
const ortographicCamera = new OrthographicCamera(
    -aspectRatio * viewSize / 2,
    aspectRatio * viewSize / 2,
    viewSize / 2,
    -viewSize / 2,
)

ortographicCamera.translateY(1000)
ortographicCamera.lookAt(0, 0, 87.75) // Middle of the piano
ortographicCamera.rotateZ(Math.PI / 2)

// Camera switching mechanism
const availableCameras: any = { freeCamera, perspectiveCameraTilted, perspectiveCameraSide, ortographicCamera }

export let camera = availableCameras.freeCamera // Default camera

export const changeActiveCamera = (c: 'freeCamera' | 'perspectiveCameraTilted' | 'perspectiveCameraSide' | 'ortographicCamera') => {
    camera = availableCameras[c];
}

window.addEventListener('resize', () => {
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
})
