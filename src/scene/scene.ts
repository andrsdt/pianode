import { Scene } from 'three';
import { camera } from '../core/camera';
import { ambientLight, directionalLight } from '../scene/lights';
import { piano } from './../piano/piano-blender';
// Add orbit controls
export const scene = new Scene();

scene.add(ambientLight);
scene.add(directionalLight);
scene.add(camera)
scene.add(piano.model)
// TODO add an easy way to switch between piano-three-js and piano-blender
