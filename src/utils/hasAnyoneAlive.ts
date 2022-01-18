import { CellState, Field } from "../createGameOfLife";

export function hasAnyoneAlive(field: Field) {
  for (let i = 0; i < field.length; i += 1) {
    const row: CellState[] = field[i];
    for (let j = 0; j < row.length; j += 1) {
      const cell: CellState = row[j];
      if (cell) {
        return true;
      }
    }
  }
  return false;
}
