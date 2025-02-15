import { initInputQueue } from './inputQueue.js';

/** 
 * @param {string} canvasId 
 * @param {import('./types.d.ts').GameState} gameState
 */
export const createCanvasRenderer = (canvasId, gameState) => {
  const canvas = /** @type {HTMLCanvasElement} */(document.getElementById(canvasId));

  if (!canvas) {
    throw new Error('Canvas not found');
  }

  const visibleBuffer = canvas.getContext('2d');

  if (!visibleBuffer) {
    throw new Error('Could not get canvas context');
  }

  const bufferCanvas = document.createElement('canvas'); 
  bufferCanvas.setAttribute('hidden', 'hidden');
  bufferCanvas.setAttribute('width', canvas.width.toString());
  bufferCanvas.setAttribute('height', canvas.height.toString());

  const ctx = bufferCanvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get buffer canvas context');
  }

  const inputBuffer = initInputQueue(canvas);
  let input = inputBuffer.readInputs();

  const pullInputs = () => {
    input = inputBuffer.readInputs();
  };

  /** @param {import('./types.d.ts').Renderable} renderable */
  const render = (renderable) => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    renderable.render({ canvas, ctx, input, gameState });
  };

  const swap = () => {
    visibleBuffer.drawImage(bufferCanvas, 0, 0);
  };

  return {
    pullInputs,
    render,
    swap,
  };
}
