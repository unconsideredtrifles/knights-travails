import KnightMovesEngine from './chess/chess-engine.js';
import { convertSquareToVertixIdx, isSameSquare } from './utils/common-utils.js';

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
        if (this.#distances[squareIdx] === -1) {
          this.#distances[squareIdx] = this.#distances[curSquareIdx] + 1;
          this.#parents[squareIdx] = curSquare;
          if (isSameSquare(nearbySquares[i], this.#targetSquare)) {
            return;
          }
          queue.push(nearbySquares[i]);
        }
      }
    }
  }

  #buildShortestPath() {
    const shortestPath = [this.#targetSquare];
    const targetIdx = convertSquareToVertixIdx(
      this.#targetSquare,
      this.#totalSquares,
    );
    let curIdx = targetIdx;
    let parentSquare = this.#parents[curIdx];
    while (!isSameSquare(parentSquare, this.#startingSquare)) {
      shortestPath.unshift(parentSquare);
      curIdx = convertSquareToVertixIdx(parentSquare, this.#totalSquares);
      parentSquare = this.#parents[curIdx];
    }
    shortestPath.unshift(this.#startingSquare);
    return shortestPath;
  }
}

export default KnightShortestPathFinder;
