import { PerspectiveCamera } from "three";

const VERTICAL_FIELD_OF_VIEW = 45; // Normal

export const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

export const camera = new PerspectiveCamera(
    VERTICAL_FIELD_OF_VIEW,
    sizes.width / sizes.height,
)

camera.position.set(-60, 80, 0)
window.addEventListener('resize', () => {
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
})
