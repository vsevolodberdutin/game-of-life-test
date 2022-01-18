export function getNextCellState(state: boolean, neighbors: number) {
  if (!state && neighbors === 3) {
    return true;
  }
  return state && (neighbors === 2 || neighbors === 3);
}
