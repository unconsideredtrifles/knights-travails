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
  const col = vertixIdx % squaresPerRow;
  return [row, col]
};