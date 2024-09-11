import ChessSquare from './chess-square.js';
import AdjacencyList from './graph-utils.js';
import { convertVertixIdxToSquare, convertSquareToVertixIdx } from './util.js';

class KnightMovesEngine {
  #totalSquares;
  #squaresPerRow;
  #movesLookupList;

  constructor(totalSquares = 64) {
    this.#totalSquares = totalSquares;
    this.#squaresPerRow = Math.sqrt(totalSquares);
    this.#initMovesEngine();
  }

  #initMovesEngine() {
    this.#movesLookupList = new AdjacencyList();
    for (let i = 0; i < this.#totalSquares; i += 1) {
      const [row, col] = convertVertixIdxToSquare(i, this.#totalSquares);
      const chessSquare = new ChessSquare(row, col, this.#totalSquares);
      this.#movesLookupList.addNeighbors(chessSquare.getNearestKnightMoves());
    }
  }

  lookupNearestHops(squareCoord) {
    const vertixIdx = convertSquareToVertixIdx(squareCoord, this.#totalSquares);
    return this.#movesLookupList.getNeighbors(vertixIdx);
  }
}

export default KnightMovesEngine;
