export const sleep = async (x: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, x);
  });
