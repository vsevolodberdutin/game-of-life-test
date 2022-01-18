import { getNumOfAliveAround } from "./getNumOfAliveAround";
import { Field } from "../createGameOfLife";

describe("getNumberOfAliveAround", () => {
  const field: Field = [
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ];

  it("returns number with normal params", () => {
    expect(typeof getNumOfAliveAround(field, 1, 1)).toBe("number");
  });
  it("returns valid number for coordinates inside field", () => {
    expect(getNumOfAliveAround(field, 1, 1)).toBe(6);
    expect(getNumOfAliveAround(field, 2, 1)).toBe(5);
    expect(getNumOfAliveAround(field, 1, 2)).toBe(6);
    expect(getNumOfAliveAround(field, 2, 2)).toBe(6);
  });
  it("returns valid number for field border", () => {
    expect(getNumOfAliveAround(field, 0, 0)).toBe(1);
    expect(getNumOfAliveAround(field, 0, 1)).toBe(3);
    expect(getNumOfAliveAround(field, 0, 2)).toBe(3);
    expect(getNumOfAliveAround(field, 0, 3)).toBe(3);
    expect(getNumOfAliveAround(field, 1, 0)).toBe(2);
    expect(getNumOfAliveAround(field, 2, 0)).toBe(2);
    expect(getNumOfAliveAround(field, 3, 0)).toBe(2);
    expect(getNumOfAliveAround(field, 3, 1)).toBe(4);
    expect(getNumOfAliveAround(field, 3, 2)).toBe(4);
    expect(getNumOfAliveAround(field, 3, 3)).toBe(3);
    expect(getNumOfAliveAround(field, 1, 3)).toBe(5);
    expect(getNumOfAliveAround(field, 2, 3)).toBe(5);
  });
  it("returns valid number for field outside", () => {
    expect(getNumOfAliveAround(field, -1, -1)).toBe(0);
    expect(getNumOfAliveAround(field, -1, 2)).toBe(2);
    expect(getNumOfAliveAround(field, -1, 3)).toBe(2);
    expect(getNumOfAliveAround(field, -1, 4)).toBe(1);
    expect(getNumOfAliveAround(field, -1, 5)).toBe(0);
    expect(getNumOfAliveAround(field, 4, 4)).toBe(1);
    expect(getNumOfAliveAround(field, 4, -1)).toBe(0);
    expect(getNumOfAliveAround(field, 100, -100)).toBe(0);
  });
});
