import { hasAnyoneAlive } from "./hasAnyoneAlive";

describe("isAnyoneAlive", () => {
  it("returns true", () => {
    expect(
      hasAnyoneAlive([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
      ])
    ).toBeTruthy();
    expect(
      hasAnyoneAlive([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
      ])
    ).toBeTruthy();
  });
  it("returns false", () => {
    expect(
      hasAnyoneAlive([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ])
    ).toBeFalsy();
  });
});
