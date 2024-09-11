import KnightMovesEngine from "./chess-engine.js";
import { convertSquareToVertixIdx, isSameSquare } from './util.js';

class KnightShortestPathFinder {
  #startingSquare;
  #targetSquare;
  #totalSquares;
  #movesEngine;
  #distances;
  #parents;

  constructor(startingSquare, targetSquare, totalSquares = 64) {
    this.#startingSquare = startingSquare;
    this.#targetSquare = targetSquare;
    this.#totalSquares = totalSquares;
    this.#movesEngine = new KnightMovesEngine(totalSquares);
    this.#distances = Array(64).fill(-1);
    this.#parents = Array(64).fill(false);
  }

  findShortestPath() {
    this.#initShortestPath();
    return this.#buildShortestPath();
  }

  #initShortestPath() {
    const startingIdx = convertSquareToVertixIdx(this.#startingSquare);
    this.#distances[startingIdx] = 0;
    const queue = [this.#startingSquare];
    while (queue.length > 0) {
      const curSquare = queue.shift();
      const curSquareIdx = convertSquareToVertixIdx(curSquare, this.#totalSquares);
      const nearbySquares = this.#movesEngine.lookupNearestHops(curSquare);
      for (let i = 0; i < nearbySquares.length; i += 1) {
        const squareIdx = convertSquareToVertixIdx(
          nearbySquares[i], 
          this.#totalSquares,
        );
        if (this.#distances[squareIdx] !== -1) {
          continue;
        }
        this.#distances[squareIdx] = this.#distances[curSquareIdx] + 1;
        this.#parents[squareIdx] = curSquare;
        if (isSameSquare(nearbySquares[i], this.#targetSquare)) {
          return;
        }
        queue.push(nearbySquares[i]);
      }
    }
  }

  #buildShortestPath() {
    const targetIdx = convertSquareToVertixIdx(
      this.#targetSquare, 
      this.#totalSquares,
    );
    const shortestPath = [this.#targetSquare];
    let currentIdx = targetIdx;
    while (true) {
      let parentSquare = this.#parents[currentIdx];
      shortestPath.unshift(parentSquare);
      if (isSameSquare(parentSquare, this.#startingSquare)) {
        break;
      }
      currentIdx = convertSquareToVertixIdx(parentSquare, this.#totalSquares);
    }
    return shortestPath;
  }
}

export default KnightShortestPathFinder;