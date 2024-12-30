import { createPlayer } from "./player.js";

export const createGameState = async () => {
  /** @type {WebSocket} */
  let ws; 
  
  /** @type {Map<string, import("./player").Player[]>} */
  let players = new Map();

  const playerId = crypto.randomUUID();

  const connect = async () => {
    return new Promise((resolve) => {
      ws = new WebSocket('ws://localhost:4000/ws');
      ws.onopen = () => {
        console.log('Connected to server');
        ws.send(JSON.stringify({ type: 'join', playerId }));

        resolve();
      }; 

      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);

        for (const player of Object.values(data)) {
          const existingPlayer = players.get(player.id);

          if (!existingPlayer) {
            players.set(player.id, createPlayer(player.x, player.y, player.id));
            return;
          }

          existingPlayer.update(player.x, player.y);
        }
      };

      ws.onerror = (e) => {
        console.error('Error connecting to server', e);
        ws.close();
      };

      ws.onclose = () => {
        console.log('Disconnected from server, reconnecting in 1 second');
        connect();
      };
    })
  };

  /** @param {string[]} pressedKeys */
  const update = (pressedKeys) => {
    let x = 0, y = 0;

    for (const key of pressedKeys) {

      switch (key) {
        case 'KeyW':
          y += -1;
          break;
        case 'KeyS':
          y += 1;
          break;
        case 'KeyA':
          x += -1;
          break;
        case 'KeyD':
          x += 1;
          break;
      }
    }

    if (!x && !y) return;

    ws.send(JSON.stringify({ type: 'update', playerId, x, y }));
  };

  await connect();

  return {
    players,
    update,
  }
}

