/**
 * @typedef {ReturnType<typeof createPlayer>} Player 
 * @param {number} initialX
 * @param {number} initialY
 * @param {string} initialUuid
 */
export const createPlayer = (initialX, initialY, initialUuid) => {
  let x = initialX;
  let y = initialY;
  let uuid = initialUuid;

  /** @param {import('./types.d.ts').InputQueue} input */
  const update = (input) => {
    if (input.keys.has('KeyW')) {
      y -= 1;
    }

    if (input.keys.has('KeyS')) {
      y += 1;
    }

    if (input.keys.has('KeyD')) {
      x += 1;
    }

    if (input.keys.has('KeyA')) {
      x -= 1;
    }

    // Temporary bounds checking
    if (x < 0) {
      x = 0;
    }

    if (x > (800 - 20)) {
      x = 800 - 20;
    }

    if (y < 0) {
      y = 0;
    }

    if (y > 600 - 20) {
      y = 600 - 20;
    }
  }

  /** @param {import('./types.d.ts').RenderContext} context */
  const render = ({ ctx, input }) => {
    update(input);

    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, 20, 20);
  };

  return {
    render,
  };
};
