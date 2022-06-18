import { OrthographicCamera, PerspectiveCamera } from "three";

const VERTICAL_FIELD_OF_VIEW = 45; // Normal

export const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const aspectRatio = sizes.width / sizes.height;

const perspectiveCameraTilted = new PerspectiveCamera(
    VERTICAL_FIELD_OF_VIEW,
    aspectRatio
)
perspectiveCameraTilted.position.set(-90, 80, 85)
perspectiveCameraTilted.rotation.set(-Math.PI / 2, -0.9, -Math.PI / 2)

const viewSize = 90;
const ortographicCamera = new OrthographicCamera(
    -aspectRatio * viewSize / 2,
    aspectRatio * viewSize / 2,
    viewSize / 2,
    -viewSize / 2,
)

ortographicCamera.translateY(1000)
ortographicCamera.lookAt(0, 0, 87.75) // Middle of the piano
ortographicCamera.rotateZ(Math.PI / 2)


const availableCameras: any = { perspectiveCameraTilted, ortographicCamera }

export let camera = availableCameras.perspectiveCameraTilted // Default camera

export const changeActiveCamera = (c: 'perspectiveCameraTilted' | 'ortographicCamera') => {
    camera = availableCameras[c];
}

window.addEventListener('resize', () => {
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
})
