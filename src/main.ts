import TWEEN from '@tweenjs/tween.js';
import { camera } from './core/camera';
import { fpsGraph } from './core/gui';
import { renderer, updateRenderer } from './core/renderer';
import { scene } from './scene/scene';
import '../src/piano/controls/mouse'
import '../src/piano/controls/keyboard'

updateRenderer()

const loop = () => {
  fpsGraph.begin()
  TWEEN.update()
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
  fpsGraph.end()
}

loop();