// 1
const shape = {
  getType() {
    return this.type;
  },
};

function Triangle(a, b, c, type) {
  Object.setPrototypeOf(this, shape);
  this.a = a;
  this.b = b;
  this.c = c;
  this.type = 'triangle';
}

Triangle.prototype = shape;

Triangle.prototype.getPerimeter = function() {
  return this.a + this.b + this.c;
};

Triangle.prototype.constructor = Triangle;

let t = new Triangle(3, 4, 5);
console.log(t.constructor);                 // Triangle(a, b, c)
console.log(shape.isPrototypeOf(t));        // true
console.log(t.getPerimeter());              // 12
console.log(t.getType());                   // "triangle"

// 2
// I first had the else clause create an object and assign its properties in the same way. It didn't occur to me to recurse the function again with the new operator until I saw Launch School's hint.
function User(first, last) {
  if (this !== globalThis && this !== undefined) {
    this.first = first;
    this.last = last;
    this.name = `${first} ${last}`;
    
    return this;
  } else {
    return new User(first, last);
  }  
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe

// 3
// I thought I'd try an IIFE as the temporary function. It's probably overkill since it's already ensapsulated within a function's scope, but I wanted to give it a try anyway.
function createObject(obj) {
  return (function(prototype) {
    function Create() {
      return this;
    };
    
    Create.prototype = prototype;
    return new Create();
    
  })(obj);
}

let foo = {
  a: 1
};


let bar = createObject(foo);
console.log(bar);
console.log(foo.isPrototypeOf(bar));         // true

// 4
Object.prototype.begetObject = function() {
  function F() {};
  F.prototype = this;
  return new F();
};

// 5
// Below is the implementation I came up with. After looking at Launch School's solution, I realized that mine could go awry if the function referenced by the constructor argument is meant to return something other than the new object. I've included that implmementation below to note it.
function neww(constructor, args) {
  const newObj = Object.create(constructor.prototype);
  constructor.apply(newObj, args);
  
  return newObj;  
}

// Launch School's implementation: this will capture the return value of the method invocation of apply. Depending on the function implementation, this may be important. My implementation up above will only work if the constructor function only uses side effects.
function neww(constructor, args) {
  let object = Object.create(constructor.prototype);
  let result = constructor.apply(object, args);

  return typeof result === 'object' ? result : object;
}

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.greeting = function() {
  console.log('Hello, ' + this.firstName + ' ' + this.lastName);
};

let john = neww(Person, ['John', 'Doe']);
console.log(john.greeting());          // => Hello, John Doe
console.log(john.constructor);         // Person(firstName, lastName) {...}
