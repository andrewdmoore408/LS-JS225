// 1 

// No, this code won't execute. Function declarations can't be immediately invoked.

// To avoid a SyntaxError being raised, the function declaration needs to become a function expression--this can easily be done by wrapping the function definition in parentheses (the parens at the end, which lead to the function being called, can be inside or outside of the parentheses).

// 2
(function() {
  console.log("Sometimes, syntax isn't intuitive!")
})();

// 3
// As written, this code throws a TypeError because global variable has been reassigned (after hoisting) to point to a number rather than a function.

// Wrapping the function with parens to turn it into an IIFE will prevent this scope collision 
var sum = 0;
var numbers;

sum += 10;
sum += 31;

numbers = [1, 7, -3, 3];

sum += (function sum(arr) {
  return arr.reduce(function(sum, number) {
    sum += number;
    return sum;
  }, 0);
})(numbers);

console.log(sum); // 49

// 4
function countdown(num) {
  (function () {
    for (let i = num; i >= 0; i -= 1) {
      console.log(i);  
    }
    
    console.log('Done!');
  })();
}

countdown(7); // 7, 6, ... 0 Done!

// 5
// No, the function which local variable foo points to is only in scope within its containing IIFE. After the IIFE completes its execution, the function can't be accessed again; it is out of scope.

// 6
function countdown(num) {
  (function downcount(i) {
    if (i === -1) {
      console.log('Done!');
      return;
    } else {
      console.log(i);
      downcount(i - 1);
    }
  })(num);
}

countdown(7); // 7, 6, ... 0 Done!
