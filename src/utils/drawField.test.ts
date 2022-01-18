import { drawField } from "./drawField";
import { CellState } from "../createGameOfLife";

describe("drawField", () => {
  let el: HTMLElement;
  let onCellClick: () => void;
  beforeEach(() => {
    el = document.createElement("div");
    onCellClick = jest.fn();
  });

  it("is a function", () => {
    expect(drawField).toBeInstanceOf(Function);
  });

  it("renders 12 cells for field 3x4", () => {
    drawField(
      el,
      [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ],
      onCellClick
    );
    expect(el.querySelectorAll(".cell").length).toBe(12);

    drawField(
      el,
      [
        [0, 0, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ],
      onCellClick
    );
    expect(el.querySelectorAll(".cell").length).toBe(12);
  });
  it("renders cells with correct coordinates and proper classes", () => {
    const state: CellState[][] = [
      [0, 1, 1],
      [1, 1, 1],
      [0, 1, 0],
      [1, 1, 1],
    ];
    drawField(el, state, onCellClick);
    state.forEach((row: CellState[], y) =>
      row.forEach((cell: CellState, x) => {
        const cellEl = el.querySelector(
          `.cell[data-x="${x}"][data-y="${y}"]`
        ) as HTMLTableCellElement;
        expect(cellEl).toBeTruthy();
        expect(cellEl.classList.contains("cell")).toBe(true);
        expect(
          cellEl.classList.contains(cell ? "cell--alive" : "cell--dead")
        ).toBe(true);
        expect(
          cellEl.classList.contains(cell ? "cell--dead" : "cell--alive")
        ).toBe(false);
      })
    );
  });

  it("calls onCellClick with correct params on cell click", () => {
    const state: CellState[][] = [
      [0, 1, 1],
      [1, 1, 1],
      [0, 1, 0],
      [1, 1, 1],
    ];
    drawField(el, state, onCellClick);
    const cellEl = el.querySelector(
      '.cell.cell--alive[data-x="1"][data-y="2"]'
    ) as HTMLTableCellElement;
    cellEl.click();
    expect(onCellClick).toHaveBeenCalledWith(1, 2);
  });
});
