import TWEEN from '@tweenjs/tween.js';
import { camera } from './core/camera';
import { fpsGraph } from './core/gui';
import { handleMouseMove } from './core/raycaster';
import { renderer, updateRenderer } from './core/renderer';
import { scene } from './scene/scene';

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