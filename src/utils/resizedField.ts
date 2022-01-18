import { CellState, Field } from "../createGameOfLife";

export function resizedField(
  field: Field,
  width: number,
  height: number
): Field {
  const newField: Field = [];
  for (let i = 0; i < height; i += 1) {
    newField.push(Array<CellState>(width).fill(0));
  }
  newField.forEach((row: CellState[], y: number) => {
    row.forEach((_, x: number) => {
      if (field[y] && field[y][x]) {
        newField[y][x] = field[y][x];
      }
    });
  });
  return newField;
}
