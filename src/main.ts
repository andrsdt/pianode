import TWEEN from '@tweenjs/tween.js';
import '../src/piano/controls/keyboard';
import '../src/piano/controls/midi';
import '../src/piano/controls/mouse';
import { cameraControls } from './core/camera';
import { composer, updateComposer } from './core/composer';
import './core/gui';

updateComposer()

const loop = () => {
  TWEEN.update()
  composer.render()
  cameraControls.update()
  requestAnimationFrame(loop)
}

loop()