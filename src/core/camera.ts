import { PerspectiveCamera } from "three";

const VERTICAL_FIELD_OF_VIEW = 45; // Normal

export const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const perspectiveCamera = new PerspectiveCamera(
    VERTICAL_FIELD_OF_VIEW,
    sizes.width / sizes.height,
)

export const camera = perspectiveCamera;
camera.position.set(-80, 100, 30);

window.addEventListener('resize', () => {
    // camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
})
