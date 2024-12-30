import { initGame } from './game/renderer.js';

// Start game loop
const game = await initGame();
game.start();
