import { initGameServer } from './server.js';

export const createGameState = async () => {
  /** @type {import('./types.d.ts').CurrentState} */
  let state = 'menu';

  /** @type {import('./player.js').Player | undefined} */
  let player = undefined;

  const server = await initGameServer();

  return {
    get player() { return player },
    set player(value) { player = value },

    get state() { return state },
    set state(value) { state = value },

    get server() { return server },
  }
}
