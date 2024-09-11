const convertSquareToVertixIdx = function convertSquareToVertixIdx(
  squareCoord,
  totalSquares,
) {
  const row = squareCoord[0];
  const col = squareCoord[1];
  return (row * Math.sqrt(totalSquares) + col);
};

const convertVertixIdxToSquare = function convertVertixIdxToSquare(
  vertixIdx,
  totalSquares,
) {
  const row = Math.floor(vertixIdx / Math.sqrt(totalSquares));
  const col = vertixIdx % Math.sqrt(totalSquares);
  return [row, col];
};

const isSameSquare = function isSameSquare(square1, square2) {
  return (square1[0] === square2[0] && square1[1] === square2[1]);
};

export {
  convertSquareToVertixIdx,
  convertVertixIdxToSquare,
  isSameSquare,
};
