/**
 * @typedef {ReturnType<typeof createPlayer>} Player 
 * @param {number} initialX
 * @param {number} initialY
 * @param {string} name
 */
export const createPlayer = (initialX, initialY, name) => {
  let _name = name;

  let x = initialX;
  let y = initialY;

  let rotation = 0;

  /** @param {import('./types.d.ts').InputQueue} input */
  const update = (input) => {
    if (input.pressedKeys.has('KeyW')) {
      y -= 1;
    }

    if (input.pressedKeys.has('KeyS')) {
      y += 1;
    }

    if (input.pressedKeys.has('KeyD')) {
      x += 1;
    }

    if (input.pressedKeys.has('KeyA')) {
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

    // Rotate to face the mouse
    const dx = input.mouseX - x;
    const dy = input.mouseY - y;

    const angle = Math.atan2(dy, dx);

    rotation = angle;
  }

  /** @param {import('./types.d.ts').RenderContext} context */
  const render = ({ ctx, input, gameState }) => {
    update(input);
    gameState.server.sendState({ x, y, rotation });

    ctx.fillStyle = 'white';

    // Render player name
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(_name, x, y - 20);

    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.translate(-x, -y);

    ctx.beginPath();
    ctx.moveTo(x + 10, y);
    ctx.lineTo(x - 10, y - 10);
    ctx.lineTo(x - 10, y + 10);
    ctx.fill();

    ctx.translate(x, y);
    ctx.rotate(-rotation);
    ctx.translate(-x, -y);
  };

  return {
    render,
  };
};
