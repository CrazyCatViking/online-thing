/** @param {HTMLCanvasElement} canvas */
export const initInputQueue = (canvas) => {
  /** @type Map<string, boolean> */
  const keys = new Map();

  /** @type string[] */
  let inputQueue = [];

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('keydown', (e) => {
    e.preventDefault();

    if (keys.has(e.code)) return;

    keys.set(e.code, true);
    inputQueue.push(e.code);
  });

  document.addEventListener('keyup', (e) => {
    e.preventDefault();

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


  const readInputs = () => {
    const inputs = [...inputQueue];
    inputQueue = [];

    return {
      pressedKeys: keys,
      inputQueue: inputs,
      get mouseX() { return mouseX },
      get mouseY() { return mouseY },
    };
  };

  return {
    readInputs,
  };
};
