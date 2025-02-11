export const createGameBoard = () => {
  /** 
   * @param {import('../types.d.ts').RenderContext} context 
   */
  const render = (context) => {
    const { canvas, ctx, gameState, input } = context;

    if (gameState.state !== 'playing') {
      return;     
    }

    if (input.pressedKeys.has('Escape')) {
      gameState.state = 'menu';
      gameState.player = undefined;
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (gameState.player !== undefined) {
      gameState.player.render(context);
    }
  };

  return {
    render,
  };
};
