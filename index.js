var addButton = document.querySelector("#add");
var clearButton = document.querySelector("#clear");
var emptyButton = document.querySelector("#empty");
var saveButton = document.querySelector("#save");
var inputBox = document.querySelector(".textinput");
var todoList = document.querySelector(".todo-list");
addButton.addEventListener("click",function(){
    var text = inputBox.value;
    addtodoItem(text,false);
})
clearButton.addEventListener("click",function clearList(){
    cleaCompleted()
})
emptyButton.addEventListener("click",function emptyList(){
    clearAll()
})
saveButton.addEventListener("click",function saveList(){
    loadList()
})


function addtodoItem(text,completed){
    var todoItem = document.createElement("li");
    var textContainer = document.createTextNode(text);
    todoItem.appendChild(textContainer);
    if (completed){
        todoItem.classList.add("completed");
    }
    todoList.appendChild(todoItem);
    todoItem.addEventListener("dblclick",toggleToDoTtemstate);
}

function toggleToDoTtemstate(){
    if(this.classList.contains("completed")){
        this.classList.remove("completed");
    }
    else{
        this.classList.add("completed");
    }
}

function cleaCompleted(){
    var completedItems = todoList.getElementsByClassName("completed");
    while(completedItems.length >0){
        completedItems.item(0).remove();
    }
}

function clearAll(){
    var items = todoList.children;
    while(items.length>0){
        items.item(0).remove();
    }

}

function saveLists(){
    var todos = [];

    for(var i=0;i<todoList.children.length;i++){
        todo = todoList.children.item(i);
        var todoInfo = {
            "task" : todo.innerText,
            "completed" : todo.classList.contains("completed")
        };
        todos.push(todoInfo);
    }

    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadList(){
    if(localStorage.getItem("todos") != null){
        var toDos = JSON.parse(localStorage.getItem("todos"));
        for(var i=0;i<toDos.length;i++){
            var todo = toDos[i];
            addtodoItem(todo.task,todo.completed);
        }
    }
}