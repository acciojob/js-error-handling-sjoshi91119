class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
    this.name = this.constructor.name;
  }
}

class InvalidExprError extends Error {
  constructor() {
    super('Expression should not have an invalid combination of expression');
    this.name = this.constructor.name;
  }
}

function evalString(expr) {
  const operators = '+-/*';
  
  // Check for invalid characters
  const invalidChars = expr.replace(/[\d\s\+\-\*\/]/g, '');
  if (invalidChars.length > 0) {
    throw new OutOfRangeError(invalidChars[0]);
  }
  
  // Check for invalid combinations of operators
  const invalidCombinations = expr.match(/[\+\-\/\*]{2,}/g);
  if (invalidCombinations !== null) {
    throw new InvalidExprError();
  }
  
  // Check for invalid starting and ending operators
  if (operators.includes(expr[0])) {
    throw new SyntaxError('Expression should not start with invalid operator');
  }
  if (operators.includes(expr[expr.length - 1])) {
    throw new SyntaxError('Expression should not end with invalid operator');
  }
  
  // Evaluate the expression
  return eval(expr);
}

// Use the evalString function in a try-catch block
try {
  const result = evalString('2 + 3 * 4 - 5 / -2');
  console.log(result); // Output: 16
} catch (error) {
  console.error(error);
}
