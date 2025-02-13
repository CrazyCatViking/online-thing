/**
 * @typedef {ReturnType<typeof createEnemy>} Enemy
 * @param {import('./types.d.ts').EnemyState} initialState
 */
export const createEnemy = (initialState) => {
  let name = initialState.playerName;
  let x = initialState.x;
  let y = initialState.y;
  let rotation = initialState.rotation;

  /** @param {import('./types.d.ts').EnemyState} newState */
  const updateState = (newState) => { 
    name = newState.playerName;
    x = newState.x;
    y = newState.y;
    rotation = newState.rotation;
  };

  /** @param {import('./types.d.ts').RenderContext} context */
  const render = ({ ctx }) => {
    ctx.fillStyle = 'white';

    // Render player name
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(name, x, y - 20);

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
    updateState,
  };
};
