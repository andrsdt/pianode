import { Scene } from 'three';
import { camera } from '../core/camera';
import { piano } from '../piano/model/blender/piano-blender';
import { ambientLight, directionalLight } from '../scene/lights';

export const scene = new Scene();

scene.add(ambientLight);
scene.add(directionalLight);
scene.add(camera)
scene.add(piano.model)
