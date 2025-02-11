export const initGameServer = async () => {
  const ws = await connect();

  /** @param {string} playerName */
  const joinGame = (playerName) => {
    ws.send(JSON.stringify({ type: 'start', playerName }));
  };

  /** @param {import('./types.d.ts').PlayerState} playerState */
  const sendState = (playerState) => {
    ws.send(JSON.stringify({ 
      type: 'update',
      x: playerState.x,
      y: playerState.y,
      rotation: playerState.rotation,
    }));
  };

  return {
    joinGame,
    sendState,
  };
};

/** 
 * @return {Promise<WebSocket>} 
 */
const connect = async () => {
  /** @type {string} */
  let userId = "";

  return new Promise((resolve) => {
    const ws = new WebSocket('ws://localhost:4000/ws');
    ws.onopen = () => {
      console.log('Connected to server');
      resolve(ws);
    }; 

    ws.onmessage = (e) => {
      /** @type { any } */
      const data = JSON.parse(e.data);
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
