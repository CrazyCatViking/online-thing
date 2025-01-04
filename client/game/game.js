import { createMenu } from "./menu/menu.js";
import { createCanvasRenderer } from "./renderer.js";

export const initGame = () => {
  const canvasRenderer = createCanvasRenderer('game');

  const menu = createMenu();

  const renderFrame = () => {
    canvasRenderer.render([menu]);

    requestAnimationFrame(renderFrame);
  }

  const start = () => {
    renderFrame();
  };

  return {
    start,
  }
}

