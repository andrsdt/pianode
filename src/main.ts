import TWEEN from '@tweenjs/tween.js';
import '../src/piano/controls/keyboard';
import '../src/piano/controls/midi';
import '../src/piano/controls/mouse';
import './core/gui';
import { camera, cameraControls } from './core/camera';
import { renderer, updateRenderer } from './core/renderer';
import { scene } from './scene/scene';
// orbit controls
updateRenderer()

const loop = () => {
  TWEEN.update()
  cameraControls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}

loop()