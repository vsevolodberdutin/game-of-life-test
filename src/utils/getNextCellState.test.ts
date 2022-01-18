import { getNextCellState } from "./getNextCellState";

describe("getNextCellState", () => {
  it("is a function", () => {
    expect(getNextCellState).toBeInstanceOf(Function);
  });
  [
    [true, 0, false],
    [true, 1, false],
    [true, 2, true],
    [true, 3, true],
    [true, 4, false],
    [true, 5, false],
    [true, 6, false],
    [true, 7, false],
    [true, 8, false],
    [false, 0, false],
    [false, 1, false],
    [false, 2, false],
    [false, 3, true],
    [false, 4, false],
    [false, 5, false],
    [false, 6, false],
    [false, 7, false],
    [false, 8, false],
  ].forEach(([currentState, aliveAround, expectedState]) => {
    it(`returns ${expectedState} for (${currentState}, ${aliveAround})`, () => {
      expect(
        getNextCellState(currentState as boolean, aliveAround as number)
      ).toBe(expectedState);
    });
  });
});
