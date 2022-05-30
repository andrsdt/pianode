import { Scene } from 'three';
import { camera } from './core/camera';
import { fpsGraph } from './core/gui';
import './core/orbit-controls';
import { renderer, updateRenderer } from './core/renderer';
import { piano } from './piano/piano';
import { ambientLight, directionalLight } from './scene/lights';
import './style.css';


const scene = new Scene();

scene.add(ambientLight);
scene.add(directionalLight);
scene.add(camera)
scene.add(piano.model)

updateRenderer()

const loop = () => {
  fpsGraph.begin()
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
  fpsGraph.end()
}

loop();