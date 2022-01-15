// 1
function makeList() {
  const todos = [];
  
  return {
    list() { 
      if (todos.length === 0) {
        console.log('The list is empty.');
      } else {
        todos.forEach(todo => console.log(todo));
      }
    },

    add(todo) {
      todos.push(todo);
      console.log(`${todo} added!`);
    },

    remove(todo) {
      const todoIndex = todos.find(element => element === todo);
      
      if (todoIndex) {
        todos.splice(todoIndex, 1);
        console.log(`${todo} removed!`);
      } else {
        console.log(`${todo} was not in the list.`);
      }
    },
  };
}

const list = makeList();
list.add('peas');
// peas added!
list.list();
// peas
list.add('corn');
// corn added!
list.list();
// peas
// corn
list.remove('peas');
// peas removed!
list.list();
// corn

// 2
// My original implementation already had the array as private data in the object's closure; I thought it made more sense to keep it there rather than make it directly accessible as an object property.
