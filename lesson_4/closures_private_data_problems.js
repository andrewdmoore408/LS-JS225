// 1
let countlog = makeCounterLogger(5);
countlog(8) // 5, 6, 7, 8

countlog(2) // 5, 4, 3, 2

function makeCounterLogger(firstNum) {
  return function(secondNum) {
    let subtracting = firstNum > secondNum;
    
    let currentNum = firstNum;
    console.log(currentNum);
    
    while (currentNum !== secondNum) {
      if (subtracting) {
        currentNum -= 1;
      } else {
        currentNum += 1;
      }
      
      console.log(currentNum);
    }
  };
}

// 2
function makeList() {
  const todos = [];
  
  return function(todo) {
    if (todo === undefined) {
      if (todos.length === 0) {
        console.log('The list is empty.');
      } else {
        todos.forEach(todo => console.log(todo));
      }
    } else {
      const todoIndex = todos.find(element => element === todo);
      
      if (todoIndex) {
        todos.splice(todoIndex, 1);
        console.log(`${todo} removed!`);
      } else {
        todos.push(todo);
        console.log(`${todo} added!`);
      }
    }
  };
}

const list = makeList();
list(); // The list is empty.
list('make breakfast'); // make breakfast added!
list('read book'); // read book added!
list(); // make breakfast\nread book
list('make breakfast'); // make breakfast removed!
list(); // read book
