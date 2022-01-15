// 1
function subtract(a, b) {
  return a - b;
}

function sub5(a) {
  return subtract(a, 5);
}

console.log(sub5(10)); // 5
console.log(sub5(20)); // 15

// 2
function makeSubN(n) {
  return function(a) {
    return subtract(a, n);
  };
}

sub5 = makeSubN(5);
console.log(sub5(10));  // 5

// 3
function makePartialFunc(func, b) {
  return function(a) {
    return func(a, b);
  }
}

function multiply(a, b) {
  return a * b;
}

const multiplyBy5 = makePartialFunc(multiply, 5);

console.log(multiplyBy5(100)); // 500

// 4 Closure makes this possible. 

// Although the function definition for the function makePartialFunc points to has since completed its execution, the inner function references the variables func and b from its outer scope--and so it continues to have access to those two variables (and the values they reference) as part of its closure.

// 5
let subjects = {
  English: ['Bob', 'Tyrone', 'Lizzy'],
  Math: ['Fatima', 'Gary', 'Susan'],
  Biology: ['Jack', 'Sarah', 'Tanya'],
};

function rollCall(subject, students) {
  console.log(subject + ':');
  students.forEach(student => console.log(student));
}

function makeMathRollCall() {
  return function(students) {
    return rollCall('Math', students);
  };
}

let mathRollCall = makeMathRollCall();
mathRollCall(subjects['Math']);
