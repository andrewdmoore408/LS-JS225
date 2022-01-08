// 1. this points to the object which myChildObject points to. Because there's no count property defined on the object which myChildObject points to, the method call to myMethod() returns undefined.

// 2. We can use call() or apply() to explicitly set the context we need, like so: myObject.myChildObject.myMethod.call(myObject);

// 3. 'Peter Parker is the Amazing Spiderman!' is logged to the console here. The call to bind() explicitly and permanently binds the function to the context it's passed--in this case, the object which person points to.

// 4. This code will log NaN, because this points to the global object where the function is invoked (in strict mode, a TypeError will be raised because this will be assigned to undefined).

// To make it return 34000, we could change the final line of the total method to read as follows: return this.price + this.shipping + tax - specialDiscount.call(this);
  
// We could also initialize a local variable to point to this and use that variable instead inside the nested specialDiscount function, or use bind() with specialDiscount() to permanently specify the necessary explicit context.

// Below is an example of assigning a local variable to this and then using that local variable inside the nested function to avoid (or workaround?) context loss.

let computer = {
  price: 30000,
  shipping: 2000,
  total() {
    let tax = 3000;
    const self = this;
    
    function specialDiscount() {
      if (self.price > 20000) {
        return 1000;
      } else {
        return 0;
      }
    }

    return this.price + this.shipping + tax - specialDiscount();
  }
};

console.log(computer.total());
