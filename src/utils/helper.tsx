export const sleep = (sec: number) => {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      resolve("timeout");
    }, sec * 1000);
  });
};
