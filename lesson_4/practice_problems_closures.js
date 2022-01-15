// 1
function makeMultipleLister(num) {
  const MAX_NUM = 100;
  
  return function() {
    for (let multiplier = 1; num * multiplier < MAX_NUM; multiplier += 1) {
      console.log(num * multiplier);
    }
  };
}

const lister = makeMultipleLister(13);
lister();

// 2
function makeAddandSubtract(num = 0) {
  return [function add(delta) {
    num += delta;
    return num;
  }, 
          
  function subtract(delta) {
    num -= delta;
    return num;
  }];
}

let [ add, subtract ] = makeAddandSubtract();

console.log(add(1));
console.log(add(42));
console.log(subtract(39));
console.log(add(6));

[ add, subtract ] = makeAddandSubtract(50);
console.log(add(1)); // 51
console.log(add(10)); // 61
console.log(subtract(11)); // 50
console.log(subtract(50)); // 0

// 3
// It's not possible to access a variable from within a closure from outside that closure. In this example, there isn't any way to access the inner variable status given the constraint that we can't modify the startup function.

// NOTE: This is how private variables are defined in JavaScript.
