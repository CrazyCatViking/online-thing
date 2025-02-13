/** 
 * @return {Promise<WebSocket>} 
 */
export const connect = async () => {
  /** @type {string} */
  let userId = "";

  return new Promise((resolve) => {
    const ws = new WebSocket('ws://localhost:4000/ws');
    ws.onopen = () => {
      console.log('Connected to server');
      resolve(ws);
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
