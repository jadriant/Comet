const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos"); 

// from Local Storage 
const todos = JSON.parse( localStorage.getItem("todos") );
if(todos){
    todos.forEach(todo => {
        // passing in an array
        addTodo(todo);
    })
}

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    addTodo();
})


// todo is an array 
function addTodo(todo){

    let text = input.value;

    // from LS
    if(todo) {
        text = todo.text;
    }

    const todoEl = document.createElement("li");
    todoEl.innerText = text;

    if(todo && todo.completed) {
        todoEl.classList.add("completed");
    }

    // left-click
    todoEl.addEventListener("click", () => {
        todoEl.classList.toggle("completed");
        updateLS();
    })

    // right-click 
    todoEl.addEventListener("contextmenu", (e) =>{
        e.preventDefault();
        todoEl.remove();
        updateLS();
    })
    
    todosUL.appendChild(todoEl);
    input.value = "";
    updateLS();
}

function updateLS(){
    const todosEl = document.querySelectorAll("li");
    const todos = [];

    todosEl.forEach(todoEl =>{
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}
