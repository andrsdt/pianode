import { BlendFunction, EffectComposer, EffectPass, RenderPass, SelectiveBloomEffect } from "postprocessing";
import { scene } from "../scene/scene";
import { camera, sizes } from "./camera";
import { renderer } from "./renderer";

export const composer = new EffectComposer(renderer);
composer.setSize(sizes.width, sizes.height);

export const renderPass = new RenderPass(scene, camera)
composer.addPass(renderPass);

export const bloomEffect = new SelectiveBloomEffect(scene, camera, {
    blendFunction: BlendFunction.ADD,
    luminanceThreshold: 0,
    luminanceSmoothing: 0.3,
    intensity: 8.0
});

const effectPass = new EffectPass(camera, bloomEffect);
composer.addPass(effectPass);

export function updateComposer() {
    composer.setSize(sizes.width, sizes.height);
}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    updateComposer()
})