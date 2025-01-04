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

  /** @param {number} newX @param {number} newY */
  const update = (newX, newY) => {
    x = newX;
    y = newY;
  };

  /** @param {CanvasRenderingContext2D} ctx */
  const render = (ctx) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, 20, 20);
  };

  return {
    update,
    render,
  };
};
