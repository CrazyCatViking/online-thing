export const initInputQueue = () => {
  /** @type {(Map<string, bool>)} */
  const queue = new Map();

  document.addEventListener('keydown', (e) => {
    queue.set(e.code, true);
  });

  document.addEventListener('keyup', (e) => {
    queue.delete(e.code);
  });

  const collectInput = () => {
    return Array.from(queue.keys());
  };

  return {
    collectInput,
  }
}
