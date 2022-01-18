import { getNumOfAliveAround } from "./getNumOfAliveAround";
import { getNextCellState } from "./getNextCellState";
import { Field } from "../createGameOfLife";

export function getNextGeneration(field: Field): Field {
  const result = field.slice(0);
  for (let y = 0; y < field.length; y++) {
    result[y] = result[y].slice(0);

    for (let x = 0; x < field[y].length; x++) {
      const num = getNumOfAliveAround(field, x, y);
      const state = field[y][x] !== 0;
      const nextState = getNextCellState(state, num);
      result[y][x] = nextState ? 1 : 0;
    }
  }
  return result;
}
