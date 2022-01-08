// 1. This code will log 'undefined undefined is a undefined'.

// Because the getDescription() method is being invoked outside of its containing object, we have context loss. In this case, this will be the global object (as implicit execution context), and firstName, lastName, and occupation are all presumably undefined on the global object.

// 2

function logReturnVal(func, context) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal(turk.getDescription, turk);

// 3

const getTurkDescription = turk.getDescription.bind(turk);
console.log(getTurkDescription());

// 4

// No, this code will not log the desired output. When the function is passed into forEach() as an argument on line 5 without a context object, we'll have context loss, so this will reference the global object, where seriesTitle will (presumably) be undefined.

// To remedy this, we could pass in an explicit context as a second argument to forEach; assign this to a local variable in the listGames() method and reference that variable on line 6 instead of this; use bind(this); or pass an arrow function to forEach() instead.

// 5

// other code before...
  listGames() {
    this.titles.forEach(title => {
      console.log(this.seriesTitle + ' ' + title);
    });
  }
// other code after...

// 6

// other code before...
  listGames() {
    const self = this;
    
    this.titles.forEach(function (title) {
      console.log(self.seriesTitle + ' ' + title);
    });
  }
// other code after...

// 7

// other code before...
  listGames() {
    this.titles.forEach(function (title) {
      console.log(self.seriesTitle + ' ' + title);
    }, this);
  }
// other code after...

// 8

// The value of foo.a will still be 0 after this code is executed. The nested function inside the method will lose the surrounding object as context, so this will reference the global object.

// 9

// Using the Function.call() method, we can pass in an explicit execution context. Inside the method (outside of the nested function), this references the object which foo points to, and so this can be passed into call() as an argument to provide the necessary context.

let foo = {
  a: 0,
  incrementA() {
    function increment() {
      this.a += 1;
    }

    increment.call(foo);
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();

console.log(foo.a); // foo.a is now 3

// 10

let foo = {
  a: 0,
  incrementA() {
    const increment = function() {
      this.a += 1;
    }.bind(this);
    
    increment();
    increment();
    increment();
  }
};

foo.incrementA();

console.log(foo.a); // 3
