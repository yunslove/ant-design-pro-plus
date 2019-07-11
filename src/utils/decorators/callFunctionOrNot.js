export const callFunctionIfFunction = func => (...args) => {
  if (func) func(...args);
};

export const callFunctionIfValue = func => (...args) => {
  if (args[0]) func(...args);
};

export const callFunctionIf = condition => func => {
  if (condition) func();
};
