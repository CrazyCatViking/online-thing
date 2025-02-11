import { checkIsHovered } from './utils.js';

/** 
 * @param {import('../types.d.ts').ButtonOptions} options 
 * @param {(context: import('../types.d.ts').RenderContext) => void} callback 
 */
export const createButton = ({ text, x, y, width, height }, callback) => {

  /** 
   * @param {import('../types.d.ts').RenderContext} context 
   */
  const render = (context) => {
    const { ctx, input } = context;

    const isHovered = checkIsHovered(input.mouseX, input.mouseY, { x, y, width, height });

    if (input.pressedKeys.has('leftMouseButton') && isHovered) {
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
