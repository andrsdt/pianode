import { Scene } from 'three';
import { camera } from '../core/camera';
import { piano } from '../piano/model/blender/piano-blender';
import { ambientLight, directionalLight } from '../scene/lights';

export const scene = new Scene();

scene.add(ambientLight);
scene.add(directionalLight);
scene.add(piano.model)

scene.add(camera)
// TODO add an easy way to switch between piano-three-js and piano-blender
