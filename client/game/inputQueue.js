/** @param {HTMLCanvasElement} canvas */
export const initInputQueue = (canvas) => {
  /** @type {(Map<string, boolean>)} */
  const keys = new Map();

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('keydown', (e) => {
    keys.set(e.code, true);
  });

  document.addEventListener('keyup', (e) => {
    keys.delete(e.code);
  });

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - canvas.offsetLeft;
    mouseY = e.clientY - canvas.offsetTop;
  });

  document.addEventListener('mousedown', () => {
    keys.set('leftMouseButton', true);
  });

  document.addEventListener('mouseup', () => {
    keys.delete('leftMouseButton');
  });

  return {
    keys,
    get mouseX() { return mouseX },
    get mouseY() { return mouseY },
  }
}
