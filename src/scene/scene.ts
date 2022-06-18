import { Scene } from 'three';
import { camera } from '../core/camera';
import { ambientLight, directionalLight } from '../scene/lights';

export const scene = new Scene();

scene.add(ambientLight);
scene.add(directionalLight);
scene.add(camera)
