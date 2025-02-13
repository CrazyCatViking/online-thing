import { ref } from '../lib.js';
import { createPlayer } from '../player.js';
import { createButton } from '../ui/button.js';
import { createTextInput } from '../ui/textInput.js';

export const createMenu = () => {
  const title = 'Wunna pley geme?';

  const textInputOptions = {
    label: 'Start',
    x: 200,
    y: 350,
    width: 400,
    height: 50,
  };

  const buttonOptions = {
    text: 'Start',
    x: 300,
    y: 410,
    width: 200,
    height: 50,
  };

  const playerName = ref('');

  const button = createButton(buttonOptions, ({ gameState }) => {
    gameState.state = 'playing';
    gameState.player = createPlayer(400, 300, playerName.value);
    gameState.joinGame(playerName.value);
  });

  const textInput = createTextInput(textInputOptions, playerName);

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

    textInput.render(context);
    button.render(context);
  };

  return {
    render,
  };
};
