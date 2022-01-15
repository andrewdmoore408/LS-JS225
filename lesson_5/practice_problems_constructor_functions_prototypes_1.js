// 1
// The output of this code depends on whether or not strict mode is in effect. If it is, an error will be raised on line 16 when the function global variable Foo points to is invoked with implicit execution context. In strict mode, implicit context is set to undefined, and a TypeError will be raised when the code tries to set a property a on undefined.

// If this code is not running in strict mode, 2 will be output 6 times. Each time the function which global variable Foo points to is invoked, (whether it's being used as a constuctor or not), 2 will be logged, and the last line, where this.a is logged, will also output 2 because the property a on the global object is set to 2 on line 16, when the function global variable Foo points to is invoked as a function (so the function has implicit execution context, meaning this references the global object).

// 2
// This code logs NaN twice to the console. As it's written, this code invokes the area and perimeter methods on the object global variable RECTANGLE points to and assigns the results to the area property and perimeter property (respectively) which is being constructed by the function global variable Rectangle points to (after it was invoked with the new operator).

// Execution context depends on how functions are invoked, and in this case, these functions are being invoked as methods on the object RECTANGLE references, which has no width or height properties. Therefore, this.width and this.height resolve to undefined in this invocation, and both RECTANGLE.area() and RECTANGLE.height() return NaN.

// To fix this problem, we need to change the context with which these methods are being invoked. Removing the parentheses from their current positions (so that the methods are not invoked in the function body of the function that Rectangle references) and invoking them later on, in the last two lines of this snippet, means that this will resolve to the object global variable rect1 points to, which has a width of 2 and height of 3. Therefore, these methods will find numeric values and the area and perimeter values can be correctly calculated and returned. (Fixed code below)

// NOTE: The Launch School solution uses the call method to explicitly pass the object being constructed as the execution context. In this case, I prefer my approach because it will leave these properties as methods. That way, if the width or height properties of this constructed object change later on, the correct area and perimeter can be calculated dynamically using methods, rather than returning outdates values (which were correct at the time of instantiation but wouldn't be correct any longer).

let RECTANGLE = {
  width: 9,
  height: 10,
  
  area() {
    return this.width * this.height;
  },
  perimeter() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area;
  this.perimeter = RECTANGLE.perimeter;
}

let rect1 = new Rectangle(2, 3);
console.log(rect1.area());
console.log(rect1.perimeter());

// 3
function Circle(radius) {
  this.radius = radius;
  
  // this.area = function() {
  //   return Math.PI * (this.radius * this.radius);
  // };
}

Circle.prototype.area = function() {
  return Math.PI * (this.radius * this.radius);
};

let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27

// 4
// This code logs true. Because the object which global variable ninja references was made using a constructor function, its prototype (specifically object prototype) is the function prototype of the function which was used as a constructor function to create it.

// In this case, the function which global variable Ninja points to constructed the object in question, and when its prototype property has a property defined on it, that property is also available to the object which was created using the function as a constructor function.

// It doesn't matter that this specific property was defined after the object global variable ninja references was created; the prototypes are pointers to objects and follow the prototype chain to find whatever is defined there (no matter when it was defined relative to any given object's instantiation).

// 5
// This code raises an error. Rather than mutating the object prototype of the newly constructed object which global variable ninja points to, this code reassigns it. Because the constructed object was set to point to its object prototype when it was instantiated, this reassignment means that the object ninja references is still pointing to its old object prototype, which doesn't have the swingSword method defined on it. This leads to a TypeError being raised.

// 6
let ninjaA;
let ninjaB;
function Ninja() {
  this.swung = false;
}

ninjaA = new Ninja();
ninjaB = new Ninja();

Ninja.prototype.swing = function() {
  this.swung = true;
  return this;
};

// Add a swing method to the Ninja prototype which
// returns the calling object and modifies swung

console.log(ninjaA.swing().swung);      // must log true
console.log(ninjaB.swing().swung);      // must log true

// 7
// We can indirectly access a constructor function by invoking the function referenced by the constructor property of an object that was made by a constructor function. 
let ninjaA = (function() {
  function Ninja(){};
  return new Ninja();
})();

// create a ninjaB object
let ninjaB = new ninjaA.constructor();

console.log(ninjaB.constructor === ninjaA.constructor);    // should log true
