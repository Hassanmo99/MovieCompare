const debounce = (func, delay = 1000) => {
  // Debouncing an input ==> wait untill user finish typing
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
