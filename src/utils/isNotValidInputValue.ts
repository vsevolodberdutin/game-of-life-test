export function isNotValidInputValue(inputElement: HTMLInputElement): boolean {
  const value = Number(inputElement.value);
  return Number(inputElement.min) > value || Number(inputElement.max) < value;
}
