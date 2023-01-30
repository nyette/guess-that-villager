const resetState = (current, initial) => {
  const initialKeysArray = Object.keys(initial);
  const initialKeys = new Set(initialKeysArray);
  for (const key of initialKeys) {
    current[key] = initial[key];
  }
  return current;
};

export default resetState;
