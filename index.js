import KnightMovesEngine from './chess-engine.js';

const knightMovesEngine = new KnightMovesEngine();
console.log(knightMovesEngine.lookupNearestHops([0, 1]));
console.log(knightMovesEngine.lookupNearestHops([1, 2]));
