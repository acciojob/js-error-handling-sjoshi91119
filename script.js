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


