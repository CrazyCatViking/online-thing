import { createGameState } from "./gamestate.js";
import { createMenu } from "./screens/menu.js";
import { createCanvasRenderer } from "./renderer.js";
import { createGameBoard } from "./screens/gameBoard.js";

export const initGame = () => {
  const gameState = createGameState();
  const canvasRenderer = createCanvasRenderer('game', gameState);

  const menu = createMenu();
  const gameBoard = createGameBoard();

  const renderFrame = () => {
    canvasRenderer.pullInputs();
    canvasRenderer.render(gameBoard);
  
    if (gameState.state === 'menu') {
      canvasRenderer.render(menu);
    };

    canvasRenderer.swap();

    requestAnimationFrame(renderFrame);
  }

  const start = () => {
    renderFrame();
  };

  return {
    start,
  }
}

