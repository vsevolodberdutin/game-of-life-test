import { createGameOfLife } from "./createGameOfLife";
import { sleep } from "./utils/sleep";

describe("createGameOfLife", () => {
  let el: HTMLElement;
  const step = 50;

  function clickCell(x: number, y: number) {
    const cell = el.querySelector(
      `.cell[data-y="${y}"][data-x="${x}"]`
    ) as HTMLElement;
    if (cell) {
      cell.click();
    }
  }

  function isCellAlive(x: number, y: number) {
    const cell = el.querySelector(
      `.cell[data-y="${y}"][data-x="${x}"]`
    ) as HTMLElement;
    return cell.classList.contains("cell--alive");
  }

  beforeEach(() => {
    el = document.createElement("div");
    createGameOfLife(el, 20, 20, step);
  });

  it("renders initial field", () => {
    const field = el.querySelector(".field") as HTMLElement;
    expect(field).toBeTruthy();
    expect(field.querySelectorAll(".cell").length).toBe(400);
  });
  it("renders button (and toggles it state on click)", () => {
    const button = el.querySelector("button") as HTMLButtonElement;
    expect(button).toBeTruthy();
    expect(button.innerHTML).toBe("Start");
    button.dispatchEvent(new window.Event("click"));
    expect(button.innerHTML).toBe("Stop");
    button.dispatchEvent(new window.Event("click"));
    expect(button.innerHTML).toBe("Start");
  });
  it("changes cell status on cell click", () => {
    const x = Math.floor(Math.random() * 20);
    const y = Math.floor(Math.random() * 20);
    const selector = `.cell[data-y="${y}"][data-x="${x}"]`;
    let cell = el.querySelector(selector) as HTMLElement;
    expect(cell.classList.contains("cell--alive")).toBe(false);
    expect(cell.classList.contains("cell--dead")).toBe(true);
    cell.click();
    cell = el.querySelector(selector) as HTMLElement;
    expect(cell.classList.contains("cell--alive")).toBe(true);
    expect(cell.classList.contains("cell--dead")).toBe(false);
    cell.click();
    cell = el.querySelector(selector) as HTMLElement;
    expect(cell.classList.contains("cell--alive")).toBe(false);
    expect(cell.classList.contains("cell--dead")).toBe(true);
  });
  it(`changes field state over time 
  (runs game loop) and stops it`, async () => {
    clickCell(2, 1);
    clickCell(2, 2);
    clickCell(2, 3);
    expect(isCellAlive(2, 1)).toBe(true);
    expect(isCellAlive(2, 2)).toBe(true);
    expect(isCellAlive(2, 3)).toBe(true);
    expect(isCellAlive(1, 1)).toBe(false);
    expect(isCellAlive(1, 2)).toBe(false);
    expect(isCellAlive(1, 3)).toBe(false);
    expect(isCellAlive(3, 1)).toBe(false);
    expect(isCellAlive(3, 2)).toBe(false);
    expect(isCellAlive(3, 3)).toBe(false);

    const button = el.querySelector("button") as HTMLButtonElement;
    button.dispatchEvent(new window.Event("click"));
    await sleep(step);
    expect(isCellAlive(1, 2)).toBe(true);
    expect(isCellAlive(2, 2)).toBe(true);
    expect(isCellAlive(3, 2)).toBe(true);
    expect(isCellAlive(1, 1)).toBe(false);
    expect(isCellAlive(2, 1)).toBe(false);
    expect(isCellAlive(3, 1)).toBe(false);
    expect(isCellAlive(1, 3)).toBe(false);
    expect(isCellAlive(2, 3)).toBe(false);
    expect(isCellAlive(3, 3)).toBe(false);
    await sleep(step);
    expect(isCellAlive(2, 1)).toBe(true);
    expect(isCellAlive(2, 2)).toBe(true);
    expect(isCellAlive(2, 3)).toBe(true);
    expect(isCellAlive(1, 1)).toBe(false);
    expect(isCellAlive(1, 2)).toBe(false);
    expect(isCellAlive(1, 3)).toBe(false);
    expect(isCellAlive(3, 1)).toBe(false);
    expect(isCellAlive(3, 2)).toBe(false);
    expect(isCellAlive(3, 3)).toBe(false);

    button.dispatchEvent(new window.Event("click"));
    await sleep(20 * step);
    expect(isCellAlive(2, 1)).toBe(true);
    expect(isCellAlive(2, 2)).toBe(true);
    expect(isCellAlive(2, 3)).toBe(true);
    expect(isCellAlive(1, 1)).toBe(false);
    expect(isCellAlive(1, 2)).toBe(false);
    expect(isCellAlive(1, 3)).toBe(false);
    expect(isCellAlive(3, 1)).toBe(false);
    expect(isCellAlive(3, 2)).toBe(false);
    expect(isCellAlive(3, 3)).toBe(false);
  });
});
