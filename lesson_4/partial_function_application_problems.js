// 1
function greet(salutation, name) {
  salutation = salutation[0].toUpperCase() + salutation.slice(1);
  console.log(`${salutation}, ${name}!`);
}

greet('howdy', 'Joe');
// Howdy, Joe!
greet('good morning', 'Sue');
// Good morning, Sue!

// 2
function partial(func, firstArg) {
  return function(secondArg) {
    return func(firstArg, secondArg);
  };
}

const sayHello = partial(greet, 'hello');
const sayHi = partial(greet, 'hi');

sayHello('Brandon');
sayHi('Sarah');
