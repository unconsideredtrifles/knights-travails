import ChessSquare from './chess-square.js';
import AdjacencyList from './graph-utils.js';

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
      const [row, col] = this.#convertVertixIdxToCoord(i);
      const chessSquare = new ChessSquare(row, col, this.#squaresPerRow);
      this.#movesLookupList.addNeighbors(chessSquare.getNearestKnightMoves());
    }
  }

  #convertVertixIdxToCoord(vertixIdx) {
    const row = Math.floor(vertixIdx / this.#squaresPerRow);
    const col = vertixIdx % this.#squaresPerRow;
    return [row, col]
  }

  #convertCoordToVertixIdx(squareCoord) {
    const row = squareCoord[0];
    const col = squareCoord[1];
    return (row * this.#squaresPerRow + col);
  }

  lookupNearestHops(squareCoord) {
    const vertixIdx = this.#convertCoordToVertixIdx(squareCoord);
    return this.#movesLookupList.getNeighbors(vertixIdx);
  }
}

export default KnightMovesEngine;
