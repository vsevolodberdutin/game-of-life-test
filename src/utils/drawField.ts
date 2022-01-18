import { CellState, Field } from "../createGameOfLife";

export function drawField(
  el: HTMLElement,
  field: Field,
  onCellClick: (arg0: number, arg1: number) => void
) {
  el.innerHTML = "";
  const table = document.createElement("table");
  field.forEach((row: CellState[], y: number) => {
    const tr = document.createElement("tr");
    row.forEach((cellState: CellState, x: number) => {
      const td = document.createElement("td");
      td.dataset.x = `${x}`;
      td.dataset.y = `${y}`;
      td.classList.add("cell");
      td.classList.add(cellState === 0 ? "cell--dead" : "cell--alive");
      tr.append(td);
    });
    table.append(tr);
  });

  table.addEventListener("click", (evt) => {
    if (evt.target instanceof HTMLTableCellElement) {
      const element = evt.target;
      if (element.classList.contains("cell")) {
        onCellClick(Number(element.dataset.x), Number(element.dataset.y));
      }
    }
  });
  el.append(table);
}
