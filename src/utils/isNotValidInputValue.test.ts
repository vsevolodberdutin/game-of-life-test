import { isNotValidInputValue } from "./isNotValidInputValue";

describe("isNotValidInputValue", () => {
  let inputEl: HTMLInputElement;
  beforeEach(() => {
    inputEl = document.createElement("input");
    inputEl.min = "5";
    inputEl.max = "30";
  });

  it("returns true", () => {
    inputEl.value = "4";
    expect(isNotValidInputValue(inputEl)).toBeTruthy();
    inputEl.value = "31";
    expect(isNotValidInputValue(inputEl)).toBeTruthy();
  });
  it("returns false", () => {
    inputEl.value = "5";
    expect(isNotValidInputValue(inputEl)).toBeFalsy();
    inputEl.value = "30";
    expect(isNotValidInputValue(inputEl)).toBeFalsy();
    inputEl.value = "25";
    expect(isNotValidInputValue(inputEl)).toBeFalsy();
  });
});
