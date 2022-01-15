// 1. The characteristics that define higher-order functions are that they accept a function as an argument, return a function, or both.

// 2. In this code, filter is a higher-order function, because it's taking a function as an argument.

// 3 
let numbers = [1, 2, 3, 4];

function makeCheckEven() {
  return function(num) {
    return num % 2 === 0;
  };
}

let checkEven = makeCheckEven();

console.log(numbers.filter(checkEven)); // [2, 4]

// 4
function execute(func, operand) {
  return func(operand);
}

console.log(execute(function(number) {
  return number * 2;
}, 10)); // 20

console.log(execute(function(string) {
  return string.toUpperCase();
}, 'hey there buddy')); // 'HEY THERE BUDDY'

// 5
function makeListTransformer(func) {
  return function(arg) {
    return arg.map(func);
  };
}

let timesTwo = makeListTransformer(function(number) {
  return number * 2;
});

console.log(timesTwo([1, 2, 3, 4])); // [2, 4, 6, 8]
