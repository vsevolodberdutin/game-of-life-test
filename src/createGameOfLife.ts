import { drawField } from "./utils/drawField";
import { getNextGeneration } from "./utils/getNextGeneration";
import { hasAnyoneAlive } from "./utils/hasAnyoneAlive";
import { resizedField } from "./utils/resizedField";
import { isNotValidInputValue } from "./utils/isNotValidInputValue";

const WIDTH = 20;
const HEIGHT = 20;
const GAME_STEP_DELAY_IN_MS = 400;

export type CellState = 0 | 1;
export type Field = CellState[][];

export function createGameOfLife(
  el: HTMLElement,
  width = WIDTH,
  height = HEIGHT,
  step = GAME_STEP_DELAY_IN_MS
) {
  let gameIsRunning = false;
  let intervalId: NodeJS.Timer;

  let field: Field = [];
  for (let i = 0; i < height; i += 1) {
    field.push(Array<CellState>(width).fill(0));
  }

  const fieldEl = document.createElement("div");
  fieldEl.classList.add("field");
  el.append(fieldEl);

  const buttonDivEl = document.createElement("div");
  buttonDivEl.classList.add("button-container");

  const buttonEl = document.createElement("button");
  buttonEl.innerHTML = "Start";
  buttonDivEl.append(buttonEl);
  el.append(buttonDivEl);

  const controlDivEl = document.createElement("div");
  controlDivEl.classList.add("control-container");

  const widthInputEl: HTMLInputElement = document.createElement("input");
  const labelForWidthInputEl: HTMLLabelElement =
    document.createElement("label");
  widthInputEl.type = "number";
  widthInputEl.min = "15";
  widthInputEl.max = "50";
  widthInputEl.value = "20";
  widthInputEl.id = "widthInputId";
  labelForWidthInputEl.htmlFor = "widthInputId";
  labelForWidthInputEl.innerHTML = "width: ";
  controlDivEl.append(labelForWidthInputEl);
  controlDivEl.append(widthInputEl);
  const heightInputEl: HTMLInputElement = document.createElement("input");
  const labelForHeightInputEl: HTMLLabelElement =
    document.createElement("label");
  heightInputEl.type = "number";
  heightInputEl.min = "15";
  heightInputEl.max = "50";
  heightInputEl.id = "heightInputId";
  heightInputEl.value = "20";
  labelForHeightInputEl.htmlFor = "heightInputId";
  labelForHeightInputEl.innerHTML = "height: ";
  controlDivEl.append(labelForHeightInputEl);
  controlDivEl.append(heightInputEl);
  el.append(controlDivEl);

  const onCellClick = (x: number, y: number) => {
    field[y][x] = field[y][x] === 0 ? 1 : 0;
    drawField(fieldEl, field, onCellClick);
  };

  function makeGameStep(): void {
    field = getNextGeneration(field);
    drawField(fieldEl, field, onCellClick);
  }

  function stopGame() {
    gameIsRunning = false;
    buttonEl.innerHTML = "Start to revive";
    clearInterval(intervalId);
  }

  function startGame() {
    gameIsRunning = true;
    buttonEl.innerHTML = "Freeze life";
    intervalId = setInterval(() => {
      makeGameStep();
      if (!hasAnyoneAlive(field)) {
        stopGame();
      }
    }, step);
  }

  buttonEl.addEventListener("click", () => {
    if (!gameIsRunning) {
      startGame();
    } else {
      stopGame();
    }
  });
  const resizeEventListener = () => {
    if (
      isNotValidInputValue(heightInputEl) ||
      isNotValidInputValue(widthInputEl)
    ) {
      return;
    }
    height = Number(heightInputEl.value);
    width = Number(widthInputEl.value);
    if (!gameIsRunning) {
      field = resizedField(
        field,
        Number(widthInputEl.value),
        Number(heightInputEl.value)
      );
      drawField(fieldEl, field, onCellClick);
    } else {
      stopGame();
      field = resizedField(field, width, height);
      startGame();
    }
  };
  heightInputEl.addEventListener("change", resizeEventListener);
  widthInputEl.addEventListener("change", resizeEventListener);

  drawField(fieldEl, field, onCellClick);
}
