import { isAlphaNumberic } from '../lib.js';
import { checkIsHovered } from './utils.js';

/** 
 * @param {import('../types.d.ts').TextInputOptions} options 
 * @param {import('../types.d.ts').Ref<string>} valueRef 
 */
export const createTextInput = ({ label, x, y, width, height }, valueRef) => {
  let isFocused = false;

  /** 
   * @param {import('../types.d.ts').RenderContext} context 
   */
  const render = (context) => {
    const { ctx, input } = context;

    const isHovered = checkIsHovered(input.mouseX, input.mouseY, { x, y, width, height });

    if (input.keys.has('leftMouseButton') && isHovered) {
      isFocused = true;
    } else if (input.keys.has('leftMouseButton') && !isHovered) {
      isFocused = false;
    }

    if (isFocused) {
      for (const key of Array.from(input.keys.keys())) {
        if (key.length !== 4) {
          continue;
        }

        if (!isAlphaNumberic(key[3])) {
          continue;
        }

        valueRef.value += key[3];
      }
    }

    if (isHovered || isFocused) {
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
    ctx.fillText(valueRef.value, x + width / 2, y + height / 2 + 8);
  };

  return {
    render,
  };
};
