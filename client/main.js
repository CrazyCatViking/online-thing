import { initGame } from './game/game.js';

// Start game loop
const game = await initGame();
game.start();
