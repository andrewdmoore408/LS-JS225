// 1
// The naming convention which distinguishes constructor functions from other functions is to capitalize the function name. (This convention is not enforced but is good practice).

// 2
// An error is raised since global variable lizzy points to undefined. Since new wasn't used to executed the function which Lizard points to as a constructor, an object wasn't constructed and returned. The function implicitly returns undefined, and that's what global variable lizzy was set to.

// There's also a side effect (since new wasn't used) of setting a property called scamper on the global object (or undefined if running in strict mode, which would raise an error). If not in strict mode, this code will lead to the function being assigned to a property named scamper on the global object.

// 3
// To make this code execute properly, all we have to do is include the new operator
function Lizard() {
  this.scamper = function() {
    console.log("I'm scampering!");
  };
}

let lizzy = new Lizard();
lizzy.scamper(); // I'm scampering!
