import TWEEN from '@tweenjs/tween.js';
import { camera } from './core/camera';
import { fpsGraph } from './core/gui';
import { renderer, updateRenderer } from './core/renderer';
import './style.css';
import { scene } from './scene/scene'
import { handleMouseMove } from './core/raycaster';

window.addEventListener('mousemove', handleMouseMove)

updateRenderer()

const loop = () => {
  fpsGraph.begin()
  TWEEN.update()
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
  fpsGraph.end()
}

loop();