import "./css/index.less";
import { createGameOfLife } from "./createGameOfLife";

(function onLoad() {
  function initialize() {
    const el: HTMLElement | null = document.querySelector(".container");
    if (el) {
      createGameOfLife(el);
    }
  }
  window.addEventListener("load", initialize);
})();
