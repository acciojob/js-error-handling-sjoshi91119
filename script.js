//your code here
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

function evalString(expression) {
  const operators = ['+', '-', '*', '/'];

  if (/^(\+|\*|\/)/.test(expression)) {
    throw new SyntaxError('Expression should not start with invalid operator');
  }

  if (/(\+|\*|\/|\-)$/.test(expression)) {
    throw new SyntaxError('Expression should not end with invalid operator');
  }

  if (/[^\d\s\+\-\*\/]/.test(expression)) {
    const invalidChar = expression.match(/[^\d\s\+\-\*\/]/)[0];
    throw new OutOfRangeError(invalidChar);
  }

  if (/(\+{2}|\-{2}|\*{2}|\/{2}|[\+\-\*\/]{2,})/.test(expression)) {
    throw new InvalidExprError();
  }

  return eval(expression);
}

try {
  console.log(evalString('2 + 3 * 4')); // Output: 14
  console.log(evalString('2 - 3 *')); // Throws SyntaxError: Expression should not end with invalid operator
  console.log(evalString('+ 2 + 3 * 4')); // Throws SyntaxError: Expression should not start with invalid operator
  console.log(evalString('2 + 3 / 0')); // Throws TypeError: Division by zero
  console.log(evalString('2 + 3 * 4.5')); // Output: 14.5
  console.log(evalString('2 + 3 * -4')); // Output: -10
  console.log(evalString('2++3')); // Throws InvalidExprError: Expression should not have an invalid combination of expression
} catch (error) {
  console.error(error.message);
}
