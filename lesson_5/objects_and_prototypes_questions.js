// 1
// To create an object and assign its prototype, we can use Object.create(prototypeObj)
let prot = {};
let foo = Object.create(prot);

// 2
console.log(Object.getPrototypeOf(foo) === prot); // true

// 3
console.log(prot.isPrototypeOf(foo)); // true

// 4
// The last two lines of the code below will output true. Every object has the Object.prototype object at the end of its prototype chain, and the isPrototypeOf instance method returns true if the calling object is found anywhere in the argument object's prototype chain.

// Since prot and Object.prototype are both in foo's prototype chain, true is output twice.
prot = {};

foo = Object.create(prot);

console.log(prot.isPrototypeOf(foo));
console.log(Object.prototype.isPrototypeOf(foo));
