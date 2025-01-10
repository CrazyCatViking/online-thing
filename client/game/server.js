const connect = async () => {
  let ws;

  return new Promise((resolve) => {
    ws = new WebSocket('ws://localhost:4000/ws');
    ws.onopen = () => {
      console.log('Connected to server');
      ws.send(JSON.stringify({ type: 'join', playerId }));

      resolve(undefined);
    }; 

    ws.onmessage = (e) => {
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
