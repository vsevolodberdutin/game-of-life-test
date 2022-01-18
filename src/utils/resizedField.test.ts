import { resizedField } from "./resizedField";
import { Field } from "../createGameOfLife";

describe("resizedField", () => {
  it("returns the correct field during expansion", () => {
    const field: Field = [
      [1, 1, 1],
      [1, 0, 1],
      [0, 1, 1],
      [1, 1, 1],
    ];
    const expected: Field = [
      [1, 1, 1, 0],
      [1, 0, 1, 0],
      [0, 1, 1, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
    ];
    const newField = resizedField(field, 4, 5);
    expect(newField).toEqual(expected);
  });
  it("returns the correct field during narrowing", () => {
    const field: Field = [
      [0, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
      [0, 1, 1],
    ];
    const expected: Field = [
      [0, 1],
      [1, 1],
    ];
    const newField = resizedField(field, 2, 2);
    expect(newField).toEqual(expected);
  });
});
