
import { PCFShadowMap, WebGLRenderer } from 'three';

// Renderer
const canvas: HTMLElement = document.querySelector('#experience') as HTMLElement

export const renderer = new WebGLRenderer(({
    canvas,
    powerPreference: "high-performance",
    antialias: false,
    stencil: false,
    depth: false
}));

renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFShadowMap
renderer.physicallyCorrectLights = true
