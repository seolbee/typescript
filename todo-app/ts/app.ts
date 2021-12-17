let todo_list = [];
let input_list = [];
let todo_form = document.querySelector('.todo_form') as HTMLFormElement;
let todo_content = document.querySelector('#todo_content') as HTMLInputElement;
let todo_list_box = document.querySelector('.todo_list');
let input_list_box = document.querySelector('.input_list_box');

function insertTodo(todo:Todo):void{
    todo_list.push(todo);
    loadTodoList();
}

function TodoListTemplate(todo:Todo):string {
    return `
        <div class="todo">
            <p>${todo.content}</p>
            <button onclick="deleteTodo(${todo.id})">삭제하기</button>
        </div>
    `;
}

function InputValuesTemplate(todo:Todo):string {
    return `
        <div class="input_value">
        
        </div>
    `;
}

function loadTodoList() {
    todo_list_box.innerHTML = '';
    todo_list.forEach((todo : Todo)=> {
        todo_list_box.innerHTML += TodoListTemplate(todo);
    });
}

function deleteTodo(id:number) {
    todo_list = todo_list.filter(todo=> todo.id != id);
    loadTodoList();
}

todo_form.addEventListener("submit", (e) => {
    e.preventDefault();
    insertTodo(new Todo(todo_list.length+1, todo_content.value));
    todo_content.value = "";
});