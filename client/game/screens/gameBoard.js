export const createGameBoard = () => {
  /** 
   * @param {import('../types.d.ts').RenderContext} context 
   */
  const render = (context) => {
    const { canvas, ctx, gameState } = context;

    if (gameState.state !== 'playing') {
      return;     
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Naow we pley!', canvas.width / 2, canvas.height / 2);

    if (gameState.player !== undefined) {
      gameState.player.render(context);
    }
  };

  return {
    render,
  };
};
