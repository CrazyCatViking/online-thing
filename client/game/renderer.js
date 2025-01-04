import { initInputQueue } from './inputQueue.js';

/** @param {string} canvasId */
export const createCanvasRenderer = (canvasId) => {
  const canvas = /** @type {HTMLCanvasElement} */(document.getElementById('game'));

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

  const input = initInputQueue(canvas);

  /** @param {import('./types.d.ts').Renderable[]} renderables */
  const render = (renderables) => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < renderables.length; i++) {
      renderables[i].render({ canvas, ctx, input });
    }

    visibleBuffer.drawImage(bufferCanvas, 0, 0);
  }

  return {
    render,
  };
}
