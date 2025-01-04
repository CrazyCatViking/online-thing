export const createGameState = () => {
  /** @type {import('./types.d.ts').CurrentState} */
  let state = 'menu';

  /** @type {import('./player.js').Player | undefined} */
  let player = undefined;

  return {
    get player() { return player },
    set player(value) { player = value },

    get state() { return state },
    set state(value) { state = value },
  }
}
