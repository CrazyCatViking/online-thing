import { createPlayer } from '../player.js';

export const createMenu = () => {
  const title = 'Wunna pley geme?';

  const options = {
    text: 'Start',
    x: 300,
    y: 350,
    width: 200,
    height: 50,
  };

  const button = createButton(options, ({ gameState }) => {
    gameState.state = 'playing';
    gameState.player = createPlayer(400, 300, 'player1');
  });

  /** 
   * @param {import('../types.d.ts').RenderContext} context 
   */
  const render = (context) => {
    const { canvas, ctx } = context;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, canvas.width / 2, canvas.height / 2);

    button.render(context);
  };

  return {
    render,
  };
};

/** 
 * @param {import('../types.d.ts').ButtonOptions} options 
 * @param {(context: import('../types.d.ts').RenderContext) => void} callback 
 */
const createButton = ({ text, x, y, width, height }, callback) => {
  /**
   * @param {number} mouseX
   * @param {number} mouseY
   */
  const checkIsHovered = (mouseX, mouseY) => {
    return mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;
  }

  /** 
   * @param {import('../types.d.ts').RenderContext} context 
   */
  const render = (context) => {
    const { ctx, input } = context;

    const isHovered = checkIsHovered(input.mouseX, input.mouseY);

    if (input.keys.has('leftMouseButton') && isHovered) {
      callback(context);
    };

    if (isHovered) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(x, y, width, height);
    } else {
      ctx.fillStyle = 'rgba(0, 0, 0)';
      ctx.fillRect(x, y, width, height);
    }

    ctx.strokeStyle = 'rgba(255, 255, 255)';
    ctx.strokeRect(x, y, width, height);

    ctx.fillStyle = 'white';
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, x + width / 2, y + height / 2 + 8);
  };

  return {
    render,
  };
};
