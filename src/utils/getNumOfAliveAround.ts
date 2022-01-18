import { Field } from "../createGameOfLife";

export function getNumOfAliveAround(
  field: Field,
  x: number,
  y: number
): number {
  let num = 0;
  if (y - 1 >= 0 && y - 1 < field.length) {
    num += field[y - 1][x - 1] || 0;
    num += field[y - 1][x] || 0;
    num += field[y - 1][x + 1] || 0;
  }
  if (y >= 0 && y < field.length) {
    num += field[y][x - 1] || 0;
    num += field[y][x + 1] || 0;
  }
  if (y + 1 >= 0 && y + 1 < field.length) {
    num += field[y + 1][x - 1] || 0;
    num += field[y + 1][x] || 0;
    num += field[y + 1][x + 1] || 0;
  }
  return num;
}
