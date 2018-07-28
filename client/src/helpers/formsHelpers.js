

/**
 *
 *
 * @param {*} data - 
 */
const checkForNullInput = (data) => {
// Using a for in loop over the each iterator to enforce synchronicity; 
  let culprit;
  Object.entries(data).forEach((pair) => {
    if (pair[1].length > 0) return;
    culprit = pair[0];
  });
  return culprit;
};

export default checkForNullInput;
/* eslint prefer-destructuring: 0 */