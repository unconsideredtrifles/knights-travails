class ChessSquare {
  #row;
  #col;
  #minBoundary;
  #maxBoundary;

  constructor(row, col, squaresPerRow) {
    this.#row = row;
    this.#col = col;
    this.#minBoundary = 0;
    this.#maxBoundary = squaresPerRow - 1;
    this.#checkBoundaryError();
  }

  get row() {
    return this.#row;
  }

  get col() {
    return this.#col;
  }

  #checkBoundaryError() {
    if (
      this.constructor.checkIfExceedMinBoundary(
        this.#row, 
        this.#col,
        this.#minBoundary,
      ) || this.constructor.checkIfExceedMaxBoundary(
        this.#row,
        this.#col,
        this.#maxBoundary,
      )
    ) {
      throw new Error('Invalid chess squares detected');
    }
  }

  static checkIfExceedMinBoundary(row, col, minNum = 0)  {
    if (row < minNum || col < minNum) {
      return true;
    }
    return false;
  }

  static checkIfExceedMaxBoundary(row, col, maxNum = 7) {
    if (row > maxNum || col > maxNum) {
      return true;
    }
    return false;
  }

  getNearestKnightMoves() {
    let knightMoves = []
    const coordModifiers = [[1, 2], [1, -2], [-1, 2], [-1, -2]];
    coordModifiers.forEach((eachModifier) => {
      knightMoves.push(
        [
          this.#row + eachModifier[0], 
          this.#col + eachModifier[1],
        ]
      );
    });
    coordModifiers.forEach((eachModifier) => {
      knightMoves.push(
        [
          this.#row + eachModifier[1], 
          this.#col + eachModifier[0],
        ]
      );
    });

    return knightMoves.filter(
      (eachMove) => !(
        this.constructor.checkIfExceedMinBoundary(...eachMove, this.#minBoundary)
        || this.constructor.checkIfExceedMaxBoundary(...eachMove, this.#maxBoundary)
      )
    );
  }
}


export default ChessSquare;
