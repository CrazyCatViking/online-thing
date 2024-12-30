import { initInputQueue } from "./inputQueue.js";
import { createGameState } from "./gameState.js";

export const initGame = async () => {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');

  const inputQueue = initInputQueue();

  const gameState = await createGameState();

  const renderFrame = () => {
    const pressedKeys = inputQueue.collectInput();

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    gameState.update(pressedKeys);

    for (const player of gameState.players.values()) {
      player.render(ctx);
    }

    requestAnimationFrame(renderFrame);
  }

  const start = () => {
    renderFrame();
  };

  return {
    start,
  }
}

