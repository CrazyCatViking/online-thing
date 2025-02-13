import { createEnemy } from './enemy.js';
import { connect } from './server.js';

export const createGameState = async () => {
  /** @type {import('./types.d.ts').CurrentState} */
  let state = 'menu';

  /** @type {import('./player.js').Player | undefined} */
  let player = undefined;

  /** @type {Map<string, import('./enemy.js').Enemy>} */
  let enemies = new Map();

  const server = await connect();

  /** @param {string} playerName */
  const joinGame = (playerName) => {
    server.send(JSON.stringify({ type: 'start', playerName }));
  };

  /** @param {import('./types.d.ts').PlayerState} playerState */
  const sendState = (playerState) => {
    server.send(JSON.stringify({ 
      type: 'update',
      x: playerState.x,
      y: playerState.y,
      rotation: playerState.rotation,
    }));
  };

  server.onmessage = (e) => {
    /** @type {import('./types.d.ts').Message} */
    const data = JSON.parse(e.data); 

    if (data.type === 'game-state') {
      if (!data.enemies) return;

      for (const enemy of data.enemies) {
        const existingEnemy = enemies.get(enemy.playerId);

        if (existingEnemy) {
          existingEnemy.updateState(enemy);
          continue;
        }

        const newEnemy = createEnemy(enemy);
        enemies.set(enemy.playerId, newEnemy);
      }
    }
  };

  return {
    get player() { return player },
    set player(value) { player = value },

    get state() { return state },
    set state(value) { state = value },

    joinGame,
    sendState,
    enemies,
  }
}
